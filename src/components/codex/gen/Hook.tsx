import { Divider, Grid } from '@mui/material'
import { Fragment } from 'react'

import { HOOK } from '../../../models/hooks'
import { Hub } from '../../../models/regions/places/hub/types'
import { TEXT } from '../../../models/utilities/text'
import { StyledText } from '../../common/text/styled'

export function HookView(props: { hub: Hub }) {
  const hook = HOOK.get(props.hub)
  const tags = HOOK.tags(props.hub)
  const subtype = hook.type === 'religions' || hook.type === 'war' || hook.type === 'community'
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} my={1}>
          <Divider style={{ fontSize: 10 }}>
            Quest:{' '}
            {subtype ? (
              TEXT.capitalize(hook.type)
            ) : (
              <StyledText
                text={TEXT.decorate({
                  label: TEXT.capitalize(hook.type),
                  tooltip: hook.subtype
                })}
              ></StyledText>
            )}
          </Divider>
        </Grid>
        <Grid item xs={12}>
          <b>Introduction: </b>
          {hook.introduction}.
        </Grid>
        <Grid item xs={12} mb={1}>
          <b>Mission: </b>
          <i>{TEXT.capitalize(hook.mission.tag)}.</i> {hook.mission.complication}.
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
