import { diplomatic_relation } from '../history/events/diplomacy/types'
import { trade_good } from '../items/economy'
import { TaggedEntity } from '../utilities/codex/entities'
import { directions } from '../utilities/math/points'
import { climates } from '../world/climate/types'
import { development_rank } from './development'

export interface Region extends TaggedEntity {
  tag: 'nation'
  colors: string
  capital?: number
  ruler?: { birth_date: number; succession_date: number; expiration_date: number; culture: number }
  side: directions
  edge: directions
  borders_changed: boolean
  regional: {
    provinces?: number[]
    land?: number
    mountains?: number
    coastal?: boolean
  }
  // ecology
  beasts: Record<string, number[]>
  primordials: Record<string, number[]>
  // cultural traits
  culture: { ruling: number; native: number }
  // weather
  climate?: climates
  coastal: boolean
  // geographic borders (regions)
  borders: number[]
  land_borders: number[]
  // relational contacts
  colonial_presence: {
    colonies: {
      nation: number
      tag: 'trading company' | 'colonial settlers'
      type: 'overlord' | 'colony'
    }[]
    embassy: number
  }
  relations: Record<number, diplomatic_relation>
  allies: Record<number, number>
  subjects: number[]
  overlord: {
    idx: number
    join_date: number
  }
  // society
  immigration: Record<number, number>
  emigration: Record<number, number>
  development?: development_rank
  civilized?: boolean
  imperial_title?: string
  economy?: {
    status: 'struggling' | 'healthy' | 'prosperous'
    management: 'market' | 'mixed' | 'planned' | 'barter'
    trade: 'free' | 'protectionism'
  }
  government?: {
    structure: 'autocratic' | 'republic' | 'oligarchic' | 'confederation' | 'autonomous'
    succession: 'hereditary' | 'elected'
    entry: 'merit' | 'hereditary' | 'wealth' | 'eunuchs' | 'assigned'
  }
  law?: {
    rule_of_law: 'ubiquitous' | 'selective' | 'none'
    accountability: 'judicial' | 'top-down' | 'informal'
    magic: 'banned' | 'restricted' | 'unrestricted'
  }
  religion?: {
    authority: 'protest' | 'theocratic' | 'aristocratic' | 'independent'
    tolerance: 'traditional' | 'selective' | 'cosmopolitan'
    state: number
    native: number
  }
  military?: (
    | 'slave army'
    | 'centralized draft'
    | 'regional draft'
    | 'tribal militias'
    | 'mercenaries'
    | 'aristocratic mounted'
  )[]
  // history
  past: number[]
  wealth: number
  max_wealth: number
  wars: { current: number[]; past: number[] } // national
  rebellions: { current: number; past: number[] } // regional
  memory: {
    rebel_fatigue: number // cooldown until next rebellion can happen
    plague_fatigue: number // cooldown until next plague can happen
    last_update: number // time in ms
    trade_demand: number // economic demand (price flux)
    faction_spawns: number // time until next faction spawns
    finalize_check: number
    population_check: number
  }
  // owned provinces
  provinces: number[]
  regions: number[] // regional capitals

  // economy
  trade_demand: Partial<Record<trade_good, number>>
}
