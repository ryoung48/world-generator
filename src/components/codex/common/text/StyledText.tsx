import { css } from '@emotion/css'
import { Tooltip } from '@mui/material'
import { CSSProperties } from 'react'

import { entity__tags, TaggedEntity } from '../../../../models/utilities/codex/entities'
import { view__context } from '../../../context'
import { cssColors } from '../../../theme/colors'

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
/**
 * @component
 * @param props - test
 * @returns
 */
export function StyledText(props: { text: string; color?: string }) {
  const { dispatch } = view__context()
  const { text } = props
  const baseColor = props.color ?? 'black'
  return (
    <span className={style__links}>
      {text.split(/@(.+?)@/g).map((text, j) => {
        if (text.match(/.+|.+|.+/)) {
          const [label, i, cat, tooltip, color, italics, bold] = text.split('|')
          const tag = cat as TaggedEntity['tag']
          const idx = parseInt(i)
          const onClick = entity__tags.includes(tag)
            ? () => dispatch({ type: 'update codex', payload: { target: { tag, idx } } })
            : false
          const textColor = color !== '' ? color : baseColor
          const style: CSSProperties = {
            cursor: onClick || tooltip ? 'pointer' : undefined,
            color: textColor,
            fontStyle: italics === 'true' ? 'italic' : undefined,
            fontWeight: bold === 'true' ? 'bold' : undefined,
            borderBottom: onClick
              ? `1px solid ${textColor}`
              : tooltip
              ? `1px dotted ${textColor}`
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
          return (
            <span key={j}>
              {tooltip ? (
                <Tooltip disableInteractive title={tooltip}>
                  {link}
                </Tooltip>
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
