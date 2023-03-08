import { range, scaleLinear } from 'd3'
import { Optional } from 'utility-types'

import { npc__spawn } from '../../npcs'
import { decorateText } from '../../utilities/text/decoration'
import { Thread } from '../types'
import { ActorParams, DecorateActorParams, FindActorParams } from './types'

export const actor__placeHolder = (params: Omit<DecorateActorParams, 'thread'>) => {
  const { label, role, betrayal, subject, spawn } = params
  return `__${label}XXX${role}XXX${spawn ?? ''}XXX${betrayal ?? ''}XXX${subject ?? ''}__`
}

export const actors = {
  patron: (label?: string) =>
    actor__placeHolder({ label: label ?? 'patron', role: 'patron', spawn: 0 }),
  rival: (label?: string) =>
    actor__placeHolder({ label: label ?? 'rival', role: 'rival', spawn: 0 }),
  neutral: (label?: string) => actor__placeHolder({ label: label ?? 'actor', role: 'neutral' }),
  friend: (params: Optional<Omit<DecorateActorParams, 'thread'>, 'role'>) =>
    actor__placeHolder({ role: 'friend', ...params }),
  enemy: (params: Optional<Omit<DecorateActorParams, 'thread'>, 'role'>) =>
    actor__placeHolder({ role: 'enemy', ...params })
}

export const actor__spawn = (params: ActorParams) => {
  const { thread, role, cast = 0.2 } = params
  const province = window.world.provinces[thread.location]
  const actors = new Set(thread.actors.map(actor => actor.idx))
  const prospects = province.actors
    .filter(actor => !actors.has(actor) && window.world.actors[actor].profession.key !== 'custom')
    .map(a => window.world.actors[a])
  const npc =
    prospects.length > 0 && window.dice.random < cast
      ? window.dice.choice(prospects)
      : npc__spawn({ loc: province, ...params })
  const actor = { idx: npc.idx, role, loc: thread.location }
  thread.actors.push(actor)
  return actor
}

export const actor__find = ({ thread, role, spawn, subject, betrayal }: FindActorParams) => {
  const prospects = thread.actors.filter(
    actor =>
      actor.role === role &&
      (actor.loc === thread.location || actor.role === 'patron' || actor.role === 'rival')
  )
  const chance = spawn ?? 1 / prospects.length
  const spawned = prospects.length === 0 || window.dice.random < chance
  const actor = spawned ? actor__spawn({ thread, role }) : window.dice.choice(prospects)
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
    const [label, role, spawn, betrayal, subject] = text.replace(/__/g, '').split('XXX') as [
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
      spawn: spawn === '' ? undefined : parseFloat(spawn),
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
