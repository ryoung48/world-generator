import { Grid } from '@mui/material'

import { Stage } from '../../../../models/threads/stages/types'
import { Thread } from '../../../../models/threads/types'
import { style__clickable } from '../../../theme'
import { cssColors } from '../../../theme/colors'
import { StyledText } from '../../common/text/StyledText'

export function StageView(props: { stage: Stage; goToThread: (_thread: Thread) => void }) {
  const { stage, goToThread } = props
  const ref = window.world.threads[stage.child]
  return (
    <Grid container alignContent='center'>
      <Grid item xs={12}>
        <StyledText text={stage.text}></StyledText>
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
        <StyledText text={stage.setting} color={cssColors.subtitle}></StyledText>
      </Grid>
    </Grid>
  )
}
