import { Box } from '@mui/material'
import React from 'react'
import { Bar } from 'react-chartjs-2'

import { DAYLIGHT } from '../../../models/cells/weather/daylight'

const DaylightByLat: React.FC<{
  daylight: number[][]
  latRange: number[]
  sampledDays: number[]
  dayLabels: string[]
}> = ({ daylight, latRange, sampledDays, dayLabels }) => {
  const numLatitudes = latRange.length - 1
  const datasetsTemp = []

  let hoursMin = Infinity
  let hoursMax = -Infinity

  for (let latIdx = 0; latIdx < numLatitudes; latIdx++) {
    const data: number[] = []
    const backgroundColor: string[] = []

    for (let step of sampledDays) {
      const hours = daylight[latIdx][step]
      data.push(1)
      backgroundColor.push(DAYLIGHT.color(hours))
      if (hours > hoursMax) hoursMax = hours
      if (hours < hoursMin) hoursMin = hours
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
                  const hours = daylight[ctx.datasetIndex][sampledDays[ctx.dataIndex]]
                  return `${lat}, Day ${day}: ${hours.toFixed(1)} hours`
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
  )
}

export default DaylightByLat
