import { Box, IconButton } from '@mui/material'
import { MinusBox, PlusBox } from 'mdi-material-ui'
import { Fragment } from 'react'

import { MAP_SHAPES } from '../../shapes'
import { MapControlsProps } from '../types'

export function MapZoomControls({ move }: MapControlsProps) {
  const base = {
    zIndex: 3,
    position: 'absolute',
    top: MAP_SHAPES.height,
    left: MAP_SHAPES.width * 1.13
  }
  return (
    <Fragment>
      <IconButton
        sx={{ ...base, top: base.top, left: base.left - 3 }}
        onClick={() => move({ dx: 0, dy: 0, scale: 5 })}
        color='primary'
      >
        <PlusBox fontSize='large'></PlusBox>
      </IconButton>
      <IconButton
        sx={{ ...base, top: base.top + 30, left: base.left - 3 }}
        onClick={() => move({ dx: 0, dy: 0, scale: -5 })}
        color='primary'
      >
        <MinusBox fontSize='large'></MinusBox>
      </IconButton>
      <Box
        sx={{
          ...base,
          zIndex: 2,
          backgroundColor: 'rgba(238, 238, 221, 0.75)',
          width: 40,
          height: 75
        }}
      ></Box>
    </Fragment>
  )
}
