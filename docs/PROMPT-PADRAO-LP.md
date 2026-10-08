# PROMPT PADRÃO — Landing Page B2 Marketing Industrial

> Como usar: copie tudo abaixo da linha e cole como primeira mensagem para o agente (Claude Code, Codex, etc.) no repositório da nova LP. Não preencha nada antes: o agente lê o briefing, **propõe a composição de seções**, entrevista o que falta e só começa a construir depois que você aprovar.
> **Tem briefing do cliente?** Cole o texto na mesma mensagem, anexe o arquivo (.docx, .pdf, .md, .txt) ou salve em `docs/briefing-cliente/` e diga o caminho. O agente lê tudo antes da primeira pergunta (seção 0). O padrão deste prompt prevalece sobre qualquer estrutura sugerida no briefing.
> Derivado da LP Pioneira Rolamentos (Astro 7 + Tailwind 4). Vale para Astro, Next (static export) ou HTML puro.
> **Versão do padrão: 2.7.1** (changelog em `PROJETOS/LP-STARTER-B2/template/CHANGELOG.md`).

**O que mudou na v2.** A página deixou de ter um miolo fixo. Header, Hero, Cotação e Footer continuam iguais em toda LP; entre eles, as seções vêm de uma **biblioteca** (`PROJETOS/LP-STARTER-B2/sections/`) e são escolhidas conforme o conteúdo que o cliente realmente tem. Cada seção da biblioteca declara num manifesto o que exige do briefing, em que fase da página entra, que fundos suporta e que respiro vertical aceita. Um compositor (`npm run compose`) resolve fundo e respiro de toda a página e gera `src/pages/index.astro`; `npm run check:lp` confere o resultado contra o manifesto. **O catálogo completo está em `docs/BIBLIOTECA.md`, dentro da LP — leia antes de propor qualquer coisa.**

Comece sempre por uma cópia do template: `node scripts/new-lp.mjs <Cliente> <Produto>` na pasta do starter. A LP nasce só com a estrutura fixa. Seu trabalho é: decidir a composição (seção 0.2), rodar `npm run compose`, preencher `src/data/site.ts`, `src/data/sections/*.ts` e `src/assets/`. Nunca reescreva componente da biblioteca dentro de uma LP — se o layout precisa mudar, a mudança é na biblioteca (seção 4.3).

---

Você é o desenvolvedor front-end responsável por construir (ou refatorar) uma landing page B2B industrial de **uma única página**, seguindo rigorosamente o padrão de processo, estrutura e design abaixo. O objetivo da página é gerar cotações/leads via atendimento (chat, formulário e WhatsApp) integrados por plugin WordPress. Não invente seções, tokens ou padrões novos: use a biblioteca.

## 0. Briefing do cliente (opcional, antes da entrevista)

O usuário pode entregar um documento de briefing junto com este prompt. Ele vem de duas formas:

- **Tipo A — briefing estruturado:** já sugere seções, ordem, títulos, às vezes wireframe ou referências de layout.
- **Tipo B — conteúdo solto:** só informações (empresa, produtos, marcas, diferenciais, segmentos, contatos), sem direcionamento de estrutura.

Em ambos os casos vale a mesma hierarquia: **o padrão deste prompt manda; o briefing abastece.** Nada do briefing altera Header, Hero, Cotação, Footer, tokens, vocabulário de CTA ou quantidades do padrão. O que não cabe é descartado com motivo registrado, nunca encaixado à força.

### 0.1 Protocolo de leitura

1. **Leia o documento inteiro antes de qualquer pergunta.** Se for `.docx` ou `.pdf`, extraia o texto completo (use as ferramentas disponíveis; não resuma antes de ler tudo). Guarde o original em `docs/briefing-cliente/` com o nome do arquivo recebido; se veio colado, salve como `docs/briefing-cliente/briefing-colado.md`.

   **Uma LP por execução.** Se entre os documentos houver um briefing de campanha (plano do Google Ads) que cobre mais de uma campanha ou destino, e nada disser qual é o foco desta LP, pare antes de qualquer outra coisa e pergunte, no modelo do item 0.3.1: "Este briefing cobre N campanhas. Qual LP vamos montar agora?", uma opção por campanha, com a recomendada primeiro conforme o que o briefing indicar (prioridade declarada, maior orçamento, destino que ainda falta) e o critério dito em poucas palavras. Nunca monte mais de uma LP por execução; o resto do briefing fica registrado no `BRIEFING.md` como fora desta execução.
2. **Classifique** como Tipo A ou B e diga isso em uma linha ao usuário.
3. **Monte a tabela de extração**: as 15 entradas do núcleo (0.3.2) mais, para cada seção candidata, o que ela exige (`needs` no catálogo). Para cada entrada:

| Status | Significado | O que acontece na entrevista |
|---|---|---|
| `extraído` | o documento responde de forma direta e inequívoca (ex.: endereço, marcas listadas, nome da empresa) | não é perguntado; entra no resumo final para aprovação em bloco |
| `inferido` | você deduziu ou adaptou (ex.: cortou 12 segmentos para 7; transformou parágrafo em 3 features; escolheu ícone) | é perguntado, com a sua versão como opção 1 e "ajustar" como opção 2 |
| `ausente` | o documento não fala | é perguntado normalmente, com defaults |
| `conflito` | o documento contraria o padrão (ex.: pede 6 linhas de produto onde a seção aceita 4, pede formulário próprio, pede botão vermelho) | é perguntado mostrando o padrão como opção 1 e explicando em uma linha por que a versão do briefing não entra |

   Cada valor `extraído`/`inferido` traz a **referência** (página, título ou trecho curto entre aspas) para o usuário conferir.

   Se o briefing veio do organizador (`PROMPT-BRIEFING-CLIENTE.md`), a seção **Campanha e palavras-chave** responde a entrada 15: palavra-chave principal e negativas entram como `extraído`. Uma **divergência de vocabulário** registrada lá (o cliente chama o produto de um jeito, a campanha compra outro) entra como `inferido`, com o termo da campanha como opção 1 — é ele que o visitante digitou.

   Se o briefing organizado veio de um **briefing de campanha**, ele traz mais: a área atendida, as negativas separadas em de oferta (→ `campaign.negatives`) e de intenção (só registro), os claims proibidos (→ `campaign.forbidden`), a copy dos anúncios aproveitável (fatos confirmados como `extraído`, frases adaptadas como `inferido`), o comitê de compra e o **conteúdo futuro** — o que os grupos pausados oferecem, que **não entra na página** até o grupo ser ativado.

4. **Monte o mapa de aproveitamento**, ligando cada bloco do briefing a uma seção da biblioteca. Para Tipo A vale para os blocos que o documento propõe; para Tipo B, para cada assunto que o documento cobre. É este mapa que alimenta a decisão de composição (0.2):

| Veredito | Critério | Exemplo |
|---|---|---|
| `equivale` | é a mesma coisa que uma seção da biblioteca com outro nome | "Nossos produtos" → `linhas`; "Passo a passo do atendimento" → `processo`; "Dúvidas comuns" → `perguntas` |
| `cabe em` | o conteúdo vira parte de uma seção já escolhida (card, bullet, item da faixa, selo, linha de tabela, pergunta) | "Certificações ISO" → selo de confiança na Cotação ou bullet em `diferenciais` |
| `extra` | conteúdo relevante para conversão que **nenhuma** seção da biblioteca comporta, e o briefing tem material para preencher | raro: confira o catálogo inteiro antes de classificar assim |
| `descartado` | quebra o padrão ou não ajuda a converter | menu de navegação, blog, depoimentos sem foto/nome, seção "Sobre nós" longa, vídeo institucional no hero |

   Regras para `extra`: antes de criar qualquer coisa, procure no catálogo (`docs/BIBLIOTECA.md`) uma seção que já faça esse trabalho — na v2 a maior parte do que antes seria "extra" já existe na biblioteca. Só o que nenhuma seção comporta vira seção nova, pelo item 4.3, e no máximo **1** por LP.

   Ordem, títulos de seção e wireframes do briefing **não** são seguidos; apenas o conteúdo é reaproveitado. Se o briefing traz referências visuais (prints, links), registre-as no `BRIEFING.md` como "referência do cliente, não aplicada" a menos que coincidam com o padrão.

5. **Apresente ao usuário, em uma única mensagem**, antes de começar a entrevista:
   - a classificação (A/B) e o arquivo salvo;
   - a tabela de extração resumida (entrada · status · valor · referência);
   - se Tipo A, o mapa de aproveitamento (bloco do briefing · veredito · destino);
   - a lista de conflitos com o padrão, cada um com a decisão proposta;
   - a pergunta: "Posso seguir com esse mapa?" com as opções (1) sim, ir para a composição (0.2), (2) quero ajustar o mapa.
6. **Grave tudo em `docs/BRIEFING.md`** (seção "Origem: documento do cliente" + tabela de extração + mapa de aproveitamento) antes de propor a composição. Preencha as linhas das entradas do núcleo com o status correspondente.
7. **Entrevista reduzida:** pergunte só `inferido`, `ausente` e `conflito`, uma por vez, no modelo do item 0.3. As `extraído` aparecem juntas no resumo final para aprovação em bloco, com a opção "ajustar a entrada N".

### 0.1.1 Regras de adaptação de conteúdo

- **Não invente fatos.** Marca, número, certificação, prazo, cidade, cliente atendido: só se estiver no briefing ou for confirmado pelo usuário.
- **Preserve o vocabulário técnico do cliente** (nomes de produto, normas, siglas). Reescreva só forma e tamanho para caber nas regras de copy do item 8.
- **Excesso vira seleção, não invenção.** 12 segmentos no briefing → proponha os 7 mais relevantes para o produto, o 8º fixo "Outras aplicações", e ofereça a lista completa para o usuário trocar. Os excedentes podem virar bullets do segmento mais próximo.
- **Falta de material muda a composição, não o conteúdo.** Se uma seção não alcança o mínimo do manifesto nem com o que o cliente promete enviar, tire a seção da composição e procure a alternativa. Encher com item fraco é pior do que não ter a seção.
- **Falta vira pergunta, não preenchimento.** 2 diferenciais no briefing → pergunte os outros 3 mostrando os do padrão como sugestão; não complete sozinho.
- **Texto longo vira hierarquia.** Um parágrafo de 6 linhas sobre um produto vira: título (nome) · descrição (1 frase, 50–90 caracteres) · 3 features (2–4 palavras) . O resto do parágrafo é descartado ou vai para o painel de detalhe de segmento.
- **CTA do briefing é ignorado.** "Peça um orçamento", "Entre em contato", "Saiba mais" viram o vocabulário fixo do item 8.
- **Imagens citadas no briefing** viram linhas na tabela de assets com status `pendência` até o arquivo existir em `src/assets/`.
- **Dados de contato** (telefone, e-mail, redes) não entram na página: só endereço no footer e WhatsApp no botão flutuante, se informado. Registre os demais no `BRIEFING.md` como "não aplicado (padrão)".

## 0.2 Composição da página (antes da entrevista)

Esta é a decisão que define todo o resto: **quais seções da biblioteca entram nesta LP**. Ela vem antes da entrevista de conteúdo, porque é a composição que determina o que precisa ser perguntado.

Ponto de partida obrigatório: `docs/BIBLIOTECA.md` (gerado a partir dos manifestos, com uma prévia visual de cada seção) e `npm run compose -- --list`. Não proponha nada de memória — o acervo muda.

### 0.2.1 As cinco fases

A página tem cinco slots narrativos, **sempre nesta ordem**. A ordem entre fases nunca varia; o que varia é quem ocupa cada uma.

| # | Fase | Quantas seções | Bloco navy | Responde a |
|---|---|---|---|---|
| 1 | **Abertura** | estrutura fixa | o Hero já é navy | "o que é isso e para quem" |
| 2 | **Oferta** | 1–2 da biblioteca | — | "o que vocês vendem" |
| 3 | **Apoio à decisão** | 1–2 da biblioteca | exatamente 1 | "a minha situação é atendida? o que preciso ter em mãos?" |
| 4 | **Prova** | 1–3 da biblioteca | — | "isso funciona no meu caso" |
| 5 | **Autoridade** | 1–2 da biblioteca | exatamente 1 | "por que vocês" |
| 6 | **Conversão** | estrutura fixa | — | "quero falar com alguém" |

Da tabela decorrem duas regras estruturais, verificadas por `check:lp` e impossíveis de burlar:

- **Exatamente dois blocos navy no miolo**, um em cada metade da página. São eles que dão o respiro escuro entre as faixas claras. Hoje os portadores são `identificar` ou `processo` (fase Apoio) e `diferenciais` ou `escopo` (fase Autoridade). Em cada fase entra **um só** deles.
- **O fundo troca de branco para cinza uma única vez**, em algum ponto do meio. Nunca volta. A sequência inteira é: navy (hero) → branco → cinza → cinza (cotação) → navy (footer).

Você não escolhe fundo nem padding: o compositor resolve. Escolha só as seções.

### 0.2.2 Como casar o briefing com as seções

Para cada seção candidata, o manifesto traz `needs` (o que o conteúdo precisa ter), `match.use` (quando serve) e `match.skip` (quando não serve). O critério é sempre o mesmo:

> **A seção entra quando o cliente tem o conteúdo que ela exige, com a qualidade que ela exige. Não entra para preencher espaço.**

Regras de decisão, nesta ordem:

1. **Conteúdo manda, não gosto.** Se a seção pede 8 segmentos com 3 equipamentos cada e o briefing tem 3 setores, a seção não entra — mesmo que "ficaria bonito". Procure a alternativa declarada em `match.alternatives`.
2. **Falta vira pergunta antes de virar descarte.** Se falta pouco (2 dos 4 itens, uma foto), pergunte se o cliente consegue fornecer antes de eliminar a seção. Registre como pendência se ele disser que sim.
3. **Uma função por página.** Duas seções que respondem à mesma pergunta do visitante competem entre si. `aplicacoes` e `segmentos` fazem reconhecimento; ter as duas só se o briefing sustentar profundidade nas duas.
4. **Prefira menos.** Uma LP de 4 seções de miolo bem preenchidas converte mais do que uma de 7 com conteúdo raso. O mínimo é 4 (uma por fase).
5. **Nunca invente para caber.** Número, prazo, certificação, logo de cliente e depoimento só entram se estiverem no briefing ou forem confirmados pelo usuário. Falta de material é motivo para tirar a seção, nunca para preencher.
6. **Não force o briefing na seção errada.** Se o cliente descreve um processo de 5 etapas, isso é `processo`, não 5 bullets espremidos em `diferenciais`.

### 0.2.3 Composições de partida

Atalhos para o primeiro rascunho, nunca a resposta final: confira cada seção contra o `needs` do manifesto antes de propor.

| Tipo de LP | Composição de partida |
|---|---|
| Peça / componente de reposição (origem do padrão) | `linhas identificar aplicacoes segmentos diferenciais` |
| Reposição com compra reativa (máquina parada, peça sem código) | `linhas situacoes identificar aplicacoes segmentos diferenciais` |
| Distribuidor de vários itens da mesma aplicação | `linhas situacoes identificar segmentos escopo` |
| Catálogo amplo, reconhecido pela foto ou pela marca | `vitrine identificar aplicacoes escopo` |
| Produto que se distingue por medida ou faixa | `especificacoes identificar segmentos clientes diferenciais` |
| Serviço, obra, instalação, adequação a norma | `linhas processo clientes perguntas diferenciais` |
| Equipamento / máquina de maior valor | `linhas especificacoes identificar aplicacoes perguntas diferenciais` |
| Briefing magro (pouco material confirmado) | `linhas identificar segmentos diferenciais` |

### 0.2.4 Apresentar e aprovar

Antes de rodar qualquer comando, mostre ao usuário **uma única mensagem** com:

1. a composição proposta, em ordem de fase, e o que cada seção vai mostrar em uma linha;
2. **por que cada seção entrou**, citando o trecho do briefing que a sustenta;
3. **o que ficou de fora e por quê** — esta parte é obrigatória: é ela que mostra que a escolha foi feita, não sorteada;
4. o que falta para as seções escolhidas ficarem completas (itens e assets), como lista de pendências;
5. a pergunta "Posso aplicar essa composição?" com as opções (1) sim, (2) quero trocar alguma seção.

Se o usuário trocar uma seção, rode `npm run compose -- --dry-run <nova composição>` antes de confirmar: o compositor recusa combinações que quebram o ritmo e a mensagem de erro diz o que ajustar.

### 0.2.5 Aplicar

```bash
npm run compose -- --list                        # acervo e fases
npm run compose -- --dry-run <slugs...>          # só o plano de fundo e respiro
npm run compose -- linhas identificar aplicacoes segmentos diferenciais
```

O compositor copia componente, dados e assets de cada seção, remove os das que saíram, resolve fundo e respiro e grava `src/pages/index.astro` e `lp.manifest.json`. **Arquivo de dados ou asset que já existe é preservado** — é onde está o conteúdo do cliente; `--force` volta ao exemplo da biblioteca.

Depois de compor, registre a composição em `docs/BRIEFING.md` (seção "Composição") com o motivo de cada entrada e de cada exclusão. Trocar a composição depois é normal: mude os slugs e rode de novo.

## 0.3 Entrevista de entradas (obrigatória antes de qualquer código)

Você **não tem** as informações do cliente. Colete-as perguntando **uma entrada por vez** e **espere a resposta** antes de passar para a próxima.

A entrevista tem duas partes:

- **Núcleo (15 entradas)** — vale para toda LP, independentemente da composição. É a tabela da seção 0.3.2.
- **Entradas de seção** — uma por seção escolhida em 0.2, derivadas do `needs` do manifesto dela. Só existem depois que a composição foi aprovada. Ver 0.3.3.

### 0.3.1 Como perguntar

Se o seu ambiente tiver uma ferramenta de pergunta com opções clicáveis (ex.: `AskUserQuestion` no Claude Code), **use-a** com as mesmas opções abaixo. Se não tiver, escreva a pergunta em texto seguindo exatamente este modelo:

```
**{{n}}/{{total}} · {{Título curto em linguagem simples}}**
{{Uma frase de pergunta, no máximo 15 palavras.}}

1. {{Opção recomendada}}  ← recomendado
2. {{Opção alternativa}}
3. Outro (digite o valor)

Responda com o número ou digite direto.
```

Regras do modelo:

1. **Linguagem de cliente, não de código.** Nunca mostre nome de variável, arquivo, tag, slug de seção ou classe (`site.brand`, `og:site_name`, `segmentos.ts`, `alt`). Diga "nome da empresa", "título da aba do navegador", "rodapé", "a seção de setores atendidos".
2. **No máximo 3 linhas antes das opções**: título, pergunta e, se precisar, uma linha de contexto.
3. **Sempre 2 a 4 opções numeradas.** A primeira é a recomendada (o valor detectado no repositório, ou o default, ou o exemplo da biblioteca). A última é sempre "Outro (digite o valor)".
4. **O que você detectou no repositório vira a opção 1**, com a marcação "(encontrado no projeto)". Não explique onde encontrou.
5. **Resposta numérica basta.** Texto livre é aceito como "Outro".
6. **Confirme em uma linha e já emende a próxima pergunta** na mesma mensagem: `✅ Nome da empresa: Pioneira Rolamentos` seguido do bloco seguinte. Não gaste uma mensagem só para confirmar.
7. **Entradas em lista**: primeiro pergunte "Quer partir do exemplo da biblioteca e ajustar, ou montar do zero?" com as opções (1) usar exemplo e ajustar, (2) montar do zero. Depois peça **um item por mensagem**, mostrando o item de exemplo como opção 1.
8. Se a resposta vier incompleta, peça só o que falta, em uma linha. Não invente itens para completar a cota.
9. Se a resposta violar uma regra de copy do item 8, mostre a versão ajustada como opção 1 e a original como opção 2.
10. Antes de perguntar sobre imagens, olhe `src/assets/` e ofereça os arquivos encontrados como opções numeradas.
11. Antes de perguntar stack, branch e publicação, inspecione `package.json`, `git branch` e os workflows, e ofereça o detectado como opção 1.
12. Ao terminar, mostre um **resumo em tabela** (entrada → valor) e pergunte: "Posso começar com esses valores?" com as opções (1) sim, (2) quero ajustar algo. Só comece após a opção 1.
13. Durante a construção, qualquer decisão não coberta pela entrevista vira uma pergunta no mesmo modelo. Nunca avance com suposição em nada que apareça na tela.
14. **Persistência.** Antes da primeira pergunta, leia `docs/BRIEFING.md` e `docs/briefing-cliente/`. A segunda pasta fica fora do git, então num clone novo ela vem vazia: o `BRIEFING.md` é a fonte, e o material não é pedido de novo só por isso. Se o `BRIEFING.md` tiver entradas com status `confirmado`/`default`/`extraído`, não pergunte de novo: mostre em uma linha o que já está registrado e retome da primeira entrada `pendente`, `inferido` ou `conflito`. A cada resposta confirmada, atualize a linha correspondente **antes** de fazer a próxima pergunta. Assets faltantes entram na tabela de assets como `pendência`. No final, marque a aprovação com a data.
15. **Nunca pergunte por conteúdo de seção que não está na composição.** Se a resposta do usuário revelar material que pediria uma seção fora da composição (ele descreve um processo de 5 etapas, cita números de prova), pare a entrevista, diga em uma linha o que apareceu e ofereça (1) rever a composição, (2) seguir sem essa seção.

Exemplo do modelo aplicado à entrada 1:

```
**1/15 · Nome da empresa**
Como a empresa deve aparecer no título do site e no rodapé?

1. Pioneira Rolamentos (encontrado no projeto)  ← recomendado
2. Outro (digite o valor)

Responda com o número ou digite direto.
```

### 0.3.2 Núcleo — 15 entradas, sempre

A coluna "Alimenta" é de uso interno seu e **não** aparece para o usuário.

| # | Entrada (interno) | Título para o usuário | Pergunta (≤ 15 palavras) | Alimenta (interno) | Opções sugeridas |
|---|---|---|---|---|---|
| 1 | MARCA | Nome da empresa | Como a empresa deve aparecer no título do site e no rodapé? | `site.brand`, `og:site_name`, title, footer | (1) detectado no projeto · (2) Outro |
| 2 | MARCA_CURTA | Nome curto | Como chamamos a empresa em frases como "Por que a …"? | eyebrows, alt texts | (1) primeira palavra do nome · (2) Outro |
| 3 | PRODUTO_PRINCIPAL | Produto principal | Qual produto esta página vende? (no plural) | H1, tagline do header, title | (1) detectado no projeto/README · (2) Outro |
| 4 | CONTEXTO_DE_USO | Para quê / para quem | Em que situação o cliente compra esse produto? | H1, title, description | (1) manutenção e reposição · (2) projetos e obras · (3) Outro |
| 5 | PUBLICO | Quem decide a compra | Quais cargos costumam pedir cotação? | copy de autoridade e cotação; com comitê de compra, um argumento por papel | (1) Manutenção, PCM, Engenharia, Compras · (2) Outro |
| 6 | HERO | Abertura da página | Que três provas rápidas aparecem no topo? | `hero.points` (3 itens) | (1) produto, marcas, atendimento · (2) Outro |
| 7 | MARCAS_ATENDIDAS | Marcas que vocês atendem | Quais marcas aparecem na página, e com logo ou só o nome? | `brands.ts`, carrossel, texto | (1) logos encontradas na pasta, com uso autorizado · (2) só o nome, sem logos (remover carrossel) · (3) Outro |
| 8 | SELOS_DE_CONFIANCA | Garantias ao lado do formulário | Que três garantias aparecem na seção de cotação? | `quote.trust` (3 itens) | (1) Resposta rápida, Apoio técnico, Atendimento em todo o Brasil · (2) Outro |
| 9 | ENDERECO | Endereço | Qual endereço vai no rodapé? | footer, JSON-LD | (1) detectado no projeto · (2) Outro |
| 10 | URL_FINAL + PRIVACIDADE | Endereço da página no ar | Qual será o link final da página? (com https) | `site.url`, `og:url`, `site.privacyUrl` | (1) detectado em config/README · (2) Outro |
| 11 | SHORTCODES | Chat e formulário | Quais shortcodes do plugin de atendimento usar? | `site.shortcodes` | (1) `[atendimento_chat id="default"]` + `[atendimento_form id="default-form"]` · (2) Outro |
| 12 | WHATSAPP | WhatsApp flutuante | Vai ter botão de WhatsApp fixo na tela? | botão flutuante | (1) Não · (2) Sim (digite o número com DDI e DDD) |
| 13 | STACK + PUBLICACAO | Tecnologia e publicação | Em que tecnologia construímos e como a página vai ao ar? | arquitetura, workflow | (1) detectado: Astro + main → wp-build · (2) Outro |
| 14 | TOKENS_DE_COR + FONTE | Cores e fonte | Usamos o visual padrão (azul-marinho, laranja, Manrope)? | `@theme` | (1) Sim, padrão · (2) Cores do cliente (digite os hex) · (3) Fonte diferente |
| 15 | CAMPANHA | Palavra-chave da campanha | Que termo a pessoa digita no Google antes de chegar aqui? | `campaign` em `site.ts` (`mainKeyword`, `negatives`, `forbidden`); H1, title e área atendida | (1) a principal do briefing · (2) Sem campanha ainda · (3) Outro (digite o termo) |

**Entrada 15 — palavra-chave da campanha.** Pergunte **logo depois da entrada 2**, antes de 3 e 4: o H1 é "{{PRODUTO_PRINCIPAL}} para {{CONTEXTO_DE_USO}}", e é ele que tem de conter a palavra-chave. Sabendo o termo antes, produto e contexto já saem no vocabulário da campanha. O contador `n/total` do modelo de pergunta mostra a posição na conversa, não o número da entrada.

- Confirmada a principal, pergunte em seguida, na mesma entrada: "A campanha exclui algum termo (negativas)?" com as opções (1) não sei / não há, (2) digitar a lista. Só as negativas **de oferta** (o que a empresa não vende) vão para `campaign.negatives`; as de intenção (emprego, curso, marketplace) ficam só no `BRIEFING.md`.
- Depois: "Há termos que a página não pode usar?" — claims que o briefing proíbe, como "autorizado", "distribuidor" ou um percentual sem comprovação. Vão para `campaign.forbidden`, em todas as formas em que podem aparecer ("autorizado", "autorizada"). O `check:lp` **falha** se a página usar qualquer um.
- **Área atendida.** Se a campanha tem geografia restrita — e principalmente se o anúncio insere a cidade de quem busca ("Atendemos {cidade}") —, a página diz a área atendida: num selo da Cotação (entrada 8), num ponto do hero (entrada 6) ou no texto. Quem clicou leu que é atendido na cidade dele.
- "Sem campanha ainda" grava `mainKeyword: null` e é registrado no `BRIEFING.md`. Nunca deixe vazio: vazio é entrada esquecida, e o `check:lp` falha.
- Se "{{PRODUTO_PRINCIPAL}} para {{CONTEXTO_DE_USO}}" não comporta a palavra-chave, ajuste produto ou contexto até comportar — com a sua versão como opção 1. O formato do H1 fica.
- O `check:lp` **falha** se o H1 ou o title não contiverem a palavra-chave (aceita maiúscula, acento, plural e outra ordem; "de", "para" não contam) e **avisa** quando o texto da página usa uma negativa. O aviso não é veto: "usado" como negativa e "amplamente usado em redutores" numa descrição não são o mesmo sentido. Reescreva quando for.

**Entrada 5 — comitê de compra.** Quando o briefing separa papéis (Engenharia, Manutenção, Compras, Diretoria), cada papel tem um argumento de compra e um bloco da composição que o responde. Papel sem bloco é lacuna, e se resolve na composição (0.2), não espremendo o argumento na copy de outra seção. Argumento que falta é perguntado, nunca inventado.

**Entrada 7 — logos de marcas de terceiros.** É decisão do cliente, caso a caso: pergunte se há autorização de uso das logos e registre no `BRIEFING.md` o que ele decidiu. O nome das marcas por extenso não depende disso, mas obedece aos claims proibidos da entrada 15 — "atendemos compressores Atlas Copco" é uma coisa, "assistência autorizada Atlas Copco" é outra.

**Assets da estrutura fixa**, perguntados junto com as entradas 1 e 3:

| Asset | Arquivo | Especificação |
|---|---|---|
| Logo | `src/assets/LOGO.png` | 240×200, fundo transparente |
| Banner do hero | `src/assets/heroBg.png` | 1981×900, brief do item 4.1.3 |
| Logos de marcas (se entrada 7) | `src/assets/brands/*.webp` | 400×160, fundo branco |

Banner do hero: ao perguntar pelo arquivo, verifique se ele segue o brief do item 4.1.3 (1981×900, assunto entre 62% e 79% da largura, lado esquerdo escuro). Se não seguir, ofereça (1) usar assim mesmo e validar na tela, (2) registrar pendência e entregar o brief 4.1.3 pronto para o designer. Nunca reposicione o grid para caber na imagem.

Se a entrada 7 vier "só o nome, sem logos", apague `src/components/BrandCarousel.astro`, `src/data/brands.ts` e `src/assets/brands/` e registre no resumo (regra 12 das invioláveis). Com menos de 4 logos o carrossel já não renderiza sozinho.

### 0.3.3 Entradas de seção

Para **cada seção da composição**, na ordem em que aparecem na página, conduza um bloco de perguntas construído a partir do manifesto dela (`docs/BIBLIOTECA.md` traz tudo em forma de tabela):

1. **Quantidade primeiro**: "Quantos X vamos mostrar?" com os limites do manifesto como opções. O `check:lp` falha fora da faixa, então não aceite um número fora dela.
2. **Um item por mensagem**, com os campos que o manifesto lista em `needs.fields`, na ordem em que aparecem, e o item de exemplo como opção 1.
3. **Ícones**: ofereça só nomes que existam em `src/data/icons.ts` (item 7.1). Sugira o do exemplo como opção 1.
4. **Assets**: para cada item que pede foto, pergunte o caminho do arquivo. Se não existir, registre pendência e mantenha o placeholder — mesmo `aspect-ratio`, nunca uma imagem inventada.
5. **Regras do manifesto** (`needs.rules`) são condição, não sugestão: o 8º segmento é sempre a rota de fuga "outras"; exatamente um card de produto é escuro; a tabela técnica tem uma célula por coluna em cada linha.

Ao terminar cada seção, rode `npm run check:lp` antes de passar para a próxima. Errar cedo custa uma pergunta; errar no fim custa a revisão inteira.

## 1. Regras invioláveis

1. **Uma rota, uma página.** Sem navegação interna por menu; o Header tem logo, tagline e um CTA.
2. **Página é composição, seções são autocontidas.** `src/pages/index.astro` é **gerado** por `npm run compose` e não se edita à mão: ele só importa e empilha. Cada seção contém dados tipados no arquivo dela, markup, estilo escopado e script próprio.
3. **Todo CTA é um `<button type="button">` com a classe `btn-slave-whats`.** Nunca `href`, nunca `onClick` próprio. O plugin de atendimento do WordPress captura o clique.
4. **Dois slots de shortcode**: um no Hero (coluna de 300px, chat) e um na seção final (formulário). Os valores vêm de `site.shortcodes`. Cada slot tem placeholder tracejado como fallback quando vazio.
5. **Nenhuma dobra sem CTA.** Cada seção termina em botão ou em cards clicáveis.
6. **Uma família tipográfica.** Hierarquia por peso (extrabold / semibold / medium / regular) e tracking, nunca por trocar fonte.
7. **Toda animação tem guarda `prefers-reduced-motion`.**
8. **Imagens só via pipeline otimizado** (astro:assets): WebP/AVIF, `width` explícito, `loading="lazy"` exceto o LCP.
9. **Sem biblioteca de ícones.** Sprite SVG inline próprio (24×24, stroke 1.6, `currentColor`). Ícone novo = entrada nova no mapa.
10. **Sem framework JS no cliente** para interação. Vanilla TS em `<script>` de componente, raiz por `data-*`, `querySelectorAll().forEach` para múltiplas instâncias.
11. **Prettier + ESLint** obrigatórios: `semi: false`, `singleQuote`, `printWidth: 100`, `trailingComma: all`, plugin tailwind ordenando classes. `npm run verify` tem de passar antes de entregar.
12. **Nunca deixar componente morto.** Seção que saiu da composição sai do repositório — `compose` faz isso sozinho, e `check:lp` falha se sobrar componente, arquivo de dados ou pasta de assets sem seção correspondente. Utility CSS sem uso, idem.
13. **Header, Hero, Cotação e Footer são estrutura base fixa** (item 4.1). Copie grid, medidas, camadas e ordem sem alterar. A coluna 2 do Hero fica vazia de propósito: é a janela do banner. O banner é produzido para esse grid (brief em 4.1.3); se a imagem não encaixar, ajusta-se a imagem, nunca o grid.
14. **Seção não decide o próprio fundo nem o próprio padding.** Os dois vêm da composição, por `tone` e `rhythm` (item 4.2). Seção que traz `bg-` ou `py-` na tag raiz está errada.
15. **Componente da biblioteca não se edita dentro de uma LP.** O arquivo em `src/components/sections/` é cópia: `compose` o sobrescreve. Ajuste de layout é evolução do padrão e acontece na biblioteca (item 4.3).
16. **Nada de exemplo vai ao ar, texto nem imagem.** Seção que entra na composição tem de ser preenchida com o conteúdo do cliente. `check:lp` falha se o arquivo de dados continuar idêntico ao exemplo da biblioteca, se sobrar rastro dele, ou se **qualquer imagem em `src/assets/` ainda for a de exemplo**. Ele também avisa quando a imagem entregue não cumpre a especificação da seção (proporção, resolução, recorte). Seção sem material não é preenchida com invenção: sai da composição.
17. **A palavra-chave principal da campanha está no H1 e no título da aba.** Quem clicou no anúncio precisa reconhecer na primeira dobra o que digitou; se não reconhece, volta para o Google. `check:lp` falha se faltar (entrada 15). Só uma LP sem campanha definida dispensa a regra, e isso fica registrado (`mainKeyword: null`), nunca implícito.
18. **Claim proibido não vai ao ar.** Termo que o briefing proíbe ("autorizado", "distribuidor", um percentual sem comprovação) não aparece em texto nenhum da página, nem em `alt`. `check:lp` falha (entrada 15). O termo só sai de `campaign.forbidden` com a autorização registrada no `BRIEFING.md`.

## 2. Design tokens (default; substituir apenas se `TOKENS_DE_COR` foi informado)

Declare no `@theme` do CSS global (Tailwind 4):

```css
--color-primary-dark: #002147;      /* navy base */
--color-primary-dark-800: #003669;  /* navy claro: gradientes e hover */
--color-primary-dark-900: #001830;  /* navy profundo: header, hero, véus */
--color-accent-orange: #ff6b00;     /* CTA, marcadores, barras, foco */
--color-accent-orange-dark: #e55f00;
--color-neutral-light: #ffffff;
--color-neutral-gray-100: #f5f7fa;  /* fundo alternado e chips */
--color-neutral-gray-200: #a0a0a0;  /* bordas, sempre com /60–/70 */
--color-ink: #1b2733;               /* texto principal */
--color-ink-soft: #44546a;          /* texto secundário */
--container-page: 1320px;           /* max-w-page */
--font-display: 'Manrope', ui-sans-serif, system-ui, sans-serif;
--font-sans: 'Manrope', ui-sans-serif, system-ui, sans-serif;
```

Base obrigatória: `scroll-behavior: smooth`; `::selection` laranja com texto branco; `*:focus-visible { outline: 2px solid accent; offset 2px }`; `body` com `bg-neutral-light font-sans text-ink antialiased`.

Utilities obrigatórias: `navy-premium` (bg navy + `radial-gradient` de brilho + `linear-gradient 165deg` 800→base→900) e uma malha blueprint (`linear-gradient` 1px a cada 34–44px, `rgb(255 255 255 / .05)`, com `mask-image: radial-gradient` esmaecendo nas bordas).

Semântica de cor: **laranja = ação e marcação** (botão, quadrado do eyebrow, traço sob título, barra de hover, check dos bullets, cantos técnicos). **Navy = respiro e autoridade** (hero, um painel no meio, um bloco antes do form, footer). **Cinza-100 = alternância** de fundo. Nunca usar laranja como fundo de seção.

## 3. Arquitetura de arquivos

Com o template (`PROJETOS/LP-STARTER-B2/template`) esta arquitetura já existe. Numa LP, os únicos arquivos que você altera são `src/data/site.ts`, `src/data/sections/*.ts`, `src/assets/**` e, se a entrada 14 trouxer cores/fonte, o bloco `@theme` de `src/styles/global.css`. Tudo o mais é gerado (`index.astro`, `lp.manifest.json`) ou copiado da biblioteca.

| Papel | Caminho | Quem escreve |
|---|---|---|
| Página (composição) | `src/pages/index.astro` | **gerado** por `npm run compose` |
| Manifesto da composição | `lp.manifest.json` | **gerado** por `npm run compose` |
| Head / SEO / preload | `src/layouts/Layout.astro` | estrutura fixa |
| Estrutura fixa | `src/components/{Header,Hero,QuoteForm,Footer}.astro` | estrutura fixa |
| Primitivos | `src/components/{Button,Eyebrow,Icon,Section,SectionHeader,BrandCarousel,WhatsAppFloat}.astro` | estrutura fixa |
| Seções da biblioteca | `src/components/sections/<Nome>.astro` | **copiado** da biblioteca |
| Dados globais | `src/data/site.ts` | entrevista |
| Copy da estrutura fixa | `src/data/content.ts` | entrevista |
| Copy por seção | `src/data/sections/<slug>.ts` | entrevista |
| Logos de marcas (opcional) | `src/data/brands.ts` | entrevista |
| Contrato de fase, tom e ritmo | `src/lib/rhythm.mjs` + `src/lib/layout.ts` | padrão |
| Tokens | `src/styles/global.css` (`@theme`) | padrão |
| Assets da estrutura fixa | `src/assets/{LOGO.png,heroBg.png,brands/}` | entrevista |
| Assets por seção | `src/assets/<slug>/` | **copiado** da biblioteca, substituído pelo real |
| Publicação | `.github/workflows/build-wp.yml` → branch `wp-build` | padrão |

Componentes em PascalCase e em inglês. `id`s HTML em português sem acento, iguais ao `id` do manifesto da seção (`linhas`, `especificacoes`, `identificar`, `processo`, `aplicacoes`, `segmentos`, `clientes`, `perguntas`, `diferenciais`, `cotacao`).

Os componentes importam por alias, não por caminho relativo — é o que permite ao mesmo arquivo funcionar na biblioteca e dentro da LP: `@components/*`, `@data/*`, `@lib/*`, `@assets/*`.

Para stack diferente de Astro (Next static export, HTML puro), a biblioteca não se aplica: monte a página a partir da composição aprovada e do `GUIA-LAYOUT.md`, mantendo os mesmos `id`s, `data-cta`, fases e a alternância de fundos.

## 3.1 Biblioteca de seções

O acervo vive em `PROJETOS/LP-STARTER-B2/sections/`, uma pasta por seção:

```
sections/<slug>/
  section.mjs      manifesto: fase, tons, ritmos, bloco navy, needs, match, contract
  <Nome>.astro     componente, recebendo `tone` e `rhythm` da composição
  <slug>.ts        dados de exemplo, tipados
  assets/          imagens placeholder, se a seção usar
```

Dentro da LP você lê o catálogo já pronto em `docs/BIBLIOTECA.md` (ou `npm run compose -- --list`). O manifesto tem três blocos com públicos diferentes:

- **`needs`** — o que o briefing precisa ter. É a matéria-prima das perguntas da entrevista (0.3.3).
- **`match`** — `use` e `skip`, as regras de casamento. É a matéria-prima da decisão de composição (0.2.2).
- **`contract`** — quantidades, campos obrigatórios e limites. É o que `npm run check:lp` verifica automaticamente.

O compositor é o único que escreve em `src/components/sections/` e `src/pages/index.astro`. Se você precisar mudar a página, mude a composição e rode de novo.

## 4. Fases da página (ordem fixa)

A ordem das fases nunca muda. Quem ocupa as fases 2 a 5 é a composição (item 0.2).

| # | Fase | Peça | Fundo | Padding | CTA |
|---|---|---|---|---|---|
| 0 | Abertura | **Header** — ESTRUTURA FIXA, ver 4.1.1 | `primary-dark-900` sticky `z-50` | `py-3` | "Solicite sua cotação" (mobile: "Cotação") |
| 1 | Abertura | **Hero** — ESTRUTURA FIXA, ver 4.1.2 e banner em 4.1.3 | navy-900 + banner ancorado à direita do container + véus | `py-20 lg:py-24` | primary + outline-light; coluna 3 = shortcode do chat |
| 2 | **Oferta** | 1–2 seções da biblioteca | resolvido | resolvido | por seção |
| 3 | **Apoio à decisão** | 1–2 seções, exatamente 1 com bloco navy | resolvido | resolvido | por seção |
| 4 | **Prova** | 1–3 seções da biblioteca | resolvido | resolvido | por seção |
| 5 | **Autoridade** | 1–2 seções, exatamente 1 com bloco navy | resolvido | resolvido | por seção |
| 6 | Conversão | **Cotação** — ESTRUTURA FIXA, ver 4.1.4 | `neutral-gray-100` | `pt-8 pb-20` | shortcode do formulário + "Chamar no WhatsApp" |
| 7 | Conversão | **Footer** — ESTRUTURA FIXA, ver 4.1.5 | `navy-premium border-t border-white/15` | `py-6` | — |

"Resolvido" = decidido pelo compositor contra o contrato do item 4.2. Nenhuma seção da biblioteca traz fundo ou padding próprio.

Regras de ritmo que continuam valendo e agora são verificadas por máquina:

- Alternância de fundo: navy (hero) → branco → cinza → cinza (cotação) → navy (footer). Uma única troca de branco para cinza, no meio.
- Dois blocos navy no miolo, um em cada metade, nunca vizinhos.
- Padding assimétrico: o `pt` da seção seguinte compensa o `pb` da anterior; o respiro somado fica entre 80 e 128px no mesmo fundo, e entre 96 e 160px quando o fundo muda.
- Container único em todas as seções: `mx-auto max-w-page px-6 lg:px-10`, aplicado pelo primitivo `Section.astro`.
- Alinhamento à esquerda por padrão; centralizado somente em galerias simétricas.

## 4.1 Estrutura base fixa (Header, Hero, Cotação e Footer)

Estas quatro peças são **idênticas em todas as LPs**. Copie a estrutura, o grid, as medidas e a ordem exatamente como descrito. O que muda é só conteúdo (textos, logo, foto, shortcodes). Se achar que precisa alterar algo estrutural aqui, pare e pergunte.

### 4.1.1 Header

```
<header class="sticky top-0 z-50 bg-primary-dark-900">
  <div class="mx-auto flex max-w-page items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-6 lg:px-10">

    <!-- 1. Logo em placa branca "pendurada" abaixo da barra -->
    <a href="/" class="flex shrink-0 items-center self-start">
      <span class="-mt-3 -mb-10 flex items-center rounded-b-xl bg-neutral-light px-3 pt-1.5 pb-1
                   shadow-[0_10px_24px_-10px_rgba(0,0,0,0.55)] sm:px-6 sm:pt-2 sm:pb-1.5">
        <Image src={logo} alt="{{MARCA}}" width={240} height={200} format="webp"
               loading="eager" fetchpriority="low" decoding="async"
               class="-mt-1 -mb-0.5 h-14 w-auto sm:-mt-2 sm:-mb-1 sm:h-24" />
      </span>
    </a>

    <!-- 2. Tagline central (some no mobile) -->
    <span class="hidden flex-1 text-center font-display text-[15px] font-extrabold tracking-[0.14em]
                 text-neutral-light uppercase sm:block lg:text-[17px]">
      {{PRODUTO_PRINCIPAL}}
    </span>

    <!-- 3. CTA laranja, uppercase, rótulo curto no mobile -->
    <button type="button"
      class="btn-slave-whats inline-flex shrink-0 items-center bg-accent-orange px-4 py-2 font-sans
             text-[11px] font-bold uppercase tracking-[0.04em] text-neutral-light transition-colors
             duration-200 hover:bg-accent-orange-dark sm:px-6 sm:py-2.5 sm:text-[13px] sm:tracking-[0.06em]">
      <span class="sm:hidden">Cotação</span>
      <span class="hidden sm:inline">Solicite sua cotação</span>
    </button>
  </div>
</header>
```

Regras: sem menu, sem links de âncora, sem telefone no header. A placa branca do logo **invade a seção seguinte** (`-mb-10`); o Hero já conta com isso no `py-20`. Logo com fundo transparente ou branco, altura útil 56px mobile / 96px desktop.

### 4.1.2 Hero de três colunas

Grid desktop (`lg`, container 1320px, `px-10`):

```
| coluna 1: texto (1fr ≈ 622px) | gap 24 | coluna 2: VAZIA (270px) | gap 24 | coluna 3: shortcode (300px) |
```

- **Coluna 1** recebe, nesta ordem: `<Eyebrow tone="light">` · `h1` · parágrafo · caixa de 3 pontos com ícone · 2 botões (primary "Solicite sua cotação" + outline-light "Identifique seu {{produto}}" com ícone `search` à esquerda). Largura máxima do texto `max-w-xl` no mobile e `lg:max-w-none`.
- **Coluna 2 é intencionalmente vazia** (`<div class="hidden lg:block" aria-hidden="true">`). É a "janela" por onde o banner de fundo mostra o produto/serviço. Nunca coloque conteúdo nela.
- **Coluna 3** é `w-full lg:w-[300px]` e renderiza `SHORTCODE_CHAT` via `<slot name="shortcode">`. Fallback: caixa tracejada `min-h-[430px] border border-dashed border-neutral-light/35 bg-primary-dark-900/80 backdrop-blur-sm` com o rótulo "Espaço reservado · Shortcode — 300px".
- No mobile o grid vira uma coluna: texto, depois shortcode. A coluna 2 some.

Camadas de fundo, de trás para frente (todas `absolute`, `pointer-events-none` exceto a foto):

| z | Camada | Regra |
|---|---|---|
| 1 | `.hero-photo` com `<Picture>` do banner | mobile: `inset-0` full-width `object-cover`. Desktop: `left:auto; right: var(--page-edge); width: 1700px` — ancorada na **borda direita do container**, não do viewport |
| 2 | `.hero-navy` (véu esquerdo) | mobile: full-width, gradiente navy → transparente a 96%. Desktop: `width: calc(50% - 20px)`, gradiente `to left`: transparente 0 → `rgb(0 24 48 / .45)` 70px → navy-800 150px → navy sólido |
| 2 | `.hero-navy-right` (véu direito) | só desktop: `width: calc(50% - 261px)`, gradiente `to right`: transparente 0 → `rgb(0 24 48 / .55)` 200px → navy-900 364px |
| 3 | `.hero-dots` | malha de pontos `radial-gradient(circle, white/.5 1px, transparent 1px)` 28px, `opacity .35`, desktop `width: calc(50% - 60px)` com máscara que esmaece à direita |
| 4 | mira técnica | svg `size-4 text-white/50` em `left-6 top-6` |
| 5 | conteúdo | `relative z-[5] mx-auto max-w-page px-6 py-20 lg:px-10 lg:py-24` |

Variáveis que amarram tudo ao container (declarar nas classes `.hero-photo, .hero-navy, .hero-navy-right, .hero-dots, .hero-grid`):

```css
--page-half: calc(var(--container-page) / 2);
--page-edge: max(0px, calc(50% - var(--page-half)));
```

Foto do hero: `Picture` com `widths={[640,1024,1536,1981]}`, `sizes="(min-width: 1024px) 1700px, 100vw"`, `formats={['avif','webp']}`, `loading="eager"`, `fetchpriority="high"`, mais `<link rel="preload" imagesrcset>` no head. Seção com `border-b border-white/15` e `bg-primary-dark-900` como cor de segurança.

Caixa de 3 pontos: `inline-flex flex-wrap gap-x-5 gap-y-3 rounded-xl border border-white/10 bg-primary-dark-900/55 px-3.5 py-2.5 backdrop-blur-md`, cada ponto = badge `size-10 rounded-lg border border-white/25 bg-white/10` + texto em **duas linhas fixas** (`line1`/`line2`, `whitespace-nowrap`) `text-[13.5px] font-semibold` com `text-shadow`. Divisória `border-left white/18` entre pontos a partir de `sm`.

### 4.1.3 Brief do banner de fundo (obrigatório para quem cria a imagem)

O banner é desenhado **para o grid acima**, não o contrário. Entregue este brief ao designer ou à ferramenta de geração antes de pedir a imagem:

| Item | Especificação |
|---|---|
| Arquivo | `src/assets/heroBg.png` (ou `.jpg`), **1981 × 900 px** (proporção ≈ 2,2:1), sRGB, até 2,5 MB. O build gera AVIF/WebP em 640/1024/1536/1981 |
| Paleta | fundo em tons navy entre `#001830` e `#003669`, para se fundir aos véus. Sem texto, sem logo, sem marca d'água |
| **Zona A — 0 a 55% da largura** | fundo escuro quase uniforme (cenário desfocado, textura técnica). Fica **totalmente coberta** pelo véu navy, pelos pontos e pelo texto. Nada importante aqui |
| **Zona B — 62 a 79% da largura, centro em ~70%** | o **assunto principal** (produto, peça, equipamento ou cena do serviço): nítido, iluminado, com contraste contra o fundo. É a coluna 2 do grid. Única área que aparece sem véu no desktop |
| **Zona C — 79 a 100% da largura** | escurece progressivamente; recebe o véu direito e a coluna do shortcode. Pode continuar o cenário, sem ponto de foco |
| Vertical | assunto centrado, ocupando 60–80% da altura, e contido nos **65% centrais** da altura (o `object-cover` corta topo e base em telas muito largas ou muito baixas) |
| Direção de luz | vinda da esquerda/cima, para o assunto "sair" do navy e o lado direito cair em sombra |
| Mobile | a imagem vira full-width sob véu navy quase sólido; o assunto aparece atrás do texto, à direita, de forma sutil. Por isso ele **não pode ser a única forma** de entender o produto: o H1 faz esse papel |
| Validação | rodar `npm run dev`, abrir em 1440 px e 1920 px e confirmar: o assunto está entre o fim do texto e o início do shortcode, sem invadir nenhum dos dois. Se invadir, ajustar a imagem, **não o grid** |

Como conferir a posição sem chute: com o container em 1320px, a coluna 2 fica entre **634px e 364px contados da borda direita do container**. Como a foto tem 1700px e é alinhada nessa mesma borda, o assunto deve estar entre **1066px e 1336px** contados da esquerda da foto renderizada (62–79%).

### 4.1.4 Seção final de Cotação

```
<section id="cotacao" class="bg-neutral-gray-100 pt-8 pb-20">
  <div class="mx-auto max-w-page px-6 lg:px-10">
    <div class="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-16">

      <!-- Coluna 1 (desktop) / segunda no mobile: formulário -->
      <div class="order-2 w-full lg:order-1">
        <slot name="shortcode">
          <!-- fallback: caixa tracejada min-h-[520px] rounded-2xl border-dashed border-primary-dark/25 bg-neutral-light
               com "Espaço reservado · Shortcode — formulário de cotação" -->
        </slot>
      </div>

      <!-- Coluna 2 (desktop) / primeira no mobile: texto -->
      <div class="order-1 lg:order-2">
        <Eyebrow>Solicite sua cotação</Eyebrow>
        <h2 class="mt-3 font-display text-3xl leading-tight font-extrabold text-ink sm:text-4xl">
          Fale com quem entende de {{PRODUTO_PRINCIPAL em minúsculas}}.
        </h2>
        <span aria-hidden="true" class="mt-5 block h-[3px] w-16 bg-accent-orange"></span>
        <p class="mt-5 font-sans text-[15px] leading-relaxed text-ink-soft sm:text-base">
          {{1 frase: equipe pronta para identificar, especificar e cotar + "Preencha o formulário ou fale direto conosco pelo WhatsApp."}}
        </p>
        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="button"
            class="btn-slave-whats inline-flex items-center justify-center gap-2.5 bg-primary-dark px-6 py-3.5
                   font-sans text-[15px] font-semibold text-neutral-light transition-colors duration-200 hover:bg-primary-dark-800">
            <Icon name="whatsapp" class="size-4 shrink-0" /> Chamar no WhatsApp
          </button>
        </div>
        <ul class="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
          <!-- SELOS_DE_CONFIANCA: 3 × <li class="flex items-center gap-2 text-[13px] font-medium text-ink"><Icon class="size-4 text-accent-orange"/> texto</li> -->
        </ul>
      </div>
    </div>
  </div>
</section>
```

Regras: o formulário é sempre o `SHORTCODE_FORM`, nunca um `<form>` próprio. O botão de WhatsApp é navy (não laranja) para não competir com o botão de envio do formulário. No mobile o texto vem **antes** do formulário. A seção anterior (Diferenciais) termina em `pb-8` e esta começa em `pt-8`, então os cards sobrepostos de Diferenciais encostam visualmente nesta seção sem espaço duplo.

### 4.1.5 Footer

```
---
import Icon from './Icon.astro'
import { site } from '../data/site'
const year = new Date().getFullYear()
---

<footer class="navy-premium border-t border-white/15">
  <div class="mx-auto flex max-w-page flex-col items-center gap-3 px-6 py-6 text-center
              lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-10 lg:text-left">

    <!-- 1. Copyright (ano automático) -->
    <p class="shrink-0 font-sans text-xs text-neutral-light/55">
      © {year} {site.brand}. Todos os direitos reservados.
    </p>

    <!-- 2. Endereço com pin laranja -->
    <address class="flex items-center gap-2 font-sans text-xs not-italic text-neutral-light/70 lg:whitespace-nowrap">
      <Icon name="map-pin" class="size-3.5 shrink-0 text-accent-orange" />
      <span>{site.address}</span>
    </address>

    <!-- 3. Crédito da agência (único link externo da página) -->
    <p class="shrink-0 font-sans text-xs text-neutral-light/55">
      Desenvolvido por{' '}
      <a href="https://b2marketingindustrial.com.br" target="_blank" rel="noopener noreferrer"
         class="font-semibold text-neutral-light/80 transition-colors hover:text-accent-orange">
        B2 Marketing Industrial
      </a>
    </p>
  </div>
</footer>
```

Regras do footer:

- **Uma linha só, três itens, nesta ordem**: copyright · endereço · crédito da B2. Desktop em linha (`justify-between`), mobile empilhado e centralizado.
- Fundo `navy-premium` com `border-t border-white/15` para separar da seção de Cotação (cinza). Padding `py-6`, nunca maior: o footer é um fechamento, não uma seção.
- Tipografia única `text-xs`; opacidades `55` para texto neutro, `70` para o endereço, `80` para o link. Único acento de cor é o pin laranja e o hover do link.
- Sem menu, sem redes sociais, sem telefone, sem e-mail, sem logo repetido, sem formulário. Contato é papel dos CTAs e do shortcode, não do footer.
- Ano gerado em build (`new Date().getFullYear()`); marca e endereço vêm de `site.ts` (`MARCA`, `ENDERECO`), nunca digitados no componente.
- O link da B2 é o **único** `<a>` externo da página e leva `rel="noopener noreferrer"`. Se o cliente exigir CNPJ ou política de privacidade, entram como quarto item `text-xs text-neutral-light/55` depois do endereço, sem mudar o layout.

## 4.2 Contrato de tom e ritmo

Vive em `src/lib/rhythm.mjs` — um arquivo, três leitores: o primitivo `Section.astro` (aplica as classes), o compositor (resolve) e o `check:lp` (confere). Mexer nele muda o padrão inteiro.

**Tons** disponíveis para seção de miolo. Navy é reservado à estrutura fixa e aos blocos internos.

| Tom | Classe |
|---|---|
| `light` | `bg-neutral-light` |
| `gray` | `bg-neutral-gray-100` |

**Ritmos** — pares de padding aprovados pelo `docs/GUIA-LAYOUT.md`.

| Ritmo | Classe | Para |
|---|---|---|
| `open` | `pt-20 pb-10` | primeira seção depois do hero, terminando em grid de cards |
| `even` | `py-16` | seção padrão |
| `tight` | `pt-6 pb-10` | seção depois de outra que já respirou |
| `flow` | `pt-6 pb-16` | seção plana logo depois de um painel navy: abre curto e devolve bastante ar |
| `panel-lead` | `pt-6 pb-16` | seção que abre com painel navy (o painel já traz `p-6 sm:p-8 lg:py-9`) |
| `panel-tight` | `pt-6 pb-10` | seção de painel navy que fecha o miolo, colada à Cotação |
| `centered-lead` | `pt-4 pb-20` | seção de cabeçalho centrado |
| `overlap` | `pt-6 pb-8` | cards sobrepostos à base de um bloco navy — **só imediatamente antes da Cotação** |
| `close` | `pt-8 pb-20` | a Cotação, estrutura fixa |

`panel-lead`, `panel-tight` e `overlap` declaram compensação de padding interno: o painel navy acrescenta ~36px de cada lado e os cards sobrepostos avançam ~40px abaixo do bloco. Sem essa compensação a conta de respiro daria falso negativo justamente nas duas seções que mais respiram.

**Como o compositor resolve.** Ele testa as combinações na ordem de preferência declarada por cada seção e devolve a primeira que satisfaz tudo:

- o tom e o ritmo estão entre os que a seção declara suportar;
- a sequência de fundos é uma corrida de `light` seguida de uma de `gray`, as duas não vazias;
- cada corrida tem exatamente um bloco navy, e dois blocos navy nunca são vizinhos;
- o respiro entre vizinhas cabe na faixa, inclusive o respiro até a Cotação;
- a primeira seção abre com ao menos 64px;
- ritmo marcado `mustBeLast` fica na última posição.

Entre as soluções válidas ele prefere a que põe a troca de fundo mais perto do meio da página, para que nenhuma das duas metades fique com uma seção só.

Se não houver solução, a mensagem de erro aponta o par de seções em que o respiro travou e o número que faltou. Não contorne editando classe: troque a seção, mude a ordem dentro da fase (`order` no manifesto) ou declare outro ritmo suportado.

## 4.3 Criar uma seção nova na biblioteca

Quando o briefing traz conteúdo relevante para conversão que **nenhuma seção existente comporta**, a saída é uma seção nova **na biblioteca**, não um componente solto dentro da LP. Assim ela nasce validada, entra no catálogo e fica disponível para as próximas LPs.

Antes de criar, descarte estas saídas mais baratas, nesta ordem:

1. o conteúdo **cabe** numa seção existente (vira bullet, feature, item da faixa, selo, linha de tabela ou pergunta do FAQ);
2. existe uma seção da biblioteca que **equivale** ao que o briefing pede com outro nome;
3. o conteúdo **não ajuda a converter** — menu, blog, "sobre nós" longo, vídeo institucional no hero, depoimento sem nome e empresa. Descarte com motivo registrado.

Se ainda assim a seção se justifica, no starter:

```
sections/<slug>/
  section.mjs      manifesto completo (copie o de uma seção da mesma fase)
  <Nome>.astro     componente: recebe `tone` e `rhythm`, embrulha tudo em <Section>
  <slug>.ts        dados de exemplo, tipados, com `as const satisfies`
  <slug>.<forma>.ts  variante de verificação, se o componente tiver outra forma (opcional)
  assets/          placeholders, se precisar
```

Requisitos do componente:

- raiz `<Section id="<slug>" tone={tone} rhythm={rhythm}>`; nada de `bg-` ou `py-` na raiz;
- cabeçalho por `<SectionHeader>` sempre que o layout permitir, para não repetir a escala tipográfica;
- pelo menos um CTA, declarado em `meta.ctas` e escrito como `<Button cta="<slug>-cta">` ou `data-cta="<slug>-{id}"`;
- todo o resto segue `docs/GUIA-LAYOUT.md` — espaçamentos, grids, raios, bordas, sombras, ícones, tipografia e movimento;
- `@media (prefers-reduced-motion: reduce)` em qualquer `transition` ou `animation`.

Requisitos do manifesto: `phase` e `order`; `tones` e `rhythms` na ordem de preferência; `carriesNavy` só se a seção tiver painel navy interno; `purpose`, `needs` e `match` escritos para quem vai decidir (frases inteiras, não rótulos); `contract` com as quantidades que `check:lp` deve verificar.

**Variantes.** Se o componente muda de forma conforme o conteúdo (com ou sem grupos, com ou sem descrição, com ou sem foto), o exemplo só exercita uma delas, e a outra chega à LP sem nunca ter sido montada. Declare cada forma que o exemplo não cobre em `variants` (`{ nome: 'o que muda' }`) e crie `<slug>.<nome>.ts` com os dados dela, exportando os mesmos nomes. A variante não vai para a LP: só a verificação a usa.

Depois, ainda no starter:

```bash
node scripts/library.mjs        # prettier + manifestos + compõe tudo no template e verifica
```

O script compõe **todas** as seções no template e roda `npm run check` e `npm run verify` lá, uma vez com o exemplo e outra com cada variante declarada — é assim que a seção nova prova que tipa, linta, formata e builda em todas as formas. Ele regenera `BIBLIOTECA.md` e restaura a composição de referência no fim.

Registre a seção nova no `CHANGELOG.md` do template e suba a versão menor do padrão.

## 5. Anatomia de seção (copiar literalmente)

Esqueleto de toda seção da biblioteca. O fundo e o padding **não** aparecem aqui: quem os aplica é o `<Section>`, a partir do `tone` e do `rhythm` que a composição passa (item 4.2). O contêiner também vem dele.

```astro
---
import Section from '@components/Section.astro'
import SectionHeader from '@components/SectionHeader.astro'
import Button from '@components/Button.astro'
import type { SectionProps } from '@lib/layout'
import { cta } from '@data/content'
import { dados } from '@data/sections/{{slug}}'

type Props = SectionProps

const { tone, rhythm } = Astro.props
---

<Section id="{{slug}}" tone={tone} rhythm={rhythm} data-{{nome}}>
  <SectionHeader eyebrow={dados.eyebrow} title={dados.title} text={dados.text} width="2xl" />

  <ul class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">…</ul>

  <Button cta="{{slug}}-cta" variant="primary" class="mt-8">{cta.primary}</Button>
</Section>
```

Seção que precisa de um bloco em largura total (bloco navy sangrando nas bordas) passa `container={false}` e monta os próprios contêineres.

Variante sobre navy: `<SectionHeader tone="light" rule />`, ou à mão `<Eyebrow tone="light">`, H2 `text-neutral-light`, traço `<span aria-hidden="true" class="mt-5 block h-[3px] w-16 bg-accent-orange">`, parágrafo `mt-5 text-neutral-light/75`, botão `mt-7`.

## 6. Escala tipográfica

| Papel | Classes |
|---|---|
| H1 | `font-display text-[2.75rem] sm:text-[3rem] xl:text-[3.1rem] font-extrabold leading-[1.1]` |
| H2 | `font-display text-3xl sm:text-4xl font-extrabold leading-tight` (`xl:text-[44px]` no bloco de diferenciais) |
| H3 card | `font-display text-lg font-extrabold leading-snug` |
| H3 painel | `font-display text-2xl lg:text-[28px] font-extrabold leading-tight` |
| Corpo seção | `font-sans text-[15px] leading-relaxed text-ink-soft` |
| Corpo card | `text-[13px] leading-relaxed text-ink-soft`; features `text-[13px] font-medium text-ink` |
| Eyebrow | `text-[12px] font-semibold uppercase tracking-[0.16em]` + quadrado 6px laranja |
| Índice | `text-[11px] font-extrabold tracking-[0.2em]`, sempre `"01"…"0N"` |
| Chip/tag | `text-[10px] font-bold uppercase tracking-[0.16em]` em pílula branca |
| Botão | `text-[15px] font-semibold`; link de card `text-[13px] font-bold`; header `text-[11–13px] font-bold uppercase` |

## 7. Receitas de componente

- **Card claro**: `rounded-2xl border border-neutral-gray-200/70 bg-neutral-light shadow-[0_1px_2px_rgba(13,29,48,0.05)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-accent-orange/50 hover:shadow-[0_28px_56px_-28px_rgba(0,33,71,0.35)]` + barra `absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent-orange group-hover:scale-x-100`.
- **Card escuro** (1 por grid, para destaque): `navy-premium border-white/10`, textos `neutral-light/65–90`.
- **Painel navy**: `navy-premium rounded-2xl border border-white/12` + malha blueprint mascarada + brilho `absolute -top-24 -right-20 size-72 rounded-full bg-accent-orange/15 blur-3xl` + cantos laranja 18px via `::before/::after`.
- **Badge de vidro**: `rounded-full`, gradiente `white/16 → white/4`, `border white/16`, `inset 0 1px 0 white/22`, brilho interno laranja; anel laranja no hover.
- **Bullet check**: `span.size-5 rounded-full bg-accent-orange/10 text-accent-orange` + ícone `check size-3`. Sobre navy: `bg-accent-orange/20`.
- **Chip de seta**: `size-8 rounded-full bg-neutral-gray-100 text-primary-dark group-hover:translate-x-0.5 group-hover:bg-accent-orange group-hover:text-neutral-light`.
- **Button**: `inline-flex items-center justify-center gap-2.5 px-6 py-3.5 font-sans text-[15px] font-semibold transition-colors duration-200`, **cantos retos**, ícone `arrow-right` à direita por padrão. Variantes: `primary` (laranja), `outline-light` (borda `white/35`), `outline-dark` (borda `ink/25`). Sempre inclui `btn-slave-whats`.
- **Eyebrow**: `inline-flex items-center gap-2.5` + `span.h-[6px] w-[6px] bg-accent-orange` + slot; `tone="light"` → `text-neutral-light/70`, default `text-ink-soft`.
- **Carrossel de logos**: lista duplicada, `translateX(-50%)` em 26s linear infinito, pausa no hover, `container-type: inline-size` e `width: calc(100cqw / 5)` por item, máscara lateral de 48px.
- **Tabs acessíveis**: `role="tablist"` vertical, `role="tab"` com `aria-selected`/`aria-controls`/roving `tabindex`, setas + Home/End, painéis alternados por `hidden`, entrada `320ms` opacity+translateY(6px).
- **Trilho mobile**: `-mx-6 px-6 flex snap-x snap-mandatory gap-4 overflow-x-auto` + scrollbar oculta + setas prev/next `lg:hidden` que rolam `card.offsetWidth + 16`.

## 7.1 Catálogo de ícones (`src/data/icons.ts`)

Só estes nomes existem. Na entrevista, ofereça-os como opções; não invente nomes. Se nenhum servir, adicione o ícone ao catálogo (24×24, stroke, sem cor) e registre no resumo.

| Grupo | Nomes |
|---|---|
| Ação / navegação | `search` `arrow-right` `arrow-down` `chevron-down` `chevron-right` `menu` `close` `upload` `check` |
| Confiança / atendimento | `shield` `badge-check` `users` `clock` `map-pin` `pin` `phone` `mail` `chat` `whatsapp` `truck` |
| Produto / técnico | `gear` `sliders` `layers` `box` `cylinder` `circle` `disc` `target` `crosshair` `ruler` `barcode` `hash` `tag` `camera` `wrench` `bolt` `zap` `droplet` `move` `grid` `chip` `cpu` `settings-2` `file` `file-text` |
| Segmentos | `factory` `building` `mountain` `flame` `utensils` `leaf` `trend-up` `more-horizontal` `dots` |
| Redes (só se o cliente exigir) | `linkedin` `instagram` `youtube` |

Sugestões por uso: dados enviáveis → `barcode` `tag` `camera` `ruler` `factory` `target`; diferenciais → `search` `sliders` `layers` `users` `wrench`; selos → `clock` `shield` `map-pin`; hero → `shield` `gear` `truck`.

## 8. Regras de copy

- PT-BR, sentence case, sem ponto final em títulos, features e bullets.
- Eyebrow: 1–3 palavras (substantivo). H2: 3–8 palavras, benefício ou pergunta. Parágrafo de seção: 1 frase, 90–160 caracteres. Descrição de card: 1 frase, 50–90 caracteres. Feature/bullet: 2–4 palavras.
- Quantidades: da estrutura fixa, 3 pontos no hero e 3 selos de confiança. Das seções, quem manda é o `contract` do manifesto de cada uma (tabela em `docs/BIBLIOTECA.md`); `npm run check:lp` falha fora da faixa.
- Vocabulário de CTA (não variar): primário **"Solicite sua cotação"** · secundário **"Identifique seu {{produto}}"** · card **"Falar com especialista"** · contato **"Chamar no WhatsApp"** · header mobile **"Cotação"**. Numa mesma página, não repita o mesmo rótulo em três seções seguidas: alterne primário e secundário conforme o que a seção pede.
- Marcas atendidas aparecem por extenso no H1, na descrição e na meta. Logo no carrossel só com a decisão do cliente registrada (entrada 7). Nenhum texto usa claim proibido (regra 18).
- Microcopy de confiança: ícone laranja `size-4` + frase de 3–5 palavras.
- `alt` descritivo em PT-BR, sem "imagem de".
- Cada lista vive num `const x = [...] as const` (ou `readonly Tipo[]` com `interface`) no topo da seção; o markup só faz `.map`.

## 9. Imagens

- **LCP (hero)**: `Picture` com `widths=[640,1024,1536,1981]`, `formats=['avif','webp']`, `loading="eager"`, `fetchpriority="high"`, e `<link rel="preload" as="image" imagesrcset imagesizes fetchpriority="high">` no head.
- **Demais**: `format="webp"`, `width` explícito (360 produto · 640 card · 900 painel · 1220 pessoa), `loading="lazy"`, `decoding="async"`.
- Card com foto: `aspect-[4/3] object-cover` + véu `h-14 bg-gradient-to-t from-primary-dark-900/55`.
- Produto recortado: `object-contain mix-blend-multiply max-h-[7.75rem]` sobre palco `#f5f7fa→#fff` com pontos radiais mascarados + sombra elíptica.
- Logo do header: eager, `fetchpriority="low"`, altura `h-14 sm:h-24`.
- Fonte das imagens em `src/assets/<seção>/`, nunca em `public/` (exceto favicon). OG image = logo 512px.

## 10. Conversão e integração WordPress

- `site.url` = `URL_FINAL` absoluta (og:url).
- Todo botão: `<button type="button" class="btn-slave-whats …">`. Cards de aplicação: o `<button>` envolve o card inteiro.
- Slot do Hero renderiza `SHORTCODE_CHAT` numa coluna `lg:w-[300px]`; slot da Cotação renderiza `SHORTCODE_FORM` com `min-h-[520px]`. Placeholder tracejado quando vazio: rótulo "Espaço reservado" laranja + "Shortcode — …".
- `WHATSAPP` vazio desliga o botão flutuante; preenchido, renderiza botão fixo inferior-direito com ícone `whatsapp`.
- Publicação `wp-build`: workflow em `BRANCH_PRINCIPAL` → `npm ci` → `npm run build` → `test -f dist/index.html` → `git init -b wp-build` dentro de `dist/` → force-push. `concurrency: wp-build` com `cancel-in-progress: true`. Para Next, trocar `dist/` por `out/`.

### 10.1 Rastreamento de CTAs

Todo CTA leva `data-cta="{secao}-{elemento}"`, único na página (itens gerados em `.map` usam o `id` do item).

Da estrutura fixa, sempre presentes: `header-cta` · `hero-primary` · `hero-secondary` · `cotacao-whatsapp` · `float-whatsapp`.

Das seções, os nomes vêm do campo `ctas` do manifesto de cada uma e dependem da composição: `linhas-{id}` · `especificacoes-cta` · `situacoes-cta` e `situacoes-{id}` · `identificar-cta` · `processo-cta` · `aplicacoes-{id}` · `segmentos-{id}` · `clientes-cta` · `perguntas-cta` · `diferenciais-cta` · `escopo-cta`.

O `Button.astro` exige a prop `cta`, que vira `data-cta`; botões escritos à mão precisam do atributo explícito. `npm run check:lp` falha se faltar, repetir, sair do formato, ou se um CTA declarado no manifesto não aparecer no componente. A lista real desta LP sai de `lp.manifest.json` — entregue-a ao cliente para configurar os eventos no GTM/GA4.

### 10.2 LGPD

Abaixo do slot do formulário há uma nota fixa (`quote.lgpd` em `content.ts`) e, quando `site.privacyUrl` estiver preenchido, o link "Política de privacidade". Pergunte o link na entrada 10 do núcleo; se o cliente não tiver política, mantenha só a nota e registre como pendência no briefing.

## 11. SEO e acessibilidade

- `<title>`: "{{PRODUTO_PRINCIPAL}} para {{CONTEXTO_DE_USO}} | {{MARCA}}". `description` ≤ 160 chars citando marcas + apoio técnico.
- H1 e `<title>` contêm a palavra-chave principal da campanha (entrada 15, regra 17).
- `lang="pt-BR"`; OG: `type, locale, site_name, title, description, url, image`.
- Skip link "Pular para o conteúdo" → `<main id="main">`. Um `h1`, um `h2` por seção, `h3` em cards.
- Decorativos: `aria-hidden="true"` + `pointer-events-none`. Listas com `aria-label`. SVG informativo com `role="img"` + `aria-label`.
- Tabs e trilhos navegáveis por teclado.

## 12. Tooling e entrega

- `package.json` scripts: `dev`, `build`, `preview`, `check`, `lint`, `format`, `format:check`.
- Prettier `.prettierrc.json`: `semi false · singleQuote · printWidth 100 · trailingComma all · plugins [astro|tailwindcss] · tailwindStylesheet ./src/styles/global.css`.
- ESLint flat: `js.recommended`, `tseslint.recommended`, `astro.recommended` (ou `next/core-web-vitals`), `eslint-config-prettier`.
- `.gitignore`: `dist/ out/ .astro/ node_modules/ .env*`.
- Commits em português, prefixo convencional: `feat:`, `fix:`, `style:`, `ci:`, `chore:`.

### 12.1 Scripts do template e ordem de execução

| Comando | Quando |
|---|---|
| `npm run compose -- --list` | antes de decidir a composição: mostra o acervo por fase |
| `npm run compose -- --dry-run <slugs>` | ao avaliar uma composição: só o plano de fundo e respiro, sem escrever |
| `npm run compose -- <slugs>` | ao aplicar a composição aprovada, e a cada troca de seção depois |
| `npm run check:lp` | a cada alteração em `site.ts`, `src/data/sections/*.ts` ou na composição. Duas famílias: **estrutura fixa** (CTAs sem `data-cta`, `href="#"`, `transition` sem `prefers-reduced-motion`, número de `h1`, imagens sem `alt`/`loading`, slots de shortcode, assinaturas do Header/Hero/Cotação/Footer, `site.url` absoluta, palavra-chave da campanha no H1 e no title, claims proibidos, negativas no texto como aviso) e **composição** (ordem das fases, mínimo e máximo por fase, dois blocos navy, alternância de fundos, respiro entre vizinhas, página batendo com `lp.manifest.json`, arquivo órfão, contrato de conteúdo e ícones de cada seção) |
| `npm run check` | tipos do Astro; acusa tupla errada nos arquivos de dados |
| `node --test scripts/resolver.test.mjs` | só no starter: congela o layout das composições de referência |
| `npm run verify` | `check:lp` + lint + prettier + build, na mesma ordem do CI. **Obrigatório antes de dizer que terminou** |
| `npm run screens` | após o build: screenshots em 360/768/1440/1920 e `?grid=1` em `docs/screens/`. Exige `npx -y playwright@1.58.2 install chromium` uma vez. Serve `dist/` numa porta própria (4873) e recusa capturar se a porta estiver servindo outra LP |
| `npm run lh` | Lighthouse CI sobre `dist/` com limites em `lighthouserc.json` (performance ≥ 0,9, acessibilidade ≥ 0,95, LCP ≤ 2,5 s, CLS ≤ 0,1) |

Branch principal é **`main`** em toda LP nova. O workflow `build-wp.yml` só dispara nela. Exploração de layout é branch + PR, nunca pasta `staging/` com script de patch.

## 13. Checklist de entrega (Definition of Done)

Antes de dizer que terminou, verifique e reporte cada item:

**Composição**

- [ ] `lp.manifest.json` existe, com a composição aprovada e a versão do padrão.
- [ ] `docs/BRIEFING.md` registra a composição: seções escolhidas com o motivo, e as descartadas com o motivo.
- [ ] Todas as fases dentro do mínimo e do máximo; exatamente 2 blocos navy, um em cada metade.
- [ ] `src/pages/index.astro` foi gerado por `compose`, não editado à mão.
- [ ] Nenhum componente, arquivo de dados ou pasta de assets de seção fora da composição.

**Conteúdo**

- [ ] `docs/BRIEFING.md` com as 15 entradas do núcleo e as entradas de cada seção em `confirmado`/`default`, assets com status real e aprovação datada.
- [ ] `site.ts` e os `src/data/sections/*.ts` sem valores de exemplo. **O `check:lp` falha nisso** — pela impressão digital que o `compose` grava por seção e por uma lista de rastros ("Linha de produto 1", "Modelo 1", "substitua pela foto real"). Se falhar, ou preencha a seção ou tire-a da composição; nunca use `--allow-example` numa LP.
- [ ] Palavra-chave principal no H1 e no title, ou `mainKeyword: null` registrado como "sem campanha" no `BRIEFING.md`. Avisos de negativa lidos um a um: reescrito o que tinha o sentido que a campanha exclui.
- [ ] Nenhum claim proibido em texto da página (o `check:lp` falha nisso). Área atendida da campanha dita na página, quando a geografia é restrita.
- [ ] Com comitê de compra: cada papel com um bloco que responde o argumento dele, ou a lacuna registrada. Conteúdo futuro (grupos pausados) fora da página.
- [ ] Copy respeita quantidades e vocabulário de CTA do item 8.
- [ ] Nada inventado: número, prazo, certificação, logo de cliente e depoimento vieram do briefing ou de confirmação do usuário.

**Estrutura fixa**

- [ ] Header idêntico ao 4.1.1: placa branca do logo, tagline central, CTA laranja com rótulo curto no mobile.
- [ ] Hero idêntico ao 4.1.2: grid `1fr 270px 300px`, coluna 2 vazia, foto ancorada em `right: var(--page-edge)` com 1700px, véus e pontos nas larguras especificadas, slot do chat em 300px.
- [ ] Banner validado em 1440 e 1920 px: assunto dentro da coluna 2, sem invadir texto nem shortcode (item 4.1.3).
- [ ] Cotação idêntica ao 4.1.4: grid `1.05fr · 1fr`, formulário via shortcode à esquerda, texto à direita, WhatsApp navy, 3 selos; no mobile o texto vem antes.
- [ ] Footer idêntico ao 4.1.5: uma linha com copyright, endereço com pin e crédito da B2; ano automático; nenhum outro link, menu ou contato.
- [ ] Dois slots de shortcode presentes com placeholder de fallback, lidos de `site.shortcodes`.

**Qualidade**

- [ ] `npm run verify` passa (check:lp + lint + prettier + build) e a saída está colada na resposta.
- [ ] `npm run check` sem erro de tipo.
- [ ] Todo CTA tem `data-cta` único no formato `secao-elemento`; lista entregue para o GTM.
- [ ] Nota de LGPD visível abaixo do formulário; link de privacidade presente ou pendência registrada.
- [ ] `docs/screens/` com 360, 768, 1440, 1920 e `1440-grid` gerados a partir do build final.
- [ ] Todos os CTAs são `button.btn-slave-whats`; nenhum `href="#"` ou `onClick`.
- [ ] Um `h1`; `h2` em cada seção; `id`s em português iguais aos do manifesto.
- [ ] Hero com `Picture` eager + preload; todas as outras imagens lazy com `width`.
- [ ] Toda transição/animação tem `prefers-reduced-motion`.
- [ ] Tabs, acordeões e trilhos funcionam por teclado; foco visível laranja.
- [ ] `og:url` absoluta; `title` e `description` no formato do item 11.
- [ ] Workflow de publicação aponta para a branch correta.
- [ ] Mobile 360px: sem scroll horizontal; trilhos com setas; header com CTA curto.

## 14. Formato da sua resposta

1. **Composição**: tabela com seção · fase · fundo · respiro · por que entrou. Abaixo, as seções descartadas com o motivo.
2. Tabela final da entrevista (entrada → valor usado), marcando o que veio de default e que assets ficaram pendentes.
3. Árvore de arquivos criada/alterada.
4. Saída de `npm run compose`, `npm run check:lp`, `build`, `lint` e `format:check`.
5. Checklist do item 13 marcado, com o que ficou pendente e por quê.
6. Caminhos dos screenshots em `docs/screens/` e a lista de `data-cta` da página.
7. Versão do padrão seguida (meta `b2-lp-standard`) e qualquer desvio, com justificativa.

