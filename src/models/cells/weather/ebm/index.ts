import * as d3 from 'd3'
import { range } from 'd3'

import { MATH } from '../../../utilities/math'
import { ALBEDO } from './albedo'
import { EMB_CONSTANTS } from './constants'
import { INSOLATION } from './insolation'

/* eslint-disable camelcase */
let MODEL_INIT = false

// Create latitude grid (in radians and degrees) and sin(lat)
const lats: number[] = []
const lats_deg: number[] = []
const sin_lats: number[] = []

// For cell boundaries in sin(latitude) space, we need one more point than the number of cells
const lat_bounds: number[] = []
let sin_lat_bounds: number[] = []
const dx: number[] = []
const heat_capacity: number[] = []

// Allocate 2D arrays: dimensions [NUM_LAT][DAYS_PER_YEAR]
let insolation: number[][] = []
let daylightHours: number[][] = []
const temperature: number[][] = []
let temperature_avg: number[] = []
let temperature_min: number[] = []
let temperature_max: number[] = []
const albedo: number[][] = []
const olr: number[][] = []
let land_fraction: number[] = []

function heatDiffusion(tIdx: number): number[] {
  const { grid, time } = EMB_CONSTANTS
  const earthDayHours = 24.0
  const rotationFactor = Math.pow(time.HOURS_PER_DAY / earthDayHours, 1.5)
  // Increase edge diffusion for low obliquity to represent stronger polar cells
  const edgeDiff = 0.1
  // Use same diffusion value for both poles to ensure symmetry
  const diffuser = d3.scaleLinear().domain([-90, 0, 90]).range([edgeDiff, 0.6, edgeDiff])
  // Get the temperature at time tIdx for all latitudes
  const T: number[] = temperature.map(row => row[tIdx])
  // Calculate fluxes in both directions and average them for symmetry
  // First pass: south to north
  const fluxSN: number[] = new Array(grid.NUM_LAT + 1).fill(0)
  for (let i = 1; i < grid.NUM_LAT; i++) {
    const effectiveD = diffuser(lats_deg[i]) * rotationFactor
    const xBoundary = 0.5 * (sin_lats[i] + sin_lats[i - 1])
    const dTdx =
      Math.abs(sin_lats[i] - sin_lats[i - 1]) > 0
        ? (T[i] - T[i - 1]) / (sin_lats[i] - sin_lats[i - 1])
        : 0
    const cos2LatBoundary = 1.0 - xBoundary * xBoundary
    fluxSN[i] = -effectiveD * cos2LatBoundary * dTdx
  }
  // Zero flux at the poles
  fluxSN[0] = 0.0
  fluxSN[grid.NUM_LAT] = 0.0
  // Second pass: north to south (reversed direction)
  const fluxNS: number[] = new Array(grid.NUM_LAT + 1).fill(0)
  for (let i = 0; i < grid.NUM_LAT; i++) {
    const effectiveD = diffuser(lats_deg[i]) * rotationFactor
    const xBoundary = 0.5 * (sin_lats[i + 1] + sin_lats[i])
    const dTdx =
      Math.abs(sin_lats[i + 1] - sin_lats[i]) > 0
        ? (T[i] - T[i + 1]) / (sin_lats[i] - sin_lats[i + 1])
        : 0
    const cos2LatBoundary = 1.0 - xBoundary * xBoundary
    fluxNS[i + 1] = -effectiveD * cos2LatBoundary * dTdx
  }
  // Zero flux at the poles
  fluxNS[0] = 0.0
  fluxNS[grid.NUM_LAT] = 0.0
  // Average the two fluxes for symmetric diffusion
  const flux: number[] = new Array(grid.NUM_LAT + 1).fill(0)
  for (let i = 0; i <= grid.NUM_LAT; i++) {
    flux[i] = 0.5 * (fluxSN[i] + fluxNS[i])
  }
  const diffTerm: number[] = new Array(grid.NUM_LAT).fill(0)
  for (let i = 0; i < grid.NUM_LAT; i++) {
    diffTerm[i] = Math.abs(dx[i]) > 0 ? -(flux[i + 1] - flux[i]) / dx[i] : 0
  }
  return diffTerm
}

// Step the temperature forward one time step using the energy balance
function stepTemperature(tIdx: number, dt: number): void {
  const { grid, surface, stellar, time } = EMB_CONSTANTS
  const nextIdx = (tIdx + 1) % time.DAYS_PER_YEAR
  const absorbed: number[] = new Array(grid.NUM_LAT).fill(0)
  for (let i = 0; i < grid.NUM_LAT; i++) {
    absorbed[i] = insolation[i][tIdx] * (1 - albedo[i][tIdx])
  }
  // Outgoing longwave radiation (OLR)
  for (let i = 0; i < grid.NUM_LAT; i++) {
    olr[i][tIdx] = surface.EMISSIVITY * stellar.SIGMA * Math.pow(temperature[i][tIdx], 4)
    olr[i][tIdx] *= surface.GREENHOUSE
  }
  const diffTerm = heatDiffusion(tIdx)
  for (let i = 0; i < grid.NUM_LAT; i++) {
    const dTdt = (absorbed[i] - olr[i][tIdx] + diffTerm[i]) / heat_capacity[i]
    temperature[i][nextIdx] = temperature[i][tIdx] + dTdt * dt
  }
  ALBEDO.update({ albedo, lats_deg, temperature, land_fraction, time: nextIdx })
}

const initModel = () => {
  const { grid, time, thermal } = EMB_CONSTANTS
  land_fraction = ALBEDO.landFraction()
  for (let i = 0; i < grid.NUM_LAT; i++) {
    const lat = -Math.PI / 2 + (Math.PI * i) / (grid.NUM_LAT - 1)
    lats.push(lat)
    lats_deg.push(MATH.conversion.angles.degrees(lat))
    sin_lats.push(Math.sin(lat))
  }
  for (let i = 0; i < grid.NUM_LAT + 1; i++) {
    const latBound = -Math.PI / 2 + (Math.PI * i) / grid.NUM_LAT
    lat_bounds.push(latBound)
    sin_lat_bounds.push(Math.sin(latBound))
  }
  for (let i = 0; i < grid.NUM_LAT; i++) {
    dx.push(sin_lat_bounds[i + 1] - sin_lat_bounds[i])
    heat_capacity.push(
      thermal.LAND_HEAT_CAPACITY * land_fraction[i] +
        thermal.OCEAN_HEAT_CAPACITY * (1 - land_fraction[i])
    )
    temperature.push(new Array(time.DAYS_PER_YEAR).fill(288.0)) // initialize with ~15°C everywhere
    albedo.push(new Array(time.DAYS_PER_YEAR).fill(0))
    olr.push(new Array(time.DAYS_PER_YEAR).fill(0))
  }
  const { _insolation, _daylight_hours } = INSOLATION.compute(lats)
  insolation = _insolation
  daylightHours = _daylight_hours
  ALBEDO.update({ albedo, lats_deg, temperature, land_fraction, time: 0 })
}

// Run the simulation over a given number of years and time step (in days)
function runModel(years: number, dtDays: number): void {
  initModel()
  const { grid, time } = EMB_CONSTANTS
  const secondsPerDay = 24 * 3600
  const dt = dtDays * secondsPerDay
  const stepsPerDay = Math.floor(1.0 / dtDays)
  const totalSteps = time.DAYS_PER_YEAR * stepsPerDay * years

  // Save a copy of temperature to check convergence
  let lastTemp = temperature.map(row => row.map(() => 0))

  for (let step = 0; step < totalSteps; step++) {
    const day = Math.floor(step / stepsPerDay)
    const tIdx = day % time.DAYS_PER_YEAR

    // Progress update every ~10% of total steps
    if (step % Math.floor(totalSteps / 10) === 0) {
      let delta = 0
      for (let i = 0; i < grid.NUM_LAT; i++) {
        for (let j = 0; j < time.DAYS_PER_YEAR; j++) {
          delta += Math.abs(lastTemp[i][j] - temperature[i][j])
        }
      }
      // Update lastTemp snapshot
      lastTemp = temperature.map(row => row.slice())
      if (delta < 5) {
        break
      }
    }
    stepTemperature(tIdx, dt)
  }
  for (const i in temperature) {
    for (const j in temperature[i]) {
      temperature[i][j] = MATH.conversion.temperature.kelvin.celsius(
        isNaN(temperature[i][j]) ? 0 : temperature[i][j]
      )
    }
  }
  temperature_avg = temperature.map(row => d3.mean(row))
  temperature_min = temperature.map(row => d3.min(row))
  temperature_max = temperature.map(row => d3.max(row))
}

const scales = {
  heat: {
    daily: [d3.scaleLinear()],
    avg: d3.scaleLinear(),
    min: d3.scaleLinear(),
    max: d3.scaleLinear()
  },
  daylight: {
    daily: [d3.scaleLinear()]
  }
}

export const EBM = {
  constants: EMB_CONSTANTS,
  get model() {
    if (!MODEL_INIT) {
      MODEL_INIT = true
      runModel(30, 0.5)
      const { time } = EMB_CONSTANTS
      scales.heat.avg = d3.scaleLinear().domain(lats_deg).range(temperature_avg)
      scales.heat.daily = range(time.DAYS_PER_YEAR).map(dayIdx =>
        d3
          .scaleLinear()
          .domain(lats_deg)
          .range(lats_deg.map((_, i) => temperature[i][dayIdx]))
      )
      scales.heat.min = d3.scaleLinear().domain(lats_deg).range(temperature_min)
      scales.heat.max = d3.scaleLinear().domain(lats_deg).range(temperature_max)
      scales.daylight.daily = range(time.DAYS_PER_YEAR).map(dayIdx =>
        d3
          .scaleLinear()
          .domain(lats_deg)
          .range(lats_deg.map((_, i) => daylightHours[i][dayIdx]))
      )
    }
    return {
      heat: temperature,
      heatW: [[0]],
      land: land_fraction,
      lats: lats_deg,
      insolation,
      scales,
      ice: [[0]],
      minHeat: temperature_min,
      maxHeat: temperature_max,
      daylightHours
    }
  }
}
