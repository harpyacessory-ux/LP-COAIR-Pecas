# Briefing da LP — registro da entrevista

> Preenchido pelo agente durante a leitura do briefing, a composição e a entrevista (PROMPT-PADRAO-LP, seções 0 a 0.3). Uma linha por entrada, atualizada assim que a resposta é confirmada. Se a sessão cair, o agente lê este arquivo e retoma da primeira entrada com status `pendente`.
>
> Status: `pendente` · `confirmado` · `default` (assumiu o valor padrão) · `pendência` (falta asset ou decisão do cliente) · `extraído` / `inferido` / `conflito` (vindos do documento de briefing, seção 0 do prompt)

## Origem: documento do cliente

| Campo                          | Valor                                                     |
| ------------------------------ | --------------------------------------------------------- |
| Arquivo recebido               | `docs/briefing-cliente/…` (ou "nenhum")                   |
| Tipo                           | A (estruturado) · B (conteúdo solto) · nenhum             |
| Lido integralmente em          | `____/____/______`                                        |
| Referências visuais do cliente | (listar; marcar "não aplicada" quando divergir do padrão) |
| Dados não aplicados por padrão | (telefone, e-mail, redes, CTAs próprios…)                 |

### Mapa de aproveitamento

| Bloco do briefing | Veredito                                | Destino (seção da biblioteca ou campo) | Motivo |
| ----------------- | --------------------------------------- | -------------------------------------- | ------ |
|                   | equivale · cabe em · extra · descartado |                                        |        |

## Campanha

> Entrada 15 do núcleo. Vem da seção "Campanha e palavras-chave" do briefing organizado, quando houver. O que está aqui vai para `campaign` em `src/data/site.ts`.

| Campo                      | Valor                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Foco desta LP              | (com briefing de campanha: campanha e grupos ativos; uma LP por execução)                                    |
| Fora desta execução        | (as outras campanhas ou LPs do briefing de campanha)                                                         |
| Palavra-chave principal    | (tem de estar no H1 e no title; "sem campanha" vira `null`)                                                  |
| Origem                     | briefing de campanha · export do Google Ads · planejador · informada pelo usuário · sem campanha             |
| Área atendida              | (geografia da campanha, e onde a página a diz: selo, hero, cotação)                                          |
| Negativas de oferta        | (o que a empresa não vende; vão para `campaign.negatives` e o `check:lp` avisa)                              |
| Negativas de intenção      | (emprego, curso, marketplace…; só registro, sem aviso)                                                       |
| Claims proibidos           | (vão para `campaign.forbidden` e o `check:lp` falha; autorização que tirar um da lista fica registrada aqui) |
| Divergência de vocabulário | (como o cliente chama × como a campanha compra, e qual termo abriu a página)                                 |

### Comitê de compra

> Só quando o briefing separa papéis. Papel sem bloco que o responda é lacuna, e se resolve na composição.

| Papel | Argumento de compra | Bloco que responde | Status |
| ----- | ------------------- | ------------------ | ------ |
|       |                     |                    |        |

### Conteúdo futuro

> O que os grupos pausados da campanha oferecem. Fica fora da página até o grupo ser ativado.

| Grupo | O que oferece | Por que está pausado |
| ----- | ------------- | -------------------- |
|       |               |                      |

## Composição

> Preenchida antes da entrevista de conteúdo (PROMPT-PADRAO-LP, seção 0.2) e atualizada a cada `npm run compose`. Os valores de fundo e respiro saem de `lp.manifest.json` — não os escolha à mão.

Aplicada em: `____/____/______` · comando: `npm run compose -- …`

### Seções escolhidas

| Fase       | Seção | Fundo | Respiro | Por que entrou (trecho do briefing) |
| ---------- | ----- | ----- | ------- | ----------------------------------- |
| oferta     |       |       |         |                                     |
| apoio      |       |       |         |                                     |
| prova      |       |       |         |                                     |
| autoridade |       |       |         |                                     |

### Seções descartadas

> Obrigatório: é o registro de que a escolha foi feita, não sorteada.

| Seção | Motivo do descarte | O que faria ela entrar |
| ----- | ------------------ | ---------------------- |
|       |                    |                        |

### Seção nova criada na biblioteca (se houve)

| slug | Fase | Por que nenhuma seção existente servia | Versão do padrão em que entrou |
| ---- | ---- | -------------------------------------- | ------------------------------ |
|      |      |                                        |                                |

## Entradas do núcleo

| #   | Entrada                 | Status   | Valor confirmado | Referência no briefing / observação                     |
| --- | ----------------------- | -------- | ---------------- | ------------------------------------------------------- |
| 1   | MARCA                   | pendente |                  |                                                         |
| 2   | MARCA_CURTA             | pendente |                  |                                                         |
| 3   | PRODUTO_PRINCIPAL       | pendente |                  |                                                         |
| 4   | CONTEXTO_DE_USO         | pendente |                  |                                                         |
| 5   | PUBLICO                 | pendente |                  |                                                         |
| 6   | HERO                    | pendente |                  |                                                         |
| 7   | MARCAS_ATENDIDAS        | pendente |                  | logos de terceiros: decisão do cliente, registrada aqui |
| 8   | SELOS_DE_CONFIANCA      | pendente |                  |                                                         |
| 9   | ENDERECO                | pendente |                  |                                                         |
| 10  | URL_FINAL + PRIVACIDADE | pendente |                  |                                                         |
| 11  | SHORTCODES              | pendente |                  |                                                         |
| 12  | WHATSAPP                | pendente |                  |                                                         |
| 13  | STACK + PUBLICACAO      | pendente |                  |                                                         |
| 14  | TOKENS_DE_COR + FONTE   | pendente |                  |                                                         |
| 15  | CAMPANHA                | pendente |                  | perguntada logo depois da entrada 2                     |

## Entradas por seção

> Uma tabela por seção da composição, na ordem da página. Os campos saem do `needs` do manifesto (ver `docs/BIBLIOTECA.md`).

### `<slug>` — <título da seção>

| Item / campo | Status   | Valor confirmado | Observação |
| ------------ | -------- | ---------------- | ---------- |
|              | pendente |                  |            |

## Assets

| Asset                 | Arquivo esperado                                    | Status      | Observação |
| --------------------- | --------------------------------------------------- | ----------- | ---------- |
| Logo                  | `src/assets/LOGO.png` (240×200, fundo transparente) | placeholder |            |
| Banner do hero        | `src/assets/heroBg.png` (1981×900, brief 4.1.3)     | placeholder |            |
| Logos de marcas (4–8) | `src/assets/brands/*.webp` (400×160, fundo branco)  | placeholder |            |

> Abaixo, uma linha por asset exigido pelas seções da composição (`assets` no manifesto de cada uma). Exemplos: `src/assets/linhas/` (produto recortado 800×600), `src/assets/aplicacoes/` e `src/assets/segmentos/` (1200×900), `src/assets/diferenciais/` (cenário 1600×900 + pessoa recortada 1220×1000), `src/assets/clientes/` (logos 400×160 com autorização de uso de marca).

| Asset | Arquivo esperado | Status | Observação |
| ----- | ---------------- | ------ | ---------- |
|       |                  |        |            |

## Aprovação

- [ ] Composição apresentada e aprovada pelo usuário em: `____/____/______`
- [ ] Resumo da entrevista apresentado e aprovado pelo usuário em: `____/____/______`
- [ ] Padrão B2 versão: `2.7.1`
