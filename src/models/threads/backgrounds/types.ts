import { Province } from '../../regions/provinces/types'

export interface Actor {
  title: string
  monstrous?: boolean
  foreign?: boolean
  elder?: boolean
  veteran?: boolean
  youth?: boolean
  child?: boolean
}

export interface Hook {
  hooks: Record<
    string,
    {
      text: string
      enemies: Actor[]
      friends: Actor[]
      complications: string
      things: string
      places: string
      constraints?: { urban?: boolean }
    }
  >
  subtype: (_params: { loc: Province }) => string
}
