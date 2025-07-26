import { Box, Typography } from '@mui/material'
import * as d3 from 'd3'
import React from 'react'

import { TEMPERATURE } from '../../../models/cells/weather/temperature'

interface TemperatureScaleProps {
  tempMin: number
  tempMax: number
}

export const TemperatureScale: React.FC<TemperatureScaleProps> = ({ tempMin, tempMax }) => {
  const numStops = 21
  const currDomain = d3
    .range(0, numStops)
    .map(i => tempMin + ((tempMax - tempMin) * i) / (numStops - 1))

  const gradientStops = currDomain
    .map(temp => {
      const percent = ((temp - tempMin) / (tempMax - tempMin)) * 100
      return `${TEMPERATURE.color(temp)} ${percent.toFixed(2)}%`
    })
    .join(', ')

  return (
    <Box mt={3} px={2}>
      {/* Gradient bar */}
      <Box
        sx={{
          height: 12,
          borderRadius: 1,
          background: `linear-gradient(to right, ${gradientStops})`
        }}
      />

      {/* Min/Max tick labels */}
      <Box display='flex' justifyContent='space-between' mt={1}>
        <Typography variant='caption' color='textSecondary'>
          {tempMin.toFixed(0)}°C
        </Typography>
        <Typography variant='caption' color='textSecondary'>
          {tempMax.toFixed(0)}°C
        </Typography>
      </Box>
    </Box>
  )
}
