/**
 * Tipos compartilhados entre a estrutura fixa e as seções da biblioteca.
 *
 * Só entra aqui o que mais de uma seção usa. Tipo de item que pertence a uma
 * única seção vive no arquivo de dados dela (`src/data/sections/<slug>.ts`), para
 * que a seção continue portátil: copiar o arquivo basta.
 */
import type { ImageMetadata } from 'astro'

/** Imagem com texto alternativo. `alt` em PT-BR, sem "imagem de". */
export interface Photo {
  src: ImageMetadata
  alt: string
}

/** Item com ícone e rótulo curto: selos, faixas de apoio, bullets com marcação. */
export interface Labelled {
  icon: string
  label: string
}
