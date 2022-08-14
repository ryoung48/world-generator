import { location__terrain } from '../../../../../regions/locations/environment'
import { Loc } from '../../../../../regions/locations/types'
import { province__hub } from '../../../../../regions/provinces'
import { terrain_types } from '../../../../../world/climate/terrain'
import { Actor } from '../../../types'
import { actor_skill__not_master, actor_skills__apply } from '../common/apply'
import {
  skill_gate__coastal,
  skill_gate__constitution,
  skill_gate__dexterity,
  skill_gate__nobility,
  skill_gate__strength
} from '../common/checks'
import { fluency__apply_skill, fluency__languages_exist } from '../fluency'
import { ActorSkill } from '../types'
import { actor_skills, worldly_skill } from '.'

export const language_skill_checks: Omit<ActorSkill, 'key'> = {
  valid: ({ actor, context }) => (fluency__languages_exist({ actor, context }) ? 1 : 0),
  apply: ({ actor, exp, loc }) => fluency__apply_skill({ actor, exp, loc })
}

const translate_terrain = (terrain: terrain_types): actor_skills => {
  if (terrain === 'Arctic') return 'arctic'
  else if (terrain === 'Marsh') return 'marsh'
  else if (terrain === 'Forest') return 'forest'
  else if (terrain === 'Plains') return 'plains'
  else if (terrain === 'Desert') return 'desert'
  else if (terrain === 'Mountains') return 'mountains'
  else throw new Error(`bad survival application: ${terrain}`)
}

const valid_terrain = (params: { actor: Actor; loc: Loc }) => {
  const { actor, loc } = params
  const region = window.world.regions[loc.region]
  return region.regional.provinces
    .map(p => {
      const province = window.world.provinces[p]
      const { terrain } = location__terrain(province__hub(province))
      return { w: loc.idx === province.hub ? 10 : 1, v: translate_terrain(terrain) }
    })
    .filter(skill => actor_skill__not_master({ actor, key: skill.v }))
}

export const actor_skills__worldly: Record<worldly_skill, ActorSkill> = {
  'animal handling': {
    key: 'animal handling'
  },
  architecture: {
    key: 'architecture',
    valid: 0
  },
  athletics: {
    key: 'athletics',
    valid: params => skill_gate__strength(params) * skill_gate__constitution(params)
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
    valid: skill_gate__nobility
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
    valid: skill_gate__nobility
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
  'living language': {
    key: 'living language',
    ...language_skill_checks
  },
  logistics: {
    key: 'logistics',
    valid: 0
  },
  marksman: {
    key: 'marksman',
    valid: skill_gate__dexterity
  },
  martial: {
    key: 'martial',
    valid: skill_gate__constitution
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
    key: 'perception'
  },
  seafaring: {
    key: 'seafaring',
    valid: skill_gate__coastal
  },
  streetwise: {
    key: 'streetwise',
    valid: ({ context }) => (context.urban ? 1 : 0)
  },
  survival: {
    key: 'survival',
    valid: ({ context, actor }) => {
      const loc = window.world.locations[context.idx]
      const terrain = valid_terrain({ actor, loc })
      return terrain.length > 0 ? skill_gate__constitution({ context, actor }) : 0
    },
    apply: ({ loc, actor, exp }) => {
      const location = window.world.locations[loc]
      const terrain = window.dice.weighted_choice(valid_terrain({ actor, loc: location }))
      actor_skills__apply({ actor, exp, key: terrain, loc })
    }
  },
  vintner: {
    key: 'vintner',
    valid: skill_gate__nobility
  },
  wagoneering: {
    key: 'wagoneering',
    valid: 0
  },
  woodcutting: {
    key: 'woodcutting',
    valid: 0
  },
  forest: {
    key: 'forest',
    parent: 'survival',
    valid: 0,
    derived: true
  },
  plains: {
    key: 'plains',
    parent: 'survival',
    valid: 0,
    derived: true
  },
  desert: {
    key: 'desert',
    parent: 'survival',
    valid: 0,
    derived: true
  },
  mountains: {
    key: 'mountains',
    parent: 'survival',
    valid: 0,
    derived: true
  },
  marsh: {
    key: 'marsh',
    parent: 'survival',
    valid: 0,
    derived: true
  },
  arctic: {
    key: 'arctic',
    parent: 'survival',
    valid: 0,
    derived: true
  }
}
