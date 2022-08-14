import { profession__social_class } from '../../professions'
import { skill_gate__intellect, skill_gate__non_poor } from '../common/checks'
import { ActorSkill } from '../types'
import { academic_skill } from '.'
import { language_skill_checks } from './worldly'

export const actor_skills__academic: Record<academic_skill, ActorSkill> = {
  accounting: {
    key: 'accounting',
    valid: ({ actor }) => (profession__social_class(actor.occupation.key) === 'upper' ? 0.1 : 0)
  },
  alchemy: {
    key: 'alchemy',
    valid: skill_gate__intellect
  },
  arcana: {
    key: 'arcana',
    valid: skill_gate__intellect
  },
  astronomy: {
    key: 'astronomy',
    valid: params => skill_gate__intellect(params) * skill_gate__non_poor(params)
  },
  divination: {
    key: 'divination',
    valid: skill_gate__intellect
  },
  history: {
    key: 'history',
    valid: skill_gate__intellect
  },
  investigation: {
    key: 'investigation',
    valid: skill_gate__intellect
  },
  law: {
    key: 'law',
    valid: 0
  },
  linguistics: {
    key: 'linguistics',
    ...language_skill_checks,
    valid: 0
  },
  mechanics: {
    key: 'mechanics',
    valid: params => skill_gate__intellect(params) * skill_gate__non_poor(params)
  },
  nature: {
    key: 'nature',
    valid: skill_gate__intellect
  },
  philosophy: {
    key: 'philosophy',
    valid: params => skill_gate__intellect(params) * skill_gate__non_poor(params)
  },
  theology: {
    key: 'theology'
  }
}
