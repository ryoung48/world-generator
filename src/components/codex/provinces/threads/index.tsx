import { useEffect, useState } from 'react'

import { Province } from '../../../../models/regions/provinces/types'
import {
  location__threads,
  thread__abandoned,
  thread__complexity,
  thread__ongoing,
  thread__paused
} from '../../../../models/threads'
import { difficulties } from '../../../../models/threads/difficulty'
import { stage__current } from '../../../../models/threads/stages'
import { Thread } from '../../../../models/threads/types'
import { titleCase } from '../../../../models/utilities/text'
import { decorateText } from '../../../../models/utilities/text/decoration'
import { view__context } from '../../../context'
import { style__clickable } from '../../../theme'
import { cssColors } from '../../../theme/colors'
import { DataTable, DetailedTableRow } from '../../common/DataTable'
import { StyledText } from '../../common/text/StyledText'
import { style__disabledThread, thread__icons } from './styles'
import { ThreadView } from './Thread'

const sortThreads = (params: { threads: Thread[]; location: Province }) => {
  const { threads, location } = params
  const active = threads.filter(
    thread => thread.location === location.idx || thread.origin === location.idx
  )
  const distant = threads.filter(
    thread =>
      thread.location !== location.idx &&
      thread.origin !== location.idx &&
      !thread.closed &&
      stage__current(thread)?.transition?.src === location.idx
  )
  return [...active, ...distant]
}

export function ThreadList() {
  const { state, dispatch } = view__context()
  const { codex, journal } = state
  const [expanded, setExpanded] = useState(-1)
  const location = window.world.provinces[codex.province]
  const threads = sortThreads({
    threads: journal.map(j => window.world.threads[j]),
    location
  })
  useEffect(() => {
    const threads = location__threads(location)
    if (threads) dispatch({ type: 'refresh journal' })
  }, [location])
  const goToThread = (thread: Thread) => {
    setExpanded(thread.idx)
  }
  return (
    <DataTable
      data={threads}
      rowStyles={item => (item.origin !== location.idx ? style__disabledThread : undefined)}
      headers={[
        {
          text: '',
          value: item => {
            const paused = thread__paused(item)
            const progress = thread__ongoing(item)
            const transit = location.idx !== item.location && progress
            const abandoned = thread__abandoned(item)
            const { Icon, color } =
              thread__icons[
                abandoned
                  ? 'abandoned'
                  : paused
                  ? 'paused'
                  : transit
                  ? 'transit'
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
            const parent = window.world.threads[item.parent]
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
                        label: item.difficulty,
                        color: difficulties[item.difficulty].color,
                        bold: true
                      })}, ${thread__complexity(item)} (${item.complexity})`}
                    ></StyledText>
                    {parent ? (
                      <span>
                        ,{' '}
                        <span
                          className={style__clickable(cssColors.subtitle)}
                          onClick={() => goToThread(parent)}
                          onKeyPress={() => goToThread(parent)}
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
          text: 'Location',
          value: item => {
            const loc = window.world.provinces[item.location]
            return (
              <DetailedTableRow
                title={
                  <StyledText
                    text={decorateText({
                      link: loc
                    })}
                  ></StyledText>
                }
                subtitle={loc.hub.type}
                link
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
                subtitle={<span>{abandoned ? 'abandoned' : item.status}</span>}
              ></DetailedTableRow>
            )
          }
        }
      ]}
      expand={{
        content: item => {
          return (
            <ThreadView
              thread={item}
              goToThread={goToThread}
              clearExpand={() => setExpanded(-1)}
            ></ThreadView>
          )
        },
        expanded: [expanded, setExpanded],
        idx: item => item.idx
      }}
    ></DataTable>
  )
}
