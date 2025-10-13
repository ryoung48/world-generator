import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'
import { Ruler, RulerSquare } from 'mdi-material-ui'

import { VIEW } from '../context'
import { fonts } from '../theme/fonts'
import { MAP_SHAPES } from './paint/shapes'
import { MapStyle, ProjectionType } from './types'

type MapControlsProps = {
  style: MapStyle
  onStyleChange: (_style: MapStyle) => void
  onUnitsChange: () => void
  projectionType: ProjectionType
  onProjectionChange: (_type: ProjectionType) => void
}

const hidden: MapStyle[] = ['Resources', 'Temperature', 'Rain', 'Population', 'Timezones']

export function MapControls(props: MapControlsProps) {
  const { state } = VIEW.context()
  const { style, onStyleChange, onUnitsChange, projectionType, onProjectionChange } = props
  const units = state.units
  return (
    <>
      <ToggleButtonGroup
        color='primary'
        exclusive
        value={style}
        onChange={(_, value) => {
          if (value) onStyleChange(value)
        }}
        size='small'
        style={{
          zIndex: 2,
          position: 'absolute',
          top: MAP_SHAPES.height + 35,
          left: MAP_SHAPES.width * 0.4,
          background: 'rgba(241, 241, 241, 0.95)'
        }}
      >
        {MAP_SHAPES.styles
          .filter(label => !hidden.includes(label))
          .map(label => (
            <ToggleButton key={label} value={label}>
              <span style={{ fontFamily: fonts.maps, textTransform: 'none', fontSize: 20 }}>
                {label}
              </span>
            </ToggleButton>
          ))}
      </ToggleButtonGroup>

      <ToggleButtonGroup
        color='primary'
        exclusive
        value={units}
        onChange={(_, value) => {
          if (value && value !== units) {
            onUnitsChange()
          }
        }}
        size='small'
        style={{
          zIndex: 2,
          position: 'absolute',
          top: MAP_SHAPES.height * 1.045,
          left: MAP_SHAPES.width * 0.22,
          background: 'rgba(241, 241, 241, 0.95)'
        }}
      >
        <Tooltip title='Metric (km, °C)' arrow>
          <ToggleButton value='metric'>
            <Ruler />
          </ToggleButton>
        </Tooltip>
        <Tooltip title='Imperial (mi, °F)' arrow>
          <ToggleButton value='imperial'>
            <RulerSquare />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>

      <ToggleButtonGroup
        color='primary'
        exclusive
        value={projectionType}
        onChange={(_, value) => {
          if (value) onProjectionChange(value)
        }}
        size='small'
        style={{
          zIndex: 2,
          position: 'absolute',
          top: MAP_SHAPES.height * 0.15,
          left: MAP_SHAPES.width * 0.5,
          background: 'rgba(241, 241, 241, 0.95)'
        }}
      >
        <ToggleButton value='orthographic'>
          <span style={{ fontFamily: fonts.maps, textTransform: 'none', fontSize: 16 }}>
            Orthographic
          </span>
        </ToggleButton>
        <ToggleButton value='equirectangular'>
          <span style={{ fontFamily: fonts.maps, textTransform: 'none', fontSize: 16 }}>
            Equirectangular
          </span>
        </ToggleButton>
        <ToggleButton value='mercator'>
          <span style={{ fontFamily: fonts.maps, textTransform: 'none', fontSize: 16 }}>
            Mercator
          </span>
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  )
}
