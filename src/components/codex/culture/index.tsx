import { Divider, Grid } from '@mui/material'
import { range } from 'd3'

import { culture__regions, culture__values } from '../../../models/npcs/cultures'
import { lang__first, lang__last } from '../../../models/npcs/languages/words/actors'
import { species__map } from '../../../models/npcs/species'
import { properList, properSentences, titleCase } from '../../../models/utilities/text'
import { decorateText } from '../../../models/utilities/text/decoration'
import { view__context } from '../../context'
import { CodexPage } from '../common/CodexPage'
import { SectionList } from '../common/text/SectionList'
import { StyledText } from '../common/text/StyledText'
import { AgesView } from './Ages'
import { PhysiqueView } from './Physique'

export function CultureView() {
  const { state } = view__context()
  const culture = window.world.cultures[state.codex.culture]
  const { skin, hair, eyes } = culture.appearance
  const species = species__map[culture.species]
  const { patronymic, suffix } = culture.language.surnames
  const { male, female } = suffix
  const appearance = [
    {
      label: `${titleCase(species.traits.skin)}${
        skin.texture ? ` (${titleCase(skin.texture)})` : ''
      }`,
      content: properSentences(`${properList(skin.colors, 'or')}.`)
    },
    {
      label: 'Eyes',
      content: properSentences(`${properList(eyes.colors, 'or')}.`)
    }
  ]
  return (
    <CodexPage
      title={culture.name}
      subtitle={`${culture.zone} ${culture.species}`}
      content={
        <Grid container>
          <Grid item xs={12}>
            <SectionList
              list={[
                {
                  label: 'Regions',
                  content: (
                    <StyledText
                      text={culture__regions(culture)
                        .map(region => decorateText({ link: region, tooltip: region.development }))
                        .join(', ')}
                    ></StyledText>
                  )
                },
                {
                  label: 'Neighbors',
                  content: (
                    <StyledText
                      text={culture.neighbors
                        .map(n => {
                          const neighbor = window.world.cultures[n]
                          return decorateText({ link: neighbor, tooltip: neighbor.species })
                        })
                        .join(', ')}
                    ></StyledText>
                  )
                }
              ]}
            ></SectionList>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Divider>Appearance</Divider>
            <Grid container mt={1}>
              <Grid item xs={6}>
                <SectionList list={appearance}></SectionList>
              </Grid>
              <Grid item xs={6}>
                <SectionList
                  list={[
                    {
                      label: 'Color Scheme',
                      content: properSentences(`${culture.fashion.scheme}.`)
                    },
                    { label: 'Visual Motifs', content: properSentences(`${culture.motifs}.`) }
                  ]}
                ></SectionList>
              </Grid>
              {hair && (
                <Grid item xs={12}>
                  <SectionList
                    list={[
                      {
                        label: 'Hair',
                        content: properSentences(
                          `${properList(hair.colors, 'or')}. ${properList(
                            hair.textures,
                            'or'
                          )} texture.`
                        )
                      }
                    ]}
                  ></SectionList>
                </Grid>
              )}
              <Grid item xs={12} mt={1}>
                <PhysiqueView></PhysiqueView>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Divider>Values</Divider>
            <Grid container mt={1}>
              <Grid item xs={6}>
                <SectionList
                  list={culture.values.slice(0, 2).map(value => ({
                    label: titleCase(value),
                    content: properSentences(`${culture__values[value].text}.`)
                  }))}
                ></SectionList>
              </Grid>
              <Grid item xs={6}>
                <SectionList
                  list={culture.values.slice(2).map(value => ({
                    label: titleCase(value),
                    content: properSentences(`${culture__values[value].text}.`)
                  }))}
                ></SectionList>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={1}>
            <Divider>Names</Divider>
            <Grid container mt={1}>
              <SectionList
                list={[
                  {
                    label: 'Male',
                    content: Array.from(
                      new Set(range(10).map(() => lang__first(culture.language, 'male')))
                    ).join(', ')
                  },
                  {
                    label: 'Female',
                    content: Array.from(
                      new Set(range(10).map(() => lang__first(culture.language, 'female')))
                    ).join(', ')
                  },
                  {
                    label: `Family${
                      patronymic
                        ? ` (${culture.lineage === 'male' ? 'Patronymic' : 'Matronymic'})`
                        : ''
                    }`,
                    content: patronymic
                      ? `${male.join(', ')} (male) / ${female.join(', ')} (female)`
                      : Array.from(new Set(range(10).map(() => lang__last(culture.language)))).join(
                          ', '
                        )
                  }
                ]}
              ></SectionList>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={1}>
            <Divider>Ages</Divider>
            <AgesView></AgesView>
          </Grid>
        </Grid>
      }
    ></CodexPage>
  )
}
