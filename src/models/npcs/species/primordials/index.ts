import { weighted_distribution } from '../../../utilities/math'
import { scarcity } from '../../../utilities/quality'
import { title_case } from '../../../utilities/text'
import { decorate_text } from '../../../utilities/text/decoration'
import { species__add_to_region, species__random_trait_count } from '..'
import { lang__unique_name } from '../humanoids/languages/words'
import { species__random_height } from '../size'
import { primordial__taxonomy } from './taxonomy'
import { primordial__genera } from './taxonomy/genera'
import { primordial__add_trait } from './traits'
import { Primordial, PrimordialSpawnParams } from './types'

const primordial__rarity: weighted_distribution<number> = [
  { v: scarcity.abundant, w: 0.15 },
  { v: scarcity.common, w: 0.35 },
  { v: scarcity.uncommon, w: 0.3 },
  { v: scarcity.rare, w: 0.15 },
  { v: scarcity.exceptional, w: 0.05 }
]

/**
 * spawns primordial at a given location
 * @param params.environment - spawn climate & terrain
 * @param params.region - spawn region
 * @returns primordial idx
 */
export const primordial__spawn = (params: PrimordialSpawnParams) => {
  const { environment, region, size = -1, rarity, mimicry, symbiosis } = params
  const culture = window.world.cultures[region.culture.native]
  // base template
  const species: Primordial = {
    idx: window.world.primordials.length,
    tag: 'primordial',
    name: lang__unique_name({ lang: culture.language, key: 'primordial' }),
    finalized: {},
    family: 'plant',
    genus: 'herbaceous',
    size,
    length: 0,
    environment: { ...environment },
    regions: [],
    rarity: rarity ?? window.dice.weighted_choice(primordial__rarity),
    appearance: { color: 'green' },
    reproduction: { type: 'seeds' },
    traits: []
  }
  // apply stats
  primordial__taxonomy({ species, region })
  if (params.family) species.family = params.family
  if (params.genus) species.genus = params.genus
  const genus = primordial__genera[species.genus]
  if (species.size === -1) species.size = window.dice.weighted_choice(genus.size(species))
  species.length = species__random_height(species.size)
  species.appearance = genus.appearance(species)
  species.reproduction = genus.reproduction(species)
  if (symbiosis) species.partner = { idx: -1, tag: 'primordial' }
  if (mimicry) species.mimicry = { species: -1, role: 'model' }
  // add traits
  const traits = species__random_trait_count(species.rarity)
  while (species.traits.length < traits) primordial__add_trait({ species, region })
  // add to global species list
  window.world.primordials.push(species)
  // add to regional species list
  species__add_to_region({ species, region })
  return species.idx
}

export const primordial__tooltip = (species: Primordial) =>
  `${title_case(species.genus)}${
    species.appearance.foliage ? ` (${species.appearance.foliage})` : ''
  }`

export const primordial__decorate = (species: Primordial) =>
  decorate_text({ link: species, tooltip: primordial__tooltip(species) })
