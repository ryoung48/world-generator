import { Thread } from '../types'
import { Challenge, ChallengeDefinition } from './types'

const challenge__definition: ChallengeDefinition = {
  mobility: {
    text: 'acrobatics, dodging hazards, moving quickly through difficult terrain'
  },
  stealth: {
    text: 'hiding, moving quietly, pickpocketing, lockpicking, disguises'
  },
  investigation: {
    text: 'searching locations, finding people, solving puzzles'
  },
  logistics: {
    text: 'organization and execution of strategic and tactical plans'
  },
  knowledge: {
    text: 'recalling facts about arcana, history, laws, myths, etiquette, and religions'
  },
  perception: {
    text: 'notice fine details through sight, hearing, and smell'
  },
  insight: {
    text: 'detecting lies, emotions, and intent of others',
    npcs: 1
  },
  survival: {
    text: '{recalling facts about nature, navigation, and handling animals|treating wounds and diagnosing illnesses}'
  },
  persuasion: {
    text: 'influencing people through negotiation, charm, oration, deception, or intimidation',
    npcs: 1
  },
  athletics: {
    text: 'climbing, swimming, lifting, throwing, and overcoming obstacles with brute force'
  },
  combat: {
    text: () => `{ambush|confront|survive an ambush from} hostile forces`
  }
}

const keys = Object.keys(challenge__definition) as Challenge[]

export const challenge__spawn = (params: { thread: Thread; blacklist: Challenge[] }) => {
  const { blacklist } = params
  const key = window.dice.choice(keys.filter(challenge => !blacklist.includes(challenge)))
  const challenge = challenge__definition[key]
  const text = typeof challenge.text === 'string' ? challenge.text : challenge.text()
  return {
    challenge: key,
    text: window.dice.spin(text)
  }
}
