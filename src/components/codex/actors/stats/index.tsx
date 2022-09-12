import { Grid } from '@mui/material'

import { actor__isChild } from '../../../../models/npcs/actors/stats/age'
import { actor__appearance } from '../../../../models/npcs/actors/stats/appearance/physique'
import { profession__title } from '../../../../models/npcs/actors/stats/professions'
import { actorSkill__rank } from '../../../../models/npcs/actors/stats/skills'
import { fluency__rank } from '../../../../models/npcs/actors/stats/skills/fluency'
import { ActorSkill } from '../../../../models/npcs/actors/stats/skills/types'
import { describe__voice } from '../../../../models/npcs/actors/stats/speech'
import { Actor } from '../../../../models/npcs/actors/types'
import { npc__lvlToCR, xpMod } from '../../../../models/npcs/stats'
import { decorateText } from '../../../../models/utilities/text/decoration'
import { formatters } from '../../../../models/utilities/text/formatters'
import { view__context } from '../../../context'
import { SectionList } from '../../common/text/SectionList'
import { StyledText } from '../../common/text/StyledText'
import { AttributesView } from './Attributes'
import { ActorBackgroundView } from './Background'
import { NPCHealthView } from './Health'

const personaMetric = (params: { value: number; high: string; low: string }) => {
  const { value, high, low } = params
  return { key: value > 0.5 ? high : low, value: Math.abs(value - 0.5) * 2 }
}

const decorateSkill = (params: { skill: ActorSkill['key']; actor: Actor; tooltip?: string }) => {
  const { skill, actor, tooltip } = params
  return decorateText({
    label: skill,
    tooltip: tooltip ?? actorSkill__rank({ actor, skill })
  })
}

const persona = (actor: Actor) => {
  const { altruism, lawful, change, social, conflict, neuroticism } = actor.persona
  return [
    personaMetric({ value: altruism, high: 'altruistic', low: 'greedy' }),
    personaMetric({ value: lawful, high: 'honest', low: 'deceptive' }),
    personaMetric({ value: change, high: 'progressive', low: 'traditional' }),
    personaMetric({ value: social, high: 'gregarious', low: 'enigmatic' }),
    personaMetric({ value: conflict, high: 'aggressive', low: 'diplomatic' }),
    personaMetric({ value: neuroticism, high: 'passionate', low: 'stoic' })
  ].sort((a, b) => b.value - a.value)
}

export function ActorStatistics() {
  const { state } = view__context()
  const actor = window.world.actors[state.codex.actor]
  const adult = !actor__isChild({ actor })
  const stats = [
    {
      label: 'Appearance',
      content: <StyledText key='appearance' text={actor__appearance(actor)}></StyledText>
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
            decorateText({ label: key.toLowerCase(), tooltip: formatters.percent({ value }) })
          )
          .join(', ')}
      ></StyledText>
    )
  })
  if (adult && Object.entries(actor.skills).length > 0) {
    const skills = Object.entries(actor.skills)
    stats.push({
      label: 'Skills',
      content: (
        <StyledText
          key='skills'
          text={skills
            .sort((a, b) => b[1] - a[1])
            .map(([skill]) => {
              return decorateSkill({ skill: skill as ActorSkill['key'], actor })
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
              return decorateText({
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
                  text={decorateText({
                    label: actor.level.toFixed(2),
                    tooltip: `${(npc__lvlToCR(actor.level) * xpMod).toFixed(0)} xp`
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
