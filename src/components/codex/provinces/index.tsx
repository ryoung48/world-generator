import { Box, Grid } from '@mui/material'
import { scaleLinear } from 'd3'

import { hub__traits } from '../../../models/regions/hubs/traits'
import { province__weather } from '../../../models/regions/hubs/weather'
import { province__demographics } from '../../../models/regions/provinces/network'
import { avatar__lvl, npc__lvl } from '../../../models/threads/difficulty'
import { titleCase } from '../../../models/utilities/text'
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
import { ThreadList } from './threads'

const hpColorScale = scaleLinear()
  .domain([0, 0.5, 1])
  .range(['red', 'orange', 'green'] as any)

export function ProvinceView() {
  const { state } = view__context()
  const province = window.world.provinces[state.codex.province]
  const region = window.world.regions[province.region]
  const climate = climates[region.climate]
  const traits = hub__traits(province.hub)
  const demographics: Parameters<typeof SectionList>[0]['list'] = []
  const { common } = province__demographics(province)
  const cultureCount = 5
  const other = common.slice(cultureCount).reduce((sum, { w }) => sum + w, 0)
  demographics.push(
    ...[
      {
        label: `Population (${formatters.compact(province.hub.population).toLowerCase()})`,
        content: (
          <span>
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
    ]
  )
  if (state.avatar.pcs.length > 0) {
    demographics.push({
      label: (
        <span>
          PCs<sup>{avatar__lvl(state.avatar).toFixed(2)}</sup> (
          {formatters.compact(state.avatar.cp)} cp)
        </span>
      ),
      content: (
        <span>
          {state.avatar.pcs.map((a, i) => {
            const actor = window.world.npcs[a]
            const health = actor.health
            return (
              <span key={actor.idx}>
                <StyledText text={decorateText({ link: actor })}></StyledText>
                <StyledText
                  text={` (${decorateText({
                    label: formatters.percent(health),
                    color: hpColorScale(health).toString(),
                    tooltip:
                      health === 0
                        ? 'defeated'
                        : health < 0.3
                        ? 'near death'
                        : health < 0.6
                        ? 'bloodied'
                        : 'healthy'
                  })})${i < state.avatar.pcs.length - 1 ? ',' : ''}`}
                ></StyledText>
                <sup>{npc__lvl(actor).toFixed(2)}</sup>
                <span>{i < state.avatar.pcs.length - 1 ? ' ' : ''}</span>
              </span>
            )
          })}
        </span>
      )
    })
  }
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
                  { label: 'Climate', content: `${titleCase(climate.type)} (${climate.code})` },
                  { label: 'Leadership', content: traits.leadership }
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
                    content: <StyledText text={province__weather(province).text}></StyledText>
                  },
                  { label: 'History', content: traits.history }
                ]}
              ></SectionList>
            </Box>
          </Grid>
          <Grid item xs={12} mt={0}>
            <Box py={0}>
              <SectionList list={demographics}></SectionList>
            </Box>
          </Grid>
          {state.avatar.pcs.length > 0 && (
            <Grid item xs={12} mt={1}>
              <StyledTabs
                active={state.codex.current === 'province'}
                tabs={[
                  { label: 'Hooks', content: <ThreadList></ThreadList> },
                  { label: 'Market', content: <MarketView></MarketView> }
                ]}
              ></StyledTabs>
            </Grid>
          )}
        </Grid>
      }
    ></CodexPage>
  )
}
