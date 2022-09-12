import { Actor } from '../types'

export const personas = [
  'altruistic',
  'greedy',
  'traditional',
  'progressive',
  'honest',
  'deceptive',
  'aggressive',
  'diplomatic',
  'passionate',
  'stoic',
  'gregarious',
  'enigmatic'
] as const

export type persona = typeof personas[number]

export const actor__personaRoll = (npc: Actor) => {
  npc.persona = {
    altruism: window.dice.norm(0.5, 0.15),
    lawful: window.dice.norm(0.5, 0.15),
    change: window.dice.norm(0.5, 0.15),
    conflict: window.dice.norm(0.5, 0.15),
    social: window.dice.norm(0.5, 0.15),
    neuroticism: window.dice.norm(0.5, 0.15)
  }
}
