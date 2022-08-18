import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

import { location__conditions } from '../../models/regions/locations/environment/conditions'
import { formatters } from '../../models/utilities/text/formatters'
import { view__context } from '../context'
import { cssColors } from '../theme/colors'

export function Header(props: { stats: boolean; toggleStats: Dispatch<SetStateAction<boolean>> }) {
  const { stats, toggleStats } = props
  const { state } = view__context()
  let time = Date.now()
  let context = ''
  if (state.id) {
    const location = window.world.locations[state.codex.location]
    const { conditions, summary, localTime } = location__conditions(location)
    time = localTime
    context = `(${conditions.season.toLowerCase()}, ${summary})`
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='fixed'
        sx={{
          backgroundColor: `${cssColors.background.cards} !important`,
          color: cssColors.primary
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
                sx={{ lineHeight: 0.2, color: cssColors.subtitle, fontSize: 12 }}
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
                color: cssColors.primary,
                marginRight: 50
              }}
            >
              {formatters.date(time)}
            </div>
            <div style={{ fontSize: '12px', lineHeight: 0.5, color: cssColors.subtitle }}>
              {formatters.time(time)} {context}
            </div>
          </div>
          <Button onClick={() => toggleStats(!stats)} disabled={!state.id}>
            {stats ? 'world' : 'stats'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
