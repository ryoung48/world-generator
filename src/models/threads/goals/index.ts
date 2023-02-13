import { hub__fillSite, hub__isVillage, hub__site } from '../../regions/hubs'
import { Province } from '../../regions/provinces/types'
import { actor__fill, actors } from '../actors'
import { Thread } from '../types'
import { Goal } from './types'

const goal__definition: Record<Goal['tag'], Goal> = {
  blackmail: {
    tag: 'blackmail',
    text: () =>
      `A ${actors.rival()} is using strong leverage ({secrets|threats|debts}) to force support from {an actor important to |}the ${
        actors.patron
      }. The ${actors.patron} is looking for associates to help remove this leverage.`
  },
  crime: {
    tag: 'crime',
    text: () => {
      const crime = '{theft|murder|abduction|assault|blackmail|fraud|vandalism}'
      return `The ${actors.patron} {wants to hire associates to investigate {an old|a recent} crime (${crime})|has been framed for a crime (${crime}) and needs help proving their innocence}.`
    }
  },
  conflict: {
    tag: 'conflict',
    text: () =>
      `There is an ongoing conflict between two actors. The ${actors.patron} wants help {supporting one side against the other|prolonging the conflict for as long as possible|finding a diplomatic solution to the conflict|destroying both sides of the conflict}.`
  },
  cursed: {
    tag: 'cursed',
    text: () =>
      `The ${actors.patron} wants help lifting a curse that is affecting an important {place|actor}.`
  },
  folly: {
    tag: 'folly',
    text: () =>
      `An actor important to the ${actors.patron} has {suffered a major {defeat|setback}|fallen to vice ({vengeance|lust|greed|paranoia|alcohol|drugs|gambling|debts})}. The ${actors.patron} wants help {concealing|fixing} this error.`
  },
  eldritch: {
    tag: 'eldritch',
    text: () =>
      `The ${actors.patron} is looking for assistance slaying a monstrous fiend that is terrorizing the ${hub__site}.`
  },
  heist: {
    tag: 'heist',
    text: () =>
      `The ${
        actors.patron
      } is {looking for associates to steal {a valuable {relic|artifact}|important {supplies|information}} from a ${actors.rival()}|expecting hostiles in the employ of a ${actors.rival()} to make an attempt at {stealing|destroying} {a valuable {relic|artifact}|important {supplies|information}} and is looking for guards to defend against the threat}.`
  },
  intrigue: {
    tag: 'intrigue',
    text: () =>
      `The ${
        actors.patron
      } suspects a ${actors.rival()} of a fault ({corruption|adultery|seduction|treachery|theft|incompetence|heresy}). Find evidence to expose them.`
  },
  mystery: {
    tag: 'mystery',
    text: () =>
      `The ${actors.patron} needs help {locating|determining the fate of} a missing {${actors.neutral}|object|shipment}.`
  },
  negotiate: {
    tag: 'negotiate',
    text: () =>
      `The ${actors.patron} wants help convincing an ${actors.neutral} to agree with the terms of a {compromise|exchange|contract}.`
  },
  outlaw: {
    tag: 'outlaw',
    text: () =>
      `The ${
        actors.patron
      } is looking for assistance {slaying|apprehending} {an infamous|a nefarious} ${actors.rival(
        'criminal'
      )}.`
  },
  rescue: {
    tag: 'rescue',
    text: () =>
      `The ${actors.patron} is looking for associates to help a ${actors.friend({
        label: 'friendly actor'
      })} escape from a dangerous situation ({imprisonment|assault}).`
  },
  resources: {
    tag: 'resources',
    text: () =>
      `The ${actors.patron} needs help gathering rare reagents from the nearby wilderness. The terrain is known to be {treacherous|inhabited by hostiles}.`
  },
  shipment: {
    tag: 'shipment',
    text: () =>
      `The ${
        actors.patron
      } {is worried about a shipment of supplies that should have arrived {days|weeks} ago. Hostiles have been scourging the road lately and might be responsible for the disappearance|is looking for guards to safeguard a shipment of goods in route to a {neighboring|remote} site. The road is known to be plagued by {fearsome beasts|hostiles in the employment of a ${actors.rival()}}}.`
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
  const goal = window.dice.choice(
    Object.values(goal__definition).filter(goal => !blacklist?.includes?.(goal.tag))
  )
  const location = window.world.provinces[thread.location]
  const parent = thread.parent !== undefined
  const text = hub__fillSite({
    text: actor__fill({
      text: `You ${
        parent ? `have been referred to` : hook(location)
      } a {concerned|desperate|potential} ${actors.patron}. ${goal.text()}`,
      thread
    }),
    hub: location.hub
  })
  return {
    tag: goal.tag,
    text
  }
}
