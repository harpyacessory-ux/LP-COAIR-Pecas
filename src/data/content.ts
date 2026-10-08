/**
 * COPY DA ESTRUTURA FIXA.
 *
 * Só o que aparece em Header, Hero, Cotação e Footer — as quatro peças presentes
 * em toda LP do padrão. O copy das seções do meio vive em
 * `src/data/sections/<slug>.ts`, um arquivo por seção escolhida da biblioteca.
 *
 * Conteúdo atual = exemplo de referência com imagens placeholder. Substitua tudo.
 */
import type { IconName } from './icons'
import type { Photo } from './types'
import { site } from './site'

import heroBg from '@assets/heroBg.png'

/* ------------------------------------------------------------------ tipos */

export interface HeroPoint {
  icon: IconName
  line1: string
  line2: string
}

export interface TrustItem {
  icon: IconName
  label: string
}

/* ----------------------------------------------------------- vocabulário */

/** Vocabulário fixo de CTA (PROMPT-PADRAO-LP, item 8). Não variar. */
export const cta = {
  primary: 'Solicite sua cotação',
  primaryShort: 'Cotação',
  secondary: 'Identifique seu produto',
  card: 'Falar com especialista',
  whatsapp: 'Chamar no WhatsApp',
} as const

/* ------------------------------------------------------------------ header */

export const header = {
  tagline: site.product,
} as const

/* -------------------------------------------------------------------- hero */

export const hero = {
  eyebrow: 'Manutenção Industrial',
  title: `${site.product} para ${site.context}`,
  text: 'Soluções para diferentes aplicações industriais, com apoio na identificação, especificação e cotação.',
  banner: {
    src: heroBg,
    alt: 'Produto industrial em destaque sobre fundo técnico',
  },
  points: [
    { icon: 'shield', line1: 'Produtos para', line2: 'aplicações industriais' },
    { icon: 'gear', line1: 'Marca A, Marca B', line2: 'e Marca C' },
    { icon: 'truck', line1: 'Atendimento B2B', line2: 'para manutenção' },
  ],
} as const satisfies {
  eyebrow: string
  title: string
  text: string
  banner: Photo
  points: readonly [HeroPoint, HeroPoint, HeroPoint]
}

/* ----------------------------------------------------------------- cotação */

export const quote = {
  eyebrow: 'Solicite sua cotação',
  title: `Fale com quem entende de ${site.product.toLowerCase()}.`,
  text: 'Nossa equipe está pronta para identificar, especificar e cotar o produto certo para a sua aplicação. Preencha o formulário ou fale direto conosco pelo WhatsApp.',
  trust: [
    { icon: 'clock', label: 'Resposta rápida' },
    { icon: 'shield', label: 'Apoio técnico especializado' },
    { icon: 'map-pin', label: 'Atendimento em todo o Brasil' },
  ],
  /** Nota de LGPD exibida abaixo do formulário. */
  lgpd: `Seus dados são usados apenas para responder à sua solicitação de cotação, conforme a LGPD.`,
} as const satisfies {
  eyebrow: string
  title: string
  text: string
  trust: readonly [TrustItem, TrustItem, TrustItem]
  lgpd: string
}

/* ------------------------------------------------------------------ footer */

export const footer = {
  credit: { label: 'B2 Marketing Industrial', url: 'https://b2marketingindustrial.com.br' },
} as const
