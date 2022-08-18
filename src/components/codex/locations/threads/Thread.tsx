import { Button, Divider, Grid } from '@mui/material'
import { Fragment, useState } from 'react'

import { actor__location } from '../../../../models/npcs/actors'
import {
  task__inProgress,
  thread__progress,
  thread__status,
  thread__taskOdds,
  thread__tasks,
  thread__xp
} from '../../../../models/threads'
import {
  thread__advance,
  thread__close,
  thread__exp,
  thread__fork
} from '../../../../models/threads/actions'
import { thread__spawnChildren } from '../../../../models/threads/spawn'
import { Thread } from '../../../../models/threads/types'
import { titleCase } from '../../../../models/utilities/text'
import { view__context } from '../../../context'
import { RadioSelect } from '../../common/input/RadioSelect'
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
  const [selectedFork, setSelectedFork] = useState(-1)
  const avatar = window.world.actors[state.avatar]
  const { goal, tasks, fork, closed } = thread
  const hasTasks = tasks.length > 0
  const { completed, failed, status } = thread__progress({ thread, avatar })
  const ended = failed || completed
  const coreTasks = thread__tasks({ tasks, avatar })
  const forkedTasks = thread__tasks({ tasks: fork?.tasks ?? [], avatar })
  const noFork = fork && !fork?.tasks[selectedFork]
  const latestTask = coreTasks.find(task__inProgress)
  const childRequired = latestTask?.thread !== undefined
  const loc = window.world.locations[thread.location]
  const avatarAtLoc = avatar && actor__location(avatar) === loc
  const closeThread = () => {
    thread__close({ thread, ref: avatar, avatar })
    const parent = window.world.threads[thread.parent]
    dispatch({ type: 'set avatar', payload: { avatar } })
    if (parent) goToThread(parent)
    else clearExpand()
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
                  <i>{titleCase(goal)}. </i>
                  {thread.text}
                </span>
              )
            }
          ]}
        ></SectionList>
      </Grid>
      {hasTasks && (
        <Fragment>
          <Grid item xs={12}>
            <Divider style={{ marginTop: 10, marginBottom: 10 }}></Divider>
          </Grid>
          {coreTasks.map((task, i) => {
            const { tier } = thread__taskOdds({
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
                    <TaskView task={task} goToThread={goToThread}></TaskView>
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
              selected={{
                value: selectedFork,
                setValue: value => setSelectedFork(parseInt(value))
              }}
              items={forkedTasks.map((task, i) => ({
                value: i,
                label: <TaskView task={task} goToThread={goToThread}></TaskView>
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
              disabled={noFork || childRequired || !avatarAtLoc || status === 'blocked'}
              onClick={() => {
                ended
                  ? closeThread()
                  : fork
                  ? thread__fork({
                      thread,
                      decision: forkedTasks[selectedFork],
                      ref: avatar,
                      avatar
                    })
                  : thread__advance({ thread, ref: avatar, avatar })
                if (!ended) {
                  thread__spawnChildren({ thread, avatar })
                  dispatch({ type: 'set avatar', payload: { avatar } })
                }
                setSelectedFork(-1)
              }}
            >
              Continue
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
