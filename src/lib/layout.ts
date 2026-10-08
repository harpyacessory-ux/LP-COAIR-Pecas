/**
 * Tipos da composição, para o lado TypeScript.
 *
 * Os valores em si (classes, métricas de respiro, resolvedor) vivem em
 * `rhythm.mjs`, que precisa ser JavaScript puro para rodar também nos scripts de
 * Node. `npm run check:lp` compara as duas listas e falha se divergirem.
 */
export type Tone = 'light' | 'gray'

export type Rhythm =
  'open' | 'even' | 'tight' | 'flow' | 'panel-lead' | 'panel-tight' | 'centered-lead' | 'overlap'

/** Props que toda seção da biblioteca recebe da página. */
export interface SectionProps {
  tone: Tone
  rhythm: Rhythm
}
