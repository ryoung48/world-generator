import { css } from '@emotion/css'
import { Tooltip } from '@mui/material'
import { CSSProperties } from 'react'

import { view__context } from '../../../../context'
import { codex_categories, TaggedEntity } from '../../../../models/utilities/codex/entities'
import { css_colors } from '../../../theme/colors'

const style__links = css`
  a {
    color: ${css_colors.black};
    border-bottom: 1px solid ${css_colors.black};
    &:hover {
      color: ${css_colors.primary} !important;
      border-bottom: 1px dotted ${css_colors.primary} !important;
    }
  }
`

const style__italics = css`
  font-style: italic;
`

export function StyledText(props: { text: string; color?: string }) {
  const { dispatch } = view__context()
  const { text } = props
  const base_color = props.color ?? 'black'
  return (
    <span className={style__links}>
      {text.split(/@(.+?)@/g).map((text, j) => {
        if (text.match(/.+|.+|.+/)) {
          const [label, i, cat, tooltip, color, italics] = text.split('|')
          const tag = cat as TaggedEntity['tag']
          const idx = parseInt(i)
          const onClick = codex_categories.includes(tag)
            ? () => dispatch({ type: 'update codex', payload: { target: { tag, idx } } })
            : false
          const text_color = color !== '' ? color : base_color
          const style: CSSProperties = {
            cursor: onClick || tooltip ? 'pointer' : undefined,
            color: text_color,
            borderBottom: onClick
              ? `1px solid ${text_color}`
              : tooltip
              ? `1px dotted ${text_color}`
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
            <span className={italics === 'true' ? style__italics : undefined} key={j}>
              {tooltip ? <Tooltip title={tooltip}>{link}</Tooltip> : link}
            </span>
          )
        }
        return (
          <span key={j} style={{ color: base_color }}>
            {text}
          </span>
        )
      })}
    </span>
  )
}
