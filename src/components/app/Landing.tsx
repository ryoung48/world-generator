import { Button, Grid, Step, StepLabel, Stepper, TextField } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'

import { WORLD } from '../../models'
import { INFRASTRUCTURE_SHAPER } from '../../models/shapers/civilization/infrastructure'
import { NATION_SHAPER } from '../../models/shapers/civilization/nations'
import { PROVINCE_SHAPER } from '../../models/shapers/civilization/provinces'
import { TIMEZONE_SHAPER } from '../../models/shapers/civilization/timezones'
import { SHAPER_CONTINENTS } from '../../models/shapers/continents'
import { SHAPER_DISPLAY } from '../../models/shapers/display'
import { DICE } from '../../models/utilities/math/dice'
import { TIME } from '../../models/utilities/math/time'
import { PERFORMANCE } from '../../models/utilities/performance'
import { VIEW } from '../context'
// import UrbanMap from '../settlement'
// import { HookTable } from '../experimental/hooks/HookTable'
// import { ThreadList } from '../experimental/threads'

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
  const [res, setRes] = useState(8)
  const [active, setActive] = useState(-1)
  const { dispatch } = VIEW.context()
  const generating = active >= 0
  const steps = ['continents', 'regions', 'civilization', 'infrastructure', 'lorecrafting']
  return (
    <Grid container justifyContent='center' spacing={1} pt={20}>
      <Grid item xs={4}>
        <Grid container spacing={1}>
          <Grid item xs={7}>
            <TextField
              label='seed'
              disabled={generating}
              onChange={event => setSeed(event.currentTarget.value)}
              value={seed}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              value={res}
              disabled={generating}
              onChange={event => setRes(parseInt(event.currentTarget.value))}
              label='resolution'
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              size='large'
              sx={{ width: '100%' }}
              disabled={generating}
              onClick={async () => {
                await generator({ seed, res, update: setActive })
                dispatch({ type: 'init world', payload: { id: seed } })
              }}
            >
              Generate World
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}></Grid>
      {generating && (
        <Grid item xs={5}>
          <Stepper activeStep={active} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
      )}
      <Grid item xs={12}>
        {/* <UrbanMap city={{ name: 'Xi', type: 'small city' }} /> */}
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
  )
}
