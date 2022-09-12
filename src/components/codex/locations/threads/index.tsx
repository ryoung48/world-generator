import { Grid, IconButton, Tooltip } from '@mui/material'
import { CheckCircleOutline, CloseCircleOutline } from 'mdi-material-ui'
import { useState } from 'react'

import { actor__location } from '../../../../models/npcs/actors'
import { profession__title } from '../../../../models/npcs/actors/stats/professions'
import { actor__details } from '../../../../models/npcs/actors/text'
import { difficulties } from '../../../../models/npcs/stats/difficulty'
import {
  thread__abandoned,
  thread__blocked,
  thread__close,
  thread__complexity,
  thread__ongoing,
  thread__paused
} from '../../../../models/threads'
import { task__odds } from '../../../../models/threads/tasks'
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

const itemsPerPage = 5

type selections = 'available' | 'active' | 'closed'

export function ThreadList(props: { active: Thread[]; closed: Thread[]; available: Thread[] }) {
  const { state, dispatch } = view__context()
  const { codex } = state
  const avatar = window.world.actors[state.avatar]
  const { active, closed, available } = props
  const [page, setPage] = useState(0)
  const [expanded, setExpanded] = useState(-1)
  const [selected, setSelected] = useState<selections>('available')
  const updateState = () => {
    dispatch({ type: 'set avatar', payload: { avatar } })
    dispatch({
      type: 'update codex',
      payload: {
        target: window.world.locations[codex.location],
        disableZoom: true
      }
    })
  }
  const goToThread = (thread: Thread) => {
    const threadType = thread.closed ? 'closed' : 'active'
    if (selected !== threadType) setSelected(threadType)
    const threads = thread.closed ? closed : active
    const idx = threads.findIndex(({ idx }) => thread.idx === idx)
    setPage(Math.floor(idx / itemsPerPage))
    setExpanded(thread.idx)
  }
  return (
    <ToggleButtons
      selection={['available', 'active', 'closed']}
      selected={[selected, setSelected]}
      content={selected => {
        const threads = selected === 'active' ? active : selected === 'closed' ? closed : available
        const availableSelected = selected === 'available'
        return (
          <DataTable
            data={threads}
            rowStyles={item =>
              selected === 'active' && item.location !== actor__location(avatar).idx
                ? style__disabledThread
                : undefined
            }
            headers={[
              {
                text: '',
                value: item => {
                  const blocked = thread__blocked({ thread: item, avatar })
                  const paused = thread__paused(item)
                  const progress = thread__ongoing(item)
                  const abandoned = thread__abandoned(item)
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
                  const parent = window.world.threads[item.parent]
                  return (
                    <DetailedTableRow
                      title={
                        <span>
                          {titleCase(item.goal)} (#{item.idx})
                        </span>
                      }
                      subtitle={
                        <span>
                          {item.hook}
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
                text: 'Patron',
                value: item => {
                  const patron = window.world.actors[item.patron]
                  return patron ? (
                    <DetailedTableRow
                      title={
                        <StyledText
                          text={decorateText({
                            link: patron
                          })}
                        ></StyledText>
                      }
                      subtitle={
                        <StyledText
                          color={cssColors.subtitle}
                          text={`${profession__title({
                            actor: patron
                          }).toLocaleLowerCase()}, ${actor__details.species({
                            actor: patron
                          })}`}
                        ></StyledText>
                      }
                      link
                    ></DetailedTableRow>
                  ) : (
                    <DetailedTableRow title='None' subtitle='n/a'></DetailedTableRow>
                  )
                }
              },
              {
                text: 'Location',
                hidden: availableSelected,
                value: item => {
                  const loc = window.world.locations[item.location]
                  return (
                    <DetailedTableRow
                      title={
                        <StyledText
                          text={decorateText({
                            link: loc
                          })}
                        ></StyledText>
                      }
                      subtitle={loc.type}
                      link
                    ></DetailedTableRow>
                  )
                }
              },
              {
                text: 'Progress',
                hidden: availableSelected,
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
              },
              {
                text: 'Difficulty',
                value: item => {
                  const desc = thread__complexity(item)
                  const { odds, tier } = task__odds({
                    difficulty: item.difficulty,
                    actor: avatar
                  })
                  return (
                    <DetailedTableRow
                      title={
                        <StyledText
                          text={decorateText({
                            label: formatters.percent({ value: odds, precision: 2 }),
                            color: difficulties[tier].color
                          })}
                        ></StyledText>
                      }
                      subtitle={`${desc} (${item.complexity})`}
                    ></DetailedTableRow>
                  )
                }
              },
              {
                text: 'Actions',
                hidden: !availableSelected,
                align: 'center',
                value: item => {
                  return (
                    <Grid container wrap='nowrap'>
                      <Grid item>
                        <Tooltip title='Accept'>
                          <IconButton
                            size='small'
                            style={{ color: cssColors.difficulty.easy }}
                            onClick={() => {
                              window.world.actors[avatar.idx].threads = [
                                ...avatar.threads,
                                item.idx
                              ]
                              const loc = window.world.locations[codex.location]
                              loc.threads = loc.threads.filter(idx => idx !== item.idx)
                              updateState()
                            }}
                          >
                            <CheckCircleOutline></CheckCircleOutline>
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip title='Decline'>
                          <IconButton
                            size='small'
                            color='primary'
                            onClick={() => {
                              thread__close({
                                thread: item,
                                avatar: window.world.actors[avatar.idx]
                              })
                              updateState()
                            }}
                          >
                            <CloseCircleOutline></CloseCircleOutline>
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  )
                }
              }
            ]}
            paging={[page, setPage]}
            rowsPerPage={itemsPerPage}
            expand={
              availableSelected
                ? undefined
                : {
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
                  }
            }
          ></DataTable>
        )
      }}
    ></ToggleButtons>
  )
}
