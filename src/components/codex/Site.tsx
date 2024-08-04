import { Grid } from '@mui/material'

import { WEATHER } from '../../models/cells/weather'
import { PROVINCE } from '../../models/regions/provinces'
import { TEXT } from '../../models/utilities/text'
import { CodexPage } from '../common/CodexPage'
import { StyledText } from '../common/text/styled'
import { VIEW } from '../context'
import { cssColors } from '../theme/colors'
import { HookView } from './Hooks'

const weather: Record<number, string> = {}

export function SiteView() {
  const { state } = VIEW.context()
  const province = window.world.provinces[state.loc.province]
  const site = province.sites[state.loc.idx]
  const nation = PROVINCE.nation(province)
  const climate = PROVINCE.climate(province)
  if (!weather[province.idx])
    weather[province.idx] = TEXT.capitalize(
      WEATHER.conditions({ cell: window.world.cells[site.cell] })
    )
  return (
    <CodexPage
      title={site.name}
      subtitle={
        <StyledText
          color={cssColors.subtitle}
          text={`(${province.idx}) ${site.type}, ${TEXT.decorate({
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
            <HookView site={site}></HookView>
          </Grid>
        </Grid>
      }
    ></CodexPage>
  )
}
