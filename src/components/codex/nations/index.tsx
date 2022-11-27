import { Box, Divider, Grid } from '@mui/material'

import { rebellion__name } from '../../../models/history/encoding'
import { culture__decorations } from '../../../models/npcs/species/cultures'
import { region__population } from '../../../models/regions'
import { region__warRivals } from '../../../models/regions/diplomacy/relations'
import { region__isImperial } from '../../../models/regions/diplomacy/status'
import { location__isVillage } from '../../../models/regions/locations/spawn/taxonomy/settlements'
import { province__hub } from '../../../models/regions/provinces'
import { Region } from '../../../models/regions/types'
import { titleCase } from '../../../models/utilities/text'
import { decorateText } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { climates } from '../../../models/world/climate/types'
import { view__context } from '../../context'
import { cssColors } from '../../theme/colors'
import { CodexPage } from '../common/CodexPage'
import { SectionList } from '../common/text/SectionList'
import { StyledText } from '../common/text/StyledText'
import { Geography } from './Geography'

const government = (nation: Region) => {
  const { government, civilized } = nation
  const overlord = window.world.regions[nation.overlord.idx]
  const empire = region__isImperial(nation)
  const tier = empire ? 'empire' : 'kingdom'
  const vassal = `${
    overlord
      ? `, ${decorateText({
          label: 'vassal',
          link: overlord,
          tooltip: overlord?.name ?? undefined,
          color: cssColors.subtitle
        })}`
      : ''
  }`
  if (nation.provinces.length === 1) {
    return `free city${vassal}`
  } else if (government.structure === 'autocratic') {
    return `autocratic ${tier}${vassal}`
  } else if (government.structure === 'theocratic') {
    return `theocratic ${tier}${vassal}`
  } else if (government.structure === 'oligarchic') {
    return `feudal ${tier}${vassal}`
  } else if (government.structure === 'confederation') {
    return `${civilized ? 'city-state' : 'tribal'} ${
      empire ? 'federation' : 'confederacy'
    }${vassal}`
  } else {
    return `anarchic ${empire ? 'kingdoms' : civilized ? 'warlords' : 'tribes'}${vassal}`
  }
}

export function NationView() {
  const { state } = view__context()
  const nation = window.world.regions[state.codex.nation]
  const climate = climates[nation.climate]
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
    return war
  })
  const currentRebellions = rebellions.map(subject => {
    const rebellion = window.world.rebellions[subject.rebellions.current]
    return rebellion
  })
  const conflicts = [...currentWars, ...currentRebellions]
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
          text={`(${nation.idx}) ${government(nation)} (${climate.zone.toLowerCase()}, ${
            nation.development
          })`}
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
                {
                  label: 'Religion',
                  content: (
                    <StyledText
                      text={decorateText({
                        link: window.world.religions[religion.state]
                      })}
                    ></StyledText>
                  )
                }
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
                }
              ]}
            ></SectionList>
          </Grid>
          {conflicts.length > 0 && (
            <Grid item xs={12} mt={2}>
              <Divider>Conflicts</Divider>
              <Box py={1}>
                <SectionList
                  list={conflicts.map(conflict => {
                    return {
                      label: `${
                        conflict.type === 'rebellion' ? rebellion__name(conflict) : conflict.name
                      }`,
                      content: (
                        <span>
                          <i>{titleCase(conflict.background.type)}. </i>
                          <StyledText text={conflict.background.text}></StyledText>
                        </span>
                      )
                    }
                  })}
                ></SectionList>
              </Box>
            </Grid>
          )}
          <Grid item xs={12} mt={conflicts.length > 0 ? 1 : 2}>
            <Divider>Geography</Divider>
            <Box py={1}>
              <Geography></Geography>
            </Box>
          </Grid>
        </Grid>
      }
    ></CodexPage>
  )
}
