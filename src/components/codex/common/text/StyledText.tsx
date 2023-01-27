import { css } from '@emotion/css'
import Tippy from '@tippyjs/react'
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

export function StyledText(props: { text: string; color?: string }) {
  const { dispatch } = view__context()
  const { text } = props
  const baseColor = props.color ?? 'black'
  return (
    <span className={style__links}>
      {text.split(/@(.+?)@/g).map((text, j) => {
        if (text.match(/.+|.+|.+/)) {
          const [label, i, cat, tooltip, color, italics, bold, underline] = text.split('##')
          const tag = cat as TaggedEntity['tag']
          const idx = parseInt(i)
          const onClick = entity__tags.includes(tag)
            ? () => dispatch({ type: 'update codex', payload: { target: { tag, idx } } })
            : false
          const textColor = color !== '' ? color : baseColor
          const underlineColor = underline || textColor
          const style: CSSProperties = {
            cursor: onClick || tooltip ? 'pointer' : undefined,
            color: textColor,
            fontStyle: italics === 'true' ? 'italic' : undefined,
            fontWeight: bold === 'true' ? 'bold' : undefined,
            borderBottom: onClick
              ? `1px solid ${underlineColor}`
              : tooltip
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
          return (
            <span key={j}>
              {tooltip ? (
                <Tippy arrow={false} animation='scale' content={tooltip}>
                  {link}
                </Tippy>
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
