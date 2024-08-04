import { CLIMATE } from '../../cells/climate'
import { TRAIT } from '../../utilities/traits'
import { REGION } from '..'
import { PROVINCE } from '../provinces'
import { HUB } from '../sites/hubs'
import { Region } from '../types'
import { TradeGoods } from './types'

const mining = ['coal', 'iron', 'copper', 'gold', 'silver', 'gems', 'jade']

const tradeGoods: TradeGoods = {
  'academic research': {
    text: 'experimental theories and designs from scholarly studies',
    constraints: { urban: true }
  },
  'alchemical herbs': {
    text: 'plants known for their healing or poisonous properties',
    constraints: { desert: false, plains: false }
  },
  'arcane reagents': {
    text: 'metals, crystals, and essences used for rituals and spells',
    constraints: { urban: true }
  },
  amber: {
    text: 'fossilized tree resin often used in jewelry for its warm luster',
    constraints: { desert: false, plains: false }
  },
  'beer & ale': {
    text: 'intoxicating drinks, popular in many cultures',
    constraints: { desert: false, tropical: false }
  },
  'beans & legumes': {
    text: 'protein-rich plant seeds, diverse and nutritious',
    constraints: { desert: false, arctic: false }
  },
  ceramics: {
    text: 'fired clay objects, from pottery to art',
    constraints: { forest: false, urban: true }
  },
  cheese: {
    text: 'fermented milk product, with many varieties',
    constraints: { plains: true }
  },
  'citrus fruits': {
    text: 'tangy fruits, like oranges and lemons',
    constraints: { forest: true, tropical: true }
  },
  clay: {
    text: 'natural earth material used in pottery, bricks, and construction',
    constraints: { arctic: false }
  },
  cloth: {
    text: 'high quality woven fabric, used for clothing and various textiles',
    constraints: { urban: true }
  },
  coal: {
    text: 'black rock, burned for heating and industry',
    constraints: { mountains: true },
    conflicts: mining
  },
  cocoa: {
    text: 'beans for making chocolate, a luxurious treat',
    constraints: { forest: true, tropical: true }
  },
  coffee: {
    text: 'beans ground to brew a stimulating drink',
    constraints: { forest: true, tropical: true }
  },
  copper: {
    text: 'malleable red-brown metal, for tools and ornaments',
    constraints: { mountains: true },
    conflicts: mining
  },
  cotton: {
    text: 'soft fiber, spun for light, breathable textiles',
    constraints: { desert: false, arctic: false }
  },
  dates: {
    text: 'edible sweet fruits, grown in tropical regions',
    constraints: { desert: true, tropical: true }
  },
  'distilled spirits': {
    text: 'refined forms of alcohol, often aged',
    constraints: { desert: false }
  },
  dyes: {
    text: 'substances for coloring fabrics and other materials',
    constraints: { forest: true, urban: true, arctic: false }
  },
  enchantments: {
    text: 'magical items and elixirs that temporarily augment the user',
    constraints: { urban: true }
  },
  'exotic creatures': {
    text: 'rare animals used for display, research, or as pets',
    constraints: { forest: true, tropical: true }
  },
  fish: {
    text: 'aquatic creatures, harvested for food; fresh or preserved',
    constraints: { coastal: true }
  },
  flowers: {
    text: 'blooms used for decoration, perfumes, and symbolic purposes',
    constraints: { desert: false, arctic: false }
  },
  fur: {
    text: 'animal pelts, used for warm clothing and luxury garments',
    constraints: { desert: false, tropical: false }
  },
  gems: {
    text: 'precious stones finely cut and polished for jewelry or decoration',
    constraints: { mountains: true },
    conflicts: mining
  },
  glass: {
    text: 'transparent material, for windows and vessels',
    constraints: { forest: false, urban: true }
  },
  gold: {
    text: 'precious yellow metal, for coinage and jewelry',
    constraints: { mountains: true },
    conflicts: mining
  },
  grain: {
    text: 'cereal crops, a staple for food and making bread',
    constraints: { desert: false }
  },
  'honey & wax': {
    text: 'bee products, for sweetening and candles',
    constraints: { desert: false }
  },
  horses: {
    text: 'valuable for transportation, agriculture, and warfare',
    constraints: { plains: true, human: true }
  },
  incense: {
    text: 'aromatic resins, burned for fragrance or ritual',
    constraints: { plains: false }
  },
  iron: {
    text: 'strong metal, essential for weapons and tools',
    constraints: { mountains: true },
    conflicts: mining
  },
  ivory: {
    text: 'hard white material from tusks, for art and luxury items',
    constraints: { desert: false, tropical: true }
  },
  jade: {
    text: 'green ornamental mineral, often carved',
    constraints: { mountains: true, arctic: false, desert: false },
    conflicts: mining
  },
  'jams & preserves': {
    text: 'sweetened fruit preparations, long-lasting',
    constraints: { desert: false }
  },
  jewelry: {
    text: 'ornamental pieces often made from precious metals and stones',
    constraints: { urban: true }
  },
  lead: {
    text: 'heavy, malleable metal, used in construction, pipes, and ammunition',
    constraints: { mountains: true }
  },
  leatherworking: {
    text: 'crafted leather goods such as clothing, saddlery, and accessories',
    constraints: { urban: true }
  },
  livestock: {
    text: 'domesticated animals, for meat, labor, or products',
    constraints: { forest: false }
  },
  logging: {
    text: 'harvested wood used for construction, furniture, and fuel',
    constraints: { forest: true }
  },
  'marble & stone': {
    text: 'quarried for construction and artistic endeavors',
    constraints: { forest: false }
  },
  'olive oil': {
    text: 'a rich oil commonly used in cooking and lamps',
    constraints: { coastal: true, desert: false, arctic: false, tropical: false }
  },
  'oysters & clams': {
    text: 'shellfish valued for their meat and pearls',
    constraints: { coastal: true }
  },
  paper: {
    text: 'thin material, for writing and recording information',
    constraints: { urban: true, forest: true }
  },
  perfumes: {
    text: 'fragrant liquids, for personal and ritual use',
    constraints: { urban: true, desert: false }
  },
  'opiates & drugs': {
    text: 'narcotic resins, used for pain relief and recreation',
    constraints: { urban: true, desert: false }
  },
  'rugs & carpets': {
    text: 'woven or knotted textiles, for decor and function',
    constraints: { plains: true }
  },
  salt: {
    text: 'essential mineral, for food preservation and seasoning',
    constraints: { desert: true }
  },
  saltpeter: {
    text: 'essential for making gunpowder, used in warfare and mining',
    constraints: { desert: true }
  },
  sand: {
    text: 'granular material, essential for glassmaking, construction, and metal casting',
    constraints: { desert: true }
  },
  shipyards: {
    text: 'high quality maritime vessel construction, repair, and supplies',
    constraints: { urban: true, coastal: true, forest: true }
  },
  silk: {
    text: 'delicate fiber from silkworms, for luxurious textiles',
    constraints: { desert: false, arctic: false, urban: true }
  },
  silver: {
    text: 'lustrous white metal, for coins and fine goods',
    constraints: { mountains: true },
    conflicts: mining
  },
  slaves: {
    text: 'unfree people, traded and exploited for labor',
    constraints: { coastal: true, tropical: true }
  },
  spices: {
    text: 'aromatic substances, for flavoring food and medicine',
    constraints: { forest: true, arctic: false }
  },
  sugar: {
    text: 'sweet crystalline substance, for food and confectionery',
    constraints: { forest: true, tropical: true }
  },
  tea: {
    text: 'dried leaves, steeped to make a popular drink',
    constraints: { desert: false, arctic: false }
  },
  tin: {
    text: 'soft, pliable metal, used in alloys like bronze, and for coating',
    constraints: { mountains: true }
  },
  tobacco: {
    text: 'dried leaves, smoked or chewed for leisure',
    constraints: { desert: false, tropical: true }
  },
  'war armaments': {
    text: 'the finest weapons and armor used in combat',
    constraints: { urban: true }
  },
  'whale products': {
    text: 'materials from whales, like oil or baleen',
    constraints: { coastal: true, arctic: true }
  },
  'wild game': {
    text: 'animals hunted for their meat, hides, and other valuable parts',
    constraints: { desert: false, urban: false }
  },
  wine: {
    text: 'fermented grape drink, prized for taste and ritual',
    constraints: { desert: false, arctic: false }
  },
  wool: {
    text: 'warm fibers from mammals, spun into yarn for garments',
    constraints: { forest: false, tropical: false }
  },
  vegetables: {
    text: 'edible plants, grown for food and decorative purposes',
    constraints: { forest: true, arctic: false }
  }
}

export const TRADE_GOODS = {
  reference: tradeGoods,
  spawn: (nation: Region) => {
    const provinces = REGION.provinces(nation)
    const culture = window.world.cultures[nation.culture]
    const coastal = provinces.some(province => province.capital && province.ocean > 0)
    const mountains = provinces.some(province => province.mountains > 0)
    const desert = provinces.some(
      province =>
        PROVINCE.climate(province).terrain === 'desert' ||
        PROVINCE.climate(province).terrain === 'glacier'
    )
    const forest = provinces.some(province => PROVINCE.climate(province).terrain === 'forest')
    const plains = provinces.some(
      province =>
        PROVINCE.climate(province).terrain === 'plains' ||
        PROVINCE.climate(province).terrain === 'tundra'
    )
    const tropical = provinces.some(
      province => CLIMATE.zone[PROVINCE.climate(province).latitude] === 'tropical'
    )
    const arctic = provinces.some(
      province => CLIMATE.zone[PROVINCE.climate(province).latitude] === 'arctic'
    )
    const urban = provinces.some(province => HUB.isCity(PROVINCE.hub(province)))
    const human = culture.species === 'human'
    nation.trade = TRAIT.selection({
      available: tradeGoods,
      current: [],
      used: window.world.provinces.map(p => p.trade ?? []).flat(),
      constraints: { coastal, mountains, desert, forest, plains, tropical, arctic, urban, human },
      samples: 3,
      usagePenalty: (used: number) => 1 / (used * 10 || 1)
    }).map(good => good)
  }
}
