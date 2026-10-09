/**
 * Dados da seção "Painel de apoio" (biblioteca B2, fase: apoio).
 *
 * Painel navy com 6 dados que o visitante pode enviar sem ter a especificação em
 * mãos. São 6 exatos: a faixa é um grid de 2/3/6 colunas, e qualquer outro número
 * deixa célula órfã.
 */
import type { IconName } from '@data/icons'

export interface SupportItem {
  icon: IconName
  label: string
  hint: string
}

export const supportPanel = {
  eyebrow: 'Apoio na identificação',
  title: 'Não sabe o código da peça?',
  /** Trecho do título destacado em verde (precisa existir dentro de `title`). */
  highlight: 'código da peça?',
  text: 'A nossa equipe técnica ajuda você a encontrar a peça correta. Informe os dados do seu compressor e receba a identificação ideal para sua necessidade.',
  microcopy: 'Suporte técnico especializado',
  items: [
    { icon: 'cog', label: 'Marca', hint: 'do compressor' },
    { icon: 'layers', label: 'Modelo', hint: 'do compressor' },
    { icon: 'hash', label: 'Série', hint: 'ou número de série' },
    { icon: 'file-text', label: 'Código', hint: 'da peça (se souber)' },
    { icon: 'camera', label: 'Foto', hint: 'da peça ou da plaqueta' },
    { icon: 'clock', label: 'Horas', hint: 'de operação' },
  ],
} as const satisfies {
  eyebrow: string
  title: string
  highlight: string
  text: string
  microcopy: string
  items: readonly [SupportItem, SupportItem, SupportItem, SupportItem, SupportItem, SupportItem]
}
