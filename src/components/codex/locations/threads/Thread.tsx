import { Button, Divider, Grid } from '@mui/material'
import { Fragment } from 'react'

import { actor__location } from '../../../../models/npcs/actors'
import {
  thread__abandoned,
  thread__advance,
  thread__blocked,
  thread__close,
  thread__formattedXP,
  thread__ongoing,
  thread__paused,
  thread__tasks
} from '../../../../models/threads'
import { task__blocked, task__xp } from '../../../../models/threads/tasks'
import { Thread } from '../../../../models/threads/types'
import { titleCase } from '../../../../models/utilities/text'
import { view__context } from '../../../context'
import { SectionList } from '../../common/text/SectionList'
import { thread__icons } from './styles'
import { TaskView } from './Task'

export function ThreadView(props: {
  thread: Thread
  goToThread: (_thread: Thread) => void
  clearExpand: () => void
}) {
  const { thread, goToThread, clearExpand } = props
  const { state, dispatch } = view__context()
  const avatar = window.world.actors[state.avatar]
  const { goal, closed } = thread
  const tasks = thread__tasks(thread)
  const ended = !thread__ongoing(thread)
  const blocked = thread__blocked({ thread, avatar })
  const paused = thread__paused(thread)
  const loc = window.world.locations[thread.location]
  const avatarAtLoc = avatar && actor__location(avatar) === loc
  const parent = window.world.threads[thread.parent]
  const closeThread = () => {
    thread__close({ thread, avatar })
    dispatch({ type: 'set avatar', payload: { avatar } })
    if (parent) goToThread(parent)
    else clearExpand()
  }
  return (
    <Grid>
      <Grid item xs={12}>
        <SectionList
          list={[
            {
              label: 'Goal',
              content: (
                <span>
                  <i>{titleCase(goal)}. </i>
                  {thread.text}
                </span>
              )
            }
          ]}
        ></SectionList>
      </Grid>
      <Fragment>
        <Grid item xs={12}>
          <Divider style={{ marginTop: 10, marginBottom: 10 }}></Divider>
        </Grid>
        {tasks.map((task, i) => {
          if (!task) return <span key={i}>placeholder</span>
          const blocked = task__blocked({ task, avatar })
          const ref = window.world.threads[task.idx]
          const paused = ref && thread__ongoing(ref)
          const abandoned = ref && thread__abandoned(ref)
          const status = abandoned
            ? 'abandoned'
            : blocked
            ? 'blocked'
            : paused
            ? 'paused'
            : task.status ?? 'in progress'
          const { icon: Icon, color } = thread__icons[status]
          return (
            <Grid item xs={12} key={i}>
              <Grid container alignContent='center'>
                <Grid item xs={1}>
                  <Icon style={{ color }}></Icon>
                </Grid>
                <Grid item xs={11}>
                  <TaskView task={task} goToThread={goToThread}></TaskView>
                </Grid>
              </Grid>
            </Grid>
          )
        })}
      </Fragment>
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
                  content: (
                    <span>Quest {thread.status === 'failure' ? 'failed' : 'completed'}.</span>
                  )
                },
                {
                  label: 'Rewards',
                  content: (
                    <span>
                      {thread__formattedXP(
                        !thread__abandoned(thread) && thread.exp === 0
                          ? task__xp({ task: thread, avatar, mod: thread.complexity })
                          : thread.exp
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
              disabled={!avatarAtLoc || blocked || paused}
              onClick={() => {
                if (ended) {
                  closeThread()
                } else {
                  const duration = thread__advance({ thread, avatar })
                  dispatch({ type: 'tick', payload: { duration } })
                  dispatch({ type: 'set avatar', payload: { avatar } })
                }
              }}
            >
              {ended ? 'Complete' : 'Continue'}
            </Button>
            <Button disabled={ended} onClick={() => closeThread()}>
              Abandon
            </Button>
          </Grid>
        </Fragment>
      )}
    </Grid>
  )
}
