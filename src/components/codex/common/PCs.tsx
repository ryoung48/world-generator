import { Grid } from '@mui/material'
import { scaleLinear } from 'd3'

import { ACTOR } from '../../../models/npcs'
import { DIFFICULTY } from '../../../models/utilities/difficulty'
import { TEXT } from '../../../models/utilities/text'
import { VIEW } from '../../context'
import { DetailedTableRow } from './DataTable'
import { StyledText } from './text/styled'

const hpColorScale = scaleLinear()
  .domain([0, 0.5, 1])
  .range(['red', 'orange', 'green'] as any)

export function PlayerCharacterView() {
  const { state } = VIEW.context()
  return (
    <Grid container mt={0.5} sx={{ fontSize: 10 }}>
      {state.avatar.pcs.map((a, i) => {
        const actor = window.world.npcs[a]
        const health = actor.health
        return (
          <Grid key={actor.idx} mx={0.4}>
            <DetailedTableRow
              title={
                <span>
                  <StyledText
                    text={TEXT.decorate({ label: actor.name, details: ACTOR.describe(actor) })}
                  ></StyledText>
                  <StyledText
                    text={` (${TEXT.decorate({
                      label: TEXT.formatters.percent(health),
                      color: hpColorScale(health).toString(),
                      tooltip:
                        health === 0
                          ? 'defeated'
                          : health < 0.3
                          ? 'near death'
                          : health < 0.6
                          ? 'bloodied'
                          : 'healthy'
                    })})${i < state.avatar.pcs.length - 1 ? ',' : ''}`}
                  ></StyledText>
                </span>
              }
              subtitle={DIFFICULTY.actor.lvl(actor).toFixed(2)}
            ></DetailedTableRow>
          </Grid>
        )
      })}
    </Grid>
  )
}
