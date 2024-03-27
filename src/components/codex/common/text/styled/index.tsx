import { css } from '@emotion/css'
import { Grid } from '@mui/material'
import { CSSProperties } from 'react'

import { PROVINCE } from '../../../../../models/regions/provinces'
import { entity__tags, TaggedEntity } from '../../../../../models/utilities/entities/types'
import { TEXT } from '../../../../../models/utilities/text'
import { VIEW } from '../../../../context'
import { cssColors } from '../../../../theme/colors'
import { DetailedTableRow } from '../../DataTable'
import { LazyTippy } from '../LazyTippy'
import { DetailedToolTipParams } from './types'

const DescriptiveToolTip = ({ title, subtitle, content }: DetailedToolTipParams) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <DetailedTableRow
          title={<span style={{ fontSize: 14 }}>{title}</span>}
          subtitle={
            <span style={{ fontSize: 10 }}>
              <StyledText color={cssColors.subtitle} text={subtitle}></StyledText>
            </span>
          }
        ></DetailedTableRow>
      </Grid>
      {content.map(({ label, text }) => {
        return (
          <Grid key={label} item xs={12} style={{ fontSize: 10, color: cssColors.subtitle }}>
            <span>
              <b>{label}:</b> <StyledText text={text} color={cssColors.subtitle}></StyledText>
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
  return (
    <span className={style__links}>
      {text.split(/@(.+?)@/g).map((text, j) => {
        if (text.match(/.+|.+|.+/)) {
          const [label, i, cat, tooltip, color, italics, bold, underline, details] =
            text.split('##')
          const tag = cat as TaggedEntity['tag']
          const idx = parseInt(i)
          const onClick = entity__tags.includes(tag)
            ? () =>
                dispatch({
                  type: 'transition',
                  payload: {
                    tag: tag === 'province' ? 'place' : tag,
                    province:
                      tag === 'province'
                        ? idx
                        : PROVINCE.nation(window.world.provinces[idx]).capital,
                    place: 0,
                    zoom: true
                  }
                })
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
          return (
            <span key={j}>
              {details ? (
                <LazyTippy
                  arrow={false}
                  animation='scale'
                  theme='actor'
                  interactive={true}
                  appendTo={document.body}
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
