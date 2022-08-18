import { Grid } from '@mui/material'

import { difficulties } from '../../../../models/npcs/stats/difficulty'
import { thread__taskOdds, thread__xp } from '../../../../models/threads'
import { Task, Thread } from '../../../../models/threads/types'
import { describeDuration } from '../../../../models/utilities/math/time'
import { titleCase } from '../../../../models/utilities/text'
import { decorateText } from '../../../../models/utilities/text/decoration'
import { formatters } from '../../../../models/utilities/text/formatters'
import { view__context } from '../../../context'
import { style__clickable } from '../../../theme'
import { StyledText } from '../../common/text/StyledText'

export function TaskView(props: { task: Task; goToThread: (_thread: Thread) => void }) {
  const { task, goToThread: goToThread } = props
  const { state } = view__context()
  const avatar = window.world.actors[state.avatar]
  const { odds, tier } = thread__taskOdds({ difficulty: task.difficulty, actor: avatar })
  const ref = window.world.threads[task.thread]
  return (
    <Grid container>
      <Grid item xs={12}>
        {ref ? (
          <span>
            <i>{titleCase(ref.goal)}</i> (
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
        ) : (
          <i>{titleCase(task.goal)}</i>
        )}
        <StyledText
          text={` (${decorateText({
            label: formatters.percent({
              value: odds,
              precision: 2
            }),
            color: difficulties[tier].color
          })}): `}
        ></StyledText>
        <StyledText text={task.text}></StyledText>
      </Grid>
      <Grid item xs={12}>
        <i>Duration:</i>
        {` ${describeDuration(task.duration)}.`}
      </Grid>
      {task.exp !== undefined && (
        <Grid item xs={12}>
          <i>Rewards:</i>
          {` ${thread__xp(task.exp)}.`}
        </Grid>
      )}
    </Grid>
  )
}
