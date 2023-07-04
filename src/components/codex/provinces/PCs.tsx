import { Grid } from '@mui/material'
import { scaleLinear } from 'd3'

import { avatar__lvl, npc__lvl } from '../../../models/utilities/difficulty'
import { decorateText } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { view__context } from '../../context'
import { DetailedTableRow } from '../common/DataTable'
import { StyledText } from '../common/text/StyledText'

const hpColorScale = scaleLinear()
  .domain([0, 0.5, 1])
  .range(['red', 'orange', 'green'] as any)

export function PlayerCharacterView() {
  const { state } = view__context()
  return (
    <Grid container>
      {state.avatar.pcs.map((a, i) => {
        const actor = window.world.npcs[a]
        const health = actor.health
        return (
          <Grid key={actor.idx} mx={0.4}>
            <DetailedTableRow
              link
              title={
                <span>
                  <StyledText text={decorateText({ link: actor })}></StyledText>
                  <StyledText
                    text={` (${decorateText({
                      label: formatters.percent(health),
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
              subtitle={npc__lvl(actor).toFixed(2)}
            ></DetailedTableRow>
          </Grid>
        )
      })}
    </Grid>
  )
}
