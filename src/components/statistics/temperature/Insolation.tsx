import { Box } from '@mui/material'
import * as d3 from 'd3'
import React from 'react'
import { Bar } from 'react-chartjs-2'

const InsolationChart: React.FC<{
  insolation: number[][]
  latRange: number[]
  sampledDays: number[]
  dayLabels: string[]
}> = ({ insolation, latRange, sampledDays, dayLabels }) => {
  const numLatitudes = latRange.length - 1

  const insolDatasets = []
  let insolMin = Infinity
  let insolMax = -Infinity
  for (let i = 0; i < numLatitudes; i++) {
    for (let step of sampledDays) {
      if (insolation[i][step] > insolMax) insolMax = insolation[i][step]
      if (insolation[i][step] < insolMin) insolMin = insolation[i][step]
    }
  }

  const insolColorScale = d3.scaleLinear().domain([insolMin, insolMax]).range([0, 1]).clamp(true)

  for (let latIdx = 0; latIdx < numLatitudes; latIdx++) {
    const data: number[] = []
    const backgroundColor: string[] = []

    for (let step of sampledDays) {
      const insol = insolation[latIdx][step]
      data.push(1) // dummy height
      backgroundColor.push(d3.interpolatePlasma(insolColorScale(insol)))
    }

    insolDatasets.push({
      label: `Lat ${(latRange[latIdx] + 2.5).toFixed(1)}°`,
      data,
      backgroundColor,
      barThickness: 'flex' as const,
      categoryPercentage: 1.0,
      barPercentage: 1.0,
      stack: 'insolation'
    })
  }

  return (
    <Box height={700} overflow='auto'>
      <Bar
        data={{
          labels: dayLabels,
          datasets: insolDatasets
        }}
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
                  const insol = insolation[ctx.datasetIndex][sampledDays[ctx.dataIndex]]
                  return `${lat}, Day ${day}: ${insol.toFixed(1)} W/m²`
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

export default InsolationChart
