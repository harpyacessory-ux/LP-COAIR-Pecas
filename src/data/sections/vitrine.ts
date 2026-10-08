/**
 * Dados da seção "Vitrine de produtos" (biblioteca B2, fase: oferta).
 *
 * De 6 a 24 itens com foto e nome. `description` é tudo ou nada: ou todos os
 * itens têm a frase, ou nenhum tem — o componente recusa a mistura no build.
 *
 * `groups` vazio deixa a vitrine em grade. Com grupos, cada um vira uma
 * prateleira própria, com a logo (ou o nome) no cabeçalho.
 *
 * COAIR: 16 itens, sem grupo e sem descrição. Fotos pendentes (800×600, fundo
 * transparente): enquanto não chegam, cada item aponta para um placeholder da
 * biblioteca, e o `check:lp` barra a publicação.
 */
import type { Photo } from '@data/types'

import produto1 from '@assets/vitrine/produto-1.png'
import produto2 from '@assets/vitrine/produto-2.png'
import produto3 from '@assets/vitrine/produto-3.png'
import produto4 from '@assets/vitrine/produto-4.png'
import produto5 from '@assets/vitrine/produto-5.png'
import produto6 from '@assets/vitrine/produto-6.png'
import produto7 from '@assets/vitrine/produto-7.png'
import produto8 from '@assets/vitrine/produto-8.png'

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
      photo: { src: produto1, alt: 'Kit de filtros para compressor de parafuso' },
    },
    {
      id: 'kits-instalacao',
      group: '',
      title: 'Kits de Instalação',
      description: '',
      photo: { src: produto2, alt: 'Kit de instalação para compressor de parafuso' },
    },
    {
      id: 'kits-juntas',
      group: '',
      title: 'Kits de Juntas',
      description: '',
      photo: { src: produto3, alt: 'Kit de juntas para compressor de parafuso' },
    },
    {
      id: 'kits-manutencao',
      group: '',
      title: 'Kits de Manutenção',
      description: '',
      photo: { src: produto4, alt: 'Kit de manutenção para compressor de parafuso' },
    },
    {
      id: 'kits-valvulas',
      group: '',
      title: 'Kits de Válvulas',
      description: '',
      photo: { src: produto5, alt: 'Kit de válvulas para compressor de parafuso' },
    },
    {
      id: 'lubrificantes',
      group: '',
      title: 'Lubrificantes para Compressores',
      description: '',
      photo: { src: produto6, alt: 'Lubrificante para compressor de parafuso' },
    },
    {
      id: 'filtros-ar',
      group: '',
      title: 'Filtros de Ar',
      description: '',
      photo: { src: produto7, alt: 'Filtro de ar de admissão para compressor' },
    },
    {
      id: 'filtro-oleo',
      group: '',
      title: 'Filtro de Óleo',
      description: '',
      photo: { src: produto8, alt: 'Filtro de óleo para compressor de parafuso' },
    },
    {
      id: 'filtro-separador',
      group: '',
      title: 'Filtro Separador Ar/Óleo',
      description: '',
      photo: { src: produto1, alt: 'Filtro separador ar/óleo para compressor' },
    },
    {
      id: 'elemento-filtro-oleo',
      group: '',
      title: 'Elemento do Filtro de Óleo',
      description: '',
      photo: { src: produto2, alt: 'Elemento do filtro de óleo para compressor' },
    },
    {
      id: 'elemento-coalescente',
      group: '',
      title: 'Elemento Coalescente',
      description: '',
      photo: { src: produto3, alt: 'Elemento coalescente para compressor' },
    },
    {
      id: 'valvula-alivio',
      group: '',
      title: 'Válvula de Alívio',
      description: '',
      photo: { src: produto4, alt: 'Válvula de alívio para compressor de parafuso' },
    },
    {
      id: 'valvulas-retencao',
      group: '',
      title: 'Válvulas de Retenção',
      description: '',
      photo: { src: produto5, alt: 'Válvula de retenção para compressor de parafuso' },
    },
    {
      id: 'valvula-solenoide',
      group: '',
      title: 'Válvula Solenoide',
      description: '',
      photo: { src: produto6, alt: 'Válvula solenoide para compressor de parafuso' },
    },
    {
      id: 'correias',
      group: '',
      title: 'Correias',
      description: '',
      photo: { src: produto7, alt: 'Correias para compressor de parafuso' },
    },
    {
      id: 'manometros',
      group: '',
      title: 'Manômetros',
      description: '',
      photo: { src: produto8, alt: 'Manômetro para compressor de ar' },
    },
  ],
} as const satisfies {
  eyebrow: string
  title: string
  text: string
  groups: readonly ShowcaseGroup[]
  items: readonly ShowcaseItem[]
}
