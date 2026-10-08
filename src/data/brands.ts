/**
 * Logos do carrossel de marcas — primitivo opcional.
 *
 * Só fica no projeto se alguma seção escolhida declarar o primitivo
 * `BrandCarousel` no manifesto. `scripts/compose.mjs` remove este arquivo, o
 * componente e `src/assets/brands/` quando nenhuma seção usa o carrossel, para
 * não deixar componente morto (PROMPT-PADRAO-LP, regra 12).
 *
 * Ideal entre 4 e 8 logos. Com menos de 4, remova o carrossel: a seção que o
 * hospeda passa a ocupar a largura inteira do cabeçalho.
 */
import type { ImageMetadata } from 'astro'

import marca1 from '@assets/brands/marca-1.webp'
import marca2 from '@assets/brands/marca-2.webp'
import marca3 from '@assets/brands/marca-3.webp'
import marca4 from '@assets/brands/marca-4.webp'
import marca5 from '@assets/brands/marca-5.webp'
import marca6 from '@assets/brands/marca-6.webp'

export interface Brand {
  name: string
  src: ImageMetadata
}

export const brands = [
  { name: 'Marca 1', src: marca1 },
  { name: 'Marca 2', src: marca2 },
  { name: 'Marca 3', src: marca3 },
  { name: 'Marca 4', src: marca4 },
  { name: 'Marca 5', src: marca5 },
  { name: 'Marca 6', src: marca6 },
] as const satisfies readonly Brand[]
