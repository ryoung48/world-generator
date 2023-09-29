import { Province } from '../types'

type District =
  | 'noble district'
  | 'merchant district'
  | 'craftsman district'
  | 'docks'
  | 'slums'
  | 'rural'
  | 'tribal'
  | 'outskirts'
  | 'wilderness'

export type Loc = {
  district: District
  site: (_params: { loc: Province }) => string
}
