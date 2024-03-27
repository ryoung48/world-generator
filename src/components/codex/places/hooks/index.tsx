import { Divider, Grid } from '@mui/material'
import { Fragment } from 'react'

import { StyledText } from '../../common/text/styled'
import { HookViewParams } from './types'

export function HooksView({ hooks }: HookViewParams) {
  return (
    <Fragment>
      <Grid item xs={12} my={1}>
        <Divider style={{ fontSize: 10 }}>Hooks</Divider>
      </Grid>
      {hooks.map(({ tag, text, complication }, i) => (
        <Grid item key={i} xs={12}>
          <b>{tag}:</b> {<StyledText text={text}></StyledText>}{' '}
          <i>
            <StyledText text={complication}></StyledText>.
          </i>
        </Grid>
      ))}
      <Grid item xs={12} my={1}>
        <Divider style={{ fontSize: 10 }}>Quest</Divider>
      </Grid>
      <Grid item xs={12}>
        <b>Friends:</b>{' '}
        <StyledText text={hooks.map(({ friend }) => friend).join(', ') ?? ''}></StyledText>
      </Grid>
      <Grid item xs={12}>
        <b>Enemies:</b>{' '}
        <StyledText text={hooks.map(({ enemy }) => enemy).join(', ') ?? ''}></StyledText>
      </Grid>
      <Grid item xs={12}>
        <b>Things:</b>{' '}
        <StyledText text={hooks.map(({ thing }) => thing).join(', ') ?? ''}></StyledText>
      </Grid>
      <Grid item xs={12}>
        <b>Places:</b>{' '}
        <StyledText text={hooks.map(({ place }) => place).join(', ') ?? ''}></StyledText>
      </Grid>
    </Fragment>
  )
}
