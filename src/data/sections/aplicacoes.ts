/**
 * Dados da seção "Aplicações" (biblioteca B2, fase: prova).
 *
 * 4 cards-botão com foto 4:3 e cabeçalho centrado. O card inteiro é o CTA.
 */
import type { Photo } from '@data/types'

import app1 from '@assets/aplicacoes/aplicacao-1.png'
import app2 from '@assets/aplicacoes/aplicacao-2.png'
import app3 from '@assets/aplicacoes/aplicacao-3.png'
import app4 from '@assets/aplicacoes/aplicacao-4.png'

export interface Application {
  id: string
  label: string
  description: string
  photo: Photo
}

export const applications = {
  eyebrow: 'Aplicações',
  title: 'Produtos para diferentes aplicações industriais',
  text: 'Componentes destinados à manutenção e reposição em máquinas e equipamentos utilizados em diferentes processos industriais.',
  items: [
    {
      id: 'motores',
      label: 'Motores Elétricos',
      description: 'Aplicações em motores e conjuntos rotativos.',
      photo: { src: app1, alt: 'Motor elétrico industrial' },
    },
    {
      id: 'bombas',
      label: 'Bombas',
      description: 'Aplicações em bombas e sistemas industriais.',
      photo: { src: app2, alt: 'Bomba centrífuga industrial' },
    },
    {
      id: 'redutores',
      label: 'Redutores',
      description: 'Sistemas de transmissão e redução.',
      photo: { src: app3, alt: 'Redutor de velocidade industrial' },
    },
    {
      id: 'transportadores',
      label: 'Transportadores',
      description: 'Sistemas de movimentação e transporte industrial.',
      photo: { src: app4, alt: 'Esteira transportadora de rolos' },
    },
  ],
} as const satisfies {
  eyebrow: string
  title: string
  text: string
  items: readonly [Application, Application, Application, Application]
}
