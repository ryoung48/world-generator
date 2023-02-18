import { BackgroundDetails } from '../types'
import { Wilderness } from './types'

export const backgrounds__wilderness: Record<Wilderness, BackgroundDetails> = {
  'abandoned village': {
    tag: 'abandoned village',
    type: 'wilderness',
    context: `Wilderness villages tend to be unstable “gold rush” settlements in the best of times, attracting those who lack any sound place elsewhere. This village failed as rapidly as it was formed after being {overrun by marauders|depopulated by disease|hollowed out by a failed harvest|torn apart by civil strife|abandoned for better prospects elsewhere}.`,
    enemies: [
      { alias: `Bandit {chief|sorcerer} responsible for the ruin` },
      { alias: `Crazed village head turned hermit` },
      { alias: `Monstrous entity nesting in the remains`, monstrous: true }
    ],
    friends: [
      { alias: `Last stubborn holdout` },
      { alias: `Lord's bailiff looking for answers` },
      { alias: `Hapless pioneer who's arrived to an empty ruin` }
    ],
    complications: [
      `It's now populated by something ({wilder|cursed|eldritch})`,
      `It was built on top of a place abandoned for good reason`,
      `The wilderness is reclaiming it in a dangerous way`
    ],
    things: [
      `a heirloom left behind in the flight`,
      `buried treasure of the villagers`,
      `the relic that caused the ruin`
    ],
    places: [
      `at an overgrown village meeting hall`,
      `at a home with everything left just as it was at that moment`,
      `at a burnt-out shrine to the local god`
    ]
  },
  'ancient guardians': {
    tag: 'ancient guardians',
    type: 'wilderness',
    context: `There are guardians in this site derived from some ancient polity. These guardians are {constructs built to protect some long-forgotten place here|the restless shades of the dead who once dwelled in the location} who {despise all "invaders"|are confused and believe interlopers are part of some ancient enemy group}. What they once guarded may not even exist any more in any perceptible way.`,
    constraints: { conflicts: ['automaton servants'] },
    enemies: [
      { alias: `Unrelenting golem leader`, monstrous: true },
      { alias: `Maddened sorcerer lord shade`, monstrous: true },
      { alias: `Sinister heir seeking to suborn the guardians to their service` }
    ],
    friends: [
      { alias: `Diplomatic guardian entity`, monstrous: true },
      { alias: `Greedy treasure hunter` },
      { alias: `Local who got trapped in the place` }
    ],
    complications: [
      `The guardians are to keep something in`,
      `A local group uses the guardians as a trap for outsiders`,
      `The guardians were never meant to be harmful, but what they do to intruders is very damaging`
    ],
    things: [
      `the key to {shut down|ward} off the guardians`,
      `the precious relic they were guarding`,
      `ritual garb that makes the wearer invisible to the guardians`
    ],
    places: [
      `at a place of ominously martial statuary`,
      `at a ghostly street-image of a vanished place`,
      `at a broken remnant of an ancient landmark`
    ]
  },
  'ancient monument': {
    tag: 'ancient monument',
    type: 'wilderness',
    context: `A grand monument to some ancient polity is found here. While its actual meaning and significance may be inscrutable, it's big enough to dominate the surrounding area, even though it has {collapsed|been defaced by the ages}. {The remains of the civilization that raised it can be found at its base, along with whatever heirs to it remain|This monument still has active {enchantments|guardians} to prevent further defacement}.`,
    constraints: { conflicts: ['cryptic art', 'sculpted terrain'] },
    enemies: [
      { alias: `Zealous modern cultist of the vanished polity` },
      { alias: `Last bitter heir of them` },
      { alias: `Vile monster that nests in the monument`, monstrous: true }
    ],
    friends: [
      { alias: `Eager archaeologist` },
      { alias: `Weary hereditary keeper of the place` },
      { alias: `Friendly creature that's made the monument a home`, monstrous: true }
    ],
    complications: [
      `The monument has a powerful enchantment that greatly impacts the surrounding area`,
      `The monument served a {secular|residential} purpose`,
      `The bulk of the monument is underground`
    ],
    things: [
      `costly {decorations|ornaments} on the monument`,
      `the precious core of the work`,
      `ancient offerings made to it by vanished supplicants`
    ],
    places: [
      `at the base of the towering monument`,
      `amid the cyclopean wreckage of its fall`,
      `near the secret passages within the monument`
    ]
  },
  'bandit lair': {
    tag: 'bandit lair',
    type: 'wilderness',
    context: `Bandits lair in this patch of wilderness at the outskirts of civilization ({hidden cave|{subverted|cowed} village|remote monastery|temporary encampment}).{| It is a seasonal lair, with local peasants turning bandit at certain profitable times of the year.}`,
    enemies: [
      { alias: `Ruthlessly pragmatic bandit chief` },
      { alias: `Wealthy grandee wielding the bandits against rivals` },
      { alias: `Heartless slaver gathering stock` }
    ],
    friends: [
      { alias: `Hapless missionary of a kinder way` },
      { alias: `Local taken as a slave` },
      { alias: `Runaway bandit who repents` }
    ],
    complications: [
      `They have a traditional prey and don't usually rob others`,
      `They're the degenerate remnants of a once-noble cause`,
      `They're a confederacy of thieving groups that often quarrel`
    ],
    things: [
      `loot taken from a recent success`,
      `a priceless heirloom owned by a noble-turned-bandit`,
      `a precious relic the bandits don't realize is so valuable`
    ],
    places: [
      `at a raucous glade full of drink and debauchery`,
      `at a repurposed estate`,
      `at a makeshift palisaded camp`
    ]
  },
  'beast nests': {
    tag: 'beast nests',
    type: 'wilderness',
    context: `This stretch of wilderness is infested with a particular type of predator.`,
    constraints: { conflicts: ['twisted fauna'] },
    enemies: [
      { alias: `Supernaturally intelligent god-beast`, monstrous: true },
      { alias: `Mad wizard who spawned them` },
      { alias: 'Brutish rural menagerie-owner' },
      { alias: 'Lycanthropic pack leader', monstrous: true }
    ],
    friends: [
      { alias: `Victim of a beast attack` },
      { alias: `Animal collector on a mission` },
      { alias: `Hunter in search of vengeance` },
      { alias: 'Wood-wise hermit' }
    ],
    complications: [
      `The beasts are usually harmless, but have recently changed`,
      `The beasts are the only thing holding a worse peril back`,
      `The beasts gain magical powers in sufficiently large groups`,
      'The beasts are tiny, but lethal swarm creatures'
    ],
    things: [
      `a poison that is very lethal to the beasts`,
      `a relic that can control the beasts`,
      `a priceless treasure held by a luckless hunter`
    ],
    places: [
      `at the site of a bestial massacre`,
      `in the fetid den of a swarm`,
      `at an overrun hunter's camp`
    ]
  },
  'broken infrastructure': {
    tag: 'broken infrastructure',
    type: 'wilderness',
    context: `There is a ruin here that once enabled some grand ancient infrastructure ({magical gate nexus|weather control station|underground transit station|irrigation control center|occult communications center}). The ruin has been unusable for ages, but remnants of its former function can still be found in the surroundings.`,
    enemies: [
      { alias: `Sorcerer looting the wreckage` },
      { alias: `Monstrous remnant of the former {inhabitants|guardians}`, monstrous: true },
      { alias: `Modern parasite-monster come to feed on the scraps`, monstrous: true }
    ],
    friends: [
      { alias: `Curious arcane student` },
      { alias: `Hermit who lives in the ruin` },
      { alias: `Wayfarer forced to seek refuge there` }
    ],
    complications: [
      `It still works, but in a dangerous and unhelpful way`,
      `It would cause a tremendous local disaster if it were re-activated`,
      `The locals are exploiting it in an unintended fashion`
    ],
    things: [
      `the control key for the original function`,
      `a relic related to the original function that does something magical`,
      `a precious component from it`
    ],
    places: [
      `at a long-ruined control nexus`,
      `at a collapsed {service|operational|industrial} area`,
      `near the surrounding area scarred by the decayed remnants of its function`
    ]
  },
  chokepoint: {
    tag: 'chokepoint',
    type: 'wilderness',
    context: `There's a natural choke point in this area: a {mountain pass|river crossing|safe passageway}. Such valuable, defensible areas are rarely left unoccupied.`,
    constraints: { conflicts: ['perilous path', 'remnant road'] },
    enemies: [
      { alias: `Bandit lord who "taxes" passersby` },
      { alias: `Monstrous creature who hunts there`, monstrous: true },
      { alias: `Ancient guardian of a long-dead polity`, monstrous: true }
    ],
    friends: [
      { alias: `Trader in dire need` },
      { alias: `Explorer seeking a better way` },
      { alias: `Local currently inhabiting the chokepoint` }
    ],
    complications: [
      `It can be {opened|blocked} by a controller`,
      `It's only recently become abnormally dangerous`,
      `It's known of only by those who want it kept secret`
    ],
    things: [
      `a map of the passage`,
      `a token allowing safe passage`,
      `a key to controlling the passage`
    ],
    places: [
      `at the perfect ambush site`,
      `at a natural fortress`,
      `at a high observation point commanding the pass`
    ]
  },
  'criminal meet': {
    tag: 'criminal meet',
    type: 'wilderness',
    context: `This site is used as a meeting place for smugglers, bandits, illegal slavers, fences, and other criminals. This location gives them a good view of any incoming strangers and discreet privacy for their dealings. These criminals are {known to be particular, dealing only with known associates|far enough from the law to feel comfortable about trading with adventurers}.`,
    enemies: [
      { alias: `Corrupt merchant grandee` },
      { alias: `Sinister black market boss` },
      { alias: `Monstrous entity that enforces the meet's peace`, monstrous: true }
    ],
    friends: [
      { alias: `Theft victim searching for their goods` },
      { alias: `Frustrated local lawman` },
      { alias: `Merchant with suspicions about a fence` }
    ],
    complications: [
      `The local authorities turn a knowing blind eye to it`,
      `The meet is trading in something much worse than everyone thinks it is`,
      `Significant amounts of stolen goods are stored there`
    ],
    things: [
      `valuable smuggled contraband`,
      `a cache of stolen goods`,
      `a precious object that's very hard to fence`
    ],
    places: [
      `at a concealed cave storehouse`,
      `at a rocky observation point`,
      `at a sheltered glade in a thick forest`
    ]
  },
  'cryptic art': {
    tag: 'cryptic art',
    type: 'wilderness',
    context: `A vast ancient work of art has been raised here, back when the wilderness was not so wild ({statue|monument}, {stone|marble|crystalline|organic|light|sound|emotions}). The intended meaning of this art is incomprehensible to modern civilization and the structure is too {large|difficult} to harm for ordinary vandals or time to have erode it entirely.`,
    constraints: { conflicts: ['ancient monument', 'sculpted terrain'] },
    enemies: [
      { alias: `Ancient site guardian`, monstrous: true },
      { alias: `Priest of a cult that's made a religion of the art` },
      { alias: `Sorcerer bent on using the art for malign purposes` }
    ],
    friends: [
      { alias: `Reckless art connoisseur` },
      { alias: `Native living in the artwork` },
      { alias: `Historian trying to decipher it` }
    ],
    complications: [
      `It has a {positive|negative} effect on a viewer's {body|mind}`,
      `It's been warped into something monstrous by time and decay`,
      `It is rumored to encode a {terrible|precious} secret to those who can understand it`
    ],
    things: [
      `ancient texts that can decode the art's meaning`,
      `a precious object used in its construction`,
      `a fragment of damaged art that's still valuable`
    ],
    places: [
      `at the intended viewing site for the art`,
      `in a churning inner mechanism of a complex work`,
      `in a hidden chamber revealing a different perspective of the work`
    ]
  },
  'decayed enchantment': {
    tag: 'decayed enchantment',
    type: 'wilderness',
    context: `There's an ancient enchantment in the area that is {broken|decayed}, and the original effect it was intended to produce has been twisted into something dangerous. Completely destroying the enchantment might end the problem or create an even greater disaster from the magical fallout.`,
    enemies: [
      { alias: `Enchantment-born abomination`, monstrous: true },
      { alias: `Ancient caretaker gone berserk`, monstrous: true },
      { alias: `Sorcerer tearing apart the enchantment recklessly for lore and parts` }
    ],
    friends: [
      { alias: `Native who knows how to live with the blight`, monstrous: true },
      { alias: `Ambitious would-be artificer` },
      { alias: `Curious scholar looking for details` }
    ],
    complications: [
      `The decay can be contained with {vile|costly} rituals by the locals`,
      `The decay is endured because it fends off outsiders`,
      `A local enemy wants to worsen the effect`
    ],
    things: [
      `parts to repair the enchantment`,
      `valuable magical byproducts`,
      `precious enchantment fragments`
    ],
    places: [
      `in a decaying enchantment chamber`,
      `at a site twisted by the magical effect`,
      `at a collapsed arcane structure`
    ]
  },
  'disused mine': {
    tag: 'disused mine',
    type: 'wilderness',
    context: `A mine of some kind once existed here, {but was recently abandoned due to an unknown catastrophe|it is a relic of a forgotten era with extremely materials}.`,
    enemies: [
      { alias: `Crazed illegal miner` },
      { alias: `Thing from delving too deep`, monstrous: true },
      { alias: `Undead and tireless mine boss`, monstrous: true }
    ],
    friends: [
      { alias: `Eager prospector` },
      { alias: `Native dwelling in the mines`, monstrous: true },
      { alias: `Ancient friendly mining automaton`, monstrous: true }
    ],
    complications: [
      `They were mining a buried civilization rather than ores`,
      `Groups are fighting over control of the mine`,
      `The mine was partially re-purposed for the needs of a group of natives`
    ],
    things: [
      `a treasure trove of precious materials`,
      `a storehouse of refined product`,
      `a map to an untouched corridor`
    ],
    places: [
      `in a massive pitch-black subterranean gallery`,
      `at a mound made of centuries worth of tailings`,
      `at a still-poisoned land in a processing waste zone`
    ]
  },
  'enchanted wreckage': {
    tag: 'enchanted wreckage',
    type: 'wilderness',
    context: `A enchanted edifice was built in this area, but has long since {collapsed|decayed}. While the enchantment's original effect has long dissipated, {pockets|fragments} of it still persist in the area, along with the servitors once charged with maintaining the site.`,
    enemies: [
      { alias: `Animated manifestation of the edifice's power`, monstrous: true },
      { alias: `Sorcerer-looter gutting the wreck` },
      { alias: `Brutal chief of the natives mutated by its power` }
    ],
    friends: [
      { alias: `Scholar dreaming of activating it once more` },
      { alias: `Treasure-hunter eager to pick its bones` },
      { alias: `Local from the surviving caretakers` }
    ],
    complications: [
      `It would cause a regional catastrophe if reactivated`,
      `Even its remnant effects have large consequences`,
      `It was ruined when it was repurposed to create a different effect`
    ],
    things: [
      `the key to controlling its remaining power`,
      `a spare part that's now priceless`,
      `a valuable fragment of wreckage`
    ],
    places: [
      `in an abandoned control room`,
      `at a site of massive destruction from the edifice's collapse`,
      `at a {nest|lair} built into the ruin `
    ]
  },
  'healing terrain': {
    tag: 'healing terrain',
    type: 'wilderness',
    context: `This site borders a shrinking cursed wilderness, one being slowly driven back by the work of {civilized hands|some native life form that's capable of successfully competing with the corruption}. Pioneers have arrived to work the newly-arable land and scavengers plunder the ruins that the receding tide reveals.`,
    enemies: [
      { alias: `Furious and frustrated sorcerous creator of the wastes` },
      { alias: `Monstrous beast in too small a hunting ground`, monstrous: true },
      { alias: `Local tyrant seeking dominion over the new pioneers` }
    ],
    friends: [
      { alias: `Brave new {colonist|treasure hunter}` },
      { alias: `Earnest professional mender of wastes` },
      { alias: `Luckless soldier sent to defend the new locals` }
    ],
    complications: [
      `The shrinking wastes are revealing a lost city below`,
      `As the waste shrinks its effects are getting more concentrated inside it`,
      `The receding zone is opening a safe path for old enemies to strike the new holdings`
    ],
    things: [
      `treasures long lost within the waste`,
      `possessions cherished by a now-dead pioneer`,
      `a precious product of the alien flora that now grows scarce`
    ],
    places: [
      `at a half-warped glade where corrupted life is losing`,
      `at a newly-built steading`,
      `at an exposed ancient structure`
    ]
  },
  hermitage: {
    tag: 'hermitage',
    type: 'wilderness',
    context: `A small hermitage was established here sometime in the past to provide solitude for some ascetic. This hermit discourages visitors who aren't also devotees of their path, but nonetheless attracts occasional pilgrims seeking wisdom.`,
    enemies: [
      { alias: `Hermit sorcerer gone mad` },
      { alias: `Sinister villain hiding as a hermit` },
      { alias: `Wilder hermit with inscrutably evil philosophical principles`, monstrous: true },
      { alias: 'Monstrous foe who has slain the hermit', monstrous: true }
    ],
    friends: [
      { alias: `Worried relative of a new hermit`, relative: true },
      { alias: `Petitioner seeking holy help` },
      { alias: 'Local who has not heard from the hermit in some time' }
    ],
    complications: [
      `The hermit has control over a local magical {energy|enchantment}`,
      `They keep themselves separate to keep others safe from them and their irrepressible powers`,
      `The hermit is hated by the local secular authorities for their aid to its foes`
    ],
    things: [
      `a precious religious relic carried by the hermit`,
      `a cast-off worldly wealth`,
      `a map to finding them`,
      "a relic of the hermit's old life"
    ],
    places: [
      `at an austere wilderness cave`,
      `at a hermit hole in a grave mound in the swamps`,
      `at a tall and narrow stone column for sitting on`
    ]
  },
  'hostile stronghold': {
    tag: 'hostile stronghold',
    type: 'wilderness',
    context: `This patch of wilderness hosts a stronghold filled with hostiles. The natives are heavily militarized and act with far more discipline than usual for their kind. The site has been well-fortified and procedures are in place for alarms.`,
    enemies: [
      { alias: `{Rebel|Bandit} leader` },
      { alias: `Reclusive ethnic supremacist` },
      { alias: `{Ideological|Depraved} {wilder|vampiric} warlord`, monstrous: true }
    ],
    friends: [
      { alias: `Aspiring infiltrator` },
      { alias: `Traitor within their ranks` },
      { alias: 'Plotter seeking replacement of the current leader' },
      { alias: 'Suspicious local lord' }
    ],
    complications: [
      `The presence of the stronghold is holding back a threat to the nearby villages`,
      `The natives still dread an enemy that has been gone for generations`,
      `The site's ruler sells his peoples' favor to the highest bidder among the local lords`
    ],
    things: [
      `a map of the site's defenses`,
      `a carefully-guarded treasure`,
      `the payroll for mercenaries`,
      'a key to the inner vault'
    ],
    places: [
      `at a cavernous cistern`,
      `at a high tower overlook`,
      `at a well-stocked armory`,
      `at a dreaded dungeon filled with prisoners`,
      'at a well-trod training ground'
    ]
  },
  'isolated academy': {
    tag: 'isolated academy',
    type: 'wilderness',
    context: `A school of {sorcerers|esoteric artists|hermit-scholars} resides in this area. The place {was once the heart of the ancient city where the academy was founded|has special {magical|aesthetic} traits that attract practitioners|studies a topic that is abhorrent to civilization}. The academy is largely self-sufficient, but its students and teachers doubtless retain some ties to the outer world.`,
    enemies: [
      { alias: `Sinister headmaster` },
      { alias: `Powerful instructor with a dark purpose` },
      { alias: `Monstrous thing the academy serves`, monstrous: true }
    ],
    friends: [
      { alias: `Sympathetic young student` },
      { alias: `Pilgrim aspiring to be admitted` },
      { alias: `Harried instructor needing help` }
    ],
    complications: [
      `It has two curricula with the second being much darker and known only to initiates`,
      `It's protected by its terrible patron power`,
      `An awful sacrifice is demanded of {some|all} students`
    ],
    things: [
      `a tome of secret lore they've developed`,
      `a magical object they've created`,
      `a key to bypassing the academy's defenses`
    ],
    places: [
      `in a mundanely-impossible lecture hall`,
      `at an artistic work of inhuman nature`,
      `at a site scorched and blasted by their {mistakes|training errors}`
    ]
  },
  'labyrinthine tangle': {
    tag: 'labyrinthine tangle',
    type: 'wilderness',
    context: `The terrain is remarkably tangled and treacherous, such that it's almost impossible to cross it without a guide or very good map.`,
    enemies: [
      { alias: `Sinister master of the labyrinth` },
      { alias: `Monstrous creature born of the wild`, monstrous: true },
      { alias: `Savage exile hiding in the maze` }
    ],
    friends: [
      { alias: `Helpful local guide` },
      { alias: `Hapless soul lost within it` },
      { alias: `Friendly native of the maze`, monstrous: true }
    ],
    complications: [
      `Getting lost in it can leave you very far from your entry point`,
      `An environmental hazard harms you more the longer you stay in it`,
      `Guides sacrifice certain clients to the powers within`
    ],
    things: [
      `a map of the labyrinth`,
      `a treasure lost by a victim within it`,
      `a precious object that the labyrinth guards`
    ],
    places: [
      `at several identical-looking locations`,
      `at the Heart of the maze`,
      `in an ancient mega-structure with perfectly identical massive decorative fragments that form a maze`,
      'in an overgrown hedge-maze of an abandoned villa'
    ]
  },
  'lost battlefield': {
    tag: 'lost battlefield',
    type: 'wilderness',
    context: `A terrible battle was fought here at some point in the past{|, long before the wilderness became what it is now}. {Few locals remember the event|The details of the event are long forgotten}, but the battle left a pronounced effect on the area.`,
    enemies: [
      { alias: `Looter-archaeologist and #possessive# minions` },
      { alias: `Undying warlord`, monstrous: true },
      { alias: `Relentless ancient automaton`, monstrous: true }
    ],
    friends: [
      { alias: `Curious scholar from afar` },
      { alias: `Heir to one of the warring sides` },
      { alias: `Ancestral caretaker of the field`, monstrous: true }
    ],
    complications: [
      `The battle is reenacted by locals {ritually|in earnest} every so often`,
      `A priceless item of ruling regalia was lost here`,
      `The battlefield's full of unexploded ancient munitions`
    ],
    things: [
      `a potent weapon of ancient days`,
      `a precious treasure carried here by a slain noble warrior`,
      `the bones of a sainted hero revered by the locals`
    ],
    places: [
      `at a hasty and makeshift tomb of a war leader`,
      `near land churned up by ancient war magic`,
      `at a vast burial mound amid a bleak plain`
    ]
  },
  'lost city': {
    tag: 'lost city',
    type: 'wilderness',
    context: `There was a city here once and its remnants can still be found through the overgrowth. This community was {an ancient city of some lost empire, forgotten by all but the wisest scholars|recently destroyed and consumed by the surrounding wilderness}. This site is incredibly dangerous and difficult to reach.`,
    enemies: [
      { alias: `The terrible creature that destroyed it`, monstrous: true },
      { alias: `Vengeful wraith of its last ruler`, monstrous: true },
      { alias: `Savage chieftain who's taken it for #possessive# seat of rule` }
    ],
    friends: [
      { alias: `Shy survivor of the original population` },
      { alias: `Local native who dares to enter it` },
      { alias: `Ancient city servitor who still functions`, monstrous: true }
    ],
    complications: [
      `The city is plagued with magical aftershocks of the mighty sorcery that destroyed it`,
      `The city was smashed before its inhabitants could do a great evil`,
      `It's taboo ground for the nearby locals`
    ],
    things: [
      `an ancient city vault's treasure`,
      `a precious relic of the dead`,
      `a fragment of the thing that ruined it`
    ],
    places: [
      `on a desolate street half-buried by earth and decay`,
      `at a city monument worn into illegibility`,
      `at the catastrophic wreckage of the city`
    ]
  },
  'magical springs': {
    tag: 'magical springs',
    type: 'wilderness',
    context: `There's an enchanted spring in the area, one {empowered by an ancient enchantment|warped by ambient currents of magic}. The creatures that drink from it might be blessed with some special grace, but it's just as likely that some more sinister consequence comes from imbibing its water. The animal and plant life around it have doubtless been substantially altered by its effects. The spring water loses its powers if separated from the main body for very long.`,
    enemies: [
      { alias: `Beast warped by the spring's power`, monstrous: true },
      { alias: `Ruthless sorcerer experimenting with its effects` },
      { alias: `Barbaric chieftain using it to advance #possessive# power` }
    ],
    friends: [
      { alias: `Ancestral guardian of the spring` },
      { alias: `Pioneer plagued by the spring's effects` },
      { alias: `Scholar who thinks they can fix any negative effects of the spring` }
    ],
    complications: [
      `The spring grants a blessing that comes with a substantial cost`,
      `The spring's blessing becomes a curse when over-imbibed`,
      `The spring's created an entire ecosystem of servitor-addicts`
    ],
    things: [
      `a cure for the changes the spring forces`,
      `a vVessel that can hold the spring water without losing its power`,
      `a precious fragment of the original enchantment`
    ],
    places: [
      `at a pool of obviously uncanny water`,
      `at a shore marked with the spring's effects`,
      `in a weird den of a spring touched beast`
    ]
  },
  'migration path': {
    tag: 'migration path',
    type: 'wilderness',
    context: `A fearsome migration of dangerous creatures crosses this area at certain times of the {month|year}. During this migration, an invincible wave of these entities crosses the site to move from one feeding site to the next. Despite this, there must be something valuable in this area that tempts outsiders to risk being here when the living tide arrives.`,
    enemies: [
      { alias: `Monstrously huge alpha of the tide`, monstrous: true },
      { alias: `Cultist who worships the creatures of the tide` },
      { alias: `Sorcerer trying to bend the swarm to their will` }
    ],
    friends: [
      { alias: `Treasure seeker daring the migration schedule` },
      { alias: `Scholar of these beasts` },
      { alias: `Local trapped here at the wrong time` }
    ],
    complications: [
      `The tide's schedule is dangerously unpredictable`,
      `The creatures are always present, but only become dangerous during the migration`,
      `The migration path changes very often`
    ],
    things: [
      `a precious animal byproduct of the swarm`,
      `the treasure found by a too-slow seeker`,
      `the key to {predicting|controlling} the swarm`
    ],
    places: [
      `on a trail stripped bare by the tide`,
      `at a massive breeding ground`,
      `at an island full of cowering refugees`
    ]
  },
  'military outpost': {
    tag: 'military outpost',
    type: 'wilderness',
    context: `There's a military post located in this wilderness, one planted by an interested {government|community|religion|mercantile group}. It {guards a trail through the wilds|monitors dangerous natives|acts as a tripwire against invasion|serves as a punishment post for troublesome officers}.`,
    enemies: [
      { alias: `Brutal martinet commander` },
      { alias: `Wrathful native leader` },
      { alias: `Crime boss who's suborned the isolated post` }
    ],
    friends: [
      { alias: `Hard-used military scout` },
      { alias: `Pioneer searching for help` },
      { alias: `Native leader looking for allies` }
    ],
    complications: [
      `The outpost has sparked a dispute with a bordering polity`,
      `The post is so isolated it's effectively independent`,
      `The post has been {abandoned|cut off} by its patron and is in dire need of supply`
    ],
    things: [
      `a load of vital supplies`,
      `a way to pay for the soldiers`,
      `a lost weapon shipment craved by the natives`
    ],
    places: [
      `at a rough-hewn log fort`,
      `at a piled stone stronghold on a naturally-defensible site`,
      `at a tall wooden tower looking over the countryside`
    ]
  },
  'monstrous beast': {
    tag: 'monstrous beast',
    type: 'wilderness',
    context: `Fearsome beasts are a commonplace in the trackless wilds, but there's something here horrible enough to be remarkable even to the natives.`,
    constraints: { conflicts: ['terrible beast', 'wanted outlaw'] },
    enemies: [
      { alias: `Magical abomination born of ancient sorcery`, monstrous: true },
      { alias: `Divinely-infused god-beast`, monstrous: true },
      { alias: `Remnant-creature of a dead empire that still fulfills its duty`, monstrous: true }
    ],
    friends: [
      { alias: `Glory-seeking hunter` },
      { alias: `Local with a lust for vengeance against it` },
      { alias: `Fascinated arcane zoologist` }
    ],
    complications: [
      `The locals worship it as a god because it actually can and will help them at times`,
      `It's guarding a particular site there`,
      `Its {leavings|sheddings} are a precious substance`
    ],
    things: [
      `the treasure of some luckless victim`,
      `a relic of the beast's makers`,
      `a {substance|device} that can repel the beast`
    ],
    places: [
      `at the site of a horrible slaughter`,
      `in a monstrous lair full of remains`,
      `at a gory offering-site where sacrifices are made to it`
    ]
  },
  motherlode: {
    tag: 'motherlode',
    type: 'wilderness',
    context: `Some precious resource is in great supply here ({rare wood|rare ore|magical elixir|arcanely-potent extract}). Anyone capable of extracting it without interruption would become very wealthy, though {the natives|the local faun|rival competitors} make that ambition difficult to fulfill. The resource is known {only to the natives|to no one at all due to its {concealment|exotic nature}}.`,
    enemies: [
      { alias: `Prospector devoid of moral qualms` },
      { alias: `Existing site owner who's lethally paranoid` },
      { alias: `Local lord who intends to utterly exploit the eventual site owner` }
    ],
    friends: [
      { alias: `Humble laborer in the extraction site` },
      { alias: `Poor, but talented surveyor` },
      { alias: `Land-wise local who knows of it` }
    ],
    complications: [
      `The substance is very hazardous to the extractor`,
      `Extracting it would break a very powerful local monopoly`,
      `It was {buried|sealed away} for a very good reason`
    ],
    things: [
      `a sample proving the resource's worth`,
      `ancient tools that make extraction practical`,
      `capital needed to begin extraction`
    ],
    places: [
      `at the dangerous extraction site itself`,
      `at a cave where prior extractors stored their equipment`,
      `at a makeshift barracks where the laborers sleep`
    ]
  },
  'nomad camp': {
    tag: 'nomad camp',
    type: 'wilderness',
    context: `There's a regularly-used nomad camp site in the area, a stopping place for them and their kindred. This site is favored for its {proximity to water|defensible position|religious significance}. Depending on the time of year or current raiding activities the camp might be empty, but any random day presents some chance of a group of them seeking shelter here.`,
    enemies: [
      { alias: `Glory-hungry nomad raid leader` },
      { alias: `Leader who plans on turning #possessive# people into sedentary conquerors` },
      { alias: `Vision-maddened sorcerer-priest of the nomads` }
    ],
    friends: [
      { alias: `Peace-minded rival of the nomad leader` },
      { alias: `Local victim of their raids` },
      {
        alias: `Former owner of the structure ({military|economic|religious|residence}) they're now using as a camp`
      }
    ],
    complications: [
      `The nomads are raiders or traders as profit suggests`,
      `The nomads were forced to move into this area by some outside power`,
      `The camp is desperately needed by some local group for {practical|religious} reasons`
    ],
    things: [
      `loot hidden in the camp`,
      `a trophy taken by the raiders`,
      `the tribute offered up to win their mercy`
    ],
    places: [
      `in a once-splendid chamber now scuffed and defaced`,
      `at a vigilantly-guarded oasis`,
      `at a makeshift shrine to the nomad god `
    ]
  },
  'oceanic travel': {
    tag: 'oceanic travel',
    type: 'wilderness',
    context: `The PCs have been hired to accompany a seagoing vessel as protection on dangerous waters.`,
    constraints: { urban: true, coastal: true },
    enemies: [
      { alias: `Heartless pirate captain` },
      { alias: `Xenophobic wilder lord (aquatic)`, monstrous: true },
      { alias: `Vicious sea monster`, monstrous: true }
    ],
    friends: [
      { alias: `Honest sea captain` },
      { alias: `Sympathetic pirate captain` },
      { alias: `Brave explorer` },
      { alias: `Sympathetic aquatic wilder seeking allies`, monstrous: true }
    ],
    complications: [
      `The seas are wracked by regular storms`,
      `A mutiny breaks out aboard the ship`,
      `A plague ship is encountered along the way`
    ],
    things: [`buried treasure`, `a lost ruin location`, `safe passage through treacherous seas`],
    places: [`on the deck of a storm-swept ship`, `near a ship graveyard`, `near a vast coral reef`]
  },
  'overgrown tomb': {
    tag: 'overgrown tomb',
    type: 'wilderness',
    context: `A once-honored tomb lies here, {forgotten|lost} to the depredations of enemies. The structure is {elaborate enough to be a building in its own right|an excavation beneath some surface monument}. The tomb {houses a single glorious hero|is the resting place of an associated group({noble lineage|slain of a great battle|lost city's municipal ossuary})}.`,
    enemies: [
      { alias: `Long-trapped undead king`, monstrous: true },
      { alias: `Monstrous beast fat on old corpses`, monstrous: true },
      { alias: `Necromancer jealous of #possessive# prizes` }
    ],
    friends: [
      { alias: `Ancestral guardian of the tomb` },
      { alias: `Curious archaeologist` },
      { alias: `Last heir of the one entombed` }
    ],
    complications: [
      `It was originally a different structure turned into a mass grave due to emergency need`,
      `It's actually just a mass casualty incident in a structure`,
      `Someone's mining the dead for their remains`
    ],
    things: [
      `precious funerary offerings`,
      `regalia buried with a dead ruler`,
      `text containing secrets lost to the present day`
    ],
    places: [
      `at a crumbling monument to the dead`,
      `at a fallen-in grave site`,
      `at a forest of gravestones `
    ]
  },
  'perilous path': {
    tag: 'perilous path',
    type: 'wilderness',
    context: `A danger-laden passage {leads through an otherwise impenetrable obstacle|serves as the sole means of reaching some point of interest}.`,
    constraints: { conflicts: ['chokepoint', 'remnant road'] },
    enemies: [
      { alias: `Brutish warrior demanding a toll` },
      { alias: `Vicious monster lairing on the path`, monstrous: true },
      { alias: `Bandit chief lying in wait to ambush travelers` }
    ],
    friends: [
      { alias: `Helpful local path guide` },
      { alias: `Ancient maintenance laborer on the path`, monstrous: true },
      { alias: `Explorer seeking the path` }
    ],
    complications: [
      `The path is one-way only`,
      `The path has only recently opened up`,
      `The path can be controlled with a particular {key|relic}`
    ],
    things: [
      `a map of the path`,
      `an ancient relic used by the path's builders`,
      `a key to unlock the path`
    ],
    places: [
      `on a ancient trail leading through trackless wilderness`,
      `in a tunnel full of long-forgotten defensive traps`,
      `on a arcane pathway through an eldritch wilderness`
    ]
  },
  'pilgrimage site': {
    tag: 'pilgrimage site',
    type: 'wilderness',
    context: `There is an important {monument|place|structure} here that attracts pilgrims from far away. It is {a venerable holy site of a local faith|a mythic origin point for a nearby culture|the residence of an oracle}. The site is {under the control of a local government|too {distant|dangerous} to be effectively {protected|administered} by outsiders}.`,
    enemies: [
      { alias: `Raider chieftain plundering the pilgrims` },
      { alias: `Zealot who has seized control of it for their own sect` },
      {
        alias: `Once-benevolent holy entity that has become hostile for unknown reasons`,
        monstrous: true
      }
    ],
    friends: [
      { alias: `Desperate pilgrim from afar` },
      { alias: `Local administrator beset by woes` },
      { alias: `Merchant providing for the pilgrims' needs` }
    ],
    complications: [
      `Factions are actively struggling over the site's control`,
      `The site is being ruined by the pilgrim traffic`,
      `The site has a strategic value quite aside from its use to pilgrims`
    ],
    things: [
      `a sacred relic of the site`,
      `an offering given by a grateful pilgrim`,
      `a token that grants access to the site's most potent reward`
    ],
    places: [
      `at an ancient temple on the holy site`,
      `at the monument to a great deed`,
      `at the perilous cave of a mystic`
    ]
  },
  'precious game': {
    tag: 'precious game',
    type: 'wilderness',
    context: `Some native fauna here is {remarkably valuable for the sake of rare extracted reagents|ritually important as it grants some ruling legitimacy to a successful hunter}. This creature is {so rare that it is thought to be extinct by most outsiders|protected outside of sanctioned hunts|incredibly dangerous and poses great risk to hunters}.`,
    enemies: [
      { alias: `Bloodthirsty {hunter|poacher} who brooks no rivals` },
      { alias: `Game animal grown warped and lethal`, monstrous: true },
      { alias: `Guardian of the game who kills all interlopers` }
    ],
    friends: [
      { alias: `Sympathetic hunter with a good reason` },
      { alias: `Local deeply reliant on successful hunting` },
      { alias: `Priest trying to protect a sacred beast` },
      { alias: `Zoologist seeking to study the beast` }
    ],
    complications: [
      `The benefit of hunting the game is only granted if they are {captured|slain} in a very troublesome way`,
      `The animals are found around a different much more dangerous beast`,
      `The beasts have multiple life stages with different traits`,
      'The animals are holy to a local faith'
    ],
    things: [
      `a trove of extracted reagents`,
      `a lure for the beasts`,
      `a map to their secret breeding grounds`
    ],
    places: [
      `at a ramshackle hunting camp`,
      `at an altar to the beasts`,
      `at the magical site where the beasts were first made`
    ]
  },
  'rampant experiment': {
    tag: 'rampant experiment',
    type: 'wilderness',
    context: `Not every enchantment or spell research is a success, and some effort here went drastically wrong. {Rampantly overgrown flora|Monstrously altered fauna roam the place}, the result of magic gone awry. They have some {quality|trait} that was useful to the creator, but it was combined with so many {drawbacks|dangers} that the result is a menace.`,
    enemies: [
      { alias: `Mad sorcerer who caused it` },
      { alias: `Creature warped terribly by the experiment`, monstrous: true },
      { alias: `Looter with no regard for the chaos their blundering is releasing` }
    ],
    friends: [
      { alias: `Apologetic apprentice of the culprit` },
      { alias: `Non-hostile experimental victim` },
      { alias: `Local desperately fighting the experiments` }
    ],
    complications: [
      `An outside power is promoting the disaster because it's somehow to their advantage`,
      `The experiment results seem wholly beneficial at first`,
      `The experiment's area of effect is slowly growing`
    ],
    things: [
      `a {cure|tool} to halt the experiment`,
      `a precious object created by the experiment`,
      `a magical tool used in the experiment`
    ],
    places: [
      `in a sinister occult laboratory`,
      `at a normal area terribly warped by the experiment`,
      `at a local structure destroyed by the experiment`
    ]
  },
  'refugee camp': {
    tag: 'refugee camp',
    type: 'wilderness',
    context: `There's a refugee camp in the area made up of people who've fled some calamity ({bandit raids|ethnic purges|religious schism|arcane disaster|regional warfare}). The refugees have no better place to go or they'd have gone there by now. They are {{quickly|slowly} dying off to local hazards|trying to turn the camp into a functional settlement}.`,
    enemies: [
      { alias: `Brutal tyrant over the camp` },
      { alias: `Local marauder exploiting them` },
      { alias: `Horrible beast that hunts them`, monstrous: true }
    ],
    friends: [
      { alias: `Sympathetic refugee` },
      { alias: `Local governmental representative who can't help much` },
      { alias: `Earnest religious leader` }
    ],
    complications: [
      `The refugees are highly undesirable to the surrounding polities`,
      `A substantial portion of the refugees are wilders`,
      `The camp's a hotbed of some not-too quickly lethal, but very contagious disease`
    ],
    things: [
      `a vital cache of supplies`,
      `precious possessions of the refugees`,
      `a relic they {stole|rescued} in their flight`
    ],
    places: [
      `at a miserable camp of crude shanties`,
      `near damp refuge caverns`,
      `at an ancient ruin made into a camp`
    ]
  },
  'remnant road': {
    tag: 'remnant road',
    type: 'wilderness',
    context: `Some long-lost empire laid a road here, along with the waystations that once served to guard it. The surviving remnant {is just be a short segment|still leads to whatever destination of significance it once served}. Other ruins of this empire are positioned along the road, and {modern inhabitants occasionally still make use of it as a highway through rough terrain|have positioned their own settlements along its length}.`,
    constraints: { conflicts: ['chokepoint', 'perilous path'] },
    enemies: [
      { alias: `Ancient creature that guards the road from "bandits"`, monstrous: true },
      { alias: `Bandit chief exploiting a ruined waystation` },
      { alias: `Local lord who collects cruel tolls` }
    ],
    friends: [
      { alias: `Merchant making use of the path` },
      { alias: `Local from a colony-village set up at one end` },
      { alias: `Scholar studying the long-lost empire` }
    ],
    complications: [
      `The road is {magically useful|well-maintained}`,
      `The road leads through some tremendously dangerous area`,
      `The road is built as a high and stepped structure that forms a tall defensive wall on one side`
    ],
    things: [
      `a magical pass allowing use of the road`,
      `an ancient weapon stored in a waystation`,
      `a key to unlocking a waystation's vault`
    ],
    places: [
      `at an ancient watch station`,
      `on a Stretch of unnaturally perfect road`,
      `at a monument to a forgotten king`
    ]
  },
  'remote monastery': {
    tag: 'remote monastery',
    type: 'wilderness',
    context: `There is a largely self-sustaining {monastery|temple} in the area, one inhabited by clergy who are {guardians of a holy site|imprisoned heretics|wardens of some refuge for travelers|a particularly {rigorous|heretical} sect}. They may be willing to provide services for strangers of acceptable character, and might well have problems that their limited resources can't solve.`,
    enemies: [
      { alias: `Sinister-minded abbot` },
      { alias: `Demonic entity warring with the clerics`, monstrous: true },
      { alias: `Cleric of a rival {faith|sect} determined to destroy them and all their allies` }
    ],
    friends: [
      { alias: `Friendly if unworldly local cleric` },
      { alias: `Local who trades with the monastery` },
      { alias: `Cleric who seriously reconsiders their choice to come here` }
    ],
    complications: [
      `The monastery has been taken over by {zealots|an outside power}`,
      `The monastery is a cover for sinister occult doings`,
      `The place isn't nearly as self-sufficient as it thought it would be`
    ],
    things: [
      `a sacred relic of the place`,
      `an offering made by a grateful believer`,
      `a sacred text specific to their sect`
    ],
    places: [
      `near well-guarded fields outside the walls`,
      `at a heavily fortified monastic building`,
      `at a hostel for travelers kept outside the monastery itself`
    ]
  },
  'ruined fortification': {
    tag: 'ruined fortification',
    type: 'wilderness',
    context: `This place was of great strategic importance in some prior age, and a ruined {castle|outpost|waystation|fortress} can be found here. The site is {too remote|now of too little military value} to attract the interest of current governments, but it may still serve as an excellent lair for a more local tyrant or bandit lord.`,
    enemies: [
      { alias: `Failed usurper "ruling" from this new seat` },
      { alias: `Zealous rebel chief marshaling strength here` },
      { alias: `Ghostly shade of the fortress' last commander`, monstrous: true }
    ],
    friends: [
      { alias: `Local forced to take refuge here` },
      { alias: `Remnant survivor of the original garrison` },
      { alias: `Government agent sent to investigate the site for usability` }
    ],
    complications: [
      `The fortress was built to keep something in rather than out`,
      `Some political change has just made the site very valuable once more`,
      `The real bulk of the site is hidden from easy view`
    ],
    things: [
      `a key to open restricted areas of the site`,
      `a massive fixed weapon that still works`,
      `a precious trove guarded by the fortress`
    ],
    places: [
      `near a long-broken gate`,
      `at a wall slumped into a ramp`,
      `at a tower snapped halfway up`
    ]
  },
  'savage hamlet': {
    tag: 'savage hamlet',
    type: 'wilderness',
    context: `There's a village in the area, but its inhabitants {deal violently with outsiders|have abhorrent cultural habits|are the decadent remains of some group cast out for their evil ways}.`,
    enemies: [
      { alias: `Brutal village chieftain` },
      { alias: `Cruel shaman of a dark god` },
      { alias: `Non-native criminal who's gone native in a bad way` }
    ],
    friends: [
      { alias: `Rare better-tempered local` },
      { alias: `Missionary trying to civilize them` },
      { alias: `Local who sees profit in dealing with outsiders` }
    ],
    complications: [
      `They are remarkably {talented|learned} at some activity`,
      `They appear harmless at first encounter`,
      `They have considerable virtues to go with their terrible vices`
    ],
    things: [
      `a locally-produced good of value`,
      `loot from their victims`,
      `the tribute given by frightened neighbors`
    ],
    places: [
      `at a fighting pit for local entertainment`,
      `in a chieftain's barbaric hall`,
      `at an ancient structure put to misuse`
    ]
  },
  'sculpted terrain': {
    tag: 'sculpted terrain',
    type: 'wilderness',
    context: `In a former age, some {tyrant|artist} sculpted an entire landform here into a {statue|monument|work of art} that is visible for miles ({carved mountainside|molded hill|intricate pattern of waterways|mesa pierced with music-emitting tunnels}). This structure is rumored to have some form of defense to prevent vandalism, and may contain components that are very valuable in the present age.`,
    constraints: { conflicts: ['ancient monument', 'cryptic art'] },
    enemies: [
      { alias: `Priest of a sculpture-worshiping cult` },
      { alias: `Berserk guardian of the art`, monstrous: true },
      { alias: `Sorcerer who wishes to use the art to fuel a vile ritual` }
    ],
    friends: [
      { alias: `Courageous art-seeker` },
      { alias: `Artist desperately in search of inspiration` },
      { alias: `Treasure-hunter looking for the art's loot` }
    ],
    complications: [
      `The art is intermittently {mobile|active}`,
      `The art has some very dangerous effect`,
      `The art is damaged and now causes an unintended consequence nearby`
    ],
    things: [
      `a precious fragment of the art`,
      `a magical relic used by the art`,
      `regalia of the former keeper of the art`
    ],
    places: [
      `at a viewing-site built for the art`,
      `at a {damaged|defaced} area of the art`,
      `near the pilgrim quarters meant for those coming to see the art`
    ]
  },
  'seductive peril': {
    tag: 'seductive peril',
    type: 'wilderness',
    context: `There's a very appealing {place|resource|structure} in the area that's actually a dangerous snare for the unwary ({pools laced with poison|carnivorous flora|radioactive crystals|enthralling pleasure-pavilions}).{| Natives are rumored to {lurk near the peril to loot its victims|intentionally drive prey into it}.}`,
    enemies: [
      { alias: `Malevolent spirit of the peril`, monstrous: true },
      { alias: `Cruel looter who uses the peril as a tool` },
      { alias: `Experimenter looking to exploit the peril` }
    ],
    friends: [
      { alias: `{Companion|Friend} of a victim` },
      { alias: `Clueless seeker of the peril's treasure` },
      { alias: `Local who knows about the peril` }
    ],
    complications: [
      `Dangerous as it is, the peril does offer a very real reward`,
      `The peril is worshiped by locals`,
      `The danger is unintentional and related to the peril's original function`
    ],
    things: [
      `loot left by victims`,
      `a valuable component of the peril`,
      `bait placed to lure victims`
    ],
    places: [
      `at a hidden charnel pit for victims`,
      `at an enticingly charming facade`,
      `at a now-abandoned camp of former prey`
    ]
  },
  'taboo territory': {
    tag: 'taboo territory',
    type: 'wilderness',
    context: `Part of this area is strictly off-limits with local wardens on guard to dissuade trespassers. It is restricted to a {particular holy priesthood|local rulers|the heirs of a particular lineage|everyone}. The taboo is the product of {local religious beliefs|ruling edicts|a practical realization that intruders keep stirring up perils that the locals have to deal with}.`,
    enemies: [
      { alias: `The horrible thing within the territory`, monstrous: true },
      { alias: `Bandit chief taking advantage of the taboo to hide there` },
      { alias: `Ancient guardian of the domain`, monstrous: true }
    ],
    friends: [
      { alias: `Explorer lacking in caution` },
      { alias: `Accidental trespasser into the zone` },
      { alias: `Local who desperately needs something from inside the area` }
    ],
    complications: [
      `Entering the zone visibly marks trespassers for a time`,
      `A hostile force too strong for the warders is trying to get {in|out}`,
      `The taboo is rational, but the reason the locals have is badly mistaken`
    ],
    things: [
      `treasure un-plundered within the zone`,
      `the precious relic the taboo is meant to guard`,
      `valuable {plants|animals} that grows undisturbed within`
    ],
    places: [
      `at an ancient ruin untouched by intruders`,
      `at a watch post with a view of the site`,
      `at a sealed gate to the zone`
    ]
  },
  'tainted wilderness': {
    tag: 'tainted wilderness',
    type: 'wilderness',
    context: `There is a large pocket of cursed wilderness at the site. This pocket is {the last remnant of a formerly-great swath|a localized tumor created a {malevolent sorcerer|magical disaster}}.`,
    enemies: [
      { alias: `Hideously warped native creature`, monstrous: true },
      { alias: `Wilder marauder chief lairing inside`, monstrous: true },
      { alias: `Vile sorcerer responsible for the curse` }
    ],
    friends: [
      { alias: `Foolish explorer who tried to cross it` },
      { alias: `Local hunter harried by vicious beasts` },
      { alias: `Wretched slave taken by raiders` },
      { alias: `Local sorcerer trying to lift the curse` },
      { alias: `Not-too-homicidal native`, monstrous: true }
    ],
    complications: [
      `Local rustics sacrifice to the wilds to placate its denizens`,
      `The wilds are being contained by a potentially breakable object here`,
      `Locals know how to get through it safely`,
      `Exiles and criminals seek refuge there`
    ],
    things: [
      `equipment to survive the hostile atmosphere within`,
      `a precious occult relic`,
      `wealth seized by raiders from the wilds`,
      `a key to undoing the curse`
    ],
    places: [
      `in a blasted village overrun by alien life`,
      `at a warped and twisted natural feature`,
      `in a nest of misshapen beasts`,
      `at a field of grossly-mutated plant life`,
      `at a lake shore of a pool filled with a noxious chemical`
    ]
  },
  'toxic ruins': {
    tag: 'toxic ruins',
    type: 'wilderness',
    context: `There's a ruin in the area, but it's {poisonous|disease-infested}. There's something about the ruin that's attractive to others, and {the toxin isn't quick enough to make plundering an obviously futile effort|there exists {equipment|enchantments} that resist the toxin}.`,
    enemies: [
      { alias: `Toxin-warped beast within`, monstrous: true },
      { alias: `Sorcerer exploring the toxin's potential` },
      { alias: `Warlord who wants to weaponize the toxin` },
      { alias: `Cruel plunderer using expendable help to loot the site` }
    ],
    friends: [
      { alias: `Local who knows a cure for the toxin` },
      { alias: `Explorer trapped within the ruin` },
      { alias: `Native life form that's immune to the toxin`, monstrous: true }
    ],
    complications: [
      `The toxin was meant to contain a great evil sealed within`,
      `The toxin is not obvious and invisible to most trespassers`,
      `The toxin is exuded by the {substance|objects} that are most valuable in the ruin`
    ],
    things: [
      `{a cure|protection} from the poison`,
      `an incredibly toxic {weapon|object}`,
      `a damaged ancient relic that's causing the toxic effect`
    ],
    places: [
      `near the eerily barren land around the ruin`,
      `at a camp full of poisoned explorers`,
      `at a grove of unnatural life amid the toxic stew`
    ]
  },
  'treacherous terrain': {
    tag: 'treacherous terrain',
    type: 'wilderness',
    context: `A stretch of this area is naturally treacherous and dangerous in its terrain ({sinkholes|landslides|quicksand|explosive flora|arcane eruptions|plunging crevasses}). This terrain blocks the path toward some {interesting site|desired destination}.`,
    enemies: [
      { alias: `Malevolent nature-spirit of the place`, monstrous: true },
      { alias: `Vile outcast who lairs amid the terrain` },
      { alias: `Trapper of humans` },
      { alias: `Degenerate exiled noble` },
      { alias: `Monstrous beast native to the dangerous area`, monstrous: true }
    ],
    friends: [
      { alias: `Local guide who knows a way through` },
      { alias: `Explorer {fascinated|ensnared} by the terrain` },
      { alias: `Traveler forced to find a way through` }
    ],
    complications: [
      `The perils manifest on a particular little-known schedule`,
      `The perils sometimes uncover lodes of valuable materials`,
      `The perils are an accidental legacy of an ancient malfunction`,
      'The terrain is a refuge for bandits and worse'
    ],
    things: [
      `a map of the safe way through`,
      `an enchantment to protect against the peril`,
      `ancient treasure hidden within the peril`,
      'a precious medicinal plant'
    ],
    places: [
      `at a small safe zone inside the terrain`,
      `on a ruined {road|path} amid the peril`,
      `at the site of a camp destroyed by the peril `
    ]
  },
  'twisted fauna': {
    tag: 'twisted fauna',
    type: 'wilderness',
    context: `The fauna in the area has been warped by some power, and is now dangerous to other forms of life. It is the product of a {lingering curse|{sorcerous|cultist} manipulation|ancient artistic goals}.`,
    constraints: { conflicts: ['beast nests', 'vicious flora'] },
    enemies: [
      { alias: `Savage beast-tamer` },
      { alias: `Hideously intelligent god-beast`, monstrous: true },
      { alias: `The mad power that warped the beasts in the first place`, monstrous: true }
    ],
    friends: [
      { alias: `Native trying to cope with the fauna` },
      { alias: `Hunter determined to bag one` },
      { alias: `Scholar trying to find the cause of the change` }
    ],
    complications: [
      `The beasts are very {useful|valuable} in some way`,
      `The beasts were once humans`,
      `The beasts masquerade as normal animals`
    ],
    things: [
      `the loot of a victim of the beasts`,
      `the thing that changed them is a treasure itself`,
      `a trove coincidentally located in their territory`,
      `a beast-corrupting magical artifact`
    ],
    places: [
      `at the fetid lair of the beasts`,
      `at a grove scarred by their activities`,
      `at the tainted site that birthed them`,
      `in a {reeking|bloodstained} laboratory with cages and vivisection tables`
    ]
  },
  'uncanny weather': {
    tag: 'uncanny weather',
    type: 'wilderness',
    context: `The area is affected by {unnatural|magical} weather conditions ({everlasting storms|perpetual {summer|spring|autumn|winter}|exotic climate|ashen wastes}), {making it too hazardous for regular occupation|with natives having adapted to exploit this condition}.`,
    enemies: [
      { alias: `Ruthless sorcerer bent on unlocking its secrets` },
      { alias: `Monstrous beast that thrives in the environment`, monstrous: true },
      { alias: `Dangerous spirit that creates the phenomena`, monstrous: true }
    ],
    friends: [
      { alias: `Local who's learned to live in the zone` },
      { alias: `Refugee trying to hide in it` },
      { alias: `Entrepreneur trying to profit by it` }
    ],
    complications: [
      `The weather is controlled by a {site|object}`,
      `The change is very recent and is disrupting the locals`,
      `The weather leaves behind a valuable resource`
    ],
    things: [
      `an ancient weather-control relic`,
      `texts describing how to {stop|control} the weather`,
      `abandoned loot from the original inhabitants of the area`
    ],
    places: [
      `at a weather-blasted natural feature`,
      `at a structure built to endure the weather`,
      `at a relic building from before the weather happened `
    ]
  },
  'wilder tribe': {
    tag: 'wilder tribe',
    type: 'wilderness',
    context: `A tribe of wilders live in this patch of wilderness. They are {beings cursed with some trait that makes it impossible for them to live in civilization|extremely xenophobic and attack all outsiders}.`,
    enemies: [
      { alias: `Brutal wilder war-chief`, monstrous: true },
      { alias: `Outsider using them as living tools` },
      { alias: `Hunter bent on slaughtering inoffensive wilders` }
    ],
    friends: [
      { alias: `Native open to dealing with outsiders`, monstrous: true },
      { alias: `Kith trader who deals with them` },
      { alias: `Local kith who knows their ways` }
    ],
    complications: [
      `Their curse was once very useful to the ancient polity that existed here`,
      `They have a large number of kith {slaves|hostages} in there procession`,
      `They {were recently betrayed by kith allies|are victims of kith oppression who have fled civilization}`
    ],
    things: [
      `a valuable wilder-made product`,
      `relics of those who twisted them`,
      `trophies taken from their prey`
    ],
    places: [
      `at a kith structure reworked to fit their nature`,
      `at the site of a gruesome massacre`,
      `at a {shrine|monument} honoring their creators`
    ]
  },
  'vicious flora': {
    tag: 'vicious flora',
    type: 'wilderness',
    context: `This area has been infested by {a massive, sprawling organism that carpets the area|some form of mobile, intelligent plant-beast}.`,
    constraints: { conflicts: ['beast nests', 'twisted fauna'] },
    enemies: [
      { alias: `Fungal abomination`, monstrous: true },
      { alias: `Insidious pollen-zombie chief`, monstrous: true },
      { alias: `Primal wilderness spirit`, monstrous: true }
    ],
    friends: [
      { alias: `Local forester` },
      { alias: `Friendly wilderness spirit`, monstrous: true },
      { alias: `Wise old farmer` },
      { alias: 'Uninfected village member' }
    ],
    complications: [
      `The flora is valuable and cultivated with no thought of the cost to the workers`,
      `The plant has powerful psychotropic effects`,
      `The parasitic plants are quickly spreading across the land`
    ],
    things: [
      `a cure for the plant toxin`,
      `the relic empowering the plants`,
      `a powerful defoliant mixture`,
      'a precious plant extract'
    ],
    places: [
      `in a vine-wreathed village`,
      `in a maze of unnatural bracken`,
      `in a perfectly silent community of plant entities`,
      'at a pit of corpse-fertilizer'
    ]
  },
  'zealot colony': {
    tag: 'zealot colony',
    type: 'wilderness',
    context: `There is a settlement of radical {religious|ideological} zealots here, ones too extreme to be tolerated in civilized lands.`,
    enemies: [
      { alias: `Charismatic demagogue` },
      { alias: `Iron-fisted hereditary dictator` },
      { alias: 'Malign spirit masquerading as a prophet', monstrous: true }
    ],
    friends: [
      { alias: `Native who quietly wants out` },
      { alias: `Reformer trying to temper things` },
      { alias: `Relative of a now-trapped member` }
    ],
    complications: [
      `They've recently acquired an {object|alliance} that gives them great power`,
      `The ostensible leader is just a puppet of the real and more pragmatic boss`,
      `The denizens are beginning to spiral into violent factions`
    ],
    things: [
      `a desperately-necessary supply cache`,
      `the wealth given up for the group`,
      `a product manufactured by near-slave members`
    ],
    places: [
      `at a grand temple amid shanties`,
      `at a mass public meeting`,
      `at a prison for deviants `
    ]
  }
}
