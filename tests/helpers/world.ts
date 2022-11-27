import { culture__spawn } from '../../src/models/npcs/species/cultures'
import { region__spawn } from '../../src/models/regions'
import { province__hub } from '../../src/models/regions/provinces'
import { province__spawn } from '../../src/models/regions/provinces/spawn'
import { ExteriorCell } from '../../src/models/world/cells/types'
import { world__spawn } from '../../src/models/world/spawn'
import { shapes } from '../../src/models/world/spawn/shapers/continents/templates'

export const test__world = () => {
  const cell: ExteriorCell = {
    idx: 0,
    data: [],
    x: 0,
    y: 0,
    n: [],
    score: 0,
    region: -1,
    province: -1,
    h: 0,
    landmark: 0,
    oceanDist: 0,
    mountainDist: -1,
    roads: { land: [], sea: [] }
  }
  const cell2 = { ...cell, idx: 1 }
  window.world = world__spawn({ seed: 'test', res: 1, template: shapes[0] })
  window.world.cells.push(cell)
  const region = region__spawn(cell)
  region.climate = 'cold desert'
  region.regional = { provinces: [0] }
  const province = province__spawn({ cell, capital: true })
  window.world.cells.push(cell2)
  region__spawn(cell2)
  province__spawn({ cell: cell2, capital: true })
  province__hub(province)
  culture__spawn(region)
  window.world.actors.push({
    name: 'test',
    level: 1,
    species: { type: 'humanoid' },
    mods: { cr: 0, exp: 0 },
    inventory: { items: {}, currency: 0 },
    idx: 0,
    tag: 'actor',
    location: { birth: 0, curr: 0 },
    occupation: { key: 'mercenary', spec: 'rogue' },
    progression: {},
    skills: [],
    gender: 'male',
    culture: 35,
    surname: 'test',
    lineage: 'test',
    dates: {
      spawn: 16592401740000,
      birth: 16026925696893.182,
      death: 18201500931149.97
    },
    history: {
      unbound: true,
      events: []
    },
    attributes: {
      strength: 9,
      dexterity: 13,
      constitution: 11,
      intellect: 14,
      wisdom: 8,
      charisma: 12
    },
    parent: { name: 'test' },
    relations: [],
    equipment: { armor: null, offhand: null, mainhand: null },
    carryCapacity: 120,
    finalized: false
  })
}
