/**
 * Dados da seção "Painel de apoio" (biblioteca B2, fase: apoio).
 *
 * Painel navy com 6 dados que o visitante pode enviar sem ter a especificação em
 * mãos. São 6 exatos: a faixa é um grid de 2/3/6 colunas com divisórias, e
 * qualquer outro número deixa célula órfã.
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
  text: 'Atlas Copco, Ingersoll Rand ou outra marca: envie os dados do compressor e nossa equipe técnica identifica a peça certa.',
  microcopy: 'Suporte técnico na cotação',
  items: [
    { icon: 'tag', label: 'Marca', hint: 'do compressor' },
    { icon: 'gear', label: 'Modelo', hint: 'do compressor' },
    { icon: 'hash', label: 'Série', hint: 'número do compressor' },
    { icon: 'barcode', label: 'Código', hint: 'da peça a repor' },
    { icon: 'camera', label: 'Foto', hint: 'da peça ou plaqueta' },
    { icon: 'clock', label: 'Horas', hint: 'de operação' },
  ],
} as const satisfies {
  eyebrow: string
  title: string
  text: string
  microcopy: string
  items: readonly [SupportItem, SupportItem, SupportItem, SupportItem, SupportItem, SupportItem]
}
