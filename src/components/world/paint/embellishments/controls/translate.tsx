import { Box, IconButton } from '@mui/material'
import { scaleLinear } from 'd3'
import { ArrowDownBox, ArrowLeftBox, ArrowRightBox, ArrowUpBox } from 'mdi-material-ui'
import { Fragment } from 'react'

import { MAP_SHAPES } from '../../shapes'
import { MapControlsProps } from '../types'

const scaler = scaleLinear([2, 20, 50], [15, 5, 1])

export function MapTranslateControls({ move, scale }: MapControlsProps & { scale: number }) {
  const base = {
    zIndex: 3,
    position: 'absolute',
    top: MAP_SHAPES.height,
    left: MAP_SHAPES.width * 1.06
  }
  const speed = scaler(scale)
  return (
    <Fragment>
      <IconButton
        sx={{ ...base, top: base.top + 15, left: base.left + 55 }}
        onClick={() => move({ dx: speed, dy: 0, scale: 0 })}
        color='primary'
      >
        <ArrowRightBox fontSize='large'></ArrowRightBox>
      </IconButton>
      <IconButton
        sx={{ ...base, top: base.top + 15, left: base.left - 3 }}
        onClick={() => move({ dx: -speed, dy: 0, scale: 0 })}
        color='primary'
      >
        <ArrowLeftBox fontSize='large'></ArrowLeftBox>
      </IconButton>
      <IconButton
        sx={{ ...base, left: base.left + 26 }}
        onClick={() => move({ dx: 0, dy: speed, scale: 0 })}
        color='primary'
      >
        <ArrowUpBox fontSize='large'></ArrowUpBox>
      </IconButton>
      <IconButton
        sx={{ ...base, top: base.top + 30, left: base.left + 26 }}
        onClick={() => move({ dx: 0, dy: -speed, scale: 0 })}
        color='primary'
      >
        <ArrowDownBox fontSize='large'></ArrowDownBox>
      </IconButton>
      <Box
        sx={{
          ...base,
          zIndex: 2,
          backgroundColor: 'rgba(238, 238, 221, 0.75)',
          width: 100,
          height: 75
        }}
      ></Box>
    </Fragment>
  )
}
