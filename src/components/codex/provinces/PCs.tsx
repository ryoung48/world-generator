import { Grid } from '@mui/material'
import { scaleLinear } from 'd3'

import { DIFFICULTY } from '../../../models/utilities/difficulty'
import { decorateText } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { VIEW } from '../../context'
import { DetailedTableRow } from '../common/DataTable'
import { StyledText } from '../common/text/StyledText'

const hpColorScale = scaleLinear()
  .domain([0, 0.5, 1])
  .range(['red', 'orange', 'green'] as any)

export function PlayerCharacterView() {
  const { state } = VIEW.context()
  return (
    <Grid container mt={0.5} sx={{ fontSize: 12 }}>
      <Grid mr={0.4}>
        <DetailedTableRow link title={<b>Player Characters:</b>} subtitle={''}></DetailedTableRow>
      </Grid>
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
              subtitle={DIFFICULTY.actor.lvl(actor).toFixed(2)}
            ></DetailedTableRow>
          </Grid>
        )
      })}
    </Grid>
  )
}
