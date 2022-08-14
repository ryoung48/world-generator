import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'

export function StyledSelect(props: {
  items: { label: string; value: string | number }[]
  selected: string | number
  set_selected: (_value: string) => void
  label: string
  hint?: string
}) {
  const { items, selected, set_selected, label, hint } = props
  return (
    <FormControl variant='standard' fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        value={selected}
        onChange={event => set_selected(event.target.value.toString())}
        label={label}
      >
        {items.map((item, i) => (
          <MenuItem value={item.value} key={i}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {hint && <FormHelperText>{hint}</FormHelperText>}
    </FormControl>
  )
}
