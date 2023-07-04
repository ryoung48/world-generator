import { Button, Dialog, Divider, Grid, IconButton } from '@mui/material'
import { Account, Sack } from 'mdi-material-ui'
import { useEffect, useState } from 'react'

import { thread__advance } from '../../../models/threads'
import { background__elements } from '../../../models/threads/backgrounds'
import { decorateTag } from '../../../models/threads/backgrounds/decorations'
import { Thread } from '../../../models/threads/types'
import { formatters } from '../../../models/utilities/text/formatters'
import { view__context } from '../../context'
import { DetailedTableRow } from '../common/DataTable'
import { LazyTippy } from '../common/text/LazyTippy'
import { StyledText } from '../common/text/StyledText'
import { MarketView } from './Market'
import { PlayerCharacterView } from './PCs'

export function ThreadView(props: { thread: Thread }) {
  const { thread } = props
  background__elements(thread)
  const { state, dispatch } = view__context()
  const [market, setMarket] = useState(false)
  const province = window.world.provinces[thread.location]
  useEffect(() => {
    dispatch({ type: 'select province', payload: { target: province } })
  }, [province])
  const { avatar } = state
  const { mission } = thread
  const ended = thread.status !== undefined
  const right = [
    { label: 'Friend', content: <StyledText text={thread.friend}></StyledText> },
    { label: 'Thing', content: <StyledText text={thread.thing}></StyledText> },
    { label: 'Place', content: <StyledText text={thread.place}></StyledText> },
    {
      label: 'Mission',
      content: <StyledText text={decorateTag(mission.text, mission.complication)}></StyledText>
    }
  ]
  const left = [
    { label: 'Enemy', content: <StyledText text={thread.enemy}></StyledText> },
    { label: 'Hostiles', content: <StyledText text={thread.hostiles}></StyledText> },
    { label: 'Complication', content: <StyledText text={thread.complication}></StyledText> }
  ]
  return (
    <Grid container sx={{ fontSize: 12, lineHeight: 1.5 }}>
      {thread.hooks.map(({ tag, text }, i) => (
        <Grid item key={i} xs={12}>
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
      <Grid item xs={12}>
        <Divider style={{ marginTop: 10, marginBottom: 10 }}></Divider>
      </Grid>
      <Grid item container xs={12} justifyContent='space-between'>
        <Grid item>
          {ended ? (
            <DetailedTableRow
              title={`Quest ${thread.status === 'failure' ? 'failed' : 'completed'}.`}
              subtitle={`Reward: ${formatters.compact(thread.outcome?.cp ?? 0)} cp`}
            ></DetailedTableRow>
          ) : (
            <Button
              style={{ marginRight: 10 }}
              onClick={() => {
                thread__advance({ thread, avatar })
                dispatch({ type: 'progress', payload: { thread } })
              }}
            >
              Accept
            </Button>
          )}
        </Grid>
        <Grid item>
          <PlayerCharacterView></PlayerCharacterView>
        </Grid>
        <Grid item>
          <LazyTippy arrow={false} animation='scale' content={'Trade'}>
            <IconButton color='primary' onClick={() => setMarket(true)}>
              <Sack></Sack>
            </IconButton>
          </LazyTippy>
          <LazyTippy arrow={false} animation='scale' content={'Recruit'}>
            <IconButton color='primary'>
              <Account></Account>
            </IconButton>
          </LazyTippy>
        </Grid>
      </Grid>
      <Dialog open={market} onClose={() => setMarket(false)}>
        <MarketView></MarketView>
      </Dialog>
    </Grid>
  )
}
