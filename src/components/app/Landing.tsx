import { Button, Grid, Step, StepLabel, Stepper, TextField } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'

import { Dice, generateId } from '../../models/utilities/math/dice'
import { delay } from '../../models/utilities/math/time'
import { profile, profile__switch } from '../../models/utilities/performance'
import { world__spawn } from '../../models/world/spawn'
import { CivilizationShaper } from '../../models/world/spawn/shapers/civilization'
import { ContinentShaper } from '../../models/world/spawn/shapers/continents'
import { shapes } from '../../models/world/spawn/shapers/continents/templates'
import { DisplayShaper } from '../../models/world/spawn/shapers/display'
import { InfrastructureShaper } from '../../models/world/spawn/shapers/infrastructure'
import { LoreShaper } from '../../models/world/spawn/shapers/lore'
import { RegionalShaper } from '../../models/world/spawn/shapers/regions'
import { view__context } from '../context'

const catchup = 500

const generator = async (params: {
  seed: string
  res: number
  update: Dispatch<SetStateAction<number>>
}) => {
  const { seed, res, update } = params
  window.dice = new Dice(seed)
  update(0)
  await delay(catchup)
  window.world = world__spawn({ seed, res, template: [...window.dice.choice(shapes)] })
  profile({ label: 'Continents', f: () => new ContinentShaper().build() })
  update(1)
  await delay(catchup)
  profile({ label: 'Regions', f: () => new RegionalShaper().build() })
  update(2)
  await delay(catchup)
  profile({ label: 'Civilization', f: () => new CivilizationShaper().build() })
  update(3)
  await delay(catchup)
  profile({ label: 'Roads', f: () => new InfrastructureShaper().build() })
  update(4)
  await delay(catchup)
  profile({ label: 'Lore', f: () => new LoreShaper().build() })
  profile({ label: 'Canvas', f: () => new DisplayShaper().build() })
  update(5)
  await delay(catchup)
  profile__switch(window.profiles.current)
}

export function Landing() {
  const [seed, setSeed] = useState(generateId())
  const [res, setRes] = useState(8)
  const [active, setActive] = useState(-1)
  const { dispatch } = view__context()
  const generating = active >= 0
  const steps = ['continents', 'regions', 'civilization', 'infrastructure', 'lorecrafting']
  return (
    <Grid container justifyContent='center' spacing={1} pt={20}>
      <Grid item xs={4}>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <TextField
              label='seed'
              disabled={generating}
              onChange={event => setSeed(event.currentTarget.value)}
              value={seed}
            />
          </Grid>
          <Grid item xs={4}>
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
                dispatch({ type: 'init', payload: { id: seed } })
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
