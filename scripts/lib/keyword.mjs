/**
 * Comparação de palavra-chave com o texto da página, para o `check:lp`.
 *
 * Quem clica no anúncio digitou a palavra-chave antes. O que importa é a pessoa
 * reconhecer o termo na primeira dobra, não a grafia exata — por isso a comparação
 * aceita o que o Google também trata como variante próxima: maiúscula, acento,
 * plural e outra ordem das palavras. Palavras de ligação ("de", "para") não contam.
 *
 * Sem dependências, para viajar dentro de cada LP junto com o `check:lp`.
 */

const STOPWORDS = new Set([
  'a',
  'o',
  'as',
  'os',
  'de',
  'da',
  'do',
  'das',
  'dos',
  'e',
  'em',
  'na',
  'no',
  'nas',
  'nos',
  'para',
  'por',
  'com',
  'um',
  'uma',
])

/** Plurais do português que não terminam só em "s": conexões → conexão, industriais → industrial. */
const PLURAIS = [
  ['oes', 'ao'],
  ['aes', 'ao'],
  ['ais', 'al'],
  ['eis', 'el'],
  ['ois', 'ol'],
  ['uis', 'ul'],
  ['ns', 'm'],
  ['es', ''],
  ['s', ''],
]

/** Palavras do texto, normalizadas para comparar (`norm`), com a posição no original. */
function words(text) {
  return [...String(text ?? '').matchAll(/[\p{L}\p{N}]+/gu)].map((m) => ({
    start: m.index,
    end: m.index + m[0].length,
    norm: m[0].normalize('NFD').replace(/\p{M}/gu, '').toLowerCase(),
  }))
}

/** Minúsculas, sem acento, quebrado em palavras. Números ficam: "6205-2rs" → 6205, 2rs. */
export function tokens(text) {
  return words(text).map((w) => w.norm)
}

/**
 * Formas candidatas a singular. Não é um lematizador: basta que a forma singular e
 * a plural de uma palavra tenham uma candidata em comum. Por isso "torres" gera
 * "torre" (tirando o "s") e "motores" gera "motor" (tirando o "es").
 */
function forms(word) {
  const out = new Set([word])
  for (const [end, to] of PLURAIS) {
    if (word.endsWith(end) && word.length - end.length + to.length >= 3)
      out.add(word.slice(0, -end.length) + to)
  }
  return out
}

/** Mesma palavra, a menos de plural. */
export function sameWord(a, b) {
  if (a === b) return true
  const fa = forms(a)
  for (const f of forms(b)) if (fa.has(f)) return true
  return false
}

/**
 * Palavras da palavra-chave que faltam no texto, em qualquer ordem. Lista vazia
 * quer dizer que o texto contém a palavra-chave.
 */
export function missingWords(text, keyword) {
  const words = tokens(text)
  return tokens(keyword)
    .filter((k) => !STOPWORDS.has(k))
    .filter((k) => !words.some((w) => sameWord(k, w)))
}

/**
 * Ocorrências de um termo no texto, como frase: as palavras na ordem, juntas.
 * Para negativas, onde "curso" e "de" soltos na página não são "curso de".
 * Devolve o trecho de cada ocorrência como está no texto, com até 4 palavras de
 * contexto de cada lado.
 */
export function findPhrase(text, phrase) {
  const ws = words(text)
  const target = tokens(phrase)
  if (!target.length) return []
  const hits = []
  for (let i = 0; i + target.length <= ws.length; i++) {
    if (target.every((t, j) => sameWord(t, ws[i + j].norm))) {
      const from = ws[Math.max(0, i - 4)].start
      const to = ws[Math.min(ws.length, i + target.length + 4) - 1].end
      hits.push(String(text).slice(from, to))
    }
  }
  return hits
}
