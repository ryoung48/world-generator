import { capitalize, Grid } from '@mui/material'

import { hook__elements, hook__spawn } from '../../../models/regions/provinces/hooks'
import { Province } from '../../../models/regions/provinces/types'
import { DIFFICULTY } from '../../../models/utilities/difficulty'
import { VIEW } from '../../context'
import { StyledText } from '../common/text/StyledText'

export function HooksView({ province }: { province: Province }) {
  const { state } = VIEW.context()
  const hooks = hook__spawn({ loc: province, pc: DIFFICULTY.avatar.cr(state.avatar) })
  hooks.tags.forEach(hook => hook__elements({ province, hook }))
  return (
    <Grid container sx={{ fontSize: 12, lineHeight: 1.5 }}>
      <Grid item xs={12}>
        <b>Introduction: </b>
        {province.hooks.mission.intro}
      </Grid>
      <Grid item xs={12} mb={1}>
        <b>Mission: </b>
        {province.hooks.mission.text}. <i>{province.hooks.mission.complication}.</i>
      </Grid>
      {hooks.tags.map(({ tag, text, complication, type }, i) => (
        <Grid item key={i} xs={12}>
          <b>{tag}:</b> <i>{capitalize(type)}.</i> {<StyledText text={text}></StyledText>}{' '}
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
