import { Grid } from '@mui/material'

import { actor__location } from '../../../models/npcs/actors'
import { location__isSettlement } from '../../../models/regions/locations'
import { location__terrain } from '../../../models/regions/locations/environment'
import { location__fillPlaceholder } from '../../../models/regions/locations/spawn/placeholders'
import { location__threads } from '../../../models/regions/locations/spawn/threads'
import { thread__collect } from '../../../models/threads'
import { properSentences, titleCase } from '../../../models/utilities/text'
import { decorateText } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { view__context } from '../../context'
import { cssColors } from '../../theme/colors'
import { CodexPage } from '../common/CodexPage'
import { StyledTabs } from '../common/navigation/StyledTabs'
import { SectionList } from '../common/text/SectionList'
import { StyledText } from '../common/text/StyledText'
import { SocietyView } from './society'
import { ThreadList } from './threads'
import { TravelView } from './travel'
import { WeatherView } from './weather'

export function LocationView() {
  const { state } = view__context()
  const location = window.world.locations[state.codex.location]
  const province = window.world.provinces[location.province]
  const { key } = location__terrain(location)
  const climate = window.world.regions[province.region].climate
  const type = location.subtype ?? location.type
  const tabs = [{ label: 'weather', content: <WeatherView></WeatherView> }]
  const settlement = location__isSettlement(location)
  if (settlement) {
    tabs.push({ label: 'society', content: <SocietyView></SocietyView> })
  }
  const avatar = window.world.actors[state.avatar]
  if (avatar && actor__location(avatar) === location && (settlement || location.hostile)) {
    const available = location__threads({ loc: location, avatar })
    const { active, closed } = thread__collect(avatar)
    tabs.push({
      label: 'quests',
      content: (
        <ThreadList
          available={available}
          active={active.sort((a, b) => {
            const aLoc = a.location === avatar.location.curr ? 1 : 0
            const bLoc = b.location === avatar.location.curr ? 1 : 0
            return bLoc - aLoc
          })}
          closed={closed}
        ></ThreadList>
      )
    })
  }
  tabs.push({ label: 'travel', content: <TravelView></TravelView> })
  const details = [
    {
      label: 'Terrain',
      content: (
        <StyledText
          text={decorateText({
            label: key,
            tooltip: climate
          })}
        ></StyledText>
      )
    }
  ]
  if (location.traits.length > 0)
    details.push({
      label: 'Hooks',
      content: (
        <StyledText
          text={properSentences(
            location__fillPlaceholder({
              loc: location,
              text: location.traits
                .map(
                  trait =>
                    `${decorateText({ label: titleCase(trait.tag), italics: true })}. ${trait.text}`
                )
                .join(' ')
            })
          )}
        ></StyledText>
      )
    })
  return (
    <CodexPage
      title={location.name}
      subtitle={
        <StyledText
          color={cssColors.subtitle}
          text={`(${location.idx}) ${type}, ${decorateText({
            link: window.world.regions[province.currNation]
          })}`}
        ></StyledText>
      }
      content={
        <Grid container>
          <Grid item xs={6}>
            <SectionList
              list={[
                {
                  label: 'Terrain',
                  content: (
                    <StyledText
                      text={decorateText({
                        label: key,
                        tooltip: climate
                      })}
                    ></StyledText>
                  )
                }
              ]}
            ></SectionList>
          </Grid>
          {location.population > 0 && (
            <Grid item xs={6}>
              <SectionList
                list={[
                  {
                    label: 'Population',
                    content: formatters.compact(location.population)
                  }
                ]}
              ></SectionList>
            </Grid>
          )}
          {location.traits.length > 0 && (
            <Grid item xs={12}>
              <SectionList
                list={[
                  {
                    label: 'Hooks',
                    content: (
                      <StyledText
                        text={properSentences(
                          location__fillPlaceholder({
                            loc: location,
                            text: location.traits
                              .map(
                                trait =>
                                  `${decorateText({
                                    label: titleCase(trait.tag),
                                    italics: true
                                  })}. ${trait.text}`
                              )
                              .join(' ')
                          })
                        )}
                      ></StyledText>
                    )
                  }
                ]}
              ></SectionList>
            </Grid>
          )}
          <Grid item xs={12}>
            <StyledTabs active={state.codex.current === 'location'} tabs={tabs}></StyledTabs>
          </Grid>
        </Grid>
      }
    ></CodexPage>
  )
}
