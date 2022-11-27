import { skillGate__dexterity } from '../checks'
import { ActorSkill } from '../types'
import { ArtisticSkill } from '.'

export const actorSkills__artistic: Record<ArtisticSkill, ActorSkill> = {
  acrobatics: {
    key: 'acrobatics',
    valid: skillGate__dexterity
  },
  acting: {
    key: 'acting'
  },
  basketry: {
    key: 'basketry',
    valid: 0
  },
  blacksmithing: {
    key: 'blacksmithing',
    valid: 0
  },
  bookbinding: {
    key: 'bookbinding',
    valid: 0
  },
  cobbling: {
    key: 'cobbling',
    valid: 0
  },
  'composition (music)': {
    key: 'composition (music)',
    valid: 0
  },
  dancing: {
    key: 'dancing'
  },
  fletching: {
    key: 'fletching',
    valid: 0
  },
  'hair styling': {
    key: 'hair styling',
    valid: 0
  },
  glazing: {
    key: 'glazing',
    valid: 0
  },
  'instrument (music)': {
    key: 'instrument (music)'
  },
  jeweling: {
    key: 'jeweling',
    valid: 0
  },
  knitting: {
    key: 'knitting'
  },
  leatherworking: {
    key: 'leatherworking',
    valid: 0
  },
  literature: {
    key: 'literature'
  },
  painting: {
    key: 'painting'
  },
  pottery: {
    key: 'pottery',
    valid: 0
  },
  scribing: {
    key: 'scribing',
    valid: 0
  },
  sculpting: {
    key: 'sculpting',
    valid: 0
  },
  singing: {
    key: 'singing'
  },
  tailoring: {
    key: 'tailoring',
    valid: 0
  },
  weaving: {
    key: 'weaving',
    valid: 0
  },
  whitesmithing: {
    key: 'whitesmithing',
    valid: 0
  }
}
