import { useEffect, useState } from 'react'

import { Province } from '../../../../models/regions/provinces/types'
import {
  location__threads,
  thread__abandoned,
  thread__blocked,
  thread__complexity,
  thread__ongoing,
  thread__paused
} from '../../../../models/threads'
import { difficulties, difficulty__odds } from '../../../../models/threads/difficulty'
import { Thread } from '../../../../models/threads/types'
import { titleCase } from '../../../../models/utilities/text'
import { decorateText } from '../../../../models/utilities/text/decoration'
import { formatters } from '../../../../models/utilities/text/formatters'
import { view__context } from '../../../context'
import { style__clickable } from '../../../theme'
import { cssColors } from '../../../theme/colors'
import { DataTable, DetailedTableRow } from '../../common/DataTable'
import { ToggleButtons } from '../../common/navigation/ToggleButtons'
import { StyledText } from '../../common/text/StyledText'
import { style__disabledThread, thread__icons } from './styles'
import { ThreadView } from './Thread'

const sortThreads = (params: { threads: Thread[]; location: Province }) => {
  const { threads, location } = params
  const active = threads.filter(thread => thread.location === location.idx)
  const distant = threads.filter(thread => thread.location !== location.idx)
  return [...active, ...distant]
}

const itemsPerPage = 5

type selections = 'available' | 'active' | 'closed'

export function ThreadList() {
  const { state, dispatch } = view__context()
  const { codex, journal, avatar } = state
  const [expanded, setExpanded] = useState(-1)
  const [selected, setSelected] = useState<selections>('available')
  const [page, setPage] = useState(0)
  const loc = window.world.provinces[codex.province]
  const threads = journal.map(j => window.world.threads[j])
  const current = threads.filter(thread => !thread.closed)
  const available = current.filter(thread => !thread.accepted && thread.location === loc.idx)
  const active = sortThreads({
    threads: threads.filter(thread => !thread.closed && thread.accepted),
    location: loc
  })
  const closed = sortThreads({ threads: threads.filter(thread => thread.closed), location: loc })
  const goToThread = (thread: Thread) => {
    const threadType = thread.closed ? 'closed' : 'active'
    if (selected !== threadType) setSelected(threadType)
    const threads = thread.closed ? closed : active
    const idx = threads.findIndex(({ idx }) => thread.idx === idx)
    setPage(Math.floor(idx / itemsPerPage))
    setExpanded(thread.idx)
  }
  const goToCurrent = () => {
    const thread = window.world.threads[expanded]
    if (thread) goToThread(thread)
  }
  useEffect(goToCurrent, [journal])
  useEffect(() => {
    const threads = location__threads({ loc, pc: avatar.cr })
    if (threads) dispatch({ type: 'refresh journal' })
    goToCurrent()
  }, [loc])
  return (
    <ToggleButtons
      selection={['available', 'active', 'closed']}
      selected={[selected, setSelected]}
      content={selected => {
        const threads = selected === 'active' ? active : selected === 'closed' ? closed : available
        return (
          <DataTable
            data={threads}
            rowStyles={item => (item.location !== loc.idx ? style__disabledThread : undefined)}
            headers={[
              {
                text: '',
                value: item => {
                  const paused = thread__paused(item)
                  const progress = thread__ongoing(item)
                  const abandoned = thread__abandoned(item)
                  const blocked = thread__blocked({ pc: avatar.cr, thread: item })
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
                  const parent = window.world.threads[item.parent]
                  const { tier, odds } = difficulty__odds({ pc: avatar.cr, ...item.difficulty })
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
      }}
    ></ToggleButtons>
  )
}
