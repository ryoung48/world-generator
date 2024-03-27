import { Grid } from '@mui/material'

import { PLACE } from '../../../../models/regions/places'
import { RUIN } from '../../../../models/regions/places/ruin'
import { TEXT } from '../../../../models/utilities/text'
import { StyledText } from '../../common/text/styled'
import { HooksView } from '../hooks'
import { RuinViewParams } from './types'

export function RuinView({ ruin }: RuinViewParams) {
  RUIN.finalize(ruin)
  const climate = PLACE.climate(ruin)

  return (
    <Grid container sx={{ fontSize: 10, lineHeight: 1.51 }}>
      <Grid item xs={5.5}>
        <b>Climate: </b>
        <StyledText text={`${TEXT.titleCase(climate.name)} (${climate.latitude})`}></StyledText>
      </Grid>
      <Grid item xs={6.5}>
        <b>Mood: </b>
        <span>{ruin.mood}</span>
      </Grid>
      <Grid item xs={5.5}>
        <b>Hazards: </b>
        <StyledText text={ruin.hazards}></StyledText>
      </Grid>
      <Grid item xs={6.5}>
        <b>Enigmas: </b>
        <StyledText text={ruin.enigmas}></StyledText>
      </Grid>
      <Grid item xs={5.5}>
        <b>Treasure: </b>
        <StyledText text={ruin.treasure}></StyledText>
      </Grid>
      <Grid item xs={6.5}>
        <b>Locations: </b>
        <StyledText text={ruin.locations}></StyledText>
      </Grid>
      <Grid item xs={12}>
        <HooksView hooks={ruin.hooks}></HooksView>
      </Grid>
    </Grid>
  )
}
