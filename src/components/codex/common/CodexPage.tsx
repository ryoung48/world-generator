import { css } from '@emotion/css'
import { Button, Grid, IconButton } from '@mui/material'
import { CrosshairsGps } from 'mdi-material-ui'
import { ReactNode } from 'react'

import { view__context } from '../../../context'
import { location__zoom } from '../../../models/utilities/codex'
import { css_colors } from '../../theme/colors'
import { CharGen } from '../actors/CharGen'
import { CodexTitle } from './text/title'
import { CodexTitleProps } from './text/title/types'

const classes = {
  panel: css`
    background-color: ${css_colors.background.cards};
    border: thick double ${css_colors.primary};
    overflow-y: auto;
    overscroll-behavior-y: contain;
    scroll-snap-type: y proximity;
    max-height: 810px;
  `
}

export function CodexPage(props: { content: ReactNode } & CodexTitleProps) {
  const { title, subtitle, content } = props
  const { state, dispatch } = view__context()
  const { current } = state.codex
  const location = window.world.locations[state.codex.location]
  const nation = window.world.regions[state.codex.nation]
  const loc_zoom = current === 'location'
  const zoom = loc_zoom ? location__zoom(location) : 10
  const settlement_idx = loc_zoom ? location.idx : nation.capital
  const { x, y } = window.world.locations[settlement_idx]
  const enabled_gps = ['location', 'nation'].includes(current)
  return (
    <Grid container className={classes.panel} p={3} justifyContent='space-between'>
      <Grid item xs={7}>
        <CodexTitle title={title} subtitle={subtitle}></CodexTitle>
      </Grid>
      <Grid item xs={3} m={1}>
        <Grid container spacing={4}>
          <Grid xs={4} item>
            <CharGen></CharGen>
          </Grid>
          <Grid xs={4} item>
            <Button
              disabled={state.codex.history.length < 1}
              onClick={() => dispatch({ type: 'back' })}
            >
              Back
            </Button>
          </Grid>
          <Grid xs={4} item>
            <IconButton
              size='small'
              color='primary'
              disabled={!enabled_gps}
              onClick={() => {
                dispatch({ type: 'update gps', payload: { gps: { x, y, zoom } } })
              }}
            >
              <CrosshairsGps></CrosshairsGps>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} p={0} my={3}>
        {content}
      </Grid>
    </Grid>
  )
}
