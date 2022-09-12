import { DiplomaticRelation } from '../../../models/history/events/diplomacy/types'
import { region__neighbors } from '../../../models/regions'
import { randomRelation, region__setRelation } from '../../../models/regions/diplomacy/relations'
import { province__decoration } from '../../../models/regions/provinces'
import { Region } from '../../../models/regions/types'
import { decorateText } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { climateLookup, climates } from '../../../models/world/climate/types'
import { view__context } from '../../context'
import { cssColors } from '../../theme/colors'
import { SectionList } from '../common/text/SectionList'
import { StyledText } from '../common/text/StyledText'

const region__biomes = (nation: Region) => {
  const biomes = Object.entries(
    nation.provinces
      .map(t => window.world.provinces[t])
      .reduce((dict: Record<string, number>, province) => {
        const { climate } = window.world.regions[province.region]
        if (!dict[climate]) dict[climate] = 0
        dict[climate] += province.land
        return dict
      }, {})
  ).sort((a, b) => b[1] - a[1])
  const total = biomes.reduce((sum, [_, v]) => sum + v, 0)
  return biomes
    .map(
      ([k, v]) =>
        `${decorateText({
          label: k,
          tooltip: climateLookup[k as climates].code
        })} (${formatters.percent({ value: v / total })})`
    )
    .join(', ')
}

const diplomaticScore: Record<DiplomaticRelation, number> = {
  'at war': 1,
  suspicious: 2,
  neutral: 3,
  friendly: 4,
  ally: 5
}

const diplomaticColor: Record<DiplomaticRelation, string> = {
  'at war': cssColors.primary,
  suspicious: 'black',
  neutral: 'black',
  friendly: 'black',
  ally: cssColors.blue
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
        const relation = randomRelation()
        region__setRelation({ relation, n1: n, n2: nation })
      }
      const opinion = contract || nation.relations[n.idx]
      return {
        n,
        opinion,
        score: diplomaticScore[opinion as DiplomaticRelation] ?? 6
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
          label: `Borders (${neighbors.length})`,
          content: (
            <StyledText
              text={relations
                .map(({ n, opinion }) => {
                  const color = diplomaticColor[opinion as DiplomaticRelation] ?? 'gray'
                  return decorateText({
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
                  return `${decorateText({
                    link: n,
                    color: rebel ? cssColors.primary : undefined,
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
          content: <StyledText text={province__decoration(provinces)}></StyledText>
        }
      ]}
    ></SectionList>
  )
}
