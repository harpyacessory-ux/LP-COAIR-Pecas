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
  secondary: 'Identifique sua peça',
  card: 'Falar com especialista',
  whatsapp: 'Chamar no WhatsApp',
} as const

/* ------------------------------------------------------------------ header */

export const header = {
  tagline: site.product,
} as const

/* -------------------------------------------------------------------- hero */

export const hero = {
  eyebrow: 'Compressores de parafuso',
  title: `${site.product} para ${site.context}`,
  text: 'Peças e componentes para compressores de parafuso, com suporte técnico para identificar a peça certa. Atendimento B2B no estado de São Paulo.',
  banner: {
    src: heroBg,
    alt: 'Peças para compressor de parafuso em destaque sobre fundo técnico',
  },
  points: [
    { icon: 'layers', line1: 'Componentes', line2: 'multimarcas' },
    { icon: 'badge-check', line1: 'Peças da', line2: 'linha HPP®' },
    { icon: 'wrench', line1: 'Suporte técnico', line2: 'na cotação' },
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
  text: 'Informe marca, modelo e código da peça: nossa equipe técnica identifica e cota o item certo, com atendimento B2B no estado de São Paulo. Preencha o formulário ou fale direto conosco pelo WhatsApp.',
  trust: [
    { icon: 'map-pin', label: 'Atendimento em São Paulo' },
    { icon: 'users', label: 'Equipe Técnica Interna' },
    { icon: 'factory', label: 'Atendimento B2B' },
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
