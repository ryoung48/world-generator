import {
  skillGate__coastal,
  skillGate__constitution,
  skillGate__dexterity,
  skillGate__nobility,
  skillGate__nonPoor,
  skillGate__strength,
  skillGate__wisdom
} from '../checks'
import { ActorSkill } from '../types'
import { WorldlySkill } from '.'

export const actorSkills__worldly: Record<WorldlySkill, ActorSkill> = {
  'animal (handling)': {
    key: 'animal (handling)'
  },
  'animal (riding)': {
    key: 'animal (riding)',
    valid: skillGate__nonPoor
  },
  athletics: {
    key: 'athletics',
    valid: params => skillGate__strength(params) * skillGate__constitution(params)
  },
  baking: {
    key: 'baking',
    valid: 0
  },
  brawling: {
    key: 'brawling'
  },
  brewing: {
    key: 'brewing',
    valid: skillGate__nobility
  },
  carpentry: {
    key: 'carpentry',
    valid: 0
  },
  cooking: {
    key: 'cooking'
  },
  cultivation: {
    key: 'cultivation'
  },
  distillation: {
    key: 'distillation',
    valid: skillGate__nobility
  },
  embalming: {
    key: 'embalming',
    valid: 0
  },
  fletching: {
    key: 'fletching',
    valid: 0
  },
  folklore: {
    key: 'folklore'
  },
  housekeeping: {
    key: 'housekeeping',
    valid: 0
  },
  logistics: {
    key: 'logistics',
    valid: 0
  },
  marksman: {
    key: 'marksman',
    valid: skillGate__dexterity
  },
  martial: {
    key: 'martial',
    valid: skillGate__constitution
  },
  masonry: {
    key: 'masonry',
    valid: 0
  },
  medicine: {
    key: 'medicine'
  },
  milling: {
    key: 'milling',
    valid: 0
  },
  mining: {
    key: 'mining',
    valid: 0
  },
  perception: {
    key: 'perception',
    valid: skillGate__wisdom
  },
  seafaring: {
    key: 'seafaring',
    valid: skillGate__coastal
  },
  streetwise: {
    key: 'streetwise',
    valid: ({ context }) => (context.urban ? 1 : 0)
  },
  survival: {
    key: 'survival',
    valid: ({ context, actor }) => skillGate__constitution({ context, actor })
  },
  tactics: {
    key: 'tactics',
    valid: 0
  },
  vintner: {
    key: 'vintner',
    valid: skillGate__nobility
  },
  wagoneering: {
    key: 'wagoneering',
    valid: 0
  },
  woodcutting: {
    key: 'woodcutting',
    valid: 0
  }
}
