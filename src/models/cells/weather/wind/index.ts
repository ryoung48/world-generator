import { MATH } from '../../../utilities/math'
import { EBM } from '../ebm'
import { TEMPERATURE } from '../temperature'

const convertVector = (u: number, v: number) => {
  const speed = Math.sqrt(u * u + v * v)
  const mathDir = Math.atan2(v, u)
  // Current calculation gives "blowing towards"
  const toDirection = (((270 - (mathDir * 180) / Math.PI) % 360) + 360) % 360
  // Add 180° to get "blowing from" direction
  const fromDirection = (toDirection + 180) % 360
  return { speed: Math.max(0.5, speed), direction: fromDirection }
}

export function populateWindFields(): void {
  const cells = window.world.cells
  if (!cells || cells.length === 0) return
  const equatorTemp = EBM.model.scales.heat.avg(0)
  const northPoleTemp = EBM.model.scales.heat.avg(90)
  const southPoleTemp = EBM.model.scales.heat.avg(-90)

  const monthlyTemps: Record<number, number[]> = {}
  for (let month = 0; month < 12; month++) {
    monthlyTemps[month] = cells.map(cell => TEMPERATURE.monthly.mean({ cell, month }))
  }

  // Generate wind for each cell individually using simplified atmospheric physics
  cells.forEach((cell, cellIndex) => {
    if (cell.isWater) return
    const windData: { speed: number; direction: number }[] = []

    // Get cell properties
    const lat = cell.y
    const elevation = cell.elevation ? cell.elevation * 1000 : (cell.h || 0) * 100 // Convert to meters
    const distanceFromCoastKm = MATH.conversion.distance.miles.km(
      cell.oceanDist * window.world.cell.length
    )
    const continental = window.world.landmarks[cell.landmark].type === 'continent'
    const isLand = !cell.isWater

    const expectedTempForLat = EBM.model.scales.heat.avg(lat)
    const poleTemp = lat > 0 ? northPoleTemp : southPoleTemp
    const poleEquatorGradient = Math.abs(equatorTemp - poleTemp) / 90
    const gradientBoost = 1 + Math.min(poleEquatorGradient / 50, 0.8)

    // Generate wind for each month using actual temperature data
    for (let month = 0; month < 12; month++) {
      const currentTemp = monthlyTemps[month][cellIndex]
      // Get temperature for adjacent months using pre-calculated arrays
      const prevMonth = month === 0 ? 11 : month - 1
      const nextMonth = month === 11 ? 0 : month + 1
      const prevTemp = monthlyTemps[prevMonth][cellIndex]
      const nextTemp = monthlyTemps[nextMonth][cellIndex]

      // Local seasonal temperature gradient - how fast temperature is changing
      const tempChangeRate = Math.abs(nextTemp - prevTemp) / 2
      const seasonalBoost = 1 + Math.min(tempChangeRate / 10, 0.5)
      // 1. Base circulation
      const itczShift = 10 * Math.sin(((month - 2) * Math.PI) / 6)
      let { u, v } = baseCirculation(lat, itczShift)
      // 2. Temperature anomaly effect
      const tempAnomaly = currentTemp - expectedTempForLat
      u += tempAnomaly * 0.02
      v += tempAnomaly * 0.01
      // 3. Monsoons
      const monsoonMagnitude = monsoonAdjustment(lat, month, isLand, continental)
      u += monsoonMagnitude.mu
      v += monsoonMagnitude.mv
      // 4. Land-sea thermal contrast
      const expectedOceanTemp = expectedTempForLat + 2 * Math.cos(((month - 6) * Math.PI) / 6)
      const ls = landSeaContrastAdjustment(isLand, currentTemp, expectedOceanTemp, lat)
      u += ls.u
      v += ls.v
      // 5. Gradient scaling
      const { u: uScaled, v: vScaled } = gradientScaling(u, v, gradientBoost, seasonalBoost)
      u = uScaled
      v = vScaled
      // 6. Terrain + inland drag
      const tAdj = terrainAdjustment(u, v, distanceFromCoastKm, elevation, month)
      u = tAdj.u
      v = tAdj.v
      // 7. zonal dampening
      const { du, dv } = equatorialDamping(lat, itczShift, isLand)
      u *= du
      v *= dv
      // 8. Variability (gustiness, chaos)
      const variability = 0.2
      u += (Math.random() - 0.5) * variability * Math.abs(u)
      v += (Math.random() - 0.5) * variability * Math.abs(v)
      const wind = convertVector(u, v)
      windData.push(wind)
    }

    cell.wind = windData
  })
}

function baseCirculation(lat: number, itczShift: number) {
  let u = 0,
    v = 0
  const adjLat = lat - itczShift
  const latRad = Math.abs(adjLat)

  if (latRad < 30) {
    // Trades
    const tradeStrength = 6 * Math.exp(-Math.pow(adjLat / 15, 2))
    u += tradeStrength // Easterly component

    // Coriolis deflection creates meridional component
    if (adjLat <= 0) {
      // Northern Hemisphere: NE trades (toward equator = negative v)
      v -= tradeStrength * 0.3 // Adjust multiplier as needed
    } else {
      // Southern Hemisphere: SE trades (toward equator = positive v)
      v += tradeStrength * 0.3
    }
  }
  if (latRad > 30 && latRad < 60) {
    // Westerlies
    const westerlyStrength = 12 * Math.exp(-Math.pow((latRad - 45) / 15, 2))
    u -= westerlyStrength

    if (adjLat <= 0) {
      v += westerlyStrength * 0.2 // NH: toward pole (north)
    } else {
      v -= westerlyStrength * 0.2 // SH: toward pole (south)
    }
  }
  if (latRad > 60) {
    // Polar easterlies
    const polarStrength = 6 * Math.exp(-Math.pow((latRad - 75) / 10, 2))
    u += polarStrength

    if (adjLat <= 0) {
      v -= polarStrength * 0.4 // NH: toward equator (south)
    } else {
      v += polarStrength * 0.4 // SH: toward equator (north)
    }
  }

  return { u, v }
}

function gradientScaling(u: number, v: number, gradientBoost: number, seasonalBoost: number) {
  return {
    u: u * gradientBoost * seasonalBoost,
    v: v * gradientBoost * seasonalBoost
  }
}

function landSeaContrastAdjustment(
  isLand: boolean,
  currentTemp: number,
  expectedOceanTemp: number,
  lat: number
) {
  if (!isLand) return { u: 0, v: 0 }
  const contrast = currentTemp - expectedOceanTemp
  return { u: 0, v: contrast * 0.1 * Math.sign(lat) }
}

function monsoonAdjustment(
  lat: number,
  month: number,
  isLand: boolean,
  continental: boolean
): { mu: number; mv: number } {
  // Only consider monsoon contribution for tropical/subtropical lands
  const latAbs = Math.abs(lat)
  if (!isLand || latAbs > 35 || !continental) {
    return { mu: 0, mv: 0 }
  }

  // Strength envelope (decreases with latitude away from equator)
  const monsoonLatFactor = Math.max(0, 1 - latAbs / 35) // 1 at equator, 0 at 35°

  // Month phasing: strongest summer months (NH summer: Apr–Sep roughly)
  // We make magnitude peak near climatological monsoon month (June/July for NH in many regions)
  // For SH continental monsoon we flip months by hemisphere below.
  const nhSummer = (m: number) => m >= 4 && m <= 8 // May-Sep peak window
  const shSummer = (m: number) => m === 11 || m <= 2 || m === 10 // Nov-Feb-ish (example)
  const hemisphereSign = Math.sign(lat) || 1 // +1 NH, -1 SH

  // Base strengths - tuned values (m/s)
  const baseSummerStrength = 8.0 // typical strong onshore mean contribution
  const baseWinterStrength = 3.5 // weaker offshore contribution

  let seasonalStrength = 0
  if (hemisphereSign > 0) {
    // Northern Hemisphere
    seasonalStrength = nhSummer(month) ? baseSummerStrength : baseWinterStrength
  } else {
    // Southern Hemisphere
    seasonalStrength = shSummer(month) ? baseSummerStrength : baseWinterStrength
  }

  // Month phasing smooth (gives a peak shape rather than hard step)
  // phaseFactor ∈ [0.5, 1.0] depending on closeness to peak month (June/Jan)
  const peakMonth = hemisphereSign > 0 ? 6 : 0 // June for NH, January for SH
  const dmonth = Math.min(Math.abs(month - peakMonth), 12 - Math.abs(month - peakMonth))
  const phaseFactor = 0.5 + 0.5 * Math.exp(-(dmonth * dmonth) / (2 * 2.5 * 2.5)) // width ~2.5 months

  // Continental boost (bigger continents → stronger monsoon)
  const continentalBoost = continental ? 1.0 + Math.min(0.6, monsoonLatFactor * 0.6) : 0.8

  // Final scalar magnitude
  const mag = seasonalStrength * monsoonLatFactor * phaseFactor * continentalBoost

  // Direction: Onshore means toward land center. We want flow from ocean -> land.
  // Simple approximation:
  // - dominant meridional (v) component toward hemisphere (sign(lat))
  // - zonal (mu) component to include typical SW/NW inflow depending on hemisphere:
  //    NH summer monsoon typically from SW (u negative), winter offshore from NE (u positive)
  //    SH summer monsoon typically from NW (u positive), winter offshore from SE (u negative)
  let mu = 0
  let mv = 0

  if (hemisphereSign > 0) {
    // Northern Hemisphere
    if (nhSummer(month)) {
      mu = -0.7 * mag // westward component (SW inflow)
      mv = 0.7 * mag * Math.sign(lat) // southerly onshore (toward land)
    } else {
      mu = 0.4 * mag // eastward offshore in winter
      mv = -0.6 * mag * Math.sign(lat) // offshore meridional
    }
  } else {
    // Southern Hemisphere
    if (shSummer(month)) {
      mu = 0.7 * mag // eastward component (NW inflow -> positive u)
      mv = -0.7 * mag * Math.sign(lat) // northerly onshore (toward land)
    } else {
      mu = -0.4 * mag // westward offshore
      mv = 0.6 * mag * Math.sign(lat) // offshore meridional
    }
  }

  // Small randomness so monsoon isn't perfectly deterministic
  mu *= 0.9 + 0.2 * Math.random()
  mv *= 0.9 + 0.2 * Math.random()

  return { mu, mv }
}

function terrainAdjustment(
  u: number,
  v: number,
  distanceFromCoastKm: number,
  elevation: number,
  month: number
) {
  // Inland friction
  const continentalFactor = Math.min(distanceFromCoastKm / 1500, 0.8)
  const friction = 1 - continentalFactor * 0.4
  u *= friction
  v *= friction

  // Mountains
  if (elevation > 500) {
    const altitudeFactor = Math.min(elevation / 2000, 1)
    const mountainBoost = 1 + 0.5 * altitudeFactor
    u *= mountainBoost
    v *= mountainBoost
    v += 2 * altitudeFactor * Math.sin(((month - 5) * Math.PI) / 6)
  }

  return { u, v }
}

// Place this helper near your other helpers
function equatorialDamping(
  lat: number,
  itczShift: number,
  isLand: boolean
): { du: number; dv: number } {
  // Distance (deg) from the current ITCZ position
  const d = Math.abs(lat - itczShift)

  // Gaussian taper: 1 at ITCZ, ~0 by ~12–15°
  // tune widthDeg for broader/narrower doldrums
  const widthDeg = 8
  const g = Math.exp(-(d * d) / (2 * widthDeg * widthDeg))

  // Base damping strengths: u gets hit harder than v
  // dv is weaker so convergence can persist.
  let du = 1 - 0.75 * g // up to 75% u reduction at ITCZ core
  let dv = 1 - 0.35 * g // up to 35% v reduction

  // Optional: over open ocean, convection/calm is stronger than over rough land
  if (!isLand) {
    du = 1 - 0.85 * g // stronger zonal damping over ocean
    dv = 1 - 0.45 * g
  }

  // Clamp to sane range
  du = Math.max(0.1, du)
  dv = Math.max(0.3, dv)

  return { du, dv }
}
