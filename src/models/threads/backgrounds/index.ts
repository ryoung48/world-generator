import { capitalize } from '@mui/material'

import { hub__isVillage } from '../../regions/hubs'
import { Province } from '../../regions/provinces/types'
import { mission__spawn } from '../mission'
import { Thread } from '../types'
import { actor__spawn, decorateTag } from './decorations'
import { enemies } from './enemies'
import { communities } from './hooks/communities'
import { courts } from './hooks/courts'
import { religions } from './hooks/religions'
import { ruins } from './hooks/ruins'
import { wilderness } from './hooks/wilderness'

const hook__mapping = {
  community: communities,
  wilderness: wilderness,
  ruin: ruins,
  court: courts,
  religion: religions
} as const

export const background__spawn = (loc: Province) => {
  const village = hub__isVillage(loc.hub)
  const type = window.dice.weightedChoice<Thread['type']>([
    { v: 'community', w: 1 },
    { v: 'wilderness', w: village ? 1 : 0.5 },
    { v: 'ruin', w: 1 },
    { v: 'court', w: village ? 0.1 : 1 },
    { v: 'religion', w: village ? 0 : 0.2 }
  ])
  const { hooks, subtype } = hook__mapping[type]
  const urban = !hub__isVillage(loc.hub)
  const used = window.world.threads.reduce((acc, thread) => {
    thread.hooks.forEach(({ tag }) => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)
  const tags = window.dice.weightedSample(
    Object.keys(hooks).map(tag => {
      const hook = hooks[tag]
      const conflict = hook.constraints?.urban !== undefined && hook.constraints?.urban !== urban
      return { w: conflict ? 0 : 1 / (used[tag] * 10 || 1), v: tag }
    }),
    2
  )
  const [bgf, bge] = window.dice.shuffle(tags)
  const friend = actor__spawn({
    loc,
    template: window.dice.choice(hooks[bgf].friends),
    context: { role: 'friend' },
    tag: bgf
  })
  const enemy = actor__spawn({
    loc,
    template: window.dice.choice(hooks[bge].enemies),
    context: { role: 'enemy' },
    tag: bge
  })
  const [bdc, bgt, bgp] = window.dice.shuffle([bgf, bge, bgf, bge])
  const complication = decorateTag(window.dice.choice(hooks[bdc].complications.split(', ')), bdc)
  const thing = decorateTag(window.dice.choice(hooks[bgt].things.split(', ')), bgt)
  const place = decorateTag(window.dice.choice(hooks[bgp].places.split(', ')), bgp)
  const wild = type === 'wilderness' || type === 'ruin'
  return {
    hooks: tags.map(tag => ({ tag, text: window.dice.spin(hooks[tag].text) })),
    friend,
    enemy,
    complication,
    thing,
    place,
    type,
    subtype: subtype({ loc }),
    hostiles: capitalize(wild ? enemies.wilderness() : enemies.civilization()),
    mission: mission__spawn(type)
  }
}
