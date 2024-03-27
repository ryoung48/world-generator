import { css } from '@emotion/css'
import { Box, Grid } from '@mui/material'

import { style__subtitle } from '../../../../theme'
import { cssColors } from '../../../../theme/colors'
import { fonts } from '../../../../theme/fonts'
import { CodexTitleProps } from './types'

const classes = {
  title: css`
    color: ${cssColors.primary};
    font-weight: 600;
    font-size: 50px;
  `,
  subtitle: css`
    padding-top: 3px;
    font-family: ${fonts.content};
  `
}

export function CodexTitle(props: CodexTitleProps) {
  const { title, subtitle } = props
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box className={classes.title}>{title}</Box>
      </Grid>
      <Grid item xs={12}>
        <Box className={`${classes.subtitle} ${style__subtitle}`}>{subtitle}</Box>
      </Grid>
    </Grid>
  )
}
