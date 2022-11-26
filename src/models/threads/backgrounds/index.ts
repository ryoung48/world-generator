import { Gender, npc__randomGender } from '../../npcs/actors/stats/appearance/gender'
import { lang__first } from '../../npcs/species/languages/words/actors'
import { location__demographics } from '../../regions/locations/actors/demographics'
import { location__templates } from '../../regions/locations/spawn/taxonomy'
import { Loc } from '../../regions/locations/types'
import { Thread, ThreadActor } from '../types'
import { backgrounds__community } from './communities'
import { backgrounds__court, courts__rival, courts__spawn } from './courts'
import { backgrounds__faith } from './faith'
import { backgrounds__ruin } from './ruins'
import { Background, BackgroundActor, BackgroundTag } from './types'
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
          { v: 'young adult', w: 0.1 },
          { v: 'adult', w: 0.4 },
          { v: 'middle age', w: 0.3 },
          { v: 'old', w: 0.2 }
        ]),
    monstrous: actor.monstrous
  }
}

export const thread__background = (loc: Loc): Thread['background'] => {
  const rural = loc.population < location__templates['large town'].population[0]
  const { capital: regional } = window.world.provinces[loc.province]
  const { civilized } = window.world.regions[loc.region]
  const court = courts__spawn(loc)
  const candidates = backgrounds.map(({ tag, constraints, type }) => {
    let weight = loc.backgrounds.includes(tag) ? 0 : 1
    weight *= constraints?.conflicts?.some(conflict => loc.backgrounds.includes(conflict)) ? 0 : 1
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
  return {
    tag: background.tag,
    category: `${background.type}${background.type === 'court' ? ` (${courts__spawn(loc)})` : ''}`,
    context: spin({ text: background.context, loc }),
    complication: spin({ text: window.dice.choice(background.complications), loc }),
    patron: spawnActor({ loc, actor: patron }),
    antagonist: spawnActor({ loc, actor: antagonist }),
    thing: spin({ text: window.dice.choice(background.things), loc }),
    place: spin({ text: window.dice.choice(background.places), loc })
  }
}
