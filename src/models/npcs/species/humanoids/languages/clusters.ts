import { range } from '../../../../utilities/math'
import { title_case } from '../../../../utilities/text'
import { Cluster, Language, phoneme_catalog, STOP_CHAR, vowel_rules } from './types'

const a_vowels = ['a', 'ä', 'å', 'á', 'â', 'ā']
const e_vowels = ['e', 'ë', 'é', 'ê', 'ē']
const yi_vowels = ['i', 'y', 'ï', 'ÿ', 'í', 'ý', 'î', 'ī']
const i_vowels = ['i', 'ï', 'í', 'î', 'ī']
const o_vowels = ['o', 'u', 'ø', 'ö', 'ü', 'ó', 'ú', 'ô', 'û', 'ō', 'ū']
const feminine_consonants = ['l', 'll', 'n', 'nn', 's', 'ss', 'th', 'x', 'xx']

export const cluster__spawn = (args: Partial<Cluster> & { src: Language }) => {
  const structures = {
    [phoneme_catalog.MIDDLE_VOWEL]: [
      `${phoneme_catalog.MIDDLE_VOWEL}${phoneme_catalog.MIDDLE_CONSONANT}`,
      `${phoneme_catalog.MIDDLE_VOWEL}${phoneme_catalog.MIDDLE_CONSONANT}${phoneme_catalog.MIDDLE_VOWEL}`
    ],
    [phoneme_catalog.MIDDLE_CONSONANT]: [
      `${phoneme_catalog.MIDDLE_CONSONANT}${phoneme_catalog.MIDDLE_VOWEL}`,
      `${phoneme_catalog.MIDDLE_CONSONANT}${phoneme_catalog.MIDDLE_VOWEL}${phoneme_catalog.MIDDLE_CONSONANT}`
    ]
  }
  window.dice.flip
    ? structures[phoneme_catalog.MIDDLE_VOWEL].pop()
    : structures[phoneme_catalog.MIDDLE_CONSONANT].pop()
  const vowel_struct = window.dice.choice(structures.V)
  const con_struct = window.dice.choice(structures.C)
  const { src } = args
  const cluster: Cluster = {
    phonemes: src.phonemes,
    morphemes: {},
    new_syl: '*',
    key: args.key || '',
    ending: args.ending,
    stop_chance: args.stop_chance || 0,
    len: args.len || 2,
    variation: args.variation || 3,
    long_names: args.long_names || 0,
    patterns: {
      [phoneme_catalog.MIDDLE_VOWEL]: vowel_struct,
      [phoneme_catalog.MIDDLE_CONSONANT]: con_struct,
      [STOP_CHAR]:
        src.stop === '-'
          ? `${phoneme_catalog.MIDDLE_CONSONANT}${phoneme_catalog.MIDDLE_VOWEL}${phoneme_catalog.MIDDLE_CONSONANT}`
          : window.dice.choice([con_struct, vowel_struct])
    }
  }
  if (args.key === 'female') {
    const { phonemes } = args.src
    cluster.phonemes = JSON.parse(JSON.stringify(phonemes))
    cluster.phonemes[phoneme_catalog.BACK_VOWEL].forEach(k => {
      if (!yi_vowels.includes(k.v)) {
        cluster.phonemes[phoneme_catalog.BACK_VOWEL] = cluster.phonemes[
          phoneme_catalog.BACK_VOWEL
        ].filter(({ v }) => v !== k.v)
      }
    })
    cluster.phonemes[phoneme_catalog.END_CONSONANT].forEach(k => {
      if (!feminine_consonants.includes(k.v)) {
        cluster.phonemes[phoneme_catalog.END_CONSONANT] = cluster.phonemes[
          phoneme_catalog.END_CONSONANT
        ].filter(({ v }) => v !== k.v)
      }
    })
  }
  return cluster
}

const word_length = (cluster: Cluster) => {
  const mod = window.dice.random < cluster.long_names ? 1 : 0
  return cluster.len + mod
}

const base_patternize = (cluster: Cluster) => {
  // pick a pattern from the selected group
  const next: Record<string, string> = {
    [phoneme_catalog.MIDDLE_CONSONANT]: phoneme_catalog.MIDDLE_VOWEL,
    [phoneme_catalog.MIDDLE_VOWEL]: phoneme_catalog.MIDDLE_CONSONANT,
    [STOP_CHAR]: STOP_CHAR
  }
  const len = word_length(cluster)
  let prev: string =
    window.dice.random > 0.3 ? phoneme_catalog.MIDDLE_VOWEL : phoneme_catalog.MIDDLE_CONSONANT
  let stopped = false
  const pattern = range(len).map((_, i) => {
    prev = cluster.patterns[next[prev.slice(-1)]]
    if (!stopped && i !== len - 1 && window.dice.random < cluster.stop_chance) {
      prev = `${prev}${STOP_CHAR}`
      stopped = true
    }
    return prev
  })
  pattern.forEach((seg, i) => {
    if (seg.includes(STOP_CHAR)) {
      pattern[i] = pattern[i].replace(
        `${phoneme_catalog.MIDDLE_CONSONANT}${STOP_CHAR}`,
        `${phoneme_catalog.END_CONSONANT}${STOP_CHAR}`
      )
      // eslint-disable-next-line no-useless-escape
      const start_c = new RegExp(`^${phoneme_catalog.MIDDLE_CONSONANT}(\W*)`)
      pattern[i + 1] = pattern[i + 1].replace(start_c, `${phoneme_catalog.START_CONSONANT}$1`)
    }
  })
  const e = pattern.length - 1
  let ending = pattern[e].slice(-1)
  // append proper ending char
  if (cluster.ending && cluster.ending !== ending) {
    pattern[e] += cluster.ending
  }
  // replace with proper start|end consonant
  ending = pattern[e].slice(-1)
  if (ending === phoneme_catalog.MIDDLE_CONSONANT) {
    pattern[e] = `${pattern[e].slice(0, -1)}${phoneme_catalog.END_CONSONANT}`
  }
  if (ending === phoneme_catalog.MIDDLE_VOWEL) {
    pattern[e] = `${pattern[e].slice(0, -1)}${phoneme_catalog.END_VOWEL}`
  }
  let start = pattern[0][0]
  if (start === phoneme_catalog.MIDDLE_VOWEL) {
    pattern[0] = `${phoneme_catalog.START_VOWEL}${pattern[0].slice(1)}`
  }
  start = pattern[0][0]
  if (start === phoneme_catalog.MIDDLE_CONSONANT) {
    pattern[0] = `${phoneme_catalog.START_CONSONANT}${pattern[0].slice(1)}`
  }
  // sub in middle vowels
  const bv = new RegExp(`${phoneme_catalog.START_CONSONANT}${phoneme_catalog.MIDDLE_VOWEL}`, 'g')
  pattern[0] = pattern[0].replace(
    bv,
    `${phoneme_catalog.START_CONSONANT}${phoneme_catalog.FRONT_VOWEL}`
  )
  const vf = new RegExp(`${phoneme_catalog.MIDDLE_VOWEL}${phoneme_catalog.END_CONSONANT}`, 'g')
  pattern[e] = pattern[e].replace(
    vf,
    `${phoneme_catalog.BACK_VOWEL}${phoneme_catalog.END_CONSONANT}`
  )
  return pattern
}
const feminine_pattern = (cluster: Cluster, src: Language) => {
  const pattern = base_patternize(cluster)
  const has_content =
    cluster.phonemes[phoneme_catalog.END_CONSONANT].length > 0 &&
    cluster.phonemes[phoneme_catalog.BACK_VOWEL].length > 0
  if (
    has_content &&
    src.ending === phoneme_catalog.MIDDLE_CONSONANT &&
    window.dice.random < src.consonant_chance
  ) {
    const e = pattern.length - 1
    const cl = new RegExp(`${phoneme_catalog.MIDDLE_CONSONANT}${phoneme_catalog.END_VOWEL}`, 'g')
    pattern[e] = pattern[e].replace(
      cl,
      `${phoneme_catalog.MIDDLE_CONSONANT}${phoneme_catalog.BACK_VOWEL}${phoneme_catalog.END_CONSONANT}`
    )
  }
  return pattern
}
const patternize = (cluster: Cluster, src: Language) => {
  if (cluster.key === 'female') return feminine_pattern(cluster, src)
  return base_patternize(cluster)
}

const not_harsh = (
  src: Language,
  params: {
    curr: string
    prev: string
    used_long_vowel: boolean
    used_digraph: boolean
  }
) => {
  const { curr, prev, used_long_vowel, used_digraph } = params
  const long_vowel = used_long_vowel && has_long_vowel(src, curr)
  const digraph = used_digraph && has_digraph(src, curr)
  const non_vowels = prev.split('').filter(c => !src.vowels.includes(c))
  return (
    !long_vowel &&
    !digraph &&
    !curr
      .split('')
      .filter(mc => !src.vowels.includes(mc))
      .some(mc => non_vowels.slice(-1).includes(mc))
  )
}

const valid_letter = (
  src: Language,
  params: {
    curr: string
    prev: string
    type: string
    used_long_vowel: boolean
    used_digraph: boolean
  }
) => {
  const { curr, prev, type, used_long_vowel, used_digraph } = params
  const valid_front =
    type !== phoneme_catalog.FRONT_VOWEL ||
    !vowel_rules.front[curr] ||
    vowel_rules.front[curr].includes(prev.substr(-1)) ||
    vowel_rules.front[curr].includes(prev.substr(-2))
  const valid_end =
    type !== phoneme_catalog.END_CONSONANT ||
    !vowel_rules.back[prev.slice(-2)] ||
    vowel_rules.back[prev.slice(-2)].includes(curr)
  return not_harsh(src, { curr, prev, used_long_vowel, used_digraph }) && valid_end && valid_front
}

const has_long_vowel = (src: Language, prospect: string) =>
  src.diphthongs.some(v => prospect.includes(v))

const has_digraph = (src: Language, prospect: string) =>
  src.digraphs.some(v => prospect.includes(v))

const base_end_vowels = (cluster: Cluster) => cluster.phonemes[phoneme_catalog.END_VOWEL]
const feminine_end_vowels = (cluster: Cluster, prev: string) => {
  const vowels = [...a_vowels, ...i_vowels]
  if (['l', 'n'].includes(prev.slice(-1)) || ['ett'].includes(prev.slice(-3))) {
    vowels.push(...e_vowels)
  }
  const complex: string[] = []
  if (['r', 'f'].includes(prev.slice(-1))) {
    complex.push('ie', 'ae')
  }
  if (['m', 'r', 's', 'z'].includes(prev.slice(-1)) || ['th', 'sh', 'h'].includes(prev.slice(-2))) {
    complex.push(...['ee', 'ée', 'ëe', 'êe', 'ae'])
  }
  return base_end_vowels(cluster).filter(
    v => vowels.includes(v.v.slice(-1)) || complex.includes(v.v.slice(-2))
  )
}
const masculine_end_vowels = (cluster: Cluster) => {
  return base_end_vowels(cluster).filter(v => o_vowels.includes(v.v.slice(-1)))
}
export const end_vowels = (cluster: Cluster, prev: string) => {
  if (cluster.key === 'female') return feminine_end_vowels(cluster, prev)
  if (cluster.key === 'male') return masculine_end_vowels(cluster)
  return base_end_vowels(cluster)
}

const base_end_consonants = (cluster: Cluster) => cluster.phonemes[phoneme_catalog.END_CONSONANT]
const masculine_end_consonants = (cluster: Cluster, prev: string) => {
  const prev_sub1 = prev.slice(-1)
  const prev_sub2 = prev.slice(-2)
  const endings = cluster.phonemes[phoneme_catalog.END_CONSONANT]
  const valid = endings.filter(i => !feminine_consonants.includes(i.v))
  if (valid.length > 0 && yi_vowels.includes(prev_sub1) && !vowel_rules.back[prev_sub2]) {
    return endings.filter(i => !feminine_consonants.includes(i.v))
  }
  return endings
}
const end_consonants = (cluster: Cluster, prev: string) => {
  if (cluster.key === 'male') return masculine_end_consonants(cluster, prev)
  return base_end_consonants(cluster)
}

const base_back_vowels = (cluster: Cluster) => cluster.phonemes[phoneme_catalog.BACK_VOWEL]
const masculine_back_vowels = (cluster: Cluster) => {
  const endings = cluster.phonemes[phoneme_catalog.END_CONSONANT]
  const valid = endings.filter(i => !feminine_consonants.includes(i.v))
  const back = cluster.phonemes[phoneme_catalog.BACK_VOWEL]
  return valid.length > 0 ? back.filter(v => !yi_vowels.includes(v.v)) : back
}
const back_vowels = (cluster: Cluster) => {
  if (cluster.key === 'male') return masculine_back_vowels(cluster)
  return base_back_vowels(cluster)
}

const syllable = (
  cluster: Cluster,
  src: Language,
  params: {
    template: string
    curr_word: string[]
    used_long_vowel: boolean
    used_digraph: boolean
  }
) => {
  const { template, curr_word, used_long_vowel, used_digraph } = params
  // create a new syllable from template
  let prev = curr_word.join('')
  let local_long_vowel = used_long_vowel
  let local_used_digraph = used_digraph
  return template
    .split('')
    .map(c => {
      const letter = c as phoneme_catalog | typeof STOP_CHAR
      // no action for stop characters (they can only appear once)
      if (letter === STOP_CHAR) {
        return src.stop
      }
      const phonemes =
        letter === phoneme_catalog.END_VOWEL
          ? end_vowels(cluster, prev)
          : letter === phoneme_catalog.END_CONSONANT
          ? end_consonants(cluster, prev)
          : letter === phoneme_catalog.BACK_VOWEL
          ? back_vowels(cluster)
          : cluster.phonemes[letter]
      // get the valid character set (non-unique or non-used characters)
      const valid = phonemes.filter(m =>
        valid_letter(src, {
          curr: m.v,
          prev,
          type: letter,
          used_long_vowel: local_long_vowel,
          used_digraph: local_used_digraph
        })
      )
      // pick a random character from the valid set
      // use all characters if there are none left
      const chosen = window.dice.weighted_choice(
        valid.length > 0 ? valid : cluster.phonemes[letter]
      )
      prev += chosen
      // prevent additional long vowels
      if (has_long_vowel(src, chosen)) {
        local_long_vowel = true
      }
      if (has_digraph(src, chosen)) {
        local_used_digraph = true
      }
      return chosen
    })
    .join('')
}

const has_morph = (cluster: Cluster, template: string, morph: string) =>
  cluster.morphemes[template].filter(m => m !== cluster.new_syl).some(m => m === morph)

const new_morph = (
  cluster: Cluster,
  src: Language,
  params: {
    template: string
    curr_word: string[]
    used_long_vowel: boolean
    used_digraph: boolean
  }
) => {
  const { template, curr_word, used_long_vowel, used_digraph } = params
  // create new syllable
  const prospect = syllable(cluster, src, { template, curr_word, used_long_vowel, used_digraph })
  // add syllable to morpheme pattern list
  if (!has_morph(cluster, template, prospect)) {
    cluster.morphemes[template].push(prospect)
  }
  return prospect
}

const morpheme = (
  cluster: Cluster,
  src: Language,
  params: {
    template: string
    word: string[]
    used_long_vowel: boolean
    used_digraph: boolean
    repeat?: boolean
  }
) => {
  const { word, repeat, template } = params
  let { used_long_vowel, used_digraph } = params
  // create morpheme distribution for pattern template if one doesn't already exist
  if (!cluster.morphemes[template]) {
    // each '*' is a chance to create a new morpheme
    // greater chance to create new morphemes for start sequences
    cluster.morphemes[template] = []
    const start: string[] = [phoneme_catalog.START_CONSONANT, phoneme_catalog.START_VOWEL]
    if (start.includes(template[0])) {
      cluster.morphemes[template] = range(cluster.variation).map(() => cluster.new_syl)
    } else {
      range(cluster.variation).map(() =>
        new_morph(cluster, src, { template, curr_word: word, used_long_vowel, used_digraph })
      )
      const { phonemes } = src
      // add non-standard ('ah') endings if applicable
      const has_h = phonemes[phoneme_catalog.START_CONSONANT]
        .concat(phonemes[phoneme_catalog.MIDDLE_CONSONANT])
        .some(({ v }) => v === 'h')
      if (cluster.key === 'female' && template.includes(phoneme_catalog.END_CONSONANT) && has_h) {
        const partial = template.replace(
          `${phoneme_catalog.BACK_VOWEL}${phoneme_catalog.END_CONSONANT}`,
          ''
        )
        const prefix = cluster__simple_word(cluster, src, partial).toLowerCase()
        a_vowels
          .filter(a => phonemes[phoneme_catalog.BACK_VOWEL].some(({ v }) => v === a))
          .forEach(a => cluster.morphemes[template].push(`${prefix}${a}h`))
      }
    }
  }
  // valid morphemes haven't been already used and don't include used unique characters
  const prev = word.join('')
  const valid = cluster.morphemes[template].filter(curr => {
    return (
      curr === cluster.new_syl ||
      (!word.includes(curr) && not_harsh(src, { curr, prev, used_long_vowel, used_digraph }))
    )
  })
  const idx = ~~(window.dice.random * valid.length)
  let prospect = !valid[idx] || repeat ? cluster.new_syl : valid[idx]
  // create a new morpheme if none valid or '*' is chosen
  if (prospect === cluster.new_syl) {
    // add new morpheme
    prospect = new_morph(cluster, src, { template, curr_word: word, used_long_vowel, used_digraph })
  }
  // prevent additional long vowels
  if (has_long_vowel(src, prospect)) {
    used_long_vowel = true
  }
  if (has_digraph(src, prospect)) {
    used_digraph = true
  }
  // add morpheme to used morpheme list
  word.push(prospect)
  return { used_long_vowel, used_digraph }
}

export const cluster__word = (cluster: Cluster, src: Language, repeat = false) => {
  // pick a pattern from the selected group
  const pattern = patternize(cluster, src)
  // create the word from cluster defined morphemes (reverse order favors double vowels at the end)
  let used_long_vowel = false
  let used_digraph = false
  const word: string[] = []
  pattern.forEach(template => {
    const updates = morpheme(cluster, src, {
      template,
      repeat,
      word,
      used_long_vowel,
      used_digraph
    })
    used_long_vowel = updates.used_long_vowel
    used_digraph = updates.used_digraph
  })
  // finalize word
  return title_case(word.flat().join(''))
}

export const cluster__simple_word = (cluster: Cluster, src: Language, template: string) =>
  title_case(
    syllable(cluster, src, { template, curr_word: [], used_long_vowel: true, used_digraph: true })
  )
