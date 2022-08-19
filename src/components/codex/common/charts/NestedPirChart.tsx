import { Button, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'

import { pieChart__construct } from '../../common/charts'
import { NestedPieData, PieTooltip } from './types'

type CustomTitle = (_node: NestedPieData) => string

export function NestedPieChart(props: {
  data: NestedPieData
  title: CustomTitle
  tooltips: PieTooltip
}) {
  const { data, title, tooltips } = props
  const [_context, setContext] = useState<string[]>([])
  useEffect(() => {
    setContext([])
  }, [data])
  const context = [..._context]
  let current = data
  while (context.length > 0) {
    const child = context.shift()
    current = current.children.find(({ label }) => child === label)
  }
  const pieData = pieChart__construct(current.children)
  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        {title(current)}
      </Grid>
      <Grid item xs={12}>
        <div style={{ height: '350px' }}>
          <Pie
            data={pieData}
            options={{
              maintainAspectRatio: false,
              onClick: (_, data) => {
                const [d] = data
                const index = d?.index
                const name = pieData.labels[index]?.replace(/ \(.*/, '')
                const child = current.children.find(({ label }) => label === name)
                if (child?.children?.length > 0) setContext([..._context, name])
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: tooltips
                  }
                }
              }
            }}
          ></Pie>
        </div>
      </Grid>
      <Grid item mt={3}>
        <Button
          size='small'
          disabled={_context.length < 1}
          onClick={() => {
            _context.pop()
            setContext([..._context])
          }}
        >
          back
        </Button>
      </Grid>
    </Grid>
  )
}
