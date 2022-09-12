import { location__culture } from '../../../../regions/locations/actors/demographics'
import {
  ColorHue,
  colors__adjacent,
  colors__neutralHues,
  colors__permutations
} from '../../../../utilities/colors'
import { BasicCache, memoize } from '../../../../utilities/performance/memoization'
import { properList } from '../../../../utilities/text'
import { decorateText } from '../../../../utilities/text/decoration'
import { entityPlaceholder } from '../../text/placeholders'
import { Culture } from '../../../species/cultures/types'
import { Actor } from '../../types'
import { actor__isChild } from '../age'
import { actor__socialClass } from '../professions'
import { SocialClass } from '../professions/types'

const modest = ['rustic', 'practical', 'rugged']
const comfortable = ['stylish', 'professional', 'fine']
const prosperous = ['lavish', 'exquisite', 'elegant']

const qualities: Record<SocialClass, string[]> = {
  lower: modest,
  middle: comfortable,
  upper: prosperous
}

const accents: Record<SocialClass, number> = {
  lower: 0.5,
  middle: 1,
  upper: 1
}

const _culture__fashion = ({ fashion }: Culture) => {
  const hues = colors__adjacent({ color: fashion.color })
  const neutralHues = colors__neutralHues(hues)
  return { hues, neutralHues }
}

const culture__fashion = memoize(_culture__fashion, {
  store: (): BasicCache<ReturnType<typeof _culture__fashion>> => ({}),
  get: (cache, culture) => cache[culture.idx],
  set: (cache, res, culture) => {
    cache[culture.idx] = res
  }
})

export const actor__genOutfit = (actor: Actor) => {
  const actorCulture = window.world.cultures[actor.culture]
  const location = window.world.locations[actor.location.residence]
  const { local, ruling } = location__culture(location)
  const localCulture = window.world.cultures[local.culture.native]
  const rulingCulture = window.world.cultures[ruling.culture.ruling]
  const cultures = window.dice.choice([
    [actorCulture],
    [rulingCulture],
    [localCulture],
    [actorCulture, rulingCulture],
    [actorCulture, localCulture],
    [rulingCulture, localCulture]
  ])
  const social = actor__socialClass({ actor, time: window.world.date })
  const quality = qualities[social]
  const { hues, neutralHues } = culture__fashion(window.dice.choice(cultures))
  const neutrals: ColorHue[] = [...neutralHues, 'grey', 'brown']
  const lower = modest === quality
  let primaries = colors__permutations(['light', 'dark'], lower ? neutrals : [...hues, ...neutrals])
  if (lower) primaries = primaries.filter(color => !color.includes('purple'))
  if (!lower) primaries.push('black')
  const primary = window.dice.choice(primaries)
  actor.appearance.outfit = {
    quality: window.dice.choice(qualities[social]),
    cultures: Array.from(new Set(cultures.map(({ idx }) => idx))),
    color: { primary }
  }
  if (window.dice.random < accents[social]) {
    const accentColors = [...hues, 'white', 'black'].filter(color => !primary.includes(color))
    actor.appearance.outfit.color.accents = window.dice.choice(accentColors)
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
      accents ? decorateText({ label: primary, tooltip: `${accents} accents` }) : primary
    } outfit (${quality})`
  ]
  if (!actor__isChild({ actor })) outfit.push(...actor__piercings(actor))
  return ` ${entityPlaceholder} is wearing ${properList(outfit, 'and')}.`
}
