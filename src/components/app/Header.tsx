import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

import { VIEW } from '../context'
import { cssColors } from '../theme/colors'

export function Header(props: { stats: boolean; toggleStats: Dispatch<SetStateAction<boolean>> }) {
  const { stats, toggleStats } = props
  const { state } = VIEW.context()
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
          <Grid container spacing={0} justifyContent='space-between'>
            <Grid item xs={3} container spacing={0} alignContent='center'>
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
                  {`${state?.id || '∞'}`}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={3} container justifyContent='end' alignContent='center'>
              <Grid item px={1}>
                <Button onClick={() => toggleStats(!stats)} disabled={!state.id}>
                  {stats ? 'world' : 'stats'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
