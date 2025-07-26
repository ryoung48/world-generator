import { Province } from '../provinces/types'
import { TEXT } from '../utilities/text'
import { TRAIT } from '../utilities/traits'
import { communities } from './tags/community'
import { courts } from './tags/courts'
import { ruins } from './tags/ruins'
import { wilderness } from './tags/wilderness'

const tags = { court: courts, community: communities, ruins, wilderness }

const headers: Record<Partial<keyof typeof tags>, string[]> = {
  community: ['{small|large} {town|city}', '{small|large} village', '{nomadic tribe|outcast camp}'],
  court: [
    'noble household',
    '{merchant|banking} house',
    'royal household',
    'criminal {syndicate|gang|brotherhood|cartel}',
    '{familial|tribal} clan',
    '{religious order|local temple}'
  ],
  ruins: [
    'isolated rural estate of nobility',
    'townhouse of minor gentry',
    'massive tenement or slum tower',
    'rural grange with outbuildings',
    'compact fortified village',
    'hidden shelter against calamity',
    'mazey urban residential block',
    'rubble-wrought makeshift village',
    'ancient arcology or fragment of it',
    'outpost of refugees or recluses',
    'sprawling slum of shanties and huts',
    'inhabited natural feature or cave',
    'grand fortress of major significance',
    'hidden bunker or strongpoint',
    'remote frontier keep',
    'secret operations base',
    'isolated watchtower',
    'battered front-line fortress',
    'military training camp',
    'gatehouse controlling a vital pass',
    'half-subterranean entrenchments',
    'military cache or storehouse',
    'battlefield littered with fortifications',
    'fortified waystation',
    'illicit manufactory for illegal goods',
    'mine or open pit for excavation',
    'sacred shrine for holy product',
    'overgrown ancient plantation',
    'destroyed camp or extraction site',
    'managed woodland gone feral',
    'inexplicable ancient manufactory',
    'farm for now-feral valuable beasts',
    'outsider goods production site',
    'repurposed ancient manufactory',
    'magical production facility',
    'fishery or salt extraction site',
    'lost pilgrimage destination',
    'fortified frontier monastery',
    'tomb of some mighty ancient',
    'prison-monastery for heretics',
    'shrine repurposed for a newer god',
    'fragment of megastructure temple',
    'inexplicable sacred structure',
    'place of some holy trial or test',
    'outsider fane to an alien god',
    'prison for a sealed demonic force',
    'pilgrim hospital or waystation',
    'holy archive or relic-fortress',
    'inscrutable outsider art structure',
    'library or ancient archive',
    "ancient culture's gathering site",
    'resort for nobles at ease',
    'monument complex to lost glories',
    'enormous musical structure',
    'abandoned school or study center',
    'massive ceremonial structure',
    'indoctrination camp or prison',
    'preserved “heritage” village-resort',
    'museum of a lost nation',
    'taboo site of dark magic',
    'psychic or tech communications site',
    'subterranean transit tunnels',
    'canal or aqueduct control center',
    'weather-control working ruin',
    'reality-stabilizing working ruin',
    'ancient road through an obstacle',
    'massive bridge or tunnel',
    'huge ancient dam',
    'ancient power production center',
    'outsider xenoforming engine',
    'semi-ruined teleportation node',
    'now-incomprehensible wreckage'
  ],
  wilderness: ['mountains', 'hills', 'forest', 'plains', 'desert', 'marsh', 'coast']
}

const _hooks: Record<
  number,
  {
    type: 'court' | 'community' | 'ruins' | 'wilderness'
    tags: {
      tag: string
      text: string
      friend: string
      enemy: string
      complication: string
      thing: string
      place: string
    }[]
  }
> = {}

export const HOOK = {
  spawn: (hub: Province) => {
    if (!_hooks[hub.idx]) {
      const type = window.dice.weightedChoice<keyof typeof tags>([
        { v: 'wilderness', w: 1 },
        { v: 'ruins', w: 1 },
        { v: 'community', w: 1 },
        { v: 'court', w: 0.5 }
      ])
      const hooks = tags[type]
      _hooks[hub.idx] = {
        type,
        tags: TRAIT.selection({ available: hooks, samples: 2 }).map(tag => {
          const hook = hooks[tag]
          const _thing = window.dice.spin(window.dice.choice(hook.things))
          const _place = window.dice.spin(window.dice.choice(hook.places))
          const _enemy = window.dice.spin(window.dice.choice(hook.enemies).title)
          const _friend = window.dice.spin(window.dice.choice(hook.friends).title)
          return {
            tag,
            text: window.dice.spin(hook.text),
            friend: TEXT.decorateEnd(_friend, { tooltip: tag }),
            enemy: TEXT.decorateEnd(_enemy, { tooltip: tag }),
            complication: window.dice.spin(window.dice.choice(hook.complications)),
            thing: TEXT.decorateEnd(_thing, { tooltip: tag }),
            place: TEXT.decorateEnd(_place, { tooltip: tag })
          }
        })
      }
    }
    return _hooks[hub.idx]
  },
  gen: () => {
    const first = window.dice.weightedChoice<keyof typeof tags>([
      { v: 'wilderness', w: 1 },
      { v: 'ruins', w: 1 },
      { v: 'community', w: 1 }
    ])
    const second = first
    const types = [second, first]
    const used: string[] = []
    const subtypes: Record<string, string> = {}
    return {
      terrain: {
        climate: window.dice.choice([
          'tropical',
          'subtropical',
          'temperate',
          'subarctic',
          'arctic'
        ]),
        terrain: window.dice.choice(headers.wilderness)
      },
      tags: types
        .map(type => {
          const hooks = tags[type]
          if (!subtypes[type])
            subtypes[type] = headers[type]
              ? window.dice.spin(window.dice.choice(headers[type]))
              : ''
          return TRAIT.selection({ available: hooks, current: used, samples: 1 }).map(tag => {
            used.push(tag)
            const hook = hooks[tag]
            const _thing = window.dice.spin(window.dice.choice(hook.things))
            const _place = window.dice.spin(window.dice.choice(hook.places))
            const _enemy = window.dice.spin(window.dice.choice(hook.enemies).title)
            const _friend = window.dice.spin(window.dice.choice(hook.friends).title)
            return {
              tag,
              type: TEXT.decorate({ label: type, tooltip: subtypes[type] }),
              text: window.dice.spin(hook.text),
              friend: TEXT.decorateEnd(_friend, { tooltip: tag }),
              enemy: TEXT.decorateEnd(_enemy, { tooltip: tag }),
              complication: window.dice.spin(window.dice.choice(hook.complications)),
              thing: TEXT.decorateEnd(_thing, { tooltip: tag }),
              place: TEXT.decorateEnd(_place, { tooltip: tag })
            }
          })
        })
        .flat()
    }
  }
}
