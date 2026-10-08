# Guia de layout e estrutura — padrão B2 v2.7.1

Referência para criar **seções da biblioteca** e qualquer card, painel ou lista que ainda não exista. Todos os valores abaixo são os que o padrão já usa; uma seção nova que os respeite parece nativa. Classes em Tailwind 4; valores em px entre parênteses.

Regra geral: **escolha na escala, nunca invente um número**. Se o valor que você quer não está nas tabelas, use o vizinho mais próximo.

## 0. O que a seção não decide

Desde a v2, duas coisas **não** pertencem à seção:

|                                   | Quem decide                     | Onde                 |
| --------------------------------- | ------------------------------- | -------------------- |
| Fundo (`bg-`)                     | a composição, via prop `tone`   | `src/lib/rhythm.mjs` |
| Padding vertical (`pt`/`pb`/`py`) | a composição, via prop `rhythm` | `src/lib/rhythm.mjs` |

Toda seção da biblioteca recebe `tone` e `rhythm` e repassa para o primitivo `<Section>`, que aplica as classes e monta o contêiner. Uma seção que traz `bg-` ou `py-` na tag raiz quebra a alternância de fundos da página e `npm run check:lp` acusa.

As tabelas da seção 2 abaixo continuam sendo a fonte dos pares de padding — a diferença é que agora elas estão codificadas em `rhythm.mjs` como ritmos nomeados, e é o compositor que escolhe qual cabe em cada posição.

---

## 1. Container, larguras e breakpoints

| Item                                   | Valor                                                                                                                             |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Container de toda seção                | `mx-auto max-w-page px-6 lg:px-10` → 1320px máx, gutter 24px mobile / 40px desktop                                                |
| Largura útil no desktop (≥1320)        | 1240px                                                                                                                            |
| Breakpoints usados                     | `sm` 640 · `lg` 1024 · `xl` 1280. Não usar `md` nem `2xl`                                                                         |
| Largura de texto do cabeçalho de seção | `max-w-xl` (576) para 1 frase · `max-w-2xl` (672) para 2 frases · `mx-auto max-w-4xl text-center` (896) só em galerias simétricas |
| Parágrafo dentro de bloco navy         | `max-w-xl lg:max-w-[46%]`                                                                                                         |
| Coluna de shortcode                    | `w-full lg:w-[300px]` (fixo, nunca muda)                                                                                          |
| Mobile mínimo suportado                | 360px sem scroll horizontal                                                                                                       |

Mobile-first: escreva as classes base para 360px e adicione `sm:` e `lg:`. `xl:` só para ajuste fino de título ou gap.

---

## 2. Espaçamento vertical entre seções

Cada seção tem `pt` e `pb` **assimétricos**. O que importa é a soma `pb (anterior) + pt (seguinte)`.

Numa seção da biblioteca você não escreve essas classes: declara em `meta.rhythms` quais ritmos a seção suporta, na ordem de preferência, e o compositor escolhe. A tabela abaixo é o mapa entre a situação e o nome do ritmo.

| Ritmo           | Classe        | Situação                                                            |
| --------------- | ------------- | ------------------------------------------------------------------- |
| `open`          | `pt-20 pb-10` | primeira seção depois do hero, terminando em grid de cards          |
| `even`          | `py-16`       | seção padrão                                                        |
| `tight`         | `pt-6 pb-10`  | seção logo depois de outra que já respirou                          |
| `flow`          | `pt-6 pb-16`  | seção plana depois de um painel navy, devolvendo ar para a seguinte |
| `panel-lead`    | `pt-6 pb-16`  | seção que abre com painel navy                                      |
| `panel-tight`   | `pt-6 pb-10`  | seção de painel navy que fecha o miolo, colada à Cotação            |
| `centered-lead` | `pt-4 pb-20`  | seção de cabeçalho centrado                                         |
| `overlap`       | `pt-6 pb-8`   | cards sobrepostos à base de um bloco navy; só antes da Cotação      |
| `close`         | `pt-8 pb-20`  | a Cotação (estrutura fixa)                                          |

| Situação                                                 | Classe da seção                                                                      | Soma com a vizinha                                                    |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| Primeira seção clara depois do hero                      | `pt-20` (80)                                                                         | hero tem `border-b`; 80 é o respiro                                   |
| Seção padrão, mesmo fundo da anterior                    | `py-16` (64)                                                                         | 64 + 64 = 128 → **use `pt-6`/`pb-10` na vizinha para cair em 80–104** |
| Seção que termina em grid de cards                       | `pb-10` (40) se a próxima tem mesmo fundo · `pb-20` (80) se a próxima troca de fundo |                                                                       |
| Seção que começa com painel navy (tem padding interno)   | `pt-6` (24)                                                                          | painel já traz `p-6 sm:p-8 lg:py-9`                                   |
| Seção que começa com cabeçalho centrado                  | `pt-4` (16) quando vem depois de `pb-16`                                             |                                                                       |
| Seção com cards sobrepostos ao bloco navy (Diferenciais) | `pt-6 pb-8` + cards `-mt-16` (-64)                                                   |                                                                       |
| Seção de conversão (última)                              | `pt-8 pb-20`                                                                         |                                                                       |
| Hero                                                     | `py-20 lg:py-24` (80 / 96)                                                           |                                                                       |
| Footer                                                   | `py-6` (24)                                                                          | nunca maior                                                           |

**Faixa-alvo da soma entre duas seções claras consecutivas: 80 a 104px no desktop.** Quando o fundo muda (branco → cinza → navy), a troca de cor já separa; aí a soma pode ir a 128px, nunca acima.

Exemplo de sequência válida: `pt-20 pb-10` → `pt-6 pb-16` → `pt-4 pb-20` → `py-16` → `pt-6 pb-8` → `pt-8 pb-20`.

---

## 3. Espaçamento dentro do cabeçalho de seção

Ordem fixa: **Eyebrow → H2 → (traço) → parágrafo → (CTA)**.

| De → para                         | Classe                                                                    | px  |
| --------------------------------- | ------------------------------------------------------------------------- | --- |
| Eyebrow → H2                      | `mt-3`                                                                    | 12  |
| H2 → parágrafo (sem traço)        | `mt-3`                                                                    | 12  |
| H2 → traço laranja                | `mt-5`                                                                    | 20  |
| Traço → parágrafo                 | `mt-5`                                                                    | 20  |
| Parágrafo → botão                 | `mt-6` (24) em blocos claros · `mt-7` (28) em blocos navy                 |     |
| Botão → microcopy de confiança    | `gap-2.5` (10) em coluna                                                  |     |
| Cabeçalho → corpo da seção        | `mt-8` (32) tabs · `mt-9` (36) galeria · `mt-10` (40) grid de cards       |     |
| Cabeçalho + carrossel lado a lado | `flex-col gap-3 sm:flex-row sm:justify-between`, carrossel com `sm:pl-10` |     |

Traço laranja só aparece em **bloco navy** ou na **seção de conversão**. Em seção clara comum, não.

---

## 4. Grids e espaçamento entre colunas

| Uso                                | Classes                                                                                                      | Gap          |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------ |
| Grid de cards (4)                  | `grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5`                                                          | 16 → 20      |
| Grid de cards (5, sobrepostos)     | mobile trilho `flex gap-4` · `lg:grid lg:grid-cols-5 lg:gap-5`                                               | 16 → 20      |
| Grid de cards (3)                  | `grid gap-5 sm:grid-cols-2 lg:grid-cols-3`                                                                   | 20           |
| Split texto + mídia (50/50)        | `grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-16`                        | 40 → 64      |
| Split texto + mídia (60/40)        | `grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center lg:gap-16`                           | 40 → 64      |
| Três colunas com navegação lateral | `grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[280px_…] xl:gap-10`      | 24 → 32 → 40 |
| Faixa de itens com divisórias (6)  | `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6` **sem gap**; divisórias `border-r border-b border-white/10` | 0            |
| Título ⟷ botão na mesma linha      | `flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12`                               | 24 → 48      |
| Linha de botões                    | `flex flex-wrap items-center gap-4`                                                                          | 16           |
| Lista de selos/confiança           | `flex flex-wrap gap-x-6 gap-y-2.5`                                                                           | 24 / 10      |
| Hero (fixo)                        | `gap-y-12 lg:gap-x-6`                                                                                        | 48 / 24      |

Alinhamento vertical: `lg:items-center` quando uma coluna é mídia; `lg:items-stretch` quando as colunas são painéis da mesma altura; `items-start` em listas.

---

## 5. Espaçamento dentro de cards e painéis

| Elemento                      | Padding / gap                                      | px              |
| ----------------------------- | -------------------------------------------------- | --------------- |
| Card de produto               | palco `h-40` (160) + conteúdo `px-6 pt-4 pb-4`     | 24 / 16         |
| Card de aplicação             | foto `aspect-[4/3]` + conteúdo `px-5 pt-4 pb-5`    | 20 / 16 / 20    |
| Card compacto (diferenciais)  | `p-4 gap-2.5`                                      | 16 / 10         |
| Painel navy                   | `p-6 sm:p-8 lg:px-10 lg:py-9`                      | 24 → 32 → 40/36 |
| Célula de faixa (6 itens)     | `px-4 py-3.5 sm:px-5 lg:px-3.5 gap-3 lg:gap-2.5`   |                 |
| Tab lateral                   | `px-3.5 py-2.5 gap-3`                              | 14 / 10 / 12    |
| Caixa de pontos do hero       | `px-3.5 py-2.5 gap-x-5 gap-y-3 sm:px-4 sm:gap-x-6` |                 |
| Caixa tracejada (placeholder) | `p-6` navy · `p-8` claro                           |                 |

Dentro do card, de cima para baixo:

| De → para                               | Classe                                                                           |
| --------------------------------------- | -------------------------------------------------------------------------------- |
| Título → descrição                      | `mt-2` (8)                                                                       |
| Descrição → lista de features           | `mt-4` (16)                                                                      |
| Entre features                          | `gap-2` (8)                                                                      |
| Lista → link inferior                   | `mb-4` na lista + `border-t pt-3` no link (12)                                   |
| Ícone → texto (horizontal)              | `gap-2.5` (10) em cards · `gap-3` (12) em listas de seção · `gap-2` (8) em selos |
| Badge de ícone → título (card compacto) | `gap-2.5` (10), título com `min-h-[2.5em] line-clamp-2`                          |
| Descrição em card compacto              | `min-h-[3.25em] line-clamp-2`                                                    |

Índice numérico no card: `absolute top-4 left-4` (palco de produto) · `bottom-3 left-4` (sobre foto). Tag/pílula: `absolute top-3.5 right-4`.

---

## 6. Tipografia

Uma família (Manrope). Peso faz a hierarquia: **800 títulos · 700 rótulos fortes · 600 rótulos · 500 bullets · 400 corpo**.

| Papel                          | Classes                                                                                                                                                 | Tamanho / altura de linha |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| H1 (só no hero)                | `font-display text-[2.75rem] sm:text-[3rem] lg:text-[2.75rem] xl:text-[3.1rem] font-extrabold leading-[1.1]`                                            | 44–50px / 1.1             |
| H2 de seção                    | `font-display text-3xl sm:text-4xl font-extrabold leading-tight`                                                                                        | 30 → 36px / 1.25          |
| H2 do bloco navy grande        | idem + `xl:text-[44px] leading-[1.1]`                                                                                                                   | 44px                      |
| H3 de painel/detalhe           | `font-display text-2xl lg:text-[28px] font-extrabold leading-tight`                                                                                     | 24 → 28px                 |
| H3 de card                     | `font-display text-lg font-extrabold leading-snug`                                                                                                      | 18px / 1.375              |
| H3 de card compacto            | `font-display text-[14px] font-extrabold leading-[1.25]`                                                                                                | 14px                      |
| Subtítulo / parágrafo de seção | `font-sans text-[15px] leading-relaxed text-ink-soft` (`sm:text-base` em blocos de conversão)                                                           | 15–16px / 1.625           |
| Parágrafo do hero              | `text-lg lg:text-base leading-relaxed text-neutral-light/75`                                                                                            | 18 → 16px                 |
| Corpo de card                  | `text-[13px] leading-relaxed text-ink-soft`                                                                                                             | 13px                      |
| Feature / bullet               | `text-[13px] font-medium text-ink` (card) · `text-[15px] font-medium text-ink` (painel de detalhe)                                                      |                           |
| Rótulo de item em faixa        | `text-[13px] leading-none font-bold` + dica `text-[11px] leading-snug /55`                                                                              |                           |
| Eyebrow                        | `text-[12px] font-semibold uppercase tracking-[0.16em]`                                                                                                 | 12px                      |
| Índice "01"                    | `font-display text-[11px] font-extrabold tracking-[0.2em]`                                                                                              | 11px                      |
| Tag/pílula                     | `text-[10px] font-bold uppercase tracking-[0.16em]`                                                                                                     | 10px                      |
| Rótulo do visual (sobre foto)  | `text-[12px] font-semibold uppercase tracking-[0.12em]`                                                                                                 | 12px                      |
| Microcopy                      | `text-xs` (12) ou `text-[11px]`, opacidade `/55–/60`                                                                                                    |                           |
| Botão                          | `text-[15px] font-semibold` · link de card `text-[13px] font-bold` · header `text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.04em]/[0.06em]` |                           |
| Tagline do header              | `text-[15px] lg:text-[17px] font-extrabold uppercase tracking-[0.14em]`                                                                                 |                           |
| Footer                         | `text-xs`                                                                                                                                               | 12px                      |

Regras:

- `tracking` largo (0.12–0.22em) **só** em uppercase. Títulos usam o `-0.015em` global do `.font-display`.
- Nunca usar `text-xl`, `text-5xl` ou tamanhos fora da tabela. Entre 13 e 15px, use 13 em card e 15 em seção.
- Cor: `text-ink` títulos · `text-ink-soft` corpo. Sobre navy: `text-neutral-light` títulos · `/75` corpo · `/70` eyebrow · `/60` microcopy · `/55` rodapé.
- Título de card: sem ponto final. Parágrafo de seção: com ponto final.
- Quebra forçada (`<br>`) só no H2 do bloco navy e em parágrafos centrados (`<br class="hidden lg:block">`).

---

## 7. Raios de borda

| Elemento                                                                      | Classe                    | px              |
| ----------------------------------------------------------------------------- | ------------------------- | --------------- |
| Card, painel navy, foto de painel, placeholder claro                          | `rounded-2xl`             | 16              |
| Tab, caixa de pontos do hero, faixa de itens, badge de ícone em card compacto | `rounded-xl`              | 12              |
| Badge de ícone no hero                                                        | `rounded-lg`              | 8               |
| Placa do logo                                                                 | `rounded-b-xl`            | 12 (só embaixo) |
| Input (se algum dia houver)                                                   | `rounded`                 | 4               |
| Pílula, chip de seta, badge circular, botão flutuante                         | `rounded-full`            |                 |
| **Botão de CTA**                                                              | **nenhum** (cantos retos) | 0               |
| Placeholder navy (hero)                                                       | nenhum                    | 0               |

Linguagem: superfícies arredondam, ações são retas.

---

## 8. Bordas, linhas e divisórias

| Uso                                    | Classe                                                                                                 |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Borda de card claro                    | `border border-neutral-gray-200/70`                                                                    |
| Divisória interna em card claro        | `border-t border-neutral-gray-200/60`                                                                  |
| Borda de botão de navegação (setas)    | `border border-neutral-gray-200`                                                                       |
| Borda de card escuro                   | `border border-white/10`                                                                               |
| Borda de painel navy / faixa de itens  | `border border-white/12`                                                                               |
| Divisória entre células na faixa       | `border-r border-b border-white/10` (remover na última coluna/linha por breakpoint com `nth-child`)    |
| Divisória entre pontos do hero         | `border-l border-white/18`                                                                             |
| Separador de seção navy (hero, footer) | `border-b` / `border-t border-white/15`                                                                |
| Borda de badge de vidro                | `border border-white/16` (hero: `/25`)                                                                 |
| Borda de botão outline claro           | `border border-neutral-light/35`                                                                       |
| Borda de botão outline escuro          | `border border-ink/25`                                                                                 |
| Hover de card                          | `hover:border-accent-orange/50` (claro) · `/60` (escuro)                                               |
| Anel de ícone em destaque              | `border-2 border-accent-orange`                                                                        |
| Pílula/tag                             | `border border-primary-dark/10`                                                                        |
| Placeholder                            | `border border-dashed border-neutral-light/35` (navy) · `border-dashed border-primary-dark/25` (claro) |

Linhas de acento (sempre laranja, sempre `bg-accent-orange`):

| Linha                         | Classe                                                                                                                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Traço sob título              | `block h-[3px] w-16` (64) em seção · `w-12` (48) em painel de detalhe                                                          |
| Barra no topo do card (hover) | `absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100`                                               |
| Barra lateral da tab ativa    | `absolute inset-y-0 left-0 w-[3px] origin-bottom scale-y-0` → `scaleY(1)` ativa                                                |
| Quadrado do eyebrow           | `h-[6px] w-[6px]`                                                                                                              |
| Linha entre índice e rótulo   | `h-px w-8 bg-neutral-light/40`                                                                                                 |
| Cantos técnicos               | 18×18, `border-2` em L, `top/left 14px` e `bottom/right 14px` (utility `tech-corners`) · versão pequena 14×14 no card no hover |
| Corte diagonal                | `clip-path: polygon(100% 0, 100% 100%, 0 100%)` em `w-[38%] bg-accent-orange/85 mix-blend-multiply`                            |

Espessura: **1px** para bordas, **2px** para anéis e cantos, **3px** para acentos. Nunca 4px+.

---

## 9. Sombras

| Uso                               | Classe                                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Card claro em repouso             | `shadow-[0_1px_2px_rgba(13,29,48,0.05)]`                                                               |
| Card claro no hover               | `shadow-[0_28px_56px_-28px_rgba(0,33,71,0.35)]`                                                        |
| Card escuro em repouso / hover    | `shadow-[0_18px_40px_-24px_rgba(0,24,48,0.6)]` / `shadow-[0_28px_56px_-24px_rgba(0,24,48,0.75)]`       |
| Card sobreposto ao bloco navy     | `shadow-[0_24px_48px_-24px_rgba(0,24,48,0.45)]` · hover `shadow-[0_32px_60px_-28px_rgba(0,33,71,0.5)]` |
| Painel navy / placeholder claro   | `shadow-[0_14px_32px_-26px_rgba(0,24,48,0.5)]`                                                         |
| Botão primário em destaque (glow) | `shadow-[0_14px_30px_-12px_rgba(255,107,0,0.85)]`                                                      |
| Placa do logo                     | `shadow-[0_10px_24px_-10px_rgba(0,0,0,0.55)]`                                                          |
| Caixa de pontos do hero           | `shadow-[0_18px_40px_-24px_rgba(0,0,0,0.7)]`                                                           |
| Pessoa recortada                  | `filter: drop-shadow(0 12px 20px rgb(0 15 35 / 25%))`                                                  |
| Sombra elíptica sob produto       | `h-4 w-28 rounded-[100%] bg-primary-dark/20 blur-md opacity-50`                                        |

Nunca usar `shadow-md`/`shadow-lg` genéricos. Sombra sempre com deslocamento negativo de spread (`-24px`…) para ficar "presa" ao elemento.

---

## 10. Ícones e badges

Sprite em `src/data/icons.ts`: 24×24, `stroke-width 1.6`, `stroke-linecap round`, `currentColor`, sem preenchimento.

| Contexto                         | Tamanho do ícone | Container                                                                       |
| -------------------------------- | ---------------- | ------------------------------------------------------------------------------- |
| Check de bullet                  | `size-3` (12)    | `size-5 rounded-full bg-accent-orange/10 text-accent-orange` (`/20` sobre navy) |
| Chip de seta                     | `size-3.5` (14)  | `size-8 rounded-full bg-neutral-gray-100 text-primary-dark` → hover laranja     |
| Botão, tab, selo, WhatsApp       | `size-4` (16)    | sem container                                                                   |
| Microcopy, footer                | `size-3.5` (14)  | sem container, `text-accent-orange`                                             |
| Badge de card compacto           | `size-[18px]`    | `size-9 rounded-xl bg-neutral-gray-100 text-primary-dark-800`                   |
| Badge do hero                    | `size-[18px]`    | `size-10 rounded-lg border border-white/25 bg-white/10 backdrop-blur-sm`        |
| Badge de faixa (vidro)           | `size-[18px]`    | `size-11 rounded-full glass-badge`                                              |
| Anel de destaque (detalhe)       | `size-6` (24)    | `size-14 rounded-full border-2 border-accent-orange text-accent-orange`         |
| Badge grande (fallback sem foto) | `size-10` (40)   | `size-24 rounded-full glass-badge`                                              |
| Botão flutuante                  | `size-7` (28)    | `size-14 rounded-full`                                                          |

Cor do ícone: **laranja** quando é marcação semântica (check, selo, pin, ícone de tab); **navy/ink** em chip sobre fundo claro; **branco** sobre navy. Nunca dois ícones laranja lado a lado sem texto entre eles.

Um ícone por item. Ícone sempre à esquerda do texto, exceto a seta de ação (direita).

---

## 11. Cores por camada

| Camada             | Claro                                                      | Navy                                                          |
| ------------------ | ---------------------------------------------------------- | ------------------------------------------------------------- |
| Fundo de seção     | `bg-neutral-light` ou `bg-neutral-gray-100` (alternar)     | `navy-premium` (bloco/painel)                                 |
| Fundo de card      | `bg-neutral-light`                                         | `navy-premium` (1 por grid)                                   |
| Chip / palco       | `bg-neutral-gray-100`                                      | `bg-white/10`                                                 |
| Texto título       | `text-ink`                                                 | `text-neutral-light`                                          |
| Texto corpo        | `text-ink-soft`                                            | `text-neutral-light/75`                                       |
| Overlay sobre foto | `bg-gradient-to-t from-primary-dark-900/55` (14 de altura) | `from-primary-dark-900/70 via-/10 to-transparent`             |
| Textura            | pontos `rgba(0,33,71,0.16)` 18px mascarados                | `blueprint-grid` (34px) ou pontos brancos 28px                |
| Brilho             | —                                                          | `size-72 rounded-full bg-accent-orange/15 blur-3xl` num canto |

Laranja **nunca** é fundo de seção nem de card. Máximo de laranja por card: barra de acento + checks + hover.

---

## 12. Movimento

| Propriedade                       | Duração                                      | Curva  |
| --------------------------------- | -------------------------------------------- | ------ |
| Cor (hover de botão, texto)       | `duration-200`                               | padrão |
| Transform + sombra + borda (card) | `duration-300 ease-out`                      |        |
| Imagem dentro do card             | `duration-500 ease-out`                      |        |
| Badge de vidro                    | `260ms ease`                                 |        |
| Entrada de painel (tab)           | `320ms ease-out` opacity + `translateY(6px)` |        |
| Carrossel de logos                | `26s linear infinite`, pausa no hover        |        |

Hover padrão de card: `hover:-translate-y-1.5` (6px) + borda laranja/50 + sombra grande + barra de acento cresce. Imagem: `scale-[1.04]` (foto) ou `-rotate-2 scale-[1.07]` (produto recortado). Chip de seta: `translate-x-0.5` + vira laranja.

Toda seção com `transition`/`animation` termina com:

```css
@media (prefers-reduced-motion: reduce) {
  .minha-secao-card,
  .minha-secao-card * {
    transition: none !important;
  }
  .minha-secao-card:hover {
    transform: none;
  }
}
```

---

## 13. Camadas (z-index)

| Elemento                                     | z                                               |
| -------------------------------------------- | ----------------------------------------------- |
| Skip link em foco                            | `z-[100]`                                       |
| Header, botão flutuante                      | `z-50`                                          |
| Cards sobrepostos a bloco navy               | `z-10`                                          |
| Barra de acento do card                      | `z-10`                                          |
| Overlay de depuração                         | `z-[9]`                                         |
| Hero: foto / véus / pontos / mira / conteúdo | `z-[1]` / `z-[2]` / `z-[3]` / `z-[4]` / `z-[5]` |
| Índice e rótulo sobre foto                   | `z-[2]`                                         |

Decorativos sempre com `pointer-events-none` e `aria-hidden="true"`.

---

## 14. Receitas para seções novas

### 14.1 Decisão em 5 perguntas

1. **Fundo:** a anterior é branca? → use `bg-neutral-gray-100`. É cinza? → branca. Precisa de "respiro"? → painel navy dentro de seção clara (não seção navy inteira; só Diferenciais e Hero são navy full-bleed).
2. **Cabeçalho:** à esquerda (`max-w-2xl`) por padrão. Centrado só se o corpo é uma galeria simétrica.
3. **Corpo:** grid de cards (3–5 itens iguais) · split texto+mídia (1 ideia + 1 imagem) · faixa de itens (5–6 dados curtos) · tabs (6–8 itens com detalhe).
4. **CTA:** por card (link inferior) quando cada item leva a uma conversa diferente; um botão único quando a seção é uma ideia só.
5. **Padding:** veja a tabela do item 2 conforme o que vem antes e depois.

### 14.2 Esqueleto de seção clara com grid de cards

```astro
<section id="{{slug}}" class="bg-neutral-gray-100 pt-6 pb-16">
  <div class="mx-auto max-w-page px-6 lg:px-10">
    <div class="max-w-2xl">
      <Eyebrow>{{Rótulo}}</Eyebrow>
      <h2 class="mt-3 font-display text-3xl leading-tight font-extrabold text-ink sm:text-4xl">{{Título}}</h2>
      <p class="mt-3 font-sans text-[15px] leading-relaxed text-ink-soft">{{Uma frase.}}</p>
    </div>

    <ul class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {items.map((item, i) => (
        <li class="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-gray-200/70 bg-neutral-light shadow-[0_1px_2px_rgba(13,29,48,0.05)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-accent-orange/50 hover:shadow-[0_28px_56px_-28px_rgba(0,33,71,0.35)]">
          <span aria-hidden="true" class="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-accent-orange transition-transform duration-300 ease-out group-hover:scale-x-100" />
          <div class="flex flex-1 flex-col px-6 pt-5 pb-4">
            <span class="font-display text-[11px] font-extrabold tracking-[0.2em] text-primary-dark/40">{String(i + 1).padStart(2, '0')}</span>
            <h3 class="mt-2 font-display text-lg leading-snug font-extrabold text-ink">{item.title}</h3>
            <p class="mt-2 font-sans text-[13px] leading-relaxed text-ink-soft">{item.description}</p>
            <ul class="mt-4 mb-4 flex flex-col gap-2">
              {item.features.map((f) => (
                <li class="flex items-center gap-2.5 font-sans text-[13px] font-medium text-ink">
                  <span class="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-orange/10 text-accent-orange"><Icon name="check" class="size-3" /></span>
                  {f}
                </li>
              ))}
            </ul>
            <button type="button" data-cta={`{{slug}}-${item.id}`} class="btn-slave-whats mt-auto flex items-center justify-between gap-3 border-t border-neutral-gray-200/60 pt-3 font-sans text-[13px] font-bold text-primary-dark transition-colors duration-200 hover:text-accent-orange">
              <span>{cta.card}</span>
              <span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-gray-100 text-primary-dark transition-[background-color,color,transform] duration-300 group-hover:translate-x-0.5 group-hover:bg-accent-orange group-hover:text-neutral-light"><Icon name="arrow-right" class="size-3.5" /></span>
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
</section>
```

### 14.3 Esqueleto de painel navy dentro de seção clara

```astro
<section id="{{slug}}" class="bg-neutral-light pt-6 pb-16">
  <div class="mx-auto max-w-page px-6 lg:px-10">
    <div class="navy-premium tech-corners relative overflow-hidden rounded-2xl border border-white/12 p-6 shadow-[0_14px_32px_-26px_rgba(0,24,48,0.5)] sm:p-8 lg:px-10 lg:py-9">
      <span aria-hidden="true" class="blueprint-grid pointer-events-none absolute inset-0"></span>
      <span aria-hidden="true" class="pointer-events-none absolute -top-24 -right-20 size-72 rounded-full bg-accent-orange/15 blur-3xl"></span>
      <div class="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div class="max-w-2xl">
          <Eyebrow tone="light">{{Rótulo}}</Eyebrow>
          <h2 class="mt-3 font-display text-3xl leading-tight font-extrabold text-neutral-light sm:text-4xl">{{Título}}</h2>
          <p class="mt-3 font-sans text-[15px] leading-relaxed text-neutral-light/70">{{Uma frase.}}</p>
        </div>
        <div class="flex flex-col items-stretch gap-2.5 lg:shrink-0 lg:items-end">
          <Button cta="{{slug}}-cta" variant="primary" class="w-full shadow-[0_14px_30px_-12px_rgba(255,107,0,0.85)] lg:w-auto">{cta.primary}</Button>
          <span class="flex items-center justify-center gap-2 font-sans text-xs text-neutral-light/60 lg:justify-end"><Icon name="shield" class="size-3.5 shrink-0 text-accent-orange" />{{Microcopy}}</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

### 14.4 Esqueleto de split texto + mídia

```astro
<section id="{{slug}}" class="bg-neutral-gray-100 py-16">
  <div class="mx-auto max-w-page px-6 lg:px-10">
    <div class="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
      <div class="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <Image src={photo.src} alt={photo.alt} format="webp" width={900} loading="lazy" decoding="async" class="h-full w-full object-cover" />
        <span aria-hidden="true" class="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-dark-900/70 via-primary-dark-900/10 to-transparent" />
        <span aria-hidden="true" class="pointer-events-none absolute right-0 bottom-0 h-full w-[38%] bg-accent-orange/85 [clip-path:polygon(100%_0,100%_100%,0_100%)] mix-blend-multiply opacity-90" />
      </div>
      <div>
        <Eyebrow>{{Rótulo}}</Eyebrow>
        <h2 class="mt-3 font-display text-3xl leading-tight font-extrabold text-ink sm:text-4xl">{{Título}}</h2>
        <span aria-hidden="true" class="mt-5 block h-[3px] w-16 bg-accent-orange"></span>
        <p class="mt-5 font-sans text-[15px] leading-relaxed text-ink-soft sm:text-base">{{Parágrafo.}}</p>
        <ul class="mt-4 flex flex-col gap-2">…bullets `text-[15px] font-medium` com check `size-5`…</ul>
        <Button cta="{{slug}}-cta" variant="primary" class="mt-6">{cta.primary}</Button>
      </div>
    </div>
  </div>
</section>
```

Mídia à esquerda quando a seção anterior teve texto à esquerda (alternar). No mobile a mídia vem antes do texto, exceto na Cotação.

### 14.5 Trilho horizontal no mobile (qualquer lista de 4+ cards)

```html
<ul
  class="-mx-6 scroll-track flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0"
>
  <li class="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-auto">…</li>
</ul>
<!-- setas: mt-3 flex justify-center gap-3 lg:hidden · botões size-10 rounded-full border border-neutral-gray-200 -->
```

Largura do card no trilho: `w-[78%]` (mostra a borda do próximo) · `sm:w-[44%]`.

---

## 15. Proibições rápidas

- Números fora da escala (`mt-7` está na escala, `mt-[26px]` não).
- Duas seções seguidas com a mesma soma de padding > 104px.
- Cabeçalho centrado com corpo assimétrico.
- Mais de um card escuro por grid; mais de um painel navy por seção.
- Laranja como fundo; texto laranja em parágrafo.
- `rounded` em botão de CTA; `rounded-2xl` em botão de qualquer tipo.
- Sombra genérica do Tailwind (`shadow-lg`).
- Ícone sem container quando está ao lado de título (título pede badge).
- Fonte diferente de Manrope, peso 300 ou 900.
- `md:` e `2xl:` como breakpoints.
- Seção sem `id`, sem `h2`, ou sem CTA.
