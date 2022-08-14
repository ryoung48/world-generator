import { css } from '@emotion/css'
import { Box, Grid } from '@mui/material'

import { style__subtitle } from '../../../../theme'
import { css_colors } from '../../../../theme/colors'
import { CodexTitleProps } from './types'

const classes = {
  title: css`
    font-family: 'serif';
    color: ${css_colors.primary};
    font-weight: 600;
    font-size: 40px;
  `,
  subtitle: css`
    padding-top: 5px;
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
