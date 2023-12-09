import { capitalize, Grid } from '@mui/material'

import { HOOK } from '../../../models/regions/provinces/hooks'
import { Province } from '../../../models/regions/provinces/types'
import { Region } from '../../../models/regions/types'
import { DIFFICULTY } from '../../../models/utilities/difficulty'
import { VIEW } from '../../context'
import { StyledText } from '../common/text/StyledText'

export function HooksView({ entity }: { entity: Province | Region }) {
  const { state } = VIEW.context()
  const hooks = HOOK.spawn({ entity, pc: DIFFICULTY.avatar.cr(state.avatar) })
  hooks.tags.forEach(hook => HOOK.elements({ entity, hook }))
  return (
    <Grid container sx={{ fontSize: 12, lineHeight: 1.5 }}>
      <Grid item xs={12}>
        <b>Introduction: </b>
        {entity.hooks.mission.intro}
      </Grid>
      <Grid item xs={12} mb={1}>
        <b>Mission: </b>
        {entity.hooks.mission.text}. <i>{entity.hooks.mission.complication}.</i>
      </Grid>
      {hooks.tags.map(({ tag, text, complication, type, decorated }, i) => (
        <Grid item key={i} xs={12}>
          <b>{tag}:</b>{' '}
          <i>{decorated ? <StyledText text={decorated}></StyledText> : capitalize(type)}.</i>{' '}
          {<StyledText text={text}></StyledText>}{' '}
          <i>
            <StyledText text={complication}></StyledText>.
          </i>
        </Grid>
      ))}
      <Grid item alignContent='start' xs={12} mt={1}>
        <b>Friends</b>:{' '}
        <StyledText text={hooks.tags.map(hook => hook.friend).join(', ')}></StyledText>
        {'; '}
        <b>Enemies</b>:{' '}
        <StyledText text={hooks.tags.map(hook => hook.enemy).join(', ')}></StyledText>
      </Grid>
      <Grid item alignContent='start' xs={12}>
        <b>Things</b>:{' '}
        <StyledText text={hooks.tags.map(hook => hook.thing).join(', ')}></StyledText>
      </Grid>
      <Grid item alignContent='start' xs={12}>
        <b>Places</b>:{' '}
        <StyledText text={hooks.tags.map(hook => hook.place).join(', ')}></StyledText>
      </Grid>
    </Grid>
  )
}
