import { profession__socialClass } from '../../professions'
import { skillGate__intellect, skillGate__nonPoor } from '../common/checks'
import { ActorSkill } from '../types'
import { AcademicSkill } from '.'
import { languageSkillChecks } from './worldly'

export const actorSkills__academic: Record<AcademicSkill, ActorSkill> = {
  accounting: {
    key: 'accounting',
    valid: ({ actor }) => (profession__socialClass(actor.occupation.key) === 'upper' ? 0.1 : 0)
  },
  alchemy: {
    key: 'alchemy',
    valid: skillGate__intellect
  },
  arcana: {
    key: 'arcana',
    valid: skillGate__intellect
  },
  astronomy: {
    key: 'astronomy',
    valid: params => skillGate__intellect(params) * skillGate__nonPoor(params)
  },
  divination: {
    key: 'divination',
    valid: skillGate__intellect
  },
  history: {
    key: 'history',
    valid: skillGate__intellect
  },
  investigation: {
    key: 'investigation',
    valid: skillGate__intellect
  },
  law: {
    key: 'law',
    valid: 0
  },
  linguistics: {
    key: 'linguistics',
    ...languageSkillChecks,
    valid: 0
  },
  mechanics: {
    key: 'mechanics',
    valid: params => skillGate__intellect(params) * skillGate__nonPoor(params)
  },
  nature: {
    key: 'nature',
    valid: skillGate__intellect
  },
  philosophy: {
    key: 'philosophy',
    valid: params => skillGate__intellect(params) * skillGate__nonPoor(params)
  },
  theology: {
    key: 'theology'
  }
}
