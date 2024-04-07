import { REGION } from '../../regions'
import { PROVINCE } from '../../regions/provinces'
import { COLOR } from '../../utilities/color'
import { TEXT } from '../../utilities/text'
import { TRAIT } from '../../utilities/traits'
import { LANGUAGE } from '../languages'
import { SPECIES } from '../species'
import {
  Culture,
  CultureSortParams,
  CultureSpawnParams,
  CultureTraditions,
  CultureValues
} from './types'

const values: CultureValues = {
  adaptation: {
    conflicts: ['purity', 'tradition'],
    text: 'embracing foreign customs and traditions'
  },
  aesthetic: { text: 'beauty in material goods and architecture' },
  ambition: { text: 'conquest and domination of others', conflicts: ['diplomacy'] },
  ancestry: { text: 'bloodline and family heritage' },
  arcana: { text: 'magical prowess and occult ability' },
  austerity: {
    conflicts: ['decadence', 'wealth'],
    text: 'ascetic unworldliness and pious poverty'
  },
  beasts: { text: 'the ability to train and work alongside beasts' },
  bravery: { text: 'courage and valiance in danger' },
  charity: { text: 'sharing wealth and goods with others' },
  cultivation: { text: 'agriculture, gardens, and mastery over plants' },
  decadence: { conflicts: ['austerity'], text: 'personal indulgence and luxuriant pleasure' },
  diplomacy: {
    conflicts: ['might', 'ambition'],
    text: 'pacifism and peaceful resolution of problems'
  },
  etiquette: { text: 'eloquence, courtesy, and social expertise' },
  exploration: { text: 'exploring the unknown and discovering secrets' },
  forethought: { text: 'planning and anticipating future events and consequences' },
  forgiveness: { conflicts: ['vengeance'], text: 'showing mercy to enemies' },
  guile: { conflicts: ['honor'], text: 'cunning and the ability to trick others' },
  hierarchy: { conflicts: ['independence'], text: 'social stratification and class distinctions' },
  history: { text: 'remembrance of the past and memorializing history' },
  honor: {
    conflicts: ['guile', 'intrigue'],
    text: 'honesty and truthfulness in speech and action'
  },
  hospitality: { text: 'generosity and welcoming of strangers' },
  humility: { text: 'self-effacement and modesty' },
  imperialism: { text: "spreading one's culture and religion" },
  industry: { conflicts: ['tradition'], text: 'ingenuity and technological advancement' },
  intellect: { text: 'education and knowledge-seeking' },
  intrigue: { conflicts: ['honor'], text: 'scheming subtly against enemies or rivals' },
  justice: { text: 'fairness and impartiality in decision-making' },
  legacy: { text: 'building things in service of their posterity' },
  legalism: { text: 'strict adherence to the law and order' },
  independence: { conflicts: ['hierarchy'], text: 'individual rights and freedom of action' },
  loyalty: { text: 'faithfulness towards friends and figures of authority' },
  lust: { text: 'seductive charm and sexual license' },
  might: { conflicts: ['diplomacy'], text: 'aggression, raw strength, and martial prowess' },
  nature: { text: 'harmony with nature and existing life' },
  perfection: { text: "excellence in one's profession or trade" },
  philosophy: { text: 'abstract thought and contemplation' },
  purification: { text: 'purging evil and expelling the wicked' },
  purity: { conflicts: ['adaptation'], text: 'ethnic purity of blood and culture' },
  revanchism: { text: 'restoring some real or imagined glorious past' },
  sacrifice: { text: "personal sacrifice for one's causes or purposes" },
  seafaring: { constraints: { coastal: true }, text: 'expertise in navigation and living at sea' },
  stewardship: { text: 'guardianship of their own land and holy sites' },
  stoicism: { text: 'patience and restraint in the face of adversity' },
  tenacity: { text: 'persevering and surviving against all odds' },
  tradition: { conflicts: ['adaptation', 'industry'], text: 'submission to the collective norms' },
  vengeance: { conflicts: ['forgiveness'], text: 'execution of just vendettas' },
  wealth: { conflicts: ['austerity'], text: 'prosperity and accruing material wealth' },
  zeal: { text: 'piety and devotion to religious ideals' }
}

const terrainTraits = [
  'agrarian',
  'caravaneers',
  'desert dwellers',
  'forest folk',
  'hill folk',
  'jungle folk',
  'marsh folk',
  'mountain folk',
  'plains dwellers',
  'seafarers'
]

const artisticTraits = [
  'bone accessories',
  'culinary artistry',
  'draped turbans',
  'grand architecture',
  'musical theorists',
  'refined poetry',
  'ritualistic body paint',
  'ritual scarification',
  'sand drawings',
  'scholar gardens',
  'songbird cultivation',
  'shell decorations',
  'tea ceremonies',
  'toxic adornments',
  'tattoo traditions',
  'warrior braids'
]

const martialTraits = [
  'artillery experts',
  'astute diplomats',
  'berserker rituals',
  'hit-and-run tactics',
  'heavy infantry',
  'metalworkers',
  'mercenary companies',
  'naval superiority',
  'pacifists',
  'plundering raids',
  'ritual dueling',
  'seasoned marksman',
  'slave soldiers',
  'slave traders',
  'warrior braids',
  'warrior code',
  'knightly tournaments'
]

const enslavementTraits = [
  'abolitionists',
  'court eunuchs',
  'serfdom',
  'slave soldiers',
  'slave trade'
]

const traditions: CultureTraditions = {
  'artillery experts': {
    conflicts: martialTraits,
    constraints: { tribal: false },
    text: 'they are known for their deployment of advanced siege weapons'
  },
  abolitionists: {
    conflicts: enslavementTraits,
    constraints: { tribal: false },
    text: 'they have declared slavery illegal and look upon all those who still permit this practice with disdain'
  },
  agrarian: {
    conflicts: terrainTraits,
    constraints: { wet: true, tribal: false },
    text: 'known for very productive farmlands and advanced agricultural practices'
  },
  'ancestral altars': {
    text: 'dedicated spaces in homes for ancestor worship, keeping family ties strong'
  },
  'arcane colleges': {
    text: 'home to a number of prestigious arcane colleges, where students study the magical arts under the tutelage of experienced mages'
  },
  'astronomical insights': {
    text: 'deep understanding of celestial bodies guiding agricultural and ritual practices'
  },
  'astute diplomats': {
    conflicts: martialTraits,
    constraints: { suzerain: true, warriors: false },
    text: 'known for building webs of complex alliances and resolving conflicts without violence'
  },
  'berserker rituals': {
    conflicts: martialTraits,
    constraints: { tribal: true },
    text: 'warrior ceremonies invoking animal spirits for enhanced battle prowess'
  },
  'beast lords': {
    constraints: { tribal: true },
    text: 'these people are known for their ability to tame and train fearsome beasts, using them as weapons and transportation'
  },
  'blood feuds': {
    text: 'long-standing animosities between clans or tribes, leading to continuous cycles of violence'
  },
  'bone accessories': {
    conflicts: artisticTraits,
    constraints: { tribal: true },
    text: 'necklaces or bracelets made of animal bones, believed to provide strength'
  },
  'burning regrets': {
    constraints: { tribal: false },
    text: 'writing down regrets on paper and burning them in a communal fire for catharsis'
  },
  'cannibalistic rituals': {
    text: 'consuming human flesh in rituals, believed to transfer the strength or virtues of the consumed'
  },
  caravaneers: {
    conflicts: terrainTraits,
    constraints: { desert: true },
    text: 'these people are experts at traversing harsh desert and are strongly associated with the caravan trade'
  },
  'clan loyalty': {
    text: "strong group identity and obligations to one's extended clan or ethnic group"
  },
  'class-based attire': {
    conflicts: ['hierarchy rituals'],
    constraints: { tribal: false },
    text: 'strict clothing codes signifying class and status, restricting social mobility'
  },
  'communal dining': {
    text: 'collective meals strengthening community bonds and sharing resources'
  },
  'criminal branding': {
    text: 'marking lawbreakers or lower classes with distinctive tattoos or brands, stigmatizing them for life'
  },
  'court eunuchs': {
    conflicts: enslavementTraits,
    constraints: { suzerain: true },
    text: 'they make great use of eunuchs as domestic servants, bureaucratic administrators, and even military officers'
  },
  'culinary artistry': {
    conflicts: artisticTraits,
    text: 'cooking is considered a high art, leading to innovative and exquisite dishes that reflect their rich heritage and culinary traditions'
  },
  'desert dwellers': {
    conflicts: terrainTraits,
    constraints: { tribal: true, desert: true },
    text: 'nomads of harsh deserts, adapting to extreme conditions; excel in stealth and endurance in desert warfare'
  },
  'draped turbans': {
    conflicts: artisticTraits,
    constraints: { wet: false },
    text: 'head wraps varying in style and size based on region or social standing'
  },
  'family collectives': { text: 'extended families living together and pooling resources' },
  'forest folk': {
    conflicts: terrainTraits,
    constraints: { wet: true, tribal: true, seasonal: true },
    text: 'dwellers in dense woodlands, using the forest for shelter and resources; skilled archers and guerilla tacticians'
  },
  'funerary rites': {
    text: 'elaborate rituals for the dead, including burial practices, mourning periods, and commemorative ceremonies'
  },
  'frequent festivals': {
    text: 'a variety of festivals are celebrated throughout the year, marked by colorful traditions and raucous celebrations'
  },
  'frontier strongholds': {
    text: 'their borders are lined with many forts and watchtowers to protect against invaders'
  },
  'gift giving': {
    text: 'elaborate gift giving ceremonies as a way of cementing social bonds, showing respect, or marking important occasions'
  },
  'grand architecture': {
    conflicts: artisticTraits,
    constraints: { tribal: false },
    text: 'a people known to boast some of the most impressive and intricate buildings and monuments in the world'
  },
  'heavy infantry': {
    conflicts: martialTraits,
    constraints: { wet: true },
    text: 'its formidable and disciplined heavy infantry are feared by all'
  },
  'hit-and-run tactics': {
    conflicts: martialTraits,
    text: 'they have mastered the use of lightly-armored units to hit the enemy hard, and then fall back'
  },
  'hereditary professions': {
    text: 'business are encouraged to develop along family lines, accumulating extensive skill for their trade across generations'
  },
  'hierarchy rituals': {
    conflicts: ['class-based attire'],
    text: 'rigorous ceremonial bowing to superiors, enforcing strict hierarchical acknowledgment'
  },
  'hill folk': {
    conflicts: terrainTraits,
    constraints: { tribal: true },
    text: 'masters of hill terrain, cultivating it for agriculture and defense; use elevation for strategic advantages in conflicts'
  },
  'hushed courtship': {
    text: 'a tradition where couples communicate their affections secretly, using coded messages or tokens'
  },
  isolationists: {
    text: 'embracing policies that limit external influence, cutting off international trade and diplomacy in hopes of greater domestic stability'
  },
  'jungle folk': {
    conflicts: terrainTraits,
    constraints: { wet: true, tribal: true, seasonal: false },
    text: 'residents of the jungle, using the forest for shelter and resources; skilled archers and guerilla tacticians'
  },
  'knightly tournaments': {
    conflicts: martialTraits,
    text: 'hosts grand tournaments, where knights from across the land compete in jousts and other martial contests'
  },
  'loyal subjects': {
    constraints: { suzerain: false },
    text: "serving one's liege and country is both noble and just - a duty and a privilege, rather than an avaricious arrangement"
  },
  matriarchal: {
    text: 'they have a matriarchal hierarchy, where the ruling class is overwhelmingly comprised of women'
  },
  'marsh folk': {
    conflicts: terrainTraits,
    constraints: { tribal: true, wet: true },
    text: 'navigators of waterways, excelling in fishing; employ marshes for ambush tactics and hidden retreats in warfare'
  },
  'mercenary companies': {
    conflicts: martialTraits,
    text: 'views mercenary work favorably and encourages warriors to seek glory as mercenaries in-between wars'
  },
  'meritocratic exams': {
    constraints: { tribal: false, suzerain: true },
    text: 'uses an merit-based examination system to identify the most able bureaucratic officials'
  },
  metalworkers: {
    conflicts: martialTraits,
    text: 'known for the production of durable and high quality weapons and armor'
  },
  'mountain folk': {
    conflicts: terrainTraits,
    constraints: { mountains: true },
    text: 'residents of high altitudes, specializing in mining and herding; they make use of fortified mountain passes against invasions'
  },
  'musical theorists': {
    conflicts: artisticTraits,
    text: 'musical ability is held in high regard; individuals often take up the noble and celebrated pursuit of musical study from a young age'
  },
  'naval superiority': {
    conflicts: martialTraits,
    text: 'maintains a powerful navy, dominating the seas and asserting its influence through maritime power'
  },
  'necromantic cult': {
    text: 'necromancy is a flourishing tradition, with countless undead thralls serving as solder and laborers'
  },
  pacifists: {
    conflicts: martialTraits,
    constraints: { warriors: false, suzerain: false },
    text: 'only by pursuing a path of non-violence can people truly live in peace'
  },
  'plains dwellers': {
    conflicts: terrainTraits,
    constraints: { tribal: true, plains: true },
    text: 'agriculturists and horse breeders on vast plains; cavalry experts in war'
  },
  'plundering raids': {
    conflicts: martialTraits,
    constraints: { tribal: true },
    text: 'they are known for attacking neighboring settlements or other tribes for loot and dominance'
  },
  'refined poetry': {
    conflicts: artisticTraits,
    text: 'poetry is considered a noble art and many spend their time piecing words together with meaning and thought'
  },
  'ritual dueling': {
    conflicts: martialTraits,
    text: 'disputes often settled through formalized duels and trials by combat'
  },
  'ritualistic body paint': {
    conflicts: artisticTraits,
    constraints: { tribal: true },
    text: 'intricate temporary art applied to the skin for ceremonies or milestones'
  },
  'ritual scarification': {
    conflicts: artisticTraits,
    constraints: { tribal: true },
    text: 'ritual scarification is used to mark important life events and demonstrate their devotion to a cause; the scars are often elaborate and intricate'
  },
  'ruling caste': {
    constraints: { suzerain: true },
    text: 'they have experience ruling over foreign subjects and know how to effectively suppress revolts'
  },
  'sand drawings': {
    conflicts: artisticTraits,
    constraints: { wet: false },
    text: 'intricate artworks created with sand or powder, depicting tales, histories, and moral lessons'
  },
  'scholar gardens': {
    conflicts: artisticTraits,
    constraints: { tribal: false },
    text: 'known for creating tranquil spaces for reflection and intellectual pursuit'
  },
  seafarers: {
    conflicts: terrainTraits,
    constraints: { coastal: true, wet: true },
    text: 'navigators of vast oceans, engaging in trade and exploration; adept at naval warfare and amphibious strategies'
  },
  'seasoned marksman': {
    conflicts: martialTraits,
    text: 'they excel at using ranged weaponry to keep enemies at bay'
  },
  'secret police': {
    constraints: { suzerain: true, tribal: false },
    text: 'the ruling elite employ a cadre of fervent patriots to serve as secret police against political dissidents'
  },
  serfdom: {
    conflicts: enslavementTraits,
    constraints: { tribal: false, suzerain: true },
    text: 'a system binding peasants to land, restricting their freedoms and subjugating them to lords'
  },
  'shell decorations': {
    conflicts: artisticTraits,
    constraints: { coastal: true, tribal: true },
    text: 'incorporated into clothing or jewelry, symbolizing sea connections'
  },
  skyships: {
    constraints: { tribal: false },
    text: 'one of the few cultures able to build skyships, which sail through the air using powerful magic and advanced technology; they jealously guard their the secrets of their construction'
  },
  'slave soldiers': {
    constraints: { suzerain: true },
    conflicts: [...enslavementTraits, ...martialTraits],
    text: 'a caste of slave soldiers has established itself within the upper echelons of society; they are well-trained and loyal, but are often resented by the locals'
  },
  'slave traders': {
    conflicts: [...enslavementTraits, ...martialTraits],
    text: 'known for capturing and selling individuals as property'
  },
  'songbird cultivation': {
    conflicts: artisticTraits,
    constraints: { wet: true },
    text: 'the care, training, and showcasing of songbirds, valuing their aesthetic and musical qualities'
  },
  'sorcerous eugenics': {
    text: 'the aristocracy is obsessed with eugenic breeding programs to produce superhuman paragons, many of whom suffer crippling mental or physical infirmities due to extensive inbreeding'
  },
  storytellers: {
    text: 'the past is preserved through ritualistic storytelling, where the heroes and legends of the past are passed down through generations'
  },
  'tattoo traditions': {
    conflicts: artisticTraits,
    text: 'permanent designs inked on the body, indicating status, achievements, or affiliations'
  },
  'tea ceremonies': {
    conflicts: artisticTraits,
    constraints: { tribal: false },
    text: 'intricate rituals celebrating the art of tea preparation'
  },
  'toxic adornments': {
    conflicts: artisticTraits,
    text: 'use of powerful hazardous materials in jewelry and clothing for status and power'
  },
  'wandering wisdom': {
    text: 'elders traveling between communities to share knowledge and resolve disputes'
  },
  'warrior braids': {
    conflicts: [...martialTraits, ...artisticTraits],
    text: 'complex hair braiding signifying martial achievements or clan allegiance'
  },
  'warrior code': {
    conflicts: martialTraits,
    text: 'abiding by honorable principles in battle and life'
  },
  'vegetative sculpting': {
    conflicts: ['vegetarians'],
    constraints: { wet: true },
    text: 'growing plants into living structures for habitation and ceremony'
  },
  vegetarians: {
    conflicts: ['vegetative sculpting'],
    constraints: { wet: true },
    text: 'has developed a strong aversion to consuming the flesh of animals, and practices vegetarianism throughout their society'
  },
  'witch trials': {
    text: 'deep distrust of the arcane arts; sorcerers are often persecuted and executed'
  }
}

export const CULTURE = {
  describe: (culture: Culture) => {
    const { skin } = culture.appearance
    const species = CULTURE.species(culture)
    const region = window.world.regions[culture.region]
    const content = [
      {
        label: 'appearance',
        text: `${TEXT.formatters.list(skin.colors, 'or')} ${SPECIES.lookup[species].traits.skin} ${
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
      }
    ]
    return {
      title: region.name,
      subtitle: `(${region.idx}) ${species} (${REGION.climate(region).latitude})`,
      content
    }
  },
  fillTraditions: (culture: Culture) => {
    const region = window.world.regions[culture.region]
    const coastal = REGION.coastal(region)
    const terrain = REGION.terrain(region)
    const zone = REGION.zone(region)
    const wet = terrain === 'forest'
    const desert = terrain === 'desert'
    const plains = terrain === 'plains'
    const mountains = REGION.mountainous(region)
    const seasonal = zone !== 'tropical' && !mountains
    const tribal = !region.civilized
    const suzerain = REGION.nation(region) === region
    const warriors = culture.values.includes('might')
    culture.traditions = TRAIT.selection({
      available: traditions,
      used: window.world.cultures.map(culture => culture.traditions).flat(),
      constraints: {
        coastal,
        wet,
        desert,
        plains,
        mountains,
        seasonal,
        tribal,
        suzerain,
        warriors
      },
      samples: 2
    })
  },
  heritage: (culture: Culture) => window.world.heritages[culture.heritage],
  sort: ({ group, ref, type }: CultureSortParams) => {
    const regions = group.map(culture => window.world.regions[culture.region])
    return REGION.sort({ group: regions, ref: window.world.regions[ref.region], type }).map(
      region => window.world.cultures[region.culture]
    )
  },
  spawn: ({ region, heritage }: CultureSpawnParams) => {
    const hue = window.dice.choice([...COLOR.hues])
    const coastal = REGION.coastal(region)
    const language = LANGUAGE.dialect(heritage.language)
    const culture: Culture = {
      idx: window.world.cultures.length,
      heritage: heritage.idx,
      region: region.idx,
      language,
      appearance: SPECIES.appearance({ region, species: heritage.species }),
      fashion: {
        color: hue,
        scheme: window.dice.choice([
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
      },
      values: TRAIT.selection({
        available: CULTURE.values,
        used: window.world.cultures.map(c => c.values).flat(),
        constraints: { coastal },
        samples: 3
      }),
      traditions: []
    }
    window.world.cultures.push(culture)
    REGION.provinces(region).forEach(province => {
      const hub = PROVINCE.hub(province)
      hub.name ||= LANGUAGE.word.unique({ lang: culture.language, key: 'settlement' })
    })
    region.culture = culture.idx
    return culture
  },
  species: (culture: Culture) => CULTURE.heritage(culture).species,
  traditions,
  values
}
