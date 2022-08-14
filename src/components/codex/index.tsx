import { Box } from '@mui/material'

import { view__context } from '../../context'
import { LocationView } from '../codex/locations'
import { NationView } from '../codex/nations'
import { ActorView } from './actors'

export function Codex() {
  const { state } = view__context()
  const { current } = state.codex
  return (
    <div>
      <Box component='div' hidden={current !== 'nation'}>
        <NationView></NationView>
      </Box>
      <Box component='div' hidden={current !== 'location'}>
        <LocationView></LocationView>
      </Box>
      <Box component='div' hidden={current !== 'actor'}>
        <ActorView></ActorView>
      </Box>
    </div>
  )
}
