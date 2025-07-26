import { TradeGood, TradeGoods } from './types'

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
      climate?.some(c => ['warm temperate', 'cool temperate'].includes(c))
  },
  clay: {
    color: '#B5651D',
    tinto: '#865958',
    w: 2,
    conditions: ({ vegetation, topography }) =>
      vegetation?.some(b => ['grasslands', 'sparse'].includes(b)) &&
      topography?.every(t => t !== 'mountains')
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
      climate?.some(c => ['tropical', 'subtropical', 'warm temperate'].includes(c))
  },
  dates: {
    color: '#D2B48C',
    tinto: '#AD9978',
    w: 2,
    conditions: ({ vegetation, climate }) =>
      vegetation?.includes('desert') &&
      climate?.some(c => ['warm temperate', 'subtropical', 'tropical'].includes(c))
  },
  dyes: {
    color: '#800080',
    tinto: '#764170',
    w: 1,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => b !== 'desert') &&
      climate?.some(c => ['tropical', 'subtropical', 'warm temperate'].includes(c))
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
      climate?.some(c =>
        ['tropical', 'subtropical', 'warm temperate', 'cool temperate'].includes(c)
      )
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
      climate?.some(c =>
        ['tropical', 'subtropical', 'warm temperate', 'cool temperate'].includes(c)
      )
  },
  fur: {
    color: '#A0522D',
    tinto: '#72695D',
    w: 0.8,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => b !== 'desert') &&
      climate?.some(c => ['boreal', 'cool temperate', 'subarctic'].includes(c))
  },
  gems: {
    color: '#8A2BE2',
    tinto: '#9E8D8B',
    w: 1,
    conditions: ({ topography, coastal }) => topography?.some(t => t !== 'flat') && !coastal
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
  lead: {
    color: '#6E6E6E',
    tinto: '#4D428F',
    w: 0.5,
    conditions: ({ topography, coastal }) => topography?.some(t => t !== 'flat') && !coastal
  },
  legumes: {
    color: '#228B22',
    tinto: '#3E7875',
    w: 3,
    conditions: ({ climate }) =>
      climate?.some(c =>
        ['tropical', 'subtropical', 'warm temperate', 'cool temperate'].includes(c)
      )
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
      climate?.some(c => ['subtropical', 'warm temperate', 'cool temperate'].includes(c))
  },
  marble: {
    color: '#D3D3D3',
    tinto: '#9C979B',
    w: 1,
    conditions: ({ topography, coastal }) => topography?.some(t => t !== 'flat') && !coastal
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
  olives: {
    color: '#556B2F',
    tinto: '#4E600B',
    w: 2,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => !['desert', 'sparse'].includes(b)) &&
      climate?.some(c => ['warm temperate', 'subtropical'].includes(c))
  },
  pearls: {
    color: '#F0FFFF',
    tinto: '#AB9A8B',
    w: 0.5,
    conditions: ({ climate, coastal }) =>
      coastal && climate?.some(c => ['tropical', 'subtropical', 'warm temperate'].includes(c))
  },
  potato: {
    color: '#D2691E',
    tinto: '#9B8569',
    w: 3,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => ['forest', 'woods', 'grasslands'].includes(b)) &&
      climate?.some(c => ['warm temperate', 'cool temperate'].includes(c))
  },
  rice: {
    color: '#EEE8AA',
    tinto: '#555E45',
    w: 7,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => !['desert', 'sparse'].includes(b)) &&
      climate?.some(c => ['tropical', 'subtropical', 'warm temperate'].includes(c))
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
      climate?.some(c => ['warm temperate', 'subtropical', 'tropical'].includes(c))
  },
  silver: {
    color: '#C0C0C0',
    tinto: '#8D9294',
    w: 1,
    conditions: ({ topography, coastal }) => topography?.some(t => t !== 'flat') && !coastal
  },
  soybeans: {
    color: '#9ACD32',
    w: 2,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => !['desert', 'sparse'].includes(b)) &&
      climate?.some(c => ['subtropical', 'warm temperate', 'cool temperate'].includes(c))
  },
  spices: {
    color: '#FF6347',
    tinto: '#7A855F',
    w: 1,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => ['jungle', 'forest', 'woods'].includes(b)) &&
      climate?.some(c => ['tropical', 'subtropical'].includes(c))
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
      climate?.some(c => ['cool temperate', 'boreal', 'subarctic'].includes(c))
  },
  sugar: {
    color: '#FFF8DC',
    tinto: '#9B9F86',
    w: 1.5,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => !['desert', 'sparse'].includes(b)) && // Sugar cane can grow in various vegetations with enough water and warmth
      climate?.some(c => ['tropical', 'subtropical', 'warm temperate'].includes(c))
  },
  tea: {
    color: '#228B22',
    tinto: '#193214',
    w: 1,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => ['woods', 'forest', 'jungle'].includes(b)) && // Tea prefers shade and moisture, hillside
      climate?.some(c => ['tropical', 'subtropical', 'warm temperate'].includes(c))
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
      climate?.some(c => ['tropical', 'subtropical', 'warm temperate'].includes(c))
  },
  wheat: {
    color: '#F5DEB3',
    tinto: '#939636',
    w: 8.5,
    conditions: ({ vegetation, climate }) =>
      vegetation?.some(b => b !== 'desert') &&
      climate?.some(c => ['subtropical', 'warm temperate', 'cool temperate', 'boreal'].includes(c))
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
      vegetation?.some(b => b !== 'desert') && // Grapes can be grown in various open vegetations
      climate?.some(c => ['warm temperate', 'cool temperate', 'subtropical'].includes(c))
  },
  wool: {
    color: '#FFFFFF',
    tinto: '#778285',
    w: 1.5,
    conditions: ({ climate }) =>
      climate?.some(c => ['cool temperate', 'boreal', 'subarctic', 'warm temperate'].includes(c))
  }
}

const locationFilter = () =>
  window.world.locations.filter(loc => !window.world.provinces[loc.province].desolate)

const _spawn = (resource: TradeGood) => {
  const { conditions, w } = tradeGoods[resource]
  const locations = locationFilter()
  const target = Math.floor((locations.length * w) / 100)
  window.dice
    .shuffle(
      locations.filter(loc => {
        if (loc.resource) return false
        const cells = loc.cells.map(cell => window.world.cells[cell])
        return conditions({
          vegetation: cells.map(cell => cell.vegetation),
          climate: cells.map(cell => cell.climate),
          topography: cells.map(cell => cell.topography),
          coastal: cells.some(cell => cell.isCoast && cell.beach)
        })
      })
    )
    .slice(0, target)
    .forEach(loc => (loc.resource = resource))
}

export const TRADE_GOODS = {
  reference: tradeGoods,
  spawn: () => {
    // coastal
    _spawn('fish')
    _spawn('pearls')
    _spawn('amber')
    // mountains
    _spawn('iron')
    _spawn('coal')
    _spawn('copper')
    _spawn('tin')
    _spawn('lead')
    _spawn('alum')
    _spawn('marble')
    _spawn('gold')
    _spawn('silver')
    _spawn('gems')
    _spawn('stone')
    _spawn('mercury')
    // less common
    _spawn('ivory')
    _spawn('elephants')
    _spawn('dyes')
    _spawn('medicaments')
    _spawn('tea')
    _spawn('wine')
    _spawn('spices')
    _spawn('saltpeter')
    _spawn('cocoa')
    _spawn('coffee')
    _spawn('silk')
    _spawn('fur')
    _spawn('incense')
    // common
    _spawn('lumber')
    _spawn('clay')
    _spawn('salt')
    _spawn('horses')
    _spawn('cotton')
    _spawn('sugar')
    _spawn('tobacco')
    _spawn('fiber crops')
    _spawn('wool')
    _spawn('sand')
    // food
    _spawn('olives')
    _spawn('potato')
    _spawn('wheat')
    _spawn('livestock')
    _spawn('wild game')
    _spawn('fruit')
    _spawn('dates')
    _spawn('rice')
    _spawn('maize')
    _spawn('soybeans')
    _spawn('sturdy grains')
    _spawn('legumes')
    // fill any locations without a resource
    const resources = Object.keys(tradeGoods) as TradeGood[]
    locationFilter()
      .filter(loc => !loc.resource)
      .forEach(loc => {
        loc.resource = window.dice.weightedChoice(
          resources.map(r => {
            const { conditions, w } = tradeGoods[r]
            const cells = loc.cells.map(cell => window.world.cells[cell])
            return {
              v: r,
              w: conditions({
                vegetation: cells.map(cell => cell.vegetation),
                climate: cells.map(cell => cell.climate),
                topography: cells.map(cell => cell.topography),
                coastal: cells.some(cell => cell.isCoast && cell.beach)
              })
                ? w
                : 0
            }
          })
        )
      })
  },
  aggregate: () => {
    const locations = locationFilter()
    const resources = locations
      .map(loc => loc.resource ?? 'none')
      .reduce((a: Record<string, number>, b) => ({ ...a, [b]: (a[b] ?? 0) + 1 }), {})
    Object.keys(resources).forEach(k => (resources[k] = resources[k] / locations.length))
    return Object.entries(resources).sort((a, b) => b[1] - a[1]) as [TradeGood, number][]
  }
}
