import { ACTOR } from '../../../npcs'
import { NPCParams } from '../../../npcs/types'
import { DIFFICULTY } from '../../../utilities/difficulty'
import { decorateText } from '../../../utilities/text/decoration'
import { TRAIT } from '../../../utilities/traits'
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
import { wilderness } from './tags/wilderness'
import { Actor, Hooks, HookSpawnParams } from './types'

export const decorateTag = (sentence: string, tag: string) => {
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

export const hook__mapping = {
  community: communities,
  wilderness: wilderness,
  ruin: ruins,
  religion: religions,
  court: courts
} as const

export const hook__elements = (params: { province: Province; hook: Hooks['tags'][number] }) => {
  const { province, hook } = params
  if (!hook.friend) {
    const details = hook__mapping[hook.type].hooks[hook.tag]
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
    const court = window.world.courts[province.hooks.court]
    const ruin = window.world.ruins[province.hooks.ruin]
    if (isCourt || hook.type === 'ruin') {
      const entity = isCourt ? court ?? court__spawn(province) : ruin ?? ruin__spawn(province)
      province.hooks[isCourt ? 'court' : 'ruin'] = entity.idx
      const matcher = RegExp(hook.type, 'gi')
      hook.text = hook.text.replace(matcher, match => decorateText({ label: match, link: entity }))
      hook.complication = hook.complication.replace(matcher, match =>
        decorateText({ label: match, link: entity })
      )
    }
  }
  return true
}

export const hook__spawn = ({ loc, pc }: HookSpawnParams) => {
  if (!loc.hooks) {
    const village = HUB.village(loc.hub)
    const capital = PROVINCE.isCapital(loc)
    const coastal = loc.hub.coastal
    const tribal = !window.world.regions[loc.region].civilized
    const warfare = loc.conflict === 'war'
    const urban = !village
    const types = window.dice.weightedSample<Hooks['tags'][number]['type']>(
      [
        { v: 'community', w: 1 },
        { v: 'wilderness', w: village ? 1 : 0.5 },
        { v: 'court', w: village ? 0.4 : 0.8 },
        { v: 'religion', w: village ? 0 : 0.2 },
        { v: 'ruin', w: village ? 1 : 0.5 }
      ],
      2,
      false
    )
    loc.hooks = { tags: [], difficulty: { cr: DIFFICULTY.random(pc) } }
    while (types.length > 0) {
      const type = types.pop()
      const { hooks, subtype } = hook__mapping[type]
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
  return loc.hooks
}
