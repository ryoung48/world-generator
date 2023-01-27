import { Thread } from '../types'
import { Task } from './types'

export const task__definition: Record<Task['tag'], Task> = {
  track: {
    tag: 'track',
    type: 'investigation',
    text: `Determine the {location|identity} of actor who might have plot sensitive information.`
  },
  infiltrate: {
    tag: 'infiltrate',
    type: 'investigation',
    text: `Stealthily {enter a location|attend an event} and gather plot sensitive information.`
  },
  shadow: {
    tag: 'infiltrate',
    type: 'investigation',
    text: `Shadow an actor without being noticed to see if they reveal plot sensitive information.`
  },
  search: {
    tag: 'search',
    type: 'investigation',
    text: `Search a location where the patron suspects plot sensitive information can be found.`
  },
  observe: {
    tag: 'observe',
    type: 'investigation',
    text: `Observe a location where it is suspected that plot sensitive information might be revealed.`
  },
  ambush: {
    tag: 'ambush',
    type: 'investigation',
    text: `Prepare and execute an ambush a dangerous actor who holds plot sensitive information.`
  },
  trick: {
    tag: 'trick',
    type: 'investigation',
    text: `Trick an actor into revealing plot sensitive information.`
  },
  assist: {
    tag: 'assist',
    type: 'investigation',
    text: `{Help an allied actor take a personal risk to acquire plot sensitive information|Defend an allied actor while they acquire plot sensitive information}.`
  },
  bribe: {
    tag: 'bribe',
    type: 'investigation',
    text: `Bribe an actor to reveal plot sensitive information.`
  },
  ambushed: {
    tag: 'ambushed',
    type: 'investigation',
    text: `Survive being ambushed by hostile forces that have plot sensitive information.`
  },
  waylay: {
    tag: 'waylay',
    type: 'conflict',
    text: `{Waylay a dangerous minion who is working for the rival|Eliminate a dangerous outside actor brought in to aid the rival}.`
  },
  intimidate: {
    tag: 'intimidate',
    type: 'conflict',
    text: `{Intimidate|Put social pressure} on an associate of the rival.`
  },
  support: {
    tag: 'support',
    type: 'conflict',
    text: `Support an actor who is working against the rival for their own reasons.`
  },
  steal: {
    tag: 'steal',
    type: 'conflict',
    text: `{Sabotage|Steal} the rival's possessions that are important to the plot.`
  },
  survive: {
    tag: 'survive',
    type: 'conflict',
    text: `Fight through an ambush arranged by the rival at a location.`
  },
  discredit: {
    tag: 'discredit',
    type: 'conflict',
    text: `{{Discredit|Frame} an allied actor of the rival|Spread {slanderous|harmful} information that will sow chaos for the rival}.`
  },
  betrayal: {
    tag: 'betrayal',
    type: 'conflict',
    text: `Suffer a betrayal from an allied actor and face a fight to {escape the ensuing chaos|avenge this injustice}.`
  },
  outmaneuver: {
    tag: 'outmaneuver',
    type: 'conflict',
    text: `Outmaneuver a local official that has been {blackmailed|bribed} by the rival.`
  },
  favor: {
    tag: 'favor',
    type: 'conflict',
    text: `Do a friendly actor a favor that will advance them into a position to help the patron.`
  },
  defend: {
    tag: 'defend',
    type: 'conflict',
    text: `Defend {the patron|an allied actor} against hostile elements.`
  },
  convince: {
    tag: 'convince',
    type: 'action',
    text: `Convince an actor who is allied to the rival to betray them.`
  },
  sanctum: {
    tag: 'sanctum',
    type: 'action',
    text: `{Raid|Ruin} a dangerous {sanctum|safehouse} belonging to the rival.`
  },
  deliver: {
    tag: 'deliver',
    type: 'action',
    text: '{Deliver|Pass} {incriminating|disgraceful} information to an actor who can make sure that important people learn of the evidence.'
  },
  confrontation: {
    tag: 'deliver',
    type: 'action',
    text: 'Confront the rival directly and face their most dangerous minions in an effort to advance the objective.'
  },
  weaken: {
    tag: 'weaken',
    type: 'action',
    text: `{Destroy|Plunder} {an object|information|a location} that is vital to the rival's plans.`
  },
  destroy: {
    tag: 'destroy',
    type: 'action',
    text: `Destroy vital {information|proof|evidence} that the rival needs to advance their plans.`
  },
  rally: {
    tag: 'rally',
    type: 'action',
    text: `Rally an outside actor and their allies to oppose the rival.`
  },
  escort: {
    tag: 'escort',
    type: 'action',
    text: `Escort an allied actor out of the rival's reach for at least a temporary period.`
  },
  authority: {
    tag: 'authority',
    type: 'action',
    text: `Bring in an outside authority to oppose the rival.`
  },
  sabotage: {
    tag: 'sabotage',
    type: 'action',
    text: `Sabotage {resources|information|allies} of the rival so that it betrays their attempted use of it.`
  },
  preparation: {
    tag: 'preparation',
    type: 'conflict',
    text: `{Gather supplies|Consult allies|Compile evidence} in preparation for the next phase of the objective.`
  },
  traitor: {
    tag: 'traitor',
    type: 'conflict',
    text: `Identify a suspected traitor amongst the patron's allies.`
  }
}

export const task__spawn = (params: { thread: Thread; blacklist: Task['tag'][] }) => {
  const { blacklist, thread } = params
  const ending = thread.complexity - thread.progress < 3
  const task = window.dice.choice(
    Object.values(task__definition).filter(task => {
      const valid = !blacklist?.includes?.(task.tag)
      const investigation = task.type !== 'investigation' || thread.clues < 3
      const action = task.type !== 'action' || thread.clues > 0
      const conflict = task.type !== 'conflict' || (thread.failures > 0 && !ending)
      const finale = ending && thread.clues > 0 && task.type !== 'action'
      return valid && action && conflict && investigation && !finale
    })
  )
  const text = window.dice.spin(task.text)
  if (task.type === 'action') thread.clues--
  return {
    tag: task.tag,
    text
  }
}
