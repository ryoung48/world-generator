import { cssColors } from '../../../../../components/theme/colors'
import { ACTOR } from '../../../../npcs'
import { LANGUAGE } from '../../../../npcs/languages'
import { decorateText } from '../../../../utilities/text/decoration'
import { PROVINCE } from '../..'
import { HUB } from '../../hubs'
import { Province } from '../../types'
import { Court, CourtTemplate } from './types'

const court__sites: Record<string, CourtTemplate> = {
  aristocratic: {
    title: 'noble household',
    theme: {
      text: 'court theme',
      types: [
        'Treachery, an air of suspicion and mistrust',
        'Decadence, of excess and indulgence',
        'Ennui, of exhaustion and loss of meaning',
        'Ambition, of driving forward and upward',
        'Resentment, bitter at their rivals’ crimes',
        'Nobility, a sense of obligation to their people',
        'Paralysis, trapped in some internal crisis',
        'Luxury, abundant in wealth and possessions',
        'Tyranny, cruelly oppressing those under them',
        'Dissolution, falling apart from outside stress',
        'Exoticism, following strange outside ways',
        'Might, flexing its power in impressive ways'
      ]
    },
    actors: {
      major: [
        { title: 'Titular ruler', adult: true },
        { title: 'Ornamental Spouse', adult: true },
        { title: 'Ruler’s Mistress' },
        { title: 'Heir Apparent', youngAdult: true },
        { title: 'Court sorcerer' },
        { title: "Ruler's favorite courtier", veteran: true },
        { title: 'Discarded former favorite', veteran: true },
        { title: 'Noble clergyman', veteran: true },
        { title: 'Senior Relative', elderly: true },
        { title: 'Guard Captain', veteran: true }
      ],
      minor: [
        { title: 'Amoral sycophant' },
        { title: 'Court musician' },
        { title: 'Commoner petitioner' },
        { title: 'Grizzled guardsman', veteran: true },
        { title: 'Veteran huntsman', veteran: true },
        { title: 'Heir’s Tutor', veteran: true },
        { title: 'Hired Assassin' },
        { title: 'Foreign artist', foreign: true },
        { title: 'Disposable plaything', youngAdult: true },
        { title: 'Gossiping servant' },
        { title: 'Disguised spy' },
        { title: "Ruler's personal body-servant" }
      ],
      power: [
        'They are the only legitimate heir to an important post',
        'They control a large chunk of the court’s income sources',
        'They are widely loved and admired by the members',
        'They have access to sinister sorceries or magic items',
        'The others fear violence or brutality from them',
        'They have a special relationship with the nation’s ruler',
        'They have blackmail on important members',
        'Everyone acknowledges their skill and brilliance',
        'They have a very effective spy ring in their service',
        'They provide intimate services to an important person',
        'They have innate magical powers or gifts',
        'They have the support of an important local faith'
      ]
    },
    conflicts: [
      'A favorite is being too indulged',
      'A foolish policy is being enacted',
      'A loan may or may not be repaid',
      'A marriage is being forcibly pressured',
      'A noble title is fought over',
      'Dispute over the heir',
      'Grudge over an old treachery',
      'Land ownership is in question',
      'Ownership of vital regalia is disputed',
      'Someone resents a lack of reward',
      "Someone's genealogy is challenged",
      "Someone's using dark sorcery"
    ],
    consequences: [
      'A civil struggle or civil war would break out',
      'A much worse set of replacements are waiting',
      'A neighboring court would be infuriated by it',
      'A vital project would collapse disastrously',
      'Actually, nothing particularly bad would happen',
      'Hostile outsiders would seize the opportunity',
      'Many locals would be furious at the disruption',
      'No one else with any pretense of legitimacy',
      'Only they know how to work the government',
      'Their lineage is needed to operate vital magic',
      'They represent the major elements of society',
      "They're holding back a dire threat to the society"
    ],
    defenses: [
      'A crew of bodyguard-magi',
      'A magical defensive construct',
      'A very capable sorcerer',
      'An elite corps of human warriors',
      'Buildings with dire traps',
      'Extreme seclusion of the nobility',
      'Lingering magical blessing',
      'Magical guardian beast or beasts',
      'Powerful empyrean wards',
      'Powerful personal defensive magic',
      'Swarms of trained guardsmen',
      'Vast mobs of devoted servants'
    ]
  },
  mercantile: {
    title: '{merchant consortium|{merchant|banking} house}',
    theme: {
      text: 'relations with their market',
      types: [
        'Trusted, they’re a fixture of the local market',
        'Despised, they’ve done something to infuriate',
        'Curious, they’ve come up with a new thing',
        'Resentful, they deal harshly and graspingly',
        'Suspicious, they’re rumored to do vile things',
        'Admired, they’re well-loved by customers',
        'Novel, they’re new to the market here',
        'Patronized, favored by the local nobility',
        'Affinity, dealing with co-ethnics or believers',
        'Apathetic, with customers losing interest',
        'Predatory, eliminating weaker rivals',
        'Shabby, their goods cheap and minimal'
      ]
    },
    actors: {
      major: [
        { title: 'Biggest business rival', veteran: true },
        { title: 'Biggest customer', veteran: true },
        { title: 'Brash entrepreneur', adult: true },
        { title: 'Brilliant innovator' },
        { title: 'Careless owner’s child', youngAdult: true },
        { title: 'Chief accountant', veteran: true },
        { title: 'Critically-skilled employee', adult: true },
        { title: 'Hard-bitten founder', veteran: true },
        { title: 'Heir-apparent to business', youngAdult: true },
        { title: 'Main supplier of goods', veteran: true },
        { title: 'Major investor', veteran: true },
        { title: 'Popular crew foreman', adult: true }
      ],
      minor: [
        { title: '“Protection” outfit heavy' },
        { title: 'Aspiring vendor to the business', adult: true },
        { title: 'Bribeable local inspector', adult: true },
        { title: 'Devoted long-time staffer', veteran: true },
        { title: 'Embittered ex-employee' },
        { title: 'Gold-digging lover of the owner', adult: true },
        { title: 'Infuriated customer' },
        { title: 'Oldest employee of the business', elderly: true },
        { title: 'Petty thief of stock' },
        { title: 'Shady black market contact', adult: true },
        { title: 'Spy for a rival business' },
        { title: 'Wildly impractical dreamer' }
      ],
      power: [
        'The business owes them a great deal of money',
        'The employees love them and listen to them unfailingly',
        'The others are physically afraid of their displeasure',
        'The vendors only trust them to negotiate supply buys',
        'They can legally wreck the business if too displeased',
        'They have magic or technology critical to the business',
        'They hold a secret critical to carrying out the business',
        'They know the details of a secret crime of the business',
        'They legally hold a large amount of the business’ money',
        'They own the deed to a major business facility',
        'They’re holding back the local extortionists and thieves',
        'They’re particularly friendly with the local ruler'
      ]
    },
    conflicts: [
      'A competitor’s trying to buy them out',
      'A traitor’s working for a competitor',
      'It’s struggling under a heavy debt',
      'Major actors are divided on strategy',
      'Recent effort has gone drastically bad',
      'The employees are in an uproar',
      'The locals blame it for something dire',
      'The owner is incapacitated indefinitely',
      'The ruler “asked” for a very costly favor',
      'Their survival hinges on ongoing crime',
      'They’re covering up a major crime',
      'They’ve lost a vital secret or tool'
    ],
    consequences: [
      'A fragile, valuable economic link breaks up',
      'Debt chain reaction takes out a major firm',
      'It would enrage their major customers',
      'It would infuriate influential business partners',
      'Only they can provide a critical local service',
      'The local ruler relies on it for exerting control',
      'Their competitors are much more rapacious',
      'They provide critical employment to locals',
      'They’re holding a community creditor at bay',
      'They’re keeping out ruffians and exploiters',
      'They’re paying off outside threats or grafters',
      'They’re the only supplier of a vital local necessity'
    ],
    defenses: [
      '“Protection” outfit legbreakers',
      'A crew of burly, loyal employees',
      'Decentralized business control',
      'Expensive lawyers',
      'Heavily fortified businessplace',
      'Hired local wizard',
      'Hired mercenaries',
      'Inherited magical defenses',
      'Personally fearsome owner',
      'Protective local citizens',
      'Purchased magical defenses',
      'Special police protection'
    ]
  },
  criminal: {
    title: 'criminal {syndicate|gang|brotherhood|cartel}',
    theme: {
      text: 'primary mode of crime',
      types: [
        'Banditry in the surrounding area',
        'Blackmailing and spying for the rich',
        'Extortion from local merchants',
        'Fighting rival groups for turf',
        'Hired assassination and other violence',
        'Human trafficking for labor or pleasure',
        'Import of drugs or forbidden contraband',
        'Persecuting a perceived group of enemies',
        'Pickpocketing and petty theft',
        'Smuggling of goods to avoid customs taxes',
        'Theft and embezzlement from the government',
        'Vices of all expensive kinds'
      ]
    },
    actors: {
      major: [
        { title: 'Beggar king', veteran: true },
        { title: 'Brothel owner', adult: true },
        { title: 'Corrupt official', adult: true },
        { title: 'Expert cat burglar' },
        { title: 'Wicked Noble Patron', veteran: true },
        { title: 'Gang leader', veteran: true },
        { title: 'Grasping priest', adult: true },
        { title: 'Ambitious Lieutenant', adult: true },
        { title: 'Master assassin', adult: true },
        { title: 'Scheming merchant', adult: true },
        { title: 'Venal priest', adult: true }
      ],
      minor: [
        { title: 'Ambitious thief' },
        { title: 'Bribed guardsman' },
        { title: 'Canny smuggler' },
        { title: 'Cynical prostitute' },
        { title: 'Disposable thug' },
        { title: 'Embezzling clerk' },
        { title: 'Frightened shopkeep' },
        { title: 'Roving pickpocket' },
        { title: 'Oppressed Local' },
        { title: 'Protected Merchant' },
        { title: 'Shabby Local Fence' },
        { title: 'Drunken Healer', adult: true },
        { title: 'Cooperative Innkeeper', adult: true },
        { title: 'Sharp-eyed beggar' },
        { title: 'Well-paid lawyer', adult: true }
      ],
      power: [
        'Controls a dangerous gang or cabal',
        'Controls fencing or money handling',
        'Handles the corrupt local officials',
        'Has a stable of urchins and/or prostitutes',
        'Has connections with the local elite',
        'Has potent magic or a powerful relic',
        'Knows secret paths and ways to anywhere',
        'Owns a number of useful front businesses',
        'Patriarch/matriarch of extended criminal family',
        'Provides a driving ideology for the group',
        'Provides muscle or murder for the group',
        'Provides social legitimacy for the group'
      ]
    },
    conflicts: [
      'A lieutenant rebels against the boss',
      "An assassin's after a major actor",
      'Control of a new drug or contraband',
      'Control of an important local official',
      'Dispute over whether to kill someone',
      'Expulsion of outsiders from their turf',
      'Possession of a new-found treasure',
      'Revenge for a theft or offense',
      "Someone's trying to unify local gangs",
      "Someone's turned traitor to the law",
      'Subverting a source of law and order',
      'Turf struggle over working territories'
    ],
    consequences: [
      'A local group relies on them for a living',
      'The ruler uses them to contain a serious rival',
      'Their affiliates provide vital financial services',
      'Their blackmail would get out, causing chaos',
      'They act as jailers to a magical danger',
      'They actually provide vital aid to the poor',
      'They bleed off otherwise-active rebels',
      'They defend an innocent group from pogroms',
      'They hold back a tyrannical force of oppression',
      'They keep monsters from infesting dark places',
      'They keep practical order on the streets',
      'They retain important magical arts'
    ],
    defenses: [
      'Crew of elite assassins',
      'Elaborate poisons',
      'Extremely hard to find',
      'Frame foes for crimes',
      'Hidden in fortified area',
      'Hostages or familial threats',
      'Innocent front group',
      'Many suborned commoners',
      'Mobs of burly street thugs',
      'Several corrupt officials',
      'Stolen magical relics',
      'Treacherous seducer'
    ]
  },
  familial: {
    title: 'familial clan',
    theme: {
      text: 'relations with their neighbors',
      types: [
        'Isolated, distrusted or disliked by most',
        'Creditor, with many owing them payment',
        'Scorned, derided for some deed or trait',
        'Respected, honored for some quality',
        'Newcomers, relatively new to the area',
        'Loners, not disliked but not close to any',
        'Feared, for past acts or present threats',
        'Revered, held in dread and awe by most',
        'Envied, resented by jealous neighbors',
        'Loved, widely adored by other families',
        'Needed, for a particular trait or person',
        'Hated, barely endured by their neighbors'
      ]
    },
    actors: {
      major: [
        { title: 'Adopted Member' },
        { title: 'Ambitious Scion' },
        { title: 'Black Sheep' },
        { title: 'Clan Duty Keeper' },
        { title: 'Disowned Rebel' },
        { title: 'Favored Child', youngAdult: true },
        { title: 'Oldest Elder', elderly: true },
        { title: 'Outsider Spouse', foreign: true },
        { title: 'Patriarch/Matriarch', veteran: true },
        { title: 'Reckless Innovator' },
        { title: 'Stern Traditionalist' },
        { title: 'Young Fosterling', youngAdult: true }
      ],
      minor: [
        { title: 'Acquainted Noble', veteran: true },
        { title: 'Blackmailer' },
        { title: 'Disowned Wastrel', youngAdult: true },
        { title: 'Family Guard' },
        { title: 'Family Priest' },
        { title: 'Gossipy Neighbor' },
        { title: 'House Servant' },
        { title: 'Moneylender' },
        { title: 'Old Retainer', elderly: true },
        { title: 'Secret Lover', youngAdult: true },
        { title: 'Tenant Farmer' },
        { title: 'Useful Tradesman' }
      ],
      power: [
        'They hold the deed to some critical family property',
        'They’re the heir to the chief bloodline of the clan',
        'They’re best at the skill or profession the clan practices',
        'They have considerable blackmail on their peers',
        'They have extensive contacts in other families',
        'They own great amounts of personal wealth',
        'They’re notoriously loyal and useful to the family',
        'They’re an intimate of the local ruler',
        'Everyone in the family loves them very much',
        'They have many capable, loyal children',
        'Their capacity for violence is fearsome to others',
        'They have access to secret magical items or powers'
      ]
    },
    conflicts: [
      'A family head is mistreating their kin',
      'A family is being denied its old rights',
      'A local is profiting from a dire crime',
      'A new faith is preaching to locals',
      'Dire want threatens family survival',
      'Locals struggle to own a new discovery',
      'Outsiders seek to buy village land',
      'Outsiders seek to control the group',
      'Someone might be using dark magic',
      'Someone wants to attack a rival group',
      'Tradition is demanding a sacrifice',
      'Vital resources are being depleted'
    ],
    consequences: [
      'A dark power will recruit the survivors',
      'A local noble will be angry at the loss',
      'A now-unchecked threat will grow',
      'A survivor will cut a deal with a sinister power',
      'An important trade link will collapse',
      'Kin-related villages will be furious',
      'Nearby communities will lack a vital export',
      'Revolutionaries will recruit the survivors',
      'Survivors will scatter and speak of the PCs',
      'The fury of a powerful home-town hero',
      'The survivors will turn to banditry'
    ],
    defenses: [
      'A guardian spirit or entity',
      'A mighty retired hero',
      'A mob of angry peasants',
      'A potent local sorcerer',
      'A relic of protection or power',
      'A resident noble and his guards',
      'A secret cult with potent magic',
      'A small garrison of outside troops',
      'Bandits who need the group',
      'Close alliances with neighbors',
      'So poor they can easily flee',
      'Trained guardian beasts'
    ]
  },
  religious: {
    title: '{religious order|local {temple|monastery}}',
    theme: {
      text: 'relations with the larger faith',
      types: [
        'Antiquated, caring only for things of a different time',
        'Austere, refraining from visible luxury or indulgence',
        'Careless, priests little interested in spiritual duties',
        'Confused, in the midst of some great change',
        'Distracted, the priests caring about a secular matter',
        'Laboring, hard-pressed by the needs of believers',
        'Mystical, full of somewhat incomprehensible priests',
        'Opulent, jeweled and golden in wild excess',
        'Rigid, uniform and disciplined in its clergy',
        'Tense, priests constantly ready to attack each other',
        'Unworldly, reluctant to get involved with secular things',
        'Vengeful, furious against the enemies or rivals'
      ]
    },
    actors: {
      major: [
        { title: 'Aged holy figure', elderly: true },
        { title: 'Eager reformer' },
        { title: 'High priest', veteran: true },
        { title: 'Keeper of the relics', adult: true },
        { title: 'Leader of a faithful group', adult: true },
        { title: 'Magically-gifted priest' },
        { title: 'Pious noble' },
        { title: 'Popular preacher', adult: true },
        { title: 'Propounder of a heresy' },
        { title: 'Temple guard chief', adult: true },
        { title: 'Temple treasurer' },
        { title: 'Zealous crime boss', veteran: true }
      ],
      minor: [
        { title: 'Devoted commoner' },
        { title: 'Dusty librarian' },
        { title: 'Foreign pilgrim' },
        { title: 'Grubby temple serf' },
        { title: 'Guilt-stricken local' },
        { title: 'Household priest' },
        { title: 'Instructor-priest' },
        { title: 'Naive monk' },
        { title: 'Relic vendor' },
        { title: 'Temple guardsman' },
        { title: 'Temple spy' },
        { title: 'Tithe collector' }
      ],
      power: [
        'A favorite of the local nobility or elite',
        'Beloved by the poor faithful of the religion',
        'Controls a vital relic of the faith',
        'Divine spouse or beloved of an important cleric',
        'Famously effective debater or apologist',
        'Has a sacred or important bloodline',
        'Has access to great wealth personally',
        'Has some useful or potent form of magic',
        'Has taught or brought up most local clergy',
        'Holds a vital position as a life-long post',
        'Knows a wealth of secrets and confessions',
        'Owns the temple building or land'
      ]
    },
    conflicts: [
      'A cleric seeking a pact with evil',
      'Accepting another temple’s authority',
      'Change of the temple’s political focus',
      'Control of a powerful, naive believer',
      'Enlisting an unsavory group of allies',
      'Major cleric pursuing a secret vice',
      'Obscure but vital theological dispute',
      'Overthrow of a troublesome local',
      'Performing a dangerous magic rite',
      'Quarrel over control of the treasury',
      'Selling a mighty relic or great treasure',
      'Silencing of a problematic priest'
    ],
    consequences: [
      'A curse will fall upon desecrators',
      'A dangerous cult will fill the void',
      'Government needs its support for legitimacy',
      'It will infuriate a foreign branch of the faith',
      "It's maintaining vital spiritual defenses",
      'It’s sealing away a terrible power',
      'Its destruction will incite a violent prophet',
      'Local believers will be riotous',
      'Only it knows how to perform a vital service',
      'The local poor rely on temple charity',
      'The local rulers will be outraged',
      'Will cause drastic celestial damage to local laws'
    ],
    defenses: [
      'Powerful priestly magic',
      'Animated idol',
      'Divine blessings on temple',
      'Many sturdy guardsmen',
      'Infuriated mob',
      'Noble patrons',
      'Sacred beast or summons',
      'Fortified temple',
      'Fanatical zealots',
      'Powerful defensive relics',
      'Wards against divine powers',
      'Dire curse on assailants'
    ]
  }
}

const leadership = [
  {
    label: 'autocratic',
    description: 'one person has largely unchallenged control over the court'
  },
  {
    label: 'figurehead',
    description: 'a public leader is actually controlled by one or more hidden figures'
  },
  {
    label: 'shared',
    description:
      'two or more figures share ultimate decision-making authority, either officially or de facto'
  },
  {
    label: 'consensus',
    description: 'the court makes decisions by consensus, with everyone needing to mostly-agree'
  },
  {
    label: 'democratic',
    description:
      'the court makes decisions by majority rule, either directly or through a leader who requires it'
  },
  {
    label: 'anarchic',
    description: 'authority is fragmented or currently unsettled, and no one is sure of their power'
  }
]

export const court__spawn = (loc: Province) => {
  const village = HUB.village(loc.hub)
  const type = window.dice.weightedChoice<keyof typeof court__sites>([
    { w: village ? 0 : 1, v: 'aristocratic' },
    { w: village ? 0 : 1, v: `mercantile` },
    { w: village ? 1 : 0, v: `familial` },
    { w: village ? 0 : 1, v: `criminal` },
    { w: village ? 0.1 : 1, v: `religious` }
  ])
  const court = court__sites[type]
  const actors = window.dice
    .sample(court.actors.major, 3)
    .concat(window.dice.sample(court.actors.minor, 3))
  const { local } = PROVINCE.cultures(loc)
  const culture = window.world.cultures[local.culture]
  const structure = window.dice.choice(leadership)
  const spawned: Court = {
    tag: 'court',
    idx: window.world.courts.length,
    name: LANGUAGE.word.unique({ lang: culture.language, key: 'court', len: 3 }),
    subtitle: `${window.dice.spin(court.title)} (${decorateText({
      label: structure.label,
      tooltip: structure.description,
      color: cssColors.subtitle
    })} court)`,
    theme: {
      label: court.theme.text,
      text: window.dice.choice(court.theme.types)
    },
    actors: actors.map(({ title, adult, youngAdult, elderly, veteran, foreign }) => {
      const npc = ACTOR.spawn({
        loc,
        profession: 'custom',
        foreign,
        age: youngAdult
          ? 'young adult'
          : elderly
          ? 'old'
          : adult
          ? window.dice.choice(['adult', 'middle age'])
          : veteran
          ? window.dice.choice(['old', 'middle age'])
          : undefined
      })
      npc.profession.title = title.toLowerCase()
      return npc.idx
    }),
    conflict: window.dice.choice(court.conflicts),
    defense: window.dice.choice(court.defenses),
    consequence: window.dice.choice(court.consequences)
  }
  window.world.courts.push(spawned)
  return spawned
}
