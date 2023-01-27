import { Province } from '../provinces/types'

type District =
  | 'noble district'
  | 'merchant district'
  | 'craftsman district'
  | 'docks'
  | 'slums'
  | 'rural'
  | 'outskirts'
  | 'wilderness'

export type Loc = {
  district: District
  site: (_params: { loc: Province }) => string
}
