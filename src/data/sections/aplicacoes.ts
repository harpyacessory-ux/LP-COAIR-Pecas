/**
 * Dados da seção "Aplicações" (biblioteca B2, fase: prova).
 *
 * COAIR: em vez de aplicações, a seção mostra 4 compressores de marcas para as quais
 * a COAIR fornece componentes. Fotos enviadas pelo cliente, centralizadas em fundo
 * branco 4:3. O card inteiro é o CTA.
 */
import type { Photo } from '@data/types'
import type { IconName } from '@data/icons'
import { site } from '@data/site'

import coair from '@assets/aplicacoes/coair-hd75.jpg'
import ingersollRand from '@assets/aplicacoes/ingersoll-rand-rs160.jpg'
import atlasCopco from '@assets/aplicacoes/atlas-copco-ga.jpg'
import kaeser from '@assets/aplicacoes/kaeser-asd30.jpg'

export interface Application {
  id: string
  label: string
  description: string
  icon: IconName
  photo: Photo
}

export const applications = {
  eyebrow: 'Marcas atendidas',
  title: `Na ${site.brandShort} Compressores você encontra componentes para as principais marcas de compressores`,
  /** Vazio: a seção fica só com o título, sem parágrafo. */
  text: '',
  items: [
    {
      id: 'coair',
      label: site.brandShort,
      description: 'Peças para a linha Heavy Duty de compressores de parafuso.',
      icon: 'badge-check',
      photo: { src: coair, alt: `Compressor de parafuso ${site.brandShort} HD75 VSD Heavy Duty` },
    },
    {
      id: 'ingersoll-rand',
      label: 'Ingersoll Rand',
      description: 'Componentes para compressores de parafuso Ingersoll Rand.',
      icon: 'cog',
      photo: { src: ingersollRand, alt: 'Compressor de parafuso Ingersoll Rand RS160ie' },
    },
    {
      id: 'atlas-copco',
      label: 'Atlas Copco',
      description: 'Componentes para compressores de parafuso Atlas Copco.',
      icon: 'cog',
      photo: { src: atlasCopco, alt: 'Compressor de parafuso Atlas Copco da linha GA' },
    },
    {
      id: 'kaeser',
      label: 'Kaeser',
      description: 'Componentes para compressores de parafuso Kaeser.',
      icon: 'cog',
      photo: { src: kaeser, alt: 'Compressor de parafuso Kaeser ASD 30' },
    },
  ],
} as const satisfies {
  eyebrow: string
  title: string
  text: string
  items: readonly [Application, Application, Application, Application]
}
