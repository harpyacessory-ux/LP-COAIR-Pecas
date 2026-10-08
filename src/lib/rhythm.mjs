/**
 * CONTRATO DE FASE, TOM E RITMO — padrão B2 v2.
 *
 * Arquivo único, lido por três consumidores:
 *   1. `src/components/Section.astro`   → aplica as classes de fundo e padding;
 *   2. `scripts/check-lp.mjs` (na LP)   → valida a composição entregue;
 *   3. `scripts/compose.mjs` (starter)  → resolve tom e ritmo ao montar a página.
 *
 * Por ser `.mjs` sem dependências, roda em Node puro e no Vite. As classes
 * aparecem literais aqui dentro para o Tailwind encontrá-las ao varrer `src/`.
 *
 * Nenhuma seção da biblioteca decide o próprio fundo ou padding: quem decide é a
 * composição. É isso que mantém a alternância navy → branco → cinza → navy do
 * padrão mesmo quando as seções do meio mudam de LP para LP.
 */

/**
 * @typedef {'light' | 'gray'} Tone
 * @typedef {'open' | 'even' | 'tight' | 'panel-lead' | 'centered-lead' | 'overlap' | 'close'} Rhythm
 * @typedef {'abertura' | 'oferta' | 'apoio' | 'prova' | 'autoridade' | 'conversao'} Phase
 */

/* ------------------------------------------------------------------- fases */

/**
 * Slots narrativos, em ordem imutável. A ordem entre fases nunca varia; o que
 * varia é quais seções da biblioteca ocupam cada fase.
 *
 * `needsNavyCarrier` marca a fase que precisa contribuir com um bloco navy —
 * é o que garante os dois respiros escuros no meio da página.
 */
export const PHASES = [
  {
    id: 'abertura',
    label: 'Abertura',
    fixed: true,
    purpose: 'Dizer o que é, para quem e abrir o canal de atendimento.',
  },
  {
    id: 'oferta',
    label: 'Oferta',
    min: 1,
    max: 2,
    purpose: 'Mostrar o que a empresa vende, em blocos que o visitante reconhece.',
  },
  {
    id: 'apoio',
    label: 'Apoio à decisão',
    min: 1,
    max: 2,
    needsNavyCarrier: true,
    purpose:
      'Reduzir o atrito antes da escolha: reconhecer a situação em que o visitante chegou, ' +
      'dizer o que ele precisa ter em mãos e como o atendimento acontece.',
  },
  {
    id: 'prova',
    label: 'Prova',
    min: 1,
    max: 3,
    purpose: 'Demonstrar que isso já funciona no contexto do visitante.',
  },
  {
    id: 'autoridade',
    label: 'Autoridade',
    min: 1,
    max: 2,
    needsNavyCarrier: true,
    purpose: 'Responder "por que vocês" e derrubar a última objeção.',
  },
  {
    id: 'conversao',
    label: 'Conversão',
    fixed: true,
    purpose: 'Coletar o pedido de cotação.',
  },
]

/** Fases preenchidas pela biblioteca (as outras são estrutura fixa). */
export const MID_PHASES = ['oferta', 'apoio', 'prova', 'autoridade']

/** @type {(id: string) => (typeof PHASES)[number] | undefined} */
export const phaseById = (id) => PHASES.find((p) => p.id === id)

/* -------------------------------------------------------------------- tons */

/** Fundos disponíveis para seção do meio. Navy é reservado à estrutura fixa. */
export const TONES = {
  light: { class: 'bg-neutral-light', label: 'branco' },
  gray: { class: 'bg-neutral-gray-100', label: 'cinza-100' },
}

/** Tom da seção de Cotação (estrutura fixa) — a sequência tem de desembocar nele. */
export const CONVERSION_TONE = 'gray'

/** Ritmo da seção de Cotação (estrutura fixa). */
export const CONVERSION_RHYTHM = 'close'

/* ------------------------------------------------------------------ ritmos */

/**
 * Pares de padding aprovados pelo `docs/GUIA-LAYOUT.md`. `innerTop`/`innerBottom`
 * são a compensação de padding interno da própria seção: um painel navy já traz
 * `p-6 sm:p-8 lg:py-9` (aprox. 36px) e os cards sobrepostos dos diferenciais
 * avançam aprox. 40px abaixo do bloco. Sem essa compensação a conta de respiro
 * daria falso negativo justamente nas duas seções que mais respiram.
 */
export const RHYTHMS = {
  open: { class: 'pt-20 pb-10', top: 80, bottom: 40 },
  even: { class: 'py-16', top: 64, bottom: 64 },
  tight: { class: 'pt-6 pb-10', top: 24, bottom: 40 },
  /**
   * Abertura curta e fechamento generoso. É o mesmo par do `panel-lead`, mas sem a
   * compensação de painel — serve à seção plana que vem logo depois de um painel
   * navy (que já respirou por dentro) e precisa devolver bastante ar para a
   * seguinte. Sem ele, uma composição curta como
   * `linhas identificar segmentos diferenciais` não fecha: o `tight` não devolve
   * ar suficiente para o `overlap` dos diferenciais.
   */
  flow: { class: 'pt-6 pb-16', top: 24, bottom: 64 },
  'panel-lead': { class: 'pt-6 pb-16', top: 24, bottom: 64, innerTop: 36, innerBottom: 36 },
  /**
   * Mesma compensação do `panel-lead`, com o `pb` menor. Existe para a seção de
   * painel navy que fecha o miolo: com `panel-lead` o respiro até a Cotação daria
   * 132px, acima do teto de 128 para o mesmo fundo.
   */
  'panel-tight': { class: 'pt-6 pb-10', top: 24, bottom: 40, innerTop: 36, innerBottom: 36 },
  'centered-lead': { class: 'pt-4 pb-20', top: 16, bottom: 80 },
  /**
   * Cards que avançam por cima da base do bloco navy. `mustBeLast` porque a
   * sobreposição só se resolve visualmente contra a seção de Cotação: com outra
   * seção de biblioteca no meio, os cards ficam flutuando sobre um fundo liso.
   */
  overlap: { class: 'pt-6 pb-8', top: 24, bottom: 32, innerBottom: 40, mustBeLast: true },
  close: { class: 'pt-8 pb-20', top: 32, bottom: 80 },
}

/** Respiro aceito entre duas seções de mesmo fundo. */
export const GAP_SAME_TONE = [80, 128]

/** Respiro aceito quando o fundo muda — a troca de cor pede mais ar. */
export const GAP_TONE_CHANGE = [96, 160]

/** Respiro mínimo da primeira seção do meio, logo abaixo do hero. */
export const MIN_TOP_AFTER_HERO = 64

/** @type {(r: Rhythm) => number} */
export const effectiveTop = (r) => RHYTHMS[r].top + (RHYTHMS[r].innerTop ?? 0)

/** @type {(r: Rhythm) => number} */
export const effectiveBottom = (r) => RHYTHMS[r].bottom + (RHYTHMS[r].innerBottom ?? 0)

/** Respiro real entre duas seções vizinhas, em px. */
export const gapBetween = (aRhythm, bRhythm) => effectiveBottom(aRhythm) + effectiveTop(bRhythm)

/**
 * O respiro entre duas vizinhas cabe na faixa do padrão?
 * @returns {{ ok: boolean, gap: number, range: number[] }}
 */
export function checkGap(a, b) {
  const range = a.tone === b.tone ? GAP_SAME_TONE : GAP_TONE_CHANGE
  const gap = gapBetween(a.rhythm, b.rhythm)
  return { ok: gap >= range[0] && gap <= range[1], gap, range }
}

/* ------------------------------------------------------------- resolvedor */

/**
 * Atribui tom e ritmo a uma composição já ordenada por fase.
 *
 * Restrições, todas reverificadas depois por `check:lp`:
 *   T1 o tom escolhido é um dos que a seção declara suportar;
 *   T2 a sequência é uma corrida de `light` seguida de uma de `gray`, as duas
 *      não vazias — uma única troca de fundo, sempre no mesmo sentido;
 *   T3 cada corrida contém exatamente um bloco navy (`carriesNavy`);
 *   T4 dois blocos navy nunca são vizinhos;
 *   R1 o ritmo é um dos que a seção declara suportar;
 *   R2 o respiro entre vizinhas cabe na faixa (`checkGap`), incluindo o
 *      respiro para a seção de Cotação;
 *   R3 a primeira seção do meio abre com pelo menos `MIN_TOP_AFTER_HERO`.
 *
 * Preferências (definem qual solução sai quando várias servem):
 *   - a troca de fundo cai o mais perto possível do meio da página, para que
 *     nenhuma das duas corridas fique com uma seção só;
 *   - dentro disso, vale a ordem em que a seção declara `rhythms`.
 *
 * @param {Array<{slug: string, phase: string, tones: string[], rhythms: string[], carriesNavy?: boolean}>} sections
 * @returns {{ ok: true, layout: Array<{slug: string, tone: Tone, rhythm: Rhythm}> } | { ok: false, reason: string }}
 */
export function resolveLayout(sections) {
  if (sections.length < 2) return { ok: false, reason: 'composição precisa de ao menos 2 seções' }

  const n = sections.length
  const carriers = sections.filter((s) => s.carriesNavy).length
  if (carriers !== 2) {
    return {
      ok: false,
      reason:
        `a composição tem ${carriers} seção(ões) com bloco navy; o padrão pede exatamente 2 ` +
        '(uma na primeira metade, uma na segunda). Seções navy por fase: ' +
        'apoio → identificar ou processo; autoridade → diferenciais.',
    }
  }

  // Pontos de troca de fundo possíveis: 1..n-1 (índice da primeira seção cinza).
  //
  // Preferência: o mais perto do meio, para que nenhuma das metades fique com uma
  // seção só. No empate vence o corte **mais tardio** — a corrida clara fica maior e
  // a cinza vira um final que desemboca na Cotação, que também é cinza. É o que a LP
  // de origem faz, e `scripts/resolver.test.mjs` trava esse resultado.
  const switches = Array.from({ length: n - 1 }, (_, i) => i + 1).sort(
    (a, b) => Math.abs(a - n / 2) - Math.abs(b - n / 2) || b - a,
  )

  // R4 antes da busca: seção cujo único ritmo exige a última posição não pode estar
  // no meio. Vale checar aqui para dar um erro que diz o que fazer.
  for (const [i, section] of sections.entries()) {
    const onlyLast = section.rhythms.every((r) => RHYTHMS[r]?.mustBeLast)
    if (onlyLast && i !== sections.length - 1) {
      return {
        ok: false,
        reason:
          `"${section.slug}" tem cards que avançam sobre a seção seguinte e só funciona ` +
          `imediatamente antes da Cotação, mas está antes de "${sections[i + 1].slug}". ` +
          'Ajuste a ordem dentro da fase (campo `order` do manifesto) para deixá-la por último.',
      }
    }
  }

  const blocked = []

  for (const cut of switches) {
    const tones = sections.map((_, i) => (i < cut ? 'light' : 'gray'))
    if (!tones.every((t, i) => sections[i].tones.includes(t))) continue // T1 e T2

    const runs = [sections.slice(0, cut), sections.slice(cut)]
    if (!runs.every((run) => run.filter((s) => s.carriesNavy).length === 1)) continue // T3
    if (sections.some((s, i) => i > 0 && s.carriesNavy && sections[i - 1].carriesNavy)) continue // T4

    const layout = search(sections, tones, 0, [], blocked)
    if (layout) return { ok: true, layout }
  }

  // Sem solução: relata o respiro que travou mais fundo na busca, que é o que o
  // usuário precisa mudar.
  const worst = blocked.sort((a, b) => b.at - a.at)[0]
  return {
    ok: false,
    reason: worst
      ? `não há respiro válido entre "${worst.from}" (${RHYTHMS[worst.fromRhythm].class}) e ` +
        `"${worst.to}": daria ${worst.gap}px, fora da faixa ${worst.range[0]}–${worst.range[1]}px ` +
        `(${worst.sameTone ? 'mesmo fundo' : 'fundo muda'}). Troque uma das duas seções, ou ` +
        'declare outro ritmo suportado no manifesto da seção seguinte.'
      : 'nenhuma combinação de fundo e padding atende ao contrato: revise a composição.',
  }
}

/** Busca em profundidade pelo ritmo de cada posição, na ordem de preferência declarada. */
function search(sections, tones, i, acc, blocked) {
  if (i === sections.length) {
    const last = acc[acc.length - 1]
    const toConversion = checkGap(last, { tone: CONVERSION_TONE, rhythm: CONVERSION_RHYTHM })
    if (toConversion.ok) return acc
    blocked.push({
      at: i,
      from: last.slug,
      fromRhythm: last.rhythm,
      to: 'cotacao',
      gap: toConversion.gap,
      range: toConversion.range,
      sameTone: last.tone === CONVERSION_TONE,
    })
    return null // R2 até a Cotação
  }

  for (const rhythm of sections[i].rhythms) {
    if (!RHYTHMS[rhythm]) continue // R1
    if (i === 0 && effectiveTop(rhythm) < MIN_TOP_AFTER_HERO) continue // R3
    if (RHYTHMS[rhythm].mustBeLast && i !== sections.length - 1) continue // R4

    const here = { slug: sections[i].slug, tone: tones[i], rhythm }
    if (i > 0) {
      const gap = checkGap(acc[i - 1], here)
      if (!gap.ok) {
        blocked.push({
          at: i,
          from: acc[i - 1].slug,
          fromRhythm: acc[i - 1].rhythm,
          to: here.slug,
          gap: gap.gap,
          range: gap.range,
          sameTone: acc[i - 1].tone === here.tone,
        })
        continue // R2
      }
    }

    const found = search(sections, tones, i + 1, [...acc, here], blocked)
    if (found) return found
  }

  return null
}
