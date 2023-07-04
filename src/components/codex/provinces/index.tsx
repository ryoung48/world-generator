import { Box, Grid } from '@mui/material'
import { Fragment } from 'react'

import { province__traits } from '../../../models/quests/hooks'
import { hub__traits } from '../../../models/regions/provinces/hubs/traits'
import { province__demographics } from '../../../models/regions/provinces/network'
import { properSentences, titleCase } from '../../../models/utilities/text'
import { decorateText } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { climates } from '../../../models/world/climate/types'
import { view__context } from '../../context'
import { cssColors } from '../../theme/colors'
import { CodexPage } from '../common/CodexPage'
import { StyledTabs } from '../common/navigation/StyledTabs'
import { SectionList } from '../common/text/SectionList'
import { StyledText } from '../common/text/StyledText'
import { MarketView } from './Market'
import { QuestGen } from './QuestGen'

export function ProvinceView() {
  const { state } = view__context()
  const province = window.world.provinces[state.province]
  const region = window.world.regions[province.region]
  const climate = climates[region.climate]
  const traits = hub__traits(province.hub)
  const { common } = province__demographics(province)
  const cultureCount = 5
  const other = common.slice(cultureCount).reduce((sum, { w }) => sum + w, 0)
  const avatarSpawned = state.avatar.pcs.length > 0
  return (
    <CodexPage
      title={province.name}
      subtitle={
        <StyledText
          color={cssColors.subtitle}
          text={`(${province.idx}) ${province.hub.type}, ${decorateText({
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
                  {
                    label: 'Terrain',
                    content: (
                      <StyledText
                        text={`${titleCase(province.environment.terrain)} (${decorateText({
                          label: province.environment.climate,
                          tooltip: `${titleCase(climate.name)} (${climate.code})`
                        })})`}
                      ></StyledText>
                    )
                  },
                  { label: 'Leadership', content: traits.leadership }
                ]}
              ></SectionList>
            </Box>
          </Grid>
          <Grid item xs={6} mt={1}>
            <Box pt={1}>
              <SectionList
                list={[
                  { label: 'Design', content: traits.design },
                  {
                    label: 'Hooks',
                    content: (
                      <StyledText
                        text={province__traits(province)
                          .map(trait =>
                            decorateText({
                              label: titleCase(trait.tag),
                              tooltip: properSentences(`${trait.text}.`)
                            })
                          )
                          .join(', ')}
                      ></StyledText>
                    )
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
                    label: `Defenses`,
                    content: <span>{traits.defenses}</span>
                  },
                  {
                    label: `Commerce`,
                    content: <span>{traits.commerce}</span>
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
              <Grid item xs={12} mt={1}>
                <StyledTabs
                  active
                  tabs={[
                    { label: 'Quest', content: <QuestGen province={province}></QuestGen> },
                    { label: 'Market', content: <MarketView></MarketView> }
                  ]}
                ></StyledTabs>
              </Grid>
            </Fragment>
          )}
        </Grid>
      }
    ></CodexPage>
  )
}
