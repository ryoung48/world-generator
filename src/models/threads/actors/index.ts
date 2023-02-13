import { range, scaleLinear } from 'd3'
import { Optional } from 'utility-types'

import { npc__spawn } from '../../npcs'
import { decorateText } from '../../utilities/text/decoration'
import { Thread } from '../types'
import { DecorateActorParams, FindActorParams } from './types'

export const actor__placeHolder = (params: Omit<DecorateActorParams, 'thread'>) => {
  const { label, role, betrayal, subject, spawn } = params
  return `__${label}#{${role}}#${spawn ?? ''}#${betrayal ?? ''}#${subject ?? ''}__`
}

export const actors = {
  patron: actor__placeHolder({ label: 'patron', role: 'patron' }),
  rival: (label?: string) => actor__placeHolder({ label: label ?? 'rival', role: 'rival' }),
  neutral: actor__placeHolder({ label: 'actor', role: 'neutral', spawn: true }),
  friend: (params: Optional<Omit<DecorateActorParams, 'thread'>, 'role'>) =>
    actor__placeHolder({ role: 'friend', spawn: true, ...params }),
  enemy: (params: Optional<Omit<DecorateActorParams, 'thread'>, 'role'>) =>
    actor__placeHolder({ role: 'enemy', spawn: true, ...params })
}

const actor__spawn = (thread: Thread) => {
  const province = window.world.provinces[thread.location]
  const actors = new Set(thread.actors.map(actor => actor.idx))
  const prospects = province.actors
    .filter(actor => !actors.has(actor))
    .map(a => window.world.actors[a])
  return prospects.length > 0 && window.dice.random > 0.8
    ? window.dice.choice(prospects)
    : npc__spawn({ loc: province })
}

export const actor__find = ({ thread, role, spawn, subject, betrayal }: FindActorParams) => {
  const prospects = thread.actors.filter(
    actor =>
      actor.role === role &&
      (actor.loc === thread.location || actor.role === 'patron' || actor.role === 'rival')
  )
  const chance = !spawn ? 0 : 1 / prospects.length
  const spawned = prospects.length === 0 || window.dice.random < chance
  const actor = spawned
    ? { idx: actor__spawn(thread).idx, role, loc: thread.location }
    : window.dice.choice(prospects)
  if (spawned) thread.actors.push(actor)
  if (betrayal) actor.role = betrayal
  if (subject) thread.subject = actor.idx
  return actor
}

const actor__decorate = (params: DecorateActorParams) => {
  const { label, role } = params
  const actor = actor__find(params)
  return decorateText({ label: label ?? role, link: window.world.actors[actor.idx] })
}

export const actor__fill = (params: { text: string; thread: Thread }) => {
  const { text, thread } = params
  return window.dice.spin(text).replace(/__.*?__/g, text => {
    const [label, role, spawn, betrayal, subject] = text.replace(/__/g, '').split('#') as [
      string,
      Thread['actors'][number]['role'],
      string,
      Thread['actors'][number]['role'],
      string
    ]
    return actor__decorate({
      label,
      thread,
      role,
      spawn: spawn === 'true',
      subject: subject === 'true',
      betrayal
    })
  })
}

export const enemies__spawn = (label: string) =>
  decorateText({
    label,
    tooltip: window.dice.weightedChoice([
      { w: 3, v: 'bandit raiders' },
      { w: 5, v: 'criminal thugs' },
      { w: 1, v: 'religious zealots' },
      { w: 1, v: 'dark cultists' },
      { w: 1, v: 'cult inquisitor' },
      { w: 2, v: 'ruthless assassins' },
      { w: 3, v: 'rival mercenaries' },
      { w: 3, v: 'angry mob' },
      { w: 2, v: 'disguised warriors' },
      { w: 3, v: 'paid guardsman' },
      { w: 2, v: 'elite bodyguards' },
      { w: 2, v: 'city guards' },
      { w: 1, v: 'indentured mage' },
      { w: 1, v: 'beast master' },
      { w: 1, v: 'skilled sorcerer' },
      { w: 1, v: 'mad alchemist' },
      { w: 1, v: 'rebel soldiers' },
      { w: 1, v: 'foreign agents' },
      { w: 2, v: 'grizzled veterans' },
      { w: 1, v: 'inhuman aberration' },
      { w: 1, v: 'ethnic supremacists' }
    ])
  })

const cr__range = range(50)
const cr__scale = scaleLinear()
  .domain(cr__range)
  .range(cr__range.map(i => 2 ** i - 1))
export const actor__cr = (level: number) => cr__scale(level)
export const actor__lvl = (cr: number) => cr__scale.invert(cr)
