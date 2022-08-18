import { Thread } from '../types'
import { goal__templates } from './templates'

const templates = Object.values(goal__templates)

export const goal__spawn = (thread?: Thread) => {
  const goals = thread
    ? [
        thread.goal,
        ...thread.tasks.map(task =>
          typeof task === 'number' ? window.world.threads[task].goal : task.goal
        )
      ].slice(-3)
    : []
  const empty = goals.length <= 1
  return window.dice.weightedChoice(
    templates.map(template => {
      const cannotStart = empty && template.nonEmpty
      const repetitive = goals.includes(template.tag)
      const invalid = repetitive || cannotStart
      return { w: invalid ? 0 : template.weight, v: template }
    })
  )
}
