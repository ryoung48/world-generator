import { Button, Grid, Step, StepLabel, Stepper, TextField } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'

import { WORLD } from '../../models'
import { CIVILIZATION } from '../../models/shapers/civilization'
import { CONTINENTS } from '../../models/shapers/continents'
import { DISPLAY } from '../../models/shapers/display'
import { INFRASTRUCTURE } from '../../models/shapers/infrastructure'
import { LORE } from '../../models/shapers/lore'
import { REGIONAL } from '../../models/shapers/regions'
import { DICE } from '../../models/utilities/math/dice'
import { delay } from '../../models/utilities/math/time'
import { PERFORMANCE } from '../../models/utilities/performance'
import { VIEW } from '../context'

const catchup = 500

const generator = async (params: {
  seed: string
  res: number
  update: Dispatch<SetStateAction<number>>
}) => {
  const { seed, res, update } = params
  update(0)
  await delay(catchup)
  window.world = WORLD.spawn({ seed, res })
  CONTINENTS.build()
  update(1)
  await delay(catchup)
  REGIONAL.build()
  update(2)
  await delay(catchup)
  CIVILIZATION.build()
  update(3)
  await delay(catchup)
  INFRASTRUCTURE.build()
  update(4)
  await delay(catchup)
  LORE.build()
  DISPLAY.build()
  update(5)
  await delay(catchup)
  PERFORMANCE.profile.switch(window.profiles.current)
}

export function Landing() {
  const [seed, setSeed] = useState(DICE.id())
  const [res, setRes] = useState(4)
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
                dispatch({ type: 'start adventure' })
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
    </Grid>
  )
}
