import {
  species__assign_symbiot,
  species__inhabits_region,
  species__is_symbiotic,
  species__symbiotes
} from '../../..'
import { beast__spawn } from '../../../beasts'
import { primordial__spawn } from '../..'
import { PrimordialTraitParams } from '../types'
import { primordial__behavior_trait_tags } from './tags'

export const primordial__behavior_trait_finalize: Partial<
  Record<primordial__behavior_trait_tags, (_params: PrimordialTraitParams) => void>
> = {
  carnivorous: ({ species, region }) => {
    const { prey, environment, size } = species
    const existing = prey
      .map(i => window.world.beasts[i])
      .filter(f => f.regions.includes(region.idx)).length
    const count = window.dice.randint(3, 5)
    const prospects = region.beasts[environment.key]
      .map(i => window.world.beasts[i])
      .filter(beast => beast.size < size - 1 && beast.size > size - 4)
      .sort((a, b) => a.predators.length - b.predators.length)
      .slice(0, Math.max(0, count - existing))
    prospects.forEach(prey => {
      species.prey.push(prey.idx)
      prey.predators.push({ idx: species.idx, type: 'primordial' })
    })
  },
  symbiotic: ({ species, region }) => {
    const { size, environment, symbiosis } = species
    const existing = species__symbiotes(species).some(species__inhabits_region(region))
    if (!existing) {
      if (symbiosis.tag === 'beast') {
        const [chosen] = window.dice.shuffle(
          region.beasts[environment.key]
            .map(i => window.world.beasts[i])
            .filter(prospect => {
              const valid_size = prospect.size > size + 1
              return valid_size && !prospect.appearance.mimicry && !species__is_symbiotic(prospect)
            })
        )
        if (chosen) {
          species__assign_symbiot({ species, host: chosen })
        } else {
          const host = beast__spawn({
            environment,
            region,
            size: size + 2,
            symbiosis: true
          })
          species__assign_symbiot({ species, host: window.world.beasts[host] })
        }
      } else {
        const [chosen] = window.dice.shuffle(
          region.primordials[environment.key]
            .map(i => window.world.primordials[i])
            .filter(prospect => {
              const valid_size = prospect.size > size + 1
              return valid_size && !prospect.mimicry && !species__is_symbiotic(prospect)
            })
        )
        if (chosen) {
          species__assign_symbiot({ species, host: chosen })
        } else {
          const host = primordial__spawn({
            environment,
            region,
            size: size + 2,
            symbiosis: true
          })
          species__assign_symbiot({ species, host: window.world.primordials[host] })
        }
      }
    }
  },
  attractors: ({ species, region }) => {
    const { environment, attractors } = species
    const existing = attractors.species
      .map(idx => window.world.beasts[idx])
      .filter(species__inhabits_region(region)).length
    const count = window.dice.randint(1, 3)
    if (existing < count) {
      window.dice
        .shuffle(
          region.beasts[environment.key]
            .map(i => window.world.beasts[i])
            .filter(prospect => attractors.family === prospect.family)
        )
        .slice(0, count - existing)
        .forEach(beast => {
          attractors.species.push(beast.idx)
        })
    }
  }
}
