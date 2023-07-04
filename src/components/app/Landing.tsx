import { Button, Grid, IconButton, Step, StepLabel, Stepper, TextField } from '@mui/material'
import { Fire } from 'mdi-material-ui'
import { Dispatch, SetStateAction, useState } from 'react'

import { Dice, generateId, randomChoice } from '../../models/utilities/math/dice'
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
import { LazyTippy } from '../codex/common/text/LazyTippy'
import { view__context } from '../context'

const catchup = 500

const goodSeeds = [
  '22vda3c6l6z',
  '14dqc3b1qlx',
  'pyll0ylfvb',
  '17tiecb6mfp',
  'bsgn9asgpv',
  '1suslbo760j',
  '2zoxwz96cz',
  'v84e7ln8vh',
  '1y6pd7s14nl',
  '137gw4nxldd',
  '2f5wtqrm5ob',
  '27uijhqrwqp',
  'fr737zauy9',
  '2c2fbc389eb',
  '1fw18st9raz',
  '25d7sa2ffgd',
  '1zvuhbdqltl',
  '6gitcthyt',
  'zgwuj9jqk7',
  'ty97dmt8a3',
  'jgmgzdylwh',
  '17lqpw6yv27',
  '124gz6trluf',
  '25nhmeex6mf',
  '5op1c241ct',
  'wigmrqfuhf',
  'mku6rax1br',
  '1ryjsgpmr6n',
  '809hyzvyh5',
  '164iu699fyh',
  '268a4ifg3mx',
  '29cqtr172fx',
  '1820iuxh5td',
  '8kpaci64jr',
  '154pn388s9p',
  'ivy6qukcdj',
  '6civhdapc9',
  'ucviulyq8l',
  '19eyaur7ixl',
  '27zyl9xhi0t',
  '1un3pdq5odr',
  '1y0hc2gzqvz',
  '1j74ypdzrq1',
  '13ipc36q9az',
  'jutkhqlb2l',
  '1eryljg2gsn',
  'p570d4h8j5',
  '27ogt2e5om7',
  'd3i8mki5ap',
  '1xyujzrjiab',
  'j3wfsk0r83',
  'kin7uaqa1b',
  '296pg947rlp',
  '2a5ks8m8xj1'
]

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
          <Grid item xs={7}>
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
          <Grid item xs={1}>
            <LazyTippy arrow={false} animation='scale' content='top seeds'>
              <IconButton
                color='primary'
                size='large'
                disabled={generating}
                onClick={() => setSeed(randomChoice(goodSeeds))}
              >
                <Fire fontSize='inherit'></Fire>
              </IconButton>
            </LazyTippy>
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
