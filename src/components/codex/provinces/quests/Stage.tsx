import { Grid } from '@mui/material'

import { Stage } from '../../../../models/quests/stages/types'
import { Quest } from '../../../../models/quests/types'
import { DIFFICULTY } from '../../../../models/utilities/difficulty'
import { titleCase } from '../../../../models/utilities/text'
import { decorateText } from '../../../../models/utilities/text/decoration'
import { formatters } from '../../../../models/utilities/text/formatters'
import { VIEW } from '../../../context'
import { style__clickable } from '../../../theme'
import { cssColors } from '../../../theme/colors'
import { StyledText } from '../../common/text/StyledText'

export function StageView(props: { stage: Stage; goToQuest: (_quest: Quest) => void }) {
  const { stage, goToQuest } = props
  const ref = window.world.quests[stage.child]
  const { state } = VIEW.context()
  const { odds, tier } = DIFFICULTY.odds({
    pc: DIFFICULTY.avatar.cr(state.avatar),
    ...stage.difficulty
  })
  return (
    <Grid container alignContent='center'>
      <Grid item xs={12}>
        <StyledText
          text={`${decorateText({
            label: `${formatters.percent(1 - odds)}:`,
            color: DIFFICULTY.lookup[tier].color,
            bold: true
          })} ${decorateText({
            label: titleCase(stage.challenge),
            italics: true
          })}, ${stage.text}.`}
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
