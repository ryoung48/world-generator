import { css } from '@emotion/css'
import { Box, Tab, Tabs } from '@mui/material'
import { ReactNode, SyntheticEvent, useState } from 'react'

const classes = {
  tabs: css`
    margin-bottom: 20px;
  `
}

export function StyledTabs(props: {
  tabs: { label: string; content: ReactNode }[]
  active: boolean
  selected?: ReturnType<typeof useState<string>>
}) {
  const { tabs, active, selected } = props
  const [value, setValue] = selected ?? useState(tabs[0].label)

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const valid = tabs.some(tab => tab.label === value)
  if (!valid) setValue(tabs[0].label)
  return (
    <Box>
      <Tabs
        value={active ? value : false}
        textColor='primary'
        indicatorColor='secondary'
        centered
        onChange={handleChange}
        className={classes.tabs}
      >
        {tabs.map(({ label }, i) => (
          <Tab sx={{ padding: 0 }} key={i} value={label} label={label}></Tab>
        ))}
      </Tabs>
      {tabs.map(({ content, label }, i) => (
        <Box key={i} hidden={label !== value}>
          {content}
        </Box>
      ))}
    </Box>
  )
}
