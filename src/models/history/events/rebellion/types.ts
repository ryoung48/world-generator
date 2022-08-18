import { Region } from '../../../regions/types'
import { EventRecord, MajorEvent, WorldEvent } from '../../types'
import { WarActorRecord, WarEvent } from '../war/types'

export interface RebelBehavior {
  background: (_region: Region) => string
  goals: (_params: { rebellion: Rebellion }) => void
}

export interface RebellionRecord extends EventRecord {
  odds: number
  victory: boolean
  attacker: rebel__actors
  provinces: number[]
}

interface RebellionActor {
  idx: number // region
  allies: WarActorRecord['allies'] // allied nations
}

export interface Rebellion extends MajorEvent {
  type: 'rebellion'
  // the cause of the rebellion
  background: {
    type:
      | 'anarchism'
      | 'aristocratic'
      | 'arcanists'
      | 'dynastic'
      | 'ideology'
      | 'interregnum'
      | 'praetorian'
      | 'schism'
      | 'separatists'
      | 'peasants'
      | 'unification'
    text: string
  }
  // the result of the rebellion
  // blank if the rebellion is ongoing
  result?: string
  // actors
  rebels: RebellionActor
  loyalists: RebellionActor
  // battles
  events: RebellionRecord[]
  nextBattle: { province: number; attacker: rebel__actors; odds: number }
  rebelProvinces: number[]
}

export type rebel__actors = 'rebels' | 'loyalists'

export interface RebellionEvent extends WorldEvent {
  idx: number
  type: 'rebellion'
  title: string
  odds: number // victory odds of the rebels
  battles: WarEvent['battles']
  lastBattle: number
}
