import { NATION } from '../../nations'
import { PROVINCE } from '../../provinces'
import { Province } from '../../provinces/types'
import { PERFORMANCE } from '../../utilities/performance'

// Number of slices (±11 hours = 22 slices). Width per slice in degrees.
const NUM_SLICES = 24
const SLICE_WIDTH = 360 / NUM_SLICES

const ARCHAIC = -30
const WASTELAND = -31

const offsetByLon = (lon: number): number => {
  // Compute the longitudinal difference relative to the world meridian and
  // normalize it to the range [-180, 180) so the resulting offset is within
  // ±12 slices. Adding 540 (360 + 180) before the modulo ensures we avoid
  // negative numbers during the `%` operation.
  const delta = ((lon - window.world.meridian + 540) % 360) - 180
  return delta / SLICE_WIDTH
}

/**
 * Decide – for each nation – whether it enforces a single timezone across all its provinces
 * (e.g. large empires) or lets provinces follow the planetary slice in which they reside.
 */
const assignProvinceTimezones = () => {
  const nations = NATION.nations()
  const developed = nations.filter(n => (n.development ?? 0) >= 4)
  const reference = (
    developed.length > 0 ? window.dice.choice(developed) : window.dice.choice(nations)
  ) as Province
  window.world.meridian = PROVINCE.hub(reference).x

  window.world.provinces.forEach(p => {
    p.timezone = { offset: WASTELAND, singular: true }
  })

  nations.forEach(nation => {
    // Determine how close the nation's hub is to the nearest timezone slice edge.
    const hubLon = PROVINCE.hub(nation).x

    // Base offset – integer slice offset
    let nationalOffset: number | undefined = offsetByLon(hubLon)
    const fraction = Math.abs(nationalOffset % 1)
    const original = Math.floor(nationalOffset)
    nationalOffset = Math.round(nationalOffset)
    const nearEdge =
      fraction > 0.4 && fraction < 0.6 && Math.abs(nationalOffset) < 12 && window.dice.random > 0.3

    // If near an edge, pick the midpoint (±0.5 h) between adjacent time-zones.
    if (nation.government === 'fragmented' && window.dice.random > 0.6) {
      nationalOffset = WASTELAND
    } else if (nearEdge) {
      nationalOffset += nationalOffset > original ? -0.5 : 0.5
    } else if (window.dice.random > 0.9) {
      nationalOffset = ARCHAIC
    }

    // Nations near an edge always unify on a single offset.
    const unified =
      nearEdge ||
      nationalOffset === WASTELAND ||
      nationalOffset === ARCHAIC ||
      window.dice.random > 0.8

    NATION.provinces(nation).forEach(province => {
      province.timezone = {
        offset: unified ? nationalOffset : Math.round(offsetByLon(PROVINCE.hub(province).x)),
        singular: unified
      }
    })
  })
}

export const TIMEZONE_SHAPER = PERFORMANCE.profile.wrapper({
  label: 'TIMEZONE_SHAPER',
  ignore: ['convert'],
  o: {
    build: () => {
      assignProvinceTimezones()
    },
    convert: offsetByLon,
    zones: { wasteland: WASTELAND, archaic: ARCHAIC },
    colors: [
      // '#CAD18B',
      // '#E6CA8D',
      // '#E2A881',
      // '#A3B8BA',
      // '#B58DB0',
      // '#8CB5A1',
      // '#8FA8D3',
      // '#D18F9D',
      // '#9CCF9B',
      // '#D3B28F',
      // '#C39ACF',
      // '#89C1B3',
      // '#DC8FC3'
      '#e8d4c2',
      '#e5b7d6'
    ]
  }
})
