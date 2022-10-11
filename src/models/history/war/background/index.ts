import { relation__isHostile } from '../../../regions/diplomacy/relations'
import { region__formattedWealth } from '../../../regions/diplomacy/status'
import { Region } from '../../../regions/types'
import { yearMS } from '../../../utilities/math/time'
import { decorateText } from '../../../utilities/text/decoration'
import { War } from '../types'
import { WarBackground, WarBackgroundArgs } from './types'

const liberalState = (state: Region) => state.government.structure === 'republic'
const conservativeState = (state: Region) =>
  state.government.structure === 'autocratic' || state.government.structure === 'oligarchic'

const findLastWar = ({ invader, defender }: WarBackgroundArgs) => {
  const [lastWar] = invader.wars.past
    .map(i => window.world.wars[i])
    .filter(war => {
      const invaderParticipant =
        war.invader.idx === invader.idx && war.defender.idx === defender.idx
      const defenderParticipant =
        war.defender.idx === invader.idx && war.invader.idx === defender.idx
      return invaderParticipant || defenderParticipant
    })
    .reverse()
  return lastWar
}

const findAlliesInPeril = ({ invader, defender }: WarBackgroundArgs) =>
  defender.wars.current
    .concat(defender.wars.past)
    .map(war => window.world.wars[war])
    .filter(
      war =>
        war.end > window.world.date - 15 * yearMS &&
        war.defender.idx !== defender.idx &&
        invader.relations[war.defender.idx] === 'ally' &&
        defender.relations[war.defender.idx] !== 'ally'
    )

const war__backgrounds: Record<War['background']['type'], WarBackground> = {
  allies: {
    tag: 'allies',
    spawn: params => (findAlliesInPeril(params).length > 0 ? 12 : 0),
    text: params => {
      const war = window.dice.choice(findAlliesInPeril(params))
      const ally = window.world.regions[war.defender.idx]
      return `in response to aggression towards an ${decorateText({
        label: 'ally',
        link: ally,
        tooltip: ally.name
      })}`
    }
  },
  betrayal: {
    tag: 'betrayal',
    spawn: ({ invader }) => (invader.development !== 'remote' ? 0.25 : 0),
    text: () => `in response to a broken ${window.dice.choice(['pact', 'treaty'])}`
  },
  borders: {
    tag: 'borders',
    spawn: () => 0.5,
    text: () =>
      window.dice.choice([`after worsening border tensions`, `after continued land disputes`])
  },
  conquest: {
    tag: 'conquest',
    spawn: () => 0.5,
    text: () =>
      window.dice.choice([
        `seeking resources in bordering provinces`,
        `in an expansion effort to support growing populations`,
        `in an expansion effort to fuel imperial ambitions`
      ])
  },
  dynastic: {
    tag: 'dynastic',
    spawn: ({ defender, invader }) =>
      defender.culture.ruling === invader.culture.ruling &&
      defender.government.succession === 'hereditary' &&
      invader.government.succession === 'hereditary'
        ? 1
        : 0,
    text: ({ defender }) =>
      `over a disputed succession claim to the ${decorateText({ link: defender })} throne`
  },
  excommunication: {
    tag: 'excommunication',
    spawn: ({ defender, invader }) =>
      defender.religion.state === invader.religion.state &&
      (window.world.religions[invader.religion.state].leadership === 'pontiff' ||
        window.world.religions[invader.religion.state].leadership === 'bishops')
        ? 0.5
        : 0,
    text: () => `to ${window.dice.choice(['punish', 'correct'])} poor interpretations of the faith`
  },
  ideology: {
    tag: 'ideology',
    spawn: ({ defender, invader }) => {
      const liberalDefender = liberalState(defender)
      const conservativeDefender = conservativeState(defender)
      const liberalInvader = liberalState(invader)
      const conservativeInvader = conservativeState(invader)
      return (liberalDefender && conservativeInvader) || (conservativeDefender && liberalInvader)
        ? 3
        : 0
    },
    text: ({ invader }) =>
      `to spread ${liberalState(invader) ? 'liberal' : 'authoritarian'} idealogies`
  },
  jihad: {
    tag: 'jihad',
    spawn: ({ defender, invader }) =>
      invader.religion.state !== defender.religion.state ? 0.75 : 0,
    text: ({ invader, defender }) => {
      const lostProvinces = defender.provinces
        .map(idx => window.world.provinces[idx])
        .some(province => {
          const region = window.world.regions[province.region]
          return region.religion.state === invader.religion.state
        })
      const reasons: string[] = [
        `in order to spread the true faith`,
        `to cleanse the land of heathens`
      ]
      if (lostProvinces) reasons.push(`to reclaim lost holy lands`)
      return window.dice.choice(reasons)
    }
  },
  liberation: {
    tag: 'liberation',
    spawn: ({ defender, invader }) =>
      invader.culture.ruling !== defender.culture.ruling &&
      defender.provinces
        .map(idx => window.world.provinces[idx])
        .some(
          province =>
            province.region === invader.idx ||
            window.world.regions[province.region].culture.native === invader.culture.ruling
        )
        ? 6
        : 0,
    text: () => `to end the ${window.dice.choice(['persecution', 'enslavement'])} of co-ethnics`
  },
  raiders: {
    tag: 'raiders',
    spawn: ({ defender, invader }) =>
      relation__isHostile(invader.relations[defender.idx]) ? (!invader.civilized ? 0.5 : 0.25) : 0,
    text: () => 'to avenge unprovoked raids on frontier settlements'
  },
  reclamation: {
    tag: 'reclamation',
    spawn: ({ defender, invader }) =>
      defender.provinces
        .map(idx => window.world.provinces[idx])
        .some(
          province =>
            province.region === invader.idx ||
            (window.world.regions[province.region].culture.native === invader.culture.ruling &&
              invader.culture.ruling !== defender.culture.ruling)
        )
        ? 6
        : 0,
    text: () =>
      window.dice.choice([`lost provinces.`, `cultural homelands.`].map(r => `to reclaim ${r}`))
  },
  trade: {
    tag: 'trade',
    spawn: ({ defender }) => (defender.economy.trade === 'protectionism' ? 0.5 : 0),
    text: () =>
      window.dice.choice([
        'over continued trade disputes',
        'over harsh restrictions on foreign trade'
      ])
  },
  vengeance: {
    tag: 'vengeance',
    spawn: args => (findLastWar(args) ? 1 : 0),
    text: ({ defender, invader }) => {
      const lastWar = findLastWar({ defender, invader })
      const reasons: string[] = [
        `to settle an old ${decorateText({
          label: 'feud',
          tooltip: lastWar.name
        })}`
      ]
      if (lastWar.invader.idx === invader.idx)
        reasons.push(
          `to finish what the last ${decorateText({
            label: 'invasion',
            tooltip: lastWar.name
          })} started`
        )
      if (lastWar.defender.idx === invader.idx)
        reasons.push(
          `to avenge past ${decorateText({
            label: 'transgressions',
            tooltip: lastWar.name
          })}`
        )
      return window.dice.choice(reasons)
    }
  }
}

const backgrounds = Object.values(war__backgrounds)

const formatActor = (region: Region) =>
  decorateText({ link: region, tooltip: region__formattedWealth(region) })

/**
 * generates the background of a war event
 * @param params.defender - nation being attacked
 * @param params.invader - nation attacking
 * @returns background type + text
 */
export const war__background = (params: WarBackgroundArgs) => {
  const background = window.dice.weightedChoice(
    backgrounds.map(background => {
      return { v: background.tag, w: background.spawn(params) }
    })
  )
  return {
    type: background,
    text: `${formatActor(params.invader)} ${window.dice.choice([
      'invades',
      'declares war on'
    ])} ${formatActor(params.defender)} ${war__backgrounds[background].text(params)}.`
  }
}
