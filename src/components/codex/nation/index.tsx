import { Grid } from '@mui/material'
import { Gavel, ScaleBalance } from 'mdi-material-ui'

import { Cell } from '../../../models/cells/types'
import { CULTURE } from '../../../models/heritage'
import { NATION } from '../../../models/nations'
import { PROVINCE } from '../../../models/provinces'
import { MATH } from '../../../models/utilities/math'
import { TEXT } from '../../../models/utilities/text'
import { CodexPage } from '../../common/CodexPage'
import { ColoredBox } from '../../common/ColoredBox'
import { SectionList } from '../../common/text/SectionList'
import { StyledText } from '../../common/text/styled'
import { VIEW } from '../../context'
import { cssColors } from '../../theme/colors'
import { MAP_METRICS } from '../../world/paint/shapes/metrics'

import { getLawIcon, getPolicyIcon } from './icons'
import { DemographicsSection } from './sections/DemographicsSection'
import { MilitarySection } from './sections/MilitarySection'
import { PoliciesSection } from './sections/PoliciesSection'
import { ProvincesSection } from './sections/ProvincesSection'
import { ExportsSection, ImportsSection } from './sections/TradeSection'

export function NationView() {
  const { state } = VIEW.context()
  const province = window.world.provinces[state.codex.idx]
  if (!province) return <span>No province selected</span>

  const nation = PROVINCE.nation(province)
  const provinces = NATION.provinces(nation)
  const cells = provinces.map(PROVINCE.cells.land).flat()
  const cellArea = window.world.cell.area
  const totalPop = NATION.population(nation)
  let area = provinces.reduce((sum, province) => sum + province.land, 0) * cellArea
  if (state.units === 'metric') area = MATH.conversion.area.mi.km(area)
  const units = state.units === 'metric' ? 'km²' : 'mi²'
  const neighbors = NATION.relations.all(nation)
  const culture = window.world.cultures[nation.culture]
  const religionObj = CULTURE.religion(culture)
  const religionType = religionObj?.type
  const overlord = window.world.provinces[nation.overlord]
  const subject = overlord?.relations[nation.idx]
  const colonized = NATION.colonized(nation)

  return (
    <CodexPage
      title={nation.name}
      subtitle={
        <span>
          <span style={{ color: cssColors.subtitle }}>
            ({nation.idx}) {nation.decentralization ?? nation.size} (
            <ColoredBox color={MAP_METRICS.government.colors[nation?.government]} />{' '}
            {nation.government}
            {overlord && (
              <span>
                ,{' '}
                <ColoredBox
                  color={
                    colonized
                      ? MAP_METRICS.government.colors.colonial
                      : MAP_METRICS.government.colors.vassal
                  }
                />{' '}
                {subject}
              </span>
            )}
            , {<ColoredBox color={MAP_METRICS.religion.colors[religionType]} />} {religionType})
          </span>
        </span>
      }
      content={
        <Grid container>
          <Grid item xs={4.2}>
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
                },
                {
                  label: 'Legal System',
                  content: (
                    <span>
                      <span
                        style={{
                          display: 'inline-block',
                          verticalAlign: 'middle',
                          paddingRight: 3,
                          lineHeight: 0
                        }}
                      >
                        {getLawIcon(nation.law) ?? <ScaleBalance fontSize='inherit' />}
                      </span>
                      <StyledText
                        text={TEXT.decorate({
                          label: TEXT.titleCase(nation.law ?? ''),
                          tooltip: PROVINCE.law[nation.law] ?? ''
                        })}
                      />
                    </span>
                  )
                }
              ]}
            ></SectionList>
          </Grid>
          <Grid item xs={7.8}>
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
                },
                {
                  label: 'Bureaucracy',
                  content: (
                    <span>
                      <span
                        style={{
                          display: 'inline-block',
                          verticalAlign: 'middle',
                          paddingRight: 3,
                          lineHeight: 0
                        }}
                      >
                        {getPolicyIcon('bureaucracy', nation.policies.bureaucracy) ?? (
                          <Gavel fontSize='inherit' />
                        )}
                      </span>
                      <StyledText
                        text={TEXT.decorate({
                          label: TEXT.titleCase(nation.policies.bureaucracy),
                          tooltip: PROVINCE.policies.bureaucracy[nation.policies.bureaucracy]
                        })}
                      />
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
                  label: 'Policies',
                  content: <PoliciesSection nation={nation} />
                },
                {
                  label: 'Imports',
                  content: <ImportsSection nation={nation} />
                },
                {
                  label: 'Exports',
                  content: <ExportsSection nation={nation} />
                },
                {
                  label: `Military`,
                  content: <MilitarySection nation={nation} />
                },
                {
                  label: 'Demographics',
                  content: <DemographicsSection nation={nation} />
                },
                {
                  label: 'Languages',
                  content: (
                    <span>
                      {(() => {
                        const languageCounts = MATH.counterDist(
                          provinces.map(p => window.world.cultures[p.culture].language)
                        )
                          .sort((a, b) => b.count - a.count)
                          .slice(0, 5)
                        return languageCounts.map(({ value, count }, i) => {
                          const language = window.world.languages[value]
                          if (!language) return null
                          return (
                            <span key={value}>
                              <span
                                style={{
                                  display: 'inline-block',
                                  width: '3px',
                                  height: '3px',
                                  borderRadius: '50%',
                                  border: `2px solid ${language.display?.color ?? '#ccc'}`,
                                  backgroundColor: 'transparent',
                                  marginRight: '4px',
                                  verticalAlign: 'middle',
                                  marginBottom: 2
                                }}
                              ></span>
                              <StyledText
                                text={`${language.name ?? 'Unknown'} (${TEXT.formatters.percent(
                                  count
                                )})`}
                              ></StyledText>
                              {i !== languageCounts.length - 1 ? ', ' : ''}
                            </span>
                          )
                        })
                      })()}
                    </span>
                  )
                },
                {
                  label: 'Religions',
                  content: (
                    <span>
                      {(() => {
                        const religionCounts = MATH.counterDist(
                          provinces.map(p => window.world.cultures[p.culture].religion)
                        )

                        // Group all irreligious provinces together
                        const grouped: Array<{
                          religion: typeof window.world.religions[0]
                          count: number
                          isGrouped: boolean
                        }> = []
                        let irreligiousCount = 0

                        religionCounts.forEach(({ value, count }) => {
                          const religion = window.world.religions[value]
                          if (!religion) return

                          if (religion.type === 'irreligious') {
                            irreligiousCount += count
                          } else {
                            grouped.push({ religion, count, isGrouped: false })
                          }
                        })

                        // Add grouped irreligious at the end if any exist
                        if (irreligiousCount > 0) {
                          grouped.push({
                            religion: {
                              type: 'irreligious' as const,
                              display: { color: MAP_METRICS.religion.colors.irreligious, hue: 0 }
                            },
                            count: irreligiousCount,
                            isGrouped: true
                          })
                        }

                        return grouped
                          .sort((a, b) => b.count - a.count)
                          .slice(0, 5)
                          .map(({ religion, count, isGrouped }, i) => {
                            return (
                              <span
                                key={
                                  isGrouped ? 'irreligious-grouped' : religion.name ?? religion.type
                                }
                              >
                                <ColoredBox
                                  color={MAP_METRICS.religion.colors[religion.type]}
                                  border={true}
                                ></ColoredBox>{' '}
                                <StyledText
                                  text={`${
                                    isGrouped ? 'Irreligious' : religion.name ?? religion.type
                                  } (${TEXT.formatters.percent(count)})`}
                                ></StyledText>
                                {i !== grouped.length - 1 ? ', ' : ''}
                              </span>
                            )
                          })
                      })()}
                    </span>
                  )
                },
                {
                  label: `Relations (${neighbors.length})`,
                  content: (
                    <span>
                      {[...neighbors]
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
                              : opinion === 'vassal' ||
                                opinion === 'tributary' ||
                                opinion === 'personal union' ||
                                opinion === 'suzerain'
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
                        })}
                    </span>
                  )
                },
                {
                  label: `Provinces (${provinces.length})`,
                  content: <ProvincesSection provinces={provinces} />
                }
              ]}
            ></SectionList>
          </Grid>
        </Grid>
      }
    ></CodexPage>
  )
}
