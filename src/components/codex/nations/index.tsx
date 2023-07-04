import { Box, Grid, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'

import { culture__decorations } from '../../../models/npcs/cultures'
import { region__biomes, region__population } from '../../../models/regions'
import { hub__isVillage } from '../../../models/regions/provinces/hubs'
import { thread__spawn } from '../../../models/threads'
import { avatar__cr, difficulties, difficulty__odds } from '../../../models/utilities/difficulty'
import { titleCase } from '../../../models/utilities/text'
import { decorateText } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { climates } from '../../../models/world/climate/types'
import { view__context } from '../../context'
import { cssColors } from '../../theme/colors'
import { CodexPage } from '../common/CodexPage'
import { DataTable, DetailedTableRow } from '../common/DataTable'
import { SectionList } from '../common/text/SectionList'
import { StyledText } from '../common/text/StyledText'
import { quest__icons } from '../provinces/quests/styles'
import { ThreadView } from '../provinces/Thread'

const itemsPerPage = 5

export function NationView() {
  const { state } = view__context()
  const [expanded, setExpanded] = useState(-1)
  const [page, setPage] = useState(0)
  const nation = window.world.regions[state.region]
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
  const pc = avatar__cr(state.avatar)
  useEffect(() => {
    const idx = nation.provinces.findIndex(idx => state.province === idx)
    if (idx === -1 || expanded < 0) {
      setPage(0)
      setExpanded(-1)
    } else {
      setPage(Math.floor(idx / itemsPerPage))
      setExpanded(idx)
    }
  }, [state.province])
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
                  label: 'Rulers',
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
                },
                {
                  label: `Climate`,
                  content: <StyledText text={region__biomes(nation)}></StyledText>
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
            <Box py={1}>
              <DataTable
                data={nation.provinces.map(t => window.world.provinces[t])}
                headers={[
                  {
                    text: '',
                    value: province => {
                      const thread = thread__spawn({ loc: province, pc })
                      const status = thread.status ?? 'in progress'
                      const { Icon, color } = quest__icons[status]
                      return (
                        <IconButton>
                          <Icon style={{ color }}></Icon>
                        </IconButton>
                      )
                    }
                  },
                  {
                    text: 'Quest',
                    value: province => {
                      const thread = thread__spawn({ loc: province, pc })
                      const { tier, odds } = difficulty__odds({ pc, ...thread.difficulty })
                      return (
                        <DetailedTableRow
                          title={titleCase(thread.type !== 'court' ? thread.type : thread.subtype)}
                          subtitle={
                            <StyledText
                              text={decorateText({
                                label: `${tier} (${formatters.percent(1 - odds)})`,
                                color: difficulties[tier].color
                              })}
                            ></StyledText>
                          }
                        ></DetailedTableRow>
                      )
                    }
                  },
                  {
                    text: 'Settlement',
                    value: ({ name, hub }) => (
                      <DetailedTableRow title={name} subtitle={hub.type}></DetailedTableRow>
                    )
                  },
                  {
                    text: 'Terrain',
                    value: ({ environment, region: ridx }) => {
                      const region = window.world.regions[ridx]
                      const climate = climates[region.climate]
                      return (
                        <DetailedTableRow
                          title={titleCase(environment.terrain)}
                          subtitle={
                            <StyledText
                              text={decorateText({
                                label: environment.climate,
                                color: cssColors.subtitle,
                                tooltip: `${titleCase(climate.name)} (${climate.code})`
                              })}
                            ></StyledText>
                          }
                        ></DetailedTableRow>
                      )
                    }
                  }
                ]}
                paging={[page, setPage]}
                rowsPerPage={itemsPerPage}
                expand={{
                  content: province => {
                    const thread = thread__spawn({ loc: province, pc })
                    return <ThreadView thread={thread}></ThreadView>
                  },
                  expanded: [expanded, setExpanded]
                }}
              ></DataTable>
            </Box>
          </Grid>
        </Grid>
      }
    ></CodexPage>
  )
}
