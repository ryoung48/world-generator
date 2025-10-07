import { Grid } from '@mui/material'

import { PROVINCE } from '../../models/provinces'
import { HUB } from '../../models/provinces/hubs'
import { TEXT } from '../../models/utilities/text'
import { CodexPage } from '../common/CodexPage'
import { SectionList } from '../common/text/SectionList'
import { StyledText } from '../common/text/styled'
import { VIEW } from '../context'
import { cssColors } from '../theme/colors'

export function ActorView() {
  const { state } = VIEW.context()
  const actor = window.world.actors?.[state.codex.idx]
  if (!actor) return <span>Actor not found</span>

  const culture = window.world.cultures[actor.culture]
  const province = window.world.provinces[actor.province]

  return (
    <CodexPage
      title={actor.name}
      subtitle={
        <span>
          <span style={{ color: cssColors.subtitle }}>
            ({actor.idx}) {actor.age}, {actor.gender} {culture.species}, {actor.profession.title}
          </span>
        </span>
      }
      content={
        <Grid container>
          <Grid item xs={12}>
            <SectionList
              list={[
                {
                  label: 'Location',
                  content: (
                    <StyledText
                      text={TEXT.decorate({
                        link: province,
                        label: province.name,
                        tooltip: HUB.settlement(PROVINCE.hub(province))
                      })}
                    ></StyledText>
                  )
                },
                { label: 'Appearance', content: actor.appearance },
                { label: 'Personality', content: actor.personality.join(', ') },
                {
                  label: 'Quirks',
                  content: (
                    <StyledText text={actor.quirks.map(({ text }) => text).join(', ')}></StyledText>
                  )
                }
              ]}
            />
          </Grid>
        </Grid>
      }
    />
  )
}
