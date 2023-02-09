import { Button, Divider, Grid, Pagination } from '@mui/material'
import { Fragment, useEffect, useState } from 'react'

import {
  thread__abandoned,
  thread__advance,
  thread__close,
  thread__ongoing,
  thread__paused
} from '../../../../models/threads'
import { Thread } from '../../../../models/threads/types'
import { partition } from '../../../../models/utilities/math'
import { decorateText } from '../../../../models/utilities/text/decoration'
import { view__context } from '../../../context'
import { cssColors } from '../../../theme/colors'
import { DetailedTableRow } from '../../common/DataTable'
import { SectionList } from '../../common/text/SectionList'
import { StyledText } from '../../common/text/StyledText'
import { StageView } from './Stage'
import { thread__icons } from './styles'

const DescribeActor = (params: Thread['actors'][number]) => {
  const { idx, tag } = params
  const actor = window.world.actors[idx]
  const culture = window.world.cultures[actor.culture]
  return (
    <Grid container style={{ fontSize: 14 }}>
      <Grid item xs={12}>
        <DetailedTableRow
          title={actor.name}
          subtitle={
            <span>
              <b>{tag}</b>{' '}
              <StyledText
                text={`(${`${actor.age}, ${actor.gender} ${decorateText({
                  label: culture.species,
                  tooltip: culture.name,
                  color: cssColors.subtitle
                })}`})`}
              ></StyledText>
              , {actor.profession.title}
            </span>
          }
        ></DetailedTableRow>
      </Grid>
      <Grid item xs={12} style={{ fontSize: 10 }}>
        <StyledText
          text={`${decorateText({
            label: 'appearance',
            bold: true
          })}: ${actor.appearance}`}
        ></StyledText>
      </Grid>
      <Grid item xs={12} style={{ fontSize: 10 }}>
        <StyledText
          text={`${decorateText({
            label: 'personality',
            bold: true
          })}: ${actor.personality.join(', ')}`}
        ></StyledText>
      </Grid>
      <Grid item xs={12} style={{ fontSize: 10 }}>
        <StyledText
          text={`${decorateText({
            label: 'quirks',
            bold: true
          })}: ${actor.quirks.map(({ text }) => text).join(', ')}`}
        ></StyledText>
      </Grid>
    </Grid>
  )
}

const stagesPerPage = 5

export function ThreadView(props: {
  thread: Thread
  goToThread: (_thread: Thread) => void
  clearExpand: () => void
}) {
  const { thread, goToThread, clearExpand } = props
  const { state, dispatch } = view__context()
  const { goal, closed, stages, complication, actors } = thread
  const pages = Math.ceil(thread.stages.length / stagesPerPage)
  const [page, setPage] = useState(pages)
  const ended = !thread__ongoing(thread)
  const paused = thread__paused(thread)
  const avatarAtLoc = state.codex.province === thread.location
  const parent = window.world.threads[thread.parent]
  const closeThread = () => {
    thread__close({ thread })
    dispatch({ type: 'refresh journal' })
    if (parent) goToThread(parent)
    else clearExpand()
  }
  useEffect(() => {
    setPage(pages)
  }, [state.journal])
  const currentStages = partition([...stages], stagesPerPage)
  return (
    <Grid container style={{ fontSize: 12 }}>
      <Grid item xs={12} mt={1}>
        <span>
          <StyledText text={goal.text}></StyledText>
          {complication && <i>{` ${complication.text}`}</i>}
        </span>
      </Grid>
      <Fragment>
        <Grid item xs={12}>
          <Divider style={{ marginTop: 10, marginBottom: 10 }}></Divider>
        </Grid>
        {actors.map((actor, i) => {
          return (
            <Fragment key={i}>
              <Grid item xs={5.5}>
                <DescribeActor {...actor}></DescribeActor>
              </Grid>
              {i < actors.length - 1 && (
                <Grid item xs={1} display='flex' justifyContent='center'>
                  <Divider orientation='vertical'></Divider>
                </Grid>
              )}
            </Fragment>
          )
        })}
        <Grid item xs={12}>
          <Divider style={{ marginTop: 10, marginBottom: 10 }}></Divider>
        </Grid>
        {currentStages[page - 1].map((stage, i) => {
          if (!stage) return <span key={i}>placeholder</span>
          const ref = window.world.threads[stage.child]
          const paused = ref && thread__ongoing(ref)
          const abandoned = ref && thread__abandoned(ref)
          const status = abandoned ? 'abandoned' : paused ? 'paused' : stage.status ?? 'in progress'
          const { Icon, color } = thread__icons[status]
          return (
            <Grid item xs={12} key={i} mt={1}>
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
      {stages.length > stagesPerPage && (
        <Fragment>
          <Grid item xs={12}>
            <Divider style={{ marginTop: 10, marginBottom: 10 }}></Divider>
          </Grid>
          <Grid item xs={12} display='flex' justifyContent='center'>
            <Pagination
              count={pages}
              variant='outlined'
              color='primary'
              shape='rounded'
              page={page}
              onChange={(_, value) => setPage(value)}
            ></Pagination>
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
              disabled={!avatarAtLoc || paused}
              onClick={() => {
                if (ended) {
                  closeThread()
                } else {
                  thread__advance({ thread })
                  dispatch({ type: 'refresh journal' })
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
