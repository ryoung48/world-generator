import { ACTOR } from '../actors'
import { ActorSpawnParams } from '../actors/types'
import { CELL } from '../cells'
import { CLIMATE } from '../cells/climate'
import { Terrain } from '../cells/climate/types'
import { Cell } from '../cells/types'
import { PLACE } from '../regions/places'
import { Hub } from '../regions/places/hub/types'
import { PROVINCE } from '../regions/provinces'
import { Province } from '../regions/provinces/types'
import { TEXT } from '../utilities/text'
import { TRAIT } from '../utilities/traits'
import { CHALLENGES } from './challenges'
import { HOSTILES } from './hostiles'
import { MISSION } from './mission'
import { communities } from './tags/community'
import { courts } from './tags/courts'
import { religions } from './tags/religions'
import { ruins } from './tags/ruins'
import { wars } from './tags/war'
import { wilderness } from './tags/wilderness'
import { Hook, HookActor, HookParams } from './types'

const actorSpawn = (params: {
  place: Province['places'][number]
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

const _hooks: Record<number, Hook> = {}
const _war: Record<number, boolean> = {}

const classifications = {
  community: {
    tags: communities,
    subtypes: [
      { w: 1, v: '{nomadic|tribal|outcast|bandit} camp' },
      { w: 3, v: '{tiny|small|large} village' },
      { w: 2, v: '{small|large} town' },
      { w: 1, v: '{small|large} city' }
    ]
  },
  ruin: {
    tags: ruins,
    subtypes: [
      { w: 1, v: 'isolated rural estate of nobility' },
      { w: 1, v: 'townhouse of minor gentry' },
      { w: 1, v: 'massive tenement or slum tower' },
      { w: 1, v: 'rural grange with outbuildings' },
      { w: 1, v: 'compact fortified village' },
      { w: 1, v: 'hidden shelter against calamity' },
      { w: 1, v: 'mazey urban residential block' },
      { w: 1, v: 'rubble-wrought makeshift village' },
      { w: 1, v: 'ancient arcology or fragment of it' },
      { w: 1, v: 'outpost of refugees or recluses' },
      { w: 1, v: 'sprawling slum of shanties and huts' },
      { w: 1, v: 'inhabited natural feature or cave' },
      { w: 1, v: 'grand fortress of major significance' },
      { w: 1, v: 'hidden bunker or strongpoint' },
      { w: 1, v: 'remote frontier keep' },
      { w: 1, v: 'secret operations base' },
      { w: 1, v: 'isolated watchtower' },
      { w: 1, v: 'battered front-line fortress' },
      { w: 1, v: 'military training camp' },
      { w: 1, v: 'gatehouse controlling a vital pass' },
      { w: 1, v: 'half-subterranean entrenchments' },
      { w: 1, v: 'military cache or storehouse' },
      { w: 1, v: 'battlefield littered with fortifications' },
      { w: 1, v: 'fortified waystation' },
      { w: 1, v: 'illicit manufactory for illegal goods' },
      { w: 1, v: 'mine or open pit for excavation' },
      { w: 1, v: 'sacred shrine for holy product' },
      { w: 1, v: 'overgrown ancient plantation' },
      { w: 1, v: 'destroyed camp or extraction site' },
      { w: 1, v: 'managed woodland gone feral' },
      { w: 1, v: 'inexplicable ancient manufactory' },
      { w: 1, v: 'farm for now-feral valuable beasts' },
      { w: 1, v: 'outsider goods production site' },
      { w: 1, v: 'repurposed ancient manufactory' },
      { w: 1, v: 'magical production facility' },
      { w: 1, v: 'fishery or salt extraction site' },
      { w: 1, v: 'lost pilgrimage destination' },
      { w: 1, v: 'fortified frontier monastery' },
      { w: 1, v: 'tomb of some mighty ancient' },
      { w: 1, v: 'prison-monastery for heretics' },
      { w: 1, v: 'shrine repurposed for a newer god' },
      { w: 1, v: 'fragment of megastructure temple' },
      { w: 1, v: 'inexplicable sacred structure' },
      { w: 1, v: 'place of some holy trial or test' },
      { w: 1, v: 'outsider fane to an alien god' },
      { w: 1, v: 'prison for a sealed demonic force' },
      { w: 1, v: 'pilgrim hospital or waystation' },
      { w: 1, v: 'holy archive or relic-fortress' },
      { w: 1, v: 'inscrutable outsider art structure' },
      { w: 1, v: 'library or ancient archive' },
      { w: 1, v: "ancient culture's gathering site" },
      { w: 1, v: 'resort for nobles at ease' },
      { w: 1, v: 'monument complex to lost glories' },
      { w: 1, v: 'enormous musical structure' },
      { w: 1, v: 'abandoned school or study center' },
      { w: 1, v: 'massive ceremonial structure' },
      { w: 1, v: 'indoctrination camp or prison' },
      { w: 1, v: 'preserved “heritage” village-resort' },
      { w: 1, v: 'museum of a lost nation' },
      { w: 1, v: 'taboo site of dark magic' },
      { w: 1, v: 'psychic or tech communications site' },
      { w: 1, v: 'subterranean transit tunnels' },
      { w: 1, v: 'canal or aqueduct control center' },
      { w: 1, v: 'weather-control working ruin' },
      { w: 1, v: 'reality-stabilizing working ruin' },
      { w: 1, v: 'ancient road through an obstacle' },
      { w: 1, v: 'massive bridge or tunnel' },
      { w: 1, v: 'huge ancient dam' },
      { w: 1, v: 'ancient power production center' },
      { w: 1, v: 'outsider xenoforming engine' },
      { w: 1, v: 'semi-ruined teleportation node' },
      { w: 1, v: 'now-incomprehensible wreckage' }
    ]
  },
  wilderness: { tags: wilderness, subtypes: [{ w: 1, v: 'wilderness' }] },
  religion: { tags: religions, subtypes: [{ w: 1, v: 'religion' }] },
  war: { tags: wars, subtypes: [{ w: 1, v: 'war' }] },
  court: {
    tags: courts,
    subtypes: [
      { w: 1, v: 'familial clan' },
      { w: 1, v: 'noble household' },
      { w: 0.1, v: 'royal household' },
      { w: 1, v: '{local temple|{religious|templar} order}' },
      { w: 1, v: '{merchant|banking} house' },
      { w: 1, v: 'criminal {syndicate|gang|cartel}' }
    ]
  }
}

const terrain = (cell: Cell): Terrain => {
  // Get the cell for the given province, along with other information needed
  const province = CELL.province(cell)
  const mountainous = province.mountains > 0
  const biome = CELL.climate(cell)
  const zone = CLIMATE.zone[biome.latitude]
  const glacial = biome.latitude === 'polar'
  // Generate a chance of a marsh given certain criteria
  const coastal = cell.beach && window.dice.random > 0.8
  const lakeside = Object.keys(province.lakes).length > 0
  if (cell.isMountains) return 'mountains'
  if (mountainous && window.dice.random > 0.8) return window.dice.choice(['mountains', 'highlands'])
  if (!cell.coastal && window.dice.random > 0.8) return 'hills'
  if (!glacial && (coastal || lakeside)) return 'marsh'
  if (biome.terrain === 'forest')
    return zone === 'tropical' ? 'jungle' : zone === 'arctic' ? 'taiga' : 'forest'
  if (biome.terrain === 'plains') return zone === 'tropical' ? 'savanna' : 'plains'
  return biome.terrain
}

export const HOOK = {
  get: (hub: Hub) => {
    const province = PLACE.province(hub)
    const nation = PROVINCE.nation(province)
    const war = province.conflict >= 0 && !_war[nation.idx]
    if (!_hooks[province.idx]) {
      const type = window.dice.weightedChoice<keyof typeof classifications>([
        { w: 1, v: 'community' },
        { w: 1, v: 'wilderness' },
        { w: 0.3, v: 'religion' },
        { w: 1, v: 'court' },
        { w: 1, v: 'ruin' },
        { w: war ? 100 : 0, v: 'war' }
      ])
      if (type === 'war') _war[nation.idx] = true
      const { subtypes } = classifications[type]
      const mission = window.dice.choice(
        Object.keys(MISSION.objectives) as (keyof typeof MISSION.objectives)[]
      )
      const complications = MISSION.objectives[mission].complication
      const hostiles =
        type === 'community' || type === 'court' ? HOSTILES.urban : HOSTILES.wilderness
      const challenges = window.dice.sample(Object.keys(CHALLENGES), 3)
      const subtype = window.dice.spin(window.dice.weightedChoice(subtypes))
      _hooks[province.idx] = {
        type,
        subtype: type === 'wilderness' ? terrain(PROVINCE.cell(province)) : subtype,
        introduction: window.dice.choice(MISSION.introductions),
        mission: {
          tag: mission,
          text: window.dice.spin(MISSION.objectives[mission].text),
          complication: window.dice.spin(window.dice.choice(complications as unknown as string[]))
        },
        challenges: `${TEXT.decorate({
          label: 'Hostiles',
          tooltip: window.dice.spin(window.dice.choice(hostiles))
        })}, ${challenges
          .map(challenge =>
            TEXT.decorate({
              label: challenge,
              tooltip: CHALLENGES[challenge as keyof typeof CHALLENGES].text
            })
          )
          .join(', ')}`
      }
    }
    return _hooks[province.idx]
  },
  spawn: <Constraints>({ place, hooks, samples, constraints }: HookParams<Constraints>) => {
    const tags = TRAIT.selection({
      available: hooks,
      current: [],
      used: Object.values(_hooks)
        .map(hook => hook.tags?.map(t => t.tag) ?? [])
        .flat(2),
      constraints,
      samples
    })
    return tags.map(tag => {
      const hook = hooks[tag]
      const _thing = window.dice.spin(window.dice.choice(hook.things))
      const _place = window.dice.spin(window.dice.choice(hook.places))
      return {
        tag,
        text: window.dice.spin(hook.text),
        friend: actorSpawn({
          place,
          template: window.dice.choice(hook.friends),
          role: 'friend',
          tag
        }),
        enemy: actorSpawn({
          place,
          template: window.dice.choice(hook.enemies),
          role: 'enemy',
          tag
        }),
        complication: window.dice.spin(window.dice.choice(hook.complications)),
        thing: TEXT.decorateEnd(_thing, { tooltip: tag }),
        place: TEXT.decorateEnd(_place, { tooltip: tag })
      }
    })
  },
  tags: (hub: Hub) => {
    const hook = HOOK.get(hub)
    if (!hook.tags) {
      const { tags } = classifications[hook.type as keyof typeof classifications]
      hook.tags = HOOK.spawn({ place: hub, hooks: tags, samples: 2, constraints: {} })
    }
    return hook.tags
  }
}
