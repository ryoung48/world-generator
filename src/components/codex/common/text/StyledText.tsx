import { css } from '@emotion/css'
import { Grid } from '@mui/material'
import { CSSProperties } from 'react'

import { CULTURE } from '../../../../models/npcs/cultures'
import { decorateItem } from '../../../../models/npcs/equipment'
import { SPECIES } from '../../../../models/npcs/species'
import { entity__tags, TaggedEntity } from '../../../../models/utilities/entities/types'
import { properList } from '../../../../models/utilities/text'
import { decorateText } from '../../../../models/utilities/text/decoration'
import { VIEW } from '../../../context'
import { cssColors } from '../../../theme/colors'
import { DetailedTableRow } from '../DataTable'
import { LazyTippy } from './LazyTippy'

const DescribeActor = ({ idx }: { idx: number }) => {
  const actor = window.world.npcs[idx]
  const culture = window.world.cultures[actor.culture]
  return (
    <Grid container style={{ fontSize: 14 }}>
      <Grid item xs={12}>
        <DetailedTableRow
          title={actor.name}
          subtitle={
            <span>
              <StyledText
                color={cssColors.subtitle}
                text={`${actor.age}, ${actor.gender} ${decorateText({
                  link: culture,
                  label: culture.species,
                  tooltip: culture.name,
                  color: cssColors.subtitle
                })}, ${actor.profession.title}`}
              ></StyledText>
            </span>
          }
        ></DetailedTableRow>
      </Grid>
      <Grid item xs={12} style={{ fontSize: 10, color: cssColors.subtitle }}>
        <span>
          <b>appearance:</b>{' '}
          <StyledText text={`${actor.appearance}`} color={cssColors.subtitle}></StyledText>
        </span>
      </Grid>
      <Grid item xs={12} style={{ fontSize: 10, color: cssColors.subtitle }}>
        <span>
          <b>personality:</b> {actor.personality.join(', ')}
        </span>
      </Grid>
      <Grid item xs={12} style={{ fontSize: 10, color: cssColors.subtitle }}>
        <span>
          <b>quirks:</b>{' '}
          <StyledText
            text={actor.quirks.map(({ text }) => text).join(', ')}
            color={cssColors.subtitle}
          ></StyledText>
        </span>
      </Grid>
      {actor.equipment && (
        <Grid item xs={12} style={{ fontSize: 10, color: cssColors.subtitle }}>
          <span>
            <b>equipment:</b>{' '}
            <StyledText
              text={Object.values(actor.equipment)
                .map(item => decorateItem(item))
                .join(', ')}
              color={cssColors.subtitle}
            ></StyledText>
          </span>
        </Grid>
      )}
    </Grid>
  )
}

const DescribeCulture = ({ idx }: { idx: number }) => {
  const culture = window.world.cultures[idx]
  const { skin } = culture.appearance
  const species = SPECIES.lookup[culture.species]
  return (
    <Grid container style={{ fontSize: 14 }}>
      <Grid item xs={12}>
        <DetailedTableRow
          title={culture.name}
          subtitle={
            <span>
              <StyledText text={`${culture.species} (${culture.zone})`}></StyledText>
            </span>
          }
        ></DetailedTableRow>
      </Grid>
      <Grid item xs={12} style={{ fontSize: 10, color: cssColors.subtitle }}>
        <span>
          <b>appearance:</b> {properList(skin.colors, 'or')} {species.traits.skin}
          {skin.texture ? ` (${skin.texture})` : ''}
        </span>
      </Grid>
      <Grid item xs={12} style={{ fontSize: 10, color: cssColors.subtitle }}>
        <span>
          <b>fashion:</b> {culture.fashion.scheme}
        </span>
      </Grid>
      <Grid item xs={12} style={{ fontSize: 10, color: cssColors.subtitle }}>
        <span>
          <b>values:</b>{' '}
          <StyledText
            color={cssColors.subtitle}
            text={culture.values
              .map(value =>
                decorateText({ label: value, tooltip: CULTURE.values[value].text.toString() })
              )
              .join(', ')}
          ></StyledText>
        </span>
      </Grid>
      <Grid item xs={12} style={{ fontSize: 10, color: cssColors.subtitle }}>
        <span>
          <b>traditions:</b>{' '}
          <StyledText
            text={`${decorateText({
              label: culture.traditions.good,
              tooltip: CULTURE.traditions.good[culture.traditions.good].text.toString(),
              color: cssColors.subtitle
            })}, ${decorateText({
              label: culture.traditions.bad,
              tooltip: CULTURE.traditions.bad[culture.traditions.bad].text.toString(),
              color: cssColors.subtitle
            })}`}
          ></StyledText>
        </span>
      </Grid>
    </Grid>
  )
}

const DescribeCourt = ({ idx }: { idx: number }) => {
  const court = window.world.courts[idx]
  return (
    <Grid container style={{ fontSize: 14 }}>
      <Grid item xs={12}>
        <DetailedTableRow
          title={court.name}
          subtitle={
            <span>
              <StyledText text={court.subtitle}></StyledText>
            </span>
          }
        ></DetailedTableRow>
      </Grid>
      <Grid item xs={12} style={{ fontSize: 10, color: cssColors.subtitle }}>
        <span>
          <b>theme:</b> {court.theme.text.toLowerCase()}
        </span>
      </Grid>
      <Grid item xs={12} style={{ fontSize: 10, color: cssColors.subtitle }}>
        <span>
          <b>conflict:</b> {court.conflict.toLowerCase()}
        </span>
      </Grid>
      <Grid item xs={12} style={{ fontSize: 10, color: cssColors.subtitle }}>
        <span>
          <b>defenses:</b> {court.defense.toLowerCase()}
        </span>
      </Grid>
      <Grid item xs={12} style={{ fontSize: 10, color: cssColors.subtitle }}>
        <span>
          <b>actors:</b>{' '}
          <StyledText
            text={court.actors
              .map(a => {
                const actor = window.world.npcs[a]
                return decorateText({
                  label: actor.name.toLowerCase(),
                  link: actor,
                  color: cssColors.subtitle
                })
              })
              .join(', ')}
          ></StyledText>
        </span>
      </Grid>
    </Grid>
  )
}

const DescribeRuin = ({ idx }: { idx: number }) => {
  const ruin = window.world.ruins[idx]
  return (
    <Grid container style={{ fontSize: 14 }}>
      <Grid item xs={12}>
        <DetailedTableRow
          title={ruin.name}
          subtitle={<span>{ruin.subtype} (ruins)</span>}
        ></DetailedTableRow>
      </Grid>
      <Grid item xs={12} style={{ fontSize: 10, color: cssColors.subtitle }}>
        <span>
          <b>mood:</b> {ruin.mood}
        </span>
      </Grid>
      <Grid item xs={12} style={{ fontSize: 10, color: cssColors.subtitle }}>
        <span>
          <b>hazards:</b> <StyledText text={`${ruin.hostiles}, ${ruin.hazards}`}></StyledText>
        </span>
      </Grid>
      <Grid item xs={12} style={{ fontSize: 10, color: cssColors.subtitle }}>
        <span>
          <b>enigmas:</b> {ruin.enigmas}
        </span>
      </Grid>
      <Grid item xs={12} style={{ fontSize: 10, color: cssColors.subtitle }}>
        <span>
          <b>treasures:</b> {ruin.treasures}
        </span>
      </Grid>
    </Grid>
  )
}

const DescribeReligion = ({ idx }: { idx: number }) => {
  const religion = window.world.religions[idx]
  return (
    <Grid container style={{ fontSize: 14 }}>
      <Grid item xs={12}>
        <DetailedTableRow
          title={religion.name}
          subtitle={`${religion.type} (${religion.leadership})`}
        ></DetailedTableRow>
      </Grid>
      <Grid item xs={12} style={{ fontSize: 10, color: cssColors.subtitle }}>
        <span>
          <b>clergy:</b> {religion.clergy}
        </span>
      </Grid>
      <Grid item xs={12} style={{ fontSize: 10, color: cssColors.subtitle }}>
        <span>
          <b>themes:</b>{' '}
          <StyledText
            text={religion.themes
              .map(({ tag, text }) => decorateText({ label: tag, tooltip: text }))
              .join(', ')}
            color={cssColors.subtitle}
          ></StyledText>
        </span>
      </Grid>
      <Grid item xs={12} style={{ fontSize: 10, color: cssColors.subtitle }}>
        <span>
          <b>traditions:</b>{' '}
          <StyledText
            text={religion.traditions
              .map(({ tag, text }) => decorateText({ label: tag, tooltip: text }))
              .join(', ')}
            color={cssColors.subtitle}
          ></StyledText>
        </span>
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
  return (
    <span className={style__links}>
      {text.split(/@(.+?)@/g).map((text, j) => {
        if (text.match(/.+|.+|.+/)) {
          const [label, i, cat, tooltip, color, italics, bold, underline] = text.split('##')
          const tag = cat as TaggedEntity['tag']
          const idx = parseInt(i)
          const detailedTooltip =
            cat === 'actor' ||
            cat === 'culture' ||
            cat === 'religion' ||
            cat === 'court' ||
            cat === 'ruin'
          const onClick =
            entity__tags.includes(tag) && !detailedTooltip
              ? () => dispatch({ type: 'transition', payload: { tag, idx, zoom: true } })
              : false
          const textColor = color !== '' ? color : baseColor
          const underlineColor = underline || textColor
          const style: CSSProperties = {
            cursor: onClick || tooltip || detailedTooltip ? 'pointer' : undefined,
            color: textColor,
            fontStyle: italics === 'true' ? 'italic' : undefined,
            fontWeight: bold === 'true' ? 'bold' : undefined,
            borderBottom:
              onClick && !detailedTooltip
                ? `1px solid ${underlineColor}`
                : tooltip || detailedTooltip
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
              {detailedTooltip ? (
                <LazyTippy
                  arrow={false}
                  animation='scale'
                  theme='actor'
                  interactive={true}
                  appendTo={document.body}
                  content={
                    cat === 'actor' ? (
                      <DescribeActor idx={idx} />
                    ) : cat === 'culture' ? (
                      <DescribeCulture idx={idx} />
                    ) : cat === 'court' ? (
                      <DescribeCourt idx={idx} />
                    ) : cat === 'ruin' ? (
                      <DescribeRuin idx={idx} />
                    ) : (
                      <DescribeReligion idx={idx} />
                    )
                  }
                >
                  {link}
                </LazyTippy>
              ) : tooltip ? (
                <LazyTippy arrow={false} animation='scale' content={tooltip}>
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
