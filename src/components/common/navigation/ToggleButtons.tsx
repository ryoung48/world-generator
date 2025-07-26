import { css } from '@emotion/css'
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { ReactNode, SyntheticEvent, useState } from 'react'

const classes = {
  tabs: css`
    margin-bottom: 5px;
    margin-top: 5px;
  `
}

export function ToggleButtons<T extends string>(props: {
  selection: T[]
  content: (_selected: T, _i: number) => ReactNode
  controls?: ReturnType<typeof useState<T>>
}) {
  const { selection, content, controls } = props
  const [value, setValue] = controls ?? useState(selection[0])

  const handleChange = (_: SyntheticEvent, newValue: T) => {
    if (newValue !== null) setValue(newValue)
  }
  return (
    <Grid container justifyContent='center'>
      <Grid item>
        <ToggleButtonGroup
          value={value}
          color='primary'
          exclusive
          size='small'
          onChange={handleChange}
          className={classes.tabs}
        >
          {selection.map((label, i) => (
            <ToggleButton key={i} value={label} sx={{ fontSize: 9 }}>
              {label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Grid>
      <Grid item xs={12}>
        {content(value, selection.indexOf(value))}
      </Grid>
    </Grid>
  )
}

export function SimpleToggle(props: { tabs: Record<string, ReactNode> }) {
  const { tabs } = props
  return (
    <ToggleButtons
      selection={Object.keys(tabs)}
      content={selected => tabs[selected]}
    ></ToggleButtons>
  )
}
