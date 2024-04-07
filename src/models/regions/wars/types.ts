import { Region } from '../types'

export type War = {
  idx: number
  losses: string
  belligerents: string
  reasons: { tag: string; text: string }[]
  provinces: number[]
  status: 'decisive' | 'stalemated' | 'struggling'
}

export type SpawnWarParams = {
  attacker: Region
  defender: Region
}
