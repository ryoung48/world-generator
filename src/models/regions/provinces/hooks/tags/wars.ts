export const wars = {
  'Border Dispute': {
    text: `They fight over a line on the map, one side claiming land that the other vows is their own, and both usually having some colorable defense to their claim. Sometimes this struggle is fueled by valuable resource deposits or significant populations in the disputed area, but other times the quarrels can spark over useless rocks in the ocean or a stretch of barren desert. In the latter case, border disputes are often pretexts to cover a less convenient reason for struggle; you might choose to roll again to find the real reason behind the fight.`,
    enemies: [
      { tile: 'Bordermarch lord' },
      { tile: 'Troublesome local leader' },
      { tile: 'Once-governor of the disputed land' },
      { tile: 'Refugee clan head' }
    ],
    friends: [
      { tile: 'Fought-over village leader' },
      { tile: 'Historian with unwanted evidence' },
      { tile: 'Dweller too close to the new border' },
      { tile: 'Refugee from losing side' }
    ],
    complications: [
      "Someone's falsifying evidence to provoke the strife",
      'The border is based on a landmark that moves',
      "The border's shared with a third party",
      'The local dwellers hate both side'
    ],
    things: [
      'Evidence of the original border',
      'Cache of insurgent gear',
      'Buried treasure of dead residents',
      'Proof of the real reason for the fighting'
    ],
    places: [
      'Abandoned fortification',
      'Border-straddling town',
      'Local hill refuge',
      'Border watchtower'
    ]
  },
  'Culture War': {
    text: `The enemies differ over extremely basic cultural or economic values and worldviews. One or both sides embrace principles that the other finds monstrous or loathsome, and popular pressure forces conflict between the two groups. These values may be entwined in the local religions, but they tend to pervade the entire culture and are held proudly as badges of identity by members of each group. Decency requires that they crush each others' filthy ways.`,
    enemies: [
      { tile: 'Guardian of tradition' },
      { tile: 'Zealous young moral crusader' },
      { tile: 'Grim-jawed reformer' },
      { tile: 'Cynically hypocritical leader' }
    ],
    friends: [
      { tile: 'Practitioner of a forbidden custom' },
      { tile: 'Guardian of execrated traditions' },
      { tile: 'Merchant beggared by a change of economic models' },
      { tile: 'Family of a martyr for a belief' }
    ],
    complications: [
      'One side has more appealing ideals but more repulsive leadership',
      'Both sides embrace repugnant beliefs',
      'The differences seem utterly trivial to outsiders but have deep symbolic meaning to locals',
      'An initially noble cause has fallen into cynical exploitation'
    ],
    things: [
      'Symbolic artifact of a way of life',
      'Resource vital for maintaining a custom',
      'A coffle of slaves or other persons crucial to the dispute',
      'Propaganda material for one side'
    ],
    places: [
      'Fortified temple or cultural shrine',
      'Mass demonstration for or against a culture',
      'Marketplace or workplace for cultural practice in dispute',
      'Smashed ruins of a great shrine dedicated to a belief'
    ]
  },
  'Curtailed Rival': {
    text: `One of the parties involved has always been a secondary power compared to the other, but recent success and expansion is making them a real threat to the stronger polity. Rulers in the latter society have decided that it is best to crush their rivals now, before they get strong enough to be a real threat. Not uncommonly, this decision is only reached long after the point where such quelling is as easy as its authors had hoped. The chastisement may focus simply on destroying those industries or resources which made the smaller group a threat, or it may be a more thorough annexation or extermination of the threatening upstart.`,
    enemies: [
      { tile: 'Cynical foreign minister' },
      { tile: 'Ambitious glory-hound general' },
      { tile: 'Avaricious oligarch' },
      { tile: 'Minority leader collaborationist in the target nation' }
    ],
    friends: [
      { tile: 'Bewildered border guard' },
      { tile: 'Concerned spy for the target nation' },
      { tile: 'Family with old ties to target nation' },
      { tile: 'Kidnapped foreign dignitary' }
    ],
    complications: [
      'The rival really was planning to sucker-punch their old hegemon',
      "The rival's being set up by a third party",
      'The rival is much stronger than expected',
      'The rival has a major ally ready to act'
    ],
    things: [
      'Evidence of a false-flag attack by one side',
      'Codes for warning of an impending attack',
      "Proof of a major figure's personal interest in a war",
      'Plans for the new tech the invaders want destroyed'
    ],
    places: [
      'Construction or research site for a dramatic new technology',
      'Site of some former triumph by the old hegemon',
      'Vital mine or resource processing facility',
      "Target nation's newly-built industrial center"
    ]
  },
  'Ethnic Homeland': {
    text: `One of the parties to the struggle craves an ethnic homeland for their people, one where they can be ruled by their own kind in accordance with their own ways. This homeland may be based strictly on ethnic divisions, or it may instead be focused on minority religions or cultural practices. The majority party is unlikely to acquiesce in the abandonment of its rule, to say nothing of the non-ethnic locals living in the territory. These wars often take the form of long, grinding guerrilla conflicts, though some groups are strong enough to field actual armies, especially with a little help from outside parties.`,
    enemies: [
      { tile: 'Ambitious ethnarch dreaming of independence' },
      { tile: 'Hereditary ruler in exile' },
      { tile: 'Zealous racial purist' },
      { tile: 'Determined survivor of past pogroms' }
    ],
    friends: [
      { tile: 'Unlucky local of the wrong ethnicity' },
      { tile: 'Beleaguered peacekeeper' },
      { tile: 'Desperate refugee camp director' },
      { tile: 'Member of a now-dangerous inter-ethnic marriage' }
    ],
    complications: [
      "The separatists' reasoning is extremely defensible",
      "They're supported by a neighbor who wants a buffer",
      'Their homeland is extremely valuable terrain',
      'Their desired homeland is shared by another group'
    ],
    things: [
      'Historical evidence for their land rights',
      'Proof of a separatist or government massacre',
      'Vital supplies for refugees',
      'Cache of arms for separatist guerrillas'
    ],
    places: [
      'Site holy to the separatists or other locals',
      'Historical battlefield important to the separatists',
      'A once friendly town now divided by ethnicity',
      'Barrier to keep separatists or other locals out'
    ]
  },
  'Forced Conflict': {
    text: `The aggressors in this war don't want to fight it, but some entity beyond their power to resist is insisting that they attack. They might be strong-armed into it by a much more powerful neighbor who wants to see them deal with a troublesome polity, or they might be under the control of powerful foreign concerns, or they may just be forced into it by cultural or religious precepts that they obey without joy. If a way can be found to lift the pressure, the war is likely to end rapidly, but otherwise it may go on to an extent that satisfies no one but a pitiless and distant master.`,
    enemies: [
      { tile: 'Machiavellian transnational oligarch' },
      { tile: 'Fanatical religious leader' },
      { tile: 'Scheming hegemonic ruler' },
      { tile: 'Ambitious general with little civilian oversight' }
    ],
    friends: [
      { tile: 'Diplomat stymied by an outside power' },
      { tile: "Military officer who doesn't want to fight" },
      { tile: "Scholar digging for the war's real story" },
      { tile: "Powerful rival of the war's true motivator" }
    ],
    complications: [
      'Neither army really wants to commit to battle',
      "The war's instigator is under time pressure to get the bloodshed going before they're deposed",
      "The real target isn't the attacked nation but some person or group in it",
      "The war's instigator is deluded about how easy it will be to win"
    ],
    things: [
      "Proof of the war's real instigator",
      'The macguffin that the instigator really wants seized or destroyed',
      'Supplies left cached by stunned defenders',
      'Control codes lost in the initial confusion'
    ],
    places: [
      'A once-peaceful border town in chaos',
      'A sullen and resentful base full of conscripts',
      'A victory parade of enforced patriotism',
      'An enclave or building of the coercing power'
    ]
  },
  'Forced Migration': {
    text: `The attacking party feels forced to do so, as their former nation was driven from their old lands. The entire polity is on the move, compelled to invade a neighbor due to pressure from a more powerful conqueror, an environmental catastrophe in their former lands, or some natural disaster that is rendering their old home uninhabitable. Domed cities on otherwise uninhabitable worlds often suffer this cause of war when the ancient repair mechanisms start to break down.`,
    enemies: [
      { tile: 'Desperate leader ready to risk all' },
      { tile: 'Hard-bitten scrap engineer-king' },
      { tile: 'Brutal nomadic warlord' },
      { tile: 'Reluctant ruler who can see no solution but war' }
    ],
    friends: [
      { tile: 'Refugee from overrun territory' },
      { tile: 'Defector who tries to find a different way' },
      { tile: 'Bitter survivor of the initial wave' },
      { tile: 'Grim defender of the existing culture or nation' }
    ],
    complications: [
      "The migration's impetus is likely to hit the invaded nation next",
      'A faction of the invaders wants to try peaceful coexistence',
      'Some locals are actually related to the invaders by ethnic or religious bonds',
      'The invasion is on a very strict schedule or else the disaster will overcome it'
    ],
    things: [
      "A weapon against the migration's cause",
      'Supplies desperately needed by the hungry invaders',
      'Proof of local complicity with the invaders or innocence of it',
      'A device to fix the problem causing the invasion'
    ],
    places: [
      'A fortress blocking a vital invasion path',
      'A stronghold of local holdouts',
      'A village uneasily under new rulership',
      "A blasted wasteland ruined by the invasion's compelling reason"
    ]
  },
  'Hired War': {
    text: `One side of the war has been hired into attacking the other. This may be a simple case of bribery, with the rulers of one side being paid off by some interested outside power, or it might be a more complicated matter of diplomatic alliances and shared interest in another nation's downfall. The common people may or may not be aware of the real motive behind the fighting, but the rulers usually prefer to keep such sordid details out of the common eye, often crediting some wholly different reason why they simply must launch their attack.`,
    enemies: [
      { tile: 'Soulless mercenary captain' },
      { tile: 'Ruthless oligarch warmonger' },
      { tile: 'Bitter exile financing the war' },
      { tile: 'Sinister diplomat arranging the fighting' }
    ],
    friends: [
      { tile: 'Abandoned mercenary' },
      { tile: 'Shocked businessman with interests in both nations' },
      { tile: "Betrayed diplomat who thought war wouldn't come" },
      { tile: 'Member of the group the warmongers are really trying to hurt' }
    ],
    complications: [
      'The warmongers are sending “volunteers” to the fight',
      "The defenders don't dare openly accuse the warmongers of inciting the war",
      'The attackers are suffering more than the defenders due to the war',
      'The warmongers intend to take over both weakened countries at the end'
    ],
    things: [
      'New shipment of weapons from the warmongers',
      'Critical payment in precious substances',
      "Proof of the warmongers' interests in the fight",
      'Military hardware undeniably from the warmongers'
    ],
    places: [
      'Suddenly-expanded training camp of the invaders',
      "Social club catering to the inciter's troops",
      'Factory repurposed badly to make military goods',
      'Sullen and joyless “patriotic demonstration”'
    ]
  },
  'National Honor': {
    text: `The filthy foe has done something unforgivable to offend the decent sensibilities of the attacking nation. Brutal mistreatment of diplomats, savagery against innocent tourists, intentional insult of religious figures, or some other act has grievously wounded the hearts of the aggressor's people. Sometimes the local elites may not actually want a war at all, but must do something to satisfy the popular fury lest they be deposed or worse. At other times the crime is purely manufactured by the attacking nation, the better to stir up righteous wrath in the hearts of their countrymen.`,
    enemies: [
      { tile: 'Enraged victim of the offending insult' },
      { tile: 'Grimly honor-bound ruler' },
      { tile: 'Cynical schemer playing on local passions' },
      { tile: 'Exile seeking to use the insult to avenge their banishment' }
    ],
    friends: [
      { tile: 'Insufficiently enthusiastic local' },
      { tile: 'Supposed collaborator' },
      { tile: 'Foreign artist' },
      { tile: 'Diplomat in fear for their life' }
    ],
    complications: [
      'The insult was a frame job by an outside enemy',
      'The insult was all a terrible misunderstanding',
      "The insult was intentional to provoke a war on the defender's schedule",
      'The insult was wholly justified'
    ],
    things: [
      'Proof the insult was falsified by someone',
      'The one thing the defenders can give to assuage the offense',
      "Something precious to be sacrificed to honor's demands",
      'The remains of the victim of the insult'
    ],
    places: [
      'Cultural shrine to the glorious dead',
      'Site of a historical victory',
      'Supposed site of the dire insult',
      'Village burnt out by enraged invaders'
    ]
  },
  'National Vigor': {
    text: `A nation grows strong, too strong for its current place in the world. It chafes under old restrictions and pushes itself against the limits its old superiors have placed on it. Those agreements that were grudgingly tolerated in days of weakness now seem to be unendurable insults to their national sovereignty, and it is vital that they be thrown down. Such rumbustious new powers are often quick to turn on weaker neighbors, demonstrating their newfound importance in the wreckage of countries that were once thought their equals in weakness. At times such a nation might go too far, imagining itself great enough to challenge a planetary superpower that it thinks has grown senile or decadent in its old age.`,
    enemies: [
      { tile: 'Brash young king' },
      { tile: 'Zealous general' },
      { tile: 'Market-seeking colonialist' },
      { tile: 'Tyrant looking for fresh glory' }
    ],
    friends: [
      { tile: 'Luckless conscript soldier' },
      { tile: 'Trapped enemy citizen' },
      { tile: 'War-taxed merchant' },
      { tile: 'Parent of dead draftee' }
    ],
    complications: [
      'The nation really has been unfairly oppressed in the near past',
      'The nation has a new weapon or ancient relic that they think will give victory',
      'The nation is critically deluded about its chances',
      'The eager vigor is all in one section or subgroup of the population'
    ],
    things: [
      "Rare parts for the nation's new industries",
      'Symbolic relic of old oppression',
      'Supplies needed by locals driven to desperation by war taxes',
      'Military hardware seized from the unsuspecting target'
    ],
    places: [
      'Newly-constructed industrial site',
      'Mass demonstration to support the war',
      'Conscription and training center',
      'Newly-captured town of sullen locals'
    ]
  },
  'Political Distraction': {
    text: "Some political scandal or popular uprising threatens the security of a nation's elite, and so they find it helpful to distract the public with a convenient little war. Such fights are almost always picked with a clearly inferior foe, the better to ensure that the ensuing struggle will be a victorious feather in their collective cap. Unfortunately for the attackers, the same problems and conflicts that forced the distraction in the first place often bleed into the conduct of the war, making a sure thing less certain by far.",
    enemies: [
      { tile: 'Failing dictator needing an enemy' },
      { tile: 'Unpopular elected president' },
      { tile: 'Ruler struggling to hold together a fractious nation' },
      { tile: 'Warlord in need of plunder for their lieutenants' }
    ],
    friends: [
      { tile: 'Political enemy of the ruler' },
      { tile: 'Unhelpfully honest Scholar' },
      { tile: 'Blindsided political supporter suddenly thrust into war' },
      { tile: 'Member of the opposition party drafted into a suicide squad' }
    ],
    complications: [
      'The people eagerly support but will turn violently on the ruler at the first real setback',
      'The leader actually is a friend of the new enemy but was forced into the war by a desperate opposition',
      'The attacking nation is just not taking the war seriously',
      'Both sides welcome the distraction from domestic woes'
    ],
    things: [
      'Blackmail material on the ruler',
      'Army supplies stolen by political enemies',
      'Plunder used to bribe political rivals',
      'Material embezzled by an incompetent party-supporter general'
    ],
    places: [
      'Elaborate showpiece monument',
      'Luxurious town for allied politicians and their families',
      'News station pumping out war propaganda',
      'Secret getaway where inner-circle politicians cut deals'
    ]
  },
  'Political Restoration': {
    text: 'The aggressors once ruled their current enemy, either holding them directly as a province or keeping them firmly within their sphere of influence. At some time in the past, their foe broke away, however, and now it\'s time to bring them back within the sphere of civilization. Significant minorities of the former ruler\'s population often remain within the victim, which often provides an easy excuse for "protective intervention".',
    enemies: [
      { tile: 'Ruler drunk on history' },
      { tile: 'Oligarch with long-lost claims on property' },
      { tile: 'Leader confident of a warm welcome from the people' },
      { tile: '“Oppressed minority” agitator from the defending country' }
    ],
    friends: [
      { tile: "Ill-treated local from invader's ethnicity" },
      { tile: 'Pro-peace political rival of the leader' },
      { tile: 'Local now treated as a “rebel citizen” by occupying forces' },
      { tile: 'Local caught in crossfire between partisans and regulars' }
    ],
    complications: [
      'The remnant population in the invaded country is eagerly cooperating with the invaders',
      'The remnant are only being accused of cooperating',
      'The invaded country is actually miserably governed',
      'The invaders are hindering themselves with fastidious rules of engagement and propaganda effort'
    ],
    things: [
      'Mobile anti-air missile truck for “volunteers”',
      'Supplies for “traitorous” minority being starved',
      'Cultural treasure of the invaders kept by the breakaway nation',
      'List of secret enemy sympathizers'
    ],
    places: [
      'Former seat of rule during the last dominion',
      'Ruins of a monument to the former rulers',
      'Border town once sharply divided between nations',
      'Old battlefield that has become a current battlefield'
    ]
  },
  Razzia: {
    text: "One side is making a frankly rapacious raid on the other, determined to seize as much material wealth as possible. Some cultures may use such wars as their primary sources of sources of slaves and other finished goods, while others view them as convenient pressure releases for excess numbers of impoverished warriors or restless young men. Territorial claims aren't usually made during razzias, and the more far-sighted plunderers may intentionally avoid starving out their prey or brutalizing them beyond their ability to regrow a sufficient harvest for next time.",
    enemies: [
      { tile: 'Rapacious warlord' },
      { tile: 'Oligarch owed money by the enemy' },
      { tile: 'Leader desperate for resources to patch up a failed economic plan' },
      { tile: 'General contemptuous of their weakling neighbor' }
    ],
    friends: [
      { tile: 'Plundered farmer' },
      { tile: 'City-dweller driven into the country' },
      { tile: 'Local enslaved to help carry loot' },
      { tile: 'Villager who is the sole survivor of an attempted resistance' }
    ],
    complications: [
      'The defender is used to these raids and feels hopelessly unable to resist',
      'The razzia is exceptionally vicious and seeks complete genocide',
      'The razzia is to collect legitimate debts the hard way',
      "The invaders don't just want these goods they desperately need them"
    ],
    things: [
      'Cultural treasure plundered by raiders',
      'Hostages dragged along',
      'A cache of goods hidden from the enemy',
      'A priceless treasure the invaders seek'
    ],
    places: [
      'Burnt-over crop field',
      'Road choked with refugees',
      'Smashed and looted factory',
      'Burning city'
    ]
  },
  'Religious Expansion': {
    text: 'A burning faith must be carried on the edge of the sword, and at least one of the parties involved is just the army to carry it. An explosive new religion or radical religious reformation has provoked a group into conquest and proselytization. The infidel natives must be crushed and brought to the True Way, whatever that may be, for the greater glory of God. Incidentally, it also usually works out for the greater glory of the conquering nation, but such points rarely inspire great introspection.',
    enemies: [
      { tile: 'Purifying reformer-by-force' },
      { tile: 'Cynical imperialist ruler' },
      { tile: 'Wild-eyed prophet of future glory' },
      { tile: 'Determined peacemaker by enforced conformity' }
    ],
    friends: [
      { tile: 'Priest of a rival faith' },
      { tile: 'Heretical anti-war cleric of the invading faith' },
      { tile: 'Local who gave the wrong answers to a religious question' },
      { tile: 'Civilian who failed to show adequate piety' }
    ],
    complications: [
      'The “religion” is an atheistic philosophy or ideology',
      'The religion is backed up with a conformity-inducing technology',
      'The neighboring nations have active cells of collaborating believers',
      "The neighboring nations fear and hate all members of the faith whether they're violent or not"
    ],
    things: [
      'Problematic original sacred text',
      'Relic of a martyred saint',
      'Precious treasure donated to the faith',
      "Ancient relic used to further the religion's goals"
    ],
    places: [
      'The ruined shell of a native church',
      'A newly-built shrine to the invading faith',
      'Factory now under ecclesiastical management',
      'Re-education camp dedicated to proselytizing the conquered populace'
    ]
  },
  'Religious Schism': {
    text: "The two sides share faiths so similar than an outsider may have a hard time distinguishing between them. The locals don't suffer this confusion; the differences are so crucial and so important that they must be settled in blood. One side may have been founded by a group of heretics or the fissure may have formed naturally as the faith evolved differently across different regions of the world.",
    enemies: [
      { tile: 'Minority religious leader with the majority army' },
      { tile: 'Rejected heir to a clerical dynasty' },
      { tile: 'Leader of a populous but oppressed sect' },
      { tile: "Diplomat inciting the war on behalf of his employer's interests" }
    ],
    friends: [
      { tile: 'Moderate cleric of either side' },
      { tile: 'Believer in an unrelated faith' },
      { tile: 'Scholar caught in the crossfire' },
      { tile: 'Keeper of a shrine of the wrong faith' }
    ],
    complications: [
      'The schism is a thinly-disguised excuse for a different and baser disagreement',
      'The enemies much prefer to convert rather than kill heretics',
      'A revered holy figure could resolve the dispute but for some reason will not do so',
      'Both sects have a history of bloody violence against each other'
    ],
    things: [
      'Relic prized by both sects',
      'Contraband goods forbidden by a sect',
      'Sanctified ancient weapons',
      'Sure evidence of the impiety of an important official'
    ],
    places: [
      'Mass grave of heretics',
      'Ruined church',
      'Desecrated graveyard',
      'Burnt-out city of the wrong faith'
    ]
  },
  'Resource Struggle': {
    text: 'Something crucial to industrial success or even bare survival is at stake in the war. Mineral deposits, agricultural land, habitable terrain, or alien artifacts might be at the core of the struggle, with both sides seeking to obtain or maintain control of the resource. Some of these struggles are old wars over often-exchanged territory, while others are suddenly sparked when colonial settlers find some newly-discovered treasure for the locals to quarrel over.',
    enemies: [
      { tile: 'Influential merchant prince' },
      { tile: 'Foreign prospector' },
      { tile: 'Former owner of the territory' },
      { tile: 'Rapacious tyrant' }
    ],
    friends: [
      { tile: 'Resource extraction worker driven from the site' },
      { tile: 'Ignored environmentalist' },
      { tile: 'Resource technician now targeted by the invaders' },
      { tile: 'New process developer who accidentally sparked the war' }
    ],
    complications: [
      'The invaders need the resources for some grand scheme',
      'The resources are worthless locally but precious to outsiders',
      'The resources are culturally precious to one side and mere economic loot to the other',
      'The resources are wasting rapidly and will be gone soon'
    ],
    things: [
      'A massive lode of the resource',
      'Tech needed to extract the resource',
      'A map to a cache of the resource',
      'A stockpile of the resource stolen by invaders or embezzled by locals'
    ],
    places: [
      'Used-up resource extraction site',
      'Burnt-out resource processing facility',
      'Industry building reliant on the resource',
      'Work camp with “volunteer” extraction workers'
    ]
  },
  Revanchism: {
    text: 'The aggressors lost something and now they want to take it back. Land is the traditional cause, with the assailants convinced that the territory is theirs by right and must be taken at all costs. Population clusters can also provoke hostilities, with a "motherland" seeking to reclaim jurisdiction over large minority groups in foreign territories. The cause of the war may come from recent claims, or it may be an inherited struggle begun centuries ago.',
    enemies: [
      { tile: 'Bitter leader of now-minority group in the lost territory' },
      { tile: 'Religious leader with old scores to settle' },
      { tile: 'A dictator seeking distraction in old wounds' },
      { tile: 'Ruler incited by newly-obtained tech or power' }
    ],
    friends: [
      { tile: 'Minority now viewed as traitorous collaborators' },
      { tile: 'Refugee from disputed territory' },
      { tile: 'Local dragooned into an army because of their ancestry' },
      { tile: 'Hapless businessman with holdings on the disputed land' }
    ],
    complications: [
      'The land is just an excuse for conquest',
      'The land is worthless but possession is a point of honor',
      'The land is ridiculously well-fortified because of old wars',
      "Neither side really wants the land they just don't want the other side to have it for strategic reasons"
    ],
    things: [
      'Evidence proving the land was abandoned',
      'Proof of an atrocity against a minority group',
      'Plans of a vital border fortification in the disputed area',
      'Lists of local collaborators with the enemy'
    ],
    places: [
      'A war-battered fortress of former ages',
      'A town built in the style of its former rulers',
      'A monument to the glorious liberation of the land',
      "A grand temple on sacred land once occupied by the old ruler's faith"
    ]
  },
  'Safe Haven': {
    text: 'The defending polity is a safe haven for something intolerable to the attackers. They may be acting as patrons of an exiled royal pretender, supporters of cross-border terrorists or raiders, or a stronghold of some bitterly-hated ethnicity or organization. The attackers are determined to force the destruction of the peril or the collapse of its patron nation.',
    enemies: [
      { tile: 'Noble threatened by exiled pretender' },
      { tile: 'Border governor scourged by guerrillas' },
      { tile: 'Genocide-obsessed tyrant' },
      { tile: 'Paranoid monarch seeing plotters over the border' }
    ],
    friends: [
      { tile: 'Natives forced to work with the guerrillas' },
      { tile: 'Refugees from “contained areas”' },
      { tile: 'Aid worker mistaken for a terrorist' },
      { tile: 'Citizen of a guerrilla-controlled border town' }
    ],
    complications: [
      'The troublesome group really is unaffiliated with the defenders and acting against their will',
      'The common people hate the troublemakers',
      "The troublemakers have critical blackmail or leverage on the defending nation's rulers",
      'The troublesome group secretly wanted to provoke this war for their own ends'
    ],
    things: [
      'Cache of hidden guerrilla supplies',
      'List of supporters',
      'Symbol of rule stolen by a pretender',
      'Medical supplies needed by wounded refugees or guerrillas'
    ],
    places: [
      'Hidden base of operations',
      'Village terrified of both soldiers and guerrillas',
      'Burnt-out home of “known collaborators”',
      'Mass grave of those on the wrong side'
    ]
  },
  Supremacism: {
    text: 'One or both sides are convinced that they are deserving of domination by natural right. Their purity of blood, genetic virtue, divine blessing, rational civilization, or impeccable aesthetic entitles them to glorious conquest. This may be the latest outbreak of an age-old antagonism, or it might be the product of a more recent revival of supremacist thought. On some worlds, the locals might tacitly agree that their attackers really are superior, and merely differ on the degree of license that permits.',
    enemies: [
      { tile: 'Self-ordained ubermensch monarch' },
      { tile: 'Genetically-augmented ruler' },
      { tile: 'Cynical peddler of empire' },
      { tile: 'Nation-building idealist' }
    ],
    friends: [
      { tile: 'Official with secret “bad blood”' },
      { tile: 'Refugee from destroyed community' },
      { tile: 'Local ruler forced to cooperate by threats to their people' },
      { tile: 'Secret resister of the ideology' }
    ],
    complications: [
      "Supremacist forces commit an atrocity even they can't openly admit",
      'Neighboring nations largely agree with one of the sides involved',
      'The attacked group has a deeply repugnant society',
      'The invaders really do have engineered or alien augmentation beyond human norms'
    ],
    things: [
      'Cultural relic that is inspirational to a side',
      'Evidence of an atrocity',
      'Plans for “controlling” the “inferior population”'
    ],
    places: [
      'Town with its population replaced by the invaders',
      'Concentration or re-education camp',
      'Mass rally for “civilization”',
      'Fortified outpost for controlling the locals'
    ]
  },
  'Territorial Conquest': {
    text: 'The land in question may or may not have any economic or cultural value, but the attacker wants it and the defender has it. A young empire might bridle at its narrow borders, or an older one might wish to lay claim on lands now occupied by "barbarians" or "failed states". Even random rocky flyspecks in the sea might be the cause of bloody violence in order to maintain national honor or defend against encroaching interests.',
    enemies: [
      { tile: 'Young monarch hungry for glory' },
      { tile: 'Oligarch planning a use for the land' },
      { tile: 'Border general who wants a war for promotion' },
      { tile: 'Diplomat who barters the land away without asking its current owner' }
    ],
    friends: [
      { tile: 'Hapless locals in the combat zone' },
      { tile: 'Mineral surveyor caught in the field' },
      { tile: 'Refugees driven out of "encroaching settlements"' },
      { tile: 'Deposed local ruler' }
    ],
    complications: [
      'The land grab is worrying the other nations in the area',
      'The locals are a dangerous military force in their own right',
      'The territory is valuable but only one side knows the truth about it',
      'The territory was worthless not long ago but has become valuable due to mineral strikes or new industry there'
    ],
    things: [
      'Secret mineral strike',
      "Treasures of the land's original occupants",
      'Battered survey pod proving original ownership',
      'Lethal device that could render much of the land uninhabitable'
    ],
    places: [
      'Newly-discovered ancient ruins',
      'Recently-built factory',
      'Wildcat military base built up suddenly',
      'Graveyard or other site of emotional importance to one of the sides'
    ]
  },
  'Trade War': {
    text: "At least one side of the struggle is not playing fairly at trade as far as the other is concerned, and the matter is to be resolved by war. The defender may be refusing to allow the attacker's merchants to trade in their markets, or may be applying punitive tariffs at the border, or may be choosing to conduct vital trade with a bitter enemy of the attacker. Most such wars only go on until the defender chooses to change their policy, and are most often conducted when the targets are too weak to put up serious resistance to such violent pressures.",
    enemies: [
      { tile: 'Scheming merchant-prince' },
      { tile: 'Grasping diplomat' },
      { tile: 'Protectionist union leader' }
    ],
    friends: [
      { tile: 'Suddenly-beggared merchant' },
      { tile: 'Collapsed local manufacturer' },
      { tile: 'Worker thrown out of work' },
      { tile: 'Refugee from the industrial zones under attack' }
    ],
    complications: [
      'The invaders are angry at too-cheap goods being sold to other nations',
      'The invaders want to sell something reprehensible to the defenders',
      "The invaders really just want to seize the defender's industry for slave labor use",
      'The invaders want revenge for some sale that went very wrong'
    ],
    things: [
      'The cheaper or better goods that started the fight',
      'Cache of sinister contraband goods',
      'List of smugglers conducting illicit trade',
      'Secret tech that allows vastly superior manufactures'
    ],
    places: [
      'Massive cargo ship now stuck in port',
      'Factory with a few underemployed workers',
      'Store filled with cheap goods',
      'Slave-labor work camp'
    ]
  }
}
