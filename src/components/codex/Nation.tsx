import { Grid } from '@mui/material'

import { WORLD } from '../../models'
import { CULTURE } from '../../models/heritage'
import { REGION } from '../../models/regions'
import { PROVINCE } from '../../models/regions/provinces'
import { HUB } from '../../models/regions/sites/hubs'
import { TRADE_GOODS } from '../../models/regions/trade'
import { MATH } from '../../models/utilities/math'
import { TEXT } from '../../models/utilities/text'
import { CodexPage } from '../common/CodexPage'
import { SectionList } from '../common/text/SectionList'
import { StyledText } from '../common/text/styled'
import { VIEW } from '../context'
import { cssColors } from '../theme/colors'
import { MAP_METRICS } from '../world/shapes/metrics'

export function NationView() {
  const { state } = VIEW.context()
  const province = window.world.provinces[state.loc.province]
  const nation = PROVINCE.nation(province)
  const totalPop = REGION.population(nation)
  const provinces = REGION.provinces(nation)
  const ruling = nation.culture
  const cultures = MATH.counterDist(
    provinces.map(province => window.world.regions[province.region].culture)
  )
    .sort((a, b) => {
      const aCount = a.value === ruling ? Infinity : a.count
      const bCount = b.value === ruling ? Infinity : b.count
      return bCount - aCount
    })
    .slice(0, 3)
  const cellArea = WORLD.cell.area()
  let area = provinces.reduce((sum, province) => sum + province.land, 0) * cellArea
  if (MAP_METRICS.metric) area = MATH.conversion.area.mi.km(area)
  const units = MAP_METRICS.metric ? 'km²' : 'mi²'
  const neighbors = REGION.neighbors({ region: nation, depth: 1 })
  const religion = nation.religion
  const decoratedProvinces = provinces
    .sort((a, b) => PROVINCE.hub(b).population - PROVINCE.hub(a).population)
    .map(province =>
      TEXT.decorate({
        link: province,
        label: PROVINCE.hub(province).name,
        tooltip: HUB.type(PROVINCE.hub(province))
      })
    )
    .join(', ')
  return (
    <CodexPage
      title={nation.name}
      subtitle={
        <StyledText
          color={cssColors.subtitle}
          text={`(${nation.idx}) ${nation.size} (${nation.government}, ${religion})`}
        ></StyledText>
      }
      content={
        <Grid container>
          <Grid item xs={4}>
            <SectionList
              list={[
                {
                  label: 'Population',
                  content: <span>{TEXT.formatters.compact(totalPop)}</span>
                },
                {
                  label: 'Area',
                  content: `${TEXT.formatters.compact(area)} ${units} (${Math.round(
                    totalPop / area
                  )} persons/${units})`
                }
              ]}
            ></SectionList>
          </Grid>
          <Grid item xs={8}>
            <SectionList
              list={[
                {
                  label: 'Cultures',
                  content: (
                    <span>
                      <StyledText
                        text={cultures
                          .map(({ value, count }) => {
                            const culture = window.world.cultures[value]
                            const color = value === ruling ? undefined : cssColors.subtitle
                            return `${TEXT.decorate({
                              label: culture.name,
                              details: CULTURE.describe(culture),
                              color
                            })} ${TEXT.decorate({
                              label: `(${TEXT.formatters.percent(count)})`,
                              color
                            })}`
                          })
                          .join(', ')}
                      ></StyledText>
                    </span>
                  )
                },
                {
                  label: 'Exports',
                  content: (
                    <StyledText
                      text={nation.trade
                        .map((good, i) => {
                          const details = TRADE_GOODS.reference[good]
                          return TEXT.decorate({
                            label: i !== 0 ? good : TEXT.capitalize(good),
                            tooltip: typeof details.text === 'string' ? details.text : undefined
                          })
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
                  label: `Borders (${neighbors.length})`,
                  content: (
                    <StyledText
                      text={neighbors
                        .map(n => {
                          const opinion = nation.relations[n.idx]
                          const war = opinion === 'at war'
                          const color =
                            opinion === 'ally'
                              ? '#00008B'
                              : opinion === 'friendly'
                              ? '#006400'
                              : opinion === 'neutral'
                              ? '#969696'
                              : opinion === 'suspicious'
                              ? '#7c4502'
                              : opinion === 'vassal'
                              ? '#59027c'
                              : cssColors.primary
                          const suzerain = window.world.regions[nation.overlord]?.idx === n.idx
                          const subject = nation.vassals.includes(n.idx)
                          return TEXT.decorate({
                            link: n,
                            label: n.name,
                            tooltip: suzerain ? 'suzerain' : subject ? 'vassal' : opinion,
                            color: color,
                            bold: war
                          })
                        })
                        .join(', ')}
                    ></StyledText>
                  )
                },
                {
                  label: `Settlements (${provinces.length})`,
                  content: <StyledText text={decoratedProvinces}></StyledText>
                }
              ]}
            ></SectionList>
          </Grid>
        </Grid>
      }
    ></CodexPage>
  )
}
