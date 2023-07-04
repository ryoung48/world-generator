import { capitalize } from '@mui/material'

import { hub__isVillage } from '../../regions/provinces/hubs'
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

export const hook__mapping = {
  community: communities,
  wilderness: wilderness,
  ruin: ruins,
  religion: religions,
  court: courts
} as const

export const background__elements = (thread: Thread) => {
  if (!thread.friend) {
    const loc = window.world.provinces[thread.location]
    const tags = thread.hooks.map(({ tag }) => tag)
    const [bgf, bge] = window.dice.shuffle(tags)
    const { hooks } = hook__mapping[thread.type]
    thread.friend = actor__spawn({
      loc,
      template: window.dice.choice(hooks[bgf].friends),
      context: { role: 'friend' },
      tag: bgf
    })
    thread.enemy = actor__spawn({
      loc,
      template: window.dice.choice(hooks[bge].enemies),
      context: { role: 'enemy' },
      tag: bge
    })
    const [bdc, bgt, bgp] = window.dice.shuffle([bgf, bge, bgf, bge])
    thread.complication = decorateTag(window.dice.choice(hooks[bdc].complications), bdc)
    thread.thing = decorateTag(window.dice.choice(hooks[bgt].things), bgt)
    thread.place = decorateTag(window.dice.choice(hooks[bgp].places), bgp)
    const wild = thread.type === 'wilderness' || thread.type === 'ruin'
    thread.hostiles = capitalize(wild ? enemies.wilderness() : enemies.civilization())
  }
}

export const background__spawn = (loc: Province) => {
  const village = hub__isVillage(loc.hub)
  const capital = loc.idx === window.world.regions[loc.nation].capital
  const coastal = loc.hub.coastal
  const tribal = !window.world.regions[loc.region].civilized
  const type = window.dice.weightedChoice<Thread['type']>([
    { v: 'community', w: 1 },
    { v: 'wilderness', w: village ? 1 : 0.5 },
    { v: 'court', w: village ? 0.1 : 0.5 },
    { v: 'religion', w: village ? 0 : 0.2 },
    { v: 'ruin', w: 1 }
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
      const urbanConflict =
        hook.constraints?.urban !== undefined && hook.constraints?.urban !== urban
      const capitalConflict =
        hook.constraints?.capital !== undefined && hook.constraints?.capital !== capital
      const coastalConflict =
        hook.constraints?.coastal !== undefined && hook.constraints?.coastal !== coastal
      const tribalConflict =
        hook.constraints?.tribal !== undefined && hook.constraints?.tribal !== tribal
      return {
        w:
          urbanConflict || capitalConflict || coastalConflict || tribalConflict
            ? 0
            : 1 / (used[tag] * 10 || 1),
        v: tag
      }
    }),
    2
  )
  return {
    hooks: tags.map(tag => ({ tag, text: window.dice.spin(hooks[tag].text) })),
    type,
    subtype: subtype({ loc }),
    mission: mission__spawn(type)
  }
}
;(window as any).hook = (type: Thread['type'], tag: any) => {
  const { hooks } = hook__mapping[type]
  return `
Given the following quest hook:

${tag}: ${hooks[tag].text}

Enemies: ${hooks[tag].enemies.map(t => t.title).join(', ')}
Friends: ${hooks[tag].friends.map(t => t.title).join(', ')}
Complications: ${hooks[tag].complications.join(', ')}
Things: ${hooks[tag].things.join(', ')}
Places: ${hooks[tag].places.join(', ')}

Create a list of 5 additional entries for each of enemies, friends, complications, things, and places that might relate to the quest above. Keep in mind the following:
* each entry should not repeat anything said above
* do not add a description for any entries; 
* each enemy, friend, place, and thing can be at most 5 words in length
* each complication can be up to 12 words in length and should be written in present continuous tense
* the output should use the same writing style as the enemies, friends, complications, things, and places lists above
* each entry should be generic enough to fit in any fantasy setting`
}
