import { CULTURE } from '../../../../models/heritage'
import { NATION } from '../../../../models/nations'
import { Province } from '../../../../models/provinces/types'
import { MATH } from '../../../../models/utilities/math'
import { TEXT } from '../../../../models/utilities/text'
import { StyledText } from '../../../common/text/styled'

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
            <span
              style={{
                display: 'inline-block',
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                border: `2px solid ${culture.display.color}`,
                backgroundColor: 'transparent',
                marginRight: '4px',
                verticalAlign: 'middle',
                marginBottom: 2
              }}
            ></span>{' '}
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
