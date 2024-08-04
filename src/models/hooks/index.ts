import { ACTOR } from '../actors'
import { ActorSpawnParams } from '../actors/types'
import { PROVINCE } from '../regions/provinces'
import { Hub } from '../regions/sites/hubs/types'
import { TEXT } from '../utilities/text'
import { TRAIT } from '../utilities/traits'
import { communities } from './tags/community'
import { ruins } from './tags/ruins'
import { wilderness } from './tags/wilderness'
import { HookActor, HookParams } from './types'

const actorSpawn = (params: {
  place: Hub
  template: HookActor
  role: ActorSpawnParams['role']
  tag: string
}) => {
  const { place, template, role, tag } = params
  if (!template) console.log(tag)
  if (template.monstrous) return TEXT.decorateEnd(template.title, { tooltip: tag })
  const npc = ACTOR.spawn({
    place,
    role,
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
  const title = template.title.replace('#possessive#', npc.gender === 'male' ? 'his' : 'her')
  npc.profession.title = TEXT.decorate({ label: tag.toLowerCase(), tooltip: title.toLowerCase() })
  const words = window.dice.spin(title).split(' ')
  return words
    .map((word, i) =>
      i === words.length - 1 ? TEXT.decorate({ label: word, details: ACTOR.describe(npc) }) : word
    )
    .join(' ')
}

export const HOOK = {
  spawn: ({ place, samples, type }: HookParams) => {
    const hooks = type === 'community' ? communities : type === 'ruin' ? ruins : wilderness
    const tags = TRAIT.selection({
      available: hooks,
      current: [],
      used: [],
      constraints: {},
      samples
    })
    const cell = window.world.cells[place.cell]
    const province = window.world.provinces[cell.province]
    const hub = PROVINCE.hub(province)
    return tags.map(tag => {
      const hook = hooks[tag]
      const _thing = window.dice.spin(window.dice.choice(hook.things))
      const _place = window.dice.spin(window.dice.choice(hook.places))
      return {
        tag,
        text: window.dice.spin(hook.text),
        friend: actorSpawn({
          place: hub,
          template: window.dice.choice(hook.friends),
          role: 'friend',
          tag
        }),
        enemy: actorSpawn({
          place: hub,
          template: window.dice.choice(hook.enemies),
          role: 'enemy',
          tag
        }),
        complication: window.dice.spin(window.dice.choice(hook.complications)),
        thing: TEXT.decorateEnd(_thing, { tooltip: tag }),
        place: TEXT.decorateEnd(_place, { tooltip: tag })
      }
    })
  }
}
