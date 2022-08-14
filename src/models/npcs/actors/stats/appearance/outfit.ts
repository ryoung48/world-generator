import { location__culture } from '../../../../regions/locations/actors/demographics'
import {
  color,
  color__adjacent,
  color__neutral_hues,
  color__permutations
} from '../../../../utilities/colors'
import { BasicCache, memoize } from '../../../../utilities/performance/memoization'
import { proper_list } from '../../../../utilities/text'
import { decorate_text } from '../../../../utilities/text/decoration'
import { entity_placeholder } from '../../../../utilities/text/placeholders'
import { Culture } from '../../../species/humanoids/cultures/types'
import { Actor } from '../../types'
import { actor__is_child } from '../age'
import { actor__social_class } from '../professions'
import { social_class } from '../professions/types'

const modest = ['rustic', 'practical', 'rugged']
const comfortable = ['stylish', 'professional', 'fine']
const prosperous = ['lavish', 'exquisite', 'elegant']

const qualities: Record<social_class, string[]> = {
  lower: modest,
  middle: comfortable,
  upper: prosperous
}

const accents: Record<social_class, number> = {
  lower: 0.5,
  middle: 1,
  upper: 1
}

const _culture__fashion = ({ fashion }: Culture) => {
  const hues = color__adjacent({ color: fashion.color })
  const neutral_hues = color__neutral_hues(hues)
  return { hues, neutral_hues }
}

const culture__fashion = memoize(_culture__fashion, {
  store: (): BasicCache<ReturnType<typeof _culture__fashion>> => ({}),
  get: (cache, culture) => cache[culture.idx],
  set: (cache, res, culture) => {
    cache[culture.idx] = res
  }
})

export const actor__gen_outfit = (actor: Actor) => {
  const actor_culture = window.world.cultures[actor.culture]
  const location = window.world.locations[actor.location.residence]
  const { local, ruling } = location__culture(location)
  const local_culture = window.world.cultures[local.culture.native]
  const ruling_culture = window.world.cultures[ruling.culture.ruling]
  const cultures = window.dice.choice([
    [actor_culture],
    [ruling_culture],
    [local_culture],
    [actor_culture, ruling_culture],
    [actor_culture, local_culture],
    [ruling_culture, local_culture]
  ])
  const social = actor__social_class({ actor, time: window.world.date })
  const quality = qualities[social]
  const { hues, neutral_hues } = culture__fashion(window.dice.choice(cultures))
  const neutrals: color[] = [...neutral_hues, 'grey', 'brown']
  const lower = modest === quality
  let primaries = color__permutations(['light', 'dark'], lower ? neutrals : [...hues, ...neutrals])
  if (lower) primaries = primaries.filter(color => !color.includes('purple'))
  if (!lower) primaries.push('black')
  const primary = window.dice.choice(primaries)
  actor.appearance.outfit = {
    quality: window.dice.choice(qualities[social]),
    cultures: Array.from(new Set(cultures.map(({ idx }) => idx))),
    color: { primary }
  }
  if (window.dice.random < accents[social]) {
    const accent_colors = [...hues, 'white', 'black'].filter(color => !primary.includes(color))
    actor.appearance.outfit.color.accents = window.dice.choice(accent_colors)
  }
}

const actor__piercings = (actor: Actor) => {
  const { ears, nose } = actor.appearance.piercings
  const piercings: string[] = []
  if (ears) piercings.push(`${ears} earings`)
  if (nose) piercings.push(`a ${nose} nose piercing`)
  return piercings
}

export const actor__outfit = (actor: Actor) => {
  const { quality, color } = actor.appearance.outfit
  const { primary, accents } = color
  const outfit = [
    `${quality.includes('ious') ? 'an' : 'a'} ${
      accents ? decorate_text({ label: primary, tooltip: `${accents} accents` }) : primary
    } outfit (${quality})`
  ]
  if (!actor__is_child({ actor })) outfit.push(...actor__piercings(actor))
  return ` ${entity_placeholder} is wearing ${proper_list(outfit, 'and')}.`
}
