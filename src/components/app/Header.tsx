import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

import { view__context } from '../../context'
import { location__conditions } from '../../models/regions/locations/environment/conditions'
import { formatters } from '../../models/utilities/text/formatters'
import { css_colors } from '../theme/colors'

export function Header(props: { stats: boolean; toggle_stats: Dispatch<SetStateAction<boolean>> }) {
  const { stats, toggle_stats } = props
  const { state } = view__context()
  let time = Date.now()
  let context = ''
  if (state.id) {
    const location = window.world.locations[state.codex.location]
    const { conditions, summary, local_time } = location__conditions(location)
    time = local_time
    context = `(${conditions.season.toLowerCase()}, ${summary})`
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='fixed'
        sx={{
          backgroundColor: `${css_colors.background.cards} !important`,
          color: css_colors.primary
        }}
      >
        <Toolbar>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography variant='h5' component='div'>
                World Generator
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ margin: 0 }}>
              <Typography
                variant='subtitle2'
                component='div'
                sx={{ lineHeight: 0.2, color: css_colors.subtitle, fontSize: 12 }}
              >
                {state?.id || '∞'}
              </Typography>
            </Grid>
          </Grid>
          <div>
            <div
              style={{
                fontSize: '20px',
                lineHeight: 1.2,
                color: css_colors.primary,
                marginRight: 50
              }}
            >
              {formatters.date(time)}
            </div>
            <div style={{ fontSize: '12px', lineHeight: 0.5, color: css_colors.subtitle }}>
              {formatters.time(time)} {context}
            </div>
          </div>
          <Button onClick={() => toggle_stats(!stats)} disabled={!state.id}>
            {stats ? 'world' : 'stats'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
