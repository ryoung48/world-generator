import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

import { view__context } from '../context'
import { cssColors } from '../theme/colors'

export function Header(props: { stats: boolean; toggleStats: Dispatch<SetStateAction<boolean>> }) {
  const { stats, toggleStats } = props
  const { state } = view__context()
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
                sx={{ lineHeight: 0.2, color: cssColors.subtitle, fontSize: 10 }}
              >
                {state?.id || '∞'}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={0} justifyContent='end'>
            <Grid item px={1}>
              <Button onClick={() => toggleStats(!stats)} disabled={!state.id}>
                {stats ? 'world' : 'stats'}
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
