import { Hooks } from '../types'
import { missions } from './types'

export const mission__spawn = (type: Hooks['tags'][number]['type']) => {
  const wild = type === 'wilderness' || type === 'ruin'
  const mission = window.dice.choice<keyof typeof missions>(
    wild
      ? ['explore', 'retrieval', 'bounty', 'rescue', 'sabotage', 'defense']
      : ['rescue', 'smuggling', 'sabotage', 'defense', 'espionage', 'theft']
  )
  return {
    tag: mission,
    text: window.dice.choice([...missions[mission].variations]),
    complication: window.dice.choice([...missions[mission].complication]),
    intro: window.dice.choice([
      'You find a mysterious note or map on a defeated enemy.',
      'Overheard conversations in a public space hint at something amiss.',
      'An individual approaches you with a sorrowful tale, asking for aid.',
      'While exploring, you come across written information suggesting something significant.',
      'Someone who has previously hired you seeks you out again for a new task.',
      'A local resident approaches you urgently, needing assistance with a pressing matter.',
      "You're handed a message by someone who thinks you're involved in their undisclosed plans.",
      'You encounter an area dramatically altered, indicating something significant has occurred there.',
      'After defeating a creature, you discover an item suggesting it came from somewhere unusual.',
      'You find an object that contains clues pointing to something more.',
      'You are offered a job by someone who might not have your best interests at heart.',
      'Someone close to you is affected by a situation, drawing you into it.',
      'You accidentally find yourself in the middle of an ongoing event or ritual.',
      'A message intended for someone else falls into your hands, revealing a hidden agenda.',
      'A person of authority requests your services for a matter of public importance.',
      'You meet individuals who tried and failed at a task, urging you to take it up.',
      'A public notice seeks assistance for an unspecified but urgent issue.',
      'An organization advertises a job opening for a risky yet rewarding assignment.'
    ])
  }
}
