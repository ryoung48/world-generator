import { scale } from '../../../../../utilities/math'
import { year_ms } from '../../../../../utilities/math/time'
import { species__by_culture } from '../../../../species/humanoids/taxonomy'
import { Actor } from '../../../types'
import { actor__life_phase } from '../../age'
import { convert_age_standard, life_phases } from '../../age/life_phases'
import { actor_skill__lookup } from '..'
import { SkillApplyParams } from '../types'
import { actor_skills__apply } from './apply'
import { actor__roll_skills } from './roll'

const exp_tiers = {
  primary: 20,
  secondary: 10,
  tertiary: 5
}

const skill_mods: Record<life_phases, number> = {
  venerable: 0,
  old: 0.2,
  'middle age': 0.5,
  adult: 0.8,
  'young adult': 1,
  adolescence: 0.2,
  childhood: 0
}

const apply_skill = ({ actor, exp, key, loc }: SkillApplyParams) => {
  const { apply = actor_skills__apply } = actor_skill__lookup[key]
  apply({ actor, exp, key, loc })
}

export const actor__award_skill_exp = (actor: Actor) => {
  const { ages } = species__by_culture(window.world.cultures[actor.culture])
  let period = convert_age_standard(ages, 5) * year_ms
  if (period > 5) period = scale([5, 10], [5, 7.5], period)
  const intelligence_mod = scale([8, 18], [0.5, 1.5], Math.max(actor.attributes.intellect, 8))
  actor.history.backgrounds
    .filter(({ occupation, skills }) => occupation && skills)
    .forEach(({ skills, loc, occupation }) => {
      skills
        .filter(({ check_date, end = window.world.date }) => check_date < end)
        .forEach(skill => {
          const { end = window.world.date } = skill
          if (!skill.tiers) skill.tiers = actor__roll_skills({ actor, occupation, loc })
          const { primary, secondary, tertiary } = skill.tiers
          // compute the awarded exp
          const diff = Math.max(0, (end - skill.check_date) / period)
          const weights = [
            ...primary.map(() => exp_tiers.primary),
            ...secondary.map(() => exp_tiers.secondary),
            ...tertiary.map(() => exp_tiers.tertiary)
          ].map(w => w * diff * intelligence_mod)
          const phase = actor__life_phase({ actor, ref_date: skill.check_date })
          const mod = skill_mods[phase]
          const total = weights.reduce((sum, w) => sum + w, 0)
          const reward = window.dice.weighted_dist({
            weights,
            std: 0.15,
            total: (primary.length > 0 ? total : total + exp_tiers.primary) * mod
          })
          const skill_rewards = [...primary, ...secondary, ...tertiary]
          skill_rewards.forEach((key, i) => {
            const exp = reward[i]
            if (!skill.exp[key]) skill.exp[key] = 0
            skill.exp[key] += exp
            apply_skill({ actor, exp, key, loc })
          })
          skill.check_date = end
        })
    })
}
