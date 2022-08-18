import { Grid } from '@mui/material'

import { province__markets } from '../../../../models/regions/provinces/networks/trade_goods'
import { scarcity } from '../../../../models/utilities/quality'
import { properList, titleCase } from '../../../../models/utilities/text'
import { formatters } from '../../../../models/utilities/text/formatters'
import { view__context } from '../../../context'
import { DataTable } from '../../common/DataTable'
import { SectionList } from '../../common/text/SectionList'

const rarity = (value: number): keyof typeof scarcity => {
  if (value < 0) return 'abundant'
  else if (value < 0.2) return 'common'
  else if (value < 0.5) return 'uncommon'
  else if (value < 1) return 'rare'
  return 'exceptional'
}

const demand = (value: number) => {
  if (value < 0) return 'Surplus'
  else if (value < 0.2) return 'Normal'
  else if (value < 0.35) return 'Popular'
  else if (value < 0.5) return 'Needed'
  return 'Desperate'
}

export function MarketsView() {
  const { state } = view__context()
  const location = window.world.locations[state.codex.location]
  const province = window.world.provinces[location.province]
  const tradeGoods = province__markets(province)
  const exports = Object.entries(tradeGoods)
    .filter(([_, v]) => v.supply)
    .sort((a, b) => b[1].supply - a[1].supply)
    .map(([k], i) => (i === 0 ? k : k.toLowerCase()))
  const imports = Object.entries(tradeGoods)
    .filter(([_, v]) => !v.supply)
    .sort((a, b) => b[1].demand - a[1].demand)
    .slice(0, 5)
    .map(([k], i) => (i === 0 ? k : k.toLowerCase()))
  const items = Object.entries(tradeGoods).map(([k, v]) => {
    const price = v.rarity + v.demand
    return {
      name: `${k}${v.supply > 0 ? '**' : ''}`,
      rarity: v.rarity,
      demand: v.demand,
      price
    }
  })
  return (
    <Grid container>
      <Grid item xs={12}>
        <SectionList
          list={[
            { label: 'Imports', content: properList(imports, 'and') },
            { label: 'Exports', content: properList(exports, 'and') }
          ]}
        ></SectionList>
      </Grid>
      <Grid item xs={12} mt={3}>
        <DataTable
          data={items}
          headers={[
            { text: 'Trade Good', value: 'name' },
            {
              text: 'Supply',
              value: item => {
                return (
                  <Grid container p='3px'>
                    {`${formatters.percent({ value: item.rarity })} (${titleCase(
                      rarity(item.rarity)
                    )})`}
                  </Grid>
                )
              }
            },
            {
              text: 'Demand',
              value: item =>
                `${formatters.percent({ value: item.demand })} (${demand(item.demand)})`
            },
            {
              text: 'Price',
              value: item => formatters.percent({ value: item.price })
            }
          ]}
        ></DataTable>
      </Grid>
    </Grid>
  )
}
