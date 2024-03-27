import { WildernessHooks } from './types'

export const wilderness: WildernessHooks = {
  'Abandoned Village': {
    text: 'Wilderness villages tend to be unstable “gold rush” settlements in the best of times, attracting those who lack any sound place elsewhere. This village failed as rapidly as it was formed. It may have been overrun by marauders, depopulated by disease, hollowed out by a failed harvest, torn apart by civil strife, or just abandoned for better prospects elsewhere.',
    enemies: [
      { title: 'Bandit chief or sorcerer responsible for the ruin' },
      { title: 'Crazed village head turned hermit' },
      { title: 'Monstrous entity nesting in the remains', monstrous: true }
    ],
    friends: [
      { title: 'Last stubborn holdout' },
      { title: "Lord's bailiff looking for answers" },
      { title: "Hapless pioneer who's arrived to an empty ruin" }
    ],
    complications: [
      "It's now populated by something inhuman",
      'It was built on top of a place abandoned for good reason',
      'The wilderness is reclaiming it in a dangerous way'
    ],
    things: [
      'Heirloom left behind in the flight',
      'Buried treasure of the villagers',
      'The relic that caused the ruin'
    ],
    places: [
      'Overgrown village meeting hall',
      'Home with everything left just as it was at that moment',
      'Burnt-out shrine to the local god'
    ],
    hostiles: [
      {
        type: 'minor',
        text: 'a pack of wild beasts roams the streets, hungry and aggressive',
        setting: 'narrow, overgrown paths with the stench of decay'
      },
      {
        type: 'minor',
        text: 'ghosts of the villagers haunt their former homes',
        setting: 'abandoned houses, filled with whispers and cold drafts'
      },
      {
        type: 'minor',
        text: 'thieves scavenging the village, quick to silence witnesses',
        setting: 'rubble-strewn interiors, cluttered with remnants of life'
      },
      {
        type: 'minor',
        text: 'a swarm of poisonous insects nesting in the ruins',
        setting: 'underneath foliage, buzzing fills the air, mixed with rot'
      },
      {
        type: 'major',
        text: 'an enraged beast, displaced and making the village its den',
        setting: 'a clearing, marked by clawed trees and heavy growling'
      },
      {
        type: 'major',
        text: 'bandits using the village as a base, led by a ruthless chief',
        setting: 'makeshift fortifications, the smell of smoke pervasive'
      },
      {
        type: 'major',
        text: 'a group of cultists summoning a dark entity in the shrine',
        setting: 'the burnt-out shrine, echoes of chanting, air crackling'
      },
      {
        type: 'major',
        text: 'possessed villagers, remnants of a curse',
        setting: 'the haunting gaze of the cursed, the village cloaked in a supernatural chill'
      },
      {
        type: 'boss',
        text: 'the sorcerer whose curse doomed the village, seeking power',
        setting: 'atop the meeting hall, energy swirling, thunderous sky'
      },
      {
        type: 'boss',
        text: 'monstrous entity, the true reason the village was abandoned',
        setting: 'deep within the forest, where darkness swallows light'
      },

      {
        type: 'boss',
        text: "a giant beast, mutated by the relic's power",
        setting: 'its roars shake the ruins, an ominous presence that darkens the sky'
      },
      {
        type: 'boss',
        text: 'the village head, now a powerful undead, guards his secrets',
        setting: 'his home, untouched by time, the air heavy with sorrow'
      }
    ]
  },
  'Ancient Guardians': {
    text: 'There are guardians in the nearby wilderness derived from some ancient polity, whether constructs built to protect some long-forgotten place here or the restless shades of the dead who once dwelled in the location. They may have a simple hatred towards “invaders” or they may be confused, thinking interlopers are part of some ancient enemy group. What they once guarded may not even exist any more in any perceptible way.',
    enemies: [
      { title: 'Unrelenting golem leader', monstrous: true },
      { title: 'Maddened sorcerer-lord shade', monstrous: true },
      { title: 'Sinister heir seeking to suborn the guardians to their service' }
    ],
    friends: [
      { title: 'Diplomatic guardian entity', monstrous: true },
      { title: 'Greedy treasure-hunter' },
      { title: 'Local who got trapped in the place' }
    ],
    complications: [
      'The guardians are to keep something in',
      'A local group uses the guardians as a trap for outsiders',
      'The guardians were never meant to be harmful but what they do to intruders is very damaging'
    ],
    things: [
      'Key to shut down or ward off the guardians',
      'The precious relic they were guarding',
      'Ritual garb that makes the wearer invisible to the guardians'
    ],
    places: [
      'Place of ominously martial statuary',
      'Ghostly street-image of a vanished place',
      'Broken remnant of an ancient landmark'
    ]
  },
  'Ancient Monument': {
    text: "A grand monument to some ancient polity is found here. While its actual meaning and significance may be inscrutable, it's probably big enough and dramatic enough to dominate the area, even if it's collapsed or been defaced by the ages. The remains of the civilization that raised it might be found at its base, along with whatever heirs to it remain. Some monuments still have active enchantments or guardians to prevent defacement.",
    enemies: [
      { title: 'Zealous modern cultist of the vanished polity' },
      { title: 'Last bitter heir of them' },
      { title: 'Vile monster that nests in the monument', monstrous: true }
    ],
    friends: [
      { title: 'Eager archaeologist' },
      { title: 'Weary old hereditary keeper of the place' },
      { title: "Friendly creature that's made the monument a home", monstrous: true }
    ],
    complications: [
      'The monument is a powerful enchantment',
      'The monument served a secular or residential purpose',
      'The bulk of the monument is underground or in an extradimensional pocket Iterum'
    ],
    things: [
      'Costly decorations or ornaments on the monument',
      'The precious core of the work',
      'Ancient offerings made to it by vanished supplicants'
    ],
    places: [
      'Before some towering mega-structure-monument',
      'Amid the cyclopean wreckage of its fall',
      'Secret passages within the monument'
    ]
  },
  'Arratu Land': {
    text: "There is a large pocket of arratu within the nearby wilderness, even though it may be too small to show up on the area map. Such a pocket might be the last remnant of a formerly-great swath, or it could just be a localized tumor created by an Outsider device, a malevolent sorcerer, or a magical disaster. Something about the arratu's placement likely forces the party to go well out of their way to bypass it safely; it might command a narrow pass or be flanked by dangerous terrain on either side.",
    enemies: [
      { title: 'Outsider beast within the waste', monstrous: true },
      { title: 'Half-human marauder chief lairing inside', monstrous: true },
      { title: 'Crazed Outsider wizard who made the wasteland', monstrous: true }
    ],
    friends: [
      { title: 'Foolish explorer who tried to cross it' },
      { title: 'Wretched slave taken by raiders' },
      { title: 'Not-too-homicidal native', monstrous: true }
    ],
    complications: [
      'The wasteland is being contained by a potentially-breakable object here',
      'Locals know how to get through it safely',
      "It's a very new wasteland and the locals haven't adjusted to it yet"
    ],
    things: [
      'Equipment to survive the hostile atmosphere within',
      'Precious Outsider relic',
      'Wealth seized by raiders from the waste'
    ],
    places: [
      'Blasted village overrun by alien life',
      'Desolate plain with an unearthly sky above',
      'Lakeshore of a pool filled with a noxious chemical'
    ]
  },
  'Bandit Lair': {
    text: 'Bandits lair in the nearby wilderness, which is presumably close enough to civilized lands to serve as a base for their operations. Not every bandit lair is a hidden cave; some operate out of subverted or cowed villages, others hide among remote monasteries, and some just camp in convenient glades long enough to rest, refit, and trade with black marketeers. It might be a seasonal lair as well, with local peasants turning bandit at certain profitable times of the year.',
    enemies: [
      { title: 'Ruthlessly pragmatic bandit chief' },
      { title: 'Wealthy grandee wielding the bandits against rivals' },
      { title: 'Heartless slaver gathering stock' }
    ],
    friends: [
      { title: 'Hapless missionary of a kinder way' },
      { title: 'Local taken as a slave' },
      { title: 'Runaway bandit who repents' }
    ],
    complications: [
      "They have a traditional prey and don't usually rob others",
      "They're the degenerate remnants of a once-noble cause",
      "They're a confederacy of thieving groups that often quarrel"
    ],
    things: [
      'Loot taken from a recent success',
      'Priceless heirloom owned by a noble-turned-bandit',
      "Precious relic the bandits don't realize is so valuable"
    ],
    places: [
      'Raucous glade full of drink and debauchery',
      'Repurposed estate',
      'Makeshift palisaded camp'
    ]
  },
  'Beast Swarm': {
    text: 'There is a swarm of some dangerous beast in the area, whether it consists of a tide of minuscule vermin or a pack of magically-warped predators. Some of these swarms may serve more as environmental hazards than monsters to be fought; sweeping carpets of mutated radioactive fire ants might be something for the PCs to dodge rather than engage. If the beasts have some mundane value, they might have attracted suitably reckless interest from the locals.',
    enemies: [
      { title: 'Supernaturally intelligent god-beast', monstrous: true },
      { title: 'Mad wizard who spawned them' },
      { title: 'Brutal hunt master driving #possessive# wretched minions on' }
    ],
    friends: [
      { title: 'Victim of a beast attack' },
      { title: 'Animal collector on a mission' },
      { title: 'Hunter in search of vengeance' }
    ],
    complications: [
      'The beasts are usually harmless but have recently changed',
      'The beasts are the only thing holding a worse peril back',
      'The beasts gain magical powers in sufficiently large groups'
    ],
    things: [
      'Poison that is very lethal to the beasts',
      'Relic that can control the swarms',
      'Priceless treasure held by a luckless hunter'
    ],
    places: ['Site of a bestial massacre', 'Fetid den of a swarm', "Overrun hunter's camp"]
  },
  'Blighted Tribe': {
    text: 'A tribe of Blighted live in the hex. They may be violent war-creatures naturally hostile to normal humanity or beings cursed with some trait or nature that makes it impossible for them to live in civilization. Relations are unlikely to be warm in either case, but the latter might be persuaded to parley if the party can work around their limitations and win their trust.',
    enemies: [
      { title: 'Brutal Blighted war-chief', monstrous: true },
      { title: 'Outsider using them as living tools', monstrous: true },
      { title: 'Human hunter bent on slaughtering inoffensive Blighted' }
    ],
    friends: [
      { title: 'Native not so Blighted as their brethren', monstrous: true },
      { title: 'Human trader who deals with them' },
      { title: 'Local human who knows their ways' }
    ],
    complications: [
      'Their blight was once very useful to the ancient polity that existed here',
      'They’re only Blighted because they lack something to temper it that this site once provided',
      'They’re dying out and desperate to win allies against their many predators'
    ],
    things: [
      'Valuable Blighted-made product',
      'Relics of those who twisted them',
      'Trophies taken from their prey'
    ],
    places: [
      'Human structure reworked to fit their nature',
      'Site of a gruesome massacre',
      'Shrine or monument honoring their creators'
    ]
  },
  'Broken Infrastructure': {
    text: 'There is a ruin here that once enabled some grand ancient infrastructure. A lost canal lock, irrigation control center, magical gate nexus, weather control station, underground transit station, occult communications center, or some other great function was once performed here. The ruin has been unusable for ages, but remnants of its former function might still be found in the surroundings.',
    enemies: [
      { title: 'Sorcerer looting the wreckage' },
      { title: 'Monstrous remnant of the former inhabitants or guardians', monstrous: true },
      { title: 'Modern parasite-monster come to feed on the scraps', monstrous: true }
    ],
    friends: [
      { title: 'Curious arcane student' },
      { title: 'Tribal who lives in the ruin' },
      { title: 'Wayfarer forced to seek refuge there' }
    ],
    complications: [
      'It still works but in a dangerous and unhelpful way',
      'It would cause a tremendous local disaster if it were re-activated',
      'The locals are exploiting it in an unintended fashion'
    ],
    things: [
      'Control key for the original function',
      'Relic related to the original function that does something magical',
      'Precious component from it'
    ],
    places: [
      'Long-ruined control nexus',
      'Collapsed service or operational area',
      'Surrounding area scarred by the decayed remnants of its function'
    ]
  },
  Chokepoint: {
    text: "There's a natural choke point in this area: a mountain pass, a land bridge, a dry ridge in a swamp, a narrow strand of untainted arratu land, a gap in a megastructure, or some other slender passage. Such a chokepoint is likely part of a feature that extends outside the area, and it may be prohibitively difficult to cross this feature anywhere else. Such valuable, defensible areas are rarely left unoccupied.",
    enemies: [
      { title: 'Bandit lord who “taxes” passersby' },
      { title: 'Monstrous creature who hunts there', monstrous: true },
      { title: 'Ancient guardian of a long-dead polity', monstrous: true }
    ],
    friends: [
      { title: 'Trader in dire need' },
      { title: 'Explorer seeking a better way' },
      { title: 'Local currently inhabiting the chokepoint' }
    ],
    complications: [
      'It can be opened or blocked by a controller',
      "It's only recently become abnormally dangerous",
      "It's known of only by those who want it kept secret"
    ],
    things: ['Map of the passage', 'Token allowing safe passage', 'Key to controlling the passage'],
    places: [
      'Perfect ambush site',
      'Natural fortress',
      'High observation point commanding the pass'
    ]
  },
  'Collapsed Deep': {
    text: 'An ancient Deep once was located here, but time, warfare, or disaster caused it to collapse. A significant portion of the surface has likely subsided to form an uneven crater. Small sections of the Deep might still be accessible from the surface, and dangerous uncollapsed passageways may still connect these smaller zones. The heirs of the survivors may still persist on the surface or they may have long since died out to natural hazards or dispersion.',
    enemies: [
      { title: 'Buried undying lord', monstrous: true },
      { title: 'Surface looter with dreams of rule', monstrous: true },
      { title: 'The thing that caused the collapse', monstrous: true }
    ],
    friends: [
      { title: 'Friendly survivor descendant', monstrous: true },
      { title: 'Curious explorer' },
      { title: 'Native guide to the ancient pit', monstrous: true }
    ],
    complications: [
      'Things below are digging their way up',
      'The Deep is leaking something dangerous',
      'The collapse was recent and monstrous survivors still flee'
    ],
    things: [
      'Priceless Deep treasure cast up',
      'Exposed arcane components',
      'Potent relic carried by survivors'
    ],
    places: [
      'Ancient vault torn in two',
      'Crevasse cutting through a hundred ruined levels',
      'Buckled structure fragment jutting through the surface'
    ]
  },
  'Criminal Meet': {
    text: 'There is a site in the nearby wilderness that is used as a meeting place for smugglers, bandits, illegal slavers, fences, or other criminals. Something about the place gives them a good view of any incoming strangers and discreet privacy for their dealings. Some few criminals may remain here at all times to maintain the place, or it might be used only as the situation requires. These criminals may be particular, dealing only with known associates, or they may be far enough from the law to feel comfortable about trading with adventurers.',
    enemies: [
      { title: 'Corrupt merchant grandee' },
      { title: 'Sinister black market boss' },
      { title: "Monstrous entity that enforces the meet's peace", monstrous: true }
    ],
    friends: [
      { title: 'Theft victim searching for their goods' },
      { title: 'Frustrated local lawman' },
      { title: 'Merchant with suspicions about a fence' }
    ],
    complications: [
      'The local authorities turn a knowing blind eye to it',
      'The meet is trading in something much worse than everyone thinks it is',
      'Significant amounts of stolen goods are stored there'
    ],
    things: [
      'Valuable smuggled contraband',
      'Cache of stolen goods',
      "Precious object that's very hard to fence"
    ],
    places: [
      'Concealed cave storehouse',
      'Rocky observation point',
      'Sheltered glade in a thick forest'
    ]
  },
  'Cryptic Art': {
    text: 'A vast ancient work of art has been raised here, back when the wilderness was not so wild. It may be a statue or other sculpted monument, perhaps of entities in no way human, or it may be fashioned of solid light, sound, emotions, or stranger media. The intended meaning of this art is usually incomprehensible to modern humanity and the structure is too large or too difficult to harm for ordinary vandals or time to have erode it entirely. Some ancient forms of art can be dangerous or even lethal to modern humans.',
    enemies: [
      { title: 'Ancient site guardian', monstrous: true },
      { title: "Priest of a cult that's made a religion of the art" },
      { title: 'Sorcerer bent on suborning a magical artwork' }
    ],
    friends: [
      { title: 'Reckless art connoisseur' },
      { title: 'Native living in the artwork' },
      { title: 'Historian trying to decipher it' }
    ],
    complications: [
      "It has a positive or negative effect on a viewer's body or mind",
      "It's been warped into something monstrous by time or decay",
      'It encodes a terrible or precious secret to those who understand it'
    ],
    things: [
      "Ancient texts that can decode the art's meaning",
      'Precious object used in its construction',
      "Fragment of damaged art that's still valuable"
    ],
    places: [
      'Intended viewing site for the art',
      'Churning inner mechanism of a complex work',
      'Hidden chamber revealing a different perspective of the work'
    ]
  },
  'Cursed Land': {
    text: 'There is a site in the nearby wilderness that has been cursed. Rather than being a simple xenoformed arratu, some malevolent magic has laid a persistent, dangerous affliction on the area. Creatures may be warped, inhabitants may be plagued, terrible luck might strike all passers-by, or natural physical processes might be perverted. There should be something valuable or attractive here, or else few people would have any reason to engage with the location.',
    enemies: [
      { title: 'Vile sorcerer responsible for the curse' },
      { title: 'Hideously-warped native creature', monstrous: true },
      { title: 'Curse-beast that sweats the malison with its very existence', monstrous: true }
    ],
    friends: [
      { title: 'Local curse victim' },
      { title: 'Native sorcerer trying to lift it' },
      { title: "Hapless pioneer who didn't realize it was there" }
    ],
    complications: [
      'It has a seemingly positive effect as well',
      "The seemingly obvious source of the curse isn't at all responsible",
      'Someone profits by the curse'
    ],
    things: [
      'Ward to protect against the curse',
      'Precious byproduct of the magic',
      'Key to undoing the curse'
    ],
    places: [
      'Warped and twisted natural feature',
      'Nest of misshapen beasts',
      'Field of grossly-mutated plant life'
    ]
  },
  'Decayed Enchantment': {
    text: "There's an ancient enchantment in the area that is broken or decayed, and the original effect it was intended to produce has been twisted into something dangerous. Infrastructure enchantments meant to provide good fortune, health, or swift travel might now create ill-luck, plagues, or vomit forth extra-dimensional horrors. Small enchantments of private buildings might now create localized hazards. Completely destroying the enchantment might end the problem or create an even greater disaster from the magical fallout.",
    enemies: [
      { title: 'Enchantment-born abomination', monstrous: true },
      { title: 'Ancient caretaker gone berserk', monstrous: true },
      { title: 'Sorcerer tearing apart the enchantment recklessly for lore and parts' }
    ],
    friends: [
      { title: 'Native who knows how to live with the blight' },
      { title: 'Ambitious would-be repairman' },
      { title: 'Curious scholar looking for details' }
    ],
    complications: [
      'The decay can be contained with vile or costly rituals by the locals',
      'The decay is endured because it fends off outsiders',
      'A local enemy wants to worsen the effect'
    ],
    things: [
      'Parts to repair the enchantment',
      'Valuable magical byproducts',
      'Precious enchantment fragments'
    ],
    places: [
      'Decaying enchantment chamber',
      'Site twisted by the magical effect',
      'Collapsed arcane structure'
    ]
  },
  'Devil Grove': {
    text: "There's a glade or zone within the area that's infested with Outsider flora and fauna. Beasts from within prowl the surrounding area, though some circumstance is preventing the glade from growing at a very rapid pace. Some ancient Outsider device may be causing the glade, or it might be the tiny remnant of some ancient wasteland that's shrunken with time and the constraint of the Legacy.",
    enemies: [
      { title: 'Hideous Outsider predator', monstrous: true },
      { title: 'Mutant warchief hiding in the grove', monstrous: true },
      { title: 'Ancient Outsider maintaining the grove', monstrous: true }
    ],
    friends: [
      { title: 'Hard-pressed pioneer' },
      { title: 'Local hunter harried by the beasts' },
      { title: "Adventurer seeking the grove's cause" }
    ],
    complications: [
      'Local rustics sacrifice to the grove to placate its denizens',
      'The grove is valued as a natural defense against a neighboring threat',
      'Exiles and criminals seek refuge there'
    ],
    things: [
      'Precious byproduct of alien life',
      'Outsider relic in the heart of the grove',
      'Valuable goods on a victim of the beasts'
    ],
    places: [
      'Glen swollen with uncanny life',
      'Windy vale streaked with plumes of alien air',
      'Shore of a pond full of some noxious chemical'
    ]
  },
  'Disused Mine': {
    text: 'A mine of some kind once existed here. While shaft mines with tunnels and galleries are the common type for present-day delvings, ancient strip mines here may have peeled off whole mountainsides or exposed some massive megastructure that was stripped for parts in a prior, lost age. The forgotten mines of a prior era might have left tailing piles or trace deposits that are valuable to a more depleted age.',
    enemies: [
      { title: 'Crazed wildcat miner' },
      { title: 'Thing from delving too deep', monstrous: true },
      { title: 'Undead and tireless mine boss', monstrous: true }
    ],
    friends: [
      { title: 'Eager prospector' },
      { title: 'Native dwelling in the mines' },
      { title: 'Ancient friendly mining automaton', monstrous: true }
    ],
    complications: [
      'They were mining a buried civilization rather than ores',
      'Groups are fighting over control of the mine',
      'The mine was partially re-purposed for the needs of a group of natives'
    ],
    things: [
      'Motherlode of precious materials',
      'Storehouse of refined product',
      'Map to a virgin strike'
    ],
    places: [
      'Massive pitch-black subterranean gallery',
      'Mound made of centuries worth of tailings',
      'Still-poisoned land in a processing waste zone'
    ]
  },
  'Enchanted Wreckage': {
    text: "A powerful enchantment once was in the area, but has long since collapsed, decayed, or been destroyed by others. It's at least building-sized, with some enchantments being fullscale megastructures raised by ancient empires. While the enchantment's original effect has long dissipated, pockets or fragments of it may still persist in the area, along with the automatons or servitor-people once charged with maintaining the site.",
    enemies: [
      { title: "Animated manifestation of the enchantment's power", monstrous: true },
      { title: 'Sorcerer-looter gutting the wreck' },
      { title: 'Brutal chief of the natives mutated by its power' }
    ],
    friends: [
      { title: 'Scholar dreaming of activating it once more' },
      { title: 'Treasure-hunter eager to pick its bones' },
      { title: 'Local from the surviving caretakers' }
    ],
    complications: [
      'It would cause a regional catastrophe if reactivated',
      'Even its remnant effects have large consequences',
      'It was ruined when it was retuned to create a different effect'
    ],
    things: [
      'Key to controlling its remaining power',
      "Spare part that's now priceless",
      'Valuable fragment of wreckage'
    ],
    places: [
      'Abandoned control room',
      "Site of massive destruction from the enchantment's collapse",
      'Nest or lair built into the ruin'
    ],
    hostiles: [
      {
        type: 'minor',
        text: 'a pack of mutated beasts, their forms twisted by lingering magic',
        setting:
          'near the edges of the wreckage, where nature has begun to reclaim the ruins. The air smells of moss and magic, with the distant sound of mechanical whirring.'
      },
      {
        type: 'minor',
        text: 'a group of looters trapped by a malfunctioning security enchantment',
        setting:
          'inside a partially collapsed building, dust hangs in the air, and the sound of frustrated shouts echo against the walls.'
      },
      {
        type: 'minor',
        text: 'sentient plants twisted by magic, seeking to entangle and digest intruders',
        setting:
          'a once-grand garden, now overgrown and sinister. The scent of decay mixes with the perfume of flowers, and the rustling leaves whisper secrets.'
      },
      {
        type: 'minor',
        text: 'enchanted armors, empty yet animated, guarding a forgotten vault',
        setting:
          'a narrow corridor lined with statues, that spring to life with a metallic clank. The air is cool and smells of rust.'
      },
      {
        type: 'major',
        text: 'a corrupted guardian automaton, its programming twisted to attack all',
        setting:
          'in a vast, open chamber, filled with the echoes of its heavy steps. Sparks fly from its form, lighting the darkness with brief flashes.'
      },
      {
        type: 'major',
        text: "a cult trying to harness the wreckage's power for a dark ritual",
        setting:
          'at the heart of the ruins, surrounded by arcane symbols and the heavy scent of incense. Chanting fills the air, building in intensity.'
      },
      {
        type: 'major',
        text: 'a giant, mutated beast, once a protector of the site, now driven mad by its power',
        setting:
          "amidst the rubble of a great hall, where the creature's roars reverberate. The ground is littered with debris, making navigation treacherous."
      },
      {
        type: 'major',
        text: 'a sorcerer using enchanted artifacts to summon and control shadow creatures',
        setting:
          'an open plaza, illuminated by a strange, otherworldly light. Shadows dance across the ground, taking form and substance.'
      },
      {
        type: 'boss',
        text: 'an ancient, semi-aware enchantment seeking to rebuild and defend itself',
        setting:
          'within a massive, domed chamber, where magical energy crackles in the air. The light is dim, punctuated by the glow of runes and sigils.'
      },
      {
        type: 'boss',
        text: "a massive elemental, birthed from the site's chaotic magic, its form ever-changing and unpredictable",
        setting:
          'in an open field, scarred by magical eruptions, where the ground itself seems alive and the air crackles with elemental fury'
      },
      {
        type: 'boss',
        text: 'an ancient dragon, attracted by the magic, now considers the ruins its domain, fiercely attacking all intruders',
        setting:
          "amidst the highest towers, where the dragon's roars echo and the smell of sulfur is strong, the skyline dominated by the dragon's massive, shadowy form"
      },
      {
        type: 'boss',
        text: "the spirit of the site's creator, bound to the ruins, seeking to expel intruders",
        setting:
          "within the deepest sanctum of the ruins, where the air is thick with power. The spirit's voice echoes from the walls, sorrowful yet wrathful."
      }
    ]
  },
  'Haunted Lighthouse': {
    constraints: { coastal: true },
    text: 'The haunted lighthouse stands on a desolate stretch of coastline, its light long extinguished. It is rumored to be haunted by the spirits of those who perished at sea. Strange lights and eerie sounds emanate from it at night, and it is avoided by locals. The lighthouse holds many secrets, including the reason for its haunting and the fate of its last keeper.',
    enemies: [
      { title: 'Ghost of the vengeful lighthouse keeper', monstrous: true },
      { title: "Cult leader seeking to harness the lighthouse's spirits", veteran: true },
      { title: 'Pirate ghost haunting the surrounding waters', monstrous: true },
      { title: 'Smuggler using the lighthouse as a base', foreign: true },
      { title: 'Dark entity bound to the lighthouse', monstrous: true }
    ],
    friends: [
      { title: "Local historian knowledgeable about the lighthouse's past" },
      { title: "Medium trying to communicate with the lighthouse's spirits" },
      { title: 'Descendant of the lighthouse keeper seeking closure' },
      { title: 'Official investigating strange occurrences' },
      { title: "Curious traveler drawn to the lighthouse's mystery", foreign: true }
    ],
    complications: [
      "The lighthouse's light mysteriously reignites on stormy nights",
      'An unearthly fog surrounds the lighthouse, disorienting travelers',
      'Spirits in the lighthouse are restless due to a disturbed burial ground',
      'A hidden chamber in the lighthouse contains dark secrets',
      'The lighthouse is key to a local legend of a sunken treasure'
    ],
    things: [
      'Ancient logbook of the lighthouse keeper',
      'Relic belonging to a shipwrecked sailor',
      'Old lantern with an unexplained ethereal glow',
      'Map showing hidden coastal caves near the lighthouse',
      "Mysterious key found in the lighthouse keeper's quarters"
    ],
    places: [
      'Cliff overlooking the haunted lighthouse',
      'Abandoned village near the lighthouse',
      'Hidden cove where shipwrecks are common',
      'Old boathouse filled with forgotten tales',
      'Creepy graveyard of those who perished at sea nearby'
    ]
  },
  'Healing Terrain': {
    text: "There is a site in the nearby wilderness that borders a shrinking arratu, one being slowly driven back by the Legacy, the work of human hands, or some native life form that's capable of successfully competing with the alien life. There are usually some pioneers or scavengers trying to take advantage of the shrinking waste, either to work the newly-arable land or plunder the ruins its receding tide reveals.",
    enemies: [
      { title: 'Furious and frustrated Outsider waste-maker', monstrous: true },
      { title: 'Monstrous beast in too small a hunting ground', monstrous: true },
      { title: 'Local tyrant seeking dominion over the new pioneers', veteran: true }
    ],
    friends: [
      { title: 'Plucky new colonist' },
      { title: 'Earnest professional mender of wastes' },
      { title: 'Luckless soldier sent to defend the new locals' }
    ],
    complications: [
      'The shrinking wastes are revealing a lost human city below',
      'As the waste shrinks its effects are getting more concentrated inside it',
      'The receding zone is opening a safe path for old enemies to strike the new holdings'
    ],
    things: [
      'Treasures long lost within the waste',
      'Possessions cherished by a now-dead pioneer',
      'Precious product of the alien flora that now grows scarce'
    ],
    places: [
      'Half-warped glade where alien life is losing',
      'Newly-built steading',
      'Exposed ancient structure'
    ]
  },
  Hermitage: {
    text: "A small hermitage was established here sometime in the past to provide solitude for some ascetic. Occasionally small clusters of hermits form around such a central point, meeting at times to check on each other or join in shared discipline. Such anchorites usually shun visitors who aren't also devotees of their path, but occasionally a hermit wins such fame for sorcery or wisdom that pilgrims seek them out. Some hermits have been known to respond with great anger toward these repeated worldly interruptions.",
    enemies: [
      { title: 'Hermit sorcerer gone mad' },
      { title: 'Sinister villain hiding as a hermit' },
      { title: 'Alien hermit with inscrutably evil philosophical principles', monstrous: true }
    ],
    friends: [
      { title: 'Worried relative of a new hermit' },
      { title: 'Petitioner seeking holy help' },
      { title: 'Hermit rethinking solitude' }
    ],
    complications: [
      'The hermits have control over a local magical energy or enchantment',
      'They keep themselves separate to keep others safe from them and their irrepressible powers',
      'The hermit is hated by the local secular authorities for their aid to its foes'
    ],
    things: [
      'Precious religious relic carried by the hermit',
      'Cast-off worldly wealth',
      'Map to finding them'
    ],
    places: [
      'Austere wilderness cave',
      'Hermit hole in a grave-mound in the swamps',
      'Tall and narrow stone column for sitting on'
    ]
  },
  'Historical Survival': {
    text: "Some small community or remnant group of an ancient empire persists here. They may have been a colony planted before the empire's fall, an outside group that inherited the culture after conquest or subsumption, a chronological distortion cast out of time, a group held in stasis that recently awoke, or some other remnant of a greater past. They may or may not have a clear idea of the present world, but may preserve knowledge of now-lost strongholds and points of power once held by their ancestors.",
    enemies: [
      { title: 'Embittered revanchist ruler', monstrous: true },
      { title: 'Vengeful chieftain who blames the world', monstrous: true },
      { title: 'Trans-human leader of incomprehensible cognition', monstrous: true }
    ],
    friends: [
      { title: 'Heritor curious about outsiders', monstrous: true },
      { title: 'Desperate chief in need of outside help', monstrous: true },
      { title: 'Determined preserver of ancient identity', monstrous: true }
    ],
    complications: [
      'The empire they belonged to was infamous',
      "They're only notionally human",
      'They make deals with rebels and exiles of neighboring lands'
    ],
    things: [
      'Long-preserved ancient regalia',
      'Now-lost relic in common use in their empire',
      'Secret lore to unlock hidden storehouses of their people'
    ],
    places: [
      'Crumbling and dilapidated public building',
      'Crude shrine with too-advanced salvaged ornaments',
      'Passages kept secret from the world'
    ]
  },
  'Isolated Academy': {
    text: 'A school of sorcerers, esoteric artists, hermit-scholars, or other educators is in the area. The place might once have been the heart of the ancient city where the academy was founded, or it may have special magical or aesthetic traits to attract practitioners, or the topic they study might be abhorrent to civilization. The academy is likely largely self-sufficient but its students and teachers doubtless retain some ties to the outer world.',
    enemies: [
      { title: 'Sinister headmaster' },
      { title: 'Powerful instructor with a dark purpose' },
      { title: 'Monstrous thing the academy serves', monstrous: true }
    ],
    friends: [
      { title: 'Sympathetic young student', youth: true },
      { title: 'Pilgrim aspiring to be admitted' },
      { title: 'Harried instructor needing help' }
    ],
    complications: [
      'It has two curricula with the second being much darker and known only to initiates',
      "It's protected by its terrible patron power",
      'An awful sacrifice is demanded of some or all students'
    ],
    things: [
      "Tome of secret lore they've developed",
      "Magical object they've created",
      "Key to bypassing the academy's defenses"
    ],
    places: [
      'Mundanely-impossible lecture hall',
      'Artistic work of inhuman nature',
      'Site scorched and blasted by their mistakes or training errors'
    ]
  },
  'Labyrinthine Tangle': {
    text: "The terrain is remarkably tangled and treacherous, such that it's almost impossible to cross it without a guide or very good map. This tangle may be the result of shifting, boggy ground, wildly overgrown forest, looming cliffs that box in travel, or magical miasmas that baffle and disorient. Some regions might have spatial distortions born of ancient magic, such that only the right keys allow outsiders to pass them.",
    enemies: [
      { title: 'Sinister master of the labyrinth', monstrous: true },
      { title: 'Monstrous creature born of the wild', monstrous: true },
      { title: 'Savage exile hiding in the maze' }
    ],
    friends: [
      { title: 'Helpful local guide' },
      { title: 'Hapless soul lost within it' },
      { title: 'Friendly native of the maze', monstrous: true }
    ],
    complications: [
      'Getting lost in it can leave you very far from your entry point',
      'An environmental hazard harms you more the longer you stay in it',
      'Guides sacrifice certain clients to the powers within'
    ],
    things: [
      'Map of the labyrinth',
      'Treasure lost by a victim within it',
      'Precious object the labyrinth guards'
    ],
    places: [
      'Trail that looks like all the rest',
      'Trees or cliffs too difficult to scale blocking out any distant view',
      'Ancient megastructure with perfectly identical massive decorative fragments that form a maze'
    ]
  },
  'Lost Battlefield': {
    text: 'A terrible battle was fought here at some point in the past, perhaps before the wilderness became what it is now. The locals may or may not remember the event, but the battle left some pronounced effect on the area. Undead may be exceptionally common here, or an ancient weapon may have curdled the land, or the automatons that fought here may still be watchful for new enemies.',
    enemies: [
      { title: 'Looter-archaeologist and #possessive# minions' },
      { title: 'Undying warlord', monstrous: true },
      { title: 'Relentless ancient automaton', monstrous: true }
    ],
    friends: [
      { title: 'Curious scholar from afar' },
      { title: 'Heir to one of the warring sides' },
      { title: 'Ancestral caretaker of the field' }
    ],
    complications: [
      'The battle is reenacted by locals either ritually or in earnest every so often',
      'A priceless item of ruling regalia was lost here',
      "The battlefield's full of unexploded ancient munitions"
    ],
    things: [
      'Potent weapon of ancient days',
      'Precious treasure carried here by a slain noble warrior',
      'Bones of a sainted hero revered by the locals'
    ],
    places: [
      'Hasty and makeshift tomb of a war leader',
      'Land churned up by ancient war magic',
      'Vast burial mound amid a bleak plain'
    ]
  },
  'Lost City': {
    text: "There was a city here once and its remnants can still be found through the overgrowth. It may have been an ancient city of some lost empire, or it could be a community more recently destroyed by some event and consumed by the surrounding wilderness. In the former case it's probably forgotten by all but the wisest scholars, while in the latter there's some pressing reason that its former people don't dare approach its site any more.",
    enemies: [
      { title: 'The terrible creature that destroyed it', monstrous: true },
      { title: 'Vengeful wraith of its last ruler', monstrous: true },
      { title: "Savage chieftain who's taken it for their seat of rule", monstrous: true }
    ],
    friends: [
      { title: 'Shy survivor of the original population' },
      { title: 'Local native who dares to enter it' },
      { title: 'Ancient city servitor who still functions', monstrous: true }
    ],
    complications: [
      'The city is plagued with magical aftershocks of the mighty sorcery that destroyed it',
      'The city was smashed before its inhabitants could do a great evil',
      "It's taboo ground for the nearby locals"
    ],
    things: [
      "Ancient city vault's treasures",
      'Precious relic of the dead',
      'Fragment of the thing that ruined it'
    ],
    places: [
      'Desolate street half-buried by earth and decay',
      'City monument worn into illegibility',
      'Wreckage of the catastrophic death of the city'
    ]
  },
  'Magical Springs': {
    text: "There's an enchanted spring in the area, one empowered by an ancient enchantment or warped by ambient currents of magic. The creatures that drink from it might be blessed with some special grace, but it's just as likely that some more sinister consequence comes from imbibing its water. The animal and plant life around it have doubtless been substantially altered by its effects. Most such springwater loses its powers if separated from the main body for very long.",
    enemies: [
      { title: "Beast warped by the spring's power", monstrous: true },
      { title: 'Ruthless sorcerer experimenting with its effects', monstrous: true },
      { title: 'Barbaric chieftain using it to advance their power', monstrous: true }
    ],
    friends: [
      { title: 'Ancestral guardian of the spring' },
      { title: "Pioneer plagued by the spring's effects" },
      { title: 'Scholar who thinks they can fix any negative effects of the spring' }
    ],
    complications: [
      'The spring grants a blessing that comes with a substantial cost',
      "The spring's blessing becomes a curse when over-imbibed",
      "The spring's created an entire ecosystem of servitor-addicts"
    ],
    things: [
      'Cure for the changes the spring forces',
      'Vessel that can hold the spring water without losing its power',
      'Precious fragment of the original enchantment'
    ],
    places: [
      'Pool of obviously uncanny water',
      "Shore marked with the spring's effects",
      'Weird den of a spring-touched beast'
    ]
  },
  'Massacre Site': {
    text: 'This patch of wilderness was the site of a bloody massacre, most likely of helpless noncombatants. Such grim deeds often give forth unquiet dead and lingering curses that foul the land and taint the life around it. Only through exorcism or just vengeance can such curses be lifted.',
    enemies: [
      { title: 'Enraged undead revenant', monstrous: true },
      { title: 'Author of the slaughter' },
      { title: 'Grasping treasure hunter' },
      { title: 'Feaster upon the slain', monstrous: true }
    ],
    friends: [
      { title: 'Survivor of the killing' },
      { title: 'Avenger of the dead' },
      { title: 'Confused and sorrowful ghost' },
      { title: 'Investigator for the local rulers' }
    ],
    complications: [
      'The dead actually deserved it',
      'The dead rise to attack the wrong people',
      "No one admits the site's existence out of shame or fear",
      'The culprits didn’t get all their targets and are going to try again'
    ],
    things: [
      'Loot of the slain',
      'Precious thing the dead were guarding',
      "Proof of the culprit's guilt",
      'The secret they were killed to keep'
    ],
    places: [
      'Gory shambles in the wilderness',
      'Burnt-out home',
      'Site of their last stand',
      'Hidden mass grave'
    ]
  },
  'Migration Path': {
    text: 'A fearsome migration of dangerous creatures crosses this area at certain times of the month or year. During this migration an invincible wave of these entities crosses the site, perhaps to get from one underground entrance to another, or to move from one feeding site to the next, or to immerse themselves in some critical magical aura or ancient radiation. Despite this, there must be something valuable in this area that tempts outsiders to risk being here when the living tide arrives.',
    enemies: [
      { title: 'Monstrously huge alpha of the tide', monstrous: true },
      { title: 'Cultist who worships the creatures of the tide' },
      { title: 'Sorcerer trying to bend the swarm to #possessive# will' }
    ],
    friends: [
      { title: 'Treasure seeker daring the migration schedule' },
      { title: 'Scholar of these beasts' },
      { title: 'Local trapped here at the wrong time' }
    ],
    complications: [
      "The tide's schedule is dangerously unpredictable",
      'The creatures are always present but only become dangerous during the migration',
      'The migration path changes very often'
    ],
    things: [
      'Precious animal byproduct of the swarm',
      'Treasure found by a too-slow seeker',
      'Key to predicting or controlling the swarm'
    ],
    places: [
      'Trail stripped bare by the tide',
      'Massive breeding ground',
      'Island full of cowering refugees'
    ]
  },
  'Military Outpost': {
    text: "There's a military post located in this wilderness, one planted by an interested government, community, religion, or mercantile group. It may be guarding a trail through the wilds, monitoring dangerous natives, acting as a tripwire against invasion, or be a punishment post for troublesome officers. The outpost is likely to be reliant on regular shipments of goods. Sufficiently large outposts often form the nucleus of a pioneer settlement.",
    enemies: [
      { title: 'Brutal martinet commander' },
      { title: 'Wrathful native leader' },
      { title: "Crime boss who's suborned the isolated post" }
    ],
    friends: [
      { title: 'Hard-used military scout' },
      { title: 'Pioneer searching for help' },
      { title: 'Native leader looking for allies' }
    ],
    complications: [
      'The outpost has sparked a dispute with a bordering polity',
      "The post is so isolated it's effectively independent",
      'The post has been abandoned or cut off by its patron and is in dire need of supply'
    ],
    things: [
      'Load of vital supplies',
      'Pay for the soldiers',
      'Weapon shipment craved by the natives'
    ],
    places: [
      'Rough-hewn log fort',
      'Piled stone strong point on a naturally-defensible site',
      'Tall wooden tower looking over the countryside'
    ],
    constraints: { warfare: true }
  },
  'Monstrous Beast': {
    text: "Fearsome beasts are a commonplace in the untamed wilderness, but there's something here horrible enough to be remarkable even to the natives. It may be something far too dangerous for the party to have any hope of defeating; if so, it should leave plenty of evidence of its approach or presence, and give prudent heroes the chance to flee or distract it. The natives either avoid this area or must find some way to placate the thing.",
    enemies: [
      { title: 'Magical abomination born of ancient sorcery', monstrous: true },
      { title: 'Vile abomination that transforms its victims into spawn', monstrous: true },
      { title: "Sadistic native who's pacted to become a shapeshifter" },
      { title: 'Remnant-creature of a dead empire that still fulfills its duty', monstrous: true }
    ],
    friends: [
      { title: 'Glory-seeking hunter' },
      { title: 'Native with a lust for vengeance against it' },
      { title: 'Rapt arcane zoologist' }
    ],
    complications: [
      'The locals worship it as a god because it actually can and will help them at times',
      "It's guarding a particular site there",
      'Its leavings or sheddings are a precious substance'
    ],
    things: [
      'Treasure of some luckless victim',
      "Relic of the beast's makers",
      'Substance or device that can repel the beast'
    ],
    places: [
      'Site of a horrible slaughter',
      'Monstrous lair full of remains',
      'Gory offering-site where sacrifices are made to it'
    ]
  },
  Motherlode: {
    text: 'Some precious ore, rare wood, magical elixir, arcanely-potent extract, or other natural product is in great supply here. Anyone capable of extracting it without interruption would become very wealthy, though the natives, the local fauna, or rival competitors may make that ambition difficult to fulfill. The motherlode might be known only to the natives, or is perhaps known to no one at all due to its concealment or exotic nature.',
    enemies: [
      { title: 'Prospector devoid of moral qualms' },
      { title: "Existing site owner who's lethally paranoid" },
      { title: 'Local lord who intends to utterly exploit the eventual site owner' }
    ],
    friends: [
      { title: 'Humble laborer in the mines' },
      { title: 'Poor but talented prospector' },
      { title: 'Land-wise local who knows of it' }
    ],
    complications: [
      'The substance is very hazardous to the extractor',
      'Extracting it would break a very powerful local monopoly',
      'It was buried or sealed away for a very good reason'
    ],
    things: [
      "Sample proving the motherlode's worth",
      'Ancient tools that make extraction practical',
      'Capital needed to begin extraction'
    ],
    places: [
      'The dangerous extraction site itself',
      'Cave where prior extractors stored their equipment',
      'Makeshift barracks where the laborers sleep'
    ]
  },
  'Nomad Camp': {
    text: "There's a regularly-used nomad camp site in the nearby wilderness, a stopping place for them and their kindred. The site likely has water, a defensible position, or religious significance to them. Depending on the time of year or current raiding activities the camp might be empty, but any random day presents some chance of a group of them seeking shelter here. Wandering encounters in this area might very likely be with such nomads.",
    enemies: [
      { title: 'Glory-hungry nomad raid leader' },
      { title: 'Leader who plans on turning #possessive# people into sedentary conquerors' },
      { title: 'Vision-maddened sorcerer-priest of the nomads' }
    ],
    friends: [
      { title: 'Peace-minded rival of the nomad leader' },
      { title: 'Local victim of their raids' },
      { title: "Former owner of the structure they're now using as a camp" }
    ],
    complications: [
      'The nomads are raiders or traders as profit suggests',
      'The nomads are forced to move by some outside power',
      'The camp is desperately needed by some local group for practical or religious reasons'
    ],
    things: [
      'Loot hidden in the camp',
      'Trophy taken by the raiders',
      'Tribute offered up to win their mercy'
    ],
    places: [
      'Once-splendid chamber now scuffed and defaced',
      'Vigilantly-guarded oasis',
      'Makeshift shrine to the nomad god'
    ]
  },
  'Outsider Enclave': {
    text: 'A group of surviving Outsiders dwells in the area, a remnant of their former age of rule. They may rely on stealth or great isolation to preserve their numbers, or they might just be able to kill anyone who gets too close. The enclave is unlikely to have real ambitions of expansion or else it would have been wiped out by now, but it may preserve ancient relics or fell powers that could wreak havoc if used recklessly.',
    enemies: [
      { title: 'Bitterly vengeful Outsider leader', monstrous: true },
      { title: 'Hideous thing unleashed by the enclave', monstrous: true },
      { title: 'Human traitor in league with the enclave' }
    ],
    friends: [
      { title: 'Outsider who sees profit in the PCs', monstrous: true },
      { title: 'Naively xenophilic human' },
      { title: 'Victim of Outsider raids' }
    ],
    complications: [
      "The Outsiders want something that isn't necessarily antagonistic to the PCs",
      "They've only recently awoken from stasis or temporal displacement and are still exploring",
      "They're masquerading as a human group or have one as a front"
    ],
    things: [
      'Potent alien relic',
      'Treasure collected from human thralls',
      'Precious regalia of an alien king'
    ],
    places: [
      'Fetid Outsider nest with a noxious atmosphere',
      'Eerie abandoned ruins of their former day',
      'Maintained shrine to an Outsider god'
    ]
  },
  'Overgrown Tomb': {
    text: "A once-honored tomb lies here, forgotten or lost to the depredations of enemies. The structure is likely elaborate enough to be a building in its own right, or an excavation beneath some surface monument. The tomb may house a single glorious hero or be the resting place of an associated group, such as a particular noble lineage, the slain of a great battle, a lost city's municipal ossuary, or some like grave.",
    enemies: [
      { title: 'Long-trapped undead king', monstrous: true },
      { title: 'Monstrous beast fat on old corpses', monstrous: true },
      { title: 'Necromancer jealous of #possessive# prizes' }
    ],
    friends: [
      { title: 'Ancestral guardian of the tomb' },
      { title: 'Curious archaeologist' },
      { title: 'Last heir of the one entombed' }
    ],
    complications: [
      'It was originally a different structure turned into a mass grave due to emergency need',
      "It's actually just a mass casualty incident in a structure",
      "Someone's mining the dead for their remains"
    ],
    things: [
      'Precious funerary offerings',
      'Regalia buried with a dead ruler',
      'Text containing secrets lost to the present day'
    ],
    places: ['Crumbling monument to the dead', 'Fallen-in gravesite', 'Forest of gravestones']
  },
  'Perilous Path': {
    text: 'A danger-laden bridge, trail, skyway, spatial distortion, tunnel, ancient roadbed, or some other path in this area leads through an otherwise impenetrable obstacle or serves as the sole means of reaching some point of interest. This path should be fairly obvious to explorers, but its destination may not be clear. If the destination is inhabited, it might be guarded by the denizens, or there may be the remains of ancient wayposts that once served the traffic along the path.',
    enemies: [
      { title: 'Bandit warlord demanding a toll' },
      { title: 'Vicious monster lairing on the path', monstrous: true },
      { title: 'Bandit chief lying in wait to ambush travelers' }
    ],
    friends: [
      { title: 'Helpful native path guide' },
      { title: 'Ancient maintenance laborer on the path', monstrous: true },
      { title: 'Explorer seeking the path' }
    ],
    complications: [
      'The path is one-way only',
      'The path has only recently opened up',
      'The path can be controlled with a particular key or relic'
    ],
    things: [
      'Map of the path',
      "Ancient relic used by the path's builders",
      'Key to unlock the path'
    ],
    places: [
      'Ancient skyway stretching between mountaintops',
      'Tunnel full of long-forgotten defensive traps',
      'Transdimensional pathway through an eldritch wilderness'
    ]
  },
  'Pilgrimage Site': {
    text: 'There is some important monument, place, or structure here that attracts pilgrims from far away. It may be a holy site beloved of a local faith, a mythic originpoint for a nearby culture, an oracle or other provider of widely-desired services, or a font of some special favor or benefit that can reward a pilgrim. The site may be under the control of a local government, or it may be too distant or dangerous to be effectively protected or administered by outsiders.',
    enemies: [
      { title: 'Raider chieftain plundering the pilgrims', monstrous: true },
      { title: 'Zealot who has seized control of it for their own sect' },
      {
        title: 'Once-benevolent holy entity that has become hostile for some reason',
        monstrous: true
      }
    ],
    friends: [
      { title: 'Desperate pilgrim from afar' },
      { title: 'Local administrator beset by woes' },
      { title: "Young merchant providing for the pilgrims' needs" }
    ],
    complications: [
      "Factions are actively struggling over the site's control",
      'The site is being ruined by the pilgrim traffic',
      'The site has a strategic value quite aside from its use to pilgrims'
    ],
    things: [
      'Sacred relic of the site',
      'Offering given by a grateful pilgrim',
      "Token that grants access to the site's most potent reward"
    ],
    places: [
      'Ancient temple on a holy site',
      'Monument to a great deed',
      'Perilous cave of an oracle'
    ]
  },
  'Poacher Problems': {
    text: "In this region, the wilderness is teeming with rare and valuable creatures, but it's threatened by the rise of illegal poaching. Poachers, driven by greed or necessity, defy the laws to hunt these creatures, leading to conflict with local authorities and conservationists. The region is a hotbed of tension between preserving nature and the desperate struggle for survival or profit.",
    enemies: [
      { title: 'Ruthless poacher leader exploiting the wilderness', veteran: true },
      { title: 'Corrupt official turning a blind eye to poaching for bribes' },
      { title: 'Cunning trap-maker specializing in capturing rare creatures', foreign: true },
      { title: "Mercenary hired to protect poachers' operations", veteran: true },
      { title: 'Sorcerer using poached creatures for dark rituals', monstrous: true }
    ],
    friends: [
      { title: 'Dedicated ranger protecting the wildlife', veteran: true },
      { title: 'Local herbalist against poaching for ethical reasons' },
      { title: 'Activist working to stop the poaching through legal means' },
      { title: 'Reformed poacher now aiding conservation efforts', youth: true },
      { title: 'Mystic with a spiritual connection to the threatened creatures', monstrous: true }
    ],
    complications: [
      'An endangered species is on the brink of extinction',
      'Poachers have laid traps that endanger both animals and people',
      'A rare creature is rumored to have mystical powers, intensifying poaching efforts',
      'Internal conflict arises among villagers over the ethics of poaching',
      'A mysterious disease is spreading among the wildlife, complicating conservation efforts'
    ],
    things: [
      'Map of hidden poacher camps',
      'Rare animal pelts being traded illegally',
      'Poisoned bait used by poachers',
      'Ancient talisman believed to ward off poachers',
      'Diary of a poacher detailing various hunted creatures'
    ],
    places: [
      'Secluded woodland known for rare wildlife',
      "Hidden poacher's camp deep in the forest",
      'Marketplace where poached goods are traded',
      'Ruined shrine now used as a poaching lookout',
      'Sacred grove where endangered creatures are known to gather'
    ]
  },
  'Precious Game': {
    text: 'Some native fauna here is remarkably valuable, either for the sake of some magical blessing it grants its captor or for the benefits its flesh, pelt, or magical organs can give. Other game may be ritually important, such an animal that grants some ruling legitimacy to a successful hunter. The animal itself is probably either highly dangerous, highly rare, or carefully gamekept by some outside power if it has escaped extinction thus far.',
    enemies: [
      { title: 'Bloodthirsty hunter who brooks no rivals' },
      { title: 'Game animal grown warped and lethal', monstrous: true },
      { title: 'Guardian of the game who kills all interlopers', monstrous: true }
    ],
    friends: [
      { title: 'Sympathetic hunter with a good reason' },
      { title: 'Local deeply reliant on successful hunting' },
      { title: 'Zoologist seeking to study the beast' }
    ],
    complications: [
      'The benefit of hunting the game is only granted if they are captured or killed in a very troublesome way',
      'The animals are found around a different much more dangerous beast',
      'The beasts have multiple life stages with different traits'
    ],
    things: ['Trove of beast pelts', 'Lure for the beasts', 'Map to their secret breeding grounds'],
    places: [
      'Ramshackle hunting camp',
      'Altar to the beasts',
      'Magical site where the beasts were first made'
    ]
  },
  'Prison Colony': {
    text: 'This remote settlement serves as a penal colony, where prisoners are exiled to live and work under harsh conditions. Ostensibly a place of rehabilitation or punishment, the reality is often brutal and unforgiving. The colony may be governed by a mix of military discipline, inmate self-management, or a private entity with its own agenda. Escape is considered impossible due to geographical isolation, environmental hazards, or vigilant security.',
    enemies: [
      { title: 'Ruthless warden obsessed with control', veteran: true },
      { title: 'Gang leader wielding power among the prisoners', veteran: true },
      { title: 'Corrupt guard trading favors for contraband', veteran: true },
      { title: 'Escaped convict terrorizing the outskirts' },
      { title: 'Spy for a rival nation, sowing discord' }
    ],
    friends: [
      { title: 'Reformed inmate trying to make amends' },
      { title: "Compassionate healer tending to inmates' wounds" },
      { title: 'Skilled craftsman teaching trades to prisoners' },
      { title: 'Innocent prisoner wrongfully convicted' },
      { title: 'Inventive prisoner crafting tools for survival or escape' }
    ],
    complications: [
      'A deadly contagion spreads through the colony, with no cure in sight',
      "External forces seeking to liberate the prisoners or exploit the colony's resources",
      'A recent escape attempt has triggered a brutal crackdown',
      'Secret experiments conducted on inmates lead to monstrous transformations',
      "A massive storm damages the colony's infrastructure, sparking a riot"
    ],
    things: [
      'Hidden cache of letters and contraband from the outside world',
      'Forged documents that could exonerate an innocent inmate',
      'Ancient artifact unearthed during forced labor',
      "Stolen keys to the colony's armory or gates",
      'Diary of a former warden detailing horrific abuses'
    ],
    places: [
      'Abandoned section of the colony rumored to be haunted',
      'Crumbling cell blocks overshadowed by high walls',
      'Abandoned mine where prisoners toil',
      'Isolated watchtower with a view of the desolate surrounds',
      "Secret meeting place for the colony's underground resistance"
    ],
    constraints: { coastal: true, tribal: true }
  },
  'Rampant Experiment': {
    text: 'Not every enchantment or spell research is a success, and some effort here went drastically wrong. Some sort of rampantly overgrown flora or monstrously altered fauna roam the place, the result of magic gone awry. They probably have some quality or trait that was useful to the creator, but it was combined with so many drawbacks or dangers that the result is a menace.',
    enemies: [
      { title: 'Mad sorcerer who caused it' },
      { title: 'Creature warped terribly by the experiment', monstrous: true },
      { title: 'Looter with no regard for the chaos their blundering is releasing' }
    ],
    friends: [
      { title: 'Apologetic apprentice of the culprit' },
      { title: 'Non-hostile experimental victim' },
      { title: 'Local desperately fighting the experiments' }
    ],
    complications: [
      "An outside power is promoting the disaster because it's somehow to their advantage",
      'The experiment results seem wholly beneficial at first',
      "The experiment's area of effect is slowly growing"
    ],
    things: [
      'Cure or tool to halt the experiment',
      'Precious object created by the experiment',
      'Magical tool used in the experiment'
    ],
    places: [
      'Sinister occult laboratory',
      'Normal area terribly warped by the experiment',
      'Local structure destroyed by the experiment'
    ]
  },
  'Refugee Camp': {
    text: "There's a refugee camp in the area made up of people who've fled some calamity. It may be a bandit raid on their villages, an ethnic purge nearby, a religious schism they lost, the collapse of a functioning community, or some other disaster. The refugees have no better place to go or they'd have gone there by now; they're probably dying off to local hazards at a greater or lesser rate, or trying to turn the camp into a functional settlement.",
    enemies: [
      { title: 'Brutal tyrant over the camp', veteran: true },
      { title: 'Local marauder exploiting them' },
      { title: 'Horrible beast that hunts them', monstrous: true }
    ],
    friends: [
      { title: 'Sympathetic young refugee' },
      { title: "Local governmental representative who can't help much" },
      { title: 'Earnest religious leader' }
    ],
    complications: [
      'The refugees are highly undesirable to the surrounding polities',
      "The camp's a hotbed of some not-too-quickly lethal but very contagious disease"
    ],
    things: [
      'Vital cache of supplies',
      'Precious possessions of the refugees',
      'Relic they stole or rescued in their flight'
    ],
    places: [
      'Miserable camp of crude shanties',
      'Damp refuge caverns',
      'Ancient ruins made into a camp'
    ]
  },
  'Remnant Road': {
    text: 'Some long-lost empire laid a road here, along with the waystations that once served to guard it. The surviving remnant may just be a short segment, or it might still lead to whatever destination of significance it once served. Other ruins of this empire are likely positioned along the road, and modern inhabitants might still make use of it as a highway through rough terrain, or have positioned their own settlements along its length.',
    enemies: [
      { title: 'Ancient creature that guards the road from “bandits”', monstrous: true },
      { title: 'Bandit chief exploiting a ruined way-post' },
      { title: 'Local lord who collects cruel tolls' }
    ],
    friends: [
      { title: 'Merchant making use of the path' },
      { title: 'Local from a colony-village set up at one end' },
      { title: 'Remnant survivor from the culture that built it' }
    ],
    complications: [
      'The road is magically useful or well-maintained',
      'The road leads through some tremendously dangerous area',
      'The road is built as a high and stepped structure that forms a tall defensive wall on one side'
    ],
    things: [
      'Magical pass allowing use of the road',
      'Ancient weapon stored in a waypost',
      "Key to unlocking a waypost's vault"
    ],
    places: [
      'Ancient watch station',
      'Stretch of unnaturally perfect road',
      'Monument to a forgotten king'
    ]
  },
  'Remote Monastery': {
    text: "There is a largely self-sustaining monastery, temple, hermitage, or other religious site in the area, one inhabited by clergy who have some particular need for isolation. They may be guardians of a holy site, imprisoned heretics, wardens of some refuge for travelers, or a particularly rigorous or heretical sect. They may be willing to provide services for strangers of acceptable character, and might well have problems that their limited resources can't solve.",
    enemies: [
      { title: 'Sinister-minded abbot' },
      { title: 'Demonic entity warring on the clerics', monstrous: true },
      { title: 'Cleric of a rival faith or sect determined to destroy them and all their allies' }
    ],
    friends: [
      { title: 'Friendly if unworldly local cleric' },
      { title: 'Native who trades with the monastery' },
      { title: 'Cleric who seriously reconsiders their choice to come here' }
    ],
    complications: [
      'The monastery has been taken over by zealots or an outside power',
      'The monastery is a cover for sinister occult doings',
      "The place isn't nearly as self-sufficient as it thought it would be"
    ],
    things: [
      'Sacred relic of the place',
      'Offering made by a grateful believer',
      'Sacred text specific to their sect'
    ],
    places: [
      'Well-guarded fields outside the walls',
      'Heavily-fortified monastic building',
      'Hostel for travelers kept outside the monastery itself'
    ]
  },
  'Ruined Fortification': {
    text: 'This place was of great strategic importance in some prior age, and a ruined castle, outpost, waystation, or military base can be found here. It may have been destroyed by the slow march of time, or some great military catastrophe may have shattered it. The site is probably too remote or now of too little military value to attract the interest of current governments, but it may still serve as an excellent lair for a more local tyrant or bandit lord.',
    enemies: [
      { title: 'Failed usurper “ruling” from this new seat', veteran: true },
      { title: 'Zealous rebel chief marshaling strength here', veteran: true },
      { title: "Ghostly shade of the fortress' last commander", monstrous: true }
    ],
    friends: [
      { title: 'Native forced to take refuge here' },
      { title: 'Remnant survivor of the original garrison' },
      { title: 'Government agent sent to investigate the site for usability' }
    ],
    complications: [
      'The fortress was built to keep something in rather than out',
      'Some political change has just made the site very valuable once more',
      'The real bulk of the site is hidden from easy view'
    ],
    things: [
      'Key to open restricted areas of the site',
      'Massive fixed weapon that still works',
      'Precious trove guarded by the fortress'
    ],
    places: ['Long-broken gate', 'Wall slumped into a ramp', 'Tower snapped halfway up']
  },
  'Savage Hamlet': {
    text: "There's a village in the area, but its inhabitants are vicious or profoundly unsociable in some way. They may deal violently with outsiders, have abhorrent cultural habits, be the decadent remains of some group cast out for their evil ways. The party should likely have some sort of indication of their nature given to them before the first contact, or else the village should be savage in ways that don't necessarily lead to likely immediate attack.",
    enemies: [
      { title: 'Brutal village chieftain', monstrous: true },
      { title: 'Cruel shaman of a dark god', monstrous: true },
      { title: "Non-local criminal who's gone native in a bad way" }
    ],
    friends: [
      { title: 'Rare better-dispositioned local', monstrous: true },
      { title: 'Missionary trying to civilize them' },
      { title: 'Local who sees profit in dealing with outsiders', monstrous: true }
    ],
    complications: [
      'They are remarkably talented or learned at some activity',
      'They appear harmless at first encounter',
      'They have considerable virtues to go with their terrible vices'
    ],
    things: [
      'Locally-produced good of value',
      'Loot from their victims',
      'Tribute given by frightened neighbors'
    ],
    places: [
      'Fighting pit for local entertainment',
      "Chieftain's barbaric hall",
      'Ancient structure put to misuse'
    ]
  },
  'Sculpted Terrain': {
    text: 'In a former age some tyrant or artist sculpted an entire landform here into a statue, monument, or artwork that is visible for miles. A carved mountainside, a molded hill, an intricate pattern of waterways, a mesa pierced with music-emitting tunnels, or some other huge artwork is obvious here, and probably can be seen from any point nearby. Such structures likely have some form of defense to prevent their vandalism, and may contain components that are very valuable in the present age.',
    enemies: [
      { title: 'Priest of a sculpture-worshiping cult' },
      { title: 'Berserk guardian of the art', monstrous: true },
      { title: 'Chief of a sculpture-dwelling remnant of the original creators', monstrous: true }
    ],
    friends: [
      { title: 'Courageous art-seeker' },
      { title: 'Artist desperately in search of inspiration' },
      { title: "Treasure-hunter looking for the art's loot" }
    ],
    complications: [
      'The art is mobile or otherwise active somehow',
      'The art has some very dangerous effect',
      'The art is damaged and now causes an unintended consequence nearby'
    ],
    things: [
      'Precious fragment of the art',
      'Magical relic used by the art',
      'Regalia of the former keeper of the art'
    ],
    places: [
      'Viewing-site built for the art',
      'Damaged or defaced area of the art',
      'Pilgrim quarters meant for those coming to see the art'
    ]
  },
  'Seductive Peril': {
    text: "There's a very appealing place, resource, or structure in the area that's actually a dangerous snare for the unwary. Pools may be laced with slow poisons, bright flora might be carnivorous, valuable natural crystals might be radioactive, or ancient pleasure-pavilions might not let revelers go. Some natives might lurk near the peril to loot its victims, while others might intentionally drive prey into it.",
    enemies: [
      { title: 'Malevolent spirit of the peril', monstrous: true },
      { title: 'Cruel looter who uses the peril as a tool' },
      { title: 'Experimenter looking to exploit the peril' }
    ],
    friends: [
      { title: 'Companion or friend of a victim' },
      { title: "Clueless seeker of the peril's treasure" },
      { title: 'Local who knows about the peril' }
    ],
    complications: [
      'Dangerous as it is the peril does offer a very real reward',
      'The peril is worshiped by locals',
      "The danger is unintentional and related to the peril's original function"
    ],
    things: [
      'Loot left by victims',
      'Valuable component of the peril',
      'Bait placed to lure victims'
    ],
    places: [
      'Hidden charnel pit for victims',
      'Enticingly charming facade',
      'Now-abandoned camp of former prey'
    ]
  },
  'Taboo Territory': {
    text: 'Part of this area is strictly off-limits. It may be restricted to a particular holy priesthood, local rulers, the heirs of a particular lineage, or to everyone. The taboo may be the product of local religious beliefs, ruling edicts, or a practical realization that intruders keep stirring up perils that the locals have to deal with. Watchers likely keep guard over the area and may or may not speak up to warn off potential trespassers.',
    enemies: [
      { title: 'The horrible thing within the territory', monstrous: true },
      { title: 'Bandit chief taking advantage of the taboo to hide there' },
      { title: 'Ancient guardian of the domain', monstrous: true }
    ],
    friends: [
      { title: 'Explorer lacking in caution' },
      { title: 'Accidental trespasser into the zone' },
      { title: 'Local who desperately needs something from inside the area' }
    ],
    complications: [
      'Entering the zone visibly marks trespassers for a time',
      'A hostile force too strong for the warders is trying to get in or out',
      'The taboo is rational but the reason the locals have is badly mistaken'
    ],
    things: [
      'Treasure unplundered within the zone',
      'The precious relic the taboo is meant to guard',
      'Valuable plant or animal that grows undisturbed within'
    ],
    places: [
      'Ancient ruin untouched by intruders',
      'Watch-post with a view of the site',
      'Sealed gate to the zone'
    ]
  },
  'Toxic Ruins': {
    text: "There's a ruin in the area, but it's poisonous or disease-infested. Such a blight may not be immediately obvious, with the effects slowly taking hold the longer an intruder remains. There's probably something about the ruin that's attractive to others, and the toxin isn't quick enough to make plundering an obviously futile effort. In other cases, the toxin might be fast, but there could be some item or magic to resist it.",
    enemies: [
      { title: 'Toxin-warped beast within', monstrous: true },
      { title: "Sorcerer exploring the toxin's potential" },
      { title: 'Cruel plunderer using expendable help to loot the site' }
    ],
    friends: [
      { title: 'Native who knows a cure for the toxin' },
      { title: 'Explorer trapped within the ruin' },
      { title: "Native life form that's immune to the toxin", monstrous: true }
    ],
    complications: [
      'The toxin was a healthful atmosphere to the Outsider builder of the ruin',
      'The toxin is radiation or some other invisible poison',
      'The toxin is exuded by the substance or objects that are most valuable in the ruin'
    ],
    things: [
      'Cure or protection from the poison',
      'Incredibly toxic weapon or object',
      "Damaged ancient relic that's causing the toxic effect"
    ],
    places: [
      'Eerily barren land around the ruin',
      'Camp full of poisoned explorers',
      'A grove of unnatural life amid the toxic stew'
    ]
  },
  'Treacherous Terrain': {
    text: 'A stretch of this area is naturally treacherous and dangerous in its terrain. It may be prone to sinkholes, mudslides, avalanches, quicksand, explosive flora, magical eruptions, boiling geysers, plunging crevasses, or falling stones. This terrain should block the path toward some interesting site or desired destination, or else the party likely has no reason not to simply turn around or go around it.',
    enemies: [
      { title: 'Malevolent nature-spirit of the place', monstrous: true },
      { title: 'Vile outcast who lairs amid the terrain' },
      { title: 'Monstrous beast native to the dangerous area', monstrous: true }
    ],
    friends: [
      { title: 'Native guide who knows a way through' },
      { title: 'Explorer fascinated by the terrain' },
      { title: 'Traveler forced to find a way through' }
    ],
    complications: [
      'The perils manifest on a particular little-known schedule',
      'The perils sometimes uncover lodes of valuable materials',
      'The perils are an accidental legacy of an ancient malfunction'
    ],
    things: [
      'Map of the safe way through',
      'Device to protect against the peril',
      'Ancient treasure hidden within the peril'
    ],
    places: [
      'Small safe zone inside the terrain',
      'Ruined road or path amid the peril',
      'Site of a camp destroyed by the peril'
    ]
  },
  'Twisted Fauna': {
    text: 'The fauna in the area has been warped by some power, and is now dangerous to other forms of life. A lingering curse may have twisted the beasts, as might have ancient techno-sorcerous waste, Outsider manipulation, half-faded arratus, mad wizardry, religious cult manipulation, or ancient artistic goals. The beasts probably have some unifying characteristic or trait imbued by the process that warped them.',
    enemies: [
      { title: 'Savage beast-tamer' },
      { title: 'Nightmarish chimera', monstrous: true },
      { title: 'Hideously intelligent god-beast', monstrous: true },
      { title: 'The mad power that warped the beasts in the first place' }
    ],
    friends: [
      { title: 'Native trying to cope with the fauna' },
      { title: 'Hunter determined to bag one' },
      { title: 'Scholar trying to find the cause of the change' }
    ],
    complications: [
      'The beasts are very {useful|valuable} in some way',
      'The beasts were once humans',
      'The beasts masquerade as normal animals',
      'Night transforms the beasts into even more horrific forms'
    ],
    things: [
      'Loot of a victim of the beasts',
      'The thing that changed them is a treasure itself',
      'Trove coincidentally located in their territory',
      'Egg of a corrupted beast'
    ],
    places: [
      'Fetid lair of the beasts',
      'Grove scarred by their activities',
      'Tainted site that birthed them',
      'Luminous cave filled with crystalline cocoons',
      'Ruined tower taken over by winged beasts'
    ]
  },
  'Uncanny Weather': {
    text: "The area is affected by unnatural or magical weather conditions. It may be a pocket of snowy wasteland in a jungle, an area racked by cataclysmic storms, a shifted zone of space that overlaps with some alien world's atmosphere, an area of perpetual balmy summer, or some other obvious anomaly. Natives may have figured out some way to exploit this condition, or it might be too dangerous for regular occupation.",
    enemies: [
      { title: 'Ruthless sorcerer bent on unlocking its secrets' },
      { title: 'Monstrous beast that thrives in the environment', monstrous: true },
      { title: "Dangerous remnant of the zone's creators", monstrous: true },
      { title: 'Raging elemental that reflects the phenomena', monstrous: true }
    ],
    friends: [
      { title: "Native who's learned to live in the zone" },
      { title: 'Refugee trying to hide in it' },
      { title: 'Entrepreneur trying to profit by it' },
      { title: 'Explorer trying to understand it' },
      { title: 'Eco-arcanist studying the phenomena' }
    ],
    complications: [
      'The weather is controlled by a site or object',
      'The change is very recent and is disrupting the locals',
      'The weather leaves behind a valuable resource',
      'The weather shifts unpredictably and rapidly',
      'Extreme weather events are becoming more frequent'
    ],
    things: [
      'Ancient weather-control relic',
      'Texts describing how to stop or control the weather',
      'Abandoned loot from the original inhabitants of the area'
    ],
    places: [
      'Weather-blasted natural feature',
      'Structure built to endure the weather',
      'Relic building from before the weather happened'
    ]
  },
  'Vicious Flora': {
    text: 'This area has been infested by some dangerous plant life. It may be a massive, sprawling organism that carpets the area, or some form of mobile, intelligent plant-beast. It may be the product of cruel nature, mad sorcery, or the anger of a spirit of the land.',
    enemies: [
      { title: 'Fungal abomination', monstrous: true },
      { title: 'Moss-infested titan', monstrous: true },
      { title: 'Insidious pollen-zombie chief', monstrous: true },
      { title: '{Primal|Corrupted} wilderness spirit', monstrous: true },
      { title: 'Mysterious sorcerer manipulating the flora' },
      { title: 'Spore-infused skeletal lord', monstrous: true },
      { title: 'Carnivorous blossom beast', monstrous: true },
      { title: 'Strangling vine {matriarch|patriarch}', monstrous: true }
    ],
    friends: [
      { title: 'Local {forester|witch}' },
      { title: 'Wandering {botanist|alchemist}' },
      { title: 'Native who knows how to avoid the plants' },
      { title: 'Friendly wilderness spirit', monstrous: true },
      { title: 'Wise old farmer', elder: true },
      { title: 'Uninfected village member' }
    ],
    complications: [
      'The flora is valuable and cultivated with no thought of the cost to the workers',
      'The plant has powerful psychotropic effects',
      'The parasitic plants can masquerade as humans',
      'The plants are the first shoots of a more terrible seed',
      'The plants can regenerate rapidly, making them difficult to eradicate',
      'The plants have a symbiotic relationship with the local wildlife, causing animals to be hostile',
      "The plants' growth is linked to a sacred relic which locals refuse to destroy",
      'The locals have started to worship the flora as a divine entity',
      'The plants emit a pheromone that induces a state of bliss and pacifism, making resistance difficult',
      "The flora's growth accelerates, threatening to overrun nearby settlements"
    ],
    things: [
      'Cure for the plant toxin',
      'Powerful defoliant mixture',
      'The relic empowering the plants',
      'Precious plant extract',
      'A map detailing the maze-like plant growth',
      'Book of ancient wisdom about similar infestations',
      'A plant that can be used to make a powerful drug',
      'Seeds of a plant that can compete with the infestation'
    ],
    places: [
      'Vine-wreathed village',
      'Maze of unnatural bracken',
      'Perfectly silent community of plant-things',
      'Pit of corpse-fertilizer',
      "Ancient garden of the plant's creators",
      'Vast, tangled forest of the plants',
      'Poisonous fungi forest',
      'Grove of carnivorous trees',
      'Field of pollen-zombies',
      'Plant-infested ruin'
    ]
  },
  'Zealot Colony': {
    text: 'There is a settlement of radical religious or ideological zealots here, ones too extreme to be tolerated in civilized lands. They may not necessarily be hostile, and they might have need of outside assistance, but their principles are likely to be bizarre or abhorrent to the PCs. Most such colonies are bent on creating new societies that may not actually be physically or psychologically possible for unaltered humanity.',
    enemies: [
      { title: 'Charismatic demagogue' },
      { title: 'Iron-fisted hereditary dictator' },
      { title: 'Dreamer willing to break any number of eggs for their theoretical omelet' }
    ],
    friends: [
      { title: 'Local who quietly wants out' },
      { title: 'Reformer trying to temper things' },
      { title: 'Relative of a now-trapped member' }
    ],
    complications: [
      "They've recently acquired an object or an alliance that gives them great power",
      'The ostensible leader is just a puppet of the real and more pragmatic boss',
      "They're beginning to spiral into violent factions"
    ],
    things: [
      'Desperately-necessary supply cache',
      'Wealth given up for the group',
      'Product manufactured by near-slave members'
    ],
    places: [
      'Grand temple or ideological hall amid shanties',
      'Mass public meeting',
      'Prison for deviants'
    ]
  }
}
