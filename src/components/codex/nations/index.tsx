import { Grid } from '@mui/material'

import { REGION } from '../../../models/regions'
import { PROVINCE } from '../../../models/regions/provinces'
import { HUB } from '../../../models/regions/provinces/hubs'
import { MATH } from '../../../models/utilities/math'
import { titleCase } from '../../../models/utilities/text'
import { decorateText } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { CLIMATE } from '../../../models/world/climate'
import { VIEW } from '../../context'
import { cssColors } from '../../theme/colors'
import { CodexPage } from '../common/CodexPage'
import { SectionList } from '../common/text/SectionList'
import { StyledText } from '../common/text/StyledText'

export function NationView() {
  const { state } = VIEW.context()
  const nation = window.world.regions[state.region]
  const climate = CLIMATE.lookup[nation.climate]
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
                  label: 'Population',
                  content: `${formatters.compact(totalPop)} (${(
                    (urbanPop / totalPop) *
                    100
                  ).toFixed(0)}% Urban)`
                },
                {
                  label: `Climate`,
                  content: <StyledText text={REGION.biomes(nation)}></StyledText>
                }
              ]}
            ></SectionList>
          </Grid>
          <Grid item xs={6}>
            <SectionList
              list={[
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
                }
              ]}
            ></SectionList>
          </Grid>
        </Grid>
      }
    ></CodexPage>
  )
}
