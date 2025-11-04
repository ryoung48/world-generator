import { NATION } from '../../nations'
import { ARRAY } from '../../utilities/array'
import { PROVINCE } from '..'
import { TradeGood, TradeGoods } from './types'
import { Province } from '../types'

const tradeGoods: TradeGoods = {
  alum: {
    color: '#B0C4DE',
    tinto: '#694643',
    w: 0.5,
    conditions: ({ topography, coastal }) => topography?.some(t => t !== 'flat') && !coastal
  },
  amber: {
    color: '#FFBF00',
    tinto: '#A09A26',
    w: 0.5,
    conditions: ({ vegetation, climate, coastal }) =>
      coastal &&
      vegetation?.some(b => ['woods', 'forest'].includes(b)) &&
      climate?.some(c => ['temperate'].includes(c))
  },
  artillery: {
    color: '#4C5866',
    tinto: '#8A7E74',
    w: 0.2,
    conditions: ({ advanced }) => advanced
  },
  beer: {
    color: '#C4722C',
    tinto: '#6B3E1F',
    w: 1,
    conditions: ({ climate }) => climate?.some(c => ['temperate', 'boreal'].includes(c))
  },
  beeswax: {
    color: '#F9D26A',
    tinto: '#A8792F',
    w: 0.8,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => ['forest', 'woods', 'jungle'].includes(b)) &&
      climate?.some(c => ['temperate', 'subtropical', 'tropical'].includes(c))
  },
  books: {
    color: '#6B4F3A',
    tinto: '#4A3A2A',
    w: 0.4,
    conditions: () => true
  },
  clay: {
    color: '#B5651D',
    tinto: '#865958',
    w: 2,
    conditions: ({ vegetation, topography }) =>
      vegetation?.some(b => ['grasslands', 'sparse'].includes(b)) &&
      topography?.every(t => t !== 'mountains')
  },
  cloth: {
    color: '#C8D0D9',
    tinto: '#7C8A93',
    w: 1.2,
    conditions: () => true
  },
  coal: {
    color: '#2F4F4F',
    w: 1,
    conditions: ({ topography }) => topography?.some(t => ['hills', 'mountains'].includes(t))
  },
  cocoa: {
    color: '#8B4513',
    tinto: '#73462A',
    w: 0.5,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => ['jungle', 'forest', 'woods'].includes(b)) &&
      climate?.some(c => ['tropical', 'subtropical'].includes(c))
  },
  coffee: {
    color: '#6F4E37',
    tinto: '#4A3525',
    w: 0.5,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => ['jungle', 'forest', 'woods'].includes(b)) &&
      climate?.some(c => ['tropical', 'subtropical'].includes(c))
  },
  copper: {
    color: '#B87333',
    tinto: '#917644',
    w: 1.5,
    conditions: ({ topography, coastal }) => topography?.some(t => t !== 'flat') && !coastal
  },
  cotton: {
    color: '#FFFFFF',
    tinto: '#81877A',
    w: 1.5,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => ['grasslands', 'sparse', 'woods'].includes(b)) &&
      climate?.some(c => ['tropical', 'subtropical', 'temperate'].includes(c))
  },
  dyes: {
    color: '#800080',
    tinto: '#764170',
    w: 1,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => b !== 'desert') &&
      climate?.some(c => ['tropical', 'subtropical', 'temperate'].includes(c))
  },
  elephants: {
    color: '#808080',
    tinto: '#936E47',
    w: 0.2,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => b !== 'desert') &&
      climate?.some(c => ['tropical', 'subtropical'].includes(c))
  },
  'fiber crops': {
    color: '#F5F5DC',
    tinto: '#214F35',
    w: 1,
    conditions: ({ climate }) =>
      climate?.some(c => ['tropical', 'subtropical', 'temperate'].includes(c))
  },
  'fine cloth': {
    color: '#E8E2F0',
    tinto: '#957E9D',
    w: 0.5,
    conditions: ({ climate }) =>
      climate?.some(c => ['tropical', 'subtropical', 'temperate'].includes(c))
  },
  firearms: {
    color: '#3E3A39',
    tinto: '#746C68',
    w: 0.2,
    conditions: ({ advanced }) => advanced
  },
  fish: {
    color: '#1E90FF',
    tinto: '#416D6D',
    w: 10,
    conditions: ({ coastal }) => coastal
  },
  fruit: {
    color: '#FF4500',
    tinto: '#915453',
    w: 2,
    conditions: ({ climate }) =>
      climate?.some(c => ['tropical', 'subtropical', 'temperate'].includes(c))
  },
  fur: {
    color: '#A0522D',
    tinto: '#72695D',
    w: 0.8,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => b !== 'desert') &&
      climate?.some(c => ['boreal', 'temperate', 'subarctic'].includes(c))
  },
  furniture: {
    color: '#8E5A3C',
    tinto: '#C1A37E',
    w: 0.7,
    conditions: ({ vegetation }) => vegetation?.some(b => ['forest', 'woods', 'jungle'].includes(b))
  },
  gems: {
    color: '#8A2BE2',
    tinto: '#9E8D8B',
    w: 1,
    conditions: ({ topography, coastal }) => topography?.some(t => t !== 'flat') && !coastal
  },
  glass: {
    color: '#7EC8E3',
    tinto: '#4E6A78',
    w: 0.4,
    conditions: ({ coastal, vegetation }) =>
      Boolean(coastal || vegetation?.some(b => ['desert', 'sparse'].includes(b)))
  },
  gold: {
    color: '#FFD700',
    tinto: '#B29E4A',
    w: 1,
    conditions: ({ topography, coastal }) => topography?.some(t => t !== 'flat') && !coastal
  },
  horses: {
    color: '#D2B48C',
    tinto: '#7E7973',
    w: 1.5,
    conditions: ({ vegetation, climate, topography }) =>
      vegetation?.some(b => ['grasslands', 'sparse', 'desert'].includes(b)) &&
      climate?.some(c => !['arctic', 'subarctic'].includes(c)) &&
      topography?.some(t => ['flat', 'hills'].includes(t))
  },
  incense: {
    color: '#D2B48C',
    w: 0.5,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => ['desert', 'sparse'].includes(b)) &&
      climate?.some(c => ['tropical', 'subtropical'].includes(c))
  },
  iron: {
    color: '#B22222',
    tinto: '#3A3E40',
    w: 2,
    conditions: ({ topography, coastal }) => topography?.some(t => t !== 'flat') && !coastal
  },
  ivory: {
    color: '#FFFFF0',
    tinto: '#98897C',
    w: 0.2,
    conditions: ({ vegetation, climate, coastal }) =>
      (vegetation?.some(b => b !== 'desert') &&
        climate?.some(c => ['tropical', 'subtropical'].includes(c))) ||
      (coastal && climate?.some(c => ['subarctic', 'arctic'].includes(c)))
  },
  jewelry: {
    color: '#DAA520',
    tinto: '#8B6C2F',
    w: 0.3,
    conditions: () => true
  },
  lacquerware: {
    color: '#A40000',
    tinto: '#E0A05F',
    w: 0.2,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => ['jungle', 'forest'].includes(b)) &&
      climate?.some(c => ['tropical', 'subtropical'].includes(c))
  },
  lead: {
    color: '#6E6E6E',
    tinto: '#4D428F',
    w: 0.5,
    conditions: ({ topography, coastal }) => topography?.some(t => t !== 'flat') && !coastal
  },
  leather: {
    color: '#A9744A',
    tinto: '#6D4C32',
    w: 1,
    conditions: () => true
  },
  legumes: {
    color: '#228B22',
    tinto: '#3E7875',
    w: 3,
    conditions: ({ climate }) =>
      climate?.some(c => ['tropical', 'subtropical', 'temperate'].includes(c))
  },
  liquor: {
    color: '#B37A2C',
    tinto: '#643D24',
    w: 0.8,
    conditions: () => true
  },
  livestock: {
    color: '#A52A2A',
    tinto: '#5E7A27',
    w: 6,
    conditions: ({ vegetation }) => vegetation?.some(b => !['forest', 'jungle'].includes(b))
  },
  lumber: {
    color: '#8B4513',
    tinto: '#9A9F77',
    w: 3,
    conditions: ({ vegetation }) => vegetation?.some(b => ['forest', 'woods', 'jungle'].includes(b))
  },
  maize: {
    color: '#FFD700',
    tinto: '#8E792C',
    w: 4,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => ['grasslands', 'woods', 'sparse'].includes(b)) &&
      climate?.some(c => ['subtropical', 'temperate'].includes(c))
  },
  marble: {
    color: '#D3D3D3',
    tinto: '#9C979B',
    w: 1,
    conditions: ({ topography, coastal }) => topography?.some(t => t !== 'flat') && !coastal
  },
  masonry: {
    color: '#A9A9A9',
    tinto: '#5F6B76',
    w: 0.6,
    conditions: () => true
  },
  medicaments: {
    color: '#32CD32',
    tinto: '#9D7D7E',
    w: 1,
    conditions: ({ vegetation }) => vegetation?.some(b => ['forest', 'woods', 'jungle'].includes(b))
  },
  mercury: {
    color: '#696969',
    tinto: '#98646A',
    w: 0.5,
    conditions: ({ topography, coastal }) => topography?.some(t => t !== 'flat') && !coastal
  },
  'naval supplies': {
    color: '#466D80',
    tinto: '#6F8C72',
    w: 1,
    conditions: ({ vegetation, coastal }) =>
      Boolean(coastal && vegetation?.some(b => ['forest', 'woods'].includes(b)))
  },
  olives: {
    color: '#556B2F',
    tinto: '#4E600B',
    w: 2,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => !['desert', 'sparse'].includes(b)) &&
      climate?.some(c => ['temperate', 'subtropical'].includes(c))
  },
  paper: {
    color: '#F5F0DC',
    tinto: '#9B8D6F',
    w: 0.6,
    conditions: ({ vegetation }) => vegetation?.some(b => ['forest', 'woods'].includes(b))
  },
  pearls: {
    color: '#F0FFFF',
    tinto: '#AB9A8B',
    w: 0.5,
    conditions: ({ climate, coastal }) =>
      coastal && climate?.some(c => ['tropical', 'subtropical', 'temperate'].includes(c))
  },
  porcelain: {
    color: '#F0F8FF',
    tinto: '#7991A5',
    w: 0.3,
    conditions: ({ climate }) => climate?.some(c => ['temperate', 'subtropical'].includes(c))
  },
  potato: {
    color: '#D2691E',
    tinto: '#9B8569',
    w: 3,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => ['forest', 'woods', 'grasslands'].includes(b)) &&
      climate?.some(c => ['temperate'].includes(c))
  },
  pottery: {
    color: '#C0804D',
    tinto: '#8A5D37',
    w: 0.9,
    conditions: ({ vegetation }) =>
      vegetation?.some(b => ['grasslands', 'woods', 'sparse'].includes(b))
  },
  rice: {
    color: '#EEE8AA',
    tinto: '#555E45',
    w: 7,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => !['desert', 'sparse'].includes(b)) &&
      climate?.some(c => ['tropical', 'subtropical', 'temperate'].includes(c))
  },
  salt: {
    color: '#F0F8FF',
    tinto: '#A0A6A7',
    w: 2,
    conditions: ({ vegetation, coastal }) => vegetation?.includes('desert') || coastal
  },
  saltpeter: {
    color: '#DEB887',
    tinto: '#A0A6A7',
    w: 0.5,
    conditions: ({ vegetation }) => vegetation?.some(b => ['desert', 'sparse'].includes(b))
  },
  sand: {
    color: '#FFDAB9',
    tinto: '#9CA27A',
    w: 2,
    conditions: ({ vegetation, topography }) =>
      vegetation?.includes('desert') || topography?.some(t => t === 'coastal')
  },
  silk: {
    color: '#FFFAF0',
    tinto: '#922F2B',
    w: 0.8,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => ['woods', 'forest', 'jungle', 'grasslands'].includes(b)) && //Mulberry trees can grow in various vegetation
      climate?.some(c => ['temperate', 'subtropical', 'tropical'].includes(c))
  },
  silver: {
    color: '#C0C0C0',
    tinto: '#8D9294',
    w: 1,
    conditions: ({ topography, coastal }) => topography?.some(t => t !== 'flat') && !coastal
  },
  slaves: {
    color: '#3B2F2F',
    tinto: '#6A4A3C',
    w: 0.3,
    conditions: ({ climate }) => climate?.some(c => ['tropical', 'subtropical'].includes(c))
  },
  spices: {
    color: '#FF6347',
    tinto: '#7A855F',
    w: 1,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => ['jungle', 'forest', 'woods'].includes(b)) &&
      climate?.some(c => ['tropical', 'subtropical'].includes(c))
  },
  steel: {
    color: '#5A6C7A',
    tinto: '#2F353B',
    w: 0.3,
    conditions: ({ climate }) =>
      climate?.some(c => ['temperate', 'subtropical', 'boreal'].includes(c))
  },
  stone: {
    color: '#808080',
    tinto: '#434A53',
    w: 1.5,
    conditions: ({ topography, coastal }) => topography?.some(t => t !== 'flat') && !coastal
  },
  'sturdy grains': {
    color: '#C0C0C0',
    w: 7,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => !['desert', 'sparse', 'grasslands'].includes(b)) && // Hardy grains in drier regions
      climate?.some(c => ['temperate', 'boreal', 'subarctic'].includes(c))
  },
  sugar: {
    color: '#FFF8DC',
    tinto: '#9B9F86',
    w: 1.5,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => !['desert', 'sparse'].includes(b)) && // Sugar cane can grow in various vegetations with enough water and warmth
      climate?.some(c => ['tropical', 'subtropical', 'temperate'].includes(c))
  },
  tar: {
    color: '#2B2725',
    tinto: '#665B47',
    w: 0.5,
    conditions: ({ coastal, vegetation }) =>
      Boolean(coastal && vegetation?.some(b => ['forest', 'woods'].includes(b)))
  },
  tea: {
    color: '#228B22',
    tinto: '#193214',
    w: 1,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => ['woods', 'forest', 'jungle'].includes(b)) && // Tea prefers shade and moisture, hillside
      climate?.some(c => ['tropical', 'subtropical', 'temperate'].includes(c))
  },
  tin: {
    color: '#D3D3D3',
    tinto: '#5C514C',
    w: 1,
    conditions: ({ topography, coastal }) => topography?.some(t => t !== 'flat') && !coastal
  },
  tobacco: {
    color: '#8B4513',
    tinto: '#5D7760',
    w: 1,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => !['desert', 'sparse', 'grasslands'].includes(b)) && // Tobacco needs sunny open areas, but can tolerate some shade
      climate?.some(c => ['tropical', 'subtropical', 'temperate'].includes(c))
  },
  tools: {
    color: '#8C8D8F',
    tinto: '#575F5F',
    w: 0.7,
    conditions: () => true
  },
  weaponry: {
    color: '#4F4F4F',
    tinto: '#8A6D5C',
    w: 0.2,
    conditions: () => true
  },
  wheat: {
    color: '#F5DEB3',
    tinto: '#939636',
    w: 8.5,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => b !== 'desert') &&
      climate?.some(c => ['subtropical', 'temperate', 'boreal'].includes(c))
  },
  'wild game': {
    color: '#6B8E23',
    tinto: '#949468',
    w: 4,
    conditions: ({ vegetation }) => vegetation?.some(b => b !== 'desert')
  },
  wine: {
    color: '#8B0000',
    tinto: '#553450',
    w: 1,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => b !== 'desert') &&
      climate?.some(c => ['temperate', 'subtropical'].includes(c))
  },
  wool: {
    color: '#FFFFFF',
    tinto: '#778285',
    w: 1.5,
    conditions: ({ climate }) =>
      climate?.some(c => ['temperate', 'boreal', 'subarctic', 'temperate'].includes(c))
  }
}

export const TRADE_GOODS = {
  reference: tradeGoods,
  spawn: () => {
    const goods = Object.keys(tradeGoods) as TradeGood[]
    const used: Partial<Record<TradeGood, number>> = {}
    NATION.nations().forEach(nation => {
      const locations = NATION.provinces(nation)
        .map(PROVINCE.cells.land)
        .flat()
        .map(cell => {
          const { topography } = window.world.locations[cell.location]
          const { vegetation, climate } = cell
          const coastal = cell.isCoast && cell.beach
          return { topography, vegetation, climate, coastal }
        })
      const topography = ARRAY.unique(locations.map(l => l.topography))
      const climate = ARRAY.unique(locations.map(l => l.climate))
      const vegetation = ARRAY.unique(locations.map(l => l.vegetation))
      const coastal = locations.some(l => l.coastal)
      const prospects = goods
        .map(good => {
          const { conditions } = tradeGoods[good]
          if (!used[good]) used[good] = 0
          const occurrence = used[good]
          const w = conditions({ vegetation, climate, topography, coastal })
            ? 1 / 10 ** occurrence
            : 0
          used[good] += 1
          if (used[good] > 100) used[good] = 0
          return { w, v: good }
        })
        .filter(r => r.w > 0)
      nation.exports = window.dice.weightedSample(prospects, 3)
    })
  },
  imports: (nation: Province) => {
    if (!nation.imports) {
      const n = ARRAY.unique(
        NATION.neighbors({ nation, depth: 2 })
          .map(n => n.exports ?? [])
          .flat()
          .filter(good => !nation.exports.includes(good) && good !== 'wild game' && good !== 'fish')
      )
      nation.imports = window.dice.sample(n, 3)
    }
    return nation.imports
  }
}
