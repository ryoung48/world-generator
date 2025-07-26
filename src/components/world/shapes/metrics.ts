import * as d3 from 'd3'

import { RAIN } from '../../../models/cells/weather/rain'
import { TEMPERATURE } from '../../../models/cells/weather/temperature'
import { PROVINCE } from '../../../models/provinces'
import { TIMEZONE_SHAPER } from '../../../models/shapers/civilization/timezones'
import { MATH } from '../../../models/utilities/math'
import { DrawLegendParams, LegendParams } from '../embellishments/types'
import { MAP_SHAPES } from '.'

const elevation = [0, 300, 600, 1200, 2000, 3000, 4000, 6000, 9000, 12000, 16000, 20000, 26000].map(
  MATH.conversion.distance.feet.km
)

const metric = true

const pastelSpectral = d3
  .scaleLinear<number, string, string>()
  .domain([-18, -12, -2, 10, 20, 30, 40])
  .range([
    '#d3efff',
    '#7fd0ff',
    '#91ffdc',
    '#e6f598',
    '#ffa75b',
    '#ff7785',
    '#c293ff'
  ] as unknown[] as number[])

const pastelBrBG = d3
  .scaleLinear<number, string, string>()
  .domain([1.0, 1.35, 1.7, 2.75, 3.1, 3.8, 4.5])
  .range([
    '#c18b3c', // golden orange
    '#e0c283', // soft gold
    '#f2e5c2', // pale cream
    '#edf1ea', // neutral light
    '#c3e7e2', // very light aqua
    '#81cac0', // soft teal
    '#3b9a91' // medium teal
  ] as unknown[] as number[])
  .clamp(true)

export const MAP_METRICS = {
  metric,
  climate: {
    chaotic: '#b7b4c6',
    color: (heat: number) => pastelSpectral(heat),
    categories: {
      arctic: pastelSpectral(-20),
      subarctic: pastelSpectral(-10),
      boreal: pastelSpectral(-2),
      temperate: pastelSpectral(10),
      subtropical: pastelSpectral(20),
      tropical: pastelSpectral(25),
      infernal: pastelSpectral(40),
      chaotic: '#b7b4c6'
    },
    legend: (): LegendParams => ({
      items: [
        { text: 'arctic', color: MAP_METRICS.climate.categories.arctic },
        { text: 'subarctic', color: MAP_METRICS.climate.categories.subarctic },
        { text: 'boreal', color: MAP_METRICS.climate.categories.boreal },
        { text: 'temperate', color: MAP_METRICS.climate.categories.temperate },
        { text: 'subtropical', color: MAP_METRICS.climate.categories.subtropical },
        { text: 'tropical', color: MAP_METRICS.climate.categories.tropical }
        // { text: 'infernal', color: pastelSpectral(40) },
        // { text: 'chaotic', color: MAP_METRICS.climate.chaotic }
      ],
      width: 10
    })
  },
  development: {
    color: (k: number) => pastelBrBG(k),
    legend: (): LegendParams => ({
      items: [
        ...Object.entries(PROVINCE.development.scale).map(([k, v]) => ({
          color: MAP_METRICS.development.color(v),
          text: k
        })),
        {
          text: 'colonial',
          shape: ({ ctx, point, scale }) =>
            MAP_SHAPES.hatched.square({
              ctx,
              point,
              scale,
              color: MAP_METRICS.government.colors.colonial
            })
        }
      ],
      width: 10
    })
  },
  topography: {
    color: d3.scaleLinear(elevation, [
      '#8AAB78',
      '#8AAB78',
      '#97b584',
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
    categories: () => ({
      mountains: MAP_METRICS.topography.color(1.2),
      plateau: MAP_METRICS.topography.color(0.9),
      hills: MAP_METRICS.topography.color(0.35),
      flat: MAP_METRICS.topography.color(0.2),
      coastal: MAP_SHAPES.color.coastal,
      marsh: MAP_SHAPES.color.marsh
    }),
    legend: (): LegendParams => ({
      items: [
        {
          text: 'volcanic',
          shape: ({ ctx, point, scale }) =>
            MAP_SHAPES.hatched.square({ ctx, point, scale, color: MAP_SHAPES.color.volcanic })
        },
        {
          text: 'mountains',
          shape: ({ ctx, point, scale }) =>
            MAP_SHAPES.gradient({
              ctx,
              point,
              scale,
              from: MAP_METRICS.topography.color(3),
              to: MAP_METRICS.topography.color(5)
            })
        },
        { text: 'plateau', color: MAP_METRICS.topography.color(0.9) },
        { text: 'hills', color: MAP_METRICS.topography.color(0.35) },
        { text: 'flat', color: MAP_METRICS.topography.color(0.2) },
        { text: 'coastal', color: MAP_SHAPES.color.coastal },
        {
          text: 'marsh',
          shape: ({ ctx, point, scale }) =>
            MAP_SHAPES.hatched.square({ ctx, point, scale, color: MAP_SHAPES.color.marsh })
        },
        // {
        //   text: 'major river',
        //   shape: ({ ctx, point }) =>
        //     MAP_SHAPES.river.path({ ctx, point, color: MAP_SHAPES.river.color(0.8) })
        // },
        {
          text: 'freshwater',
          shape: ({ ctx, point }) =>
            MAP_SHAPES.circle({
              ctx,
              point,
              fill: MAP_SHAPES.color.water.fresh,
              radius: 6,
              border: { color: 'black', width: 0.5 }
            })
        },
        {
          text: 'saltwater',
          shape: ({ ctx, point }) =>
            MAP_SHAPES.circle({
              ctx,
              point,
              fill: MAP_SHAPES.color.water.salt,
              radius: 6,
              border: { color: 'black', width: 0.5 }
            })
        },
        {
          text: 'seasonal sea ice',
          shape: ({ ctx, point }) =>
            MAP_SHAPES.circle({
              ctx,
              point,
              fill: MAP_SHAPES.color.water.seaIce.seasonal,
              radius: 6,
              border: { color: 'black', width: 0.5 }
            })
        },
        {
          text: 'permanent sea ice',
          shape: ({ ctx, point }) =>
            MAP_SHAPES.circle({
              ctx,
              point,
              fill: MAP_SHAPES.color.water.seaIce.permanent,
              radius: 6,
              border: { color: 'black', width: 0.5 }
            })
        }
      ],
      width: 15
    })
  },
  government: {
    colors: {
      autocracy: 'hsl(0, 100%, 87%)',
      republic: 'hsl(217, 100%, 87%)',
      oligarchy: 'hsl(147, 100%, 87%)',
      confederation: 'hsl(28, 100%, 86%)',
      fragmented: 'hsl(195, 43%, 89%)',
      theocracy: 'hsl(45, 77%, 95%)',
      colonial: 'hsl(185, 91%, 60%)',
      vassal: 'hsl(256, 85%, 75%)'
    },
    legend: (): LegendParams => ({
      items: [
        ...Object.entries(MAP_METRICS.government.colors)
          .slice(0, -2)
          .map(([k, v]) => ({
            color: v,
            text: k
          })),
        {
          text: 'vassal',
          shape: ({ ctx, point, scale }) =>
            MAP_SHAPES.hatched.square({
              ctx,
              point,
              scale,
              color: MAP_METRICS.government.colors.vassal
            })
        },
        {
          text: 'colonial',
          shape: ({ ctx, point, scale }) =>
            MAP_SHAPES.hatched.square({
              ctx,
              point,
              scale,
              color: MAP_METRICS.government.colors.colonial
            })
        }
      ],
      width: 10
    })
  },
  population: {
    scale: d3.scaleLinear([0, 7], [0, 1]),
    color: (popMi: number) => d3.interpolateBuPu(MAP_METRICS.population.scale(popMi)),
    value: (popMi: number) => (metric ? MATH.conversion.population.mi.km(popMi) : popMi),
    format: (popMi: number) =>
      `${MAP_METRICS.population.value(popMi).toFixed(2)} ${MAP_METRICS.population.units()}`,
    legend: (): LegendParams => ({
      items: Object.entries(PROVINCE.population.scale).map(([, v]) => ({
        color: d3.interpolateBuPu(v),
        text: `${
          v === 0
            ? 0
            : MAP_METRICS.population.value(2 ** MAP_METRICS.population.scale.invert(v)).toFixed(0)
        } ${MAP_METRICS.population.units()}`
      })),
      width: 12
    }),
    units: () => `persons/${metric ? 'km²' : 'mi²'}`
  },
  oceanDist: {
    format: (mi: number, p = 0) =>
      metric ? `${MATH.conversion.distance.miles.km(mi).toFixed(p)} km` : `${mi.toFixed(p)} mi`
  },
  rain: {
    color: (r: number) => RAIN.annual.color(r),
    value: (mm: number) => (metric ? mm : MATH.conversion.height.mm.in(mm)),
    format: (mm: number) => `${MAP_METRICS.rain.value(mm).toFixed(0)} ${MAP_METRICS.rain.units()}`,
    legend: (): LegendParams => ({
      items: Object.entries(RAIN.thresholds.annual)
        .reverse()
        .map(([text, r]) => ({
          color: MAP_METRICS.rain.color(r),
          text
        })),
      width: 10
    }),
    units: () => (metric ? 'mm' : 'in')
  },
  religion: {
    colors: {
      atheistic: 'hsl(0, 100%, 72%)',
      pluralistic: 'hsl(0, 69%, 80%)',
      nontheistic: 'hsl(46, 58%, 78%)',
      monotheistic: 'hsl(214, 41%, 63%)',
      dualistic: 'hsl(195, 65.90%, 60%)',
      polytheistic: 'hsl(28, 100%, 71%)',
      syncretic: 'hsl(154, 24%, 51%)',
      animistic: 'hsl(120, 57.60%, 62%)'
    },
    legend: (): LegendParams => ({
      items: [
        ...(Object.entries(MAP_METRICS.religion.colors).map(([k, v]) => ({
          shape: ({ ctx, point, scale }) =>
            MAP_SHAPES.hatched.partial({ ctx, point, scale, color: v }),
          text: k
        })) as DrawLegendParams['items'])
      ],
      width: 12
    })
  },
  settlement: {
    legend: (): LegendParams => ({
      items: [
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
        // {
        //   text: 'military outpost',
        //   shape: ({ ctx, point, scale }) => MAP_SHAPES.fort({ ctx, point, scale: scale * 2 })
        // },
        // {
        //   text: 'nomadic camp',
        //   shape: ({ ctx, point, scale }) => MAP_SHAPES.camp({ ctx, point, scale: scale * 2 })
        // },
        // {
        //   text: 'ruin',
        //   shape: ({ ctx, point, scale }) => MAP_SHAPES.ruins({ ctx, point, scale: scale * 2 })
        // },
        // {
        //   text: 'wilderness',
        //   shape: ({ ctx, point, scale }) => MAP_SHAPES.wilderness({ ctx, point, scale: scale * 2 })
        // },
        {
          text: 'major road',
          shape: ({ ctx, point }) =>
            MAP_SHAPES.route({
              ctx,
              point,
              dash: [],
              color: { primary: MAP_SHAPES.color.routes.land(0.8), secondary: 'white' },
              width: 4,
              lineCap: 'butt'
            })
        },
        {
          text: 'minor road',
          shape: ({ ctx, point }) =>
            MAP_SHAPES.route({
              ctx,
              point,
              dash: [],
              color: { primary: MAP_SHAPES.color.routes.land(0.5) }
            })
        },
        {
          text: 'sea route',
          shape: ({ ctx, point }) =>
            MAP_SHAPES.route({ ctx, point, color: { primary: MAP_SHAPES.color.routes.sea(0.5) } })
        },
        {
          text: 'skyship route',
          shape: ({ ctx, point }) =>
            MAP_SHAPES.route({
              ctx,
              point,
              color: { primary: MAP_SHAPES.color.routes.skyship },
              dash: [4, 1, 1]
            })
        },
        // {
        //   text: 'walls',
        //   shape: ({ ctx, point }) =>
        //     MAP_SHAPES.route({
        //       ctx,
        //       point,
        //       color: { primary: 'black' },
        //       dash: [1, 4]
        //     })
        // },
        {
          text: 'contested',
          shape: ({ ctx, point, scale }) =>
            MAP_SHAPES.hatched.square({ ctx, point, scale, color: MAP_SHAPES.color.contested(0.6) })
        },
        {
          text: 'wasteland',
          color: MAP_SHAPES.color.wasteland
        }
      ],
      width: 12
    })
  },
  temperature: {
    color: (heat: number) => TEMPERATURE.color(MAP_METRICS.temperature.value(heat)),
    value: (celsius: number) =>
      metric ? celsius : MATH.conversion.temperature.celsius.fahrenheit(celsius),
    format: (celsius: number) =>
      `${MAP_METRICS.temperature.value(celsius).toFixed(0)}° ${MAP_METRICS.temperature
        .units()
        .replace('°', '')}`,
    legend: (): LegendParams => ({
      items: [-15, -10, -5, 0, 5, 15, 20, 25, 30].reverse().map(heat => ({
        color: MAP_METRICS.temperature.color(heat),
        text: TEMPERATURE.describe(heat)
      })),
      width: 10
    }),
    units: () => (metric ? '°C' : '°F')
  },
  vegetation: {
    color: {
      corruption: '#bcd5ff',
      desert: '#F5F3E9',
      sparse: '#E3E1D1',
      grasslands: '#D4E5C6',
      woods: '#ABBDA7',
      forest: '#91B69A',
      jungle: '#7ECBA9'
    },
    legend: (): LegendParams => ({
      items: [
        ...Object.entries(MAP_METRICS.vegetation.color)
          .reverse()
          .map(([k, v]) => ({
            color: v,
            text: k
          }))
      ],
      width: 10
    })
  },
  timezone: {
    colors: {
      even: '#e8d4c2',
      odd: '#e5b7d6',
      archaic: '#c16555',
      uncivilized: MAP_SHAPES.color.wasteland
    },
    color: (offset: number) => {
      return offset === TIMEZONE_SHAPER.zones.archaic
        ? MAP_METRICS.timezone.colors.archaic
        : offset === TIMEZONE_SHAPER.zones.wasteland
        ? MAP_METRICS.timezone.colors.uncivilized
        : offset % 2 === 0
        ? MAP_METRICS.timezone.colors.even
        : MAP_METRICS.timezone.colors.odd
    },
    legend: (): LegendParams => {
      return {
        items: [
          { text: 'even', color: MAP_METRICS.timezone.colors.even },
          { text: 'odd', color: MAP_METRICS.timezone.colors.odd },
          {
            text: 'partial',
            shape: ({ ctx, point, scale }) =>
              MAP_SHAPES.hatched.square({
                ctx,
                point,
                scale,
                color: MAP_METRICS.timezone.colors.odd
              })
          },
          { text: 'archaic', color: MAP_METRICS.timezone.colors.archaic },
          { text: 'none', color: MAP_METRICS.timezone.colors.uncivilized }
        ],
        width: 10
      }
    }
  }
}
