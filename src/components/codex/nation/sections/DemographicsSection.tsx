import { CULTURE } from '../../../../models/heritage'
import { MATH } from '../../../../models/utilities/math'
import { TEXT } from '../../../../models/utilities/text'
import { ColoredBox } from '../../../common/ColoredBox'
import { StyledText } from '../../../common/text/styled'
import { Province } from '../../../../models/provinces/types'
import { NATION } from '../../../../models/nations'
import { PROVINCE } from '../../../../models/provinces'

interface DemographicsSectionProps {
  nation: Province
}

export function DemographicsSection({ nation }: DemographicsSectionProps) {
  const provinces = NATION.provinces(nation)
  const ruling = nation.culture
  const cultures = MATH.counterDist(
    provinces
      .map(province =>
        province.minority !== undefined ? [province.minority, province.culture] : [province.culture]
      )
      .flat()
  )
    .sort((a, b) => {
      const aCount = a.value === ruling ? Infinity : a.count
      const bCount = b.value === ruling ? Infinity : b.count
      return bCount - aCount
    })
    .slice(0, 5)

  return (
    <span>
      {cultures.map(({ value, count }, i) => {
        const culture = window.world.cultures[value]
        const bold = value === ruling
        return (
          <span key={culture.idx.toString()}>
            <ColoredBox color={culture.display.color} border={false}></ColoredBox>{' '}
            <StyledText
              text={`${TEXT.decorate({
                label: culture.name,
                details: CULTURE.describe(culture),
                bold
              })} ${TEXT.decorate({
                label: `(${TEXT.formatters.percent(count)})`
              })}`}
            ></StyledText>
            {i !== cultures.length - 1 ? ', ' : ''}
          </span>
        )
      })}
    </span>
  )
}
