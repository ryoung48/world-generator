import { hub__weather } from '../../regions/provinces/weather'
import { difficulty__odds } from '../../utilities/difficulty'
import { dayMS } from '../../utilities/math/time'
import { openai__chat } from '../../utilities/openai'
import { decorateText } from '../../utilities/text/decoration'
import { Quest } from '../types'
import { Stage, StageOptions } from './types'

export const stage__current = (quest: Quest) =>
  quest.objectives.find(objective => !objective.status)

export const stage__weather = (params: { quest: Quest; stage: Stage }) => {
  const { quest, stage } = params
  if (!stage.status && window.world.date - stage.setting.memory > dayMS) {
    const loc = window.world.provinces[quest.province]
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

const challenges = [
  'mobility: acrobatics, dodging hazards, moving quickly through difficult terrain',
  'stealth: hiding, moving quietly, pickpocketing, lockpicking, disguises',
  'investigation: searching locations, finding people, solving puzzles',
  'logistics: organization and execution of strategic and tactical plans',
  'knowledge: recalling facts about arcana, history, laws, myths, etiquette, and religions',
  'perception: notice fine details through sight, hearing, and smell',
  'insight: detecting lies, emotions, and intent of others',
  'survival: recalling facts about nature, navigation, handling animals, tracking, and medicine',
  'persuasion: influencing people through negotiation, charm, oration, deception, or intimidation',
  'athletics: running, jumping, climbing, swimming, lifting, throwing, and overcoming obstacles with brute force',
  'combat: ambush, confront, or survive an ambush from hostile forces'
]

export const stage__spawn = async (quest: Quest) => {
  const current = stage__current(quest)
  if (current.options) return
  const solutions = window.dice.sample(challenges, 5)
  const options = await openai__chat<StageOptions>(`
    given the following information:
    
    current objective:
    \`\`\`json
    {
        "text": "${current.text}",
        "location": "${current.location}",
        "resolution": "${current.resolution}"
    }
    \`\`\`

    return the following:
    * pick three of the five skills listed below to flavor potential solutions for the current objective above:
      ${solutions.join('\n')}
    * add possible side effects depending on how the objective is resolved; the side effects should be split into two categories: positive and negative


    keep in mind that:
    * side effects should be summarized into 1-2 sentences with a maximum of 30 words each
    * be as specific as possible; for example, "find the wizard's spellbook" is better than "find something valuable"
    * side effects should not depend on the player's chosen skills
    
    The output should be a markdown code snippet formatted in the following schema:
    \`\`\`json
    {
      "options": { tag: string; text: string }[]
      "sideEffects": {
          "positive": string
          "negative": string
      }
  }
    \`\`\`
    
    below is an example of what I am looking for given current objective: 
    \`\`\`json
    {
      "text": "Perform a ritual to communicate with the spirit",
      "location": "A large burial chamber deep inside the mine with ancient inscriptions"
      "resolution": "The spirit was partially appeased, but demanded the mining operations to cease"
  }
    \`\`\`

    and the following skills:
    investigation: searching locations, finding people, solving puzzles
    stealth: hiding, moving quietly, pickpocketing, lockpicking, disguises
    knowledge: recalling facts about arcana, history, laws, myths, etiquette, and religions
    insight: detecting lies, emotions, and intent of others
    combat: ambush, confront, or survive an ambush from hostile forces

    \`\`\`json
    {
      "options": [
          {
              "tag": "knowledge",
              "text": "Utilize ancient lore to effectively conduct the ritual"
          },
          {
              "tag": "combat",
              "text": "Fight off guardian spirits obstructing the ritual site"
          },
          {
              "tag": "insight",
              "text": "Gauge the spirit's emotions to better appease it during the ritual"
          }
      ],
      "sideEffects": {
          "positive": "If the ritual succeeds, the tomb's guardian spirit reveals hidden paths in the mine",
          "negative": "Failure agitates the spirit, causing tremors that make parts of the mine inaccessible"
      }
  }
    \`\`\`
        `)
  if (options) {
    current.options = options.options.slice(0, 3).map(option => ({
      ...option,
      difficulty: quest.difficulty.cr * window.dice.uniform(0.8, 1.2)
    }))
    current.sideEffects = options.sideEffects
  }
}

export const stage__resolve = (params: { pc: number; challenge: number }): Stage['status'] => {
  const { pc, challenge } = params
  const { odds } = difficulty__odds({ pc, cr: challenge })
  const roll = window.dice.random
  const diff = roll - odds
  return diff > 0.4 ? 'perfection' : diff >= 0 ? 'success' : diff > -0.4 ? 'pyrrhic' : 'failure'
}
