import { skillGate__dexterity } from '../common/checks'
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
  carving: {
    key: 'carving'
  },
  cobbling: {
    key: 'cobbling',
    valid: 0
  },
  composition: {
    key: 'composition',
    parent: 'music',
    valid: 0
  },
  dancing: {
    key: 'dancing'
  },
  engraving: {
    key: 'engraving',
    valid: 0
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
  instrumental: {
    key: 'instrumental',
    parent: 'music'
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
  music: {
    key: 'music',
    valid: 0
  },
  painting: {
    key: 'painting'
  },
  pottery: {
    key: 'pottery'
  },
  scribing: {
    key: 'scribing',
    valid: 0
  },
  sculpting: {
    key: 'sculpting'
  },
  singing: {
    key: 'singing',
    parent: 'music'
  },
  sketching: {
    key: 'sketching'
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
