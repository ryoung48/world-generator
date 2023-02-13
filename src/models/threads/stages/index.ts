import { hub__weather } from '../../regions/hubs/weather'
import { location__spawn } from '../../regions/locations'
import { roundToNearestN } from '../../utilities/math'
import { dayMS, hourMS } from '../../utilities/math/time'
import { decorateText } from '../../utilities/text/decoration'
import { complication__spawn } from '../complications'
import { difficulty__odds } from '../difficulty'
import { task__definition, task__spawn } from '../tasks'
import { Thread } from '../types'
import { Stage } from './types'

export const stage__placeholder = -1

export const stage__current = (thread: Thread) => thread.stages.slice(-1)[0]

export const stage__weather = (params: { thread: Thread; stage: Stage }) => {
  const { thread, stage } = params
  if (!stage.status && window.world.date - stage.setting.memory > dayMS) {
    const loc = window.world.provinces[thread.location]
    const { season, time, heat, conditions, variance } = hub__weather(loc.hub)
    stage.setting.memory = window.world.date
    stage.setting.weather = `${decorateText({
      label: heat.desc,
      tooltip: `${heat.degrees.toFixed(0)}°F`
    })}${
      variance === 'normal'
        ? ''
        : decorateText({ label: '*', color: variance === 'warmer' ? 'red' : 'blue' })
    }, ${season}, ${time}, ${conditions}`
  }
}

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
  const { district, site } = location__spawn({ loc })
  const stage = {
    task,
    text,
    result: '',
    transition,
    child: nested ? stage__placeholder : undefined,
    complication,
    setting: {
      place: `${decorateText({
        link: loc,
        label: `${loc.name}:`,
        bold: true
      })} ${district}, ${site}`,
      weather: '',
      duration: '',
      memory: -Infinity
    },
    difficulty: { cr: thread.difficulty.cr * window.dice.uniform(0.8, 1.2) },
    duration: roundToNearestN(
      window.dice.weightedChoice([
        { w: 2, v: () => window.dice.uniform(hourMS, hourMS * 5) },
        { w: 1, v: () => window.dice.uniform(hourMS * 5, hourMS * 23) }
      ])(),
      hourMS
    )
  }
  thread.stages.push(stage)
  stage__weather({ thread, stage })
}

export const stage__resolve = (params: { pc: number; challenge: number }): Stage['status'] => {
  const { pc, challenge } = params
  const { odds } = difficulty__odds({ pc, cr: challenge })
  const roll = window.dice.random
  const diff = roll - odds
  return diff > 0.4 ? 'perfection' : diff >= 0 ? 'success' : diff > -0.4 ? 'pyrrhic' : 'failure'
}
