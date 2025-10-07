import { css } from '@emotion/css'
import { Grid } from '@mui/material'
import { CSSProperties, useState } from 'react'

import { TEXT } from '../../../../models/utilities/text'
import { TaggedEntity } from '../../../../models/utilities/text/types'
import { VIEW } from '../../../context'
import { cssColors } from '../../../theme/colors'
import { fonts } from '../../../theme/fonts'
import { DetailedTableRow } from '../../DataTable'
import { LazyTippy } from '../LazyTippy'
import { DetailedToolTipParams } from './types'

// Global tooltip state to prevent multiple tooltips
let activeTooltipId: string | null = null
const setActiveTooltip = (id: string | null) => {
  activeTooltipId = id
}

const DescriptiveToolTip = ({ title, subtitle, content }: DetailedToolTipParams) => {
  return (
    <Grid container p={0.5}>
      <Grid item xs={12}>
        <DetailedTableRow
          title={
            <span
              style={{
                fontSize: 35,
                color: cssColors.primary,
                fontWeight: 600,
                fontFamily: fonts.maps
              }}
            >
              {title}
            </span>
          }
          subtitle={
            <span style={{ fontSize: 10 }}>
              <StyledText color={cssColors.subtitle} text={subtitle}></StyledText>
            </span>
          }
        ></DetailedTableRow>
      </Grid>
      {content.map(({ label, text }) => {
        return (
          <Grid key={label} item xs={12} style={{ fontSize: 10 }}>
            <span>
              <b>{label}:</b> <StyledText text={text}></StyledText>
            </span>
          </Grid>
        )
      })}
    </Grid>
  )
}

const style__links = css`
  a {
    color: ${cssColors.black};
    border-bottom: 1px solid ${cssColors.black};
    &:hover {
      color: ${cssColors.primary} !important;
      border-bottom: 1px dotted ${cssColors.primary} !important;
    }
  }
`

export function StyledText(props: { text: string; color?: string }) {
  const { dispatch } = VIEW.context()
  const { text } = props
  const baseColor = props.color ?? 'black'
  const [componentId] = useState(() => Math.random().toString(36))

  return (
    <span className={style__links}>
      {text.split(/@(.+?)@/g).map((text, j) => {
        if (text.match(/.+|.+|.+/)) {
          const [label, i, cat, tooltip, color, italics, bold, underline, details] =
            text.split('##')
          const tag = cat as TaggedEntity['tag']
          const idx = parseInt(i)
          const onClick = ['nation', 'province', 'culture', 'actor'].includes(tag)
            ? () => {
                dispatch({ type: 'transition', payload: { tag, idx, zoom: true } })
              }
            : false
          const textColor = color !== '' ? color : baseColor
          const underlineColor = underline || textColor
          const style: CSSProperties = {
            cursor: onClick || tooltip || details ? 'pointer' : undefined,
            color: textColor,
            fontStyle: italics === 'true' ? 'italic' : undefined,
            fontWeight: bold === 'true' ? 'bold' : undefined,
            borderBottom: onClick
              ? `1px solid ${underlineColor}`
              : tooltip || details
              ? `1px dotted ${underlineColor}`
              : undefined
          }
          const link = onClick ? (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <a style={style} onClick={onClick}>
              {label}
            </a>
          ) : (
            <span style={style}>{label}</span>
          )
          const tooltipId = `${componentId}-${j}`

          return (
            <span key={j}>
              {details ? (
                <LazyTippy
                  arrow={false}
                  animation='scale'
                  theme='codex'
                  interactive={true}
                  appendTo={document.body}
                  offset={[0, 5]}
                  hideOnClick={false}
                  onShow={() => {
                    if (activeTooltipId && activeTooltipId !== tooltipId) {
                      return false // Prevent showing if another tooltip is active
                    }
                    setActiveTooltip(tooltipId)
                  }}
                  onHide={() => {
                    if (activeTooltipId === tooltipId) {
                      setActiveTooltip(null)
                    }
                  }}
                  content={
                    <DescriptiveToolTip
                      {...JSON.parse(TEXT.base64.decode(details))}
                    ></DescriptiveToolTip>
                  }
                >
                  {link}
                </LazyTippy>
              ) : tooltip ? (
                <LazyTippy arrow={false} animation='scale' content={TEXT.base64.decode(tooltip)}>
                  {link}
                </LazyTippy>
              ) : (
                link
              )}
            </span>
          )
        }
        return (
          <span key={j} style={{ color: baseColor }}>
            {text}
          </span>
        )
      })}
    </span>
  )
}
