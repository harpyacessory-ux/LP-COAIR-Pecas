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

import heroBg from '@assets/heroBg.jpg'

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
  eyebrow: 'Soluções em ar comprimido',
  title:
    'Peças para compressores industriais de parafuso com quem é especialista em ar comprimido.',
  /** Trecho do título destacado em verde (precisa existir dentro de `title`). */
  highlight: 'ar comprimido',
  text: 'Componentes para as principais marcas de compressores: Atlas Copco, Ingersoll Rand, Schulz, Chicago Pneumatic e Kaeser.',
  /** Rótulos dos botões do hero (o vocabulário `cta` continua valendo no resto da página). */
  ctaPrimary: 'Solicite uma cotação',
  ctaSecondary: 'Fale com um especialista',
  banner: {
    src: heroBg,
    alt: 'Filtros, válvulas, correias e outras peças para compressores de parafuso diante de um compressor',
  },
  points: [
    { icon: 'shield', line1: 'Suporte técnico', line2: 'especializado' },
    { icon: 'cog', line1: 'Peças multimarcas', line2: 'à pronta entrega' },
    { icon: 'trend-up', line1: 'Soluções para', line2: 'maior eficiência' },
  ],
} as const satisfies {
  eyebrow: string
  title: string
  highlight: string
  text: string
  ctaPrimary: string
  ctaSecondary: string
  banner: Photo
  points: readonly [HeroPoint, HeroPoint, HeroPoint]
}

/* ----------------------------------------------------------------- cotação */

export const quote = {
  eyebrow: 'Solicite sua cotação',
  title:
    'Fale com quem é especialista em ar comprimido com as melhores condições em peças de manutenção em compressores de parafuso.',
  text: 'Informe marca, modelo e código da peça: nossa equipe técnica identifica e cota o item certo, com atendimento B2B no estado de São Paulo. Preencha o formulário ou fale direto conosco pelo WhatsApp.',
  /** O `\n` marca a quebra de linha de cada destaque. */
  trust: [
    { icon: 'map-pin', label: 'Atendimento\nem São Paulo' },
    { icon: 'users', label: 'Equipe Técnica\nInterna' },
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
  /** Frase da marca ao lado da logo. */
  tagline: 'Peças, soluções e suporte técnico para a máxima performance do seu ar comprimido',
  contactLabel: 'Atendimento',
  quoteLabel: 'Solicite sua cotação',
  quoteButton: 'Solicitar cotação',
  credit: { label: 'B2 Marketing Industrial', url: 'https://b2marketingindustrial.com.br' },
} as const
