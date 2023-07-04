import { range } from 'd3'

import { entity__partitionBFS } from '../../utilities/entities'
import { trait__selection } from '../../utilities/traits'
import { Culture } from '../cultures/types'
import { lang__uniqueName } from '../languages/words'
import { Religion, ReligionThemes, ReligionTraditions } from './types'

const cultureCapital = (culture: Culture) => window.world.regions[culture.origin]

const traditions: ReligionTraditions = {
  'ancient ways': {
    text: 'the religion is only the latest iteration of a faith that goes back beyond recorded history; ancient temples and doctrines of very different kinds may still exist, abandoned after now-forgotten ages of reform and change'
  },
  'ancestral tombs': {
    text: 'the faith is known for its elaborate and sacred tombs, where locals honor their ancestors and seek guidance from spirits',
    conflicts: ['ancestral tombs']
  },
  'apocalyptic cycles': {
    text: 'followers believe the world operates in a cyclical manner, with alternating periods of creation, existence, and destruction, followed by renewal and rebirth',
    conflicts: ['entropic cult']
  },
  'apotropaic symbols': {
    text: 'the faithful use symbols, amulets, and talismans to ward off evil spirits, bad luck, and misfortune',
    constraints: { tribal: true }
  },
  aristocratic: {
    text: 'the religion is {largely|exclusively} practiced by the elite of the society; believers from lesser classes are {unable to carry out the obligations of the faith|prohibited from participating}',
    conflicts: ['underclass']
  },
  'ascetic traditions': {
    text: 'the faith tends to scorn material wealth and comforts, esteeming poverty, simplicity, and deprivation; its shrines and regalia tend to be very simple and austere'
  },
  'caste system': {
    text: 'the religion divides the local populace into castes with strict roles and no social mobility; the caste system is enforced by the local clergy',
    conflicts: ['underclass']
  },
  'celestial omens': {
    text: 'followers revere celestial bodies, such as the stars or the moons, and base their religious calendar and rituals around their movements'
  },
  charitable: {
    text: 'the clergy feels responsible for the well-being of the poor and hosts a plethora of charity programs, which provide food, shelter, and medical care'
  },
  'dire sacrifices': {
    text: 'the religion requires regular sacrifices and offerings in exchange for divine favor; the sacrifices are often gruesome and involve the slaughter of animals or even humans'
  },
  'divine bloodlines': {
    text: 'the ruling class claims to be descended from the gods, and their divine heritage is used to justify their rule; the clergy is often closely related to the ruling families',
    conflicts: ['underclass']
  },
  'doctrinal schools': {
    text: "the religion is divided into different schools of thought, each with its own interpretation of the faith's core tenets; these schools often compete with each other for influence",
    constraints: { tribal: false }
  },
  dualistic: {
    text: 'the religion divides the world into two opposing forces, {good and evil|light and darkness|order and chaos}; adherents sometimes argue over the specific qualities and roles of each force '
  },
  'ecstatic trance': {
    text: 'followers induce trance-like states, often through rhythmic music or the consumption of mind-altering substances, in order to experience direct communion with the divine or spiritual realms'
  },
  'entropic cult': {
    text: 'the religion believes that the world is slowly decaying and will eventually be destroyed; the faithful believe that they must perform good deeds to slow the decay',
    conflicts: ['apocalyptic cycles']
  },
  'esoteric doctrine': {
    text: "sacred texts are written in a dead language only known by the clergy in order to safeguard the faith's most important rituals and teachings"
  },
  'ethnic creed': {
    text: 'the religion is considered to be specific to a particular ethnic group; entry is extremely restricted to outsiders',
    conflicts: ['missionary zeal']
  },
  'fertility rituals': {
    text: 'the faithful engage in rituals and ceremonies aimed at promoting fertility and successful harvests; these rites often involve elaborate dances, feasting, and offerings to deities'
  },
  'funerary rites': {
    text: 'the faithful have elaborate rituals for the dead, including burial practices, mourning periods, and commemorative ceremonies',
    conflicts: ['ancestral tombs']
  },
  geomancy: {
    text: 'the religion incorporates the study and manipulation of earth energies; followers believe that certain locations possess unique spiritual power and can be harnessed for various purposes',
    constraints: { tribal: true }
  },
  'green pact': {
    text: 'the religion forbids the destruction of plant life and requires the followers to favor meat oriented diets; cannibalism is sometimes practiced in remote areas',
    conflicts: ['nature veneration'],
    constraints: { tribal: true }
  },
  'heavenly hymns': {
    text: 'the faith is known for its beautiful and elaborate hymns, chants, and songs; the faithful believe that music is essential to understanding the divine'
  },
  'holy grounds': {
    text: 'followers believe that certain locations are sacred and must be protected at all costs; these locations are often heavily fortified'
  },
  'initiation rites': {
    text: 'the religion requires a rigorous series of rituals and tests to be performed before one can be considered a full member of the faith'
  },
  'lay clergy': {
    text: 'the religion allows common followers to serve as clergy, without the need for extensive training or initiation rites; this often results in a more egalitarian and inclusive religious community'
  },
  'localized variation': {
    text: 'the faith has substantially different manifestations in different locations, each branch harmonized with local cultures and habits'
  },
  'marriage ceremonies': {
    text: 'the faithful have elaborate rituals for marriage, often involving feasts, music, dancing, and other festivities'
  },
  martyrdom: {
    text: 'the followers of the religion venerate those who have died for their faith, and martyrdom is considered the highest form of devotion'
  },
  'material luxuriance': {
    text: 'the religion prizes ornate regalia, splendid shrines, magnificent religious art, and the finest possible adornment of all things related to the faith'
  },
  'missionary zeal': {
    text: 'the faith is wel-known for its countless missionaries, who travel far and wide seeking to spread the faith and its teachings',
    constraints: { tribal: false },
    conflicts: ['ethnic creed']
  },
  'monastic clergy': {
    text: 'the clergy of the religion are required to live in isolated monasteries and devote their lives to prayer and contemplation; they are often credited with being holier than the secular clergy who work in the world',
    constraints: { tribal: false }
  },
  'mutilated clergy': {
    text: 'clergy of the faith are required to undergo some grievous mutilation or physical scarring as a sign of their devotion.'
  },
  'nature veneration': {
    text: 'followers hold a deep respect for the natural world and seek harmony with their surroundings; vegetarian diets are common among the faithful',
    conflicts: ['green pact']
  },
  'penitential practices': {
    text: 'the followers of the religion engage in acts of penance and self-mortification to atone for their sins and demonstrate their devotion',
    conflicts: ['purification rituals']
  },
  'polarized genders': {
    text: 'the faith enforces strict gender roles with specific expectations for outfits, occupations, and legal rights'
  },
  polyamory: {
    text: 'the religion allows its followers to have multiple spouses; this is considered a holy practice and is encouraged by the clergy'
  },
  'purification rituals': {
    text: 'the faithful engage in elaborate rituals to purify themselves of sin and impurity; these rituals often involve bathing, fasting, and other forms of self-denial',
    conflicts: ['penitential practices']
  },
  'religious laws': {
    text: 'the religion has a developed a complex and sophisticated legal system that is used to adjudicate disputes and settle conflicts',
    constraints: { tribal: false }
  },
  'remnant faith': {
    text: 'this faith is a dying religion; its last remaining followers are fiercely protective of their traditions and beliefs',
    constraints: { major: false }
  },
  'ritual scarification': {
    text: 'followers practice ritual scarification to mark important life events and demonstrate their devotion to the faith; the scars are often elaborate and intricate',
    constraints: { tribal: true }
  },
  'sacred pilgrimage': {
    text: 'the faithful of {region} undertake a dangerous pilgrimage to a holy site, enduring great hardship and risking their lives in the process'
  },
  'soul reincarnation': {
    text: 'followers believe that each soul is reborn after death based on their actions in life; the most virtuous souls eventually transcend the cycle of death and birth'
  },
  'spirit possession': {
    text: 'the religion incorporates rituals in which individuals become possessed by spirits, deities, or ancestors, often acting as vessels for divine messages or guidance',
    constraints: { tribal: true }
  },
  syncretic: {
    text: 'the faith has a long history of absorbing elements from other religions, creating a unique blend of beliefs and practices'
  },
  'temple architects': {
    text: 'the faith is known for its elaborate and beautiful temples, shrines, and monuments; they are often built by specialized architects and engineers'
  },
  'totemic worship': {
    text: 'followers construct elaborate totems to represent and honor the spirits and gods they revere; these totems are often placed in prominent locations',
    constraints: { tribal: true }
  },
  underclass: {
    text: 'there exists a local religion that is mostly practiced by poor, oppressed, marginalized, and unimportant; it serves {to comfort and console the downtrodden|as a weapon of revolt and change}',
    conflicts: ['aristocratic', 'divine bloodlines', 'caste system']
  },
  'warrior monks': {
    text: 'the clergy of the religion are trained in both religious and martial arts, acting as protectors of the faith and their communities'
  },
  'venal clergy': {
    text: 'the religion is led by a corrupt and decadent clergy, who are more interested in worldly pleasures than spiritual matters',
    constraints: { organized: true }
  }
}

const themes: ReligionThemes = {
  aesthetics: { text: 'beauty, art, creativity' },
  ancestry: { text: 'household, bloodline, heritage' },
  authority: { text: 'law, legitimacy, discipline' },
  commerce: { text: 'bargains, wealth, prosperity' },
  death: { text: 'endings, crypts, afterlife' },
  dreams: { text: 'prophecy, visions, nightmares' },
  earth: { text: 'stability, mountains, endurance' },
  eldritch: { text: 'otherworldly, alien, occult' },
  empathy: { text: 'compassion, charity, connection', conflicts: ['hatred', 'tyranny'] },
  fire: { text: 'passion, energy, destruction', conflicts: ['water'] },
  harmony: { text: 'peace, balance, tranquility', conflicts: ['warfare', 'hatred'] },
  hatred: { text: 'anger, malice, vengeance', conflicts: ['empathy', 'harmony'] },
  industry: { text: 'labor, craftsmanship, innovation' },
  intrigue: { text: 'deception, plots, manipulation' },
  knowledge: { text: 'wisdom, learning, insight' },
  life: { text: 'cultivation, fertility, abundance' },
  light: { text: 'salvation, forgiveness, rebirth' },
  luck: { text: 'fortune, chance, serendipity' },
  pariah: { text: 'betrayal, rebellion, outcasts' },
  ruin: { text: 'disaster, collapse, chaos' },
  revelry: { text: 'celebration, feasting, debauchery' },
  seasons: { text: 'cycles, change, renewal' },
  shadows: { text: 'darkness, secrets, hidden truths' },
  sky: { text: 'storms, inspiration, freedom' },
  tyranny: { text: 'domination, ambition, enslavement', conflicts: ['empathy'] },
  warfare: { text: 'conflict, strength, aggression', conflicts: ['harmony'] },
  water: { text: 'cleansing, healing, grief', conflicts: ['fire'], constraints: { coastal: true } },
  wilderness: { text: 'navigation, tracking, beasts' }
}

export const religion__spawn = () => {
  const { cultures } = window.world
  const regions = cultures.map(cultureCapital)
  entity__partitionBFS({
    items: regions,
    target: 5,
    neighbors: region => {
      const curr = window.world.cultures[region.culture.ruling]
      return curr.neighbors
        .map(c => window.world.cultures[c])
        .filter(culture => culture.civilized === curr.civilized && culture.religion === undefined)
        .map(cultureCapital)
    }
  }).forEach(group => {
    const [center] = group
    const culture = window.world.cultures[center.culture.ruling]
    const tribal = !culture.civilized
    const religion: Religion = {
      tag: 'religion',
      name: lang__uniqueName({ lang: culture.language, key: 'religion' }),
      idx: window.world.religions.length,
      type: window.dice.weightedChoice<Religion['type']>([
        { w: tribal ? 0 : 1, v: 'philosophy' },
        { w: 1, v: 'monotheistic' },
        { w: 2, v: 'polytheistic' },
        { w: 1, v: 'ancestor worship' },
        { w: tribal ? 1 : 0, v: 'spirit worship' }
      ]),
      display: window.dice.color(),
      cultures: [],
      traditions: [],
      themes: [],
      clergy: window.dice.spin(
        '{restricted to {men|women}|no gender restrictions} (celibacy is {required|encouraged|optional})'
      ),
      leadership: window.dice.weightedChoice<Religion['leadership']>([
        { w: 1, v: 'hierocratic' },
        { w: 2, v: 'multicephalous' },
        { w: 3, v: 'autonomous' }
      ])
    }
    window.world.religions.push(religion)
    const ancestral = religion.type === 'ancestor worship'
    const spirits = religion.type === 'spirit worship'
    const organized = religion.leadership !== 'autonomous'
    const coastal =
      group.filter(region => region.coastal).length > group.filter(region => !region.coastal).length
    const major = true
    range(2).forEach(() => {
      const tradition = trait__selection({
        available: traditions,
        current: religion.traditions.map(trait => trait.tag),
        used: window.world.religions.map(r => r.traditions.map(({ tag }) => tag)).flat(),
        constraints: { tribal, ancestral, spirits, organized, major, coastal }
      })
      religion.traditions.push(tradition)
    })
    range(3).forEach(() => {
      const theme = trait__selection({
        available: themes,
        current: religion.themes.map(trait => trait.tag),
        used: window.world.religions.map(r => r.themes.map(theme => theme.tag)).flat(),
        constraints: { coastal }
      })
      religion.themes.push(theme)
    })
    const cultures = group.map(region => window.world.cultures[region.culture.ruling])
    cultures.forEach(culture => {
      culture.religion = religion.idx
      religion.cultures.push(culture.idx)
    })
  })
}
