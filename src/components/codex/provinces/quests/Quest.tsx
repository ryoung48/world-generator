import { Button, Divider, Grid, IconButton, Pagination } from '@mui/material'
import { Plus } from 'mdi-material-ui'
import { Fragment, useEffect, useState } from 'react'

import {
  quest__abandoned,
  quest__advance,
  quest__blocked,
  quest__close,
  quest__ongoing,
  quest__paused
} from '../../../../models/quests'
import { stage__current, stage__weather } from '../../../../models/quests/stages'
import { Quest } from '../../../../models/quests/types'
import { ARRAY } from '../../../../models/utilities/array'
import { DIFFICULTY } from '../../../../models/utilities/difficulty'
import { VIEW } from '../../../context'
import { StageView } from './Stage'
import { quest__icons } from './styles'

const stagesPerPage = 5

export function QuestView(props: { quest: Quest; goToQuest: (_quest: Quest) => void }) {
  const { quest, goToQuest } = props
  const { state, dispatch } = VIEW.context()
  const { avatar, journal, province } = state
  const { stages } = quest
  const pages = Math.ceil(quest.stages.length / stagesPerPage)
  const [page, setPage] = useState(pages)
  const ended = !quest__ongoing(quest)
  const paused = quest__paused(quest)
  const avatarAtLoc = province === quest.location
  const parent = window.world.quests[quest.parent]
  const closeQuest = () => {
    quest__close({ quest, avatar })
    dispatch({ type: 'refresh journal' })
    if (parent) goToQuest(parent)
  }
  useEffect(() => {
    setPage(pages)
  }, [journal])
  const currentStages = ARRAY.partition([...stages].reverse(), stagesPerPage).reverse()
  const current = stage__current(quest)
  const pc = DIFFICULTY.avatar.cr(avatar)
  return (
    <Grid container style={{ fontSize: 12 }}>
      <Grid item xs={12}>
        <b>Mission: </b>
        {quest.goal.text}. <i>{quest.goal.complication}.</i>
      </Grid>
      <Grid item xs={12}>
        <Divider style={{ marginTop: 5, marginBottom: 10 }}>Challenges</Divider>
      </Grid>
      {currentStages[page - 1].reverse().map((stage, i) => {
        if (!stage) return <span key={i}>placeholder</span>
        const ref = window.world.quests[stage.child]
        const paused = ref && quest__ongoing(ref)
        const abandoned = ref && quest__abandoned(ref)
        const blocked = stage === current && quest__blocked({ pc, quest })
        const status = abandoned
          ? 'abandoned'
          : blocked
          ? 'blocked'
          : paused
          ? 'paused'
          : stage.status ?? 'in progress'
        const { Icon, color } = quest__icons[status]
        stage__weather({ stage, quest })
        return (
          <Grid item xs={12} key={i} mt={i === 0 ? 0 : 1}>
            <Grid container alignContent='top'>
              <Grid item xs={1}>
                <Icon style={{ color }}></Icon>
              </Grid>
              <Grid item xs={10}>
                <StageView stage={stage} goToQuest={goToQuest}></StageView>
              </Grid>
              <Grid item xs={1}>
                <IconButton>
                  <Plus></Plus>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        )
      })}
      <Grid item xs={12}>
        <Divider style={{ marginTop: 10, marginBottom: 10 }}></Divider>
      </Grid>
      <Grid item container justifyContent='space-between' xs={12}>
        <Grid item>
          {ended ? (
            <Fragment>
              <Grid item xs={12}>
                <span>Quest {quest.status === 'failure' ? 'failed' : 'completed'}.</span>
              </Grid>
            </Fragment>
          ) : (
            <Fragment>
              <Button
                style={{ marginRight: 10 }}
                disabled={!avatarAtLoc || paused || quest__blocked({ pc, quest })}
                onClick={() => {
                  quest.accepted = true
                  quest__advance({ quest, avatar })
                  dispatch({ type: 'refresh journal' })
                }}
              >
                {!quest.accepted ? 'Accept' : ended ? 'Complete' : 'Continue'}
              </Button>
              <Button disabled={ended} onClick={() => closeQuest()}>
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
