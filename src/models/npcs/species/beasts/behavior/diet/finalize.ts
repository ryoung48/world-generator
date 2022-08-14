import { Region } from '../../../../../regions/types'
import { range } from '../../../../../utilities/math'
import { species__assign_symbiot, species__is_symbiotic, species_symbiotic_partner } from '../../..'
import { size_group, species__size, species__size_group } from '../../../size'
import { beast__spawn } from '../..'
import { Beast } from '../../types'
import { beast__abnormal_activity } from '../activity'

const prey_size_map: Record<size_group, (_predator: number) => (_prey: number) => boolean> = {
  fine: predator => prey => prey <= predator,
  small: predator => prey => prey >= predator - 2 && prey < predator,
  large: predator => prey => prey >= predator - 2 && prey <= predator
}
const valid_prey = (predator: Beast) => (prey: Beast) => {
  const abnormal = beast__abnormal_activity(predator) || beast__abnormal_activity(prey)
  const same_activity = predator.activity_period === prey.activity_period
  const activity = same_activity || abnormal
  const partner = species_symbiotic_partner(predator)
  const is_partner = partner?.tag === predator.tag && partner?.idx === prey.idx
  return predator !== prey && !is_partner && !predator.prey.includes(prey.idx) && activity
}

interface FoodWebParams {
  species: Beast
  region: Region
}

const prospect_prey = ({
  species: predator,
  region,
  valid
}: FoodWebParams & { valid: (_prey: Beast) => boolean }) => {
  const { role, prey, environment } = predator
  // existing diets reduce variety
  const existing = prey
    .map(i => window.world.beasts[i])
    .filter(f => f.regions.includes(region.idx)).length
  // omnivores and large carnivores will have less variety
  const target = role === 'predator' ? window.dice.randint(3, 5) : window.dice.randint(1, 3)
  const candidates = region.beasts[environment.key]
    .map(i => window.world.beasts[i])
    .filter(valid)
    .sort((a, b) => a.predators.length - b.predators.length)
    .slice(0, Math.max(0, target - existing))
  return { candidates, remainder: target - existing - candidates.length }
}

const valid_prey__predator = (predator: Beast) => (prey: Beast) => {
  let { size: predator_size } = predator
  if (predator.diet.type === 'omnivore') predator_size -= 1
  if (predator.traits.some(({ tag }) => tag === 'packs')) predator_size += 1
  let { size: prey_size } = prey
  if (prey.role === 'predator') prey_size += 1
  const group = species__size_group(predator.size)
  return valid_prey(predator)(prey) && prey_size_map[group](Math.max(0, predator_size))(prey_size)
}
const predator__diet = ({ species, region }: FoodWebParams) => {
  const { environment, activity_period } = species
  const group = species__size_group(species.size)
  const { candidates, remainder } = prospect_prey({
    species,
    region,
    valid: valid_prey__predator(species)
  })
  const spawned = range(remainder).map(() => {
    const beast = beast__spawn({
      region,
      environment,
      role: 'prey',
      activity_period: beast__abnormal_activity(species) ? undefined : activity_period,
      size: Math.max(
        window.dice.weighted_choice([
          { v: species.size - 1, w: 0.5 },
          { v: species.size, w: group === 'small' ? 0 : 0.5 }
        ]),
        species__size.fine
      )
    })
    return window.world.beasts[beast]
  })
  candidates.concat(spawned).forEach(prey => {
    species.prey.push(prey.idx)
    prey.predators.push({ idx: species.idx, type: 'beast' })
  })
}

const valid_prey__hemophage = (predator: Beast) => (prey: Beast) => {
  return (
    !species__is_symbiotic(prey) &&
    !prey.semi_aquatic &&
    prey.size > predator.size + 1 &&
    valid_prey(predator)(prey)
  )
}
const hemophage__diet = ({ species, region }: FoodWebParams) => {
  const { environment, activity_period } = species
  const { candidates, remainder } = prospect_prey({
    species,
    region,
    valid: valid_prey__hemophage(species)
  })
  const spawned = range(remainder).map(() => {
    const beast = beast__spawn({
      region,
      environment,
      role: 'prey',
      activity_period: beast__abnormal_activity(species) ? undefined : activity_period,
      size: Math.min(
        window.dice.choice([species.size + 2, species.size + 3]),
        species__size.colossal
      )
    })
    return window.world.beasts[beast]
  })
  candidates.concat(spawned).forEach(prey => {
    species__assign_symbiot({ species, host: prey })
  })
}

export const beast__finalize_diet: Partial<
  Record<Beast['diet']['type'], (_params: FoodWebParams) => void>
> = {
  carnivore: predator__diet,
  omnivore: predator__diet,
  hemophage: hemophage__diet
}

export const beast__finalize_predators = ({ species, region }: FoodWebParams) => {
  const { predators, environment, role, activity_period, size, traits } = species
  const group = species__size_group(species.size)
  // existing diets reduce variety
  const existing = predators
    .filter(({ type }) => type === 'beast')
    .map(({ idx }) => window.world.beasts[idx])
    .filter(f => f.regions.includes(region.idx)).length
  let count = window.dice.randint(1, 3)
  // larger species have less predators than smaller ones
  if (group === 'fine') count += 1
  if (group === 'large') count -= 1
  // predators have less predators
  if (role === 'predator') count -= 1
  // long-lived species have less natural predators
  if (traits.some(({ tag }) => tag === 'ancient')) count -= 1
  // find prospect predators from the existing list
  let remainder = count - existing
  const prospects = region.beasts[environment.key]
    .map(i => window.world.beasts[i])
    .filter(predator => predator.diet.type === 'carnivore' || predator.diet.type === 'omnivore')
    .filter(predator => predator.prey.length < 6)
    .filter(predator => valid_prey__predator(predator)(species))
    .sort((a, b) => a.prey.length - b.prey.length)
    .slice(0, Math.max(0, count - existing))
  remainder -= prospects.length
  // spawn new predators if there are no valid candidates
  // with a reduced chance for large species
  if (size >= species__size.large) remainder -= 1
  const spawned = range(remainder).map(() => {
    const beast = beast__spawn({
      region,
      environment,
      role: 'predator',
      activity_period: beast__abnormal_activity(species) ? undefined : activity_period,
      size: Math.min(
        window.dice.weighted_choice([
          { v: species.size + 1, w: 0.5 },
          { v: species.size, w: group === 'small' ? 0 : 0.5 }
        ]),
        species__size.colossal
      )
    })
    return window.world.beasts[beast]
  })
  // append to predator-prey lists of all parties involved
  prospects.concat(spawned).forEach(predator => {
    species.predators.push({ idx: predator.idx, type: 'beast' })
    predator.prey.push(species.idx)
  })
}
