import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  LinearProgress,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { Dice3 } from 'mdi-material-ui'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { WORLD } from '../../models'
import { INFRASTRUCTURE_SHAPER } from '../../models/shapers/civilization/infrastructure'
import { NATION_SHAPER } from '../../models/shapers/nations'
import { PROVINCE_SHAPER } from '../../models/shapers/civilization/provinces'
import { TIMEZONE_SHAPER } from '../../models/shapers/civilization/timezones'
import { SHAPER_CONTINENTS } from '../../models/shapers/continents'
import { SHAPER_DISPLAY } from '../../models/shapers/display'
import { DICE } from '../../models/utilities/math/dice'
import { TIME } from '../../models/utilities/math/time'
import { PERFORMANCE } from '../../models/utilities/performance'
import { VIEW } from '../context'
import { fonts } from '../theme/fonts'
import UrbanMap from '../settlement'

const catchup = 500

const generator = async (params: {
  seed: string
  res: number
  update: Dispatch<SetStateAction<number>>
}) => {
  const { seed, res, update } = params
  update(0)
  await TIME.delay(catchup)
  window.world = WORLD.spawn({ seed, res })
  SHAPER_CONTINENTS.build()
  update(2)
  await TIME.delay(catchup)
  PROVINCE_SHAPER.build()
  update(3)
  await TIME.delay(catchup)
  NATION_SHAPER.build()
  TIMEZONE_SHAPER.build()
  INFRASTRUCTURE_SHAPER.build()
  update(4)
  await TIME.delay(catchup)
  SHAPER_DISPLAY.build()
  update(5)
  await TIME.delay(catchup)
  PERFORMANCE.profile.switch(window.profiles.current)
}

export function Landing() {
  window.dice = DICE.spawn('default')
  const [seed, setSeed] = useState(DICE.id())
  const [active, setActive] = useState(-1)
  const { dispatch } = VIEW.context()
  const generating = active >= 0
  const steps = ['continents', 'regions', 'civilization', 'infrastructure', 'lorecrafting']
  const res = 8

  const progress = generating ? Math.round((active / steps.length) * 100) : 0

  const handleGenerate = async () => {
    if (!seed.trim()) return
    await generator({ seed: seed.trim(), res, update: setActive })
    dispatch({ type: 'init world', payload: { id: seed.trim() } })
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !generating && seed.trim()) {
      handleGenerate()
    }
  }

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !generating && seed.trim()) {
        handleGenerate()
      }
    }
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [seed, generating])

  return (
    <Grid container justifyContent='center' alignItems='center' sx={{ height: '100%' }}>
      <Grid item xs={12} sm={8} md={5} lg={4} sx={{ px: 2 }}>
        <Typography
          variant='h1'
          align='center'
          sx={{ fontFamily: fonts.maps, fontWeight: 'bold', fontSize: 96 }}
        >
          World Generator
        </Typography>
        <Typography
          variant='subtitle1'
          align='center'
          sx={{ mb: 6, color: 'text.secondary', fontFamily: fonts.maps }}
        >
          Create unique procedural worlds
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label='World Seed'
            disabled={generating}
            onChange={event => setSeed(event.currentTarget.value)}
            onKeyDown={handleKeyDown}
            value={seed}
            error={!seed.trim()}
            helperText={!seed.trim() ? 'Seed is required' : ' '}
            InputProps={{
              endAdornment: (
                <Tooltip title='Randomize seed' placement='top'>
                  <span>
                    <IconButton
                      onClick={() => setSeed(DICE.id())}
                      disabled={generating}
                      size='small'
                    >
                      <Dice3 />
                    </IconButton>
                  </span>
                </Tooltip>
              )
            }}
          />
        </Box>

        <Button
          variant='contained'
          size='large'
          fullWidth
          disabled={generating || !seed.trim()}
          onClick={handleGenerate}
          sx={{
            textTransform: 'none',
            position: 'relative'
          }}
        >
          {generating && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                left: 16
              }}
            />
          )}
          <span style={{ fontFamily: fonts.maps, fontSize: 24 }}>
            {generating ? `Generating... ${progress}%` : 'Begin'}
          </span>
        </Button>

        {!generating && (
          <Typography
            variant='caption'
            align='center'
            display='block'
            sx={{ mt: 1, color: 'text.secondary' }}
          >
            Press Enter to generate
          </Typography>
        )}

        {generating && (
          <Box sx={{ mt: 4 }}>
            <LinearProgress variant='determinate' value={progress} sx={{ mb: 2, height: 6 }} />
            <Stepper activeStep={active} alternativeLabel>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>
                    <Typography sx={{ fontFamily: fonts.maps, fontSize: 24 }}>
                      {label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}
      </Grid>
      <Grid item xs={12} sx={{ px: 2 }}>
        {/* <UrbanMap city={{ name: 'Tes3t', type: 'city' }} /> */}
      </Grid>
    </Grid>
  )
}
