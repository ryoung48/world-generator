// ^\b[A-Z][a-z]+\s[A-Z][a-z]+\b$
// ^(?![EFCTP] ).*(?<!###)$
// ^([EFCTP] )

import { HookTemplate } from '../types'

export const ruins: HookTemplate = {
  hooks: {
    'Abandoned Traps': {
      text: 'This ruin is crusted over with dangerous snares and security measures, the relics of some kind of internal struggle or an expected invasion that may never have come. Most of the traps are likely still functional, and the entire place might be a snare.',
      enemies: [
        { title: 'Golem trap-maintainer', monstrous: true },
        { title: 'Confused undead guardian', monstrous: true },
        { title: 'Vicious scavenger of trap victims', monstrous: true },
        { title: 'Creature that is an animate peril', monstrous: true }
      ],
      friends: [
        { title: 'Intrepid explorer' },
        { title: 'Curious engineer' },
        { title: 'Intruder too frightened to escape' },
        { title: 'Sage who knows the secret of the traps' }
      ],
      complications: [
        'The traps keep something in',
        'The traps are intelligent',
        'The traps have been suborned',
        'The “traps” were never meant to be'
      ],
      things: [
        'Key to deactivate traps',
        'Precious thing the traps guard',
        'Map of trap placement',
        'Magical protection from the traps'
      ],
      places: [
        'Innocent room',
        '“Obviously trapped statue” chamber',
        'False treasure cave',
        'Clearing littered with remains of victims',
        'Section visibly collapsed from trap mishap'
      ]
    },
    'Ancient Archives': {
      text: "The ruin once housed archives or information that would be very interesting to certain modern powers. The utility or value of this information should be obvious to the players, even if they're initially unaware of its existence. Known archival sites might have sealed their lore behind some fearsome guardian or a “puzzle” consisting of access procedures that were self-evident in the age it was constructed in.",
      enemies: [
        { title: 'Maddened archive keeper', monstrous: true },
        { title: 'Powerful figure who wants the information kept hidden' },
        { title: 'Secret-seeker who brooks no rivals' },
        { title: 'Fanatic convinced archives are heretical' }
      ],
      friends: [
        { title: 'Ghost librarian seeking to preserve the archives', monstrous: true },
        { title: 'Helpful ancient archive attendant', monstrous: true },
        { title: 'Hired investigator' },
        { title: 'Seeker of some related lore' }
      ],
      complications: [
        'The information is conveyed in idioms or forms that are no longer clear',
        'The information is very dangerous to know',
        'The information is buried in seas of irrelevant data that need navigating',
        'Archives are in a forgotten language requiring translation'
      ],
      things: [
        'Index to the desired information',
        'Crystal storing vast amounts of data',
        'Key to decoding the data',
        'Cultural work that elucidates the idioms or medium being used',
        'Journal of a previous explorer with important notes'
      ],
      places: [
        'Library full of not-book data storage items',
        'Scriptorium or other scribal zone',
        'Chamber related to the topic or field of the data involved',
        'Vault with layers of protective enchantments',
        'Chamber where knowledge is presented as vivid illusions'
      ]
    },
    'Aspiring Conqueror': {
      text: "Some power within the ruin has ambitions of conquest, and plans to use the site as a base for dominating the surrounding lands. Such a warlord might be wholly reliant on the ruin's denizens, or they could be recruiting minions from outcasts or renegades and so be willing to parley with adventurers. Not all the lieutenants of such leaders are always supportive of the plan.",
      enemies: [
        { title: 'Inhuman warlord', monstrous: true },
        { title: 'Fanatical cult leader' },
        { title: 'Embittered outlaw-noble' }
      ],
      friends: [
        { title: 'Hapless local village headman' },
        { title: 'Minion who reconsidered their allegiance' },
        { title: 'Former leader who was pushed aside by the new one' }
      ],
      complications: [
        'Some of the locals honestly think the conqueror would be a better ruler',
        'The conqueror actually has a legitimate claim on the land',
        'The conqueror is being backed by enemies of the local ruler'
      ],
      things: [
        'Cache of military supplies',
        'Plunder taken from their first victims',
        'Important hostage in their keeping',
        "Map of conqueror's planned invasion routes",
        'Evidence of conspiracy backing conqueror'
      ],
      places: [
        'Ruin barracks whipped into order',
        'Training field in use',
        "Nearby village they've crushed",
        'Temple or sanctum full of fanatical followers',
        'Bloody altar soaked in sacrifices',
        'Map room with invasion plans on display'
      ]
    },
    'Automaton Servants': {
      text: "The ruin is still staffed by automaton servants or other immortal minions. Aside from obviously robotic servitors, magical golems, bound spirits, undead thralls, uplifted beasts, or other subject species might be found here. Such minions are usually magically bound to their roles, which may be causing them significant problems if their roles can no longer be carried out. It's possible that some of them have reinterpreted their roles into something they can do, whether or not it's something they should do.",
      enemies: [
        { title: 'Cruel immortal artificer', monstrous: true },
        { title: 'Automaton leader gone mad', monstrous: true },
        { title: 'Outsider seeking to suborn them to their sinister service' }
      ],
      friends: [
        { title: 'Helpful automaton minion', monstrous: true },
        { title: 'Fascinated outside investigator' },
        { title: 'Local native who fears the minions' }
      ],
      complications: [
        'Scrapped automatons are worth a great deal',
        "The automatons are needed to maintain the ruin's basic physical stability",
        'The automatons have merged with or been altered by some outside power'
      ],
      things: [
        'Command key for the automatons',
        'Cache of valuable spare parts',
        'Item they desperately need in order to fulfill their function'
      ],
      places: [
        'Automaton maintenance area',
        'Bank of unmoving figures',
        'Place of endless automaton toil'
      ]
    },
    'Birthing Cyst': {
      text: "A horrible thing is growing in the ruin and will eventually erupt into some catastrophic peril or awful creature. The ruin may have been originally designed to facilitate this thing's creation, or it could have been infested or perverted by some outside power. Outsiders may not realize the nature of the peril, or even mistake its growth for some positive process. The growth could be the product of ancient science, a magical ritual, or a conflux of geomantic forces.",
      enemies: [
        { title: 'God-beast to be born for a long-dead faith', monstrous: true },
        { title: 'Obsessed ancient keeper', monstrous: true },
        { title: 'Outsider determined to provoke the catastrophe for their own ends' }
      ],
      friends: [
        { title: 'Worried local observer' },
        { title: 'Last surviving keeper of the ruin', monstrous: true },
        { title: 'Survivor of an early eruption of it' }
      ],
      complications: [
        "The thing's growth provides some profitable byproduct",
        "People are completely mistaken about what's growing down there",
        "People think it's already hatched and was dispatched"
      ],
      things: [
        'Item needed to harm or kill the thing',
        'Key to halt or abort the process',
        'Precious offerings made to the unborn disaster by fearful observers'
      ],
      places: [
        "Arcane lab where it's growing",
        'Fortified chambers to guard it',
        'Shrine depicting its eventual glory'
      ]
    },
    'Bitter Remnants': {
      text: "The ruin is not entirely abandoned, as a remnant of its former creators still occupies the place. These survivors are almost certainly hostile toward the outside world and the intruders who have sought to take the place or loot it for uncounted ages. They may or may not have a full understanding of their ancestors' purpose in the ruin, but they likely use any secrets they do know to best effect against invaders.",
      enemies: [
        { title: 'Xenophobic remnant chief', monstrous: true },
        { title: 'Outside ruler determined to exterminate them' },
        { title: 'Powerful ruin rival that seeks their destruction' }
      ],
      friends: [
        { title: 'Open-minded remnant member', monstrous: true },
        { title: 'Eager scholar seeking their secrets' },
        { title: 'Escapee from the terrible cruelties of the remnants' }
      ],
      complications: [
        'The remnant society is genuinely and completely horrible',
        'The remnants no longer or never did think like humans do',
        'Certain outcasts have trade ties with the remnants'
      ],
      things: [
        'Precious ancient relic they preserved',
        'Loot taken from dead invaders',
        'Secret history of the ruin full of useful information'
      ],
      places: [
        'Ancient but meticulously-kept chamber',
        'Ancestral place of rites unique to them',
        'Maintained monument to past glory'
      ]
    },
    'Civil War': {
      text: 'There are at least two organized factions within the ruin that are at war with each other. They all have motives that make simply leaving the place an unappealing prospect, and some of them might be eager to enlist outside help in ousting their rivals. Given the low population of most ruins, the war is likely a restricted one of raids, ambushes, and murders of convenience, and the traps and snares they set might catch more than their foes.',
      enemies: [
        { title: 'Faction leader with dreams of conquest' },
        { title: 'Crazed warlord' },
        { title: 'Treacherous plotter who betrays their hired help' }
      ],
      friends: [
        { title: 'Faction leader with benevolent aims' },
        { title: 'Innocent local caught in the crossfire' },
        { title: 'Would-be peacemaker' }
      ],
      complications: [
        'They both want the same thing but in different ways',
        'Both sides will unite swiftly against invaders',
        'Neither side wants anything that outsiders are going to like much'
      ],
      things: [
        "The artifact they're fighting over",
        'Weapon to destroy their rivals',
        'Wealth to bribe other helpers'
      ],
      places: [
        'Site of a vicious ambush',
        'Defaced monument or symbol of a rival faction',
        "Dangerous no-man's land zone within the ruin"
      ]
    },
    'Cyclical Doom': {
      text: "There's a phenomenon to the ruin that makes it tremendously dangerous at certain intervals. Fluxes of ancient radiation, swarms of quick-breeding dangerous vermin, withering geomantic conjunctions, or cyclically-awakened preserved inhabitants might make the place exceedingly deadly for intruders there at that time. The natives may or may not know about the cycle, and if it's a very long one, they might not have been around to see it happen.",
      enemies: [
        { title: 'Outsider determined to trigger the cycle' },
        { title: 'Native leader who wants to weaponize it', monstrous: true },
        { title: 'Outside researcher with no care for the consequences' }
      ],
      friends: [
        { title: 'Native aware of the impending disaster' },
        { title: 'Researcher trying to stop the cycle' },
        { title: 'Survivor of the last cycle' }
      ],
      complications: [
        'The cycle leaves behind a valuable byproduct',
        'The cycle only threatens certain occupants',
        "Outsiders have totally misinterpreted the cycle's meaning or events"
      ],
      things: [
        'Key to trigger or halt the cycle',
        'Device to protect users from the cycle',
        'Object for controlling and directing the cycle'
      ],
      places: [
        "Place scarred by a past cycle's effects",
        'Control or observation center',
        'Monument obscurely referencing the cycle'
      ]
    },
    'Decrepit Structure': {
      text: 'The ruin is falling apart, and is actively dangerous to its inhabitants. Navigating between areas may require careful progress, extensive rope and piton work, or avoidance of certain obvious-but-hazardous routes. Native inhabitants may have adapted to the hazards or they might be newcomers who are learning the hard way. Some areas in the ruin might provoke a general collapse if they are significantly damaged.',
      enemies: [
        { title: 'Outside plunderer with no care for the consequences' },
        { title: 'Outsider actively trying to destroy the place' },
        { title: 'Berserk native trying to repair things', monstrous: true }
      ],
      friends: [
        { title: 'Refugee forced to live there' },
        { title: 'Native dweller seeking help to fix things', monstrous: true },
        { title: 'Architectural researcher' }
      ],
      complications: [
        'Valuable materials can be looted by those indifferent to the increasing instability',
        'The collapse would reveal or unleash a terrible thing',
        'Many places in it can only be visited once'
      ],
      things: [
        'Resources that can repair the damage',
        'Precious loot that will destabilize the place if taken',
        'Treasure revealed by a structural collapse'
      ],
      places: [
        'Creaking bridge or gantry',
        'Room with numerous holes in the floor',
        'Tower leaning at a drunken angle'
      ]
    },
    'Desperate Hunger': {
      text: "Natives of the ruin just can't get enough to eat, and their situation or the surrounding area makes it impractical to move somewhere else. Beasts may be extremely aggressive due to hunger, and intelligent natives might fight more for food than gold or glory. Many of the more savage types may have fallen back on cannibalism or hunting other sapients for food.",
      enemies: [
        { title: 'Obese cannibal chieftain' },
        { title: "Native leader who'll do anything to feed #possessive# people" },
        { title: 'Sorcerer who gives dark nourishment to their servitors' }
      ],
      friends: [
        { title: 'Starved urchin-native', child: true },
        { title: 'Anxious group leader wanting to cut a deal' },
        { title: 'Innovator trying to open up a new food source' }
      ],
      complications: [
        'The overpopulation is being resolved by murder',
        'The food-gathering areas were recently blocked off by something',
        'Foodstuffs become toxic or inedible rapidly in the ruin'
      ],
      things: [
        'Cache of preserved food',
        'Key to open new hunting areas',
        "Great treasure that's viewed as trifling compared to the worth of food"
      ],
      places: [
        'Pit of cracked and gnawed bones',
        'Cages of meals-to-be',
        'Viciously desperate feeding area for a group'
      ]
    },
    'Dire Tombs': {
      text: "The ruin is characterized by a great many tombs or burial sites and a matching profusion of undead. The revenants may be mindless husks animated by dark magic or ambient power, or they could be intentionally created to act as guards or to continue “living” according to some long-lost death-god's teachings.",
      enemies: [
        { title: 'Undead lord jealous of their solitude', monstrous: true },
        { title: 'Ravening undead hulk-thing', monstrous: true },
        { title: 'Necromancer eager for the raw materials' }
      ],
      friends: [
        { title: 'Descendant of the dead trying to keep them safe' },
        { title: 'Fascinated historical researcher' },
        { title: 'Undead-hunter trying to contain them' }
      ],
      complications: [
        'The undead are not all of the same motives',
        'The locals revere and venerate them as ancestors',
        'The undead are just symptoms of something worse entombed there'
      ],
      things: [
        'Burial goods left behind',
        'Plunder taken from unfortunate adventurers',
        "Once-commonplace good that's now extremely valuable"
      ],
      places: [
        'Halls of silent coffin-niches or urns',
        'Chapel to a god related to the burial process',
        'Splendid tomb to a dead hero or ruler'
      ]
    },
    'Distant Gate': {
      text: 'The ruin is connected to some interesting distant location, either through a magical gate, a portal of ancient technology, forgotten tube-cars in underground tunnels, or a more mundane hidden passage into an otherwise inaccessible place. The natives may know about and exploit this quality, or the gate may be sealed until some particular procedure or object is used to activate it.',
      enemies: [
        { title: 'Guardian of the gate', monstrous: true },
        { title: 'Hostile entity from the other side', monstrous: true },
        { title: 'Intruder determined to unlock the gate' }
      ],
      friends: [
        { title: 'Hapless intruder from the other side', monstrous: true },
        { title: 'Native gate-guide' },
        { title: "Explorer seeking a route to the gate's destination" }
      ],
      complications: [
        'The gate was sealed for a very good reason',
        'The gate is one-way',
        'Activating the gate risks destroying the ruin'
      ],
      things: [
        'Key to activate the gate',
        'Codes to control its destination',
        'Treasure from the far side of it'
      ],
      places: [
        'Mysterious transit-chamber with symbolism related to the destination',
        'Room with objects or remains related to the destination',
        'Dangerously energetic gate room'
      ]
    },
    'Dungeon Heart': {
      text: "The ruin's physical integrity is bound with a particular creature or object within the site, and if it is destroyed or removed the place will collapse. If the destruction is immediate, this danger should be clearly conveyed to the players unless the GM wants to risk a rapid campaign end. This relationship may be derived from an ancient magical curse, a sympathetic unity of magical power, or ancient self-destruct security mechanisms.",
      enemies: [
        { title: 'Outsider determined to kill or steal the heart' },
        {
          title: 'A heart-creature that would be very convenient or satisfying to kill',
          monstrous: true
        },
        { title: 'Native holding the heart hostage to force obedience' }
      ],
      friends: [
        { title: 'Guardian of the heart', monstrous: true },
        { title: 'Native eager to warn outsiders of the truth' },
        { title: 'Explorer with dire suspicions' }
      ],
      complications: [
        'The “destruction” is metaphorical or societal in nature',
        'Only a specific part of the ruin will be destroyed',
        'No one involved realizes that it will cause a somewhat slow-motion destruction'
      ],
      things: [
        'Device that will undo the link',
        'The precious object that is the heart',
        'Relic to control the linked things'
      ],
      places: [
        "Chamber where the heart's connection is visible",
        'Place that shifts in sympathy to the heart',
        'Damaged room reflecting damage to the heart'
      ]
    },
    'Experimental Lab': {
      text: 'A sorcerer or ancient artificer once used this ruin for their experiments, most of which were the sort that would never be tolerated in civilization. They may have been sponsored by some amoral power, or been independent theurges seeking the special resources, environment, or natives of this place to assist in their studies.',
      enemies: [
        { title: 'Still-surviving researcher' },
        { title: 'Hideous creation of the arcanist', monstrous: true },
        { title: 'Outsider bent on seizing all its dark lore' }
      ],
      friends: [
        { title: 'Sympathetic creation of the sorcerer', monstrous: true },
        { title: 'Witch-hunter bent on destroying the secrets' },
        { title: "Local plagued by the lab's emanations or castoffs" }
      ],
      complications: [
        'The lab is still in use',
        "The lab's patrons don't realize what's really going on there",
        "The lab's creations have gone out of control"
      ],
      things: [
        'Valuable research byproduct',
        'Treasure once owned by a research victim',
        "Potent magical lore related to the lab's focus"
      ],
      places: [
        "Testing chamber for the lab's research",
        'Occult and sinister laboratory',
        'Pens for holding research stock'
      ]
    },
    'Failed Intrusion': {
      text: "The ruin recently experienced a serious incursion of outsiders, whether adventurers, bandits, government forces, angry villagers, or other hostiles. These intruders were repulsed, perhaps with significant loss of native life, and the ruin was considerably disrupted by the fighting. Important native leaders might have been killed or wounded, treasures might have been looted, or slaves and hostages might've been taken.",
      enemies: [
        { title: 'Desperate intruder leader still in the ruin' },
        { title: 'Bloodthirsty native leader craving vengeance', monstrous: true },
        { title: "Dead leader's heir full of terrible ideas" }
      ],
      friends: [
        { title: 'Sympathetic intruder or native survivor' },
        { title: 'Escaped slave' },
        { title: 'Vengeful relative of the dead' }
      ],
      complications: [
        'The intruders are too desperate to have entirely given up',
        'The two sides basically ruined each other',
        'Outsiders have entered to take advantage of the chaos'
      ],
      things: [
        'Useful relic lost by the intruding forces',
        'Stolen treasure of the natives',
        "Tribal treasure now inaccessible due to the chief's death"
      ],
      places: [
        'Site of a hideous battle',
        'Larder where the dead intruders are being kept',
        'Local beast lair full of dragged corpses'
      ]
    },
    'Fallen Sanctuary': {
      text: 'The ruin was a place of security within recent memory, until some event or invasion turned it into its present state. Some of the surrounding locals might have been associated with the site during its heyday and remember interesting facts about it. Others may still nurse dreams of returning it to its former glory once its current inhabitants are slain or driven away.',
      enemies: [
        { title: 'Dark warlord who overthrew the place' },
        { title: 'Traitor who arranged its downfall' },
        { title: "Terrible creature unleashed in the site's dying throes", monstrous: true }
      ],
      friends: [
        { title: 'Idealistic would-be reconstructor' },
        { title: 'Native trying to make peace with the locals' },
        { title: "Aged keeper of the site's old secrets", elder: true }
      ],
      complications: [
        'The site is fallen to the locals but a sanctuary now to a completely different group',
        'The site is still dangerous and hostile to the interlopers',
        'The locals desperately need to retake the site soon for some pressing reason'
      ],
      things: [
        'Treasures hidden by the former owners',
        'The dark tool used to cast the site down',
        'Token of rightful rule seized by the invaders'
      ],
      places: [
        'Hidden chamber unknown to invaders',
        "Defaced and ruined room dedicated to the site's original role",
        'Chamber re-purposed for the invaders'
      ]
    },
    'False Front': {
      text: 'The site actually seems to be a completely different type of place than it really is. You might generate a second basic function for the site and bill it as its true purpose, or conceal it as a currently-functioning structure of some kind. Either it was built this way originally or more recent owners have concealed the truth about it for their own benefit. Others may not realize that the ruin they think they know is just a facade over something deeper.',
      enemies: [
        { title: 'Secret master of the hidden ruin' },
        { title: 'Cruel schemer who established the false front' },
        { title: 'Monstrous foe still buried below the facade', monstrous: true }
      ],
      friends: [
        { title: 'Clueless entrepreneur who means to exploit the false site' },
        { title: 'Explorer with curious references to the truth' },
        { title: 'Victim of something from the truth below' }
      ],
      complications: [
        'The false front is a lure to bait prey',
        'The false front is to deflect interest',
        'The false front is meant to be useful or profitable to the true lord of the place'
      ],
      things: [
        'Key to reveal the entrance to the real site',
        'Incongruous treasure from below',
        'Valuable goods used to maintain the facade'
      ],
      places: [
        "Chamber that doesn't fit with the false front",
        'Secret passage to the depths',
        'Place full of costumes and props'
      ]
    },
    'Feral Magic': {
      text: 'Some potent enchantment or other ancient magic has gone berserk or rotten in the ruin, tainting the occupants and making the place dangerous to inhabitants. Whatever the magic once did, it now does it too much, or in the wrong way, or at a grim cost to those within. The natives either cannot escape, or have no place better to go, or are somehow dependent on the twisted magic.',
      enemies: [
        { title: 'Magically mutated abomination', monstrous: true },
        { title: 'Native chieftain full of tainted power', monstrous: true },
        { title: 'Outside sorcerer making reckless use of the magic' }
      ],
      friends: [
        { title: 'Researcher trying to understand or fix things' },
        { title: 'Sympathetic magic-plagued native' },
        { title: "Outside victim of the site's magic" }
      ],
      complications: [
        'Valuable loot awaits those willing to break the magic further',
        'The magic can be fixed if something dangerous is done',
        'The decay is spreading outside the ruin'
      ],
      things: [
        'Item to ward off the magic',
        'Valuable sorcerous byproduct',
        'Ancient instructions on how to fix things'
      ],
      places: [
        'Thrumming power center of the magic',
        'Lair of magic-twisted beasts',
        'Native shrine to the power'
      ]
    },
    'Flooded Halls': {
      text: 'The ruin is largely flooded, perhaps with water and perhaps with some worse substance. Exploring it is difficult, and the heroes constantly risk being trapped by rising waters or flow-shifted obstacles. The natives are either creatures adapted to water or desperate enough to live where few others can pursue them.',
      enemies: [
        { title: 'Fish-thing with dark hungers', monstrous: true },
        { title: 'Cult priest of a watery evil' },
        { title: 'Chief of a piscid humanoid species', monstrous: true }
      ],
      friends: [
        { title: 'Luckless local boater' },
        { title: "Hermit who's tried to live there" },
        { title: 'Courageous treasure-diver' }
      ],
      complications: [
        'The flooding is cyclical',
        'Water flow can be controlled somehow inside the site',
        'The water is fetid with disease'
      ],
      things: [
        'Pearls or other water-fashioned valuables',
        'Extremely precious relic that would be ruined by being soaked',
        'Device to grant water-breathing'
      ],
      places: [
        'Splendid chamber now crusted by slime or coral',
        'Half-filled room with an air bubble',
        'Space full of totally opaque silty water'
      ]
    },
    'Freshly Looted': {
      text: 'This ruin has been recently plundered, either by adventurers, organized invaders, or a specific faction within the site itself. Many creatures are either dead or driven off, and the rewards for exploration are limited. But as the site is newly-emptied, numerous outside groups or warbands are likely in the process of moving in, cleaning out the remnants of surviving inhabitants and setting up their own bases there.',
      enemies: [
        { title: 'Conquering Blighted warchief', monstrous: true },
        { title: 'Ruthless bandit adventurer who likes the place' },
        { title: 'Vengeance-mad chief of a rabble of survivors' }
      ],
      friends: [
        { title: 'Sympathetic native driven out of the site', monstrous: true },
        { title: 'Frustrated adventurer denied a chance to loot' },
        { title: 'Local official charged with investigating the place' }
      ],
      complications: [
        'The looters missed the most important treasure',
        'A native faction was working with the looters',
        'A group of natives successfully hid from the looters'
      ],
      things: [
        'Treasure hidden by dead natives',
        'Relic lost by a slain looter',
        'Valuable thing too big and heavy to carry out readily'
      ],
      places: [
        'Empty treasure vault',
        "Ruler's lair plundered and defaced",
        'Hall choked with the recent dead'
      ]
    },
    'Friendly Foes': {
      text: 'A group dwells within this ruin that would normally be very hostile to humans or outsiders, yet is perfectly willing to deal with adventurers. They may be an anomalous group of their kind, or have desperate need for outside help, or have religious reasons to be cooperative. Few outsiders are likely to take their friendliness at face value, but they should be given the chance to be visibly friendly by the GM so as to clue the players in to the likelihood of peaceful dealings.',
      enemies: [
        { title: "Bloodthirsty adventurer who doesn't believe them" },
        { title: 'Group leader with treacherous plans', monstrous: true },
        { title: 'Monstrous foe that threatens the group and outsiders both', monstrous: true }
      ],
      friends: [
        { title: 'Friendly being from the group', monstrous: true },
        { title: 'Local human with secret ties to them' },
        { title: 'Earnest outside missionary' }
      ],
      complications: [
        "They're friendly because of a very large misunderstanding they have",
        'They really are totally sincere in their good intent',
        "They've got a problem that only long-term allies can solve"
      ],
      things: [
        'Group-made product normally never available to humans',
        'Treasure they gathered from foes',
        "Relic they're using as a bargaining tool"
      ],
      places: [
        'Meeting space also furnished for humans',
        'Separate dwelling area for outsiders',
        'Chamber for obscure group rituals or worship'
      ]
    },
    'Hidden Within': {
      text: "The ruin is actually underneath a seemingly-ordinary structure or inhabited human settlement. Secret passages or long-forgotten portals lead down into it, and only a short space away from ordinary human life a ruin can seethe with sinister secrets. The ruin may have been built over accidentally, intentionally buried, or perhaps excavated by the current structure's original builders.",
      enemies: [
        { title: 'Thing that creeps up from below at night', monstrous: true },
        { title: 'Long-buried evil', monstrous: true },
        { title: 'Reckless adventurer stirring up things beneath' },
        { title: 'Subterranean cult leader', monstrous: true },
        { title: 'Corrupt guard paid to keep intruders away' },
        { title: 'Long-buried guardian construct', monstrous: true },
        { title: 'Shapechanging ruin denizen in disguise', monstrous: true },
        { title: 'Parasitic spirit bound to a ruin artifact', monstrous: true }
      ],
      friends: [
        { title: 'Passage-wise urchin', child: true },
        { title: 'Architect with too much curiosity' },
        { title: 'Hapless local sewer worker' },
        { title: 'Relative of someone lost below' },
        { title: 'Concerned citizen suspicious of strange events' },
        { title: 'Artifact seeker with partial knowledge' },
        { title: 'Repentant former cultist' }
      ],
      complications: [
        "The structure's inhabitants have a secret deal with the ruin dwellers",
        "The ruin dwellers masquerade as the structure's inhabitants",
        "Time-delayed catastrophe will happen after the ruin's opened",
        'The ruin is slowly sinking, making it unstable',
        'The inhabitants have come to secretly worship what lies below',
        'The structure above is sacred and must not be damaged'
      ],
      things: [
        'Key to open the hidden passage below',
        'Treasure hidden in the ruin in ages past',
        'Ancient relic the ruin was made to contain',
        'Mysterious diary detailing past expeditions',
        'Orb that illuminates hidden symbols in the ruin',
        "Weapon forged in the ruin's darkest depths",
        'Map to the deepest levels'
      ],
      places: [
        'Passage hidden behind now-crumbling construction',
        'Mundane room above a monstrous evil',
        'Secret passages that have peepholes into the structure above',
        'Ancient library covered in layers of dust and secrets',
        'A once grand hall now overgrown with sinister flora',
        'Collapsed area opening up to otherworldly landscapes',
        'Flooded burial chamber',
        'Bridge over a mist-filled abyss',
        'Vault of forbidden artifacts'
      ]
    },
    'Hiveminded Natives': {
      text: "A multi-bodied intellect exists in the ruin, whether an ancient AI, hiveminded swarm, telepathic gestalt species, unified golem force, or some other manner of creature. Some such hiveminds are inclined to “recruit” intruders, willing or otherwise. Conflict with these creatures is apt to be very dangerous, as they're capable of coordination at a level impossible to others, yet their single mind makes them more vulnerable to a single point of failure.",
      enemies: [
        { title: 'Crazed ancient eidolon', monstrous: true },
        { title: 'Magically warped insect queen', monstrous: true },
        { title: 'Fungus-infected colony organism', monstrous: true },
        { title: 'Living crystal network', monstrous: true },
        { title: 'Animated golem commander', monstrous: true },
        { title: 'Cultist worshipping and manipulating the hivemind' }
      ],
      friends: [
        { title: 'Escapee from the hivemind' },
        { title: 'Last survivor of a recruited group', monstrous: true },
        { title: 'Researcher keen to study it' },
        { title: 'Sorcerer who helped create the hivemind' }
      ],
      complications: [
        "The hivemind's doubts are embodied in conflicting factions",
        'It can focus only on so many bodies at once',
        'It requires a connection to issue new orders',
        'The core of the hivemind is dying, causing erratic behavior',
        'Destroying the central mind would destroy all members',
        'The collective mind phases between rational and feral',
        'The hive uses proxies to infiltrate other groups',
        'The collective is split on cooperating with outsiders',
        'The hivemind is in the process of integrating a new powerful entity into its collective causing instability and infighting among its members.'
      ],
      things: [
        "Device to break the hivemind's control",
        'Curative to free a recruit',
        'Intricate treasure fabricated by unified hivemind effort'
      ],
      places: [
        'Living quarters with no private elements',
        'Swarming chamber full of perfectly-synchronized motion',
        'Fetid organic queen-lair of the ruling intellect'
      ]
    },
    'Hospitable Natives': {
      text: "While not all denizens of the ruin are friendly, there's at least one faction that's known to be willing to host guests and negotiate for favors. This group may be made up of bandits, exiles, hermits, or other social outcasts who find even the most dubious human visitors preferable to their neighbors, or they might be “civilized” humanoids who find it profitable to parley as well as raid.",
      enemies: [
        { title: 'Sinister chieftain with ulterior motives', monstrous: true },
        { title: 'Xenophobic rebel who hates outsiders', monstrous: true },
        { title: 'Outsider adventurer bent on exploiting their hospitality' },
        { title: 'Crazed outcast plotting revenge', monstrous: true }
      ],
      friends: [
        { title: 'Wide-eyed native urchin', monstrous: true },
        { title: 'Outsider gone native' },
        { title: 'Outsider envoy trying to make a pact with them' }
      ],
      complications: [
        "They're hospitable because they desperately need allies",
        'They recently were betrayed by a guest',
        'Their hospitality comes at a high price',
        'They are hiding a dangerous secret'
      ],
      things: [
        'Trade goods gathered from the ruin',
        'Map of the ruin interior',
        'Key to unlock a route normally accessible only to ruin natives',
        'Rare herb known only to the natives'
      ],
      places: [
        'Alien but friendly meeting-chamber',
        'Makeshift guest lodgings',
        'Ritual room for strange rites'
      ]
    },
    'Hostile Environment': {
      text: 'Ruins are seldom comfortable, but this one is actively dangerous to those who enter it. Noxious fumes, radiation, magical miasmas, contagious diseases, poisonous liquids, or some other environmental hazard makes progress very risky. Natives are either immune to the peril or have means of negating it. The extreme defensibility of the site may be the reason they continue to lair there.',
      enemies: [
        { title: 'Sorcerer researching how to weaponize the hazard' },
        { title: 'Monstrous entity that emits the peril', monstrous: true },
        { title: 'Vile creature born of the toxic conditions', monstrous: true }
      ],
      friends: [
        { title: 'Explorer equipped with survival tools' },
        { title: 'Friendly native guide' },
        { title: 'Entrepreneur trying to exploit it' }
      ],
      complications: [
        'The hostile environment also produces a valuable resource',
        'Surrounding locals consider it taboo because the hazard is somehow contagious',
        "The hazard is very recent and the natives still don't know exactly how to handle it"
      ],
      things: [
        'Protective gear against the hazard',
        'Controls to shut off the hazard in some areas',
        'Loot from hazard-slain intruders or natives'
      ],
      places: [
        'Mundane location caked in the hazard',
        'Lair of a hazard-mutated beast',
        'Perilous path that snakes through the hazard'
      ]
    },
    'Infectious Miasma': {
      text: "A contagious disease has infected the natives and might plague any intruders as well. The sickness isn't fatal, but it may induce physical or mental changes that make life in the outside world difficult; the ruin itself might be an environment optimized for the afflicted. Conversely, the ruin might be a leprosarium or place of exile for those who catch some virulent plague or socially-despised illness.",
      enemies: [
        { title: 'Tyrant physician-chief who controls treatment', monstrous: true },
        { title: 'Ruler maddened by the illness', monstrous: true },
        { title: 'Plague priest determined to spread the disease', monstrous: true }
      ],
      friends: [
        { title: 'Innocent native suffering from the sickness' },
        { title: 'Outsider medical missionary' },
        { title: 'Hapless chieftain trying to hold things together', monstrous: true }
      ],
      complications: [
        'The ruin has been sealed off by the outside world',
        'The plague turns the natives into living tools or slave-entities',
        "Cures only temporarily suppress the disease's symptoms"
      ],
      things: [
        'Research needed for a lasting cure',
        'Treasures left by a dead sufferer',
        'Vital resources needed for the sick to survive'
      ],
      places: [
        'Gathering-place full of the walking ill',
        'Shrine to a healing god',
        'Pits where disease-warped victims are exiled'
      ]
    },
    'Invincible Delusion': {
      text: "The natives of this ruin are totally convinced of something that is simply not the case: their ancient empire never fell, their god has commanded them to live a certain troublesome way, they are the only true humans left in the world, or some other delusion that's likely to cause problems. They've developed rationalizations to explain obvious contradictions to their error, many of which involve hostile responses to bearers of iniquitous falsehood. There may be something about the ruin that's enforcing this delusion.",
      enemies: [
        { title: 'Hypnotically charismatic leader', monstrous: true },
        { title: 'Crazed ancient lich-ruler', monstrous: true },
        { title: 'Leader who knows the truth but profits by the error', monstrous: true }
      ],
      friends: [
        { title: 'Native with suspicions', monstrous: true },
        { title: 'Outsider trying to convince them' },
        { title: "Outsider whom they've mistakenly incorporated into their error" }
      ],
      complications: [
        'The delusion makes an otherwise unendurable life bearable',
        'The delusion is true in some critical ways',
        'The delusion is somehow infectious'
      ],
      things: [
        "Proof of the delusion's falsehood",
        'Precious goods piled up for a lost cause',
        'Relic of a golden age'
      ],
      places: [
        'Ruin chamber made a pathetic mimicry of some greater place',
        'Ritual chamber to celebrate the “truth”',
        'Archive containing troublesome records'
      ]
    },
    'Lethal Treasure': {
      text: 'The ruin has or produces a very valuable good, but that good is somehow extremely dangerous to acquire or possess. It may be toxic, or cursed, or the acquisition process may be predictably lethal. This danger may be the result of the creatures who create the good, the guardians that watch over it, or the surrounding locals who kill “smugglers” or “profaners” with zeal.',
      enemies: [
        { title: 'Monstrous beast that produces the good', monstrous: true },
        { title: 'Ancient construct guardian', monstrous: true },
        { title: 'Cruel tyrant who forces victims to make or acquire the good', veteran: true }
      ],
      friends: [
        { title: 'Desperate young adventurer' },
        { title: 'Native good maker trying to avoid disaster', monstrous: true },
        { title: "Victim of the good's hazards" }
      ],
      complications: [
        'Extended exposure to the good is harmful',
        'The good is useful but somehow morally dubious in its production or nature',
        'The good needs to be specially processed to make it safe'
      ],
      things: [
        'Large cache of unrefined good',
        "Object to nullify or cure the good's danger",
        'Loot lost in an unsuccessful attempt to buy the good'
      ],
      places: [
        'Hellish processing or production area',
        'Tightlyguarded vault of the good',
        "Area made toxic by the good's effects"
      ]
    },
    'Limited Access': {
      text: 'The ruin can only be accessed at certain times or with certain special keys. Any natives are cut off from the outside world for long periods, and must either have no need for sustenance or sources within the ruin. The obstacle may be magical in nature, or the only access route to the ruin may be subject to natural cycles that make it impassable at most times.',
      enemies: [
        { title: 'Ruin tyrant who views all outsiders as enemies', monstrous: true },
        { title: 'Ruthless adventurer trying to block rivals' },
        { title: 'Mad power locked away in the ruin', monstrous: true }
      ],
      friends: [
        { title: 'Eager young scholar' },
        { title: 'Adventurer with the key to the site' },
        { title: 'Native yearning to escape', monstrous: true }
      ],
      complications: [
        "It's been so long since the last opening that everyone's forgotten about it",
        'The access now opens in a very inconvenient place',
        'The access can be forced by some terrible sacrifice'
      ],
      things: [
        'Key to open the access',
        'Controls that permanently open the site',
        'Loot from the last expedition to enter the site'
      ],
      places: [
        'Passage that opens on a time lock',
        'Vast magical seal',
        'Coastal portal revealed only during a particular low tide period'
      ]
    },
    'Lingering Curse': {
      text: 'The ruin is cursed, and everything in it is somehow tainted or troubled by the malediction. There must be a strong reason for the natives to remain, or else the curse itself induces them to stay. The curse may be the result of some ancient crime, a enchantment gone wrong, a lost war against a magical foe, or a “blessing” in one age that is less appreciated in the modern day. The curse usually takes some time to trigger on intruders, but it may be induced by certain actions.',
      enemies: [
        { title: 'Vile sorcerer feeding on the energies' },
        { title: 'Embittered chieftain hating all uncursed', monstrous: true },
        { title: 'Hapless victim made a monster by the curse', monstrous: true }
      ],
      friends: [
        { title: 'Native sorcerer trying to lift the curse' },
        { title: 'Outside researcher investigating it' },
        { title: "Sympathetic native struggling with the curse's effects" }
      ],
      complications: [
        'The curse grants a significant advantage as well as a blight',
        'Those cursed need something here to survive',
        'The curse is a mark of native belonging and viewed as proof of loyalty'
      ],
      things: [
        'Object that can lift the curse',
        'Precious offering to the gods for mercy',
        'Treasure left by a victim of the curse'
      ],
      places: [
        'Shrine to some protective god',
        'Curse-warped place of twisted mundanity',
        'Chokingly-blighted place where the curse was first invoked'
      ]
    },
    'Living Dungeon': {
      text: 'The ruin is alive, either in a literal or metaphorical sense. It may be animated by an ancient eidolon that looks through countless sensors, or infused with the spirit of some arcane mind, or made up of the tiny bodies of countless construction-organisms like some vast coral. Physical damage to the ruin usually brings some hostile response, however muted by age and disrepair, and the structure itself may be conscious enough to strike bargains with inhabitants.',
      enemies: [
        { title: 'Demented ruin spirit', monstrous: true },
        { title: 'Sorcerer trying to bend the site to their will' },
        { title: "Native chieftain who worships the ruin's genius as a god", monstrous: true }
      ],
      friends: [
        { title: 'Friendly ruin sub-organism', monstrous: true },
        { title: 'Native ruin-keeper' },
        { title: 'Explorer avid to learn of the place' }
      ],
      complications: [
        "It's a colony creature with different minds in charge",
        'The ruin is trying to grow at all costs',
        'The ruin went berserk after its ruination and is now acting irrationally'
      ],
      things: [
        'Poison that can kill the ruin',
        "Precious good created by the ruin's life processes",
        'Indigestible treasures left by prior intruders'
      ],
      places: [
        'Wetly organic passageway',
        'Chamber with a giant maw for feeding',
        'Room with tethered organic servitor-creatures'
      ]
    },
    'Magical Wonder': {
      text: "An active enchantment in this ruin produces some wondrous effect; permanent summer, biological immortality, endless foodstuffs, visions of the future, or some other grand marvel. Unfortunately, it's so decayed and ill-tuned that all of these wonders come with related serious negative effects and problems, ones that the natives must struggle to deal with.",
      enemies: [
        { title: 'Ancient half-mad keeper of the enchantment', monstrous: true },
        { title: 'Sorcerous monster born of the decay', monstrous: true },
        { title: 'Outsider determined to exploit the enchantment at any cost' }
      ],
      friends: [
        { title: "Adventurer who seeks the enchantment's benefits" },
        { title: 'Researcher who wants its secrets' },
        { title: 'Sorcerer convinced they can fix the enchantment' }
      ],
      complications: [
        "The objects and benefits it confers don't exist outside the ruin",
        'It will collapse disastrously if the ruin is seriously damaged',
        'Nearby communities benefit from it and try to keep out intruders'
      ],
      things: [
        "Device to control the enchantment's benefits",
        'Ruined enchantment parts that are valuable still',
        'Research notes that would allow it to be repaired'
      ],
      places: [
        'Chamber of dangerous magical fluxes',
        'Sorcerous emission point where the blessing flows forth',
        'Abandoned laboratory where it was made'
      ]
    },
    'Monster Forge': {
      text: 'The ruin somehow creates a particular type of monster by its simple existence. It might be an ancient spawning-pit for Blighted, a cloning facility gone berserk, an ancient agricultural complex with feral livestock, an open portal to an Iterum of monsters, a source of very infectious monster-creating plagues, or something in that vein. These monsters probably infest the surrounding area, unless something about their nature requires them to stay close to the ruin.',
      enemies: [
        { title: 'Alpha monster of the horde', monstrous: true },
        { title: 'Sorcerous would-be tyrant over the creatures' },
        { title: "Terrible anomaly-beast that's even worse than usual", monstrous: true }
      ],
      friends: [
        { title: 'Victim of a monstrous rampage' },
        { title: 'Grim monster hunter trying to hold back the tide' },
        { title: 'Local lord overcome by the wave' }
      ],
      complications: [
        'The ruin has only recently started to belch forth the creatures',
        'The monsters capture humans to make more of their kind',
        'The monsters were once slaves or servants but have now broken free'
      ],
      things: [
        'Implement meant to destroy or control them',
        'Plunder brought back by raiding creatures',
        'Treasures lost by slain adventurers'
      ],
      places: [
        'Frenetic chamber of ever-blossoming life',
        'Overcrowded living quarters',
        'Re-purposed ancient chamber'
      ]
    },
    'Outsider Domain': {
      text: 'This ruin was originally constructed to serve a race of Outsiders. It is possible that they were not even humanoid, and the atmosphere within the ruin may still be tainted with alien gases or hostile temperatures. The architecture and lighting was designed for alien bodies, and humans might find it difficult to navigate. Surviving inhabitants might be Outsider remnants or the alien flora and fauna that persisted long after their masters had died out.',
      enemies: [
        { title: 'Still-surviving alien leader', monstrous: true },
        { title: 'Monstrous alien “pet”', monstrous: true },
        { title: 'Cult priest revering the dead Outsiders' }
      ],
      friends: [
        { title: 'Surviving heir of human slave-servants' },
        { title: 'Outsider hunter seeking prey' },
        { title: 'Researcher looking for lore' }
      ],
      complications: [
        'The site once produced something very important to the region at a terrible cost in lives',
        'The alien atmosphere becomes unsurvivable in cycles',
        'Humans Blighted by the Outsiders still live here'
      ],
      things: [
        'Alien artifact of great value',
        'Human treasure collected by dead Outsiders',
        'Alien device that does something very useful to modern humans'
      ],
      places: [
        'Inscrutably strange chamber',
        'Living quarters re-dimensioned to fit non-humanoid bodies',
        '“Garden” full of monstrous flora'
      ]
    },
    'Precious Resource': {
      text: 'The ruin generates a resource or serves a function that is valuable to those around it. This may be a direct and literal generation, such as a Deep that still automatically extracts and refines silver, or it may be metaphorical, such as a ruin full of undead who are privy to ancient secrets sought by wizards. Completely purging the ruin of perils would probably somehow ruin the process, or else some greedy outsider would likely have cleaned it out by now.',
      enemies: [
        { title: 'Grasping outsider treasure-hunter' },
        { title: 'Monster attracted by the resource', monstrous: true },
        { title: 'Resource-maker using it to gain sinister influence and power' }
      ],
      friends: [
        { title: 'Earnest prospector' },
        { title: 'Luckless official charged with gathering the resource' },
        { title: 'Desperate fortune-hunter' }
      ],
      complications: [
        'The resource is cursed or dangerous',
        "The resource can't be accessed without some kind of agreement with the natives",
        "The resource is sacred to the ruin's dwellers"
      ],
      things: [
        'Hidden cache of the resource',
        'Device that extracts it',
        'Ultra-rare refined example of the resource'
      ],
      places: [
        'Place where the resource is extracted',
        'Fortified zone around the extraction',
        'Vault for the gathered resource'
      ]
    },
    'Raider Lair': {
      text: 'Some ruins are dangerous only to intruders, but this one actively sends out raiding parties to plunder the surroundings. Many such lairs prefer to go relatively far afield to obscure their origins and avoid the hostility of their immediate neighbors. Others have specific grudges to nurse, or particular targets that have incurred their wrath. Hostages might be taken back for ransom, labor, or food, depending on the nature of the inhabitants.',
      enemies: [
        { title: 'Ambitious bandit chieftain' },
        { title: 'Embittered exiled lord' },
        { title: 'Monstrous ruler who hungers for outside wealth', monstrous: true }
      ],
      friends: [
        { title: 'Relative of a kidnapped victim' },
        { title: 'Escapee from the raiders' },
        { title: 'Local reeve trying to cope with the raids' }
      ],
      complications: [
        'The raiders are being backed by an outside power hostile to its neighbors',
        'The raiders exact a brutal tribute for their “protection”',
        'The raiders had or have a sympathetic cause'
      ],
      things: [
        'Priceless relic taken by the raiders',
        'Cache of supplies they need badly',
        'Loot hidden by the plunderers'
      ],
      places: [
        'Raucous and vile raider camp',
        "Re-purposed room turned into the chief's lair",
        'Treasure chamber full of looted goods'
      ]
    },
    'Recruiting Drive': {
      text: 'At least one group of inhabitants in the ruin are actively adding to their numbers. This may involve bribes, kidnapping, proselytization, or just the prospect of a better life than their recruits currently have. This group is likely ideological or circumstantial in their ties, like a cult, a rebel group, or a bandit clan, and so new members can be added as quickly as they prove agreeable or profitable to the whole. Those who refuse to join in tend to meet less comradely fates.',
      enemies: [
        { title: 'Charismatic and ruthless conqueror' },
        { title: 'Heartless grandee hiring disposable muscle' },
        { title: 'Hypnotically persuasive cult leader' }
      ],
      friends: [
        { title: 'Unwilling recruit' },
        { title: "Rival group's leader" },
        { title: 'Local ruler worried about the new members' }
      ],
      complications: [
        'The group recruits under false pretenses and then traps the new recruits in some crime',
        'The group really is offering a better deal than most recruits have',
        'Resentment is building between old and new group members'
      ],
      things: [
        "Proof of some outside power's involvement",
        'Wealth meant to use to entice recruits',
        'Rich gift given by an eager new recruit'
      ],
      places: [
        'Disordered and confused living quarters',
        'Well-trod training area',
        'Empty home of a now vanished recruit'
      ]
    },
    'Religious Zealots': {
      text: "Almost everyone has some degree of deference to the gods, but the natives of this ruin are outright fanatics of a particular religious or philosophical cause. They may have inherited from ages of ancestors, acquired it from the teachings of a charismatic prophet, or been persuaded of it by some profitable or terrifying display of divine will. The natives likely have at least one goal that makes no logical sense, but is related to their god's nature or desires.",
      enemies: [
        { title: 'Frothingly intense high priest' },
        { title: 'Holy demon or sending of the god', monstrous: true },
        { title: "Monstrous entity placated by the group's worship", monstrous: true }
      ],
      friends: [
        { title: 'Member having second thoughts' },
        { title: 'Missionary of a rival faith' },
        { title: 'Cynical group member who wants to depose the current leadership in their favor' }
      ],
      complications: [
        "The god's intervention seems real on some level",
        'Their cult is an offshoot of the locally dominant faith',
        'They have backing from a mother temple'
      ],
      things: [
        'Precious religious relic or regalia',
        'Object blessed with divine powers',
        'Wealth taken from unworthy unbelievers'
      ],
      places: [
        'Room fitted out as an ornate shrine',
        'Chamber carved with religious symbolism',
        'Place dedicated to some bloody or fearsome ritual'
      ]
    },
    'Rigid Hierarchy': {
      text: 'Most ruins have little organization, with various groups or lone beasts vying with each other as their strength allows. In this one, however, there is a clear and recognized hierarchy of power and authority, and lesser groups and entities are likely to obey the greater even without an immediate threat of violence. Of course, those same groups are also quite likely to conspire with outsiders to remove their vexations.',
      enemies: [
        { title: 'Iron-fisted monster lord', monstrous: true },
        { title: 'Ambitious and scheming chieftain' },
        { title: 'Secret kingmaker working as a humble minion' }
      ],
      friends: [
        { title: 'Hapless outsider slave' },
        { title: 'Minion with ambition' },
        { title: 'Bitter native seeking systemic revenge' }
      ],
      complications: [
        "The current leader is the only one holding back the ruin's denizens from raiding",
        'The groups are being organized by an outside power',
        'The subordinate groups are extremely bitter and restive over the state of affairs'
      ],
      things: [
        'Treasure used to pay off underlings',
        'Potent artifact used to cow subordinates',
        'Tribute extracted from unwilling inferiors'
      ],
      places: [
        'Barbarically luxurious throne room',
        'Disciplined and organized watch post',
        'Labor zone where the inferiors toil'
      ]
    },
    'Royal Refuge': {
      text: 'Some exiled noble, unsuccessful pretender, hunted wizard, or other grandee of note remained at this ruin for a time, either willingly or under duress. They and their retinue left their traces behind, and remnants of the group might still be present. The principle figure probably died here, though some kinds of creatures or wizards may have been less susceptible to time.',
      enemies: [
        { title: 'Undead prince in exile', monstrous: true },
        { title: 'Royal agent convinced the PCs are allies of the rebel here' },
        { title: "New usurper claiming the dead one's mantle or name" }
      ],
      friends: [
        { title: 'Well-meaning servant of the royal' },
        { title: 'Local chief trying to keep #possessive# village out of the affair' },
        { title: 'Sympathetic exile in need of help' }
      ],
      complications: [
        'The royal tried to make a deal with the creatures here',
        'The royal had secret ties or perhaps even was one of the inhabitants here',
        "The royal's foes are in sudden need of proof of their death"
      ],
      things: [
        "Item proving the royal's legitimacy",
        'National treasure they stole away with them',
        'Book full of blackmail material they recorded'
      ],
      places: [
        'Tattered but once-ornate chamber they occupied',
        'Cache full of carefully-preserved noble regalia',
        'Pathetic and coarsely-monumented grave site'
      ]
    },
    'Sacrificial Bargain': {
      text: 'The natives of the ruin have made some kind of pact with a dread power or sinister force, receiving support or power in exchange for some sacrifice. This sacrifice might fall directly on the natives themselves or they might plunder their neighbors for wealth, human sacrifices, or such other resources as their patron demands in payment. Failure to hold up their end of the deal may be fatal to the inhabitants.',
      enemies: [
        { title: 'Malevolent high priest of a dark power' },
        { title: 'Envoy of a ruthless foe of the local inhabitants' },
        { title: 'Frantic leader driven to desperate bargains' }
      ],
      friends: [
        { title: 'Sacrificial victim who escaped' },
        { title: 'Foe of the patron power searching for its catspaws', monstrous: true },
        { title: "Native from a rival group that's being beaten down" }
      ],
      complications: [
        'The bargain seemed an innocent one at first',
        "They‘re realizing that they can't hold up the deal",
        "The deal was made without the consent of the group's ordinary members"
      ],
      things: [
        'Object that symbolizes and empowers the pact',
        'Wealth granted by the patron',
        'Precious object lost by a sacrificial victim'
      ],
      places: [
        'Terrible chamber of ritual offering',
        'Local homestead ravaged by raiders',
        'Storehouse or living area made abundant by the patron'
      ]
    },
    'Sealed Evil': {
      text: 'The ruin serves as a prison for some terribly dangerous entity or power. It may have been originally designed to serve such a purpose, or retrofitted by later inhabitants due to a sudden need, or possibly even mistaken for some other kind of structure by innocent discoverers of a later era. Something about the evil makes it exceptionally hard to kill or permanently destroy, so imprisoning it “forever” seemed wiser.',
      enemies: [
        { title: 'Undead immortal sorcerer', monstrous: true },
        { title: 'Monstrous and nigh-unkillable creature', monstrous: true },
        { title: "Arch-Outsider with a biology humans can't be sure is dead", monstrous: true }
      ],
      friends: [
        { title: 'Hereditary warden of the prison' },
        { title: 'Innocently eager explorer' },
        { title: 'Ancestral hunter of the evil' }
      ],
      complications: [
        'The evil was actually a benign entity or is currently mistaken for one',
        'Those who loose it will gain enormous power',
        "It's being tapped for power in a way that risks freeing it"
      ],
      things: [
        "Relic of the dark power's evil",
        "Seal on the creature that's an extremely valuable item in itself",
        'Valuable material created or generated by the prison as a byproduct'
      ],
      places: [
        'Exceedingly well-sealed prison area',
        'Chamber with a temporal stasis cell',
        'Hall full of warning iconography made inscrutable by time'
      ]
    },
    'Secret Alliance': {
      text: "The natives of the ruin have a secret deal or arrangement with some outside power, doing their bidding or providing some special service in exchange for considerations. It might be a corrupt ruler, a sinister cult, an Outsider lord, a backwater hamlet chief, or some other figure that wouldn't wish the arrangement to become public.",
      enemies: [
        { title: 'Merchant with vile black market deals' },
        { title: 'Official who wants the ruin to remain a problem' },
        { title: 'Society grandee with sinister appetites' }
      ],
      friends: [
        { title: 'Suspicious noble investigator' },
        { title: 'Stern inquisitor from the local temple' },
        { title: 'Local who knows too much' }
      ],
      complications: [
        'The deal is maintaining a fragile peace',
        "There's an openly-acknowledged deal with them but the real bargain is far more sinister",
        'One side is getting ready to betray the other'
      ],
      things: [
        'Proof of the alliance',
        "Rich plunder taken from an ally's enemy",
        'Relic the mutual cooperation is meant to obtain'
      ],
      places: [
        'Secret meeting place in the wilds',
        'Chamber for an envoy of the ally',
        'Treasure chamber with goods from the ally'
      ]
    },
    'Shifting Interior': {
      text: 'The interior of the ruin is not stable, and shifts and alters over time or through some enigmatic cycle. It may be composed of constantly-moving elements of some ancient megastructure, or be spatially distorted by a decaying enchantment, or infested with inhabitants that are constantly rebuilding or reworking the layout. The natives may have some key knowledge that lets them navigate the changes.',
      enemies: [
        { title: 'Transdimensional intruder entity', monstrous: true },
        { title: 'Berserk master of the rebuilders', monstrous: true },
        { title: 'Sinister exile using the place as a refuge' }
      ],
      friends: [
        { title: 'Friendly local guide', monstrous: true },
        { title: 'Relative of one lost in the labyrinth' },
        { title: 'Frustrated builder in need of help', monstrous: true }
      ],
      complications: [
        'The shifts encode an important secret',
        'If the shifts are interrupted a catastrophe will ensue',
        "The shifts are under the control of the ruin's master"
      ],
      things: [
        'Key to control the shifts',
        'Map of the alterations',
        "The treasure within the labyrinth's heart"
      ],
      places: [
        "Room that's changed from the last time they saw it",
        'Churning death zone of moving perils',
        'Maze of twisty little passages all alike'
      ]
    },
    'Spatial Flux': {
      text: 'Space within the ruin has been folded, altered, or corrupted in some way, either by ancient magics, inauspicious geomancy, the depredations of a dimensional monster, failed enchantments, fumbled sorcery, or some other woe. Some creatures may use the curdled space as a refuge from their enemies, while others might use it as a gate to some stranger and more terrible place.',
      enemies: [
        { title: 'Transdimensional abomination', monstrous: true },
        { title: 'Mad sorcerer making things worse' },
        { title: 'Obsessive seeker of some hidden grail within the spatial maze' }
      ],
      friends: [
        { title: 'Friendly xenodimensional', monstrous: true },
        { title: 'Adventurer lost and trapped within the place' },
        { title: 'Local citizen accidentally caught in a warp' }
      ],
      complications: [
        'The destinations of the warps can be controlled from within the ruin',
        "The place's architecture is only physically possible with spatial distortions",
        'The warps lead to different times as well as places'
      ],
      things: [
        'Relic that creates or influences warps',
        'Treasure shifted here from an alternate place or world',
        'Wealth physically duplicated by the warps'
      ],
      places: [
        'Escher-like room',
        'Chamber with physical locations split over vast differences',
        'Featureless hall that really never ends'
      ]
    },
    'Surfacer Hideout': {
      text: "Some surface power is using the ruin as a hideout or base of operations. While they may simply be bandits or refugees, they're more likely agents of some greater power who need a discreet base, or some cult or criminal organization that needs a safe place to hide from the law. Friendly merchants or other associates might make contact with them there to provide for necessities, or they could be working to survive entirely separate from the hostile world outside.",
      enemies: [
        { title: 'Foreign spy chief', foreign: true },
        { title: 'Cult high priest' },
        { title: "Ruthless hunter of an innocent group that's hiding here" }
      ],
      friends: [
        { title: 'Elder of a despised ethnic group hiding here', foreign: true, elder: true },
        { title: 'Government investigator of the ruin' },
        { title: 'Local who lives nearby and has seen suspicious things' }
      ],
      complications: [
        'Rather than displacing the monstrous inhabitants, the surfacers have dominated or co-opted them',
        'The surfacers were killed or driven out of the ruin very recently and their effects remain',
        'The surfacers have hidden so well that they no longer understand the situation above'
      ],
      things: [
        'Treasure brought from afar by the surfacers',
        'Loot gathered up from displaced ruin inhabitants',
        'Some precious good crafted or extracted by surfacers'
      ],
      places: [
        'Room reminiscent of home',
        'Carefully-hidden entrance to their zone',
        'Remote meeting place'
      ]
    },
    'Taboo Place': {
      text: 'The locals surrounding the ruin consider it taboo, and will kill or punish anyone who enters it without their permission. This may be the product of religious reverence, or it could be a holy place of their ancestors, or it could be disputed territory, or it may be that the last time adventurers went in a catastrophe came out. Objects looted from the place will be very hard to sell discreetly anywhere near it.',
      enemies: [
        { title: 'Relentless leader of the guardians' },
        { title: 'The monstrous thing within that must not be disturbed', monstrous: true },
        { title: 'Ruin raider who will cause chaos with their plundering' }
      ],
      friends: [
        { title: 'Earnest young treasure hunter' },
        { title: "Local who doesn't believe in the taboo" },
        { title: 'Local who desperately needs to get inside for some reason' }
      ],
      complications: [
        'The locals are absolutely right that meddling with the place will bring disaster on them',
        'The ruin somehow marks those who profane it',
        'The ruin can be entered lawfully under some special circumstance or by certain people'
      ],
      things: [
        'Pass to allow lawful entrance',
        'Unsellably distinct treasure from the place',
        'Device to overcome the watchfulness of the guardians'
      ],
      places: [
        'Exemplary warning-pike with heads attached',
        'Long-sealed entrance portal',
        'Vigilant guard post'
      ]
    },
    'Things Below': {
      text: 'The ruin delved too deep, or opened too many doors to other realms, and things came boiling out that brought its destruction. Those things may have fallen asleep again, or returned to their realm, or yet remained here waiting for fresh prey. They may come and go based on particular time cycles, or when provoked by certain rituals or activities within the place.',
      enemies: [
        { title: 'Abomination from below', monstrous: true },
        { title: 'Alien-minded extra-planar conqueror', monstrous: true },
        { title: 'Cultist leader who reveres these eldritch powers' }
      ],
      friends: [
        { title: 'Historian seeking more truth about the things' },
        { title: 'Relative of a victim of the things' },
        { title: "Eager explorer who doesn't believe in the things" }
      ],
      complications: [
        'The things are associated with monstrous tides of dangerous vermin',
        'The treasures to be had from delving are almost worth the risk',
        'The treasures were actually living things that ruined the place'
      ],
      things: [
        'Precious object brought from below',
        'The treasure that they were delving up',
        'Wealth left behind by the suddenly-slain inhabitants'
      ],
      places: [
        'Interrupted digging site',
        'Vault laden with the wealth of below',
        'Site of sudden terrible ruin'
      ]
    },
    'Useless Treasure': {
      text: 'The ruin was once a carefully-guarded storehouse of some substance or information that was priceless at the time but is now largely worthless. Obscure materials, Outsider goods of no present use, exotic matter fashioned by sorcery and of forgotten purposes, and critical intelligence on empires long since dust might all be found here.',
      enemies: [
        { title: 'Tireless immortal guardian', monstrous: true },
        { title: 'Brutally relentless treasure seeker' },
        { title: 'Maddened sorcerer trying to unlock the “real value” of the treasure' },
        { title: 'Cursed, greed-driven ghost collector', monstrous: true }
      ],
      friends: [
        { title: 'Mistakenly optimistic adventurer' },
        { title: 'Seeker with a lost key to the wards' },
        { title: 'Local denizen who knows the treasure is worthless' },
        { title: 'Ghostly curator of the ruins', monstrous: true }
      ],
      complications: [
        "The natives may prize the stuff even if the world outside doesn't",
        'The treasure really is valuable to the very few who know how to use it',
        'The useless treasure is cased with then-useless material that is priceless now'
      ],
      things: [
        'Tremendously well-guarded dross',
        'Text showing how to use the treasure',
        "Key for suppressing the treasure's security system"
      ],
      places: [
        'Vast vault full of garbage',
        'Guard post manned by undying watchers',
        'Ancient luxury area featuring the material or the wealth it brought them'
      ]
    },
    "Wizard's Lair": {
      text: "Wizards often require an emphatic degree of privacy to ward off importunate help-seekers, witch hunters, rivals in the art, or reckless thieves. This ruin is or once was a lair to one such wizard, who probably isn't inclined to view visitors kindly. Even the dead ones may have left behind half-finished enchantments and unaging automaton servitors to guard their venerable lore and precious magical relics.",
      enemies: [
        { title: 'Immortal and heartless wizard' },
        { title: 'Monstrous creation of a dead mage', monstrous: true },
        { title: 'Insidious shadow demon familiar', monstrous: true },
        { title: 'Modern sorcerer exploiting the lair of a dead archmage' }
      ],
      friends: [
        { title: 'Well-meaning apprentice' },
        { title: 'Escapee from one of their experiments' },
        { title: 'Vengeful mage-hunter' },
        { title: 'Mysterious entity bound to a magical artifact', monstrous: true },
        { title: 'Wandering seer with prophetic abilities' },
        { title: 'Mischievous, but helpful enchanted familiar', monstrous: true }
      ],
      complications: [
        'They perform some service vital to the locals but at a terrible price',
        "No one's heard from them for so long that it's thought they're dead",
        "It's actually a lair for a school or cabal of wizards",
        'The lair is slowly sinking into an arcane mire',
        'Ancient wards are failing, unleashing imprisoned creatures',
        "The lair's magic is infecting and mutating nearby wildlife"
      ],
      things: [
        'Precious sorcerous grimoire',
        'Magical item crafted there',
        'Vast wealth given by petitioners',
        'Fragmented celestial map revealing hidden realms',
        'Elixir of forgotten knowledge',
        'Rune-inscribed arcane compass'
      ],
      places: [
        'Chamber with a half-finished and dangerous enchantment',
        'Pens for alchemical monstrosities',
        'Living quarters that are physically impossible somehow',
        'Pocket dimension accessible through a hidden doorway',
        'Haunted observatory with foretelling telescopes',
        'Garden with carnivorous plants'
      ]
    }
  },
  subtype: () => {
    return window.dice.spin(
      `${window.dice.choice([
        'isolated rural estate of nobility',
        'townhouse of minor gentry',
        'massive tenement or slum tower',
        'rural grange with outbuildings',
        'compact fortified village',
        'hidden shelter against calamity',
        'mazey urban residential block',
        'rubble-wrought makeshift village',
        'ancient arcology or fragment of it',
        'outpost of refugees or recluses',
        'sprawling slum of shanties and huts',
        'inhabited natural feature or cave',
        'grand fortress of major significance',
        'hidden bunker or strongpoint',
        'remote frontier keep',
        'secret operations base',
        'isolated watchtower',
        'battered front-line fortress',
        'military training camp',
        'gatehouse controlling a vital pass',
        'half-subterranean entrenchments',
        'military cache or storehouse',
        'battlefield littered with fortifications',
        'fortified waystation',
        'illicit manufactory for illegal goods',
        'mine or open pit for excavation',
        'sacred shrine for holy product',
        'overgrown ancient plantation',
        'destroyed camp or extraction site',
        'managed woodland gone feral',
        'inexplicable ancient manufactory',
        'farm for now-feral valuable beasts',
        'outsider goods production site',
        'repurposed ancient manufactory',
        'magical production facility',
        'fishery or salt extraction site',
        'lost pilgrimage destination',
        'fortified frontier monastery',
        'tomb of some mighty ancient',
        'prison-monastery for heretics',
        'shrine repurposed for a newer god',
        'fragment of megastructure temple',
        'inexplicable sacred structure',
        'place of some holy trial or test',
        'outsider fane to an alien god',
        'prison for a sealed demonic force',
        'pilgrim hospital or waystation',
        'holy archive or relic-fortress',
        'inscrutable outsider art structure',
        'library or ancient archive',
        "ancient culture's gathering site",
        'resort for nobles at ease',
        'monument complex to lost glories',
        'enormous musical structure',
        'abandoned school or study center',
        'massive ceremonial structure',
        'indoctrination camp or prison',
        'preserved “heritage” village-resort',
        'museum of a lost nation',
        'taboo site of dark magic',
        'psychic or tech communications site',
        'subterranean transit tunnels',
        'canal or aqueduct control center',
        'weather-control working ruin',
        'reality-stabilizing working ruin',
        'ancient road through an obstacle',
        'massive bridge or tunnel',
        'huge ancient dam',
        'ancient power production center',
        'outsider xenoforming engine',
        'semi-ruined teleportation node',
        'now-incomprehensible wreckage'
      ])}`
    )
  }
}
