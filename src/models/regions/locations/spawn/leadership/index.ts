import { decorateText } from '../../../../utilities/text/decoration'
import { region__isActive, region__nation } from '../../..'
import { region__isImperial } from '../../../diplomacy/status'
import { Loc } from '../../types'
import { location__isVillage } from '../taxonomy/settlements'
import { LeadershipTraits } from './types'

const traits: Record<
  LeadershipTraits,
  { key: LeadershipTraits; lead: string; conflicts?: LeadershipTraits[] }
> = {
  nascent: {
    key: 'nascent',
    lead: 'a',
    conflicts: ['fading']
  },
  respected: {
    key: 'respected',
    lead: 'a',
    conflicts: ['incompetent', 'neglectful', 'corrupt', 'paranoid', 'decadent']
  },
  charitable: {
    key: 'charitable',
    lead: 'a',
    conflicts: ['despotic', 'corrupt']
  },
  optimistic: {
    key: 'optimistic',
    lead: 'an',
    conflicts: ['melancholic']
  },
  despotic: {
    key: 'despotic',
    lead: 'a',
    conflicts: ['charitable']
  },
  fading: {
    key: 'fading',
    lead: 'a',
    conflicts: ['nascent']
  },
  neglectful: {
    key: 'neglectful',
    lead: 'a',
    conflicts: ['incompetent', 'respected']
  },
  incompetent: {
    key: 'incompetent',
    lead: 'an',
    conflicts: ['neglectful', 'respected']
  },
  paranoid: {
    key: 'paranoid',
    lead: 'a',
    conflicts: ['respected']
  },
  corrupt: {
    key: 'corrupt',
    lead: 'a',
    conflicts: ['respected', 'charitable']
  },
  decadent: {
    key: 'decadent',
    lead: 'a',
    conflicts: ['respected']
  },
  treacherous: {
    key: 'treacherous',
    lead: 'a'
  },
  capricious: {
    key: 'capricious',
    lead: 'a'
  },
  imperious: {
    key: 'imperious',
    lead: 'an'
  },
  pious: {
    key: 'pious',
    lead: 'a',
    conflicts: ['zealous']
  },
  zealous: {
    key: 'zealous',
    lead: 'a',
    conflicts: ['pious']
  },
  xenophobic: {
    key: 'xenophobic',
    lead: 'a',
    conflicts: ['xenophilic']
  },
  xenophilic: {
    key: 'xenophilic',
    lead: 'a',
    conflicts: ['xenophobic']
  },
  afflicted: {
    key: 'afflicted',
    lead: 'an'
  },
  melancholic: {
    key: 'melancholic',
    lead: 'a',
    conflicts: ['optimistic']
  },
  occult: {
    key: 'occult',
    lead: 'an'
  },
  schismatic: {
    key: 'schismatic',
    lead: 'a'
  },
  overextended: {
    key: 'overextended',
    lead: 'a'
  }
}

const selectTrait = (conflicts: LeadershipTraits[]) => {
  return window.dice.choice(Object.values(traits).filter(trait => !conflicts.includes(trait.key)))
    .key
}

export const settlement__leadership = (loc: Loc) => {
  if (!loc.leadership) {
    const region = window.world.regions[loc.region]
    const province = window.world.provinces[loc.province]
    const culture = window.world.cultures[region.culture.ruling]
    const { government } = region__nation(region)
    const { civilized } = region
    const sovereign = region__isActive(region)
    const primary = selectTrait([])
    const secondary = selectTrait([primary, ...(traits[primary].conflicts ?? [])])
    const trait = decorateText({
      label: `(${[primary, secondary].sort().join(', ')})`,
      italics: true
    })
    const centralized =
      government.structure === 'autocratic' || government.structure === 'oligarchic'
    const anarchy = government.structure === 'anarchic'
    const theocracy = government.structure === 'theocratic'
    const capital = (centralized || theocracy) && province.capital
    if (location__isVillage(loc) && !civilized) {
      loc.leadership = {
        ruler: `${window.dice.weightedChoice([
          { v: '{a hereditary|an elected} {chieftain|warlord}', w: 1 },
          { v: 'council of elders', w: 1 },
          { v: 'resident {sorcerer|priest}', w: 0.2 }
        ])} ${trait}`
      }
    } else if (location__isVillage(loc) && civilized) {
      loc.leadership = {
        ruler: `${window.dice.weightedChoice([
          { v: '{a hereditary|an elected} headman', w: 1 },
          { v: 'a hereditary lord', w: 0.2 },
          { v: 'an appointed reave representing a distant lord', w: 1 },
          { v: 'a council of elders', w: 1 },
          { v: 'a resident {sorcerer|priest}', w: 0.2 }
        ])} ${trait}`
      }
    } else if (capital && sovereign) {
      const male = culture.lineage === 'male'
      const elected = government.succession === 'elected'
      const imperial = region__isImperial(region)
      const ruler = imperial ? (male ? 'emperor' : 'empress') : male ? 'king' : 'queen'
      loc.leadership = {
        ruler: `${window.dice.weightedChoice([
          {
            v: `${elected ? 'an elected' : 'a hereditary'} ${ruler}`,
            w: centralized ? 1 : 0
          },
          {
            v: `${elected ? 'an elected' : 'a hereditary'} ${imperial ? 'archon' : 'high prelate'}`,
            w: theocracy ? 1 : 0
          },
          {
            v: `a {lord regent|regency council} until the ${ruler} comes of age`,
            w: elected ? 0 : 0.2
          }
        ])} ${trait}`
      }
    } else if (capital && !sovereign) {
      loc.leadership = {
        ruler: `${window.dice.weightedChoice([
          { v: 'an appointed viceroy', w: centralized ? 1 : 0 },
          { v: 'an appointed archbishop', w: theocracy ? 1 : 0 }
        ])} ${trait}`
      }
    } else {
      loc.leadership = {
        ruler: `${window.dice.weightedChoice([
          { v: 'an appointed bureaucrat', w: centralized ? 1 : 0 },
          { v: 'a hereditary aristocrat', w: 1 },
          {
            v: '{a hereditary|an elected} warlord',
            w: anarchy ? 5 : 0
          },
          {
            v: '{a hereditary|an elected} bishop',
            w: theocracy ? 5 : province.capital ? 0 : 0.5
          },
          {
            v: 'a council of {nobles|merchants|oligarchs}',
            w: 1
          },
          {
            v: 'a council of warlords',
            w: anarchy ? 5 : 0
          },
          {
            v: 'a council of priests',
            w: theocracy ? 5 : province.capital ? 0 : 0.5
          },
          {
            v: 'a council of sorcerers',
            w: province.capital ? 0 : 0.1
          },
          {
            v: 'a shadowy syndicate',
            w: province.capital ? 0 : anarchy ? 1 : 0.1
          }
        ])} ${trait}`
      }
    }
    loc.leadership.ruler = window.dice.spin(loc.leadership.ruler)
  }
  return loc.leadership
}
