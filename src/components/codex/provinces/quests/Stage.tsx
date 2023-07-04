import { Grid } from '@mui/material'

import { stage__challenges } from '../../../../models/threads/quests/stages'
import { Stage } from '../../../../models/threads/quests/stages/types'
import { Quest } from '../../../../models/threads/quests/types'
import { avatar__cr, difficulties, difficulty__odds } from '../../../../models/utilities/difficulty'
import { titleCase } from '../../../../models/utilities/text'
import { decorateText } from '../../../../models/utilities/text/decoration'
import { formatters } from '../../../../models/utilities/text/formatters'
import { view__context } from '../../../context'
import { style__clickable } from '../../../theme'
import { cssColors } from '../../../theme/colors'
import { StyledText } from '../../common/text/StyledText'

export function StageView(props: { stage: Stage; goToQuest: (_quest: Quest) => void }) {
  const { stage, goToQuest } = props
  const ref = window.world.quests[stage.child]
  const { state } = view__context()
  const { odds, tier } = difficulty__odds({ pc: avatar__cr(state.avatar), ...stage.difficulty })
  return (
    <Grid container alignContent='center'>
      <Grid item xs={12}>
        <StyledText
          text={`${decorateText({
            label: `${formatters.percent(1 - odds)}:`,
            color: difficulties[tier].color,
            bold: true
          })} ${decorateText({
            label: titleCase(stage.challenge),
            italics: true
          })}, ${stage__challenges[stage.challenge].text}.`}
        ></StyledText>
        {ref && (
          <span>
            {' '}
            (
            <span
              className={style__clickable()}
              onClick={() => goToQuest(ref)}
              onKeyPress={() => goToQuest(ref)}
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
    </Grid>
  )
}
