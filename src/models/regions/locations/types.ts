import { location__icons } from '../../../components/maps/icons/locations'
import { ThreadedEntity } from '../../threads/types'
import { TaggedEntity } from '../../utilities/codex/entities'
import { Point } from '../../utilities/math/points'
import { TraitEnriched } from '../../utilities/traits/types'
import { Terrain } from '../../world/climate/terrain'
import { BasicClimate } from '../../world/climate/types'
import { WeatherIcons } from '../../world/climate/weather/types'
import { location__tag } from './spawn/traits/types'

type Weather = {
  conditions: string
  heat: { degrees: number; desc: string }
  clouds: string
  icon: WeatherIcons
  wind: {
    speed: number
    desc: string
  }
}

type Conditions = {
  season: string
  rainChance: number
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
    nextDay: boolean
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
  _terrain?: Terrain
  _climate?: BasicClimate
  // map (settlements only for the moment)
  _icon?: keyof typeof location__icons
}
