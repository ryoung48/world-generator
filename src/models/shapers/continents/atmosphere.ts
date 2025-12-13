import { scaleLinear } from 'd3'
import { RAIN } from '../../cells/weather/rain'
import { MATH } from '../../utilities/math'
import { SIMPLEX } from '../../utilities/math/dice/noise'
import { Point } from '../../utilities/math/points/types'
import { PERFORMANCE } from '../../utilities/performance'

export const SHAPER_ATMOSPHERE = PERFORMANCE.profile.wrapper({
    label: 'ATMOSPHERE',
    o: {
        build: () => {
            SHAPER_ATMOSPHERE._clouds()
        },

        _clouds: () => {
            const cells = window.world.cells
            const seed = window.world.id as string

            // (2) Smaller, puffier-looking areas with large-scale mask
            const baseClouds = SIMPLEX.chaos(
                cells,
                { octaves: 8, frequency: 1, persistence: 0.8 },
                seed + 'cloudSmall'
            )

            const cloudMask = SIMPLEX.chaos(
                cells,
                { octaves: 8, frequency: 0.5, persistence: 0.5 },
                seed + 'cloudLarge'
            )

            // const largeNoise = SIMPLEX.chaos(
            //     cells,
            //     { octaves: 4, frequency: 4, persistence: 0.5 },
            //     seed + 'cloudLarge'
            // )

            // ------------------------------------------------------
            // 4. Rain Masking (remove clouds in areas of low precipitation)
            // ------------------------------------------------------

            const cloudDensityScale = scaleLinear()
                .domain([
                    0,
                    RAIN.thresholds.annual.parched,
                    RAIN.thresholds.annual.arid,
                    RAIN.thresholds.annual.dry,
                    RAIN.thresholds.annual.low,
                    RAIN.thresholds.annual.moderate
                ])
                .range([0, 0.2, 0.4, 0.6, 0.8, 1.0])
                .clamp(true)

            cells.forEach((cell, i) => {

                // Blend large bands and puffy clouds
                let cloud = baseClouds[i] * (1 - cloudMask[i] * 1.5)

                // Mask by precipitation / water
                let rainFactor = 1.0
                const annualRain = cell.rain && typeof cell.rain.annual === 'number'
                    ? cell.rain.annual
                    : -1

                if (annualRain >= 0) {
                    rainFactor = cloudDensityScale(annualRain)
                } else if (cell.isWater) {
                    // Ocean cells: moderate cloud coverage if no rain data
                    rainFactor = 0.7
                }

                cloud *= rainFactor

                // Clamp to 0..1
                cloud = Math.max(0, Math.min(1, cloud))
                cell.clouds = cloud
            })

            console.log('Atmosphere generated')
        }
    }
})
