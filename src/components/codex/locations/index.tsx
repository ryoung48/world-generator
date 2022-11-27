import { Box, Divider, Grid } from '@mui/material'
import { Fragment } from 'react'

import { location__isSettlement } from '../../../models/regions/locations'
import { location__demographics } from '../../../models/regions/locations/actors/demographics'
import { location__threads } from '../../../models/threads'
import { titleCase } from '../../../models/utilities/text'
import { decorateText } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { location__terrain } from '../../../models/world/climate/terrain'
import { climates } from '../../../models/world/climate/types'
import { view__context } from '../../context'
import { cssColors } from '../../theme/colors'
import { CodexPage } from '../common/CodexPage'
import { SectionList } from '../common/text/SectionList'
import { StyledText } from '../common/text/StyledText'
import { ThreadView } from './Thread'

export function LocationView() {
  const { state } = view__context()
  const location = window.world.locations[state.codex.location]
  const province = window.world.provinces[location.province]
  const region = window.world.regions[location.region]
  const climate = climates[region.climate]
  const type = location.subtype ?? location.type
  const { elevation, terrain } = location__terrain(location)
  const demographics: Parameters<typeof SectionList>[0]['list'] = []
  const settlement = location__isSettlement(location)
  if (settlement) {
    const { common } = location__demographics(location)
    const other = common.slice(5).reduce((sum, { w }) => sum + w, 0)
    demographics.push(
      ...[
        {
          label: 'Demographics',
          content: (
            <StyledText
              text={common
                .slice(0, 5)
                .map(({ v, w }) => {
                  const { name, species } = window.world.cultures[v]
                  return `${decorateText({
                    label: name.toLowerCase(),
                    tooltip: species
                  })} (${formatters.percent(w)})`
                })
                .concat(other > 0 ? [`other (${formatters.percent(other)})`] : [])
                .join(', ')}
            ></StyledText>
          )
        }
      ]
    )
  }
  const threads = location__threads(location)
  return (
    <CodexPage
      title={location.name}
      subtitle={
        <StyledText
          color={cssColors.subtitle}
          text={`(${location.idx}) ${type} ${
            location.population > 0
              ? `(${formatters.compact(location.population).toLowerCase()})`
              : ''
          }, ${decorateText({
            link: window.world.regions[province.currNation]
          })}`}
        ></StyledText>
      }
      content={
        <Grid container>
          <Grid item xs={6} mt={1}>
            <Box pt={1}>
              <SectionList
                list={[
                  { label: 'Climate', content: `${titleCase(climate.type)} (${climate.code})` }
                ]}
              ></SectionList>
            </Box>
          </Grid>
          <Grid item xs={6} mt={1}>
            <Box pt={1}>
              <SectionList
                list={[{ label: 'Terrain', content: `${elevation}, ${terrain}` }]}
              ></SectionList>
            </Box>
          </Grid>
          {demographics.length > 0 && (
            <Grid item xs={12} mt={0}>
              <Box py={0}>
                <SectionList list={demographics}></SectionList>
              </Box>
            </Grid>
          )}
          {threads.length > 0 && (
            <Fragment>
              <Grid item xs={12} mt={1}>
                <Divider>Hooks</Divider>
              </Grid>
              <Grid item xs={12} mt={1}>
                <ThreadView threads={threads}></ThreadView>
              </Grid>
            </Fragment>
          )}
        </Grid>
      }
    ></CodexPage>
  )
}
