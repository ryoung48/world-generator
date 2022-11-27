import { Box, Divider, Grid } from '@mui/material'

import { culture__decorations } from '../../../models/npcs/species/cultures'
import { Religion } from '../../../models/npcs/species/religions/types'
import { titleCase } from '../../../models/utilities/text'
import { decorateText } from '../../../models/utilities/text/decoration'
import { view__context } from '../../context'
import { cssColors } from '../../theme/colors'
import { CodexPage } from '../common/CodexPage'
import { SectionList } from '../common/text/SectionList'
import { StyledText } from '../common/text/StyledText'

const leadershipText: Record<Religion['leadership'], string> = {
  pontiff:
    'There is a single pontiff with a layer of upper clergy and temple heads beneath them, who have a layer of minor clergy serving them',
  bishops:
    'There are multiple pontiffs, friendly or otherwise, with subordinate clergy obedient to their own pontiff and perhaps cooperative with others.',
  priests:
    'Each holy man or woman is the autonomous leader of their own branch of the sect, with however many followers they can gather.',
  none: 'There is no official clergy; some believers may take up special roles or provide teaching, but they are not qualitatively different from others.',
  secular:
    'The church is entirely part of the secular structure of the land, its clergy no more than officials appointed by the government to their roles.'
}

const clergyFamily: Record<Religion['clergy']['family'], string> = {
  none: 'never have families (celibacy is required)',
  rare: 'seldomly have families (celibacy is encouraged)',
  normal: 'are allowed to marry and typically have normal sized families',
  large: 'are encouraged to marry and typically have large families'
}

export function ReligionView() {
  const { state } = view__context()
  const religion = window.world.religions[state.codex.religion]
  if (!religion) return <span>nothing here :)</span>
  const { leadership, clergy } = religion
  return (
    <CodexPage
      title={religion.name}
      subtitle={
        <StyledText
          color={cssColors.subtitle}
          text={`[${religion.idx}] Religion (${decorateText({
            label: religion.type,
            color: cssColors.subtitle
          })})`}
        ></StyledText>
      }
      content={
        <Grid container>
          <Grid item xs={12}>
            <SectionList
              list={[
                {
                  label: 'Cultures',
                  content: (
                    <StyledText
                      text={religion.cultures
                        .map(idx => {
                          const culture = window.world.cultures[idx]
                          return culture__decorations({
                            culture,
                            title: true
                          })
                        })
                        .join(', ')}
                    ></StyledText>
                  )
                }
              ]}
            ></SectionList>
          </Grid>
          <Grid item xs={12} my={1}>
            <Divider>Organization</Divider>
          </Grid>
          <Grid item xs={12}>
            <SectionList
              list={[
                {
                  label: 'Leadership',
                  content: (
                    <span>
                      <i>{titleCase(leadership)}.</i> {leadershipText[leadership]}
                    </span>
                  )
                },
                {
                  label: 'Clergy',
                  content: (
                    <span>
                      The clergy{' '}
                      {clergy.gender
                        ? `is restricted to ${clergy.gender === 'male' ? 'men' : 'women'}`
                        : 'does not have any gender restrictions'}
                      . Priests {clergyFamily[clergy.family]}.
                    </span>
                  )
                }
              ]}
            ></SectionList>
          </Grid>
          {religion.traits.length > 0 && (
            <Grid item xs={12} my={1}>
              <Divider>Traits</Divider>
              <Box py={1}>
                <SectionList
                  list={religion.traits.map(trait => ({
                    label: titleCase(trait.tag),
                    content: <StyledText text={trait.text}></StyledText>
                  }))}
                ></SectionList>
              </Box>
            </Grid>
          )}
        </Grid>
      }
    ></CodexPage>
  )
}
