import { actor__relation } from '../npcs/actors'
import { actor__spawn } from '../npcs/actors/spawn'
import { actor__addChildRelation } from '../npcs/actors/spawn/relations'
import { lang__uniqueName } from '../npcs/species/languages/words'
import { lang__last } from '../npcs/species/languages/words/actors'
import { province__hub } from '../regions/provinces'
import { decorateText } from '../utilities/text/decoration'
import { Rebellion } from './rebellion/types'

export const event__encode = (params: { entity: number; type: 'succession' | 'rebellion' }) => {
  const { entity, type } = params
  return `{{${type}:${entity}}}`
}

const succession__unpackRuler = (idx: number) => {
  const ruler = window.world.actorPlans[idx]
  if (!ruler) return undefined
  let actor = window.world.actors[ruler.actor]
  if (actor) return actor
  // check parent to see if children were already spawned
  const parent = window.world.actorPlans[ruler.parent]
  const match = parent?.events
    ?.map?.(e => window.world.actorEvents[e])
    ?.find(e => e.type === 'child' && e.time === ruler.birth && e.expires === ruler.death)
  const spawnedChild = window.world.actors[match?.actor]
  if (spawnedChild) {
    window.world.actorPlans[idx].actor = spawnedChild.idx
    return spawnedChild
  }
  // check the child to see if a parent was already spawned
  const heir = window.world.actors[window.world.actorPlans[ruler.heir]?.actor]
  const spawnedParent = heir ? actor__relation({ actor: heir, type: 'parent' })[0] : undefined
  if (spawnedParent) {
    window.world.actorPlans[idx].actor = spawnedParent.idx
    return spawnedParent
  }
  // otherwise begin the spawn
  const { dynasty, events } = ruler
  const region = window.world.regions[ruler.region]
  const capital = province__hub(window.world.provinces[region.capital])
  const culture = window.world.cultures[ruler.culture]
  if (!window.world.dynasties[dynasty])
    window.world.dynasties[dynasty] = lang__last(culture.language)
  actor = actor__spawn({
    location: capital,
    living: true,
    birthTime: ruler.birth,
    expires: ruler.death,
    gender: ruler.gender,
    culture,
    birthLoc: capital,
    lineage: window.world.dynasties[dynasty],
    occupation: { key: 'noble (major)' },
    parent: { name: window.world.actors[parent?.actor]?.name, plan: ruler.parent }
  })
  actor.history.events.push(...events)
  window.world.actorPlans[idx].actor = actor.idx
  if (match) match.actor = actor.idx
  const parentActor = window.world.actors[parent?.actor]
  if (parentActor) actor__addChildRelation({ parent: parentActor, child: actor, event: true })
  if (heir) actor__addChildRelation({ parent: actor, child: heir, event: true })
  return actor
}

export const rebellion__name = (rebellion: Rebellion) => {
  if (!rebellion.name) {
    const { background, rebels } = rebellion
    const region = window.world.regions[rebels.idx]
    const culture = window.world.cultures[region.culture.ruling]
    rebellion.name = `${lang__uniqueName({ lang: culture.language, key: 'rebellion' })} ${
      background.type === 'ideology'
        ? 'Revolution'
        : background.type === 'peasants'
        ? 'Uprising'
        : background.type === 'anarchism'
        ? 'Warfare'
        : window.dice.choice(['Rebellion', 'Civil War'])
    }`
  }
  return rebellion.name
}

export const event__decode = (text: string) => {
  return text.replace(/\{\{.*?\}\}/g, match => {
    const [type, entity] = match.replace(/[{{}}]/g, '').split(':')
    if (type === 'succession') {
      const ruler = succession__unpackRuler(parseInt(entity))
      return ruler ? `${decorateText({ link: ruler })} (${ruler.lineage})` : match
    } else if (type === 'rebellion') {
      const rebellion = window.world.rebellions[parseInt(entity)]
      return rebellion__name(rebellion)
    }
    return match
  })
}
