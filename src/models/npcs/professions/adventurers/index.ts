import { PROVINCE } from '../../../regions/provinces'
import { TEXT } from '../../../utilities/text'
import { ACTOR } from '../..'
import { accessories, armor, tiers, weapons } from '../../equipment'
import { Actor } from '../../types'
import { Adventurer, AdventurerKit, AdventurerParams } from './types'

const classes: Record<string, { base: Adventurer[]; equipment?: Adventurer }> = {
  'arcane knight': { base: ['paladin', 'wizard'], equipment: 'paladin' },
  ascetic: { base: ['monk', 'druid'] },
  battlemage: { base: ['fighter', 'wizard'], equipment: 'fighter' },
  barbarian: { base: ['barbarian', 'barbarian'] },
  beastmaster: { base: ['ranger', 'druid'] },
  brawler: { base: ['fighter', 'monk'] },
  brute: { base: ['barbarian', 'fighter'] },
  cantor: { base: ['chanter', 'monk'] },
  celebrant: { base: ['chanter', 'priest'] },
  chanter: { base: ['chanter', 'chanter'] },
  cipher: { base: ['cipher', 'cipher'] },
  cleric: { base: ['priest', 'fighter'], equipment: 'fighter' },
  contemplative: { base: ['monk', 'priest'] },
  crusader: { base: ['paladin', 'fighter'] },
  druid: { base: ['druid', 'druid'] },
  fanatic: { base: ['barbarian', 'paladin'] },
  fighter: { base: ['fighter', 'fighter'] },
  geomancer: { base: ['ranger', 'wizard'], equipment: 'wizard' },
  harbinger: { base: ['chanter', 'rogue'] },
  herald: { base: ['chanter', 'paladin'] },
  hierophant: { base: ['cipher', 'wizard'] },
  'holy slayer': { base: ['paladin', 'rogue'] },
  howler: { base: ['barbarian', 'chanter'] },
  hunter: { base: ['ranger', 'fighter'] },
  inquisitor: { base: ['cipher', 'paladin'] },
  itinerant: { base: ['ranger', 'priest'] },
  liberator: { base: ['druid', 'paladin'], equipment: 'paladin' },
  loremaster: { base: ['chanter', 'wizard'] },
  marauder: { base: ['barbarian', 'rogue'] },
  mindstalker: { base: ['cipher', 'rogue'] },
  monk: { base: ['monk', 'monk'] },
  mystic: { base: ['cipher', 'priest'] },
  oracle: { base: ['cipher', 'druid'] },
  paladin: { base: ['paladin', 'paladin'] },
  pathfinder: { base: ['rogue', 'druid'] },
  priest: { base: ['priest', 'priest'] },
  psyblade: { base: ['cipher', 'fighter'] },
  ranger: { base: ['ranger', 'ranger'] },
  ravager: { base: ['barbarian', 'monk'] },
  rogue: { base: ['rogue', 'rogue'] },
  sage: { base: ['wizard', 'monk'] },
  savage: { base: ['barbarian', 'ranger'] },
  scout: { base: ['ranger', 'rogue'] },
  seer: { base: ['cipher', 'ranger'] },
  shadowdancer: { base: ['monk', 'rogue'] },
  shaman: { base: ['barbarian', 'priest'] },
  shepherd: { base: ['paladin', 'ranger'] },
  sorcerer: { base: ['druid', 'wizard'] },
  spellblade: { base: ['rogue', 'wizard'], equipment: 'rogue' },
  spiritualist: { base: ['cipher', 'chanter'] },
  swashbuckler: { base: ['rogue', 'fighter'] },
  tempest: { base: ['barbarian', 'druid'] },
  templar: { base: ['paladin', 'priest'], equipment: 'paladin' },
  thaumaturge: { base: ['priest', 'wizard'] },
  theurge: { base: ['chanter', 'druid'] },
  transcendent: { base: ['cipher', 'monk'] },
  universalist: { base: ['druid', 'priest'] },
  'war caller': { base: ['chanter', 'fighter'] },
  wanderer: { base: ['ranger', 'monk'] },
  warden: { base: ['fighter', 'druid'], equipment: 'fighter' },
  warlock: { base: ['barbarian', 'wizard'] },
  wildrhymer: { base: ['chanter', 'ranger'] },
  witch: { base: ['barbarian', 'cipher'] },
  wizard: { base: ['wizard', 'wizard'] },
  votary: { base: ['monk', 'paladin'] },
  zealot: { base: ['rogue', 'priest'] }
}

const kits: AdventurerKit = {
  barbarian: {
    equipment: () => {
      const selected = window.dice.choice([armor.heavy, armor.medium])
      const equipment: Actor['equipment'] = [
        { slot: 'armor', tier: 0, name: selected() },
        { slot: 'accessory', tier: 0, name: accessories({ heavy: selected === armor.heavy }) }
      ]
      if (window.dice.flip) {
        equipment.push({ slot: 'two-handed', tier: 0, name: weapons.heavy() })
      } else {
        equipment.push({ slot: 'mainhand', tier: 0, name: weapons.medium() })
        equipment.push({ slot: 'offhand', tier: 0, name: weapons.medium() })
      }
      return equipment
    },
    abilities: {
      minor: [
        {
          tag: 'barbaric shout',
          text: 'let out a frightful yell, weakening enemies within the area of effect',
          tier: 0
        },
        {
          tag: 'crushing blow',
          text: 'deliver a powerful blow to a single enemy, knocking them prone and causing damage',
          tier: 0
        },
        {
          tag: 'cleave',
          text: 'strike with a powerful blow, damaging all enemies in front of you',
          tier: 0
        }
      ],
      major: [
        {
          tag: 'berserker',
          text: 'enter a frenzied state; gain strength and speed, but with weaker defenses',
          tier: 0
        },
        {
          tag: 'whirlwind',
          text: 'spin around, striking all enemies in the area of effect',
          tier: 0
        },
        {
          tag: 'bloodthirst',
          text: 'increase your damage for a short time after downing an enemy',
          tier: 0
        }
      ]
    }
  },
  chanter: {
    equipment: () => {
      const equipment: Actor['equipment'] = [
        { slot: 'armor', tier: 0, name: window.dice.choice([armor.medium, armor.light])() },
        { slot: 'accessory', tier: 0, name: accessories({ heavy: false }) },
        { slot: 'mainhand', tier: 0, name: weapons.light() },
        { slot: 'offhand', tier: 0, name: window.dice.spin('instrument') }
      ]
      return equipment
    },
    abilities: {
      minor: [
        {
          tag: 'eldritch lore',
          text: 'recall occult knowledge, increasing your damage against spirits, vessels, and aberrations',
          tier: 0
        },
        {
          tag: 'war ballad',
          text: 'recite an epic battle song, strengthening nearby allies',
          tier: 0
        },
        {
          tag: 'haunting melody',
          text: 'sing a haunting tune, weakening enemies within the area of effect',
          tier: 0
        }
      ],
      major: [
        {
          tag: 'ancestral echoes',
          text: 'performs an ancient chant, summoning ghostly warriors to assist the chanter in battle',
          tier: 0
        },
        {
          tag: "siren's call",
          text: 'sing an enchanting melody, charming a single enemy for a short time',
          tier: 0
        },
        {
          tag: 'requiem of the fallen',
          text: 'sings a mournful dirge, reviving a single fallen ally',
          tier: 0
        }
      ]
    }
  },
  cipher: {
    equipment: () => {
      const equipment: Actor['equipment'] = window.dice.flip
        ? [
            { slot: 'armor', tier: 0, name: armor.medium() },
            { slot: 'accessory', tier: 0, name: accessories({ heavy: false }) },
            { slot: 'mainhand', tier: 0, name: weapons.light() },
            { slot: 'offhand', tier: 0, name: weapons.light() }
          ]
        : [
            { slot: 'armor', tier: 0, name: armor.light() },
            { slot: 'accessory', tier: 0, name: accessories({ heavy: false }) },
            { slot: 'mainhand', tier: 0, name: weapons.implements() },
            { slot: 'offhand', tier: 0, name: weapons.sorcery() }
          ]
      return equipment
    },
    abilities: {
      minor: [
        {
          tag: 'mind intrusion',
          text: 'read the thoughts of an enemy, revealing their strengths, weaknesses, and resistances',
          tier: 0
        },
        { tag: 'pain link', text: 'forces enemies to share the pain of a nearby ally', tier: 0 },
        {
          tag: 'tactical meld',
          text: 'link minds with surrounding allies, increasing overall cohesion',
          tier: 0
        }
      ],
      major: [
        {
          tag: 'nightmare',
          text: 'causes enemies in the area of effect to flee in terror',
          tier: 0
        },
        {
          tag: 'domination',
          text: 'take control of an enemy, forcing them to fight for you',
          tier: 0
        },
        {
          tag: 'divination',
          text: 'foresee glimpses of possible futures, allowing you to avoid dangerous situations',
          tier: 0
        }
      ]
    }
  },
  druid: {
    equipment: () => {
      const equipment: Actor['equipment'] = [
        { slot: 'armor', tier: 0, name: armor.light() },
        { slot: 'accessory', tier: 0, name: accessories({ heavy: false }) },
        { slot: 'mainhand', tier: 0, name: weapons.implements() },
        { slot: 'offhand', tier: 0, name: weapons.sorcery() }
      ]
      return equipment
    },
    abilities: {
      minor: [
        { tag: 'insect swarm', text: 'summon a swarm of insects to attack your enemies', tier: 0 },
        {
          tag: 'entangling vines',
          text: 'summon vines to entangle your enemies, slowing their movement',
          tier: 0
        },
        {
          tag: 'verdant grove',
          text: 'create an enchanted grove periodically heals nearby allies',
          tier: 0
        }
      ],
      major: [
        {
          tag: 'shapeshifter',
          text: 'transform into a powerful beast, gaining increased strength and speed',
          tier: 0
        },
        {
          tag: 'tempest',
          text: 'summon a storm of lightning, striking all enemies in the area of effect',
          tier: 0
        },
        {
          tag: "nature's bounty",
          text: 'brew vials of wondrous nectar that allies can consume to heal themselves',
          tier: 0
        }
      ]
    }
  },
  fighter: {
    equipment: () => {
      const equipment: Actor['equipment'] = [
        { slot: 'armor', tier: 0, name: armor.heavy() },
        { slot: 'accessory', tier: 0, name: accessories({ heavy: true }) }
      ]
      if (window.dice.flip) {
        equipment.push({ slot: 'two-handed', tier: 0, name: weapons.heavy() })
      } else {
        equipment.push({ slot: 'mainhand', tier: 0, name: weapons.medium() })
        equipment.push({ slot: 'offhand', tier: 0, name: armor.shield() })
      }
      return equipment
    },
    abilities: {
      minor: [
        {
          tag: 'vanguard',
          text: 'charge into battle, knocking aside enemies in your path',
          tier: 0
        },
        {
          tag: 'bulwark',
          text: 'take a defensive stance, increasing your defenses for a short time',
          tier: 0
        },
        {
          tag: 'tactician',
          text: 'shout out orders, increasing the damage and speed of nearby allies',
          tier: 0
        }
      ],
      major: [
        {
          tag: 'executioner',
          text: 'deal a massive damage to an enemy that is near death',
          tier: 0
        },
        {
          tag: 'last stand',
          text: 'stand back up after being knocked out with temporary defensive bonuses',
          tier: 0
        },
        {
          tag: 'sunder armor',
          text: "your attacks have a small chance to weaken an enemy's armor",
          tier: 0
        }
      ]
    }
  },
  monk: {
    equipment: () => {
      const equipment: Actor['equipment'] = [
        { slot: 'armor', tier: 0, name: armor.light() },
        { slot: 'accessory', tier: 0, name: accessories({ heavy: false }) },
        { slot: 'two-handed', tier: 0, name: weapons.monk() }
      ]
      return equipment
    },
    abilities: {
      minor: [
        {
          tag: 'swift strikes',
          text: 'strike with lightning speed, giving you a small chance to attack twice',
          tier: 0
        },
        {
          tag: 'evasion',
          text: 'dodge and deflect incoming attacks, reducing damage taken for a short time',
          tier: 0
        },
        {
          tag: 'stunning blow',
          text: "a head-targeting strike designed to disrupt an enemies' ability to react, stunning them",
          tier: 0
        }
      ],
      major: [
        {
          tag: 'monastic brew',
          text: 'brew a special concoction that allies can consume to heal themselves',
          tier: 0
        },
        {
          tag: 'elemental infusion',
          text: 'infuse your weapons with elemental energy, causing your attacks to deal additional damage',
          tier: 0
        },
        {
          tag: 'forbidden fist',
          text: 'perform a forbidden technique that deals heavy damage to an enemy at the cost of health',
          tier: 0
        }
      ]
    }
  },
  paladin: {
    equipment: () => {
      const equipment: Actor['equipment'] = [
        { slot: 'armor', tier: 0, name: armor.heavy() },
        { slot: 'accessory', tier: 0, name: accessories({ heavy: true }) }
      ]
      if (window.dice.flip) {
        equipment.push({ slot: 'two-handed', tier: 0, name: weapons.heavy() })
      } else {
        equipment.push({ slot: 'mainhand', tier: 0, name: weapons.medium() })
        equipment.push({ slot: 'offhand', tier: 0, name: armor.shield() })
      }
      return equipment
    },
    abilities: {
      minor: [
        {
          tag: 'retribution',
          text: 'deal increased damage the closer you are to death',
          tier: 0
        },
        {
          tag: 'divine zeal',
          text: 'your attacks have a small chance to heal nearby allies',
          tier: 0
        },
        {
          tag: 'judgement',
          text: 'mark an enemy, causing them to take increased damage from all sources',
          tier: 0
        }
      ],
      major: [
        {
          tag: "guardian's oath",
          text: 'create a holy ward around an ally that absorbs incoming damage',
          tier: 0
        },
        {
          tag: 'anti-magic',
          text: 'gain spell resistance and occasionally disrupt nearby spell casters',
          tier: 0
        },
        {
          tag: 'sacred immolation',
          text: 'burn yourself with holy fire, causing damage to nearby enemies',
          tier: 0
        }
      ]
    }
  },
  priest: {
    equipment: () => {
      const equipment: Actor['equipment'] = [
        { slot: 'armor', tier: 0, name: armor.light() },
        { slot: 'accessory', tier: 0, name: accessories({ heavy: false }) },
        { slot: 'mainhand', tier: 0, name: weapons.implements() },
        { slot: 'offhand', tier: 0, name: weapons.sorcery() }
      ]
      return equipment
    },
    abilities: {
      minor: [
        { tag: 'cure wounds', text: 'heal an ally with a touch of divine light', tier: 0 },
        {
          tag: 'divine blessing',
          text: 'bless nearby allies, increasing their damage for a short time',
          tier: 0
        },
        {
          tag: 'blinding light',
          text: 'create a flash of light, blinding enemies in the area of effect',
          tier: 0
        }
      ],
      major: [
        {
          tag: 'spiritual weapon',
          text: 'call forth a divine weapon empowered by your faith',
          tier: 0
        },
        {
          tag: 'consecrated ground',
          text: 'sanctifies the ground, healing allies and damaging enemies within the area',
          tier: 0
        },
        {
          tag: 'resurrection',
          text: 'recite an elaborate prayer, reviving a single fallen ally',
          tier: 0
        }
      ]
    }
  },
  ranger: {
    equipment: () => {
      const equipment: Actor['equipment'] = [
        { slot: 'armor', tier: 0, name: armor.medium() },
        { slot: 'accessory', tier: 0, name: accessories({ heavy: false }) },
        { slot: 'two-handed', tier: 0, name: weapons.ranged() }
      ]
      return equipment
    },
    abilities: {
      minor: [
        {
          tag: 'flock of ravens',
          text: 'summon a flock of ravens to attack your enemies',
          tier: 0
        },
        {
          tag: 'trap arsenal',
          text: 'set up a trap that deals damage and immobilizes the first enemy that triggers it',
          tier: 0
        },
        {
          tag: 'camouflage',
          text: 'blend into the environment, becoming invisible for a short time',
          tier: 0
        }
      ],
      major: [
        {
          tag: 'animal companion',
          text: 'summon a loyal animal companion to fight at your side',
          tier: 0
        },
        {
          tag: 'explosive munitions',
          text: 'detonate an explosive, dealing damage to all enemies in the area of effect',
          tier: 0
        },
        {
          tag: 'mutagenic elixirs',
          text: 'consume corrupt and toxic substances to temporarily gain eldritch abilities',
          tier: 0
        }
      ]
    }
  },
  rogue: {
    equipment: () => {
      const equipment: Actor['equipment'] = [
        { slot: 'armor', tier: 0, name: armor.medium() },
        { slot: 'accessory', tier: 0, name: accessories({ heavy: false }) },
        { slot: 'mainhand', tier: 0, name: weapons.light() },
        { slot: 'offhand', tier: 0, name: weapons.light() }
      ]
      return equipment
    },
    abilities: {
      minor: [
        { tag: 'shadow step', text: 'teleport to a nearby location', tier: 0 },
        {
          tag: 'vanish',
          text: 'create a small smoke cloud and become invisible for a short time',
          tier: 0
        },
        { tag: 'riposte', text: 'counterattack an enemy that misses you in melee', tier: 0 }
      ],
      major: [
        {
          tag: 'deadly poisons',
          text: 'coat your weapons with poison, causing them to deal additional damage',
          tier: 0
        },
        { tag: 'fan of knives', text: 'throw a flurry of knives at nearby enemies', tier: 0 },
        {
          tag: 'vampiric embrace',
          text: 'your visage becomes pallid and your attacks steal health from enemies',
          tier: 0
        }
      ]
    }
  },
  wizard: {
    equipment: () => {
      const equipment: Actor['equipment'] = [
        { slot: 'armor', tier: 0, name: armor.light() },
        { slot: 'accessory', tier: 0, name: accessories({ heavy: false }) },
        { slot: 'mainhand', tier: 0, name: weapons.implements() },
        { slot: 'offhand', tier: 0, name: weapons.sorcery() }
      ]
      return equipment
    },
    abilities: {
      minor: [
        {
          tag: 'mirror images',
          text: 'create illusory duplicates of yourself, confusing enemies',
          tier: 0
        },
        {
          tag: 'polymorph',
          text: 'transform an enemy into a helpless creature',
          tier: 0
        },
        { tag: 'teleportation', text: 'teleport to a nearby location', tier: 0 }
      ],
      major: [
        {
          tag: 'fireball',
          text: 'cast a large fireball that explodes on impact, dealing damage to all enemies in the area of effect',
          tier: 0
        },
        {
          tag: 'time warp',
          text: 'slow down time for all enemies, causing them to move and attack slower',
          tier: 0
        },
        {
          tag: 'animated armor',
          text: 'summon a suit of animated armor to fight at your side',
          tier: 0
        }
      ]
    }
  }
}

export const adventurers = ({ count, province }: AdventurerParams): number[] => {
  const hub = PROVINCE.hub(window.world.provinces[province])
  return window.dice
    .weightedSample(
      Object.keys(classes).map(_key => {
        const key = _key as keyof typeof classes
        return { v: key, w: classes[key].base[0] === classes[key].base[1] ? 3 : 0 }
      }),
      count
    )
    .map(profession => {
      const npc = ACTOR.spawn({
        place: hub,
        profession: 'custom',
        age: 'young adult',
        pc: true
      })
      npc.profession.title = profession
      const selected = classes[profession as keyof typeof classes]
      const kit = selected.equipment ?? window.dice.choice(selected.base)
      npc.equipment = kits[kit].equipment()
      const [minor, major] = window.dice.shuffle(selected.base)
      npc.abilities = [
        { ...window.dice.choice(kits[minor].abilities.minor) },
        { ...window.dice.choice(kits[major].abilities.major) }
      ].map(ability => ({ ...ability, text: window.dice.spin(ability.text) }))
      return npc.idx
    })
}

export const decorateAbility = (ability: Actor['abilities'][number]): string => {
  return TEXT.decorate({
    label: ability.tag,
    tooltip: ability.text,
    underlineColor: tiers[ability.tier].color
  })
}
