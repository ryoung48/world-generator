import { location__spawn } from '../../../regions/provinces/locations'
import { hub__weather } from '../../../regions/provinces/weather'
import { difficulty__odds } from '../../../utilities/difficulty'
import { roundToNearestN } from '../../../utilities/math'
import { dayMS, hourMS } from '../../../utilities/math/time'
import { decorateText } from '../../../utilities/text/decoration'
import { Quest } from '../types'
import { Challenges, Stage } from './types'

export const stage__challenges: Challenges = {
  mobility: {
    text: 'acrobatics, dodging hazards, moving quickly through difficult terrain',
    wilderness: 0.8
  },
  stealth: { text: 'hiding, moving quietly, pickpocketing, lockpicking, disguises' },
  investigation: { text: 'searching locations, finding people, solving puzzles' },
  logistics: { text: 'organization and execution of strategic and tactical plans' },
  knowledge: {
    text: 'recalling facts about arcana, history, laws, myths, etiquette, and religions'
  },
  perception: { text: 'notice fine details through sight, hearing, & smell' },
  insight: { text: 'detecting lies, emotions, and intent of others', wilderness: 0.2 },
  survival: {
    text: 'recalling facts about nature, navigation, handling animals, tracking, and medicine',
    wilderness: 0.9
  },
  persuasion: {
    text: 'influencing people through negotiation, charm, oration, deception, or intimidation',
    wilderness: 0.2
  },
  athletics: {
    text: 'running, jumping, climbing, swimming, lifting, throwing, and overcoming obstacles with brute force',
    wilderness: 0.8
  },
  combat: { text: '{ambush|confront|survive an ambush from} hostile forces' }
} as const

export const stage__placeholder = -1

export const stage__current = (quest: Quest) => quest.stages.slice(-1)[0]
export const stage__previous = (quest: Quest) => quest.stages.slice(-2)[0]

export const stage__weather = (params: { quest: Quest; stage: Stage }) => {
  const { quest, stage } = params
  if (!stage.status && window.world.date - stage.setting.memory > dayMS) {
    const loc = window.world.provinces[quest.location]
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

export const stage__spawn = (params: { quest: Quest; transition?: Stage['transition'] }) => {
  const { quest, transition } = params
  const loc = window.world.provinces[quest.location]
  const { district, site } = location__spawn({ loc })
  const challenge = window.dice.weightedChoice(
    Object.keys(stage__challenges).map(_key => {
      const key = _key as keyof Challenges
      let weight = stage__challenges[key].wilderness ?? 0.5
      if (quest.type !== 'wilderness') weight = 1 - weight
      return { v: key, w: weight }
    })
  )
  const stage: Stage = {
    challenge,
    transition,
    setting: {
      loc: quest.location,
      place: `${decorateText({
        label: `${loc.name}:`,
        bold: true
      })} ${district}, ${site}`,
      weather: '',
      duration: '',
      memory: -Infinity
    },
    difficulty: { cr: quest.difficulty.cr * window.dice.uniform(0.8, 1.2) },
    duration: roundToNearestN(
      window.dice.weightedChoice([
        { w: 2, v: () => window.dice.uniform(hourMS, hourMS * 5) },
        { w: 1, v: () => window.dice.uniform(hourMS * 5, hourMS * 23) }
      ])(),
      hourMS
    )
  }
  quest.stages.push(stage)
  stage__weather({ quest, stage })
}

export const stage__resolve = (params: { pc: number; challenge: number }): Stage['status'] => {
  const { pc, challenge } = params
  const { odds } = difficulty__odds({ pc, cr: challenge })
  const roll = window.dice.random
  const diff = roll - odds
  return diff > 0.4 ? 'perfection' : diff >= 0 ? 'success' : diff > -0.4 ? 'pyrrhic' : 'failure'
}
