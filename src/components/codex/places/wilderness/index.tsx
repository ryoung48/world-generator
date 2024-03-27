import { Grid } from '@mui/material'

import { PLACE } from '../../../../models/regions/places'
import { WILDERNESS } from '../../../../models/regions/places/wilderness'
import { TEXT } from '../../../../models/utilities/text'
import { StyledText } from '../../common/text/styled'
import { HooksView } from '../hooks'
import { WildernessViewParams } from './types'

export function WildernessView({ wilderness }: WildernessViewParams) {
  WILDERNESS.finalize(wilderness)
  const climate = PLACE.climate(wilderness)

  return (
    <Grid container sx={{ fontSize: 10, lineHeight: 1.51 }}>
      <Grid item xs={5.5}>
        <b>Climate: </b>
        <StyledText text={`${TEXT.titleCase(climate.name)} (${climate.latitude})`}></StyledText>
      </Grid>
      <Grid item xs={6.5}>
        <b>Mood: </b>
        <span>{wilderness.mood}</span>
      </Grid>
      <Grid item xs={5.5}>
        <b>Encounters: </b>
        <StyledText text={wilderness.encounters}></StyledText>
      </Grid>
      <Grid item xs={6.5}>
        <b>Locations: </b>
        <StyledText text={wilderness.locations}></StyledText>
      </Grid>
      <Grid item xs={12}>
        <HooksView hooks={wilderness.hooks}></HooksView>
      </Grid>
    </Grid>
  )
}
