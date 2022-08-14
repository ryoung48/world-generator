import { Grid } from '@mui/material'

import { view__context } from '../../../context'
import { decorated_culture } from '../../../models/npcs/species/humanoids/cultures'
import { region__population } from '../../../models/regions'
import { region__war_rivals } from '../../../models/regions/diplomacy/relations'
import { location__is_village } from '../../../models/regions/locations/spawn/taxonomy/settlements'
import { province__hub } from '../../../models/regions/provinces'
import { decorate_text } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { climate_lookup } from '../../../models/world/climate/types'
import { css_colors } from '../../theme/colors'
import { CodexPage } from '../common/CodexPage'
import { StyledTabs } from '../common/navigation/StyledTabs'
import { SectionList } from '../common/text/SectionList'
import { StyledText } from '../common/text/StyledText'
import { Geography } from './Geography'

export function NationView() {
  const { state } = view__context()
  const nation = window.world.regions[state.codex.nation]
  const climate = climate_lookup[nation.climate]
  const overlord = window.world.regions[nation.overlord.idx]
  const { regions, religion } = nation
  const rebellions = regions
    .map(p => {
      const province = window.world.provinces[p]
      return window.world.regions[province.region]
    })
    .filter(region => region.rebellions.current !== -1)
  const ruling = window.world.cultures[nation.culture.ruling]
  const native = window.world.cultures[nation.culture.native]
  const current_wars = region__war_rivals(nation).map(rival => {
    const war = rival.wars.current
      .map(i => window.world.wars[i])
      .find(w => {
        return w.invader.idx === nation.idx || w.defender.idx === nation.idx
      })
    return decorate_text({
      link: war,
      label: rival.name,
      tooltip: `${war.name}`
    })
  })
  const current_rebellions = rebellions.map(subject => {
    const rebellion = window.world.rebellions[subject.rebellions.current]
    return decorate_text({
      label: subject.name,
      link: rebellion,
      tooltip: rebellion.name
    })
  })
  const conflicts = current_wars.concat(current_rebellions)
  const total_pop = region__population(nation)
  const urban_pop = nation.provinces
    .map(i => province__hub(window.world.provinces[i]))
    .filter(hub => !location__is_village(hub))
    .reduce((sum, hub) => sum + hub.population, 0)
  return (
    <CodexPage
      title={nation.name}
      subtitle={
        <StyledText
          color={css_colors.subtitle}
          text={`(${nation.idx}) ${
            overlord
              ? decorate_text({
                  label: 'Vassal',
                  link: overlord,
                  tooltip: overlord?.name ?? undefined,
                  color: css_colors.subtitle
                })
              : 'Nation'
          } (${climate.zone.toLowerCase()}, ${nation.development})`}
        ></StyledText>
      }
      content={
        <Grid container>
          <Grid item xs={6}>
            <SectionList
              list={[
                {
                  label: 'Culture',
                  content: (
                    <StyledText
                      text={`${decorated_culture({ culture: ruling, title: true })}${
                        ruling !== native
                          ? `, ${decorated_culture({
                              culture: native,
                              title: true,
                              color: css_colors.subtitle
                            })}`
                          : ''
                      }`}
                    ></StyledText>
                  )
                },
                { label: 'Religion', content: window.world.religions[religion.state].name }
              ]}
            ></SectionList>
          </Grid>
          <Grid item xs={6}>
            <SectionList
              list={[
                {
                  label: 'Population',
                  content: `${formatters.compact(total_pop)} (${(
                    (urban_pop / total_pop) *
                    100
                  ).toFixed(0)}% Urban)`
                },
                {
                  label: 'Conflicts',
                  content: (
                    <StyledText
                      text={conflicts.length > 0 ? conflicts.join(', ') : 'None'}
                    ></StyledText>
                  )
                }
              ]}
            ></SectionList>
          </Grid>
          <Grid item xs={12} mt={5}>
            <StyledTabs
              active={state.codex.current === 'nation'}
              tabs={[
                { label: 'geography', content: <Geography></Geography> },
                { label: 'politics', content: 'politics tab content' },
                { label: 'history', content: 'history tab content' }
              ]}
            ></StyledTabs>
          </Grid>
        </Grid>
      }
    ></CodexPage>
  )
}
