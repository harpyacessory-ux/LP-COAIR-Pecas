# Changelog do padrão B2 de landing pages

Formato: versão · data · mudanças. A versão vive em `package.json`, em `site.standardVersion` e na meta `b2-lp-standard` do HTML. Cada LP registra no `docs/BRIEFING.md` qual versão seguiu.

## 2.7.1 — 2026-10-08

Achado no primeiro uso real do organizador, com o briefing de campanha da COAIR: ele seguiu a ordem certa — perguntou o foco antes de organizar —, mas perguntou em texto aberto ("Qual LP vamos montar agora?") e confirmou o tipo de LP com "Confirma? Se não for isso, me corrija".

- `PROMPT-BRIEFING-CLIENTE.md`: **toda pergunta vem com opções** (item 0, passo 9), no mesmo modelo que o agente de código já usa — de 2 a 4 opções numeradas mais "Outro", a primeira **recomendada conforme o contexto**, com o motivo tirado do material. Sem base no material para recomendar, ele diz isso em vez de chutar.
- A exceção é o pedido de arquivo ou material (briefing de campanha, lista de palavras-chave, material do cliente, fotos): aí ele pede o arquivo, e diz o que responder se não houver.
- Os pontos que tinham pergunta aberta passaram a ter exemplo ou instrução explícita: o foco da campanha (recomendado pelo que o briefing indicar — prioridade, orçamento, destino que ainda falta), o tipo de LP, produto e serviço, divergência entre tipo e palavras-chave, descrição pela metade, features e processo de atendimento.
- `PROMPT-PADRAO-LP.md`: a pergunta de foco do agente de código também passa a vir com a recomendada primeiro e o critério.

## 2.7.0 — 2026-10-07

O briefing de campanha — o plano do Google Ads com campanhas, grupos, palavras-chave, anúncios e negativas — passa a ser uma entrada do fluxo. Ele responde as palavras-chave e traz o que a página precisa respeitar: o que não pode afirmar, onde atende e o que ainda não está à venda.

### Organizador (`PROMPT-BRIEFING-CLIENTE.md`)

- A primeira pergunta passa a ser **"existe briefing de campanha?"**. Sem ele, o caminho é o de antes (lista de palavras-chave). Tudo o que é novo fica num bloco só (item 0.0), lido apenas quando a resposta é sim.
- **Uma LP por execução.** Briefing que cobre várias campanhas não é organizado de uma vez: o organizador lista as campanhas e pergunta qual é o foco. O resto fica registrado como fora desta execução.
- Da campanha escolhida, e só dela, saem: palavras-chave dos grupos ativos; **área atendida** (tem de aparecer na página, principalmente quando o anúncio insere a cidade de quem busca); negativas separadas em **de oferta** e **de intenção**; **claims proibidos**; a **copy dos anúncios** como fonte de conteúdo e de fatos (`extraído` / `inferido`); o **comitê de compra**, um argumento por papel; e o **conteúdo futuro** dos grupos pausados, que fica fora da página.
- A tabela de viabilidade ganha a coluna "Papéis que responde": papel do comitê sem bloco é lacuna, como família de palavra-chave sem bloco.

### Claims proibidos reprovam a LP

- `campaign.forbidden` em `site.ts`. O `check:lp` **falha** se o texto da página — inclusive alt — usar qualquer um, dizendo o campo e o trecho. Diferente da negativa, aqui não há sentido inocente: o risco é jurídico e de relação com a marca. Sai da lista só com autorização registrada.
- Só as negativas **de oferta** (o que a empresa não vende) vão para `campaign.negatives` e geram aviso. As de intenção (emprego, curso, marketplace) ficam só no `BRIEFING.md`: nunca seriam assunto da página e só gerariam ruído.
- Testado com os valores da COAIR (campanha de Serviços): "autorizada" e "até 42%" plantados no hero reprovam; "cabeçote" gera aviso — e o aviso também aparece em "Fusos e cabeçotes", do exemplo de segmentos, que é outro sentido. É por isso que negativa é aviso e claim é erro.

### Agente de código (`PROMPT-PADRAO-LP.md`)

- Lê os campos novos do briefing organizado e pergunta o foco se encontrar um briefing de várias campanhas sem foco definido.
- Entrada 15 renomeada para **CAMPANHA**: palavra-chave, negativas de oferta, claims proibidos e área atendida. Entrada 5 recebe o comitê, um argumento por papel. Regra inviolável 18: claim proibido não vai ao ar.
- Entrada 7 renomeada para **MARCAS_ATENDIDAS**: logo de marca de terceiro é decisão do cliente, caso a caso, registrada no `BRIEFING.md`. O item 8 deixa de dizer que as marcas aparecem "como logos no carrossel" — e de chamá-las de "representadas", termo que é claim proibido para um cliente multimarcas. O manifesto da vitrine e o organizador seguem a mesma regra. Logo de cliente atendido (seção `clientes`) continua exigindo autorização.
- `docs/BRIEFING.md`: a seção Campanha registra foco, área atendida, os dois tipos de negativa e os claims proibidos, e ganha as tabelas de comitê de compra e de conteúdo futuro.

## 2.6.0 — 2026-10-07

Duas proteções para as LPs daqui para frente, e a verificação da biblioteca passa a montar as formas que o exemplo não usa.

### Material bruto do cliente fora do repositório

- O `.gitignore` do template ignora `docs/briefing-cliente/` (menos o `README.md` da pasta). É onde o padrão manda guardar proposta, catálogo, prints e mensagens do cliente — e bastava uma LP ir para um repositório público para isso ficar aberto. O que a LP precisa dele continua versionado, organizado, em `docs/BRIEFING.md`.
- O prompt avisa o agente: num clone novo a pasta vem vazia, e o `BRIEFING.md` é a fonte — não se pede o material de novo só por isso.

### Variantes de seção

- Manifesto ganhou `variants` (opcional): `{ nome: 'o que muda' }`, cada uma com um arquivo `<slug>.<nome>.ts` na pasta da seção. O registry recusa variante sem arquivo.
- `library.mjs` (e o CI) monta cada variante no lugar do exemplo e roda `check` e `verify` de novo. A variante fica na biblioteca: o `compose` só copia o arquivo de exemplo.
- Primeira: `vitrine.grade.ts` — sem grupos, sem descrição, no mínimo de 6 itens. Provado contra o componente de antes da correção da 2.4.0: o exemplo passava com 0 erros, a variante acusa os 9.

### Correções no `new-lp.mjs`

- O commit inicial falhava sempre: com `shell: true`, a mensagem era partida em palavras e o git as lia como nomes de arquivo. O script parava com erro, sem commit e sem mostrar os próximos passos. O git agora roda sem shell.
- Sem identidade do git configurada na máquina, o script não quebra mais no meio: deixa os arquivos adicionados e mostra os comandos para o commit inicial. A identidade é de quem faz a LP, então não é herdada do starter.
- O template não tinha `.gitattributes`: o `eol=lf` da 2.2.0 valia só no starter. Num clone de LP no Windows os arquivos voltavam em CRLF e o `format:check` do `verify` reprovava a LP. O template agora leva o mesmo `.gitattributes`.

## 2.5.0 — 2026-10-07

Fecha a ponta que a 2.4.0 deixou aberta: o briefing passou a coletar a palavra-chave da campanha, mas nada depois dele a usava. O prompt do agente de código não a mencionava, o H1 saía de "{produto} para {contexto}" sem conferência, e o `check:lp` não sabia que ela existia.

### A palavra-chave principal está no H1 e no title

- `site.ts` ganhou o export `campaign`, com `mainKeyword` e `negatives`.
- `check:lp` **falha** se a palavra-chave principal não estiver no H1 (`hero.title`) e no title, dizendo qual palavra falta. A comparação aceita o que o Google também trata como variante próxima: maiúscula, acento, plural ("rolamento industrial" casa com "Rolamentos industriais") e outra ordem. "De", "para" e afins não contam.
- `mainKeyword: null` é decisão registrada — a LP não tem campanha — e vira aviso. Vazio é entrada esquecida e conta como conteúdo de exemplo: erro numa LP, aviso no template.
- Negativas viram **aviso**, com o trecho e o campo onde aparecem. Não é erro porque a palavra pode estar em outro sentido: "usado" como negativa (segunda mão) e "amplamente usado em redutores" numa descrição.
- A comparação vive em `template/scripts/lib/keyword.mjs`, sem dependências, e tem testes próprios (`scripts/keyword.test.mjs`), no `library.mjs` e no CI. Um plural mal tratado ali trava a entrega de uma LP correta.

### Prompt e registro

- `PROMPT-PADRAO-LP.md`: entrada 15 do núcleo, **PALAVRA_CHAVE + NEGATIVAS**, perguntada logo depois da entrada 2 — produto e contexto, que montam o H1, já saem no vocabulário da campanha. Lida como `extraído` da seção "Campanha e palavras-chave" do briefing organizado. Regra inviolável 17 e item no checklist de entrega.
- `docs/BRIEFING.md`: seção "Campanha" (principal, origem, negativas, divergência de vocabulário) e a linha 15 do núcleo.

### Correções

- O painel (`scripts/dashboard.mjs`) procurava a seção "Entradas da entrevista", que o `BRIEFING.md` não tem desde a v2: mostrava "0/0 confirmadas" em toda LP. Passou a ler "Entradas do núcleo", com o título antigo como alternativa.
- `site.ts` citava números de entrada de uma versão antiga da entrevista ("URL… (entrada 15)"). Corrigidos para a numeração atual.

## 2.4.0 — 2026-10-07

Uma seção para a oferta que não cabia em nenhuma, e um briefing que começa pela campanha. Nenhuma mudança nas seções existentes: as composições de referência resolvem exatamente como na 2.3.0.

### Seção nova: `vitrine` — Vitrine de produtos

Origem: briefings em que a oferta é amplitude de catálogo — muitos itens que o visitante reconhece pela foto. A `linhas` exige 3 características por item e aceita no máximo 4; a `especificacoes` é tabela de número. Uma lista de 12 produtos em 3 marcas não cabia em nenhuma.

- De 6 a 24 produtos, em 0 a 6 grupos (marca, linha ou família). Sem grupos é grade; com grupos, uma prateleira por grupo, com a logo — ou o nome — no cabeçalho.
- O layout não é entrada de briefing: sai do conteúdo. Ninguém pergunta ao cliente se é grade ou carrossel.
- O componente **recusa no build**, dizendo qual item: descrição pela metade (é tudo ou nada), item apontando para grupo inexistente, item sem grupo quando há grupos, e grupo sem itens.
- Logo de marca de terceiro só entra com autorização de uso; sem ela, vale o nome do grupo.
- Os 10 placeholders entraram em `placeholders.json`, e o `check:lp` passou a reconhecer as setas da prateleira (`data-rail-prev` / `data-rail-next`) como botão de interface, sem `data-cta`.
- `PROMPT-PADRAO-LP.md` ganhou o atalho de composição para catálogo amplo: `vitrine identificar aplicacoes escopo`.

### O briefing começa pela campanha

A LP é o destino de uma campanha: quem clica digitou alguma coisa antes, e é isso que a primeira dobra tem de repetir. O `PROMPT-BRIEFING-CLIENTE.md` passou a pedir, **antes do material do cliente**:

1. **As palavras-chave da campanha.** A principal tem de estar no H1 e no título da aba. As negativas viram conteúdo proibido na página. Cada família de termo aponta para o bloco que a responde, e família sem bloco é registrada como lacuna — a campanha estaria pagando por clique que a página não atende.
2. **O tipo de LP** (produto, serviço, produto e serviço, outro), conferido contra as palavras-chave, e a **lista da oferta** numa tabela única: grupo · produto · descrição · imagem. A forma da lista diz o bloco que cabe — linhas de produto, tabela técnica ou vitrine.

A tabela de viabilidade ganhou a coluna "Palavras-chave que responde", e o documento de saída, as seções "Campanha e palavras-chave" e "Oferta".

## 2.3.0 — 2026-09-26

Fecha, para imagem, a mesma porta que a 2.2.0 fechou para texto.

### Imagem de exemplo não vai mais ao ar

Era uma assimetria: o `check:lp` lia todos os textos e barrava sobra de exemplo, mas nunca abria um arquivo de imagem. Verificado antes da correção — uma LP com **todo o texto real e todas as fotos ainda placeholder** passava no `verify` e seguiria para o `wp-build` com "substitua pela foto real" na tela.

- `scripts/placeholders.mjs` (starter) gera `template/placeholders.json`: a assinatura de cada uma das 33 imagens de exemplo do padrão, fixas e de todas as seções — inclusive as fora da composição atual, porque a LP pode compor outra depois.
- O arquivo viaja para dentro de cada LP junto com o template, então a verificação funciona sem a biblioteca por perto.
- `check:lp` assina cada imagem de `src/assets/` e **falha** se alguma ainda for a de exemplo, dizendo qual. Mesma escape `--allow-example` do texto.
- O caso que isso existe para pegar não é a página inteira com placeholder, que qualquer um vê: é a oitava foto de segmento esquecida numa aba que ninguém clicou na revisão.

### A imagem entregue cumpre a especificação?

Aviso, nunca erro — é orientação para quem produz o arquivo, não motivo para travar publicação.

- Os manifestos passaram a declarar `width`, `height` e `alpha` por grupo de arquivo, ao lado da descrição em texto que já existia. As medidas conferem com os placeholders, um a um.
- `check:lp` avisa quando a proporção não bate (a imagem seria cortada), quando a largura é pequena demais para o espaço (seria ampliada e perderia nitidez), e quando uma foto que precisa vir **recortada** chega com fundo sólido — o erro que transforma a pessoa da equipe num retângulo branco colado no bloco navy.
- Usa o `sharp` que o Astro já traz; se não carregar, a verificação é pulada em silêncio.

### Correção

- Os placeholders de `clientes` eram cópias byte a byte dos logos de marca. Além de rotular errado no catálogo ("MARCA 1" numa seção de clientes), a assinatura colidia e o `check:lp` apontava o arquivo errado. Foram regerados.

## 2.2.0 — 2026-09-26

Robustez. Nenhuma mudança de layout: as composições resolvem exatamente como na 2.1.0, e há teste provando isso.

### O starter virou repositório

- `git init` próprio, com `.gitignore` e `.gitattributes`. A biblioteca é código compartilhado por todas as LPs; sem histórico, uma edição errada em `sections/` quebraria as próximas sem revisão nem como reverter.
- `.gitattributes` com `eol=lf`. Não é preferência: o Prettier do template roda com `endOfLine: lf` e o `format:check` está no `verify` e no CI — num checkout Windows sem isso, toda LP nova nasceria reprovando a própria verificação.
- Workflow `.github/workflows/library.yml`: a cada push e PR, confere que `BIBLIOTECA.md` foi regenerado, roda os testes do resolvedor e a validação completa da biblioteca.

### Testes do resolvedor

- `scripts/resolver.test.mjs` (`node --test`, sem dependências). Congela o layout das composições de referência — classe de padding por classe de padding — e verifica as invariantes em 6 composições, mais 5 casos que **têm** de ser recusados.
- Por que importava: as restrições do resolvedor o `check:lp` já pegava; as **preferências** (onde cai a troca de fundo, ordem dos ritmos num manifesto) não. Mudá-las alteraria em silêncio o layout de toda LP futura.
- Rodam dentro do `scripts/library.mjs` e no CI.

### Conteúdo de exemplo não chega mais ao ar

- `compose` grava em `lp.manifest.json`, por seção, o `exampleHash` do arquivo de dados que copiou. Se o arquivo da LP continuar idêntico, a seção entrou na página e ninguém escreveu nada nela.
- `check:lp` ganhou duas redes: o hash, e uma lista de rastros de exemplo ("Linha de produto 1", "Modelo 1", "Marca A", "substitua pela foto real") que pega o preenchimento parcial.
- É **erro**, não aviso. Só o template do starter passa `--allow-example`, porque ele existe justamente para carregar os exemplos; `new-lp.mjs` remove a flag ao criar uma LP.

### Contrato

- Ritmo novo **`flow`** (`pt-6 pb-16`): mesmo par do `panel-lead`, sem a compensação de painel. Serve à seção plana que vem logo depois de um painel navy e precisa devolver bastante ar para a seguinte.
- O desempate de onde cai a troca de fundo passou a preferir o corte **mais tardio**: a corrida clara fica maior e a cinza vira o final que desemboca na Cotação, que também é cinza. Alinha todas as composições à silhueta da LP de origem (3 claras, 2 cinzas na composição de referência).

### Catálogo visual

- `scripts/previews.mjs` captura uma imagem por seção e `catalog.mjs` a embute no `BIBLIOTECA.md`. Para o agente, `purpose` e `match` bastavam; para aprovar a composição com o cliente, a imagem vale mais que três parágrafos.
- Sem dependência nova: o layout ganhou o parâmetro de depuração `?only=<id>`, que isola uma seção, e a captura usa o mesmo Playwright via `npx -y` do `npm run screens`.
- Fica fora do CI (build + navegador). Rode ao mexer no visual de uma seção e faça commit das imagens.

### Correções

- **Preset quebrado.** `linhas identificar segmentos diferenciais` ("briefing magro") era recomendada pelo prompt e **não resolvia**: depois do painel navy, `segmentos` só alcançava `tight`, que não devolvia ar suficiente para o `overlap` dos diferenciais. O ritmo `flow` resolve, e agora há teste cobrindo os sete presets do prompt — recomendar composição que o compositor recusa é pior do que não recomendar nenhuma.
- `lp.manifest.json` gravava o caminho da biblioteca **absoluto** (`C:Users…`). O manifesto é versionado: o caminho não resolvia em outra máquina e ainda vazava o diretório de quem compôs. Agora é relativo à raiz da LP.

## 2.1.0 — 2026-09-26

Duas seções colhidas das LPs já existentes (Pioneira Componentes MRO, Wortec, Norless) e as adaptações que a revisão dessas páginas revelou. Nenhuma quebra: a composição de referência resolve exatamente igual à 2.0.0.

### Seções novas

- **`situacoes`** (fase apoio, `order: 0`) — 4 a 6 cards nomeando o momento em que o visitante chegou (máquina parada, peça sem código, parada programada), cada card sendo o CTA. Colhida de "Quando a manutenção precisa" (Pioneira Componentes MRO) e de "Desafios na Operação" (Wortec). Entra antes do "o que enviar": primeiro o visitante se reconhece, depois age.
- **`escopo`** (fase autoridade, bloco navy) — o ganho de resolver a aplicação inteira num pedido: uma cotação, um interlocutor, menos fornecedores. Colhida de "Resolva a aplicação inteira em um pedido" (Pioneira Componentes MRO). É a **alternativa navy do `diferenciais`**: vende escopo em vez de lista de qualidades, e as duas não convivem.

### Adaptações nos manifestos existentes

- **`identificar`** — a faixa de 6 itens passa a admitir também "variáveis que definem a especificação" (viscosidade, corrosividade, temperatura, pressão), padrão colhido da LP Wortec, e não só "dados que você pode enviar". Regra nova: os 6 itens têm de ser todos do mesmo tipo.
- **`processo`** — as etapas podem ser verbos de capacidade sem prazo (identificar → encontrar → orientar → resolver), padrão colhido do "HelpChain" da LP Pioneira Componentes MRO.
- **`diferenciais`** — deixou de ser insubstituível, já que `escopo` também carrega o bloco navy da fase de autoridade. Continua sendo a escolha padrão.

### Contrato

- Ritmo novo **`panel-tight`** (`pt-6 pb-10`, com a mesma compensação de painel do `panel-lead`). Existe porque uma seção de painel navy fechando o miolo daria 132px de respiro até a Cotação com `panel-lead`, acima do teto de 128 para o mesmo fundo.
- Fase **apoio** com propósito ampliado: reconhecer a situação do visitante, além de dizer o que ele precisa ter em mãos.
- Ícones novos no catálogo: `power`, `refresh`, `help-circle`, `alert`, `clipboard-check`.

### Ferramentas

- `scripts/library.mjs` não compõe mais "todas as seções de uma vez" — com 11 seções isso deixou de ser uma composição válida (as fases têm máximo e exigem um bloco navy). Ele agora calcula o **conjunto mínimo de composições válidas que cobre a biblioteca inteira** e verifica cada uma como se fosse uma LP de verdade.

### Revisão das LPs existentes

Levantamento de `PIONEIRA/LP-Pioneira-Rolamentos`, `PIONEIRA/LP-Componentes MRO`, `LP-Vazao-AdequacaoNR13`, `LP-Wortec-Bombas-Industriais`, `LP-NORLESSCILINDROS` e `LP-NORLESSCONEXOES`. Não entraram na biblioteca, com motivo:

- **`FinalCTA`** (Wortec, Norless) — banner de CTA antes do formulário. O padrão já exige CTA em toda seção e a Cotação vem logo a seguir; no layout B2 o `diferenciais` faz essa ponte com os cards sobrepostos.
- **`SpecializedService`, `WhyParker`** (Norless) — são `diferenciais` com outro nome.
- **`ProductCategories`, `ProductCards`, `Applications`, `Segments`** (Norless, Wortec) — são `linhas`, `aplicacoes` e `segmentos`.
- **`Solution`** (Wortec) — formulário próprio em React; o padrão usa shortcode do plugin.
- **`HelpChain`** (Pioneira MRO) — mesma função de `processo`, que passou a documentar a variante sem prazos.

## 2.0.0 — 2026-09-26

O miolo da página deixa de ser fixo e passa a ser composto a partir de uma **biblioteca de seções**. Header, Hero, Cotação e Footer continuam inalterados.

**Quebra de compatibilidade.** LPs na v1.0.0 continuam funcionando como estão e não precisam migrar; elas não têm `lp.manifest.json` e o `check:lp` da v2 não roda nelas. Migrar uma LP v1 é recompor: `npm run compose -- linhas identificar aplicacoes segmentos diferenciais` reproduz exatamente o layout anterior, inclusive os fundos e os paddings.

### Biblioteca

- `sections/<slug>/` no starter, com manifesto (`section.mjs`), componente, dados de exemplo e assets.
- Cinco fases narrativas de ordem fixa: abertura, oferta, apoio à decisão, prova, autoridade, conversão. Mínimo e máximo de seções por fase.
- As 5 seções do miolo da v1 viraram itens de biblioteca: `linhas`, `identificar`, `aplicacoes`, `segmentos`, `diferenciais`.
- 4 seções novas: `especificacoes` (tabela técnica responsiva sem markup duplicado), `processo` (etapas com prazo, painel navy irmão do `identificar`), `clientes` (logos autorizados + 3 números), `perguntas` (acordeão em `<details>` nativo, com JSON-LD FAQPage).
- Cada manifesto declara `needs` (o que o briefing precisa ter), `match` (quando usar e quando não usar) e `contract` (o que o `check:lp` verifica).

### Tom e ritmo resolvidos pela composição

- Nenhuma seção decide o próprio fundo ou padding: recebe `tone` e `rhythm` e repassa ao primitivo `Section.astro`.
- Contrato único em `src/lib/rhythm.mjs`, lido pelo componente, pelo compositor e pelo `check:lp`.
- Invariantes garantidas em qualquer composição: uma única troca de fundo (branco → cinza), exatamente dois blocos navy (um por metade, nunca vizinhos), respiro entre vizinhas dentro da faixa do `GUIA-LAYOUT.md`.
- Novo primitivo `SectionHeader.astro` com a anatomia eyebrow → H2 → traço → parágrafo.

### Ferramentas

- `npm run compose` — resolve a composição, copia o que entra, remove o que sai, gera `src/pages/index.astro` e `lp.manifest.json`. Preserva dados e assets já preenchidos; `--force` volta ao exemplo. Flags `--list`, `--dry-run`, `--recompose`, `--library`.
- `check:lp` reescrito: além das regras de estrutura fixa, valida a composição contra o manifesto — ordem das fases, limites por fase, blocos navy, alternância de fundos, respiro, página batendo com o manifesto, arquivo órfão, contrato de conteúdo e ícones de cada seção.
- `scripts/catalog.mjs` no starter gera `BIBLIOTECA.md` a partir dos manifestos; `new-lp.mjs` leva o catálogo para `docs/` da LP.
- `scripts/library.mjs` no starter: formata a biblioteca com o Prettier do template, valida os manifestos e **compõe todas as seções no template** para rodar `check` e `verify` de verdade.
- `new-lp.mjs` cria a LP só com a estrutura fixa, mais uma página provisória que aponta para o `compose`.
- `dashboard.mjs` mostra a composição de cada LP e a versão do padrão que ela segue.
- `screens.mjs`: parâmetro `?screens=1` promove imagens `lazy` a `eager` antes da captura — sem isso, composições longas saíam com buracos brancos.

### Dados e caminhos

- `content.ts` reduzido à estrutura fixa; o copy de cada seção vive em `src/data/sections/<slug>.ts`.
- Logos do carrossel em `src/data/brands.ts`; o carrossel não renderiza com menos de 4 logos.
- Shortcodes do plugin saem de `site.shortcodes` — a página é gerada e não pode guardá-los.
- Aliases `@components`, `@data`, `@lib`, `@assets`: o mesmo arquivo de seção funciona na biblioteca e dentro da LP.

### Prompts

- `PROMPT-PADRAO-LP.md`: nova seção 0.2 (composição — fases, regras de casamento, composições de partida, aprovação), entrevista dividida em núcleo de 14 entradas + entradas por seção, item 4.2 (contrato de tom e ritmo) e 4.3 (criar seção nova na biblioteca).
- `PROMPT-BRIEFING-CLIENTE.md`: organiza o material em blocos por fase e entrega uma **tabela de viabilidade** por seção, que é o que alimenta a decisão de composição.

## 1.0.0 — 2026-09-22

Primeira versão do template, extraída da LP Pioneira Rolamentos.

- Estrutura base fixa: Header, Hero de três colunas (janela do banner), Cotação e Footer.
- Copy centralizado em `src/data/content.ts` com tipos que travam as quantidades do padrão.
- Catálogo de ícones em `src/data/icons.ts`.
- `data-cta` obrigatório em todo CTA (`{secao}-{elemento}`).
- Overlay de depuração do hero (`?grid=1`) e brief do banner (zona 62–79%).
- Mock de shortcode em desenvolvimento; placeholder tracejado em produção.
- JSON-LD Organization, canonical, meta de versão, nota de LGPD.
- `npm run check:lp` (regras do padrão), `npm run screens` (Playwright), `npm run lh` (Lighthouse CI).
- Workflow `wp-build` em `main` com verificação antes do build.
- `docs/GUIA-LAYOUT.md`: escala de espaçamentos, grids, raios, bordas, sombras, ícones, tipografia e movimento, com esqueletos para seções fora do template.
- Protocolo de briefing do cliente (prompt, seção 0): leitura integral, classificação A/B, tabela de extração das 21 entradas, mapa de aproveitamento de estrutura e entrevista reduzida. Pasta `docs/briefing-cliente/`.
