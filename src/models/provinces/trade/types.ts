import { Cell } from '../../cells/types'

export type TradeGood =
  | 'alum'
  | 'amber'
  | 'beeswax'
  | 'clay'
  | 'coal'
  | 'cocoa'
  | 'coffee'
  | 'copper'
  | 'cotton'
  | 'dyes'
  | 'elephants'
  | 'fiber crops'
  | 'fish'
  | 'fruit'
  | 'fur'
  | 'gems'
  | 'gold'
  | 'horses'
  | 'incense'
  | 'iron'
  | 'ivory'
  | 'lead'
  | 'legumes'
  | 'livestock'
  | 'lumber'
  | 'maize'
  | 'marble'
  | 'medicaments'
  | 'mercury'
  | 'olives'
  | 'pearls'
  | 'potato'
  | 'rice'
  | 'salt'
  | 'saltpeter'
  | 'sand'
  | 'silk'
  | 'silver'
  | 'spices'
  | 'stone'
  | 'sturdy grains'
  | 'sugar'
  | 'tea'
  | 'tin'
  | 'tobacco'
  | 'wheat'
  | 'wild game'
  | 'wine'
  | 'wool'
  | 'beer'
  | 'books'
  | 'artillery'
  | 'cloth'
  | 'fine cloth'
  | 'firearms'
  | 'furniture'
  | 'glass'
  | 'jewelry'
  | 'lacquerware'
  | 'leather'
  | 'liquor'
  | 'masonry'
  | 'naval supplies'
  | 'paper'
  | 'porcelain'
  | 'pottery'
  | 'slaves'
  | 'steel'
  | 'tar'
  | 'tools'
  | 'weaponry'

export type SpawnConditions = {
  vegetation?: Cell['vegetation'][]
  topography?: Cell['topography'][]
  climate?: Cell['climate'][]
  coastal?: boolean
  advanced?: boolean
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
