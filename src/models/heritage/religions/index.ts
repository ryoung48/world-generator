import { REGION } from '../../regions'
import { TEXT } from '../../utilities/text'
import { TRAIT } from '../../utilities/traits'
import { Religion, ReligionSpawnParams, ReligionThemes, ReligionTraditions } from './types'

const clergy: Record<string, string> = {
  'affluent clergy': 'wealthier individuals sustaining costly or demanding religious practices',
  'hereditary clergy': 'selected from certain bloodlines or groups for faithful service',
  'lay clergy': 'common believers recognized for their technical ability and moral standing',
  'monastic clergy': 'individuals living apart from society, maintaining ritualistic distance',
  'occult clergy': 'sorcerers who serve the faith as part of their magical studies',
  'ordained clergy': 'experts in some aspect of the faith, trained in complex rites'
}

const leadership: Record<string, string> = {
  autonomous:
    "each holy person independently leads their sect's branch, attracting followers as they can",
  multicephalous:
    'multiple pontiffs, each with subordinate clergy, may cooperate or compete with others',
  hierocratic: 'a sole pontiff oversees upper clergy and temple heads, who manage minor clergy',
  congregational: 'independent congregations with clergy directed by parishioner consensus',
  patronage: 'wealthy lay believers fund temples, directing clergy through financial influence',
  egalitarian: 'no formal clergy; believers may assume teaching roles without distinct status'
}

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
  crusading: {
    text: 'the religion is known for mandating holy wars to defend or spread the faith, often led by religious figures or zealots',
    conflicts: ['pacifism']
  },
  'blood sacrifices': {
    text: 'the religion requires regular sacrifices and offerings in exchange for divine favor; the sacrifices are often gruesome and involve the slaughter of animals or even humans'
  },
  'doctrinal schools': {
    text: "the religion is divided into different schools of thought, each with its own interpretation of the faith's core tenets; these schools often compete with each other for influence",
    constraints: { tribal: false }
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
  'green pact': {
    text: 'the religion forbids the destruction of plant life and requires the followers to favor meat oriented diets',
    conflicts: ['nature veneration'],
    constraints: { tribal: true }
  },
  'heathen tax': {
    text: 'practitioners of minority religions are not allowed to serve in the military and are required to pay a special tax, leading to tensions and discrimination'
  },
  'heavenly hymns': {
    text: 'the faith is known for its beautiful and elaborate hymns, chants, and songs; the faithful believe that music is essential to understanding the divine'
  },
  'holy grounds': {
    text: 'followers believe that certain locations are sacred and must be protected at all costs; these locations are often heavily fortified'
  },
  'localized variation': {
    text: 'the faith has substantially different manifestations in different locations, each branch harmonized with local cultures and habits'
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
  'mutilated clergy': {
    text: 'clergy of the faith are required to undergo some grievous mutilation or physical scarring as a sign of their devotion.'
  },
  'nature veneration': {
    text: 'followers hold a deep respect for the natural world and seek harmony with their surroundings; vegetarian diets are common among the faithful',
    conflicts: ['green pact']
  },
  'otherworldly patrons': {
    text: 'the faith is the result of a pact with supernatural entities from different realms, these beings bestow blessings and guidance in exchange for devotion'
  },
  pacifism: {
    text: 'this faith strictly advocates non-violence, teaching that all conflict is spiritually harmful and must be avoided',
    conflicts: ['crusading', 'warrior monks']
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
  'sacred pilgrimage': {
    text: 'the faithful of {region} undertake a dangerous pilgrimage to a holy site, enduring great hardship and risking their lives in the process'
  },
  'sky burials': {
    text: 'the faithful practice aerial funerary rites, exposing bodies to the elements and birds, believing in a spiritual ascent'
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
    text: 'the faith is mostly practiced by poor, oppressed, marginalized, and unimportant; it serves {to comfort and console the downtrodden|as a weapon of revolt and change}',
    conflicts: ['aristocratic', 'caste system']
  },
  'warrior monks': {
    text: 'the clergy of the religion are trained in both religious and martial arts, acting as protectors of the faith and their communities',
    conflicts: ['pacifism']
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
  light: { text: 'salvation, forgiveness, rebirth', conflicts: ['shadows'] },
  luck: { text: 'fortune, chance, serendipity' },
  pariah: { text: 'betrayal, rebellion, outcasts' },
  ruin: { text: 'disaster, collapse, chaos' },
  revelry: { text: 'celebration, feasting, debauchery' },
  seasons: { text: 'cycles, change, renewal' },
  shadows: { text: 'darkness, secrets, hidden truths', conflicts: ['light'] },
  sky: { text: 'storms, inspiration, freedom' },
  tyranny: { text: 'domination, ambition, enslavement', conflicts: ['empathy'] },
  warfare: { text: 'conflict, strength, aggression', conflicts: ['harmony'] },
  water: { text: 'cleansing, healing, grief', conflicts: ['fire'], constraints: { coastal: true } },
  wilderness: { text: 'navigation, tracking, beasts' }
}

export const RELIGION = {
  describe: (religion: Religion) => {
    const content = [
      {
        label: 'organization',
        text: `${TEXT.decorate({
          label: religion.leadership,
          tooltip: leadership[religion.leadership]
        })}${
          religion.leadership === 'egalitarian'
            ? ''
            : `, ${TEXT.decorate({
                label: religion.clergy,
                tooltip: clergy[religion.clergy]
              })}`
        }`
      },
      {
        label: 'themes',
        text: religion.themes
          .map(({ tag, text }) => TEXT.decorate({ label: tag, tooltip: text }))
          .join(', ')
      },
      {
        label: 'traditions',
        text: religion.traditions
          .map(({ tag, text }) => TEXT.decorate({ label: tag, tooltip: text }))
          .join(', ')
      }
    ]
    return {
      title: religion.name,
      subtitle: `(${religion.idx}) ${religion.type}`,
      content
    }
  },
  spawn: ({ regions, type }: ReligionSpawnParams) => {
    const [center] = regions
    const tribal = !center.civilized
    const religion: Religion = {
      name: '',
      idx: window.world.religions.length,
      type,
      display: window.dice.color(),
      cultures: [],
      traditions: [],
      themes: [],
      clergy: window.dice.choice(Object.keys(clergy)),
      leadership: window.dice.choice(Object.keys(leadership))
    }
    window.world.religions.push(religion)
    const spirits = religion.type === 'animistic'
    const organized = religion.leadership !== 'autonomous'
    const coastal = REGION.coastal(center)
    const major = true
    religion.traditions = TRAIT.selection({
      available: traditions,
      current: religion.traditions.map(trait => trait.tag),
      used: window.world.religions.map(r => r.traditions.map(({ tag }) => tag)).flat(),
      constraints: { tribal, spirits, organized, major, coastal },
      samples: 2
    }).map(trait => {
      return {
        tag: trait,
        text: window.dice.spin(traditions[trait].text)
      }
    })
    religion.themes = TRAIT.selection({
      available: themes,
      current: religion.themes.map(trait => trait.tag),
      used: window.world.religions.map(r => r.themes.map(theme => theme.tag)).flat(),
      constraints: { coastal },
      samples: 3
    }).map(trait => {
      return {
        tag: trait,
        text: themes[trait].text
      }
    })
    regions.forEach(region => (region.religion = religion.idx))
    return religion
  }
}
