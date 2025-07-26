import { Box } from '@mui/material'
import React from 'react'
import { Bar } from 'react-chartjs-2'

import { TEMPERATURE } from '../../../models/cells/weather/temperature'
import { TemperatureScale } from './TemperatureScale'

const SeasonalTempByLat: React.FC<{
  heat: number[][]
  latRange: number[]
  sampledDays: number[]
  dayLabels: string[]
}> = ({ heat, latRange, sampledDays, dayLabels }) => {
  const numLatitudes = latRange.length - 1
  const datasetsTemp = []

  let tempMin = Infinity
  let tempMax = -Infinity

  for (let latIdx = 0; latIdx < numLatitudes; latIdx++) {
    const data: number[] = []
    const backgroundColor: string[] = []

    for (let step of sampledDays) {
      const temp = heat[latIdx][step]
      data.push(1) // dummy height
      backgroundColor.push(TEMPERATURE.color(temp))
      if (temp > tempMax) tempMax = temp
      if (temp < tempMin) tempMin = temp
    }

    datasetsTemp.push({
      label: `Lat ${(latRange[latIdx] + 2.5).toFixed(1)}°`,
      data,
      backgroundColor,
      barThickness: 'flex' as const,
      categoryPercentage: 1.0,
      barPercentage: 1.0,
      stack: 'heat'
    })
  }

  const dataTemp = {
    labels: dayLabels,
    datasets: datasetsTemp
  }

  return (
    <Box>
      <Box height={700} overflow='auto'>
        <Bar
          data={dataTemp}
          options={{
            responsive: true,
            maintainAspectRatio: false as const,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: ctx => {
                    const day = sampledDays[ctx.dataIndex] + 1
                    const lat = ctx.dataset.label
                    const temp = heat[ctx.datasetIndex][sampledDays[ctx.dataIndex]]
                    return `${lat}, Day ${day}: ${temp.toFixed(1)}°C`
                  }
                }
              },
              datalabels: {
                display: false
              }
            },
            scales: {
              x: {
                stacked: true,
                ticks: {
                  maxTicksLimit: 12,
                  autoSkip: true
                },
                title: {
                  display: true,
                  text: 'Day of Year'
                }
              },
              y: {
                stacked: true,
                ticks: {
                  callback: (_val, index) => {
                    return latRange[index]?.toFixed(0) + '°'
                  },
                  autoSkip: false,
                  stepSize: 1
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

export default SeasonalTempByLat
