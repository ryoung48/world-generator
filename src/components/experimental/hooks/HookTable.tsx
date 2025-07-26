import { Grid } from '@mui/material'
import { range } from 'd3'

import { HOOK } from '../../../models/hooks'
import { ARRAY } from '../../../models/utilities/array'
import { DataTable } from '../../common/DataTable'
import { StyledText } from '../../common/text/styled'

const itemsPerPage = 10

export function HookTable() {
  const hooks = range(itemsPerPage).map(i => ({ ...HOOK.gen(), idx: i + 1 }))
  return (
    <DataTable
      data={hooks}
      headers={[
        {
          text: 'id',
          value: item => `#${item.idx}`
        },
        {
          text: 'climate',
          value: item => `${item.terrain.climate} ${item.terrain.terrain}`
        },
        {
          text: 'hooks',
          value: item => {
            const hooks = ARRAY.unique(item.tags.map(tag => tag.type)).join(', ')
            return <StyledText text={hooks}></StyledText>
          }
        }
      ]}
      rowsPerPage={itemsPerPage}
      expand={{
        content: ({ tags }) => {
          return (
            <Grid container>
              {tags.map(({ tag, text, complication, type }, i) => (
                <Grid item key={i} xs={12}>
                  <b>{tag} </b>
                  <i>
                    (<StyledText text={type}></StyledText>):
                  </i>{' '}
                  {<StyledText text={text}></StyledText>}{' '}
                  <i>
                    <StyledText text={complication}></StyledText>.
                  </i>
                </Grid>
              ))}
              <Grid item alignContent='start' xs={12} mt={1}>
                <b>Friends</b>:{' '}
                <StyledText text={tags.map(hook => hook.friend).join(', ')}></StyledText>
              </Grid>
              <Grid item alignContent='start' xs={12}>
                <b>Enemies</b>:{' '}
                <StyledText text={tags.map(hook => hook.enemy).join(', ')}></StyledText>
              </Grid>
              <Grid item alignContent='start' xs={12}>
                <b>Things</b>:{' '}
                <StyledText text={tags.map(hook => hook.thing).join(', ')}></StyledText>
              </Grid>
              <Grid item alignContent='start' xs={12}>
                <b>Places</b>:{' '}
                <StyledText text={tags.map(hook => hook.place).join(', ')}></StyledText>
              </Grid>
            </Grid>
          )
        },
        idx: item => item.idx
      }}
    ></DataTable>
  )
}
