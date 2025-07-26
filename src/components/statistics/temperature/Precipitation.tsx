import { Box } from '@mui/material'
import React from 'react'
import { Bar } from 'react-chartjs-2'

import { RAIN } from '../../../models/cells/weather/rain'

const PrecipitationByLat: React.FC = () => {
  const rain = window.world.cells.filter(cell => cell.rain.annual > 0)

  const arctic = rain.filter(cell => cell.climate === 'arctic')
  const boreal = rain.filter(cell => cell.climate === 'boreal')
  const temperate = rain.filter(cell => cell.climate === 'temperate')
  const subtropical = rain.filter(cell => cell.climate === 'subtropical')
  const tropical = rain.filter(cell => cell.climate === 'tropical')

  // Define precipitation ranges/bins for histogram
  const ranges = [
    { min: 0, max: 200, label: '0-200' },
    { min: 200, max: 400, label: '200-400' },
    { min: 400, max: 600, label: '400-600' },
    { min: 600, max: 800, label: '600-800' },
    { min: 800, max: 1000, label: '800-1000' },
    { min: 1000, max: 1500, label: '1000-1500' },
    { min: 1500, max: 2000, label: '1500-2000' },
    { min: 2000, max: Infinity, label: '2000+' }
  ]

  const climateRegions = ['Arctic', 'Boreal', 'Temperate', 'Subtropical', 'Tropical']
  const cellGroups = [arctic, boreal, temperate, subtropical, tropical]

  // Get total count for each climate region
  const regionCounts = cellGroups.map(cells => cells.length)

  // Pre-calculate all histograms
  const histograms = cellGroups.map(cells => {
    return ranges.map(range => ({
      range: range.label,
      count: cells.filter(cell => cell.rain.annual >= range.min && cell.rain.annual < range.max)
        .length
    }))
  })

  // Get labels with counts
  const labelsWithCounts = climateRegions.map(
    (region, index) => `${region} (${regionCounts[index]} cells)`
  )

  // Generate datasets for the stacked bar chart
  const datasets = ranges.map((range, rangeIndex) => {
    // Use middle value of range for color
    const midValue = (range.min + Math.min(range.max, 2500)) / 2
    const color = RAIN.annual.color(midValue)

    return {
      label: `${range.label} mm`,
      data: histograms.map(histogram => histogram[rangeIndex].count),
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1
    }
  })

  return (
    <Box height={700}>
      <Bar
        data={{
          labels: labelsWithCounts,
          datasets: datasets
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                // Smaller font size to accommodate more labels
                font: {
                  size: 10
                }
              }
            },
            tooltip: {
              callbacks: {
                label: ctx => {
                  const count = ctx.raw as number
                  const percent = ((count / regionCounts[ctx.dataIndex]) * 100).toFixed(1)
                  return `${ctx.dataset.label}: ${count} cells (${percent}%)`
                }
              }
            },
            datalabels: {
              display: false
            }
          },
          scales: {
            y: {
              stacked: true,
              title: {
                display: true,
                text: 'Number of Cells'
              },
              beginAtZero: true
            },
            x: {
              stacked: true,
              title: {
                display: false,
                text: 'Climate Region'
              }
            }
          }
        }}
      />
    </Box>
  )
}

export default PrecipitationByLat
