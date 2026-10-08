#!/usr/bin/env node
/**
 * check:lp — verifica as regras do padrão B2 v2 (PROMPT-PADRAO-LP, item 13).
 * Falha (exit 1) se qualquer regra for violada. Roda no CI antes do build.
 *
 * Duas famílias de verificação:
 *
 *   A. ESTRUTURA FIXA — Header, Hero, Cotação, Footer, CTAs, imagens, cabeçalhos,
 *      acessibilidade, `site.ts` e a palavra-chave da campanha. Idêntico em toda LP,
 *      não depende da composição.
 *
 *   B. COMPOSIÇÃO — confronta a página com `lp.manifest.json`: as seções presentes,
 *      a ordem das fases, os blocos navy, a alternância de fundos, o respiro entre
 *      vizinhas e o contrato de conteúdo de cada seção escolhida.
 *
 * `lp.manifest.json` é gerado por `npm run compose`. Editar a página à mão e não
 * recompor faz a família B falhar — de propósito.
 */
import { readFileSync, readdirSync, statSync, mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join, relative, extname, basename } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createHash } from 'node:crypto'
import ts from 'typescript'

import {
  MID_PHASES,
  TONES,
  RHYTHMS,
  CONVERSION_TONE,
  CONVERSION_RHYTHM,
  MIN_TOP_AFTER_HERO,
  phaseById,
  checkGap,
  effectiveTop,
} from '../src/lib/rhythm.mjs'
import { findPhrase, missingWords } from './lib/keyword.mjs'

const ROOT = process.cwd()
const SRC = join(ROOT, 'src')

/**
 * `--allow-example` rebaixa "conteúdo de exemplo" de erro para aviso. Só o próprio
 * template do starter passa essa flag: ele existe justamente para carregar os
 * exemplos da biblioteca. `new-lp.mjs` remove a flag ao criar uma LP, de modo que
 * numa LP de cliente publicar com "Linha de produto 1" quebra o build.
 */
const ALLOW_EXAMPLE = process.argv.includes('--allow-example')

const errors = []
const warnings = []
const fail = (file, msg) => errors.push(`${relative(ROOT, file)}: ${msg}`)
const warn = (file, msg) => warnings.push(`${relative(ROOT, file)}: ${msg}`)

function walk(dir, exts) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...walk(p, exts))
    else if (exts.includes(extname(p))) out.push(p)
  }
  return out
}

const astroFiles = walk(SRC, ['.astro'])
const rawRead = (f) => readFileSync(f, 'utf8')
/** Markup sem o frontmatter e sem comentários, para não casar regras com texto de comentário. */
const read = (f) => {
  let s = rawRead(f)
  s = s.replace(/^---[\s\S]*?^---/m, '')
  s = s.replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
  s = s.replace(/<!--[\s\S]*?-->/g, '')
  return s
}

const PAGE = join(SRC, 'pages', 'index.astro')
const MANIFEST = join(ROOT, 'lp.manifest.json')

/* ========================================================================
   A. ESTRUTURA FIXA
   ===================================================================== */

/* A1. Nenhum <a href="#"> ou href="javascript:" ---------------------------- */
for (const f of astroFiles) {
  const s = read(f)
  if (/<a\b[^>]*href=["'](#["']|javascript:)/i.test(s))
    fail(f, 'link com href="#" ou javascript: — CTAs devem ser <button class="btn-slave-whats">')
}

/* A2. Todo botão btn-slave-whats tem data-cta; todo botão tem papel claro ---- */
for (const f of astroFiles) {
  const s = read(f)
  const tags = s.match(/<button\b[\s\S]*?>/g) ?? []
  for (const tag of tags) {
    const isSlave = /btn-slave-whats/.test(tag)
    const hasCta = /data-cta=/.test(tag)
    if (isSlave && !hasCta) fail(f, `botão btn-slave-whats sem data-cta: ${tag.slice(0, 80)}…`)
    if (!isSlave && !hasCta && !/role="tab"|data-(why|rail)-(prev|next)/.test(tag)) {
      warn(f, `botão sem btn-slave-whats nem papel de UI (tab/seta): ${tag.slice(0, 80)}…`)
    }
  }
}

/* A3. data-cta únicos (fora de .map) e no formato secao-elemento ------------- */
const declaredCtas = new Map()
{
  // Dois caminhos até o mesmo atributo: `data-cta` escrito à mão e a prop `cta` do
  // Button.astro, que o vira em `data-cta`. Os dois entram na mesma checagem.
  const patterns = [
    /data-cta=(?:"([^"]+)"|\{`([^`]+)`\}|\{([^}]+)\})/g,
    /<Button\b[^>]*?\bcta=(?:"([^"]+)"|\{`([^`]+)`\}|\{([^}]+)\})/g,
  ]
  for (const f of astroFiles) {
    const s = read(f)
    for (const pattern of patterns) {
      for (const m of s.matchAll(pattern)) {
        const val = m[1] ?? m[2] ?? m[3]
        if (m[1] && !/^[a-z0-9]+-[a-z0-9-]+$/.test(m[1]))
          fail(f, `CTA "${m[1]}" fora do formato secao-elemento`)
        if (m[1]) {
          if (declaredCtas.has(m[1]))
            fail(f, `CTA "${m[1]}" duplicado (também em ${declaredCtas.get(m[1])})`)
          declaredCtas.set(m[1], relative(ROOT, f))
        }
        if (m[2] && !/\$\{/.test(m[2])) fail(f, `CTA template sem variável: ${val}`)
      }
    }
  }
}

/* A4. Arquivo com transition/animation precisa de prefers-reduced-motion ---- */
for (const f of astroFiles) {
  const s = read(f)
  const style = s.match(/<style[\s\S]*?<\/style>/g)?.join('\n') ?? ''
  const hasMotion = /transition\s*:|animation\s*:/.test(style)
  if (hasMotion && !/prefers-reduced-motion/.test(style))
    fail(f, '<style> com transition/animation sem @media (prefers-reduced-motion: reduce)')
}

/* A5. Um único h1; cada seção com id tem h2; <main id="main"> ---------------- */
{
  let h1 = 0
  for (const f of astroFiles) h1 += (read(f).match(/<h1\b/g) ?? []).length
  if (h1 !== 1) fail(join(SRC, 'components'), `esperado exatamente 1 <h1>, encontrado ${h1}`)

  // Só seções com id literal: `id={id}` é o primitivo Section.astro, que não tem copy.
  for (const f of astroFiles) {
    const s = read(f)
    const hasSectionId = /<(?:section|Section)\b[^>]*\bid="[^"]+"/.test(s)
    if (hasSectionId && !/<h2\b|<SectionHeader\b/.test(s))
      fail(f, 'seção com id sem <h2> (nem <SectionHeader>)')
  }

  if (!/<main id="main"/.test(read(PAGE))) fail(PAGE, 'falta <main id="main"> (alvo do skip link)')
}

/* A6. Imagens: alt obrigatório; lazy exceto o banner do hero ------------------ */
for (const f of astroFiles) {
  const s = read(f)
  const tags = s.match(/<(Image|Picture)\s[\s\S]*?\/>/g) ?? []
  for (const tag of tags) {
    if (!/\balt=/.test(tag)) fail(f, `<${tag.match(/<(\w+)/)[1]}> sem alt`)
    const eager = /loading="eager"/.test(tag)
    const lazy = /loading="lazy"/.test(tag)
    if (!eager && !lazy) fail(f, `imagem sem loading= explícito: ${tag.slice(0, 60)}…`)
    if (eager && !/Hero\.astro|Header\.astro/.test(f))
      fail(f, 'loading="eager" só é permitido no banner do Hero e no logo do Header')
  }
}

/* A7. Slots de shortcode presentes na página --------------------------------- */
{
  const slots = (read(PAGE).match(/slot="shortcode"/g) ?? []).length
  if (slots !== 2) fail(PAGE, `esperados 2 slots shortcode (hero + cotação), encontrados ${slots}`)
}

/* A8. Estrutura fixa: assinaturas do Header, Hero, Cotação e Footer ---------- */
{
  const expect = {
    'Header.astro': ['sticky top-0 z-50', '-mt-3 -mb-10', 'rounded-b-xl', 'data-cta="header-cta"'],
    'Hero.astro': [
      'grid-template-columns: minmax(0, 1fr) 270px 300px',
      'right: var(--page-edge)',
      'width: 1700px',
      'lg:w-[300px]',
      'data-hero-grid',
      'fetchpriority="high"',
    ],
    'QuoteForm.astro': [
      'id="cotacao"',
      'lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]',
      'order-2 w-full lg:order-1',
      'data-cta="cotacao-whatsapp"',
    ],
    'Footer.astro': [
      'navy-premium border-t border-white/15',
      'getFullYear()',
      '<address',
      'noopener noreferrer',
    ],
  }
  for (const [name, needles] of Object.entries(expect)) {
    const f = join(SRC, 'components', name)
    let s
    try {
      s = rawRead(f)
    } catch {
      fail(f, 'arquivo da estrutura fixa não existe')
      continue
    }
    for (const n of needles) if (!s.includes(n)) fail(f, `estrutura fixa alterada: falta "${n}"`)
  }

  // A seção de Cotação é a única que pode trazer o ritmo de fechamento embutido.
  const quote = rawRead(join(SRC, 'components', 'QuoteForm.astro'))
  if (!quote.includes(RHYTHMS[CONVERSION_RHYTHM].class))
    fail(
      join(SRC, 'components', 'QuoteForm.astro'),
      `a Cotação deve usar o ritmo de fechamento "${RHYTHMS[CONVERSION_RHYTHM].class}"`,
    )
  if (!quote.includes(TONES[CONVERSION_TONE].class))
    fail(
      join(SRC, 'components', 'QuoteForm.astro'),
      `a Cotação deve usar o fundo "${TONES[CONVERSION_TONE].class}"`,
    )
}

/* A9. rhythm.mjs e layout.ts não podem divergir ----------------------------- */
{
  const layoutTs = rawRead(join(SRC, 'lib', 'layout.ts'))
  const declared = (regex) => [...layoutTs.matchAll(regex)].map((m) => m[1])
  const tonesTs = declared(/'(light|gray)'/g)
  for (const tone of Object.keys(TONES))
    if (!tonesTs.includes(tone)) fail(join(SRC, 'lib', 'layout.ts'), `falta o tom "${tone}"`)
  for (const rhythm of Object.keys(RHYTHMS)) {
    if (rhythm === CONVERSION_RHYTHM) continue // só a estrutura fixa usa
    if (!layoutTs.includes(`'${rhythm}'`))
      fail(join(SRC, 'lib', 'layout.ts'), `falta o ritmo "${rhythm}"`)
  }
}

/* ========================================================================
   Carregamento dos dados (TS transpilado em memória)
   ===================================================================== */

const CACHE = join(ROOT, 'node_modules', '.cache', 'lp-check')

/** Transpila um `.ts` de dados para `.mjs`, neutralizando imports do Vite. */
function transpile(file, outName) {
  let src = read(file)
  // Imagens viram stubs: não há pipeline do Astro aqui.
  src = src.replace(
    /^import\s+(\w+)\s+from\s+'(?:@assets|\.\.\/assets|\.\.\/\.\.\/assets)\/[^']+'\s*$/gm,
    "const $1 = { src: '', width: 1, height: 1, format: 'png' }",
  )
  // Imports locais apontam para os .mjs achatados no mesmo diretório de cache.
  src = src.replace(/from\s+'@data\/([\w-]+)'/g, "from './$1.mjs'")
  src = src.replace(/from\s+'\.\/(site|icons|content|types|brands)'/g, "from './$1.mjs'")
  src = src.replace(/from\s+'\.\.\/([\w-]+)'/g, "from './$1.mjs'")

  const out = ts.transpileModule(src, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      verbatimModuleSyntax: false,
    },
  }).outputText

  writeFileSync(join(CACHE, outName), out)
}

const sectionDataDir = join(SRC, 'data', 'sections')
const sectionDataFiles = existsSync(sectionDataDir)
  ? readdirSync(sectionDataDir).filter((f) => f.endsWith('.ts'))
  : []

let data = null
try {
  mkdirSync(CACHE, { recursive: true })

  // `types.ts` só exporta tipos; um módulo vazio basta para satisfazer o import.
  writeFileSync(join(CACHE, 'types.mjs'), 'export {}\n')

  for (const name of ['site.ts', 'icons.ts', 'content.ts', 'brands.ts']) {
    const path = join(SRC, 'data', name)
    if (existsSync(path)) transpile(path, name.replace('.ts', '.mjs'))
  }
  for (const name of sectionDataFiles) {
    transpile(join(sectionDataDir, name), name.replace('.ts', '.mjs'))
  }

  const load = async (name) => import(pathToFileURL(join(CACHE, name)).href)

  data = {
    site: await load('site.mjs'),
    icons: await load('icons.mjs'),
    content: await load('content.mjs'),
    sections: Object.fromEntries(
      await Promise.all(
        sectionDataFiles.map(async (name) => [
          basename(name, '.ts'),
          await load(name.replace('.ts', '.mjs')),
        ]),
      ),
    ),
  }
} catch (e) {
  fail(join(SRC, 'data'), `não foi possível avaliar os arquivos de dados: ${e.message}`)
}

/* A10. site.ts: valores e limites ------------------------------------------- */
if (data) {
  const sf = join(SRC, 'data', 'site.ts')
  const { site, description, title, whatsapp, shortcodes } = data.site

  if (!/^https:\/\//.test(site.url))
    fail(sf, `site.url deve ser absoluta (https://…), está "${site.url}"`)
  if (description.length > 160)
    fail(sf, `description com ${description.length} caracteres (máx. 160)`)
  if (title.length > 70) warn(sf, `title com ${title.length} caracteres (ideal ≤ 70)`)
  if (whatsapp && !/^\d{12,13}$/.test(whatsapp))
    fail(sf, 'whatsapp deve ter só dígitos com DDI+DDD (12–13 dígitos)')
  if (!shortcodes?.chat || !shortcodes?.form)
    fail(sf, 'shortcodes.chat e shortcodes.form são obrigatórios (a página lê os dois daqui)')
}

/* A11. Conteúdo de exemplo não pode chegar ao ar ----------------------------- */

/**
 * O erro mais provável e mais caro de uma entrega é publicar com o texto de
 * exemplo da biblioteca. Duas redes:
 *
 *   1. arquivo de dados byte a byte igual ao exemplo (`exampleHash` do manifesto)
 *      → a seção entrou na página e ninguém escreveu nada nela;
 *   2. rastros de exemplo soltos, para pegar o preenchimento parcial — três
 *      linhas de produto reais e a quarta esquecida como "Linha de produto 4".
 */
const EXAMPLE_TOKENS = [
  /Empresa Exemplo/,
  /exemplo\.com\.br/,
  /Rua Exemplo/,
  /Linha de produto \d/,
  /Produto da linha \d/,
  /\bLinha \d\b/,
  /Marca [A-Z]\b/,
  /\bMarca \d\b/,
  /\bCliente \d\b/,
  /\bModelo \d\b/,
  /Produtos industriais para/,
  /substitua pela foto real/,
]

const flagExample = (file, msg) => (ALLOW_EXAMPLE ? warn(file, msg) : fail(file, msg))

/** Mesma impressão digital que o `compose` grava: insensível a fim de linha. */
const sha = (text) =>
  createHash('sha256').update(text.replace(/\r\n/g, '\n')).digest('hex').slice(0, 16)

/* A12. Imagens: nem de exemplo, nem fora da especificação ------------------- */

const ASSETS = join(SRC, 'assets')
const IMAGENS = /\.(png|jpe?g|webp|avif|svg)$/i

/** Assinatura de arquivo binário. Igual à que `scripts/placeholders.mjs` calcula. */
const signFile = (file) =>
  createHash('sha256').update(readFileSync(file)).digest('hex').slice(0, 16)

function walkFiles(dir) {
  if (!existsSync(dir)) return []
  const out = []
  for (const nome of readdirSync(dir)) {
    const p = join(dir, nome)
    if (statSync(p).isDirectory()) out.push(...walkFiles(p))
    else if (IMAGENS.test(nome)) out.push(p)
  }
  return out
}

const imagens = walkFiles(ASSETS)

/**
 * Nenhuma imagem de exemplo pode ir ao ar.
 *
 * O texto já tinha essa rede; a imagem não tinha. Uma LP com todo o copy real e as
 * fotos ainda placeholder passava na verificação e ia para o ar com "substitua pela
 * foto real" na tela. O caso que realmente acontece não é a página inteira e sim
 * uma foto esquecida — a oitava aba de segmentos, que ninguém clicou na revisão.
 */
{
  const lista = join(ROOT, 'placeholders.json')
  if (!existsSync(lista)) {
    warn(lista, 'não existe — sem ele não dá para detectar imagem de exemplo')
  } else {
    const { placeholders } = JSON.parse(rawRead(lista))
    for (const file of imagens) {
      const origem = placeholders[signFile(file)]
      if (origem)
        flagExample(
          file,
          `ainda é a imagem de exemplo do padrão (${origem}) — substitua pelo arquivo do cliente`,
        )
    }
  }
}

/**
 * A imagem entregue cumpre a especificação da seção?
 *
 * Aviso, nunca erro: é orientação para quem produz o arquivo. O caso que mais
 * aparece é a foto "recortada" que chega com fundo branco — ela vira um retângulo
 * claro colado no bloco navy, e só se percebe olhando a página pronta.
 *
 * Usa o `sharp` que o Astro já traz para otimizar imagem. Se não carregar, a
 * verificação é pulada: ela é um extra, não pode derrubar o build.
 */
async function checkAssetSpecs(manifest) {
  if (!manifest || !imagens.length) return

  const specs = []
  for (const s of manifest.sections ?? []) {
    for (const a of s.assets ?? []) {
      if (a.width || a.alpha !== undefined) specs.push({ ...a, slug: s.slug })
    }
  }
  specs.push(...FIXED_ASSET_SPECS)
  if (!specs.length) return

  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    return // sem sharp, sem esta verificação
  }

  for (const file of imagens) {
    const rel = relative(ASSETS, file).split(/[\\/]/).join('/')
    const dirDoArquivo = rel.includes('/') ? rel.slice(0, rel.lastIndexOf('/')) : '.'
    const spec = specs.find(
      (s) => s.dir === dirDoArquivo && (!s.match || basename(rel).startsWith(s.match)),
    )
    if (!spec) continue

    let meta, stats
    try {
      const img = sharp(file)
      meta = await img.metadata()
      stats = await img.stats()
    } catch {
      continue // formato que o sharp não lê (svg animado etc.)
    }

    if (spec.width && spec.height && meta.width && meta.height) {
      const alvo = spec.width / spec.height
      const real = meta.width / meta.height
      if (Math.abs(real - alvo) / alvo > 0.05)
        warn(
          file,
          `proporção ${meta.width}×${meta.height} não bate com a esperada ` +
            `${spec.width}×${spec.height} — a imagem vai ser cortada ou distorcida`,
        )
      if (meta.width < spec.width * 0.8)
        warn(
          file,
          `${meta.width}px de largura para um espaço de ${spec.width}px — ` +
            'vai ser ampliada e perder nitidez',
        )
    }

    if (spec.alpha === true && (!meta.hasAlpha || stats.isOpaque))
      warn(
        file,
        'precisa vir recortada, com fundo transparente — do jeito que está, ' +
          'aparece como um retângulo de fundo sólido sobre o layout',
      )
  }
}

/** Especificação das imagens da estrutura fixa, que não pertencem a nenhuma seção. */
const FIXED_ASSET_SPECS = [
  { dir: '.', match: 'LOGO', width: 240, height: 200, alpha: true },
  { dir: '.', match: 'heroBg', width: 1981, height: 900, alpha: false },
  { dir: 'brands', width: 400, height: 160, alpha: null },
]

function checkExampleContent(files) {
  for (const file of files) {
    if (!existsSync(file)) continue
    const raw = rawRead(file)
    const hits = EXAMPLE_TOKENS.filter((re) => re.test(raw)).map((re) => re.source)
    if (hits.length)
      flagExample(
        file,
        `conteúdo de exemplo da biblioteca ainda presente (${hits.slice(0, 3).join(', ')}` +
          `${hits.length > 3 ? `, +${hits.length - 3}` : ''}) — substitua pelo conteúdo do cliente`,
      )
  }
}

/* A13. Palavra-chave da campanha no H1 e no title ---------------------------- */

/**
 * Quem clica no anúncio digitou a palavra-chave antes; se a primeira dobra não a
 * repete, a pessoa volta para o Google. O briefing a trata como a única
 * correspondência que não se negocia — por isso é erro, e não aviso.
 *
 * `null` é decisão registrada (a LP não tem campanha). Vazio é entrada esquecida e
 * conta como conteúdo de exemplo: erro numa LP, aviso no template do starter.
 */
if (data) {
  const sf = join(SRC, 'data', 'site.ts')
  const cf = join(SRC, 'data', 'content.ts')
  const { campaign, title } = data.site
  const keyword = campaign?.mainKeyword

  if (!campaign) {
    fail(sf, 'falta o export `campaign` (palavra-chave da campanha, entrada 15 da entrevista)')
  } else if (keyword === null) {
    warn(
      sf,
      'LP sem palavra-chave de campanha (campaign.mainKeyword: null) — H1 e title não ' +
        'foram conferidos contra o que a campanha compra',
    )
  } else if (!String(keyword ?? '').trim()) {
    flagExample(
      sf,
      'campaign.mainKeyword vazia — preencha com a palavra-chave principal da campanha, ' +
        'ou use null se a LP não tem campanha',
    )
  } else {
    for (const [file, label, text] of [
      [cf, 'o H1 (hero.title)', data.content.hero?.title],
      [sf, 'o title (título da aba)', title],
    ]) {
      const missing = missingWords(text, keyword)
      if (missing.length)
        fail(
          file,
          `${label} "${text}" não contém a palavra-chave principal "${keyword}" — ` +
            `falta: ${missing.join(', ')}`,
        )
    }
  }
}

/* A14. Negativas da campanha no texto da página ------------------------------ */

/**
 * Termo que a campanha exclui não deveria ser assunto da página: em correspondência
 * ampla e em PMAX, o texto da LP também orienta a quem o anúncio é mostrado.
 *
 * Aviso, e não erro, porque a palavra pode estar em outro sentido — "usado" como
 * negativa (equipamento de segunda mão) e "amplamente usado em redutores" numa
 * descrição. Quem lê o trecho decide.
 */
const NOT_COPY = new Set(['id', 'icon', 'group', 'src', 'url', 'privacyUrl', 'standardVersion'])

/** Todo texto de um módulo de dados, com o caminho até ele. Ids, ícones e URLs ficam de fora. */
function collectCopy(node, path, out = []) {
  if (typeof node === 'string') out.push({ path, text: node })
  else if (Array.isArray(node)) node.forEach((v, i) => collectCopy(v, `${path}[${i}]`, out))
  else if (node && typeof node === 'object')
    for (const [key, val] of Object.entries(node))
      if (!NOT_COPY.has(key) && !key.endsWith('Icon'))
        collectCopy(val, path ? `${path}.${key}` : key, out)
  return out
}

/** O texto da página que vem dos dados: site.ts, content.ts e as seções compostas. */
function pageCopy() {
  const { site, title, description } = data.site
  const sources = [
    [join(SRC, 'data', 'site.ts'), { site, title, description }],
    [join(SRC, 'data', 'content.ts'), data.content],
    ...Object.entries(data.sections).map(([name, mod]) => [
      join(sectionDataDir, `${name}.ts`),
      mod,
    ]),
  ]
  return sources.flatMap(([file, mod]) => collectCopy(mod, '').map((entry) => ({ file, ...entry })))
}

/** Cada campo em que um termo aparece, uma vez só: "Marca A, Marca B" é um lugar a reescrever. */
function findTerm(copy, term) {
  return copy.flatMap(({ file, path, text }) => {
    const hits = findPhrase(text, term)
    if (!hits.length) return []
    const count = hits.length > 1 ? ` (${hits.length}×)` : ''
    return [{ file, where: `${path}${count}: "…${hits[0]}…"` }]
  })
}

if (data && data.site.campaign?.negatives?.length) {
  const copy = pageCopy()
  for (const negative of data.site.campaign.negatives)
    for (const { file, where } of findTerm(copy, negative))
      warn(
        file,
        `"${negative}" é negativa da campanha e aparece em ${where} — ` +
          'se for o sentido que a campanha exclui, reescreva',
      )
}

/* A15. Claims proibidos pelo briefing ---------------------------------------- */

/**
 * O que o briefing proíbe afirmar — "autorizado", "distribuidor", um percentual sem
 * comprovação — não pode ir ao ar em texto nenhum, nem em alt. Diferente da
 * negativa, aqui não há outro sentido inocente: o risco é jurídico e de relação com
 * a marca. Por isso é erro. O termo só sai da lista com autorização registrada.
 *
 * `forbidden` ausente (LP de antes da v2.7.0) vale como lista vazia.
 */
if (data && data.site.campaign?.forbidden?.length) {
  const copy = pageCopy()
  for (const term of data.site.campaign.forbidden)
    for (const { file, where } of findTerm(copy, term))
      fail(
        file,
        `"${term}" é claim proibido pelo briefing e aparece em ${where} — reescreva sem ` +
          'ele; só tire da lista com a autorização registrada no BRIEFING.md',
      )
}

/* ========================================================================
   B. COMPOSIÇÃO
   ===================================================================== */

let manifest = null
if (!existsSync(MANIFEST)) {
  fail(MANIFEST, 'não existe — rode `npm run compose -- <seções>` para montar a página')
} else {
  try {
    manifest = JSON.parse(rawRead(MANIFEST))
  } catch (e) {
    fail(MANIFEST, `JSON inválido: ${e.message}`)
  }
}

if (manifest) {
  const list = manifest.sections ?? []

  /* B1. Ordem das fases ---------------------------------------------------- */
  {
    const order = list.map((s) => MID_PHASES.indexOf(s.phase))
    if (order.some((p) => p < 0)) fail(MANIFEST, 'seção com fase fora das fases de biblioteca')
    for (let i = 1; i < order.length; i++) {
      if (order[i] < order[i - 1])
        fail(
          MANIFEST,
          `"${list[i].slug}" (${list[i].phase}) aparece depois de "${list[i - 1].slug}" ` +
            `(${list[i - 1].phase}): a ordem das fases é fixa (${MID_PHASES.join(' → ')})`,
        )
    }
  }

  /* B2. Mínimo, máximo e bloco navy por fase ------------------------------- */
  for (const phase of MID_PHASES) {
    const def = phaseById(phase)
    const inPhase = list.filter((s) => s.phase === phase)
    if (inPhase.length < def.min)
      fail(MANIFEST, `fase "${phase}" com ${inPhase.length} seção(ões); mínimo ${def.min}`)
    if (inPhase.length > def.max)
      fail(MANIFEST, `fase "${phase}" com ${inPhase.length} seções; máximo ${def.max}`)
    if (def.needsNavyCarrier) {
      const carriers = inPhase.filter((s) => s.carriesNavy).length
      if (carriers !== 1)
        fail(MANIFEST, `fase "${phase}" precisa de exatamente 1 bloco navy; tem ${carriers}`)
    }
  }

  /* B3. Alternância de fundos e blocos navy -------------------------------- */
  {
    const tones = list.map((s) => s.tone)
    for (const [i, tone] of tones.entries())
      if (!TONES[tone]) fail(MANIFEST, `"${list[i].slug}": tom "${tone}" não existe`)

    const switches = tones.filter((t, i) => i > 0 && t !== tones[i - 1]).length
    if (switches !== 1)
      fail(
        MANIFEST,
        `o fundo deve trocar exatamente uma vez (branco → cinza); trocou ${switches} vez(es): ` +
          tones.join(' → '),
      )
    if (tones[0] !== 'light' || tones[tones.length - 1] !== 'gray')
      fail(
        MANIFEST,
        'a sequência de fundos vai de branco (depois do hero navy) a cinza (antes da ' +
          `cotação cinza); está ${tones[0]} → ${tones[tones.length - 1]}`,
      )

    const cut = tones.indexOf('gray')
    for (const [label, run] of [
      ['primeira metade (branca)', list.slice(0, cut)],
      ['segunda metade (cinza)', list.slice(cut)],
    ]) {
      const carriers = run.filter((s) => s.carriesNavy).length
      if (carriers !== 1)
        fail(
          MANIFEST,
          `a ${label} precisa de exatamente 1 seção com bloco navy e tem ${carriers} — ` +
            'é o respiro escuro que sustenta o ritmo da página',
        )
    }

    for (let i = 1; i < list.length; i++)
      if (list[i].carriesNavy && list[i - 1].carriesNavy)
        fail(MANIFEST, `"${list[i - 1].slug}" e "${list[i].slug}" são dois blocos navy vizinhos`)
  }

  /* B4. Respiro vertical --------------------------------------------------- */
  {
    for (const s of list)
      if (!RHYTHMS[s.rhythm]) fail(MANIFEST, `"${s.slug}": ritmo "${s.rhythm}" não existe`)

    if (list.length && RHYTHMS[list[0].rhythm]) {
      const top = effectiveTop(list[0].rhythm)
      if (top < MIN_TOP_AFTER_HERO)
        fail(
          MANIFEST,
          `"${list[0].slug}" abre a página com ${top}px de respiro; o mínimo depois do ` +
            `hero é ${MIN_TOP_AFTER_HERO}px`,
        )
    }

    for (const [i, s] of list.entries())
      if (RHYTHMS[s.rhythm]?.mustBeLast && i !== list.length - 1)
        fail(
          MANIFEST,
          `"${s.slug}" tem cards que avançam sobre a seção seguinte e só funciona ` +
            'imediatamente antes da Cotação',
        )

    const chain = [...list, { slug: 'cotacao', tone: CONVERSION_TONE, rhythm: CONVERSION_RHYTHM }]
    for (let i = 1; i < chain.length; i++) {
      if (!RHYTHMS[chain[i - 1].rhythm] || !RHYTHMS[chain[i].rhythm]) continue
      const { ok, gap, range } = checkGap(chain[i - 1], chain[i])
      if (!ok)
        fail(
          MANIFEST,
          `respiro entre "${chain[i - 1].slug}" e "${chain[i].slug}" é ${gap}px, fora da ` +
            `faixa ${range[0]}–${range[1]}px (${
              chain[i - 1].tone === chain[i].tone ? 'mesmo fundo' : 'fundo muda'
            })`,
        )
    }

    // Ritmo resolvido tem de estar entre os que a seção declara suportar.
    for (const s of list) {
      if (s.rhythms && !s.rhythms.includes(s.rhythm))
        fail(
          MANIFEST,
          `"${s.slug}": ritmo "${s.rhythm}" não está entre os suportados (${s.rhythms})`,
        )
      if (s.tones && !s.tones.includes(s.tone))
        fail(MANIFEST, `"${s.slug}": tom "${s.tone}" não está entre os suportados (${s.tones})`)
    }
  }

  /* B5. Página bate com o manifesto --------------------------------------- */
  {
    const page = read(PAGE)
    const rendered = [...page.matchAll(/<(\w+)\s+tone="(\w+)"\s+rhythm="([\w-]+)"\s*\/>/g)].map(
      (m) => ({ component: `${m[1]}.astro`, tone: m[2], rhythm: m[3] }),
    )

    if (rendered.length !== list.length) {
      fail(
        PAGE,
        `a página renderiza ${rendered.length} seção(ões) de biblioteca e o manifesto tem ` +
          `${list.length} — rode \`npm run compose -- --recompose\``,
      )
    } else {
      for (const [i, item] of list.entries()) {
        const got = rendered[i]
        if (got.component !== item.component)
          fail(
            PAGE,
            `posição ${i + 1}: página tem ${got.component}, manifesto tem ${item.component}`,
          )
        else if (got.tone !== item.tone || got.rhythm !== item.rhythm)
          fail(
            PAGE,
            `${item.component}: página tem tone="${got.tone}" rhythm="${got.rhythm}", ` +
              `manifesto tem tone="${item.tone}" rhythm="${item.rhythm}"`,
          )
      }
    }
  }

  /* B6. Arquivos presentes e nenhum órfão --------------------------------- */
  {
    const compDir = join(SRC, 'components', 'sections')
    const expectedComponents = new Set(list.map((s) => s.component))
    const expectedData = new Set(list.map((s) => s.data))

    for (const s of list) {
      const comp = join(compDir, s.component)
      if (!existsSync(comp)) fail(comp, `componente da seção "${s.slug}" não existe`)
      const dataFile = join(sectionDataDir, s.data)
      if (!existsSync(dataFile)) fail(dataFile, `dados da seção "${s.slug}" não existem`)
    }

    if (existsSync(compDir))
      for (const f of readdirSync(compDir))
        if (!expectedComponents.has(f))
          fail(join(compDir, f), 'componente fora da composição — recomponha ou apague (regra 12)')

    for (const f of sectionDataFiles)
      if (!expectedData.has(f))
        fail(join(sectionDataDir, f), 'dados de seção fora da composição — recomponha ou apague')

    // Pasta de assets sem seção correspondente.
    const assetsDir = join(SRC, 'assets')
    const slugs = new Set(list.map((s) => s.slug))
    const reserved = new Set(['brands'])
    for (const entry of readdirSync(assetsDir)) {
      const p = join(assetsDir, entry)
      if (!statSync(p).isDirectory() || reserved.has(entry)) continue
      if (!slugs.has(entry)) fail(p, `assets da seção "${entry}", que não está na composição`)
    }
  }

  /* B7. CTAs declarados no manifesto existem no componente ---------------- */
  {
    const compDir = join(SRC, 'components', 'sections')
    for (const s of list) {
      const comp = join(compDir, s.component)
      if (!existsSync(comp)) continue
      const markup = read(comp)
      for (const pattern of s.ctas ?? []) {
        // O CTA pode estar escrito à mão (`data-cta=`) ou vir da prop `cta` do Button.
        if (pattern.includes('{')) {
          const prefix = pattern.slice(0, pattern.indexOf('{'))
          if (!new RegExp(`(?:data-)?cta=\\{\`${prefix}`).test(markup))
            fail(comp, `falta o CTA por item \`${pattern}\` (template começando em "${prefix}")`)
        } else if (
          !markup.includes(`data-cta="${pattern}"`) &&
          !markup.includes(`cta="${pattern}"`)
        ) {
          fail(comp, `falta o CTA declarado no manifesto: "${pattern}"`)
        }
      }
    }
  }

  /* B8a. Nenhuma seção ficou com o arquivo de exemplo intacto -------------- */
  {
    checkExampleContent([
      join(SRC, 'data', 'site.ts'),
      join(SRC, 'data', 'content.ts'),
      join(SRC, 'data', 'brands.ts'),
      ...list.map((s) => join(sectionDataDir, s.data)),
    ])

    for (const s of list) {
      const file = join(sectionDataDir, s.data)
      if (!s.exampleHash || !existsSync(file)) continue
      if (sha(rawRead(file)) === s.exampleHash)
        flagExample(
          file,
          `seção "${s.slug}" está com o arquivo de dados de exemplo da biblioteca, ` +
            'sem uma única alteração — preencha com o conteúdo do cliente ou tire a seção da composição',
        )
    }
  }

  /* B8. Contrato de conteúdo de cada seção -------------------------------- */
  if (data) {
    const iconNames = new Set(Object.keys(data.icons.iconPaths))

    for (const s of list) {
      const mod = data.sections[basename(s.data, '.ts')]
      const file = join(sectionDataDir, s.data)
      if (!mod) continue

      const content = mod[s.dataExport]
      if (!content) {
        fail(file, `não exporta "${s.dataExport}" (o manifesto da seção espera esse nome)`)
        continue
      }

      checkContract(file, s, content)
      checkIcons(file, content, iconNames)
    }
  }
}

/** Valida um objeto de conteúdo contra o `contract` do manifesto da seção. */
function checkContract(file, section, content) {
  const c = section.contract ?? {}
  const label = `${section.slug}`

  const items = c.itemsPath ? content[c.itemsPath] : null
  if (c.itemsPath && !Array.isArray(items)) {
    fail(file, `${label}: "${c.itemsPath}" deveria ser uma lista`)
    return
  }

  if (items) {
    if (c.itemsMin != null && items.length < c.itemsMin)
      fail(file, `${label}.${c.itemsPath}: ${items.length} item(ns); mínimo ${c.itemsMin}`)
    if (c.itemsMax != null && items.length > c.itemsMax)
      fail(file, `${label}.${c.itemsPath}: ${items.length} itens; máximo ${c.itemsMax}`)

    const ids = items.map((i) => i?.id).filter(Boolean)
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
    if (dupes.length) fail(file, `${label}: id repetido em ${c.itemsPath}: ${dupes.join(', ')}`)

    for (const [i, item] of items.entries()) {
      const at = `${label}.${c.itemsPath}[${i}]`
      for (const field of c.requiredItemFields ?? [])
        if (item?.[field] === undefined) fail(file, `${at}: falta "${field}"`)

      for (const [field, expected] of Object.entries(c.itemArrays ?? {})) {
        const arr = item?.[field]
        if (!Array.isArray(arr) || arr.length !== expected)
          fail(file, `${at}.${field}: esperados ${expected} itens, encontrados ${arr?.length ?? 0}`)
      }

      if (c.cellsMatchColumns && Array.isArray(item?.cells)) {
        const columns = content[c.columnsPath ?? 'columns']?.length
        if (item.cells.length !== columns)
          fail(file, `${at}.cells: ${item.cells.length} célula(s) para ${columns} coluna(s)`)
      }

      for (const [path, suffix] of Object.entries(c.endsWith ?? {})) {
        const field = path.replace('item.', '')
        const val = item?.[field]
        if (typeof val === 'string' && !val.trimEnd().endsWith(suffix))
          fail(file, `${at}.${field}: deveria terminar com "${suffix}"`)
      }
    }

    for (const field of c.exactlyOneTrue ?? []) {
      const n = items.filter((i) => i?.[field] === true).length
      if (n !== 1) fail(file, `${label}: exatamente 1 item com ${field}: true (há ${n})`)
    }
    for (const field of c.atMostOneTrue ?? []) {
      const n = items.filter((i) => i?.[field] === true).length
      if (n > 1) fail(file, `${label}: no máximo 1 item com ${field}: true (há ${n})`)
    }
    if (c.lastItemId && items.at(-1)?.id !== c.lastItemId)
      fail(
        file,
        `${label}: o último item de ${c.itemsPath} deve ter id "${c.lastItemId}" ` +
          `(rota de fuga para contato), está "${items.at(-1)?.id}"`,
      )
  }

  if (c.columnsPath) {
    const columns = content[c.columnsPath]
    if (!Array.isArray(columns)) fail(file, `${label}: "${c.columnsPath}" deveria ser uma lista`)
    else {
      if (c.columnsMin != null && columns.length < c.columnsMin)
        fail(file, `${label}.${c.columnsPath}: ${columns.length} coluna(s); mínimo ${c.columnsMin}`)
      if (c.columnsMax != null && columns.length > c.columnsMax)
        fail(file, `${label}.${c.columnsPath}: ${columns.length} colunas; máximo ${c.columnsMax}`)
    }
  }

  for (const [path, range] of Object.entries(c.alsoCount ?? {})) {
    const arr = content[path]
    if (!Array.isArray(arr)) fail(file, `${label}: "${path}" deveria ser uma lista`)
    else if (arr.length < range[0] || arr.length > range[1])
      fail(
        file,
        `${label}.${path}: ${arr.length} item(ns); esperado entre ${range[0]} e ${range[1]}`,
      )
  }

  // Limites de tamanho: aviso, não erro — copy é decisão editorial.
  for (const [path, max] of Object.entries(c.maxLength ?? {})) {
    if (path.startsWith('item.')) {
      const field = path.slice(5)
      for (const [i, item] of (items ?? []).entries()) {
        const val = item?.[field]
        if (typeof val === 'string' && val.length > max)
          warn(
            file,
            `${label}.${c.itemsPath}[${i}].${field} com ${val.length} caracteres ` +
              `(ideal ≤ ${max}): "${val.slice(0, 40)}…"`,
          )
      }
    } else {
      const val = content[path]
      if (typeof val === 'string' && val.length > max)
        warn(file, `${label}.${path} com ${val.length} caracteres (ideal ≤ ${max})`)
    }
  }
}

/** Todo valor de campo `icon` precisa existir no catálogo de `icons.ts`. */
function checkIcons(file, node, iconNames, path = '') {
  if (Array.isArray(node)) {
    node.forEach((item, i) => checkIcons(file, item, iconNames, `${path}[${i}]`))
    return
  }
  if (!node || typeof node !== 'object') return

  for (const [key, val] of Object.entries(node)) {
    const at = path ? `${path}.${key}` : key
    if ((key === 'icon' || key.endsWith('Icon')) && typeof val === 'string') {
      if (!iconNames.has(val)) fail(file, `ícone "${val}" (em ${at}) não existe em icons.ts`)
    } else if (val && typeof val === 'object') {
      checkIcons(file, val, iconNames, at)
    }
  }
}

// Depende do manifesto, por isso roda no fim.
await checkAssetSpecs(manifest)

/* -------------------------------------------------------------- resultado */
for (const w of warnings) console.log(`⚠  ${w}`)
for (const e of errors) console.log(`✖  ${e}`)
console.log(`\ncheck:lp — ${errors.length} erro(s), ${warnings.length} aviso(s)`)
process.exit(errors.length ? 1 : 0)
