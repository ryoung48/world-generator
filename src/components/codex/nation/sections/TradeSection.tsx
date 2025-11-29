import { TRADE_GOODS, tradeGoods } from '../../../../models/provinces/trade'
import { Province } from '../../../../models/provinces/types'
import { TEXT } from '../../../../models/utilities/text'
import { StyledText } from '../../../common/text/styled'
import { getTradeGoodIcon } from '../icons'

interface TradeSectionProps {
  nation: Province
}

export function ImportsSection({ nation }: TradeSectionProps) {
  return (
    <span>
      {TRADE_GOODS.imports(nation)
        .sort()
        .map((good, idx, arr) => (
          <span key={good}>
            <span
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                paddingRight: 3,
                paddingLeft: idx === 0 ? 0 : 4,
                lineHeight: 0
              }}
            >
              {getTradeGoodIcon(good)}
            </span>
            <StyledText
              text={TEXT.decorate({
                label: TEXT.titleCase(good),
                tooltip: tradeGoods[good]?.description ?? ''
              })}
            />
            {idx !== arr.length - 1 && <span style={{ opacity: 0.4 }}>,</span>}
          </span>
        ))}
    </span>
  )
}

export function ExportsSection({ nation }: TradeSectionProps) {
  return (
    <span>
      {nation.exports && nation.exports.length > 0 ? (
        nation.exports.sort().map((good, idx, arr) => (
          <span key={good}>
            <span
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                paddingRight: 3,
                paddingLeft: idx === 0 ? 0 : 4,
                lineHeight: 0
              }}
            >
              {getTradeGoodIcon(good)}
            </span>
            <StyledText
              text={TEXT.decorate({
                label: TEXT.titleCase(good),
                tooltip: tradeGoods[good]?.description ?? ''
              })}
            />
            {idx !== arr.length - 1 && <span style={{ opacity: 0.4 }}>,</span>}
          </span>
        ))
      ) : (
        <span style={{ opacity: 0.6 }}>None</span>
      )}
    </span>
  )
}
