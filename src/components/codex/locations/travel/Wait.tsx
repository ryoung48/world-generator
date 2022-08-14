import { Button, Grid, TextField } from '@mui/material'
import { useState } from 'react'

import { view__context } from '../../../../context'
import { day_ms, hour_ms, minute_ms, year_ms } from '../../../../models/utilities/math/time'

export function WaitView() {
  const { dispatch } = view__context()
  const [minutes, set_minutes] = useState(0)
  const [hours, set_hours] = useState(0)
  const [days, set_days] = useState(0)
  const [years, set_years] = useState(0)
  return (
    <Grid container justifyContent='center' spacing={3}>
      <Grid item xs={2}>
        <TextField
          label='years'
          onChange={event => set_years(parseInt(event.currentTarget.value))}
          value={years}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          label='days'
          onChange={event => set_days(parseInt(event.currentTarget.value))}
          value={days}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          label='hours'
          onChange={event => set_hours(parseInt(event.currentTarget.value))}
          value={hours}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          label='minutes'
          onChange={event => set_minutes(parseInt(event.currentTarget.value))}
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
                duration: minutes * minute_ms + hours * hour_ms + days * day_ms + years * year_ms
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
