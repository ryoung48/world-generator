import { Grid, IconButton, Tooltip } from '@mui/material'
import { CheckCircleOutline, CloseCircleOutline } from 'mdi-material-ui'
import { useState } from 'react'

import { view__context } from '../../../../context'
import { actor__location } from '../../../../models/npcs/actors'
import { profession__title } from '../../../../models/npcs/actors/stats/professions'
import { difficulties } from '../../../../models/npcs/stats/difficulty'
import {
  thread__describe_complexity,
  thread__progress,
  thread__status,
  thread__task_odds
} from '../../../../models/threads'
import { thread__close } from '../../../../models/threads/actions'
import { thread__spawn_children } from '../../../../models/threads/spawn'
import { Thread } from '../../../../models/threads/types'
import { title_case } from '../../../../models/utilities/text'
import { decorate_text } from '../../../../models/utilities/text/decoration'
import { formatters } from '../../../../models/utilities/text/formatters'
import { style__clickable } from '../../../theme'
import { css_colors } from '../../../theme/colors'
import { DataTable, DetailedTableRow } from '../../common/DataTable'
import { ToggleButtons } from '../../common/navigation/ToggleButtons'
import { StyledText } from '../../common/text/StyledText'
import { style__disabled_thread, style__thread_failures, thread__icons } from './styles'
import { ThreadView } from './Thread'

const items_per_page = 5

type selections = 'available' | 'active' | 'closed'

export function ThreadList(props: { active: Thread[]; closed: Thread[]; available: Thread[] }) {
  const { state, dispatch } = view__context()
  const { codex } = state
  const avatar = window.world.actors[state.avatar]
  const { active, closed, available } = props
  const [page, set_page] = useState(0)
  const [expanded, set_expanded] = useState(-1)
  const [selected, set_selected] = useState<selections>('available')
  const update_state = () => {
    dispatch({ type: 'set avatar', payload: { avatar } })
    dispatch({
      type: 'update codex',
      payload: {
        target: window.world.locations[codex.location],
        disable_zoom: true
      }
    })
  }
  const go_to_thread = (thread: Thread) => {
    const thread_type = thread.closed ? 'closed' : 'active'
    if (selected !== thread_type) set_selected(thread_type)
    const threads = thread.closed ? closed : active
    const idx = threads.findIndex(({ idx }) => thread.idx === idx)
    set_page(Math.floor(idx / items_per_page))
    set_expanded(idx)
  }
  return (
    <ToggleButtons
      selection={['available', 'active', 'closed']}
      selected={[selected, set_selected]}
      content={selected => {
        const threads = selected === 'active' ? active : selected === 'closed' ? closed : available
        const available_selected = selected === 'available'
        return (
          <DataTable
            data={threads}
            row_styles={item =>
              selected === 'active' && item.location !== actor__location(avatar).idx
                ? style__disabled_thread
                : undefined
            }
            headers={[
              {
                text: '',
                value: item => {
                  const { status } = thread__progress({ thread: item, avatar })
                  const { icon: Icon, color } = thread__icons[status]
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
                          {title_case(item.goal)} (#{item.idx})
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
                                className={style__clickable(css_colors.subtitle)}
                                onClick={() => go_to_thread(parent)}
                                onKeyPress={() => go_to_thread(parent)}
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
                  return (
                    <DetailedTableRow
                      title={
                        <StyledText
                          text={decorate_text({
                            link: patron
                          })}
                        ></StyledText>
                      }
                      subtitle={
                        <StyledText
                          color={css_colors.subtitle}
                          text={profession__title({
                            actor: patron
                          }).toLocaleLowerCase()}
                        ></StyledText>
                      }
                      link
                    ></DetailedTableRow>
                  )
                }
              },
              {
                text: 'Location',
                hidden: available_selected,
                value: item => {
                  const loc = window.world.locations[item.location]
                  return (
                    <DetailedTableRow
                      title={
                        <StyledText
                          text={decorate_text({
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
                hidden: available_selected,
                value: item => {
                  const desc =
                    selected === 'closed'
                      ? thread__progress({ thread: item, avatar }).status
                      : thread__status(item)
                  return (
                    <DetailedTableRow
                      title={`${item.progress}/${item.complexity}`}
                      subtitle={
                        <span>
                          {desc} <span className={style__thread_failures}>({item.failures})</span>
                        </span>
                      }
                    ></DetailedTableRow>
                  )
                }
              },
              {
                text: 'Difficulty',
                value: item => {
                  const desc = thread__describe_complexity(item)
                  const { odds, tier } = thread__task_odds({
                    difficulty: item.difficulty,
                    actor: avatar
                  })
                  return (
                    <DetailedTableRow
                      title={
                        <StyledText
                          text={decorate_text({
                            label: title_case(tier),
                            color: difficulties[tier].color,
                            tooltip: `${formatters.percent({ value: odds, precision: 2 })}`
                          })}
                        ></StyledText>
                      }
                      subtitle={desc}
                    ></DetailedTableRow>
                  )
                }
              },
              {
                text: 'Actions',
                hidden: !available_selected,
                value: item => {
                  return (
                    <Grid container>
                      <Grid item>
                        <Tooltip title='Accept'>
                          <IconButton
                            size='small'
                            style={{ color: css_colors.difficulty.easy }}
                            onClick={() => {
                              window.world.actors[avatar.idx].threads = [
                                ...avatar.threads,
                                item.idx
                              ]
                              const loc = window.world.locations[codex.location]
                              loc.threads = loc.threads.filter(idx => idx !== item.idx)
                              update_state()
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
                                ref: window.world.locations[codex.location],
                                avatar: window.world.actors[avatar.idx]
                              })
                              update_state()
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
            paging={[page, set_page]}
            rows_per_page={items_per_page}
            expand={
              available_selected
                ? undefined
                : {
                    content: item => {
                      const children = thread__spawn_children({ thread: item, avatar })
                      if (children) dispatch({ type: 'set avatar', payload: { avatar } })
                      return (
                        <ThreadView
                          thread={item}
                          go_to_thread={go_to_thread}
                          clear_expand={() => set_expanded(-1)}
                        ></ThreadView>
                      )
                    },
                    expanded: [expanded, set_expanded]
                  }
            }
          ></DataTable>
        )
      }}
    ></ToggleButtons>
  )
}
