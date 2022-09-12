import { Grid } from '@mui/material'

import { culture__decorations } from '../../../models/npcs/species/cultures'
import { region__population } from '../../../models/regions'
import { region__warRivals } from '../../../models/regions/diplomacy/relations'
import { location__isVillage } from '../../../models/regions/locations/spawn/taxonomy/settlements'
import { province__hub } from '../../../models/regions/provinces'
import { decorateText } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { climateLookup } from '../../../models/world/climate/types'
import { view__context } from '../../context'
import { cssColors } from '../../theme/colors'
import { CodexPage } from '../common/CodexPage'
import { SectionList } from '../common/text/SectionList'
import { StyledText } from '../common/text/StyledText'
import { Geography } from './Geography'

export function NationView() {
  const { state } = view__context()
  const nation = window.world.regions[state.codex.nation]
  const climate = climateLookup[nation.climate]
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
  const currentWars = region__warRivals(nation).map(rival => {
    const war = rival.wars.current
      .map(i => window.world.wars[i])
      .find(w => {
        return w.invader.idx === nation.idx || w.defender.idx === nation.idx
      })
    return decorateText({
      label: rival.name,
      tooltip: `${war.name}`
    })
  })
  const currentRebellions = rebellions.map(subject => {
    const rebellion = window.world.rebellions[subject.rebellions.current]
    return decorateText({
      label: subject.name,
      tooltip: rebellion.name
    })
  })
  const conflicts = currentWars.concat(currentRebellions)
  const totalPop = region__population(nation)
  const urbanPop = nation.provinces
    .map(i => province__hub(window.world.provinces[i]))
    .filter(hub => !location__isVillage(hub))
    .reduce((sum, hub) => sum + hub.population, 0)
  return (
    <CodexPage
      title={nation.name}
      subtitle={
        <StyledText
          color={cssColors.subtitle}
          text={`(${nation.idx}) ${
            overlord
              ? decorateText({
                  label: 'Vassal',
                  link: overlord,
                  tooltip: overlord?.name ?? undefined,
                  color: cssColors.subtitle
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
                      text={`${culture__decorations({ culture: ruling, title: true })}${
                        ruling !== native
                          ? `, ${culture__decorations({
                              culture: native,
                              title: true,
                              color: cssColors.subtitle
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
                  content: `${formatters.compact(totalPop)} (${(
                    (urbanPop / totalPop) *
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
          <Grid item xs={12} mt={3}>
            <Geography></Geography>
          </Grid>
        </Grid>
      }
    ></CodexPage>
  )
}
