import { css } from '@emotion/css'
import { Grid } from '@mui/material'
import { ReactNode } from 'react'

import { VIEW } from '../../context'
import { cssColors } from '../../theme/colors'
import { HERALDRY, Heraldry } from './Heraldry'
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
  const { state } = VIEW.context()
  const nation = window.world.regions[state.region]
  return (
    <Grid container className={classes.panel} p={3} justifyContent='space-between'>
      <Grid item xs={7}>
        <CodexTitle title={title} subtitle={subtitle}></CodexTitle>
      </Grid>
      <Grid item xs={1.5}>
        <Heraldry value={nation.name} size={50} config={HERALDRY.config(nation)}></Heraldry>
      </Grid>
      <Grid item xs={12} p={0} my={1} className={classes.content}>
        {content}
      </Grid>
    </Grid>
  )
}
