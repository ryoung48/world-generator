import { cssColors } from '../../../components/theme/colors'
import { CLIMATE } from '../../cells/climate'
import { Climate } from '../../cells/climate/types'
import { PROVINCE } from '../../regions/provinces'
import { REGION } from '../../regions'
import { Region } from '../../regions/types'
import { COLOR } from '../../utilities/color'
import { MATH } from '../../utilities/math'
import { TEXT } from '../../utilities/text'
import { TRAIT } from '../../utilities/traits'
import { LANGUAGE } from '../languages'
import { SPECIES } from '../species'
import {
  Culture,
  CultureSortParams,
  CultureTraditionsBad,
  CultureTraditionsGood,
  CultureValues
} from './types'

const values: CultureValues = {
  adaptation: { text: 'embracing foreign customs and traditions', conflicts: ['purity'] },
  aesthetic: { text: 'beauty in material goods and architecture', conflicts: ['function'] },
  ancestry: { text: 'bloodline and family heritage' },
  arcana: { text: 'magical prowess and occult ability' },
  austerity: {
    text: 'ascetic unworldliness and pious poverty',
    conflicts: ['decadence', 'wealth']
  },
  bravery: { text: 'courage and valiance in danger' },
  charity: { text: 'sharing wealth and goods with others' },
  cultivation: { text: 'agriculture, gardens, and mastery over plants' },
  decadence: { text: 'personal indulgence and luxuriant pleasure', conflicts: ['austerity'] },
  diplomacy: { text: 'pacifism and peaceful resolution of problems', conflicts: ['might'] },
  etiquette: { text: 'eloquence and social expertise' },
  exploration: { text: 'exploring the unknown and discovering secrets' },
  forethought: { text: 'planning and anticipating future events and consequences' },
  forgiveness: { text: 'showing mercy to enemies', conflicts: ['vengeance'] },
  freedom: { text: 'individual rights and localized rule', conflicts: ['hierarchy'] },
  function: { text: 'building things in service of their posterity', conflicts: ['aesthetic'] },
  hierarchy: { text: 'social stratification and class distinctions', conflicts: ['freedom'] },
  history: { text: 'remembrance of the past and memorializing history' },
  honor: { text: 'honesty and truthfulness in speech and action', conflicts: ['subterfuge'] },
  hospitality: { text: 'generosity and welcoming of strangers' },
  humility: { text: 'self-effacement and modesty' },
  industry: { text: "hard work and diligence in one's profession" },
  intellect: { text: 'education and knowledge-seeking' },
  imperialism: { text: "spreading one's culture and religion" },
  justice: { text: 'fairness and impartiality in decision-making' },
  logic: { text: 'humanistic reason and "rational" religion' },
  loyalty: { text: 'faithfulness towards friends and figures of authority' },
  lust: { text: 'seductive charm and sexual license' },
  might: { text: 'aggression, raw strength, and martial prowess', conflicts: ['diplomacy'] },
  nature: { text: 'harmony with nature and existing life' },
  legalism: { text: 'strict adherence to the law and order' },
  philosophy: { text: 'abstract thought and contemplation' },
  purity: { text: 'ethnic purity of blood and culture', conflicts: ['adaptation'] },
  revanchism: { text: 'restoring some real or imagined glorious past' },
  sacrifice: { text: "personal sacrifice for one's causes or purposes" },
  stewardship: { text: 'guardianship of their own land and holy sites' },
  stoicism: { text: 'patience and restraint in the face of adversity' },
  subterfuge: { text: 'subtlety and indirectness of action' },
  tenacity: { text: 'persevering and surviving against all odds' },
  vengeance: { text: 'execution of just vendettas', conflicts: ['forgiveness'] },
  wealth: { text: 'prosperity and accruing material wealth', conflicts: ['austerity'] },
  zeal: { text: 'piety and devotion to religious ideals' }
}

const terrainTraits = [
  'seafarers',
  'hill folk',
  'forest folk',
  'plains dwellers',
  'desert dwellers',
  'marsh folk',
  'mountain folk'
]

const goodTraditions: CultureTraditionsGood = {
  'ancestral altars': {
    text: 'dedicated spaces in homes for ancestor worship, keeping family ties strong'
  },
  'artisan enclaves': {
    constraints: { tribal: false },
    text: 'communities dedicated to perfecting and teaching their crafts'
  },
  'astronomical insights': {
    text: 'deep understanding of celestial bodies guiding agricultural and ritual practices'
  },
  'berserker rituals': {
    constraints: { tribal: true },
    text: 'warrior ceremonies invoking animal spirits for enhanced battle prowess'
  },
  'beast lords': {
    constraints: { tribal: true },
    text: 'these people are known for their ability to tame and train fearsome beasts, using them as weapons and transportation'
  },
  'bone accessories': {
    constraints: { tribal: true },
    text: 'necklaces or bracelets made of animal bones, believed to provide strength'
  },
  'burning regrets': {
    constraints: { tribal: false },
    text: 'writing down regrets on paper and burning them in a communal fire for catharsis'
  },
  'clan loyalty': {
    text: "strong group identity and obligations to one's extended clan or ethnic group"
  },
  'communal dining': {
    text: 'collective meals strengthening community bonds and sharing resources'
  },
  'culinary artistry': {
    text: 'cooking is considered a high art, leading to innovative and exquisite dishes that reflect their rich heritage and culinary traditions'
  },
  'desert dwellers': {
    conflicts: terrainTraits,
    constraints: { tribal: true, desert: true },
    text: 'nomads of harsh deserts, adapting to extreme conditions; excel in stealth and endurance in desert warfare'
  },
  'draped turbans': {
    constraints: { wet: false },
    text: 'head wraps varying in style and size based on region or social standing'
  },
  'family collectives': {
    text: 'extended families living together and pooling resources'
  },
  'forest folk': {
    conflicts: terrainTraits,
    constraints: { wet: true, tribal: true },
    text: 'dwellers in dense woodlands, using the forest for shelter and resources; skilled archers and guerilla tacticians'
  },
  'funerary rites': {
    text: 'elaborate rituals for the dead, including burial practices, mourning periods, and commemorative ceremonies'
  },
  'frequent festivals': {
    text: 'a variety of festivals are celebrated throughout the year, marked by colorful traditions and raucous celebrations'
  },
  'gift giving': {
    text: 'elaborate gift giving ceremonies as a way of cementing social bonds, showing respect, or marking important occasions'
  },
  'grand architecture': {
    constraints: { tribal: false },
    text: 'a people known to boast some of the most impressive and intricate buildings and monuments in the world'
  },
  'hill folk': {
    conflicts: terrainTraits,
    constraints: { tribal: true },
    text: 'masters of hill terrain, cultivating it for agriculture and defense; use elevation for strategic advantages in conflicts'
  },
  'hushed courtship': {
    text: 'a tradition where couples communicate their affections secretly, using coded messages or tokens'
  },
  'intricate metalwork': {
    constraints: { tribal: false },
    text: 'detailed designs on weapons, armor, or jewelry, sometimes inlaid with precious gems'
  },
  'marsh folk': {
    conflicts: terrainTraits,
    constraints: { tribal: true, wet: true },
    text: 'navigators of waterways, excelling in fishing; employ marshes for ambush tactics and hidden retreats in warfare'
  },
  'martial tournament': {
    text: 'a festival where warriors or knights demonstrate their prowess in combat, jousting, or archery competitions'
  },
  'masquerade balls': {
    constraints: { tribal: false },
    text: 'an event where participants wear masks and costumes, hiding their identities and partaking in mystery and romance'
  },
  'minstrel performances': {
    text: 'traveling musicians and poets entertaining towns with songs and tales'
  },
  'moonlit serenades': {
    text: 'romantic tradition of lovers serenading under the moonlight, playing instruments or singing'
  },
  'mountain folk': {
    conflicts: terrainTraits,
    constraints: { mountains: true },
    text: 'residents of high altitudes, specializing in mining and herding; they make use of fortified mountain passes against invasions'
  },
  'oral storytelling': {
    text: 'elders passing down tales, wisdom, and history, preserving cultural memory'
  },
  'plains dwellers': {
    conflicts: terrainTraits,
    constraints: { tribal: true, plains: true },
    text: 'agriculturists and horse breeders on vast plains; cavalry experts in war'
  },
  'poetic gatherings': {
    text: 'evenings dedicated to reciting and appreciating classical poetry'
  },
  'ritual scarification': {
    constraints: { tribal: true },
    text: 'ritual scarification is used to mark important life events and demonstrate their devotion to a cause; the scars are often elaborate and intricate'
  },
  'ritualistic body paint': {
    constraints: { tribal: true },
    text: 'intricate temporary art applied to the skin for ceremonies or milestones'
  },
  'sacred hunts': {
    constraints: { tribal: true },
    text: 'ritualistic hunting expeditions with deep spiritual significance'
  },
  'sand drawings': {
    constraints: { wet: false },
    text: 'intricate artworks created with sand or powder, depicting tales, histories, and moral lessons'
  },
  'scholar gardens': {
    constraints: { tribal: false },
    text: 'creating tranquil spaces for reflection and intellectual pursuit'
  },
  seafarers: {
    conflicts: terrainTraits,
    constraints: { coastal: true, wet: true },
    text: 'navigators of vast oceans, engaging in trade and exploration; adept at naval warfare and amphibious strategies'
  },
  'shell decorations': {
    constraints: { coastal: true, tribal: true },
    text: 'incorporated into clothing or jewelry, symbolizing sea connections'
  },
  'songbird cultivation': {
    constraints: { wet: true },
    text: 'the care, training, and showcasing of songbirds, valuing their aesthetic and musical qualities'
  },
  'tattoo traditions': {
    text: 'permanent designs inked on the body, indicating status, achievements, or affiliations'
  },
  'tea ceremonies': {
    constraints: { tribal: false },
    text: 'intricate rituals celebrating the art of tea preparation'
  },
  'wandering wisdom': {
    text: 'elders traveling between communities to share knowledge and resolve disputes'
  },
  'warrior braids': {
    text: 'complex hair braiding signifying martial achievements or clan allegiance'
  },
  'warrior code': {
    text: 'abiding by honorable principles in battle and life'
  },
  'vegetative sculpting': {
    constraints: { wet: true },
    text: 'growing plants into living structures for habitation and ceremony'
  }
}
const badTraditions: CultureTraditionsBad = {
  'banned arts': {
    constraints: { tribal: false },
    text: 'suppression of certain art forms deemed untraditional or subversive'
  },
  'binding beauty': {
    text: 'tight binding of feet for aesthetic ideals, despite pain and deformity'
  },
  'blood feuds': {
    text: 'long-standing animosities between clans or tribes, leading to continuous cycles of violence'
  },
  'blood oaths': {
    text: 'dangerous loyalty pacts, sometimes involving mutual blood-drinking'
  },
  'burial sacrifices': {
    text: 'occasionally sacrificing servants, horses, or valuables to accompany deceased nobility'
  },
  'cannibalistic rituals': {
    text: 'consuming human flesh in rituals, believed to transfer the strength or virtues of the consumed'
  },
  'child marriages': {
    text: 'early unions due to social norms, often disregarding child welfare'
  },
  'class-based attire': {
    constraints: { tribal: false },
    text: 'strict clothing codes signifying class and status, restricting social mobility'
  },
  'concubinage system': {
    text: 'a hierarchy where women are kept as secondary partners without the full rights of wives'
  },
  'criminal branding': {
    text: 'marking lawbreakers or lower classes with distinctive tattoos or brands, stigmatizing them for life'
  },
  'isolationist regime': {
    text: 'embracing policies that limit external influence, cutting off international trade and diplomacy'
  },
  'cursed castes': {
    text: 'a system designating certain individuals as outcasts, stigmatized and discriminated against'
  },
  'debt slavery': {
    text: 'a system where people are forced into labor to repay debts, often in exploitative conditions'
  },
  'funeral immolation': {
    text: "pressuring widows to self-immolate on their husband's pyre"
  },
  'harrowing hunts': {
    text: 'pursuing and hunting a human as a rite of passage or punishment'
  },
  'hereditary professions': {
    text: 'trades or crafts limited by birth, restricting social mobility and innovation'
  },
  'hierarchy rituals': {
    constraints: { tribal: false },
    text: 'rigorous ceremonial bowing to superiors, enforcing strict hierarchical acknowledgment'
  },
  'honorable death': {
    text: 'ritualized suicide for atoning failures or preserving honor, often enforced'
  },
  'hostage system': {
    text: 'higher-class children held as political collateral, ensuring loyalty'
  },
  'incestuous inbreeding': {
    text: 'marriages between close relatives to maintain the purity of sacred bloodlines, leading to genetic disorders and deformities'
  },
  matriarchal: {
    text: 'a female dominated society, where men have extremely limited rights and privileges'
  },
  'necromantic cult': {
    text: 'necromancy is a flourishing tradition, with countless undead thralls serving as solder and laborers'
  },
  patriarchal: {
    text: 'a male dominated society, where women have extremely limited rights and privileges'
  },
  'pillage rites': {
    constraints: { tribal: true },
    text: 'ceremonial looting of conquered lands as symbols of dominance'
  },
  'plundering raids': {
    constraints: { tribal: true },
    text: 'tribes attacking settlements or other tribes for loot and dominance'
  },
  'polygamous marriages': {
    text: 'marriages with multiple partners, sanctioned by tradition or religion; often leading to jealousy and conflict'
  },
  'rigid matchmaking': {
    text: 'marriage seen as family unions, sometimes sacrificing individual happiness for status'
  },
  'ritual dueling': {
    text: 'disputes often settled through formalized duels and trials by combat'
  },
  'royal seclusion': {
    constraints: { tribal: false },
    text: 'isolating the royalty, leading to disconnection and misunderstanding between rulers and subjects'
  },
  'sacrifice of wealth': {
    text: 'periodically, valuable items are thrown into deep lakes or buried as offerings to unseen forces'
  },
  scalping: {
    constraints: { tribal: true },
    text: 'removing the scalp of enemies as war trophies; often a ritualistic practice'
  },
  serfdom: {
    constraints: { tribal: false },
    text: 'a system binding peasants to land, restricting their freedoms and subjugating them to lords'
  },
  'shunned twins': {
    text: 'beliefs that twins harbored bad luck, leading to social exclusion'
  },
  'slave trade': {
    text: 'capturing and selling individuals as property, leading to immense suffering and societal rifts'
  },
  'toxic adornments': {
    text: 'use of hazardous and cursed materials in jewelry and clothing for status and power'
  },
  'veil of vice': {
    text: "forcing certain minority groups to wear identifying garments, marking them as 'other'"
  },
  'volatile elixirs': {
    text: 'crafting of powerful but often unstable concoctions for various uses'
  },
  'wandering exiles': {
    text: 'banishment practices for minor offenses, often unjust'
  },
  'witch trials': {
    text: 'deep distrust of the arcane arts; sorcerers are often persecuted and executed'
  }
}

const distantClimates: Climate['latitude'][] = ['tropical', 'subpolar', 'polar']

export const CULTURE = {
  terrain: (culture: Culture) => {
    const environment = MATH.counter(
      CULTURE.regions(culture)
        .map(REGION.provinces)
        .flat()
        .map(province => {
          return province.cells.land.map(i => {
            const cell = window.world.cells[i]
            const { terrain } = CLIMATE.holdridge[cell.climate]
            return cell.isMountains
              ? 'mountains'
              : terrain === 'tundra'
              ? 'plains'
              : terrain === 'glacier'
              ? 'desert'
              : terrain
          })
        })
        .flat()
    )
    return Object.entries(environment).sort((a, b) => b[1] - a[1])[0][0] as
      | 'mountains'
      | 'forest'
      | 'plains'
      | 'desert'
  },
  civilized: (culture: Culture) => window.world.regions[culture.origin].civilized,
  climate: (culture: Culture) => {
    const origin = window.world.regions[culture.origin]
    const capital = REGION.capital(origin)
    const cell = PROVINCE.cell(capital)
    return {
      simple: cell.isMountains ? 'mountains' : CLIMATE.holdridge[cell.climate].latitude,
      latitude: CLIMATE.holdridge[cell.climate].latitude
    }
  },
  coastal: (culture: Culture) => CULTURE.regions(culture).some(r => r.coastal),
  culturize: (culture: Culture, nation: Region) => {
    // generate a regional name
    nation.name = LANGUAGE.word.unique({ lang: culture.language, key: 'region' })
    // generate settlement names
    REGION.provinces(nation).forEach(province => {
      const hub = PROVINCE.hub(province)
      hub.name ||= LANGUAGE.word.unique({ lang: culture.language, key: 'settlement' })
    })
  },
  describe: (culture: Culture) => {
    const { skin } = culture.appearance
    const species = SPECIES.lookup[culture.species]
    const content = [
      {
        label: 'appearance',
        text: `${TEXT.formatters.list(skin.colors, 'or')} ${species.traits.skin} ${
          skin.texture ? ` (${skin.texture})` : ''
        }`
      },
      { label: 'fashion', text: culture.fashion.scheme },
      {
        label: 'values',
        text: culture.values
          .map(value =>
            TEXT.decorate({ label: value, tooltip: CULTURE.values[value].text.toString() })
          )
          .join(', ')
      },
      {
        label: 'traditions',
        text: `${TEXT.decorate({
          label: culture.traditions.good,
          tooltip: CULTURE.traditions.good[culture.traditions.good].text.toString(),
          color: cssColors.subtitle
        })}, ${TEXT.decorate({
          label: culture.traditions.bad,
          tooltip: CULTURE.traditions.bad[culture.traditions.bad].text.toString(),
          color: cssColors.subtitle
        })}`
      }
    ]
    return {
      title: culture.name,
      subtitle: `(${culture.idx}) ${culture.species} (${CULTURE.climate(culture).simple})`,
      content
    }
  },
  tribal: (culture: Culture) => {
    const regions = CULTURE.regions(culture)
    const distant = regions.reduce((sum, r) => {
      const capital = REGION.capital(r)
      const biome = PROVINCE.climate(capital)
      const cell = PROVINCE.cell(capital)
      const isRemote = distantClimates.includes(biome.latitude)
      return sum + (isRemote || cell.isMountains ? 1 : 0)
    }, 0)
    return distant / regions.length > 0.5
  },
  expand: (culture: Culture, nation: Region) => {
    // increment region count
    culture.regions.push(nation.idx)
    // set the native species for the region
    nation.culture = culture.idx
  },
  finalize: (culture: Culture) => {
    culture.fashion.scheme = window.dice.choice([
      'symbols of the dominant faith',
      'family heraldry or clan sigils',
      'important plants or local flora',
      'magically-meaningful runes',
      'decorative script or writing',
      'geometric shapes or patterns',
      'dull, natural, earthen colors',
      'intensely bright, clashing colors',
      'reds, oranges, and warm hues',
      'bright but complementary colors',
      'intricate weaves of colors',
      'blues, greens, and cool hues',
      'subdued pastels and soft shades'
    ])
    const coastal = CULTURE.coastal(culture)
    const origin = window.world.regions[culture.origin]
    const terrain = CULTURE.terrain(culture)
    const climate = CULTURE.climate(culture)
    const zone = CLIMATE.zone[climate.latitude]
    const seasonal = zone !== 'tropical'
    const wet = terrain === 'forest'
    const desert = terrain === 'desert'
    const plains = terrain === 'plains'
    const mountains = terrain === 'mountains'
    const tribal = !origin.civilized
    culture.values = TRAIT.selection({
      available: CULTURE.values,
      used: window.world.cultures.map(c => c.values).flat(),
      current: culture.values,
      constraints: { coastal },
      samples: 3
    })
    culture.traditions = {
      good: TRAIT.selection({
        current: [],
        available: CULTURE.traditions.good,
        used: window.world.cultures.map(c => c.traditions?.good).filter(d => d),
        constraints: { coastal, wet, seasonal, tribal, desert, plains, mountains }
      })[0],
      bad: TRAIT.selection({
        current: [],
        available: CULTURE.traditions.bad,
        used: window.world.cultures.map(c => c.traditions?.bad).filter(f => f),
        constraints: { tribal }
      })[0]
    }
  },
  regions: (culture: Culture) => culture.regions.map(r => window.world.regions[r]),
  score: (culture: Culture) =>
    CULTURE.regions(culture)
      .map(region => REGION.capital(region))
      .map(
        capital =>
          CLIMATE.holdridge[PROVINCE.cell(capital).climate].habitability *
          (PROVINCE.coastal(capital) ? 1 : 0.5)
      )
      .reduce((sum, pop) => sum + pop, 0) / culture.regions.length,
  setSpecies: (culture: Culture, species: Culture['species']) => {
    culture.species = species
    culture.language = LANGUAGE.spawn(culture)
    culture.name = LANGUAGE.word.unique({ lang: culture.language, key: 'culture' })
    SPECIES.appearance(culture)
  },
  sort: ({ group, ref, type }: CultureSortParams) => {
    const regions = group.map(culture => window.world.regions[culture.origin])
    return REGION.sort({ group: regions, ref: window.world.regions[ref.origin], type }).map(
      region => window.world.cultures[region.culture]
    )
  },
  spawn: (region: Region) => {
    const idx = window.world.cultures.length
    const hue = window.dice.choice([...COLOR.hues])
    const culture: Culture = {
      idx,
      origin: region.idx,
      neighbors: [],
      fashion: { color: hue },
      display: COLOR.randomHue(hue),
      regions: [],
      name: '',
      species: 'human',
      lineage: window.dice.random > 0.1 ? 'male' : 'female',
      values: []
    }
    window.world.cultures.push(culture)
    return culture
  },
  traditions: { good: goodTraditions, bad: badTraditions },
  values
}
