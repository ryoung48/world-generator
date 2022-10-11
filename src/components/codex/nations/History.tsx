import { Grid } from '@mui/material'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'

import { event__decode } from '../../../models/history/encoding'
import { region__politics, statusSplitter } from '../../../models/history/health'
import { EventType, eventTypes } from '../../../models/history/types'
import { yearMS } from '../../../models/utilities/math/time'
import { cleanDecoration } from '../../../models/utilities/text/decoration'
import { formatters } from '../../../models/utilities/text/formatters'
import { view__context } from '../../context'
import { DataTable } from '../common/DataTable'
import { ToggleButtons } from '../common/navigation/ToggleButtons'
import { StyledText } from '../common/text/StyledText'

interface PastEvent {
  event: EventType
  title: string
  text: string
  time: number
  wealth: number
  maxWealth: number
  idx: number
}

const validEvents = eventTypes.filter(e => e !== 'healthCheck')

export function History() {
  const { state } = view__context()
  const overlord = window.world.regions[state.codex.nation]
  const nations = overlord.regions
    .map(t => window.world.provinces[t])
    .map(p => window.world.regions[p.region])

  const eventFilter = useState<EventType>('war')
  const [selected, setSelected] = useState(-1)
  return (
    <ToggleButtons
      selection={validEvents}
      selected={eventFilter}
      content={filter => {
        const datasets = nations.map(nation => {
          let records: PastEvent[] = nation.past
            .map(i => window.world.past[i])
            .concat([
              {
                ...region__politics(nation),
                idx: -1
              }
            ])
            .filter(e => filter === e.type || e.type === 'healthCheck')
            .map(({ actors, time, title, text, type, idx }) => {
              const n = actors.find(a => a.idx === nation.idx)
              return {
                wealth: n.wealth,
                maxWealth: n.maxWealth,
                time,
                title,
                text,
                event: type,
                idx
              }
            })
            .sort((a, b) => a.time - b.time)
          records = records.filter((p, i) => {
            if (p.event !== 'healthCheck' || p.idx === -1) return true
            const next = records[i + 1]
            const upperWindow = !next || p.time + yearMS <= next.time
            const previous = records[i - 1]
            const lowerWindow = !previous || p.time - yearMS >= previous.time
            return upperWindow && lowerWindow
          })
          return {
            label: nation.name,
            data: records.map(({ wealth, time, idx }) => ({
              x: time,
              y: wealth,
              i: idx
            })),
            fill: false,
            showLine: true,
            hidden: nation !== overlord,
            backgroundColor: nation.colors,
            pointRadius: records.map(({ event, idx }) =>
              event === 'healthCheck' ? 1 : idx !== selected ? 4 : 6
            ),
            pointBorderWidth: records.map(({ event, idx }) =>
              event === 'healthCheck' ? 1 : idx !== selected ? 3 : 5
            ),
            pointBackgroundColor: records.map(({ event }) =>
              event !== 'healthCheck' ? 'white' : nation.colors
            ),
            pointBorderColor: nation.colors,
            raw: records
          }
        })
        const chartData = { datasets }
        return (
          <Grid container>
            <Grid item xs={12} style={{ height: '350px' }}>
              <Line
                data={chartData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    tooltip: {
                      displayColors: false,
                      callbacks: {
                        title: item => {
                          const dataset = item[0].dataset as unknown as {
                            raw: PastEvent[]
                            label: string
                          }
                          const past = dataset.raw[item[0].dataIndex]
                          return `${dataset.label} [${formatters.date(
                            past.time
                          )}]: ${cleanDecoration(event__decode(past.title))} [${past.idx}]`
                        },
                        label: item => {
                          const dataset = item.dataset as unknown as { raw: PastEvent[] }
                          return event__decode(dataset.raw[item.dataIndex].text)
                            .split(statusSplitter)
                            .map(cleanDecoration)
                        },
                        footer: ([item]) => {
                          const dataset = item.dataset as unknown as { raw: PastEvent[] }
                          const { dataIndex } = item
                          const { wealth, maxWealth } = dataset.raw[dataIndex]
                          const percent = (maxWealth <= 0 ? 0 : wealth / maxWealth) * 100
                          return `Wealth: ${wealth.toFixed(2)} (${percent.toFixed(
                            2
                          )}%) [${maxWealth.toFixed(2)}]`
                        }
                      }
                    }
                  },
                  onClick: (_, data) => {
                    const [d] = data
                    const index = datasets[d?.datasetIndex]?.data[d?.index]?.i
                    if (window.world.past[index]) {
                      setSelected(index)
                    }
                  },
                  scales: {
                    x: {
                      type: 'linear',
                      ticks: {
                        callback: time => {
                          return formatters.date(parseInt(time.toString()))
                        }
                      }
                    }
                  }
                }}
              ></Line>
            </Grid>
            {window.world.past[selected] && (
              <Grid item xs={12}>
                <DataTable
                  headers={[
                    { text: 'Date', value: item => formatters.date(item.time) },
                    {
                      text: 'Event',
                      value: item => <StyledText text={event__decode(item.title)}></StyledText>
                    },
                    {
                      text: 'Description',
                      value: item => <StyledText text={event__decode(item.text)}></StyledText>
                    }
                  ]}
                  data={[window.world.past[selected]]}
                ></DataTable>
              </Grid>
            )}
          </Grid>
        )
      }}
    ></ToggleButtons>
  )
}
