/**
 * Dados globais da LP. Tudo que aparece em mais de um lugar (head, header, footer,
 * JSON-LD) vem daqui. Preenchido pela entrevista do PROMPT-PADRAO-LP (entradas 1 a 4, 9 a 12 e 15).
 */
export const site = {
  /** Nome completo da empresa (entrada 1). */
  brand: 'Empresa Exemplo',
  /** Nome curto usado em frases como "Por que a …" (entrada 2). */
  brandShort: 'Exemplo',
  /** Produto principal, no plural (entrada 3). Vai na tagline do header e no H1. */
  product: 'Produtos industriais',
  /** Contexto de uso (entrada 4). Completa o H1 e o title. */
  context: 'manutenção e reposição',
  /** URL absoluta da página no ar (entrada 10). Usada em canonical e og:url. */
  url: 'https://www.exemplo.com.br/lp/produtos-industriais',
  /** Endereço completo com CEP (entrada 9). Footer e JSON-LD. */
  address: 'Rua Exemplo, 100 - Centro, Cidade - UF, 00000-000',
  /** Link da política de privacidade do cliente (entrada 10). Vazio esconde o link, mas a nota de LGPD continua. */
  privacyUrl: '',
  /** Versão do padrão B2 que esta LP segue. Não editar manualmente; vem do template. */
  standardVersion: '2.7.1',
} as const

/**
 * Shortcodes do plugin de atendimento do WordPress (entrada 11 da entrevista).
 *
 * Ficam aqui, e não na página, porque `src/pages/index.astro` é gerado por
 * `npm run compose` e seria sobrescrito a cada recomposição.
 */
export const shortcodes = {
  /** Chat na coluna de 300px do hero. */
  chat: '[atendimento_chat id="default"]',
  /** Formulário da seção de cotação. */
  form: '[atendimento_form id="default-form"]',
} as const

/** Título da aba: "{Produto} para {contexto} | {Marca}". */
export const title = `${site.product} para ${site.context} | ${site.brand}`

/** Meta description (≤ 160 caracteres). Ajuste o texto, mantendo marcas e o apoio técnico. */
export const description =
  'Solicite cotação de produtos industriais das principais marcas. Apoio técnico na identificação e especificação para manutenção industrial.'

/**
 * Campanha que leva tráfego para esta LP (entrada 15). Quem clica digitou a
 * palavra-chave antes: se o H1 não a repete, a pessoa volta para o Google.
 */
export const campaign = {
  /**
   * Palavra-chave principal, como está na campanha. O `check:lp` falha se ela não
   * estiver no H1 e no title — aceita maiúscula, acento, plural e outra ordem.
   * `null` quando a LP não tem campanha definida; vazio é entrada não preenchida.
   */
  mainKeyword: '',
  /**
   * Negativas **de oferta** da campanha — o que a empresa não vende. O `check:lp`
   * avisa quando o texto da página usa uma delas. As de intenção (emprego, curso)
   * ficam só no BRIEFING.md.
   */
  negatives: [],
  /**
   * Claims que o briefing proíbe ("autorizado", "distribuidor", "até 42%"), em todas
   * as formas em que podem aparecer. O `check:lp` falha se a página usar qualquer um.
   */
  forbidden: [],
} as const satisfies {
  mainKeyword: string | null
  negatives: readonly string[]
  forbidden: readonly string[]
}

/** WhatsApp comercial (entrada 12). Número no formato internacional, só dígitos (ex.: 5511999999999). Vazio desativa o botão flutuante. */
export const whatsapp = ''
