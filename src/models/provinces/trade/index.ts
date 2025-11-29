import { PROVINCE } from '..'
import { NATION } from '../../nations'
import { ARRAY } from '../../utilities/array'
import { Province } from '../types'
import { TradeGood, TradeGoods } from './types'

export const tradeGoods: TradeGoods = {
  'academic research': {
    description: 'experimental theories and designs from scholarly studies.',
    conditions: params => params.development >= 3.6
  },
  'aeronautical supplies': {
    description: 'materials and parts for airships, gliders, and other flying machines.',
    conditions: params => params.development >= 4.25
  },
  'alchemical herbs': {
    description: 'plants known for their healing or poisonous properties.',
    conditions: params => params.vegetation.some(v => ['forest', 'jungle', 'woods'].includes(v))
  },
  alum: {
    description: 'a mineral salt used for dyeing, tanning, and medicinal applications.',
    conditions: params => params.topography.some(t => ['mountains', 'hills'].includes(t))
  },
  'anti-magic alloys': {
    description: 'rare minerals that dampen or nullify magical energies.',
    conditions: params => params.development >= 3.6 && params.topography.includes('mountains')
  },
  apiaries: {
    description: 'bee products like honey and wax, used for sweetening and candles.',
    conditions: params => params.vegetation.some(v => ['grasslands', 'woods', 'forest'].includes(v))
  },
  'arcane reagents': {
    description: 'metals, crystals, and essences used for enchantments, rituals, and spells.',
    conditions: params => params.development >= 2.75
  },
  artillery: {
    description: 'large-scale ranged weapons, including cannons, bombards, and heavy guns.',
    conditions: params => params.development >= 3.1
  },
  artwork: {
    description: 'the finest paintings, sculptures, and other decorative elements.',
    conditions: params => params.development >= 3.1
  },
  'astronomical equipment': {
    description: 'instruments for charting stars, guiding mariners and scholars.',
    conditions: params => params.development >= 3.6
  },
  beer: {
    description: 'grain-based brew, consumed fresh or aged, and widely enjoyed across regions.',
    conditions: params => params.climate.some(c => ['temperate', 'boreal'].includes(c))
  },
  ceramics: {
    description: 'fired clay objects, including pottery, statues, utensils, and urns.',
    conditions: params => params.development >= 3.1
  },
  clay: {
    description: 'pliable earth used for pottery, bricks, sculptures, and seals.',
    conditions: params => params.topography.some(t => ['flat', 'marsh'].includes(t))
  },
  'clockwork devices': {
    description: 'intricate wound mechanisms for timers, toys, and automata.',
    conditions: params => params.development >= 3.6
  },
  coal: {
    description: 'carbon-rich fuel for heating, metalworking, and industrial power.',
    conditions: params => params.topography.some(t => ['mountains', 'hills'].includes(t))
  },
  cocoa: {
    description: 'ground cacao seeds used for drinks, confectionery, and luxury foods.',
    conditions: params =>
      params.climate.some(c => ['tropical', 'subtropical'].includes(c)) &&
      params.vegetation.some(c => !['desert', 'sparse', 'grasslands'].includes(c))
  },
  coffee: {
    description: 'roasted beans producing a rich, stimulating beverage.',
    conditions: params =>
      params.climate.some(c => ['tropical', 'subtropical'].includes(c)) &&
      params.vegetation.some(c => !['desert', 'sparse', 'grasslands'].includes(c))
  },
  copper: {
    description: 'a malleable reddish metal used for conductors, alloys, and decorative work.',
    conditions: params => params.topography.some(t => ['mountains', 'hills'].includes(t))
  },
  cotton: {
    description: 'soft plant fiber spun into breathable fabrics for everyday use.',
    conditions: params =>
      params.climate.some(c => ['temperate', 'subtropical', 'tropical'].includes(c))
  },
  cybernetics: {
    description: 'intricate mechanical parts and prosthetics for bodily enhancement.',
    conditions: params => params.development >= 4.25
  },
  'daemonic curios': {
    description: 'unsettling artifacts rumored to carry omens or curses.',
    conditions: params => params.development < 3.5
  },
  'deep-sea harvests': {
    description: 'rare fish, kelp, and abyssal delicacies.',
    conditions: params => params.topography.includes('coastal')
  },
  dyes: {
    description: 'substances for coloring fabrics and other materials.',
    conditions: params =>
      params.vegetation.some(v => ['forest', 'jungle', 'grasslands'].includes(v))
  },
  enchantments: {
    description: 'magical items and elixirs that provide temporary augmentations.',
    conditions: params => params.development >= 2.75
  },
  'fiber crops': {
    description: 'plants used to make ropes, sails, fishing nets, and clothes.',
    conditions: params => params.vegetation.some(v => ['grasslands', 'flat'].includes(v))
  },
  'fine clothing': {
    description: 'luxurious garments made from high-quality fabrics.',
    conditions: params => params.development >= 3.1
  },
  fishing: {
    description: 'aquatic creatures, harvested for food; fresh or preserved.',
    conditions: params => params.topography.some(t => ['coastal', 'marsh'].includes(t))
  },
  fruits: {
    description: 'edible plant produce, from sweet to tangy varieties.',
    conditions: params =>
      params.climate.some(c => ['temperate', 'subtropical', 'tropical'].includes(c))
  },
  fur: {
    description: 'animal pelts, used for warm clothing and luxury garments.',
    conditions: params =>
      params.climate.some(c => ['arctic', 'subarctic', 'boreal'].includes(c)) ||
      params.vegetation.some(v => ['forest', 'woods'].includes(v))
  },
  furniture: {
    description: 'carved tables, inlaid chests, and cushioned seats.',
    conditions: params => params.vegetation.some(v => ['forest', 'woods'].includes(v))
  },
  gemstones: {
    description: 'precious stones finely cut and polished for jewelry or art.',
    conditions: params => params.topography.some(t => ['mountains', 'hills'].includes(t))
  },
  glassware: {
    description: 'bottles, lenses, mirrors, and delicate ornaments.',
    conditions: params => params.development >= 3.1
  },
  gold: {
    description: 'highly prized metal, used for coinage, adornment, and ceremonial artifacts.',
    conditions: params => params.topography.some(t => ['mountains', 'hills'].includes(t))
  },
  grain: {
    description: 'wheat, rice, barley, and other staple crops.',
    conditions: params =>
      params.topography.includes('flat') || params.vegetation.includes('grasslands')
  },
  horses: {
    description: 'valuable for transportation, agriculture, and warfare.',
    conditions: params =>
      params.vegetation.includes('grasslands') || params.topography.includes('flat')
  },
  incense: {
    description: 'aromatic resins, burned for fragrance or ritual.',
    conditions: params => params.climate.some(c => ['tropical', 'subtropical'].includes(c))
  },
  'industrial parts': {
    description: 'gears, tools, and mechanisms for advanced manufacturing.',
    conditions: params => params.development >= 4.25
  },
  iron: {
    description: 'a strong, versatile metal essential for tools, construction, and weaponry.',
    conditions: params => params.topography.some(t => ['mountains', 'hills'].includes(t))
  },
  ivory: {
    description: 'hard white material from tusks, for art and luxury items.',
    conditions: params => params.climate.some(c => ['tropical', 'subtropical'].includes(c))
  },
  jewelry: {
    description: 'crafted adornments made from precious metals, gems, and fine materials.',
    conditions: params => params.development >= 3.1
  },
  lacquerware: {
    description: 'glossy coated boxes, trays, and art pieces.',
    conditions: params =>
      params.vegetation.some(v => ['forest', 'woods'].includes(v)) && params.development >= 3.1
  },
  'leather products': {
    description: 'durable goods from treated animal hides.',
    conditions: params => params.vegetation.includes('grasslands')
  },
  legumes: {
    description: 'protein-rich plant seeds such as beans and lentils.',
    conditions: params => params.climate.some(c => ['temperate', 'subtropical'].includes(c))
  },
  liquor: {
    description: 'distilled spirits offering high potency and long shelf life.',
    conditions: params => params.development >= 2.75
  },
  livestock: {
    description: 'domesticated animals, for meat, labor, or dairy products.',
    conditions: params =>
      params.vegetation.includes('grasslands') || params.topography.includes('flat')
  },
  logging: {
    description: 'harvested wood used for construction, furniture, and fuel.',
    conditions: params => params.vegetation.some(v => ['forest', 'woods', 'jungle'].includes(v))
  },
  'manufactured goods': {
    description: 'mass-produced tools, canned goods, and other everyday items.',
    conditions: params => params.development >= 3.6
  },
  marble: {
    description: 'smooth, elegant stone for art and architecture.',
    conditions: params => params.topography.some(t => ['mountains', 'plateau'].includes(t))
  },
  'medical services': {
    description: 'lab-grown organs, cloning, and longevity treatments.',
    conditions: params => params.development >= 4.25
  },
  mercenaries: {
    description: 'professional soldiers for hire.'
  },
  mercury: {
    description: 'a liquid metal valued for alchemy, measuring devices, and specialized alloys.',
    conditions: params => params.topography.some(t => ['mountains', 'hills'].includes(t))
  },
  'meteorite fragments': {
    description: 'rare minerals from space, often possessing exotic properties.'
  },
  'musical instruments': {
    description: 'lutes, violins, and flutes crafted by master artisans.',
    conditions: params => params.development >= 3.1
  },
  narcotics: {
    description: 'addictive substances, used for pain relief and recreation.',
    conditions: params =>
      params.climate.some(c => ['tropical', 'subtropical', 'temperate'].includes(c))
  },
  'olive oil': {
    description: 'a rich oil commonly used in cooking and lamps.',
    conditions: params => params.climate.some(c => ['temperate', 'subtropical'].includes(c))
  },
  'ornamental woods': {
    description: 'exotic hardwoods for fine furniture and decorative items.',
    conditions: params => params.vegetation.some(v => ['jungle', 'forest'].includes(v))
  },
  paper: {
    description: 'thin sheets made from plant fibers for written works and administration.',
    conditions: params => params.development >= 3.1
  },
  pearls: {
    description: 'lustrous spheres from mollusks, prized in jewelry and art.',
    conditions: params => params.topography.includes('coastal')
  },
  petroleum: {
    description: 'black crude oil, valued as a fuel source and for making tar and lubricants.',
    conditions: params => params.topography.some(t => ['flat', 'coastal'].includes(t))
  },
  salt: {
    description: 'essential mineral, for food preservation and seasoning.',
    conditions: params =>
      params.topography.some(t => ['coastal', 'marsh'].includes(t)) ||
      params.vegetation.includes('desert')
  },
  sand: {
    description:
      'granular material, essential for glass production, construction, and metal casting.',
    conditions: params => params.vegetation.includes('desert')
  },
  shipbuilding: {
    description: 'high quality maritime vessel construction, repair, and supplies.',
    conditions: params => params.topography.includes('coastal') && params.development >= 2.75
  },
  silk: {
    description: 'fine, shimmering fiber prized for luxurious textiles and ceremonial clothing.',
    conditions: params =>
      params.climate.some(c => ['temperate', 'subtropical', 'tropical'].includes(c))
  },
  silver: {
    description: 'precious metal valued for currency, ornamentation, and refined tableware.',
    conditions: params => params.topography.some(t => ['mountains', 'hills'].includes(t))
  },
  slaves: {
    description: 'unfree people, traded and exploited for labor.',
    conditions: params => params.slaves
  },
  spices: {
    description: 'aromatic substances, for flavoring food and medicine.',
    conditions: params => params.climate.some(c => ['tropical', 'subtropical'].includes(c))
  },
  stone: {
    description: 'durable material for construction and fortifications.',
    conditions: params => params.topography.some(t => ['mountains', 'hills', 'plateau'].includes(t))
  },
  sugar: {
    description: 'sweet crystalline substance, for food and confectionery.',
    conditions: params => params.climate.some(c => ['tropical', 'subtropical'].includes(c))
  },
  tea: {
    description: 'aromatic leaves brewed for a calming or invigorating drink.',
    conditions: params => params.climate.some(c => ['temperate', 'subtropical'].includes(c))
  },
  tin: {
    description: 'a soft metal used to create bronze and to coat other metals for protection.',
    conditions: params => params.topography.some(t => ['mountains', 'hills'].includes(t))
  },
  tourism: {
    description: 'accommodations and entertainment for travelers visiting exotic locales.',
    conditions: params => params.development >= 3.1
  },
  'war armaments': {
    description: 'the finest weapons and armor used in combat.',
    conditions: params => params.development >= 3.1
  },
  wine: {
    description: 'fermented grape beverage, ranging from common table varieties to rare vintages.',
    conditions: params => params.climate.some(c => ['temperate', 'subtropical'].includes(c))
  },
  wool: {
    description: 'insulating animal fiber used for garments, blankets, and tapestries.',
    conditions: params =>
      params.climate.some(c => ['temperate', 'boreal'].includes(c)) ||
      params.vegetation.includes('grasslands')
  },
  'whale products': {
    description: 'materials from whales, like oil or baleen.',
    conditions: params =>
      params.topography.includes('coastal') &&
      params.climate.some(c => ['arctic', 'subarctic', 'boreal'].includes(c))
  }
}

export const TRADE_GOODS = {
  exports: () => {
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
      const development = nation.development
      const slaves = nation.policies.slavery === 'slave trade'
      const prospects = goods
        .map(good => {
          const { conditions } = tradeGoods[good]
          if (!used[good]) used[good] = 0
          const occurrence = used[good]
          const w =
            conditions?.({ vegetation, climate, topography, development, slaves }) ?? true
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
          .map(n => (n.exports ?? []).concat(n.imports ?? []))
          .flat()
          .filter(
            good =>
              good !== 'tourism' &&
              good !== 'medical services' &&
              good !== 'academic research' &&
              good !== 'fishing' &&
              good !== 'daemonic curios' &&
              good !== 'deep-sea harvests' &&
              !nation.exports.includes(good) &&
              (['slave trade'].includes(nation.policies.slavery) || good !== 'slaves')
          )
      )
      nation.imports = window.dice.sample(n, 3)
    }
    return nation.imports
  }
}
