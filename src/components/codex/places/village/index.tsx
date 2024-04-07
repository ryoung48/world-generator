import { Grid } from '@mui/material'

import { ACTOR } from '../../../../models/actors'
import { PLACE } from '../../../../models/regions/places'
import { VILLAGE } from '../../../../models/regions/places/village'
import { TEXT } from '../../../../models/utilities/text'
import { StyledText } from '../../../common/text/styled'
import { HooksView } from '../hooks'
import { VillageViewParams } from './types'

export function VillageView({ village }: VillageViewParams) {
  VILLAGE.finalize(village)
  const climate = PLACE.climate(village)

  return (
    <Grid container sx={{ fontSize: 10, lineHeight: 1.51 }}>
      <Grid item xs={5}>
        <b>Climate: </b>
        <StyledText text={`${TEXT.titleCase(climate.name)} (${climate.latitude})`}></StyledText>
      </Grid>
      <Grid item xs={5}>
        <b>Leadership: </b>
        <span>{village.leadership}</span>
      </Grid>
      <Grid item xs={12}>
        <b>Locals: </b>
        <StyledText
          text={village.locals
            .map(i => {
              const npc = window.world.actors[i]
              return `${TEXT.decorate({ label: npc.name, details: ACTOR.describe(npc) })}`
            })
            .join(', ')}
        ></StyledText>
      </Grid>
      <Grid item xs={12}>
        <HooksView hooks={village.hooks}></HooksView>
      </Grid>
    </Grid>
  )
}
