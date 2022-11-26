import { Thread } from '../types'
import { Task } from './types'

export const task__definition: Record<Task['tag'], Task> = {
  ambush: {
    tag: 'ambush',
    text: () =>
      `{Survive an ambush arranged by the #enemy:patron:foe#|Prepare and execute an ambush on allies of the foe}.`,
    combat: 0.8
  },
  confrontation: {
    tag: 'confrontation',
    text: () => `Confront the #enemy:patron:foe# directly in effort to disrupt their plans.`,
    combat: 0.8
  },
  defend: {
    tag: 'defend',
    text: () =>
      `{An #{neutral|friend}:ally:actor# who is important to the|The} #friend:patron# needs to be defended from {assassination|imprisonment|assault}.`,
    combat: 0.8
  },
  deliver: {
    tag: 'deliver',
    text: () =>
      `{Deliver {resources|information} to an #friend:ally# in order to {progress the objective|discredit the foe}|Spread disinformation that will {disrupt|delay} the #enemy:patron:foe's# plan}.`
  },
  distract: {
    tag: 'distract',
    text: () =>
      `Create a distraction while {the #friend:patron#|an #friend:ally#} progresses the objective.`,
    nested: 0.2
  },
  escort: {
    tag: 'escort',
    text: () =>
      `The #friend:patron# needs help transporting an important {#{neutral|friend}:ally:actor#|item|resources} through unsafe territory.`,
    nested: 0.2,
    combat: 0.8
  },
  infiltration: {
    tag: 'infiltration',
    text: () =>
      `Infiltrate a location and {gather plot sensitive information from the occupants|steal an important object}.`,
    combat: 0.2
  },
  observe: {
    tag: 'observe',
    text: () =>
      `Observe a location where it is suspected that plot sensitive information might be revealed.`
  },
  persuade: {
    tag: 'persuade',
    text: () =>
      `Convince ({negotiate|intimidate|trick|bribe}) an #neutral:ally:actor# to {reveal plot sensitive information|act in support of the objective}.`,
    nested: 0.2
  },
  preparation: {
    tag: 'preparation',
    text: () =>
      `Prepare for the next phase of the objective ({gather supplies|consult allies|compile evidence|plan strategy}).`,
    nested: 0.2
  },
  recruit: {
    tag: 'recruit',
    text: () =>
      `Convince an #neutral:ally:actor# to assist with the #friend:patron# with the problem.`,
    nested: 0.2
  },
  research: {
    tag: 'research',
    text: () =>
      `{Search a location for plot sensitive information|Determine the {location|identity} of actor who might have plot sensitive information}.`,
    nested: 0.2,
    combat: 0.2
  },
  sabotage: {
    tag: 'sabotage',
    text: () =>
      `Sabotage {resources|information|allies} of the #enemy:patron:foe# so that it betrays their attempted use of it.`,
    nested: 0.2,
    combat: 0.5
  },
  smuggle: {
    tag: 'smuggle',
    text: () =>
      `The patron needs an important {#{neutral|friend}:ally:actor#|item} transported to a location without being noticed.`,
    nested: 0.2,
    combat: 0.2
  },
  support: {
    tag: 'support',
    text: () =>
      `Support an #neutral:ally:actor# who's working against the foe for their own reasons.`,
    nested: 0.2,
    combat: 0.2
  },
  surveillance: {
    tag: 'surveillance',
    text: () =>
      `Shadow an #{neutral|enemy}:ally:actor# without being notice to see if they reveal plot sensitive information.`,
    combat: 0.2
  },
  traitor: {
    tag: 'traitor',
    text: () => `Identify a suspected traitor amongst the patron's allies.`,
    nested: 0.2,
    combat: 0.2
  },
  waylay: {
    tag: 'waylay',
    text: () =>
      `A plot sensitive {object|#{neutral|enemy}:ally:actor#} is being transported and needs to be intercepted.`,
    combat: 0.5
  },
  weaken: {
    tag: 'weaken',
    text: () =>
      `{Destroy|Plunder} {an object|information|a location} that is vital to the foe's plans.`,
    nested: 0.2,
    combat: 0.5
  }
}

export const task__spawn = (params: { thread: Thread; blacklist: Task['tag'][] }) => {
  const { blacklist } = params
  const task = window.dice.choice(
    Object.values(task__definition).filter(task => !blacklist?.includes?.(task.tag))
  )
  const text = window.dice.spin(task.text())
  return {
    tag: task.tag,
    text
  }
}
