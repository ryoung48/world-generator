import { Goal } from './types'

export const goal__templates: Record<Goal['tag'], Goal> = {
  retrieval: {
    tag: 'retrieval',
    text: () =>
      `An important item${
        window.dice.random > 0.8 ? ' was stolen and' : ''
      } needs to be acquired from ${window.dice.choice(
        'friendly|neutral|hostile'.split('|')
      )} ${window.dice.choice('location|person'.split('|'))}.`,
    weight: 2
  },
  heist: {
    tag: 'heist',
    text: () => {
      const stolen = window.dice.random > 0.8
      return `An important item${stolen ? ' was stolen and' : ''} needs to be stolen${
        stolen ? ' back' : ''
      } from ${window.dice.choice('friendly|neutral|hostile'.split('|'))} ${window.dice.choice(
        'location|person'.split('|')
      )}.`
    },
    weight: 1
  },
  rescue: {
    tag: 'rescue',
    text: () => 'An important person needs to be rescued from location.',
    weight: 1
  },
  chase: {
    tag: 'rescue',
    text: () => 'An important person is trying to escape and needs to be apprehended.',
    weight: 1
  },
  bounty: {
    tag: 'bounty',
    text: () =>
      `An important person needs to be ${
        window.dice.flip ? 'apprehended' : `eliminated${window.dice.flip ? ' (stealthily)' : ''}`
      }.`,
    weight: 1
  },
  defend: {
    tag: 'defend',
    text: () => `An important location is in peril and needs to be protected.`,
    weight: 1
  },
  guard: {
    tag: 'guard',
    text: () => `An important person is in peril and needs to be protected.`,
    weight: 1
  },
  destroy: {
    tag: 'destroy',
    text: () =>
      `A dangerous ${window.dice.choice(
        'beast|primordial|spirit'.split('|')
      )} lurks at location and needs to be dealt with.`,
    weight: 1
  },
  escort: {
    tag: 'escort',
    text: () => `An important person needs to be safely transported to location.`,
    weight: 1
  },
  deliver: {
    tag: 'deliver',
    text: () => `An important item needs to be safely transported to location.`,
    weight: 2
  },
  hijack: {
    tag: 'hijack',
    text: () =>
      `An ${window.dice.choice('important|dangerous|valuable'.split('|'))} ${
        window.dice.random > 0.8 ? 'person' : 'item'
      } needs to be intercepted in transit to location.`,
    weight: 1
  },
  capture: {
    tag: 'capture',
    text: () =>
      `A ${window.dice.choice(
        'mysterious|dangerous|corrupted|abandoned|cursed'.split('|')
      )} location needs to be cleared.`,
    weight: 1
  },
  scout: {
    tag: 'scout',
    text: () => `Explore and observe a pivotal location in preparation for an event.`,
    weight: 1
  },
  persuade: {
    tag: 'persuade',
    text: () =>
      `Convince a person to ${window.dice.choice([
        'assist patron',
        'not assist rival',
        'believe something untrue',
        'believe something true'
      ])}.`,
    weight: 2
  },
  meeting: {
    tag: 'meeting',
    text: () =>
      `Meet person at location and get ${window.dice.choice('information|item'.split('|'))}.`,
    non_empty: true,
    weight: 2
  },
  discord: {
    tag: 'discord',
    text: () =>
      `Spread ${window.dice.choice(
        'slanderous|controversial|harmful'.split('|')
      )} information that will sow chaos for rival.`,
    weight: 1
  },
  distract: {
    tag: 'distract',
    text: () => `Distract person while some other event takes place.`,
    weight: 1
  },
  infiltrate: {
    tag: 'infiltrate',
    text: () =>
      `Stealthily ${window.dice.choice([
        'enter location',
        'attend event'
      ])} and gather information.`,
    weight: 1
  },
  investigate: {
    tag: 'investigate',
    text: () =>
      `Gather information about an ${
        window.dice.flip ? `${window.dice.choice('missing|unknown'.split('|'))} ` : ''
      } ${window.dice.choice('item|person|place|event'.split('|'))}${
        window.dice.random > 0.8 ? ' (stealthily)' : ''
      }.`,
    weight: 1
  },
  escape: {
    tag: 'escape',
    text: () =>
      `The group needs to escape from a ${window.dice.choice(
        'dangerous|misunderstood'.split('|')
      )} situation.`,
    non_empty: true,
    weight: 1
  },
  survive: {
    tag: 'survive',
    text: () =>
      `The group needs to escape from a ${window.dice.choice(
        'dangerous|misunderstood'.split('|')
      )} situation.`,
    non_empty: true,
    weight: 1
  },
  prevent: {
    tag: 'prevent',
    text: () =>
      `A ${window.dice.choice(
        'dangerous|precipitous|portentous'.split('|')
      )} event is about to happen and needs to be prevented.`,
    weight: 1
  },
  promote: {
    tag: 'promote',
    text: () =>
      `Ensure that a ${window.dice.choice(
        'dangerous|precipitous|portentous'.split('|')
      )} event takes place.`,
    weight: 1
  },
  repair: {
    tag: 'repair',
    text: () =>
      `A critical ${window.dice.choice(
        'item|place'.split('|')
      )} is damaged and needs to be repaired.`,
    weight: 1
  },
  create: {
    tag: 'create',
    text: () =>
      `A critical ${window.dice.choice(
        'item|place'.split('|')
      )} needs to be built to achieve a goal.`,
    weight: 1
  }
}
