import { Divider } from '@mui/material'

import { actor__relation } from '../../../../models/npcs/actors'
import { background__findEvents } from '../../../../models/npcs/actors/history/backgrounds'
import { actor__age, actor__lifePhase } from '../../../../models/npcs/actors/stats/age'
import {
  actor__lifestyle,
  profession__title
} from '../../../../models/npcs/actors/stats/professions'
import { actor__details } from '../../../../models/npcs/actors/text'
import { Actor } from '../../../../models/npcs/actors/types'
import { describeCoarseDuration } from '../../../../models/utilities/math/time'
import { decorateText } from '../../../../models/utilities/text/decoration'
import { formatters } from '../../../../models/utilities/text/formatters'
import { World } from '../../../../models/world/types'
import { view__context } from '../../../context'
import { cssColors } from '../../../theme/colors'
import { DataTable, DetailedTableRow } from '../../common/DataTable'
import { SectionList } from '../../common/text/SectionList'
import { StyledText } from '../../common/text/StyledText'

const eventText = (params: { actor: Actor; events: World['actorEvents'] }) => {
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

const skillText = (background: Actor['history']['backgrounds'][number]) => {
  return background.skills
    .filter(skills => Object.entries(skills.exp).some(skill => skill[1] > 0))
    .map(skills => ({
      label: formatters.dateRange(skills),
      content: (
        <StyledText
          text={Object.entries(skills.exp)
            .sort((a, b) => b[1] - a[1])
            .filter(skill => skill[1] > 0)
            .map(([skill, exp]) => decorateText({ label: skill, tooltip: exp.toFixed(0) }))
            .join(', ')}
        ></StyledText>
      )
    }))
}

export function ActorBackgroundView() {
  const { state } = view__context()
  const actor = window.world.actors[state.codex.actor]
  const backgrounds = actor.history.backgrounds.map(background => {
    const events = background__findEvents({
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
          const hasEvents = item.events.length > 0
          return (
            <span>
              {hasEvents && (
                <SectionList list={eventText({ actor, events: item.events })}></SectionList>
              )}
              {item.skills && hasEvents && <Divider></Divider>}
              {item.skills && <SectionList list={skillText(item)}></SectionList>}
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
                    ? profession__title({ actor, time: item.start, ignoreChild: true })
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
                title={<StyledText text={decorateText({ link })} />}
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
            const endTime = Math.min(item.end || window.world.date, window.world.date)
            const end = item.end < window.world.date ? formatters.date(endTime) : 'Present'
            const duration = describeCoarseDuration(endTime - item.start)
            const startAge = actor__age({ actor, refDate: item.start })
            const startPhase = actor__lifePhase({ actor, refDate: item.start }).toLowerCase()
            const endAge = actor__age({ actor, refDate: endTime })
            const endPhase = actor__lifePhase({ actor, refDate: endTime }).toLowerCase()
            return (
              <DetailedTableRow
                title={`${start} - ${end}`}
                subtitle={
                  <StyledText
                    color={cssColors.subtitle}
                    text={`${duration} (age ${decorateText({
                      label: startAge.toString(),
                      tooltip: startPhase
                    })} - ${decorateText({
                      label: endAge.toString(),
                      tooltip: endPhase
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
