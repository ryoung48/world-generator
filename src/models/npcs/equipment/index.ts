import { Avatar } from '../../../components/context/types'
import { Province } from '../../regions/provinces/types'
import { dayMS } from '../../utilities/math/time'
import { TEXT } from '../../utilities/text'
import { Item } from './types'

export const armor = {
  light: () => window.dice.spin('{robes|robes|padded armor}'),
  medium: () => window.dice.spin('{leather|padded|hide|scale} armor'),
  heavy: () => window.dice.spin('{mail armor|plate armor|brigandine}'),
  shield: () => 'shield'
}

export const accessories = ({ heavy }: { heavy: boolean }) =>
  window.dice.spin(
    `{belt|ring|necklace|cloak|hood|cowl|scarf|sash|trinket|elixir|satchel|${
      heavy ? 'helmet|gauntlets|greaves|vambraces' : 'hat|gloves|boots|bracers'
    }}`
  )

export const weapons = {
  light: () => window.dice.spin('dagger'),
  medium: () => window.dice.spin('{sword|axe|mace}'),
  heavy: () => window.dice.spin('{greatsword|warhammer|greataxe}'),
  implements: () => window.dice.spin('{staff|dagger|wand|scepter}'),
  sorcery: () => window.dice.spin('{grimoire|scrolls|orb}'),
  monk: () => window.dice.spin('{martial arts|quarterstaff}'),
  ranged: () => window.dice.spin('{war bow|hunting bow|crossbow}')
}

export const tiers = [
  { name: 'poor', color: 'gray' },
  { name: 'fair', color: 'white' },
  { name: 'fine', color: 'green' },
  { name: 'exquisite', color: 'blue' },
  { name: 'masterwork', color: 'violet' },
  { name: 'legendary', color: 'orange' },
  { name: 'artifact', color: 'red' },
  { name: 'exotic', color: 'black' }
]

export const decorateItem = (item: Item) =>
  TEXT.decorate({
    label: item.name,
    tooltip: tiers[item.tier].name,
    underlineColor: tiers[item.tier].color
  })

export const slots: Record<Item['slot'], number> = {
  mainhand: 0.5,
  offhand: 0.5,
  'two-handed': 1,
  armor: 1,
  accessory: 0.5
}

export const localMarket = (params: { loc: Province; avatar: Avatar }) => {
  const { loc, avatar } = params
  if (loc.market === undefined || loc.market.memory < window.world.date) {
    loc.market = {
      memory: window.world.date + 90 * dayMS,
      goods: window.dice
        .shuffle(avatar.pcs.map(i => window.world.npcs[i].equipment).flat())
        .slice(0, 15)
        .map(i => ({
          ...i,
          tier: window.dice.weightedChoice([
            { w: 0.45, v: 1 },
            { w: 0.4, v: 2 },
            { w: 0.1, v: 3 },
            { w: 0.05, v: 4 }
          ])
        }))
    }
  }
  return loc.market.goods
}

export const itemPrice = (item: Item) => {
  return slots[item.slot] * 100 * 3 ** item.tier
}
