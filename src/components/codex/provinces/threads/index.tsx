import { useEffect, useState } from 'react'

import {
  location__threads,
  thread__abandoned,
  thread__blocked,
  thread__ongoing,
  thread__paused
} from '../../../../models/threads'
import {
  avatar__cr,
  difficulties,
  difficulty__lvl,
  difficulty__odds
} from '../../../../models/threads/difficulty'
import { Thread } from '../../../../models/threads/types'
import { titleCase } from '../../../../models/utilities/text'
import { decorateText } from '../../../../models/utilities/text/decoration'
import { view__context } from '../../../context'
import { cssColors } from '../../../theme/colors'
import { DataTable, DetailedTableRow } from '../../common/DataTable'
import { StyledText } from '../../common/text/StyledText'
import { thread__icons } from './styles'
import { ThreadView } from './Thread'

const itemsPerPage = 5

export function ThreadList() {
  const { state, dispatch } = view__context()
  const { codex, journal, avatar } = state
  const [expanded, setExpanded] = useState(-1)
  const [page, setPage] = useState(0)
  const loc = window.world.provinces[codex.province]
  const threads = journal
    .map(j => window.world.threads[j])
    .filter(thread => thread.location === loc.idx)
  const goToThread = (thread: Thread) => {
    const idx = threads.findIndex(({ idx }) => thread.idx === idx)
    if (idx === -1) {
      setPage(0)
      setExpanded(-1)
    } else {
      setPage(Math.floor(idx / itemsPerPage))
      setExpanded(thread.idx)
    }
  }
  const goToCurrent = () => {
    const thread = window.world.threads[expanded]
    if (thread) goToThread(thread)
  }
  useEffect(goToCurrent, [journal])
  useEffect(() => {
    const threads = location__threads({ loc, avatar })
    if (threads) dispatch({ type: 'refresh journal' })
    goToCurrent()
  }, [loc])
  const pc = avatar__cr(state.avatar)
  return (
    <DataTable
      data={threads}
      headers={[
        {
          text: '',
          value: item => {
            const paused = thread__paused(item)
            const progress = thread__ongoing(item)
            const abandoned = thread__abandoned(item)
            const blocked = thread__blocked({ avatar, thread: item })
            const { Icon, color } =
              thread__icons[
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
            const { tier } = difficulty__odds({ pc, ...item.difficulty })
            return (
              <DetailedTableRow
                title={
                  <span>
                    {titleCase(item.mission.tag)} (#{item.idx})
                  </span>
                }
                subtitle={
                  <span>
                    <StyledText
                      color={cssColors.subtitle}
                      text={`${decorateText({
                        label: `${tier},`,
                        color: difficulties[tier].color,
                        bold: true
                      })}`}
                    ></StyledText>
                    <sup style={{ color: difficulties[tier].color }}>
                      <b>{difficulty__lvl(item.difficulty.cr).toFixed(2)}</b>
                    </sup>
                    <span> {item.subtype}</span>
                  </span>
                }
              ></DetailedTableRow>
            )
          }
        },
        {
          text: 'Progress',
          value: item => {
            const abandoned = thread__abandoned(item)
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
                subtitle={
                  <span>{`${abandoned ? 'abandoned' : item.status} (${item.complexity})`}</span>
                }
              ></DetailedTableRow>
            )
          }
        }
      ]}
      paging={[page, setPage]}
      rowsPerPage={itemsPerPage}
      expand={{
        content: item => {
          return <ThreadView thread={item} goToThread={goToThread}></ThreadView>
        },
        expanded: [expanded, setExpanded],
        idx: item => item.idx
      }}
    ></DataTable>
  )
}
