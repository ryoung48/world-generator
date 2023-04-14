import { Box, Divider, Grid } from '@mui/material'

import { culture__decorations } from '../../../models/npcs/cultures'
import { region__population } from '../../../models/regions'
import { hub__isVillage } from '../../../models/regions/hubs'
import { decorateText } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { climates } from '../../../models/world/climate/types'
import { view__context } from '../../context'
import { cssColors } from '../../theme/colors'
import { CodexPage } from '../common/CodexPage'
import { SectionList } from '../common/text/SectionList'
import { StyledText } from '../common/text/StyledText'
import { Geography } from './Geography'

export function NationView() {
  const { state } = view__context()
  const nation = window.world.regions[state.codex.nation]
  const climate = climates[nation.climate]
  const ruling = window.world.cultures[nation.culture.ruling]
  const native = window.world.cultures[nation.culture.native]
  const totalPop = region__population(nation)
  const urbanPop = nation.provinces
    .map(i => window.world.provinces[i].hub)
    .filter(hub => !hub__isVillage(hub))
    .reduce((sum, hub) => sum + hub.population, 0)
  const overlord =
    window.world.regions[
      parseInt(
        Object.entries(nation.relations).find(([_, relation]) => relation === 'suzerain')?.[0]
      )
    ]
  const vassal = `${
    overlord
      ? `, ${decorateText({
          label: 'vassal',
          link: overlord,
          tooltip: overlord?.name ?? undefined,
          color: cssColors.subtitle
        })}`
      : ''
  }`
  return (
    <CodexPage
      title={nation.name}
      subtitle={
        <StyledText
          color={cssColors.subtitle}
          text={`(${nation.idx}) ${nation.government}${vassal} (${climate.zone.toLowerCase()}, ${
            nation.development
          })`}
        ></StyledText>
      }
      content={
        <Grid container>
          <Grid item xs={6}>
            <SectionList
              list={[
                {
                  label: 'Culture',
                  content: (
                    <StyledText
                      text={`${culture__decorations({ culture: ruling, title: true })}${
                        ruling !== native
                          ? `, ${culture__decorations({
                              culture: native,
                              title: true,
                              color: cssColors.subtitle
                            })}`
                          : ''
                      }`}
                    ></StyledText>
                  )
                }
              ]}
            ></SectionList>
          </Grid>
          <Grid item xs={6}>
            <SectionList
              list={[
                {
                  label: 'Population',
                  content: `${formatters.compact(totalPop)} (${(
                    (urbanPop / totalPop) *
                    100
                  ).toFixed(0)}% Urban)`
                }
              ]}
            ></SectionList>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Divider>Geography</Divider>
            <Box py={1}>
              <Geography></Geography>
            </Box>
          </Grid>
        </Grid>
      }
    ></CodexPage>
  )
}
