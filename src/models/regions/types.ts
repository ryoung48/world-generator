import { DiplomaticRelation } from '../history/diplomacy/types'
import { TradeGood } from '../items/economy'
import { TaggedEntity } from '../utilities/codex/entities'
import { directions } from '../utilities/math/points'
import { Climate } from '../world/climate/types'
import { DevelopmentRank } from './development'

export interface Region extends TaggedEntity {
  tag: 'nation'
  colors: string
  capital?: number
  ruler?: number
  side: directions
  edge: directions
  bordersChanged: boolean
  regional: {
    provinces?: number[]
    land?: number
    mountains?: number
    coastal?: boolean
  }
  // cultural traits
  culture: { ruling: number; native: number }
  // weather
  climate?: Climate['type']
  coastal: boolean
  // geographic borders (regions)
  borders: number[]
  landBorders: number[]
  // relational contacts
  colonialPresence: {
    colonies: {
      nation: number
      tag: 'trading company' | 'colonial settlers'
      type: 'overlord' | 'colony'
    }[]
    embassy: number
  }
  relations: Record<number, DiplomaticRelation>
  allies: Record<number, number>
  subjects: number[]
  overlord: {
    idx: number
    joinDate: number
  }
  // society
  development?: DevelopmentRank
  civilized?: boolean
  imperialTitle?: string
  government?: {
    structure: 'autocratic' | 'theocratic' | 'oligarchic' | 'confederation' | 'anarchic'
    succession?: 'hereditary' | 'elected'
  }
  religion?: {
    state: number
    native: number
  }
  // history
  past: number[]
  wealth: number
  maxWealth: number
  wars: { current: number[]; past: number[] } // national
  rebellions: { current: number; past: number[] } // regional
  memory: {
    rebelFatigue: number // cooldown until next rebellion can happen
    plagueFatigue: number // cooldown until next plague can happen
    lastUpdate: number // time in ms
    tradeDemand: number // economic demand (price flux)
    populationCheck: number
  }
  // owned provinces
  provinces: number[]
  regions: number[] // regional capitals

  // economy
  tradeDemand: Partial<Record<TradeGood, number>>
}
