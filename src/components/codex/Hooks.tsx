import { Divider, Grid } from '@mui/material'
import { Fragment } from 'react'

import { HOOK } from '../../models/hooks'
import { Hub } from '../../models/regions/sites/hubs/types'
import { Wilderness } from '../../models/regions/sites/wilderness/types'
import { StyledText } from '../common/text/styled'

export function HookView({ site }: { site: Hub | Wilderness }) {
  if (!site.tags) {
    site.tags = HOOK.spawn({
      place: site,
      samples: 2,
      type: site.type === 'hub' ? 'community' : site.type
    })
  }
  const { tags } = site
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} my={1}>
          <Divider sx={{ fontSize: 10 }}>Hooks</Divider>
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
