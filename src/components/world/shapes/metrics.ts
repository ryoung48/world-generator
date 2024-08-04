import * as d3 from 'd3'

import { CLIMATE } from '../../../models/cells/climate'
import { Climate, ClimateKey } from '../../../models/cells/climate/types'
import { MATH } from '../../../models/utilities/math'
import { TEXT } from '../../../models/utilities/text'
import { DrawLegendParams } from '../embellishments/types'
import { MAP_SHAPES } from '.'

const rain = [0, 10, 25, 50, 100, 150, 200, 250].reverse()
const elevation = [0, 300, 600, 1200, 2000, 3000, 4000, 6000, 9000, 12000, 16000, 20000, 26000].map(
  MATH.conversion.distance.feet.km
)

const development = [
  'enlightened',
  'colonial',
  'advanced',
  'developing',
  'emerging',
  'traditional',
  'frontier',
  'remote'
]

const metric = true

export const MAP_METRICS = {
  metric,
  climate: {
    legend: (latitude: Climate['latitude']) => {
      const climates: ClimateKey[] =
        latitude === 'polar'
          ? ['desert (polar)']
          : latitude === 'subpolar'
          ? [
              'rain tundra (subpolar)',
              'wet tundra (subpolar)',
              'moist tundra (subpolar)',
              'dry tundra (subpolar)'
            ]
          : latitude === 'boreal'
          ? [
              'rain forest (boreal)',
              'wet forest (boreal)',
              'moist forest (boreal)',
              'dry scrub (boreal)',
              'desert (boreal)'
            ]
          : latitude === 'cool temperate'
          ? [
              'rain forest (cool temperate)',
              'wet forest (cool temperate)',
              'moist forest (cool temperate)',
              'steppe (cool temperate)',
              'desert scrub (cool temperate)',
              'desert (cool temperate)'
            ]
          : latitude === 'warm temperate'
          ? [
              'rain forest (warm temperate)',
              'wet forest (warm temperate)',
              'moist forest (warm temperate)',
              'dry forest (warm temperate)',
              'thorn steppe (warm temperate)',
              'desert scrub (warm temperate)',
              'desert (warm temperate)'
            ]
          : latitude === 'subtropical'
          ? [
              'rain forest (subtropical)',
              'wet forest (subtropical)',
              'moist forest (subtropical)',
              'dry forest (subtropical)',
              'thorn steppe (subtropical)',
              'desert scrub (subtropical)',
              'desert (subtropical)'
            ]
          : [
              'rain forest (tropical)',
              'wet forest (tropical)',
              'moist forest (tropical)',
              'dry forest (tropical)',
              'very dry forest (tropical)',
              'thorn woodland (tropical)',
              'desert scrub (tropical)',
              'desert (tropical)'
            ]
      return [
        { text: TEXT.titleCase(latitude) },
        ...climates.map(climate => {
          const details = CLIMATE.holdridge[climate]
          return {
            color: details.color,
            text: details.name
          }
        })
      ]
    }
  },
  elevation: {
    color: d3.scaleLinear(elevation, [
      '#A6BF97',
      '#8AAB78',
      '#B0B784',
      '#D6D2AD',
      '#D1C99B',
      '#C0AA79',
      '#937B57',
      '#736248',
      '#867764',
      '#B3AA99',
      '#CCC4B7',
      '#ECE9E2',
      '#F4F3EF'
    ]),
    format: (km: number, p = 2) =>
      metric ? `${km.toFixed(p)} km` : `${MATH.conversion.distance.km.miles(km).toFixed(p)} mi`,
    legend: () =>
      [...elevation].reverse().map(r => ({
        color: MAP_METRICS.elevation.color(r),
        text: MAP_METRICS.elevation.format(r)
      }))
  },
  development: {
    scale: d3.scaleLinear([0, 7], [0, 1]),
    color: (k: number) => d3.interpolateBrBG(MAP_METRICS.development.scale(k)),
    legend: () =>
      d3
        .range(0, 8)
        .reverse()
        .map(r => ({
          color: MAP_METRICS.development.color(r),
          text: development[7 - r]
        }))
  },
  government: {
    colors: {
      autocracy: '#ffbaba',
      republic: '#bad5ff',
      oligarchy: '#baffd9 ',
      confederation: '#ffe3ba ',
      fragmented: '#d7e9ef ',
      theocracy: '#fcf7e8',
      vassal: '#e1ccff',
      uninhabited: 'white'
    },
    legend: () =>
      Object.entries(MAP_METRICS.government.colors)
        .filter(([k]) => k !== 'traditional')
        .map(([k, v]) => ({
          color: v,
          text: k
        }))
  },
  population: {
    scale: d3.scaleLinear([0, 40], [0, 1]),
    color: (popMi: number) => d3.interpolateBuPu(MAP_METRICS.population.scale(popMi)),
    value: (popMi: number) => (metric ? MATH.conversion.population.mi.km(popMi) : popMi),
    format: (popMi: number) =>
      `${MAP_METRICS.population.value(popMi).toFixed(0)} ${MAP_METRICS.population.units()}`,
    legend: () =>
      [0, 5, 10, 15, 20, 25, 30, 35, 40].reverse().map(r => ({
        color: MAP_METRICS.population.color(r),
        text: MAP_METRICS.population.format(r)
      })),
    units: () => `persons/${metric ? 'km²' : 'mi²'}`
  },
  rain: {
    rain,
    scale: d3.scaleLinear(rain, MATH.scaleDiscrete(rain.length)),
    color: (r: number) => d3.interpolateViridis(MAP_METRICS.rain.scale(r)),
    value: (mm: number) => (metric ? mm : MATH.conversion.height.mm.in(mm)),
    format: (mm: number) => `${MAP_METRICS.rain.value(mm).toFixed(1)} ${MAP_METRICS.rain.units()}`,
    legend: () =>
      rain.map(r => ({
        color: MAP_METRICS.rain.color(r),
        text: MAP_METRICS.rain.format(r)
      })),
    units: () => (metric ? 'mm' : 'in')
  },
  religion: {
    colors: {
      atheistic: 'hsl(0, 0%, 83%)',
      nontheistic: 'hsl(46, 58%, 93%)',
      monotheistic: 'hsl(214, 41%, 78%)',
      dualistic: 'hsl(195, 53%, 79%)',
      polytheistic: 'hsl(28, 100%, 86%)',
      animistic: 'hsl(120, 93%, 79%)',
      'ancestor worship': 'hsl(251, 85%, 93%)',
      uninhabited: 'white'
    },
    legend: () =>
      Object.entries(MAP_METRICS.religion.colors).map(([k, v]) => ({
        color: v,
        text: k
      }))
  },
  settlement: {
    legend: (): DrawLegendParams['items'] => [
      {
        text: 'metropolis',
        shape: ({ ctx, point, scale }) =>
          MAP_SHAPES.settlement({ ctx, point, scale: scale * 0.8, population: 250e3 })
      },
      {
        text: 'city',
        shape: ({ ctx, point, scale }) =>
          MAP_SHAPES.settlement({ ctx, point, scale: scale * 0.8, population: 25e3 })
      },
      {
        text: 'town',
        shape: ({ ctx, point, scale }) =>
          MAP_SHAPES.settlement({ ctx, point, scale: scale * 0.8, population: 5e3 })
      },
      {
        text: 'village',
        shape: ({ ctx, point, scale }) =>
          MAP_SHAPES.settlement({ ctx, point, scale: scale, population: 500 })
      },
      {
        text: 'ruin',
        shape: ({ ctx, point, scale }) => MAP_SHAPES.ruins({ ctx, point, scale: scale * 2 })
      },
      {
        text: 'wilderness',
        shape: ({ ctx, point, scale }) => MAP_SHAPES.wilderness({ ctx, point, scale: scale * 2 })
      },
      {
        text: 'major road',
        shape: ({ ctx, point }) =>
          MAP_SHAPES.route({ ctx, point, color: MAP_SHAPES.color.routes.land(0.8) })
      },
      {
        text: 'minor road',
        shape: ({ ctx, point }) =>
          MAP_SHAPES.route({ ctx, point, color: MAP_SHAPES.color.routes.land(0.3) })
      },
      {
        text: 'sea route',
        shape: ({ ctx, point }) =>
          MAP_SHAPES.route({ ctx, point, color: MAP_SHAPES.color.routes.sea(0.5) })
      },
      {
        text: 'sea ice limit (winter)',
        shape: ({ ctx, point }) =>
          MAP_SHAPES.route({ ctx, point, color: MAP_SHAPES.color.seaIce.winter })
      },
      {
        text: 'sea ice limit (summer)',
        shape: ({ ctx, point }) =>
          MAP_SHAPES.route({ ctx, point, color: MAP_SHAPES.color.seaIce.summer })
      },
      // {
      //   text: 'nomadic camp',
      //   shape: ({ ctx, point, scale }) => MAP_SHAPES.camp({ ctx, point, scale: scale * 2 })
      // },
      // {
      //   text: 'military outpost',
      //   shape: ({ ctx, point, scale }) => MAP_SHAPES.fort({ ctx, point, scale: scale * 2 })
      // },
      {
        text: 'contested',
        shape: ({ ctx, point, scale }) => MAP_SHAPES.contested({ ctx, point, scale })
      }
    ]
  },
  temperature: {
    scale: d3.scaleLinear([-35, 30], [1, 0]),
    color: (heat: number) => d3.interpolateSpectral(MAP_METRICS.temperature.scale(heat)),
    value: (celsius: number) =>
      metric ? celsius : MATH.conversion.temperature.celsius.fahrenheit(celsius),
    format: (celsius: number) =>
      `${MAP_METRICS.temperature.value(celsius).toFixed(0)}° ${MAP_METRICS.temperature
        .units()
        .replace('°', '')}`,
    legend: () =>
      [-30, -24, -18, -12, -5, 0, 5, 12, 18, 24, 30].reverse().map(heat => ({
        color: MAP_METRICS.temperature.color(heat),
        text: MAP_METRICS.temperature.format(heat)
      })),
    units: () => (metric ? '°C' : '°F')
  },
  topography: {
    colors: {
      marsh: '#94bab5',
      flatlands: '#A6BF97',
      'rolling hills': '#B0B784 ',
      'rugged hills': '#D6D2AD ',
      highlands: '#b5a38f',
      mountains: '#867764'
    },
    legend: () =>
      Object.entries(MAP_METRICS.topography.colors)
        .reverse()
        .map(([k, v]) => ({
          color: v,
          text: k
        }))
  }
}
