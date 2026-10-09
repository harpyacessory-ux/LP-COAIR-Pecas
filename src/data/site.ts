/**
 * Dados globais da LP. Tudo que aparece em mais de um lugar (head, header, footer,
 * JSON-LD) vem daqui. Preenchido pela entrevista do PROMPT-PADRAO-LP (entradas 1 a 4, 9 a 12 e 15).
 */
export const site = {
  /** Nome completo da empresa (entrada 1). */
  brand: 'COAIR Compressores de Ar',
  /** Nome curto usado em frases como "Por que a …" (entrada 2). */
  brandShort: 'COAIR',
  /** Produto principal, no plural (entrada 3). Vai na tagline do header e no H1. */
  product: 'Peças para compressores industriais',
  /** Contexto de uso (entrada 4). Completa o H1 e o title. */
  context: 'manutenção e reposição',
  /** URL absoluta da página no ar (entrada 10). Usada em canonical e og:url. */
  url: 'https://www.coair.com.br/pecas/compressores',
  /** Endereço completo com CEP (entrada 9). Footer e JSON-LD. */
  address: 'São Paulo - SP',
  /** E-mail comercial exibido no rodapé (veio do layout de referência; confirmar com o cliente). */
  email: 'comercial@coair.com.br',
  /** Cidade e UF exibidas no rodapé (o endereço completo continua em `address`, para o JSON-LD). */
  city: 'São Paulo - SP',
  /** Página da empresa no LinkedIn. Vazio esconde o ícone do rodapé. */
  linkedin: '',
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
export const title = `${site.product} para ${site.context} | ${site.brandShort}`

/** Meta description (≤ 160 caracteres). Ajuste o texto, mantendo marcas e o apoio técnico. */
export const description =
  'Peças e componentes multimarcas para compressores de parafuso, com suporte técnico na cotação. Atendimento B2B no estado de São Paulo.'

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
  mainKeyword: 'peças para compressores industriais',
  /**
   * Negativas **de oferta** da campanha — o que a empresa não vende. O `check:lp`
   * avisa quando o texto da página usa uma delas. As de intenção (emprego, curso)
   * ficam só no BRIEFING.md.
   */
  negatives: [
    'pistão',
    'pistao',
    'cabeçote',
    'biela',
    'virabrequim',
    'pressostato',
    'csi',
    'csl',
    'msi',
    'msv',
    'anel de segmento',
    'válvula de palheta',
    'automático de compressor',
    '10 pés',
    '15 pés',
    '20 pés',
    '25 pés',
    '40 pés',
    '60 pés',
    'pratic air',
    'portátil',
    'portatil',
    'mini compressor',
    '12v',
    '24v',
    'compressor automotivo',
    'compressor para carro',
    'inflador',
    'inflador de pneu',
    'odontológico',
    'odontologico',
    'dental',
    'dentista',
    'compressor dental',
    'compressor geladeira',
    'compressor refrigerador',
    'compressor ar condicionado',
    'compressor split',
    'compressor freezer',
    'compressor hermético',
    'compressor hermetico',
    'residencial',
    'doméstico',
    'apartamento',
    'para casa',
    'hobby',
  ],
  /**
   * Claims que o briefing proíbe ("autorizado", "distribuidor", "até 42%"), em todas
   * as formas em que podem aparecer. O `check:lp` falha se a página usar qualquer um.
   */
  forbidden: [
    'autorizado',
    'autorizada',
    'assistência autorizada',
    'representante',
    'representação',
    'revenda',
    'revendedor',
    'revendedora',
    'distribuidor',
    'distribuidora',
    'distribuição',
    'até 42%',
    '+42%',
  ],
} as const satisfies {
  mainKeyword: string | null
  negatives: readonly string[]
  forbidden: readonly string[]
}

/** WhatsApp comercial (entrada 12). Número no formato internacional, só dígitos (ex.: 5511999999999). Vazio desativa o botão flutuante. */
export const whatsapp = '5519993544919'
