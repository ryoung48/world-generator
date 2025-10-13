import { Grid } from '@mui/material'
import { scaleLinear } from 'd3'

import { ActorView } from '../codex/Actor'
import { CultureView } from '../codex/Culture'
import { NationView } from '../codex/nation'
import { ProvinceView } from '../codex/province'
import { VIEW } from '../context'
import { fonts } from '../theme/fonts'
import { CanvasTransform } from './actions/types'
import { MAP_SHAPES } from './paint/shapes'

type MapOverlayProps = {
  transform: CanvasTransform
}

export function MapOverlay(props: MapOverlayProps) {
  const { transform } = props
  const { state } = VIEW.context()
  const infoOpacity = scaleLinear().domain([400, 6000]).range([0, 1]).clamp(true)(transform.scale)

  if (infoOpacity <= 0) return null

  return (
    <Grid
      container
      sx={{
        zIndex: 2,
        position: 'absolute',
        top: MAP_SHAPES.height * 0.145,
        left: MAP_SHAPES.width * 0.8,
        fontFamily: fonts.maps,
        fontSize: 20,
        backgroundColor: `rgba(241, 241, 241, 0.95)`,
        width: 550,
        padding: 1,
        opacity: scaleLinear().domain([400, 1500]).range([0, 1]).clamp(true)(transform.scale)
      }}
    >
      {state.codex.tag === 'nation' && <NationView />}
      {state.codex.tag === 'province' && <ProvinceView />}
      {state.codex.tag === 'culture' && <CultureView />}
      {state.codex.tag === 'actor' && <ActorView />}
    </Grid>
  )
}
