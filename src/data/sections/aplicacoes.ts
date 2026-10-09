/**
 * Dados da seção "Aplicações" (biblioteca B2, fase: prova).
 *
 * 4 cards-botão com foto, ícone verde e cabeçalho centrado sobre fundo escuro.
 * O card inteiro é o CTA. As fotos foram recortadas do layout de referência.
 */
import type { Photo } from '@data/types'
import type { IconName } from '@data/icons'

import app1 from '@assets/aplicacoes/aplicacao-1.png'
import app2 from '@assets/aplicacoes/aplicacao-2.png'
import app3 from '@assets/aplicacoes/aplicacao-3.png'
import app4 from '@assets/aplicacoes/aplicacao-4.png'

export interface Application {
  id: string
  label: string
  description: string
  icon: IconName
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
      icon: 'fan',
      photo: { src: app1, alt: 'Motor elétrico industrial azul acoplado em linha de processo' },
    },
    {
      id: 'bombas',
      label: 'Bombas',
      description: 'Aplicações em bombas e sistemas industriais.',
      icon: 'cog',
      photo: { src: app2, alt: 'Bombas centrífugas industriais em tubulação' },
    },
    {
      id: 'redutores',
      label: 'Redutores',
      description: 'Sistemas de transmissão e redução.',
      icon: 'cog',
      photo: { src: app3, alt: 'Redutor de velocidade industrial acoplado a motor' },
    },
    {
      id: 'transportadores',
      label: 'Transportadores',
      description: 'Sistemas de movimentação e transporte industrial.',
      icon: 'conveyor',
      photo: { src: app4, alt: 'Esteira transportadora curva em linha de produção' },
    },
  ],
} as const satisfies {
  eyebrow: string
  title: string
  text: string
  items: readonly [Application, Application, Application, Application]
}
