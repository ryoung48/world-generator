import { view__context } from '../../../context'
import { diplomatic_relation } from '../../../models/history/events/diplomacy/types'
import { region__neighbors } from '../../../models/regions'
import { random_relation, region__set_relation } from '../../../models/regions/diplomacy/relations'
import { decorated_provinces } from '../../../models/regions/provinces'
import { Region } from '../../../models/regions/types'
import { decorate_text } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { world__get_lands } from '../../../models/world'
import { css_colors } from '../../theme/colors'
import { SectionList } from '../common/text/SectionList'
import { StyledText } from '../common/text/StyledText'

export const region__land = (nation: Region) => {
  return nation.provinces
    .map(t => window.world.provinces[t])
    .reduce((sum, city) => city.land + sum, 0)
}

export const region__ocean = (nation: Region) => {
  return nation.provinces
    .map(t => window.world.provinces[t])
    .reduce((sum, city) => city.ocean + sum, 0)
}

const diplomatic_score: Record<diplomatic_relation, number> = {
  'at war': 1,
  suspicious: 2,
  neutral: 3,
  friendly: 4,
  ally: 5
}

const diplomatic_color: Record<diplomatic_relation, string> = {
  'at war': css_colors.primary,
  suspicious: 'black',
  neutral: 'black',
  friendly: 'black',
  ally: css_colors.blue
}

export function Geography() {
  const { state } = view__context()
  const nation = window.world.regions[state.codex.nation]
  const conquered = nation.regions
  const neighbors = region__neighbors(nation)
  const provinces = nation.provinces.map(t => window.world.provinces[t])
  const regions = Array.from(new Set(provinces.map(city => city.region))).map(
    r => window.world.regions[r]
  )
  const { land: world_land, water } = world__get_lands()
  const nation_land = region__land(nation)
  const nation_ocean = region__ocean(nation)
  const rebellions = conquered
    .map(p => {
      const province = window.world.provinces[p]
      return window.world.regions[province.region]
    })
    .filter(region => region.rebellions.current !== -1)
  const colonial = nation.subjects
    .map(s => window.world.regions[s])
    .filter(s => !neighbors.includes(s.idx))
  const suzerain = window.world.regions[nation.overlord.idx]
  if (suzerain && !neighbors.includes(suzerain.idx)) colonial.push(suzerain)
  const relations = neighbors
    .map(n => window.world.regions[n])
    .concat(colonial)
    .map(n => {
      const contract =
        n.overlord.idx === nation.idx ? 'vassal' : nation.overlord.idx === n.idx ? 'suzerain' : ''
      if (!nation.relations[n.idx]) {
        const relation = random_relation()
        region__set_relation({ relation, n1: n, n2: nation })
      }
      const opinion = contract || nation.relations[n.idx]
      return {
        n,
        opinion,
        score: diplomatic_score[opinion as diplomatic_relation] ?? 6
      }
    })
    .sort((a, b) => a.score - b.score)
  return (
    <SectionList
      list={[
        {
          label: `Landmass`,
          content: `${formatters.compact(
            nation_land * window.world.dim.cell_area
          )} square miles (${formatters.percent({
            value: nation_land / world_land
          })}) [${nation_land}]`
        },
        {
          label: `Ocean`,
          content: `${formatters.compact(
            nation_ocean * window.world.dim.cell_area
          )} square miles (${formatters.percent({ value: nation_ocean / water })})`
        },
        {
          label: `Borders (${neighbors.length})`,
          content: (
            <StyledText
              text={relations
                .map(({ n, opinion }) => {
                  const color = diplomatic_color[opinion as diplomatic_relation] ?? 'gray'
                  return decorate_text({
                    link: n,
                    tooltip: opinion,
                    color: color === 'black' ? undefined : color
                  })
                })
                .join(', ')}
            ></StyledText>
          )
        },
        {
          label: `Regions (${conquered.length})`,
          content: (
            <StyledText
              text={regions
                .map(n => {
                  const owned = provinces.filter(city => city.region === n.idx).length
                  const total = n.regional.provinces.length
                  const rebel = rebellions.includes(n)
                  return `${decorate_text({
                    link: n,
                    color: rebel ? css_colors.primary : undefined,
                    tooltip: rebel ? 'rebellion' : undefined
                  })} (${formatters.percent({
                    value: owned / total
                  })})`
                })
                .join(', ')}
            ></StyledText>
          )
        },
        {
          label: `Settlements (${provinces.length})`,
          content: <StyledText text={decorated_provinces(provinces)}></StyledText>
        }
      ]}
    ></SectionList>
  )
}
