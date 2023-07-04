import { useEffect, useState } from 'react'

import {
  location__quests,
  quest__abandoned,
  quest__blocked,
  quest__complexity,
  quest__ongoing,
  quest__paused
} from '../../../../models/threads/quests'
import { stage__current, stage__previous } from '../../../../models/threads/quests/stages'
import { Quest } from '../../../../models/threads/quests/types'
import { avatar__cr, difficulties, difficulty__odds } from '../../../../models/utilities/difficulty'
import { titleCase } from '../../../../models/utilities/text'
import { decorateText } from '../../../../models/utilities/text/decoration'
import { formatters } from '../../../../models/utilities/text/formatters'
import { view__context } from '../../../context'
import { style__clickable } from '../../../theme'
import { cssColors } from '../../../theme/colors'
import { DataTable, DetailedTableRow } from '../../common/DataTable'
import { StyledText } from '../../common/text/StyledText'
import { QuestView } from './Quest'
import { quest__icons, style__disabledQuest } from './styles'

const itemsPerPage = 5

export function QuestList() {
  const { state, dispatch } = view__context()
  const { province, journal, avatar } = state
  const [expanded, setExpanded] = useState(-1)
  const [page, setPage] = useState(0)
  const loc = window.world.provinces[province]
  const pc = avatar__cr(avatar)
  const quests = journal
    .map(j => window.world.quests[j])
    .filter(quest =>
      [stage__current(quest), stage__previous(quest)].some(stage => stage?.setting?.loc === loc.idx)
    )
  const goToQuest = (quest: Quest) => {
    const idx = quests.findIndex(({ idx }) => quest.idx === idx)
    if (idx === -1) {
      setPage(0)
      setExpanded(-1)
    } else {
      setPage(Math.floor(idx / itemsPerPage))
      setExpanded(quest.idx)
    }
  }
  const goToCurrent = () => {
    const quest = window.world.quests[expanded]
    if (quest) goToQuest(quest)
  }
  useEffect(goToCurrent, [journal])
  useEffect(() => {
    const quests = location__quests({ loc, pc })
    if (quests) dispatch({ type: 'refresh journal' })
    goToCurrent()
  }, [loc])
  return (
    <DataTable
      data={quests}
      rowStyles={item => (item.location !== loc.idx ? style__disabledQuest : undefined)}
      headers={[
        {
          text: '',
          value: item => {
            const paused = quest__paused(item)
            const progress = quest__ongoing(item)
            const abandoned = quest__abandoned(item)
            const blocked = quest__blocked({ pc, quest: item })
            const { Icon, color } =
              quest__icons[
                abandoned
                  ? 'abandoned'
                  : blocked
                  ? 'blocked'
                  : paused
                  ? 'paused'
                  : progress
                  ? 'in progress'
                  : item.status
              ]
            return <Icon style={{ color }} />
          }
        },
        {
          text: 'Quest',
          value: item => {
            const parent = window.world.quests[item.parent]
            const { tier, odds } = difficulty__odds({ pc, ...item.difficulty })
            return (
              <DetailedTableRow
                title={
                  <span>
                    {titleCase(item.goal.tag)} (#{item.idx})
                  </span>
                }
                subtitle={
                  <span>
                    <StyledText
                      color={cssColors.subtitle}
                      text={`${decorateText({
                        label: `${tier} (${formatters.percent(1 - odds)})`,
                        color: difficulties[tier].color,
                        bold: true
                      })}, ${quest__complexity(item)} (${item.complexity})`}
                    ></StyledText>
                    {parent ? (
                      <span>
                        ,{' '}
                        <span
                          className={style__clickable(cssColors.subtitle)}
                          onClick={() => goToQuest(parent)}
                          onKeyPress={() => goToQuest(parent)}
                          role='link'
                          tabIndex={0}
                        >
                          #{parent.idx}
                        </span>
                      </span>
                    ) : (
                      ''
                    )}
                  </span>
                }
              ></DetailedTableRow>
            )
          }
        },
        {
          text: 'Patron',
          value: item => {
            const patron = window.world.npcs[item.patron]
            return (
              <DetailedTableRow
                title={<StyledText text={decorateText({ link: patron })}></StyledText>}
                subtitle={<span>{patron.profession.title}</span>}
              ></DetailedTableRow>
            )
          }
        },
        {
          text: 'Progress',
          value: item => {
            const abandoned = quest__abandoned(item)
            return (
              <DetailedTableRow
                title={
                  <StyledText
                    text={`${item.progress}/${decorateText({
                      label: item.failures.toString(),
                      color: cssColors.primary
                    })}`}
                  ></StyledText>
                }
                subtitle={<span>{abandoned ? 'abandoned' : item.status}</span>}
              ></DetailedTableRow>
            )
          }
        }
      ]}
      paging={[page, setPage]}
      rowsPerPage={itemsPerPage}
      expand={{
        content: item => {
          return <QuestView quest={item} goToQuest={goToQuest}></QuestView>
        },
        expanded: [expanded, setExpanded],
        idx: item => item.idx
      }}
    ></DataTable>
  )
}
