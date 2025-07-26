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
  shaman: { strata: 'middle', lifestyle: 'modest', unique: true, age: 'veteran' },
  'tribal elder': { strata: 'middle', lifestyle: 'modest', age: 'master' },
  'tribal warrior': { strata: 'lower', lifestyle: 'modest', martial: true },
  'tribal artisan': {
    title: 'artisan ({textiles|leather|woodcarver|culinary|pottery})',
    strata: 'lower',
    lifestyle: 'modest'
  },
  hunter: { strata: 'lower', lifestyle: 'poor', martial: true },
  forager: { strata: 'lower', lifestyle: 'poor' },
  herdsman: { strata: 'lower', lifestyle: 'poor' },
  'foreigner (merchant)': {
    strata: 'middle',
    age: 'veteran',
    unique: true,
    culture: 'foreign',
    lifestyle: 'comfortable'
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
    martial: true
  },
  bodyguard: { strata: 'middle', lifestyle: 'comfortable', martial: true },
  templar: {
    title: '{templar|inquisitor}',
    strata: 'middle',
    lifestyle: 'comfortable',
    official: true,
    martial: true
  },
  'master criminal': {
    title: '{master {assassin|thief|forger|smuggler}|brothel owner}',
    strata: 'middle',
    lifestyle: 'comfortable',
    age: 'veteran',
    martial: true
  },
  'criminal boss': { strata: 'middle', lifestyle: 'comfortable', age: 'veteran', martial: true },
  innkeeper: { strata: 'middle', lifestyle: 'comfortable' },
  priest: { strata: 'middle', lifestyle: 'comfortable', official: true },
  abbot: {
    title: { male: 'abbot', female: 'abbess' },
    age: 'veteran',
    strata: 'middle',
    lifestyle: 'comfortable',
    official: true,
    unique: true
  },
  lawyer: { strata: 'middle', lifestyle: 'comfortable', official: true },
  scholar: { strata: 'middle', lifestyle: 'comfortable' },
  sorcerer: {
    title: { male: 'sorcerer', female: 'sorceress' },
    strata: 'middle',
    lifestyle: 'comfortable'
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
  cobbler: { strata: 'middle', lifestyle: 'modest' },
  tailor: {
    strata: 'middle',
    lifestyle: 'comfortable',
    title: { male: 'tailor', female: 'seamstress' }
  },
  weaver: { strata: 'middle', lifestyle: 'modest' },
  brewer: { title: '{brewer|vintner|distiller}', strata: 'middle', lifestyle: 'comfortable' },
  leatherworker: { strata: 'middle', lifestyle: 'comfortable' },
  shipwright: { strata: 'middle', lifestyle: 'comfortable', constraints: { coastal: true } },
  jeweler: { title: '{jeweler|silversmith|goldsmith}', strata: 'middle', lifestyle: 'comfortable' },
  butcher: { strata: 'middle', lifestyle: 'modest' },
  baker: { strata: 'middle', lifestyle: 'modest' },
  herbalist: { title: '{herbalist|physician|apothecary}', strata: 'middle', lifestyle: 'modest' },
  alchemist: { strata: 'middle', lifestyle: 'comfortable' },
  artificer: { strata: 'middle', lifestyle: 'comfortable' },
  merchant: { strata: 'middle', lifestyle: 'comfortable' },
  banker: { strata: 'middle', age: 'veteran', lifestyle: 'prosperous' },
  'caravan trader': { strata: 'middle', culture: 'foreign', lifestyle: 'comfortable' },
  'caravan master': {
    strata: 'middle',
    lifestyle: 'prosperous',
    culture: 'foreign',
    age: 'veteran'
  },
  'ship captain': {
    strata: 'middle',
    lifestyle: 'comfortable',
    constraints: { coastal: true },
    age: 'veteran'
  },
  'dock master': {
    title: '{dock|harbor} master',
    strata: 'middle',
    lifestyle: 'comfortable',
    constraints: { coastal: true },
    age: 'veteran'
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
  oligarch: { strata: 'upper', lifestyle: 'rich', age: 'veteran', official: true },
  'crime lord': { strata: 'upper', lifestyle: 'prosperous', age: 'veteran', unique: true },
  magistrate: {
    title: `magistrate`,
    age: 'master',
    strata: 'upper',
    lifestyle: 'rich',
    unique: true,
    official: true
  },
  archmage: {
    title: '{archmage|court wizard}',
    strata: 'upper',
    lifestyle: 'rich',
    unique: true,
    age: 'master'
  },
  'high priest': {
    strata: 'upper',
    lifestyle: 'rich',
    unique: true,
    official: true,
    age: 'master'
  },
  'templar grandmaster': { strata: 'upper', lifestyle: 'rich', unique: true, age: 'master' },
  'general (military)': {
    strata: 'upper',
    lifestyle: 'rich',
    unique: true,
    constraints: { war: true },
    martial: true,
    age: 'master'
  },
  'exiled pretender': { strata: 'upper', lifestyle: 'rich', unique: true, culture: 'foreign' },
  ethnarch: {
    strata: 'upper',
    lifestyle: 'prosperous',
    unique: true,
    age: 'master',
    culture: 'foreign'
  },
  diplomat: {
    title: '{diplomat|ambassador}',
    strata: 'upper',
    lifestyle: 'rich',
    unique: true,
    age: 'veteran',
    culture: 'foreign'
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
    age: 'novice'
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
    { v: 'foreigner (merchant)', w: 0.05 }
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
    { v: 'crime lord', w: 0.1 },
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
  const community = communities[place.population > 1e3 ? 'urban' : 'rural']
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
