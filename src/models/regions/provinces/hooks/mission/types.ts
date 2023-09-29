export const missions = {
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
    ],
    milestones: [
      {
        text: 'gather descriptions and details of the {person|group} to be rescued',
        stage: 'early',
        setting: 'urban'
      },
      {
        text: 'determine the last known location of the captive',
        stage: 'early',
        setting: 'urban'
      },
      {
        text: 'discover a personal item left behind by the captured individual that might hold a clue',
        stage: 'early',
        setting: 'urban'
      },
      {
        text: 'find a witness who saw the abduction or can identify the kidnappers',
        stage: 'early',
        setting: 'urban'
      },
      {
        text: 'bribe or persuade guards or local authorities for information or access',
        stage: 'early',
        setting: 'urban'
      },
      {
        text: "acquire a disguise or credentials to infiltrate the captors' stronghold",
        stage: 'middle',
        setting: '*'
      },
      {
        text: 'save another captive, gaining crucial information or assistance',
        stage: 'middle',
        setting: '*'
      },
      {
        text: 'confront a mid-level {enforcer|lieutenant} guarding the inner sanctum',
        stage: 'middle',
        setting: '*'
      },
      {
        text: 'decrypt a message or diary detailing the reasons behind the abduction',
        stage: 'middle',
        setting: '*'
      },
      {
        text: 'locate the main chamber where the primary victim is held',
        stage: 'middle',
        setting: '*'
      },
      {
        text: 'engage in a standoff or parley with the {mastermind|leader} of the kidnappers',
        stage: 'late',
        setting: '*'
      },
      {
        text: 'successfully free the captive and defend them against pursuers',
        stage: 'late',
        setting: '*'
      }
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

export type Mission = keyof typeof missions
