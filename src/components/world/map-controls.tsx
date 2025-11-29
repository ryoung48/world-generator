import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'
import { ChartBar, ContentCopy } from 'mdi-material-ui'
import { Ruler, RulerSquare } from 'mdi-material-ui'
import { useState } from 'react'

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

const hidden: MapStyle[] = ['Temperature', 'Rain', 'Population', 'Timezones']

export function MapControls(props: MapControlsProps) {
  const { state, dispatch } = VIEW.context()
  const { style, onStyleChange, onUnitsChange, projectionType, onProjectionChange } = props
  const units = state.units
  const [copied, setCopied] = useState(false)

  const handleCopySeed = () => {
    if (state.id) {
      navigator.clipboard.writeText(state.id)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

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
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
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

      <div
        style={{
          zIndex: 2,
          position: 'absolute',
          bottom: 20,
          left: 20,
          display: 'flex',
          gap: 8
        }}
      >
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

        <Tooltip title={copied ? 'Copied!' : 'Copy seed to clipboard'} arrow>
          <ToggleButton
            value='seed'
            size='small'
            onClick={handleCopySeed}
            style={{ background: 'rgba(241, 241, 241, 0.95)' }}
          >
            <ContentCopy sx={{ mr: 0.5 }} />
            <span style={{ fontFamily: fonts.maps, textTransform: 'none', fontSize: 14 }}>
              {state.id || 'No seed'}
            </span>
          </ToggleButton>
        </Tooltip>

        <Tooltip title='View statistics' arrow>
          <ToggleButton
            value='stats'
            size='small'
            onClick={() => dispatch({ type: 'toggle stats' })}
            style={{ background: 'rgba(241, 241, 241, 0.95)' }}
          >
            <ChartBar sx={{ mr: 0.5 }} />
            <span style={{ fontFamily: fonts.maps, textTransform: 'none', fontSize: 14 }}>
              Stats
            </span>
          </ToggleButton>
        </Tooltip>
      </div>

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
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
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
