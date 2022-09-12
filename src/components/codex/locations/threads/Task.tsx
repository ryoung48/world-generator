import { Grid } from '@mui/material'

import { difficulties } from '../../../../models/npcs/stats/difficulty'
import { thread__formattedXP } from '../../../../models/threads'
import { task__odds } from '../../../../models/threads/tasks'
import { Task } from '../../../../models/threads/tasks/types'
import { Thread } from '../../../../models/threads/types'
import { describeDuration } from '../../../../models/utilities/math/time'
import { titleCase } from '../../../../models/utilities/text'
import { decorateText } from '../../../../models/utilities/text/decoration'
import { formatters } from '../../../../models/utilities/text/formatters'
import { view__context } from '../../../context'
import { style__clickable } from '../../../theme'
import { StyledText } from '../../common/text/StyledText'

export function TaskView(props: { task: Task; goToThread: (_thread: Thread) => void }) {
  const { task, goToThread } = props
  const { state } = view__context()
  const avatar = window.world.actors[state.avatar]
  const { odds, tier } = task__odds({ difficulty: task.difficulty, actor: avatar })
  const ref = window.world.threads[task.idx]
  const title = task.goal
  return (
    <Grid container>
      <Grid item xs={12}>
        <span>
          <i>{titleCase(title)}</i> (
          <StyledText
            text={decorateText({
              label: formatters.percent({
                value: odds,
                precision: 2
              }),
              color: difficulties[tier].color
            })}
          ></StyledText>
          {ref && (
            <span>
              ,{' '}
              <span
                className={style__clickable()}
                onClick={() => goToThread(ref)}
                onKeyPress={() => goToThread(ref)}
                role='link'
                tabIndex={0}
              >
                #{ref.idx}
              </span>
            </span>
          )}
        </span>
        ): <StyledText text={task.text}></StyledText>
      </Grid>
      <Grid item xs={12}>
        <i>Duration:</i>
        {` ${task.duration ? describeDuration(task.duration) : '--'}.`}
      </Grid>
      {task.exp !== 0 && (
        <Grid item xs={12}>
          <i>Rewards:</i>
          {` ${thread__formattedXP(task.exp)}.`}
        </Grid>
      )}
    </Grid>
  )
}
