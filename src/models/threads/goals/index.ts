import { Thread } from '../types'
import { Goal } from './types'

export const goal__definition: Record<Goal['tag'], Goal> = {
  bounty: {
    tag: 'bounty',
    type: 'urban',
    spawn: () => {
      const monster = window.dice.flip
      const target = monster ? 'monster' : 'criminal'
      return {
        text: `A dangerous ${target} needs to be ${monster ? 'slain' : 'apprehended'}.`
      }
    }
  },
  blackmail: {
    tag: 'blackmail',
    type: 'urban',
    spawn: () => ({
      text: `A foe knows a dark secret about an actor and is ruthlessly blackmailing them with it. Help destroy evidence of this dark secret.`
    })
  },
  investigate: {
    tag: 'investigate',
    type: 'urban',
    spawn: () => {
      const crime = window.dice.choice(['theft', 'fraud', 'blackmail', 'murder', 'abduction'])
      return {
        text: `${window.dice.choice([
          `An {old|recent} crime (${crime}) remains unsolved and you must find the answer`,
          `An actor has been framed for a crime (${crime}) and needs help proving their innocence`
        ])}.`
      }
    }
  },
  defend: {
    tag: 'defend',
    type: 'urban',
    spawn: () => ({
      text: window.dice.spin(
        'An actor needs to be defended from {assassination|abduction|assault}.'
      )
    })
  },
  destroy: {
    tag: 'destroy',
    type: 'urban',
    spawn: () => ({
      text: window.dice.spin('A {dangerous|valuable} {item|location} needs to be destroyed.')
    })
  },
  encounter: {
    tag: 'encounter',
    type: 'ruin',
    spawn: () => ({
      text: 'Fight through the combatants that block your path.'
    })
  },
  escape: {
    tag: 'escape',
    type: 'urban',
    spawn: () => ({
      text: `An actor is actively being {restrained|pursued} by something with malicious intent. Help them escape`
    })
  },
  escort: {
    tag: 'escort',
    type: 'urban',
    spawn: () => ({
      text: window.dice.spin('Transport an important {actor|resources} through unsafe territory.')
    })
  },
  explore: {
    tag: 'explore',
    type: 'explore',
    spawn: () => ({
      text: 'Uncover the secrets that this site has to offer.'
    })
  },
  folly: {
    tag: 'folly',
    type: 'urban',
    spawn: () => ({
      text: window.dice.spin(
        'An actor has {made a great mistake ({subversion|debts|incompetence|negligence|misfortune})|broken an important local custom ({ethnic|religious})|fallen to vice ({vengeance|lust|greed|paranoia|drinking|gambling|drugs})}. Help them {conceal|fix} this error.'
      )
    })
  },
  hazard: {
    tag: 'hazard',
    type: 'ruin',
    spawn: () => ({
      text: 'There is a hazard that impedes the path.'
    })
  },
  heist: {
    tag: 'heist',
    type: 'urban',
    spawn: () => ({
      text: window.dice.spin('Acquire {information|items} from a location without being noticed.')
    })
  },
  intrigue: {
    tag: 'intrigue',
    type: 'urban',
    spawn: () => ({
      text: window.dice.spin(
        'An actor is suspected of a crime ({corruption|adultery|seduction|treachery|theft|incompetence|heresy|illegitimacy}). Find evidence to expose them.'
      )
    })
  },
  locate: {
    tag: 'locate',
    type: 'urban',
    spawn: () => ({
      text: window.dice.spin('Find the location of a missing {friendly|hostile|neutral} actor.')
    })
  },
  persuade: {
    tag: 'persuade',
    type: 'urban',
    spawn: () => ({
      text: window.dice.spin('{Convince|Trick|Threaten} an actor to perform an action.')
    })
  },
  prevent: {
    tag: 'prevent',
    type: 'urban',
    spawn: () => ({
      text: window.dice.spin(
        'A {violent|diplomatic|chaotic|stabilizing|marriage|religious} event is about to happen and needs to be prevent.'
      )
    })
  },
  promote: {
    tag: 'promote',
    type: 'urban',
    spawn: () => ({
      text: window.dice.spin(
        'Ensure that a {violent|diplomatic|chaotic|stabilizing|marriage|religious} event takes place.'
      )
    })
  },
  puzzle: {
    tag: 'puzzle',
    type: 'ruin',
    spawn: () => ({
      text: 'There is a puzzle that needs to be solved in order to continue.'
    })
  },
  retrieval: {
    tag: 'retrieval',
    type: 'urban',
    spawn: () => ({
      text: window.dice.spin('Help acquire a {dangerous|valuable|stolen} item from a location.')
    })
  },
  rescue: {
    tag: 'rescue',
    type: 'urban',
    spawn: () => ({
      text: `An actor needs to be rescued from a dangerous situation.`
    })
  },
  research: {
    tag: 'research',
    type: 'urban',
    spawn: () => ({
      text: window.dice.spin(`Gather information about a {actor|location|item|event}.`)
    })
  },
  resources: {
    tag: 'resources',
    type: 'urban',
    spawn: () => ({
      text: window.dice.spin(
        'Help acquire the resources needed to {{build|repair} an essential {structure|item}|{overcome a major shortage}}.'
      )
    })
  },
  smuggle: {
    tag: 'smuggle',
    type: 'urban',
    spawn: () => ({
      text: window.dice.spin(
        'Transport an important {actor|item} transported to a location without being noticed.'
      )
    })
  },
  waylay: {
    tag: 'waylay',
    type: 'urban',
    spawn: () => ({
      text: window.dice.spin(
        'A {dangerous|valuable} item is being transported and needs to be intercepted.'
      )
    })
  }
}

export const goal__spawn = (params: { type: Thread['type']; blacklist?: Goal['tag'][] }) => {
  const { blacklist, type } = params
  const goal = window.dice.choice(
    Object.values(goal__definition).filter(
      goal => goal.type === type && !blacklist?.includes?.(goal.tag)
    )
  )
  const { text } = goal.spawn()
  return {
    goal: goal.tag,
    text
  }
}
