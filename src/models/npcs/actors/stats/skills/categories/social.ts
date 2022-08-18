import { skillGate__chaotic, skillGate__charisma, skillGate__social } from '../common/checks'
import { ActorSkill } from '../types'
import { SocialSkill } from '.'

export const actorSkills__social: Record<SocialSkill, ActorSkill> = {
  bluff: {
    key: 'bluff',
    valid: skillGate__chaotic
  },
  carouse: {
    key: 'carouse',
    valid: params => skillGate__charisma(params) * skillGate__social(params)
  },
  charm: {
    key: 'charm'
  },
  etiquette: {
    key: 'etiquette',
    valid: skillGate__charisma
  },
  insight: {
    key: 'insight'
  },
  intimidate: {
    key: 'intimidate'
  },
  intrigue: {
    key: 'intrigue',
    valid: skillGate__charisma
  },
  negotiate: {
    key: 'negotiate'
  },
  oratory: {
    key: 'oratory',
    valid: params => skillGate__charisma(params) * skillGate__social(params)
  },
  teaching: {
    key: 'teaching'
  }
}
