import { Gavel } from 'mdi-material-ui'
import { PROVINCE } from '../../../../models/provinces'
import { Province } from '../../../../models/provinces/types'
import { TEXT } from '../../../../models/utilities/text'
import { StyledText } from '../../../common/text/styled'
import { getPolicyIcon } from '../icons'

interface PoliciesSectionProps {
  nation: Province
}

export function PoliciesSection({ nation }: PoliciesSectionProps) {
  return (
    <span>
      {(
        [
          {
            key: 'religion' as const,
            value: nation.policies.religion,
            tooltip: PROVINCE.policies.religion[nation.policies.religion]
          },
          {
            key: 'economy' as const,
            value: nation.policies.economy,
            tooltip: PROVINCE.policies.economy[nation.policies.economy]
          },
          {
            key: 'trade' as const,
            value: nation.policies.trade,
            tooltip: PROVINCE.policies.trade[nation.policies.trade]
          },
          {
            key: 'slavery' as const,
            value: nation.policies.slavery,
            tooltip: PROVINCE.policies.slavery?.[nation.policies.slavery]
          },
          {
            key: 'land' as const,
            value: nation.policies.land,
            tooltip: PROVINCE.policies.land?.[nation.policies.land]
          }
        ] as const
      )
        .filter(({ value }) => Boolean(value))
        .map((policy, idx, arr) => (
          <span key={policy.key}>
            <span
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                paddingRight: 3,
                paddingLeft: idx === 0 ? 0 : 4,
                lineHeight: 0
              }}
            >
              {getPolicyIcon(policy.key, policy.value) ?? <Gavel fontSize='inherit' />}
            </span>
            <StyledText
              text={TEXT.decorate({
                label: TEXT.titleCase(policy.value),
                tooltip: policy.tooltip
              })}
            />
            {idx !== arr.length - 1 && <span style={{ opacity: 0.4 }}>,</span>}
          </span>
        ))}
    </span>
  )
}
