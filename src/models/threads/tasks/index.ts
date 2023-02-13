import { decorateText } from '../../utilities/text/decoration'
import { actor__fill, actor__find, actors, enemies__spawn } from '../actors'
import { Thread } from '../types'
import { Task } from './types'

const clue = decorateText({
  label: 'a clue',
  tooltip: 'information about an {actor|location|object}'
})

export const task__definition: Record<Task['tag'], Task> = {
  track: {
    tag: 'track',
    type: 'investigation',
    text: `Determine the location of an ${actors.neutral} who might have ${clue}.`
  },
  infiltrate: {
    tag: 'infiltrate',
    type: 'investigation',
    text: `Stealthily {enter the area|attend an event} and gather ${clue}.`
  },
  shadow: {
    tag: 'infiltrate',
    type: 'investigation',
    text: `Shadow an ${actors.neutral} without being noticed to see if they reveal ${clue}.`
  },
  search: {
    tag: 'search',
    type: 'investigation',
    text: `Search an area where the ${actors.patron} suspects ${clue} can be found.`
  },
  observe: {
    tag: 'observe',
    type: 'investigation',
    text: `Observe an area where it is suspected that ${clue} might be revealed.`
  },
  ambush: {
    tag: 'ambush',
    type: 'investigation',
    text: () =>
      `Prepare and execute an ambush on ${enemies__spawn('hostile elements')} that hold ${clue}.`
  },
  trick: {
    tag: 'trick',
    type: 'investigation',
    text: `Trick an ${actors.neutral} into revealing ${clue}.`
  },
  assist: {
    tag: 'assist',
    type: 'investigation',
    text: () =>
      `{Help an ${actors.friend({
        label: 'allied actor'
      })} take a personal risk to acquire ${clue}|Defend an ${actors.friend({
        label: 'allied actor'
      })} from ${enemies__spawn('hostile elements')} while they acquire ${clue}}.`
  },
  bribe: {
    tag: 'bribe',
    type: 'investigation',
    text: `Bribe an ${actors.neutral} to reveal ${clue}.`
  },
  ambushed: {
    tag: 'ambushed',
    type: 'investigation',
    text: () => `Survive being ambushed by ${enemies__spawn('hostile forces')} that have ${clue}.`
  },
  waylay: {
    tag: 'waylay',
    type: 'conflict',
    text: () =>
      `{Waylay ${enemies__spawn(
        'dangerous minions'
      )} who are working for the ${actors.rival()}|Eliminate ${enemies__spawn(
        'dangerous outside actors'
      )} brought in to aid the ${actors.rival()}}.`
  },
  intimidate: {
    tag: 'intimidate',
    type: 'conflict',
    text: `{Intimidate|Put social pressure} on an ${actors.enemy({
      label: 'associate'
    })} of the ${actors.rival()}.`
  },
  support: {
    tag: 'support',
    type: 'conflict',
    text: `Support an ${
      actors.neutral
    } who is working against the ${actors.rival()} for their own reasons.`
  },
  steal: {
    tag: 'steal',
    type: 'conflict',
    text: `{Sabotage|Steal} the ${actors.rival(
      "rival's"
    )} possessions that are important to the plot.`
  },
  survive: {
    tag: 'survive',
    type: 'conflict',
    text: () =>
      `Fight through an ${enemies__spawn(
        'ambush'
      )} arranged by the ${actors.rival()} at a location.`
  },
  discredit: {
    tag: 'discredit',
    type: 'conflict',
    text: `{{Discredit|Frame} an ${actors.enemy({
      label: 'allied actor'
    })} of the ${actors.rival()}|Spread {slanderous|harmful} information that will sow chaos for the ${actors.rival()}}.`
  },
  betrayal: {
    tag: 'betrayal',
    type: 'conflict',
    text: () =>
      `Suffer a betrayal from an ${actors.friend({
        label: 'allied actor',
        betrayal: 'enemy',
        spawn: false
      })} and ${enemies__spawn(
        'face a fight'
      )} to {escape the ensuing chaos|avenge this injustice}.`
  },
  outmaneuver: {
    tag: 'outmaneuver',
    type: 'conflict',
    text: `Outmaneuver a local official that has been {blackmailed|bribed} by the ${actors.rival()}.`
  },
  favor: {
    tag: 'favor',
    type: 'conflict',
    text: `Do a ${actors.friend({
      label: 'friendly actor'
    })} a favor that will advance them into a position to help the ${actors.patron}.`
  },
  defend: {
    tag: 'defend',
    type: 'conflict',
    text: () =>
      `Defend {the ${actors.patron}|an ${actors.friend({
        label: 'allied actor'
      })}} against ${enemies__spawn('hostile elements')}.`
  },
  convince: {
    tag: 'convince',
    type: 'action',
    text: `Convince an ${actors.enemy({
      label: 'actor',
      subject: true
    })} who is allied to the ${actors.rival()} to betray them.`,
    resolve: ({ thread, stage }) => {
      const { status } = stage
      const subject = thread.actors.find(({ idx }) => idx === thread.subject)
      if (status === 'success') subject.role = 'neutral'
      if (status === 'perfection') subject.role = 'friend'
    }
  },
  sanctum: {
    tag: 'sanctum',
    type: 'action',
    text: `{Raid|Ruin} a dangerous {sanctum|safehouse} belonging to the ${actors.rival()}.`
  },
  deliver: {
    tag: 'deliver',
    type: 'action',
    text: `{Deliver|Pass} {incriminating|disgraceful} information to an ${actors.neutral} who can make sure that important people learn of the evidence.`
  },
  confrontation: {
    tag: 'deliver',
    type: 'action',
    text: () =>
      `Confront the ${actors.rival()} directly and face their ${enemies__spawn(
        'most dangerous minions'
      )} in an effort to advance the objective.`
  },
  weaken: {
    tag: 'weaken',
    type: 'action',
    text: `{Destroy|Plunder} {an object|information|a location} that is vital to the ${actors.rival(
      "rival's"
    )} plans.`
  },
  destroy: {
    tag: 'destroy',
    type: 'action',
    text: `Destroy vital {information|proof|evidence} that the ${actors.rival()} needs to advance their plans.`
  },
  rally: {
    tag: 'rally',
    type: 'action',
    text: `Rally an outside ${actors.neutral} and their allies to oppose the ${actors.rival()}.`
  },
  escort: {
    tag: 'escort',
    type: 'action',
    text: `Escort an ${actors.friend({ label: 'allied actor' })} out of the ${actors.rival(
      "rival's"
    )} reach for at least a temporary period.`
  },
  authority: {
    tag: 'authority',
    type: 'action',
    text: `Bring in an outside authority to oppose the ${actors.rival()}.`
  },
  sabotage: {
    tag: 'sabotage',
    type: 'action',
    text: `Sabotage {resources|information|allies} of the ${actors.rival()} so that it betrays their attempted use of it.`
  },
  preparation: {
    tag: 'preparation',
    type: 'conflict',
    text: `{Gather supplies|Consult allies|Compile evidence} in preparation for the next phase of the objective.`
  },
  traitor: {
    tag: 'traitor',
    type: 'conflict',
    text: `Identify a suspected traitor amongst the patron's allies.`,
    resolve: ({ thread, stage }) => {
      const { status } = stage
      if (status === 'success' || status === 'perfection') {
        const subject = actor__find({ thread, role: 'friend' })
        subject.role = 'enemy'
        stage.result = ` The ${decorateText({
          label: 'traitor',
          link: window.world.actors[subject.idx]
        })} has been identified.`
      }
    }
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
  const text = actor__fill({
    text: typeof task.text === 'string' ? task.text : task.text(),
    thread
  })
  if (task.type === 'action') thread.clues--
  return {
    tag: task.tag,
    text
  }
}
