import { Box } from '@mui/material'

import { NationView } from '../codex/nations'
import { ProvinceView } from '../codex/provinces'
import { view__context } from '../context'
import { CultureView } from './culture'

export function Codex() {
  const { state } = view__context()
  const { current } = state.codex
  return (
    <div>
      <Box component='div' hidden={current !== 'nation'}>
        <NationView></NationView>
      </Box>
      <Box component='div' hidden={current !== 'province'}>
        <ProvinceView></ProvinceView>
      </Box>
      <Box component='div' hidden={current !== 'culture'}>
        <CultureView></CultureView>
      </Box>
    </div>
  )
}
