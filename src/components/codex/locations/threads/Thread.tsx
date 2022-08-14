import { Button, Divider, Grid } from '@mui/material'
import { Fragment, useState } from 'react'

import { view__context } from '../../../../context'
import { actor__location } from '../../../../models/npcs/actors'
import {
  task__in_progress,
  thread__progress,
  thread__status,
  thread__task_odds,
  thread__tasks,
  thread__xp
} from '../../../../models/threads'
import {
  thread__advance,
  thread__close,
  thread__exp,
  thread__fork
} from '../../../../models/threads/actions'
import { thread__spawn_children } from '../../../../models/threads/spawn'
import { Thread } from '../../../../models/threads/types'
import { title_case } from '../../../../models/utilities/text'
import { RadioSelect } from '../../common/input/RadioSelect'
import { SectionList } from '../../common/text/SectionList'
import { thread__icons } from './styles'
import { TaskView } from './Task'

export function ThreadView(props: {
  thread: Thread
  go_to_thread: (_thread: Thread) => void
  clear_expand: () => void
}) {
  const { thread, go_to_thread, clear_expand } = props
  const { state, dispatch } = view__context()
  const [selected_fork, select_fork] = useState(-1)
  const avatar = window.world.actors[state.avatar]
  const { goal, tasks, fork, closed } = thread
  const has_tasks = tasks.length > 0
  const { completed, failed, status } = thread__progress({ thread, avatar })
  const ended = failed || completed
  const core_tasks = thread__tasks({ tasks, avatar })
  const forked_tasks = thread__tasks({ tasks: fork?.tasks ?? [], avatar })
  const no_fork = fork && !fork?.tasks[selected_fork]
  const latest_task = core_tasks.find(task__in_progress)
  const child_required = latest_task?.thread !== undefined
  const loc = window.world.locations[thread.location]
  const avatar_at_loc = avatar && actor__location(avatar) === loc
  const close_thread = () => {
    thread__close({ thread, ref: avatar, avatar })
    const parent = window.world.threads[thread.parent]
    dispatch({ type: 'set avatar', payload: { avatar } })
    if (parent) go_to_thread(parent)
    else clear_expand()
  }
  return (
    <Grid container>
      <Grid item xs={12}>
        <SectionList
          list={[
            {
              label: 'Goal',
              content: (
                <span>
                  <i>{title_case(goal)}. </i>
                  {thread.text}
                </span>
              )
            }
          ]}
        ></SectionList>
      </Grid>
      {has_tasks && (
        <Fragment>
          <Grid item xs={12}>
            <Divider style={{ marginTop: 10, marginBottom: 10 }}></Divider>
          </Grid>
          {core_tasks.map((task, i) => {
            const { tier } = thread__task_odds({
              difficulty: task.difficulty,
              actor: avatar
            })
            const { icon: Icon, color } =
              thread__icons[tier === 'insanity' ? 'blocked' : task.status]
            return (
              <Grid item xs={12} key={i}>
                <Grid container alignContent='center'>
                  <Grid item xs={1}>
                    <Icon style={{ color }}></Icon>
                  </Grid>
                  <Grid item xs={11}>
                    <TaskView task={task} go_to_thread={go_to_thread}></TaskView>
                  </Grid>
                </Grid>
              </Grid>
            )
          })}
        </Fragment>
      )}
      {fork && (
        <Fragment>
          <Grid item xs={12}>
            <Divider style={{ marginTop: 10, marginBottom: 10 }}></Divider>
          </Grid>
          <Grid item xs={12}>
            <SectionList
              list={[{ label: 'Fork', content: <span>{fork.text}</span> }]}
            ></SectionList>
          </Grid>
          <Grid item xs={12}>
            <RadioSelect
              selected={{ value: selected_fork, set_value: value => select_fork(parseInt(value)) }}
              items={forked_tasks.map((task, i) => ({
                value: i,
                label: <TaskView task={task} go_to_thread={go_to_thread}></TaskView>
              }))}
            ></RadioSelect>
          </Grid>
        </Fragment>
      )}
      {ended && (
        <Fragment>
          <Grid item xs={12}>
            <Divider style={{ marginTop: 10, marginBottom: 10 }}></Divider>
          </Grid>
          <Grid item xs={12}>
            <SectionList
              list={[
                {
                  label: 'Outcome',
                  content: <span>Quest {failed ? 'failed' : 'completed'}.</span>
                },
                {
                  label: 'Rewards',
                  content: (
                    <span>
                      {thread__xp(
                        thread.exp ??
                          thread__exp({
                            status: thread__status(thread),
                            difficulty: thread.difficulty.cr,
                            complexity: thread.complexity,
                            avatar
                          })
                      )}
                      .
                    </span>
                  )
                }
              ]}
            ></SectionList>
          </Grid>
        </Fragment>
      )}
      {!closed && (
        <Fragment>
          <Grid item xs={12}>
            <Divider style={{ marginTop: 10, marginBottom: 10 }}></Divider>
          </Grid>
          <Grid item xs={12}>
            <Button
              style={{ marginRight: 10 }}
              disabled={no_fork || child_required || !avatar_at_loc || status === 'blocked'}
              onClick={() => {
                ended
                  ? close_thread()
                  : fork
                  ? thread__fork({
                      thread,
                      decision: forked_tasks[selected_fork],
                      ref: avatar,
                      avatar
                    })
                  : thread__advance({ thread, ref: avatar, avatar })
                if (!ended) {
                  thread__spawn_children({ thread, avatar })
                  dispatch({ type: 'set avatar', payload: { avatar } })
                }
                select_fork(-1)
              }}
            >
              Continue
            </Button>
            <Button disabled={ended} onClick={() => close_thread()}>
              Abandon
            </Button>
          </Grid>
        </Fragment>
      )}
    </Grid>
  )
}
