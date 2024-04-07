import { Grid } from '@mui/material'

import { WORLD } from '../../models'
import { RELIGION } from '../../models/heritage/religions'
import { REGION } from '../../models/regions'
import { PROVINCE } from '../../models/regions/provinces'
import { WAR } from '../../models/regions/wars'
import { MATH } from '../../models/utilities/math'
import { TEXT } from '../../models/utilities/text'
import { CodexPage } from '../common/CodexPage'
import { SectionList } from '../common/text/SectionList'
import { StyledText } from '../common/text/styled'
import { VIEW } from '../context'
import { cssColors } from '../theme/colors'
import { MAP } from '../world/common'

export function NationView() {
  const { state } = VIEW.context()
  const province = window.world.provinces[state.loc.province]
  const nation = PROVINCE.nation(province)
  const totalPop = REGION.population(nation)
  const provinces = REGION.provinces(nation)
  const religion = REGION.religion(nation)
  const stateReligion = religion.type === 'atheistic' ? -1 : nation.religion
  const religions = MATH.counterDist(
    provinces.map(province => {
      const religion = REGION.religion(window.world.regions[province.region])
      return religion.type === 'atheistic' ? -1 : religion.idx
    })
  )
    .sort((a, b) => {
      const aCount = a.value === stateReligion ? Infinity : a.count
      const bCount = b.value === stateReligion ? Infinity : b.count
      return bCount - aCount
    })
    .slice(0, 3)
  const cellArea = WORLD.cell.area()
  let area = provinces.reduce((sum, province) => sum + province.land, 0) * cellArea
  if (MAP.metrics.metric) area = MATH.conversion.area.mi.km(area)
  const units = MAP.metrics.metric ? 'km²' : 'mi²'
  const { climates } = REGION.environment(nation)
  const neighbors = REGION.neighbors({ region: nation, depth: 1 })
  return (
    <CodexPage
      title={nation.name}
      subtitle={
        <StyledText
          color={cssColors.subtitle}
          text={`(${nation.idx}) ${nation.size} (${nation.government})`}
        ></StyledText>
      }
      content={
        <Grid container>
          <Grid item xs={7}>
            <SectionList
              list={[
                {
                  label: `Climate`,
                  content: climates
                },
                {
                  label: 'Religions',
                  content: (
                    <StyledText
                      text={religions
                        .map(({ value, count }) => {
                          const religion = window.world.religions[value]
                          const color = value === stateReligion ? undefined : cssColors.subtitle
                          const atheistic = value === -1
                          return `${TEXT.decorate({
                            label: atheistic ? 'Atheism' : TEXT.titleCase(religion.name),
                            details: atheistic ? undefined : RELIGION.describe(religion),
                            color
                          })}  ${TEXT.decorate({
                            label: `(${TEXT.formatters.percent(count)})`,
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
          <Grid item xs={5}>
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
                              : cssColors.primary
                          return TEXT.decorate({
                            link: n,
                            label: n.name,
                            tooltip: war ? undefined : opinion,
                            color: color,
                            bold: war,
                            details: war ? WAR.describe(window.world.wars[nation.war]) : undefined
                          })
                        })
                        .join(', ')}
                    ></StyledText>
                  )
                },
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
