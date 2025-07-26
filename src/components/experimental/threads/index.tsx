import { Box, Grid } from '@mui/material'
import { useState } from 'react'

import { THREAD } from '../../../models/threads'
import { DIFFICULTY } from '../../../models/threads/difficulty'
import { Thread } from '../../../models/threads/types'
import { TEXT } from '../../../models/utilities/text'
import { DataTable, DetailedTableRow } from '../../common/DataTable'
import { ToggleButtons } from '../../common/navigation/ToggleButtons'
import { StyledText } from '../../common/text/styled'
import { style__clickable } from '../../theme'
import { cssColors } from '../../theme/colors'
import { thread__icons } from './styles'
import { ThreadView } from './Thread'

const itemsPerPage = 5

type selections = 'available' | 'active' | 'closed'

export function ThreadList() {
  const threads = THREAD.get.threads()
  const available = threads.filter(thread => !thread.closed)
  const closed: Thread[] = threads.filter(thread => thread.closed)
  const [avatar, setAvatar] = useState(50)
  const [page, setPage] = useState(0)
  const [expanded, setExpanded] = useState(-1)
  const [selected, setSelected] = useState<selections>('available')
  const goToThread = (thread: Thread) => {
    const threadType = thread.closed ? 'closed' : 'available'
    if (selected !== threadType) setSelected(threadType)
    const threads = thread.closed ? closed : available
    const idx = threads.findIndex(({ idx }) => thread.idx === idx)
    setPage(Math.floor(idx / itemsPerPage))
    setExpanded(thread.idx)
  }
  return (
    <Grid container>
      <Grid item xs={12}>
        <ToggleButtons
          selection={['available', 'closed']}
          controls={[selected, setSelected]}
          content={selected => {
            const threads = selected === 'closed' ? closed : available
            return (
              <Box style={{ maxHeight: 500, overflow: 'auto' }}>
                <DataTable
                  data={threads}
                  headers={[
                    {
                      text: '',
                      value: item => {
                        const blocked = THREAD.status.blocked({ thread: item, avatar })
                        const paused = THREAD.status.paused(item)
                        const progress = THREAD.status.ongoing(item)
                        const abandoned = THREAD.status.abandoned(item)
                        const { icon: Icon, color } =
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
                        const parent = THREAD.get.parent(item)
                        return (
                          <DetailedTableRow
                            title={<span>Test (#{item.idx})</span>}
                            subtitle={
                              <span>
                                hooks:{' '}
                                {parent ? (
                                  <span>
                                    {' '}
                                    (
                                    <span
                                      className={style__clickable(cssColors.subtitle)}
                                      onClick={() => goToThread(parent)}
                                      onKeyPress={() => goToThread(parent)}
                                      role='link'
                                      tabIndex={0}
                                    >
                                      #{parent.idx}
                                    </span>
                                    )
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
                      text: 'Parent',
                      value: item => {
                        return (
                          <DetailedTableRow
                            title={<StyledText text={item.patron}></StyledText>}
                            subtitle={
                              <span>
                                {item.location.district},{' '}
                                <StyledText text={item.location.text}></StyledText>
                              </span>
                            }
                          ></DetailedTableRow>
                        )
                      }
                    },
                    {
                      text: 'Progress',
                      value: item => {
                        const abandoned = THREAD.status.abandoned(item)
                        return (
                          <DetailedTableRow
                            title={
                              <StyledText
                                text={`${item.progress}/${TEXT.decorate({
                                  label: item.failures.toString(),
                                  color: cssColors.primary
                                })}`}
                              ></StyledText>
                            }
                            subtitle={<span>{abandoned ? 'abandoned' : item.status}</span>}
                          ></DetailedTableRow>
                        )
                      }
                    },
                    {
                      text: 'Difficulty',
                      value: item => {
                        const desc = THREAD.get.complexity(item)
                        const { odds, tier } = DIFFICULTY.contest({ task: item, avatar })
                        return (
                          <DetailedTableRow
                            title={
                              <StyledText
                                text={TEXT.decorate({
                                  label: TEXT.formatters.percent(1 - odds, 2),
                                  color: DIFFICULTY.tiers[tier].color
                                })}
                              ></StyledText>
                            }
                            subtitle={`${desc} (${item.complexity})`}
                          ></DetailedTableRow>
                        )
                      }
                    }
                  ]}
                  paging={[page, setPage]}
                  rowsPerPage={itemsPerPage}
                  expand={{
                    content: item => {
                      return (
                        <ThreadView
                          thread={item}
                          avatar={avatar}
                          goToThread={goToThread}
                          clearExpand={() => setExpanded(-1)}
                          setAvatar={setAvatar}
                        ></ThreadView>
                      )
                    },
                    expanded: [expanded, setExpanded],
                    idx: item => item.idx
                  }}
                ></DataTable>
              </Box>
            )
          }}
        ></ToggleButtons>
      </Grid>
      <Grid item xs={12} mt={2}>
        Avatar: {avatar.toFixed(2)}
      </Grid>
    </Grid>
  )
}
