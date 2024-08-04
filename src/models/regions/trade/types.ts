import { Trait } from '../../utilities/traits/types'

export type TradeGoods = Record<
  string,
  Trait<
    string,
    {
      urban?: boolean
      arctic?: boolean
      tropical?: boolean
      forest?: boolean
      plains?: boolean
      desert?: boolean
      mountains?: boolean
      coastal?: boolean
      human?: boolean
    }
  > & { text: string }
>
