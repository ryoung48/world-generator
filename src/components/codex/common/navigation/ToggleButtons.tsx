import { css } from '@emotion/css'
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Dispatch, ReactNode, SetStateAction, SyntheticEvent, useState } from 'react'

const classes = {
  tabs: css`
    margin-bottom: 20px;
  `
}

export function ToggleButtons<T extends string>(props: {
  selection: T[]
  content: (_selected: T) => ReactNode
  selected?: [T, Dispatch<SetStateAction<T>>]
}) {
  const { selection, content } = props
  const [value, setValue] = props.selected ?? useState(selection[0])

  const handleChange = (_: SyntheticEvent, newValue: T) => {
    if (newValue) setValue(newValue)
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
            <ToggleButton key={i} value={label}>
              {label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Grid>
      <Grid item xs={12}>
        {content(value)}
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
