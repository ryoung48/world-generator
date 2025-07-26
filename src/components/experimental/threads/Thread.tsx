import { Button, Divider, Grid } from '@mui/material'
import { Dispatch, Fragment, SetStateAction } from 'react'

import { THREAD } from '../../../models/threads'
import { STAGE } from '../../../models/threads/stages'
import { Thread } from '../../../models/threads/types'
import { TEXT } from '../../../models/utilities/text'
import { SectionList } from '../../common/text/SectionList'
import { StageView } from './Stage'
import { thread__icons } from './styles'

export function ThreadView(props: {
  thread: Thread
  avatar: number
  goToThread: (_thread: Thread) => void
  clearExpand: () => void
  setAvatar: Dispatch<SetStateAction<number>>
}) {
  const { thread, goToThread, clearExpand, setAvatar, avatar } = props
  const { stages, closed } = thread
  const ended = !THREAD.status.ongoing(thread)
  const blocked = THREAD.status.blocked({ thread, avatar })
  const paused = THREAD.status.paused(thread)
  const parent = THREAD.get.parent(thread)
  const closeThread = () => {
    const reward = THREAD.actions.close({ thread, avatar })
    setAvatar(avatar + reward)
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
                  <i>{TEXT.titleCase('Goal')}. </i>
                  test
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
        {stages.map((stage, i) => {
          if (!stage) return <span key={i}>placeholder</span>
          const blocked = STAGE.blocked({ stage, avatar })
          const child = THREAD.get.child(stage)
          const paused = child && THREAD.status.paused(child)
          const abandoned = child && THREAD.status.abandoned(child)
          const status = abandoned
            ? 'abandoned'
            : blocked
            ? 'blocked'
            : paused
            ? 'paused'
            : stage.status ?? 'in progress'
          const { icon: Icon, color } = thread__icons[status]
          return (
            <Grid item xs={12} key={i}>
              <Grid container alignContent='center'>
                <Grid item xs={1}>
                  <Icon style={{ color }}></Icon>
                </Grid>
                <Grid item xs={11}>
                  <StageView stage={stage} avatar={avatar} goToThread={goToThread}></StageView>
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
              disabled={blocked || paused}
              onClick={() => {
                if (ended) {
                  closeThread()
                } else {
                  const reward = THREAD.actions.advance({ thread, avatar })
                  setAvatar(avatar + reward)
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
