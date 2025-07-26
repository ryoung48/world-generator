import { TradeGood } from '../../provinces/trade/types'
import { Cell } from '../types'

export type Loc = {
  idx: number
  cells: number[]
  neighbors: number[]
  province: number
  resource?: TradeGood
  corruption?: boolean
  topography?: Cell['topography']
  volcanic?: boolean
}
