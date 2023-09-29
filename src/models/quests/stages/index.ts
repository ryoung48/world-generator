import { location__spawn } from '../../regions/provinces/locations'
import { hub__weather } from '../../regions/provinces/weather'
import { DIFFICULTY } from '../../utilities/difficulty'
import { MATH } from '../../utilities/math'
import { dayMS, hourMS } from '../../utilities/math/time'
import { decorateText } from '../../utilities/text/decoration'
import { Quest } from '../types'
import { Challenge, Challenges, Stage } from './types'

export const stage__challenges: Challenges = {
  mobility: {
    text: 'acrobatics, dodging hazards, moving quickly through difficult terrain',
    variations: [
      { text: 'squeeze through a narrow passage without getting trapped' },
      { text: 'run across {crumbling|unstable|slippery|hazardous} ground without falling' },
      { text: 'dodge projectiles while navigating a dangerous location' },
      { text: 'weave through a crowd to chase a fleeing npc', type: 'community' }
    ]
  },
  stealth: {
    text: 'hiding, moving quietly, pickpocketing, lockpicking, disguises',
    variations: [
      { text: 'blend into the surrounding area to avoid {detection|pursuers}' },
      { text: 'silently move through the area without alerting the inhabitants' },
      { text: '{pickpocket|steal} an object without being noticed', type: 'community' },
      { text: 'pick a lock to {reveal a dark secret|free prisoners}' },
      { text: 'stay hidden while eavesdropping on an important conversation', type: 'community' },
      { text: '{infiltrate|scout} the area using disguises to gather information' }
    ]
  },
  investigation: {
    text: 'searching locations, finding people, solving puzzles',
    variations: [
      { text: 'track down an elusive npc by interviewing locals', type: 'community' },
      { text: 'decipher a cryptic {inscription|riddle|map} to unlock a secret' },
      {
        text: 'search the area for {a {hidden clue|rare object}|concealed compartments|hidden chambers}'
      },
      { text: 'analyze the scene of a crime to determine what happened' }
    ]
  },
  knowledge: {
    text: 'recalling facts about arcana, history, laws, myths, etiquette, and religions',
    variations: [
      { text: 'recall etiquette needed when addressing an important npc', type: 'community' },
      { text: 'identify scattered {arcane|religious} symbols in the area' },
      {
        text: 'remember an important {historical|religious} {event|figure} that relates to the area'
      },
      { text: 'perform an old {religious|arcane} ritual in order to break a curse' },
      { text: 'recognize the {historic|religious} significance of a newly discovered relic' },
      { text: 'recall a local {law|custom} that is being broken by an npc', type: 'community' }
    ]
  },
  perception: {
    text: 'notice fine details through sight, hearing, & smell',
    variations: [
      { text: 'spot {a hidden|an illusory} entrance within the area' },
      { text: 'notice a concealed trap in a dimly lit corridor' },
      { text: 'hear the faint {whispering|rustling} of nearby hidden enemies' },
      { text: 'hear a distant cry for help masked by the ambient sounds of the area' },
      { text: 'notice signs of recent passage in the area' },
      { text: 'detect the subtle scent of a rare herb hidden among common foliage' },
      { text: 'spot an almost invisible {mark|inscription} made on a {map|manuscript|artifact}' },
      { text: 'notice the slight discoloration of a drink, warning of poison', type: 'community' },
      { text: 'notice a {suspicious|unusual} npc {in a crowd|following you}', type: 'community' }
    ]
  },
  insight: {
    text: 'detecting lies, emotions, and intent of others',
    variations: [
      { text: "detect the subtle tell of an npc who's not being truthful" },
      { text: "understand the underlying jealousy in a npc's compliments" },
      { text: "perceive the hidden sorrow behind an npc's stern demeanor", type: 'community' },
      { text: "sense the underlying tension in an npc's jovial facade" },
      { text: "catch the fleeting expression of guilt on a suspect's face", type: 'community' },
      { text: "understand the true motive behind a benefactor's generosity", type: 'community' },
      { text: "notice the signs of distrust in an npc's casual questions", type: 'community' },
      { text: "perceive the flicker of recognition in a stranger's eyes", type: 'community' },
      { text: "sense the suppressed anger in an ally's voice" },
      {
        text: "recognize the signs of enchantment affecting an individual's emotions",
        type: 'community'
      },
      { text: 'detect the signs of a potential betrayal in a trusted ally' }
    ]
  },
  survival: {
    text: 'recalling facts about nature, navigation, handling animals, tracking, and medicine',
    variations: [
      { text: 'navigate a maze of twisting passages using natural landmarks', type: 'wilderness' },
      {
        text: 'track a quarry through the wilderness by recognizing its unique signs',
        type: 'wilderness'
      },
      {
        text: "recognize the scent of a dangerous creature's territory to avoid it",
        type: 'wilderness'
      },
      { text: "treat a companion's wounds using {a healing poultice|makeshift bandages}" },
      { text: 'forage enough food and water to sustain the party for a day', type: 'wilderness' },
      { text: 'calm a spooked pack animal to prevent it from bolting', type: 'wilderness' },
      {
        text: 'harvest and prepare a medicinal herb to counteract a venomous bite',
        type: 'wilderness'
      },
      { text: 'calm and heal a wounded creature without causing more harm', type: 'wilderness' },
      { text: 'diagnose a disease by recognizing its symptoms' }
    ]
  },
  persuasion: {
    text: 'influencing people through negotiation, charm, oration, deception, or intimidation',
    variations: [
      {
        text: "convince a hostile npc to {stand down|help you|spare the lives of innocents|reveal their employer's identity}"
      },
      {
        text: '{trick|bribe|intimidate|charm} a reluctant npc into {revealing a secret|giving you an item|letting you pass|look the other way}'
      },
      { text: 'negotiate a {peaceful|mutually beneficial} resolution to a conflict' },
      {
        text: 'charm a merchant into {giving you a discount|selling rare inventory}',
        type: 'community'
      },
      { text: "win a crowd's support for your cause through stirring oration", type: 'community' },
      { text: 'intimidate a traitor into revealing their co-conspirators', type: 'community' },
      {
        text: 'convince an official to reconsider a {law|decree} detrimental to the patron',
        type: 'community'
      },
      {
        text: 'secure an audience with an elusive leader through charm and flattery',
        type: 'community'
      }
    ]
  },
  athletics: {
    text: 'running, jumping, climbing, swimming, lifting, throwing, and overcoming obstacles with brute force',
    variations: [
      { text: 'climb a sheer surface to reach a higher location' },
      { text: 'swim through a {flooded area|strong current}' },
      { text: 'push aside heavy debris that is obscuring the path' },
      { text: 'break through a {locked door|weak barrier}' },
      { text: 'leap across a perilous gap' },
      { text: 'carry an injured companion to safety' }
    ]
  },
  combat: {
    text: '{ambush|confront|survive an ambush from} hostile forces',
    variations: [
      {
        text: 'ambush a {convoy of hostile mercenaries transporting stolen goods|caravan transporting dark artifacts for a wicked sorcerer}'
      },
      {
        text: '{defeat} a group of {bandits|highwaymen|raiders|slavers} that use this site as a base to ambush travelers',
        type: 'wilderness'
      },
      {
        text: '{defeat} a cult of some {unacceptable|long-dead} god trying to {complete a forbidden ritual|unleash a sealed evil}'
      },
      {
        text: '{defeat} a {necromancer|ancient vampire lord} and their undead servitors conducting dark experiments at this site'
      },
      {
        text: '{defeat} {a powerful beast that has made this site its lair|{swarms|packs} of dangerous beasts that have made this site their lair}',
        type: 'wilderness'
      },
      {
        text: 'engage in combat with a fungal hive-mind and its spore-children that have taken root here',
        type: 'wilderness'
      },
      {
        text: '{defeat} animate and lethal plant life that has taken root here',
        type: 'wilderness'
      },
      {
        text: '{defeat} {an enraged|a malign} wilderness {spirit|elemental|eidolon} that protects this site',
        type: 'wilderness'
      },
      {
        text: '{defeat} the undead {husks|wraiths} of former inhabitants that still haunt this site'
      },
      {
        text: 'close a portal to a dead world that has opened here, spewing forth otherworldly horrors',
        type: 'wilderness'
      },
      {
        text: '{defeat} rival adventurers are also searching for loot at this site',
        type: 'wilderness'
      },
      {
        text: '{defeat} a tribe of aquatic {raiders|cultists} that have come ashore to plunder the surrounding area',
        type: 'wilderness'
      },
      {
        text: '{defeat} a tribe of subterranean {raiders|cultists} that have come to the surface to plunder the surrounding area',
        type: 'wilderness'
      },
      {
        text: '{defeat} a tribe of cursed cannibals driven mad by hunger that are known to lurk here',
        type: 'wilderness'
      },
      {
        text: '{defeat} relic {automatons|golems}that  guard the site against intruders',
        type: 'wilderness'
      },
      {
        text: '{defeat} a {hulking|ravenous|petrifying} magic-forged {aberration|chimera|abomination} rampaging through this site'
      },
      {
        text: '{defeat} a {sorcerer|witch} of detestable inclinations conducting dark experiments here'
      },
      {
        text: 'survive an ambush from {a gang of thugs|a group of assassins|a cult of fanatics|corrupt {settlement} guards} in a dark alley',
        type: 'community'
      },
      {
        text: '{confront|ambush} a rapacious aristocrat and their {henchmen|bodyguards} that have taken over this site',
        type: 'community'
      }
    ]
  }
}

export const stage__placeholder = -1

export const stage__current = (quest: Quest) => quest.stages.slice(-1)[0]
export const stage__previous = (quest: Quest) => quest.stages.slice(-2)[0]

export const stage__weather = (params: { quest: Quest; stage: Stage }) => {
  const { quest, stage } = params
  if (!stage.status && window.world.date - stage.setting.memory > dayMS) {
    const loc = window.world.provinces[quest.location]
    const { season, time, heat, conditions, variance } = hub__weather(loc.hub)
    stage.setting.memory = window.world.date
    stage.setting.weather = `${decorateText({
      label: heat.desc,
      tooltip: `${heat.degrees.toFixed(0)}°F`
    })}${
      variance === 'normal'
        ? ''
        : decorateText({ label: '*', color: variance === 'warmer' ? 'red' : 'blue' })
    }, ${season}, ${time}, ${conditions}`
  }
}

const validChallenge = (type: string) => (challenge: Challenge) =>
  !challenge.type || challenge.type === type

export const stage__spawn = (params: { quest: Quest; transition?: Stage['transition'] }) => {
  const { quest, transition } = params
  const loc = window.world.provinces[quest.location]
  const { district, site, type } = location__spawn({ loc })
  const challenge = window.dice.weightedChoice(
    Object.keys(stage__challenges).map(_key => {
      const key = _key as keyof Challenges
      const weight =
        stage__challenges[key].variations.filter(validChallenge(type)).length /
        stage__challenges[key].variations.length
      return { v: key, w: weight }
    })
  )
  const stage: Stage = {
    challenge,
    text: window.dice.spin(
      window.dice.choice(stage__challenges[challenge].variations.filter(validChallenge(type))).text
    ),
    transition,
    setting: {
      loc: quest.location,
      place: `${district}, ${site}`,
      weather: '',
      duration: '',
      memory: -Infinity
    },
    difficulty: { cr: quest.difficulty.cr * window.dice.uniform(0.8, 1.2) },
    duration: MATH.roundToNearestN(
      window.dice.weightedChoice([
        { w: 2, v: () => window.dice.uniform(hourMS, hourMS * 5) },
        { w: 1, v: () => window.dice.uniform(hourMS * 5, hourMS * 23) }
      ])(),
      hourMS
    )
  }
  quest.stages.push(stage)
  stage__weather({ quest, stage })
}

export const stage__resolve = (params: { pc: number; challenge: number }): Stage['status'] => {
  const { pc, challenge } = params
  const { odds } = DIFFICULTY.odds({ pc, cr: challenge })
  const roll = window.dice.random
  const diff = roll - odds
  return diff > 0.4 ? 'perfection' : diff >= 0 ? 'success' : diff > -0.4 ? 'pyrrhic' : 'failure'
}
