import { Box } from '@mui/material'
import * as d3 from 'd3'
import React from 'react'
import { Bar } from 'react-chartjs-2'

import { TEMPERATURE } from '../../../models/cells/weather/temperature'
import { TemperatureScale } from './TemperatureScale'

const AnnualTempByLat: React.FC<{ heat: number[][]; latRange: number[] }> = ({
  heat,
  latRange
}) => {
  const numLatitudes = latRange.length - 1
  // Original calculations without weighting
  const avgTemps = heat.map(row => d3.mean(row.map(r => (r > 0 ? r : r))))
  // // Growing degree days (unused but kept for future reference)
  // const gdd = heat.map(row => d3.sum(row.map(item => Math.max(item - 5, 0))))
  // // Growing interruption (unused but kept for future reference)
  // const gint = heat.map(row => d3.sum(row.map(item => Math.min(Math.max(15 - item, 0), 15))))

  const tempMin = d3.min(avgTemps) || 0
  const tempMax = d3.max(avgTemps) || 0

  return (
    <Box>
      <Box height={650} overflow='auto'>
        <Bar
          data={{
            labels: latRange.slice(0, numLatitudes).map(lat => `${(lat + 2.5).toFixed(1)}°`),
            datasets: [
              {
                label: 'Avg Temp',
                data: avgTemps,
                backgroundColor: avgTemps.map(t => TEMPERATURE.color(t)),
                barThickness: 'flex',
                categoryPercentage: 1.0,
                barPercentage: 1.0
              }
            ]
          }}
          options={{
            indexAxis: 'x' as const,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: ctx => {
                    const lat = ctx.label
                    const temp = ctx.raw as number
                    return `${lat}: Avg ${temp.toFixed(1)}°C`
                  }
                }
              },
              datalabels: {
                display: false
              }
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: 'Average Temperature (°C)'
                }
              },
              x: {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 15
                },
                title: {
                  display: true,
                  text: 'Latitude (°)'
                }
              }
            }
          }}
        />
      </Box>
      <TemperatureScale tempMin={tempMin} tempMax={tempMax} />
    </Box>
  )
}

export default AnnualTempByLat
