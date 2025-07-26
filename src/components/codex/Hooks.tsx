import { Divider, Grid } from '@mui/material'
import { Fragment } from 'react'

import { HOOK } from '../../models/hooks'
import { HUB } from '../../models/provinces/hubs'
import { Hub } from '../../models/provinces/hubs/type'
import { StyledText } from '../common/text/styled'

export function HookView({ site }: { site: Hub }) {
  const { tags, type } = HOOK.spawn(HUB.province(site))
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} my={1}>
          <Divider sx={{ fontSize: 10 }}>Hooks ({type})</Divider>
        </Grid>
        {tags.map(({ tag, text, complication }, i) => (
          <Grid item key={i} xs={12}>
            <b>{tag}: </b>
            {<StyledText text={text}></StyledText>}{' '}
            <i>
              <StyledText text={complication}></StyledText>.
            </i>
          </Grid>
        ))}
        <Grid item alignContent='start' xs={12} mt={1}>
          <b>Friends</b>: <StyledText text={tags.map(hook => hook.friend).join(', ')}></StyledText>
        </Grid>
        <Grid item alignContent='start' xs={12}>
          <b>Enemies</b>: <StyledText text={tags.map(hook => hook.enemy).join(', ')}></StyledText>
        </Grid>
        <Grid item alignContent='start' xs={12}>
          <b>Things</b>: <StyledText text={tags.map(hook => hook.thing).join(', ')}></StyledText>
        </Grid>
        <Grid item alignContent='start' xs={12}>
          <b>Places</b>: <StyledText text={tags.map(hook => hook.place).join(', ')}></StyledText>
        </Grid>
      </Grid>
    </Fragment>
  )
}
