import { Grid } from '@mui/material'
import { CSSProperties } from 'react'

import { avatar__cr, difficulties, difficulty__odds } from '../../../../models/threads/difficulty'
import { Stage } from '../../../../models/threads/stages/types'
import { Thread } from '../../../../models/threads/types'
import { titleCase } from '../../../../models/utilities/text'
import { decorateText } from '../../../../models/utilities/text/decoration'
import { formatters } from '../../../../models/utilities/text/formatters'
import { view__context } from '../../../context'
import { style__clickable } from '../../../theme'
import { cssColors } from '../../../theme/colors'
import { StyledText } from '../../common/text/StyledText'

const subtitle: CSSProperties = { color: cssColors.subtitle, fontSize: 10 }

export function StageView(props: { stage: Stage; goToThread: (_thread: Thread) => void }) {
  const { stage, goToThread } = props
  const { state } = view__context()
  const { child, challenge, difficulty, text, setting } = stage
  const pc = avatar__cr(state.avatar)
  const { odds, tier } = difficulty__odds({ pc, ...difficulty })
  const ref = window.world.threads[child]
  return (
    <Grid container alignContent='center'>
      <Grid item xs={12}>
        <StyledText
          text={`${decorateText({
            label: `${formatters.percent(1 - odds)}:`,
            color: difficulties[tier].color,
            bold: true
          })} ${decorateText({
            label: titleCase(challenge),
            italics: true
          })}, ${text}.`}
        ></StyledText>
        {ref && (
          <span>
            {' '}
            (
            <span
              className={style__clickable()}
              onClick={() => goToThread(ref)}
              onKeyPress={() => goToThread(ref)}
              role='link'
              tabIndex={0}
            >
              #{ref.idx}
            </span>
            )
          </span>
        )}
      </Grid>
      <Grid item xs={12} style={subtitle}>
        <StyledText
          text={`${decorateText({ label: 'Weather: ', bold: true })} ${setting.weather}${
            setting.duration
          }`}
          color={cssColors.subtitle}
        ></StyledText>
      </Grid>
    </Grid>
  )
}
