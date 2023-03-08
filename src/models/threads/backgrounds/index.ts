import { hub__isVillage } from '../../regions/hubs'
import { Province } from '../../regions/provinces/types'
import { backgrounds__community } from './communities'
import { backgrounds__court } from './courts'
import { backgrounds__faith } from './faith'
import { backgrounds__ruin } from './ruins'
import { Background, BackgroundDetails } from './types'
import { backgrounds__wilderness } from './wilderness'

const thread__backgrounds: Record<BackgroundDetails['tag'], BackgroundDetails> = {
  ...backgrounds__community,
  ...backgrounds__court,
  ...backgrounds__faith,
  ...backgrounds__ruin,
  ...backgrounds__wilderness
}

const backgrounds = Object.values(thread__backgrounds)

export const background__spawn = (params: { loc: Province; category: Background['category'] }) => {
  const { loc, category } = params
  const rural = hub__isVillage(loc.hub)
  const { capital: regional } = loc
  const { civilized } = window.world.regions[loc.region]
  const used = window.world.threads
    .map(thread => thread.background.context?.map?.(hook => hook.tag))
    .flat()
    .reduce((acc: Record<string, number>, tag) => {
      acc[tag] = (acc[tag] || 1) + 1
      return acc
    }, {})

  const candidates = backgrounds
    .filter(background => category === background.type)
    .map(({ tag, constraints }) => {
      let weight = 1
      weight *= constraints?.coastal && !loc.hub.coastal ? 0 : 1
      weight *= constraints?.regional && !regional ? 0 : 2
      weight *= constraints?.rural && !rural ? 0 : 1
      weight *= constraints?.urban && rural ? 0 : 1
      weight *= constraints?.tribal && civilized ? 0 : 1
      return { v: tag, w: weight / (used[tag] * 10 || 1) }
    })
  const tags = window.dice.weightedSample(candidates, 2)
  return {
    category,
    context: tags.map(tag => {
      const { context, friends, enemies, complications, places, things } = thread__backgrounds[tag]
      return {
        tag,
        text: window.dice.spin(context),
        friend: window.dice.choice(friends),
        enemy: window.dice.choice(enemies),
        complication: window.dice.choice(complications),
        place: window.dice.choice(places),
        thing: window.dice.choice(things)
      }
    })
  }
}
