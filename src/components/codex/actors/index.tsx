import { actor__location } from '../../../models/npcs/actors'
import { actor__expired } from '../../../models/npcs/actors/stats/age'
import { species__sizeRank } from '../../../models/npcs/species/size'
import { species__byCulture } from '../../../models/npcs/species/taxonomy'
import { province__hub } from '../../../models/regions/provinces'
import { decorateText } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { view__context } from '../../context'
import { cssColors } from '../../theme/colors'
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
  const species = species__byCulture(culture)
  return (
    <CodexPage
      title={`${actor.name} ${actor.surname}`}
      subtitle={
        <StyledText
          color={cssColors.subtitle}
          text={`(${actor.idx}) ${species__sizeRank(
            species.size
          )} humanoid (${culture.species.toLowerCase()}), ${decorateText({
            label: formatters.date(actor.birthDate),
            link: birthplace,
            tooltip: birthplace.name,
            color: cssColors.subtitle
          })} - ${decorateText({
            label: expired ? formatters.date(actor.expires) : 'Present',
            link: loc,
            tooltip: loc?.name ?? 'unknown',
            color: cssColors.subtitle
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
