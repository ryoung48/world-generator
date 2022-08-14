import { skill_gate__chaotic, skill_gate__charisma, skill_gate__social } from '../common/checks'
import { ActorSkill } from '../types'
import { social_skill } from '.'

export const actor_skills__social: Record<social_skill, ActorSkill> = {
  bluff: {
    key: 'bluff',
    valid: skill_gate__chaotic
  },
  carouse: {
    key: 'carouse',
    valid: params => skill_gate__charisma(params) * skill_gate__social(params)
  },
  charm: {
    key: 'charm'
  },
  etiquette: {
    key: 'etiquette',
    valid: skill_gate__charisma
  },
  insight: {
    key: 'insight'
  },
  intimidate: {
    key: 'intimidate'
  },
  intrigue: {
    key: 'intrigue',
    valid: skill_gate__charisma
  },
  negotiate: {
    key: 'negotiate'
  },
  oratory: {
    key: 'oratory',
    valid: params => skill_gate__charisma(params) * skill_gate__social(params)
  },
  teaching: {
    key: 'teaching'
  }
}
