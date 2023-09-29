import { Grid } from '@mui/material'

import { decorateText } from '../../../models/utilities/text/decoration'
import { VIEW } from '../../context'
import { DataTable, DetailedTableRow } from '../common/DataTable'
import { StyledText } from '../common/text/StyledText'

export function ProvinceElements() {
  const { state } = VIEW.context()
  const loc = window.world.provinces[state.province]
  const { locals, locs } = loc.hub.traits
  return (
    <Grid container justifyContent={'space-around'}>
      <Grid item xs={4}>
        <DataTable
          data={locals}
          headers={[
            {
              text: `d${locals.length}`,
              align: 'left',
              value: item => locals.findIndex(local => local === item) + 1
            },
            {
              text: `Important Locals`,
              align: 'left',
              value: item => {
                const npc = window.world.npcs[item]
                return (
                  <DetailedTableRow
                    title={<StyledText text={decorateText({ link: npc })}></StyledText>}
                    subtitle={npc.profession.title}
                  ></DetailedTableRow>
                )
              }
            }
          ]}
        ></DataTable>
      </Grid>
      <Grid item xs={7}>
        <DataTable
          data={locs}
          headers={[
            {
              text: `d${locs.length}`,
              align: 'left',
              value: item => locs.findIndex(local => local === item) + 1
            },
            {
              text: `Points of Interest`,
              align: 'left',
              value: item => {
                return (
                  <DetailedTableRow
                    title={item.text}
                    subtitle={<StyledText text={item.setting}></StyledText>}
                  ></DetailedTableRow>
                )
              }
            }
          ]}
        ></DataTable>
      </Grid>
    </Grid>
  )
}
