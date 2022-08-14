import { Grid } from '@mui/material'

import { view__context } from '../../../context'
import { actor__location } from '../../../models/npcs/actors'
import { location__is_settlement } from '../../../models/regions/locations'
import { location__terrain } from '../../../models/regions/locations/environment'
import { location__threads } from '../../../models/regions/locations/spawn/threads'
import { thread__collect } from '../../../models/threads'
import { decorate_text } from '../../../models/utilities/text/decoration'
import { css_colors } from '../../theme/colors'
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
  const settlement = location__is_settlement(location)
  if (settlement) {
    tabs.push({ label: 'society', content: <SocietyView></SocietyView> })
    const avatar = window.world.actors[state.avatar]
    if (avatar && actor__location(avatar) === location) {
      const available = location__threads({ loc: location, avatar })
      const { active, closed } = thread__collect(avatar)
      tabs.push({
        label: 'quests',
        content: (
          <ThreadList
            available={available}
            active={active.sort((a, b) => {
              const a_loc = a.location === avatar.location.curr ? 1 : 0
              const b_loc = b.location === avatar.location.curr ? 1 : 0
              return b_loc - a_loc
            })}
            closed={closed}
          ></ThreadList>
        )
      })
    }
  }
  tabs.push({ label: 'travel', content: <TravelView></TravelView> })
  return (
    <CodexPage
      title={location.name}
      subtitle={
        <StyledText
          color={css_colors.subtitle}
          text={`(${location.idx}) ${type}, ${decorate_text({
            link: window.world.regions[province.curr_nation]
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
                      text={decorate_text({
                        label: key,
                        tooltip: climate
                      })}
                    ></StyledText>
                  )
                }
              ]}
            ></SectionList>
          </Grid>
          <Grid item xs={12}>
            <StyledTabs active={state.codex.current === 'location'} tabs={tabs}></StyledTabs>
          </Grid>
        </Grid>
      }
    ></CodexPage>
  )
}
