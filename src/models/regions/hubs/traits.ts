import { range } from 'd3'

import { npc__spawn } from '../../npcs'
import { hub__isVillage } from '.'
import { Hub } from './types'

export const hub__traits = (hub: Hub) => {
  if (!hub.traits) {
    const village = hub__isVillage(hub)
    const province = window.world.provinces[hub.province]
    const { civilized } = window.world.regions[province.region]
    hub.traits = {
      leadership: window.dice.spin(
        window.dice.weightedChoice(
          village && civilized
            ? [
                { v: '{Hereditary|Elected} headman', w: 1 },
                { v: 'Appointed reave representing a distant lord', w: 1 },
                { v: 'Council of elders', w: 1 },
                { v: 'Traditional squire', w: 1 }
              ]
            : village && !civilized
            ? [
                { v: `{Hereditary|Elected} chieftain`, w: 1 },
                { v: `Council of the elders`, w: 1 },
                { v: `No ruler past clan heads`, w: 1 }
              ]
            : [
                { v: 'Hereditary lord', w: 1 },
                { v: 'Merchant prince', w: 1 },
                { v: 'Council of oligarchs', w: 1 },
                { v: 'Allied noble heads', w: 1 },
                { v: 'Gentry-elected mayor', w: 1 },
                { v: 'Major clerical figure', w: 1 },
                { v: 'Chief magistrate', w: 1 }
              ]
        )
      ),
      history: window.dice.choice(
        village && civilized
          ? [
              `Once a garrison outpost of a nation`,
              `A mine or quarry, perhaps now exhausted`,
              `A spot where refugees of a calamity settled`,
              `Holy ground or a temple to a particular faith`,
              `A plant or animal grows very well here`,
              `It's a safe way-post on a trade route`,
              `Refuge for a despised minority or group`,
              `A bandit camp that went legitimate`,
              `It's a safe base for salvage or ruin plundering`,
              `Decayed remnant of an ancient city`,
              `It grew up around a lordly manor or estate`
            ]
          : village && !civilized
          ? [
              `It's an unusually well-fortified safe place`,
              `A charismatic leader bound them together`,
              `The hunting or resources are very good here`,
              `They were driven here by a dire enemy`,
              `Seers or shamans said it was ordained`,
              `The leadership wants to find something here`,
              `Their herds or prey have led them here`,
              `They've been trapped here by the situation`,
              `They're paralyzed by internal dissent`,
              `They've been paid or induced to be here`,
              `Tradition requires they come here`,
              `Here they can do the most damage to a foe`
            ]
          : [
              `It's the former seat of a vanished nation`,
              `It's a trade nexus that has greatly prospered`,
              `It's an industrial or productive center`,
              `There is heavy resource extraction nearby`,
              `It controls a vital defensive point`,
              `It's built around an ancient enchantment`,
              `It's a stronghold of a local subculture`,
              `It's a sacred city to an important faith`,
              `It's a shared market for many villages`,
              `It's a place of great beauty or healthfulness`,
              `It's a shelter from dangerous environs`
            ]
      ),
      design: window.dice.spin(
        window.dice.weightedChoice([
          { v: 'Organic, sprawling, and mazy', w: 3 },
          { v: 'Simplistic grid pattern', w: 2 },
          { v: 'Concentric circles and ring roads', w: 1 },
          { v: 'Strict segregation of districts', w: 1 },
          { v: 'Neighborhoods with different patterns', w: village ? 0 : 1 },
          { v: '{Symbolic|Ritually-significant} plans', w: 1 },
          { v: 'Ruling-class hub district with spokes', w: village ? 0 : 1 }
        ])
      ),
      defenses: 'Placeholder',
      locals: range(10).map(() => npc__spawn({ loc: province }).idx)
    }
  }
  return hub.traits
}
