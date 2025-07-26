import { Grid } from '@mui/material'

// import { HookView } from './Hooks'
import { ACTOR } from '../../models/actors'
import { CULTURE } from '../../models/heritage'
import { PROVINCE } from '../../models/provinces'
import { HUB } from '../../models/provinces/hubs'
import { TEXT } from '../../models/utilities/text'
import { CodexPage } from '../common/CodexPage'
import { ColoredBox } from '../common/ColoredBox'
import { ToggleButtons } from '../common/navigation/ToggleButtons'
import { StyledText } from '../common/text/styled'
import { VIEW } from '../context'
import { cssColors } from '../theme/colors'
import { MAP_METRICS } from '../world/shapes/metrics'
import { DaylightView } from './weather/Daylight'
import { RainView } from './weather/Rain'
import { TemperatureView } from './weather/Temperature'

export function HubView() {
  const { state } = VIEW.context()
  const province = window.world.provinces[state.loc.province]
  const hub = PROVINCE.hub(province)
  const nation = PROVINCE.nation(province)
  const { common } = PROVINCE.demographics(province)
  const cultureCount = 4
  const other = common.slice(cultureCount).reduce((sum, { w }) => sum + w, 0)
  const cell = window.world.cells[hub.cell]
  const { climate, vegetation } = cell
  const location = window.world.locations[cell.location]
  const { topography } = location
  ACTOR.populate(province)
  return (
    <CodexPage
      title={hub.name}
      subtitle={
        <span style={{ color: cssColors.subtitle }}>
          {`(${province.idx}) ${HUB.settlement(hub)} (`}
          <ColoredBox color={MAP_METRICS.climate.categories[climate]}></ColoredBox> {climate}
          {', '}
          <ColoredBox color={MAP_METRICS.topography.categories()[topography]}></ColoredBox>
          {` ${topography}`}
          {', '}
          <ColoredBox color={MAP_METRICS.vegetation.color[vegetation]}></ColoredBox>
          {` ${vegetation})`}
        </span>
      }
      content={
        <Grid container sx={{ fontSize: 10, lineHeight: 1.5 }}>
          <Grid item xs={6}>
            <b>Population: </b>
            {TEXT.formatters.compact(hub.population)}
          </Grid>
          <Grid item xs={6}>
            <b>Region: </b>
            <StyledText
              text={TEXT.decorate({
                link: { tag: 'nation', idx: nation.idx },
                label: nation.name
              })}
            ></StyledText>
          </Grid>
          <Grid item xs={12}>
            <b>Demographics: </b>
            <StyledText
              text={common
                .slice(0, cultureCount)
                .map(({ v, w }) => {
                  const culture = window.world.cultures[v]
                  return `${TEXT.decorate({
                    label: '■',
                    color: culture.display.color
                  })} ${TEXT.decorate({
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
                ?.map(i => {
                  const npc = window.world.actors[i]
                  return `${TEXT.decorate({ label: npc.name, details: ACTOR.describe(npc) })}`
                })
                .join(', ')}
            ></StyledText>
          </Grid>
          <Grid item xs={12} pt={2}>
            <ToggleButtons
              selection={['temperature', 'rain', 'daylight', 'wind']}
              content={tab => {
                if (tab === 'temperature') return <TemperatureView />
                if (tab === 'rain') return <RainView />
                if (tab === 'daylight') return <DaylightView />
                return <span>{tab}</span>
              }}
            ></ToggleButtons>
          </Grid>
        </Grid>
      }
    ></CodexPage>
  )
}
