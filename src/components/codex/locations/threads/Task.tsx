import { Grid } from '@mui/material'

import { view__context } from '../../../../context'
import { difficulties } from '../../../../models/npcs/stats/difficulty'
import { thread__task_odds, thread__xp } from '../../../../models/threads'
import { Task, Thread } from '../../../../models/threads/types'
import { describe_duration } from '../../../../models/utilities/math/time'
import { title_case } from '../../../../models/utilities/text'
import { decorate_text } from '../../../../models/utilities/text/decoration'
import { formatters } from '../../../../models/utilities/text/formatters'
import { style__clickable } from '../../../theme'
import { StyledText } from '../../common/text/StyledText'

export function TaskView(props: { task: Task; go_to_thread: (_thread: Thread) => void }) {
  const { task, go_to_thread } = props
  const { state } = view__context()
  const avatar = window.world.actors[state.avatar]
  const { odds, tier } = thread__task_odds({ difficulty: task.difficulty, actor: avatar })
  const ref = window.world.threads[task.thread]
  return (
    <Grid container>
      <Grid item xs={12}>
        {ref ? (
          <span>
            <i>{title_case(ref.goal)}</i> (
            <span
              className={style__clickable()}
              onClick={() => go_to_thread(ref)}
              onKeyPress={() => go_to_thread(ref)}
              role='link'
              tabIndex={0}
            >
              #{ref.idx}
            </span>
            )
          </span>
        ) : (
          <i>{title_case(task.goal)}</i>
        )}
        <StyledText
          text={` (${decorate_text({
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
        {` ${describe_duration(task.duration)}.`}
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
