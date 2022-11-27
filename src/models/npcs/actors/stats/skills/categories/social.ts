import {
  skillGate__chaotic,
  skillGate__charisma,
  skillGate__nonPoor,
  skillGate__social,
  skillGate__wisdom
} from '../checks'
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
  debate: {
    key: 'debate',
    valid: skillGate__charisma
  },
  etiquette: {
    key: 'etiquette',
    valid: params => skillGate__charisma(params) * skillGate__nonPoor(params)
  },
  insight: {
    key: 'insight',
    valid: skillGate__wisdom
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
