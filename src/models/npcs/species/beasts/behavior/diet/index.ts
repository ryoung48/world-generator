import { proper_list } from '../../../../../utilities/text'
import { entity_placeholder } from '../../../../../utilities/text/placeholders'
import { terrain__is_aquatic } from '../../../../../world/climate/terrain'
import { species__size, species__size_group } from '../../../size'
import { Beast } from '../../types'

const plants = ['fruit', 'seeds', 'grain', 'roots', 'flowers']

interface BeastDietParams {
  count: number
  size: number
  aquatic: boolean
}

const plant_diet = ({ count, size, aquatic }: BeastDietParams) => {
  if (aquatic) return window.dice.choice(['algae', 'aquatic plants'])
  if (size >= species__size.medium) return window.dice.choice(['grass', 'leaves'])
  return proper_list(window.dice.sample(plants, count), 'and')
}

/**
 * determines the diet of a species
 * @param params
 * @returns diet type and descriptive text
 */
export const beast__diet = (
  params: Pick<Beast, 'size' | 'role' | 'environment'>
): Beast['diet'] => {
  const { size, role, environment } = params
  const aquatic = terrain__is_aquatic(environment.terrain)
  const prey = role === 'prey'
  const predator = !prey
  let type: Beast['diet']['type'] = prey ? 'herbivore' : 'carnivore'
  const primary_diet = window.dice.randint(1, 3)
  const primary = prey ? plant_diet({ count: primary_diet, size, aquatic }) : 'meat'
  let text = `${entity_placeholder} feeds mostly on ${primary}.`
  const small = species__size_group(size) === 'small'
  const omnivore = small || predator
  let carrion = false
  if (omnivore && window.dice.random > 0.6) {
    type = 'omnivore'
    const secondary_diet = window.dice.randint(1, 2)
    const secondary =
      !aquatic && window.dice.random > 0.95
        ? 'carrion'
        : predator
        ? plant_diet({ count: secondary_diet, size, aquatic })
        : 'meat'
    const reasons = [
      'when food is scarce',
      prey ? 'as a protein supplement' : 'when prey is harder to find'
    ]
    text += ` They may sometimes consume ${secondary} ${window.dice.choice(reasons)}.`
    carrion = secondary === 'carrion'
    if (carrion && predator) type = 'carnivore'
  }
  return { type, text, carrion }
}

export const herbivore_diet = (beast: Beast): ReturnType<typeof beast__diet> => ({
  type: 'herbivore',
  text: `${entity_placeholder} feeds mostly on ${plant_diet({
    count: window.dice.randint(1, 3),
    size: beast.size,
    aquatic: terrain__is_aquatic(beast.environment.terrain)
  })}.`
})
export const scavenger_diet = (): ReturnType<typeof beast__diet> => ({
  type: 'scavenger',
  carrion: true,
  text: `${entity_placeholder} feeds mostly on carrion.`
})
export const myrmecophage_diet = (): ReturnType<typeof beast__diet> => ({
  type: 'insects',
  text: `${entity_placeholder} feeds mostly on ${window.dice.choice(['ants', 'termites'])}.`
})
export const hemophage_diet = (): ReturnType<typeof beast__diet> => ({
  type: 'hemophage',
  text: `${entity_placeholder} feeds mostly on the blood of larger animals.`
})
export const nectar_diet = (): ReturnType<typeof beast__diet> => ({
  type: 'herbivore',
  text: `${entity_placeholder} feeds mostly on flower nectar.`
})
export const detritivore_diet = (): ReturnType<typeof beast__diet> => ({
  type: 'detritivore',
  text: `${entity_placeholder} feeds mostly on dead plant and animal matter.`
})
const shellfish = ['clams', 'barnacles', 'oysters', 'mussels', 'scallops']
export const shellfish_diet = (): ReturnType<typeof beast__diet> => ({
  type: 'shellfish',
  text: `${entity_placeholder} feeds mostly on ${proper_list(
    window.dice.sample(shellfish, 2),
    'and'
  )}.`
})
const filter_feed = ['plankton', 'krill']
export const filter_feeder_diet = (): ReturnType<typeof beast__diet> => ({
  type: 'filter feeder',
  text: `${entity_placeholder} feeds mostly on ${window.dice.choice(filter_feed)}.`
})
