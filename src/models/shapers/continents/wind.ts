import { populateWindFields } from '../../cells/weather/wind'
import { PERFORMANCE } from '../../utilities/performance'

export const SHAPER_WIND = PERFORMANCE.profile.wrapper({
  label: 'WIND',
  o: {
    build: () => {
      // Populate wind fields for all cells using the new wind generator
      populateWindFields()

      // Log completion
      const cellsWithWind = window.world.cells.filter(
        cell => cell.wind && cell.wind.length > 0
      ).length
      console.log(`Wind populated for ${cellsWithWind} cells`)
    }
  }
})
