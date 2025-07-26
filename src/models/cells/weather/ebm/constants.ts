export const EMB_CONSTANTS = {
  chaotic: { min: 0, max: 40 },
  stellar: {
    T_SUN: 5778.0 * 1, // Sun's surface temperature [K]
    R_SUN: 6.9634e8, // Sun's radius [m]
    AU: 1.496e11 * 1.0, // Astronomical Unit [m]
    SIGMA: 5.67e-8 // Stefan-Boltzmann constant [W/(m²K⁴)]
  },
  time: {
    DAYS_PER_YEAR: 365 * 1,
    HOURS_PER_DAY: 24 * 1
  },
  grid: { NUM_LAT: 36 },
  surface: {
    EMISSIVITY: 0.95,
    GREENHOUSE: 0.635,
    ALBEDO: { ICE: 0.65, LAND: 0.35, OCEAN: 0.25 }
  },
  thermal: {
    OCEAN_HEAT_CAPACITY: 4e7, // J/(m²K)
    LAND_HEAT_CAPACITY: 1e7, // J/(m²K)
    ICE_LIMIT: 273.15 - 10 // Temperature threshold for ice [K]
  },
  orbital: {
    OBLIQUITY: 23.5, // in degrees
    ECCENTRICITY: 0.0,
    PERIHELION: 90 // degrees
  }
}
