import { view__context } from '../../../context'
import { actor__location } from '../../../models/npcs/actors'
import { actor__expired } from '../../../models/npcs/actors/stats/age'
import { species__by_culture } from '../../../models/npcs/species/humanoids/taxonomy'
import { species__size_rank } from '../../../models/npcs/species/size'
import { province__hub } from '../../../models/regions/provinces'
import { decorate_text } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { css_colors } from '../../theme/colors'
import { CodexPage } from '../common/CodexPage'
import { StyledTabs } from '../common/navigation/StyledTabs'
import { StyledText } from '../common/text/StyledText'
import { ActorStatistics } from './stats'

export function ActorView() {
  const { state } = view__context()
  const actor = window.world.actors[state.codex.actor]
  if (!actor) return <div>nothing here :)</div>
  const { birth } = actor.location
  const loc = actor__location(actor)
  const culture = window.world.cultures[actor.culture]
  const ethnicity = window.world.provinces[birth]
  const birthplace = province__hub(ethnicity)
  const expired = actor__expired(actor)
  const species = species__by_culture(culture)
  return (
    <CodexPage
      title={`${actor.name} ${actor.surname}`}
      subtitle={
        <StyledText
          color={css_colors.subtitle}
          text={`(${actor.idx}) ${species__size_rank(
            species.size
          )} humanoid (${culture.species.toLowerCase()}), ${decorate_text({
            label: formatters.date(actor.birth_date),
            link: birthplace,
            tooltip: birthplace.name,
            color: css_colors.subtitle
          })} - ${decorate_text({
            label: expired ? formatters.date(actor.expires) : 'Present',
            link: loc,
            tooltip: loc?.name ?? 'unknown',
            color: css_colors.subtitle
          })}`}
        ></StyledText>
      }
      content={
        <StyledTabs
          active={state.codex.current === 'actor'}
          tabs={[
            { label: 'statistics', content: <ActorStatistics></ActorStatistics> },
            { label: 'ancestry', content: <span></span> },
            { label: 'inventory', content: <span></span> }
          ]}
        ></StyledTabs>
      }
    ></CodexPage>
  )
}
