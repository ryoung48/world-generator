import { hub__weather } from '../../regions/hubs/weather'
import { location__spawn } from '../../regions/locations'
import { decorateText } from '../../utilities/text/decoration'
import { complication__spawn } from '../complications'
import { task__definition, task__spawn } from '../tasks'
import { Thread } from '../types'
import { Stage } from './types'

export const stage__placeholder = -1

export const stage__current = (thread: Thread) => thread.stages.slice(-1)[0]

export const stage__spawn = (params: { thread: Thread; transition?: Stage['transition'] }) => {
  const { thread, transition } = params
  const { depth } = thread
  const current = stage__current(thread)
  const { tag: task, text } = task__spawn({ blacklist: [current?.task], thread })
  const nested = depth < 2 && !transition && window.dice.random < task__definition[task].nested
  const complication =
    !current?.complication && window.dice.random < 0.1
      ? complication__spawn({ thread, type: 'task' })
      : undefined
  const loc = window.world.provinces[thread.location]
  const { season, time, heat, conditions, variance } = hub__weather(loc.hub)
  const { district, site } = location__spawn({ loc })
  thread.stages.push({
    task,
    text,
    transition,
    child: nested ? stage__placeholder : undefined,
    complication,
    setting: `${decorateText({
      label: `${loc.name}:`,
      bold: true
    })} ${district}, ${site}, ${decorateText({
      label: heat.desc,
      tooltip: `${heat.degrees.toFixed(0)}°F`
    })}${
      variance === 'normal'
        ? ''
        : decorateText({ label: '*', color: variance === 'warmer' ? 'red' : 'blue' })
    }, ${season}, ${time}, ${conditions}`
  })
}

export const stage__resolve = (): Stage['status'] => {
  const diff = window.dice.uniform(-0.5, 0.5)
  return diff > 0.4 ? 'perfection' : diff >= 0 ? 'success' : diff > -0.4 ? 'pyrrhic' : 'failure'
}
