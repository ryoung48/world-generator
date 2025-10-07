import { css } from '@emotion/css'
import { Grid } from '@mui/material'
import { arc, descending } from 'd3'
import { Chord, chord, ribbon } from 'd3-chord'
import React, { MouseEvent, useState } from 'react'

import { NATION } from '../../../models/nations'
import { MIGRATION } from '../../../models/nations/migration'
import { PROVINCE } from '../../../models/provinces'
import { ENTITY } from '../../../models/utilities/entities'
import { TEXT } from '../../../models/utilities/text'
import { VIEW } from '../../context'

interface Tooltip {
  x: number
  y: number
  display: boolean
  text: string | React.ReactElement
}

const cursorStyle = css`
  .group:hover {
    cursor: pointer;
  }
`

const tooltipStyle = ({ x, y, display }: Tooltip) => css`
  position: fixed;
  display: ${display ? 'block' : 'none'};
  top: ${y - 60}px;
  left: ${x - 60}px;
  background-color: black;
  opacity: 0.7;
  border-radius: 4px;
  color: white;
  padding: 5px;
  font-size: 12px;
  line-height: 18px;
  animation: fade-in 0.5s;
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.7;
    }
  }
`

export const MigrationsChart: React.FC = () => {
  const { state, dispatch } = VIEW.context()
  const [selectedGroup, setSelectedGroup] = useState(-1)
  const [selectedChord, setSelectedChord] = useState('')
  const [tooltip, setTooltip] = useState<Tooltip>({ x: 0, y: 0, display: false, text: '' })

  const showTooltip = (params: { event: MouseEvent; text: React.ReactElement }) => {
    const { event, text } = params
    setTooltip({
      display: true,
      x: event.clientX,
      y: event.clientY,
      text
    })
  }

  const hideTooltip = () => {
    setTooltip(prev => ({ ...prev, display: false }))
  }

  // Get current province/nation data
  const province = ENTITY.province(state.codex)
  const nation = PROVINCE.nation(province)
  const area = [...NATION.neighbors({ nation }), nation]
  const scale = 550
  const height = 0.633 * scale
  const width = 1 * scale
  const innerRadius = Math.min(width, height) * 0.35
  const outerRadius = innerRadius * 1.1

  const names = area.map(n => n.name)
  const colors = area.map(n => n.heraldry.color) // Replace with actual colors
  area.forEach(source => MIGRATION.get(source))

  const matrix = area.map(source =>
    area.map(target => (source.idx === target.idx ? 0 : source.immigration[target.idx] ?? 0))
  )

  const layout = chord().padAngle(0.15).sortChords(descending)(matrix)
  const arcGenerator = arc()
  const ribbonGenerator = ribbon()

  const chordId = (data: Chord) => `chord-${data.source.index}-${data.target.index}`

  const formatCompact = (value: number) => TEXT.formatters.compact(value)
  const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`

  return (
    <Grid container>
      <Grid item xs={12} sx={{ padding: 0 }} className={cursorStyle}>
        <div>
          <svg viewBox={`0 0 ${width} ${height}`} width='100%' height={height} id='migrations'>
            <g transform={`translate(${width / 2},${height / 2.2})`}>
              <defs>
                {layout.map((chordData, index) => {
                  const sourceStart =
                    (chordData.source.endAngle - chordData.source.startAngle) / 2 +
                    chordData.source.startAngle -
                    Math.PI / 2
                  const targetStart =
                    (chordData.target.endAngle - chordData.target.startAngle) / 2 +
                    chordData.target.startAngle -
                    Math.PI / 2
                  return (
                    <linearGradient
                      key={index}
                      id={chordId(chordData)}
                      gradientUnits='userSpaceOnUse'
                      x1={innerRadius * Math.cos(sourceStart)}
                      y1={innerRadius * Math.sin(sourceStart)}
                      x2={innerRadius * Math.cos(targetStart)}
                      y2={innerRadius * Math.sin(targetStart)}
                    >
                      <stop offset='0%' stopColor={colors[chordData.source.index]} />
                      <stop offset='100%' stopColor={colors[chordData.target.index]} />
                    </linearGradient>
                  )
                })}
              </defs>

              {layout.groups.map(({ startAngle, endAngle, index }) => {
                const angle = (startAngle + endAngle) / 2
                const selected = area[index]
                const pop = NATION.population(selected)
                const localIm = matrix[index].reduce((sum, im) => sum + im, 0)
                const localEm = matrix.reduce((sum, im) => sum + im[index], 0)

                return (
                  <g key={index} className='group'>
                    <path
                      fill={colors[index]}
                      onClick={() =>
                        dispatch({
                          type: 'transition',
                          payload: { tag: 'nation', idx: selected.idx, zoom: true }
                        })
                      }
                      onMouseMove={(event: MouseEvent) => {
                        showTooltip({
                          event,
                          text: (
                            <span>
                              <span>
                                Immigrants: {formatCompact(localIm)} ({formatPercent(localIm / pop)}
                                )
                              </span>
                              <br />
                              <span>
                                Emigrants: {formatCompact(localEm)} ({formatPercent(localEm / pop)})
                              </span>
                            </span>
                          )
                        })
                        setSelectedGroup(index)
                      }}
                      onMouseOut={() => {
                        hideTooltip()
                        setSelectedGroup(-1)
                      }}
                      d={
                        arcGenerator({
                          startAngle,
                          endAngle,
                          innerRadius: innerRadius * 1.01,
                          outerRadius
                        }) ?? undefined
                      }
                    />
                    <text
                      dy='0.5em'
                      fontSize={10}
                      textAnchor={angle < Math.PI ? 'start' : 'end'}
                      transform={`rotate(${(angle * 180) / Math.PI - 90})translate(${
                        outerRadius + 5
                      })${angle > Math.PI ? 'rotate(180)' : ''}`}
                    >
                      {names[index]}
                    </text>
                  </g>
                )
              })}

              {layout.map((chordData, index) => {
                const { source, target } = chordData
                const groupSelected =
                  source.index === selectedGroup ||
                  target.index === selectedGroup ||
                  selectedGroup < 0
                const id = chordId(chordData)
                const chordSelected = !selectedChord || selectedChord === id
                const sourcePop = Object.values(area[target.index].immigration).reduce(
                  (sum, count) => sum + count,
                  0
                )

                const sourceImmigrants = matrix[target.index][source.index]
                const targetPop = Object.values(area[source.index].immigration).reduce(
                  (sum, count) => sum + count,
                  0
                )

                const targetImmigrants = matrix[source.index][target.index]

                return (
                  <g key={index} className='chord'>
                    <path
                      opacity={groupSelected !== chordSelected ? 0.1 : 0.8}
                      onMouseMove={(event: MouseEvent) => {
                        setSelectedChord(id)
                        showTooltip({
                          event,
                          text: (
                            <span>
                              {names[target.index]} → {names[source.index]}:{' '}
                              {formatCompact(targetImmigrants)} (
                              {formatPercent(targetImmigrants / targetPop)})
                              <br />
                              {names[source.index]} → {names[target.index]}:{' '}
                              {formatCompact(sourceImmigrants)} (
                              {formatPercent(sourceImmigrants / sourcePop)})
                            </span>
                          )
                        })
                      }}
                      onMouseOut={() => {
                        hideTooltip()
                        setSelectedChord('')
                      }}
                      fill={`url(#${chordId(chordData)})`}
                      d={(ribbonGenerator as any)({
                        source: { ...source, radius: innerRadius },
                        target: { ...target, radius: innerRadius }
                      })}
                    />
                  </g>
                )
              })}
            </g>
          </svg>
          <div className={tooltipStyle(tooltip)}>{tooltip.text}</div>
        </div>
      </Grid>
    </Grid>
  )
}
