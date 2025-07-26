import { Province } from '../../provinces/types'

export type War = {
  idx: number
  losses: string
  belligerents: string
  reasons: { tag: string; text: string }[]
  provinces: number[]
  status: 'decisive' | 'stalemated' | 'struggling'
  invader: number
}

export type SpawnWarParams = {
  attacker: Province
  defender: Province
}
