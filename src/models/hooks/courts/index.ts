import { PROVINCE } from '../../provinces'
import { Province } from '../../provinces/types'
import { TEXT } from '../../utilities/text'
import { CourtTemplate } from './types'

const courts: Record<string, CourtTemplate> = {
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
    locations: [
      {
        label: 'grand foyer',
        tooltip: 'opulent entrance, with marble floors and statues',
        explanation: 'welcomes guests with a display of wealth and power'
      },
      {
        label: 'gilded ballroom',
        tooltip: 'spectacular room, with crystal chandeliers and mirrors',
        explanation: 'hosts dances and social events for the elite'
      },
      {
        label: 'private study',
        tooltip: 'elegant study, with a mahogany desk and bookcases',
        explanation: 'a quiet place for contemplation and managing estates'
      },
      {
        label: "servant's quarters",
        tooltip: 'modest rooms, with bunks and communal facilities',
        explanation: 'houses the many servants required to maintain the estate'
      },
      {
        label: 'lavish banquet hall',
        tooltip: 'spacious hall, with gilded chairs and crystal chandeliers',
        explanation: 'hosts extravagant feasts and important social gatherings'
      },
      {
        label: 'ornate bedroom',
        tooltip: 'luxurious bedroom, with silk drapes and a canopy bed',
        explanation: "reflects the noble's status and comfort"
      },
      {
        label: 'expansive gardens',
        tooltip: 'manicured gardens, with fountains and rare flowers',
        explanation: 'demonstrates wealth through leisure and beauty'
      },
      {
        label: 'private chapel',
        tooltip: 'tranquil chapel, with stained glass and altars',
        explanation: 'serves the spiritual needs of the household'
      },
      {
        label: 'art gallery',
        tooltip: 'curated gallery, with masterpieces and sculptures',
        explanation: "showcases the family's taste and investment in the arts"
      },
      {
        label: 'armory room',
        tooltip: 'secure room, with weapons and armor displays',
        explanation: "stores the family's means of protection and symbol of power"
      },
      {
        label: 'treasure vault',
        tooltip: 'guarded vault, with coffers and precious artifacts',
        explanation: "holds the family's wealth and heirlooms"
      },
      {
        label: 'guest quarters',
        tooltip: 'inviting quarters, with fine linens and private baths',
        explanation: 'accommodates distinguished visitors in comfort'
      },
      {
        label: "master's suite",
        tooltip: 'luxurious quarters, with silk drapes and canopy bed',
        explanation: "provides opulent living space for the household's head"
      },
      {
        label: 'portrait hall',
        tooltip: 'grand hall, with ancestral portraits and tapestries',
        explanation: 'celebrates the lineage and achievements of the family'
      }
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
    locations: [
      {
        label: 'trading floor',
        tooltip: 'open space, with tables and charts',
        explanation: 'hub for buying and selling goods, central to merchant operations'
      },
      {
        label: 'vault room',
        tooltip: 'secure vault, with iron safes and locked cabinets',
        explanation: "safeguards the merchant's wealth and valuable trade documents"
      },
      {
        label: 'meeting room',
        tooltip: 'formal room, with a large table and charts',
        explanation: 'for negotiations and planning trade ventures'
      },
      {
        label: 'shipping office',
        tooltip: 'organized office, with maps and shipping logs',
        explanation: 'coordinates the logistics of sending and receiving goods'
      },
      {
        label: 'sample showroom',
        tooltip: 'display room, with product samples and catalogs',
        explanation: 'showcases goods for potential buyers and partners'
      },
      {
        label: 'private office',
        tooltip: 'quiet office, with a ledger and quill pen',
        explanation: 'personal workspace for the head merchant to manage affairs'
      },
      {
        label: 'warehouse',
        tooltip: 'large room, with crates and goods',
        explanation: 'stores merchandise for trade and sale'
      },
      {
        label: 'reception hall',
        tooltip: 'welcoming area, with seats and decor',
        explanation: 'greets clients and visitors upon entry'
      },
      {
        label: 'export dock',
        tooltip: 'busy platform, with boxes and shipments',
        explanation: 'where goods are prepared for export'
      },
      {
        label: 'commodities exchange',
        tooltip: 'lively exchange, with boards and traders shouting',
        explanation: 'where traders and brokers negotiate prices of goods'
      },
      {
        label: 'map room',
        tooltip: 'wall maps, with routes and markers',
        explanation: 'planning and strategizing trade routes'
      },
      {
        label: 'accounting office',
        tooltip: 'small room, with ledgers and quills',
        explanation: 'where finances are managed and recorded'
      }
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
    locations: [
      {
        label: 'gambling den',
        tooltip: 'covert den, with cards and dice games',
        explanation: 'a clandestine spot for gambling and laundering money'
      },
      {
        label: "smuggler's hideout",
        tooltip: 'concealed cave, with crates and contraband',
        explanation: 'used for storing smuggled goods before distribution'
      },
      {
        label: 'fighting pit',
        tooltip: 'underground pit, with bloodstains and bets',
        explanation: 'where illegal fights are held for entertainment and profit'
      },
      {
        label: "fence's shop",
        tooltip: 'cluttered shop, with hidden compartments',
        explanation: 'a front for buying and selling stolen goods'
      },
      {
        label: 'training yard',
        tooltip: 'enclosed yard, with dummies and obstacles',
        explanation: 'where recruits practice combat and stealth techniques'
      },
      {
        label: 'secret passage',
        tooltip: 'narrow passage, with a hidden door and torches',
        explanation: 'provides a covert escape route in case of raids'
      },
      {
        label: 'black market',
        tooltip: 'secret market, with illegal wares and haggling',
        explanation: 'for trading stolen goods and forbidden items'
      },
      {
        label: 'drug cultivation farm',
        tooltip: 'hidden farm, with illicit crops and drying sheds',
        explanation: 'grows and prepares illegal substances for distribution'
      },
      {
        label: 'poison cabinet',
        tooltip: 'locked cabinet, with vials and herbs',
        explanation: 'stores toxic substances for nefarious purposes'
      },
      {
        label: "leaders' council room",
        tooltip: 'secluded room, with a large map and daggers',
        explanation: "where the syndicate's leaders strategize and make decisions"
      }
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
    locations: [
      {
        label: 'communal kitchen',
        tooltip: 'warm kitchen, with a large hearth and benches',
        explanation: 'central to clan life for meal preparation and family gatherings'
      },
      {
        label: 'ancestral hall',
        tooltip: 'vast hall, with ancestral banners and long tables',
        explanation: 'displays lineage pride and hosts major clan events'
      },
      {
        label: 'shared dormitory',
        tooltip: 'large room, with rows of beds and personal chests',
        explanation: 'provides sleeping arrangements for the extended family'
      },
      {
        label: 'outdoor garden',
        tooltip: 'enclosed garden, with vegetables and herbs',
        explanation: "supplies fresh produce for the clan's kitchen"
      },
      {
        label: 'crafting workshop',
        tooltip: 'busy workshop, with tools and crafting stations',
        explanation: 'space for clan members to engage in traditional crafts'
      },
      {
        label: 'guest quarters',
        tooltip: 'cozy quarters, with basic amenities',
        explanation: 'provides hospitality to visitors and allies of the clan'
      },
      {
        label: 'storage cellar',
        tooltip: 'cool cellar, with shelves of preserved food',
        explanation: 'essential for storing harvested and prepared foodstuffs'
      },
      {
        label: "elder's council chamber",
        tooltip: 'serene chamber, with round table and tapestries',
        explanation: 'where the elders meet to discuss clan matters'
      },
      {
        label: 'training yard',
        tooltip: 'spacious yard, with weapons and targets',
        explanation: 'for practicing skills necessary for defense and hunting'
      },
      {
        label: 'library and archives',
        tooltip: 'quiet library, with scrolls and ledgers',
        explanation: 'contains the history and knowledge of the clan'
      },
      {
        label: 'spiritual shrine',
        tooltip: 'sacred space, with altars and family relics',
        explanation: 'for private worship and remembrance of ancestors'
      },
      {
        label: 'agricultural shed',
        tooltip: 'functional shed, with farming tools and seeds',
        explanation: 'stores tools and supplies for maintaining clan lands'
      }
    ]
  },
  religious: {
    title: '{religious order|local temple}',
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
    locations: [
      {
        label: 'sanctuary hall',
        tooltip: 'solemn hall, with altars and candles',
        explanation: 'the main area for worship and religious ceremonies'
      },
      {
        label: 'scriptorium',
        tooltip: 'quiet scriptorium, with desks and scrolls',
        explanation: 'where sacred texts are copied and studied'
      },
      {
        label: 'meditation chamber',
        tooltip: 'tranquil chamber, with mats and incense',
        explanation: 'a place for contemplation and spiritual meditation'
      },
      {
        label: 'herb garden',
        tooltip: 'peaceful garden, with healing herbs and plants',
        explanation: 'cultivates plants for medicinal and ritual purposes'
      },
      {
        label: 'relic room',
        tooltip: 'guarded room, with relics and holy symbols',
        explanation: 'stores sacred relics and artifacts of the faith'
      },
      {
        label: "pilgrims' lodge",
        tooltip: 'humble lodge, with beds and a communal table',
        explanation: 'provides accommodation for pilgrims visiting the site'
      },
      {
        label: 'confession booth',
        tooltip: 'small booth, with a screen and kneeler',
        explanation: 'a private space for confession and absolution'
      },
      {
        label: 'choir practice room',
        tooltip: 'echoing room, with music stands and benches',
        explanation: 'where the choir rehearses hymns and sacred music'
      },
      {
        label: 'library of theology',
        tooltip: 'vast library, with ancient texts and tomes',
        explanation: 'contains the theological writings and teachings of the faith'
      },
      {
        label: 'sacristy',
        tooltip: 'organized sacristy, with vestments and liturgical items',
        explanation: 'where sacred vessels and vestments are kept and prepared'
      },
      {
        label: 'ritual bath',
        tooltip: 'serene bath, with steps and purifying waters',
        explanation: 'used for ritual cleansing before ceremonies'
      },
      {
        label: "candlemaker's workshop",
        tooltip: 'scented workshop, with wax and molds',
        explanation: 'produces candles for rituals and illumination'
      }
    ]
  },
  knights: {
    title: '{knightly order|mercenary company}',
    theme: {
      text: 'purpose',
      types: [
        'Hunters of undead, outsiders, or other monsters',
        'Guardians of ancient boundaries',
        "Agents of the monarch's covert operations",
        'Seekers of fortune through elite mercenary deeds',
        "Bearers of an age-old hero's legacy",
        'Pursuers of potent magical artifacts and sources',
        'Arbiters of justice and adjudicators of crime',
        'Hunters of rogue mages and apostates',
        'Protectors of sacred relics and hallowed grounds',
        'Restorers of lost and forgotten territories',
        'Sentinels against ancient, malevolent forces',
        'Explorers of uncharted and mysterious lands'
      ]
    },
    actors: {
      major: [
        { title: 'Order Commander', veteran: true },
        { title: 'Knowledgeable Old Veteran', veteran: true },
        { title: 'Reckless Gloryhound' },
        { title: 'Cynical Quartermaster' },
        { title: 'Patron’s Spoiled Child', youngAdult: true },
        { title: 'Enemy Informant' },
        { title: 'Bone-weary Captain', veteran: true },
        { title: 'Chipper Medic' },
        { title: 'Dependable Veteran', veteran: true },
        { title: 'Cowardly Lieutenant', veteran: true },
        { title: 'Jovial Blacksmith' },
        { title: 'Greedy Priest' }
      ],
      minor: [
        { title: 'Eager Recruit', youngAdult: true },
        { title: 'Ambitious Servant' },
        { title: 'Fervent Devotee' },
        { title: 'Frustrated Liaison' },
        { title: 'Distressed Petitioner' },
        { title: 'Wealthy Donor' },
        { title: 'Busy Cook' },
        { title: 'Lazy Guard' },
        { title: 'Dutiful Soldier' },
        { title: 'Distracted Engineer' },
        { title: 'Worried Relative' }
      ]
    },
    conflicts: [
      'two leaders have differing interpretations of their creed',
      'a traitor is feeding information to the order’s enemies',
      'the order has been working constantly and is exhausted',
      'a rival order with similar goals is causing problems',
      'a significant patron is threatening to withdraw funding',
      'the local ruler is threatening to revoke the order’s charter',
      'the order is badly short on supplies and equipment',
      'a member has incurred large debts with dangerous folk',
      'troops restless from inaction are starting to get rowdy',
      'the order is preparing for a massive and imminent attack',
      'someone is romantically entangled with a rival of the order',
      'a local ruler wants a favor unrelated to the order’s charter',
      'an officer is pushing their troops too hard',
      'an influential religious sect has denounced the order',
      'newly discovered history has caused a crisis of purpose',
      'bandits have blocked access to or stolen vital supplies',
      'there’s growing support for a mutiny by disgruntled troops',
      'a recent battle had disastrous consequences on a village',
      'someone has embezzled from the order’s coffers',
      'a dangerous beast has attacked an order campsite',
      'the order’s commander is an incompetent figurehead',
      'the order has just discovered a major enemy base',
      'a recent tactical blunder has shattered unit cohesion',
      'helping a petitioner would be politically complicated'
    ],
    locations: [
      {
        label: 'armory hall',
        tooltip: 'fortified hall, with weapons and armor racks',
        explanation: "stores and maintains the order's armaments"
      },
      {
        label: 'training grounds',
        tooltip: 'spacious courtyard, with dummies and targets',
        explanation: 'for practicing combat skills and drills'
      },
      {
        label: 'war council room',
        tooltip: 'strategic room, with maps and planning tables',
        explanation: 'where leaders strategize and make battle plans'
      },
      {
        label: "knight's barracks",
        tooltip: 'sturdy barracks, with bunks and personal lockers',
        explanation: "provides living quarters for the order's knights"
      },
      {
        label: 'siege workshop',
        tooltip: 'busy workshop, with siege engines and tools',
        explanation: 'crafts and repairs catapults, battering rams, etc.'
      },
      {
        label: 'chapel of valor',
        tooltip: 'solemn chapel, with banners and altars',
        explanation: 'a place of worship and remembrance for fallen warriors'
      },
      {
        label: 'mess hall',
        tooltip: 'large hall, with long tables and benches',
        explanation: "serves as a dining area for the order's members"
      },
      {
        label: 'infirmary ward',
        tooltip: 'quiet ward, with beds and medicinal herbs',
        explanation: 'cares for the injured and sick members of the order'
      },
      {
        label: 'blacksmith forge',
        tooltip: 'fiery forge, with anvils and hammers',
        explanation: 'produces and repairs weapons and armor'
      },
      {
        label: 'watchtower',
        tooltip: 'high tower, with lookout points and signals',
        explanation: 'for surveillance and defense against attacks'
      },
      {
        label: 'mounted stables',
        tooltip: 'spacious stables, with horses and tack',
        explanation: "houses the order's horses for cavalry units"
      },
      {
        label: 'tactic library',
        tooltip: 'organized library, with strategy books and scrolls',
        explanation: 'contains historical and military knowledge'
      }
    ]
  }
}

const complications = [
  {
    label: 'nosy neighbor',
    tooltip: 'an inquisitive neighbor is always watching the place'
  },
  {
    label: 'vigilant guards',
    tooltip: 'the guards are unusually vigilant and attentive to their duties for some reason'
  },
  {
    label: 'secure locks',
    tooltip: 'the target’s living quarters are protected by high quality locks'
  },
  {
    label: 'beast guardian',
    tooltip: 'there’s a dangerous beast guarding the grounds of the place'
  },
  { label: 'fortified dwelling', tooltip: 'the dwelling is unusually well-fortified' },
  { label: 'crowded servants', tooltip: 'servants and minions are thick in the halls' },
  {
    label: 'magical ward',
    tooltip: 'the owner has access to some kind of magical ward or divine blessing'
  },
  {
    label: 'alert neighbor',
    tooltip:
      'the place is right next to a very vigilant and dangerous neighbor that will respond to alarms or disorders'
  },
  {
    label: 'confusing layout',
    tooltip: 'the interior is mazy, abnormal, or difficult to navigate for some reason'
  },
  {
    label: 'unsafe repairs',
    tooltip: 'poor repairs or recent damage makes the place dangerous to unknowing outsiders'
  },
  { label: 'hidden traps', tooltip: 'this dwelling has several traps or alarms' },
  {
    label: 'secret tunnels',
    tooltip: 'the dwelling connected to some kind of underground passages or ancient tunnels'
  },
  {
    label: 'betrayal poisoning',
    tooltip: 'an enemy is poisoning the mind of a friend against the pcs'
  },
  {
    label: 'intimidated locals',
    tooltip: 'locals are too intimidated by a local power figure to share information'
  },
  {
    label: 'bribe expectation',
    tooltip: 'locals expect bribes or favors in exchange for information'
  },
  {
    label: 'rife rumors',
    tooltip: 'the area is rife with conflicting and exaggerated rumors'
  },
  {
    label: 'superstitious silence',
    tooltip:
      'prevailing {superstitions|religious} beliefs prevent locals from discussing certain topics'
  }
]

export const COURT = {
  spawn: (loc: Province) => {
    const royal = window.dice.random > 0.6
    const hub = PROVINCE.hub(loc)
    const village = hub.population < 1e3
    // const coastal = loc.hub.coastal
    const type = royal
      ? 'aristocratic'
      : window.dice.weightedChoice<keyof typeof courts>([
          { w: village ? 0.1 : 1, v: 'aristocratic' },
          { w: village ? 0 : 1, v: `mercantile` },
          { w: village ? 1 : 0, v: `familial` },
          { w: village ? 0.1 : 1, v: `criminal` },
          { w: village ? 0 : 0.5, v: `knights` },
          { w: village ? 0.1 : 1, v: `religious` }
        ])
    const court = courts[type]
    const title =
      type === 'criminal' && village
        ? 'bandit clan'
        : type === 'religious' && village
        ? 'local monastery'
        : royal
        ? 'royal household'
        : window.dice.spin(court.title)
    return {
      subtitle: `${title} (${TEXT.decorate({
        label: 'court',
        tooltip: window.dice.choice(court.theme.types).toLowerCase()
      })})`,
      content: [
        { label: 'conflict', text: window.dice.choice(court.conflicts).toLowerCase() },
        {
          label: 'complications',
          text: window.dice
            .sample(complications, 2)
            .map(loc => TEXT.decorate({ label: loc.label, tooltip: window.dice.spin(loc.tooltip) }))
            .join(', ')
        },
        {
          label: 'locations',
          text: window.dice.sample(court.locations, 2).map(TEXT.decorate).join(', ')
        }
      ]
    }
  }
}
