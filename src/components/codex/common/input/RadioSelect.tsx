import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { ChangeEvent, ReactNode } from 'react'

export function RadioSelect(props: {
  selected: { value: number | string; set_value: (_item: string) => void }
  items: { value: number | string; label: ReactNode }[]
}) {
  const { selected, items } = props
  const { value, set_value } = selected
  const handle_Change = (event: ChangeEvent<HTMLInputElement>) => {
    set_value((event.target as HTMLInputElement).value)
  }
  return (
    <FormControl>
      <RadioGroup value={value} onChange={handle_Change}>
        {items.map((item, i) => {
          return (
            <FormControlLabel key={i} value={item.value} control={<Radio />} label={item.label} />
          )
        })}
      </RadioGroup>
    </FormControl>
  )
}
