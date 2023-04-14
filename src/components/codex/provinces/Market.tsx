import { css } from '@emotion/css'
import { IconButton } from '@mui/material'
import { ArrowDownBold, ArrowUpBold, Sack } from 'mdi-material-ui'

import { decorateItem, itemPrice, localMarket } from '../../../models/npcs/equipment'
import { Item } from '../../../models/npcs/equipment/types'
import { NPC } from '../../../models/npcs/types'
import { view__context } from '../../context'
import { DataTable } from '../common/DataTable'
import { ToggleButtons } from '../common/navigation/ToggleButtons'
import { StyledText } from '../common/text/StyledText'

const style__disabled = css`
  background-color: #cecece !important;
`

const validItem = (params: { item: Item; npc: NPC }) => {
  const { item, npc } = params
  return npc.equipment.find(equipped => equipped.slot === item.slot && equipped.name === item.name)
}

export function MarketView() {
  const { state, dispatch } = view__context()
  const loc = window.world.provinces[state.codex.province]
  const goods = localMarket({ loc, avatar: state.avatar }).sort((a, b) => b.tier - a.tier)
  const heroes = state.avatar.pcs.map(i => window.world.npcs[i])
  return (
    <ToggleButtons
      selection={heroes.map(hero => hero.name)}
      content={(_, i) => {
        const hero = heroes[i]
        return (
          <DataTable
            rowStyles={item => (validItem({ item, npc: hero }) ? undefined : style__disabled)}
            headers={[
              {
                text: 'Item',
                align: 'left',
                value: item => <StyledText text={decorateItem(item)}></StyledText>
              },
              {
                text: `Cost`,
                align: 'left',
                value: item => `${itemPrice(item)} cp`
              },
              {
                text: `Purchase`,
                align: 'left',
                value: item => {
                  const old = validItem({ item, npc: hero })
                  const upgrade = old?.tier < item.tier
                  const disabled =
                    !validItem({ item, npc: hero }) || state.avatar.cp < itemPrice(item)
                  return (
                    <span>
                      <IconButton
                        color='primary'
                        disabled={disabled}
                        onClick={() => dispatch({ type: 'purchase', payload: { item, npc: hero } })}
                      >
                        <Sack></Sack>
                      </IconButton>
                      <IconButton color={upgrade ? 'success' : 'error'} disabled={disabled}>
                        {upgrade ? <ArrowUpBold></ArrowUpBold> : <ArrowDownBold></ArrowDownBold>}
                      </IconButton>
                    </span>
                  )
                }
              }
            ]}
            data={goods}
          ></DataTable>
        )
      }}
    ></ToggleButtons>
  )
}
