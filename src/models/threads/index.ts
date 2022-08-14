import { actor__difficulty_stats } from '../npcs/actors'
import { Actor } from '../npcs/actors/types'
import { difficulty__stats } from '../npcs/stats/difficulty'
import { thread__placeholder } from './spawn'
import { ChildTask, Task, Thread, ThreadedEntity } from './types'

export const thread__describe_complexity = (thread: Thread) => {
  const { complexity } = thread
  let desc = 'epic'
  if (complexity <= 5) desc = 'simple'
  else if (complexity <= 10) desc = 'standard'
  else if (complexity <= 15) desc = 'involved'
  else if (complexity <= 20) desc = 'elaborate'
  else if (complexity <= 25) desc = 'intricate'
  else if (complexity <= 30) desc = 'byzantine'
  return desc
}

export const thread__task_odds = (params: { difficulty: Thread['difficulty']; actor: Actor }) => {
  const { difficulty, actor } = params
  const { success, tier } = difficulty.pc
    ? difficulty__stats({
        ref: difficulty.pc,
        adversary: difficulty.cr
      })
    : actor__difficulty_stats({
        actor,
        cr: difficulty.cr
      })
  return { odds: 1 - success, tier }
}

export const thread__status = ({ failures, complexity }: Thread) => {
  let desc: Task['status'] = 'failure'
  const failed_ratio = failures / complexity
  if (failed_ratio < 0.1) desc = 'perfection'
  else if (failed_ratio < 0.6) desc = 'success'
  else if (failed_ratio < 1) desc = 'pyrrhic'
  return desc
}

export const task__in_progress = (task: Task) =>
  task.status === 'in progress' ||
  task.status === 'paused' ||
  task.status === 'fresh' ||
  task.status === 'blocked'

export const thread__progress = (params: { thread: Thread; avatar: Actor }) => {
  const { thread, avatar } = params
  let status: Task['status'] = thread__status(thread)
  const failed = status === 'failure'
  const completed = thread.progress >= thread.complexity
  const tasks = thread__tasks({ tasks: thread.tasks, avatar })
  const paused = tasks.some(task => task.thread !== undefined && task__in_progress(task))
  const blocked = tasks.some(
    task =>
      task.thread === undefined &&
      task__in_progress(task) &&
      thread__task_odds({ difficulty: task.difficulty, actor: avatar }).tier === 'insanity'
  )
  const fresh = !thread.opened
  if (!failed && !completed)
    status = thread.closed
      ? 'abandoned'
      : blocked
      ? 'blocked'
      : fresh
      ? 'fresh'
      : paused
      ? 'paused'
      : 'in progress'
  return { failed, completed, status }
}

const thread__expand_task =
  (avatar: Actor) =>
  (task: ChildTask): Task => {
    if (typeof task === 'number') {
      const thread = window.world.threads[task]
      const { status } = thread__progress({ thread, avatar })
      return {
        goal: thread.goal,
        text: thread.text,
        status,
        difficulty: thread.difficulty,
        duration: thread__tasks({ tasks: thread.tasks, avatar }).reduce(
          (sum, task) => sum + task.duration,
          0
        ),
        thread: task,
        exp: thread.exp
      }
    }
    return task
  }

export const thread__tasks = (params: { tasks: ChildTask[]; avatar: Actor }) => {
  const { tasks, avatar } = params
  return tasks.filter(task => task !== thread__placeholder).map(thread__expand_task(avatar))
}

export const thread__in_progress = (params: { thread: Thread; avatar: Actor }) => {
  const { thread, avatar } = params
  return thread__tasks({ tasks: thread.tasks, avatar }).find(task__in_progress)
}

export const thread__collect = (ref: ThreadedEntity) => {
  const threads = ref.threads.map(i => window.world.threads[i])
  return {
    active: threads.filter(thread => !thread.closed),
    closed: threads.filter(thread => thread.closed)
  }
}

export const thread__xp = (xp: number) => `${(xp * 1000).toFixed(0)} xp`
