import { EventRecord, MajorEvent, WorldEvent } from '../../types'
import { Battle, NextBattle } from './battles/types'

interface AllyRecord {
  idx: number // region index
  relation: string // relation type
  neutral?: boolean // is this nation neutral in this engagement?
}

export interface WarActorRecord {
  idx: number // region index
  allies: AllyRecord[] // allies of this actor
  pop: number // pop at the time of the war's start (used for troop conscription)
  wealthPercent: number // wealth % at war's start
  wealth: number // wealth at war's start
}

export interface WarRecord extends EventRecord {
  odds: number // odds that the attacker will win the battle
  attacker: number // region index
  cost: string // cost of the battle
  victory: boolean // did the attacker win?
  provinces: number[]
}

export interface War extends MajorEvent {
  type: 'war'
  invader: WarActorRecord
  defender: WarActorRecord
  background: {
    type:
      | 'allies'
      | 'betrayal'
      | 'borders'
      | 'conquest'
      | 'dynastic'
      | 'excommunication'
      | 'ideology'
      | 'jihad'
      | 'liberation'
      | 'raiders'
      | 'reclamation'
      | 'trade'
      | 'vengeance'
    text: string
  } // cause of the war
  result?: string
  events: WarRecord[] // battles
  nextBattle: NextBattle
}

export interface WarEvent extends WorldEvent {
  type: 'war'
  title: string
  idx: number
  vassalize: boolean
  invader: number
  defender: number
  ownedProvinces: {
    invader: number[]
    defender: number[]
  }
  battles: Record<string, Battle>
  startingWealth: number // for invader morale
}
