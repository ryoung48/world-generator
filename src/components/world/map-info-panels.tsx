import { Grid } from '@mui/material'

import { CELL } from '../../models/cells'
import { GEOGRAPHY_NAMES } from '../../models/cells/geography/names'
import { LOCATION } from '../../models/cells/locations'
import { RAIN } from '../../models/cells/weather/rain'
import { TEMPERATURE } from '../../models/cells/weather/temperature'
import { PROVINCE } from '../../models/provinces'
import { TEXT } from '../../models/utilities/text'
import { StyledText } from '../common/text/styled'
import { fonts } from '../theme/fonts'
import { MAP_SHAPES } from './paint/shapes'
import { MAP_METRICS } from './paint/shapes/metrics'

type MapInfoPanelsProps = {
  cursor: { x: number; y: number }
  units: 'metric' | 'imperial'
}

export function MapInfoPanels(props: MapInfoPanelsProps) {
  const { cursor, units } = props
  const cell = window.world.cells[window.world.diagram.find(cursor.x, cursor.y)]
  const location = window.world.locations[cell.location]
  const province = window.world.provinces[cell.province]
  const temperature = cell.heat.mean
  const rain = cell.rain.annual
  const pop = MAP_METRICS.population.format(PROVINCE.population.density(province), units)

  const panelStyle = {
    zIndex: 2,
    position: 'absolute' as const,
    top: MAP_SHAPES.height * 0.145,
    fontFamily: fonts.maps,
    fontSize: 20,
    backgroundColor: 'rgba(241, 241, 241, 0.85)',
    width: 160,
    padding: 1
  }

  return (
    <>
      <Grid
        container
        sx={{
          ...panelStyle,
          left: MAP_SHAPES.width * 0.04
        }}
      >
        <Grid item xs={12}>
          {TEXT.formatters.coordinates(cursor.y, cursor.x)}
        </Grid>
        {!cell.isWater && (
          <Grid item xs={12}>
            <span>{`${
              location && !cell.isMountains ? LOCATION.cell(location).topography : cell.topography
            }, ${MAP_METRICS.topography.format(cell.elevation, units)}`}</span>
          </Grid>
        )}
        {!cell.isWater && <Grid item xs={12}>{`${cell.climate}, ${cell.vegetation}`}</Grid>}
        <Grid item xs={12}>
          <StyledText text={GEOGRAPHY_NAMES.name(cell)} />
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          ...panelStyle,
          left: MAP_SHAPES.width * 0.15
        }}
      >
        {!cell.isWater && (
          <Grid item xs={12}>
            {MAP_METRICS.temperature.format(temperature, units)} (
            {TEMPERATURE.describe(temperature)})
          </Grid>
        )}
        {!cell.isWater && (
          <Grid item xs={12}>
            {MAP_METRICS.rain.format(rain, units)} ({RAIN.describe(rain, 'annual')})
          </Grid>
        )}
        <Grid item xs={12}>
          {MAP_METRICS.oceanDist.format(CELL.distMiles(cell), units)} from{' '}
          {cell.isWater ? 'land' : 'ocean'}
        </Grid>
        {!cell.isWater && (
          <Grid item xs={12}>
            {pop}
          </Grid>
        )}
      </Grid>

      <Grid
        container
        sx={{
          ...panelStyle,
          left: MAP_SHAPES.width * 0.26
        }}
      >
        <Grid item xs={12}>
          nation: {province.desolate ? 'none' : PROVINCE.nation(province).name}
        </Grid>
        <Grid item xs={12}>
          culture: {province.desolate ? 'none' : window.world.cultures[province.culture].name}
        </Grid>
        <Grid item xs={12}>
          province: {province.desolate ? 'none' : PROVINCE.hub(province).name}
        </Grid>
        <Grid item xs={12}>
          development: {province.development.toFixed(1)} (
          {PROVINCE.development.describe(province.development)})
        </Grid>
      </Grid>
    </>
  )
}
