import { Grid } from '@mui/material'

import { THREAD } from '../../../models/threads'
import { DIFFICULTY } from '../../../models/threads/difficulty'
import { Stage } from '../../../models/threads/stages/types'
import { Thread } from '../../../models/threads/types'
import { TEXT } from '../../../models/utilities/text'
import { StyledText } from '../../common/text/styled'
import { style__clickable } from '../../theme'

export function StageView(props: {
  stage: Stage
  avatar: number
  goToThread: (_thread: Thread) => void
}) {
  const { stage, avatar, goToThread } = props
  const { odds, tier } = DIFFICULTY.contest({ task: stage, avatar })
  const child = THREAD.get.child(stage)
  const title = 'test'
  return (
    <Grid container>
      <Grid item xs={12}>
        <span>
          <i>{TEXT.titleCase(title)}</i> (
          <StyledText
            text={TEXT.decorate({
              label: TEXT.formatters.percent(1 - odds, 2),
              color: DIFFICULTY.tiers[tier].color
            })}
          ></StyledText>
          {child && (
            <span>
              ,{' '}
              <span
                className={style__clickable()}
                onClick={() => goToThread(child)}
                onKeyPress={() => goToThread(child)}
                role='link'
                tabIndex={0}
              >
                #{child.idx}
              </span>
            </span>
          )}
        </span>
        ): <span>description</span>
      </Grid>
    </Grid>
  )
}
