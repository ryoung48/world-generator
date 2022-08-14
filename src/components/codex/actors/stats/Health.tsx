import { scaleLinear } from 'd3'

import { npc__health } from '../../../../models/npcs/stats'
import { NPC } from '../../../../models/npcs/types'
import { decorate_text } from '../../../../models/utilities/text/decoration'
import { formatters } from '../../../../models/utilities/text/formatters'
import { StyledText } from '../../common/text/StyledText'

const hpColorScale = scaleLinear()
  .domain([0, 0.5, 1])
  .range(['red', 'orange', 'green'] as any)

export function NPCHealthView(props: { npc: NPC }) {
  const { npc } = props
  const { max, current, percent } = npc__health(npc)
  return (
    <StyledText
      text={`${decorate_text({
        label: `${current.toFixed(0)}/${max.toFixed(0)}`,
        color: percent === 0 ? 'gray' : undefined,
        tooltip:
          percent === 0
            ? 'defeated'
            : percent < 0.3
            ? 'near death'
            : percent < 0.6
            ? 'bloodied'
            : 'healthy'
      })} (${decorate_text({
        label: formatters.percent({ value: percent, precision: 0 }),
        color: percent === 0 ? 'gray' : hpColorScale(percent).toString()
      })})`}
    ></StyledText>
  )
}
