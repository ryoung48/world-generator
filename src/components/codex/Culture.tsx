import { Divider, Grid } from '@mui/material'
import { useMemo } from 'react'

import { CULTURE } from '../../models/heritage'
import { LANGUAGE } from '../../models/heritage/languages'
import { PhonemeCatalog } from '../../models/heritage/languages/types'
import { SPECIES } from '../../models/heritage/species'
import { PROVINCE } from '../../models/provinces'
import { TEXT } from '../../models/utilities/text'
import { CodexPage } from '../common/CodexPage'
import { SectionList } from '../common/text/SectionList'
import { StyledText } from '../common/text/styled'
import { VIEW } from '../context'
import { cssColors } from '../theme/colors'

export function CultureView() {
  const { state } = VIEW.context()
  const cultureIdx = state.codex.idx
  if (cultureIdx === undefined) return <span>No culture selected</span>

  const culture = window.world.cultures[cultureIdx]
  if (!culture) return <span>Culture not found</span>
  const { skin } = culture.appearance
  const species = culture.species
  const region = CULTURE.origin(culture)
  const climate = PROVINCE.climate(region)
  const language = CULTURE.language(culture)
  const religion = CULTURE.religion(culture)

  const provinces = culture.provinces.map(idx => window.world.provinces[idx]).filter(Boolean)

  const totalPopulation = provinces.reduce((sum, province) => sum + province.population, 0)

  // Generate sample names
  const sampleMaleNames = useMemo(
    () => language ? Array.from({ length: 10 }, () => LANGUAGE.word.firstName(language, 'male').word) : [],
    [state.codex]
  )
  const sampleFemaleNames = useMemo(
    () =>
      language ? Array.from({ length: 10 }, () => LANGUAGE.word.firstName(language, 'female').word) : [],
    [state.codex]
  )

  return (
    <CodexPage
      title={culture.name}
      subtitle={
        <span>
          <span style={{ color: cssColors.subtitle }}>
            ({culture.idx}) culture ({culture.species}, {climate}, {religion?.name ?? religion?.type ?? 'unassigned'})
          </span>
        </span>
      }
      content={
        <Grid container>
          <Grid item xs={6}>
            <SectionList
              list={[
                {
                  label: 'Population',
                  content: <span>{TEXT.formatters.compact(totalPopulation)}</span>
                },
                {
                  label: 'Values',
                  content: (
                    <StyledText
                      text={culture.values
                        .map(value =>
                          TEXT.decorate({
                            label: value,
                            tooltip: CULTURE.values[value].text.toString()
                          })
                        )
                        .join(', ')}
                    ></StyledText>
                  )
                }
              ]}
            />
          </Grid>
          <Grid item xs={6}>
            <SectionList
              list={[
                {
                  label: 'Appearance',
                  content: `${TEXT.formatters.list(skin.colors, 'or')} ${
                    SPECIES.lookup[species].traits.skin
                  } ${skin.texture ? ` (${skin.texture})` : ''}`
                },
                { label: 'Fashion', content: culture.fashion.scheme }
              ]}
            />
          </Grid>
          <Grid item xs={12} mt={2}>
            <Divider style={{ fontSize: '10px', fontWeight: 600 }}>Language</Divider>
          </Grid>
          <Grid item xs={12} mt={1}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <SectionList
                  list={[
                    {
                      label: 'Male Names',
                      content: sampleMaleNames.join(', ')
                    }
                  ]}
                />
              </Grid>
              <Grid item xs={6}>
                <SectionList
                  list={[
                    {
                      label: 'Female Names',
                      content: sampleFemaleNames.join(', ')
                    }
                  ]}
                />
              </Grid>
              <Grid item xs={12}>
                <SectionList
                  list={[
                    {
                      label: 'Start Consonants',
                      content: language?.phonemes[PhonemeCatalog.START_CONSONANT]
                        .sort((a, b) => b.w - a.w)
                        .slice(0, 8)
                        .map(p => `${p.v} (${Math.round(p.w * 100)}%)`)
                        .join(', ') ?? 'N/A'
                    },
                    {
                      label: 'Middle Consonants',
                      content: language?.phonemes[PhonemeCatalog.MIDDLE_CONSONANT]
                        .sort((a, b) => b.w - a.w)
                        .slice(0, 8)
                        .map(p => `${p.v} (${Math.round(p.w * 100)}%)`)
                        .join(', ') ?? 'N/A'
                    },
                    {
                      label: 'End Consonants',
                      content: language?.phonemes[PhonemeCatalog.END_CONSONANT]
                        .sort((a, b) => b.w - a.w)
                        .slice(0, 8)
                        .map(p => `${p.v} (${Math.round(p.w * 100)}%)`)
                        .join(', ') ?? 'N/A'
                    }
                  ]}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SectionList
                  list={[
                    {
                      label: 'Start Vowels',
                      content: language?.phonemes[PhonemeCatalog.START_VOWEL]
                        .sort((a, b) => b.w - a.w)
                        .slice(0, 8)
                        .map(p => `${p.v} (${Math.round(p.w * 100)}%)`)
                        .join(', ') ?? 'N/A'
                    },
                    {
                      label: 'Middle Vowels',
                      content: language?.phonemes[PhonemeCatalog.MIDDLE_VOWEL]
                        .sort((a, b) => b.w - a.w)
                        .slice(0, 8)
                        .map(p => `${p.v} (${Math.round(p.w * 100)}%)`)
                        .join(', ') ?? 'N/A'
                    },
                    {
                      label: 'Back Vowels',
                      content: language?.phonemes[PhonemeCatalog.BACK_VOWEL]
                        .sort((a, b) => b.w - a.w)
                        .slice(0, 8)
                        .map(p => `${p.v} (${Math.round(p.w * 100)}%)`)
                        .join(', ') ?? 'N/A'
                    },
                    {
                      label: 'End Vowels',
                      content: language?.phonemes[PhonemeCatalog.END_VOWEL]
                        .sort((a, b) => b.w - a.w)
                        .slice(0, 8)
                        .map(p => `${p.v} (${Math.round(p.w * 100)}%)`)
                        .join(', ') ?? 'N/A'
                    }
                  ]}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      }
    />
  )
}
