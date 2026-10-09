/**
 * Dados da seção "Diferenciais" (biblioteca B2, fase: autoridade).
 *
 * Bloco navy em largura total com a frase de autoridade e a pessoa recortada, e 5
 * cards sobrepostos à base do bloco. São 5 exatos: o grid é `lg:grid-cols-5`.
 */
import type { IconName } from '@data/icons'
import type { Photo } from '@data/types'
import { site } from '@data/site'

import cenario from '@assets/diferenciais/cenario.png'
import pessoa from '@assets/diferenciais/pessoa.png'

export interface Reason {
  icon: IconName
  title: string
  description: string
}

export const why = {
  eyebrow: `Por que a ${site.brandShort}`,
  /** Cada item é uma linha do H2 (quebra forçada). 3–6 palavras no total. */
  titleLines: ['Menos paradas,', 'mais vida útil.'],
  text: `Peças da linha HPP® e componentes multimarcas para compressores de parafuso, com engenharia e laboratório internos. A ${site.brandShort} ajuda a identificar a peça certa para manter o seu ar comprimido em operação.`,
  scene: {
    src: cenario,
    alt: 'Sala de compressores industriais com tanques azuis e tubulações',
  },
  person: {
    src: pessoa,
    alt: `Técnico da ${site.brandShort}`,
  },
  reasons: [
    {
      icon: 'badge-check',
      title: 'Linha HPP®',
      description: 'Peças projetadas e testadas para compressores de parafuso.',
    },
    {
      icon: 'layers',
      title: 'Compatibilidade multimarcas',
      description: 'Componentes para diferentes marcas e modelos de compressores.',
    },
    {
      icon: 'search',
      title: 'Suporte técnico na cotação',
      description: 'Ajuda para identificar a peça certa antes de comprar.',
    },
    {
      icon: 'clipboard-check',
      title: 'Engenharia e laboratório internos',
      description: `Equipe técnica e laboratório próprios da ${site.brandShort}.`,
    },
    {
      icon: 'factory',
      title: 'Atendimento B2B',
      description: 'Atendimento dedicado a indústrias e equipes de manutenção.',
    },
  ],
} as const satisfies {
  eyebrow: string
  titleLines: readonly string[]
  text: string
  scene: Photo
  person: Photo
  reasons: readonly [Reason, Reason, Reason, Reason, Reason]
}
