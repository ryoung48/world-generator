import { Grid } from '@mui/material'

import { REGION } from '../../../models/regions'
import { PROVINCE } from '../../../models/regions/provinces'
import { HOOK } from '../../../models/regions/provinces/hooks'
import { HUB } from '../../../models/regions/provinces/hubs'
import { DIFFICULTY } from '../../../models/utilities/difficulty'
import { MATH } from '../../../models/utilities/math'
import { titleCase } from '../../../models/utilities/text'
import { decorateText } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { WORLD } from '../../../models/world'
import { VIEW } from '../../context'
import { cssColors } from '../../theme/colors'
import { MAP } from '../../world/common'
import { CodexPage } from '../common/CodexPage'
import { SectionList } from '../common/text/SectionList'
import { StyledText } from '../common/text/StyledText'
import { ConquestView } from './Conquest'

export function NationView() {
  const { state } = VIEW.context()
  const nation = window.world.regions[state.region]
  const hooks = HOOK.spawn({ entity: nation, pc: DIFFICULTY.avatar.cr(state.avatar) })
  hooks.tags.forEach(hook => HOOK.elements({ entity: nation, hook }))
  const ruling = nation.culture
  const totalPop = REGION.population(nation)
  const urbanPop = REGION.provinces(nation)
    .map(i => i.hub)
    .filter(hub => !HUB.village(hub))
    .reduce((sum, hub) => sum + hub.population, 0)
  const overlord =
    window.world.regions[
      parseInt(
        Object.entries(nation.relations).find(([_, relation]) => relation === 'suzerain')?.[0]
      )
    ]
  const provinces = REGION.provinces(nation)
  const cultures = MATH.counterDist(
    provinces.map(province => window.world.regions[province.region].culture)
  )
    .sort((a, b) => {
      const aCount = a.value === ruling ? Infinity : a.count
      const bCount = b.value === ruling ? Infinity : b.count
      return bCount - aCount
    })
    .slice(0, 3)
  const stateReligion = nation.religion
  const religions = MATH.counterDist(
    provinces.map(province => window.world.regions[province.region].religion)
  )
    .sort((a, b) => {
      const aCount = a.value === stateReligion ? Infinity : a.count
      const bCount = b.value === stateReligion ? Infinity : b.count
      return bCount - aCount
    })
    .slice(0, 3)
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
  const cellArea = WORLD.cell.area()
  let area = provinces.reduce((sum, province) => sum + province.land, 0) * cellArea
  if (MAP.metrics.metric) area = MATH.conversion.area.mi.km(area)
  const units = MAP.metrics.metric ? 'km²' : 'mi²'
  const { climates, terrain } = REGION.environment(nation)
  const neighbors = REGION.neighbors({ region: nation, depth: 1 })
  return (
    <CodexPage
      title={nation.name}
      subtitle={
        <StyledText
          color={cssColors.subtitle}
          text={`(${nation.idx}) ${nation.government}${vassal} (${nation.development})`}
        ></StyledText>
      }
      content={
        <Grid container>
          <Grid item xs={6}>
            <SectionList
              list={[
                {
                  label: 'Area',
                  content: `${formatters.compact(area)} ${units} (${Math.round(
                    totalPop / area
                  )} persons/${units})`
                },
                {
                  label: `Climate`,
                  content: climates
                },
                {
                  label: `Terrain`,
                  content: terrain
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
                },
                {
                  label: 'Ethnic groups',
                  content: (
                    <StyledText
                      text={cultures
                        .map(({ value, count }) => {
                          const culture = window.world.cultures[value]
                          const color = value === ruling ? undefined : cssColors.subtitle
                          return `${decorateText({
                            label: `${titleCase(culture.name)}`,
                            link: culture,
                            tooltip: culture.species,
                            color
                          })} ${decorateText({
                            label: `(${formatters.percent(count)})`,
                            color
                          })}`
                        })
                        .join(', ')}
                    ></StyledText>
                  )
                },
                {
                  label: 'Religions',
                  content: (
                    <StyledText
                      text={religions
                        .map(({ value, count }) => {
                          const religion = window.world.religions[value]
                          const color = value === stateReligion ? undefined : cssColors.subtitle
                          return `${decorateText({
                            label: titleCase(religion.name),
                            link: religion,
                            color
                          })}  ${decorateText({
                            label: `(${formatters.percent(count)})`,
                            color
                          })}`
                        })
                        .join(', ')}
                    ></StyledText>
                  )
                }
              ]}
            ></SectionList>
          </Grid>
          <Grid item xs={12}>
            <SectionList
              list={[
                {
                  label: `Settlements (${provinces.length})`,
                  content: <StyledText text={PROVINCE.decorate(provinces)}></StyledText>
                },
                {
                  label: `Borders (${neighbors.length})`,
                  content: (
                    <StyledText
                      text={neighbors.map(n => decorateText({ link: n })).join(', ')}
                    ></StyledText>
                  )
                }
              ]}
            ></SectionList>
          </Grid>

          {/* <Grid item xs={12} mt={1}>
            <Divider>Hooks</Divider>
          </Grid>
          <Grid item xs={12} mt={1}>
            <Grid container>
              {quests.map((hook, i) => {
                return (
                  <Grid item xs={5.5} mx={1} key={i}>
                    <Card
                      key={i}
                      sx={{
                        height: '100% !important',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      <CardContent sx={{ fontSize: 12 }}>
                        <Box>
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              sx={{
                                fontSize: 18,
                                fontFamily: 'serif',
                                fontWeight: 600,
                                color: cssColors.primary
                              }}
                            >
                              {titleCase(hook.title)}
                            </Grid>
                            <Grid item xs={12} sx={{ color: cssColors.subtitle }}>
                              {hook.type}, border dispute
                            </Grid>
                          </Grid>
                        </Box>
                        <Grid container sx={{ fontSize: 12, lineHeight: 1.5 }}>
                          <Grid item xs={12}>
                            <span>
                              <StyledText
                                text={decorateText({
                                  label: hook['quest giver'].occupation,
                                  tooltip: hook['quest giver'].description
                                })}
                              ></StyledText>
                              ,{' '}
                              <StyledText
                                text={decorateText({
                                  label: hook['location'].title,
                                  tooltip: hook['location'].description
                                })}
                              ></StyledText>
                            </span>
                          </Grid>
                          <Grid item xs={12}>
                            <span>{capitalize(hook.description)}.</span>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          </Grid> */}
          {window.world.nations.length > 1 && (
            <Grid item xs={12} mt={1} style={{ height: 350 }}>
              <ConquestView></ConquestView>
            </Grid>
          )}
        </Grid>
      }
    ></CodexPage>
  )
}
