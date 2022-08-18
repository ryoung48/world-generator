import { Button, Grid, TextField } from '@mui/material'
import { useState } from 'react'

import { dayMS, hourMS, minuteMS, yearMS } from '../../../../models/utilities/math/time'
import { view__context } from '../../../context'

export function WaitView() {
  const { dispatch } = view__context()
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  const [days, setDays] = useState(0)
  const [years, setYears] = useState(0)
  return (
    <Grid container justifyContent='center' spacing={3}>
      <Grid item xs={2}>
        <TextField
          label='years'
          onChange={event => setYears(parseInt(event.currentTarget.value))}
          value={years}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          label='days'
          onChange={event => setDays(parseInt(event.currentTarget.value))}
          value={days}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          label='hours'
          onChange={event => setHours(parseInt(event.currentTarget.value))}
          value={hours}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          label='minutes'
          onChange={event => setMinutes(parseInt(event.currentTarget.value))}
          value={minutes}
        />
      </Grid>
      <Grid item xs={1} mt={2}>
        <Button
          size='small'
          onClick={() =>
            dispatch({
              type: 'tick',
              payload: {
                duration: minutes * minuteMS + hours * hourMS + days * dayMS + years * yearMS
              }
            })
          }
        >
          wait
        </Button>
      </Grid>
    </Grid>
  )
}
