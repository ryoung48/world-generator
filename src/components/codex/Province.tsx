import { Grid } from '@mui/material'

import { ACTOR } from '../../models/actors'
import { WEATHER } from '../../models/cells/weather'
import { CULTURE } from '../../models/heritage'
import { HUB } from '../../models/regions/hubs'
import { PROVINCE } from '../../models/regions/provinces'
import { TEXT } from '../../models/utilities/text'
import { CodexPage } from '../common/CodexPage'
import { StyledText } from '../common/text/styled'
import { VIEW } from '../context'
import { cssColors } from '../theme/colors'

const weather: Record<number, string> = {}

export function ProvinceView() {
  const { state } = VIEW.context()
  const province = window.world.provinces[state.loc.province]
  const hub = province.hub
  const nation = PROVINCE.nation(province)
  const climate = PROVINCE.climate(province)
  const { common } = PROVINCE.demographics(province)
  const cultureCount = 4
  const other = common.slice(cultureCount).reduce((sum, { w }) => sum + w, 0)
  if (!weather[province.idx])
    weather[province.idx] = TEXT.capitalize(
      WEATHER.conditions({ cell: window.world.cells[hub.cell] })
    )
  ACTOR.populate(province)
  return (
    <CodexPage
      title={hub.name}
      subtitle={
        <StyledText
          color={cssColors.subtitle}
          text={`(${province.idx}) ${HUB.type(province.hub)}, ${TEXT.decorate({
            link: nation,
            label: nation.name
          })}`}
        ></StyledText>
      }
      content={
        <Grid container sx={{ fontSize: 10, lineHeight: 1.5 }}>
          <Grid item xs={12}>
            <b>Climate: </b>
            <StyledText text={`${TEXT.titleCase(climate.name)} (${climate.latitude})`}></StyledText>
          </Grid>
          <Grid item xs={12}>
            <b>Weather: </b>
            <StyledText text={weather[province.idx]}></StyledText>
          </Grid>
          <Grid item xs={12}>
            <b>Demographics: </b>
            <StyledText
              text={common
                .slice(0, cultureCount)
                .map(({ v, w }) => {
                  const culture = window.world.cultures[v]
                  return `${TEXT.decorate({
                    label: culture.name,
                    details: CULTURE.describe(culture)
                  })} (${TEXT.formatters.percent(w)})`
                })
                .concat(other > 0 ? [`Other (${TEXT.formatters.percent(other)})`] : [])
                .join(', ')}
            ></StyledText>
          </Grid>
          <Grid item xs={12}>
            <b>Locals: </b>
            <StyledText
              text={hub.locals
                .map(i => {
                  const npc = window.world.actors[i]
                  return `${TEXT.decorate({ label: npc.name, details: ACTOR.describe(npc) })}`
                })
                .join(', ')}
            ></StyledText>
          </Grid>
        </Grid>
      }
    ></CodexPage>
  )
}
