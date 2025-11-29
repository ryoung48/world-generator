import { PROVINCE } from '../../../../models/provinces'
import { HUB } from '../../../../models/provinces/hubs'
import { Province } from '../../../../models/provinces/types'
import { TEXT } from '../../../../models/utilities/text'
import { StyledText } from '../../../common/text/styled'
import { getProvinceIcon } from '../icons'

interface ProvincesSectionProps {
  provinces: Province[]
}

export function ProvincesSection({ provinces }: ProvincesSectionProps) {
  const sortedProvinces = [...provinces].sort(
    (a, b) => PROVINCE.hub(b).population - PROVINCE.hub(a).population
  )

  return (
    <span>
      {sortedProvinces.map((province, index) => {
        const hub = PROVINCE.hub(province)
        const settlement = HUB.settlement(hub)
        const isLast = index === sortedProvinces.length - 1
        return (
          <span key={province.idx}>
            <span
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                transform: 'translateY(1.5px)',
                paddingRight: 3,
                paddingLeft: index == 0 ? 0 : 4
              }}
            >
              {getProvinceIcon(province)}
            </span>
            <StyledText
              text={TEXT.decorate({
                link: province,
                label: hub.name,
                tooltip: settlement
              })}
            />
            {!isLast && ','}
          </span>
        )
      })}
    </span>
  )
}
