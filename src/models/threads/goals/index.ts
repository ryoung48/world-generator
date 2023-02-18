import { hub__fillSite, hub__isVillage } from '../../regions/hubs'
import { Province } from '../../regions/provinces/types'
import { decorateText } from '../../utilities/text/decoration'
import { actor__fill, actors } from '../actors'
import { Thread } from '../types'
import { Goal } from './types'

const goal__definition: Record<Goal['tag'], Goal> = {
  blackmail: {
    tag: 'blackmail',
    text: () =>
      `A ${actors.rival()} is using ${decorateText({
        label: 'strong leverage',
        tooltip: '{secrets|threats|debts}'
      })} to force support from {an actor important to |}the ${actors.patron()}. The ${actors.patron()} is looking for associates to help remove this leverage.`
  },
  crime: {
    tag: 'crime',
    text: () => {
      const crime = decorateText({
        label: 'crime',
        tooltip: '{theft|murder|abduction|assault|blackmail|fraud|vandalism}'
      })
      return `The ${actors.patron()} {wants to hire associates to investigate {an old|a recent} ${crime}|has been framed for a ${crime} and needs help proving their innocence}.`
    }
  },
  cursed: {
    tag: 'cursed',
    text: () =>
      `The ${actors.patron()} wants help lifting a curse that is affecting an important {place|${actors.friend(
        { label: 'actor' }
      )}}.`
  },
  folly: {
    tag: 'folly',
    text: () =>
      `An ${actors.friend({
        label: 'actor'
      })} important to the ${actors.patron()} has {suffered a major {defeat|setback}|fallen to ${decorateText(
        {
          label: 'vice',
          tooltip: '{vengeance|lust|greed|paranoia|alcohol|drugs|gambling|debts}'
        }
      )}}. The ${actors.patron()} wants help {concealing|fixing} this error.`
  },
  heist: {
    tag: 'heist',
    text: () =>
      `The ${actors.patron()} is {looking for associates to steal {a valuable {relic|artifact}|important {supplies|information}} from a ${actors.rival()}|expecting hostiles in the employ of a ${actors.rival()} to make an attempt at {stealing|destroying} {a valuable {relic|artifact}|important {supplies|information}} and is looking for guards to defend against the threat}.`
  },
  intrigue: {
    tag: 'intrigue',
    text: () =>
      `The ${actors.patron()} suspects a ${actors.rival()} of a ${decorateText({
        label: 'fault',
        tooltip: '{corruption|adultery|seduction|treachery|theft|incompetence|heresy}'
      })}. Find evidence to expose them.`
  },
  mystery: {
    tag: 'mystery',
    text: () =>
      `The ${actors.patron()} needs help {locating|determining the fate of} a missing {${actors.neutral()}|object|shipment}.`
  },
  negotiate: {
    tag: 'negotiate',
    text: () =>
      `The ${actors.patron()} wants help convincing an ${actors.neutral()} to agree with the terms of a {compromise|exchange|contract}.`
  },
  rescue: {
    tag: 'rescue',
    text: () =>
      `The ${actors.patron()} is looking for associates to help a ${actors.friend({
        label: 'friendly actor'
      })} escape from a ${decorateText({
        label: 'dangerous situation',
        tooltip: '{imprisonment|assault}'
      })}.`
  }
}

const hook = (loc: Province) => {
  return window.dice.weightedChoice([
    {
      w: 2,
      v: 'are approached by a courier with a message regarding'
    },
    { w: 1, v: 'overhear {rumors|gossip} at {a local tavern|the local market} regarding' },
    {
      w: hub__isVillage(loc.hub) ? 0 : 1,
      v: `encounter a notice board with a note regarding`
    },
    { w: 1, v: 'stumble onto a group of {locals|citizens} arguing about' }
  ])
}

export const goal__spawn = (params: { thread: Thread; blacklist: Goal['tag'][] }) => {
  const { blacklist, thread } = params
  const dist = Object.values(goal__definition).map(goal => {
    const existing =
      window.world.threads.filter(
        other => thread.location === other.location && other.goal?.tag === goal.tag
      ).length * 10
    return {
      w: blacklist?.includes?.(goal.tag) ? 0 : 1 / Math.max(1, existing),
      v: goal
    }
  })
  const goal = window.dice.weightedChoice(dist)
  const location = window.world.provinces[thread.location]
  const parent = thread.parent !== undefined
  const text = hub__fillSite({
    text: actor__fill({
      text: `You ${
        parent ? `have been referred to` : hook(location)
      } a {concerned|desperate|potential} ${actors.patron()}. ${goal.text({ thread })}`,
      thread
    }),
    hub: location.hub
  })
  return {
    tag: goal.tag,
    text
  }
}
