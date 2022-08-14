import { css } from '@emotion/css'
import { Box, Typography } from '@mui/material'

import { css_colors } from '../theme/colors'

const classes = {
  footer: css`
    position: absolute;
    bottom: 0;
    width: 100% !important;
    background: ${css_colors.background.cards};
    color: ${css_colors.primary};
  `,
  text: css`
    padding: 6px 16px 6px 16px;
  `
}

export function Footer() {
  return (
    <Box component='div' className={classes.footer}>
      <Typography className={classes.text}>© 2017</Typography>
    </Box>
  )
}
