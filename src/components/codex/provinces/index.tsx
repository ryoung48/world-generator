import { Box, Divider, Grid } from '@mui/material'
import { Fragment } from 'react'

import { PROVINCE } from '../../../models/regions/provinces'
import { hub__traits } from '../../../models/regions/provinces/hubs/traits'
import { WEATHER } from '../../../models/regions/provinces/weather'
import { titleCase } from '../../../models/utilities/text'
import { decorateText } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { VIEW } from '../../context'
import { cssColors } from '../../theme/colors'
import { CodexPage } from '../common/CodexPage'
import { SectionList } from '../common/text/SectionList'
import { StyledText } from '../common/text/StyledText'
import { HooksView } from './Hooks'
import { PlayerCharacterView } from './PCs'
// import { QuestList } from './quests'

export function ProvinceView() {
  const { state } = VIEW.context()
  const province = window.world.provinces[state.province]
  const traits = hub__traits(province.hub)
  const { common } = PROVINCE.demographics(province)
  const cultureCount = 5
  const other = common.slice(cultureCount).reduce((sum, { w }) => sum + w, 0)
  const avatarSpawned = state.avatar.pcs.length > 0
  const biome = PROVINCE.biome(province)
  const cell = PROVINCE.cell(province)
  return (
    <CodexPage
      title={province.name}
      subtitle={
        <StyledText
          color={cssColors.subtitle}
          text={`(${province.idx}) ${province.hub.type}, ${decorateText({
            link: PROVINCE.nation(province)
          })}`}
        ></StyledText>
      }
      content={
        <Grid container>
          <Grid item xs={6} mt={1}>
            <Box pt={1}>
              <SectionList
                list={[
                  {
                    label: 'Environment',
                    content: (
                      <StyledText
                        text={`${titleCase(biome.name)} (${
                          cell.isMountains
                            ? decorateText({
                                label: 'mountainous',
                                tooltip: biome.altitude
                              })
                            : biome.latitude
                        })`}
                      ></StyledText>
                    )
                  }
                ]}
              ></SectionList>
            </Box>
          </Grid>
          <Grid item xs={6} mt={1}>
            <Box pt={1}>
              <SectionList
                list={[
                  {
                    label: 'Weather',
                    content: <StyledText text={WEATHER.conditions({ loc: province })}></StyledText>
                  }
                ]}
              ></SectionList>
            </Box>
          </Grid>
          <Grid item xs={12} mt={0}>
            <Box py={0}>
              <SectionList
                list={[
                  {
                    label: `Demographics`,
                    content: (
                      <span>
                        <i>
                          {formatters.compact(province.hub.population).toLowerCase()} inhabitants.{' '}
                        </i>
                        <StyledText
                          text={common
                            .slice(0, cultureCount)
                            .map(({ v, w }) => {
                              const culture = window.world.cultures[v]
                              const { name, species } = culture
                              return `${decorateText({
                                label: name,
                                link: culture,
                                tooltip: species
                              })} (${formatters.percent(w)})`
                            })
                            .concat(other > 0 ? [`Other (${formatters.percent(other)})`] : [])
                            .join(', ')}
                        ></StyledText>
                      </span>
                    )
                  },
                  {
                    label: `Important Locals`,
                    content: (
                      <span>
                        <StyledText
                          text={traits.locals
                            .map(i => {
                              const npc = window.world.npcs[i]
                              return `${decorateText({
                                link: npc
                              })}`
                            })
                            .join(', ')}
                        ></StyledText>
                      </span>
                    )
                  }
                ]}
              ></SectionList>
            </Box>
          </Grid>
          {avatarSpawned && (
            <Fragment>
              <Grid item xs={12}>
                <PlayerCharacterView></PlayerCharacterView>
              </Grid>
              <Grid item xs={12} mt={1}>
                <Divider>Hooks</Divider>
              </Grid>
              <Grid item xs={12} mt={1}>
                <HooksView entity={province}></HooksView>
                {/* <QuestList></QuestList> */}
              </Grid>
            </Fragment>
          )}
        </Grid>
      }
    ></CodexPage>
  )
}
