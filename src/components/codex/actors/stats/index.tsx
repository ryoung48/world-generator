import { Grid } from '@mui/material'

import { view__context } from '../../../../context'
import { actor__is_child } from '../../../../models/npcs/actors/stats/age'
import { actor__describe_appearance } from '../../../../models/npcs/actors/stats/appearance/physique'
import { profession__title } from '../../../../models/npcs/actors/stats/professions'
import { actor__skill_rank, actor_skill__lookup } from '../../../../models/npcs/actors/stats/skills'
import { fluency__rank } from '../../../../models/npcs/actors/stats/skills/fluency'
import { ActorSkill } from '../../../../models/npcs/actors/stats/skills/types'
import { describe__voice } from '../../../../models/npcs/actors/stats/speech'
import { Actor } from '../../../../models/npcs/actors/types'
import { npc__lvl_to_cr, xp_mod } from '../../../../models/npcs/stats'
import { decorate_text } from '../../../../models/utilities/text/decoration'
import { formatters } from '../../../../models/utilities/text/formatters'
import { SectionList } from '../../common/text/SectionList'
import { StyledText } from '../../common/text/StyledText'
import { AttributesView } from './Attributes'
import { ActorBackgroundView } from './Background'
import { NPCHealthView } from './Health'

const persona_metric = (params: { value: number; high: string; low: string }) => {
  const { value, high, low } = params
  return { key: value > 0.5 ? high : low, value: Math.abs(value - 0.5) * 2 }
}

const decorate_skill = (params: { skill: ActorSkill['key']; actor: Actor; tooltip?: string }) => {
  const { skill, actor, tooltip } = params
  return decorate_text({
    label: skill,
    tooltip: tooltip ?? actor__skill_rank({ actor, skill })
  })
}

const persona = (actor: Actor) => {
  const { altruism, lawful, change, social, conflict, neuroticism } = actor.persona
  return [
    persona_metric({ value: altruism, high: 'altruistic', low: 'greedy' }),
    persona_metric({ value: lawful, high: 'honest', low: 'deceptive' }),
    persona_metric({ value: change, high: 'progressive', low: 'traditional' }),
    persona_metric({ value: social, high: 'social', low: 'enigmatic' }),
    persona_metric({ value: conflict, high: 'aggressive', low: 'diplomatic' }),
    persona_metric({ value: neuroticism, high: 'passionate', low: 'stoic' })
  ].sort((a, b) => b.value - a.value)
}

export function ActorStatistics() {
  const { state } = view__context()
  const actor = window.world.actors[state.codex.actor]
  const adult = !actor__is_child({ actor })
  const stats = [
    {
      label: 'Appearance',
      content: <StyledText key='appearance' text={actor__describe_appearance(actor)}></StyledText>
    }
  ]
  if (adult)
    stats.push({ label: 'Voice', content: <span key='voice'>{describe__voice(actor)}</span> })
  stats.push({
    label: 'Persona',
    content: (
      <StyledText
        key='persona'
        text={persona(actor)
          .map(({ key, value }) =>
            decorate_text({ label: key.toLowerCase(), tooltip: formatters.percent({ value }) })
          )
          .join(', ')}
      ></StyledText>
    )
  })
  if (adult && Object.entries(actor.skills).length > 0) {
    const all_skills = Object.entries(actor.skills)
    const standalone = all_skills.filter(
      ([skill]) => !actor_skill__lookup[skill as ActorSkill['key']].parent
    )
    const grouped = all_skills
      .filter(([skill]) => actor_skill__lookup[skill as ActorSkill['key']].parent)
      .reduce((groups: Record<string, [string, number][]>, [skill, exp]) => {
        const { parent } = actor_skill__lookup[skill as ActorSkill['key']]
        if (!groups[parent]) groups[parent] = []
        groups[parent].push([skill, exp])
        return groups
      }, {})
    const parents: [string, number][] = Object.entries(grouped).map(([parent, group]) => {
      return [parent, Math.max(...group.map(([_, exp]) => exp))]
    })
    const skills = standalone.concat(parents)
    stats.push({
      label: 'Skills',
      content: (
        <StyledText
          key='skills'
          text={skills
            .sort((a, b) => b[1] - a[1])
            .map(([skill]) => {
              if (grouped[skill]) {
                const children = grouped[skill].sort((a, b) => b[1] - a[1])
                return `${skill} (${children
                  .map(([child]) => decorate_skill({ skill: child as ActorSkill['key'], actor }))
                  .join(', ')})`
              }
              return decorate_skill({ skill: skill as ActorSkill['key'], actor })
            })
            .join(', ')}
        ></StyledText>
      )
    })
  }
  if (adult && Object.entries(actor.languages).length > 0) {
    stats.push({
      label: 'Languages',
      content: (
        <StyledText
          key='languages'
          text={Object.entries(actor.languages)
            .sort((a, b) => b[1] - a[1])
            .map(([cidx]) => {
              const idx = parseInt(cidx)
              const culture = window.world.cultures[idx]
              return decorate_text({
                label: culture.name.toLowerCase(),
                link: culture,
                tooltip: fluency__rank({ actor, culture: idx })
              })
            })
            .join(', ')}
        ></StyledText>
      )
    })
  }
  return (
    <Grid container>
      <Grid item xs={4}>
        <SectionList
          list={[
            {
              label: 'Profession',
              content: <StyledText text={profession__title({ actor })}></StyledText>
            }
          ]}
        ></SectionList>
      </Grid>
      <Grid item xs={4}>
        <SectionList
          list={[
            {
              label: 'Level',
              content: (
                <StyledText
                  text={decorate_text({
                    label: actor.level.toFixed(2),
                    tooltip: `${(npc__lvl_to_cr(actor.level) * xp_mod).toFixed(0)} xp`
                  })}
                ></StyledText>
              )
            }
          ]}
        ></SectionList>
      </Grid>
      <Grid item xs={4}>
        <SectionList
          list={[
            {
              label: 'Health',
              content: <NPCHealthView npc={actor}></NPCHealthView>
            }
          ]}
        ></SectionList>
      </Grid>
      <Grid item xs={12}>
        <AttributesView attributes={actor.attributes}></AttributesView>
      </Grid>
      <Grid item xs={12}>
        <SectionList list={stats}></SectionList>
      </Grid>
      {actor.history.backgrounds.length > 0 && (
        <Grid item xs={12} mt={1}>
          <ActorBackgroundView></ActorBackgroundView>
        </Grid>
      )}
    </Grid>
  )
}
