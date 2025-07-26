import { css } from '@emotion/css'
import { Grid } from '@mui/material'
import { ReactNode } from 'react'

import { PROVINCE } from '../../models/provinces'
import { VIEW } from '../context'
import { fonts } from '../theme/fonts'
import { HERALDRY } from '../world/shapes/heraldry'
import { Heraldry } from './Heraldry'
// import { PlayerCharacterView } from './PCs'
import { CodexTitle } from './text/title'
import { CodexTitleProps } from './text/title/types'

const classes = {
  content: css`
    font-size: 14px;
    font-family: ${fonts.content};
    overflow-y: auto;
    overscroll-behavior-y: contain;
    scroll-snap-type: y proximity;
    max-height: 500px;
    padding-right: 20px;
  `,
  divider: css`
    font-size: 10px !important;
    font-family: ${fonts.content};
  `
}

export function CodexPage(props: { content: ReactNode } & CodexTitleProps) {
  const { title, subtitle, content } = props
  const { state } = VIEW.context()
  const province = window.world.provinces[state.loc.province]
  const nation = PROVINCE.nation(province)
  return (
    <Grid container p={2} justifyContent='space-between'>
      <Grid item xs={7}>
        <CodexTitle title={title} subtitle={subtitle}></CodexTitle>
      </Grid>
      <Grid item xs={2}>
        <Heraldry
          value={nation.name}
          size={50}
          config={HERALDRY.config(nation)}
          style={province.heraldry.style}
        ></Heraldry>
      </Grid>
      <Grid item xs={12} my={1} className={classes.content}>
        {content}
      </Grid>
      {/* <Grid item xs={12}>
        <Divider className={classes.divider}>PCs</Divider>
      </Grid>
      <Grid item xs={12} mt={1} style={{ fontFamily: fonts.content, fontSize: 8 }}>
        <PlayerCharacterView></PlayerCharacterView>
      </Grid> */}
    </Grid>
  )
}
