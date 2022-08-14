import { Actor } from '../../../types'
import { profession__social_class } from '../../professions'
import { ValidActorSkill } from '../types'

interface GateParams<T extends string> {
  attr: T
  floor: number
}

const attribute_gate =
  ({ attr, floor }: GateParams<keyof Actor['attributes']>): ValidActorSkill =>
  ({ actor }) =>
    actor.attributes[attr] >= floor ? 1 : 0.1

export const skill_gate__intellect = attribute_gate({ attr: 'intellect', floor: 10 })
export const skill_gate__charisma = attribute_gate({ attr: 'charisma', floor: 10 })
export const skill_gate__dexterity = attribute_gate({ attr: 'dexterity', floor: 10 })
export const skill_gate__constitution = attribute_gate({ attr: 'constitution', floor: 10 })
export const skill_gate__strength = attribute_gate({ attr: 'strength', floor: 10 })

const persona_high_gate =
  ({ attr, floor }: GateParams<keyof Actor['persona']>): ValidActorSkill =>
  ({ actor }) =>
    actor.persona[attr] > floor ? 1 : 0
const persona_low_gate =
  ({ attr, floor }: GateParams<keyof Actor['persona']>): ValidActorSkill =>
  ({ actor }) =>
    actor.persona[attr] <= floor ? 1 : 0

export const skill_gate__social = persona_high_gate({ attr: 'social', floor: 0.5 })
export const skill_gate__chaotic = persona_low_gate({ attr: 'lawful', floor: 0.5 })

export const skill_gate__coastal: ValidActorSkill = ({ context }) => (context.coastal ? 1 : 0)
export const skill_gate__tribal: ValidActorSkill = ({ actor }) =>
  window.world.cultures[actor.culture].civilized ? 0 : 1
export const skill_gate__civil: ValidActorSkill = ({ actor }) =>
  window.world.cultures[actor.culture].civilized ? 1 : 0
export const skill_gate__nobility: ValidActorSkill = ({ actor }) => {
  const social = profession__social_class(actor.occupation.key)
  return social === 'upper' ? 0.5 : social === 'middle' ? 0.1 : 0
}

export const skill_gate__non_poor: ValidActorSkill = ({ actor }) =>
  profession__social_class(actor.occupation.key) === 'lower' ? 0 : 1
