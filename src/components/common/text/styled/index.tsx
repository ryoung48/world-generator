import { css } from '@emotion/css'
import { Grid } from '@mui/material'
import { CSSProperties, useState } from 'react'

import { TEXT } from '../../../../models/utilities/text'
import { TaggedEntity } from '../../../../models/utilities/text/types'
import { VIEW } from '../../../context'
import { cssColors } from '../../../theme/colors'
import { fonts } from '../../../theme/fonts'
import { LazyTippy } from '../LazyTippy'
import { DetailedToolTipParams } from './types'

// Global tooltip state to prevent multiple tooltips
let activeTooltipId: string | null = null
const setActiveTooltip = (id: string | null) => {
  activeTooltipId = id
}

const DescriptiveToolTip = ({ title, subtitle, content }: DetailedToolTipParams) => {
  return (
    <Grid
      container
      sx={{
        maxWidth: 320,
        minWidth: 220,
        background: '#fff',
        borderRadius: 1,
        overflow: 'hidden'
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          background: cssColors.primary,
          px: 2,
          py: 1,
          color: 'white'
        }}
      >
        <span
          style={{
            fontSize: 32,
            fontWeight: 700,
            fontFamily: fonts.maps,
            display: 'block'
          }}
        >
          {title}
        </span>
        <span style={{ fontSize: 9, opacity: 0.9 }}>
          <StyledText color='white' text={subtitle}></StyledText>
        </span>
      </Grid>
      <Grid item xs={12} sx={{ p: 1 }}>
        {content.map(({ label, text }) => {
          return (
            <Grid
              container
              key={label}
              sx={{
                py: 0.25,
                fontSize: 10
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  color: cssColors.black
                }}
              >
                <b style={{ color: cssColors.primary }}>{label}:</b> <StyledText text={text}></StyledText>
              </Grid>
            </Grid>
          )
        })}
      </Grid>
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
