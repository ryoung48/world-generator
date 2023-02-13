import { Grid } from '@mui/material'

import { thread__xp } from '../../../../models/threads'
import { difficulties, difficulty__odds } from '../../../../models/threads/difficulty'
import { Stage } from '../../../../models/threads/stages/types'
import { Thread } from '../../../../models/threads/types'
import { decorateText } from '../../../../models/utilities/text/decoration'
import { formatters } from '../../../../models/utilities/text/formatters'
import { view__context } from '../../../context'
import { style__clickable } from '../../../theme'
import { cssColors } from '../../../theme/colors'
import { StyledText } from '../../common/text/StyledText'

export function StageView(props: { stage: Stage; goToThread: (_thread: Thread) => void }) {
  const { stage, goToThread } = props
  const ref = window.world.threads[stage.child]
  const { state } = view__context()
  const { odds, tier } = difficulty__odds({ pc: state.avatar.cr, ...stage.difficulty })
  return (
    <Grid container alignContent='center'>
      <Grid item xs={12}>
        <StyledText
          text={`${decorateText({
            label: `${formatters.percent(1 - odds)}:`,
            color: difficulties[tier].color,
            bold: true
          })} ${stage.text}`}
        ></StyledText>
        <i>
          <StyledText text={stage.result ?? ''}></StyledText>
        </i>
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
      <Grid item xs={12} style={{ color: cssColors.subtitle, fontSize: 10 }}>
        <StyledText
          text={`${stage.setting.place}, ${stage.setting.weather}${stage.setting.duration}`}
          color={cssColors.subtitle}
        ></StyledText>
      </Grid>
      {stage.xp !== undefined && (
        <Grid item xs={12} style={{ color: cssColors.subtitle, fontSize: 10 }}>
          <span>
            <b>Reward:</b>
            {` ${thread__xp(stage.xp)}`}
          </span>
        </Grid>
      )}
    </Grid>
  )
}
