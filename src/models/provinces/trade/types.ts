import { Cell } from '../../cells/types'

export type TradeGood =
  | 'wild game'
  | 'fish'
  | 'wheat'
  | 'soybeans'
  | 'maize'
  | 'rice'
  | 'sturdy grains'
  | 'legumes'
  | 'potato'
  | 'livestock'
  | 'olives'
  | 'dates'
  | 'fruit'
  | 'cotton'
  | 'sugar'
  | 'tobacco'
  | 'horses'
  | 'clay'
  | 'sand'
  | 'coal'
  | 'iron'
  | 'copper'
  | 'gold'
  | 'silver'
  | 'stone'
  | 'tin'
  | 'lead'
  | 'silk'
  | 'dyes'
  | 'incense'
  | 'tea'
  | 'cocoa'
  | 'coffee'
  | 'fiber crops'
  | 'ivory'
  | 'fur'
  | 'lumber'
  | 'salt'
  | 'medicaments'
  | 'gems'
  | 'pearls'
  | 'amber'
  | 'saltpeter'
  | 'alum'
  | 'spices'
  | 'wine'
  | 'elephants'
  | 'marble'
  | 'wool'
  | 'mercury'

export type SpawnConditions = {
  vegetation?: Cell['vegetation'][]
  topography?: Cell['topography'][]
  climate?: Cell['climate'][]
  coastal?: boolean
}

export type TradeGoods = Record<
  TradeGood,
  {
    w: number
    color: string
    tinto?: string
    conditions?: (_params: SpawnConditions) => boolean
  }
>
