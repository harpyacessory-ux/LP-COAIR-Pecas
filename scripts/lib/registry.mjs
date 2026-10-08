/**
 * Registro da biblioteca de seções.
 *
 * Lê `sections/<slug>/section.mjs`, valida cada manifesto e resolve composições.
 * É o único lugar que conhece o acervo: `compose.mjs`, `catalog.mjs` e o
 * dashboard todos passam por aqui.
 */
import { readdirSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

import {
  PHASES,
  MID_PHASES,
  TONES,
  RHYTHMS,
  phaseById,
  resolveLayout,
} from '../../src/lib/rhythm.mjs'

export { PHASES, MID_PHASES, TONES, RHYTHMS, phaseById, resolveLayout }

const REQUIRED_KEYS = [
  'slug',
  'id',
  'title',
  'component',
  'data',
  'dataExport',
  'phase',
  'order',
  'tones',
  'rhythms',
  'purpose',
  'needs',
  'match',
  'ctas',
  'contract',
]

/**
 * Carrega e valida todos os manifestos da biblioteca.
 * @returns {Promise<Map<string, object>>} slug → meta
 */
export async function loadSections(dir) {
  if (!dir || !existsSync(dir)) throw new Error(`biblioteca não encontrada em ${dir}`)

  const sections = new Map()
  const problems = []

  for (const slug of readdirSync(dir).sort()) {
    const folder = join(dir, slug)
    if (!statSync(folder).isDirectory()) continue

    const manifestPath = join(folder, 'section.mjs')
    if (!existsSync(manifestPath)) {
      problems.push(`${slug}/: sem section.mjs`)
      continue
    }

    const { meta } = await import(pathToFileURL(manifestPath).href)
    if (!meta) {
      problems.push(`${slug}/section.mjs: não exporta "meta"`)
      continue
    }

    for (const key of REQUIRED_KEYS) {
      if (meta[key] === undefined) problems.push(`${slug}: manifesto sem "${key}"`)
    }
    if (meta.slug !== slug) problems.push(`${slug}: meta.slug é "${meta.slug}"`)
    if (!MID_PHASES.includes(meta.phase)) {
      problems.push(`${slug}: fase "${meta.phase}" não é uma fase de biblioteca (${MID_PHASES})`)
    }
    for (const tone of meta.tones ?? []) {
      if (!TONES[tone]) problems.push(`${slug}: tom "${tone}" não existe`)
    }
    for (const rhythm of meta.rhythms ?? []) {
      if (!RHYTHMS[rhythm]) problems.push(`${slug}: ritmo "${rhythm}" não existe`)
    }
    if (!existsSync(join(folder, meta.component ?? ''))) {
      problems.push(`${slug}: componente "${meta.component}" não existe na pasta`)
    }
    if (!existsSync(join(folder, meta.data ?? ''))) {
      problems.push(`${slug}: arquivo de dados "${meta.data}" não existe na pasta`)
    }
    for (const name of Object.keys(meta.variants ?? {})) {
      if (!/^[a-z0-9-]+$/.test(name)) problems.push(`${slug}: variante "${name}" fora de [a-z0-9-]`)
      else if (!existsSync(join(folder, variantFile(meta, name))))
        problems.push(`${slug}: variante "${name}" sem o arquivo ${variantFile(meta, name)}`)
    }

    meta.folder = folder
    meta.hasAssets = existsSync(join(folder, 'assets'))
    sections.set(slug, meta)
  }

  if (problems.length) {
    throw new Error(`biblioteca inconsistente:\n  - ${problems.join('\n  - ')}`)
  }

  return sections
}

/**
 * Arquivo de dados de uma variante: `vitrine.ts` + "grade" → `vitrine.grade.ts`.
 *
 * Variante é uma forma do componente que os dados de exemplo não exercitam (a
 * vitrine sem grupos, por exemplo). Fica só na biblioteca: o `compose` copia apenas
 * `meta.data`, e o `library.mjs` monta cada variante no lugar do exemplo para
 * verificar tipo, contrato e build.
 */
export function variantFile(meta, name) {
  return meta.data.replace(/\.ts$/, `.${name}.ts`)
}

/** Ordena slugs pela ordem das fases e, dentro da fase, por `order`. */
export function orderComposition(slugs, sections) {
  return [...slugs].sort((a, b) => {
    const A = sections.get(a)
    const B = sections.get(b)
    const phaseDiff = MID_PHASES.indexOf(A.phase) - MID_PHASES.indexOf(B.phase)
    return phaseDiff || A.order - B.order || a.localeCompare(b)
  })
}

/**
 * Valida uma composição e resolve tom e ritmo de cada seção.
 *
 * @param {string[]} slugs
 * @param {Map<string, object>} sections
 * @returns {{ ok: boolean, errors: string[], ordered?: string[], layout?: object[] }}
 */
export function planComposition(slugs, sections) {
  const errors = []

  const unknown = slugs.filter((s) => !sections.has(s))
  if (unknown.length) {
    return {
      ok: false,
      errors: [
        `seção não existe na biblioteca: ${unknown.join(', ')}. ` +
          `Disponíveis: ${[...sections.keys()].join(', ')}`,
      ],
    }
  }

  const duplicates = slugs.filter((s, i) => slugs.indexOf(s) !== i)
  if (duplicates.length) errors.push(`seção repetida na composição: ${duplicates.join(', ')}`)

  const ordered = orderComposition([...new Set(slugs)], sections)

  // Contagem por fase contra o mínimo e o máximo do slot narrativo.
  for (const phase of MID_PHASES) {
    const def = phaseById(phase)
    const count = ordered.filter((s) => sections.get(s).phase === phase).length
    if (count < def.min) {
      const options = [...sections.values()]
        .filter((m) => m.phase === phase)
        .map((m) => m.slug)
        .join(', ')
      errors.push(
        `fase "${phase}" (${def.label}) precisa de ao menos ${def.min} seção e tem ${count}. ` +
          `Opções: ${options}`,
      )
    }
    if (count > def.max) {
      errors.push(
        `fase "${phase}" (${def.label}) aceita no máximo ${def.max} seções e tem ${count}`,
      )
    }
    if (def.needsNavyCarrier) {
      const carriers = ordered.filter(
        (s) => sections.get(s).phase === phase && sections.get(s).carriesNavy,
      ).length
      if (carriers !== 1) {
        const options = [...sections.values()]
          .filter((m) => m.phase === phase && m.carriesNavy)
          .map((m) => m.slug)
          .join(' ou ')
        errors.push(
          `fase "${phase}" precisa de exatamente 1 seção com bloco navy e tem ${carriers}. ` +
            `Escolha uma: ${options}`,
        )
      }
    }
  }

  if (errors.length) return { ok: false, errors }

  const resolved = resolveLayout(
    ordered.map((slug) => {
      const meta = sections.get(slug)
      return {
        slug,
        phase: meta.phase,
        tones: meta.tones,
        rhythms: meta.rhythms,
        carriesNavy: Boolean(meta.carriesNavy),
      }
    }),
  )

  if (!resolved.ok) return { ok: false, errors: [resolved.reason] }

  return { ok: true, errors: [], ordered, layout: resolved.layout }
}

/** Primitivos opcionais exigidos pela composição (ex.: BrandCarousel). */
export function primitivesFor(slugs, sections) {
  return [...new Set(slugs.flatMap((s) => sections.get(s).primitives ?? []))]
}
