import { location__terrain } from '../../../../../regions/locations/environment'
import { Loc } from '../../../../../regions/locations/types'
import { province__hub } from '../../../../../regions/provinces'
import { Terrain } from '../../../../../world/climate/terrain'
import { Actor } from '../../../types'
import { actorSkill__notMaster, actorSkills__apply } from '../common/apply'
import {
  skillGate__coastal,
  skillGate__constitution,
  skillGate__dexterity,
  skillGate__nobility,
  skillGate__strength
} from '../common/checks'
import { fluency__applySkill, fluency__languagesExist } from '../fluency'
import { ActorSkill } from '../types'
import { ActorSkills, WorldlySkill } from '.'

export const languageSkillChecks: Omit<ActorSkill, 'key'> = {
  valid: ({ actor, context }) => (fluency__languagesExist({ actor, context }) ? 1 : 0),
  apply: ({ actor, exp, loc }) => fluency__applySkill({ actor, exp, loc })
}

const translateTerrain = (terrain: Terrain): ActorSkills => {
  if (terrain === 'Arctic') return 'arctic'
  else if (terrain === 'Marsh') return 'marsh'
  else if (terrain === 'Forest') return 'forest'
  else if (terrain === 'Plains') return 'plains'
  else if (terrain === 'Desert') return 'desert'
  else if (terrain === 'Mountains') return 'mountains'
  else throw new Error(`bad survival application: ${terrain}`)
}

const validTerrain = (params: { actor: Actor; loc: Loc }) => {
  const { actor, loc } = params
  const region = window.world.regions[loc.region]
  return region.regional.provinces
    .map(p => {
      const province = window.world.provinces[p]
      const { terrain } = location__terrain(province__hub(province))
      return { w: loc.idx === province.hub ? 10 : 1, v: translateTerrain(terrain) }
    })
    .filter(skill => actorSkill__notMaster({ actor, key: skill.v }))
}

export const actorSkills__worldly: Record<WorldlySkill, ActorSkill> = {
  'animal handling': {
    key: 'animal handling'
  },
  architecture: {
    key: 'architecture',
    valid: 0
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
  'living language': {
    key: 'living language',
    ...languageSkillChecks
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
    key: 'perception'
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
    valid: ({ context, actor }) => {
      const loc = window.world.locations[context.idx]
      const terrain = validTerrain({ actor, loc })
      return terrain.length > 0 ? skillGate__constitution({ context, actor }) : 0
    },
    apply: ({ loc, actor, exp }) => {
      const location = window.world.locations[loc]
      const terrain = window.dice.weightedChoice(validTerrain({ actor, loc: location }))
      actorSkills__apply({ actor, exp, key: terrain, loc })
    }
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
