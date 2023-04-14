import { Thread } from '../types'
import { missions } from './types'

export const mission__spawn = (type: Thread['type']) => {
  const wild = type === 'wilderness' || type === 'ruin'
  const mission = window.dice.choice<keyof typeof missions>(
    wild
      ? ['explore', 'retrieval', 'bounty', 'rescue', 'sabotage', 'defense']
      : ['rescue', 'smuggling', 'sabotage', 'defense', 'espionage', 'theft']
  )
  return {
    tag: mission,
    text: window.dice.spin(missions[mission].text)
  }
}
