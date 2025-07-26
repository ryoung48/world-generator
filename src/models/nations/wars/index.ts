import { PROVINCE } from '../../provinces'
import { TEXT } from '../../utilities/text'
import { NATION } from '..'
import { SpawnWarParams, War } from './types'

export const WAR = {
  describe: (war: War) => {
    const status = {
      decisive: 'the defenders are being crushed',
      stalemated: 'both sides are evenly matched',
      struggling: 'the invasion is being repulsed'
    }
    return {
      title: 'At War',
      subtitle: `(${war.idx}) ${status[war.status]}`,
      content: [
        {
          label: 'belligerents',
          text: war.belligerents
        },
        {
          label: 'background',
          text: war.reasons
            .map(({ tag, text }) => TEXT.decorate({ label: tag, tooltip: text }))
            .join(', ')
        }
      ]
    }
  },
  spawn: ({ attacker, defender }: SpawnWarParams) => {
    NATION.relations.set({ n1: attacker, n2: defender, relation: 'at war' })
    const borders = NATION.provinces(defender).filter(p =>
      PROVINCE.neighbors({ province: p, type: 'foreign' }).some(
        n => PROVINCE.nation(n) === attacker
      )
    )
    const battlegrounds = window.dice.shuffle(borders).slice(0, Math.max(0.5 * borders.length, 3))
    const idx = window.world.wars.length
    attacker.war = idx
    defender.war = idx
    battlegrounds.forEach(province => {
      province.battleground = idx
    })
    const attackerCulture = window.world.cultures[attacker.culture]
    const defenderCulture = window.world.cultures[defender.culture]
    const attackerIsAtheist = attackerCulture.religion === 'atheistic'
    const attackerIsCivilized =
      attacker.government !== 'confederation' && attacker.government !== 'fragmented'
    const defenderIsCivilized =
      defender.government !== 'confederation' && defender.government !== 'fragmented'
    const sameCulture = attackerCulture === defenderCulture
    const sameSpecies =
      window.world.cultures[attacker.culture].species ===
      window.world.cultures[defender.culture].species
    const civilized = attackerIsCivilized && defenderIsCivilized
    window.world.wars.push({
      idx,
      invader: attacker.idx,
      belligerents: `${TEXT.decorate({
        label: attacker.name.toLowerCase(),
        tooltip: 'invader'
      })}, ${TEXT.decorate({
        label: defender.name.toLowerCase(),
        tooltip: 'defender'
      })}`,
      provinces: battlegrounds.map(p => p.idx),
      status: window.dice.choice(['decisive', 'stalemated', 'struggling']),
      losses: window.dice.spin('{low|heavy} casualties, {mild|severe} destruction'),
      reasons: window.dice
        .weightedSample(
          [
            {
              v: {
                tag: `raider's haven`,
                text: 'raiders are taking refuge in their lands'
              },
              w: 1
            },
            {
              v: {
                tag: `pillager's harvest`,
                text: 'their lands are rich and bountiful, ripe for the taking'
              },
              w: !attackerIsCivilized ? 1 : 0
            },
            {
              v: {
                tag: `resource dispute`,
                text: 'ownership of a resource site is disputed'
              },
              w: 3
            },
            {
              v: {
                tag: `territorial expansion`,
                text: 'we seek to expand our sphere of influence'
              },
              w: 1
            },
            {
              v: {
                tag: `ancestral homelands`,
                text: 'they hold territories that were previously ours'
              },
              w: 1
            },
            {
              v: {
                tag: `artifact theft`,
                text: 'they stole an important {cultural|religious} relic'
              },
              w: 1
            },
            {
              v: {
                tag: `water obstructions`,
                text: 'they are building a dam that will affect our water supply'
              },
              w: defenderIsCivilized ? 1 : 0
            },
            {
              v: {
                tag: `criminal shelter`,
                text: '{an usurper is|{criminals|rebels} are} being sheltered there'
              },
              w: 1
            },
            {
              v: { tag: `holy crusade`, text: 'a troublemaking religion is based there' },
              w: attackerIsAtheist ? 0 : 1
            },
            {
              v: {
                tag: `religious reclamation`,
                text: 'there are disputes over holy sites along the border'
              },
              w: attackerIsAtheist ? 0 : 1
            },
            {
              v: {
                tag: `pilgrimage disruption`,
                text: "they're hindering our people's pilgrimage to a sacred site"
              },
              w: attackerIsAtheist ? 0 : 1
            },
            {
              v: {
                tag: `throne claim`,
                text: 'our rulers have a political claim on their throne'
              },
              w: sameSpecies ? 1 : 0
            },
            {
              v: { tag: `marital discord`, text: 'a diplomatic marriage is going sour' },
              w: sameSpecies ? 1 : 0
            },
            {
              v: { tag: `past strife`, text: 'a past war’s savagery has left deep scars' },
              w: 1
            },
            {
              v: {
                tag: `cultural encroachment`,
                text: 'their culture is supplanting local beliefs'
              },
              w: sameCulture ? 0 : 1
            },
            {
              v: {
                tag: `ethnic liberation`,
                text: 'they’re persecuting co-ethnics close to our border'
              },
              w: sameCulture ? 0 : 1
            },
            {
              v: {
                tag: `broken alliance`,
                text: 'they broke off an important alliance pact'
              },
              w: 1
            },
            {
              v: {
                tag: `trade blockade`,
                text: 'border tariffs and taxes are blocking trade'
              },
              w: civilized ? 1 : 0
            },
            {
              v: {
                tag: `smuggling crackdown`,
                text: 'our merchants have been executed for alleged smuggling'
              },
              w: attackerIsCivilized ? 1 : 0
            },
            {
              v: {
                tag: `enchantment wreckage`,
                text: 'an enchantment of theirs caused problems here'
              },
              w: 1
            },
            {
              v: {
                tag: `spy network`,
                text: 'a spy ring has been discovered gathering information and sowing discord'
              },
              w: 1
            },
            {
              v: {
                tag: `assassination suspicions`,
                text: 'they’re suspected of backing assassinations'
              },
              w: 1
            },
            {
              v: {
                tag: `insurgency support`,
                text: 'they’re supporting rebel groups in our lands'
              },
              w: 1
            }
          ],
          2
        )
        .map(({ tag, text }) => ({ tag, text: window.dice.spin(text) }))
    })
  }
}
