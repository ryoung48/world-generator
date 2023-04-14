import { Button, Divider, Grid, Pagination } from '@mui/material'
import { Fragment, useEffect, useState } from 'react'

import {
  thread__abandoned,
  thread__advance,
  thread__blocked,
  thread__close,
  thread__ongoing,
  thread__paused
} from '../../../../models/threads'
import { stage__current, stage__weather } from '../../../../models/threads/stages'
import { Thread } from '../../../../models/threads/types'
import { partition } from '../../../../models/utilities/math'
import { formatters } from '../../../../models/utilities/text/formatters'
import { view__context } from '../../../context'
import { cssColors } from '../../../theme/colors'
import { StyledText } from '../../common/text/StyledText'
import { StageView } from './Stage'
import { thread__icons } from './styles'

const stagesPerPage = 5

export function ThreadView(props: { thread: Thread; goToThread: (_thread: Thread) => void }) {
  const { thread, goToThread } = props
  const { state, dispatch } = view__context()
  const { avatar, codex, journal } = state
  const { mission, stages } = thread
  const pages = Math.ceil(thread.stages.length / stagesPerPage)
  const [page, setPage] = useState(pages)
  const ended = !thread__ongoing(thread)
  const paused = thread__paused(thread)
  const avatarAtLoc = codex.province === thread.location
  const parent = window.world.threads[thread.parent]
  const closeThread = () => {
    const outcome = thread__close({ thread, avatar })
    dispatch({ type: 'progress', payload: outcome })
    dispatch({ type: 'refresh journal' })
    if (parent) goToThread(parent)
  }
  useEffect(() => {
    setPage(pages)
  }, [journal, thread])
  const currentStages = partition([...stages].reverse(), stagesPerPage).reverse()
  const current = stage__current(thread)
  const right = [
    { label: 'Friend', content: <StyledText text={thread.friend}></StyledText> },
    { label: 'Thing', content: <StyledText text={thread.thing}></StyledText> },
    { label: 'Place', content: <StyledText text={thread.place}></StyledText> },
    { label: 'Mission', content: <StyledText text={`${mission.text}.`}></StyledText> }
  ]
  const left = [
    { label: 'Enemy', content: <StyledText text={thread.enemy}></StyledText> },
    { label: 'Hostiles', content: <StyledText text={thread.hostiles}></StyledText> },
    { label: 'Complication', content: <StyledText text={thread.complication}></StyledText> }
  ]
  return (
    <Grid container>
      {thread.hooks.map(({ tag, text }, i) => (
        <Grid key={i} xs={12}>
          <b>{tag}:</b> {text}
        </Grid>
      ))}
      <Grid item xs={12}>
        <Divider style={{ marginTop: 10, marginBottom: 10 }}></Divider>
      </Grid>
      <Grid item container alignContent='start' xs={5.5}>
        {right.map(({ label, content }, i) => (
          <Grid item xs={12} key={i}>
            <b>{label}</b>: {content}
          </Grid>
        ))}
      </Grid>
      <Grid item container xs={1} justifyContent='center'>
        <Divider orientation='vertical'></Divider>
      </Grid>
      <Grid item container alignContent='start' xs={5.5}>
        {left.map(({ label, content }, i) => (
          <Grid item xs={12} key={i}>
            <b>{label}</b>: {content}
          </Grid>
        ))}
      </Grid>
      <Fragment>
        <Grid item xs={12}>
          <Divider style={{ marginTop: 10, marginBottom: 10 }}>Challenges</Divider>
        </Grid>
        {currentStages[page - 1].reverse().map((stage, i) => {
          if (!stage) return <span key={i}>placeholder</span>
          const ref = window.world.threads[stage.child]
          const paused = ref && thread__ongoing(ref)
          const abandoned = ref && thread__abandoned(ref)
          const blocked = stage === current && thread__blocked({ avatar, thread })
          const status = abandoned
            ? 'abandoned'
            : blocked
            ? 'blocked'
            : paused
            ? 'paused'
            : stage.status ?? 'in progress'
          const { Icon, color } = thread__icons[status]
          stage__weather({ stage, thread })
          return (
            <Grid item xs={12} key={i} mt={i === 0 ? 0 : 1}>
              <Grid container alignContent='top'>
                <Grid item xs={1}>
                  <Icon style={{ color }}></Icon>
                </Grid>
                <Grid item xs={10}>
                  <StageView stage={stage} goToThread={goToThread}></StageView>
                </Grid>
              </Grid>
            </Grid>
          )
        })}
      </Fragment>
      <Grid item xs={12}>
        <Divider style={{ marginTop: 10, marginBottom: 10 }}></Divider>
      </Grid>
      <Grid item container justifyContent='space-between' xs={12}>
        <Grid item>
          {ended ? (
            <Fragment>
              <Grid item xs={12}>
                <span>Quest {thread.status === 'failure' ? 'failed' : 'completed'}.</span>
              </Grid>
              <Grid item xs={12} style={{ color: cssColors.subtitle, fontSize: 10 }}>
                <span>
                  <b>Reward:</b>
                  {` ${formatters.compact(thread.outcome?.cp ?? 0)} cp`}
                </span>
              </Grid>
            </Fragment>
          ) : (
            <Fragment>
              <Button
                style={{ marginRight: 10 }}
                disabled={!avatarAtLoc || paused || thread__blocked({ avatar, thread })}
                onClick={() => {
                  thread.accepted = true
                  const outcome = thread__advance({ thread, avatar })
                  dispatch({ type: 'progress', payload: outcome })
                  dispatch({ type: 'refresh journal' })
                }}
              >
                {!thread.accepted ? 'Accept' : ended ? 'Complete' : 'Continue'}
              </Button>
              <Button disabled={ended} onClick={() => closeThread()}>
                Abandon
              </Button>
            </Fragment>
          )}
        </Grid>
        <Grid item>
          {stages.length > stagesPerPage && (
            <Grid item xs={12} display='flex' justifyContent='center'>
              <Pagination
                count={pages}
                color='primary'
                shape='rounded'
                page={page}
                onChange={(_, value) => setPage(value)}
              ></Pagination>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}
