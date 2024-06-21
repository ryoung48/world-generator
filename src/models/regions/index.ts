import { CLIMATE } from '../cells/climate'
import { Cell } from '../cells/types'
import { ARRAY } from '../utilities/array'
import { MATH } from '../utilities/math'
import { TEXT } from '../utilities/text'
import { PROVINCE } from './provinces'
import * as Region from './types'

const traits: Record<Region.Region['traits'][number]['tag'], Region.RegionTrait> = {
  'splendid discovery': {
    text: 'a splendid mine or resource has been found',
    conflicts: ['mine depleted']
  },
  'faith strengthened': {
    text: 'a pious saint is strengthening a major faith',
    conflicts: ['faith crisis']
  },
  'heroic heir': {
    text: 'a noble heir shows signs of heroic greatness',
    conflicts: ['leadership failure', 'beloved lord']
  },
  "rival's downfall": {
    text: 'a major rival has recently suffered a calamity',
    conflicts: ['war preparations']
  },
  'farmland expansion': {
    text: 'new farmland has been opened up recently',
    conflicts: ['farmland depletion', 'hunger plague']
  },
  'trade route': { text: 'a new trade route has been forged' },
  'monster vanquished': {
    text: 'a horrible monster was slain or driven off',
    conflicts: ['monster migration', 'vermin swarm']
  },
  'bountiful harvest': {
    text: 'good harvests have enriched the people',
    conflicts: ['hunger plague', 'farmland depletion']
  },
  'minister deposed': {
    text: 'a wicked minister has been deposed',
    conflicts: ['sinister influence']
  },
  'academy founded': { text: 'a new academy has recently opened' },
  'uprising crushed': {
    text: 'a bandit or rebel uprising has been crushed',
    conflicts: ['rebel stirring']
  },
  'peace forged': {
    text: 'two rival lords have started to make peace',
    conflicts: ['peace pact', 'savage grudge']
  },
  'peace pact': {
    text: 'an old enemy has agreed to a peace pact',
    conflicts: ['peace forged', 'war preparations']
  },
  'victorious military': { text: 'the military won a recent smashing victory' },
  'working activated': { text: 'a helpful working has been activated' },
  'artifact aid': {
    text: 'a powerful artifact is helping the ruler',
    conflicts: ['artifact malcontents']
  },
  'unrest calmed': {
    text: 'an old source of unrest has been calmed',
    conflicts: ['outraged riots']
  },
  'cult purged': {
    text: 'a dark cult has been revealed and purged',
    conflicts: ['cult attraction']
  },
  'diplomacy ties': { text: 'new diplomatic ties have been made' },
  'beloved lord': {
    text: 'a new lord has risen, loved by his people',
    conflicts: ['heroic heir', 'leadership failure']
  },
  'farmland depletion': {
    text: 'farmland is becoming worn-out and depleted',
    conflicts: ['farmland expansion', 'bountiful harvest']
  },
  'vermin swarm': {
    text: 'verminous monsters are swarming',
    conflicts: ['monster vanquished', 'monster migration']
  },
  'rebel stirring': {
    text: 'a rebel front is stirring up trouble',
    conflicts: ['uprising crushed']
  },
  'internal backing': { text: 'an outside power is backing internal strife' },
  'leadership failure': {
    text: 'the leadership is inept and distracted',
    conflicts: ['heroic heir', 'beloved lord']
  },
  'faith crisis': {
    text: 'a religious reformer is breaking old compacts',
    conflicts: ['faith strengthened']
  },
  'outraged riots': { text: 'an evil is provoking outraged rioting', conflicts: ['unrest calmed'] },
  'cult attraction': {
    text: 'dark cults are attracting the ambitious',
    conflicts: ['cult purged']
  },
  'horde threat': { text: 'a blighted horde is threatening the borders' },
  'ancient peril': { text: 'an ancient ruin has disgorged some peril' },
  'artifact malcontents': {
    text: 'malcontents have obtained a potent artifact',
    conflicts: ['artifact aid']
  },
  'coffers bare': { text: 'luxuriance has left the nation’s coffers bare' },
  'aristocratic push': { text: 'local aristocrats are pushing for independence' },
  'mine depleted': {
    text: 'an important mine has run out or been harmed',
    conflicts: ['splendid discovery']
  },
  'sinister influence': {
    text: 'a sinister favorite has infatuated the leader',
    conflicts: ['minister deposed']
  },
  'hunger plague': {
    text: 'a recurring plant plague is causing hunger',
    conflicts: ['farmland expansion', 'bountiful harvest']
  },
  'monster migration': {
    text: 'fearsome monsters are migrating into the land',
    conflicts: ['vermin swarm', 'monster vanquished']
  },
  'war preparations': {
    text: 'a rival is preparing for war or raiding',
    conflicts: ['peace pact', "rival's downfall"]
  },
  'national exhaustion': { text: 'a grand national plan is exhausting the people' },
  'savage grudge': {
    text: 'a savage grudge has erupted between lords',
    conflicts: ['peace forged']
  }
}

export const REGION = {
  active: (region: Region.Region) => {
    return REGION.provinces(region).length > 0
  },
  atWar: (region: Region.Region) => REGION.relations.get({ target: 'at war', region }).length > 0,
  climate: (region: Region.Region) => {
    const capital = REGION.capital(region)
    const cell = PROVINCE.cell(capital)
    return CLIMATE.holdridge[cell.climate]
  },
  climates: (region: Region.Region) => {
    const biomes = Object.entries(
      REGION.provinces(region)
        .map(province =>
          province.cells.land
            .map(c => window.world.cells[c])
            .map(cell => {
              cell
              const biome = CLIMATE.holdridge[cell.climate]
              return { name: biome.name, zone: cell.isMountains ? 'Mountains' : biome.latitude }
            })
        )
        .flat()
        .reduce((dict: Record<string, string[]>, { name, zone }) => {
          if (!dict[zone]) dict[zone] = []
          dict[zone].push(name)
          return dict
        }, {})
    ).sort((a, b) => b[1].length - a[1].length)
    const climateSum = biomes.reduce((a, b) => a + b[1].length, 0)
    return biomes
      .map(([k, v]) => {
        const counts = Object.entries(MATH.counter(v)).sort((a, b) => b[1] - a[1])
        const biomeSum = counts.reduce((a, b) => a + b[1], 0)
        return `${TEXT.decorate({
          label: `${TEXT.titleCase(k)}`,
          tooltip: counts
            .map(([k, v]) => `${k} (${TEXT.formatters.percent(v / biomeSum)})`)
            .join(', ')
        })} (${TEXT.formatters.percent(v.length / climateSum)})`
      })
      .join(', ')
  },
  coastal: (region: Region.Region) => PROVINCE.coastal(REGION.capital(region)),
  culture: (region: Region.Region) => window.world.cultures[region.culture],
  environment: (region: Region.Region) => {
    const biomes = REGION.provinces(region)
      .map(province =>
        province.cells.land
          .map(c => window.world.cells[c])
          .map(cell => {
            cell
            const biome = CLIMATE.holdridge[cell.climate]
            return {
              climate: cell.isMountains ? undefined : biome.latitude,
              terrain: cell.isMountains ? 'Mountains' : biome.terrain
            }
          })
      )
      .flat()
    const climates = Object.entries(
      biomes
        .filter(climate => climate.climate)
        .reduce((dict: Record<string, number>, { climate }) => {
          if (!dict[climate]) dict[climate] = 0
          dict[climate] += 1
          return dict
        }, {})
    ).sort((a, b) => b[1] - a[1])
    const climateSum = climates.reduce((a, b) => a + b[1], 0)
    const terrain = Object.entries(
      biomes.reduce((dict: Record<string, number>, { terrain }) => {
        if (!dict[terrain]) dict[terrain] = 0
        dict[terrain] += 1
        return dict
      }, {})
    ).sort((a, b) => b[1] - a[1])
    const terrainSum = terrain.reduce((a, b) => a + b[1], 0)
    return {
      climates: climates
        .map(([k, v]) => {
          return `${TEXT.titleCase(k)} (${TEXT.formatters.percent(v / climateSum)})`
        })
        .slice(0, 2)
        .join(', '),
      terrain: terrain
        .map(([k, v]) => {
          return `${TEXT.titleCase(k)} (${TEXT.formatters.percent(v / terrainSum)})`
        })
        .slice(0, 3)
        .join(', ')
    }
  },
  borders: (region: Region.Region) => region.borders.map(b => window.world.regions[b]),
  capital: (region: Region.Region) => window.world.provinces[region.capital],
  domains: (region: Region.Region) => {
    return REGION.provinces(region)
      .filter(t => t.capital)
      .map(p => window.world.regions[p.region])
  },
  find: ({ ref, group, type }: Region.RegionFindParams) => {
    const found = PROVINCE.find({
      group: group.map(neighbor => window.world.provinces[neighbor.capital]),
      ref: window.world.provinces[ref.capital],
      type
    })
    return window.world.regions[found.region]
  },
  mountainous: (region: Region.Region) => {
    const provinces = REGION.provinces(region)
    const mountains = provinces
      .map(province => {
        return province.cells.land.map(i => window.world.cells[i]).filter(cell => cell.isMountains)
      })
      .flat()
    const total = provinces.reduce((sum, provinces) => sum + provinces.cells.land.length, 0)
    return mountains.length / total > 0.4
  },
  nation: (region: Region.Region) => {
    const capital = window.world.provinces[region.capital]
    const nation = PROVINCE.nation(capital)
    return nation
  },
  get nations() {
    return Object.values(window.world.regions).filter(n => !n.desolate && REGION.active(n))
  },
  neighbors: ({ region, depth = 1 }: Region.RegionNeighborsParams): Region.Region[] =>
    ARRAY.traversal.bfs({
      src: region,
      n: src =>
        PROVINCE.neighboringRegions(REGION.provinces(src)).map(r => window.world.regions[r]),
      depth
    }),
  population: (region: Region.Region) => {
    return REGION.provinces(region).reduce((sum, province) => sum + province.population, 0)
  },
  provinces: (region: Region.Region) => {
    return region.provinces.map(p => window.world.provinces[p])
  },
  relations: {
    get: (params: Region.GetRelationsParams) =>
      Object.entries(params.region.relations)
        .filter(([_, relation]) => relation === params.target)
        .map(([r]) => window.world.regions[parseInt(r)]),
    set: ({ target, r1, r2 }: Region.SetRelationsParams) => {
      r1.relations[r2.idx] = target
      r2.relations[r1.idx] = target
    }
  },
  religion: (region: Region.Region) => {
    return window.world.religions[region.religion]
  },
  sort: ({ ref, group, type }: Region.RegionSortParams) =>
    PROVINCE.sort({
      group: group.map(neighbor => window.world.provinces[neighbor.capital]),
      ref: window.world.provinces[ref.capital],
      type
    }).map(province => window.world.regions[province.region]),
  spawn: (cell: Cell) => {
    const idx = window.world.regions.length
    cell.region = idx
    const region: Region.Region = {
      idx,
      tag: 'nation',
      name: '',
      heraldry: {
        color: '',
        hue: -1,
        style: window.dice.weightedChoice([
          {
            v: 'standard',
            w: 0.5
          },
          {
            v: 'monochrome',
            w: 0.1
          },
          {
            v: 'contrast',
            w: 0.4
          }
        ])
      },
      regional: {},
      borders: [],
      provinces: [],
      landBorders: [],
      vassals: [],
      relations: {},
      culture: -1,
      desolate: false,
      exhaustion: 0
    }
    window.world.regions.push(region)
    return region
  },
  terrain: (region: Region.Region) => {
    const environment = MATH.counter(
      REGION.provinces(region)
        .map(province => {
          return province.cells.land
            .map(i => window.world.cells[i])
            .filter(cell => !cell.isMountains)
            .map(cell => {
              const { terrain } = CLIMATE.holdridge[cell.climate]
              return terrain === 'tundra' ? 'plains' : terrain === 'glacier' ? 'desert' : terrain
            })
        })
        .flat()
    )
    if (Object.keys(environment).length === 0) return 'none'
    return Object.entries(environment).sort((a, b) => b[1] - a[1])[0][0] as
      | 'forest'
      | 'plains'
      | 'desert'
  },
  traits,
  vassals: {
    add: ({ overlord, vassal }: Region.AddVassalParams) => {
      overlord.vassals.push(vassal.idx)
      vassal.overlord = overlord.idx
      REGION.relations.set({ target: 'vassal', r1: overlord, r2: vassal })
    }
  },
  zone: (region: Region.Region) => {
    const biome = REGION.climate(region)
    return CLIMATE.zone[biome.latitude]
  }
}
