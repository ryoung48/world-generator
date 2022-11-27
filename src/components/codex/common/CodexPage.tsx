import { css } from '@emotion/css'
import { Button, Grid } from '@mui/material'
import { ReactNode } from 'react'

import { view__context } from '../../context'
import { cssColors } from '../../theme/colors'
import { CharGen } from '../actors/CharGen'
import { CodexTitle } from './text/title'
import { CodexTitleProps } from './text/title/types'

const classes = {
  panel: css`
    background-color: ${cssColors.background.cards};
    border: thick double ${cssColors.primary};
    overflow-y: auto;
    overscroll-behavior-y: contain;
    scroll-snap-type: y proximity;
    max-height: 810px;
  `,
  content: css`
    font-size: 14px;
  `
}

export function CodexPage(props: { content: ReactNode } & CodexTitleProps) {
  const { title, subtitle, content } = props
  const { state, dispatch } = view__context()
  return (
    <Grid container className={classes.panel} p={3} justifyContent='space-between'>
      <Grid item xs={7}>
        <CodexTitle title={title} subtitle={subtitle}></CodexTitle>
      </Grid>
      <Grid item xs={4} m={1}>
        <Grid container spacing={4} justifyContent='center'>
          <Grid xs={3} item>
            <CharGen></CharGen>
          </Grid>
          <Grid xs={3} item>
            <Button
              disabled={state.codex.history.length < 1}
              onClick={() => dispatch({ type: 'back' })}
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} p={0} my={3} className={classes.content}>
        {content}
      </Grid>
    </Grid>
  )
}
