import { Thread } from '../types'
import { Goal } from './types'

const goal__definition: Record<Goal['tag'], Goal> = {
  bounty: {
    tag: 'bounty',
    text: () => {
      const monster = window.dice.flip
      const target = monster ? 'monster' : 'criminal'
      return `A dangerous ${target} needs to be ${monster ? 'slain' : 'apprehended'}.`
    }
  },
  blackmail: {
    tag: 'blackmail',
    text: () =>
      `A #enemy:{patron|ally}:foe# is using strong leverage ({secrets|threats|debts}) to force support from {an #{neutral|friend}:ally:actor# important to |}the #friend:patron#. Help the #friend:patron# remove this leverage.`
  },
  crime: {
    tag: 'crime',
    text: () => {
      const crime = '{theft|murder|abduction|assault|blackmail|fraud|vandalism}'
      return `{Investigate an {old|recent} crime (${crime}) that has affected the #friend:patron#|The #friend:patron# has been framed for a crime (${crime}) and needs help proving their innocence}.`
    }
  },
  conflict: {
    tag: 'conflict',
    text: () =>
      `There is an ongoing conflict between two actors. The patron wants help {supporting one side against the other|prolonging the conflict for as long as possible|finding a diplomatic solution to the conflict|destroying both sides of the conflict}.`
  },
  cursed: {
    tag: 'cursed',
    text: () =>
      `Lift a curse that is affecting a {place|#{neutral|friend}:ally:actor#} that the #friend:patron# cares about.`
  },
  event: {
    tag: 'event',
    text: () =>
      `A {precipitous|portentous} event ({violent|non-violent}) is about to happen and needs to be prevented.`
  },
  folly: {
    tag: 'folly',
    text: () =>
      `An #{neutral|friend}:ally:actor# important to the #friend:patron# has {suffered a major {defeat|setback}|fallen to vice ({vengeance|lust|greed|paranoia|alcohol|drugs|gambling|debts})}. Help the #friend:patron# {conceal|fix} this error.`
  },
  heist: {
    tag: 'heist',
    text: () =>
      `{Acquire {information|items} for the #friend:patron# without being noticed{ and replace with replica|}|Prevent important {information|items} from being stolen}.`
  },
  intrigue: {
    tag: 'intrigue',
    text: () =>
      `The #friend:patron# suspects an #enemy:{ally|patron}:actor# of a fault ({corruption|adultery|seduction|treachery|theft|incompetence|heresy}). Find evidence to expose them.`
  },
  mystery: {
    tag: 'mystery',
    text: () => `Locate a missing ({friendly|hostile|neutral}) {actor|object|shipment}.`
  },
  negotiate: {
    tag: 'negotiate',
    text: () =>
      `Convince an #{neutral|friend}:ally:actor# to agree with the terms of a {compromise|exchange|contract} that will benefit the #friend:patron#.`
  },
  rescue: {
    tag: 'rescue',
    text: () =>
      `Help an #{neutral|friend}:ally:actor# that is important to the #friend:patron# escape from a dangerous situation ({imprisonment|assault}).`
  },
  retrieval: {
    tag: 'retrieval',
    text: () =>
      `Help the #friend:patron# acquire the resources needed to {{build|repair} an essential {structure|item}|overcome a major {shortage|obstacle}}.`
  }
}

export const goal__spawn = (params: { thread: Thread; blacklist: Goal['tag'][] }) => {
  const { blacklist } = params
  const goal = window.dice.choice(
    Object.values(goal__definition).filter(goal => !blacklist?.includes?.(goal.tag))
  )
  const text = window.dice.spin(goal.text())
  return {
    tag: goal.tag,
    text
  }
}
