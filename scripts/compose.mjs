#!/usr/bin/env node
/**
 * compose — aplica uma composição da biblioteca de seções nesta LP.
 *
 *   npm run compose -- linhas identificar aplicacoes segmentos diferenciais
 *   npm run compose -- --recompose            # refaz a partir de lp.manifest.json
 *   npm run compose -- --list                 # mostra o acervo e sai
 *   npm run compose -- --dry-run <slugs...>   # só mostra o plano
 *
 * O que faz:
 *   1. valida a composição contra as fases, os tons e o ritmo (lib/registry.mjs);
 *   2. copia componente, dados e assets de cada seção escolhida;
 *   3. remove os arquivos das seções que saíram da composição;
 *   4. gera `src/pages/index.astro` e `lp.manifest.json`.
 *
 * Nunca sobrescreve um arquivo de dados ou um asset que já existe na LP — é lá que
 * mora o conteúdo do cliente. Para forçar a volta ao exemplo da biblioteca, use
 * `--force`.
 *
 * A biblioteca vive no starter, não na LP. O caminho é procurado em `--library`,
 * depois em `lp.manifest.json`, depois em `../LP-STARTER-B2/sections`. Uma LP
 * clonada sem o starter continua buildando: os arquivos compostos estão versionados.
 */
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { basename, dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'

import { loadSections, planComposition, primitivesFor, phaseById } from './lib/registry.mjs'
import { TONES, RHYTHMS } from '../src/lib/rhythm.mjs'

const LP = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const MANIFEST = join(LP, 'lp.manifest.json')
const COMPONENTS = join(LP, 'src', 'components', 'sections')
const DATA = join(LP, 'src', 'data', 'sections')
const ASSETS = join(LP, 'src', 'assets')
const PAGE = join(LP, 'src', 'pages', 'index.astro')

/* ------------------------------------------------------------- argumentos */

const argv = process.argv.slice(2)
const flag = (name) => argv.includes(`--${name}`)
const value = (name) => {
  const i = argv.indexOf(`--${name}`)
  return i >= 0 ? argv[i + 1] : undefined
}
const slugs = argv.filter((a) => !a.startsWith('--') && a !== value('library'))

const previous = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : null

/** Onde a biblioteca mora quando ninguém diz o contrário: starter irmão da LP. */
const DEFAULT_LIBRARY = '../LP-STARTER-B2/sections'

/**
 * O caminho vai para o manifesto **relativo à raiz da LP**, nunca absoluto: o
 * manifesto é versionado e um `C:\Users\…` não resolve na máquina de mais ninguém
 * (além de vazar o caminho de quem compôs).
 */
const libraryRef = value('library') ?? previous?.library ?? DEFAULT_LIBRARY
const library = resolve(LP, libraryRef)
const libraryForManifest = toPosix(relative(LP, library)) || DEFAULT_LIBRARY

/** Impressão digital estável de um arquivo, insensível a fim de linha. */
const sha = (buf) =>
  createHash('sha256')
    .update(buf.toString('utf8').replace(/\r\n/g, '\n'))
    .digest('hex')
    .slice(0, 16)

/** Caminho com barras normais, para o manifesto ficar igual em Windows e Linux. */
function toPosix(p) {
  return p.split(sep).join('/')
}

const die = (msg) => {
  console.error(`\n✖ ${msg}\n`)
  process.exit(1)
}

/* ---------------------------------------------------------------- acervo */

let sections
try {
  sections = await loadSections(library)
} catch (error) {
  die(
    `${error.message}\n\n  Aponte a biblioteca com --library <caminho para LP-STARTER-B2/sections>\n` +
      `  Procurei em: ${library}\n  (resolvido a partir de "${libraryRef}")`,
  )
}

if (flag('list')) {
  console.log(`\nBiblioteca de seções — ${library}\n`)
  for (const phase of ['oferta', 'apoio', 'prova', 'autoridade']) {
    const def = phaseById(phase)
    console.log(`  ${def.label.toUpperCase()} (${def.min}–${def.max} seções) — ${def.purpose}`)
    for (const meta of [...sections.values()].filter((m) => m.phase === phase)) {
      const navy = meta.carriesNavy ? ' · bloco navy' : ''
      console.log(`    ${meta.slug.padEnd(16)} ${meta.title}${navy}`)
      console.log(`    ${' '.repeat(16)} ${meta.purpose.replace(/\s+/g, ' ')}`)
    }
    console.log('')
  }
  process.exit(0)
}

const wanted = flag('recompose') ? (previous?.sections?.map((s) => s.slug) ?? []) : slugs

if (!wanted.length) {
  die(
    'nenhuma seção informada.\n\n' +
      '  npm run compose -- <slug> <slug> ...   monta a composição\n' +
      '  npm run compose -- --list              mostra o acervo\n' +
      '  npm run compose -- --recompose         refaz a composição atual',
  )
}

/* ----------------------------------------------------------------- plano */

const plan = planComposition(wanted, sections)
if (!plan.ok) {
  die(`composição inválida:\n\n  - ${plan.errors.join('\n  - ')}`)
}

const layout = plan.layout
const primitives = primitivesFor(plan.ordered, sections)

console.log('\nComposição resolvida:\n')
console.log(`  ${'seção'.padEnd(16)} ${'fase'.padEnd(12)} ${'fundo'.padEnd(10)} respiro`)
for (const item of layout) {
  const meta = sections.get(item.slug)
  console.log(
    `  ${item.slug.padEnd(16)} ${meta.phase.padEnd(12)} ` +
      `${TONES[item.tone].label.padEnd(10)} ${RHYTHMS[item.rhythm].class}`,
  )
}
console.log(`\n  primitivos exigidos: ${primitives.length ? primitives.join(', ') : '—'}`)

if (flag('dry-run')) {
  console.log('\n(--dry-run: nada foi escrito)\n')
  process.exit(0)
}

/* --------------------------------------------------------------- escrita */

mkdirSync(COMPONENTS, { recursive: true })
mkdirSync(DATA, { recursive: true })

const kept = []
const written = []

for (const { slug } of layout) {
  const meta = sections.get(slug)

  // Componente: sempre vem da biblioteca. Ajuste de layout é evolução do padrão,
  // feita na biblioteca e recomposta, nunca editada só nesta LP.
  cpSync(join(meta.folder, meta.component), join(COMPONENTS, meta.component))
  written.push(`src/components/sections/${meta.component}`)

  // Dados: o conteúdo do cliente vive aqui, então só copiamos o exemplo se não houver nada.
  const dataTarget = join(DATA, meta.data)
  if (existsSync(dataTarget) && !flag('force')) {
    kept.push(`src/data/sections/${meta.data}`)
  } else {
    cpSync(join(meta.folder, meta.data), dataTarget)
    written.push(`src/data/sections/${meta.data}`)
  }

  // Assets: mesma regra, arquivo por arquivo.
  if (meta.hasAssets) {
    const from = join(meta.folder, 'assets')
    const to = join(ASSETS, slug)
    mkdirSync(to, { recursive: true })
    for (const file of readdirSync(from)) {
      const target = join(to, file)
      if (existsSync(target) && !flag('force')) {
        kept.push(`src/assets/${slug}/${file}`)
      } else {
        cpSync(join(from, file), target)
        written.push(`src/assets/${slug}/${file}`)
      }
    }
  }
}

/* ------------------------------------------------- limpeza do que saiu */

const active = new Set(layout.map((l) => l.slug))
const removed = []

for (const slug of previous?.sections?.map((s) => s.slug) ?? []) {
  if (active.has(slug)) continue
  const meta = sections.get(slug)
  if (!meta) continue

  for (const path of [
    join(COMPONENTS, meta.component),
    join(DATA, meta.data),
    join(ASSETS, slug),
  ]) {
    if (existsSync(path)) {
      rmSync(path, { recursive: true, force: true })
      removed.push(toPosix(relative(LP, path)))
    }
  }
}

// Componente de seção que ficou órfão no diretório (composição editada à mão antes).
const expectedComponents = new Set(layout.map((l) => sections.get(l.slug).component))
for (const file of readdirSync(COMPONENTS)) {
  if (!expectedComponents.has(file)) {
    rmSync(join(COMPONENTS, file))
    removed.push(`src/components/sections/${file}`)
  }
}

/* ------------------------------------------------------- página e manifesto */

writeFileSync(PAGE, renderPage(layout, sections), 'utf8')
written.push('src/pages/index.astro')

const pkg = JSON.parse(readFileSync(join(LP, 'package.json'), 'utf8'))

writeFileSync(
  MANIFEST,
  `${JSON.stringify(
    {
      standardVersion: pkg.version,
      composedAt: new Date().toISOString().slice(0, 10),
      library: libraryForManifest,
      primitives,
      phases: Object.fromEntries(
        ['oferta', 'apoio', 'prova', 'autoridade'].map((phase) => [
          phase,
          layout.filter((l) => sections.get(l.slug).phase === phase).map((l) => l.slug),
        ]),
      ),
      sections: layout.map((item) => {
        const meta = sections.get(item.slug)
        return {
          slug: item.slug,
          id: meta.id,
          title: meta.title,
          phase: meta.phase,
          component: meta.component,
          data: meta.data,
          dataExport: meta.dataExport,
          carriesNavy: Boolean(meta.carriesNavy),
          tone: item.tone,
          rhythm: item.rhythm,
          tones: meta.tones,
          rhythms: meta.rhythms,
          /**
           * Impressão digital do arquivo de dados **de exemplo** da biblioteca.
           * `check:lp` compara com o arquivo da LP: se baterem, a seção entrou na
           * página e ninguém escreveu o conteúdo do cliente nela.
           */
          exampleHash: sha(readFileSync(join(meta.folder, meta.data))),
          ctas: meta.ctas,
          contract: meta.contract,
          assets: meta.assets,
        }
      }),
    },
    null,
    2,
  )}\n`,
  'utf8',
)
written.push('lp.manifest.json')

/* -------------------------------------------------------------- relatório */

const list = (label, items) => {
  if (!items.length) return
  console.log(`\n  ${label}`)
  for (const item of items) console.log(`    ${item}`)
}

list('escritos', written)
list('preservados (conteúdo já preenchido — use --force para voltar ao exemplo)', kept)
list('removidos (saíram da composição)', removed)

console.log(
  '\n  Próximo passo: preencha src/data/sections/*.ts e rode npm run check:lp\n' +
    '  (o check valida a página contra lp.manifest.json)\n',
)

/* --------------------------------------------------------------- render */

/** Gera `src/pages/index.astro` a partir da composição resolvida. */
function renderPage(layout, sections) {
  const imports = layout
    .map((item) => {
      const meta = sections.get(item.slug)
      const name = basename(meta.component, '.astro')
      return `import ${name} from '../components/sections/${meta.component}'`
    })
    .join('\n')

  const body = layout
    .map((item) => {
      const meta = sections.get(item.slug)
      const name = basename(meta.component, '.astro')
      return `    <${name} tone="${item.tone}" rhythm="${item.rhythm}" />`
    })
    .join('\n')

  return `---
/**
 * ARQUIVO GERADO — não edite à mão.
 *
 * Saiu de \`npm run compose\`, que resolve a composição da biblioteca de seções e
 * grava \`lp.manifest.json\`. Para mudar a página, mude a composição:
 *
 *   npm run compose -- <slugs da composição nova>
 *
 * Header, Hero, Cotação e Footer são estrutura fixa do padrão (regra 13) e estão
 * fora da biblioteca. Os dois slots de shortcode saem de \`site.ts\`.
 */
import Layout from '../layouts/Layout.astro'
import Header from '../components/Header.astro'
import Hero from '../components/Hero.astro'
import QuoteForm from '../components/QuoteForm.astro'
import Footer from '../components/Footer.astro'
${imports}
import { shortcodes } from '../data/site'
---

<Layout>
  <Header />

  <main id="main">
    <Hero>
      <Fragment slot="shortcode">{shortcodes.chat}</Fragment>
    </Hero>
${body}
    <QuoteForm>
      <Fragment slot="shortcode">{shortcodes.form}</Fragment>
    </QuoteForm>
  </main>

  <Footer />
</Layout>
`
}
