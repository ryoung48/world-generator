import { Grid } from '@mui/material'

import { Cell } from '../../../models/cells/types'
import { CULTURE } from '../../../models/heritage'
import { NATION } from '../../../models/nations'
import { MILITARY } from '../../../models/nations/military'
import { PROVINCE } from '../../../models/provinces'
import { HUB } from '../../../models/provinces/hubs'
import { MATH } from '../../../models/utilities/math'
import { TEXT } from '../../../models/utilities/text'
import { CodexPage } from '../../common/CodexPage'
import { ColoredBox } from '../../common/ColoredBox'
import { SectionList } from '../../common/text/SectionList'
import { StyledText } from '../../common/text/styled'
import { VIEW } from '../../context'
import { cssColors } from '../../theme/colors'
import { MAP_METRICS } from '../../world/paint/shapes/metrics'

export function NationView() {
  const { state } = VIEW.context()
  const province = window.world.provinces[state.codex.idx]
  if (!province) return <span>No province selected</span>
  const nation = PROVINCE.nation(province)
  const provinces = NATION.provinces(nation)
  const cells = provinces.map(PROVINCE.cells.land).flat()
  const ruling = nation.culture
  const colonists = new Set(provinces.filter(p => p.colonists).map(p => p.minority))
  const cultures = MATH.counterDist(
    provinces
      .map(province =>
        province.minority !== undefined ? [province.minority, province.culture] : [province.culture]
      )
      .flat()
  )
    .sort((a, b) => {
      const aCount = a.value === ruling ? Infinity : a.count
      const bCount = b.value === ruling ? Infinity : b.count
      return bCount - aCount
    })
    .slice(0, 5)
  const cellArea = window.world.cell.area
  const totalPop = NATION.population(nation)
  let area = provinces.reduce((sum, province) => sum + province.land, 0) * cellArea
  if (state.units === 'metric') area = MATH.conversion.area.mi.km(area)
  const units = state.units === 'metric' ? 'km²' : 'mi²'
  const neighbors = NATION.relations.all(nation)
  const religion = window.world.cultures[nation.culture].religion
  const decoratedProvinces = provinces
    .sort((a, b) => PROVINCE.hub(b).population - PROVINCE.hub(a).population)
    .map(province =>
      TEXT.decorate({
        link: province,
        label: PROVINCE.hub(province).name,
        tooltip: HUB.settlement(PROVINCE.hub(province)),
        underlineColor:
          province.colonists !== undefined ? MAP_METRICS.government.colors.colonial : undefined
      })
    )
    .join(', ')
  const military = MILITARY.get(nation)
  const might = Math.floor(Math.log2(military.reduce((sum, [, , v]) => sum + v, 0)))
  return (
    <CodexPage
      title={nation.name}
      subtitle={
        <span>
          <span style={{ color: cssColors.subtitle }}>
            ({nation.idx}) {nation.decentralization ?? nation.size} (
            <ColoredBox color={MAP_METRICS.government.colors[nation?.government]} />{' '}
            {nation.government}, <ColoredBox color={MAP_METRICS.religion.colors[religion]} />{' '}
            {religion})
          </span>
        </span>
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
                },
                {
                  label: 'Development',
                  content: (
                    <span>
                      <ColoredBox
                        color={MAP_METRICS.development.color(nation.development)}
                      ></ColoredBox>
                      <StyledText
                        text={` ${TEXT.titleCase(
                          PROVINCE.development.describe(nation.development)
                        )} (${nation.development.toFixed(2)})`}
                      ></StyledText>
                    </span>
                  )
                }
              ]}
            ></SectionList>
          </Grid>
          <Grid item xs={8}>
            <SectionList
              list={[
                {
                  label: 'Climate',
                  content: (
                    <span>
                      {Object.entries(
                        cells.reduce((dict: Record<string, number>, cell) => {
                          const climate = cell.climate
                          if (!dict[climate]) dict[climate] = 0
                          dict[climate] += 1
                          return dict
                        }, {})
                      )
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 3)
                        .map(([value, count], i) => {
                          const color = MAP_METRICS.climate.categories[value as Cell['climate']]
                          return (
                            <span key={value}>
                              <ColoredBox color={color}></ColoredBox>
                              {` ${TEXT.titleCase(value)} (${TEXT.formatters.percent(
                                count / cells.length
                              )})${i !== 2 ? ', ' : ''}`}
                            </span>
                          )
                        })}
                    </span>
                  )
                },
                {
                  label: 'Vegetation',
                  content: (
                    <span>
                      {Object.entries(
                        cells.reduce((dict: Record<string, number>, { vegetation }) => {
                          if (!dict[vegetation]) dict[vegetation] = 0
                          dict[vegetation] += 1
                          return dict
                        }, {})
                      )
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 3)
                        .map(([value, count], i) => {
                          const color = MAP_METRICS.vegetation.color[value as Cell['vegetation']]
                          return (
                            <span key={value}>
                              <ColoredBox color={color}></ColoredBox>
                              {` ${TEXT.titleCase(value)} (${TEXT.formatters.percent(
                                count / cells.length
                              )})${i !== 2 ? ', ' : ''}`}
                            </span>
                          )
                        })}
                    </span>
                  )
                },
                {
                  label: 'Topography',
                  content: (
                    <span>
                      {Object.entries(
                        cells.reduce((dict: Record<string, number>, cell) => {
                          const terrain = cell.topography
                          if (!dict[terrain]) dict[terrain] = 0
                          dict[terrain] += 1
                          return dict
                        }, {})
                      )
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 3)
                        .map(([value, count], i) => {
                          const color =
                            MAP_METRICS.topography.categories()[value as Cell['topography']]
                          return (
                            <span key={value}>
                              <ColoredBox color={color}></ColoredBox>
                              {` ${TEXT.titleCase(value)} (${TEXT.formatters.percent(
                                count / cells.length
                              )})${i !== 2 ? ', ' : ''}`}
                            </span>
                          )
                        })}
                    </span>
                  )
                }
              ]}
            ></SectionList>
          </Grid>
          <Grid item xs={12}>
            <SectionList
              list={[
                {
                  label: `Military (⚔️ ${might}, 🛡️ ${might})`,
                  content: (
                    <span>
                      {(() => {
                        return (
                          <StyledText
                            text={military
                              .map(
                                ([key, value]) =>
                                  `${TEXT.decorate({
                                    label: TEXT.titleCase(key),
                                    tooltip: MILITARY.tooltip[key].toLowerCase()
                                  })} (${TEXT.formatters.compact(value)})`
                              )
                              .join(', ')}
                          />
                        )
                      })()}
                    </span>
                  )
                },
                {
                  label: 'Demographics',
                  content: (
                    <span>
                      {cultures.map(({ value, count }, i) => {
                        const culture = window.world.cultures[value]
                        const bold = value === ruling
                        return (
                          <span key={culture.idx.toString()}>
                            <ColoredBox color={culture.display.color} border={false}></ColoredBox>{' '}
                            <StyledText
                              text={`${TEXT.decorate({
                                label: culture.name,
                                details: CULTURE.describe(culture),
                                bold,
                                underlineColor: colonists.has(culture.idx)
                                  ? MAP_METRICS.government.colors.colonial
                                  : undefined
                              })} ${TEXT.decorate({
                                label: `(${TEXT.formatters.percent(count)})`
                              })}`}
                            ></StyledText>
                            {i !== cultures.length - 1 ? ', ' : ''}
                          </span>
                        )
                      })}
                    </span>
                  )
                },
                {
                  label: `Relations (${neighbors.length})`,
                  content: (
                    <span>
                      {([...neighbors]
                        .sort((a, b) => {
                          const order: Record<string, number> = {
                            'at war': 0,
                            suspicious: 1,
                            neutral: 2,
                            friendly: 3,
                            ally: 4,
                            vassal: 5
                          }
                          const oa = order[NATION.relations.get({ n1: nation, n2: a })] ?? 6
                          const ob = order[NATION.relations.get({ n1: nation, n2: b })] ?? 6
                          return oa - ob
                        })
                        .map((n, i) => {
                        const opinion = NATION.relations.get({ n1: nation, n2: n })
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
                            : opinion === 'vassal' || opinion === 'suzerain'
                            ? '#59027c'
                            : opinion === 'at war'
                            ? cssColors.primary
                            : '#0090a3'
                        return (
                          <span key={n.idx}>
                            <ColoredBox color={n.heraldry.color} border={false}></ColoredBox>{' '}
                            <StyledText
                              text={`${TEXT.decorate({
                                link: { tag: 'nation', idx: n.idx },
                                label: n.name,
                                tooltip: opinion,
                                color: color,
                                bold: war
                              })}`}
                            ></StyledText>
                            {i !== neighbors.length - 1 ? ', ' : ''}
                          </span>
                        )
                      }))}
                    </span>
                  )
                },
                {
                  label: `Provinces (${provinces.length})`,
                  content: <StyledText text={decoratedProvinces}></StyledText>
                }
              ]}
            ></SectionList>
          </Grid>
          {/* <Grid item xs={12} mt={2}>
            <Divider>Migration</Divider>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <MigrationsChart></MigrationsChart>
            </Box>
          </Grid> */}
        </Grid>
      }
    ></CodexPage>
  )
}
