import { Button, Grid, IconButton, Step, StepLabel, Stepper, TextField } from '@mui/material'
import { Fire } from 'mdi-material-ui'
import { Dispatch, SetStateAction, useState } from 'react'

import { Dice, generateId, randomChoice } from '../../models/utilities/math/dice'
import { delay } from '../../models/utilities/math/time'
import { PERFORMANCE } from '../../models/utilities/performance'
import { WORLD } from '../../models/world'
import { CIVILIZATION } from '../../models/world/shapers/civilization'
import { CONTINENTS } from '../../models/world/shapers/continents'
import { DISPLAY } from '../../models/world/shapers/display'
import { INFRASTRUCTURE } from '../../models/world/shapers/infrastructure'
import { LORE } from '../../models/world/shapers/lore'
import { REGIONAL } from '../../models/world/shapers/regions'
import { LazyTippy } from '../codex/common/text/LazyTippy'
import { VIEW } from '../context'

const catchup = 500

// 2eark2riwcx
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
  '2a5ks8m8xj1',
  '1suc36425tz',
  '1z4ad8l1tkz',
  'j6nm6tzqen',
  '5etnloxw61',
  '24u0j8110ap',
  '2bzcylmsaal',
  'midxaagofn',
  '1t4bonxv8qf',
  '11rw3exwlfx',
  '12bn4z7i4i7',
  'mff7or4s0t',
  '125feqgwa05',
  'i9br78lovb',
  'z0s50fskgt',
  '1or5sbcowgp',
  'a64zxzkmex',
  '1c72b607stl',
  '2el1ocgatz',
  '2bgcvmelqm5',
  '21b80sva7y9',
  '22ggrr1rd71',
  'kugbvmv8nl',
  'hr0hxdo74x',
  '1fyzra8rogp',
  '1d1x2h5o357',
  '12jhpoh4dkh',
  '1k0gsj72z9l',
  '1cx8kxh4l61',
  '21jnsnu3sor',
  'hp2bji2exx',
  '1692beqevi5',
  '1p1q71b2b3t',
  'u7okwdzztt',
  '14pgo22lvhv',
  '13iks0hsyzr',
  '4rn8ed17gj',
  '2dlgc0fiq89',
  '1gnq9237wc1',
  'b1q9h6ofol',
  '211g0vufob7',
  'mazpg2zz1n',
  'zss1jau67z',
  '2274kcfs5fv',
  'u52pffkqwl',
  '1eh3ou930zf',
  '1yahhlfh6bb',
  'bac6rrya7b',
  '1tglp01c0q3',
  '1ubl7oty85z',
  '1rje9rcl29l'
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
  const [seed, setSeed] = useState(generateId())
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
