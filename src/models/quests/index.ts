import { ACTOR } from '../npcs'
import { PLACE } from '../regions/places'
import { Hub } from '../regions/places/hub/types'
import { Quest } from './types'

const quests: Record<number, Quest[]> = {}

const enemies = {
  wilderness: [
    'undead {husks|wraiths|abomination}',
    'vampiric spawn',
    '{eldritch|otherworldly} {warband|aberrations|abomination|scion}',
    'blighted {warband|abomination|chimera}',
    '{deepfolk|merfolk} {raiders|cultists}',
    '{enraged|corrupted} {spirit|elemental|eidolon}',
    'relic automatons',
    '{territorial|xenophobic} tribesman',
    'rival mercenaries',
    'bandit {highwaymen|raiders|slavers|marauders}',
    'dark cultists',
    '{vile|reclusive} {sorcerer|necromancer|occultist}',
    '{beast swarm|monstrous beast}',
    '{fungal colony|carnivorous flora}'
  ],
  urban: [
    'rival mercenaries',
    'dark cultists',
    'religious {fanatics|zealots}',
    'ethnic supremacists',
    'rebel {solders|insurgents}',
    'foreign {agents|spies}',
    '{vile|reclusive} {sorcerer|necromancer|occultist}',
    'criminal {gang|syndicate|cartel}',
    '{corrupt|venal} official',
    '{rapacious|decadent} aristocrat'
  ]
}

export const QUEST = {
  spawn: (hub: Hub) => {
    const province = PLACE.province(hub)
    if (!quests[province.idx])
      quests[province.idx] = window.dice
        .sample(
          [
            'bounty',
            'rescue',
            'retrieval',
            'investigation',
            'theft',
            'sabotage',
            'exploration',
            'smuggling',
            'defense',
            'espionage'
          ],
          5
        )
        .map(quest => {
          const hostiles = ['espionage', 'theft', 'smuggling'].includes(quest)
            ? enemies.urban
            : ['exploration', 'retrieval'].includes(quest)
            ? enemies.wilderness
            : window.dice.choice([enemies.urban, enemies.wilderness])
          return {
            type: quest,
            enemies: window.dice.spin(window.dice.choice(hostiles)),
            difficulty: 'easy',
            patron: ACTOR.spawn({ place: hub }).idx
          }
        })
    return quests[province.idx]
  }
}
