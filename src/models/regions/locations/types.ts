import { location__icons } from '../../../components/maps/icons/locations'
import { ThreadedEntity } from '../../threads/types'
import { TaggedEntity } from '../../utilities/codex/entities'
import { Point } from '../../utilities/math/points'
import { TraitEnriched } from '../../utilities/traits/types'
import { terrain_types } from '../../world/climate/terrain'
import { basic_climates } from '../../world/climate/types'
import { weather_icons } from '../../world/climate/weather/types'
import { District } from './spawn/blueprints/districts/types'
import { location__tag } from './spawn/traits/types'

type Weather = {
  conditions: string
  heat: { degrees: number; desc: string }
  clouds: string
  icon: weather_icons
  wind: {
    speed: number
    desc: string
  }
}

type Conditions = {
  season: string
  rain_chance: number
  day: Weather
  night: Weather
  sun: {
    hours: number
    rise: number
    set: number
  }
  moon: {
    phase: string
    rise: number
    set: number
    hours: number
    next_day: boolean
    icon:
      | 'new'
      | 'waxing-crescent'
      | 'first-quarter'
      | 'waxing-gibbous'
      | 'full'
      | 'waning-gibbous'
      | 'last-quarter'
      | 'waning-crescent'
  }
}

export interface Loc extends Point, TaggedEntity, ThreadedEntity, TraitEnriched<location__tag> {
  tag: 'location'
  type:
    | 'metropolis'
    | 'huge city'
    | 'large city'
    | 'small city'
    | 'large town'
    | 'small town'
    | 'large village'
    | 'small village'
    | 'tiny village'
    | 'cave'
    | 'keep'
    | 'crypt'
    | `temple`
    | 'ruins'
    | 'camp'
    | 'portal'
    | 'shrine'
    | 'mine'
    | 'farm'
    | 'inn'
    | 'laboratory'
    | 'battlefield'
    | 'shipwreck'
    | 'sacred grove'
    | 'lighthouse'
    | 'watchtower'
  subtype?: string
  hostile?: boolean
  memory: { weather: number; threads: number; demographics?: number }
  population?: number
  actors: number[]
  finalized?: boolean
  // world location (quick access)
  region: number
  province: number
  cell: number
  // geography
  hub?: boolean
  coastal: boolean
  _weather?: Conditions
  _terrain?: terrain_types
  _climate?: basic_climates
  // map (settlements only for the moment)
  _icon?: keyof typeof location__icons
  map?: { seed?: string; density: number; districts: Record<number, District> }
}
