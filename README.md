# LP Template B2 — padrão v1.0.0

Template de landing page B2B industrial da B2 Marketing Industrial. Astro 7 + Tailwind 4, uma rota, integração com WordPress via shortcodes e branch `wp-build`.

Documentos do padrão: `../PROMPT-PADRAO-LP.md` (prompt de entrevista + regras, também copiado para `docs/` de cada LP) e `../docs/ANALISE-LP-PIONEIRA.md` (origem do padrão). Este projeto vive em `PROJETOS/LP-STARTER-B2/template`.

## Como iniciar uma LP nova

1. Na pasta do starter: `node scripts/new-lp.mjs <Cliente> <Produto>` (cria `PROJETOS/LP-<Cliente>-<Produto>`, instala, `git init -b main`).
2. (feito pelo script)
3. (feito pelo script)
4. Se houver briefing do cliente, salve o arquivo em `docs/briefing-cliente/` (qualquer formato: .docx, .pdf, .md, .txt).
5. Cole o **PROMPT-PADRAO-LP.md** no agente. Ele lê o briefing (se houver), monta o mapa de aproveitamento, entrevista você só sobre o que falta, grava tudo em `docs/BRIEFING.md` e só depois altera `src/data/site.ts`, `src/data/content.ts` e `src/assets/`.
6. `npm run verify` antes de qualquer push.

## Onde cada coisa vive

| O quê                                                   | Onde                                                                                  |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Copy de toda a página                                   | `src/data/content.ts`                                                                 |
| Marca, endereço, URL, WhatsApp, política de privacidade | `src/data/site.ts`                                                                    |
| Ícones disponíveis                                      | `src/data/icons.ts`                                                                   |
| Tokens de cor e fonte                                   | `src/styles/global.css` (`@theme`)                                                    |
| Estrutura fixa (não alterar)                            | `Header.astro`, `Hero.astro`, `QuoteForm.astro`, `Footer.astro`                       |
| Seções de conteúdo                                      | `ProductLines`, `SupportPanel`, `ApplicationsGallery`, `SegmentsShowcase`, `WhyBrand` |
| Imagens                                                 | `src/assets/` (nunca em `public/`, exceto favicon)                                    |
| Registro da entrevista                                  | `docs/BRIEFING.md`                                                                    |
| Guia de layout para seções novas                        | `docs/GUIA-LAYOUT.md` (espaçamentos, grids, bordas, sombras, ícones, tipografia)      |
| Screenshots de entrega                                  | `docs/screens/`                                                                       |

## Scripts

| Comando                         | Faz                                                                                                                                                                                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                   | servidor local; abra `http://localhost:4321/?grid=1` para ver as colunas do hero sobre o banner                                                                                                                                             |
| `npm run check:lp`              | verifica as regras do padrão (CTAs, `data-cta`, reduced-motion, h1, ids, imagens, quantidades do conteúdo, estrutura fixa)                                                                                                                  |
| `npm run check`                 | `astro check` (tipos; acusa contagem errada em `content.ts`)                                                                                                                                                                                |
| `npm run lint` / `format:check` | ESLint e Prettier                                                                                                                                                                                                                           |
| `npm run build`                 | gera `dist/`                                                                                                                                                                                                                                |
| `npm run verify`                | `check:lp` + lint + prettier + build, na ordem do CI                                                                                                                                                                                        |
| `npm run screens`               | screenshots 360/768/1440/1920 (+ `?grid=1`) em `docs/screens/`. Requer `npx playwright install chromium` uma vez                                                                                                                            |
| `npm run lh`                    | Lighthouse CI sobre `dist/` com os limites de `lighthouserc.json`. Roda no GitHub Actions a cada push; **no Windows local o `chrome-launcher` falha ao limpar a pasta temporária e não grava o relatório** (bug conhecido). Use o CI ou WSL |

## Rastreamento de CTAs

Todo CTA é `<button type="button" class="btn-slave-whats" data-cta="secao-elemento">`. O plugin de atendimento do WordPress captura o clique; o `data-cta` identifica a origem (`header-cta`, `hero-primary`, `linhas-<id>`, `identificar-cta`, `aplicacoes-<id>`, `segmentos-<id>`, `diferenciais-cta`, `cotacao-whatsapp`, `float-whatsapp`). Configure o GTM/GA4 do cliente para ler esse atributo.

## Banner do hero

O banner é feito para o grid, não o contrário. Arquivo `src/assets/heroBg.png`, 1981×900, assunto entre 62% e 79% da largura (centro em 70%), lado esquerdo escuro. O placeholder atual já mostra as zonas; use-o como guia para o designer. Valide com `?grid=1` em 1440 e 1920 px.

## Publicação

Push em `main` → GitHub Actions roda `check:lp`, lint, prettier e build → `dist/` é publicado na branch órfã `wp-build` → o plugin B2 LP Publisher lê de lá. Sem `basePath`; `site.url` deve ser a URL final absoluta.

## O que não fazer

- Não criar `<a href="#">` nem `onClick` em CTAs.
- Não colocar conteúdo na coluna 2 do hero.
- Não mudar grid, medidas ou ordem de Header, Hero, Cotação e Footer.
- Não deixar componente, asset ou utility sem uso.
- Não usar pasta `staging/` com scripts de patch: exploração de layout é branch + PR.
