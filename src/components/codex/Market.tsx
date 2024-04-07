import { css } from '@emotion/css'
import { Grid, IconButton } from '@mui/material'
import { ArrowDownBold, ArrowUpBold, Sack } from 'mdi-material-ui'

import { decorateItem, itemPrice, localMarket } from '../../models/actors/equipment'
import { Item } from '../../models/actors/equipment/types'
import { Actor } from '../../models/actors/types'
import { DataTable } from '../common/DataTable'
import { ToggleButtons } from '../common/navigation/ToggleButtons'
import { StyledText } from '../common/text/styled'
import { VIEW } from '../context'

const style__disabled = css`
  background-color: #cecece !important;
`

const validItem = (params: { item: Item; npc: Actor }) => {
  const { item, npc } = params
  return npc.equipment.find(equipped => equipped.slot === item.slot && equipped.name === item.name)
}

export function MarketView() {
  const { state, dispatch } = VIEW.context()
  const loc = window.world.provinces[state.loc.province]
  const goods = localMarket({ loc, avatar: state.avatar }).sort((a, b) => b.tier - a.tier)
  const heroes = state.avatar.pcs.map(i => window.world.actors[i])
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
                text: `Cost (${state.avatar.cp.toFixed(0)} cp)`,
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
                    <Grid container alignContent='center'>
                      <IconButton
                        color='primary'
                        disabled={disabled}
                        onClick={() => dispatch({ type: 'purchase', payload: { item, npc: hero } })}
                      >
                        <Sack></Sack>
                      </IconButton>
                      <IconButton
                        color={upgrade ? 'success' : 'error'}
                        disableRipple
                        disabled={disabled}
                        style={{ cursor: 'default' }}
                      >
                        {upgrade ? <ArrowUpBold></ArrowUpBold> : <ArrowDownBold></ArrowDownBold>}
                      </IconButton>
                    </Grid>
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
