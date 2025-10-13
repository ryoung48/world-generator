import { PROVINCE } from '../../provinces'
import { HUB } from '../../provinces/hubs'
import { WeightedDistribution } from '../../utilities/math/dice/types'
import { TEXT } from '../../utilities/text'
import { TRAIT } from '../../utilities/traits'
import { ActorSpawnParams, LifePhase } from '../types'
import { Profession, ProfessionDetails } from './types'

const nobleQuirks = {
  'corrupt governance': {
    tooltip: 'mismanages lands and neglects subjects'
  },
  'cultured education': {
    tooltip: 'fine arts, literature, music, history, etc'
  },
  'loyal household': {
    tooltip: 'well-treated servants would defend the household'
  },
  'bored easily': {
    tooltip: 'needs constant entertainment and excitement'
  },
  philanthropist: {
    tooltip: 'donates wealth to charitable causes or public works'
  },
  'peasant protector': {
    tooltip: 'has taken steps to improve the lives of peasants under their dominion'
  },
  'dishonored house': {
    tooltip: 'family name is stained by a past scandal or crime'
  },
  'relic keeper': {
    tooltip:
      'safeguards an ancient artifact, the importance and powers of which are widely speculated'
  }
}

const professions: Record<Profession, ProfessionDetails> = {
  custom: { strata: 'middle', lifestyle: 'modest' },
  // tribal
  shaman: {
    strata: 'middle',
    lifestyle: 'modest',
    unique: true,
    age: 'veteran',
    culture: 'tribal',
    quirks: {
      'spirit-touched': {
        tooltip: 'bears visible marks or scars from otherworldly encounters'
      },
      'dream walker': {
        tooltip: 'receives visions and prophecies through sacred dreams'
      },
      'bone reader': {
        tooltip: 'divines the future by casting carved bones or stones'
      },
      'plague bearer': {
        tooltip: 'secretly spreading disease while claiming to heal it'
      },
      'ancestral voices': {
        tooltip: 'constantly hearing whispers from deceased tribal members'
      },
      'ritual scarred': {
        tooltip: 'body covered in ceremonial cuts marking spiritual milestones'
      },
      'forbidden knowledge': {
        tooltip: 'guards dangerous secrets that could doom the tribe if revealed'
      },
      'plant whisperer': {
        tooltip: 'can coax healing properties from the most unlikely vegetation'
      },
      'madness touched': {
        tooltip: 'spiritual power comes at the cost of occasional mental instability'
      },
      'death speaker': {
        tooltip: 'can commune with the recently deceased to learn their final thoughts'
      },
      'weather caller': {
        tooltip: 'performs elaborate rituals to influence storms and seasons'
      },
      'soul seer': {
        tooltip: 'can perceive the spiritual health and hidden nature of others'
      },
      'cursed healer': {
        tooltip: 'every life saved demands a terrible personal sacrifice'
      },
      'spirit bound': {
        tooltip: 'made a pact with otherworldly entities that now control their fate'
      },
      'false prophet': {
        tooltip: 'fabricates visions to maintain power and influence over tribe'
      },
      'pain eater': {
        tooltip: 'absorbs others suffering into themselves during healing rituals'
      },
      'smoke reader': {
        tooltip: 'interprets omens and messages in the patterns of sacred fires'
      },
      'reluctant oracle': {
        tooltip: 'desperately wishes to be free of their prophetic burden'
      }
    }
  },
  'tribal elder': {
    strata: 'middle',
    lifestyle: 'modest',
    age: 'master',
    culture: 'tribal',
    quirks: {
      'memory keeper': {
        tooltip: 'living repository of tribal history, laws, and ancient wisdom'
      },
      'failing faculties': {
        tooltip: 'mind or body deteriorating, making leadership increasingly difficult'
      },
      'hidden weakness': {
        tooltip: 'conceals serious illness or disability to maintain authority'
      },
      'puppet master': {
        tooltip: 'manipulates tribal politics from behind the scenes'
      },
      'progressive vision': {
        tooltip: 'advocates for controversial changes to traditional ways'
      },
      'bitter rival': {
        tooltip: 'locked in longstanding feud with another elder over tribal direction'
      },
      'wise counsel': {
        tooltip: 'sought after for thoughtful advice on complex problems'
      },
      'secret shame': {
        tooltip: 'hiding past actions that would destroy their reputation if revealed'
      },
      'chosen successor': {
        tooltip: 'grooming a specific individual to inherit their position and knowledge'
      },
      'old warrior': {
        tooltip: 'earned respect through past battlefield heroics before gaining wisdom'
      },
      'mystic dreamer': {
        tooltip: 'receives prophetic visions that guide tribal decision-making'
      },
      'tradition keeper': {
        tooltip: 'fiercely opposes any deviation from ancestral customs'
      },
      'diplomatic bridge': {
        tooltip: 'maintains crucial relationships with neighboring tribes and settlements'
      },
      'crafty schemer': {
        tooltip: 'uses cunning and patience to advance long-term tribal interests'
      },
      'beloved mentor': {
        tooltip: 'has trained many successful hunters, warriors, and leaders'
      },
      'lonely burden': {
        tooltip: 'isolated by the weight of difficult decisions only they can make'
      },
      'ancient enemy': {
        tooltip: 'harbors grudges from conflicts that predate current tribal members'
      },
      'failing legacy': {
        tooltip: 'watches helplessly as their life work crumbles around them'
      }
    }
  },
  'tribal warrior': {
    strata: 'lower',
    lifestyle: 'modest',
    martial: true,
    culture: 'tribal',
    quirks: {
      'beast bonded': {
        tooltip: 'fights alongside a fierce animal companion in battle'
      },
      'trophy collector': {
        tooltip: 'adorns themselves with tokens taken from fallen enemies'
      },
      'honor bound': {
        tooltip: 'rigidly follows ancient codes of combat and conduct'
      },
      'battle scarred': {
        tooltip: 'body tells the story of countless fights through old wounds'
      },
      bloodthirsty: {
        tooltip: 'craves violence and becomes restless during peaceful times'
      },
      'weapon blessed': {
        tooltip: 'carries arms that have been ritually consecrated by tribal shamans'
      },
      'death wish': {
        tooltip: 'seeks glorious death in battle to join ancestors in warrior paradise'
      },
      'young hothead': {
        tooltip: 'eager to prove themselves through reckless acts of bravery'
      },
      'veteran bitter': {
        tooltip: 'disillusioned by war, questions the value of endless conflict'
      },
      'clan betrayer': {
        tooltip: 'secretly feeds information to enemies while maintaining loyal facade'
      },
      'spirit warrior': {
        tooltip: 'enters trance-like state during combat, becoming nearly unstoppable'
      },
      'coward hiding': {
        tooltip: 'desperately conceals their fear behind aggressive bravado'
      },
      'gentle giant': {
        tooltip: 'massive and intimidating but prefers peaceful solutions to problems'
      },
      'silent stalker': {
        tooltip: 'excels at moving unseen and striking from unexpected angles'
      },
      'ritual fighter': {
        tooltip: 'must perform elaborate ceremonies before engaging in combat'
      },
      'wounded pride': {
        tooltip: 'nursing shame from a past defeat that haunts their reputation'
      },
      'weapon master': {
        tooltip: 'has achieved legendary skill with their chosen armament'
      },
      'pack leader': {
        tooltip: 'natural commander who inspires fierce loyalty in fellow warriors'
      }
    }
  },
  'tribal artisan': {
    title: 'artisan ({textiles|leather|woodcarver|culinary|pottery})',
    strata: 'lower',
    lifestyle: 'modest',
    culture: 'tribal',
    quirks: {
      'master crafter': {
        tooltip: 'creates items of exceptional beauty and functionality'
      },
      'secret technique': {
        tooltip: 'guards closely held methods passed down through generations'
      },
      'blessed hands': {
        tooltip: 'work seems touched by divine inspiration or supernatural skill'
      },
      'perfectionist obsession': {
        tooltip: 'destroys flawed work rather than let inferior craftsmanship stand'
      },
      'artistic temperament': {
        tooltip: 'moody and unpredictable, especially when creative vision is questioned'
      },
      'tool bonded': {
        tooltip: 'forms deep spiritual connection with their crafting implements'
      },
      'trade secrets': {
        tooltip: 'knows valuable techniques that outsiders would pay dearly to learn'
      },
      'humble origins': {
        tooltip: 'rose from poverty through exceptional skill and determination'
      },
      'rival artisan': {
        tooltip: 'locked in bitter competition with another crafter of similar skill'
      },
      'teaching burden': {
        tooltip: 'reluctantly trains apprentices who may never match their ability'
      },
      'lost inspiration': {
        tooltip: 'struggling with creative block that threatens their reputation'
      },
      'material hoarder': {
        tooltip: 'compulsively collects rare substances and components for future projects'
      },
      'ceremonial role': {
        tooltip: 'creates sacred objects essential for tribal rituals and ceremonies'
      },
      'innovative vision': {
        tooltip: 'constantly experimenting with new methods that others find disturbing'
      },
      'family tradition': {
        tooltip: 'continues craft practiced by ancestors for countless generations'
      },
      'cursed gift': {
        tooltip: 'exceptional skill comes with supernatural price or burden'
      },
      'broken dreams': {
        tooltip: 'never achieved their true artistic ambitions, settling for mundane work'
      },
      'patron dependent': {
        tooltip: 'relies on wealthy sponsor who may withdraw support at any time'
      }
    }
  },
  hunter: {
    strata: 'lower',
    lifestyle: 'poor',
    martial: true,
    culture: 'tribal',
    quirks: {
      'beast speaker': {
        tooltip: 'understands animal behavior with uncanny accuracy'
      },
      'silent stalker': {
        tooltip: 'moves through wilderness without leaving trace or sound'
      },
      'trophy taker': {
        tooltip: 'collects parts from each kill as proof of hunting prowess'
      },
      'pack leader': {
        tooltip: 'leads hunting parties with natural authority and tactical skill'
      },
      'cursed quarry': {
        tooltip: 'obsessed with hunting a specific creature that always escapes'
      },
      'meat provider': {
        tooltip: 'shoulders responsibility for feeding extended family or community'
      },
      'poacher risk': {
        tooltip: 'hunts in forbidden territories, risking severe punishment if caught'
      },
      'weather reader': {
        tooltip: 'predicts storms and seasonal changes by observing natural signs'
      },
      'tracker legend': {
        tooltip: 'can follow trails others cannot even see, across any terrain'
      },
      'survivor guilt': {
        tooltip: 'haunted by hunting accident that killed companion or innocent'
      },
      'ancient rivalry': {
        tooltip: 'competing with another hunter for prime hunting grounds or reputation'
      },
      'spirit hunted': {
        tooltip: 'believes supernatural forces are tracking them as revenge for kills'
      },
      'technique hoarder': {
        tooltip: 'jealously guards hunting methods learned through painful experience'
      },
      'compassionate killer': {
        tooltip: 'takes no joy in death but accepts necessity of providing food'
      },
      'wasteland wanderer': {
        tooltip: 'hunts in dangerous territories others fear to enter'
      },
      'lucky charm': {
        tooltip: 'relies on ritual objects or behaviors to ensure successful hunts'
      }
    }
  },
  forager: {
    strata: 'lower',
    lifestyle: 'poor',
    culture: 'tribal',
    quirks: {
      'plant whisperer': {
        tooltip: 'identifies edible and medicinal vegetation with supernatural accuracy'
      },
      'poison immunity': {
        tooltip: 'built resistance to toxins through careful exposure over years'
      },
      'seasonal nomad': {
        tooltip: 'follows predictable migration pattern based on plant growth cycles'
      },
      'hidden caches': {
        tooltip: 'maintains secret stores of preserved food throughout territory'
      },
      'medicine maker': {
        tooltip: 'crafts healing remedies from gathered herbs and natural materials'
      },
      'desperate hunger': {
        tooltip: 'constantly driven by fear of starvation to gather compulsively'
      },
      'territorial guardian': {
        tooltip: 'fiercely protects prime gathering areas from competitors'
      },
      'weather dependent': {
        tooltip: 'livelihood entirely at mercy of seasonal conditions and climate'
      },
      'knowledge keeper': {
        tooltip: 'remembers locations and properties of hundreds of different plants'
      },
      'basket weaver': {
        tooltip: 'creates containers and tools from gathered materials with great skill'
      },
      'trade network': {
        tooltip: 'exchanges rare finds with others for goods impossible to forage'
      },
      'solitary wanderer': {
        tooltip: 'prefers isolation of wilderness to company of other people'
      },
      'sacred harvest': {
        tooltip: 'performs rituals before gathering to appease plant spirits'
      },
      'failing eyesight': {
        tooltip: 'vision problems make identification of plants increasingly difficult'
      },
      'generous provider': {
        tooltip: 'shares gathered food with anyone in need despite personal scarcity'
      },
      'cautious taster': {
        tooltip: 'tests unknown plants on themselves before declaring them safe'
      },
      'memory palace': {
        tooltip: 'maintains detailed mental map of resource locations across vast areas'
      },
      'pest follower': {
        tooltip: 'tracks animal migrations to find seeds and fruits they leave behind'
      }
    }
  },
  herdsman: {
    strata: 'lower',
    lifestyle: 'poor',
    culture: 'tribal',
    quirks: {
      'beast bonded': {
        tooltip: 'forms deep emotional connections with individual animals in herd'
      },
      'weather prophet': {
        tooltip: 'predicts storms by observing animal behavior patterns'
      },
      'predator hunter': {
        tooltip: 'tracks and kills creatures that threaten the herd'
      },
      'nomadic soul': {
        tooltip: 'finds peace only when moving with animals across open lands'
      },
      'breeding expert': {
        tooltip: 'selects animal pairings to improve herd quality over generations'
      },
      'milk provider': {
        tooltip: 'supplies dairy products essential to community nutrition'
      },
      'territorial disputes': {
        tooltip: 'conflicts with other herders over grazing rights and water access'
      },
      'lost inheritance': {
        tooltip: 'family herd was stolen, destroyed, or lost through misfortune'
      },
      'beast healer': {
        tooltip: 'treats sick and injured animals with traditional remedies'
      },
      'counting obsession': {
        tooltip: 'constantly tallies animals, panicking when numbers dont match'
      },
      'solitude seeker': {
        tooltip: 'prefers company of animals to dealing with human complications'
      },
      'drought survivor': {
        tooltip: 'led herd through devastating dry seasons that killed other livestock'
      },
      'wolf friend': {
        tooltip: 'maintains uneasy alliance with wild predators through offerings'
      },
      'seasonal sadness': {
        tooltip: 'becomes melancholy when forced to slaughter animals for food'
      },
      'stubborn pride': {
        tooltip: 'refuses help even when herd faces serious threats or disease'
      },
      'purebred stock': {
        tooltip: 'maintains pure breeding lines descended from legendary animals'
      },
      'stolen legacy': {
        tooltip: 'tends animals that rightfully belong to someone else'
      },
      'protective instinct': {
        tooltip: 'will risk life defending animals from any perceived threat'
      }
    }
  },
  'foreigner (merchant)': {
    title: 'merchant',
    strata: 'middle',
    age: 'veteran',
    unique: true,
    culture: 'foreign',
    lifestyle: 'comfortable',
    quirks: {
      'exotic goods': {
        tooltip: 'trades in rare items unavailable from local sources'
      },
      'language collector': {
        tooltip: 'speaks multiple tongues with varying degrees of fluency'
      },
      'cultural bridge': {
        tooltip: 'helps locals understand foreign customs and perspectives'
      },
      'homeland exile': {
        tooltip: 'cannot return home due to crime, debt, or political persecution'
      },
      'trade secrets': {
        tooltip: 'guards knowledge of profitable routes and supplier connections'
      },
      'debt burden': {
        tooltip: 'owes significant money to dangerous creditors in distant lands'
      },
      'diplomatic immunity': {
        tooltip: 'protected by treaties between their homeland and current location'
      },
      'cultural confusion': {
        tooltip: 'frequently misunderstands local customs, causing awkward situations'
      },
      'price gouger': {
        tooltip: 'exploits local ignorance of foreign goods to charge excessive rates'
      },
      'homesick wanderer': {
        tooltip: 'desperately misses homeland but cannot afford return journey'
      },
      'spy network': {
        tooltip: 'gathers intelligence for foreign government while conducting trade'
      },
      'marriage prospect': {
        tooltip: 'seeks local spouse to establish permanent business connections'
      },
      'reputation builder': {
        tooltip: 'trying to establish trustworthy name in new market'
      },
      'caravan master': {
        tooltip: 'leads large trading expeditions across dangerous territories'
      },
      'currency expert': {
        tooltip: 'skilled at evaluating and exchanging different monetary systems'
      },
      'legal troubles': {
        tooltip: 'navigating complex foreign laws that threaten business operations'
      },
      'family pressure': {
        tooltip: 'expected to maintain trading dynasty established by ancestors'
      },
      'cultural superiority': {
        tooltip: 'believes their homeland civilization is superior to local customs'
      }
    }
  },
  // lower class
  peasant: {
    strata: 'lower',
    lifestyle: 'poor',
    quirks: {
      'seed hoarder': {
        tooltip: 'zealously gathers and saves seeds due to past crop failures'
      },
      traditionalist: {
        tooltip: 'stubbornly sticks to traditional farming techniques'
      }
    }
  },
  laborer: {
    strata: 'lower',
    lifestyle: 'poor',
    quirks: {
      streetwise: {
        tooltip: 'knows how to survive on the streets'
      },
      adaptable: {
        tooltip: 'well-equipped to switch jobs when opportunities arise'
      }
    }
  },
  beggar: {
    strata: 'lower',
    lifestyle: 'poor',
    quirks: {
      'pretends disability': {
        tooltip: 'feigns {injury|sickness} to gain sympathy'
      },
      'riches to rags': {
        tooltip: 'former {merchant|gentry|high-born} fallen on hard times'
      },
      'elderly outcast': {
        tooltip: 'cast out in old age to die on the streets',
        constraints: { elderly: true }
      },
      'bitter cynic': {
        tooltip: "cruel life has made them spiteful of others' fortune"
      },
      'secret informant': {
        tooltip: 'trades secrets gleaned on the streets for coin'
      },
      'proud pauper': {
        tooltip: 'despite need, holds head high and insists on dignity'
      },
      pickpocket: {
        tooltip: 'steals from those kind or cruel enough to give'
      },
      'generational beggar': {
        tooltip: 'comes from a long line of beggars'
      },
      protector: {
        tooltip: 'keep others safe from thieves and predators'
      },
      entertainer: {
        tooltip: 'uses songs, tricks, or stories to earn income'
      },
      'forsaken parent': {
        tooltip: 'begs to secretly provide for abandoned child'
      },
      'unexpected sage': {
        tooltip: 'their experiences gave unique insights'
      }
    }
  },
  criminal: {
    strata: 'lower',
    lifestyle: 'poor',
    martial: true,
    quirks: {
      'hidden identity': {
        tooltip: 'conceals true self behind alias or disguise'
      },
      'former lawman': {
        tooltip: 'was once on the side of justice before switching sides'
      },
      'wanted fugitive': {
        tooltip: 'pursued by authorities, an outlaw seeking redemption or revenge'
      },
      vigilante: {
        tooltip: 'covertly uses criminal skills to help the exploited'
      },
      'troubled past': {
        tooltip: 'early trauma shaped their path'
      },
      haunted: {
        tooltip: 'crimes weigh heavily on their conscience at times'
      },
      'thrill seeker': {
        tooltip: 'loves danger, living on the edge'
      },
      'master of disguise': {
        tooltip: 'able to blend seamlessly into any crowd or role'
      },
      'safe cracker': {
        tooltip: 'can crack even the most intricate locks with finesse'
      },
      'hired blade': {
        tooltip: 'skilled in both swordplay and intimidation, an enforcer for hire'
      },
      'underground healer': {
        tooltip: 'provides medical aid discreetly to wounded criminals'
      },
      'escape artist': {
        tooltip: 'escapes from bonds and restraints, always one step ahead'
      },
      'uncanny luck': {
        tooltip: 'fortuitous outcomes in dangerous situations, against the odds'
      },
      'street code': {
        tooltip: 'lives by an unwritten set of rules, honor among thieves'
      },
      'midnight prowler': {
        tooltip: 'shadows are their ally, moving silently through the night'
      },
      'parkour expert': {
        tooltip: 'leaps and climbs with unparalleled agility to escape pursuit'
      },
      'reliable fence': {
        tooltip: 'finds lucrative buyers for stolen goods, securing high profits'
      },
      pickpocket: {
        tooltip: 'swiftly relieves unsuspecting victims of their valuables'
      },
      streetwise: {
        tooltip: 'knowledgeable about the history and workings of criminal organizations'
      },
      'silver-tongued': {
        tooltip: 'persuasive wordsmith, skilled at manipulation and deception'
      }
    }
  },
  servant: {
    title: 'servant',
    lifestyle: 'poor',
    strata: 'lower',
    quirks: {
      saboteur: {
        tooltip: 'secretly sabotages unfair masters'
      },
      'generational servant': {
        tooltip: 'comes from a long line serving one family'
      },
      'painfully proper': {
        tooltip: 'excessively formal and strictly follows etiquette'
      },
      'secretly resents masters': {
        tooltip: 'outwardly obedient, inwardly plotting against them'
      },
      'light-fingered': {
        tooltip: "can't resist taking small trinkets from the household"
      },
      'slave branded': {
        tooltip: 'bears brand or collar marking them as property, not person'
      },
      'charming sycophant': {
        tooltip: 'skilled at flattering masters'
      },
      'work weary': {
        tooltip: 'physically and emotionally drained by grueling duties'
      },
      'sees the real them': {
        tooltip: "privately aware of masters' flaws and vulnerabilities"
      },
      'starry-eyed dreamer': {
        tooltip: 'romanticizes privileged life of those they serve'
      },
      'haughty superiority': {
        tooltip: 'believes their polish makes them above other servants'
      },
      'hopeless romantic': {
        tooltip: 'secretly infatuated with someone above their station'
      },
      'patient observer': {
        tooltip: "quietly learns by watching the house's inner workings"
      },
      'wry wit': {
        tooltip: 'masters underestimate their cleverness and perception'
      },
      'fiercely loyal': {
        tooltip: 'deeply devoted to serving the family loyally'
      },
      'second life': {
        tooltip: 'serving gives {refuge from a dark former life|meaning after tragic personal loss}'
      },
      'eager learner': {
        tooltip: 'takes advantage of access to knowledge and culture'
      },
      'secret culpability': {
        tooltip: "privately played a role in master's misfortune"
      },
      'almost one of the family': {
        tooltip: 'masters depend deeply on and confide in them'
      },
      'silent butler': {
        tooltip: 'moves with such grace and quietude that they become almost invisible'
      },
      'gourmet chef': {
        tooltip: 'creates delectable dishes that delight the palate'
      },
      'gentle healer': {
        tooltip: 'skilled at tending to minor ailments and injuries'
      },
      'meticulous cleaner': {
        tooltip: 'leaves no speck of dust, creating an immaculate environment'
      },
      'multilingual interpreter': {
        tooltip: 'fluent in various languages, facilitating communication'
      },
      'hesitant truths': {
        tooltip: 'struggles to be fully honest with their master, fearing repercussions'
      },
      'trapped servitude': {
        tooltip: 'forced to serve against their will, seeking a way out'
      }
    }
  },
  'master servant': {
    strata: 'lower',
    lifestyle: 'modest',
    age: 'veteran',
    quirks: {
      'silent steps': {
        tooltip:
          'the servant moves so quietly, they often startle people by their sudden appearance'
      },
      'eternal vigilance': {
        tooltip:
          'the servant is always alert, sleeping with one eye open and constantly surveying the surroundings'
      },
      'ancient lineage': {
        tooltip: 'descended from a long line of servants, their family holds many secrets'
      },
      'dual lives': {
        tooltip:
          "maintains a separate identity outside the master's residence, which may sometimes clash"
      },
      "master's shadow": {
        tooltip: "can mimic the master's handwriting and voice perfectly, often acting as a decoy"
      },
      'keeper of secrets': {
        tooltip:
          'knows all the secrets of the house and its residents, making them a potential source of crucial information'
      },
      'coded messages': {
        tooltip: 'uses a secret language or codes to communicate covertly with other servants'
      },
      'unseen network': {
        tooltip:
          'part of an expansive servant network, can call upon this collective for help or information'
      },
      'unwavering loyalty': {
        tooltip:
          'exceptionally loyal, may take actions that are dangerous or immoral to serve the master'
      },
      "a servant's duty": {
        tooltip: 'feels compelled to perform their tasks perfectly, causing strain under pressure'
      },
      'chronic forgetfulness': {
        tooltip: 'frequently forgets minor things, which may result in unforeseen complications'
      },
      "servant's pride": {
        tooltip:
          'takes excessive pride in their work, may feel insulted if their role is undervalued'
      },
      'shadowy contacts': {
        tooltip: 'has connections in the criminal underworld that could be useful or dangerous'
      },
      "master's guilt": {
        tooltip:
          'knows of a terrible deed committed by the master and struggles with their complicity'
      },
      'unbreakable bond': {
        tooltip:
          'shares a deep emotional bond with a fellow servant, providing strength and potential weakness'
      },
      'uncanny intuition': {
        tooltip: "often predicts events or people's actions with eerie accuracy"
      },
      'mysterious past': {
        tooltip: 'hides a murky past that may come back to haunt them'
      },
      "master's favorite": {
        tooltip: 'favored by the master, attracts envy and intrigue among other servants'
      },
      'debt of honor': {
        tooltip: 'owes a life-debt to the master or their family'
      },
      'puppet master': {
        tooltip: 'secretly manipulates the master, pulling strings from the shadows'
      },
      'shadow diplomat': {
        tooltip: 'engages in clandestine negotiations on behalf of their master'
      }
    }
  },
  sailor: {
    title: () =>
      TEXT.decorate({
        label: 'sailor',
        tooltip: window.dice.spin('{deckhand|deckhand|deckhand|{cannoneer|navigator|helmsman}}')
      }),
    strata: 'lower',
    lifestyle: 'poor',
    constraints: { coastal: true },
    quirks: {
      inked: {
        tooltip: 'covered in elaborate nautical tattoos'
      },
      adrift: {
        tooltip: 'has no true home port'
      },
      weathered: {
        tooltip: 'face is browned, wrinkled and worn from years at sea',
        constraints: { skin: true }
      },
      'salt tongue': {
        tooltip: "speaks in dense, nautical jargon that's often hard to understand"
      },
      'knot master': {
        tooltip: 'unusually adept at tying various kinds of knots; useful in a pinch'
      },
      'rum aficionado': {
        tooltip: 'has a vast knowledge of rum; potential for booze-related missions'
      },
      'shell collector': {
        tooltip: 'collects rare sea shells which might have magical properties'
      },
      'shanty maestro': {
        tooltip: 'has a rich repertoire of sea shanties; could uplift morale or unveil old tales'
      },
      'kraken survivor': {
        tooltip: "survived a kraken attack, carrying knowledge of the beast's weakness"
      },
      'coral artist': {
        tooltip: 'makes intricate art from coral, attracting collectors and thieves alike'
      },
      'port rat': {
        tooltip: 'knows every port and its secrets, gaining unique insights or dangerous enemies'
      }
    }
  },
  'dock worker': {
    strata: 'lower',
    lifestyle: 'poor',
    constraints: { coastal: true },
    quirks: {
      'cargo examiner': {
        tooltip: 'can tell the contents of sealed crates by touch, smell, or shake'
      },
      "shipwright's assistant": {
        tooltip: 'knows the ins and outs of shipbuilding, could lead to hidden ship compartments'
      },
      "smuggler's eye": {
        tooltip: 'can spot signs of smuggling, leading to hidden contraband or shady dealings'
      },
      'dockyard bully': {
        tooltip: 'has a reputation for toughness, can cause altercations or deter trouble'
      },
      'fish vendor': {
        tooltip: 'knows the local fish market, which could lead to exotic marine goods'
      },
      'ship schedule': {
        tooltip:
          'knows the schedule of all ships, opening opportunities for legal or illegal activities'
      },
      'dockyard lore': {
        tooltip: 'knows tales and legends of the dock, which may contain clues or warnings'
      },
      'pier walker': {
        tooltip: 'knows the best and worst places on the docks, offering shortcuts or danger zones'
      },
      'contraband stash': {
        tooltip: 'knows hidden places to stash goods, leading to hidden treasures or secrets'
      },
      "loner's lunch": {
        tooltip: 'eats lunch in seclusion, hinting at a secret spot or peaceful sanctuary'
      },
      'salty tongue': {
        tooltip: 'speaks using dockyard slang, confusing outsiders but fitting in with locals'
      },
      "harbormaster's favour": {
        tooltip: 'in good terms with the harbormaster, could gain favors or insider information'
      },
      'driftwood carver': {
        tooltip:
          'carves intricate figures from driftwood, could hold messages or be sold for profit'
      },
      "mariner's debt": {
        tooltip: 'owes a debt to a sailor, could lead to forced labor or repayment quests'
      },
      'cargo marker': {
        tooltip: 'understands the markings on cargo, which can reveal their origin or content'
      },
      'unloading accident': {
        tooltip: 'survived a dangerous unloading accident, carrying a reminder of the close call'
      },
      'water rat': {
        tooltip: 'excellent swimmer, can retrieve fallen items or survive if pushed into water'
      },
      'ex-sailor': {
        tooltip: 'used to be a sailor and often reminisces about the sea'
      },
      smuggler: {
        tooltip: 'secretly helps smuggle illegal goods off ships'
      },
      'flotsam collector': {
        tooltip: 'collects drift items, leading to unexpected finds or valuable salvage'
      }
    }
  },
  artist: {
    strata: 'lower',
    lifestyle: 'poor',
    quirks: {
      'midnight inspiration': {
        tooltip: 'creative surges often hit in the dead of night'
      },
      'connoisseur of wine': {
        tooltip: 'believes wine aids the creative process'
      },
      'haunted past': {
        tooltip: 'some past event irrevocably shaped their art'
      },
      perfectionist: {
        tooltip: 'never satisfied, constantly adjusting and correcting their work'
      },
      "nature's muse": {
        tooltip: 'creations often feature scenes of natural beauty'
      },
      'charcoal lover': {
        tooltip: 'prefers sketching with charcoal above all other mediums'
      },
      'portrait specialist': {
        tooltip: 'known for capturing the essence of a person in their portraits'
      },
      'mentoring spirit': {
        tooltip: 'loves to teach and pass on knowledge to others'
      },
      'monochrome maestro': {
        tooltip: 'creates stunning art using only shades of one color'
      },
      'avid traveler': {
        tooltip: 'frequently on the move, seeking new inspiration'
      },
      'poor time management': {
        tooltip: 'loses track of time when engrossed in work'
      },
      'never without a sketchbook': {
        tooltip: 'always carries a sketchbook to capture ideas'
      },
      'gift giver': {
        tooltip: 'often gifts their artwork to those who inspire them'
      },
      'ink-stained hands': {
        tooltip: 'constantly has stained hands from working with inks'
      },
      muralist: {
        tooltip: 'specializes in large-scale mural projects'
      },
      secretive: {
        tooltip: "protective of work-in-progress, won't share before ready"
      },
      'non-traditionalist': {
        tooltip: 'rebels against established artistic conventions'
      },
      'history buff': {
        tooltip: 'deeply studies past masters and movements'
      },
      'art critic': {
        tooltip: 'frequently critiques the work of others'
      },
      'jealous of talent': {
        tooltip: 'resents those with more artistic skill'
      },
      'quick artist': {
        tooltip: 'works with incredible speed once inspired'
      },
      'technique hoarder': {
        tooltip: "secretive of special methods, won't share tricks"
      }
    }
  },
  poet: {
    strata: 'lower',
    lifestyle: 'poor',
    quirks: {
      wordsmith: {
        tooltip: 'has an exceptional talent for crafting words and phrases'
      },
      'tongue-tied': {
        tooltip: 'struggles to speak eloquently in normal conversation'
      },
      'rhyme obsessed': {
        tooltip: 'compulsively uses rhymes and poetic devices, even when unnecessary'
      },
      'stage shy': {
        tooltip: 'too nervous to recite works in front of others',
        constraints: { gregarious: false }
      },
      'deaf to criticism': {
        tooltip: 'rejects any critique or feedback from others'
      },
      'jealous of peers': {
        tooltip: 'envious of the talents and successes of other wordsmiths'
      },
      'easily distracted': {
        tooltip: 'has difficulty concentrating on writing, fluttering between ideas'
      },
      'loves the spotlight': {
        tooltip: 'energized by performing works for others',
        constraints: { enigmatic: false }
      },
      'reclusive writer': {
        tooltip: 'prefers to write in isolation away from distraction'
      },
      'experimental verse': {
        tooltip: 'seeks new styles and techniques, shunning poetic conventions'
      },
      'meticulous editor': {
        tooltip: 'obsessively revises and perfects every word and comma'
      },
      'quick writer': {
        tooltip: 'swiftly composes complete poems when inspired'
      },
      forgetful: {
        tooltip: 'frequently loses track of new ideas and inspirations'
      },
      'haunted past': {
        tooltip: 'some past event irrevocably shaped their poetry'
      },
      'regional expert': {
        tooltip: 'extremely knowledgeable about poetic forms from a specific place'
      },
      'lyrical philosopher': {
        tooltip: 'infuses works with deep meaning and profound themes'
      },
      'razor-witted': {
        tooltip: 'highly skilled at using verse for pointed satire'
      },
      'melancholy moods': {
        tooltip: 'prone to periods of sadness that influence tone of poems'
      },
      'secrets in verse': {
        tooltip: 'hides messages and meanings not obvious on surface'
      },
      'unrestrained passion': {
        tooltip: 'writes overflowing emotion, heedless of propriety'
      },
      'disciplined form': {
        tooltip: 'masters traditional poetic rules and devices'
      },
      'historical scholar': {
        tooltip: 'studies histories and biographies seeking inspiration'
      },
      'the more the merrier': {
        tooltip: "thrives on collaborating, inspired by others' ideas",
        constraints: { enigmatic: false }
      },
      'solitary soul': {
        tooltip: 'needs isolation to focus and do best work'
      }
    }
  },
  musician: {
    strata: 'lower',
    lifestyle: 'poor',
    quirks: {
      'perfect pitch': {
        tooltip: 'has the innate ability to identify any musical note with precision'
      },
      virtuoso: {
        tooltip: 'master of playing a particular musical instrument'
      },
      'jack of all trades': {
        tooltip: 'adept at playing multiple types of instruments, versatile in performance'
      },
      'self taught': {
        tooltip: 'picked up musical skills without formal training'
      },
      'child prodigy': {
        tooltip: 'demonstrated extraordinary musical talent from an early age'
      },
      'quick study': {
        tooltip: 'able to rapidly learn and memorize new music'
      },
      traditionalist: {
        tooltip: 'prefers to play well-known, classic repertoire'
      },
      experimental: {
        tooltip: 'seeks out unusual, avant-garde musical works'
      },
      collaborative: {
        tooltip: 'works well with other musicians'
      },
      'melodic sleep-talker': {
        tooltip: 'unconsciously hums tunes in sleep, often revealing new melodies'
      },
      'performance anxiety': {
        tooltip: 'struggles with severe nerves before shows, potentially affecting quality'
      },
      'music obsessed': {
        tooltip: "can't resist any opportunity to learn about or practice music"
      },
      'harmony finder': {
        tooltip: 'can harmonize with any melody, improving group performances'
      },
      'hearing sensitivity': {
        tooltip: 'extreme sensitivity to off-key sounds can be a distraction'
      },
      'instrument collector': {
        tooltip: 'always on the lookout for unique instruments, often at a cost'
      },
      'instrument attachment': {
        tooltip: 'unusually attached to one instrument, leading to potential loss issues'
      },
      'wandering minstrel': {
        tooltip: 'cannot resist the call of the road, always moving places'
      },
      'epic bard': {
        tooltip: 'captivates audiences with enthralling tales woven into music'
      }
    }
  },
  courtesan: {
    strata: 'lower',
    lifestyle: 'poor',
    quirks: {
      discrete: {
        tooltip: 'keeps secrets and respects privacy'
      },
      'loose-lipped': {
        tooltip: "can't keep from gossiping about clients"
      },
      unrefined: {
        tooltip: 'lacks cultural knowledge and sophistication'
      },
      empathetic: {
        tooltip: "perceptive of clients' unspoken needs and desires"
      },
      oblivious: {
        tooltip: "unaware of clients' deeper wants and feelings"
      },
      experienced: {
        tooltip: 'has cultivated extensive skills over many years',
        constraints: { youngAdult: false }
      },
      inexperienced: {
        tooltip: 'still learning the role, naive in many ways',
        constraints: { youngAdult: true }
      },
      'master manipulator': {
        tooltip: 'expertly maneuvers conversations and relationships'
      },
      'alluring fragrance': {
        tooltip: 'wears a unique perfume that entices anyone within a close vicinity'
      },
      'versatile entertainer': {
        tooltip: 'skilled in various forms of entertainment from dancing to storytelling'
      },
      'gossip collector': {
        tooltip: 'has an ear for gossip and rumors, useful for gathering information'
      },
      'forbidden knowledge': {
        tooltip: 'possesses unusual or illicit knowledge, often arousing curiosity'
      },
      'intricate tattoo': {
        tooltip: 'a mysterious tattoo with unknown origin or meaning'
      },
      'literary aficionado': {
        tooltip: 'vast knowledge of literature, often used to engage in deep conversations'
      },
      'hidden scar': {
        tooltip: 'bears a hidden scar with a story untold'
      },
      'debt collector': {
        tooltip: 'owes a substantial debt to a powerful figure'
      },
      'selective clientele': {
        tooltip: 'only accepts certain individuals as clients, often causing discontent'
      },
      'unwanted attention': {
        tooltip: 'attracts unwanted attention due to their charm and wit'
      },
      'rival courtesan': {
        tooltip: 'has a rival in the business, leading to ongoing conflict'
      }
    }
  },
  guard: {
    title: `guard`,
    lifestyle: 'modest',
    strata: 'lower',
    official: true,
    martial: true,
    quirks: {
      survivalist: {
        tooltip: 'skilled at living off the land while on patrol'
      },
      'adrenaline junkie': {
        tooltip: 'seeks out action and fights'
      },
      'tone deaf': {
        tooltip: 'sings loudly and horribly while on patrol'
      },
      'mild allergies': {
        tooltip: 'prone to sneezing fits on outdoor patrols'
      },
      'guardian spirit': {
        tooltip: 'fiercely protective of specific locations or individuals'
      },
      'veteran bruises': {
        tooltip: 'old injuries sometimes act up, slowing reaction time'
      },
      'weapon collector': {
        tooltip: 'carries an unusual variety of weapons, each with unique strengths'
      },
      'locked jaw': {
        tooltip: 'not prone to gossip, secrets are safe with this guard'
      },
      'siege survivor': {
        tooltip: 'experienced in long sieges, has the patience to wait out adversaries'
      },
      'soft spot for kids': {
        tooltip: 'easily distracted by children, often to the point of negligence'
      },
      'absolute loyalty': {
        tooltip: 'unwavering loyalty to their leader, willing to follow any order'
      }
    }
  },
  'monster hunter': {
    title: '{monster|witch|undead} hunter',
    lifestyle: 'modest',
    strata: 'lower',
    age: 'veteran',
    unique: true,
    martial: true,
    quirks: {
      loremaster: {
        tooltip: 'has studied and knows monster habitats and weaknesses'
      },
      trapper: {
        tooltip: 'skilled at making snares to catch monsters'
      },
      'master forager': {
        tooltip: 'expert at finding food in the wild'
      },
      'glory seeker': {
        tooltip: 'loves recounting exploits'
      },
      mercenary: {
        tooltip: 'in it only for the money'
      },
      'impressive trophies': {
        tooltip: 'collects parts of slain monsters, gaining respect among peers'
      },
      'ancient grudge': {
        tooltip: 'holds an old, personal grudge against a specific monster type'
      },
      'natural camouflage': {
        tooltip: 'knows how to blend into the environment, making it harder for monsters to detect'
      },
      'martyr complex': {
        tooltip: 'will risk life and limb to protect others from monsters'
      },
      'favored prey': {
        tooltip: 'has an affinity for hunting a particular type of monster'
      },
      'haunted memories': {
        tooltip: 'traumatized by past hunts; experiences random, debilitating flashbacks'
      },
      'relentless pursuer': {
        tooltip: "once on a monster's trail, will not rest until it's slain"
      },
      'ancestral weapon': {
        tooltip: 'uses a family weapon passed down through generations of hunters'
      },
      'weapon collector': {
        tooltip: 'owns an extensive collection of weapons for different monster types'
      },
      'herbal knowledge': {
        tooltip: 'able to identify and use a wide range of medicinal and poisonous plants'
      },
      'lone hunter': {
        tooltip: 'works best when alone, has difficulty operating in a team',
        constraints: { gregarious: false }
      }
    }
  },
  'grave keeper': {
    title: '{grave|cemetery} keeper',
    lifestyle: 'poor',
    strata: 'lower',
    unique: true,
    quirks: {
      'tombstone artist': {
        tooltip: 'excels at crafting intricate and personalized tombstones'
      },
      'graveyard gardener': {
        tooltip: 'keeps the graveyard lush and beautiful'
      },
      "mourner's ear": {
        tooltip: 'often eavesdrops on grieving visitors, learning secrets and tales'
      },
      'floral expert': {
        tooltip: 'has extensive knowledge of funeral flowers and their meanings'
      },
      'lone caretaker': {
        tooltip: 'prefer solitude, has difficulty dealing with living visitors',
        constraints: { gregarious: false }
      },
      'graveyard companion': {
        tooltip: 'has a loyal animal companion that helps patrol the graveyard'
      },
      'respectful digger': {
        tooltip: 'takes great care not to disturb the peace of resting souls'
      },
      'paranormal skeptic': {
        tooltip: 'despite their occupation, remains skeptical about supernatural events'
      },
      'lantern bearer': {
        tooltip: 'always carries an old, glowing lantern around the graveyard'
      },
      'morbid fascination': {
        tooltip: 'finds cemeteries and death rituals intriguing'
      },
      'tombstone touch': {
        tooltip: 'feels an urge to touch every tombstone while passing by'
      },
      'eternity keeper': {
        tooltip: 'has been the caretaker for longer than anyone can remember',
        constraints: { elderly: true }
      },
      'grieving empathy': {
        tooltip: "occasionally becomes overly empathetic, sharing visitors' grief.",
        constraints: { callous: false }
      }
    }
  },
  missionary: {
    strata: 'lower',
    lifestyle: 'modest',
    culture: 'foreign',
    quirks: {
      'missionary child': {
        tooltip: 'grew up spreading religion abroad'
      },
      'sacred texts': {
        tooltip:
          'always carries holy books, often referring to them during discussions or decisions'
      },
      'symbol wearer': {
        tooltip: 'always wears symbols of their faith prominently, easily identifiable by them'
      },
      'faithful messenger': {
        tooltip: "feels compelled to spread their faith's word, even at inappropriate times."
      },
      'fasting practitioner': {
        tooltip: 'regularly fasts for religious reasons, could weaken them physically'
      },
      'prayer ritual': {
        tooltip: 'prays at specific times daily, ignoring immediate context if necessary'
      },
      'vestment wearer': {
        tooltip: 'always dressed in religious attire, might draw unwanted attention'
      },
      'ecclesiastical diplomat': {
        tooltip: 'skilled at resolving conflicts using religious teachings, but can appear preachy'
      },
      'sacramental rites': {
        tooltip:
          'adheres strictly to religious rites, potentially causing delays or social friction'
      },
      'heretic hunter': {
        tooltip:
          'vehemently opposes divergent beliefs, risking confrontations with those of different faiths'
      },
      "martyr's mindset": {
        tooltip: 'willing to suffer or die for their faith, leading to reckless decisions',
        constraints: { cautious: false }
      }
    }
  },
  ascetic: {
    title: 'monk',
    strata: 'lower',
    lifestyle: 'modest',
    quirks: {
      disciplined: {
        tooltip: 'follows a strict code of conduct and set of daily rituals'
      },
      barefoot: {
        tooltip: 'never wears shoes, even in rough terrain or cold weather'
      },
      solitary: {
        tooltip: 'prefers quiet meditation alone rather than crowds or conversation',
        constraints: { gregarious: false }
      },
      calligrapher: {
        tooltip: 'skilled at calligraphy, often writes religious texts or poetry'
      },
      forsaken: {
        tooltip: 'exiled from the monastery for unknown transgressions'
      },
      naturalist: {
        tooltip: 'has extensive knowledge of local flora and fauna'
      }
    }
  },
  scribe: { strata: 'lower', lifestyle: 'modest' },
  librarian: { strata: 'lower', lifestyle: 'modest' },
  groundskeeper: { strata: 'lower', lifestyle: 'poor' },
  'street vendor': {
    strata: 'lower',
    lifestyle: 'modest',
    quirks: {
      'loud hawker': {
        tooltip: 'projects voice loudly to draw in customers',
        constraints: { enigmatic: false }
      },
      'knows everyone': {
        tooltip: 'is familiar with and friendly toward locals and regulars',
        constraints: { enigmatic: false }
      },
      discerning: {
        tooltip: 'carefully inspects goods for quality before purchasing'
      },
      'savvy negotiator': {
        tooltip: 'able to haggle customers down to a bargain'
      },
      shrewd: {
        tooltip: 'charges foreign travelers higher prices'
      },
      secretive: {
        tooltip: 'vends illegal or taboo goods under the table'
      },
      'well connected': {
        tooltip: 'has contacts to acquire rare, exotic items'
      },
      collector: {
        tooltip: 'seeks and sells unusual trinkets and curios'
      },
      sentimental: {
        tooltip: 'unwilling to part with especially prized items'
      },
      wanderer: {
        tooltip: 'migrates between towns and markets'
      },
      grizzled: {
        tooltip: 'elderly, been vending goods entire life',
        constraints: { elderly: true }
      },
      resourceful: {
        tooltip: 'improviser who makes useful goods from scraps'
      },
      'hidden stock': {
        tooltip: 'has secret stash of valuable goods'
      },
      'unpredictable inventory': {
        tooltip: 'stock varies wildly, no two visits to this vendor are the same'
      },
      "guard's friend": {
        tooltip:
          'has a close relationship with local law enforcement, might get you out of a scrape'
      },
      'discounts for stories': {
        tooltip: 'lowers prices in exchange for interesting and compelling stories'
      }
    }
  },
  'hedge wizard': {
    title: { male: 'hedge wizard', female: 'hedge witch' },
    strata: 'lower',
    lifestyle: 'modest',
    unique: true,
    quirks: {
      herbalist: {
        tooltip: 'skilled at identifying and using local plants for medicinal purposes'
      },
      hexer: {
        tooltip: 'has a reputation for afflicting those who cross them with eldritch curses'
      },
      augur: {
        tooltip: 'able to read fortunes and predict the future'
      },
      'ancient grimoire': {
        tooltip: 'owns an old spellbook, full of mysteries but hard to decipher'
      },
      'crystal collector': {
        tooltip: 'has a vast collection of crystals and gems'
      },
      'owes a debt': {
        tooltip: 'indebted to a wandering peddler for rare spell components'
      },
      'experimental sorcery': {
        tooltip: 'prone to dangerous magical experiments'
      },
      'tells tall tales': {
        tooltip: 'prone to wild exaggeration in storytelling'
      },
      'knows legends': {
        tooltip: 'well-versed in local myths and legends'
      },
      'makes charms': {
        tooltip: 'crafts charms and talismans'
      },
      hermit: {
        tooltip: 'lives alone in the wilderness, rarely seen by others',
        constraints: { gregarious: false }
      }
    }
  },
  'fortune teller': {
    strata: 'lower',
    lifestyle: 'modest',
    unique: true,
    quirks: {
      'eager ears': {
        tooltip: 'always listening for gossip and tidbits to aid in predictions'
      },
      'skeptic magnet': {
        tooltip: 'doubters flock to disprove skills'
      },
      'prophetic dreams': {
        tooltip: 'receives guidance from dreams'
      },
      'bad omens': {
        tooltip: 'prone to dark premonitions'
      },
      soothsayer: {
        tooltip: 'makes eerily accurate predictions'
      },
      incomprehensible: {
        tooltip: 'visions are unclear and bizarre'
      },
      'prophecy tax': {
        tooltip: 'demands a specific, often unusual, payment for sharing prophecies'
      },
      'crystal gazer': {
        tooltip: 'uses crystals and mirrors to see the future'
      },
      'tarot master': {
        tooltip: 'skilled at divination using tarot cards'
      },
      haruspex: {
        tooltip: 'foretells the future by examining entrails of sacrificed animals'
      },
      'palm reader': {
        tooltip: "can interpret the lines on a person's palms to reveal their destiny"
      },
      fraud: {
        tooltip: 'pretends to have powers but secretly makes up all predictions'
      },
      'vision-induced migraines': {
        tooltip: 'suffers from painful headaches after intense readings'
      },
      'sacred rituals': {
        tooltip: 'strictly adheres to specific rituals that enhance divination accuracy'
      }
    }
  },
  'chef (military)': { strata: 'lower', lifestyle: 'poor', unique: true },
  'soldier (military)': {
    strata: 'lower',
    lifestyle: 'poor',
    constraints: { war: true },
    martial: true,
    quirks: {
      'desertion aversion': {
        tooltip: 'strongly refuses to leave a fellow soldier behind on the battlefield'
      },
      'dreaded reputation': {
        tooltip: 'rumors of their combat prowess circulate, causing fear in enemies'
      },
      'insignia tattoo': {
        tooltip: "bears a tattoo of their unit's insignia, a symbol of loyalty."
      },
      'forced conscription': {
        tooltip: 'entered the army through forced conscription, harbors resentment'
      },
      'military cook': {
        tooltip: 'expert at cooking rations into surprisingly tasty meals'
      },
      'demoted hero': {
        tooltip: 'once held a high rank, but was demoted under mysterious circumstances'
      },
      'siege survivor': {
        tooltip: 'survived a prolonged siege, experienced in defense and rationing'
      },
      'sole survivor': {
        tooltip: 'the only one to survive a devastating battle or mission'
      },
      'respected veteran': {
        tooltip: 'known and revered by many for his valor in past battles'
      },
      'orphan of war': {
        tooltip: 'an orphan raised by the military, knows no other life'
      },
      'tortured soul': {
        tooltip: 'tormented by guilt over past actions'
      },
      strategist: {
        tooltip: 'has a gift for tactics and strategy'
      },
      disciplined: {
        tooltip: 'rigorously follows military protocol and order'
      },
      bitter: {
        tooltip: 'resents authority for horrors experienced'
      },
      obedient: {
        tooltip: 'follows orders completely without question'
      }
    }
  },
  'quartermaster (military)': { strata: 'lower', lifestyle: 'modest', unique: true },
  // middle class
  'village elder': {
    strata: 'middle',
    lifestyle: 'modest',
    age: 'master',
    quirks: {
      'wise advisor': {
        tooltip: 'known for sagely counsel on village affairs and disputes'
      },
      forgetful: {
        tooltip: 'occasionally loses track of details, though wisdom still shines through'
      },
      traditionalist: {
        tooltip: 'upholds cultural customs and rituals, sometimes too rigidly'
      },
      storyteller: {
        tooltip: 'regales the village with tales of history and myth'
      },
      matchmaker: {
        tooltip: 'an expert in arranging marriages within the village'
      },
      secretive: {
        tooltip: 'guards village secrets closely, for better or worse'
      },
      'well-connected': {
        tooltip: 'maintains relationships with elders of other villages'
      },
      misanthropic: {
        tooltip: 'gruff and antisocial, dislikes engagement',
        constraints: { gregarious: false }
      },
      nosy: {
        tooltip: "pries into villagers' personal affairs"
      },
      'obsessed with signs': {
        tooltip: 'constantly interprets omens and divinations'
      },
      mentor: {
        tooltip: 'takes promising youth under their wing'
      },
      luddite: {
        tooltip: 'distrusts innovations and new technologies'
      },
      'keeper of lore': {
        tooltip: 'studies ancient texts and prophecy'
      },
      'special occasion cook': {
        tooltip: 'prepares feasts for holidays and events'
      },
      'penny-pincher': {
        tooltip: 'hoards resources and is loathe to spend'
      },
      'ancient grudge': {
        tooltip: "holds a centuries-old grudge with a neighboring village's elder"
      },
      occultist: {
        tooltip: 'dabbles in rituals and magics beyond their ken'
      }
    }
  },
  'gentry (minor)': {
    title: () => TEXT.decorate({ label: 'gentry', tooltip: 'minor' }),
    strata: 'middle',
    lifestyle: 'comfortable',
    quirks: nobleQuirks
  },
  'gentry (major)': {
    title: () => TEXT.decorate({ label: 'gentry', tooltip: 'major' }),
    strata: 'middle',
    lifestyle: 'prosperous',
    quirks: nobleQuirks
  },
  investigator: { strata: 'middle', lifestyle: 'comfortable', official: true },
  'tax collector': {
    strata: 'middle',
    lifestyle: 'comfortable',
    official: true,
    quirks: {
      'uncanny appraiser': {
        tooltip:
          'has an almost magical ability to accurately assess the value of goods and property'
      },
      'tax ledger': {
        tooltip: 'keeps an immaculate ledger of all tax collections and debts'
      },
      'impartial auditor': {
        tooltip: 'is utterly unbiased when assessing owed taxes, no matter the individual'
      },
      'traveling collector': {
        tooltip: 'never stays in one place, constantly traveling to collect taxes'
      },
      'scale of justice': {
        tooltip: 'believes in equitable taxation; the rich must pay their fair share'
      },
      'unexpected sympathy': {
        tooltip: 'sometimes waives taxes for those genuinely unable to pay'
      },
      'unseen collector': {
        tooltip: 'specializes in collecting taxes from the criminal and hidden underworld'
      },
      'reluctant enforcer': {
        tooltip: 'hates confrontation and uses force only as a last resort'
      },
      'secretive financier': {
        tooltip: 'has a vast network of informants to track financial dealings'
      },
      'patient calculator': {
        tooltip: 'slow and methodical; never rushes a tax assessment'
      },
      'currency connoisseur': {
        tooltip: 'fascinated with coinage from different realms, potentially collects rare coins'
      },
      'economic optimist': {
        tooltip: 'believes that taxation helps fund prosperous societies'
      },
      'pessimistic economist': {
        tooltip: 'believes that everyone is out to cheat their tax obligations'
      },
      'gold digger': {
        tooltip: 'always on the lookout for hidden treasures or wealth to tax'
      },
      'unpredictable assessor': {
        tooltip: 'inconsistent in tax assessment, causing potential conflicts and surprises'
      }
    }
  },
  'guard captain': {
    title: `guard captain`,
    strata: 'middle',
    lifestyle: 'comfortable',
    unique: true,
    official: true,
    martial: true,
    quirks: {
      'veteran commander': {
        tooltip: 'earned rank through years of battlefield experience and tactical skill'
      },
      'corruption blind': {
        tooltip: 'willfully ignores bribes and illegal activities among subordinates'
      },
      'iron discipline': {
        tooltip: 'maintains rigid military order that sometimes conflicts with civilian needs'
      },
      'political pawn': {
        tooltip: 'forced to enforce laws that serve powerful interests over justice'
      },
      'enemy informant': {
        tooltip: 'secretly feeds intelligence to hostile forces while maintaining loyal facade'
      },
      'recruitment crisis': {
        tooltip: 'struggles to find quality soldiers willing to serve for poor pay'
      },
      'noble obligation': {
        tooltip: 'serves reluctantly to honor family military tradition or debt'
      },
      'street origins': {
        tooltip: 'rose from common criminal background, understands both sides of law'
      },
      'moral compass': {
        tooltip: 'genuinely believes in protecting citizens and upholding justice'
      },
      'paranoid vigilance': {
        tooltip: 'sees threats everywhere, sometimes creating problems through overreaction'
      },
      'tactical genius': {
        tooltip: 'brilliant military mind wasted on mundane peacekeeping duties'
      },
      'loyalty divided': {
        tooltip: 'torn between duty to ruler and responsibility to citizens'
      },
      'drinking problem': {
        tooltip: 'uses alcohol to cope with stress and moral compromises of position'
      },
      'family legacy': {
        tooltip: 'trying to live up to legendary ancestor who served with distinction'
      },
      'equipment shortage': {
        tooltip: 'forces under-equipped due to budget constraints or corruption'
      },
      'informant network': {
        tooltip: 'maintains extensive web of civilian contacts who report criminal activity'
      },
      'retirement dreams': {
        tooltip: 'counting days until pension allows escape from thankless position'
      },
      'scapegoat fear': {
        tooltip: 'worried about being blamed for failures beyond their control'
      }
    }
  },
  bodyguard: {
    strata: 'middle',
    lifestyle: 'comfortable',
    martial: true,
    quirks: {
      'death sworn': {
        tooltip: 'took sacred oath to die before allowing harm to their charge'
      },
      'former assassin': {
        tooltip: 'uses killer instincts and techniques to protect instead of murder'
      },
      'family debt': {
        tooltip: 'serves to repay obligation owed by relatives to current employer'
      },
      'paranoid professional': {
        tooltip: 'sees potential threats in every shadow and stranger'
      },
      'mute guardian': {
        tooltip: 'never speaks, communicating only through gestures and actions'
      },
      'conflicted loyalty': {
        tooltip: 'secretly despises employer but honor prevents abandoning duty'
      },
      'enhanced senses': {
        tooltip: 'possesses supernatural awareness that makes them nearly unbeatable'
      },
      'weapon master': {
        tooltip: 'achieved legendary skill with specific armament through obsessive training'
      },
      'close quarters': {
        tooltip: 'specializes in fighting in confined spaces and crowded areas'
      },
      'poison taster': {
        tooltip: 'built immunity to toxins through careful exposure over years'
      },
      'sleepless vigil': {
        tooltip: 'suffers chronic insomnia from constant state of alertness'
      },
      'rival protection': {
        tooltip: 'competing with other bodyguards for employer favor and position'
      },
      'hidden romance': {
        tooltip: 'secretly in love with person they protect, complicating professional duty'
      },
      'survivor guilt': {
        tooltip: 'previous employer died under their protection, haunts current service'
      },
      'expendable tool': {
        tooltip: 'employer views them as disposable asset rather than trusted protector'
      },
      'combat scarred': {
        tooltip: 'bears visible wounds from previous assassination attempts'
      },
      'intel gatherer': {
        tooltip: 'doubles as spy, collecting information about employer activities'
      },
      'retirement impossible': {
        tooltip: 'knows too many secrets to ever be allowed to leave service alive'
      }
    }
  },
  templar: {
    title: '{templar|inquisitor}',
    strata: 'middle',
    lifestyle: 'comfortable',
    official: true,
    martial: true,
    quirks: {
      'divine mission': {
        tooltip: 'believes they serve as instrument of gods will in mortal world'
      },
      'heretic hunter': {
        tooltip: 'specializes in tracking and eliminating religious dissidents'
      },
      'relic bearer': {
        tooltip: 'carries sacred artifact that grants supernatural protection or power'
      },
      'vow keeper': {
        tooltip: 'bound by multiple religious oaths that restrict behavior and choices'
      },
      'faith shaken': {
        tooltip: 'recent experiences have caused doubt in religious convictions'
      },
      'militant zeal': {
        tooltip: 'eager to spread faith through sword and fire rather than words'
      },
      'political tool': {
        tooltip: 'religious superiors use them to advance secular political goals'
      },
      'corruption witness': {
        tooltip: 'knows of serious misconduct within religious hierarchy'
      },
      'demon touched': {
        tooltip: 'bears supernatural taint that conflicts with holy calling'
      },
      'charitable warrior': {
        tooltip: 'balances martial duties with caring for poor and sick'
      },
      'ancient order': {
        tooltip: 'belongs to secretive organization with goals beyond public knowledge'
      },
      'fallen noble': {
        tooltip: 'joined religious service after losing family fortune or position'
      },
      'prophecy bound': {
        tooltip: 'believes destiny foretold in ancient religious texts applies to them'
      },
      'trial survivor': {
        tooltip: 'endured brutal religious tests to prove worthiness of position'
      },
      'convert fervor': {
        tooltip: 'former non-believer now more devout than those born to faith'
      },
      torturer: {
        tooltip: 'uses interrogation and torture to extract confessions from suspects'
      },
      'sanctuary keeper': {
        tooltip: 'protects holy site from desecration by unworthy visitors'
      },
      'miracle witness': {
        tooltip: 'has seen genuine divine intervention that reinforces absolute faith'
      }
    }
  },
  'master criminal': {
    title: '{master {assassin|thief|forger|smuggler}|brothel owner}',
    strata: 'middle',
    lifestyle: 'comfortable',
    age: 'veteran',
    martial: true
  },
  'criminal boss': {
    strata: 'middle',
    lifestyle: 'comfortable',
    age: 'veteran',
    martial: true,
    quirks: {
      'legitimate front': {
        tooltip: 'operates respectable business that serves as cover for illegal activities'
      },
      'information broker': {
        tooltip: 'trades in secrets and blackmail material more valuable than gold'
      },
      'code of honor': {
        tooltip: 'follows strict personal rules about acceptable targets and methods'
      },
      'law enforcement': {
        tooltip: 'maintains network of corrupt officials who provide protection'
      },
      'rival syndicate': {
        tooltip: 'locked in ongoing war with competing criminal organization'
      },
      'retirement plan': {
        tooltip: 'secretly preparing to abandon criminal life with accumulated wealth'
      },
      'family business': {
        tooltip: 'inherited criminal empire and struggles with moral burden'
      },
      'political connections': {
        tooltip: 'provides services to government officials in exchange for immunity'
      },
      'street origins': {
        tooltip: 'rose from poverty through cunning and ruthless ambition'
      },
      'paranoid security': {
        tooltip: 'trusts no one completely, always expecting betrayal from subordinates'
      },
      'charitable facade': {
        tooltip: 'maintains public reputation through generous donations and good works'
      },
      'addiction problem': {
        tooltip: 'dependent on substances that cloud judgment and threaten empire'
      },
      'successor grooming': {
        tooltip: 'training specific individual to inherit criminal organization'
      },
      'law hunting': {
        tooltip: 'targeted by incorruptible investigator determined to bring them down'
      },
      'territory expansion': {
        tooltip: 'aggressively moving into new areas of criminal activity'
      },
      'old grudges': {
        tooltip: 'nursing vengeance against those who wronged them during rise to power'
      },
      'honor debts': {
        tooltip: 'owes significant favors to other criminals that limit freedom of action'
      },
      'empire crumbling': {
        tooltip: 'watching helplessly as criminal organization falls apart from within'
      }
    }
  },
  innkeeper: {
    strata: 'middle',
    lifestyle: 'comfortable',
    quirks: {
      'information hub': {
        tooltip: 'guests confide secrets and rumors that make them valuable intelligence source'
      },
      'criminal haven': {
        tooltip: 'provides sanctuary for outlaws and fugitives in exchange for payment'
      },
      'family tradition': {
        tooltip: 'inherited establishment that has served travelers for multiple generations'
      },
      'debt burden': {
        tooltip: 'owes significant money to creditors who threaten to seize property'
      },
      'secret passages': {
        tooltip: 'inn contains hidden rooms and tunnels used for smuggling or escape'
      },
      'quality reputation': {
        tooltip: 'establishment known for excellent food, clean beds, and honest service'
      },
      'protection payments': {
        tooltip: 'forced to pay criminals or corrupt officials to keep business safe'
      },
      'noble patronage': {
        tooltip: 'relies on wealthy regular customers for financial stability'
      },
      'brewing expertise': {
        tooltip: 'creates exceptional alcoholic beverages that draw customers from distant areas'
      },
      'gambling den': {
        tooltip: 'back rooms host illegal games of chance that generate significant income'
      },
      'staff troubles': {
        tooltip: 'employees steal from guests or business, creating reputation problems'
      },
      'location advantage': {
        tooltip: 'situated at crucial crossroads or near important landmark'
      },
      'refugee shelter': {
        tooltip: 'provides temporary housing for displaced persons fleeing disaster or war'
      },
      'rival establishment': {
        tooltip: 'competing with another inn for customers and profitable trade routes'
      },
      'mysterious past': {
        tooltip: 'former life as adventurer, soldier, or criminal influences current business'
      },
      'supernatural guests': {
        tooltip: 'accommodates non-human travelers that other establishments refuse'
      },
      'marriage broker': {
        tooltip: 'arranges romantic connections between guests for entertainment and profit'
      },
      'gossip network': {
        tooltip: 'maintains extensive connections with other innkeepers across trade routes'
      }
    }
  },
  priest: {
    strata: 'middle',
    lifestyle: 'comfortable',
    official: true,
    quirks: {
      'divine favor': {
        tooltip: 'prayers answered with genuine miracles that strengthen faith of followers'
      },
      'heretical doubts': {
        tooltip: 'questions fundamental religious doctrines while maintaining public devotion'
      },
      'political preaching': {
        tooltip: 'uses religious authority to advance specific secular political agenda'
      },
      'healing touch': {
        tooltip: 'possesses supernatural ability to cure diseases and mend injuries'
      },
      'corruption exposed': {
        tooltip: 'discovered serious misconduct by religious superiors that creates moral dilemma'
      },
      'martyr complex': {
        tooltip: 'seeks suffering and persecution as proof of religious devotion'
      },
      'wealthy congregation': {
        tooltip: 'serves rich parishioners whose donations come with strings attached'
      },
      'forbidden knowledge': {
        tooltip: 'studied religious texts and practices that church hierarchy considers dangerous'
      },
      'charity work': {
        tooltip: 'dedicates time and resources to caring for poor and disadvantaged'
      },
      'rival denomination': {
        tooltip: 'competes with other religious leaders for converts and influence'
      },
      'family shame': {
        tooltip: 'religious calling conflicts with expectations of relatives or social class'
      },
      'prophecy obsession': {
        tooltip: 'believes ancient religious predictions apply to current events and people'
      },
      'secret sin': {
        tooltip: 'struggles with personal failing that contradicts public religious teaching'
      },
      'inquisitor methods': {
        tooltip: 'uses harsh interrogation to root out religious dissent and heresy'
      },
      'convert zeal': {
        tooltip: 'aggressively seeks to bring non-believers into religious fold'
      },
      'sanctuary keeper': {
        tooltip: 'protects sacred site or relic from those who would misuse its power'
      },
      'scholar priest': {
        tooltip: 'combines religious duties with academic study of theology and history'
      },
      'crisis faith': {
        tooltip: 'recent tragedy or revelation has shaken confidence in divine benevolence'
      }
    }
  },
  abbot: {
    title: { male: 'abbot', female: 'abbess' },
    age: 'veteran',
    strata: 'middle',
    lifestyle: 'comfortable',
    official: true,
    unique: true
  },
  lawyer: {
    strata: 'middle',
    lifestyle: 'comfortable',
    official: true,
    quirks: {
      'legal loopholes': {
        tooltip: 'specializes in finding technical exceptions that subvert intent of laws'
      },
      'corruption fighter': {
        tooltip: 'dedicates career to exposing and prosecuting official misconduct'
      },
      'noble clients': {
        tooltip: 'represents wealthy patrons whose cases involve significant political implications'
      },
      'criminal defense': {
        tooltip: 'advocates for accused criminals regardless of personal opinion about guilt'
      },
      'precedent scholar': {
        tooltip: 'studies ancient legal cases to find arguments for modern situations'
      },
      'courtroom performer': {
        tooltip: 'uses theatrical skills and emotional appeals to sway judges and juries'
      },
      'debt collector': {
        tooltip: 'specializes in helping creditors recover money from reluctant debtors'
      },
      'political ambition': {
        tooltip: 'uses legal career as stepping stone to government office or noble position'
      },
      'justice idealist': {
        tooltip: 'genuinely believes law should protect innocent and punish wrongdoers'
      },
      'bribery network': {
        tooltip: 'maintains corrupt relationships with judges and court officials'
      },
      'family legacy': {
        tooltip: 'inherited legal practice along with established clients and reputation'
      },
      'document forger': {
        tooltip: 'secretly creates false legal papers for clients willing to pay premium'
      },
      'trial reputation': {
        tooltip: 'known for either winning difficult cases or losing easy ones'
      },
      'legal research': {
        tooltip: 'spends excessive time studying law books instead of practicing with clients'
      },
      'moral flexibility': {
        tooltip: 'willing to represent any client regardless of case merits or personal ethics'
      },
      'contract specialist': {
        tooltip: 'drafts agreements that heavily favor one party while appearing balanced'
      },
      'evidence tampering': {
        tooltip: 'secretly destroys or alters proof that might harm client interests'
      },
      'retirement fund': {
        tooltip: 'planning to leave legal profession once sufficient wealth accumulated'
      }
    }
  },
  scholar: {
    strata: 'middle',
    lifestyle: 'comfortable',
    quirks: {
      'ancient languages': {
        tooltip: 'fluent in dead tongues that unlock secrets from lost civilizations'
      },
      'forbidden research': {
        tooltip: 'studies subjects that authorities consider dangerous or heretical'
      },
      'patron dependent': {
        tooltip: 'relies on wealthy sponsor whose interests may conflict with academic pursuit'
      },
      'library guardian': {
        tooltip: 'protects collection of rare books and manuscripts from theft or destruction'
      },
      'rival academic': {
        tooltip: 'locked in intellectual competition with another scholar in same field'
      },
      'practical application': {
        tooltip: 'seeks to use theoretical knowledge to solve real-world problems'
      },
      'secret society': {
        tooltip: 'belongs to clandestine organization of scholars pursuing hidden knowledge'
      },
      'teaching burden': {
        tooltip: 'forced to educate students when preferring solitary research'
      },
      'manuscript hunter': {
        tooltip: 'travels extensively seeking lost texts and ancient documents'
      },
      'memory palace': {
        tooltip: 'has trained mind to perfectly recall vast amounts of information'
      },
      'translation work': {
        tooltip: 'earns living by converting foreign texts into local language'
      },
      'heretical conclusions': {
        tooltip: 'research results contradict established religious or political doctrine'
      },
      'noble education': {
        tooltip: 'tutors children of wealthy families while pursuing personal studies'
      },
      'archaeological passion': {
        tooltip: 'obsessed with uncovering physical remnants of ancient civilizations'
      },
      'theoretical genius': {
        tooltip: 'develops brilliant ideas that others cannot understand or implement'
      },
      'funding crisis': {
        tooltip: 'struggles to find financial support for expensive research projects'
      },
      'publication dreams': {
        tooltip: 'hopes to write definitive work that will establish lasting reputation'
      },
      'isolation preference': {
        tooltip: 'finds human interaction difficult and retreats into academic work'
      }
    }
  },
  sorcerer: {
    title: { male: 'sorcerer', female: 'sorceress' },
    strata: 'middle',
    lifestyle: 'comfortable',
    quirks: {
      'bloodline power': {
        tooltip: 'inherited magical abilities from inhuman ancestor or cursed lineage'
      },
      'wild magic': {
        tooltip: 'spells produce unpredictable effects that sometimes backfire dangerously'
      },
      'eldritch pact': {
        tooltip: 'bargained with otherworldly entity for power at terrible personal cost'
      },
      'magical addiction': {
        tooltip: 'compulsively uses power despite physical and mental deterioration'
      },
      'hunted outcast': {
        tooltip: 'persecuted by authorities or religious groups who fear arcane abilities'
      },
      'ancient grimoire': {
        tooltip: 'learned magic from forbidden tome that whispers dark secrets'
      },
      'protective ward': {
        tooltip: 'maintains magical barriers around home or territory to ensure safety'
      },
      'elemental affinity': {
        tooltip: 'specializes in magic related to specific natural force or element'
      },
      'curse bearer': {
        tooltip: 'suffers from magical affliction that grows stronger with spell use'
      },
      'noble patron': {
        tooltip: 'serves wealthy sponsor who funds research in exchange for magical services'
      },
      'apprentice burden': {
        tooltip: 'reluctantly teaches student who may surpass or betray them'
      },
      'divination obsession': {
        tooltip: 'compulsively seeks glimpses of future through magical scrying'
      },
      'magical healing': {
        tooltip: 'specializes in using arcane power to cure diseases and mend injuries'
      },
      'spell thief': {
        tooltip: 'steals magical knowledge from other practitioners through cunning or force'
      }
    }
  },
  blacksmith: {
    strata: 'middle',
    lifestyle: 'comfortable',
    quirks: {
      'master artisan': {
        tooltip: 'has spent decades perfecting the craft, producing superior quality work',
        constraints: { youthful: false }
      },
      'well-equipped': {
        tooltip: 'has a vast array of tools for any metalworking task'
      },
      'rune carver': {
        tooltip: 'skilled in inscribing magical runes on their creations'
      },
      armorer: {
        tooltip: 'specializes in making and repairing armor'
      },
      weaponsmith: {
        tooltip: 'excels at forging deadly and durable weapons'
      },
      metallurgist: {
        tooltip: 'skilled at alloying metals and working exotic materials'
      },
      'inventive designer': {
        tooltip: 'able to conceptualize and create unique designs'
      },
      'community pillar': {
        tooltip: 'their work is vital to the local economy'
      },
      'debt laden': {
        tooltip: 'constantly owes money for metal and fuel supplies'
      },
      'black lung': {
        tooltip: 'chronic cough and breathing difficulties from years in a smoky forge'
      },
      enchanter: {
        tooltip: 'able to imbue their creations with magical enhancements'
      },
      'ex-military': {
        tooltip: 'has an understanding of practical battlefield needs'
      },
      'trade network': {
        tooltip: 'connected to various traders for material and information exchange'
      },
      protector: {
        tooltip: 'crafts and upgrades town defenses like gates and barricades'
      },
      'teaching adept': {
        tooltip: 'can effectively teach others the craft'
      },
      underpaid: {
        tooltip: "often under-compensated due to the town's limited resources"
      },
      'sooty face': {
        tooltip: 'long hours near the hot forge leave a layer of grime'
      },
      'crowded smithy': {
        tooltip: "the blacksmith's quality work brings queues of customers"
      },
      'apprentice shortage': {
        tooltip: 'the blacksmith is currently in need of apprentices'
      },
      'generous discounts': {
        tooltip: 'free repairs for guards and militia help the whole town'
      }
    }
  },
  cobbler: {
    strata: 'middle',
    lifestyle: 'modest',
    quirks: {
      'leather artisan': {
        tooltip: 'creates exceptionally durable and comfortable footwear'
      },
      'foot specialist': {
        tooltip: 'can diagnose walking problems and design corrective shoes'
      },
      'repair master': {
        tooltip: 'earns primary income fixing damaged boots and shoes'
      },
      'noble bootmaker': {
        tooltip: 'crafts elaborate footwear for wealthy customers with expensive tastes'
      },
      'tool collection': {
        tooltip: 'owns extensive array of specialized equipment for different techniques'
      },
      'apprentice teaching': {
        tooltip: 'reluctantly trains young person in cobbling trade secrets'
      },
      'leather shortage': {
        tooltip: 'struggles to obtain quality hides at affordable prices'
      },
      'family tradition': {
        tooltip: 'inherited cobbling business along with established customer base'
      },
      'military contracts': {
        tooltip: 'provides sturdy boots for soldiers and guards'
      },
      'pattern innovation': {
        tooltip: 'experiments with new shoe designs and construction methods'
      },
      'size memory': {
        tooltip: 'remembers exact foot measurements of regular customers'
      },
      'workshop cramped': {
        tooltip: 'lacks adequate space for storing materials and working comfortably'
      },
      'guild membership': {
        tooltip: 'belongs to trade organization that regulates prices and standards'
      },
      'debt problems': {
        tooltip: 'owes money for expensive leather purchases or tool acquisition'
      },
      'seasonal demand': {
        tooltip: 'business fluctuates dramatically based on weather and farming cycles'
      },
      'competitor rivalry': {
        tooltip: 'bitter dispute with another cobbler over customers and territory'
      },
      'artistic ambition': {
        tooltip: 'frustrated by customers who want practical footwear instead of decorative shoes'
      },
      'hand problems': {
        tooltip: 'repetitive work causing joint pain and reduced dexterity'
      }
    }
  },
  tailor: {
    strata: 'middle',
    lifestyle: 'comfortable',
    title: { male: 'tailor', female: 'seamstress' },
    quirks: {
      'noble clientele': {
        tooltip: 'creates elaborate garments for wealthy customers with expensive tastes'
      },
      'fabric hoarder': {
        tooltip: 'collects rare and beautiful materials that may never be used'
      },
      'perfectionist stitching': {
        tooltip: 'spends excessive time on details that most customers never notice'
      },
      'fashion trendsetter': {
        tooltip: 'introduces new styles that influence clothing throughout region'
      },
      'apprentice teacher': {
        tooltip: 'reluctantly trains young person in sewing techniques and business skills'
      },
      'eyesight failing': {
        tooltip: 'vision problems making precise needlework increasingly difficult'
      },
      'seasonal rush': {
        tooltip: 'overwhelmed with orders before festivals and wedding seasons'
      },
      'debt collection': {
        tooltip: 'customers fail to pay for completed garments, creating financial strain'
      },
      'guild membership': {
        tooltip: 'belongs to trade organization that regulates prices and methods'
      },
      'fabric smuggler': {
        tooltip: 'deals in expensive materials obtained through illegal trade routes'
      },
      'artistic vision': {
        tooltip: 'frustrated by customers who want practical clothing instead of creative designs'
      },
      'family business': {
        tooltip: 'inherited shop along with established reputation and customer base'
      },
      'specialty armor': {
        tooltip: 'creates reinforced clothing that provides protection without obvious bulk'
      },
      'thread shortage': {
        tooltip: 'struggles to obtain quality sewing materials at affordable prices'
      },
      'measurement master': {
        tooltip: 'can determine exact clothing size by visual assessment alone'
      },
      'repair specialist': {
        tooltip: 'earns living mending damaged garments rather than creating new ones'
      },
      'color genius': {
        tooltip: 'skilled at dyeing fabrics to achieve specific shades and patterns'
      },
      'competitor rivalry': {
        tooltip: 'bitter dispute with another tailor over customers and territory'
      }
    }
  },
  weaver: {
    strata: 'middle',
    lifestyle: 'modest',
    quirks: {
      'pattern keeper': {
        tooltip: 'maintains traditional designs passed down through family generations'
      },
      'loom master': {
        tooltip: 'operates complex weaving equipment with exceptional skill and speed'
      },
      'thread quality': {
        tooltip: 'obsessed with using finest materials despite impact on profit margins'
      },
      'magical fabric': {
        tooltip: 'incorporates supernatural elements into textiles for special properties'
      },
      'color specialist': {
        tooltip: 'expert at creating dyes from local plants and minerals'
      },
      'guild obligations': {
        tooltip: 'forced to follow trade organization rules about production and pricing'
      },
      'finger arthritis': {
        tooltip: 'joint problems making detailed work painful and increasingly difficult'
      },
      'apprentice burden': {
        tooltip: 'training young person who lacks patience for tedious weaving process'
      },
      'noble commissions': {
        tooltip: 'creates elaborate tapestries and fine cloth for wealthy households'
      },
      'sheep partnership': {
        tooltip: 'maintains close relationship with herders who provide raw wool'
      },
      'seasonal work': {
        tooltip: 'production varies dramatically based on availability of materials'
      },
      'repair service': {
        tooltip: 'supplements income by mending damaged textiles for local customers'
      },
      'export dreams': {
        tooltip: 'hopes to sell products in distant markets for higher profits'
      },
      'tradition innovation': {
        tooltip: 'experiments with new techniques while respecting ancestral methods'
      },
      'workshop space': {
        tooltip: 'lacks adequate room for storing materials and operating equipment'
      },
      'family legacy': {
        tooltip: 'inherited weaving business along with established customer relationships'
      },
      'meditation weaving': {
        tooltip: 'finds spiritual peace and mental clarity through repetitive work'
      },
      'market competition': {
        tooltip: 'struggles against cheaper imported textiles from distant regions'
      }
    }
  },
  brewer: {
    title: '{brewer|vintner|distiller}',
    strata: 'middle',
    lifestyle: 'comfortable',
    quirks: {
      'master recipe': {
        tooltip: 'creates distinctive ale or beer that draws customers from distant areas'
      },
      'ingredient hunter': {
        tooltip: 'travels extensively seeking rare herbs and grains for unique brews'
      },
      'quality obsession': {
        tooltip: 'destroys entire batches that fail to meet exacting standards'
      },
      'tavern partnership': {
        tooltip: 'exclusive supplier to specific drinking establishment'
      },
      'seasonal brewing': {
        tooltip: 'adapts production to available ingredients and weather conditions'
      },
      'noble patronage': {
        tooltip: 'wealthy sponsor funds operations in exchange for premium private reserves'
      },
      'guild politics': {
        tooltip: 'navigates complex trade organization rivalries and regulations'
      },
      'contamination crisis': {
        tooltip: 'recent batch caused illness, threatening reputation and livelihood'
      },
      'water source': {
        tooltip: 'brewery location chosen for access to specific spring or well'
      },
      'apprentice succession': {
        tooltip: 'training replacement while guarding trade secrets jealously'
      },
      'equipment maintenance': {
        tooltip: 'constantly repairing expensive brewing apparatus with limited resources'
      },
      'tax burden': {
        tooltip: 'government alcohol levies consume significant portion of profits'
      },
      'religious brewing': {
        tooltip: 'produces ceremonial beverages for temple rituals and festivals'
      },
      'medicinal knowledge': {
        tooltip: 'brews herbal remedies and tonics alongside alcoholic beverages'
      },
      'storage problems': {
        tooltip: 'lacks adequate space for aging products properly before sale'
      },
      'family tradition': {
        tooltip: 'inherited brewing methods passed down through multiple generations'
      },
      'competitor sabotage': {
        tooltip: 'rival brewer attempting to ruin business through underhanded tactics'
      },
      'export ambitions': {
        tooltip: 'seeks to expand market beyond local area to increase profits'
      }
    }
  },
  leatherworker: {
    strata: 'middle',
    lifestyle: 'comfortable',
    quirks: {
      'tanning master': {
        tooltip: 'skilled at processing raw hides into various grades of leather'
      },
      'armor specialist': {
        tooltip: 'creates protective gear for warriors and guards'
      },
      'decorative artist': {
        tooltip: 'embosses elaborate patterns and designs into leather products'
      },
      'tool maker': {
        tooltip: 'crafts belts, sheaths, and equipment for various professions'
      },
      'hide hunter': {
        tooltip: 'personally tracks and kills animals to ensure quality leather supply'
      },
      'smell bearer': {
        tooltip: 'constantly carries odor of tanning chemicals and animal hides'
      },
      'noble patron': {
        tooltip: 'creates luxury leather goods for wealthy customers'
      },
      'guild politics': {
        tooltip: 'navigates complex trade organization rivalries and regulations'
      },
      'apprentice burden': {
        tooltip: 'training young person in messy and difficult leatherworking trade'
      },
      'seasonal supply': {
        tooltip: 'depends on hunting seasons and livestock slaughter for raw materials'
      },
      'chemical knowledge': {
        tooltip: 'expert in various substances used for treating and preserving hides'
      },
      'repair service': {
        tooltip: 'supplements income by mending damaged leather goods'
      },
      'military contracts': {
        tooltip: 'provides armor and equipment to local armed forces'
      },
      'workspace problems': {
        tooltip: 'lacks adequate ventilation and drainage for tanning processes'
      },
      'family legacy': {
        tooltip: 'inherited leatherworking business along with trade secrets'
      },
      'artistic frustration': {
        tooltip: 'wants to create decorative pieces but customers demand practical items'
      },
      'health issues': {
        tooltip: 'chemical exposure causing skin problems and respiratory difficulties'
      },
      'exotic materials': {
        tooltip: 'works with unusual hides from rare or dangerous creatures'
      }
    }
  },
  shipwright: {
    strata: 'middle',
    lifestyle: 'comfortable',
    constraints: { coastal: true },
    quirks: {
      'ancient techniques': {
        tooltip: 'uses traditional shipbuilding methods passed down through generations'
      },
      'wood whisperer': {
        tooltip: 'can identify best timber for specific ship components by touch and smell'
      },
      'naval contracts': {
        tooltip: 'builds warships for government or wealthy merchants'
      },
      'storm survivor': {
        tooltip: 'personally sailed vessels they built through dangerous weather'
      },
      'apprentice legacy': {
        tooltip: 'training successor in closely guarded shipbuilding secrets'
      },
      'material shortage': {
        tooltip: 'struggles to obtain quality wood and metal for construction'
      },
      'design innovation': {
        tooltip: 'experiments with new hull shapes and rigging configurations'
      },
      'reputation builder': {
        tooltip: 'every ship must exceed previous work to maintain standing'
      },
      'harbor politics': {
        tooltip: 'navigates complex relationships between dock workers and ship owners'
      },
      'pirate connection': {
        tooltip: 'secretly builds vessels for raiders while maintaining legitimate facade'
      },
      'family tradition': {
        tooltip: 'inherited shipyard along with established customer relationships'
      },
      'speed specialist': {
        tooltip: 'designs vessels that prioritize velocity over cargo capacity'
      },
      'repair master': {
        tooltip: 'earns significant income fixing damaged ships between construction projects'
      },
      'exotic materials': {
        tooltip: 'incorporates rare woods or magical components into special vessels'
      },
      'debt burden': {
        tooltip: 'owes money for expensive tools and materials needed for large projects'
      },
      'weather dependent': {
        tooltip: 'construction schedule entirely at mercy of seasonal conditions'
      },
      'guild obligations': {
        tooltip: 'forced to follow trade organization rules about construction standards'
      },
      'rival shipyard': {
        tooltip: 'competing with another builder for lucrative contracts'
      }
    }
  },
  jeweler: {
    title: '{jeweler|silversmith|goldsmith}',
    strata: 'middle',
    lifestyle: 'comfortable',
    quirks: {
      'gem appraiser': {
        tooltip: 'can identify precious stones and detect forgeries with expert accuracy'
      },
      'noble clientele': {
        tooltip: 'creates elaborate jewelry for wealthy customers and royal households'
      },
      'security obsession': {
        tooltip: 'maintains extensive precautions to protect valuable inventory from theft'
      },
      'artistic vision': {
        tooltip: 'frustrated by customers who want conventional designs over creative pieces'
      },
      'black market': {
        tooltip: 'deals in stolen gems or jewelry with questionable provenance'
      },
      'family heirlooms': {
        tooltip: 'specializes in modifying ancestral jewelry for new generations'
      },
      'magical enhancement': {
        tooltip: 'incorporates supernatural properties into decorative pieces'
      },
      'apprentice teaching': {
        tooltip: 'reluctantly trains young person while guarding trade secrets'
      },
      'debt problems': {
        tooltip: 'owes money for expensive gem purchases or security equipment'
      },
      'religious commissions': {
        tooltip: 'creates ceremonial jewelry for temples and religious ceremonies'
      },
      'eyesight failing': {
        tooltip: 'vision problems making precise detail work increasingly difficult'
      },
      'supplier network': {
        tooltip: 'maintains relationships with gem traders and precious metal sources'
      },
      'forgery skills': {
        tooltip: 'can create convincing imitations of expensive jewelry'
      },
      'theft victim': {
        tooltip: 'recently robbed of valuable inventory, struggling to rebuild business'
      },
      'wedding specialist': {
        tooltip: 'earns primary income creating rings and jewelry for marriage ceremonies'
      },
      'guild politics': {
        tooltip: 'navigates complex trade organization rivalries and pricing agreements'
      },
      'tool collector': {
        tooltip: 'owns extensive array of specialized equipment for different techniques'
      },
      'repair service': {
        tooltip: 'supplements income by fixing damaged jewelry and resetting stones'
      }
    }
  },
  butcher: {
    strata: 'middle',
    lifestyle: 'modest',
    quirks: {
      'meat quality': {
        tooltip: 'known throughout region for providing exceptionally fresh and flavorful cuts'
      },
      'beast hunter': {
        tooltip: 'personally tracks and kills animals rather than buying from herders'
      },
      'blood ritual': {
        tooltip: 'performs ceremonial slaughter according to religious or cultural traditions'
      },
      'knife master': {
        tooltip: 'blade skills transfer to combat, making them surprisingly dangerous fighter'
      },
      'waste nothing': {
        tooltip: 'uses every part of animal for food, tools, or trade goods'
      },
      'disease spreader': {
        tooltip: 'unknowingly sells contaminated meat that causes illness among customers'
      },
      'black market': {
        tooltip: 'deals in illegal meat from protected animals or questionable sources'
      },
      'family tradition': {
        tooltip: 'inherited business and techniques passed down through generations'
      },
      'squeamish irony': {
        tooltip: 'performs bloody work despite being disturbed by violence and death'
      },
      'preservation expert': {
        tooltip: 'skilled at smoking, salting, and curing meat for long-term storage'
      },
      'monster meat': {
        tooltip: 'specializes in preparing exotic creatures that others fear to butcher'
      },
      'health inspector': {
        tooltip: 'can identify diseased animals and contaminated meat by sight and smell'
      },
      'debt problems': {
        tooltip: 'owes money to suppliers or creditors who threaten business operations'
      },
      'vegetarian guilt': {
        tooltip: 'increasingly troubled by moral implications of killing animals for food'
      },
      'seasonal shortage': {
        tooltip: 'struggles with irregular supply of animals during harsh weather'
      },
      'competitor rivalry': {
        tooltip: 'locked in bitter dispute with other butcher over customers and territory'
      },
      'noble supplier': {
        tooltip: 'provides premium cuts to wealthy households for special occasions'
      },
      'apprentice teaching': {
        tooltip: 'trains young person in butchering trade despite reluctance to share secrets'
      }
    }
  },
  baker: {
    strata: 'middle',
    lifestyle: 'modest',
    quirks: {
      'dawn ritual': {
        tooltip: 'rises before sunrise every day to begin bread preparation'
      },
      'secret recipe': {
        tooltip: 'guards closely held formula that makes their baked goods exceptional'
      },
      'grain shortage': {
        tooltip: 'struggles with expensive or poor-quality flour that affects product'
      },
      'feast specialist': {
        tooltip: 'creates elaborate pastries and cakes for weddings and celebrations'
      },
      'burnt offerings': {
        tooltip: 'frequently ruins batches due to distraction or equipment problems'
      },
      'community pillar': {
        tooltip: 'bakery serves as neighborhood gathering place for news and gossip'
      },
      'debt burden': {
        tooltip: 'owes money for expensive oven construction or grain purchases'
      },
      'apprentice drama': {
        tooltip: 'training young helper who shows more talent than dedication'
      },
      'seasonal menu': {
        tooltip: 'adapts recipes to available ingredients throughout the year'
      },
      'noble contracts': {
        tooltip: 'provides daily bread delivery to wealthy households'
      },
      'fire fear': {
        tooltip: 'constantly worried about oven flames spreading to destroy neighborhood'
      },
      'artistic ambition': {
        tooltip: 'frustrated by customers who want simple bread instead of creative pastries'
      },
      'health problems': {
        tooltip: 'flour dust and heat causing respiratory issues and exhaustion'
      },
      'guild obligations': {
        tooltip: 'forced to follow trade organization rules about prices and methods'
      },
      'family legacy': {
        tooltip: 'inherited bakery along with established reputation and regular customers'
      },
      'competition pressure': {
        tooltip: 'rival baker opened nearby shop and stealing business'
      },
      'religious baker': {
        tooltip: 'specializes in ceremonial breads for temple rituals and holy days'
      },
      'midnight worker': {
        tooltip: 'prefers working alone at night when others sleep'
      }
    }
  },
  herbalist: {
    title: '{herbalist|physician|apothecary}',
    strata: 'middle',
    lifestyle: 'modest',
    quirks: {
      'plant speaker': {
        tooltip: 'claims ability to communicate with vegetation to understand properties'
      },
      'poison immunity': {
        tooltip: 'built resistance to toxins through careful exposure over years'
      },
      'healing reputation': {
        tooltip: 'known throughout region for curing diseases that baffle other healers'
      },
      'garden secret': {
        tooltip: 'maintains hidden cultivation area where rare medicinal plants grow'
      },
      'seasonal gathering': {
        tooltip: 'travels extensively following plant growth cycles and harvesting opportunities'
      },
      'noble patron': {
        tooltip: 'wealthy sponsor funds research in exchange for exclusive medical treatment'
      },
      'religious healing': {
        tooltip: 'combines herbal medicine with prayers and spiritual ceremonies'
      },
      'competitor rivalry': {
        tooltip: 'bitter dispute with another healer over patients and territory'
      },
      'dangerous remedies': {
        tooltip: 'uses potentially lethal treatments that cure or kill depending on dosage'
      },
      'apprentice teaching': {
        tooltip: 'reluctantly trains student while protecting most valuable knowledge'
      },
      'memory keeper': {
        tooltip: 'maintains vast mental catalog of plant properties and preparation methods'
      },
      'plague fighter': {
        tooltip: 'specializes in treating epidemic diseases that threaten entire communities'
      },
      'illegal substances': {
        tooltip: 'prepares forbidden drugs or poisons for clients willing to pay premium'
      },
      'animal helper': {
        tooltip: 'works with trained creature that assists in gathering and preparation'
      },
      'failing health': {
        tooltip: 'suffers from chronic illness that herbal knowledge cannot cure'
      },
      'market vendor': {
        tooltip: 'sells prepared remedies and dried herbs at regular trading locations'
      },
      'ancient knowledge': {
        tooltip: 'learned medicine from texts or teachers connected to lost civilizations'
      },
      'witch reputation': {
        tooltip: 'feared by superstitious locals who believe herbal skills involve dark magic'
      }
    }
  },
  alchemist: {
    strata: 'middle',
    lifestyle: 'comfortable',
    quirks: {
      'transmutation obsession': {
        tooltip: 'seeks legendary formula to convert base metals into precious gold'
      },
      'explosive experiments': {
        tooltip: 'laboratory frequently damaged by volatile chemical reactions'
      },
      'immortality seeker': {
        tooltip: 'researches elixirs and compounds that promise eternal life'
      },
      'noble patron': {
        tooltip: 'wealthy sponsor funds expensive research in exchange for specific results'
      },
      'poison master': {
        tooltip: 'creates deadly substances for assassins and other dangerous clients'
      },
      'ancient texts': {
        tooltip: 'studies pre-Scream manuscripts that contain dangerous alchemical secrets'
      },
      'ingredient hunter': {
        tooltip: 'travels extensively seeking rare components for complex formulas'
      },
      'apprentice danger': {
        tooltip: 'training student in hazardous work that frequently results in injury'
      },
      'guild restrictions': {
        tooltip: 'trade organization limits research topics and forbids certain experiments'
      },
      'contamination victim': {
        tooltip: 'exposure to chemicals has caused visible mutations or health problems'
      },
      'military applications': {
        tooltip: 'develops explosive devices and chemical weapons for armed forces'
      },
      'healing potions': {
        tooltip: 'creates magical remedies that cure diseases and mend injuries'
      },
      'laboratory security': {
        tooltip: 'maintains extensive precautions to protect dangerous research from theft'
      },
      'rival researcher': {
        tooltip: 'competing with another alchemist to achieve breakthrough discovery first'
      },
      'madness creeping': {
        tooltip: 'prolonged exposure to strange substances affecting mental stability'
      },
      'debt burden': {
        tooltip: 'owes significant money for expensive equipment and rare ingredients'
      },
      'religious persecution': {
        tooltip: 'authorities consider alchemical research heretical or dangerous'
      },
      'accidental discovery': {
        tooltip: 'stumbled upon valuable formula through laboratory mistake or accident'
      }
    }
  },
  artificer: {
    strata: 'middle',
    lifestyle: 'comfortable',
    quirks: {
      'ancient restoration': {
        tooltip: 'specializes in repairing pre-Scream technology and magical devices'
      },
      'magical invention': {
        tooltip: 'creates new items that combine traditional craftsmanship with supernatural power'
      },
      'patron dependent': {
        tooltip: 'relies on wealthy sponsor who funds expensive research projects'
      },
      'guild secrets': {
        tooltip: 'belongs to secretive organization that guards advanced crafting techniques'
      },
      'workshop explosion': {
        tooltip: 'experiments frequently result in dangerous accidents and property damage'
      },
      'apprentice prodigy': {
        tooltip: 'training student whose natural talent threatens to surpass master'
      },
      'component scavenger': {
        tooltip: 'searches ruins and ancient sites for materials needed in construction'
      },
      'military contracts': {
        tooltip: 'develops specialized equipment and weapons for armed forces'
      },
      'noble toys': {
        tooltip: 'creates elaborate mechanical devices for wealthy customers entertainment'
      },
      'rival artificer': {
        tooltip: 'competing with another inventor to develop breakthrough technology first'
      },
      'dangerous knowledge': {
        tooltip: 'understands principles that could be used for destructive purposes'
      },
      'tool obsession': {
        tooltip: 'constantly acquiring new equipment and instruments for workshop'
      },
      'perfectionist delays': {
        tooltip: 'spends excessive time refining projects instead of completing commissions'
      },
      'religious opposition': {
        tooltip: 'authorities consider artificial magic creation heretical or dangerous'
      },
      'material shortage': {
        tooltip: 'struggles to obtain rare metals and magical components needed for work'
      },
      'family legacy': {
        tooltip: 'inherited workshop and techniques from artificer ancestors'
      },
      'accidental genius': {
        tooltip: 'achieved breakthrough discovery through fortunate mistake or coincidence'
      },
      'clockwork specialist': {
        tooltip: 'creates intricate mechanical devices with precision timing and movement'
      }
    }
  },
  merchant: {
    strata: 'middle',
    lifestyle: 'comfortable',
    quirks: {
      'quality reputation': {
        tooltip: 'known throughout region for honest dealing and superior goods'
      },
      'debt collector': {
        tooltip: 'extends credit to customers who may never repay borrowed money'
      },
      'noble connections': {
        tooltip: 'maintains relationships with wealthy patrons who provide protection and contracts'
      },
      'price manipulator': {
        tooltip: 'artificially creates scarcity to drive up costs of essential goods'
      },
      'exotic goods': {
        tooltip: 'specializes in rare items unavailable from local sources'
      },
      'information broker': {
        tooltip: 'trades in news and rumors alongside conventional merchandise'
      },
      'family business': {
        tooltip: 'inherited trading operation along with established customer relationships'
      },
      'warehouse problems': {
        tooltip: 'lacks adequate storage space for inventory and seasonal stock'
      },
      'competitor sabotage': {
        tooltip: 'rival trader attempting to destroy business through underhanded tactics'
      },
      'currency expert': {
        tooltip: 'skilled at evaluating and exchanging different monetary systems'
      },
      'protection payments': {
        tooltip: 'forced to pay criminals or corrupt officials for business safety'
      },
      'seasonal fluctuation': {
        tooltip: 'income varies dramatically based on weather and agricultural cycles'
      },
      'apprentice successor': {
        tooltip: 'training young person to inherit business while guarding trade secrets'
      },
      'guild obligations': {
        tooltip: 'belongs to trade organization that regulates prices and territory'
      },
      'theft victim': {
        tooltip: 'recently robbed of valuable inventory, struggling to rebuild business'
      },
      'expansion dreams': {
        tooltip: 'plans to establish trading posts in new territories for increased profit'
      }
    }
  },
  banker: {
    strata: 'middle',
    age: 'veteran',
    lifestyle: 'prosperous',
    quirks: {
      'loan shark': {
        tooltip: 'charges excessive interest rates that trap borrowers in perpetual debt'
      },
      'noble financing': {
        tooltip: 'provides capital for wealthy patrons political and military ventures'
      },
      'currency speculation': {
        tooltip: 'profits from fluctuations in exchange rates between different regions'
      },
      'vault security': {
        tooltip: 'maintains extensive precautions to protect stored wealth from theft'
      },
      'information network': {
        tooltip: 'uses financial connections to gather intelligence about political developments'
      },
      'debt forgiveness': {
        tooltip: 'occasionally cancels loans for strategic or charitable reasons'
      },
      'family dynasty': {
        tooltip: 'inherited banking business along with established wealthy clientele'
      },
      'political influence': {
        tooltip: 'uses financial leverage to affect government policy and official appointments'
      },
      'competitor rivalry': {
        tooltip: 'locked in economic warfare with other financial institutions'
      },
      'fraud detection': {
        tooltip: 'skilled at identifying counterfeit currency and false financial documents'
      },
      'merchant partnerships': {
        tooltip: 'provides capital for trading expeditions in exchange for profit shares'
      },
      'religious restrictions': {
        tooltip: 'operates under limitations imposed by faith-based usury prohibitions'
      },
      'retirement planning': {
        tooltip: 'secretly preparing to abandon banking career with accumulated wealth'
      },
      'guild membership': {
        tooltip: 'belongs to exclusive organization that controls regional financial markets'
      },
      'collection enforcement': {
        tooltip: 'employs dangerous agents who ensure loan repayment through intimidation'
      },
      'charity facade': {
        tooltip: 'maintains public reputation through strategic donations and good works'
      }
    }
  },
  'caravan trader': {
    strata: 'middle',
    culture: 'foreign',
    lifestyle: 'comfortable',
    quirks: {
      'route knowledge': {
        tooltip: 'knows safe paths and reliable stops across dangerous trading territories'
      },
      'beast handler': {
        tooltip: 'skilled at managing pack animals and livestock during long journeys'
      },
      'weather reader': {
        tooltip: 'predicts storms and seasonal changes that affect travel safety'
      },
      'language collector': {
        tooltip: 'speaks multiple tongues necessary for dealing with diverse customers'
      },
      'bandit negotiator': {
        tooltip: 'maintains relationships with raiders who allow passage for tribute'
      },
      'cargo specialist': {
        tooltip: 'expert at packing and protecting goods during rough overland transport'
      },
      'debt burden': {
        tooltip: 'owes money for expensive pack animals or trading inventory'
      },
      'family separation': {
        tooltip: 'long absences strain relationships with spouse and children'
      },
      'rival trader': {
        tooltip: 'competing with another merchant for profitable routes and customers'
      },
      'information courier': {
        tooltip: 'carries messages and news between settlements for additional income'
      },
      'seasonal migration': {
        tooltip: 'follows predictable trading patterns based on agricultural and weather cycles'
      },
      'protection hire': {
        tooltip: 'pays guards or adventurers to provide security during dangerous journeys'
      },
      'quality reputation': {
        tooltip: 'known for delivering goods in excellent condition despite travel hardships'
      },
      'caravan politics': {
        tooltip: 'navigates complex relationships between different traders traveling together'
      },
      'homeland exile': {
        tooltip: 'cannot return home due to crime, debt, or political persecution'
      },
      'equipment maintenance': {
        tooltip: 'constantly repairing wagons, harnesses, and other essential travel gear'
      },
      'local connections': {
        tooltip: 'maintains network of contacts who provide supplies and information'
      },
      'retirement dreams': {
        tooltip: 'plans to establish permanent shop once sufficient capital accumulated'
      }
    }
  },
  'caravan master': {
    strata: 'middle',
    lifestyle: 'prosperous',
    culture: 'foreign',
    age: 'veteran',
    quirks: {
      'route monopoly': {
        tooltip: 'controls access to profitable trading path that competitors cannot use'
      },
      'militia commander': {
        tooltip: 'leads armed escort that protects valuable cargo from bandits and monsters'
      },
      'diplomatic immunity': {
        tooltip: 'protected by treaties that allow safe passage through hostile territories'
      },
      'logistics genius': {
        tooltip: 'coordinates complex expeditions involving dozens of traders and guards'
      },
      'political messenger': {
        tooltip: 'carries sensitive communications between governments and noble houses'
      },
      'guild leadership': {
        tooltip: 'holds important position in trade organization that regulates caravan routes'
      },
      'family dynasty': {
        tooltip: 'inherited caravan business along with established routes and contacts'
      },
      'debt financing': {
        tooltip: 'provides capital to individual traders in exchange for profit shares'
      },
      'rival master': {
        tooltip: 'competing with another caravan leader for territorial control and customers'
      },
      'insurance provider': {
        tooltip: 'protects trader investments against loss due to theft or disaster'
      },
      'intelligence network': {
        tooltip: 'uses widespread contacts to gather information about political developments'
      },
      'noble patronage': {
        tooltip: 'wealthy sponsor funds operations in exchange for exclusive trading rights'
      },
      'retirement succession': {
        tooltip: 'grooming specific individual to inherit caravan leadership position'
      },
      'protection racket': {
        tooltip: 'charges traders excessive fees for services they could obtain elsewhere'
      },
      'seasonal scheduling': {
        tooltip: 'coordinates departure times to maximize profit and minimize travel dangers'
      },
      'equipment investment': {
        tooltip: 'maintains expensive wagons, animals, and weapons needed for large expeditions'
      },
      'cultural bridge': {
        tooltip: 'facilitates trade between different ethnic groups and settlements'
      },
      'expansion ambitions': {
        tooltip: 'plans to establish permanent trading posts along profitable routes'
      }
    }
  },
  'ship captain': {
    strata: 'middle',
    lifestyle: 'comfortable',
    constraints: { coastal: true },
    age: 'veteran',
    quirks: {
      'storm navigator': {
        tooltip: 'legendary ability to guide vessels safely through dangerous weather'
      },
      'crew loyalty': {
        tooltip: 'sailors follow orders without question due to respect and trust'
      },
      'pirate hunter': {
        tooltip: 'specializes in tracking down and destroying maritime raiders'
      },
      'merchant fleet': {
        tooltip: 'commands multiple vessels that transport cargo across trade routes'
      },
      'naval experience': {
        tooltip: 'former military officer who applies wartime tactics to civilian shipping'
      },
      'superstitious ritual': {
        tooltip: 'performs elaborate ceremonies to ensure favorable winds and safe passage'
      },
      'debt burden': {
        tooltip: 'owes significant money for ship purchase or expensive repairs'
      },
      'family vessel': {
        tooltip: 'inherited ship along with established crew and trading relationships'
      },
      'rival captain': {
        tooltip: 'competing with another commander for profitable cargo contracts'
      },
      'smuggling operation': {
        tooltip: 'secretly transports illegal goods alongside legitimate merchandise'
      },
      'navigation master': {
        tooltip: 'can determine exact position using stars, currents, and weather patterns'
      },
      'port politics': {
        tooltip: 'maintains relationships with harbor officials who control docking rights'
      },
      'crew problems': {
        tooltip: 'struggles with mutinous sailors or difficulty recruiting quality crew'
      },
      'insurance fraud': {
        tooltip: 'deliberately damages cargo or vessel to collect compensation payments'
      },
      'weather dependent': {
        tooltip: 'shipping schedule entirely at mercy of seasonal winds and storms'
      },
      'noble charter': {
        tooltip: 'operates under exclusive license granted by wealthy patron or government'
      },
      'retirement planning': {
        tooltip: 'saving money to purchase land and abandon dangerous maritime career'
      }
    }
  },
  'dock master': {
    title: '{dock|harbor} master',
    strata: 'middle',
    lifestyle: 'comfortable',
    constraints: { coastal: true },
    age: 'veteran',
    quirks: {
      'harbor authority': {
        tooltip: 'controls ship access and docking rights that determine port profitability'
      },
      'smuggling blind': {
        tooltip: 'accepts bribes to ignore illegal cargo and unauthorized vessels'
      },
      'cargo inspector': {
        tooltip: 'thoroughly examines shipments to prevent contraband and collect proper taxes'
      },
      'dock maintenance': {
        tooltip: 'responsible for repairing and expanding harbor facilities'
      },
      'customs collection': {
        tooltip: 'collects government fees and tariffs on imported goods'
      },
      'labor organizer': {
        tooltip: 'coordinates stevedores and dock workers who load and unload ships'
      },
      'information broker': {
        tooltip: 'trades in news and shipping intelligence gathered from visiting vessels'
      },
      'noble connections': {
        tooltip: 'maintains relationships with wealthy merchants who own major trading fleets'
      },
      'warehouse oversight': {
        tooltip: 'manages storage facilities where cargo awaits transport or sale'
      },
      'political pressure': {
        tooltip: 'forced to implement government policies that hurt harbor business'
      },
      'corruption network': {
        tooltip: 'participates in system of bribes and kickbacks involving port officials'
      },
      'family legacy': {
        tooltip: 'inherited position along with established relationships and obligations'
      },
      'expansion planning': {
        tooltip: 'develops projects to increase harbor capacity and attract more shipping'
      }
    }
  },
  'officer (military)': {
    strata: 'middle',
    lifestyle: 'comfortable',
    constraints: { war: true },
    martial: true
  },
  // upper class
  'aristocrat (minor)': {
    title: () => TEXT.decorate({ label: 'aristocrat', tooltip: 'minor' }),
    strata: 'upper',
    lifestyle: 'prosperous',
    quirks: nobleQuirks
  },
  'aristocrat (major)': {
    title: () => TEXT.decorate({ label: 'aristocrat', tooltip: 'major' }),
    strata: 'upper',
    lifestyle: 'rich',
    quirks: nobleQuirks
  },
  oligarch: {
    strata: 'upper',
    lifestyle: 'rich',
    age: 'veteran',
    official: true,
    quirks: {
      'shadow puppet': {
        tooltip: 'controls government officials and policies through wealth and influence'
      },
      'industrial monopoly': {
        tooltip: 'owns dominant share of essential trade or manufacturing in region'
      },
      'rival conspiracy': {
        tooltip: 'locked in secret war with other wealthy families for ultimate control'
      },
      'legitimate facade': {
        tooltip: 'maintains public reputation while engaging in ruthless business practices'
      },
      'succession crisis': {
        tooltip: 'family members scheming against each other to inherit wealth and power'
      },
      'political marriage': {
        tooltip: 'arranges strategic unions to cement alliances with other powerful families'
      },
      'information empire': {
        tooltip: 'maintains vast spy network that gathers intelligence on enemies and allies'
      },
      'charitable reputation': {
        tooltip: 'funds public works and religious institutions to maintain popular support'
      },
      'ancient bloodline': {
        tooltip: 'claims descent from pre-Scream nobility or legendary heroes'
      },
      'debt leverage': {
        tooltip: 'controls government and nobles through strategic loans and financial obligations'
      },
      'private army': {
        tooltip: 'maintains personal military force that rivals official government troops'
      },
      'trade warfare': {
        tooltip: 'uses economic pressure and market manipulation to destroy competitors'
      },
      'political immunity': {
        tooltip: 'wealth and connections make them effectively above normal legal consequences'
      },
      'paranoid security': {
        tooltip:
          'employs extensive bodyguards and surveillance due to constant assassination threats'
      },
      'revolutionary target': {
        tooltip: 'popular movements organize specifically to overthrow their power and influence'
      },
      'foreign influence': {
        tooltip: 'secretly serves interests of distant government or competing nation'
      },
      'religious patronage': {
        tooltip: 'funds temples and clergy who preach political messages supporting their rule'
      },
      'decadent lifestyle': {
        tooltip: 'spends enormous wealth on luxury and entertainment while subjects suffer'
      }
    }
  },
  magistrate: {
    title: `magistrate`,
    age: 'master',
    strata: 'upper',
    lifestyle: 'rich',
    unique: true,
    official: true,
    quirks: {
      'justice crusader': {
        tooltip: 'genuinely committed to fair application of law regardless of social status'
      },
      'corruption network': {
        tooltip: 'accepts bribes and manipulates legal proceedings for personal benefit'
      },
      'noble appointment': {
        tooltip: 'serves at pleasure of wealthy patron who expects favorable treatment'
      },
      'legal scholar': {
        tooltip: 'expert in ancient law codes and precedents that guide court decisions'
      },
      'political pressure': {
        tooltip: 'forced to make rulings that serve government interests over justice'
      },
      'family tradition': {
        tooltip: 'inherited position along with established relationships and obligations'
      },
      'populist support': {
        tooltip: 'maintains authority through common people who trust their fairness'
      },
      'secret guilt': {
        tooltip: 'haunted by past legal decision that resulted in innocent person suffering'
      },
      'rival magistrate': {
        tooltip: 'competing with another judge for jurisdiction and political influence'
      },
      'religious law': {
        tooltip: 'integrates spiritual principles with secular legal codes in court proceedings'
      },
      'assassination target': {
        tooltip: 'enemies seek to eliminate them due to inconvenient legal decisions'
      },
      'court efficiency': {
        tooltip: 'processes cases quickly but sometimes sacrifices thoroughness for speed'
      },
      'evidence tampering': {
        tooltip: 'secretly destroys or alters proof to ensure desired legal outcomes'
      },
      'militia commander': {
        tooltip: 'leads local armed forces responsible for enforcing court decisions'
      },
      'diplomatic immunity': {
        tooltip: 'position grants protection from prosecution by other legal authorities'
      },
      'retirement planning': {
        tooltip: 'accumulating wealth and influence to ensure comfortable post-judicial career'
      },
      'moral flexibility': {
        tooltip: 'interprets laws creatively to achieve results they believe serve greater good'
      },
      'public spectacle': {
        tooltip: 'conducts trials as entertainment events that draw crowds and attention'
      }
    }
  },
  archmage: {
    title: '{archmage|court wizard}',
    strata: 'upper',
    lifestyle: 'rich',
    unique: true,
    age: 'master',
    quirks: {
      'reality anchor': {
        tooltip: 'maintains magical barriers that prevent dimensional incursions and reality tears'
      },
      'ancient knowledge': {
        tooltip: 'guards pre-Scream magical secrets that could reshape civilization'
      },
      'political advisor': {
        tooltip: 'provides magical support and counsel to government leaders and nobles'
      },
      'tower fortress': {
        tooltip:
          'maintains elaborate stronghold filled with magical defenses and research facilities'
      },
      'rival archmage': {
        tooltip:
          'locked in magical cold war with another master wizard over territory or philosophy'
      },
      'eldritch patron': {
        tooltip: 'serves otherworldly entity that grants power in exchange for specific services'
      },
      'magical monopoly': {
        tooltip: 'controls access to certain spells or magical knowledge within region'
      },
      'time limited': {
        tooltip: 'magical power comes with supernatural curse that will eventually destroy them'
      },
      'artifact guardian': {
        tooltip: 'protects powerful magical items from those who would misuse their abilities'
      },
      'planar diplomat': {
        tooltip: 'negotiates with entities from other dimensions to prevent supernatural disasters'
      },
      'succession planning': {
        tooltip: 'grooming specific apprentice to inherit magical position and responsibilities'
      },
      'magical research': {
        tooltip: 'conducts experiments that push boundaries of arcane knowledge and ability'
      },
      'reality warped': {
        tooltip: 'prolonged magical exposure has fundamentally changed their physical nature'
      },
      'political immunity': {
        tooltip: 'magical power makes them effectively independent of normal government authority'
      },
      'cult following': {
        tooltip: 'worshipped by devoted followers who believe them to be divine or prophetic'
      },
      'moral detachment': {
        tooltip: 'views ordinary people as insignificant compared to cosmic magical forces'
      },
      'immortality burden': {
        tooltip: 'unnaturally extended life has made them weary of existence and mortal concerns'
      }
    }
  },
  'high priest': {
    strata: 'upper',
    lifestyle: 'rich',
    unique: true,
    official: true,
    age: 'master',
    quirks: {
      'divine mandate': {
        tooltip:
          'claims direct communication with deity that guides religious and political decisions'
      },
      'temple empire': {
        tooltip: 'controls vast network of religious institutions and devoted followers'
      },
      'political kingmaker': {
        tooltip: 'religious authority grants power to legitimize or overthrow secular rulers'
      },
      'miracle worker': {
        tooltip: 'performs genuine supernatural feats that reinforce faith and attract converts'
      },
      'heresy hunter': {
        tooltip: 'leads campaigns to eliminate religious dissidents and competing faiths'
      },
      'wealth accumulation': {
        tooltip: 'uses religious donations to fund personal luxury rather than charitable works'
      },
      'succession crisis': {
        tooltip: 'multiple candidates compete to inherit religious leadership position'
      },
      'ancient prophecy': {
        tooltip: 'believes religious texts predict their role in upcoming apocalyptic events'
      },
      'rival denomination': {
        tooltip: 'locked in theological and political struggle with other religious leaders'
      },
      'secret doubt': {
        tooltip: 'privately questions fundamental religious beliefs while maintaining public faith'
      },
      'political marriage': {
        tooltip: 'arranges strategic unions to cement alliances with secular authorities'
      },
      'charitable works': {
        tooltip: 'genuinely dedicates temple resources to caring for poor and disadvantaged'
      },
      'inquisition methods': {
        tooltip: 'uses torture and intimidation to root out religious dissent'
      },
      'foreign influence': {
        tooltip: 'secretly serves interests of distant religious authority or competing nation'
      },
      'martyrdom complex': {
        tooltip: 'seeks persecution and suffering as proof of religious devotion and divine favor'
      },
      'temple corruption': {
        tooltip: 'religious organization riddled with misconduct that threatens their authority'
      },
      'divine artifact': {
        tooltip: 'guards sacred relic that grants supernatural power to faithful believers'
      },
      'apocalypse preparation': {
        tooltip: 'organizes followers for prophesied end times through stockpiling and training'
      }
    }
  },
  'templar grandmaster': {
    strata: 'upper',
    lifestyle: 'rich',
    unique: true,
    age: 'master',
    quirks: {
      'holy crusade': {
        tooltip: 'leads military campaigns to spread faith and eliminate religious enemies'
      },
      'warrior monks': {
        tooltip: 'commands elite fighting force that combines martial skill with religious devotion'
      },
      'relic guardian': {
        tooltip: 'protects sacred artifacts and holy sites from desecration by unworthy'
      },
      'political independence': {
        tooltip: 'templar order operates outside normal government authority and secular law'
      },
      'divine visions': {
        tooltip: 'receives prophetic dreams that guide military and religious strategy'
      },
      'succession trial': {
        tooltip: 'position must be earned through spiritual and physical tests of worthiness'
      },
      'heretic elimination': {
        tooltip: 'specializes in hunting down and destroying religious dissidents and cultists'
      },
      'fortress network': {
        tooltip: 'maintains military strongholds that serve as bases for religious operations'
      },
      'rival order': {
        tooltip: 'competing with another templar organization for resources and authority'
      },
      'noble patronage': {
        tooltip: 'funded by wealthy sponsors who expect military support in exchange'
      },
      'ancient oaths': {
        tooltip: 'bound by religious vows that limit personal freedom and political options'
      },
      'recruitment crisis': {
        tooltip: 'struggles to find worthy candidates willing to embrace templar lifestyle'
      },
      'diplomatic immunity': {
        tooltip: 'religious authority grants protection from prosecution by secular courts'
      },
      'corruption purge': {
        tooltip: 'working to eliminate misconduct and moral decay within templar ranks'
      },
      'demonic opposition': {
        tooltip: 'targeted by supernatural enemies who seek to corrupt or destroy the order'
      },
      'military genius': {
        tooltip: 'tactical brilliance makes them formidable commander in religious warfare'
      },
      'martyrdom prepared': {
        tooltip: 'expects to die gloriously in service to faith and welcomes such fate'
      },
      'political marriage': {
        tooltip: 'arranges strategic unions to cement alliances despite religious celibacy vows'
      }
    }
  },
  'general (military)': {
    strata: 'upper',
    lifestyle: 'rich',
    unique: true,
    constraints: { war: true },
    martial: true,
    age: 'master',
    quirks: {
      'battlefield legend': {
        tooltip: 'renowned for tactical brilliance and victories against overwhelming odds'
      },
      'soldier loyalty': {
        tooltip: 'troops follow orders without question due to respect earned through leadership'
      },
      'political ambition': {
        tooltip: 'uses military position as stepping stone to civilian government authority'
      },
      'noble birth': {
        tooltip: 'inherited rank through family connections rather than earning through merit'
      },
      'veteran scarred': {
        tooltip: 'bears visible wounds from personal combat that inspire subordinate confidence'
      },
      'military reforms': {
        tooltip:
          'implements innovative training and organizational methods that improve army effectiveness'
      },
      'rival general': {
        tooltip: 'competing with another commander for resources, promotion, and government favor'
      },
      'mercenary background': {
        tooltip: 'former soldier of fortune who understands warfare from economic perspective'
      },
      'court intrigue': {
        tooltip:
          'navigates complex political relationships while maintaining military effectiveness'
      },
      'logistics master': {
        tooltip: 'excels at supplying and moving large armies across difficult terrain'
      },
      'foreign expertise': {
        tooltip: 'studied military techniques from distant cultures and foreign campaigns'
      },
      'retirement planning': {
        tooltip: 'accumulating wealth and political connections to ensure post-military career'
      },
      'coup preparation': {
        tooltip: 'secretly organizing military overthrow of current government leadership'
      },
      'war crimes': {
        tooltip:
          'guilty of atrocities during past campaigns that could destroy reputation if exposed'
      },
      'diplomatic immunity': {
        tooltip: 'military rank grants protection from prosecution by civilian authorities'
      },
      'family military': {
        tooltip: 'continues tradition of ancestors who served with distinction in armed forces'
      },
      'technological innovation': {
        tooltip: 'adopts new weapons and tactics that give military advantage over enemies'
      },
      'peace struggle': {
        tooltip:
          'finds purpose and identity difficult to maintain during extended periods without warfare'
      }
    }
  },
  'exiled pretender': {
    strata: 'upper',
    lifestyle: 'rich',
    unique: true,
    culture: 'foreign',
    quirks: {
      'rightful heir': {
        tooltip: 'legitimate claim to throne based on bloodline or ancient law'
      },
      'loyal followers': {
        tooltip: 'retains devoted supporters who work to restore them to power'
      },
      'foreign backing': {
        tooltip: 'receives financial and military support from distant government or noble house'
      },
      'assassination target': {
        tooltip: 'current rulers actively seek to eliminate threat to their authority'
      },
      'popular support': {
        tooltip: 'common people remember their rule fondly and desire their return'
      },
      'rival claimant': {
        tooltip: 'competing with another pretender who also seeks to claim throne'
      },
      'noble marriage': {
        tooltip: 'strategic union designed to legitimize claim and gain powerful allies'
      },
      'military experience': {
        tooltip: 'gained tactical knowledge during exile that will aid in restoration campaign'
      },
      'prophecy fulfillment': {
        tooltip: 'believes ancient predictions guarantee their eventual return to power'
      },
      'wealth hidden': {
        tooltip: 'maintains secret treasure reserves that will fund restoration efforts'
      },
      'court network': {
        tooltip:
          'spies and sympathizers within current government provide intelligence and sabotage'
      },
      'religious blessing': {
        tooltip: 'clergy supports their claim as divinely ordained ruler'
      },
      'mercenary army': {
        tooltip: 'organizing professional soldiers who fight for payment rather than loyalty'
      },
      'diplomatic recognition': {
        tooltip: 'foreign governments treat them as legitimate ruler despite exile status'
      },
      'revolutionary movement': {
        tooltip: 'popular uprising organized specifically to restore them to throne'
      },
      'moral corruption': {
        tooltip: 'exile has changed their character in ways that make them unfit to rule'
      }
    }
  },
  ethnarch: {
    strata: 'upper',
    lifestyle: 'prosperous',
    unique: true,
    age: 'master',
    culture: 'foreign',
    quirks: {
      'cultural preservation': {
        tooltip: 'dedicates resources to maintaining traditional customs and ancestral practices'
      },
      'minority protection': {
        tooltip: 'advocates for ethnic group rights within larger political system'
      },
      'homeland exile': {
        tooltip: 'leads displaced people who cannot return to ancestral territory'
      },
      'language keeper': {
        tooltip: 'ensures ethnic tongue survives despite pressure to adopt dominant culture'
      },
      'marriage broker': {
        tooltip: 'arranges strategic unions to strengthen ethnic community and maintain bloodlines'
      },
      'political autonomy': {
        tooltip: 'negotiates for self-governance rights within existing government structure'
      },
      'rival ethnarch': {
        tooltip: 'competing with leader of different ethnic group for resources and territory'
      },
      'assimilation resistance': {
        tooltip: 'opposes efforts to absorb ethnic community into mainstream society'
      },
      'ancient grievances': {
        tooltip: 'nursing historical wrongs committed against their people by other groups'
      },
      'religious authority': {
        tooltip: 'combines ethnic leadership with spiritual guidance of traditional faith'
      },
      'succession planning': {
        tooltip: 'grooming specific individual to inherit cultural leadership responsibilities'
      },
      'trading network': {
        tooltip: 'maintains economic connections with ethnic communities in distant regions'
      },
      'military tradition': {
        tooltip: 'organizes ethnic warriors according to ancestral combat methods and tactics'
      },
      'political marriage': {
        tooltip: 'arranged union with member of dominant culture to secure protection'
      },
      'cultural bridge': {
        tooltip: 'facilitates communication and cooperation between different ethnic groups'
      },
      'refugee coordinator': {
        tooltip: 'organizes resettlement efforts for displaced members of ethnic community'
      },
      'historical scholar': {
        tooltip: 'maintains detailed knowledge of ethnic heritage and ancestral achievements'
      },
      'revolutionary leader': {
        tooltip: 'secretly organizing ethnic uprising against oppressive government policies'
      }
    }
  },
  diplomat: {
    title: '{diplomat|ambassador}',
    strata: 'upper',
    lifestyle: 'rich',
    unique: true,
    age: 'veteran',
    culture: 'foreign',
    quirks: {
      'language master': {
        tooltip: 'fluent in multiple tongues and skilled at navigating cultural differences'
      },
      'information broker': {
        tooltip: 'trades in intelligence gathered during diplomatic missions and social events'
      },
      'marriage arranger': {
        tooltip: 'negotiates strategic unions between noble houses and government officials'
      },
      'double agent': {
        tooltip: 'secretly serves multiple governments while maintaining facade of single loyalty'
      },
      'hostage value': {
        tooltip: 'foreign governments consider them valuable prize for capture or assassination'
      },
      'noble birth': {
        tooltip: 'inherited diplomatic position through family connections and social status'
      },
      'trade negotiator': {
        tooltip: 'specializes in economic agreements and commercial treaty arrangements'
      },
      'cultural bridge': {
        tooltip: 'facilitates understanding between different civilizations and ethnic groups'
      },
      'spy network': {
        tooltip: 'maintains extensive intelligence contacts in foreign courts and governments'
      },
      'protocol expert': {
        tooltip: 'master of etiquette and ceremony that prevents diplomatic incidents'
      },
      'military attaché': {
        tooltip: 'combines diplomatic duties with intelligence gathering about foreign armies'
      },
      'religious envoy': {
        tooltip: 'represents both government and religious interests in international negotiations'
      },
      'exile appointment': {
        tooltip: 'assigned to distant post as punishment or to remove them from domestic politics'
      },
      'family hostage': {
        tooltip: 'relatives held by home government to ensure loyalty during foreign service'
      },
      'retirement planning': {
        tooltip: 'accumulating wealth and connections to ensure comfortable post-diplomatic career'
      },
      'peace maker': {
        tooltip: 'genuinely committed to preventing warfare through skilled negotiation'
      },
      'court favorite': {
        tooltip: 'enjoys special protection and privileges from foreign ruler they charm'
      },
      'scandal vulnerability': {
        tooltip: 'personal indiscretions could destroy diplomatic career if exposed by enemies'
      }
    }
  },
  courtier: {
    title: () =>
      TEXT.decorate({
        label: 'courtier',
        tooltip: window.dice.spin(
          '{statesman|spymaster|kingmaker|marshal|chancellor|steward|majordomo}'
        )
      }),
    strata: 'upper',
    lifestyle: 'rich',
    unique: true,
    official: true,
    age: 'veteran'
  },
  prince: {
    title: { male: 'prince', female: 'princess' },
    strata: 'upper',
    lifestyle: 'rich',
    culture: 'native',
    constraints: { capital: true, leadership: true, kingdom: true },
    unique: true,
    age: 'novice',
    quirks: {
      'heir apparent': {
        tooltip: 'designated successor who will inherit throne and royal authority'
      },
      'military commander': {
        tooltip: 'leads royal armies and learns statecraft through battlefield experience'
      },
      'scholarly pursuits': {
        tooltip: 'prefers academic study and intellectual development over political duties'
      },
      'popular champion': {
        tooltip: 'beloved by common people who see them as more caring than current ruler'
      },
      'rival sibling': {
        tooltip: 'competing with brother or sister for inheritance and royal favor'
      },
      'puppet ruler': {
        tooltip: 'controlled by advisors or regents who manipulate them for personal gain'
      },
      'diplomatic marriage': {
        tooltip: 'arranged union designed to cement alliance with foreign government or noble house'
      },
      'religious calling': {
        tooltip: 'feels drawn to spiritual life that conflicts with secular royal responsibilities'
      },
      'assassination target': {
        tooltip:
          'enemies seek to eliminate them to prevent future succession or destabilize kingdom'
      },
      'moral corruption': {
        tooltip: 'engages in behavior that scandals court and threatens royal reputation'
      },
      'exile experience': {
        tooltip:
          'spent time in foreign courts that provided education in different government methods'
      },
      'ancient bloodline': {
        tooltip: 'claims descent from legendary heroes or pre-Scream royalty'
      },
      'prophecy subject': {
        tooltip: 'ancient predictions describe their role in future events of cosmic significance'
      },
      'commoner sympathy': {
        tooltip: 'genuinely cares about common people welfare despite privileged upbringing'
      }
    }
  }
}

const communities: Record<
  'tribal' | 'rural' | 'urban' | 'monastic' | 'military outpost',
  WeightedDistribution<Profession>
> = {
  tribal: [
    { v: 'shaman', w: 1 },
    { v: 'tribal warrior', w: 1 },
    { v: 'tribal elder', w: 1 },
    { v: 'tribal artisan', w: 1 },
    { v: 'hunter', w: 1 },
    { v: 'forager', w: 1 },
    { v: 'herdsman', w: 1 },
    { v: 'missionary', w: 0.05 },
    { v: 'foreigner (merchant)', w: 0.5 }
  ],
  'military outpost': [
    { v: 'peasant', w: 1 },
    { v: 'missionary', w: 0.05 },
    { v: 'soldier (military)', w: 25 },
    { v: 'chef (military)', w: 1 },
    { v: 'quartermaster (military)', w: 1 },
    { v: 'priest', w: 1 },
    { v: 'blacksmith', w: 1 },
    { v: 'cobbler', w: 0.1 },
    { v: 'leatherworker', w: 0.1 },
    { v: 'herbalist', w: 1 },
    { v: 'officer (military)', w: 5 }
  ],
  monastic: [
    { v: 'peasant', w: 5 },
    { v: 'servant', w: 1 },
    { v: 'monster hunter', w: 0.1 },
    { v: 'missionary', w: 0.05 },
    { v: 'ascetic', w: 25 },
    { v: 'scribe', w: 1 },
    { v: 'librarian', w: 1 },
    { v: 'groundskeeper', w: 1 },
    { v: 'soldier (military)', w: 1 },
    { v: 'abbot', w: 5 },
    { v: 'blacksmith', w: 1 },
    { v: 'cobbler', w: 0.1 },
    { v: 'weaver', w: 1 },
    { v: 'brewer', w: 0.5 },
    { v: 'leatherworker', w: 0.1 },
    { v: 'herbalist', w: 1 },
    { v: 'merchant', w: 1 },
    { v: 'officer (military)', w: 1 }
  ],
  rural: [
    { v: 'peasant', w: 25 },
    { v: 'servant', w: 1 },
    { v: 'master servant', w: 0.1 },
    { v: 'monster hunter', w: 0.1 },
    { v: 'missionary', w: 0.05 },
    { v: 'hedge wizard', w: 0.1 },
    { v: 'soldier (military)', w: 1 },
    { v: 'village elder', w: 5 },
    { v: 'gentry (minor)', w: 1 },
    { v: 'investigator', w: 1 },
    { v: 'tax collector', w: 1 },
    { v: 'innkeeper', w: 1 },
    { v: 'priest', w: 1 },
    { v: 'blacksmith', w: 1 },
    { v: 'cobbler', w: 0.1 },
    { v: 'weaver', w: 1 },
    { v: 'brewer', w: 0.5 },
    { v: 'leatherworker', w: 0.1 },
    { v: 'herbalist', w: 1 },
    { v: 'merchant', w: 1 },
    { v: 'officer (military)', w: 1 }
  ],
  urban: [
    { v: 'laborer', w: 1 },
    { v: 'beggar', w: 1 },
    { v: 'criminal', w: 1 },
    { v: 'sailor', w: 1 },
    { v: 'dock worker', w: 1 },
    { v: 'artist', w: 0.2 },
    { v: 'poet', w: 0.2 },
    { v: 'musician', w: 0.2 },
    { v: 'courtesan', w: 0.5 },
    { v: 'guard', w: 1 },
    { v: 'grave keeper', w: 1 },
    { v: 'servant', w: 1 },
    { v: 'master servant', w: 0.1 },
    { v: 'monster hunter', w: 0.1 },
    { v: 'missionary', w: 1 },
    { v: 'street vendor', w: 1 },
    { v: 'fortune teller', w: 1 },
    { v: 'soldier (military)', w: 1 },
    { v: 'gentry (minor)', w: 1 },
    { v: 'gentry (major)', w: 1 },
    { v: 'investigator', w: 1 },
    { v: 'tax collector', w: 1 },
    { v: 'guard captain', w: 1 },
    { v: 'bodyguard', w: 1 },
    { v: 'templar', w: 1 },
    { v: 'master criminal', w: 0.5 },
    { v: 'criminal boss', w: 0.5 },
    { v: 'innkeeper', w: 1 },
    { v: 'lawyer', w: 1 },
    { v: 'scholar', w: 1 },
    { v: 'sorcerer', w: 1 },
    { v: 'priest', w: 1 },
    { v: 'blacksmith', w: 1 },
    { v: 'cobbler', w: 0.1 },
    { v: 'butcher', w: 0.1 },
    { v: 'baker', w: 0.1 },
    { v: 'shipwright', w: 0.5 },
    { v: 'weaver', w: 0.5 },
    { v: 'jeweler', w: 0.5 },
    { v: 'brewer', w: 0.5 },
    { v: 'leatherworker', w: 0.1 },
    { v: 'herbalist', w: 1 },
    { v: 'alchemist', w: 0.5 },
    { v: 'artificer', w: 0.1 },
    { v: 'merchant', w: 1 },
    { v: 'banker', w: 1 },
    { v: 'caravan trader', w: 0.5 },
    { v: 'caravan master', w: 0.5 },
    { v: 'ship captain', w: 1 },
    { v: 'dock master', w: 1 },
    { v: 'officer (military)', w: 1 },
    { v: 'aristocrat (minor)', w: 2 },
    { v: 'aristocrat (major)', w: 1 },
    { v: 'oligarch', w: 1 },
    { v: 'magistrate', w: 1 },
    { v: 'archmage', w: 0.1 },
    { v: 'high priest', w: 0.1 },
    { v: 'templar grandmaster', w: 0.1 },
    { v: 'general (military)', w: 1 },
    { v: 'exiled pretender', w: 0.1 },
    { v: 'ethnarch', w: 0.1 },
    { v: 'diplomat', w: 1 },
    { v: 'courtier', w: 1 },
    { v: 'prince', w: 0.5 }
  ]
}

const ages: Record<ProfessionDetails['age'], WeightedDistribution<LifePhase>> = {
  novice: [{ v: 'young adult', w: 1 }],
  veteran: [
    { v: 'adult', w: 0.5 },
    { v: 'middle age', w: 0.25 },
    { v: 'old', w: 0.25 }
  ],
  master: [
    { v: 'middle age', w: 0.5 },
    { v: 'old', w: 0.5 }
  ]
}

const professionRandom = (place: ActorSpawnParams['place']) => {
  const community =
    communities[place.population > 1e3 ? 'urban' : place.nomadic ? 'tribal' : 'rural']
  const province = HUB.province(place)
  const actors = PROFESSION.actors(place).map(actor => actor.profession.key)
  const used = new Set(actors)
  const nation = PROVINCE.nation(province)
  const kingdom = nation.size === 'empire' || nation.size === 'kingdom'
  const coastal = place.coastal
  const war = province.battleground >= 0
  const capital = PROVINCE.capital(province)
  const leadership = nation.government !== 'fragmented'
  const [selected] = TRAIT.selection({
    available: community.reduce((acc: Partial<Record<Profession, ProfessionDetails>>, { v, w }) => {
      acc[v] = professions[v]
      acc[v].weight = w
      return acc
    }, {}),
    used: actors,
    current: community.filter(({ v }) => professions[v].unique && used.has(v)).map(({ v }) => v),
    constraints: { coastal, kingdom, leadership, capital, war }
  })
  return selected
}

export const PROFESSION = {
  actors: (place: ActorSpawnParams['place']) =>
    place.locals?.map(i => window.world.actors[i]) ?? [],
  lookup: professions,
  random: (place: ActorSpawnParams['place']) => professionRandom(place),
  spawn: (params: Pick<ActorSpawnParams, 'profession' | 'place' | 'gender'>) => {
    const { place, gender } = params
    const key = params.profession ?? PROFESSION.random(place)
    const profession = PROFESSION.lookup[key]
    const province = HUB.province(place)
    const title = !profession.title
      ? key
      : typeof profession.title === 'string'
      ? profession.title
      : typeof profession.title === 'function'
      ? profession.title({ province, gender })
      : profession.title[gender]
    return {
      key,
      title: window.dice.spin(title),
      culture: profession.culture,
      age: window.dice.weightedChoice<LifePhase>(
        ages[profession.age] ?? [
          { v: 'young adult', w: 0.05 },
          { v: 'adult', w: 0.4 },
          { v: 'middle age', w: 0.45 },
          { v: 'old', w: 0.1 }
        ]
      )
    }
  }
}
