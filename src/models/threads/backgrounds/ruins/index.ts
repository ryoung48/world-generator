import { BackgroundDetails } from '../types'
import { Ruins } from './types'

export const backgrounds__ruin: Record<Ruins, BackgroundDetails> = {
  'abandoned traps': {
    tag: 'abandoned traps',
    type: 'ruins',
    context: `This ruin is crusted over with dangerous snares and security measures, the relics of an anticipated {internal struggle|expected invasion} that may have never come.`,
    enemies: [
      { alias: `Golem trap-maintainer`, monstrous: true },
      { alias: `Confused undead guardian`, monstrous: true },
      {
        alias: `Vicious scavenger of trap victims`,
        monstrous: true
      }
    ],
    friends: [
      { alias: `Curious engineer` },
      { alias: `Fearless explorer` },
      { alias: `Intruder too frightened to escape` },
      { alias: 'Scholar who knows the secret of the traps' }
    ],
    complications: [
      `The traps keep something in`,
      `The entire ruin is a snare`,
      `The traps are incredibly deadly`
    ],
    things: [
      `the key to deactivate traps`,
      `a precious treasure the traps guard`,
      `a map of trap placement`,
      `magical protection from the traps`
    ],
    places: [
      `at an innocent room with many hidden traps`,
      `in an "Obviously trapped statue" chamber`,
      `in a False treasure chamber`,
      'at a clearing littered with remains of victims'
    ]
  },
  'ancient archives': {
    tag: 'ancient archives',
    type: 'ruins',
    context: `This ruin once housed {archives|information} ({history|politics|nature|astronomy|arcana|eldritch|genealogy|philosophy|religion}) that would be very interesting to certain modern powers, but is sealed behind {some fearsome guardian|a “puzzle” consisting of access procedures that were self-evident in the age it was constructed in}.`,
    enemies: [
      {
        alias: `Maddened archive keeper`,
        monstrous: true
      },
      { alias: `Powerful figure who wants the information kept hidden` },
      { alias: `Secret-seeker who brooks no rivals` }
    ],
    friends: [
      { alias: `Helpful ancient archive attendant`, monstrous: true },
      { alias: `Hired investigator` },
      { alias: `Seeker of some related lore` }
    ],
    complications: [
      `The information is conveyed in {idioms|forms} that are no longer clear`,
      `The information is very dangerous to know`,
      `The information is buried in seas of irrelevant data that need navigating`
    ],
    things: [
      `an index to the desired information`,
      `the key to decoding the data`,
      `a cultural work that explains the medium being used`
    ],
    places: [
      `at a library full of arcane data storage items`,
      `in a vast scriptorium`,
      `in a chamber related to the {topic|field} of the data involved`
    ]
  },
  'aspiring conqueror': {
    tag: 'aspiring conqueror',
    type: 'ruins',
    context: `Some power within the ruin has ambitions of conquest, and plans to use the site as a base for dominating the surrounding lands. The warlord plans to {use the ruin's denizens|recruit outcasts from nearby villages to serve} as soldiers.`,
    enemies: [
      { alias: `Bandit warlord`, monstrous: true },
      { alias: `Fanatical cult leader`, monstrous: true },
      { alias: `Embittered outlaw-noble` }
    ],
    friends: [
      { alias: `Hapless local lord` },
      { alias: `Minion who reconsidered their allegiance`, monstrous: true },
      { alias: `Former leader who was pushed aside by the new one`, monstrous: true },
      { alias: 'Wretched prisoner of the tyrant' }
    ],
    complications: [
      `Some of the locals honestly think the conqueror would be a better ruler`,
      `The conqueror actually has a legitimate claim on the land`,
      `The conqueror is being backed by enemies of the local ruler`
    ],
    things: [
      `a cache of military supplies`,
      `plunder taken from their first victims`,
      `an important hostage in their keeping`,
      "a map of the warlord's strategy"
    ],
    places: [
      `at a ruin barracks whipped into order`,
      `at a training field in use`,
      `in a nearby village they've crushed`
    ]
  },
  'automaton servants': {
    tag: 'automaton servants',
    type: 'ruins',
    context: `The ruin is still staffed by immortal guardians that are magically bound to their roles, many of which can no longer be carried out and are being reinterpreted.`,
    constraints: { conflicts: ['ancient guardians'] },
    enemies: [
      { alias: `Cruel immortal artificer`, monstrous: true },
      { alias: `Immortal leader gone mad`, monstrous: true },
      {
        alias: `Outsider seeking to suborn them to their sinister service`,
        monstrous: true
      }
    ],
    friends: [
      { alias: `Helpful servitor minion`, monstrous: true },
      { alias: `Fascinated outside investigator` },
      { alias: `Local who fears the minions` }
    ],
    complications: [
      `Scrapped automatons are worth a great deal`,
      `The automatons are needed to maintain the ruin's basic physical stability`,
      `The automatons have {merged with|been altered} by some outside power`
    ],
    things: [
      `a command key for the automatons`,
      `a cache of valuable spare parts`,
      `an item they desperately need in order to fulfill their function`
    ],
    places: [
      `at an automaton maintenance area`,
      `at a bank of unmoving figures`,
      `at a place of endless automaton toil`
    ]
  },
  'birthing cyst': {
    tag: 'birthing cyst',
    type: 'ruins',
    context: `A horrible thing is growing in the ruin and will eventually erupt into {a catastrophic peril|an awful creature} ({experimental|ambient} mutation). The ruin was {originally designed to facilitate this thing's creation|{infested|perverted} by some outside power, which triggered the cyst}.`,
    enemies: [
      { alias: `God-beast to be born for a long-dead faith`, monstrous: true },
      { alias: `Obsessed ancient keeper`, monstrous: true },
      { alias: `Outsider determined to provoke the catastrophe for their own ends` }
    ],
    friends: [
      { alias: `Worried local observer` },
      { alias: `Last surviving keeper of the ruin` },
      { alias: `Survivor of an early eruption of it` }
    ],
    complications: [
      `The thing's growth provides some profitable byproduct`,
      `People are completely mistaken about what's growing down there`,
      `People think it's already hatched and was dispatched`
    ],
    things: [
      `an item needed to {harm|kill} the thing`,
      `the key to {halt|abort} the birthing process`,
      `precious offerings made to the unborn disaster by fearful observers`
    ],
    places: [
      `at an arcane lab where it's growing`,
      `in the fortified chambers that guard it`,
      `at a shrine depicting its eventual glory`
    ]
  },
  'bitter remnants': {
    tag: 'bitter remnants',
    type: 'ruins',
    context: `The ruin is not entirely abandoned, as a hostile remnant of its former creators still occupy the place. These survivors are almost certainly hostile toward the outside world and the intruders who have sought to take the place or loot it for uncounted ages. They may or may not have a full understanding of their ancestors' purpose in the ruin, but they likely use any secrets they do know to best effect against invaders.`,
    enemies: [
      { alias: `Xenophobic remnant chief`, monstrous: true },
      { alias: `Outside ruler determined to exterminate them` },
      {
        alias: `Powerful ruin rival that seeks their destruction`,
        monstrous: true
      }
    ],
    friends: [
      { alias: `Open-minded remnant member`, monstrous: true },
      { alias: `Eager scholar seeking their secrets` },
      { alias: `Escapee from the terrible cruelties of the remnants` }
    ],
    complications: [
      `The remnant society is genuinely and completely horrible`,
      `The remnant adhere to ideologies that are alien to modern society`,
      `Certain outcasts have trade ties with the remnants`
    ],
    things: [
      `a precious ancient relic they preserved`,
      `loot taken from dead invaders`,
      `the secret history of the ruin full of useful information`
    ],
    places: [
      `in an ancient, but meticulously-kept chamber`,
      `at an ancestral place of rites unique to them`,
      `at a maintained monument to past glory`
    ]
  },
  'civil war': {
    tag: 'civil war',
    type: 'ruins',
    context: `There are at two organized factions within the ruin ({defenders|invaders|incursion}) that are at war with each other. They all have motives that make simply leaving the place an unappealing prospect, and some of them might be eager to enlist outside help in ousting their rivals. Given the low population of most ruins, the war is likely a restricted one of raids, ambushes, and murders of convenience, and the traps and snares they set might catch more than their foes.`,
    enemies: [
      {
        alias: `Faction leader with dreams of conquest`
      },
      { alias: `Crazed warlord`, monstrous: true },
      { alias: `Treacherous plotter who betrays their hired help` }
    ],
    friends: [
      { alias: `Faction leader with benevolent aims`, monstrous: true },
      {
        alias: `Innocent local caught in the crossfire`
      },
      { alias: `Would-be peacemaker` }
    ],
    complications: [
      `They both want the same thing, but in different ways`,
      `Both sides will unite swiftly against invaders`,
      `Neither side wants anything that outsiders are going to like much`
    ],
    things: [
      `the treasure they're fighting over`,
      `a weapon to destroy their rivals`,
      `wealth to bribe other helpers`
    ],
    places: [
      `at the site of a vicious ambush`,
      `at a defaced {monument|symbol} of a rival faction`,
      `in a dangerous no-man's land zone within the ruin`
    ]
  },
  'cyclical doom': {
    tag: 'cyclical doom',
    type: 'ruins',
    context: `There's a phenomenon to the ruin that makes it tremendously dangerous at certain intervals {{fluxes of ancient radiation|swarms of quick-breeding dangerous vermin|withering arcane conjunctions|cyclically-awakened preserved inhabitants}}. The natives may or may not know about the cycle, and if it's a very long one, they might not have been around to see it happen.`,
    enemies: [
      {
        alias: `Outsider determined to trigger the cycle`
      },
      {
        alias: `Local leader who wants to weaponize it`
      },
      { alias: `Outside researcher with no care for the consequences` }
    ],
    friends: [
      { alias: `Local aware of the impending disaster` },
      { alias: `Researcher trying to stop the cycle` },
      { alias: `Survivor of the last cycle` }
    ],
    complications: [
      `The cycle leaves behind a valuable byproduct`,
      `The cycle only threatens certain occupants`,
      `Outsiders have totally misinterpreted the cycle's meaning or events`,
      `The cycle is very long and the natives have not been around long enough to see it happen`
    ],
    things: [
      `the key to {trigger|halt} the cycle`,
      `an enchantment to protect users from the cycle`,
      `an object for controlling and directing the cycle`
    ],
    places: [
      `at a place scarred by a past cycle's effects`,
      `at a {control|observation} center`,
      `at a monument obscurely referencing the cycle `
    ]
  },
  'decrepit structure': {
    tag: 'decrepit structure',
    type: 'ruins',
    context: `The ruin is falling apart, and is actively dangerous to its inhabitants. Navigating between areas requires {careful progress|extensive rope and piton wor|avoidance of certain obvious-but-hazardous routes}. Native inhabitants {have adapted to the hazards|are newcomers learning the hard way}. Some areas in the ruin might provoke a general collapse if they are significantly damaged.`,
    enemies: [
      {
        alias: `Outside plunderer with no care for the consequences`
      },
      {
        alias: `Outsider actively trying to destroy the place`
      },
      { alias: `Berserk native trying to repair things`, monstrous: true }
    ],
    friends: [
      { alias: `Refugee forced to live there` },
      { alias: `Native dweller seeking help to fix things`, monstrous: true },
      { alias: `Architectural researcher` }
    ],
    complications: [
      `Valuable materials can be looted by those indifferent to the increasing instability`,
      `The collapse would {reveal|unleash} a terrible thing`,
      `Many places in it can only be visited once`
    ],
    things: [
      `resources that can repair the damage`,
      `precious loot that will destabilize the place if taken`,
      `treasure revealed by a structural collapse`
    ],
    places: [
      `at a creaking bridge`,
      `at a room with numerous holes in the floor`,
      `at a tower leaning at a drunken angle`
    ]
  },
  'desperate hunger': {
    tag: 'desperate hunger',
    type: 'ruins',
    context: `The denizens of this ruin are trapped within ({outcasts|cursed}) and are unnaturally aggressive due to {an unsatiable hunger|a recent food shortage}. Many of the more savage types may have fallen back on cannibalism or hunting other humanoids for food.`,
    enemies: [
      { alias: `Obese cannibal chieftain` },
      { alias: `Native leader who'll do anything to feed their people` },
      { alias: `Sorcerer who gives dark nourishment to their servitors` }
    ],
    friends: [
      { alias: `Starved urchin-native`, age: ['childhood'] },
      { alias: `Anxious local leader wanting end the deprivations` },
      { alias: `Innovator trying to open up a new food source` }
    ],
    complications: [
      `The overpopulation is being resolved by murder`,
      `The food-gathering areas were recently blocked off by something`,
      `Foodstuffs become {toxic|inedible} rapidly in the ruin`
    ],
    things: [
      `a cache of preserved food`,
      `the key to open new hunting areas`,
      `a great treasure that's viewed as trifling compared to the worth of food`
    ],
    places: [
      `at a pit of cracked and gnawed bones`,
      `at the cages of meals-to-be`,
      `at a viciously desperate feeding area for a group`
    ]
  },
  'dire tombs': {
    tag: 'dire tombs',
    type: 'ruins',
    context: `The ruin is characterized by a great many {tombs|burial sites} and a matching profusion of undead. The revenants {are mostly mindless husks animated by {dark magic|ambient power}|were intentionally created to {act as guards|continue “living” according to some long-lost death-god's teachings}}.`,
    enemies: [
      { alias: `Undead lord jealous of their solitude`, monstrous: true },
      { alias: `Ravening undead hulk ({giant|abomination|beast})`, monstrous: true },
      { alias: `Necromancer eager for the raw materials` }
    ],
    friends: [
      { alias: `Descendant of the dead trying to keep them safe` },
      { alias: `Fascinated historical researcher` },
      { alias: `Undead-hunter trying to contain them` }
    ],
    complications: [
      `The undead are not all of the same motives`,
      `The locals revere and venerate them as ancestors`,
      `The undead are just symptoms of something worse entombed there`
    ],
    things: [
      `burial goods left behind`,
      `plunder taken from unfortunate adventurers`,
      `a once-commonplace good that's now extremely valuable`
    ],
    places: [
      `in the halls of silent {coffin-niches|urns}`,
      `at a chapel to a god related to the burial process`,
      `at a splendid tomb to a dead {hero|ruler}`
    ]
  },
  'distant gate': {
    tag: 'distant gate',
    type: 'ruins',
    context: `The ruin contains a gateway to some planar realm (celestial|infernal|abyssal|verdant|fallen|scorched|frozen|underdark). The gate is {actively leaking horrors into the surrounding area|currently sealed, but can be activated with the right {procedure|key}}.`,
    enemies: [
      { alias: `Guardian of the gate`, monstrous: true },
      { alias: `Hostile entity from the other side`, monstrous: true },
      { alias: `Intruder determined to unlock the gate` }
    ],
    friends: [
      { alias: `Hapless intruder from the other side`, monstrous: true },
      { alias: `Local gate-guide` },
      { alias: `{Explorer|Sorcerer} seeking a route to the gate's destination` }
    ],
    complications: [
      `The gate was sealed for a very good reason`,
      `The gate is one-way`,
      `Activating the gate risks destroying the ruin`
    ],
    things: [
      `the key to activate the gate`,
      `codes to control its destination`,
      `treasure from the far side of it`
    ],
    places: [
      `in a mysterious transit-chamber with symbolism related to the destination`,
      `in a room with {objects|remains} related to the destination`,
      `in a dangerously energetic gate room`
    ]
  },
  'dungeon heart': {
    tag: 'dungeon heart',
    type: 'ruins',
    context: `The ruin's physical integrity is bound with a particular {creature|object} within the site ({ancient magical curse|sympathetic unity of magical power|ancient self-destruct security mechanism}), and the place will collapse if it is {destroyed|removed}.`,
    enemies: [
      {
        alias: `Outsider determined to {capture|destroy} the heart`
      },
      {
        alias: `A heart-creature that terrorizes the surrounding area`,
        monstrous: true
      },
      { alias: `Native holding the heart hostage to force obedience` }
    ],
    friends: [
      { alias: `Guardian of the heart`, monstrous: true },
      { alias: `Local eager to warn outsiders of the truth` },
      { alias: `Explorer with dire suspicions` }
    ],
    complications: [
      `The “destruction” is {metaphorical|societal} in nature`,
      `Only a specific part of the ruin will be destroyed`,
      `No one involved realizes that it will cause a somewhat slow-motion destruction`
    ],
    things: [
      `an artifact that will undo the link`,
      `the precious object that is the heart`,
      `a relic to control the linked things`
    ],
    places: [
      `in a chamber where the heart's connection is visible`,
      `at a place that shifts in sympathy to the heart`,
      `in a room reflecting damage to the heart`
    ]
  },
  'experimental lab': {
    tag: 'experimental lab',
    type: 'ruins',
    context: `A {sorcerer|ancient artificer} once used this place ({resources|environment|natives}) for their experiments, most of which were the sort that would never be tolerated in civilization ({sponsored by some amoral power|independent seeker of eldritch wisdom}).`,
    enemies: [
      { alias: `Still-surviving researcher` },
      { alias: `Hideous creation of the sorcerer`, monstrous: true },
      { alias: `Outsider bent on seizing all its dark lore` }
    ],
    friends: [
      { alias: `Sympathetic creation of the sorcerer`, monstrous: true },
      { alias: `Witch-hunter bent on destroying the secrets` },
      { alias: `Local plagued by the lab's {emanations|castoffs}` }
    ],
    complications: [
      `The lab is still in use`,
      `The lab's patrons don't realize what's really going on there`,
      `The lab's creations have gone out of control`
    ],
    things: [
      `a valuable research byproduct`,
      `treasure once owned by a research victim`,
      `potent magical lore related to the lab's focus`
    ],
    places: [
      `in a testing chamber for the lab's research`,
      `in an occult and sinister laboratory`,
      `at the pens for holding research stock `
    ]
  },
  'failed intrusion': {
    tag: 'failed intrusion',
    type: 'ruins',
    context: `The ruin recently experienced a serious incursion of outsiders ({mercenaries|bandits|guards|angry villagers|zealots}). These intruders were repulsed and the ruin was considerably disrupted by the fighting. {Important native leaders have been {killed|wounded}|Treasures have been looted|Slaves and hostages have been taken}.`,
    enemies: [
      {
        alias: `Desperate intruder leader still in the ruin`
      },
      {
        alias: `Bloodthirsty native leader craving vengeance`,
        monstrous: true
      },
      {
        alias: `Dead leader's heir (intruder) full of terrible ideas`
      }
    ],
    friends: [
      {
        alias: `Sympathetic intruder survivor`
      },
      { alias: `Escaped slave` },
      {
        alias: `Vengeful relative of the dead (intruder)`,
        relative: true
      }
    ],
    complications: [
      `The intruders are too desperate to have entirely given up`,
      `The two sides basically ruined each other`,
      `Outsiders have entered to take advantage of the chaos`
    ],
    things: [
      `a useful relic lost by the intruding forces`,
      `stolen treasure of the natives`,
      `native treasure now inaccessible due to the chief's death`
    ],
    places: [
      `at the site of a hideous battle`,
      `at a larder where the dead intruders are being kept`,
      `at a local beast lair full of dragged corpses `
    ]
  },
  'fallen sanctuary': {
    tag: 'fallen sanctuary',
    type: 'ruins',
    context: `The ruin was a place of security within recent memory, until some {event|invasion} turned it into its present state. Some of the surrounding locals might have been associated with the site during its heyday and remember interesting facts about it. Others may still nurse dreams of returning it to its former glory once its current inhabitants are slain or driven away.`,
    enemies: [
      { alias: `Dark warlord who overthrew the place`, monstrous: true },
      { alias: `Traitor who arranged its downfall` },
      {
        alias: `Terrible creature unleashed in the site's death throes`,
        monstrous: true
      }
    ],
    friends: [
      { alias: `Idealistic would-be re-constructor` },
      { alias: `Native trying to make peace with the locals` },
      { alias: `Aged keeper of the site's old secrets` }
    ],
    complications: [
      `This ruin is fallen to the locals, but a sanctuary now to a completely different group`,
      `This ruin is still dangerous and hostile to the interlopers`,
      `The locals desperately need to retake the site soon for some pressing reason`
    ],
    things: [
      `treasures hidden by the former owners`,
      `the dark tool used to cast the site down`,
      `a token of rightful rule seized by the invaders`
    ],
    places: [
      `in a hidden chamber unknown to invaders`,
      `in a defaced and ruined room dedicated to the site's original role`,
      `in a chamber re-purposed for the invaders `
    ]
  },
  'false front': {
    tag: 'false front',
    type: 'ruins',
    context: `This ruin actually seems to be a completely different type of place than it really is ({originally designed this way|recent adjustments conceal the truth}).`,
    enemies: [
      {
        alias: `Secret master of the hidden ruin`,
        monstrous: true
      },
      {
        alias: `Cruel schemer who established the false front`
      },
      {
        alias: `Monstrous foe still buried below the facade`,
        monstrous: true
      }
    ],
    friends: [
      { alias: `Clueless entrepreneur who means to exploit the false site` },
      { alias: `Explorer with curious references to the truth` },
      { alias: `Victim of something from the truth below` }
    ],
    complications: [
      `The false front is a lure to bait prey`,
      `The false front is to deflect interest`,
      `The false front is meant to be {useful|profitable} to the true lord of the place`
    ],
    things: [
      `the key to reveal the entrance to the real site`,
      `incongruous treasure from below`,
      `valuable goods used to maintain the facade`
    ],
    places: [
      `in a chamber that doesn't fit with the false front`,
      `in a secret passage to the depths`,
      `at a place full of costumes and props `
    ]
  },
  'feral magic': {
    tag: 'feral magic',
    type: 'ruins',
    context: `Some potent {enchanted edifice|ancient magic} has {gone berserk|rotten} within the ruin, tainting the occupants and making the place dangerous to inhabitants.`,
    enemies: [
      { alias: `Magically mutated abomination`, monstrous: true },
      {
        alias: `Native chieftain full of tainted power`,
        monstrous: true
      },
      { alias: `Outside sorcerer making reckless use of the magic` }
    ],
    friends: [
      { alias: `Researcher trying to {understand|fix} things` },
      {
        alias: `Sympathetic magic-plagued native`,
        monstrous: true
      },
      { alias: `Outside victim of the site's magic` }
    ],
    complications: [
      `Valuable loot awaits those willing to break the magic further`,
      `The magic can be fixed if something dangerous is done`,
      `The decay is spreading outside the ruin`
    ],
    things: [
      `an item to ward off the magic`,
      `valuable sorcerous byproduct`,
      `ancient instructions on how to fix things`
    ],
    places: [
      `at a thrumming power center of the magic`,
      `in the lair of magic-twisted beasts`,
      `at a native shrine to the power `
    ]
  },
  'flooded halls': {
    tag: 'flooded halls',
    type: 'ruins',
    context: `The ruin is largely flooded. Exploring it is difficult, and explorers constantly risk being trapped by rising waters or flow-shifted obstacles. The natives are {creatures adapted to water|desperate enough to live where few others can pursue them}.`,
    enemies: [
      { alias: `{Aquatic beast|Corrupted water spirit} with dark hungers`, monstrous: true },
      { alias: `Cult priest of a watery evil` },
      { alias: `Chief of a aquatic wilder species`, monstrous: true }
    ],
    friends: [
      { alias: `Luckless local {boater|fisherman}` },
      { alias: `Hermit who's tried to live there` },
      { alias: `Courageous treasure-diver` }
    ],
    complications: [
      `The flooding is cyclical`,
      `Water flow can be controlled somehow inside the site`,
      `The water is fetid with disease`,
      'The structure was originally designed to cope with the water, but its facilities have decayed'
    ],
    things: [
      `{pearl|water-fashioned} valuables`,
      `an extremely precious relic that would be ruined by being soaked`,
      "a long-lost hero's sarcophagus swallowed by the sea",
      'rare and enchanted salts',
      `{a device|an elixir} to grant water-breathing`
    ],
    places: [
      `in a splendid chamber now crusted by {slime|coral|barnacles}`,
      `in a half-filled room with an air bubble`,
      `in a space full of totally opaque silty water`,
      `in a hall with a fierce current down its length`
    ]
  },
  'freshly looted': {
    tag: 'freshly looted',
    type: 'ruins',
    context: `This ruin has been recently plundered by {mercenaries|organized invaders|a specific faction within the site itself}. Many creatures are either dead or driven off, and the rewards for exploration are limited. However, as the site is newly-emptied, numerous outside groups are in the process of moving in, cleaning out the remnants of surviving inhabitants, and setting up their own bases there.`,
    enemies: [
      { alias: `Conquering wilder warchief`, monstrous: true },
      { alias: `Ruthless bandit mercenary who likes the place` },
      { alias: `Vengeance-mad chief of a rabble of survivors`, monstrous: true }
    ],
    friends: [
      { alias: `Sympathetic native driven out of the site`, monstrous: true },
      { alias: `Frustrated adventurer denied a chance to loot` },
      { alias: `Local official charged with investigating the place` }
    ],
    complications: [
      `The looters missed the most important treasure`,
      `A native faction was working with the looters`,
      `A group of natives successfully hid from the looters`
    ],
    things: [
      `a treasure hidden by dead natives`,
      `a relic lost by a slain looter`,
      `a valuable thing too big and heavy to carry out readily`
    ],
    places: [
      `in an empty treasure vault`,
      `in a ruler's lair plundered and defaced`,
      `in a hall choked with the recent dead`
    ]
  },
  'friendly foes': {
    tag: 'friendly foes',
    type: 'ruins',
    context: `A group dwells here that would normally be very hostile to outsiders, yet is perfectly willing to deal with adventurers. They {are an anomalous group of their kind|have desperate need for outside help|have religious reasons to be cooperative}.`,
    hostiles: {},
    enemies: [
      { alias: `Bloodthirsty adventurer who doesn't believe them` },
      { alias: `Group leader with treacherous plans`, monstrous: true },
      {
        alias: `Monstrous foe that threatens the group and outsiders both`,
        monstrous: true
      }
    ],
    friends: [
      { alias: `Friendly being from the group`, monstrous: true },
      { alias: `Local kith with secret ties to them` },
      { alias: `Earnest outside missionary` }
    ],
    complications: [
      `They're friendly because of a very large misunderstanding they have`,
      `They really are totally sincere in their good intent`,
      `They've got a problem that only long-term allies can solve`
    ],
    things: [
      `a group-made product normally never available to kith`,
      `a treasure they gathered from foes`,
      `a relic they're using as a bargaining tool`
    ],
    places: [
      `in a meeting space also furnished for outsiders`,
      `at a separate dwelling area for outsiders`,
      `in a chamber for obscure group {rituals|worship}`
    ]
  },
  'hiveminded natives': {
    tag: 'hiveminded natives',
    type: 'ruins',
    context: `A multi-bodied intellect exists in the ruin. Conflict with these creatures is apt to be very dangerous, as the are capable of coordination at a level impossible to others, yet their single mind makes them more vulnerable to a single point of failure`,
    enemies: [
      { alias: `Unified golem force`, monstrous: true },
      { alias: `Magically warped insect queen`, monstrous: true },
      { alias: `Telepathically bound cultists` },
      { alias: `Fungus-infected colony organism`, monstrous: true }
    ],
    friends: [
      { alias: `Escapee from the hivemind` },
      { alias: `Researcher keen to study it` },
      { alias: `Last survivor of a recruited group` }
    ],
    complications: [
      `The hivemind's doubts are embodied in conflicting factions`,
      `It can focus only on so many bodies at once`,
      `It requires a connection to issue new orders`,
      `The hivemind recruits intruders, willing or otherwise`
    ],
    things: [
      `a device to break the hivemind's control`,
      `a curative to free a recruit`,
      `an intricate treasure fabricated by unified hivemind effort`
    ],
    places: [
      `in living quarters with no private elements`,
      `in a swarming chamber full of perfectly-synchronized motion`,
      `in the fetid organic queen-lair of the ruling intellect `
    ]
  },
  'hospitable natives': {
    tag: 'hospitable natives',
    type: 'ruins',
    context: `While not all denizens of the ruin are friendly, there's at least one faction that's known to be willing to host guests and negotiate for favors. This group is made up of {{exiles|hermits|outcasts} who find even the most dubious human visitors preferable to their neighbors|“civilized” brutes who find it profitable to parley as well as raid}.`,
    enemies: [
      { alias: `Sinister chieftain with ulterior motives` },
      { alias: `Xenophobic rebel who hates outsiders` },
      { alias: `Outsider adventurer bent on exploiting their hospitality` }
    ],
    friends: [
      { alias: `Wide-eyed native urchin` },
      { alias: `Outsider gone native` },
      { alias: `Outsider envoy trying to make a pact with them` }
    ],
    complications: [
      `They're hospitable because they desperately need allies`,
      `They recently were betrayed by a guest`,
      `Their hospitality comes at a high price`
    ],
    things: [
      `trade goods gathered from the ruin`,
      `a map of the ruin interior`,
      `the key to unlock a route normally accessible only to ruin natives`
    ],
    places: [
      `at an alien, but friendly meeting-chamber`,
      `in makeshift guest lodgings`,
      `in a Ritual room for strange rites `
    ]
  },
  'hostile environment': {
    tag: 'hostile environment',
    type: 'ruins',
    context: `Ruins are seldom comfortable, but this one is actively dangerous to those who enter it ({noxious fumes|arcane radiation|magical miasmas|contagious diseases|poisonous liquids}).`,
    enemies: [
      { alias: `Sorcerer researching how to weaponize the hazard` },
      {
        alias: `Monstrous entity that emits the peril`,
        monstrous: true
      },
      {
        alias: `Vile creature born of the toxic conditions`,
        monstrous: true
      }
    ],
    friends: [
      { alias: `Explorer equipped with survival tools` },
      { alias: `Friendly native guide` },
      { alias: `Entrepreneur trying to exploit it` }
    ],
    complications: [
      `The hostile environment also produces a valuable resource`,
      `Surrounding locals consider it taboo because the hazard is somehow contagious`,
      `The hazard is very recent and the natives still don't know exactly how to handle it`
    ],
    things: [
      `protective gear against the hazard`,
      `controls to shut off the hazard in some areas`,
      `loot from hazard-slain {intruders|natives}`
    ],
    places: [
      `at a mundane location caked in the hazard`,
      `in the lair of a hazard-mutated beast`,
      `on a Perilous path that snakes through the hazard `
    ]
  },
  'infectious miasma': {
    tag: 'infectious miasma',
    type: 'ruins',
    context: `A contagious disease has infected the natives and might plague any intruders as well. The sickness isn't fatal, but it induces {physical|mental} changes that make life in the outside world difficult. The ruin is {an environment optimized for the afflicted|place of exile for those who catch some {virulent plague|socially-despised illness}}.`,
    enemies: [
      { alias: `Tyrant physician-chief who controls treatment` },
      { alias: `Ruler maddened by the illness` },
      { alias: `Plague priest determined to spread the disease` }
    ],
    friends: [
      { alias: `Innocent native suffering from the sickness` },
      { alias: `Outsider medical missionary` },
      { alias: `Hapless chieftain trying to hold things together` }
    ],
    complications: [
      `The ruin has been sealed off by the outside world`,
      `The plague turns the natives into {living tools|slave-entities}`,
      `Cures only temporarily suppress the disease's symptoms`
    ],
    things: [
      `research needed for a lasting cure`,
      `treasures left by a dead sufferer`,
      `vital resources needed for the sick to survive`
    ],
    places: [
      `at a gathering-place full of the walking ill`,
      `at a shrine to a healing god`,
      `at the pits where disease-warped victims are exiled `
    ]
  },
  'invincible delusion': {
    tag: 'invincible delusion',
    type: 'ruins',
    context: `The natives of this ruin are totally convinced of something that is simply not the case ({their ancient empire never fell|their god has commanded them to live a certain troublesome way|their strain of civilization is the only "pure" strain}. They've developed rationalizations to explain obvious contradictions to their error, many of which involve hostile responses to bearers of iniquitous falsehood.`,
    enemies: [
      { alias: `Hypnotically charismatic leader`, monstrous: true },
      { alias: `Crazed ancient lich-ruler`, monstrous: true },
      { alias: `Leader who knows the truth, but profits by the error`, monstrous: true }
    ],
    friends: [
      { alias: `Native with suspicions`, monstrous: true },
      { alias: `Outsider trying to convince them` },
      { alias: `Outsider whom they've mistakenly incorporated into their error` }
    ],
    complications: [
      `The delusion makes an otherwise unendurable life bearable`,
      `The delusion is true in some critical ways`,
      `The delusion is somehow infectious`
    ],
    things: [
      `proof of the delusion's falsehood`,
      `precious goods piled up for a lost cause`,
      `a relic of a golden age`
    ],
    places: [
      `in a ruin chamber made a pathetic mimicry of some greater place`,
      `in a ritual chamber to celebrate the “truth”`,
      `in an archive containing troublesome records`
    ]
  },
  'lethal treasure': {
    tag: 'lethal treasure',
    type: 'ruins',
    context: `The ruin {safeguards|produces} a very valuable good, but that good is somehow extremely dangerous to unsuspecting extractors.`,
    enemies: [
      { alias: `Monstrous beast that produces the good`, monstrous: true },
      { alias: `Ancient construct guardian`, monstrous: true },
      { alias: `Cruel tyrant who forces victims to {make|acquire} the good` }
    ],
    friends: [
      { alias: `Desperate adventurer` },
      { alias: `Local artisan trying to avoid disaster` },
      { alias: `Victim of the good's hazards` }
    ],
    complications: [
      `Extended exposure to the good is harmful ({toxic|cursed})`,
      `The good is useful, but morally dubious in its {production|usage}`,
      `The good requires special processing to make it safe ({toxic|cursed})`
    ],
    things: [
      `a large cache of unrefined good`,
      `an object to {nullify|cure} the good's danger`,
      `loot lost in an unsuccessful attempt to buy the good`
    ],
    places: [
      `in a hellish {processing|production} area`,
      `in a tightly guarded vault of the good`,
      `in an area made toxic by the good's effects`
    ]
  },
  'limited access': {
    tag: 'limited access',
    type: 'ruins',
    context: `The ruin can only be accessed {at certain times|with certain special keys} ({arcane locks|natural cycles}).`,
    enemies: [
      { alias: `Ruin tyrant who views all outsiders as enemies`, monstrous: true },
      { alias: `Ruthless adventurer trying to block rivals` },
      { alias: `Mad power locked away in the ruin`, monstrous: true }
    ],
    friends: [
      { alias: `Eager scholar` },
      { alias: `Adventurer with the key to the site` },
      { alias: `Native yearning to escape`, monstrous: true }
    ],
    complications: [
      `It's been so long since the last opening that everyone's forgotten about it`,
      `The access now opens in a very inconvenient place`,
      `The access can be forced by some terrible sacrifice`
    ],
    things: [
      `a key to open the access`,
      `controls that permanently open the site`,
      `loot from the last expedition to enter the site`
    ],
    places: [
      `in a passage that opens on a time lock`,
      `at a vast magical seal`,
      `at a portal revealed only during a rare celestial event`
    ]
  },
  'lingering curse': {
    tag: 'lingering curse',
    type: 'ruins',
    context: `The ruin is cursed, and everything in it is {tainted|troubled} by the malediction ({ancient crime|feral enchantment|lost war against an arcane foe|blessing of a prior age that is now considered a curse}).`,
    enemies: [
      { alias: `Vile sorcerer feeding on the energies` },
      { alias: `Embittered chieftain hating all un-cursed` },
      { alias: `Hapless victim made a monster by the curse`, monstrous: true }
    ],
    friends: [
      { alias: `Local sorcerer trying to lift the curse` },
      { alias: `Outside researcher investigating it` },
      { alias: `Sympathetic native struggling with the curse's effects`, monstrous: true }
    ],
    complications: [
      `The curse grants a significant advantage as well as a blight`,
      `Those cursed need something here to survive`,
      `The curse is a mark of native belonging and viewed as proof of loyalty`
    ],
    things: [
      `an object that can lift the curse`,
      `a precious offering to the gods for mercy`,
      `a treasure left by a victim of the curse`
    ],
    places: [
      `at a shrine to some protective god`,
      `at a curse-warped place of twisted mundanity`,
      `at the ritual site where the curse was first invoked`
    ]
  },
  'living dungeon': {
    tag: 'living dungeon',
    type: 'ruins',
    context: `The ruin is {animated by an ancient construct that looks through countless sensors|infused with the spirit of some arcane mind|made up of the tiny bodies of countless construction-organisms}. Physical damage to the ruin usually brings some hostile response, however muted by age and disrepair, and the structure itself may be conscious enough to strike bargains with inhabitants.`,
    enemies: [
      { alias: `Demented sentient mind`, monstrous: true },
      { alias: `Sorcerer trying to bend the site to their will` },
      { alias: `Native chieftain who worships the ruin's genius as a god` }
    ],
    friends: [
      { alias: `Friendly ruin sub-organism`, monstrous: true },
      { alias: `Native ruin-keeper` },
      { alias: `Explorer avid to learn of the place` }
    ],
    complications: [
      `It's a colony creature with different minds in charge`,
      `The ruin is trying to grow at all costs`,
      `The ruin went berserk after its ruination and is now acting irrationally`
    ],
    things: [
      `a poison that can kill the ruin`,
      `a precious good created by the ruin's life processes`,
      `an indigestible treasures left by prior intruders`
    ],
    places: [
      `in a wetly organic passageway`,
      `in a chamber with a giant maw for feeding`,
      `in a room with tethered organic servitor-creatures`
    ]
  },
  'magical wonder': {
    tag: 'magical wonder',
    type: 'ruins',
    context: `An active enchanted edifice within this site produces some wondrous effect ({permanent summer|prolonged lifespan|endless foodstuffs|visions of the future}). Unfortunately, it's so decayed and ill-tuned that this wonder comes with related serious negative effects and problems, ones that the natives must struggle to deal with.`,
    enemies: [
      { alias: `Ancient half-mad keeper of the edifice`, monstrous: true },
      { alias: `Sorcerous monster born of the decay`, monstrous: true },
      { alias: `Outsider determined to exploit the edifice at any cost` }
    ],
    friends: [
      { alias: `Adventurer who seeks the edifice's benefits` },
      { alias: `Researcher who wants its secrets` },
      { alias: `Sorcerer convinced they can fix the edifice` }
    ],
    complications: [
      `The objects and benefits it confers don't exist outside the ruin`,
      `It will collapse disastrously if the ruin is seriously damaged`,
      `Nearby communities benefit from it and try to keep out intruders`
    ],
    things: [
      `a device to control the edifice's benefits`,
      `ruined enchanting components that are valuable still`,
      `research notes that would allow it to be repaired`
    ],
    places: [
      `in a chamber of dangerous magical fluxes`,
      `at a sorcerous emission point where the blessing flows forth`,
      `in an abandoned laboratory where it was made`
    ]
  },
  'monster forge': {
    tag: 'monster forge',
    type: 'ruins',
    context: `The ruin is {an ancient spawning-pit for aberrations ({humanoid|beast})|a cloning facility gone berserk|an ancient agricultural complex with feral livestock|a source of very infectious monster-creating plagues}. These monsters infest the surrounding area and cause havoc for neighboring settlements.`,
    enemies: [
      { alias: `Alpha monster of the horde`, monstrous: true },
      { alias: `Sorcerous would-be tyrant over the creatures` },
      { alias: `Terrible anomaly-beast that's even worse than usual`, monstrous: true }
    ],
    friends: [
      { alias: `Victim of a monstrous rampage` },
      { alias: `Grim monster-hunter trying to hold back the tide` },
      { alias: `Local lord overcome by the wave` }
    ],
    complications: [
      `The ruin has only recently started to belch forth the creatures`,
      `The monsters capture baseline humanoids to make more of their kind`,
      `The monsters were once {slaves|servants}, but have now broken free`
    ],
    things: [
      `an implement meant to {destroy|control} them`,
      `plunder brought back by raiding creatures`,
      `treasures lost by slain adventurers`
    ],
    places: [
      `in a frenetic chamber of ever-blossoming life`,
      `in overcrowded living quarters`,
      `in a re-purposed ancient chamber`
    ]
  },
  'precious resource': {
    tag: 'precious resource',
    type: 'ruins',
    context: `The ruin {generates a valuable resource|contains inhabitants who can provide valuable services}. Completely purging the ruin of perils would {critically damage|ruin} the process and prevents greedy outsiders from clearing it out.`,
    enemies: [
      { alias: `Grasping outsider treasure-hunter` },
      { alias: `Monster attracted by the resource`, monstrous: true },
      { alias: `Resource-maker using it to gain sinister influence and power` }
    ],
    friends: [
      { alias: `Earnest prospector` },
      { alias: `Luckless official charged with gathering the resource` },
      { alias: `Desperate fortune-hunter` }
    ],
    complications: [
      `The resource is {cursed|dangerous}`,
      `The resource can't be accessed without some kind of agreement with the natives`,
      `The resource is sacred to the ruin's dwellers`
    ],
    things: [
      `a hidden cache of the resource`,
      `a device that extracts it`,
      `an ultra-rare refined example of the resource`
    ],
    places: [
      `at the place where the resource is extracted`,
      `in a fortified zone around the extraction`,
      `in a vault for the gathered resource `
    ]
  },
  'raider lair': {
    tag: 'raider lair',
    type: 'ruins',
    context: `Some ruins are dangerous only to intruders, but this one actively sends out raiding parties to plunder the surroundings.`,
    enemies: [
      { alias: `Ambitious bandit chieftain` },
      { alias: `Embittered exiled lord` },
      { alias: `Monstrous ruler who hungers for outsider {wealth|flesh}`, monstrous: true }
    ],
    friends: [
      { alias: `Relative of a kidnapped victim`, relative: true },
      { alias: `Escapee from the raiders` },
      { alias: `Local reeve trying to cope with the raids` }
    ],
    complications: [
      `The raiders are being backed by an outside power hostile to its neighbors`,
      `The raiders exact a brutal tribute for their “protection”`,
      `The raiders {had|have} a sympathetic cause`
    ],
    things: [
      `a priceless relic taken by the raiders`,
      `a cache of supplies they need badly`,
      `loot hidden by the plunderers`
    ],
    places: [
      `at a raucous and vile raider camp`,
      `in a re-purposed room turned into the chief's lair`,
      `in a treasure chamber full of looted goods `
    ]
  },
  'recruiting drive': {
    tag: 'recruiting drive',
    type: 'ruins',
    context: `One group of inhabitants ({rebels|bandits|cultists}) in the ruin are actively adding to their numbers (using {bribes|kidnapping|faith conversion|prosperity}).`,
    enemies: [
      { alias: `Charismatic and ruthless conqueror` },
      { alias: `Heartless grandee hiring disposable muscle` },
      { alias: `Hypnotically persuasive cult leader` }
    ],
    friends: [
      { alias: `Unwilling recruit` },
      { alias: `Rival group's leader` },
      { alias: `Local ruler worried about the new members` }
    ],
    complications: [
      `The group recruits under false pretenses and then traps the new recruits in some crime`,
      `The group really is offering a better deal than most recruits have`,
      `Resentment is building between old and new group members`
    ],
    things: [
      `proof of some outside power's involvement`,
      `wealth meant to use to entice recruits`,
      `a rich gift given by an eager new recruit`
    ],
    places: [
      `in disordered and confused living quarters`,
      `in a well trod training area`,
      `at an empty home of a now vanished recruit `
    ]
  },
  'religious zealots': {
    tag: 'religious zealots',
    type: 'ruins',
    context: `This ruin is sacred to some religious sect, most likely one too foul to be tolerated in civilized lands. The zealots will guard it with fanatical fervor, and dark miracles can be expected there in line with the nature of their loathsome god.`,
    constraints: { conflicts: ['dark cult', 'upstart faith'] },
    enemies: [
      { alias: `Scarred high priest` },
      { alias: 'Treacherous seemingly-friendly abbot' },
      { alias: 'Wild-eyed peasant prophet' },
      { alias: 'Exiled urban heretic' },
      { alias: `Holy demon of the god`, monstrous: true },
      { alias: `Monstrous entity placated by the group's worship`, monstrous: true }
    ],
    friends: [
      { alias: `Member having second thoughts` },
      { alias: `Missionary of a rival faith` },
      { alias: `Cynical group member who wants to depose the current leadership in their favor` },
      { alias: 'Grim inquisitor' }
    ],
    complications: [
      `The cultists are wrong about which god sanctifies the site`,
      `This ruin is only potentially holy and needs a gory sanctification`,
      `Several religions fight for control of the site`,
      'The cult has broken into sects which compete for the site leadership'
    ],
    things: [
      `a precious religious relic`,
      `an unholy artifact of the god`,
      `wealth taken from unworthy unbelievers`,
      'a black relic of a martyred anti-saint'
    ],
    places: [
      `in a room fitted out as an ornate shrine`,
      `in a chamber carved with religious symbolism`,
      `at a place dedicated to some {bloody|fearsome} ritual`,
      'in the austere cells of the cultists',
      'in a hideously defiled sanctum',
      'in a ancient temple hall'
    ]
  },
  'rigid hierarchy': {
    tag: 'rigid hierarchy',
    type: 'ruins',
    context: `Most ruins have little organization, with various groups or lone beasts vying with each other as their strength allows. In this one, however, there is a clear and recognized hierarchy of power and authority, and lesser groups and entities are likely to obey the greater even without an immediate threat of violence.`,
    enemies: [
      { alias: `Iron-fisted monster lord` },
      { alias: `Ambitious and scheming chieftain` },
      { alias: `Secret kingmaker working as a humble minion` }
    ],
    friends: [
      { alias: `Hapless outsider slave` },
      { alias: `Minion with ambition` },
      { alias: `Bitter native seeking systemic revenge` }
    ],
    complications: [
      `The current leader is the only one holding back the ruin's denizens from raiding`,
      `The groups are being organized by an outside power`,
      `The subordinate groups are extremely bitter and restive over the state of affairs`
    ],
    things: [
      `a treasure used to pay off underlings`,
      `a potent artifact used to cow subordinates`,
      `the tribute extracted from unwilling inferiors`
    ],
    places: [
      `in a barbarically luxurious throne room`,
      `at a disciplined and organized watch post`,
      `at a labor zone where the inferiors toil `
    ]
  },
  'royal refuge': {
    tag: 'royal refuge',
    type: 'ruins',
    context: `{An exiled noble|An unsuccessful pretender|A hunted wizard} resided here for a time ({willingly|under duress}). They and their retinue left their traces behind, and remnants of the group might still be present. The principle figure probably died here, though some kinds of creatures or wizards may have been less susceptible to time.`,
    enemies: [
      { alias: `Undead prince in exile`, monstrous: true },
      { alias: `New usurper claiming the dead one's {mantle|name}` }
    ],
    friends: [
      { alias: `Well-meaning servant of the royal` },
      { alias: `Local chief trying to keep #possessive# village out of the affair` },
      { alias: `Sympathetic exile in need of help` }
    ],
    complications: [
      `The royal tried to make a deal with the creatures here`,
      `The royal had secret ties or perhaps even was one of the natives here`,
      `The royal's foes are in sudden need of proof of their death`
    ],
    things: [
      `an item proving the royal's legitimacy`,
      `a national treasure they stole away with them`,
      `a book full of blackmail material they recorded`
    ],
    places: [
      `in a tattered, but once-ornate chamber they occupied`,
      `at a cache full of carefully-preserved noble regalia`,
      `at a pathetic and coarsely-adorned grave site`
    ]
  },
  'sacrificial bargain': {
    tag: 'sacrificial bargain',
    type: 'ruins',
    context: `The natives of the ruin have made some kind of pact with a {dread power|sinister force}, receiving support in exchange for some sacrifice ({wealth|blood}) taken from {the natives themselves|neighboring settlements}. Failure to hold up their end of the deal may be fatal to the inhabitants.`,
    enemies: [
      { alias: `Malevolent high priest of a dark power` },
      { alias: `Envoy of a ruthless foe of the local inhabitants` },
      { alias: `Frantic leader driven to desperate bargains` }
    ],
    friends: [
      { alias: `Sacrificial victim who escaped` },
      { alias: `Foe of the patron power searching for its tools` },
      { alias: `Native from a rival group that's being beaten down`, monstrous: true }
    ],
    complications: [
      `The bargain seemed an innocent one at first`,
      `They're realizing that they can't hold up the deal`,
      `The deal was made without the consent of the group's ordinary members`
    ],
    things: [
      `an object that symbolizes and empowers the pact`,
      `wealth granted by the patron`,
      `a precious object lost by a sacrificial victim`
    ],
    places: [
      `in a terrible chamber of ritual offering`,
      `at a local homestead ravaged by raiders`,
      `{at a storehouse|in a living area} made abundant by the patron`
    ]
  },
  'sealed evil': {
    tag: 'sealed evil',
    type: 'ruins',
    context: `The ruin serves as a prison for some terribly dangerous entity or power. It may have been originally designed to serve such a purpose, or retrofitted by later inhabitants due to a sudden need, or possibly even mistaken for some other kind of structure by innocent discoverers of a later era. Something about the evil makes it exceptionally hard to kill or permanently destroy, so imprisoning it “forever” seemed wiser.`,
    enemies: [
      { alias: `Undead immortal sorcerer`, monstrous: true },
      {
        alias: `Monstrous and nigh indestructible creature ({beast|primordial|construct})`,
        monstrous: true
      },
      { alias: `Malign {demon|angel|elemental|fey} lord`, monstrous: true }
    ],
    friends: [
      { alias: `Hereditary warden of the prison` },
      { alias: `Innocently eager explorer` },
      { alias: `Ancestral hunter of the evil` }
    ],
    complications: [
      `The evil {was actually|is currently being mistaken for} a benign entity`,
      `Those who loose it will gain enormous power`,
      `It's being tapped for power in a way that risks freeing it`
    ],
    things: [
      `a relic of the dark power's evil`,
      `the seal on the creature that's an extremely valuable item in itself`,
      `a valuable material {created|generated} by the prison as a byproduct`
    ],
    places: [
      `in an exceedingly well-sealed prison area`,
      `in a chamber with a temporal stasis cell`,
      `in a hall full of warning iconography made inscrutable by time`
    ]
  },
  'secret alliance': {
    tag: 'secret alliance',
    type: 'ruins',
    context: `The natives of the ruin have a secret {deal|arrangement} with some outside power, {doing their bidding|providing some special service} in exchange for considerations.`,
    enemies: [
      { alias: `Merchant with vile black market deals` },
      { alias: `Official who wants the ruin to remain a problem` },
      { alias: `Society grandee with sinister appetites` }
    ],
    friends: [
      { alias: `Suspicious noble investigator` },
      { alias: `Stern inquisitor from the local temple` },
      { alias: `Local who knows too much` }
    ],
    complications: [
      `The deal is maintaining a fragile peace`,
      `There's an openly-acknowledged deal with them, but the real bargain is far more sinister`,
      `One side is getting ready to betray the other`
    ],
    things: [
      `proof of the alliance`,
      `rich plunder taken from an ally's enemy`,
      `a relic the mutual cooperation is meant to obtain`
    ],
    places: [
      `at a secret meeting place in the wilds`,
      `in a chamber for an envoy of the ally`,
      `in a treasure chamber with goods from the ally`
    ]
  },
  'shifting interior': {
    tag: 'shifting interior',
    type: 'ruins',
    context: `The interior of the ruin  shifts and alters {over time|through an enigmatic cycle}. It is {composed of constantly-moving elements of some ancient mega-structure|spatially distorted by a decaying enchantment|infested with inhabitants that are constantly rebuilding or reworking the layout}.`,
    enemies: [
      { alias: `Trans-dimensional intruder entity ({beast|humanoid})`, monstrous: true },
      {
        alias: `Berserk master of the re-builders ({beast|primordial|construct})`,
        monstrous: true
      },
      { alias: `Sinister exile using the place as a refuge` }
    ],
    friends: [
      { alias: `Friendly native guide` },
      { alias: `Relative of one lost in the labyrinth`, relative: true },
      { alias: `Frustrated builder in need of help`, monstrous: true }
    ],
    complications: [
      `The shifts encode an important secret`,
      `If the shifts are interrupted a catastrophe will ensue`,
      `The shifts are under the control of the ruin's master`
    ],
    things: [
      `a key to control the shifts`,
      `a map of the alterations`,
      `the treasure within the labyrinth's heart`
    ],
    places: [
      `in a room that's changed from the last time they saw it`,
      `in a churning death zone of moving perils`,
      `in a maze of twisty little passages all alike`
    ]
  },
  'spatial flux': {
    tag: 'spatial flux',
    type: 'ruins',
    context: `Space within the ruin has been {folded|altered|corrupted} by {eldritch energy|failed enchantments|fumbled sorcery}. Some creatures may use the curdled space as a refuge from their enemies, while others might use it as a gate to some stranger and more terrible place.`,
    enemies: [
      { alias: `Trans-dimensional abomination`, monstrous: true },
      { alias: `Mad sorcerer making things worse` },
      { alias: `Obsessive seeker of some hidden grail within the spatial maze` }
    ],
    friends: [
      { alias: `Friendly dimensional entity`, monstrous: true },
      { alias: `Adventurer lost and trapped within the place` },
      { alias: `Local citizen accidentally caught in a warp` }
    ],
    complications: [
      `The destinations of the warps can be controlled from within the ruin`,
      `The place's architecture is only physically possible with spatial distortions`,
      `The warps lead to different times as well as places`
    ],
    things: [
      `a relic that creates or influences warps`,
      `a treasure shifted here from an alternate place or world`,
      `wealth physically duplicated by the warps`
    ],
    places: [
      `in a fractal room`,
      `in a chamber with physical locations split over vast differences`,
      `in a featureless hall that really never ends `
    ]
  },
  'surfacer hideout': {
    tag: 'surfacer hideout',
    type: 'ruins',
    context: `Some surface power is using the ruin as a {hideout|base of operations} to hide from the law. Friendly merchants or other associates might make contact with them there to provide for necessities, or they could be working to survive entirely separate from the hostile world outside.`,
    enemies: [
      { alias: `Foreign spy chief` },
      { alias: `Cult high priest` },
      { alias: `Ruthless hunter of an {refugee|oppressed} group hiding here` }
    ],
    friends: [
      { alias: `Elder of a despised ethnic group hiding here`, age: ['old'] },
      { alias: `Government investigator of the ruin` },
      { alias: `Local who lives nearby and has seen suspicious things` }
    ],
    complications: [
      `Rather than displacing the monstrous natives, the surfacers have {dominated|co-opted} them`,
      `The surfacers were {killed|driven out of the ruin} very recently and their effects remain`,
      `The surfacers have hidden so well that they no longer understand the situation above`
    ],
    things: [
      `treasure brought from afar by the surfacers`,
      `loot gathered up from displaced ruin natives`,
      `some precious good {crafted|extracted} by surfacers`
    ],
    places: [
      `in a room reminiscent of home`,
      `at the carefully-hidden entrance to their zone`,
      `at a remote meeting place`
    ]
  },
  'taboo place': {
    tag: 'taboo place',
    type: 'ruins',
    context: `The locals surrounding the ruin consider it taboo ({religious reverence|ancestral holy place|disputed territory|catastrophic forces|sealed evil}). Objects looted from the place will be very hard to sell discreetly anywhere near it.`,
    enemies: [
      { alias: `Relentless leader of the guardians` },
      { alias: `The monstrous thing within that must not be disturbed`, monstrous: true },
      { alias: `Ruin raider who will cause chaos with their plundering` }
    ],
    friends: [
      { alias: `Earnest treasure hunter` },
      { alias: `Local who doesn't believe in the taboo` },
      { alias: `Warden concerned about an invasion from within` }
    ],
    complications: [
      `The locals are absolutely right that meddling with the place will bring disaster on them`,
      `The ruin somehow marks those who profane it`,
      `The ruin can be entered lawfully {under some special circumstance|by certain people}`
    ],
    things: [
      `a pass to allow lawful entrance`,
      `an unsellable distinct treasure from the place`,
      `a device to overcome the watchfulness of the guardians`
    ],
    places: [
      `at an Exemplary warning-pike with heads attached`,
      `at a long-sealed entrance portal`,
      `at a vigilant guard outpost`
    ]
  },
  'things below': {
    tag: 'things below',
    type: 'ruins',
    context: `The ruin delved too deep and things came boiling out that brought its destruction. Those things have {fallen asleep again|returned to their realm|taken refuge and wait for fresh prey}. They may come and go {based on particular time cycles|when provoked by certain rituals|in response to activities within the place}.`,
    enemies: [
      { alias: `Abomination from below`, monstrous: true },
      { alias: `Malign planar conqueror`, monstrous: true },
      { alias: `Cultist leader who reveres these eldritch powers` }
    ],
    friends: [
      { alias: `Historian seeking more truth about the things` },
      { alias: `Relative of a victim of the things`, relative: true },
      { alias: `Eager explorer who doesn't believe in the things` }
    ],
    complications: [
      `The things are associated with monstrous tides of dangerous vermin`,
      `The treasures to be had from delving are almost worth the risk`,
      `The treasures were actually living things that ruined the place`
    ],
    things: [
      `a precious object brought from below`,
      `the treasure that they were delving up`,
      `wealth left behind by the suddenly-slain natives`
    ],
    places: [
      `at an interrupted digging site`,
      `at a vault laden with the wealth of below`,
      `at the site of sudden terrible ruin`
    ]
  },
  'toxic radiation': {
    tag: 'toxic radiation',
    type: 'ruins',
    context: `This ruin is tainted by some form of slow poison that gradually kills all outsiders who enter ({toxic gas|lethal radiation|pollen from local plants|fungal spores}). The poison may not even be noticeable until its effects are dire.`,
    enemies: [
      { alias: `Poison-eating abomination`, monstrous: true },
      { alias: `Sinister alchemist` },
      { alias: `Spirit of the toxin`, monstrous: true }
    ],
    friends: [
      { alias: `Curious adapted local` },
      { alias: `Wary treasure-hunter` },
      { alias: `Scholar seeking the poison` },
      { alias: 'Mage testing protection against the evil' }
    ],
    complications: [
      `The poison empowers certain types of creatures`,
      `The toxin cannot be avoided by mundane means`,
      `The poison is holy to some dark cult`,
      "A clan of criminals has laid claim to the poison's source"
    ],
    things: [
      `a poison {cure|preventative}`,
      `a relic that is the poison's source`,
      `a prize lost long ago within`
    ],
    places: [
      `at an altar to a toxic god`,
      `in a room with seemingly-untouched corpses`,
      `near bodies rimed over with accreted toxins`,
      'in a hall of green mist'
    ]
  },
  'useless treasure': {
    tag: 'useless treasure',
    type: 'ruins',
    context: `The ruin was once a carefully-guarded storehouse of some {{product|substance} ({obscure materials|exotic matter fashioned by sorcery})|information (critical intelligence on ancient empires)} that was priceless at the time, but is now largely worthless.`,
    enemies: [
      { alias: `Tireless immortal guardian`, monstrous: true },
      { alias: `Brutally relentless treasure seeker` },
      { alias: `Maddened sorcerer trying to unlock the “real value” of the treasure` }
    ],
    friends: [
      { alias: `Mistakenly optimistic adventurer` },
      { alias: `Seeker with a lost key to the wards` },
      { alias: `Local denizen who knows the treasure is worthless` }
    ],
    complications: [
      `The natives may prize the stuff even if the world outside doesn't`,
      `The treasure really is valuable to the very few who know how to use it`,
      `The useless treasure is cased with then-useless material that is priceless now`
    ],
    things: [
      `tremendously well-guarded debris`,
      `text showing how to use the treasure`,
      `the key to suppress the treasure's security system`
    ],
    places: [
      `in a vast vault full of garbage`,
      `at a guard post manned by undying watchers`,
      `at a ancient luxury area featuring the {material|the wealth it brought them}`
    ]
  },
  "wizard's lair": {
    tag: "wizard's lair",
    type: 'ruins',
    context: `Wizards often require an emphatic degree of privacy to ward off importunate help-seekers, witch hunters, rivals in the art, or reckless thieves. This ruin is or once was a lair to one such wizard ({venerable|eldritch|necromantic}), who probably isn't inclined to view visitors kindly. Even the dead ones may have left behind half-finished enchantments and unaging automaton servitors to guard their {venerable lore|precious magical relics}.`,
    enemies: [
      { alias: `Immortal and heartless wizard` },
      { alias: `Monstrous creation of a dead mage`, monstrous: true },
      { alias: `Modern sorcerer exploiting the lair of a dead archmage` }
    ],
    friends: [
      { alias: `Well-meaning apprentice` },
      { alias: `Escapee from one of their experiments` },
      { alias: `Vengeful mage-hunter` }
    ],
    complications: [
      `They perform some service vital to the locals, but at a terrible price`,
      `No one's heard from them for so long that it's thought they're dead`,
      `It's actually a lair for a {school|cabal} of wizards`
    ],
    things: [
      `a precious sorcerous grimoire`,
      `a magical item crafted there`,
      `the vast wealth given by petitioners`
    ],
    places: [
      `in a chamber with a half-finished and dangerous enchantment`,
      `near the pens for alchemical monstrosities`,
      `in living quarters that are physically impossible somehow`
    ]
  }
}
