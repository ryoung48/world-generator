import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { ChangeEvent, ReactNode } from 'react'

export function RadioSelect(props: {
  selected: { value: number | string; setValue: (_item: string) => void }
  items: { value: number | string; label: ReactNode }[]
}) {
  const { selected, items } = props
  const { value, setValue } = selected
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }
  return (
    <FormControl>
      <RadioGroup value={value} onChange={handleChange}>
        {items.map((item, i) => {
          return (
            <FormControlLabel key={i} value={item.value} control={<Radio />} label={item.label} />
          )
        })}
      </RadioGroup>
    </FormControl>
  )
}
