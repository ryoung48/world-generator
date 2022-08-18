import { scale } from '../../../../../utilities/math'
import { yearMS } from '../../../../../utilities/math/time'
import { species__byCulture } from '../../../../species/taxonomy'
import { Actor } from '../../../types'
import { actor__lifePhase } from '../../age'
import { convertAgeStandard, LifePhase } from '../../age/life_phases'
import { actorSkill__lookup } from '..'
import { SkillApplyParams } from '../types'
import { actorSkills__apply } from './apply'
import { actor__rollSkills } from './roll'

const expTiers = {
  primary: 20,
  secondary: 10,
  tertiary: 5
}

const skillMods: Record<LifePhase, number> = {
  venerable: 0,
  old: 0.2,
  'middle age': 0.5,
  adult: 0.8,
  'young adult': 1,
  adolescence: 0.2,
  childhood: 0
}

const applySkill = ({ actor, exp, key, loc }: SkillApplyParams) => {
  const { apply = actorSkills__apply } = actorSkill__lookup[key]
  apply({ actor, exp, key, loc })
}

export const actor__awardSkillExp = (actor: Actor) => {
  const { ages } = species__byCulture(window.world.cultures[actor.culture])
  let period = convertAgeStandard(ages, 5) * yearMS
  if (period > 5) period = scale([5, 10], [5, 7.5], period)
  const intelligenceMod = scale([8, 18], [0.5, 1.5], Math.max(actor.attributes.intellect, 8))
  actor.history.backgrounds
    .filter(({ occupation, skills }) => occupation && skills)
    .forEach(({ skills, loc, occupation }) => {
      skills
        .filter(({ checkDate, end = window.world.date }) => checkDate < end)
        .forEach(skill => {
          const { end = window.world.date } = skill
          if (!skill.tiers) skill.tiers = actor__rollSkills({ actor, occupation, loc })
          const { primary, secondary, tertiary } = skill.tiers
          // compute the awarded exp
          const diff = Math.max(0, (end - skill.checkDate) / period)
          const weights = [
            ...primary.map(() => expTiers.primary),
            ...secondary.map(() => expTiers.secondary),
            ...tertiary.map(() => expTiers.tertiary)
          ].map(w => w * diff * intelligenceMod)
          const phase = actor__lifePhase({ actor, refDate: skill.checkDate })
          const mod = skillMods[phase]
          const total = weights.reduce((sum, w) => sum + w, 0)
          const reward = window.dice.weightedDist({
            weights,
            std: 0.15,
            total: (primary.length > 0 ? total : total + expTiers.primary) * mod
          })
          const skillRewards = [...primary, ...secondary, ...tertiary]
          skillRewards.forEach((key, i) => {
            const exp = reward[i]
            if (!skill.exp[key]) skill.exp[key] = 0
            skill.exp[key] += exp
            applySkill({ actor, exp, key, loc })
          })
          skill.checkDate = end
        })
    })
}
