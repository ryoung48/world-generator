import { ResponsivePie } from '@nivo/pie'

import { WORLD } from '../../../models'
import { CLIMATE } from '../../../models/cells/climate'
import { ClimateKey } from '../../../models/cells/climate/types'
import { TEXT } from '../../../models/utilities/text'
import { fonts } from '../../theme/fonts'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const ClimateChart = () => {
  const total = WORLD.land().length
  const data = Object.entries(WORLD.climates())
    .map(([k, v]) => ({
      id: k,
      label: k,
      value: v,
      color: CLIMATE.holdridge[k as ClimateKey].color
    }))
    .sort(
      (a, b) =>
        CLIMATE.holdridge[a.id as ClimateKey].idx - CLIMATE.holdridge[b.id as ClimateKey].idx
    )
  return (
    <div style={{ height: 800, width: '100%' }}>
      <ResponsivePie
        data={data}
        theme={{
          text: {
            fontFamily: fonts.content
          }
        }}
        colors={{ datum: 'data.color' }}
        valueFormat={value => TEXT.formatters.percent(value / total, 2)}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]]
        }}
        arcLinkLabelsSkipAngle={8}
        arcLinkLabelsTextColor='#333333'
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]]
        }}
        legends={[
          {
            anchor: 'bottom-left',
            direction: 'column',
            justify: false,
            translateX: 0,
            translateY: 5,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 12,
            symbolShape: 'circle'
          }
        ]}
      />
    </div>
  )
}
