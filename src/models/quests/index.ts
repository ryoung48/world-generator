import { range } from 'd3'

import { cssColors } from '../../components/theme/colors'
import { ACTOR } from '../actors'
import { PROFESSION } from '../actors/professions'
import { WEATHER } from '../cells/weather'
import { PLACE } from '../regions/places'
import { Hub } from '../regions/places/hub/types'
import { TEXT } from '../utilities/text'
import { Quest } from './types'

const quests: Record<number, Quest[]> = {}

const enemies = {
  wilderness: [
    'undead {husks|wraiths|abomination}',
    'vampiric spawn',
    '{eldritch|otherworldly} {warband|aberrations|abomination|scion}',
    'blighted {warband|abomination|chimera}',
    '{deepfolk|merfolk} {raiders|cultists}',
    '{enraged|corrupted} {spirit|elemental|eidolon}',
    'relic automatons',
    '{territorial|xenophobic} tribesman',
    'rival mercenaries',
    'bandit {highwaymen|raiders|slavers|marauders}',
    'dark cultists',
    '{vile|reclusive} {sorcerer|necromancer|occultist}',
    '{beast swarm|monstrous beast}',
    '{fungal colony|carnivorous flora}'
  ],
  urban: [
    'rival mercenaries',
    'dark cultists',
    'religious {fanatics|zealots}',
    'ethnic supremacists',
    'rebel {solders|insurgents}',
    'foreign {agents|spies}',
    '{vile|reclusive} {sorcerer|necromancer|occultist}',
    'criminal {gang|syndicate|cartel}',
    '{corrupt|venal} official',
    '{rapacious|decadent} aristocrat'
  ]
}

const locations = {
  wilderness: [
    {
      key: 'abandoned village',
      text: 'a once-thriving settlement, now homes stand empty, overtaken by creeping vines and silence'
    },
    {
      key: 'ancient archive',
      text: 'ruined library housing a large collection of artifacts and forgotten lore'
    },
    {
      key: 'ancient monument',
      text: 'time-worn stones stand proud, relics of a bygone era, inscribed with forgotten lore'
    },
    {
      key: 'bandit encampment',
      text: 'hidden among the trees, tents and fires betray the temporary home of outlaws and thieves'
    },
    { key: "beast's lair", text: 'bones scattered around, deep growls echoing from within' },
    {
      key: 'caravan wreckage',
      text: 'broken wagons and scattered goods mark the site of a devastating ambush, nature slowly burying the remains'
    },
    {
      key: 'colonial outpost',
      text: 'a fortified settlement, standing on foreign soil, a beacon of empire amid untamed lands'
    },
    {
      key: 'crossroads inn',
      text: 'a ramshackle building stands at the meeting of dusty roads, its sign creaking in the wind welcoming weary travelers'
    },
    {
      key: 'crystalline fields',
      text: 'large crystals dot the landscape, extended exposure is known to warp creatures'
    },
    {
      key: 'cyclopean wreckage',
      text: 'immense structures lay in ruin, their massive stones scattered as if tossed by giant hands'
    },
    {
      key: 'derelict lighthouse',
      text: 'standing tall yet unlit, its beacon gone dark, a silent sentinel on the rocky coast'
    },
    {
      key: 'desolate battlefield',
      text: 'fields scarred by conflict, littered with fortifications and the remnants of armaments'
    },
    { key: 'disused mine', text: 'an old, deserted mine entrance, with a musty, earthy smell' },
    {
      key: 'eldritch grove',
      text: 'trees warped in strange ways, their leaves an unnatural hue, whispers echo with an alien cadence'
    },
    {
      key: 'fetid bubbling spring',
      text: 'a natural spring, emitting sulfurous gases and bubbles'
    },
    {
      key: 'flooded ruins',
      text: 'a largely flooded ruined {temple|fortress|estate}, crusted with {slime|coral}'
    },
    { key: 'foggy crossroads', text: 'constantly shrouded in mist, with faint, eerie whispers' },
    {
      key: 'forgotten shrine',
      text: 'a neglected shrine, its carvings eroded, exuding an air of lost faith'
    },
    {
      key: 'fortified waystation',
      text: 'sturdy walls enclose a small courtyard, offering protection and supplies for travelers on dangerous roads'
    },
    {
      key: 'fortress monastery',
      text: 'a remote fortress that houses a powerful monastic order dedicated to a particular {god|philosophy}'
    },
    {
      key: 'hermitage',
      text: 'a small dwelling, home to a {reclusive archmage|vile witch|revered {oracle|mystic|scholar}|retired adventurer}'
    },
    {
      key: 'huge ancient dam',
      text: 'walls breached, the waters once held in check freed, the control over nature relinquished'
    },
    {
      key: 'illicit substance farm',
      text: 'a remote production center for forbidden crops, maintained by an organized crime syndicate'
    },
    {
      key: 'isolated academy',
      text: 'a school of {sorcerers|esoteric artists|hermit-scholars} in the nearby wilds'
    },
    {
      key: 'leprosarium',
      text: 'a place of exile for those who catch {some virulent plague|a socially-despised illness}'
    },
    {
      key: 'lost city',
      text: 'the remains of a destroyed city, now littered with abandoned structures and empty streets'
    },
    {
      key: 'massacre site',
      text: 'a gruesome scene, littered with corpses of slain {travelers|pilgrims|merchants|hunters|guardsmen}'
    },
    {
      key: 'merchant ship',
      text: 'a sleek sea-farer, canvas billowing, carrying treasures from distant lands across the open waves'
    },
    {
      key: 'military outpost',
      text: 'a {watchtower|fortress} {guards a trail through the wilds|monitors dangerous natives|serves as a punishment post for oublesome officers|acts as a tripwire against invasion}'
    },
    {
      key: 'nomadic camp',
      text: 'a circle of tents under the open sky, the ground marked by the fires of those who rest, then roam again'
    },
    {
      key: 'noxious lake',
      text: 'stagnant waters fester, emitting a deadly miasma, veiled in a perpetual, choking haze'
    },
    {
      key: 'occult laboratory',
      text: 'this ruin was once used by {a vile sorcerer|an ancient artificer} for their {experiments|research}'
    },
    {
      key: 'overgrown tomb',
      text: 'an ancient burial site, now reclaimed by nature, its once hallowed markers obscured beneath a blanket of vines and foliage'
    },
    {
      key: 'perilous crevasses',
      text: 'jagged rifts slice the ground, endless depths hidden in shadow, treacherous and unseen'
    },
    {
      key: 'petrified grove',
      text: 'a grotesque garden of petrified flora and fauna, filled with cryptic runes'
    },
    {
      key: 'pilgrim waystation',
      text: 'a humble structure beside a worn path offers shelter and echoing prayers for those on a spiritual journey'
    },
    {
      key: 'pilgrimage site',
      text: 'a sacred ground marked by worn paths and offerings left by those who seek blessings or penance'
    },
    {
      key: 'pocket of corruption',
      text: 'a blight festers here, land warped by dark magic, vegetation and soil oozing malice'
    },
    {
      key: 'prison colony',
      text: 'prisoners are exiled here to live and work under harsh conditions in the nearby mines'
    },
    {
      key: 'radioactive badlands',
      text: 'a barren expanse, lifeless soil and twisted remnants mark this blighted land'
    },
    {
      key: 'remote monastery',
      text: 'located deep in the wilds, its clergy are {guardians of {holy relics|imprisoned heretics}|of a particularly {rigorous|retical} sect|wardens of a refuge for travelers}'
    },
    {
      key: 'river barge',
      text: 'a sturdy vessel, plying the gentle waters, laden with goods and the chatter of tradesfolk'
    },
    {
      key: 'roadside shrine',
      text: 'a humble marker adorned with offerings, a testament to the unknown dangers and desperate hopes of travelers'
    },
    { key: 'rotting wooden bridge', text: 'an old, unstable bridge crossing a murky waterway' },
    {
      key: 'ruined fortification',
      text: 'a ruined {castle|fortress|frontier keep|watchtower} {destroyed by the slow march of time|shattered by some great litary catastrophe}'
    },
    {
      key: 'rural village',
      text: 'a cluster of thatched cottages, surrounded by fields and the daily toil of simple farmers'
    },
    {
      key: 'savage hamlet',
      text: 'a remote village, its inhabitants {deal violently with outsiders|have abhorrent cultural habits|have radical religious liefs|are the decadent remains of some group cast out for their evil ways}'
    },
    {
      key: 'sculpted terrain',
      text: '{a carved mountainside|a molded hill|an intricate pattern of waterways|a mesa pierced with music-emitting tunnels} was ilt here'
    },
    {
      key: 'shipwreck remains',
      text: "a once proud vessel, now a shattered hull upon the shore, its timbers rotting under the sun's gaze"
    },
    {
      key: 'subterranean depths',
      text: "dark caverns stretch endlessly, their walls slick with moisture and air heavy with the earth's breath"
    },
    {
      key: 'tar pits',
      text: 'black pools of bubbling tar that ensnare the unwary, preserving their unfortunate forms'
    },
    {
      key: 'temple ruins',
      text: 'the remnants of a sacred place, its broken columns and faded frescoes whispering of past devotion and forgotten gods'
    },
    {
      key: 'tribal camp',
      text: 'tents and totems circle a central fire, where traditions of ancient kin are lived and breathed'
    },
    {
      key: 'uncanny weather',
      text: "{pocket of {snowy wasteland|lush jungle}|area racked by cataclysmic storms|shifted zone of space that overlaps with some ien world's atmosphere|an area of perpetual {summer|winter|autumn|spring}}"
    },
    {
      key: '{volcanic|lava} field',
      text: 'blackened earth crackles, spewing vents and molten rivers carve through this fiery wasteland'
    }
  ],
  urban: [
    {
      key: 'abandoned warehouse',
      text: 'vast, echoing spaces, remnants of crates, shelter for the homeless'
    },
    { key: 'art gallery', text: "masterpieces displayed, silent admiration, culture's pride" },
    {
      key: 'bustling bazaar',
      text: 'a vibrant, noisy space teeming with vendors and the aroma of spices'
    },
    {
      key: 'busy docks',
      text: 'a bustling waterfront with ships, seagulls, and the briny scent of the sea'
    },
    {
      key: 'corrupt courthouse',
      text: 'a foreboding structure, its once noble halls now tainted by greed and dark dealings'
    },
    {
      key: 'cozy inn',
      text: 'a popular lodging, filled with the chatter of travelers and the aroma of cooking'
    },
    {
      key: 'crowded tenement',
      text: 'a cramped apartment building teeming with life, laundry lines strung between windows'
    },
    {
      key: 'crumbling tenement',
      text: 'an abandoned apartment building, filled with forgotten memories and the smell of decay'
    },
    {
      key: '{decayed|overrun} shantytown',
      text: 'a dense maze of makeshift homes at the edge of the city, cobbled together from scrap'
    },
    {
      key: 'dilapidated dock',
      text: 'wooden planks creaking, fishermen repairing nets, salty air'
    },
    {
      key: 'dimly lit alleyway',
      text: 'narrow, puddles reflecting moonlight, occasional scurry of rats'
    },
    {
      key: 'discreet sanitarium',
      text: 'offers treatments for maladies to the elite, rumored to be filled with secrets'
    },
    {
      key: 'eccentric workshop',
      text: 'filled with strange contraptions, the smell of ozone, and the promise of wild creation'
    },
    {
      key: 'exclusive salon',
      text: 'a guarded entrance leads to a world of privilege, plush furnishings, and hushed conversations'
    },
    {
      key: 'floating market',
      text: 'waterborne bazaar, rich with calls of trade over the gentle lap of waves'
    },
    { key: 'forbidden market', text: 'contraband goods, wary eyes, transactions in hushed tones' },
    {
      key: 'foreign quarter',
      text: 'a diverse district, buzzing with different languages and exotic smells'
    },
    {
      key: '{gilded|ornate} {palace|castle}',
      text: 'an imposing structure, echoing with the footsteps of courtiers and guards'
    },
    {
      key: 'grand cathedral',
      text: 'towering spires reach skyward, inside, majestic aisles bathed in the light of stained glass'
    },
    {
      key: 'haunted mansion',
      text: 'a once luxurious residence, now a dark, foreboding place filled with secrets'
    },
    {
      key: 'hazardous district',
      text: 'scarred by {a {natural|magical} disaster}, this area is crumbling and unsafe to traverse'
    },
    { key: 'hidden brothel', text: 'dimly lit, heavy curtains, a place of desperate comfort' },
    {
      key: 'historic monument',
      text: 'age-old edifice, echoing tales of yore, surrounded by awe and reverence'
    },
    {
      key: 'industrial factory',
      text: "a looming structure, its innards alight with the forge's fire and the din of ceaseless labor"
    },
    { key: 'law enforcement barracks', text: "uniformed guards, vigilant eyes, safety's promise" },
    {
      key: 'lively fish market',
      text: 'the pungent smell of fresh seafood, scales glistening, and the boisterous cries of vendors fill the air'
    },
    {
      key: 'local festival',
      text: 'streets burst with color, alive with the dance of performers and the aroma of seasonal delights'
    },
    {
      key: 'luxurious bathhouse',
      text: "steamy oasis, where water's caress is accompanied by soft tones of ease"
    },
    {
      key: 'makeshift clinic',
      text: 'a humble space filled with the wounded and their desperate caregivers amidst the stench of illness'
    },
    {
      key: 'merchant district',
      text: 'a lively area with shops displaying a myriad of goods and colorful signs'
    },
    {
      key: 'notorious prison',
      text: 'rusted bars and damp cells hold the echoes of despair and forgotten prisoners'
    },
    {
      key: 'old cemetery',
      text: 'serene graveyard, where memories linger among the whispering wind in trees'
    },
    {
      key: 'opulent mansion',
      text: 'a lavish residence, surrounded by gardens and the sound of luxury'
    },
    {
      key: 'ornate theater',
      text: 'a grand venue, alive with the drama of performances and applause'
    },
    {
      key: 'prestigious academy',
      text: 'halls of learning, filled with flickering candles and ancient scrolls'
    },
    {
      key: 'quarantined zone',
      text: 'sealed off by stern decree, a silent district shadowed by disease and unseen dread'
    },
    {
      key: 'refugee camp',
      text: 'makeshift homes, alive with the strength of survivors and murmur of hopes'
    },
    {
      key: 'revered temple',
      text: 'a sacred place with soaring ceilings and the scent of incense'
    },
    {
      key: 'rich mausoleum',
      text: 'grand tomb, holding legacies in silence, under the watch of solemn statues'
    },
    {
      key: 'ruins beneath',
      text: 'ancient foundations lie below, forgotten chambers and corridors filled with the dust of ages'
    },
    { key: 'secluded drug den', text: 'thick with smoke, hazy figures, escape from harsh reality' },
    {
      key: 'seedy tavern',
      text: 'a dimly lit, raucous inn filled with rough characters and the smell of stale ale'
    },
    {
      key: '{shabby|decrepit} shrine',
      text: 'faded holy site, speaking of faith and time through the crackle of dry leaves'
    },
    {
      key: 'slave market',
      text: 'harsh square, filled with the clank of chains and silent pleas of the bound'
    },
    {
      key: 'splendid garden',
      text: 'large, well-preserved gardens, filled with the smells of fragrant blooms'
    },
    { key: 'stagnant canal', text: 'slow-moving water, littered banks, moss-draped boats tied up' },
    {
      key: 'subterranean sewers',
      text: 'a dark, damp labyrinth below the streets, filled with echoes and musty smells'
    },
    {
      key: 'tattered marketplace',
      text: 'crowded with vendors, shouts of bargains, mix of spices and leather'
    },
    {
      key: 'towering gates',
      text: 'large, fortified gates, bustling with travelers and the sound of commerce'
    },
    {
      key: 'underground fighting pit',
      text: 'sweat and blood, shouts of bets, raw display of strength'
    },
    { key: 'wretched slum', text: 'a maze of cramped, squalid dwellings, teeming with desperation' }
  ]
}

const objectives = {
  defense: {
    text: 'Protect a friend against an impending threat',
    variations: [
      'Hold a strategic location against incoming enemy forces',
      'Ensure the safety of an important individual during a public event',
      'Defend a caravan or convoy as it travels through hazardous territory',
      'Ensure the safety of an important figure during transit',
      'Guard a valuable cargo until it reaches its destination'
    ],
    complication: [
      "There's a mole feeding info to the enemy",
      "The target doesn't believe there's a threat",
      'The enemy is actually a different group',
      'Someone close by would prefer they failed',
      'Target has a secret defensive advantage',
      'Enemy wants to frighten, not destroy it',
      'Current defense plans are badly flawed',
      "Expected defenders aren't there",
      'The opposition has unanticipated gear',
      'The PCs could profit greatly by betrayal',
      'A false alarm will happen while guarding',
      'The PCs are actually guarding a decoy',
      'The target resents this and is uncooperative',
      'An “ally” really wants the target gone',
      'The current guardians are incompetent',
      'The target is overconfident in their defenses',
      "They've misunderstood the real target",
      'The assailants are on a strict time limit',
      'They have a lot of active enemies'
    ]
  },
  espionage: {
    text: 'Acquire sensitive information',
    variations: [
      'Embed yourself as a mole within a rival organization',
      "Steal or copy plans for an enemy's new weapon or strategy.",
      'Identify a double agent within your own ranks',
      'Infiltrate a gathering to overhear plans or secrets',
      'Perform surveillance on a person or location of interest',
      'Extract secret documents from a heavily guarded area',
      'Gather intelligence on a high-value target',
      'Infiltrate a secure facility to obtain crucial data'
    ],
    complication: [
      'False data was placed as a decoy',
      'The data will actually harm the client',
      'Someone else is stealing the data as well',
      'The data is worthless unless stolen quickly',
      "The data is only in a single person's head",
      'Obtaining the data will hurt an innocent',
      "There's unexpected info in the data",
      'The data is attached to a precious object',
      'An important figure keeps the data near',
      'The data is only accessible at certain times',
      "There's a key needed to decode the data",
      'A copy of the data has been mislaid',
      'The data was stolen and hid by someone',
      'The data is a unique physical object',
      'Stealing it will enrage a third party',
      'Its guardians are focused on a different file',
      "It's really just a pointer to the real data"
    ]
  },
  sabotage: {
    text: 'Destroy a {thing|place} or render it inoperable',
    variations: [
      'Disable a piece of important machinery or equipment',
      "Ruin a crucial supply chain to impede the enemy's efforts",
      'Disrupt an upcoming gathering or event important to the opposition',
      'Poison or contaminate a food or water source relied upon by the enemy',
      'Create a diversion to distract enemy forces from a more significant operation',
      'Damage a critical infrastructure to hamper enemy operations'
    ],
    complication: [
      "It's currently held or used by a third party",
      "It's only accessible at particular times",
      'An innocent is reliant on its safety',
      'There are hostages kept near by it',
      "It's a very tempting target for thieving PCs",
      "It's spread out over several locations",
      "It's abnormally resilient to damage",
      'The client only wants it lightly damaged',
      'It must be stolen but seemingly destroyed',
      'The site is entangled with a different use',
      'The site is keenly on alert for sabotage',
      'The sabotage must look like mere bad luck',
      "It's already partially damaged or ailing",
      'Guard reinforcements are coming soon',
      'The PCs need inside help to get at it',
      'The target is underground somewhere',
      'Someone just stole or seized the target',
      "It's being used for an unexpected purpose"
    ]
  },
  smuggling: {
    text: 'Transport a thing across a restricted zone',
    variations: [
      'Move contraband goods through a heavily patrolled area',
      'Deliver a coded message across a militarized zone',
      'Secretly transport a person of interest to a safe location',
      'Facilitate the passage of a religious or magical artifact through a restricted area',
      'Smuggle needed supplies into an area under siege or quarantine',
      'Secretly distribute forbidden literature or propaganda',
      'Transport magical items that are illegal in a specific area',
      'Move forbidden goods through a controlled border',
      'Evade patrols to deliver a message to an undercover agent',
      'Conceal and transport a fugitive through hostile territory'
    ],
    complication: [
      "There's another, richer buyer for the goods",
      'A rival wants to bribe the PCs to go astray',
      'The goods are decoys to draw attention',
      'The goods would be useful to the PCs too',
      "It isn't what the recipient expected to get",
      'The transit route changes unexpectedly',
      'Bribed officials have been replaced',
      'Local law enforcement is active there',
      'A government official is involved in things',
      'A gang leader or crime boss wants in on it',
      'Somebody wants the run to fail badly',
      'A sympathetic group needs the goods',
      'The goods have been cut or adulterated',
      'New “taxes” are on the transit route',
      'A local wants a cut of the goods',
      'Another smuggler wants the shipment',
      'The price goes down the longer it takes',
      'The trade must take place in a public area'
    ]
  },
  theft: {
    text: 'Steal a thing from enemy forces',
    variations: [
      'Swipe a key or access device from a guarded location',
      'Safeguard a valuable object from would-be thieves',
      'Extract valuable resources from an enemy stronghold',
      'Retrieve blackmail material from a secure vault',
      'Swipe a powerful magical item before the enemy can use it'
    ],
    complication: [
      "There's a decoy target in place",
      "Someone's seeking to buy it openly",
      "Somebody's inspecting it right now",
      'Somebody dangerous carries it often',
      'Taking it would hurt a sympathetic group',
      'Another group of thieves are aiming at it',
      'The owner has been tipped to the threat',
      'A recent theft attempt failed badly',
      "They've recently changed up security",
      'Fighting near it is likely to damage it',
      "It's physically attached to something",
      'Its owner would rather it wrecked than lost',
      'One of its guardians is amenable to bribes',
      'A third party wants to ensure its safety',
      'It needs to be delivered to a specific site',
      "It's surrounded by valuable objects",
      "It's rather carelessly guarded"
    ]
  },
  rescue: {
    text: 'Retrieve a friend from a dangerous situation',
    variations: [
      'Free captives from an enemy prison',
      'Save a kidnapped individual from a remote location',
      'Extract an agent who has been compromised',
      'Liberate prisoners from a heavily guarded jail',
      'Extract a wounded ally from behind enemy lines',
      'Save a group of civilians taken hostage'
    ],
    complication: [
      'They set up their own kidnapping',
      'They thought this was just a normal job',
      'The patron wants them dead or alive',
      'They have a reason not to want to leave',
      'The captors genuinely need their help',
      'Their captors are ideological allies',
      'Someone else is trying to assassinate them',
      'Ransom was paid, but got stolen',
      "They're kept constantly on the move",
      'They escaped but are now lost somewhere',
      "They'll be killed if not rescued soon",
      "They'll be killed once no longer needed",
      'Their captors are very solicitous to them',
      "They've hidden loot somewhere nearby",
      'They have a friend among their captors',
      'They must be extracted to a specific place',
      'Their location is dangerous to get to',
      "They're injured and largely immobile",
      "They won't leave without a friend there",
      "They've obtained a position of power there"
    ]
  },
  bounty: {
    text: 'Defeat a dangerous enemy',
    variations: [
      'Eliminate a powerful creature causing havoc',
      'Capture or kill a notorious criminal on the loose'
    ],
    complication: [
      'A failed attempt would bring disastrous consequences',
      'It has a swarm of spawn or loyal servitors to guard it',
      'Locals placate the thing with sacrifices and fear its anger',
      "The creature always flees a fight it's not sure it will win",
      'The creature has hostages or prisoners in its lair',
      'The creature is extremely hard to locate or identify',
      "The client's confused about the target",
      'The target is constantly on the move',
      'The target is wanted captured and alive',
      'Someone else is making a hit on them, too',
      'Their guards are not particularly loyal',
      "There's going to be a gap in their guarding",
      'Their death must be hidden for a while',
      "The client's info about them is wrong",
      'They must be killed in a certain way/place'
    ]
  },
  retrieval: {
    text: 'Recover a lost thing',
    variations: [
      'Retrieve a historical document from a dangerous area',
      'Locate and bring back a lost family heirloom',
      'Recover a stolen shipment of crucial supplies',
      'Regain control of a strategic location taken by the enemy',
      'Find and return sacred texts or scriptures',
      'Retrieve a rare ingredient for a critical mission or ritual',
      'Recover relics from a dangerous site',
      'Locate and bring back a missing person'
    ],
    complication: [
      'It starts degrading when recovered',
      "It's extremely fragile in some way",
      "It's more valuable than the client thought",
      'Somebody else already has claimed it',
      'The locals where it is have no clue about it',
      "It's been collected as worthless scrap",
      "Somebody's using it in an unexpected way",
      "It's in multiple pieces that must be obtained",
      "It's tangled in some larger device or thing",
      "It's in a hazardous building or area",
      'The client only needs one part from it',
      "It's got a dangerous secret embedded in it",
      'A removable part is very valuable',
      "It's tremendously illegal to possess it",
      "It's government property of some kind",
      "It's among many similar-looking objects",
      "It's hidden inside a living creature",
      'It requires special gear to handle it',
      "It's going to be ruined soon if not retrieved",
      "The thing has a decoy that's actually a trap",
      'The thing is actually totally different from what it seems',
      'The thing moves constantly, so locations go stale rapidly',
      'There are many examples of the thing, all but one fake'
    ]
  },
  explore: {
    text: 'Gather information about a place',
    variations: [
      'Survey a newly accessible wilderness area',
      'Investigate a mysterious phenomenon at a specific location',
      'Scour a ruin for signs of historical or arcane significance',
      'Investigate a recently discovered ancient ruin',
      'Recon an enemy stronghold and return with details'
    ],
    complication: [
      'A third party offers pay to deceive',
      "The place looks like what it isn't",
      'Existing info about the place is wrong',
      'A third party is keeping people out',
      'The only source of a critical fact is missing',
      'A third party is monitoring the place',
      'The PCs need to find the last scout team',
      "The client's real interest is hidden from PCs",
      'The apparent place is only part of it; most of it is hidden',
      'The locals are terrified that the PCs will stir up trouble',
      'Hazardous flora make up a natural trap for those ignorant of their perils',
      'Numerous deadfalls or covered pits have been placed on side paths here',
      'The area is positioned somewhere that has an excellent view of most approaches to it',
      "There's a nest or lair of some dangerous animal obstructing easy entrance, but the occupants know how to deal with them",
      "The area's inside the hunting territory of some dreadful creature",
      'It extremely well-concealed amid the terrain'
    ]
  }
} as const

const skills = {
  mobility: {
    text: 'acrobatics, dodging hazards, and moving quickly through difficult terrain',
    variations: [
      { text: 'squeeze through a narrow passage without getting trapped' },
      { text: 'run across {crumbling|unstable|slippery|hazardous} ground without falling' },
      { text: 'dodge projectiles while navigating a dangerous location' },
      { text: 'weave through a crowd to chase a fleeing npc', type: 'community' }
    ]
  },
  stealth: {
    text: 'hiding, moving quietly, pickpocketing, lockpicking, and disguises',
    variations: [
      { text: 'silently move through the area without alerting the inhabitants' },
      { text: '{pickpocket|steal} an object without being noticed', type: 'community' },
      { text: 'pick a lock to {reveal a dark secret|free prisoners}' },
      { text: 'stay hidden while eavesdropping on an important conversation', type: 'community' },
      { text: '{infiltrate|scout} the area using disguises to gather information' }
    ]
  },
  investigation: {
    text: 'searching locations, finding people, solving puzzles',
    variations: [
      { text: 'track down an elusive npc by interviewing locals', type: 'community' },
      { text: 'decipher a cryptic {inscription|riddle|map} to unlock a secret' },
      {
        text: 'search the area for {a {hidden clue|rare object}|concealed compartments|hidden chambers}'
      },
      { text: 'analyze the scene of a crime to determine what happened' }
    ]
  },
  knowledge: {
    text: 'recalling facts about arcana, history, laws, myths, etiquette, and religions',
    variations: [
      { text: 'recall etiquette needed when addressing an important npc', type: 'community' },
      { text: 'identify scattered {arcane|religious} symbols in the area' },
      {
        text: 'remember an important {historical|religious} {event|figure} that relates to the area'
      },
      { text: 'perform an old {religious|arcane} ritual in order to break a curse' },
      { text: 'recall a local {law|custom} that is being broken by an npc', type: 'community' }
    ]
  },
  perception: {
    text: 'notice fine details through sight, hearing, and smell',
    variations: [
      { text: 'spot {a hidden|an illusory} entrance within the area' },
      { text: 'notice a concealed trap in a dimly lit corridor' },
      { text: 'hear the faint {whispering|rustling} of nearby hidden enemies' },
      { text: 'hear a distant cry for help masked by the ambient sounds of the area' },
      { text: 'notice signs of recent passage in the area' },
      { text: 'detect the subtle scent of a rare herb hidden among common foliage' },
      { text: 'spot an almost invisible {mark|inscription} made on a {map|manuscript|artifact}' },
      { text: 'notice the slight discoloration of a drink, warning of poison', type: 'community' },
      { text: 'notice a {suspicious|unusual} npc {in a crowd|following you}', type: 'community' }
    ]
  },
  insight: {
    text: 'detecting lies, emotions, and intent of others',
    variations: [
      { text: "detect the subtle tell of an npc who's not being truthful" },
      { text: "understand the underlying jealousy in a npc's compliments" },
      { text: "perceive the hidden sorrow behind an npc's stern demeanor", type: 'community' },
      { text: "sense the underlying tension in an npc's jovial facade" },
      { text: "catch the fleeting expression of guilt on a suspect's face", type: 'community' },
      { text: "understand the true motive behind a benefactor's generosity", type: 'community' },
      { text: "notice the signs of distrust in an npc's casual questions", type: 'community' },
      { text: "perceive the flicker of recognition in a stranger's eyes", type: 'community' },
      { text: "sense the suppressed anger in an ally's voice" },
      {
        text: "recognize the signs of enchantment affecting an individual's emotions",
        type: 'community'
      },
      { text: 'detect the signs of a potential betrayal in a trusted ally' }
    ]
  },
  survival: {
    text: 'recalling facts about nature, navigation, handling animals, tracking, and medicine',
    variations: [
      { text: 'navigate a maze of twisting passages using natural landmarks', type: 'wilderness' },
      {
        text: 'track a quarry through the wilderness by recognizing its unique signs',
        type: 'wilderness'
      },
      {
        text: "recognize the scent of a dangerous creature's territory to avoid it",
        type: 'wilderness'
      },
      {
        text: 'harvest and prepare a medicinal herb to counteract a venomous bite',
        type: 'wilderness'
      }
    ]
  },
  persuasion: {
    text: 'influencing people through negotiation, charm, oration, deception, or intimidation',
    variations: [
      {
        text: "convince a hostile npc to {stand down|help you|spare the lives of innocents|reveal their employer's identity}"
      },
      {
        text: '{trick|bribe|intimidate|charm} a reluctant npc into {revealing a secret|giving you an item|letting you pass|look the other way}'
      },
      { text: 'negotiate a {peaceful|mutually beneficial} resolution to a conflict' },
      {
        text: 'charm a merchant into {giving you a discount|selling rare inventory}',
        type: 'community'
      },
      { text: "win a crowd's support for your cause through stirring oration", type: 'community' },
      { text: 'intimidate a traitor into revealing their co-conspirators', type: 'community' },
      {
        text: 'convince an official to reconsider a {law|decree} detrimental to the patron',
        type: 'community'
      }
    ]
  },
  athletics: {
    text: 'running, jumping, climbing, swimming, lifting, and overcoming obstacles with brute force',
    variations: [
      { text: 'climb a sheer surface to reach a higher location' },
      { text: 'swim through a {flooded area|strong current}' },
      { text: 'push aside heavy debris that is obscuring the path' },
      { text: 'break through a {locked door|weak barrier}' },
      { text: 'leap across a perilous gap' }
    ]
  }
}

const introductions = [
  'Note or map on a defeated foe',
  'Overheard market gossip or tavern talk',
  'Sad tale of a survivor or escapee',
  'Text found while exploring',
  'Former patron seeking them out',
  'Desperate local looking for help with it',
  'A plotter mistakes them for confederates',
  'Encounter a place scarred by the adventure',
  'Fight a monster made to flee from the site',
  'Find a treasure with embedded information',
  'Be hired by the antagonist as muscle',
  'A friend of the party is affected by it',
  'Town crier announces it in public',
  'They stumble into an active part of it',
  'Intercept a message meant for an antagonist',
  'Government official needs to hire help',
  'Failed first group tries to pass along the job',
  'Plea for help nailed up in public',
  'Guild or business looking for hired help'
]

export const QUEST = {
  spawn: (hub: Hub) => {
    const province = PLACE.province(hub)
    if (!quests[province.idx])
      quests[province.idx] = window.dice.sample(Object.keys(objectives), 5).map(quest => {
        const hostiles = ['espionage', 'theft', 'smuggling'].includes(quest)
          ? enemies.urban
          : ['exploration', 'retrieval', 'bounty'].includes(quest)
          ? enemies.wilderness
          : window.dice.choice([enemies.urban, enemies.wilderness])
        const urban = hostiles === enemies.urban
        const location = window.dice.choice(urban ? locations.urban : locations.wilderness)
        const key = window.dice.spin(location.key)
        const actor = ACTOR.spawn({ place: hub })
        const enemy = window.dice.choice(hostiles)
        const spunFoe = window.dice.spin(enemy)
        const urbanFoe = enemies.urban.includes(enemy)
        const wildernessFoe = enemies.wilderness.includes(enemy)
        const used = new Set()
        return {
          type: quest,
          introduction: window.dice.choice(introductions),
          complication: window.dice
            .choice([...objectives[quest as keyof typeof objectives].complication])
            .toLowerCase(),
          patron: actor.idx,
          enemies: spunFoe,
          difficulty: 'easy',
          occupation: PROFESSION.random(hub),
          location: TEXT.decorate({
            label: TEXT.titleCase(key),
            tooltip: window.dice.spin(location.text)
          }),
          challenges: range(6).map(i => {
            const skill = i % 2 === 0
            const urban = skill || (urbanFoe && wildernessFoe) ? window.dice.flip : urbanFoe
            const place = window.dice.choice(urban ? locations.urban : locations.wilderness)
            const challenge = window.dice.choice(
              Object.keys(skills).filter(skill => !used.has(skill))
            )
            used.add(challenge)
            return {
              type: skill ? challenge : 'combat',
              text: skill
                ? skills[challenge as keyof typeof skills].text
                : window.dice.spin(
                    `{survive an ambush from|ambush the|survive a confrontation with} ${spunFoe} (${
                      i === 1 ? 'minions' : i === 3 ? 'elites' : 'boss'
                    })`
                  ),
              setting: `${TEXT.decorate({
                label: window.dice.spin(place.key),
                tooltip: window.dice.spin(place.text),
                color: cssColors.subtitle
              })}, ${WEATHER.conditions({
                cell: window.world.cells[hub.cell],
                color: cssColors.subtitle
              })}`
            }
          })
        }
      })
    return quests[province.idx]
  }
}
