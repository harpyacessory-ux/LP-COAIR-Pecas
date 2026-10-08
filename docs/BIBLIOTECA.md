# Biblioteca de seções — padrão B2 v2.7.1

Arquivo **gerado** por `node scripts/catalog.mjs` a partir de `sections/*/section.mjs`.
Não edite à mão: mude o manifesto da seção e rode o script de novo.

A página é montada em cinco slots narrativos, sempre nesta ordem. Header e Hero abrem,
Cotação e Footer fecham — essas quatro peças são estrutura fixa e não estão aqui. O que
a biblioteca preenche é o miolo.

## Fases

| Fase | Seções | Bloco navy | Para quê |
| --- | --- | --- | --- |
| **Oferta** (`oferta`) | 1–2 | — | Mostrar o que a empresa vende, em blocos que o visitante reconhece. |
| **Apoio à decisão** (`apoio`) | 1–2 | exatamente 1 | Reduzir o atrito antes da escolha: reconhecer a situação em que o visitante chegou, dizer o que ele precisa ter em mãos e como o atendimento acontece. |
| **Prova** (`prova`) | 1–3 | — | Demonstrar que isso já funciona no contexto do visitante. |
| **Autoridade** (`autoridade`) | 1–2 | exatamente 1 | Responder "por que vocês" e derrubar a última objeção. |

Duas regras estruturais decorrem daí e são verificadas por `check:lp`: a página tem
**exatamente dois blocos navy** no miolo (um em cada metade), e o fundo troca de branco
para cinza **uma única vez**. É o que preserva o ritmo navy → branco → cinza → navy do
padrão qualquer que seja a composição.

## Seções

### Oferta

#### `linhas` — Linhas de produto

Abrir a oferta com 3–4 blocos de produto que o visitante reconhece de imediato, um card escuro fechando o grid com peso visual.

![Seção Linhas de produto](../../LP-STARTER-B2/sections/linhas/preview.png)

| | |
| --- | --- |
| id da seção | `linhas` |
| conteúdo exigido | 3 ou 4 linhas de produto |
| fundos possíveis | light, gray |
| respiros possíveis | `pt-20 pb-10` · `pt-6 pb-10` · `py-16` · `pt-6 pb-16` |
| CTAs | `linhas-{item.id}` |
| assets | `src/assets/linhas/` — 3 a 4 fotos de produto (PNG recortado 800×600, fundo transparente); `src/assets/linhas/` — marcas.png (Foto das embalagens das marcas, 1280×800) |
| alternativas | `especificacoes` |

**Campos do conteúdo**

- `title` — nome da linha, 2–5 palavras
- `tag` — chip de 1–2 palavras
- `description` — 1 frase, 50–90 caracteres
- `features` — 3 características de 2–4 palavras cada
- `photo` — produto recortado, fundo transparente, 800×600

**Regras**

- exatamente 1 card escuro (dark: true), normalmente o de marcas

**Use quando**

- o cliente vende famílias de produto distinguíveis entre si
- há 3 ou 4 grupos, cada um com 3 características objetivas
- existe foto de produto recortada, ou o cliente consegue fornecer
- LP de serviço: os cards viram serviços e o card escuro vira "contrato / atendimento recorrente"

**Não use quando**

- menos de 3 linhas
- as linhas só se diferenciam por medida ou código — nesse caso use "especificacoes"

#### `especificacoes` — Tabela técnica

Mostrar a oferta por número quando ela não se distingue por foto: faixas de trabalho, medidas, conexões. Responde "vocês têm o meu tamanho?" sem atendimento.

![Seção Tabela técnica](../../LP-STARTER-B2/sections/especificacoes/preview.png)

| | |
| --- | --- |
| id da seção | `especificacoes` |
| conteúdo exigido | 3 a 5 colunas e 4 a 10 linhas |
| fundos possíveis | light, gray |
| respiros possíveis | `pt-20 pb-10` · `py-16` · `pt-6 pb-10` · `pt-4 pb-20` · `pt-6 pb-16` |
| CTAs | `especificacoes-cta` |
| assets | nenhum |
| alternativas | `linhas` |

**Campos do conteúdo**

- `columns` — rótulos das colunas, 1–3 palavras cada; a 1ª coluna é o identificador
- `rows` — uma linha por modelo/medida, com exatamente uma célula por coluna
- `note` — rodapé para o que não cabe em célula, ex.: "outras medidas sob consulta"
- `highlight` — no máximo uma linha destacada (a mais vendida)

**Regras**

- mais de 10 linhas não é argumento de venda, é catálogo: reduza ou ofereça PDF
- nenhuma célula com frase: só valor, faixa ou termo curto

**Use quando**

- o cliente pergunta por medida, faixa, potência ou bitola antes de qualquer coisa
- as variantes do produto são visualmente idênticas e se distinguem por número
- o briefing traz tabela, catálogo ou lista de modelos com atributos comparáveis

**Não use quando**

- as variantes se distinguem visualmente — use "linhas"
- menos de 4 modelos, ou atributos que não são comparáveis entre si
- a oferta é serviço

#### `vitrine` — Vitrine de produtos

Mostrar amplitude de catálogo: de 6 a 24 produtos em grade, ou uma prateleira por marca com a logo no cabeçalho, quando o reconhecimento vem da foto.

![Seção Vitrine de produtos](../../LP-STARTER-B2/sections/vitrine/preview.png)

| | |
| --- | --- |
| id da seção | `vitrine` |
| conteúdo exigido | 6 a 24 produtos, em 0 a 6 grupos (marca, linha ou família) |
| fundos possíveis | light, gray |
| respiros possíveis | `pt-20 pb-10` · `py-16` · `pt-6 pb-10` · `pt-6 pb-16` |
| CTAs | `vitrine-{item.id}` |
| assets | `src/assets/vitrine/` — uma foto por produto, 6 a 24 (PNG/JPG 800×600 (4:3), produto centrado, fundo branco ou transparente); `src/assets/vitrine/` — uma logo por grupo (opcional) (PNG 400×160, fundo branco ou transparente) |
| alternativas | `linhas`, `especificacoes` |

**Campos do conteúdo**

- `title` — nome do produto como o cliente o chama, 2–5 palavras
- `description` — 1 frase, 50–90 caracteres — opcional, mas tudo ou nada
- `photo` — foto do produto, 800×600, fundo branco ou recortado
- `group` — id do grupo a que o produto pertence; vazio quando não há grupos
- `groups.label` — nome da marca ou linha, 1–3 palavras
- `groups.logo` — logo do grupo, 400×160 — opcional; sem ela entra o nome

**Regras**

- descrição é tudo ou nada: ou todos os itens têm a frase, ou nenhum tem. Meia lista descrita lê como página inacabada, e o componente recusa a mistura no build
- havendo grupos, todo item aponta para um deles; item órfão quebra o build com o id na mensagem
- não pergunte ao cliente se é grade ou carrossel: sem grupos é grade, com grupos é uma prateleira por grupo. Layout não é entrada de briefing
- logo de marca de terceiro é decisão do cliente, registrada no BRIEFING.md (entrada 7) — sem logo, entra o nome do grupo

**Use quando**

- a oferta é amplitude de catálogo: o visitante reconhece o que precisa pela foto
- há 6 ou mais produtos com foto e nome, mas não há 3 características objetivas por item
- os produtos se organizam por marca ou linha, com logo ou só com o nome do grupo
- o cliente distribui marcas de terceiros e o reconhecimento vem da marca, não da categoria

**Não use quando**

- há 3 ou 4 famílias com 3 características cada — use "linhas", que vende melhor por item
- os itens só se distinguem por medida, faixa ou código — use "especificacoes"
- menos de 6 itens: a vitrine fica rala e a grade não fecha
- "linhas" já está na composição — as duas respondem "o que vocês vendem" e competem entre si

### Apoio à decisão

#### `situacoes` — Situações

Nomear o momento em que o visitante chegou — máquina parada, peça sem código, parada programada — e dizer em uma linha o que a empresa faz nele. Cada card é o CTA.

![Seção Situações](../../LP-STARTER-B2/sections/situacoes/preview.png)

| | |
| --- | --- |
| id da seção | `situacoes` |
| conteúdo exigido | 4 a 6 situações |
| fundos possíveis | light, gray |
| respiros possíveis | `py-16` · `pt-6 pb-10` · `pt-20 pb-10` · `pt-6 pb-16` |
| CTAs | `situacoes-cta`, `situacoes-{item.id}` |
| assets | nenhum |
| alternativas | `identificar` |

**Campos do conteúdo**

- `title` — o momento, na palavra de quem vive o problema, 1–3 palavras
- `outcome` — o que a empresa faz nesse momento, 1 frase até 90 caracteres
- `icon` — nome do catálogo de src/data/icons.ts

**Regras**

- fale de capacidade (identificar, encontrar, especificar), nunca de prazo de entrega ou estoque
- a situação é do visitante, não da empresa: "máquina parada", não "atendimento emergencial"
- as situações vêm do que o comercial mais ouve, não de suposição

**Use quando**

- a compra é reativa: o visitante chega porque algo quebrou, parou ou não foi encontrado
- o comercial sabe listar 4 a 6 gatilhos recorrentes de contato
- a LP recebe tráfego de busca por urgência ("bomba parada", "peça sem código")
- o briefing descreve dores e consequências em vez de descrever o produto

**Não use quando**

- a compra é planejada e o visitante já sabe o que quer — o gatilho não é uma dor
- os gatilhos são só reformulações do mesmo problema
- a fase de apoio já tem 2 seções

#### `identificar` — Painel de apoio à identificação · bloco navy

Tirar do caminho o medo de "não sei o que pedir": lista os 6 dados que bastam para a equipe identificar o produto, em painel navy que dá o respiro escuro do meio.

![Seção Painel de apoio à identificação](../../LP-STARTER-B2/sections/identificar/preview.png)

| | |
| --- | --- |
| id da seção | `identificar` |
| conteúdo exigido | exatamente 6 itens — dados que o cliente envia, ou variáveis que definem a especificação |
| fundos possíveis | light, gray |
| respiros possíveis | `pt-6 pb-16` |
| CTAs | `identificar-cta` |
| assets | nenhum |
| alternativas | `processo` |

**Campos do conteúdo**

- `label` — o dado, 1–2 palavras
- `hint` — esclarecimento de 2–4 palavras
- `icon` — nome do catálogo de src/data/icons.ts

**Regras**

- o título é uma pergunta ("Precisa identificar um produto?", "Qual tecnologia a sua aplicação pede?")
- a microcopy ao lado do botão tem 3–5 palavras
- os 6 itens são de um tipo só: ou tudo "o que enviar", ou tudo "o que define a escolha" — misturar confunde

**Use quando**

- o produto é identificado por referência, código, medida ou foto
- o visitante costuma chegar sem saber a especificação exata
- o cliente aceita receber pedido incompleto e completar no atendimento
- variante colhida da LP Wortec: a escolha depende de variáveis do processo (viscosidade, corrosividade, temperatura, pressão) — os 6 itens viram as variáveis, e o título passa a ser "o que define a tecnologia certa"

**Não use quando**

- a compra não exige especificação (nesse caso use "processo")
- a empresa vende serviço e o atrito está no "como funciona", não no "o que é" — use "processo"

#### `processo` — Como funciona (etapas) · bloco navy

Tornar previsível um serviço que o visitante nunca contratou: 4–6 etapas com responsável e prazo, no mesmo painel navy do "identificar".

![Seção Como funciona (etapas)](../../LP-STARTER-B2/sections/processo/preview.png)

| | |
| --- | --- |
| id da seção | `processo` |
| conteúdo exigido | 4 a 6 etapas |
| fundos possíveis | light, gray |
| respiros possíveis | `pt-6 pb-16` |
| CTAs | `processo-cta` |
| assets | nenhum |
| alternativas | `identificar` |

**Campos do conteúdo**

- `title` — nome da etapa, 1–3 palavras
- `description` — 1 frase, 50–90 caracteres, dizendo o que acontece
- `when` — prazo ou marco, 2–4 palavras (opcional, mas melhor com)
- `icon` — nome do catálogo de src/data/icons.ts

**Regras**

- as etapas são as reais do cliente, com os prazos que ele se compromete a cumprir
- sem prazo confirmado, deixe `when` de fora em vez de inventar
- variante colhida da LP Pioneira Componentes MRO: sem prazo nenhum, as etapas viram verbos de capacidade (identificar → encontrar → orientar → resolver) e cada descrição vira o benefício para quem está na manutenção

**Use quando**

- a oferta é serviço, obra, instalação, adequação a norma ou contrato de manutenção
- o visitante nunca comprou isso e a dúvida é "como funciona", não "o que é"
- o cliente tem um processo definido e prazos que assume publicamente
- ou, sem prazos: a empresa tem uma cadeia de capacidade clara e quer mostrar o caminho do primeiro contato até a solução

**Não use quando**

- a compra é de produto de prateleira — use "identificar"
- o processo tem menos de 4 etapas reais, ou é "pediu, entregamos"

### Prova

#### `aplicacoes` — Aplicações

Fazer o visitante se reconhecer pelo equipamento que ele mantém, com 4 fotos de aplicação em cards inteiramente clicáveis.

![Seção Aplicações](../../LP-STARTER-B2/sections/aplicacoes/preview.png)

| | |
| --- | --- |
| id da seção | `aplicacoes` |
| conteúdo exigido | exatamente 4 aplicações |
| fundos possíveis | light, gray |
| respiros possíveis | `pt-4 pb-20` · `py-16` · `pt-6 pb-16` |
| CTAs | `aplicacoes-{item.id}` |
| assets | `src/assets/aplicacoes/` — 4 fotos (JPG/PNG 1200×900 (4:3), equipamento em operação) |
| alternativas | `segmentos`, `clientes` |

**Campos do conteúdo**

- `label` — o equipamento ou aplicação, 1–3 palavras
- `description` — 1 frase, 50–90 caracteres
- `photo` — foto do equipamento em operação, 1200×900 (recorte 4:3)

**Regras**

- o card inteiro é o CTA: não há botão separado

**Use quando**

- existem 4 equipamentos ou contextos de uso visualmente distintos
- há foto real de cada um, ou o cliente consegue fornecer
- o visitante identifica o próprio problema pelo equipamento, não pelo setor

**Não use quando**

- menos de 4 aplicações com foto
- "segmentos" já cobre o mesmo reconhecimento com mais profundidade e não há material para as duas

#### `segmentos` — Segmentos atendidos

Provar domínio do setor do visitante: 8 abas com o vocabulário de cada indústria e os equipamentos que ela mantém.

![Seção Segmentos atendidos](../../LP-STARTER-B2/sections/segmentos/preview.png)

| | |
| --- | --- |
| id da seção | `segmentos` |
| conteúdo exigido | exatamente 8 segmentos — 7 reais + o 8º obrigatoriamente "outras" |
| fundos possíveis | light, gray |
| respiros possíveis | `py-16` · `pt-6 pb-10` · `pt-6 pb-16` |
| CTAs | `segmentos-{item.id}` |
| assets | `src/assets/segmentos/` — 8 fotos (opcionais) (JPG/PNG 1200×900 (4:3), planta do setor em operação) |
| alternativas | `aplicacoes`, `clientes` |

**Campos do conteúdo**

- `label` — nome do setor, 1–3 palavras
- `description` — 1 frase, 90–160 caracteres, com o vocabulário do setor
- `bullets` — 3 equipamentos ou processos daquele setor
- `icon` — nome do catálogo de src/data/icons.ts
- `photo` — foto do setor em operação, 1200×900 (opcional: sem foto entra um painel navy com ícone)

**Regras**

- o 8º item tem id "outras" e é a rota de fuga de quem não se vê na lista
- briefing com mais de 7 setores: escolher os 7 de maior impacto e levar os demais para bullets

**Use quando**

- o cliente atende 5 ou mais setores e sabe falar a língua de cada um
- há diferença real de aplicação entre os setores, não só o nome
- vale para produto e para serviço

**Não use quando**

- a empresa atende um único setor — a seção viraria repetição
- não há 7 setores com 3 equipamentos cada; use "aplicacoes" ou "clientes"

#### `clientes` — Clientes e números

Trocar adjetivo por prova verificável: logos de quem já é atendido e 3 números que o cliente assume publicamente.

![Seção Clientes e números](../../LP-STARTER-B2/sections/clientes/preview.png)

| | |
| --- | --- |
| id da seção | `clientes` |
| conteúdo exigido | 4 a 8 logos de cliente e exatamente 3 números |
| fundos possíveis | light, gray |
| respiros possíveis | `py-16` · `pt-6 pb-10` · `pt-4 pb-20` · `pt-6 pb-16` |
| CTAs | `clientes-cta` |
| assets | `src/assets/clientes/` — 4 a 8 logos (WebP/PNG 400×160, fundo branco ou transparente, margem interna uniforme) |
| alternativas | `segmentos`, `aplicacoes` |

**Campos do conteúdo**

- `logos` — nome + arquivo do logo, 400×160, fundo branco ou transparente
- `metrics.value` — o número, curto: "18", "1.200", "48 h"
- `metrics.label` — o que o número mede, 2–5 palavras
- `metrics.icon` — nome do catálogo de src/data/icons.ts

**Regras**

- logo de cliente exige autorização de uso de marca — sem ela, o logo não entra
- número sem fonte não entra: confirme cada um com o cliente e registre no BRIEFING
- não há depoimento nesta seção; depoimento sem nome, cargo e empresa lê como inventado

**Use quando**

- o cliente tem logos autorizados de contas reconhecíveis no setor
- existem 3 números objetivos e verificáveis (tempo de casa, itens em estoque, prazo de resposta)
- a LP disputa com concorrente maior e precisa mostrar porte

**Não use quando**

- não há autorização de uso de marca nem números confirmados
- os números são fracos ou genéricos — melhor não ter a seção do que ter uma vaga
- a fase "prova" já está com 3 seções

### Autoridade

#### `perguntas` — Perguntas frequentes

Derrubar a última objeção antes do formulário, com as perguntas que o comercial realmente ouve. Acrescenta JSON-LD FAQPage à página.

![Seção Perguntas frequentes](../../LP-STARTER-B2/sections/perguntas/preview.png)

| | |
| --- | --- |
| id da seção | `perguntas` |
| conteúdo exigido | 4 a 8 perguntas |
| fundos possíveis | light, gray |
| respiros possíveis | `py-16` · `pt-6 pb-10` · `pt-6 pb-16` |
| CTAs | `perguntas-cta` |
| assets | nenhum |

**Campos do conteúdo**

- `question` — a pergunta na palavra do cliente, terminando em "?"
- `answer` — 1 a 3 frases; resposta que resolve, não que empurra para o contato

**Regras**

- as perguntas vêm do atendimento real, não de suposição — peça a lista ao comercial
- resposta que passa de 3 linhas indica objeção grande demais para acordeão: vire seção
- não repita conteúdo das seções de oferta: aqui é objeção (prazo, mínimo, nota, garantia, entrega)

**Use quando**

- o comercial sabe listar as 5 dúvidas que mais travam o fechamento
- as objeções são operacionais (prazo, faturamento, mínimo, garantia, região)
- a LP recebe tráfego pago e o visitante não conhece a empresa

**Não use quando**

- não há lista real de perguntas do atendimento
- as dúvidas são sobre especificação — isso é "identificar" ou "especificacoes"

#### `diferenciais` — Diferenciais · bloco navy

Responder "por que vocês" com a frase de autoridade sobre bloco navy e 5 cards sobrepostos. É o último respiro escuro antes do formulário.

![Seção Diferenciais](../../LP-STARTER-B2/sections/diferenciais/preview.png)

| | |
| --- | --- |
| id da seção | `diferenciais` |
| conteúdo exigido | exatamente 5 diferenciais |
| fundos possíveis | light, gray |
| respiros possíveis | `pt-6 pb-8` |
| CTAs | `diferenciais-cta` |
| assets | `src/assets/diferenciais/` — cenario.jpg (Cenário/bancada 1600×900, sangra à direita do bloco navy); `src/assets/diferenciais/` — pessoa.png (Pessoa recortada de corpo inteiro, 1220×1000, fundo transparente) |
| alternativas | `escopo` |

**Campos do conteúdo**

- `title` — 2–4 palavras
- `description` — 1 frase, até 70 caracteres
- `icon` — nome do catálogo de src/data/icons.ts

**Regras**

- titleLines: a frase de autoridade quebrada em 2 linhas, 3–6 palavras no total
- scene: foto de bancada/cenário 1600×900, sangra à direita do bloco navy
- person: pessoa recortada em fundo transparente, 1220×1000, de corpo inteiro

**Use quando**

- o argumento de fechamento é a qualidade do atendimento e da equipe
- há 5 motivos objetivos de compra, não adjetivos genéricos
- existe foto de alguém da equipe recortada, ou o cliente consegue produzir
- é a escolha padrão da fase de autoridade: prefira-a quando não houver motivo claro para "escopo"

**Não use quando**

- o que diferencia a empresa é o escopo do atendimento, não a lista de qualidades — use "escopo"
- não há foto de pessoa recortada nem como produzir: o bloco navy fica vazio à direita

#### `escopo` — Escopo do atendimento · bloco navy

Vender o escopo em vez da lista de qualidades: o ganho de resolver a aplicação inteira num pedido só — uma cotação, um interlocutor, menos fornecedores.

![Seção Escopo do atendimento](../../LP-STARTER-B2/sections/escopo/preview.png)

| | |
| --- | --- |
| id da seção | `escopo` |
| conteúdo exigido | 4 a 6 ganhos da consolidação |
| fundos possíveis | light, gray |
| respiros possíveis | `pt-6 pb-16` · `pt-6 pb-10` |
| CTAs | `escopo-cta` |
| assets | `src/assets/escopo/` — composicao.png (PNG/WebP 1600×600, itens da mesma aplicação sobre fundo neutro ou transparente) |
| alternativas | `diferenciais` |

**Campos do conteúdo**

- `label` — o ganho, 2–4 palavras
- `hint` — o detalhe que o torna concreto, 3–8 palavras
- `icon` — nome do catálogo de src/data/icons.ts
- `titleLines` — a promessa quebrada em 2 linhas, 4–8 palavras no total
- `photo` — composição dos itens de uma mesma aplicação, 1600×600, fundo neutro

**Regras**

- cada ganho é um efeito para o cliente, não uma característica da empresa: "uma cotação para todos os itens", não "equipe qualificada"
- nada de prazo de entrega nem de promessa de estoque sem contrato que sustente
- não convive com "diferenciais": a fase de autoridade aceita um bloco navy só

**Use quando**

- a empresa fornece vários itens da mesma aplicação e o ganho real é consolidar a compra
- o público inclui Compras, para quem menos fornecedor e menos cotação é argumento direto
- o cliente disputa com distribuidores que vendem item avulso
- o briefing fala em "solução completa", "pacote", "aplicação inteira", "um só fornecedor"

**Não use quando**

- a empresa vende um produto único, sem itens complementares — use "diferenciais"
- o argumento de venda é a qualidade do atendimento, não o escopo — use "diferenciais"
- "diferenciais" já está na composição

## Como aplicar uma composição

```bash
npm run compose -- --list                       # ver o acervo
npm run compose -- --dry-run <slugs...>          # só o plano
npm run compose -- linhas identificar aplicacoes segmentos diferenciais
```

O compositor resolve fundo e respiro de cada seção, copia componente, dados e assets,
remove o que saiu da composição e grava `src/pages/index.astro` e `lp.manifest.json`.
Arquivo de dados ou asset que já existe na LP é preservado — é lá que está o conteúdo do
cliente. `--force` volta ao exemplo da biblioteca.

