import { capitalize } from '@mui/material'

import { ACTOR } from '../../../npcs'
import { NPCParams } from '../../../npcs/types'
import { DIFFICULTY } from '../../../utilities/difficulty'
import { decorateText } from '../../../utilities/text/decoration'
import { TRAIT } from '../../../utilities/traits'
import { REGION } from '../..'
import { Region } from '../../types'
import { PROVINCE } from '..'
import { HUB } from '../hubs'
import { Province } from '../types'
import { court__spawn } from './courts'
import { mission__spawn } from './mission'
import { ruin__spawn } from './ruins'
import { communities } from './tags/communities'
import { courts } from './tags/courts'
import { religions } from './tags/religions'
import { ruins } from './tags/ruins'
import { wars } from './tags/wars'
import { wilderness } from './tags/wilderness'
import { Actor, Hooks, HookSpawnParams } from './types'
import { WILDERNESS } from './wilderness'

const decorateTag = (sentence: string, tag: string) => {
  const words = window.dice.spin(sentence).split(' ')
  return words
    .map((word, i) => (i === words.length - 1 ? decorateText({ label: word, tooltip: tag }) : word))
    .join(' ')
}

const actor__spawn = (params: {
  loc: Province
  template: Actor
  context: NPCParams['context']
  tag: string
}) => {
  const { loc, template, context, tag } = params
  if (!template) console.log(tag)
  if (template.monstrous) return decorateTag(template.title, tag)
  const npc = ACTOR.spawn({
    loc,
    context,
    profession: 'custom',
    age: template.elder
      ? 'old'
      : template.veteran
      ? window.dice.choice(['old', 'middle age'])
      : template.youth
      ? 'young adult'
      : template.child
      ? window.dice.choice(['child', 'adolescent'])
      : undefined,
    foreign: template.foreign
  })
  npc.profession.title = decorateTag(template.title, tag)
    .replace('#possessive#', npc.gender === 'male' ? 'his' : 'her')
    .toLowerCase()
  return decorateText({ link: npc })
}

const mapping = {
  community: communities,
  wilderness: wilderness,
  ruin: ruins,
  religion: religions,
  court: courts,
  war: wars
} as const

export const HOOK = {
  spawn: ({ entity, pc }: HookSpawnParams) => {
    if (!entity.hooks) {
      if (entity.tag === 'nation') {
        const loc = REGION.capital(entity)
        entity.hooks = HOOK.spawn({ entity: loc, pc })
        delete loc.hooks
      } else {
        const loc = entity
        const village = HUB.village(loc.hub)
        const capital = PROVINCE.isCapital(loc)
        const coastal = loc.hub.coastal
        const tribal = !window.world.regions[loc.region].civilized
        const warfare = loc.conflict >= 0
        const urban = !village
        let count = 2
        loc.hooks = { tags: [], difficulty: { cr: DIFFICULTY.random(pc) } }
        while (count-- > 0) {
          const type = window.dice.weightedChoice<Hooks['tags'][number]['type']>([
            { v: 'community', w: 1 },
            { v: 'wilderness', w: village ? 1 : 0.5 },
            { v: 'court', w: village ? 0.4 : 0.8 },
            { v: 'religion', w: village ? 0 : 0.2 },
            { v: 'ruin', w: village ? 1 : 0.5 }
          ])
          const { hooks, subtype } = mapping[type]
          const [tag] = TRAIT.selection({
            available: hooks,
            current: loc.hooks?.tags?.map(({ tag }) => tag) ?? [],
            used: window.world.provinces
              .map(province => province.hooks?.tags?.map(({ tag }) => tag) ?? [])
              .flat(),
            constraints: { urban, capital, coastal, tribal, warfare },
            samples: 1
          })
          loc.hooks.tags.push({ ...tag, type, subtype: subtype({ loc }) })
        }
        loc.hooks.mission = mission__spawn(loc.hooks.tags[0].type)
      }
    }
    return entity.hooks
  },
  elements: (params: { entity: Province | Region; hook: Hooks['tags'][number] }) => {
    const { entity, hook } = params
    const province = entity.tag === 'nation' ? REGION.capital(entity) : entity
    if (!hook.friend) {
      const details = mapping[hook.type].hooks[hook.tag]
      hook.friend = actor__spawn({
        loc: province,
        template: window.dice.choice(details.friends),
        context: { role: 'friend' },
        tag: hook.tag
      })
      hook.enemy = actor__spawn({
        loc: province,
        template: window.dice.choice(details.enemies),
        context: { role: 'enemy' },
        tag: hook.tag
      })
      hook.complication = window.dice.choice(details.complications)
      hook.thing = decorateTag(window.dice.choice(details.things), hook.tag)
      hook.place = decorateTag(window.dice.choice(details.places), hook.tag)
      const isCourt = hook.type === 'court'
      const isRuin = hook.type === 'ruin'
      if (isCourt || isRuin || hook.type === 'wilderness') {
        const entity = isCourt
          ? court__spawn(province)
          : isRuin
          ? ruin__spawn(province)
          : WILDERNESS.spawn(province)
        hook.decorated = decorateText({ label: capitalize(hook.type), link: entity })
      }
    }
    return true
  }
}
