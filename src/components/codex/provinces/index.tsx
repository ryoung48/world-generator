import { Box, Divider, Grid } from '@mui/material'

import { hub__traits } from '../../../models/regions/hubs/traits'
import { province__demographics } from '../../../models/regions/provinces/network'
import { titleCase } from '../../../models/utilities/text'
import { decorateText } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { climates } from '../../../models/world/climate/types'
import { view__context } from '../../context'
import { cssColors } from '../../theme/colors'
import { CodexPage } from '../common/CodexPage'
import { SectionList } from '../common/text/SectionList'
import { StyledText } from '../common/text/StyledText'
import { ThreadList } from './threads'

export function ProvinceView() {
  const { state } = view__context()
  const province = window.world.provinces[state.codex.province]
  const region = window.world.regions[province.region]
  const climate = climates[region.climate]
  const { terrain } = province
  const demographics: Parameters<typeof SectionList>[0]['list'] = []
  const { common } = province__demographics(province)
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
                  label: name,
                  tooltip: species
                })} (${formatters.percent(w)})`
              })
              .concat(other > 0 ? [`Other (${formatters.percent(other)})`] : [])
              .join(', ')}
          ></StyledText>
        )
      }
    ]
  )
  const traits = hub__traits(province.hub)
  return (
    <CodexPage
      title={province.name}
      subtitle={
        <StyledText
          color={cssColors.subtitle}
          text={`(${province.idx}) ${province.hub.type} ${
            province.population > 0
              ? `(${formatters.compact(province.hub.population).toLowerCase()})`
              : ''
          }, ${decorateText({
            link: window.world.regions[province.nation]
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
              <SectionList list={[{ label: 'Terrain', content: titleCase(terrain) }]}></SectionList>
            </Box>
          </Grid>
          {province.hub.description && (
            <Grid item xs={12} mt={1}>
              <Box py={0}>
                <SectionList
                  list={Object.entries(province.hub.description).map(([k, v]) => ({
                    label: k,
                    content: v
                  }))}
                ></SectionList>
              </Box>
            </Grid>
          )}
          {demographics.length > 0 && (
            <Grid item xs={12} mt={0}>
              <Box py={0}>
                <SectionList list={demographics}></SectionList>
              </Box>
            </Grid>
          )}

          <Grid item xs={12} mt={0}>
            <Box py={0}>
              <SectionList
                list={[
                  {
                    label: 'Quirks',
                    content: (
                      <StyledText
                        text={traits
                          .map(({ key, text }) =>
                            decorateText({ label: titleCase(key), tooltip: text })
                          )
                          .join(', ')}
                      ></StyledText>
                    )
                  }
                ]}
              ></SectionList>
            </Box>
          </Grid>
          <Grid item xs={12} mt={1}>
            <Divider>Hooks</Divider>
          </Grid>
          <Grid item xs={12} mt={1}>
            <ThreadList></ThreadList>
          </Grid>
        </Grid>
      }
    ></CodexPage>
  )
}
