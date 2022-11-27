import { range } from 'd3'

import { Gender, npc__randomGender } from '../npcs/actors/stats/appearance/gender'
import { lang__first } from '../npcs/species/languages/words/actors'
import { location__isSettlement } from '../regions/locations'
import { location__demographics } from '../regions/locations/actors/demographics'
import { location__templates } from '../regions/locations/spawn/taxonomy'
import { location__isCity, location__isTown } from '../regions/locations/spawn/taxonomy/settlements'
import { Loc } from '../regions/locations/types'
import { decorateText } from '../utilities/text/decoration'
import { location__weather } from '../world/climate/weather'
import { backgrounds__community } from './communities'
import { backgrounds__court, courts__rival, courts__spawn } from './courts'
import { backgrounds__faith } from './faith'
import { backgrounds__ruin } from './ruins'
import { Background, BackgroundActor, BackgroundTag, Thread, ThreadActor } from './types'
import { backgrounds__wilderness } from './wilderness'

const thread__backgrounds: Record<BackgroundTag, Background> = {
  ...backgrounds__community,
  ...backgrounds__court,
  ...backgrounds__faith,
  ...backgrounds__ruin,
  ...backgrounds__wilderness
}

const backgrounds = Object.values(thread__backgrounds)

const spin = (params: { text: string; loc: Loc; gender?: Gender }) => {
  const { text, loc, gender } = params
  return window.dice
    .spin(text)
    .replaceAll('#site#', location__templates[loc.type].alias ?? loc.type)
    .replaceAll('#rival#', courts__rival(loc))
    .replaceAll('#possessive#', gender === 'female' ? 'her' : 'his')
    .replaceAll('#child#', gender === 'female' ? 'daughter' : 'son')
}

const spawnActor = (params: { loc: Loc; actor: BackgroundActor }): ThreadActor => {
  const { loc, actor } = params
  const { common, native, foreign } = location__demographics(loc)
  const { language, idx: culture } =
    window.world.cultures[
      window.dice.weightedChoice(
        actor.culture === 'native' ? native : actor.culture === 'foreign' ? foreign : common
      )
    ]
  const gender = actor.gender ?? npc__randomGender()
  const alias = spin({ text: actor.alias, loc, gender })
  return {
    alias,
    gender,
    name: lang__first(language, gender),
    culture,
    age: actor.age
      ? window.dice.choice(actor.age)
      : window.dice.weightedChoice([
          { v: 'young adult', w: 0.15 },
          { v: 'adult', w: 0.5 },
          { v: 'middle age', w: 0.35 }
        ]),
    monstrous: actor.monstrous
  }
}

const settlementTags: Background['type'][] = ['community', 'court', 'faith']

const thread__spawn = (loc: Loc) => {
  const rural = loc.population < location__templates['large town'].population[0]
  const { capital: regional } = window.world.provinces[loc.province]
  const { civilized } = window.world.regions[loc.region]
  const court = courts__spawn(loc)
  const current = loc._threads.map(({ tag }) => tag)
  const settlement = location__isSettlement(loc)
  const candidates = backgrounds
    .filter(background => settlementTags.includes(background.type) === settlement)
    .map(({ tag, constraints, type }) => {
      let weight = current.includes(tag) ? 0 : 1
      weight *= constraints?.conflicts?.some(conflict => current.includes(conflict)) ? 0 : 1
      weight *= constraints?.coastal && !loc.coastal ? 0 : 1
      weight *= constraints?.regional && !regional ? 0 : 2
      weight *= constraints?.rural && !rural ? 0 : 1
      weight *= constraints?.urban && rural ? 0 : 1
      weight *= constraints?.tribal && civilized ? 0 : 1
      weight *= rural && type === 'court' ? 0.5 : 1
      weight *= !court && type === 'court' ? 0 : 1
      return { v: tag, w: weight }
    })
  const background = thread__backgrounds[window.dice.weightedChoice(candidates)]
  const patron = window.dice.choice(background.friends)
  const antagonist = window.dice.choice(background.enemies)
  const { season, time, heat, conditions, variance } = location__weather(loc)
  const thread: Thread = {
    tag: background.tag,
    difficulty: window.dice.choice(['deadly', 'hard', 'medium', 'easy']),
    category: `${background.type}${background.type === 'court' ? ` (${courts__spawn(loc)})` : ''}`,
    text: spin({ text: background.context, loc }),
    complication: spin({ text: window.dice.choice(background.complications), loc }),
    patron: spawnActor({ loc, actor: patron }),
    antagonist: spawnActor({ loc, actor: antagonist }),
    thing: spin({ text: window.dice.choice(background.things), loc }),
    place: spin({ text: window.dice.choice(background.places), loc }),
    weather: `${decorateText({
      label: heat.desc,
      tooltip: `${heat.degrees.toFixed(0)}°F`
    })}${
      variance === 'normal'
        ? ''
        : decorateText({ label: '*', color: variance === 'warmer' ? 'red' : 'blue' })
    }, ${season}, ${time}, ${conditions}`
  }
  loc._threads.push(thread)
}

/**
 * Gets all active threads at a location.
 * Will spawn threads if needed.
 * @param params.loc - location
 * @param params.avatar - PC character used to estimate thread difficulty
 * @returns list of threads for the location
 */
export const location__threads = (loc: Loc) => {
  const target = location__isCity(loc) ? 3 : location__isTown(loc) ? 2 : 1
  if (loc._threads.length < target) {
    range(target).forEach(() => thread__spawn(loc))
  }
  return loc._threads
}
