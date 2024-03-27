import { Grid } from '@mui/material'

import { CULTURE } from '../../../../models/npcs/cultures'
import { PLACE } from '../../../../models/regions/places'
import { HUB } from '../../../../models/regions/places/hub'
import { TRADE_GOODS } from '../../../../models/regions/places/hub/trade'
import { PROVINCE } from '../../../../models/regions/provinces'
import { TEXT } from '../../../../models/utilities/text'
import { StyledText } from '../../common/text/styled'
import { QuestView } from '../../Quest'
import { HubViewParams } from './types'

export function HubView({ hub }: HubViewParams) {
  HUB.finalize(hub)
  const climate = PLACE.climate(hub)

  const province = PLACE.province(hub)
  const { common } = PROVINCE.demographics(province)
  const cultureCount = 5
  const other = common.slice(cultureCount).reduce((sum, { w }) => sum + w, 0)

  return (
    <Grid container sx={{ fontSize: 10, lineHeight: 1.5 }}>
      <Grid item xs={12}>
        <b>Climate: </b>
        <StyledText text={`${TEXT.titleCase(climate.name)} (${climate.latitude})`}></StyledText>
      </Grid>
      <Grid item xs={12}>
        <b>Trade Goods: </b>
        <StyledText
          text={TEXT.formatters.list(
            hub.trade.map((good, i) => {
              const details = TRADE_GOODS.reference[good]
              return TEXT.decorate({
                label: i !== 0 ? good : TEXT.capitalize(good),
                tooltip: typeof details.text === 'string' ? details.text : undefined
              })
            }),
            'and'
          )}
        ></StyledText>
      </Grid>
      <Grid item xs={12}>
        <b>Demographics: </b>
        <StyledText
          text={common
            .slice(0, cultureCount)
            .map(({ v, w }) => {
              const culture = window.world.cultures[v]
              const { name } = culture
              return `${TEXT.decorate({
                label: name,
                details: CULTURE.describe(culture)
              })} (${TEXT.formatters.percent(w)})`
            })
            .concat(other > 0 ? [`Other (${TEXT.formatters.percent(other)})`] : [])
            .join(', ')}
        ></StyledText>
      </Grid>
      <QuestView hub={hub}></QuestView>
    </Grid>
  )
}
