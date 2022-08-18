import { Actor } from '../../../types'
import { profession__socialClass } from '../../professions'
import { ValidActorSkill } from '../types'

interface GateParams<T extends string> {
  attr: T
  floor: number
}

const attributeGate =
  ({ attr, floor }: GateParams<keyof Actor['attributes']>): ValidActorSkill =>
  ({ actor }) =>
    actor.attributes[attr] >= floor ? 1 : 0.1

export const skillGate__intellect = attributeGate({ attr: 'intellect', floor: 10 })
export const skillGate__charisma = attributeGate({ attr: 'charisma', floor: 10 })
export const skillGate__dexterity = attributeGate({ attr: 'dexterity', floor: 10 })
export const skillGate__constitution = attributeGate({ attr: 'constitution', floor: 10 })
export const skillGate__strength = attributeGate({ attr: 'strength', floor: 10 })

const personaHighGate =
  ({ attr, floor }: GateParams<keyof Actor['persona']>): ValidActorSkill =>
  ({ actor }) =>
    actor.persona[attr] > floor ? 1 : 0
const personaLowGate =
  ({ attr, floor }: GateParams<keyof Actor['persona']>): ValidActorSkill =>
  ({ actor }) =>
    actor.persona[attr] <= floor ? 1 : 0

export const skillGate__social = personaHighGate({ attr: 'social', floor: 0.5 })
export const skillGate__chaotic = personaLowGate({ attr: 'lawful', floor: 0.5 })

export const skillGate__coastal: ValidActorSkill = ({ context }) => (context.coastal ? 1 : 0)
export const skillGate__tribal: ValidActorSkill = ({ actor }) =>
  window.world.cultures[actor.culture].civilized ? 0 : 1
export const skillGate__civil: ValidActorSkill = ({ actor }) =>
  window.world.cultures[actor.culture].civilized ? 1 : 0
export const skillGate__nobility: ValidActorSkill = ({ actor }) => {
  const social = profession__socialClass(actor.occupation.key)
  return social === 'upper' ? 0.5 : social === 'middle' ? 0.1 : 0
}

export const skillGate__nonPoor: ValidActorSkill = ({ actor }) =>
  profession__socialClass(actor.occupation.key) === 'lower' ? 0 : 1
