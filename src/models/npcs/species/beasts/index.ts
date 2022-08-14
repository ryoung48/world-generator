import { scarcity } from '../../../utilities/quality'
import { title_case } from '../../../utilities/text'
import { decorate_text } from '../../../utilities/text/decoration'
import { species__add_to_region, species__random_trait_count } from '..'
import { lang__unique_name } from '../humanoids/languages/words'
import { species__size_group } from '../size'
import { beast__size } from './appearance/size'
import { beast__activity } from './behavior/activity'
import { beast__diet } from './behavior/diet'
import { beast__life_cycle } from './behavior/life_cycle'
import { beast__social } from './behavior/social'
import { beast__temperament } from './behavior/temperament'
import { beast_territory } from './behavior/territory'
import { beast__taxonomy } from './taxonomy'
import { beast__add_trait } from './traits'
import { mimicry__anti_predation, mimicry_valid } from './traits/appearance/mimicry'
import { Beast, BeastSpawnParams } from './types'

const beast__random_role = (): Beast['role'] =>
  window.dice.weighted_choice([
    { v: 'predator', w: 0.1 },
    { v: 'prey', w: 0.9 }
  ])

const beast__random_rarity = (params: { size: number; role: Beast['role'] }) => {
  const { size, role } = params
  const large = species__size_group(size) === 'large'
  const predator = role === 'predator'
  let mod = 0
  if (large) mod += 0.1
  if (predator) mod += 0.05
  return window.dice.weighted_choice([
    { v: scarcity.abundant, w: 0.15 - mod },
    { v: scarcity.common, w: 0.35 - mod / 2 },
    { v: scarcity.uncommon, w: 0.3 + mod },
    { v: scarcity.rare, w: 0.15 + mod / 2 },
    { v: scarcity.exceptional, w: 0.05 }
  ])
}

/**
 * spawns beast at a given location
 * @param params.environment - spawn climate & terrain
 * @param params.region - spawn region
 * @param params.prey - true if prey (herbivores)
 * @param params.group - size group [small|large]
 * @returns beast idx
 */
export const beast__spawn = (params: BeastSpawnParams) => {
  const { environment, mimicry, symbiosis, region } = params
  const role = params.role ?? beast__random_role()
  const culture = window.world.cultures[region.culture.native]
  const desert = environment.terrain === 'Desert'
  const { size, length, bmi } = beast__size({
    size: params.size,
    civilized: region.civilized,
    environment,
    role
  })
  const diet = beast__diet({ ...params, role, size })
  const social = beast__social({ role, size })
  const species: Beast = {
    idx: window.world.beasts.length,
    tag: 'beast',
    name: lang__unique_name({ lang: culture.language, key: 'beast' }),
    rarity: beast__random_rarity({ size, role }),
    size,
    length,
    bmi,
    family: 'mammal',
    genus: { group: '', name: '' },
    environment: { ...environment },
    regions: [],
    role,
    diet,
    temperament: beast__temperament(role),
    social,
    territory: 'range',
    activity_period: params.activity_period ?? beast__activity(desert),
    ...beast__life_cycle({ size }),
    appearance: { skin: { color: [] } },
    gender_variation: { size: 1, primary: 'male' },
    traits: [],
    finalized: {},
    predators: [],
    prey: []
  }
  beast__taxonomy({ species, genus: params.genus, family: params.family, region })
  // make sure models have a trait worth mimicking
  if (mimicry) {
    species.appearance.mimicry = { species: -1, role: 'model' }
    const mimic_reason = mimicry_valid(species)
    if (!mimic_reason) {
      beast__add_trait({ species, region, tag: window.dice.choice(mimicry__anti_predation) })
    }
  }
  if (symbiosis) species.partner = { idx: -1, tag: 'beast' }
  species.territory = params.territory ?? beast_territory(species)
  // add traits
  const traits = species__random_trait_count(species.rarity)
  while (species.traits.length < traits) beast__add_trait({ species, region })
  // species that can fly will weigh much less
  if (species.flying) species.bmi /= 2
  // add to global species list
  window.world.beasts.push(species)
  // add to regional species list
  species__add_to_region({ species, region })
  return species.idx
}

export const beast__decorate = (species: Beast) =>
  decorate_text({ link: species, tooltip: title_case(species.genus.name) })
