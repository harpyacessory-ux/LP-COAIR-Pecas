# Briefing da LP — registro da entrevista

> Preenchido pelo agente durante a leitura do briefing, a composição e a entrevista (PROMPT-PADRAO-LP, seções 0 a 0.3). Uma linha por entrada, atualizada assim que a resposta é confirmada. Se a sessão cair, o agente lê este arquivo e retoma da primeira entrada com status `pendente`.
>
> Status: `pendente` · `confirmado` · `default` (assumiu o valor padrão) · `pendência` (falta asset ou decisão do cliente) · `extraído` / `inferido` / `conflito` (vindos do documento de briefing, seção 0 do prompt)

## Origem: documento do cliente

| Campo                          | Valor                                                                                                                                                                                    |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Arquivo recebido               | `docs/briefing-cliente/briefing-coair-pecas.md` (saída do organizador `PROMPT-BRIEFING-CLIENTE.md`, v2.7.1, a partir de briefing de campanha + apresentação do cliente)                  |
| Tipo                           | A (estruturado)                                                                                                                                                                          |
| Lido integralmente em          | `08/10/2026`                                                                                                                                                                             |
| Referências visuais do cliente | apresentação em verde, verde-petróleo e cinza, sem hex — não aplicada até a entrada 14                                                                                                   |
| Dados não aplicados por padrão | e-mail contato@coair.com.br; telefone (19) 99354-4919 (só entra se confirmado como WhatsApp); CTAs dos anúncios ("Solicite uma Cotação", "Cote Peças para Atlas Copco"…); dados de mídia |

### Mapa de aproveitamento

| Bloco do briefing                                                                   | Veredito   | Destino (seção da biblioteca ou campo)       | Motivo                                                                                               |
| ----------------------------------------------------------------------------------- | ---------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Oferta — lista de 19 itens, sem descrição                                           | equivale   | `vitrine` (sem grupos, sem descrição)        | catálogo reconhecido pela foto, sem 3 características por item; 19 cabe em 6–24                      |
| Dados que o cliente pode enviar (4 de 6)                                            | equivale   | `identificar`                                | marca, modelo, série, código — a seção pede exatamente 6                                             |
| Diferenciais (5 candidatos)                                                         | equivale   | `diferenciais`                               | 5 itens com título e frase ≤ 70; faltam cenário e pessoa recortada                                   |
| Frase de autoridade "Menos paradas, mais vida útil."                                | cabe em    | `diferenciais` (titleLines)                  | 5 palavras, dentro de 3–6                                                                            |
| Copy dos anúncios — títulos G1–G3                                                   | cabe em    | pontos do hero (entrada 6), diferenciais     | "Componentes Multimarcas", "Linha HPP", "Suporte Técnico na Cotação"                                 |
| Copy dos anúncios — frases de destaque                                              | cabe em    | selos da cotação (entrada 8)                 | "Atendimento em São Paulo" cobre a área atendida                                                     |
| Copy dos anúncios — descrições G1–G3                                                | cabe em    | texto da vitrine, da cotação, de identificar | reescritas no limite de copy do item 8                                                               |
| Marcas Atlas Copco e Ingersoll Rand                                                 | cabe em    | marcas atendidas (entrada 7)                 | só compatibilidade; claims de vínculo proibidos                                                      |
| HPP — "Sobre a Linha" e "Parcerias de Excelência"                                   | cabe em    | `diferenciais` (Linha HPP®)                  | parceria genérica, sem nome; não pode soar como vínculo                                              |
| Lubrificantes Martin Bianco + 5 benefícios                                          | cabe em    | `vitrine` (item Lubrificantes), frase        | Martin Bianco: marca própria ou de terceiro, pendente                                                |
| "Estoque Sob Consulta"                                                              | cabe em    | texto da cotação                             | sem lista real de perguntas, `perguntas` não entra                                                   |
| Viabilidade — Prova (aplicações, segmentos, clientes)                               | descartado | —                                            | os três blocos estão insuficientes no briefing: sem fotos de uso, sem setores, sem logos nem números |
| Linhas de produto / Tabela técnica / Etapas / FAQ                                   | descartado | —                                            | insuficientes no briefing (ver Viabilidade)                                                          |
| Institucional, XFLOW/Heavy Duty/VSD, manutenção, locação, Rebuild, sustentabilidade | descartado | —                                            | outras campanhas (LP própria), grupos pausados, números sem fonte, percentual proibido               |

## Campanha

> Entrada 15 do núcleo. Vem da seção "Campanha e palavras-chave" do briefing organizado, quando houver. O que está aqui vai para `campaign` em `src/data/site.ts`.

| Campo                      | Valor                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Foco desta LP              | campanha "Peças" — grupos ativos Peças para Compressores, Peças para Atlas Copco, Peças para Ingersoll Rand                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Fora desta execução        | campanha Serviços (Manutenção de Compressores, Manutenção Atlas Copco; Rebuild e Locação pausados) e campanha Compressores (Parafuso Industrial, XFLOW CAR, Heavy Duty, VSD)                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Palavra-chave principal    | `extraído` — peças para compressores industriais                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Origem                     | briefing de campanha                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Área atendida              | estado de São Paulo (anúncio "Atendemos Sua Cidade") — selo da cotação e texto da cotação. **Pendência:** cobertura de peças no estado não confirmada pelo cliente                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Negativas de oferta        | `extraído` — pistão, pistao, cabeçote, biela, virabrequim, pressostato, csi, csl, msi, msv, anel de segmento, válvula de palheta, automático de compressor, 10/15/20/25/40/60 pés, pratic air; portátil, portatil, mini compressor, 12v, 24v, compressor automotivo, compressor para carro, inflador, inflador de pneu; odontológico, odontologico, dental, dentista, compressor dental; compressor geladeira, compressor refrigerador, compressor ar condicionado, compressor split, compressor freezer, compressor hermético, compressor hermetico; residencial, doméstico, apartamento, para casa, hobby |
| Negativas de intenção      | emprego/vagas/currículo/estágio/trainee/recrutamento; curso/faculdade/apostila/tcc/aula; como fazer/caseiro; mercado livre/shopee/amazon/olx/aliexpress; significado/wiki/foto/imagem/desenho (só registro)                                                                                                                                                                                                                                                                                                                                                                                                 |
| Claims proibidos           | `extraído` — autorizado, autorizada, assistência autorizada, representante, representação, revenda, revendedor, revendedora, distribuidor, distribuidora, distribuição, até 42%, +42%; e qualquer afirmação de vínculo comercial com Atlas Copco ou Ingersoll Rand                                                                                                                                                                                                                                                                                                                                          |
| Divergência de vocabulário | `inferido` — cliente: "Peças de Reposição", "Sobressalentes", "compressor de parafuso rotativo"; campanha: "peças para compressores industriais", "componentes", "compressor parafuso". Opção 1: termo da campanha                                                                                                                                                                                                                                                                                                                                                                                          |

### Comitê de compra

> Só quando o briefing separa papéis. Papel sem bloco que o responda é lacuna, e se resolve na composição.

| Papel                   | Argumento de compra                                                                   | Bloco que responde                   | Status                            |
| ----------------------- | ------------------------------------------------------------------------------------- | ------------------------------------ | --------------------------------- |
| Engenharia              | ausente                                                                               | —                                    | lacuna (pedir ao cliente)         |
| Manutenção / Utilidades | ausente                                                                               | —                                    | lacuna (pedir ao cliente)         |
| Compras / Suprimentos   | ausente ("Compra Técnica para Indústria" nos anúncios, não confirmado como argumento) | —                                    | lacuna (pedir ao cliente)         |
| Diretoria               | eficiência, continuidade, melhor uso do CAPEX                                         | `diferenciais` (frase de autoridade) | parcial — nada liga peças a CAPEX |

### Conteúdo futuro

> O que os grupos pausados da campanha oferecem. Fica fora da página até o grupo ser ativado.

| Grupo | O que oferece | Por que está pausado                   |
| ----- | ------------- | -------------------------------------- |
| —     | —             | nenhum grupo pausado na campanha Peças |

## Composição

> Preenchida antes da entrevista de conteúdo (PROMPT-PADRAO-LP, seção 0.2) e atualizada a cada `npm run compose`. Os valores de fundo e respiro saem de `lp.manifest.json` — não os escolha à mão.

Aplicada em: `08/10/2026` · comando: `npm run compose -- vitrine identificar aplicacoes diferenciais`

### Seções escolhidas

| Fase       | Seção          | Fundo     | Respiro     | Por que entrou (trecho do briefing)                                                                                |
| ---------- | -------------- | --------- | ----------- | ------------------------------------------------------------------------------------------------------------------ |
| oferta     | `vitrine`      | branco    | pt-20 pb-10 | "vitrine de 19 itens em 1 grupo… cabe no limite de 24"; famílias produto e lubrificante                            |
| apoio      | `identificar`  | branco    | pt-6 pb-16  | "Envie Marca e Modelo", "Informe o Código da Peça"; família cotação. Faltam 2 dos 6 dados                          |
| prova      | `aplicacoes`   | cinza-100 | pt-4 pb-20  | fase obrigatória (compositor recusa sem ela); a que menos exige. **Sem material no briefing — depende do cliente** |
| autoridade | `diferenciais` | cinza-100 | pt-6 pb-8   | 5 candidatos + "Menos paradas, mais vida útil."; famílias HPP, multimarca, fornecedor; Diretoria (continuidade)    |

### Seções descartadas

> Obrigatório: é o registro de que a escolha foi feita, não sorteada.

| Seção            | Motivo do descarte                                                                   | O que faria ela entrar                                                     |
| ---------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `linhas`         | só 2 linhas descritas (HPP, lubrificantes), sem 3 features; competiria com a vitrine | 3–4 famílias com chip, 3 características e foto recortada                  |
| `especificacoes` | nenhum dado técnico, medida ou código                                                | tabela de modelos com atributos comparáveis                                |
| `situacoes`      | nenhum gatilho de compra no briefing                                                 | 4–6 situações que o comercial mais ouve                                    |
| `processo`       | nenhuma etapa de atendimento; `identificar` já é o navy do apoio                     | processo real de 4–6 etapas                                                |
| `segmentos`      | nenhum setor citado                                                                  | 7 setores com 3 equipamentos cada                                          |
| `clientes`       | sem logos autorizadas nem números com fonte                                          | 4–8 logos autorizadas + 3 números confirmados (alternativa a `aplicacoes`) |
| `perguntas`      | sem lista real do comercial                                                          | 4–8 perguntas reais (prazo, entrega, faturamento, mínimo)                  |
| `escopo`         | argumentos são qualidades, não ganhos de consolidação; frase só cabe em diferenciais | 4–6 ganhos de consolidar a compra                                          |

### Seção nova criada na biblioteca (se houve)

| slug | Fase | Por que nenhuma seção existente servia | Versão do padrão em que entrou |
| ---- | ---- | -------------------------------------- | ------------------------------ |
|      |      |                                        |                                |

## Entradas do núcleo

| #   | Entrada                 | Status     | Valor confirmado                                                                                                 | Referência no briefing / observação                                                                                                                                                                                                                                            |
| --- | ----------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | MARCA                   | extraído   | COAIR Compressores de Ar                                                                                         | "A COAIR Compressores de Ar fornece um ecossistema"                                                                                                                                                                                                                            |
| 2   | MARCA_CURTA             | extraído   | COAIR                                                                                                            | "Consulte disponibilidade com a COAIR."                                                                                                                                                                                                                                        |
| 3   | PRODUTO_PRINCIPAL       | confirmado | Peças para compressores industriais                                                                              | "parafuso" vai no parágrafo do hero. Briefing propunha "Peças para compressores de parafuso", que não contém "industriais" da palavra-chave — o `check:lp` falharia no H1                                                                                                      |
| 4   | CONTEXTO_DE_USO         | confirmado | manutenção e reposição                                                                                           | "manutenção e reposição" — "Peças de Reposição" (apresentação)                                                                                                                                                                                                                 |
| 5   | PUBLICO                 | extraído   | Engenharia, Manutenção/Utilidades, Compras/Suprimentos, Diretoria                                                | argumentos de 3 papéis ausentes (ver Comitê)                                                                                                                                                                                                                                   |
| 6   | HERO                    | confirmado | Componentes / multimarcas (layers) · Peças da / linha HPP® (badge-check) · Suporte técnico / na cotação (wrench) | "Componentes / multimarcas" · "Peças da / linha HPP®" · "Suporte técnico / na cotação" (títulos G1)                                                                                                                                                                            |
| 7   | MARCAS_ATENDIDAS        | confirmado | Atlas Copco e Ingersoll Rand, só o nome, sem logos                                                               | decisão de 08/10/2026 (revê "exibir as duas logos" do briefing: carrossel exige 4+ e não há autorização). Carrossel removido (BrandCarousel, brands.ts, assets/brands). Só compatibilidade, sem termo de vínculo. Kaeser/Schulz/Chicago Pneumatic fora; Martin Bianco pendente |
| 8   | SELOS_DE_CONFIANCA      | extraído   | Atendimento em São Paulo · Equipe Técnica Interna · Atendimento B2B                                              | frases de destaque; cobertura em SP pendente de confirmação                                                                                                                                                                                                                    |
| 9   | ENDERECO                | pendência  |                                                                                                                  | ausente no briefing; pedir ao cliente (endereço completo com CEP) — bloqueia publicação                                                                                                                                                                                        |
| 10  | URL_FINAL + PRIVACIDADE | confirmado | https://www.coair.com.br/pecas/compressores                                                                      | caminho dos anúncios; política de privacidade: pendência (vazio esconde o link, nota LGPD fica)                                                                                                                                                                                |
| 11  | SHORTCODES              | default    | `[atendimento_chat id="default"]` · `[atendimento_form id="default-form"]`                                       | padrão do plugin; confirmar ids no WordPress da COAIR                                                                                                                                                                                                                          |
| 12  | WHATSAPP                | confirmado | 5519993544919                                                                                                    | (19) 99354-4919 da apresentação, confirmado como WhatsApp pelo usuário                                                                                                                                                                                                         |
| 13  | STACK + PUBLICACAO      | confirmado | Astro + Tailwind 4 · push em main → wp-build                                                                     | detectado no projeto; repositório remoto ainda não criado                                                                                                                                                                                                                      |
| 14  | TOKENS_DE_COR + FONTE   | default    | navy, laranja, Manrope                                                                                           | sem manual de marca; apresentação em verde/verde-petróleo/cinza, sem hex — não aplicada                                                                                                                                                                                        |
| 15  | CAMPANHA                | extraído   | peças para compressores industriais                                                                              | perguntada logo depois da entrada 2; negativas e claims proibidos extraídos (ver Campanha)                                                                                                                                                                                     |

## Entradas por seção

> Uma tabela por seção da composição, na ordem da página. Os campos saem do `needs` do manifesto (ver `docs/BIBLIOTECA.md`).

### `vitrine` — Vitrine de produtos

| Item / campo | Status     | Valor confirmado                                                                                                                                                                                                                                                                                                                       | Observação                                                                                                                                       |
| ------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Quantidade   | confirmado | 16 itens, sem grupo, sem descrição                                                                                                                                                                                                                                                                                                     | fora: "Sobressalentes" (genérico), "Unidade Compressora" (Rebuild); "Filtro de Admissão" junto a "Filtros de Ar" — voltam se o cliente confirmar |
| Itens        | confirmado | Kits de Filtros · Kits de Instalação · Kits de Juntas · Kits de Manutenção · Kits de Válvulas · Lubrificantes para Compressores · Filtros de Ar · Filtro de Óleo · Filtro Separador Ar/Óleo · Elemento do Filtro de Óleo · Elemento Coalescente · Válvula de Alívio · Válvulas de Retenção · Válvula Solenoide · Correias · Manômetros | kits padronizados no plural                                                                                                                      |
| Cabeçalho    | confirmado | "Peças e componentes" · "Peças para compressores de parafuso" · "Componentes para compressores industriais de parafuso, com suporte técnico na identificação. Estoque sob consulta."                                                                                                                                                   | descrição G1 dos anúncios                                                                                                                        |
| Fotos        | pendência  |                                                                                                                                                                                                                                                                                                                                        | 16 × 800×600, fundo transparente; hoje apontam para placeholders                                                                                 |

### `identificar` — Painel de apoio à identificação

| Item / campo | Status     | Valor confirmado                                                                                                                                                                                   | Observação                                              |
| ------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Itens 1–4    | confirmado | Marca / do compressor · Modelo / do compressor · Série / número do compressor · Código / da peça a repor                                                                                           | anúncios G1–G2                                          |
| Itens 5–6    | confirmado | Foto / da peça ou plaqueta · Horas / de operação                                                                                                                                                   | sugestão do agente, aprovada; confirmar com o comercial |
| Cabeçalho    | confirmado | "Não sabe o código da peça?" · "Atlas Copco, Ingersoll Rand ou outra marca: envie os dados do compressor e nossa equipe técnica identifica a peça certa." · microcopy "Suporte técnico na cotação" | marcas por nome, só compatibilidade (entrada 7)         |

### `aplicacoes` — Aplicações

| Item / campo | Status    | Valor confirmado | Observação                                                                                                                           |
| ------------ | --------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 4 aplicações | pendência |                  | pedir ao cliente: 4 equipamentos/contextos de uso das peças (nome, 1 frase 50–90, foto 1200×900). Alternativa: trocar por `clientes` |

### `diferenciais` — Diferenciais

| Item / campo   | Status     | Valor confirmado                                                                                                                                                                                            | Observação                                                |
| -------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Frase          | confirmado | "Menos paradas, / mais vida útil."                                                                                                                                                                          | apresentação, lubrificantes; Diretoria (continuidade)     |
| Texto          | confirmado | "Peças da linha HPP® e componentes multimarcas para compressores de parafuso, com engenharia e laboratório internos. A COAIR ajuda a identificar a peça certa para manter o seu ar comprimido em operação." |                                                           |
| 5 cards        | confirmado | Linha HPP® · Compatibilidade multimarcas · Suporte técnico na cotação · Engenharia e laboratório internos · Atendimento B2B                                                                                 | 5º trocado de "Atendimento em São Paulo" (repetia o selo) |
| Cenário/pessoa | pendência  |                                                                                                                                                                                                             | ver Assets                                                |

### Estrutura fixa — copy

| Campo            | Status     | Valor                                                                                                                                                                                                |
| ---------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chamada do hero  | confirmado | Compressores de parafuso                                                                                                                                                                             |
| Texto do hero    | confirmado | Peças e componentes para compressores de parafuso, com suporte técnico para identificar a peça certa. Atendimento B2B no estado de São Paulo.                                                        |
| Botão secundário | confirmado | Identifique sua peça                                                                                                                                                                                 |
| Texto da cotação | confirmado | Informe marca, modelo e código da peça: nossa equipe técnica identifica e cota o item certo, com atendimento B2B no estado de São Paulo. Preencha o formulário ou fale direto conosco pelo WhatsApp. |
| Meta description | confirmado | Peças e componentes multimarcas para compressores de parafuso, com suporte técnico na cotação. Atendimento B2B no estado de São Paulo.                                                               |

## Assets

| Asset                 | Arquivo esperado                                    | Status        | Observação                                         |
| --------------------- | --------------------------------------------------- | ------------- | -------------------------------------------------- |
| Logo                  | `src/assets/LOGO.png` (240×200, fundo transparente) | pendência     | logo COAIR citada na apresentação, falta o arquivo |
| Banner do hero        | `src/assets/heroBg.png` (1981×900, brief 4.1.3)     | pendência     | ausente no briefing                                |
| Logos de marcas (4–8) | —                                                   | não se aplica | entrada 7: só o nome, carrossel removido           |

> Abaixo, uma linha por asset exigido pelas seções da composição (`assets` no manifesto de cada uma). Exemplos: `src/assets/linhas/` (produto recortado 800×600), `src/assets/aplicacoes/` e `src/assets/segmentos/` (1200×900), `src/assets/diferenciais/` (cenário 1600×900 + pessoa recortada 1220×1000), `src/assets/clientes/` (logos 400×160 com autorização de uso de marca).

| Asset                | Arquivo esperado                                                     | Status    | Observação                                                            |
| -------------------- | -------------------------------------------------------------------- | --------- | --------------------------------------------------------------------- |
| 16 fotos de produto  | `src/assets/vitrine/<id>.png` (800×600, fundo transparente)          | pendência | renders HPP e foto dos baldes de lubrificante citados na apresentação |
| 4 fotos de aplicação | `src/assets/aplicacoes/` (1200×900, equipamento em operação)         | pendência | junto com os 4 contextos                                              |
| Cenário              | `src/assets/diferenciais/cenario.jpg` (1600×900)                     | pendência |                                                                       |
| Pessoa recortada     | `src/assets/diferenciais/pessoa.png` (1220×1000, fundo transparente) | pendência | alguém da equipe técnica, corpo inteiro                               |
| Logo HPP®            | —                                                                    | não usado | sem lugar no padrão para logo de linha fora da vitrine com grupos     |

## Aprovação

- [x] Composição apresentada e aprovada pelo usuário em: `08/10/2026`
- [x] Resumo da entrevista apresentado e aprovado pelo usuário em: `08/10/2026` (título da aba com nome curto; copy da estrutura fixa aprovada)
- [x] Padrão B2 versão: `2.7.1`
