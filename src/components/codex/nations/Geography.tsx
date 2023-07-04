import { region__biomes } from '../../../models/regions'
import { DiplomaticRelation } from '../../../models/regions/types'
import { decorateText } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { view__context } from '../../context'
import { cssColors } from '../../theme/colors'
import { SectionList } from '../common/text/SectionList'
import { StyledText } from '../common/text/StyledText'

const diplomaticScore: Record<DiplomaticRelation, number> = {
  'at war': 1,
  suspicious: 2,
  neutral: 3,
  friendly: 4,
  ally: 5,
  vassal: 6,
  suzerain: 6
}

const diplomaticColor: Record<DiplomaticRelation, string> = {
  'at war': cssColors.primary,
  suspicious: '#7f4b02',
  neutral: cssColors.subtitle,
  friendly: '#285b3c',
  ally: cssColors.blue,
  vassal: 'purple',
  suzerain: 'purple'
}

export function Geography() {
  const { state } = view__context()
  const province = window.world.provinces[state.province]
  const nation = window.world.regions[province.nation]
  const domains = Array.from(
    new Set(nation.provinces.map(p => window.world.provinces[p].region))
  ).map(r => window.world.regions[r])
  const neighbors = Object.keys(nation.relations).map(k => window.world.regions[parseInt(k)])
  const provinces = nation.provinces.map(t => window.world.provinces[t])
  const relations = neighbors
    .map(neighbor => {
      const opinion = nation.relations[neighbor.idx]
      return {
        neighbor,
        opinion,
        score: diplomaticScore[opinion] ?? 6
      }
    })
    .sort((a, b) => a.score - b.score)
  return (
    <SectionList
      list={[
        {
          label: `Climate`,
          content: <StyledText text={region__biomes(nation)}></StyledText>
        },
        {
          label: `Relations (${neighbors.length})`,
          content: (
            <StyledText
              text={relations
                .map(({ neighbor, opinion }) => {
                  return decorateText({
                    link: neighbor,
                    tooltip: opinion,
                    color: diplomaticColor[opinion],
                    bold: opinion === 'at war'
                  })
                })
                .join(', ')}
            ></StyledText>
          )
        },
        {
          label: `Regions (${domains.length})`,
          content: (
            <StyledText
              text={domains
                .map(n => {
                  const owned = provinces.filter(city => city.region === n.idx).length
                  const total = n.regional.provinces.length
                  return `${decorateText({
                    link: n
                  })} (${formatters.percent(owned / total)})`
                })
                .join(', ')}
            ></StyledText>
          )
        }
      ]}
    ></SectionList>
  )
}
