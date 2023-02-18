import { Grid } from '@mui/material'

import { background__spawn } from '../../../models/threads/backgrounds'
import { titleCase } from '../../../models/utilities/text'
import { view__context } from '../../context'
import { DataTable, DetailedTableRow } from '../common/DataTable'
import { StyledText } from '../common/text/StyledText'
import { thread__icons } from './threads/styles'

export function BackgroundsView() {
  const { state } = view__context()
  const province = window.world.provinces[state.codex.province]
  if (!province.hooks) background__spawn(province)
  return (
    <DataTable
      data={province.hooks}
      headers={[
        {
          text: '',
          value: () => {
            const { Icon, color } = thread__icons['in progress']
            return <Icon style={{ color }} />
          }
        },
        {
          text: '',
          value: item => (
            <DetailedTableRow
              title={titleCase(item.type)}
              subtitle='placeholder'
            ></DetailedTableRow>
          )
        }
      ]}
      expand={{
        content: item => {
          return (
            <Grid container>
              {item.background.map(background => {
                return (
                  <Grid item xs={12} mt={1} key={background.tag}>
                    <b>{titleCase(background.tag)}:</b>
                    {` ${background.context}`}
                  </Grid>
                )
              })}
              <Grid item xs={12} mt={1}>
                <StyledText text={item.goal}></StyledText>
              </Grid>
            </Grid>
          )
        }
      }}
    ></DataTable>
  )
}
