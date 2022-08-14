import { Divider } from '@mui/material'

import { view__context } from '../../../../context'
import { actor__relation } from '../../../../models/npcs/actors'
import { background__find_events } from '../../../../models/npcs/actors/history/backgrounds'
import { actor__age, actor__life_phase } from '../../../../models/npcs/actors/stats/age'
import {
  actor__lifestyle,
  profession__title
} from '../../../../models/npcs/actors/stats/professions'
import { Actor } from '../../../../models/npcs/actors/types'
import { describe_coarse_duration } from '../../../../models/utilities/math/time'
import { decorate_text } from '../../../../models/utilities/text/decoration'
import { actor__details } from '../../../../models/utilities/text/entities/actor'
import { format__date_range, formatters } from '../../../../models/utilities/text/formatters'
import { World } from '../../../../models/world/types'
import { css_colors } from '../../../theme/colors'
import { DataTable, DetailedTableRow } from '../../common/DataTable'
import { SectionList } from '../../common/text/SectionList'
import { StyledText } from '../../common/text/StyledText'

const event_text = (params: { actor: Actor; events: World['actor_events'] }) => {
  const { actor, events } = params
  return events.map(e => {
    if (e.type === 'union') {
      const [spouse] = actor__relation({ actor, type: 'spouse' })
      return {
        label: 'Union',
        content: (
          <StyledText
            text={`${actor__details.name({ actor })} married ${actor__details.name({
              actor: spouse,
              link: true
            })} on ${formatters.date(e.time)}.`}
          ></StyledText>
        )
      }
    }
    const child = window.world.actors[e.actor]
    return {
      label: 'Child',
      content: (
        <StyledText
          text={`${actor__details.name({ actor: child, link: true })} was born on ${formatters.date(
            e.time
          )}.`}
        ></StyledText>
      )
    }
  })
}

const skill_text = (background: Actor['history']['backgrounds'][number]) => {
  return background.skills
    .filter(skills => Object.entries(skills.exp).some(skill => skill[1] > 0))
    .map(skills => ({
      label: format__date_range(skills),
      content: (
        <StyledText
          text={Object.entries(skills.exp)
            .sort((a, b) => b[1] - a[1])
            .filter(skill => skill[1] > 0)
            .map(([skill, exp]) => decorate_text({ label: skill, tooltip: exp.toFixed(0) }))
            .join(', ')}
        ></StyledText>
      )
    }))
}

export function ActorBackgroundView() {
  const { state } = view__context()
  const actor = window.world.actors[state.codex.actor]
  const backgrounds = actor.history.backgrounds.map(background => {
    const events = background__find_events({
      actor,
      start: background.start,
      end: background.end
    })
      .filter(e => e.actor !== undefined)
      .sort((a, b) => a.time - b.time)
    return { ...background, events }
  })
  return (
    <DataTable
      data={backgrounds}
      expand={{
        disabled: item => !(item.events.length > 0 || item.skills),
        content: item => {
          const has_events = item.events.length > 0
          return (
            <span>
              {has_events && (
                <SectionList list={event_text({ actor, events: item.events })}></SectionList>
              )}
              {item.skills && has_events && <Divider></Divider>}
              {item.skills && <SectionList list={skill_text(item)}></SectionList>}
            </span>
          )
        }
      }}
      headers={[
        {
          text: 'Background',
          value: item => {
            return (
              <DetailedTableRow
                title={
                  item.occupation
                    ? profession__title({ actor, time: item.start, ignore_child: true })
                    : 'Childhood'
                }
                subtitle={actor__lifestyle({ actor, time: item.start })}
              ></DetailedTableRow>
            )
          }
        },
        {
          text: 'Location',
          value: item => {
            const link = window.world.locations[item.loc]
            return (
              <DetailedTableRow
                title={<StyledText text={decorate_text({ link })} />}
                subtitle={link.type}
                link
              ></DetailedTableRow>
            )
          }
        },
        {
          text: 'Time',
          value: item => {
            const start = formatters.date(item.start)
            const end_time = Math.min(item.end || window.world.date, window.world.date)
            const end = item.end < window.world.date ? formatters.date(end_time) : 'Present'
            const duration = describe_coarse_duration(end_time - item.start)
            const start_age = actor__age({ actor, ref_date: item.start })
            const start_phase = actor__life_phase({ actor, ref_date: item.start }).toLowerCase()
            const end_age = actor__age({ actor, ref_date: end_time })
            const end_phase = actor__life_phase({ actor, ref_date: end_time }).toLowerCase()
            return (
              <DetailedTableRow
                title={`${start} - ${end}`}
                subtitle={
                  <StyledText
                    color={css_colors.subtitle}
                    text={`${duration} (age ${decorate_text({
                      label: start_age.toString(),
                      tooltip: start_phase
                    })} - ${decorate_text({
                      label: end_age.toString(),
                      tooltip: end_phase
                    })})`}
                  ></StyledText>
                }
              ></DetailedTableRow>
            )
          }
        }
      ]}
    ></DataTable>
  )
}
