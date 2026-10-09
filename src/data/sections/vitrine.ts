/**
 * Dados da seção "Vitrine de produtos" (biblioteca B2, fase: oferta).
 *
 * De 6 a 24 itens com foto e nome. `description` é tudo ou nada: ou todos os
 * itens têm a frase, ou nenhum tem — o componente recusa a mistura no build.
 *
 * `groups` vazio deixa a vitrine em grade. Com grupos, cada um vira uma
 * prateleira própria, com a logo (ou o nome) no cabeçalho.
 *
 * COAIR: 16 itens, sem grupo e sem descrição, cada um com um ícone verde. As fotos
 * foram recortadas do layout de referência (fundo branco com a sombra elíptica do
 * card); troque pelos arquivos originais quando chegarem.
 */
import type { Photo } from '@data/types'
import type { IconName } from '@data/icons'

import produto1 from '@assets/vitrine/produto-1.png'
import produto2 from '@assets/vitrine/produto-2.png'
import produto3 from '@assets/vitrine/produto-3.png'
import produto4 from '@assets/vitrine/produto-4.png'
import produto5 from '@assets/vitrine/produto-5.png'
import produto6 from '@assets/vitrine/produto-6.png'
import produto7 from '@assets/vitrine/produto-7.png'
import produto8 from '@assets/vitrine/produto-8.png'
import produto9 from '@assets/vitrine/produto-9.png'
import produto10 from '@assets/vitrine/produto-10.png'
import produto11 from '@assets/vitrine/produto-11.png'
import produto12 from '@assets/vitrine/produto-12.png'
import produto13 from '@assets/vitrine/produto-13.png'
import produto14 from '@assets/vitrine/produto-14.png'
import produto15 from '@assets/vitrine/produto-15.png'
import produto16 from '@assets/vitrine/produto-16.png'

/** Marca, linha ou família. `logo` é opcional: sem ela, vale o nome. */
export interface ShowcaseGroup {
  id: string
  label: string
  logo: Photo | null
}

export interface ShowcaseItem {
  id: string
  /** id de um grupo de `groups`, ou '' quando a vitrine não é agrupada. */
  group: string
  title: string
  /** 1 frase, 50–90 caracteres. '' quando a vitrine é só foto e nome. */
  description: string
  /** Ícone verde ao lado do nome. */
  icon: IconName
  photo: Photo
}

export const showcase = {
  eyebrow: 'Peças e componentes',
  title: 'Peças para compressores de parafuso',
  text: 'Componentes para compressores industriais de parafuso, com suporte técnico na identificação. Estoque sob consulta.',
  groups: [],
  items: [
    {
      id: 'kits-filtros',
      group: '',
      title: 'Kits de Filtros',
      description: '',
      icon: 'filter',
      photo: { src: produto1, alt: 'Kit de filtros para compressor de parafuso' },
    },
    {
      id: 'kits-instalacao',
      group: '',
      title: 'Kits de Instalação',
      description: '',
      icon: 'wrench',
      photo: { src: produto2, alt: 'Kit de instalação para compressor de parafuso' },
    },
    {
      id: 'kits-juntas',
      group: '',
      title: 'Kits de Juntas',
      description: '',
      icon: 'hexagon',
      photo: { src: produto3, alt: 'Kit de juntas para compressor de parafuso' },
    },
    {
      id: 'kits-manutencao',
      group: '',
      title: 'Kits de Manutenção',
      description: '',
      icon: 'cog',
      photo: { src: produto4, alt: 'Kit de manutenção para compressor de parafuso' },
    },
    {
      id: 'kits-valvulas',
      group: '',
      title: 'Kits de Válvulas',
      description: '',
      icon: 'valve',
      photo: { src: produto5, alt: 'Kit de válvulas para compressor de parafuso' },
    },
    {
      id: 'lubrificantes',
      group: '',
      title: 'Lubrificantes para Compressores',
      description: '',
      icon: 'droplet',
      photo: { src: produto6, alt: 'Lubrificante para compressor de parafuso' },
    },
    {
      id: 'filtros-ar',
      group: '',
      title: 'Filtros de Ar',
      description: '',
      icon: 'wind',
      photo: { src: produto7, alt: 'Filtro de ar de admissão para compressor' },
    },
    {
      id: 'filtro-oleo',
      group: '',
      title: 'Filtro de Óleo',
      description: '',
      icon: 'droplet',
      photo: { src: produto8, alt: 'Filtro de óleo para compressor de parafuso' },
    },
    {
      id: 'filtro-separador',
      group: '',
      // \u2060 (word joiner) mantém 'Ar/Óleo' na mesma linha
      title: 'Filtro Separador Ar/\u2060Óleo',
      description: '',
      icon: 'waves',
      photo: { src: produto9, alt: 'Filtro separador ar/óleo para compressor' },
    },
    {
      id: 'elemento-filtro-oleo',
      group: '',
      title: 'Elemento do Filtro de Óleo',
      description: '',
      icon: 'filter',
      photo: { src: produto10, alt: 'Elemento do filtro de óleo para compressor' },
    },
    {
      id: 'elemento-coalescente',
      group: '',
      title: 'Elemento Coalescente',
      description: '',
      icon: 'coalescent',
      photo: { src: produto11, alt: 'Elemento coalescente para compressor' },
    },
    {
      id: 'valvula-alivio',
      group: '',
      title: 'Válvula de Alívio',
      description: '',
      icon: 'gauge',
      photo: { src: produto12, alt: 'Válvula de alívio para compressor de parafuso' },
    },
    {
      id: 'valvulas-retencao',
      group: '',
      title: 'Válvula de Retenção',
      description: '',
      icon: 'arrows-swap',
      photo: { src: produto13, alt: 'Válvula de retenção para compressor de parafuso' },
    },
    {
      id: 'valvula-solenoide',
      group: '',
      title: 'Válvula Solenoide',
      description: '',
      icon: 'zap',
      photo: { src: produto14, alt: 'Válvula solenoide para compressor de parafuso' },
    },
    {
      id: 'correias',
      group: '',
      title: 'Correias',
      description: '',
      icon: 'cog',
      photo: { src: produto15, alt: 'Correias para compressor de parafuso' },
    },
    {
      id: 'manometros',
      group: '',
      title: 'Manômetros',
      description: '',
      icon: 'gauge',
      photo: { src: produto16, alt: 'Manômetro para compressor de ar' },
    },
  ],
} as const satisfies {
  eyebrow: string
  title: string
  text: string
  groups: readonly ShowcaseGroup[]
  items: readonly ShowcaseItem[]
}
