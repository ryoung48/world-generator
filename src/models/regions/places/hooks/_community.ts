import { CommunityHooks } from './types'

export const communities: CommunityHooks = {
  'Ancient Infrastructure': {
    text: "The community still has access to some sort of functioning ancient infrastructure, whether it's an array of wall-mounted arcane energy projectors, hydropnic gardens, community-wide climate control, ancient constructs that still labor in fields and forges, or some other inherited luxury. This infrastructure may be the result of a still-functional enchantment, or it could be the product of some venerable occult engine that's still operational, or it may be the fruit of the labors of some specially-designed organism.",
    enemies: [
      { title: 'Abusive ruler overusing the infrastructure' },
      { title: 'Foreign agent seeking to cause havoc', foreign: true },
      { title: 'Reckless sorcerer seeking to steal its power' }
    ],
    friends: [
      { title: 'Harried chief of the maintainers' },
      { title: 'Fascinated foreign scholar', foreign: true },
      { title: 'Merchant reliant on its use' }
    ],
    complications: [
      "The infrastructure's cruelly-costly maintenance is coming up",
      'The infrastructure is starting to fray',
      'The infrastructure was actually meant for a much more sinister purpose'
    ],
    things: [
      'Irreplaceable infrastructure component',
      'Spare parts worth vast sums on the market',
      'Secret artifact that can control the infrastructure'
    ],
    places: [
      'Dangerously energetic working zone',
      'Secret hideout inside the infrastructure',
      'Sanctified and holy control center'
    ]
  },
  'Bad Neighbors': {
    text: "Disputes over {water rights|livestock thefts|land boundaries|the desecration of a sacred site} have resulted in conflict with a neighboring community. This usually isn't part of a larger war, but is instead a personal animosity between them. It may be the community has suffered at their enemy's hands, or they may have been the ones applying the suffering. Constant low-level skirmishes and troublemaking go on between the two.",
    enemies: [
      { title: 'Foreign lord profiting by the quarrel', foreign: true },
      { title: 'Bitter zealot who demands violent action' },
      { title: 'Real culprit seeking to hide their offense' }
    ],
    friends: [
      { title: 'Despairing peacemaker of a shared faith' },
      { title: 'Local with family from the rival' },
      { title: 'Frustrated but helpless ruler' }
    ],
    complications: [
      'One side seems at fault but is actually less blameworthy',
      'The rulers of both use the quarrel to distract their populace',
      'It was a minor dispute that is spiraling out of control'
    ],
    things: [
      "Proof of the culprit's guilt",
      'Weapons cache meant to start real bloodshed',
      'Treasure that would erase the cause of the dispute'
    ],
    places: [
      "Dangerous no-man's-land between the communities",
      'Burnt home of a sympathizer',
      'Religious festival turned into a semi-riot'
    ],
    quests: [
      {
        type: 'investigation',
        alignment: 'good',
        patron: 'lawkeeper',
        text: 'investigate the desecration of a sacred site by a rival community.',
        setting:
          'the sacred site lies in a contested borderland, the stench of burnt offerings hangs in the air, and makeshift shrines stand defaced by crude graffiti.',
        introductions: [
          'a haggard priest, standing before the defiled altar, pleads for someone to cleanse the sacred ground.',
          'in the tavern, a whisper circulates of a sacred site, now tainted, that cries out for justice.',
          'a town crier, voice cracking with emotion, announces a bounty for those brave enough to face a desecrated sanctuary.',
          'upon entering the village, the sight of a procession mourning their desecrated holy ground beckons the brave.',
          'at the market, amidst the din of trade, a solemn vow is overheard: to avenge the defiled sacred site.',
          'an ancient tome in the local library reveals the significance of a now desecrated site, summoning the curious.'
        ],
        complications: [
          'a sudden storm erases tracks leading to the culprits.',
          'local superstitions prevent locals from speaking openly about the site.',
          'an unexpected assembly of hostile wildlife guards the site.',
          'the desecration triggers a curse, afflicting those who investigate too closely.',
          'a rival investigator seeks to solve the mystery first, for their own gain.',
          'the culprits left behind magical traps to ward off snoopers.'
        ],
        clues: [
          "there is a chance of finding footprints leading away from the sacred site, hinting at the perpetrators' direction.",
          'there is a chance of uncovering a discarded symbol, unique to the rival community, near the desecrated area.',
          'there is a chance of hearing whispered rumors in the local tavern about those who bragged of the deed.',
          'there is a chance of discovering a hidden cache of ceremonial items used in the desecration.',
          'there is a chance of encountering a remorseful participant, willing to confess under the right conditions.',
          'there is a chance of intercepting communications between the culprits, planning their next move.'
        ]
      },
      {
        type: 'sabotage',
        alignment: 'evil',
        patron: 'warlord',
        text: "sabotage the neighboring community's water supply to force their surrender.",
        setting:
          "the narrow mountain pass leading to the rival's water source is flanked by jagged cliffs, ideal for an ambush or sabotage.",
        introductions: [
          'in the shadowy corner of the inn, a figure cloaked in mystery offers gold for a deed of darkness.',
          "a message, sealed with the warlord's sigil, finds its way to you, proposing a covert mission of sabotage.",
          'among the din of the smithy, a veiled threat is uttered - a call to weaken the rival by thirst.',
          "a cloaked rider intercepts you on the road, bearing an offer to undermine an enemy's lifeline.",
          'by the flickering campfire, a mercenary recounts a tale of a job that could change the tide of a silent war.',
          'at the docks, amidst the clamor of trade, a coded missive is discovered, detailing a plan to bring a community to its knees.'
        ],
        complications: [
          'the water source is protected by ancient guardians awakened by the intrusion.',
          'an unexpected alliance between the communities complicates the mission.',
          'the path to the water source is riddled with natural hazards.',
          'local fauna, driven mad by thirst, aggressively defend the water source.',
          'the sabotage attempt inadvertently poisons the water, escalating the conflict.',
          'a moral dilemma arises as the reality of depriving innocents of water weighs heavily.'
        ],
        clues: [
          'there is a chance of finding tools and supplies hidden near the water source, left by previous saboteurs.',
          "there is a chance of overhearing plans for the sabotage among the warlord's men in a secure location.",
          'there is a chance of spotting unusual activity at night, as the saboteurs prepare their next move.',
          'there is a chance of discovering an old map showing a forgotten path to the water supply.',
          'there is a chance of bribing a disillusioned soldier for information on the sabotage plan.',
          "there is a chance of decoding a message sent to the warlord detailing the sabotage's progress."
        ]
      },
      {
        type: 'bounty',
        alignment: 'good',
        patron: 'elder',
        text: 'capture the renegade zealot inciting violence against the neighboring community.',
        setting:
          "the zealot's followers gather in a secluded glade, chanting ominous verses as ceremonial fires burn.",
        introductions: [
          "a tattered notice pinned to the town's board speaks of a dangerous zealot, and the reward for their capture.",
          'in the quiet of the church, a plea is made for the capture of a firebrand preacher turned violent zealot.',
          'a solemn elder recounts the deeds of a renegade zealot, beseeching aid in halting their fury.',
          "under the moonlight, a secret meeting is held, discussing the bounty on a zealot's head.",
          'at dawn, a scout brings news of a zealot stirring unrest, and a call to action is sounded.',
          "by the well, villagers speak in hushed tones of a zealot's capture, and the fortune it could bring."
        ],
        complications: [
          'the zealot has unexpected magical capabilities.',
          'a decoy leads the party into a well-laid ambush.',
          'sympathizers within the community work to thwart the capture.',
          "the zealot's hideout is rigged with traps and puzzles.",
          'capturing the zealot incites his followers to retaliate.',
          "a previously unknown pact ties the zealot's fate to that of an innocent."
        ],
        clues: [
          "there is a chance of finding a trail of propaganda pamphlets leading back to the zealot's hideout.",
          "there is a chance of coaxing information from scared locals who have seen the zealot's followers.",
          'there is a chance of intercepting a message meant for the zealot, revealing their next target.',
          'there is a chance of uncovering a secret meeting place where the zealot recruits new followers.',
          "there is a chance of persuading a disgruntled follower to betray the zealot's location.",
          'there is a chance of discovering a symbolic item dropped by the zealot, pointing to their faith or belief.'
        ]
      },
      {
        type: 'theft',
        alignment: 'evil',
        patron: 'crime lord',
        text: 'steal a priceless relic from the rival community to demoralize them.',
        setting: 'the relic lies in a fortified shrine, guarded night and day by devout warriors.',
        introductions: [
          'a shady figure at the tavern speaks of a relic that could sway the balance of power, should it vanish.',
          "a letter slid under your door in the dead of night offers a king's ransom for the theft of an ancient artifact.",
          'in the bustling market, a coded message is passed, hinting at a heist that could change fortunes.',
          'a cloaked informant reveals the location of a priceless relic, and the desperate need for its disappearance.',
          'an old rogue, over a game of cards, tells tales of a treasure ripe for the taking, guarded by the rival community.',
          "a desperate plea from a figure shrouded in shadows seeks aid in diminishing an enemy's morale through theft."
        ],
        complications: [
          'the shrine housing the relic is booby-trapped.',
          'a religious festival complicates the heist with increased security.',
          'the relic is cursed, bringing misfortune to those who handle it.',
          'a rival group of thieves has the same target, resulting in conflict.',
          'the community rallies to protect their relic, leading to a standoff.',
          "the relic's removal awakens a dormant protective spirit."
        ],
        clues: [
          "there is a chance of identifying a weak point in the shrine's defenses through careful observation.",
          "there is a chance of acquiring a copy of the shrine's guard schedule from a corrupt guard.",
          'there is a chance of finding a disgraced former priest who knows secret passages into the shrine.',
          'there is a chance of unearthing ancient blueprints that reveal a forgotten entrance.',
          "there is a chance of seducing a key holder to gain access to the relic's chamber.",
          "there is a chance of intercepting a delivery of magical wards intended for the shrine's protection."
        ]
      },
      {
        type: 'escort',
        alignment: 'good',
        patron: 'diplomat',
        text: 'escort an envoy to the neighboring community to negotiate a lasting peace.',
        setting:
          "the road winds through a haunted moor, abandoned homesteads crumble as the fog's chill embrace lingers.",
        introductions: [
          'at the break of dawn, a diplomat seeks protection for a journey fraught with peril, promising gold and glory.',
          'in the hallowed halls of the council, a decree is issued: to escort an envoy through treacherous lands.',
          'a letter, bearing the seal of peace, requests aid in safeguarding a delegate on a mission of reconciliation.',
          'a weary traveler, bearing a message of peace, implores for an escort through lands haunted by conflict.',
          'a somber meeting under the stars convenes, plotting a course for peace and the need for a steadfast guardian.',
          "in the quiet of the library, a scroll reveals the need for a protector to guide peace's fragile hope."
        ],
        complications: [
          'bandits see the diplomatic party as a lucrative target.',
          'a bridge vital to the journey has been mysteriously destroyed.',
          "a faction within the envoy's party secretly opposes the mission.",
          'the envoy is poisoned, requiring a detour to find an antidote.',
          'hostile weather conditions threaten to halt the journey.',
          'local superstition casts the envoy in a dubious light, hindering progress.'
        ],
        clues: [
          'there is a chance of learning about bandit ambushes on the route, allowing for preparation or avoidance.',
          'there is a chance of discovering an old hermit who knows the safest paths through the moor.',
          "there is a chance of acquiring charms from a local witch that ward off the moor's spirits.",
          'there is a chance of negotiating passage with the leader of a bandit group in exchange for a favor.',
          'there is a chance of finding an ancient relic that calms the restless spirits of the moor.',
          'there is a chance of uncovering a buried cache of supplies left by a previous envoy.'
        ]
      },
      {
        type: 'monster',
        alignment: 'evil',
        patron: 'cultist',
        text: 'unleash a terrible beast upon the neighboring community as an act of vengeance.',
        setting:
          "whispers of a foul ritual echo from the cultist's lair, a dank cave reeking of sacrifice.",
        introductions: [
          'in the depths of the night, a cultist whispers of a dark ritual to summon a beast for revenge.',
          'a forbidden scroll, found in a hidden chamber, details the unleashing of a horror upon an unsuspecting community.',
          'a shadowy figure proposes a pact, offering the means to wreak havoc upon enemies with a monstrous vengeance.',
          'an ancient grimoire, acquired at great cost, hints at the power to command beasts against those who wronged you.',
          'a chilling howl echoes through the valley, a prelude to the terror that could be unleashed for the right price.',
          'at a secret gathering, a plan is forged to summon a creature of nightmares as retribution against a rival.'
        ],
        complications: [
          'the beast proves uncontrollable, turning on its releasers.',
          'an old hermit claims the beast is the last of its kind, pleading for its protection.',
          "the cult's ritual is interrupted by a rival faction seeking to harness the beast's power.",
          'unleashing the beast requires a sacrifice that the party must confront morally.',
          'the beast carries a plague, threatening both communities indiscriminately.',
          "legend holds the beast's death could bring about a greater evil."
        ],
        clues: [
          'there is a chance of discovering the location of a hidden altar in the wilderness, marked by ancient runes that resonate with dark power.',
          'there is a chance of intercepting a shipment of exotic components needed for the summoning ritual.',
          'there is a chance of bribing a disillusioned guard to gain access to a prisoner whose bloodline is key to activating the ancient summoning circle.',
          'there is a chance of convincing a hesitant cult member to reveal the final component needed for the summoning ritual.',
          'there is a chance of intercepting a hunter who unwittingly possesses a rare artifact needed to complete the ritual.',
          'there is a chance of extracting information from a local sage who knows the ancient lore surrounding the beast.'
        ]
      },
      {
        type: 'retrieval',
        alignment: 'good',
        patron: 'priest',
        text: 'retrieve a sacred relic stolen by the rival community to restore faith.',
        setting:
          "the relic's hiding place is a crumbling ruin guarded by cunning traps and feral beasts.",
        introductions: [
          'a forlorn priest recounts the theft of a sacred relic, offering blessings for its return.',
          'in the fading light of the temple, a call to arms is made to reclaim a symbol of faith from thieving hands.',
          'a whispered legend speaks of a stolen relic, and the divine favor awaiting the one who returns it.',
          "a solemn vow is taken at the altar to restore a community's spirit by retrieving what was unjustly taken.",
          'an ancient prophecy, once scoffed at, now serves as a beacon for those seeking to bring back a lost relic.',
          'a desperate plea from a cloaked figure in the night seeks aid in recovering a beacon of hope and faith.'
        ],
        complications: [
          'the relic has been split into pieces, each guarded by a different faction.',
          "a schism within the rival community complicates negotiations for the relic's return.",
          "the relic's guardian beast remains loyal to its original masters, attacking the party.",
          'the theft was orchestrated by a third party, misleading both communities.',
          'recovering the relic reveals it to be a fake, leading to a deeper mystery.',
          "the relic's power wanes, requiring a ritual to restore it amidst hostile territory."
        ],
        clues: [
          'there is a chance of finding tracks leading from the ruin back to the rival community.',
          'there is a chance of overhearing a trader mention the unusual item seen in the rival community.',
          "there is a chance of decrypting a stolen letter that discusses the relic's current location.",
          'there is a chance of earning the trust of a sympathetic member of the rival community.',
          "there is a chance of discovering a local legend that hints at the relic's hiding place.",
          'there is a chance of spotting a distinctive symbol used by the thieves, marking their territory.'
        ]
      },
      {
        type: 'defense',
        alignment: 'evil',
        patron: 'mercenary captain',
        text: "defend a strategic village from the rival community's imminent attack.",
        setting:
          'the village stands on a windswept promontory, its palisades battered by the ceaseless mountain gales.',
        introductions: [
          'a grizzled veteran, overlooking the village walls, seeks aid in fortifying against an inevitable assault.',
          'in the council room, maps are spread wide - a call to defend the village from encroaching threats.',
          "a carrier pigeon arrives with a message: the enemy advances, and the village's fate hangs by a thread.",
          'by the fireside, tales of an upcoming siege stir the hearts of those brave enough to stand in defense.',
          'a scout returns breathless with news of an impending attack, rallying the village to prepare for battle.',
          "amidst the hustle of preparation, a leader's voice rises, calling for defenders against the approaching storm."
        ],
        complications: [
          'a spy in the village leaks the defense plans to the enemy.',
          "the village's strategic location includes an ancient, volatile power source.",
          'a moral quandary arises when enemy defectors seek asylum within the village.',
          'the defending forces are plagued by disease, weakening their numbers.',
          'previous battles have awakened restless spirits that now haunt the village.',
          'natural disasters cut off potential reinforcements and supplies.'
        ],
        clues: [
          "there is a chance of finding plans for the attack in a captured scout's belongings.",
          'there is a chance of overhearing soldiers in a tavern boasting of the upcoming assault.',
          "there is a chance of discovering sabotage attempts on the village's defenses ahead of the attack.",
          'there is a chance of persuading a deserter to reveal the timing and strategy of the attack.',
          'there is a chance of spotting signal fires on the horizon, indicating the approaching force.',
          "there is a chance of intercepting a coded message detailing the rival community's battle plans."
        ]
      }
    ],
    challenges: [
      {
        skill: 'persuasion',
        text: 'negotiate a temporary truce between the warring parties to allow for peaceful negotiations',
        setting:
          'the village elders gather in a dimly lit tavern, the air thick with the scent of stale ale and apprehension'
      },
      {
        skill: 'investigation',
        text: 'uncover the true culprit behind the desecration of the sacred site, examining clues and questioning witnesses',
        setting:
          'the defiled shrine reeks of burnt offerings, the once-sacred ground now trampled and despoiled'
      },
      {
        skill: 'athletics',
        text: 'participate in a traditional test of strength and endurance to earn the respect of the rival community',
        setting:
          'a festive gathering in a sun-drenched field, the sound of stomping feet and cheering spectators filling the air'
      },
      {
        skill: 'survival',
        text: "guide a group of refugees through the dangerous no-man's-land to safety, avoiding hostile patrols and natural hazards",
        setting:
          'the desolate wasteland between the feuding villages, the only sound the whistle of the wind through barren trees'
      },
      {
        skill: 'intimidation',
        text: 'convince a band of zealots to stand down and abandon their plans for violent retribution',
        setting:
          "a clandestine meeting in a dank cave, the flickering torchlight casting ominous shadows on the fanatics' faces"
      },
      {
        skill: 'deception',
        text: 'infiltrate the rival community and gather intelligence on their plans and defenses',
        setting:
          'the bustling streets of the enemy village, the aroma of spiced food and woodsmoke hanging in the air'
      },
      {
        skill: 'stealth',
        text: "sneak into the rival lord's manor and steal evidence of their involvement in the conflict",
        setting:
          'the imposing manor house, its grounds patrolled by watchful guards, the only sound the occasional howl of a distant dog'
      },
      {
        skill: 'insight',
        text: 'discern the true motivations of the frustrated ruler, determining if they are sincere in their desire for peace',
        setting:
          'the opulent throne room, the scent of burning incense and the weight of centuries of tradition hanging heavy in the air'
      },
      {
        skill: 'perception',
        text: 'locate the hidden weapons cache before it can be used to escalate the conflict into open war',
        setting:
          'a secluded glade deep in the forest, the only sounds the rustling of leaves and the distant calls of unseen creatures'
      },
      {
        skill: 'knowledge',
        text: 'research ancient texts and lore to uncover the true significance of the desecrated sacred site',
        setting:
          'a dusty library, the air thick with the musty scent of aged parchment and the weight of forgotten knowledge'
      },
      {
        skill: 'sleight of hand',
        text: "secretly plant false evidence implicating the real culprit behind the conflict's instigation",
        setting:
          'a crowded festival, the air alive with the scent of roasting meats and the raucous laughter of revelers'
      },
      {
        skill: 'acrobatics',
        text: 'pursue the fleeing culprit across the rooftops of the village, leaping between buildings and avoiding deadly falls',
        setting:
          "the chaotic maze of the village's cramped streets, the air filled with the cries of startled townsfolk and the clatter of overturned stalls"
      }
    ],
    hostiles: [
      {
        type: 'minor',
        text: 'a band of rogue mercenaries ambushes you, looking to steal your supplies.',
        setting:
          'the crumbling ruins of an ancient watchtower, the stench of decaying corpses hanging in the air as the wind howls through the cracked stone walls.'
      },
      {
        type: 'minor',
        text: 'a rival caravan guard attacks to claim a disputed water source for their employer.',
        setting:
          'a dried-up riverbed, the parched earth cracked and barren, the only sound the distant cawing of carrion birds circling overhead.'
      },
      {
        type: 'major',
        text: 'you must fight your way through a fortified enemy camp to retrieve a sacred relic.',
        setting:
          'a makeshift palisade surrounded by crude tents and smoldering fires, the air thick with the scent of sweat, smoke, and fear.'
      },
      {
        type: 'major',
        text: "warring factions clash, and you're caught in the middle of their long-standing feud.",
        setting:
          'the narrow, winding streets of an ancient city, the sound of clashing steel echoing off the crumbling stone walls as civilians cower in terror.'
      },
      {
        type: 'boss',
        text: 'a ruthless mercenary captain leads a well-armed band to settle the dispute by force.',
        setting:
          'the charred remains of a once-prosperous village, the acrid stench of burnt thatch and flesh hanging in the air as thick, black smoke billows from the ruins.'
      },
      {
        type: 'minor',
        text: 'bandits raid your camp, taking advantage of the chaos caused by the feud.',
        setting:
          'your camp at night, the crackling of the fire and the hooting of distant owls suddenly drowned out by the war cries of the attackers.'
      },
      {
        type: 'major',
        text: 'you must fight your way through a guerrilla force to reach a sacred site.',
        setting:
          'a dense, overgrown forest, the rustling of leaves and the snapping of twigs betraying the presence of unseen foes as you make your way along the ancient trail.'
      },
      {
        type: 'boss',
        text: 'a power-hungry warlord seeks to conquer both sides and bring the feud under their control.',
        setting:
          "the warlord's fortified stronghold, a grim and imposing structure carved into the very heart of a towering mountain, its shadowscast long across the barren plains below."
      },
      {
        type: 'minor',
        text: 'scouting parties from opposing sides clash, mistaking you for the enemy.',
        setting:
          'a narrow mountain pass, the sheer cliffs on either side echoing with the clash of steel and the cries of the combatants as loose rocks tumble down the treacherous slopes.'
      },
      {
        type: 'major',
        text: 'religious zealots attack, believing you to be blasphemers desecrating their sacred lands.',
        setting:
          'an ancient temple complex overgrown with twisted vines and gnarled trees, the crumbling stone walls etched with faded glyphs and symbols of a long-forgotten faith.'
      },
      {
        type: 'boss',
        text: "the feud's instigator reveals themselves, unleashing a terrifying force to silence the truth.",
        setting:
          'the ruined remains of a once-grand palace, its marble halls and columns now shattered and overgrown, the stench of decay and corruption thick in the stagnant air.'
      },
      {
        type: 'major',
        text: "marauders take advantage of the conflict to plunder the warring factions' lands.",
        setting:
          'a smoldering village caught in the crossfire, its buildings reduced to little more than piles of charred timber as thick, black smoke hangs heavy in the air.'
      }
    ],
    constraints: { warfare: true }
  },
  'Blood Feud': {
    text: 'Two or more groups of citizens within the community hate each other. Their neighbors or the local law have kept things from too-overt violence, but members of the groups will constantly interfere with their rivals and cause whatever misery they can get away with. This hate may spring from recent events, or it may be an inherited spite from old wrongs',
    enemies: [
      { title: 'A failure seeking meaning through their noble cause' },
      { title: 'Culture warrior seeking to extirpate their ways', foreign: true },
      { title: 'Cynical demagogue whipping up fury for his profit' },
      { title: 'Enraged victim of the crime of a rival group member' },
      { title: 'Labor chief seeking to drive them out of their jobs' },
      { title: 'Merchant seeking to drive them off rich resources' },
      { title: 'Ruler scapegoating the others for their own failure' },
      { title: 'Traitorous other-group member offering false proof', foreign: true }
    ],
    friends: [
      { title: 'Grizzled guard captain trying to beat back the riots' },
      { title: 'Idealistic yet hopelessly ineffectual unity campaigner' },
      { title: 'Inter-group couple trying to dodge their own kindred' },
      { title: 'Merchant trying to hold together an inter-group deal' },
      { title: 'Outside official desperately trying to hold it together' },
      { title: 'Religious leader trying to calm their furious flock' },
      { title: 'Scholar seeking to find the true roots of the conflict' },
      { title: 'Survivor of a brutal pogrom by their rivals', foreign: true }
    ],
    complications: [
      'A rival power is using the strife to weaken the land',
      'Both sides are deeply unsympathetic to observers',
      'One side is taking things much more seriously',
      'One side seems totally justified in their anger',
      'The local rulers greatly favor one side',
      'The strife is cyclical and most expect it to end soon',
      'The strife is extremely profitable to a third party',
      'The strife is rapidly building to open warfare'
    ],
    things: [
      'Arms cache meant for use in the conflict',
      'Infant kidnapped from a leader of the rival group',
      'Magic item one group uses for defense of its people',
      'Old document showing the truth of a divisive event',
      'Proof of the real culprit of an outrageous crime',
      'Remains of victims "disappeared" by their rivals',
      "Sacred relic of one group's revered past",
      'Wealth stolen from a rich member of a rival group'
    ],
    places: [
      "Monument to one group's past glorious victory",
      'Site of a brutal crime committed by one group',
      'Hidden wilderness camp of zealous extremists',
      'Ethnic meeting hall for festivals and planning',
      'Burnt-out ethnic street after a neighborhood riot',
      'Guarded ghetto quarter of a worried minority',
      'Audience hall of mutually-acrimonious petitioners',
      'Torchlight parade route of violent protesters'
    ],
    quests: [
      {
        type: 'bounty',
        alignment: 'evil',
        patron: 'vengeful merchant',
        text: 'kidnap the daughter of a rival merchant from the other ethnic group.',
        setting: 'dimly lit alleys reeking of refuse, filled with the cries of drunken brawlers.',
        clues: [
          'there is a chance of spotting the target at the local market during the weekly gatherings.',
          'there is a chance of intercepting a letter from the daughter to her secret lover, arranging a clandestine meeting.',
          "there is a chance of bribing one of the household servants for information on the daughter's daily routine.",
          "there is a chance of discovering a hidden passage leading out of the merchant's estate, used for discreet exits.",
          'there is a chance of overhearing guards discussing the best times they lower their vigilance during their shifts.',
          'there is a chance of finding a disgruntled former employee of the merchant, willing to divulge secrets for the right price.'
        ],
        complications: [
          'the daughter has a secret lover who is highly skilled in combat and vows to protect her at all costs.',
          'local vigilantes have been alerted to a potential kidnapping and are patrolling the streets.',
          'the rival merchant has recently hired a group of mercenaries for added security.',
          'a street festival complicates movement through the alleys, with crowds and unexpected closures.',
          'the daughter is not where she is supposed to be, having snuck out to attend a clandestine meeting.',
          'unexpectedly, the daughter sympathizes with your cause, offering information in exchange for her safety.'
        ],
        introductions: [
          'a cloaked figure slips you a note in a crowded tavern, marking the beginning of a dangerous game.',
          'under the cover of night, you meet with the vengeful merchant in a secluded alley, away from prying eyes.',
          'a seemingly accidental encounter at the market leads to a whispered conversation and a heavy purse of gold.',
          'an unsigned letter finds its way to you, offering a substantial reward for a task of dubious morality.',
          "a visit to the merchant's lavish estate under the guise of a business deal veils the true intent of your visit.",
          'while eavesdropping on local gossip at the inn, you catch wind of a lucrative opportunity wrapped in vengeance.'
        ]
      },
      {
        type: 'sabotage',
        alignment: 'good',
        patron: 'peacekeeper captain',
        text: 'infiltrate the extremist camp and destroy their weapons cache.',
        setting:
          'a dense, overgrown forest cloaked in eerie silence, broken only by the distant cawing of crows.',
        clues: [
          'there is a chance of tracking a supply wagon back to the camp under the guise of a forest hunter.',
          'there is a chance of finding a map detailing patrol routes around the camp, left carelessly in a tavern.',
          'there is a chance of coaxing information from a disillusioned extremist who doubts the cause.',
          "there is a chance of stumbling upon an abandoned lookout post with views of the camp's layout.",
          'there is a chance of uncovering hidden footpaths used by the extremists to move unobserved through the forest.',
          "there is a chance of intercepting communications between the camp and a mysterious benefactor, hinting at the cache's location."
        ],
        complications: [
          'the weapons cache is booby-trapped, requiring careful navigation to avoid setting off explosions.',
          'a rival group also aims to destroy the cache, and they mistake your team for enemies.',
          'extremist sympathizers in the local town attempt to sabotage your efforts to reach the camp.',
          'a sudden storm makes the forest nearly impassable, obscuring paths and erasing tracks.',
          'the extremists are holding hostages near the cache, complicating a straightforward demolition.',
          "an unexpected alliance between two rival factions increases the camp's defenses."
        ],
        introductions: [
          'a tense meeting with the peacekeeper captain in a fortified barracks sets the stage for a covert operation.',
          'you stumble upon a wounded scout in the forest who imparts crucial information with his dying breath.',
          'a coded message intercepted from the extremists piques your interest and sets you on a collision course.',
          'while investigating a deserted village, you find clues pointing towards the hidden extremist camp.',
          'a local herbalist, troubled by the violence, reluctantly points you towards the location of the camp.',
          'a firelit gathering of worried villagers becomes the unexpected starting point of your sabotage mission.'
        ]
      },
      {
        type: 'retrieval',
        alignment: 'evil',
        patron: 'xenophobic elder',
        text: "recover the desecrated relic from the heretics' sanctuary.",
        setting:
          'ancient, crumbling temples adorned with defaced statues, echoing with the chants of blasphemers.',
        clues: [
          'there is a chance of obtaining a pilgrim disguise needed to gain entry into the sanctuary.',
          "there is a chance of discovering ancient sewer systems that provide undetected access to the temple's undercroft.",
          'there is a chance of bribing a local thief who claims to know a secret entrance into the sanctuary.',
          "there is a chance of deciphering old texts in the town library that describe the relic's original resting place.",
          'there is a chance of winning the trust of a sanctuary outcast, banished for questioning the heresy.',
          "there is a chance of finding ritual remnants in the woods that could lead back to the heretics' hidden sanctuary."
        ],
        complications: [
          'the sanctuary is protected by ancient curses that target unwelcome intruders.',
          "a fanatical sect within the heretics sees the relic's recovery as an apocalyptic sign and fights desperately.",
          'the relic has been moved to a new location within a maze-like series of underground tunnels.',
          'local wildlife, twisted by dark energies from the sanctuary, attacks anyone approaching the area.',
          'the heretics are conducting a ritual that must be stopped before the relic can be safely recovered.',
          'an unexpected betrayal from within your own ranks puts the mission at risk.'
        ],
        introductions: [
          "a chance encounter with a frantic historian in the archives reveals the gravity of the relic's theft.",
          'a mysterious figure approaches you in the dead of night, bearing a tale of desecration and a plea for help.',
          "whispers in the temple corridors speak of a sacred item's disappearance, drawing you into the fold.",
          'an ancient scroll, brittle with age, lands in your possession, revealing the location of the stolen relic.',
          'you witness a clandestine exchange between heretics, sparking a quest to reclaim what was taken.',
          'the xenophobic elder entrusts you with the mission after a solemn ceremony, underscoring its sacred importance.'
        ]
      },
      {
        type: 'escort',
        alignment: 'good',
        patron: 'desperate parent',
        text: 'safely escort a mixed family through the riotous districts.',
        setting:
          'smoke-filled streets littered with debris, punctuated by the distant roar of an enraged mob.',
        clues: [
          'there is a chance of securing safe passage by negotiating with a gang that controls the sewers beneath the city.',
          'there is a chance of obtaining disguises that will help the family blend in with the local populace.',
          "there is a chance of arranging a distraction at the city gates to draw guards away from the family's route.",
          'there is a chance of bribing a city official for a permit that grants the family safe conduct.',
          'there is a chance of using old trader routes that bypass the most dangerous districts.',
          'there is a chance of enlisting the help of a sympathetic guard captain who opposes the violence.'
        ],
        complications: [
          'a local gang has been paid off to specifically target the family during their escape.',
          'an outbreak of a contagious disease in one district requires a dangerous detour.',
          'the family harbors a secret that, if revealed, could turn the public sentiment against them.',
          'one of the family members is gravely ill, requiring frequent and risky stops.',
          'a member of the family decides to flee during the journey, fearing the repercussions of their escape.',
          'the riotous districts are more chaotic than anticipated, with fires and looters blocking key routes.'
        ],
        introductions: [
          "a tearful plea from a desperate parent at the city's edge compels you to act as a guardian.",
          'amidst the chaos of the riotous districts, a chance meeting with a family in hiding seals your involvement.',
          'a cryptic note, slid under your door, reveals the time and place to meet those who desperately seek passage.',
          'the echoes of a distant commotion lead you to a family cornered by danger, begging for your protection.',
          'in the calm of a besieged temple, a family seeks your aid, offering all they have for a glimmer of hope.',
          "a whispered rumor of a family's plight reaches you through the underground network of sympathizers."
        ]
      },
      {
        type: 'investigation',
        alignment: 'evil',
        patron: 'cunning demagogue',
        text: 'uncover the truth behind the gruesome murder pinned on our followers.',
        setting:
          'a grisly crime scene, the air thick with the cloying scent of spilled blood and fear.',
        clues: [
          'there is a chance of examining the murder scene for overlooked evidence that contradicts the official story.',
          'there is a chance of questioning local urchins who witnessed suspicious activity on the night of the murder.',
          'there is a chance of tracking down a known rival who had motive to frame the followers.',
          'there is a chance of finding a reclusive alchemist who can identify the poison used in the murder.',
          'there is a chance of uncovering a blackmail scheme connected to the victim, offering an alternative motive.',
          'there is a chance of intercepting a courier carrying messages between the real murderer and their accomplice.'
        ],
        complications: [
          'key witnesses are being systematically intimidated or disappearing under mysterious circumstances.',
          'the local authorities are corrupt and obstruct investigations that could lead to the truth.',
          'a critical piece of evidence has been stolen from the crime scene, leading to a race against time.',
          'rumors of a supernatural element to the murder complicate gathering reliable information.',
          "the victim's family seeks vengeance and is not interested in the truth, only retribution.",
          'a sudden plague outbreak quarantines the area, hindering investigation efforts.'
        ],
        introductions: [
          'a somber gathering of accused followers beseeches you to clear their name, offering scant clues to the real culprit.',
          'a bloodstained letter, left at your doorstep, thrusts you into the heart of a conspiracy and a quest for truth.',
          'during a tense confrontation with the local guard, a slip of the tongue suggests all is not as it seems.',
          'a visit to the crime scene reveals anomalies in the official story, compelling you to dig deeper.',
          'an anonymous tip leads you to a hidden alley where the first clue to unraveling the murder awaits.',
          'the cunning demagogue, through veiled words and a heavy purse, sets you on a path to the truth.'
        ]
      },
      {
        type: 'monster',
        alignment: 'good',
        patron: 'desperate scribe',
        text: 'slay the abomination summoned by a crazed cultist seeking revenge.',
        setting:
          'flickering torchlight casting ominous shadows across ancient, defiled ruins overrun by twisted horrors.',
        clues: [
          "there is a chance of finding the cultist's diary, detailing the ritual and the abomination's weaknesses.",
          'there is a chance of consulting with a hermit mage who specializes in ancient forbidden lore.',
          "there is a chance of gathering rare herbs needed to concoct a potion that reveals the creature's true form.",
          "there is a chance of trapping a lesser demon who can be coerced into revealing the abomination's lair.",
          'there is a chance of deciphering cryptic inscriptions found near the ruins that hint at how to banish the creature.',
          "there is a chance of earning the trust of a local witch who knows the area's ancient secrets."
        ],
        complications: [
          'the abomination can only be slain with a weapon forged from a rare material found in dangerous lands.',
          'the cultist has anticipated your arrival and set traps throughout the ruins.',
          'local superstitions and fear of the ruins turn the nearby villagers against you.',
          'the cultist offers a tempting deal in exchange for allowing the abomination to live.',
          'the abomination is not the only creature lurking in the ancient ruins; others have been drawn to its power.',
          'the ruins are crumbling, creating a hazardous environment that could collapse at any moment.'
        ],
        introductions: [
          'a desperate scribe recounts tales of horror from ancient ruins, imploring you to confront the abomination.',
          'the ground trembles beneath your feet, leading you to the lair of a creature born of vengeance and dark magic.',
          "in the dead of night, a vision of unspeakable terror guides you to the source of the land's newfound dread.",
          'a series of brutal attacks leaves a trail of blood and fear that only you can follow to its source.',
          'whispers of a dark ritual gone awry reach you through the grapevine, pointing you towards ancient ruins.',
          "an old map, marked with symbols of danger, falls into your hands, charting a course to the cultist's sanctuary."
        ]
      },
      {
        type: 'theft',
        alignment: 'evil',
        patron: 'embittered outcast',
        text: 'steal the damning evidence that could exonerate our sworn enemies.',
        setting:
          'a fortified archive overflowing with dusty tomes and parchments, guarded by armed scholars.',
        clues: [
          "there is a chance of discovering a disgraced scribe who knows the archive's security routines.",
          "there is a chance of finding an overlooked servant's entrance that provides discreet access to the archives.",
          'there is a chance of forging documents that allow one to pose as a scholar with legitimate business in the archives.',
          "there is a chance of bribing a guard to 'overlook' a particular section of the archives at a scheduled time.",
          'there is a chance of decrypting a coded ledger that reveals the location of the evidence within the archives.',
          "there is a chance of seducing a librarian to gain information about the archives' most secretive chambers."
        ],
        complications: [
          'the archive is magically protected, with alarms and traps set to deter thieves.',
          'an unexpected rival, also seeking the evidence for their own purposes, complicates the heist.',
          'the evidence is not where it is supposed to be, requiring a high-stakes search under time pressure.',
          'a fire breaks out in a nearby district, threatening to spread to the archive before the heist can be completed.',
          'the guards of the archive are unexpectedly well-trained, presenting a formidable obstacle.',
          'a moral dilemma arises when the evidence suggests a different narrative than expected.'
        ],
        introductions: [
          "in the dim light of the archive's entrance, an embittered outcast divulges the location of the hidden evidence.",
          'a coded diary, left in your possession by an unknown ally, reveals the existence of evidence that could change everything.',
          'a tense exchange in the shadows of the library sets you on a heist that could alter the balance of power.',
          'a whispered conversation in a crowded market alerts you to the existence of evidence that could clear a condemned faction.',
          "an accidental discovery in the archive's forbidden section unveils a conspiracy and the evidence to unravel it.",
          'the embittered outcast, with nothing left to lose, entrusts you with a mission to right a grave wrong.'
        ]
      },
      {
        type: 'defense',
        alignment: 'good',
        patron: 'religious leader',
        text: 'protect a neutral zone where peace talks are to take place from those who wish to see them fail.',
        setting:
          'a serene garden, chosen for its tranquility and beauty, now echoes with the silent prayers for peace amid the growing storm.',
        clues: [
          'there is a chance of uncovering an assassination plot by interrogating a captured saboteur.',
          'there is a chance of securing the cooperation of local fauna to alert to intruders.',
          'there is a chance of enlisting the aid of retired soldiers who support the peace efforts.',
          'there is a chance of discovering hidden weapon caches near the garden, left by potential attackers.',
          'there is a chance of negotiating with local thieves to act as informants on any suspicious activity.',
          'there is a chance of setting up secret observation posts to monitor access points to the garden.'
        ],
        complications: [
          'a spy has infiltrated the peace delegation, sowing discord and suspicion among the negotiators.',
          'an extremist faction plans a dramatic assault during the talks to undermine the peace process.',
          'a natural disaster strikes the area, threatening the safety of the delegates and the success of the talks.',
          "the peace talks are a ruse by one faction to lower the other's defenses for a surprise attack.",
          'negotiators from one side are kidnapped on the eve of the talks, threatening to derail the process.',
          'a revered mediator is revealed to have a controversial past, casting doubt on their impartiality.'
        ],
        introductions: [
          "a secretive meeting with the religious leader in the temple's undercroft marks the beginning of a delicate mission.",
          "the serene garden's peace is shattered by a dire warning, drawing you into a web of intrigue and danger.",
          'a courier, breathless and panicked, delivers a message that thrusts you into the center of a diplomatic crisis.',
          'under the guise of meditation, a conversation with a monk reveals the imminent threat to the peace talks.',
          'a series of sabotage attempts culminates in a desperate plea for protection from an unlikely source.',
          'the religious leader, known for their wisdom and neutrality, requests your presence for a mission of utmost importance.'
        ]
      }
    ],
    challenges: [
      {
        skill: 'persuasion',
        text: 'negotiate safe passage through neutral territory with a group that distrusts both feuding factions.',
        setting:
          'the neutral zone is eerily quiet, the tension palpable, as if the very air waits in anticipation of your words.'
      },
      {
        skill: 'investigation',
        text: 'unravel the truth behind the assassination attempt that nearly reignited the conflict.',
        setting:
          'the crime scene is silent except for the soft rustle of leaves, with the moon casting long shadows over the evidence.'
      },
      {
        skill: 'intimidation',
        text: 'force a confession from a rabble-rouser who has been stirring up violence, making them reveal their true motives and backers',
        setting:
          'a shadowy alleyway, the sounds of distant riots and the metallic rasp of a blade being drawn.'
      },
      {
        skill: 'athletics',
        text: 'outrun and evade the mobs of enraged civilians from both sides as they rampage through the streets, seeking safety amidst the chaos',
        setting:
          'the crackling of flames and the roar of an angry crowd, choking smoke obscuring your path.'
      },
      {
        skill: 'acrobatics',
        text: 'navigate the ruins of a burnt-out district to retrieve an item without triggering remaining traps.',
        setting:
          'soot and ash fill the air, stinging your eyes as you balance precariously among the charred remnants of buildings.'
      },
      {
        skill: 'survival',
        text: 'track a group of extremists through the wilderness to their hidden encampment without being detected.',
        setting:
          'the wilds are vast and unwelcoming, every snapped twig underfoot echoing like a shout through the silent glades.'
      },
      {
        skill: 'deception',
        text: "impersonate a highly-placed member of one faction to sow confusion and mistrust among the conflict's instigators",
        setting:
          "the opulent halls of a noble's manse, the air heavy with the aroma of rich foods and perfumes."
      },
      {
        skill: 'sleight of hand',
        text: 'steal a crucial document from a high-ranking official without being noticed.',
        setting:
          'the grand hall is awash with the light of chandeliers, the air filled with the murmur of the elite and the scent of opulence.'
      },
      {
        skill: 'stealth',
        text: 'infiltrate the heavily-guarded compound where hostages from both sides are being held, orchestrating their silent rescue',
        setting:
          "the oppressive silence of the prison's shadows, punctuated by the creak of rusted iron and the rasp of labored breathing."
      },
      {
        skill: 'insight',
        text: 'discern the true motives of a supposed peacemaker who may be manipulating both sides for their own ends',
        setting:
          'the airy gardens, the fragrance of blooms intermingled with the metallic tang of freshly-spilled blood.'
      },
      {
        skill: 'perception',
        text: 'track the movement of a caravan smuggling weapons to aid one side, intercepting the deadly cargo before it reaches its destination',
        setting:
          'the dusty trail, the crunch of gravel beneath your boots accompanied by the distant bray of packhorses.'
      },
      {
        skill: 'knowledge',
        text: 'decipher the enigmatic writings of an ancient sage, rumored to reveal the path to reconciling even the bitterest of feuds',
        setting:
          'the flickering torchlight of the crumbling library, the musty aroma of ancient tomes filling the air.'
      }
    ],
    hostiles: [
      {
        type: 'minor',
        text: 'defend a merchant caravan transporting valuables from bandits.',
        setting: 'clouds of dust swirl as horses gallop along the winding mountain pass.'
      },
      {
        type: 'minor',
        text: 'stop rioters from torching an ethnic quarter during civil unrest.',
        setting: 'choking smoke billows from burning homes, mixed with the stench of burnt flesh.'
      },
      {
        type: 'major',
        text: 'rescue a kidnapped child from extremists hiding in the wilderness.',
        setting: "tall pines muffle the cries of anguish from the extremists' camp."
      },
      {
        type: 'major',
        text: "investigate a sacred relic's theft amidst rising ethnic tensions.",
        setting:
          'graffiti covers the once-magnificent temple, now silent save for echoing footsteps.'
      },
      {
        type: 'major',
        text: "storm a demagogue's compound to recover stolen wealth.",
        setting:
          'fanatics jeer amidst torchlight, the acrid smoke of burning effigies hanging thick.'
      },
      {
        type: 'boss',
        text: 'battle feuding ethnic militias in the cramped city streets.',
        setting:
          'barricades line the alleys, sectarian banners hanging limply amidst sporadic gunfire.'
      },
      {
        type: 'boss',
        text: "besiege the palace to stop the ruler's persecution.",
        setting: 'soldiers atop the high walls rain arrows down upon the restless crowds.'
      },
      {
        type: 'minor',
        text: 'hunt down zealots menacing inter-ethnic couples in the countryside.',
        setting: 'freshly-dug graves dot the rolling fields, mist hanging in the morning chill.'
      },
      {
        type: 'major',
        text: "recover proof of a traitor's deceit igniting the conflict.",
        setting: 'cobwebs veil the abandoned archives, dust motes dancing in fading sunbeams.'
      },
      {
        type: 'major',
        text: 'fend off desperate survivors from a razed village.',
        setting:
          'still-smoldering rubble lines the desolate streets, a foul charnel stench lingering.'
      },
      {
        type: 'boss',
        text: 'find the cult mastermind behind the ethnic pogroms.',
        setting:
          'bloody symbols adorn the cavern walls, the gruesome remains of victims strewn about.'
      },
      {
        type: 'boss',
        text: 'defeat the arms dealer profiting from the sectarian violence.',
        setting:
          "spent cartridges litter the makeshift workshop floor, the gunsmith's henchmen standing guard."
      }
    ]
  },
  'Brilliant Innovation': {
    text: 'Some local has come up with a wonderful new idea; it may be a magical innovation, a new industrial process, a new agricultural product, a new use for what was thought to be ancient garbage, or some other very useful, profitable idea. Everyone around them is fighting for the chance to exploit this clever new plan.',
    enemies: [
      { title: 'Grasping guild master' },
      { title: 'Overbearing local ruler' },
      { title: 'Local leader whose power is threatened by the innovation' }
    ],
    friends: [
      { title: 'Visionary supporter of the innovator' },
      { title: 'Outside merchant seeking to profit by enabling the innovation' },
      { title: 'Local leader whose constituency would profit from it' }
    ],
    complications: [
      'The innovation requires ingredients only adventurers can get',
      'The innovation is riskier than it seems',
      'The innovator is actually a con artist'
    ],
    things: [
      'Critical component for the innovation',
      "Trove of profit from the innovation's test run",
      'Vital planning and design documents'
    ],
    places: [
      'Ambitious test zone for the innovation',
      'Guildhall of upset locals',
      'Tavern with locals fighting over the change'
    ],
    quests: [
      {
        type: 'retrieval',
        alignment: 'good',
        patron: 'innovative artificer',
        text: 'retrieve a rare mineral essential for the completion of a groundbreaking alchemical process.',
        setting:
          'the misty peaks where the mineral is found are shrouded in mystery and guarded by ancient spirits.',
        clues: [
          'there is a chance of finding a local hunter who knows the exact location of the mineral.',
          "there is a chance of uncovering ancient maps in the village archives that mark the mineral's vein.",
          'there is a chance of bribing a member of the guild for information on previous successful retrieval expeditions.',
          "there is a chance of decoding old alchemical texts in the innovator's lab that describe the mineral's properties.",
          "there is a chance of encountering a rival expedition team that has partial information on the mineral's location.",
          'there is a chance of uncovering ancient carvings depicting rituals to appease the spirits guarding the peaks.'
        ],
        complications: [
          'the only known vein of the mineral is guarded by a territorial beast thought to be extinct.',
          'the fabled mountain pass leading to the mines is treacherous, littered with rockslides and concealed chasms.',
          'the local tribe considers the mineral sacred and are hostile to anyone attempting to mine it.',
          'rival adventurers hired by a competing alchemist attempt to reach the vein first and claim it.',
          "noxious fumes seep from fissures in the mine's depths, corroding flesh and dimming torchlight.",
          'an ancient curse is said to afflict those who disturb the mineral, causing paranoia and hallucinations.',
          'the coveted mineral lies entombed in crystalline clusters impervious to conventional mining tools.'
        ],
        introductions: [
          'a mysterious note left at your door in the dead of night beckons you to a meeting with the innovative artificer.',
          'while traversing the market, you overhear a heated debate about the miraculous properties of a newly discovered mineral.',
          'a chance encounter with a miner, bruised and battered, speaks of a rare mineral in the mountains and the dangers guarding it.',
          'an old map falls into your hands, marking the location of an ancient spirit-guarded vein rumored to contain the rare mineral.',
          "you are summoned to the artificer's cluttered workshop, where the air is thick with the promise of discovery and danger."
        ]
      },
      {
        type: 'defense',
        alignment: 'evil',
        patron: 'tyrannical overseer',
        text: 'defend the guildhall from angry locals protesting the innovation.',
        setting: 'raucous chants and clashing steel echo through the streets.',
        clues: [
          "there is a chance of overhearing plans for the protest at the local tavern, giving insight into the protestors' strategies.",
          'there is a chance of finding sympathizers within the protestors who oppose violence and seek a peaceful resolution.',
          "there is a chance of identifying key agitators who could be swayed or intimidated to reduce the protest's momentum.",
          'there is a chance of securing the guildhall with arcane wards or mechanical traps devised by the innovators.',
          'there is a chance of negotiating a temporary truce with the protest leaders by offering a public demonstration of the innovation.',
          'there is a chance of uncovering external influences fueling the protest, possibly competitors or enemies of the innovation.'
        ],
        complications: [
          'the protesters have been infiltrated by agents of a rival power seeking to escalate the conflict.',
          'a well-liked local figure is accidentally injured in the scuffle, turning public opinion against the guild.',
          "the guildhall's defenses are sabotaged from within, leaving it vulnerable to the protesters' advances.",
          "negotiations with the protesters are undermined by false rumors about the guild's intentions.",
          "the rabble's torches have set fire to the guildhall's timber frame, swiftly consuming the structure.",
          'the local authorities demand the guild to cease their activities, siding with the protesters.'
        ],
        introductions: [
          'cries of outrage and the clash of steel lead you to the guildhall, standing besieged by a crowd of furious locals.',
          'a desperate message from the tyrannical overseer finds you, pleading for aid against an uprising fueled by fear of change.',
          "as you navigate the city's twisted streets, the tension in the air pulls you towards the embattled guildhall.",
          'under the guise of night, you are approached by an agent of the overseer, their eyes speaking volumes of the chaos at the guildhall.',
          'the sound of an angry mob echoes through the streets, drawing you towards the epicenter of conflict at the guildhall.',
          'a plea for help, scribbled on a torn piece of parchment, guides you to a guildhall under siege.'
        ]
      },
      {
        type: 'investigation',
        alignment: 'good',
        patron: 'concerned cleric',
        text: "uncover the truth about the innovator's dubious background.",
        setting: 'whispered rumors echo through the dimly lit temple halls.',
        clues: [
          'there is a chance of finding correspondence between the innovator and a mysterious benefactor with a shady reputation.',
          "there is a chance of discovering legal documents in the city archives that hint at the innovator's past dealings.",
          'there is a chance of interviewing former associates of the innovator who have since become estranged.',
          "there is a chance of unearthing a hidden cache of the innovator's personal effects, revealing clues about their origins.",
          "there is a chance of using divination magic or hiring a seer to reveal aspects of the innovator's past.",
          "there is a chance of tracking down the innovator's mentor, who has been suspiciously silent about their protégé's success."
        ],
        complications: [
          'the innovator has powerful connections that actively work to discredit or intimidate investigators.',
          'key witnesses and documents are mysteriously disappearing, suggesting a cover-up.',
          "the innovator's birthplace lies in smoldering ruin, its archives reduced to ash and bone.",
          "the cleric's motives for investigating are questioned, casting doubt on their credibility.",
          'the investigation reveals a network of corruption that extends far beyond the innovator.',
          "the innovator's former confidants now serve a ruthless crime syndicate, sworn to lethal silence."
        ],
        introductions: [
          'in the dim light of the temple, a concerned cleric shares whispers of doubt about a celebrated innovator.',
          'a collection of suspicious documents lands on your doorstep, hinting at a shadowy past of the local genius.',
          "an anonymous tip leads you to investigate the dark alleys of the innovator's life, starting at the local archives.",
          'during a routine visit to the tavern, you overhear a conversation laced with fear and suspicion about the innovator.',
          "a letter sealed with a cleric's sigil invites you to delve into the obscured history of a too-perfect innovator.",
          'a chance encounter with a disillusioned former partner of the innovator sets you on a path of investigation.'
        ]
      },
      {
        type: 'theft',
        alignment: 'evil',
        patron: 'rival mage',
        text: 'steal the only prototype of a magical device before its creator can reveal it at the grand exhibition.',
        setting:
          'the bustling streets of the city, alive with anticipation for the exhibition and ripe with shadows for thieves.',
        clues: [
          "there is a chance of impersonating a high-ranking official to gain access to the exhibition's secure area.",
          'there is a chance of befriending a disgruntled apprentice of the inventor, willing to provide inside information.',
          'there is a chance of acquiring blueprints of the exhibition hall to identify secret entrances or weak security points.',
          "there is a chance of finding the schematics for the prototype's locking mechanism, enabling its disarming.",
          'there is a chance of creating a diversion outside the exhibition to draw guards away from the prototype.',
          "there is a chance of locating a hidden entrance into the inventor's workshop, bypassing the main defenses"
        ],
        complications: [
          'the device is warded by potent glyphs that incinerate those unworthy of its power.',
          'a rival thief is also attempting to steal the prototype, complicating the heist.',
          'the exhibition is attended by high-ranking officials, increasing security and scrutiny.',
          'the prototype is incomplete and highly unstable, posing a risk to anyone who handles it.',
          "the inventor's sanctum is a lethal gauntlet of animated guardians and cunning deathtraps.",
          'stealing the prototype triggers a magical alarm that seals the exhibition hall, trapping everyone inside.'
        ],
        introductions: [
          'a rival mage, through a veil of shadows, offers you a fortune to intercept a creation that could alter the course of magic.',
          'an unsigned invitation to the grand exhibition arrives, marked with a cryptic note about the true prize being the prototype.',
          'you stumble upon a secret meeting discussing the security around a magical device set to debut at the exhibition.',
          'a coded message from an unknown rival mage sets you on a heist that could change the balance of magical power.',
          "while exploring the city's underbelly, you uncover a plot to steal a device that promises to be the exhibition's highlight.",
          'a disguised rival mage entrusts you with the task of outwitting the creator and claiming the prototype as your own.'
        ]
      },
      {
        type: 'bounty',
        alignment: 'good',
        patron: 'guild master',
        text: 'capture a con artist trying to sell fake versions of the innovation, protecting the reputation of the true inventor.',
        setting:
          'the market square, where hopeful buyers and cunning sellers mingle, and truth is as scarce as honesty.',
        clues: [
          'there is a chance of tracing the supply chain of the fake components used in the counterfeit products.',
          "there is a chance of infiltrating the con artist's operation by posing as buyers interested in their wares.",
          'there is a chance of finding a disgruntled former associate of the con artist, willing to reveal their hideout.',
          'there is a chance of uncovering a secret meeting place where the con artist negotiates deals with buyers.',
          "there is a chance of locating the con artist's forgers and suppliers, leading back to the mastermind.",
          "there is a chance of discovering a hidden stash of the real inventor's stolen plans, used to create the fakes."
        ],
        complications: [
          'the con artist has a bodyguard with formidable magical abilities, making direct confrontation dangerous.',
          'the con artist has framed the true inventor for their own crimes, turning opinion against them.',
          'the con artist is actually a pawn in a larger scheme to discredit the innovation entirely.',
          "fake versions of the innovation have begun malfunctioning, causing public panic and further tarnishing the inventor's reputation.",
          'the con artist is a mesmerizing performer, swaying crowds with enchantments and illusion.',
          'capturing the con artist reveals they have powerful political protection, leading to a diplomatic incident.'
        ],
        introductions: [
          "a guild master, fraught with worry, recounts tales of deceit marring the true inventor's reputation.",
          "amidst the cacophony of the market square, you spot a deal that's too good to be true, sparking an investigation.",
          'a desperate plea from the true inventor leads you down the rabbit hole of deceit and duplicity.',
          "a counterfeit innovation fails spectacularly in public, drawing your attention to the con artist's scheme.",
          "while perusing the market's wares, you're drawn to a stall selling wonders that bear the mark of fraud.",
          'an undercover guild master shares a quiet word about a swindler sullying the name of genuine progress.'
        ]
      },
      {
        type: 'smuggling',
        alignment: 'good',
        patron: 'exiled alchemist',
        text: 'smuggle critical components for the innovation past the city guards.',
        setting: 'flickering torchlight dances across the dank sewer tunnels.',
        clues: [
          'there is a chance of acquiring forged documents that list the components as mundane goods.',
          'there is a chance of locating a corrupt guard willing to turn a blind eye, for the right price.',
          'there is a chance of discovering a hidden cache near the city limits, where components can be stashed for later retrieval.',
          "there is a chance of unearthing an old smugglers' map detailing forgotten tunnels beneath the city walls.",
          'there is a chance of befriending a merchant with a false-bottomed wagon, perfect for concealing the components.',
          "there is a chance of finding a forgotten postern gate in the city's defenses, left unguarded and vulnerable."
        ],
        complications: [
          'the guards have been tipped off and are conducting thorough searches of anyone entering or leaving the city.',
          "a betrayal within the smuggler's ranks leads to a trap at the city gates.",
          'heavy rains flood the sewer tunnels, making the usual smuggling routes impassable.',
          'a notorious gang controls the underground passages and demands a steep price for passage.',
          'the components are highly volatile and require special handling to avoid disaster.',
          'an old enemy of the exiled alchemist recognizes the party, threatening to expose the entire operation.'
        ],
        introductions: [
          'in the shadowy depths of the tavern, an exiled alchemist shares the perilous path to innovation.',
          'a discreet encounter in the sewers beneath the city sets the stage for a daring act of smuggling.',
          'a cryptic note guides you to a rendezvous with an alchemist, where whispers of forbidden components fill the air.',
          "the flicker of torchlight upon anxious faces reveals a plan to subvert the city's watchful eyes.",
          'a mysterious alchemist, cloaked in secrecy, entrusts you with components that could change the world.',
          'through the mists of the sewers, a silent figure signals the beginning of a venture fraught with danger.'
        ]
      },
      {
        type: 'sabotage',
        alignment: 'good',
        patron: 'idealistic innovator',
        text: 'sabotage the test zone where the overbearing ruler experiments with the dangerous innovation.',
        setting: "acrid smoke billows from the looming factory's chimneys.",
        clues: [
          "there is a chance of discovering a flaw in the test zone's design that could be exploited to cause chaos.",
          'there is a chance of locating a disgruntled worker within the test zone, willing to aid in the sabotage.',
          "there is a chance of finding a hidden entrance into the test zone's underground tunnels and supply lines.",
          'there is a chance of unearthing a stash of volatile materials that could be used to create explosions or fires.',
          "there is a chance of intercepting coded messages revealing the test zone's security routines and vulnerabilities.",
          'there is a chance of locating a vantage point overlooking the test zone, ideal for long-range sabotage efforts.'
        ],
        complications: [
          'the innovation has unpredictable side effects, making the test zone hazardous to infiltrate.',
          "the ruler's elite guards are equipped with experimental weapons derived from the innovation.",
          "the test's toxic runoff has mutated the local fauna into abhorrent, rampaging beasts.",
          'the test zone is rigged with traps designed to capture or kill saboteurs.',
          "an ethical dilemma arises when it's discovered that the test subjects are unwilling participants from the local population.",
          "the innovation's power source is inherently unstable, threatening devastation if tampered with."
        ],
        introductions: [
          "a whispered conversation in a forgotten alleyway unveils a plot to undo a ruler's dangerous ambition.",
          "an unexpected alliance forms in the shadows, united against the threat of a tyrant's new weapon.",
          "the smog from the factory's chimneys carries a call to action, leading you to the heart of the menace.",
          'a renegade inventor reveals the location of the test zone, marking the start of a dangerous mission of sabotage.',
          "an intercepted message exposes the test zone's vulnerabilities, drawing you into a plot of rebellion.",
          "a somber gathering of those who've suffered from the ruler's ambition plants the seeds of a desperate plan."
        ]
      },
      {
        type: 'espionage',
        alignment: 'evil',
        patron: 'spymaster',
        text: "infiltrate the innovator's inner circle to steal secrets for a foreign power looking to monopolize the technology.",
        setting:
          "amidst the scholarly chaos of the innovator's library, where every tome and scroll could change the world.",
        clues: [
          "there is a chance of discovering a hidden passage into the innovator's library, avoiding the main entrance.",
          'there is a chance of uncovering a secret correspondence that could be used to blackmail a member of the inner circle.',
          'there is a chance of proving your worth by solving a problem that has stumped the innovation team.',
          'there is a chance of attending a masquerade ball where the inner circle will be present, allowing for discreet inquiries.',
          'there is a chance of rescuing a member of the inner circle from a predicament, earning their gratitude and trust.',
          "there is a chance of unearthing a stash of the innovator's personal effects, containing clues to their research."
        ],
        complications: [
          "the innovator's halls crawl with spies and informants for rival patrons, all seeking the same prize.",
          'an unexpected alliance between the innovator and another foreign power complicates the espionage effort.',
          "the innovator's apprentices are fanatically devoted, willing to die to protect their master's work.",
          'a member of the inner circle is a double agent, feeding false information to the spies.',
          "the foreign power's interest in the technology is far more sinister than initially believed.",
          'the technology is incomplete, and the missing piece is held by a reclusive genius with no interest in politics or profit.'
        ],
        introductions: [
          'under the guise of night, a spymaster outlines a plan to claim the future of innovation for a foreign throne.',
          'a covert missive from across the sea sets you on a course to the heart of an intellectual revolution.',
          "amidst the clinking of glasses in a crowded tavern, you're drawn into a conspiracy that spans nations.",
          'a disguise as a scholar grants you entry to a world of secrets and the chance to shift the balance of power.',
          'the lure of forbidden knowledge leads you to a gathering of minds, where your true mission lies hidden.',
          "a rendezvous with destiny occurs in the innovator's shadow, where whispers betray the promise of a new dawn."
        ]
      }
    ],
    challenges: [
      {
        skill: 'persuasion',
        text: 'convince the local lord to allow the innovation, despite opposition from guilds threatened by its potential impact.',
        setting: 'the dimly lit hall reeks of sweat and intrigue as courtiers whisper urgently.'
      },
      {
        skill: 'deception',
        text: 'infiltrate the guildhall and steal plans for sabotaging the innovation, without arousing suspicion.',
        setting: 'shadows dance across ancient stonework as candles flicker in the drafty chamber.'
      },
      {
        skill: 'intimidation',
        text: "force a merchant caravan to relinquish a shipment of rare components crucial for the innovation's success.",
        setting: 'the caravan creaks and groans as it trudges through a narrow mountain pass.'
      },
      {
        skill: 'athletics',
        text: 'scale the walls of an abandoned factory to recover prototypes from the rubble of a failed test run.',
        setting: 'shattered glass litters the ground amid the skeletal remains of rusted machinery.'
      },
      {
        skill: 'acrobatics',
        text: "escape pursuit by leaping across rooftops after a daring theft of the innovation's plans.",
        setting: 'chimney smoke hangs thick in the night air above the cramped city streets.'
      },
      {
        skill: 'stealth',
        text: 'infiltrate the manor of a corrupt guild leader and discover evidence of their plot against the innovator.',
        setting: "well-tended gardens conceal shadowy pathways between the opulent estate's walls."
      },
      {
        skill: 'survival',
        text: 'track the innovator into the wild after they flee the city, struggling to survive the harsh wilderness.',
        setting: 'gnarled boughs creak ominously as fog swirls through the harsh landscape.'
      },
      {
        skill: 'investigation',
        text: 'unravel the threads of a conspiracy among local nobles to suppress the innovation and its threat to their power.',
        setting: 'the smoky haze of the tavern conceals furtive glances and hushed whispers.'
      },
      {
        skill: 'insight',
        text: 'discern the true motives of a supposed ally who claims to support the innovator, but may be a traitor.',
        setting:
          'rain patters on the sodden streets, muffling the distant toll of the evening bells.'
      },
      {
        skill: 'perception',
        text: 'detect an ambush by guild thugs lurking in the shadows while transporting a valuable prototype.',
        setting: 'faint scratching and scurrying rats betray the presence of unseen watchers.'
      },
      {
        skill: 'knowledge',
        text: "decipher the innovator's coded notes to understand the workings of their creation before it can be replicated.",
        setting:
          'dusty tomes litter the dimly lit study, their pages yellowed by the passage of years.'
      },
      {
        skill: 'sleight of hand',
        text: 'secretly swap a priceless gemstone needed for the innovation with a replica during a tense hostage exchange.',
        setting: 'sweat beads on your brow as torchlight dances across the crowded market square.'
      }
    ],
    hostiles: [
      {
        type: 'minor',
        text: "fend off rabid pack of feral dogs guarding innovation's stockpile.",
        setting: 'cramped storeroom filled with crates and burlap sacks reeking of ammonia.'
      },
      {
        type: 'major',
        text: 'battle rival guild enforcers dispatched to ransack the workshop.',
        setting: 'dank basement workshop littered with charred schematics and discarded tools.'
      },
      {
        type: 'boss',
        text: 'confront the ruthless guildmaster manipulating riots against the innovation.',
        setting: 'opulent great hall with banners bearing rival guild sigils hanging overhead.'
      },
      {
        type: 'minor',
        text: 'subdue zealous mobs denouncing the ungodly innovation as heresy.',
        setting: 'city square crowded with shouting rioters wielding improvised weapons.'
      },
      {
        type: 'major',
        text: 'guard innovator from assassins sent by those threatened.',
        setting: 'dimly lit living quarters with signs of forced entry evident.'
      },
      {
        type: 'minor',
        text: 'recover stolen prototypes from common bandits exploiting the chaos.',
        setting: 'forest trail scarred by recent skirmish, leaves swirling in the wind.'
      },
      {
        type: 'boss',
        text: "defeat tyrannical lord's elite guard protecting interest in the status quo.",
        setting: 'lavish palace antechamber adorned with grotesque hunting trophies.'
      },
      {
        type: 'major',
        text: 'extract ally from hostile crowd turning on outside merchant.',
        setting: 'cramped trading post overflowing with irate townsfolk demanding refunds.'
      },
      {
        type: 'minor',
        text: 'clear out squatters occupying the ambitious test zone.',
        setting: 'derelict warehouse with collapsed sections of flooring and walls.'
      },
      {
        type: 'boss',
        text: 'bring the con-artist innovator to justice for defrauding investors.',
        setting: "squalid gamblers' den thick with pipe smoke and quiet whispers."
      },
      {
        type: 'major',
        text: 'intervene in street battles between feuding factions over the innovation.',
        setting: 'rubble-strewn market district with shattered stalls and broken walls.'
      },
      {
        type: 'minor',
        text: 'capture smugglers trafficking illicit innovation components across borders.',
        setting: 'misty riverside dock with the silhouette of a barge in the distance.'
      }
    ]
  },
  'Broken Spirits': {
    text: "The locals are in a state of despair and dull apathy. They've lost the things that used to give them pride and hope, with the best among them carrying on out of habitual duty and the worst giving ready hands to shameful deeds and ignoble acts. No one really believes the future can be better, and most seek only to satisfy immediate appetites.",
    enemies: [
      { title: 'Cruel tyrant who broke them', veteran: true },
      { title: 'Slaver trading on the hopeless' },
      { title: 'Merchant of despair and its costly escapes' }
    ],
    friends: [
      { title: 'Determined local leader' },
      { title: 'Proud old rememberer of better days' },
      { title: 'Furious rebel against the world' }
    ],
    complications: [
      'An outside power wants to keep them safely broken',
      'Their fall was due to their own sins and errors',
      'They could be very dangerous if they regain their spirit'
    ],
    things: [
      'Symbolic item of former glory',
      'Resources to kickstart a new source of pride',
      'Treasure laid up in splendid times'
    ],
    places: [
      'Crumbling monument to a past victory',
      '"Wealthy" town area that\'s shabby and ill-kept',
      'Empty temple to a once-loved god'
    ]
  },
  'Corrupt Laws': {
    text: 'What law exists here is for sale, or does not apply to certain favored groups or castes. While some degree of corruption and noble license exists almost everywhere, this community lacks any shred of impartiality. Strangers might be fleeced by local lawmen, evildoers can be absolved by a payment, and powerful gentry do as they please.',
    enemies: [
      { title: 'Immensely venal magistrate' },
      { title: 'Local lord who fails to see any problem with the "natural" order' },
      { title: 'Crime boss taking blatant advantage of the corruption' },
      { title: 'Wealthy merchant who openly bribes officials' },
      { title: 'Ruthless tax collector who harasses the poor' },
      { title: 'Noble with a penchant for causing chaos, safe in their immunity' }
    ],
    friends: [
      { title: 'A crusading law enforcer' },
      { title: 'Royal investigating censor' },
      { title: 'Victim of a cruel injustice' }
    ],
    complications: [
      "The favored class are vital to the community's security",
      'The natives would rather pay predictable bribes than risk facing real justice',
      'The real law is enforced by a secret group of natives'
    ],
    things: [
      'An uncollected pile of bribe money',
      'Stolen goods yet unsold',
      'Blackmail evidence on the chief magistrate'
    ],
    places: [
      'A courtroom where the law is sold',
      'Crime scene with an unconcerned criminal',
      'Site of brutal vigilante justice'
    ]
  },
  'Criminal Bosses': {
    text: 'One or more crime bosses have a powerful influence on the community. They may control crime within the community itself, or they may use it simply as a safe haven from which to direct their minions elsewhere. Local law enforcement may know all about them, but lack the strength to confront them and their paid or intimidated henchmen.',
    enemies: [
      { title: 'Blatantly overt criminal chief', veteran: true },
      { title: 'Well-controlled head of law enforcement', veteran: true },
      { title: 'Crime boss bent on using the PCs as catspaws', veteran: true }
    ],
    friends: [
      { title: 'Victim of an untouchable boss' },
      { title: 'Determined bounty hunter' },
      { title: 'Ambitious criminal seeking to make room above' }
    ],
    complications: [
      "The crime boss' support is what keeps the community prosperous",
      'Local government is almost openly staffed by cartel members',
      "The locals will deal with PC troublemakers for fear of the boss' anger"
    ],
    things: [
      "A boss' secret stash of wealth",
      'A treasure stolen elsewhere and brought here by a boss',
      'Evidence proving one boss is betraying another'
    ],
    places: [
      'Uncharacteristically opulent home in the slums',
      'Sleepy law enforcement headquarters',
      'Dangerous tavern for local minions'
    ]
  },
  'Cultural Center': {
    text: 'The community produces some wonderful cultural artifact or trains famous artists. The product might be some exceptional cloth, or artistic luxury good, or the scholarly fruits of a famous academy. Trained artists might be students of a particular school, or the apprentices of the current masters of a long artistic tradition who dwell here.',
    enemies: [
      { title: 'Master artist who suffers no rivals' },
      { title: 'Visionary who wants to tear down the old art for their own new one' },
      { title: 'Merchant who is trying to control the production for profit' }
    ],
    friends: [
      { title: 'Ambitious artist of profound talent' },
      { title: 'Wild genius of very difficult temperament' },
      { title: 'Aged master proud of his tradition' }
    ],
    complications: [
      'The art requires resources that are running low',
      'Some other group is cheaply and poorly mimicking the art',
      'Their main market has somehow been cut off'
    ],
    things: [
      'A famous and ancient work of art',
      'An art object made of some priceless substance',
      'An art object encoded with a precious secret'
    ],
    places: [
      'Busy studio or academy hall',
      'Mercantile emporium where the cultural products are traded',
      "Renegade artist's hovel"
    ]
  },
  'Cursed Circumstances': {
    text: "The community has been cursed with some blight that makes life difficult, albeit not impossible. An offended sorcerer's vengeful Working, an outraged god's wrath, a local distortion of the Legacy, or a simple history of bad feng shui in the area may have brought the curse about. If you include this tag, you'll want to devise not only the curse, but the reason why the locals haven't left for better lands.",
    enemies: [
      { title: 'Charlatan offering false hope' },
      { title: 'Local demagogue blaming a useful culprit' },
      { title: 'Criminal whose vile act induced the curse' },
      { title: 'Enchanted beast that exudes the curse naturally', monstrous: true },
      { title: 'Local sorcerer acting out of spite and resentment' },
      { title: "Spiteful local who enjoys a rival's cursed suffering" },
      { title: 'Malign spirit possessing its victims', monstrous: true }
    ],
    friends: [
      { title: 'Curious scholar seeking to study the curse' },
      { title: "{Stubborn curse survivor|Innocent victim of the curse's effects}" },
      { title: 'Brash outsider confident they can lift the curse' },
      { title: 'Desperate local trying to lift the magical blight' },
      { title: 'Guilty local who feels responsible for the malison' },
      { title: 'Local unjustly blamed by neighbors for the curse' },
      { title: 'Wretched soul who failed to lift the curse' }
    ],
    complications: [
      'Failing to lift the curse will cause a disaster',
      'The curse is a fake, a cover for some dark crime',
      'The curse is keeping an invader out of the place',
      "The curse is tied to an innocent local's life",
      "The curse's side-effects are making someone rich",
      'The locals have a badly wrong idea how to lift it'
    ],
    things: [
      'Personal anti-curse ward',
      '{Hidden wealth of a curse victim|The possessions of a rich victim of the curse}',
      'The artifact that can be used to lift the curse',
      'The evidence proving a person responsible for it',
      'The item that must be returned to lift the curse',
      'The magical belongings of a deceased curse-lifter',
      "The map to where the curse's focal item is buried",
      'The money paid to the person who laid the curse',
      'The relic that must be shattered to lift the curse'
    ],
    places: [
      'Residence blighted by the curse',
      'Festival held to pray for mercy',
      "Ruin of a curse victim's home",
      "Chamber where the curse's focal relics are held",
      "Grim locale where locals suffered the curse's effect",
      'The site of a crime that induced the curse'
    ],
    quests: [
      {
        type: 'investigation',
        alignment: 'good',
        patron: 'desperate local',
        text: 'investigate the cursed village and uncover the foul source of the blight tormenting its people.',
        setting:
          'withered husks of trees lining cracked earth, dilapidated hovels belching black smoke, hollow-eyed wretches shuffling aimlessly.',
        introductions: [
          "a tattered note pinned to the village's notice board, begging for aid.",
          "a local, upon noticing strangers, approaches discreetly to share the village's plight.",
          'an encounter with a fleeing villager in the woods, desperate to escape the curse.',
          'a mysterious figure approaches the party at a nearby inn, offering information for a price.',
          "discovering an old, worn diary in an abandoned house on the outskirts, detailing the curse's early effects.",
          'a plea for help scrawled on the wall of a derelict building, visible to those entering the village.'
        ],
        clues: [
          "there is a chance of discovering an ancient tome detailing the origins of the curse within the remnants of the village elder's home.",
          'there is a chance of finding a desiccated corpse clutching a vial containing the last of a counter-curse potion, hidden in the cellar of a ruined tavern.',
          'there is a chance of overhearing hushed conversations among the cursed villagers, hinting at an old well where the curse was first unleashed.',
          'there is a chance of spotting unnatural tracks leading away from the village, towards a secluded glen known for its eldritch energies.',
          "there is a chance of unearthing a buried altar on the outskirts of the village, stained with blood of unknown origin, possibly linked to the curse's invocation.",
          "there is a chance of retrieving a fragment of a cursed relic from the blacksmith's forge, rumored to be the source of the village's affliction."
        ],
        complications: [
          "a sudden storm arises, obscuring tracks and erasing signs of the curse's origin.",
          'the villagers become hostile, fearing the investigators will worsen their plight.',
          "an ancient guardian, bound to protect the curse's secret, awakens to thwart the investigation.",
          'critical evidence is found to be stolen or destroyed by an unknown party.',
          'a false lead lures the party into a dangerous trap, set by those capitalizing on the curse.',
          'a contagious disease, a byproduct of the curse, begins to afflict the investigating party.'
        ]
      },
      {
        type: 'monster',
        alignment: 'evil',
        patron: 'local sorcerer',
        text: "slay the wretched abomination drawn to fester in the heart of the curse's baleful miasma.",
        setting:
          'a once-vibrant village square now a festering marsh of decay, the reek of putrescence overwhelming, bestial roars erupting from the gloom.',
        introductions: [
          "a grotesque display at the village center, remnants of the beast's last feast, alongside a call for hunters.",
          'whispers in the tavern about a bounty placed on the beast by the local sorcerer, seeking to prove their worth.',
          'a survivor, bandaged and barely coherent, recounts their encounter with the beast to anyone who will listen.',
          "a crudely drawn map found on a dead hunter, marking the beast's territory with warnings and pleas for vengeance.",
          'the party stumbles upon a ritual in progress, aimed at drawing out the beast for a confrontation.',
          "a challenge issued by the local sorcerer, seeking brave souls to end the beast's reign of terror."
        ],
        clues: [
          "there is a chance of tracking the beast's movements by the trail of corruption it leaves, leading to its lair hidden in the swamp.",
          "there is a chance of finding a hunter's journal in a deserted cabin, detailing sightings and encounters with the abomination.",
          'there is a chance of acquiring a poison from a local hermit that can weaken the beast, made from rare herbs that grow only in cursed soil.',
          "there is a chance of encountering a survivor of the beast's attacks, bearing scars and tales of its vulnerabilities.",
          "there is a chance of discovering ancient runes carved into stones around the beast's lair, offering clues to its binding or banishment.",
          "there is a chance of unearthing the remains of the beast's previous victims, their belongings possibly holding items enchanted for protection against it."
        ],
        complications: [
          'the abomination has the ability to control the minds of those it wounds, turning them against each other.',
          'the creature retreats into a labyrinth of underground tunnels, filled with other dangerous beasts.',
          'its lair is located in an area that amplifies its powers, due to high concentrations of eldritch energy.',
          'certain villagers worship the abomination, seeing it as a protector, and actively hinder the party.',
          'the beast has a regenerative ability, requiring a special weapon or technique to be effectively slain.',
          'killing the creature triggers the release of a toxic miasma, posing a risk to the nearby village.'
        ]
      },
      {
        type: 'retrieval',
        alignment: 'good',
        patron: 'brash outsider',
        text: "retrieve the ensorcelled artifact entombed in the blighted catacombs, the only means of breaking the accursed town's ruinous malison.",
        setting:
          'crumbling sepulchers overrun by crystalline decay, charnel reek assaulting the senses, the skittering of unseen entities accompanying each step.',
        introductions: [
          "a coded message found in the pocket of a thief's corpse, hinting at the artifact's location.",
          "a dream shared by the party members, guiding them to the catacombs' hidden entrance.",
          "a historian's lecture at a local academy, revealing the existence of the artifact.",
          'an ancient scroll for sale in a dark market, containing a map to the catacombs.',
          'a ghostly apparition appears to the party, leading them to the entrance of the catacombs.',
          "the discovery of an old, sealed letter in a library, describing the artifact's power and curse."
        ],
        clues: [
          'there is a chance of deciphering a cryptic map found in the village archive, showing the hidden entrance to the catacombs.',
          "there is a chance of gaining the trust of a grave robber who knows the catacombs' treacherous paths and deadly traps.",
          "there is a chance of recovering a key from the cursed village's old priest, rumored to unlock the chamber where the artifact is kept.",
          "there is a chance of spotting spectral guardians around the artifact's chamber, their patterns revealing the safe path through.",
          'there is a chance of finding an inscription on the catacomb walls that hints at a ritual needed to safely retrieve the artifact without unleashing its curse.',
          "there is a chance of obtaining a relic from the local monastery, said to protect the bearer from the catacombs' malign influences."
        ],
        complications: [
          'the catacombs are a shifting maze, changing as the party navigates its dark corridors.',
          'ghostly guardians of the artifact attempt to deceive and mislead intruders.',
          'a rival party, also seeking the artifact, engages in sabotage and ambushes.',
          'toxic fungi in the catacombs release spores that induce hallucinations and sickness.',
          'the artifact is protected by a curse that afflicts anyone who touches it without proper precautions.',
          'portions of the catacombs are flooded, requiring navigation through dark, submerged passages.'
        ]
      },
      {
        type: 'bounty',
        alignment: 'evil',
        patron: 'employer of mercenary wizard',
        text: 'apprehend the foolish meddlers delusionally seeking to undo the curse, their meddling will only intensify its misery.',
        setting:
          'air shimmering with eldritch distortions, ephemeral whispers mocking all hope, distant screams a constant, haunting refrain.',
        introductions: [
          "a coded message found in the pocket of a thief's corpse, hinting at the artifact's location.",
          "a dream shared by the party members, guiding them to the catacombs' hidden entrance.",
          "a historian's lecture at a local academy, revealing the existence of the artifact.",
          'an ancient scroll for sale in a dark market, containing a map to the catacombs.',
          'a ghostly apparition appears to the party, leading them to the entrance of the catacombs.',
          "the discovery of an old, sealed letter in a library, describing the artifact's power and curse."
        ],
        clues: [
          'there is a chance of intercepting a coded message between the meddlers, revealing their next meeting point within the cursed area.',
          'there is a chance of disguising oneself to infiltrate a gathering of the curse-lifting hopefuls, learning of their plans and resources.',
          "there is a chance of tracking down a traitor among the meddlers, willing to divulge their leader's identity for the right price.",
          'there is a chance of stumbling upon a hidden stash of artifacts collected by the meddlers, crucial for their ritual to lift the curse.',
          'there is a chance of luring the meddlers into a trap by spreading rumors of a newfound, powerful anti-curse talisman in a specific location.',
          'there is a chance of finding a diary of one of the meddlers, detailing their motivations and the extent of their misguided actions.'
        ],
        complications: [
          'the meddlers have unwittingly allied with a malevolent entity that seeks to use them for its own ends.',
          'a miscommunication leads to conflict with a neutral party, complicating the mission.',
          'the meddlers possess a powerful, ancient artifact that they do not fully understand or control.',
          'one of the meddlers is related to a member of the party, creating a personal dilemma.',
          "the location of the meddlers' hideout is protected by natural hazards and cunning traps.",
          "their actions have already accelerated the curse's effects, putting innocent lives in immediate danger."
        ]
      },
      {
        type: 'sabotage',
        alignment: 'good',
        patron: 'wretched curse-lifter',
        text: 'sabotage the foul rituals empowering the malevolent curse-weaver who torments the besieged populace with their unrelenting hex.',
        setting:
          'a profane ossuary adorned in blasphemous symbols, rancid clouds of burnt offering hanging thick, wails of the sacrificed echoing endlessly.',
        introductions: [
          'overhearing a heated argument in the market square about the best way to combat the curse.',
          "a cryptic warning left on the party's belongings, cautioning them against interference.",
          'a public proclamation by the employer, declaring a bounty on the meddlers.',
          'a suspicious gathering in a secluded location, observed during a late-night wander.',
          'a series of urgent, anonymous letters sent to the party, imploring them to act against the meddlers.',
          'an accidental encounter with a spy, mistaking the party for allies of the meddlers.'
        ],
        clues: [
          "there is a chance of unmasking a spy within the curse-weaver's followers, who can provide the schedule and location of the next ritual.",
          "there is a chance of acquiring a defiled ritual implement, its destruction weakening the curse-weaver's power.",
          "there is a chance of befriending an outcast from the curse-weaver's circle, knowledgeable in countering their dark rituals.",
          "there is a chance of finding a tome of forbidden lore that contains a spell to disrupt the curse-weaver's concentration during the ritual.",
          'there is a chance of discovering a network of tunnels beneath the ritual site, allowing for an unseen approach to sabotage the event.',
          "there is a chance of stealing the curse-weaver's personal grimoire, containing secrets and vulnerabilities tied to their power."
        ],
        complications: [
          'a protective barrier around the ritual site repels any who attempt to enter without a specific countermeasure.',
          'the curse-weaver has summoned otherworldly creatures to guard the ritual site.',
          'local wildlife, corrupted by the dark rituals, attacks anyone approaching the area.',
          'the ritual components are volatile and handling them improperly could have disastrous effects.',
          "the curse-weaver's followers include a spy from within the party's ranks.",
          "an unforeseen celestial event enhances the curse-weaver's power during the ritual."
        ]
      },
      {
        type: 'defense',
        alignment: 'evil',
        patron: 'malign spirit',
        text: 'defend the dread sanctum where the wrathful spirit anchors its vengeful curse upon the land and people.',
        setting:
          'a labyrinth of corridors warping into maddening, non-euclidean angles, ephemeral voices pleading for oblivion, the groans of stressed reality itself.',
        introductions: [
          'a dire warning from the spirits of the land, sensed during a sacred ritual.',
          "a mysterious sigil appearing on the party's path, guiding them to the sanctum.",
          "a sudden, unexplained compulsion to seek out the heart of the curse's power.",
          'the discovery of an ancient guardian, bound to the sanctum, pleading for aid.',
          "a solemn oath sworn by an ancestor, surfacing in a family heirloom's hidden compartment.",
          'a coded plea for help, found in a bottle set adrift in a cursed stream.'
        ],
        clues: [
          "there is a chance of uncovering ancient wards around the sanctum's perimeter, which can be reactivated to strengthen its defenses.",
          "there is a chance of convincing a group of local bandits to join the defense in exchange for a share of the sanctum's hidden treasures.",
          'there is a chance of discovering a forgotten underground passage that could serve as a secret escape route or a way to flank attackers.',
          "there is a chance of finding an old hermit with knowledge of a ritual to temporarily bolster the sanctum's arcane barriers.",
          "there is a chance of trapping the sanctum's surroundings with eldritch mines, deterring the approach of the uninitiated.",
          "there is a chance of negotiating with a rival spirit to aid in the sanctum's defense in exchange for a future favor."
        ],
        complications: [
          'a faction of curse victims seeks to destroy the sanctum, believing it will lift the curse.',
          "the sanctum's ancient defenses begin to fail, requiring urgent repair under siege conditions.",
          "the spirit's wrath intensifies, causing natural disasters in the area surrounding the sanctum.",
          "rival spirits or entities are drawn to the conflict, seeking to claim the sanctum's power.",
          "a betrayal from within the defenders reveals the sanctum's vulnerabilities to the attackers.",
          'the sanctum is built on unstable ground, and the conflict risks collapsing it entirely.'
        ]
      },
      {
        type: 'escort',
        alignment: 'good',
        patron: 'curse survivor',
        text: "escort the last uncorrupted soul through the cursed warrens, for they alone can lead the way to the hex's undoing.",
        setting:
          'a nightmarish landscape of scorched desolation, a miasma of despair hanging thick, the silence shattered by the anguished screams of tormented souls.',
        introductions: [
          'a foreboding dream that leads each party member to the uncorrupted soul.',
          "a chance meeting with a mysterious hermit who entrusts the party with the soul's safety.",
          "a desperate escape, witnessed in the dead of night, where the soul seeks the party's protection.",
          'an ancient prophecy, discovered in a forgotten tome, speaking of the soul and its guardians.',
          "a sudden attack by cursed beings, revealing the uncorrupted soul among the party's number.",
          "an enigmatic map, received from an unknown benefactor, pointing to the soul's hidden refuge."
        ],
        clues: [
          "there is a chance of obtaining amulets from a hidden shrine, offering protection against the warrens' corrupting influence.",
          "there is a chance of rescuing an imprisoned fae creature, indebted to guide and shield the party through the warrens' treacheries.",
          'there is a chance of deciphering ancient markers along the path, revealing safe passages through the cursed landscape.',
          'there is a chance of allying with a pack of beasts that have adapted to the warrens, capable of sensing and avoiding dangers.',
          "there is a chance of discovering a hermit's notes on navigating the warrens, including warnings of illusions and traps.",
          'there is a chance of acquiring a cursed object that, when wielded by the uncorrupted soul, can repel minor malevolent entities.'
        ],
        complications: [
          'the warrens react to the presence of the uncorrupted soul, creating barriers and illusions to hinder progress.',
          'a cult that worships the curse attempts to capture the uncorrupted soul for a sacrifice.',
          'the soul begins to show signs of corruption, requiring immediate and risky purification.',
          'a powerful cursed entity perceives the soul as a threat and relentlessly pursues the party.',
          'treacherous terrain and unstable ground threaten to separate the party or cause injury.',
          "supernatural storms plague the journey, driven by the curse's desire to protect itself."
        ]
      },
      {
        type: 'theft',
        alignment: 'evil',
        patron: 'charlatan',
        text: "steal the exotic reagents and profane texts required for extending the curse's foul reach to new victims.",
        setting:
          'an abandoned sanctuary overrun by virulent fungi and noxious molds, tinctures of indescribable substances leaking from shattered alembics.',
        introductions: [
          'a secretive note, slipped to the party by a hooded figure in a crowded marketplace.',
          'a whispered conversation overheard in the dead of night, discussing the location of the texts.',
          "a cryptic puzzle left in the ruins of a cursed home, leading to the reagents' hiding place.",
          "an urgent summons from a former ally, now ensnared in the charlatan's web of deceit.",
          'a daring raid on a convoy, unwittingly uncovering the reagents among the stolen goods.',
          "the discovery of a hidden compartment in a cursed statue, containing clues to the texts' whereabouts."
        ],
        clues: [
          "there is a chance of intercepting a shipment of rare reagents to a secluded alchemist's hut, used as a front for the charlatan's operations.",
          'there is a chance of infiltrating a clandestine meeting of collectors of the occult, where the required texts are auctioned.',
          'there is a chance of locating a disgruntled apprentice willing to betray the charlatan for a share of the spoils.',
          'there is a chance of discovering a hidden chamber beneath an abandoned chapel, storing the profane texts and guarded by fanatics.',
          "there is a chance of acquiring a decoding lens in a thief's market, essential for translating the texts' ancient, forbidden script.",
          'there is a chance of unearthing a cache of reagents in the ruins of a cursed estate, overlooked in the initial scouring for valuables.'
        ],
        complications: [
          'the reagents are more potent and dangerous than anticipated, causing harm if mishandled.',
          'a guardian creature, bound to the texts and reagents, awakens to defend its charge.',
          "a moral dilemma arises when it's discovered the texts contain knowledge beyond the curse.",
          'the location of the reagents is within a heavily guarded and sacred site, causing potential conflict.',
          'a rival thief is also after the reagents, leading to a race against time and confrontation.',
          'acquiring the reagents attracts unwanted attention from a powerful being interested in the curse.'
        ]
      }
    ],
    challenges: [
      {
        skill: 'athletics',
        text: 'traverse the winding, treacherous passes leading to the accursed village, braving rockslides and hostile terrain.',
        setting:
          'sheer cliffs closing in on either side, loose scree crumbling underfoot, the ever-present threat of tumbling boulders raining from above.'
      },
      {
        skill: 'acrobatics',
        text: 'nimbly navigate the horrific webwork of barbed, thorn-studded brambles overrunning the village outskirts.',
        setting:
          'unnatural hybrids of serrated wood and twitching sinew blocking every path, razor-edged in their malignant overgrowth, the air thick with the stench of rancid sap.'
      },
      {
        skill: 'stealth',
        text: "infiltrate the dread citadel of the curse's source while evading the baleful detection of its soul-devouring wards.",
        setting:
          'an ever-shifting labyrinth of corridors hung with eerie glyphs, the miasma of sorcery stinging the eyes, the crunch of desiccated bones underfoot.'
      },
      {
        skill: 'survival',
        text: 'traverse the blighted wastelands where the curse festers unchecked, exposed to its pervasive, unnatural hazards.',
        setting:
          'the very air choked with swirling, corrosive particulates, mutated flora lashing with poisonous fronds, the earth cracking with noxious fumeroles.'
      },
      {
        skill: 'intimidation',
        text: "browbeat the fearful, superstitious townsfolk into divulging the occult truth of the curse's origin before their madness takes hold.",
        setting:
          'vacant eyes brimming with primal terror, clutching hands dyed black by decaying crops, the listless wails of the dying permeating all.'
      },
      {
        skill: 'persuasion',
        text: "sway the curse's tormented victims to reveal the key to undoing its grip, their wills crumbling from endless hopelessness.",
        setting:
          'a deathly pallor hanging over every emaciated face, lips cracked and bleeding from bouts of retching, the bleak acceptance of living through a hell on earth.'
      },
      {
        skill: 'deception',
        text: 'bluff your way into the inner sanctums where the unholy curse is anchored by posing as a member of its cultist cabal.',
        setting:
          'the miasmic haze of ceremonial incense cloying the lungs, maddening chants droning in languid repetition, grotesque idols leering from every corner.'
      },
      {
        skill: 'investigation',
        text: 'decipher the fragments of lore found scattered within the ruins, piecing together the arcane secrets required to undo the vile hex.',
        setting:
          'crumbling libraries overrun by virulent molds and crystalline decay, shattered artifacts entangled by thorny brambles, entire tomes reduced to inscrutable ash heaps.'
      },
      {
        skill: 'insight',
        text: "pierce the fog of lies spread by charlatans and madmen to discern the accursed truth driving the land's dreadful plight.",
        setting:
          'a cacophony of bickering madmen rending the air with their paranoid claims, dark shapes moving unseen behind warped shadows, the stench of rot pervading all.'
      },
      {
        skill: 'perception',
        text: "detect the signs of pursuit while fleeing the curse's toxic miasma, enemy agents and supernatural entities closing with every panicked step.",
        setting:
          'the deathly silence shattered by distorted howls from the black woods, glimpsed phantasms flitting between the copses of blighted trees, the cloying fog of decay shrouding all sight.'
      },
      {
        skill: 'knowledge',
        text: 'decipher the eldritch glyphs adorning the ancient vaults which imprison the curseweaver, their blasphemous sigils guarding profane lore.',
        setting:
          'a cyclopean catacomb of non-euclidean angles, the stench of burned flesh and ozone assaulting the senses, unseen forces slithering in the lightless depths.'
      },
      {
        skill: 'sleight of hand',
        text: "pilfer the priceless fragments of lore detailing the curse's unmaking from the clutches of the greedy black marketers profiting from the town's misery.",
        setting:
          'a verminous den of cutpurses and smugglers, every vice for sale amid the chaos, the reek of desperation and broken lives woven into the very fabric.'
      }
    ],
    hostiles: [
      {
        type: 'minor',
        text: "fend off the pack of feral, twisted beasts driven to ravenous madness by the pervasive curse's warp.",
        setting:
          'the tortured howls of the afflicted mutants splitting the air, their malformed bodies oozing foul ichor, the reek of rotted offal overwhelming.'
      },
      {
        type: 'major',
        text: "battle the procession of possessed townsfolk, their minds shattered from the curse's torment, intent on slaughter.",
        setting:
          'faces contorted in rictus of agony, eyes rolled back in madness, blistered hands clutching rusted blades, putrid flesh sloughing in sheets.'
      },
      {
        type: 'boss',
        text: 'confront the eldritch horror anchoring the wretched curse, its unfathomable presence warping all reality around it.',
        setting:
          'a hellish dimension of shrieking, non-euclidean geometries, laws of physics abandoned, the charnel stench of the damned upon sulphurous air.'
      },
      {
        type: 'minor',
        text: "cleanse the overrun hallways of the curse's blighted miasma, slaughtering the corrupted vermin swarming through the ruins.",
        setting:
          'crumbling masonry overgrown with pulsating, sentient mold colonies, corridors choked with the detritus of their decomposing victims, the incessant patter of innumerable skittering legs.'
      },
      {
        type: 'major',
        text: "defeat the elite cadre of the despot's dread enforcers, their zealotry fueled by the promise of immunity from the curse.",
        setting:
          'baroque cybernetic augments fused to withered flesh, the air supercharged with primal sorcery, monomolecular blades flensing the very air.'
      },
      {
        type: 'boss',
        text: 'bring down the gargantuan, nightmarish golem whose awakening has become the living epicenter of the ruinous curse.',
        setting:
          'the concussive tread of the towering construct shaking the earth, searing arcane energies discharging in waves with each thunderous step, the air ionized and rimed with frost.'
      },
      {
        type: 'minor',
        text: "purge the catacombs beneath the desecrated temple of the unnatural infestations spawned from the curse's tainted womb.",
        setting:
          'ossified corpses entombing chambers in their blasphemous piles, the reek of decaying pseudo-flesh cloying the air, the wet sounds of organic hunger echoing all around.'
      },
      {
        type: 'major',
        text: 'survive the ambush of the black market cult trafficking in foul curse-crafting components, their faith a path to annihilation.',
        setting:
          'profane sigils glowing balefully along blade and barrel, the ceremonial chants of fanatics clashing in frenzied discord, the stench of smoldering flesh from their blood offerings.'
      },
      {
        type: 'boss',
        text: 'halt the Neverborn entity that anchors the spreading curse, its perverse existence a scourge unto all life.',
        setting:
          "ethereal tendrils of corrosive ectoplasm lashing in from unseen dimensions, the doom-struck wails of the petrified and damned never ceasing, oblivion's chill breath stealing warmth itself."
      },
      {
        type: 'minor',
        text: "eliminate the marauder band preying on refugees fleeing the curse's domain, mercy absent from their dark agenda.",
        setting:
          'the acrid tang of spent gunpowder harsh on the tongue, shredded corpses strewn unceremoniously, mocking laughter ringing out from the scorched woodland.'
      },
      {
        type: 'major',
        text: "shatter the cordon of occult assassins sworn to defend the sanctum from where the curse's virulence is seeded.",
        setting:
          'runic circles glowing with malefic power scored into the very ground, cultists chanting in profane tongues, fell energies discharging in waves of pain.'
      },
      {
        type: 'boss',
        text: "confront the mad voidcaller whose summonings of cyclopean terrors is amplified by the curse's tumult into an extinction-level event.",
        setting:
          'reality itself fraying at the unbound edges like burning silk, apocalyptic energies building in aetheric crescendo, the threshold to the Outer Unnameable yawning ever wider.'
      }
    ]
  },
  'Decadent Locals': {
    text: 'The locals enjoy repulsive vices and shameful appetites, in the form of {the trafficking of forbidden substances|the provision of illicit entertainment|expert surgeons who perform experimental physical alterations}. They may have religious sanction for their evils, or neighbors might trade with them for such things, or they could be followers of some ideology that blesses such pursuits. Their economy or their social organization is usually heavily reliant on such traffic, and to ensure its continuance they may have made bargains with things worse than humans.',
    enemies: [
      { title: 'Trader in hideous sins' },
      { title: 'Bored gentry in search of a cruel thrill' },
      { title: 'Once-prey that has become an even worse predator' }
    ],
    friends: [
      { title: 'Local who has secret doubts about the vice' },
      { title: 'Crusader from outside' },
      { title: 'Escaped victim seeking vengeance' }
    ],
    complications: [
      "The victims of the vice are a class or type that their neighbors don't care about in the slightest",
      'They have ways to make their vices give them power',
      'Their society is attractive aside from this hideous urge'
    ],
    things: [
      'A stolen victim of great value to someone else',
      "Proof of an outside noble's trade with them",
      'Precious regalia used in the vice'
    ],
    places: [
      'Salon of hideous beauty',
      'Stinking slave pit',
      'Mundane locale of ordinary business tainted by their evil'
    ]
  },
  'Decaying Enchantment': {
    text: "A great magical enchantment has been a critical part of the community since its creation, but now it's beginning to decay. It may function only intermittently, now, or its effects may have curdled into something double-edged. The locals have no idea how to fix it, and indeed, it may not be possible to repair it with modern knowledge of sorcery.",
    enemies: [
      { title: 'Saboteur from an enemy community' },
      { title: 'Scavenger stealing critical components' },
      { title: 'Overconfident wizard attempting a ruinous repair' }
    ],
    friends: [
      { title: "One of the enchantment's hereditary keepers" },
      { title: "Native dependent on the enchantment's effects" },
      { title: 'Desperate researcher of repairs' }
    ],
    complications: [
      "Part of the community would greatly profit by the enchantment's failure",
      'The enchantment risks catastrophic eruption',
      'The rulers punish any talk of it failing'
    ],
    things: [
      'A critical repair text for the enchantment',
      'Valuable broken enchantment components',
      "Precious resources crystallized from the enchantment's energies"
    ],
    places: [
      'Control nexus for the enchantment',
      'Enterprise dependent on the enchantment',
      'Site of a enchantment failure or accident'
    ]
  },
  'Demihuman Populace': {
    text: "A particular breed of demihuman are either the majority here or have the dominant positions in the community. Architecture, local laws, and social customs are all tuned to suit them, and they may not be particularly forgiving or friendly to humans. Communities that are not outright independent usually make an arm's-length submission to a local lord.",
    enemies: [
      { title: 'Demihuman official who grudges baselines', monstrous: true },
      { title: 'Baseline local who grudges the demihumans' },
      { title: 'Outsider preying on the demihumans' }
    ],
    friends: [
      { title: 'Curious young native', youth: true, monstrous: true },
      { title: 'Canny local diplomat to humans', monstrous: true },
      { title: 'Native with a need for baseline help', monstrous: true }
    ],
    complications: [
      'Their human suzerain wants to erase all independence from them',
      "Something's legal here that's forbidden in baseline communities but natural to them",
      'Their independence is enforced with something they have'
    ],
    things: [
      'Precious demihuman-made goods',
      'Ancient relic revered by the natives',
      'Wealth of a prosperous outside trader'
    ],
    places: [
      'Holy site forbidden to humans',
      'House built to demihuman preferences',
      'Business unique to demihuman needs'
    ]
  },
  'Dueling Lords': {
    text: 'Two different major powers are fighting over control of the community. Two rival lords, a baron and a merchant-prince, the mayor and a local high priest, or some other combination struggle to achieve dominance. They may both have justifiable claim on running the community, or one may be a greedy interloper.',
    enemies: [
      { title: 'Third party profiting by the strife' },
      { title: 'Traitor to one of the rivals' },
      { title: 'Outsider vulture wanting both rivals to fail' }
    ],
    friends: [
      { title: 'Harried local peacemaker' },
      { title: 'Impotent judge appointed by a disinterested higher authority' },
      { title: 'Appealing partisan of one rival' }
    ],
    complications: [
      'The rival with the most legitimate claim is the least suitable to rule',
      'A vital civic task is left undone until a ruler is determined',
      'Both rivals have terrible plans'
    ],
    things: [
      'Token of legitimate rule',
      'Bribe meant for a powerful local',
      "Proof of a rival's malfeasance"
    ],
    places: [
      'Deadlocked city hall',
      'Site of mob violence between rival groups',
      'Tavern full of well-armed partisans'
    ]
  },
  'Enemy Within': {
    text: "The locals are convinced that there is some terrible threat against them working from within their society. It may be a matter of dark sorcerers, foreign spies, heretics, traitorous neighbors, shapeshifting monsters, or some other hidden evil. This evil may be a recent fear, or it may be an inherited peril they've always had to guard against. The danger itself may or may not exist, or if it exists it may not justify the steps being taken.",
    enemies: [
      { title: 'Local inquisitor targeting his personal enemies' },
      { title: 'Leader of the sinister evil' },
      { title: 'Traitorous local in service to the evil' }
    ],
    friends: [
      { title: 'Unjustly accused victim' },
      { title: 'Local ruler trying to restrain the mob' },
      { title: 'Skilled and discerning hunter of the evil' }
    ],
    complications: [
      'The evil is real but actually running the inquisition',
      'The hunters are creating the evil whether intentionally or no',
      'The evil really is exactly as bad as the hunters say it is'
    ],
    things: [
      'Confession naming perpetrators of the evil',
      'Wealth taken from condemned sinners',
      'Resources gathered by the agents of the evil'
    ],
    places: [
      'Confiscated home of an evildoer',
      'Public execution site for the wicked',
      'Courtroom where the evil is being tried'
    ]
  },
  'Faded Remnant': {
    text: "This community used to be much larger and more prosperous, but something happened relatively long ago that left it a shrunken shadow of its former self. Only a tithe of citizens remain on the site, and much of its former architecture is crumbling and abandoned. A few weathered tokens of old glory remain, and some may be jealously maintained, but there simply aren't enough locals left to keep up what they've inherited.",
    enemies: [
      { title: 'Looter seeking to plunder the remains' },
      { title: 'Zealot with a plan to return to glory' },
      { title: 'Outsider strongman who wants to coerce the locals into obedience' }
    ],
    friends: [
      { title: 'Learned scholar of the noble past' },
      { title: 'Hard-scrabble present survivor' },
      { title: 'New citizen who sees hope in the place' }
    ],
    complications: [
      "They don't fully understand what they've inherited",
      'They were crushed because of their past evils',
      "They're not the actual heirs but merely squatters who moved into the empty place"
    ],
    things: [
      'Artifact of the prior golden age',
      'Wealth hidden away long ago',
      'Secret key to unlocking new glory'
    ],
    places: [
      'Near-abandoned city center',
      'Massive decaying monument',
      'Partially fallen town wall'
    ]
  },
  'Fallen Prosperity': {
    text: 'The community used to be much richer, but something happened recently to crush its source of prosperity. Different factions of the community might be trying to grasp at the remaining dregs of wealth, others might try to restart the failed industry, and some might look for a new livelihood. Any group or entity thought responsible for the collapse is likely to be treated very harshly, and some locals might find profit in shifting the blame to their enemies.',
    enemies: [
      { title: 'Outside profiteer squeezing the newly-poor' },
      { title: 'Local monopolizing the remaining income' },
      { title: 'Demagogue blaming everything on their enemy' }
    ],
    friends: [
      { title: 'Plucky local trying to make a new go of things' },
      { title: 'Harried disburser of limited charity' },
      { title: 'Riches-to-rags native trying to maintain their dignity' }
    ],
    complications: [
      "Their loss is a rival's gain",
      "Someone's offering them a new industry at a terrible price",
      'The leadership is refusing to accept the new reality'
    ],
    things: [
      'Priceless relic of their former wealth',
      'Supplies vital to a budding industry',
      'Resources once held lightly that now are very precious here'
    ],
    places: [
      'Ill-maintained but splendid public building',
      'Mansion marked by genteel poverty',
      'Empty shop once catering to the rich'
    ]
  },
  'Foreign Enclave': {
    text: 'Either most or a substantial minority of the locals are descended from foreigners alien to their local neighbors. They may have been religious exiles, economic migrants, indigenous locals surrounded by the existing polity, or a foreign city conquered within the relatively recent past. The locals may not be enthusiastic about being ruled by others not of their kind, and their neighbors may look askance at the way foreign customs or even laws may be maintained.',
    enemies: [
      { title: 'Ruthless independence fighter', foreign: true },
      { title: 'Outsider ruler with no regard for the locals', foreign: true },
      { title: 'Local grandee preaching contempt for outsider ways' }
    ],
    friends: [
      { title: 'Peacemaking local leader' },
      { title: 'Local in love with an outsider' },
      { title: 'Pragmatic-minded outsider magistrate', foreign: true }
    ],
    complications: [
      'Secessionists are being supported by their co-ethnics',
      "The polity's leaders don't want them here",
      "They're hated by their co-ethnics for some reason"
    ],
    things: [
      'Precious relic brought from the homeland',
      'Wealth hidden away for fear of outsiders',
      'Valuable good made as a cultural tradition'
    ],
    places: [
      'Public building in an aggressively different architectural style',
      'Outsider home surrounded by local-style buildings',
      'Civic gathering place of a kind specific to the locals'
    ]
  },
  'Guild Oligarchy': {
    text: 'While the community might ostensibly be ruled by some other power, real control lies with the senior members of the local craft and labor guilds. Their decisions have the practical weight of law, and much of their time and effort is spent squeezing out competitors and parceling out economic opportunities in the community. Some guilds might have little or nothing to do with their original trade, and now exist purely as shells for political influence.',
    enemies: [
      { title: 'Profoundly corrupt guild boss' },
      { title: 'Ambitious newcomer with brutal methods' },
      { title: 'Ruthless leader of a guild of criminals' }
    ],
    friends: [
      { title: 'Hard-bitten elder among the workers', elder: true },
      { title: 'Outsider trying to make room here' },
      { title: 'Reformer seeking to oust the corrupt guild heads' }
    ],
    complications: [
      'The guilds have intermarried or entangled themselves with the ostensible rulers',
      'The guilds offer protection from a real or imagined threat',
      'The guilds hate each other only slightly less than the competition'
    ],
    things: [
      'Priceless symbolic guild regalia',
      'Wealth hidden by the former ruler of the community',
      'Money earned by shady business practices'
    ],
    places: ['Bustling guild hall', "Purely decorative ruler's court", "Shabby worker's housing"]
  },
  'Heavy Fortification': {
    text: "The community is remarkably well-fortified for a site of its size and role. Tall, stout walls, strong points inside the community, concentric defenses, a strategic terrain location, or a large body of standing troops might be present. Some threat is thought to exist that makes maintaining this fortification worthwhile, though it may come at a dear cost to the locals. The community's suzerain may be uncomfortable with these defenses, as they could just as easily be used to defy the ruler.",
    enemies: [
      { title: 'Outside enemy seeking to pierce the defenses' },
      { title: 'Rebel trying to declare independence' },
      { title: 'Heavy-handed local ruler demanding protection money' }
    ],
    friends: [
      { title: 'Industrious maintenance chief' },
      { title: "Ruler's appointed local military commander" },
      { title: 'Local warning of some sudden impending danger' }
    ],
    complications: [
      'The threat is gone but those who profit by the defenses keep them going',
      'The defenses are impractical',
      'The community can no longer bear the expense of the defenses'
    ],
    things: [
      'Components of a powerful fixed weapon',
      'Payroll for the soldiers',
      'Precious and specialized maintenance components'
    ],
    places: [
      'Oversized weapon emplacement',
      'Top of a looming city wall',
      'Stronghold keep at the center of the community'
    ]
  },
  'Hidden Ruler': {
    text: 'While the community has a public leader, the real authority is hidden from outsiders. This ruler may draw their authority from rationales unacceptable to outsiders, they may have cowed the public authority into obedience, or they may have a mutually beneficial private arrangement with the official ruler.',
    enemies: [
      { title: 'Secret cult-backed leader' },
      { title: 'Nefarious agent of an enemy power' },
      { title: 'Minor functionary who is actually the hidden master' }
    ],
    friends: [
      { title: 'Frustrated outside authority' },
      { title: 'Local seeking better government' },
      { title: "Victim of the hidden leader's will" }
    ],
    complications: [
      'Most people know that the real authority is concealed',
      'The hidden ruler is a mortal enemy of the legitimate authority',
      "The hidden ruler's effective authority is over a large affiliated group rather than the whole community"
    ],
    things: [
      'Information on the hidden government',
      'Bribe money paid to the public authority',
      'Blackmail material on important locals'
    ],
    places: [
      "Unassuming tavern that's a secret headquarters",
      'Tense court of the official ruler',
      'Hidden site where the secret government meets'
    ]
  },
  'Hostile Terrain': {
    text: 'The community is surrounded by dangerous terrain: miasmatic swamps, perilous crevasses, radioactive badlands, a pocket of corruption, or some other harmful topography. The community might prefer the defensive potential of the terrain here, or have found a precious resource worth the danger. The terrain might have formed at some time since the founding, with the citizens struggling to make terms with the new danger.',
    enemies: [
      { title: 'Bandit chief hiding in the terrain' },
      { title: 'Monstrous leader in the badlands', monstrous: true },
      { title: "Local who's made a secret deal with the terrain's vile inhabitants" }
    ],
    friends: [
      { title: 'Canny badland guide' },
      { title: 'Innocent researcher eager to explore' },
      { title: "Grizzled chief engineer of the community's anti-terrain measures" }
    ],
    complications: [
      'The terrain is growing somehow',
      'The terrain offers some special profit as well as danger',
      'The community is being crushed by the terrain'
    ],
    things: [
      'Treasure lost within the terrain',
      'Device that generates or protects against the terrain',
      'Precious resource found within the terrain'
    ],
    places: [
      'Edge of the community overtaken by the environment',
      'Building fortified against the terrain',
      'Tavern favored by terrain guides and explorers'
    ]
  },
  'Incompetent Leaders': {
    text: 'The community is led by one or more incompetents. While they must have been very good at something to have acquired the position, they are fundamentally incapable of leading. Uncontrolled passions or lusts, commitment to a hopelessly impractical ideal, pigheaded obstinacy in the face of failure, a total lack of charisma or interpersonal skills, or profound laziness might all unfit them for their post.',
    enemies: [
      { title: 'Heir who is totally unsuited to their new rule' },
      { title: 'Disinterested ruler forced on them by their overlord' },
      { title: 'Charismatic ninny with ridiculous plans' }
    ],
    friends: [
      { title: 'Deposed former leader' },
      { title: 'Desperate local elder', elder: true },
      { title: 'Victim of one of their bungled plans' }
    ],
    complications: [
      'An outside rival is backing the fool',
      'The idiot has tremendous institutional legitimacy',
      'They provide a critical skill or ability unrelated to ruling'
    ],
    things: [
      'Embezzled funds from a failed plan',
      'Precious artifact lost through incompetence',
      "Regalia of critical importance to the ruler's legitimacy"
    ],
    places: [
      'Chaotic and ill-kept court',
      'Site of abject disaster',
      'Plaza full of grumbling locals'
    ]
  },
  'Inherited Architecture': {
    text: "Many of the community's structures date back to the ancient past and a long-vanished culture. They have unique architectural traits, perhaps being made of some strange substance or with uncanny qualities. The locals find them too useful or too durable to destroy, but the buildings often have unpleasant little surprises in their under-explored corners, and there may be greater structures still buried by long ages beneath the community's streets.",
    enemies: [
      { title: 'A Thing from Below', monstrous: true },
      { title: 'Outside pillager bent on sacking the structures' },
      { title: 'Reckless explorer opening up things best left sealed' }
    ],
    friends: [
      { title: 'Heir to the ancient arts of maintenance' },
      { title: 'Chief of the local structure guard patrol' },
      { title: 'Keeper of a particularly useful structure' }
    ],
    complications: [
      'The locals mine treasures from the buried depths',
      'The structures were built by Outsiders',
      'They require dark sacrifices to keep functioning'
    ],
    things: [
      'Key to unlock a sealed structure',
      'Artifact of the ancient lost people',
      'Map to a hidden structure'
    ],
    places: [
      'Mundane business in a remarkable building',
      'Ancient structure retrofitted into a habitation',
      'Buried ancient street within a cavern'
    ]
  },
  'Inhuman Cooperation': {
    text: "The locals have a deal with some manner of inhuman power, either eldritch entities, nearby monstrous beings, or some other creature generally feared or hated by humans. It may actually be a peaceful exchange, but more likely it involves acts and sacrifices that other humans would refuse. If not secret, this deal is valuable enough to make the community's suzerain avert their eyes, or it may be a bargain so old that time has sanctified it to their neighbors.",
    enemies: [
      { title: "Sinister overseer of the bargain's price" },
      { title: 'Local magnate growing rich off the dark bargain' },
      { title: 'Alien entity seeking to expand the terms of the deal' }
    ],
    friends: [
      { title: "Victim of the bargain's price" },
      { title: 'Outside investigator seeking the truth' },
      { title: "Inveterate hunter of the entity's type come to purge the evil" }
    ],
    complications: [
      'The bargain is actually reasonably fair and decent',
      "The locals don't want the bargain but their neighbors profit by it and so force them into it",
      "However bad the creatures are they're actually better than the human lord"
    ],
    things: [
      'Valuable alien goods',
      'Wealth offered as a sacrifice',
      'Treasure gained by cooperation'
    ],
    places: [
      'Secret meeting hall for the creatures',
      'Prosperous front business',
      'Sinister ritual of sacrifice'
    ]
  },
  'Lawless Class': {
    text: "Some class of citizen is either tacitly or explicitly above the law. They may only be subject to punishment for crimes against their own kind, or they may be entirely immune to legal prosecution. In some cases, this immunity may be the product of official indifference rather than high status; some untouchable classes may be considered so lowly that their slaughter of each other isn't worth punishing unless it inconveniences their betters.",
    enemies: [
      { title: 'Professionally immune provocateur' },
      { title: 'Cruelly indulgent elite' },
      { title: 'Grasping mercantile oligarch' }
    ],
    friends: [
      { title: 'Hapless magistrate' },
      { title: 'Avenger outside the law' },
      { title: 'Victim of an un-punishable crime' }
    ],
    complications: [
      'The lawless themselves enforce the law',
      'The immune are most dangerous to each other',
      'Special servants of the immune also are immune'
    ],
    things: [
      'Wealth stolen from a hapless victim',
      'Evidence that an abuser is not legitimately part of the class',
      'Token that grants the bearer the same immunity'
    ],
    places: [
      'Courtroom where some cases are swiftly dismissed',
      'Site of a gaudily obvious exercise of immunity',
      'Shop where the business was ruined by their excesses'
    ]
  },
  'Magical Academy': {
    text: "While private tutelage of worthy apprentices can sometimes be had even in remote villages, this community is unusual in that it has an actual school dedicated to teaching magic. Such schools are usually small, with no more than a few dozen pupils, most of whom will fail for lack of talent or discipline. The instructors are rarely first-rate, usually serving only for the pay and status, but sometimes a genius sorcerer will find a reason to observe likely apprentices here. Given the unfortunate accident potential of the school, it's probably isolated or well-fortified.",
    enemies: [
      { title: 'Headmaster conducting forbidden research' },
      { title: 'Secretly monstrous school patron' },
      { title: 'Unpleasantly talented yet vicious elite student' }
    ],
    friends: [
      { title: 'Scholar wanting “field researcher” help' },
      { title: 'Concerned new instructor' },
      { title: 'Instructor with useful side obsession' }
    ],
    complications: [
      'The academy is patronized by the ruling class',
      'The community grew around the academy',
      "The rulers don't trust the wizards but find them too useful to get rid of them",
      'The school was once far more powerful and is filled with half-sour old magics',
      'The local ruler has a grudge against the school for expelling one of their relatives',
      'The school has a bad reputation from a student turned necromancer'
    ],
    things: [
      'Long-lost grimoire of power',
      'Brilliant artifice of a genius student',
      'Magical key to a dark power the academy keeps locked up'
    ],
    places: [
      'Battered magical laboratory',
      'Architecturally impossible chamber',
      'Grubby student lodgings'
    ]
  },
  'Miserable Penury': {
    text: 'Life is hard in most places, but it is exceptionally hard here. People are deprived of all but the barest necessities, and even the local gentry are impoverished compared to their peers elsewhere. Something is making the locals stay, however, whether fear of the alternative, hope for a better future, or a stubborn attachment to their ancestral lands.',
    enemies: [
      { title: 'Rapacious beggar-lord oppressing even poorer lessers' },
      { title: "Outsider who's siphoning off wealth" },
      { title: 'Brutal gang leader determined to take what they want' }
    ],
    friends: [
      { title: 'Local who wants to escape the slum' },
      { title: 'Charitable cleric' },
      { title: "Suzerain's envoy seeking to improve things" }
    ],
    complications: [
      'They could be richer if they abandon a defining cultural tradition',
      "They're being bled dry by outsiders",
      "They're hopelessly resigned",
      'Sorcerers use the slum denizens for experiments'
    ],
    things: [
      'A stash of wealth that would be minor elsewhere',
      'Desperately needed resources',
      "A cherished relic that had to be sold for survival's sake"
    ],
    places: [
      'Miserable slum of shanties',
      'Unprofitable fields',
      'Tavern with only the barest minimum of fare'
    ]
  },
  'Mistreated Blighted': {
    text: 'Not all Blighted are violent; many are simply cursed with disabilities or mental compulsions implanted in them by their creators. The locals here have a useful kind of Blighted that provides some valuable service; brute labor, companionship, or more awful fates for those with precious organic components. The locals treat them as nothing but expendable chattel, but the Blighted are unable to effectively defend themselves or survive without the support of their tormentors.',
    enemies: [
      { title: 'Bloodless local slaver' },
      { title: 'Faux-benevolent overseer' },
      { title: 'Reformer seeking a complete purge of them' }
    ],
    friends: [
      { title: 'Blighted leader', monstrous: true },
      { title: 'Troubled local' },
      { title: 'Native seeking to take over the work niche the Blighted are filling' }
    ],
    complications: [
      'The Blighted are emotionally addicted to this kind of servitude',
      'The Blighted could be very dangerous if they got free',
      'Criminals and the unwanted are transformed into the Blighted'
    ],
    things: [
      'Device that imposes the Blight on a victim',
      'Wealth earned by Blighted suffering',
      'Key to the method used to control the Blighted'
    ],
    places: [
      'Workhouse full of cruelly-used Blighted',
      'Stately mansion with rigidly-disciplined Blighted servants',
      'Sinister establishment staffed by disposable Blighted'
    ]
  },
  'Monstrous Tribute': {
    text: "The locals have cut a deal with some unspeakable entity, trading some vile tribute in exchange for the being's forbearance or assistance. Outsiders may be ignorant of the bargain, or they may know that the community is in thrall but be too fearful of its master to take action against them. The creature likely serves as a protector as well as a tyrant, so the locals may be content with the deal even if it doesn't offer any further inducement or aid.",
    enemies: [
      { title: 'Ancient artificial intellect-tyrant', monstrous: true },
      { title: 'Cruel sorcerer-lord' },
      { title: 'Monstrous quasi-god', monstrous: true }
    ],
    friends: [
      { title: 'Secret rebel against the deal' },
      { title: 'Investigator looking for evidence' },
      { title: 'Monstrous rival of the tyrant', monstrous: true }
    ],
    complications: [
      'They seize the tribute from their neighbors or enemies',
      'The deal is getting progressively worse',
      'Their neighbors are thinking of making their own deals'
    ],
    things: [
      'Ritual instruments forged via atrocity',
      'Forbidden book of hideous truths',
      'Precious resource generated by the entity'
    ],
    places: [
      'Secret shrine to their unholy master',
      'Prison where the tribute is kept',
      'Bustling town street full of sinister prosperity'
    ]
  },
  'Neglectful Ruler': {
    text: "The community can't rely on its ostensible suzerain. Whatever lord claims ownership of the place is indifferent to its troubles and pays no attention to its civic disorder. The lord may be incapable of giving help, or convinced their representative can handle it alone, or actively seeking to punish the community for some rebellion or failure of service.",
    enemies: [
      { title: 'A viceroy sending back false reports' },
      { title: 'Local grandee seizing control by violence' },
      { title: 'Cruel local lord who keeps the ruler pacified with tax money' }
    ],
    friends: [
      { title: 'Inspector from the suzerain' },
      { title: 'Local judge seeking justice' },
      { title: 'Harried representative in need of help' }
    ],
    complications: [
      'The ruler has too many problems to care about this place',
      'The ruler would actually make things worse if they paid heed',
      "The ruler's authority is being hindered by some rival power"
    ],
    things: [
      'Tax money not yet sent',
      "A “gift” meant to draw the lord's help",
      'Proof of a plot to seize control of the community'
    ],
    places: [
      'Deserted courtroom',
      'Street crawling with local vigilante groups',
      'Burnt-out home of a political loser'
    ]
  },
  'New Industry': {
    text: "The natives have established a new industry here, and it's making them a great deal of profit. Old patterns of authority and wealth are being disrupted, and the old gentry are unlikely to be pleased about it. They may be trying to take over the industry, or they may have been the ones to enable it in the first place and are using it to crush the life out of any rival power bases. Outsiders might be playing a major role as well, and it could be they plot to siphon off the profits.",
    enemies: [
      { title: 'Arrogant and ruthless new oligarch' },
      { title: 'Scheming old-money grandee' },
      { title: 'Grasping and heartless industrial magnate' }
    ],
    friends: [
      { title: 'Hopeful new entrepreneur' },
      { title: 'Local elder trying to deal with the change', elder: true },
      { title: 'Innocently naive outside investor' }
    ],
    complications: [
      'The gentry would prefer poverty to losing power',
      'The gentry are split on the industry',
      'The industry comes with severe and unequally-distributed downsides'
    ],
    things: [
      'Profit from the industry',
      'A valuable device to improve the industry',
      'Tools of sabotage'
    ],
    places: ['Retrofitted old workshop', 'Resource-extraction site', 'Crowded worker housing']
  },
  'Pilgrimage Site': {
    text: 'The community is centered around a major pilgrimage site. This may be a religious location of importance to a major faith, or it may be a more secular institution that draws the traffic, like a famous academy or the remains of some wondrous ancient work. Considerable local tension likely exists over controlling the access to the site and maximizing the profits from foreign visitors.',
    enemies: [
      { title: 'Outsider boss seeking to seize control of the site' },
      { title: 'Corrupt hereditary site controller' },
      { title: 'Rival saboteur bent on despoiling the site' }
    ],
    friends: [
      { title: 'Well-meaning pilgrim' },
      { title: 'Scholar with dangerous historical theories' },
      { title: 'Earnest caretaker of the site' }
    ],
    complications: [
      'The site can only handle so many visitors without degrading',
      'The pilgrimage site is dangerous',
      "The keepers don't fully understand the site"
    ],
    things: [
      'Precious relic of the site',
      'Beautifully-made fake of some critical relic',
      'Secret true history of the site'
    ],
    places: [
      'Expensive pilgrim lodgings',
      'Street full of hawkers of pilgrimage tokens',
      'Alien and wondrous pilgrimage site'
    ]
  },
  'Plagued City': {
    text: 'The community is cursed with recurrent spells of some troublesome disease. The affliction isn’t so fatal as to make living there impossible, but it adds suffering and expense to local lives. The plague might be the product of an ancient curse, the results of long-lost toxic remains, or an unavoidable byproduct of whatever industry or purpose justifies the city. It’s probably not overly contagious, but visitors may be in some peril all the same.',
    enemies: [
      { title: 'Charlatan selling false hope' },
      { title: 'Merciless grandee gladly worsening the plague for profit' },
      { title: 'Dark sorcerer seeking to weaponize the sickness' }
    ],
    friends: [
      { title: 'Traditional healer wise in the plague’s ways' },
      { title: 'Appealing waif struck down by the illness' },
      { title: 'Impassioned healer seeking a real cure' }
    ],
    complications: [
      'The plague has a positive side-effect',
      'Only certain classes suffer the plague',
      'Passage into or out of the community is strictly controlled'
    ],
    things: [
      'A real cure for the plague',
      'Hidden wealth of a plague victim',
      'The key to halting the cycle'
    ],
    places: [
      'Worn-down sickhouse full of locals',
      'Cemetery overflowing with the dead',
      'Business based on providing for a sufferer’s special needs'
    ]
  },
  'Population Boom': {
    text: 'A vast influx of newcomers has recently rushed into the community. They may have been drawn by economic opportunities, or fled some pursuing peril, or been forcibly moved there by a ruler who wanted to dilute the existing native cohesion. The natives may not have the resources or opportunities to integrate these newcomers, and it may be that the new population has no desire to stay longer than is necessary.',
    enemies: [
      { title: 'Viciously xenophobic grandee' },
      { title: 'Newcomer leader who despises the locals and their ways', foreign: true },
      { title: 'Grasping merchant exploiting one or both groups' }
    ],
    friends: [
      { title: 'Local trying to bridge differences' },
      { title: 'Newcomer trying to make a new life', foreign: true },
      { title: 'Local official trying to keep the peace' }
    ],
    complications: [
      'The newcomers act like conquerors',
      'Their cultures are extremely immiscible',
      'The natives are now highly dependent on newcomer industry'
    ],
    things: [
      'Precious relic brought by the newcomers',
      'Loot confiscated or extracted from the newcomers',
      'Riches earned from newcomer labor'
    ],
    places: [
      'Jarringly different newcomer quarter',
      'Market with informally segregated areas',
      'Tavern welcoming to only one group'
    ]
  },
  'Raider Scourge': {
    text: 'Almost every community has some problem with bandits and highwaymen, but this community is seriously plagued with raiders. One or more groups of persistent plunderers are hitting the community repeatedly, and they lack the necessary resources to fend them off or protect all their holdings.',
    enemies: [
      { title: 'Amoral captain of a bedraggled mercenary crew' },
      { title: 'Bitter village headman seeking food and revenge' },
      { title: 'Crazed but charismatic exiled noble turned bandit' },
      { title: 'Criminal outlaw with a cynical eye for profit' },
      { title: 'Local gang boss bent on squeezing his neighbors' },
      { title: 'Political rebel with very nominal interest in the cause' },
      { title: 'Rival polity\'s military officer on "unauthorized" raid' },
      { title: 'Runaway slave ready to take bloody revenge on all' }
    ],
    friends: [
      { title: 'Anguished spouse of someone killed by bandits' },
      { title: "Avenger who's grimly tracked the chief here" },
      { title: 'Escaped conscripted bandit camp follower' },
      { title: 'Escapee from a bandit atrocity in the wilds' },
      { title: 'Merchant suffering terribly from bandit depredations' },
      { title: 'Representative of local law in search of help' },
      { title: "Runaway bandit who couldn't stand the savagery" },
      { title: 'Worried relative of a forced bandit conscript' }
    ],
    complications: [
      'The "bandits" are bitter victims of the locals\' crimes',
      'The bandits are being bankrolled by rival neighbors',
      'The locals aid them in exchange for immunity',
      'Their depredations are for fun rather than necessity',
      'They have colorable legal authority for their thefts',
      "They hunt for something the locals won't give up",
      'They only look human, but have been darkly changed',
      'They plunder under the banner of a local religion'
    ],
    things: [
      'A precious heirloom of seemingly meager value',
      'A sacred relic meant to give luck to the bearer',
      'Cache of weapons and armor for local defense',
      'Deeds or paperwork of critical local significance',
      "Evidence of a local traitor's cooperation with them",
      "Hidden cache of the bandits' stolen loot",
      'Medicine or other good vital to local survival',
      'Money meant to pay for help in fighting the bandits'
    ],
    places: [
      'A "haunted" tower the bandits know is avoided',
      'Abandoned villa re-purposed to a camp',
      'Hidden cave where the bandits lair',
      'Massacre site for an ambushed caravan',
      'Rocky outcrop with a very defensible approach',
      'Still-smoking farmhouse burnt down by bandits',
      'Thickly-wooded hollow deep in the hills',
      'Unsavory way-inn where the bandits meet'
    ]
  },
  'Rebel Stronghold': {
    text: "The community is in tacit or open revolt against their supposed overlord. If it's distant from their suzerain's power centers or exceptionally well-fortified, they might be an open nest of rebels and provide overt support to their ruler's enemies. More vulnerable communities will provide shelter, secret support, and a base of supply for hidden bands of insurgents. Loyalist locals must keep their sympathies hidden or suffer the consequences.",
    enemies: [
      { title: 'Psychopathic but charismatic rebel leader' },
      { title: 'Savage rebel-suppressing general' },
      { title: 'Traitor leading the rebels to their doom' }
    ],
    friends: [
      { title: 'Idealistic rebel' },
      { title: 'Frightened local just trying to survive' },
      { title: 'Sympathetic outside mediator' }
    ],
    complications: [
      'One side of the dispute is correct but profoundly unsympathetic',
      'A rebel victory would ultimately be catastrophic',
      "The lord can't afford the disruption that violent suppression would create"
    ],
    things: [
      'Cache of valuable rebel supplies',
      'Tax money stolen by the rebels',
      'Secret rebel identities and plans'
    ],
    places: [
      'Rebel base hidden outside the community',
      'Tavern full of sympathizers',
      'Burnt house of a loyalist'
    ]
  },
  'Rigid Castes': {
    text: 'The locals are divided into several castes. They may be organized by social role, by imputed nobility of birth, by ethnic origins, or any other dividing principle, but they cannot imagine any other way of organizing themselves. A hierarchy of castes is not inevitable, but there will be social and legal limits applied to ensure that each caste remains fixed in its function. The outside world may or may not respect these distinctions when dealing with the locals.',
    enemies: [
      { title: 'Conqueror seeking to impose “civilized” castes on outsiders', foreign: true },
      { title: "Impostor who'll commit any crime to conceal their true caste" },
      { title: 'Abusive upper-caste grandee' }
    ],
    friends: [
      { title: 'Unfairly mistreated caste member' },
      { title: 'Determined reformer with a “better” caste plan' },
      { title: 'Outsider trying to undo the caste system' }
    ],
    complications: [
      'The castes are marked by ancient physiological alterations',
      'Even the low caste locals are convinced the tradition is right',
      "Exceptional money or talent can change a person's caste"
    ],
    things: [
      "Proof of a group's real caste",
      "Goods created by a caste's unpaid labors",
      'Sacred regalia only a certain caste can touch'
    ],
    places: [
      'Caste-divided residential quarters',
      'Temple dedicated to a caste',
      'Workshop of a caste'
    ]
  },
  'Scars of War': {
    text: 'The community is still bloodied by a recent violent conflict. A crushing bandit raid, a lost siege, getting caught at the periphery of a major battle, or some other calamity has inflicted severe damage on the place. Some communities may suffer a longer-term version of this, their youths lost in a grinding, endless battle against some perpetual threat.',
    constraints: { warfare: true },
    enemies: [
      { title: 'Savage tyrant left over from the fight', veteran: true },
      { title: 'Outsider taking advantage of their weakness' },
      { title: 'Native driven to extremes by their losses' }
    ],
    friends: [
      { title: 'Bedraggled survivor' },
      { title: "Outsider who's come to help" },
      { title: 'Relative of someone lost in the battle' }
    ],
    complications: [
      'The damage was mostly taken by one group',
      'The losses have thrown the old social order into chaos',
      'The locals are desperate to make the losses “worth it”'
    ],
    things: [
      'Plunder taken during the fight',
      'Wealth left behind by the dead',
      'A cache of treasure concealed by looters'
    ],
    places: [
      'Damaged half-occupied house',
      'Burnt-down civil structure',
      'Fields pocked with torched cottages'
    ]
  },
  'Seat of Rule': {
    text: 'Some important ruler or leading figure resides in the community. This may be the seat of a regional lord, or it could be the traditional residence of a high priest, great magus, merchant house, or other wielder of influence. The community itself may or may not be under their direct control, but the wishes of the august figure must be acknowledged by the locals.',
    enemies: [
      { title: 'Corrupted and venal ruling figure', veteran: true },
      { title: 'Conspiring usurper of the role' },
      { title: 'Vicious rebel against the ruler' }
    ],
    friends: [
      { title: 'Worried advisor to the ruler' },
      { title: 'Petitioner seeking help' },
      { title: 'Rebel against an unjust ruler' }
    ],
    complications: [
      'The ruler is a figurehead controlled by someone else',
      'The community is struggling to keep the seat',
      'The ruler is not legally recognized but everyone knows the reality of their influence'
    ],
    things: [
      'Riches brought to petition the ruler',
      'Ancestral ruling regalia',
      'Treasure hidden by a ruler of old'
    ],
    places: [
      'Grand and ancient audience hall',
      'Elaborate edifice now no longer used',
      "Public building related to the ruler's role"
    ]
  },
  'Secret Treachery': {
    text: "The community is in secret rebellion against their ostensible liege, having cut deals with his enemies, plotted to betray him for their own gain, or bridled under his tyranny and sought a better lord. The community's leadership is all in on this plot, and outside viceroys or representatives are being kept carefully ignorant of the reality. The common folk may be oblivious to the truth, though they'll doubtless have felt the same motivations and promptings that convinced their leaders to turn traitor.",
    enemies: [
      { title: 'Suspicious investigator from the tyrant' },
      { title: 'Scheming local chief who plans to be the new lord' },
      { title: 'Monstrous thing that they made a pact with', monstrous: true }
    ],
    friends: [
      { title: 'Local being cruelly mistreated by the tyrant' },
      { title: 'Honest representative trying to resolve the tension' },
      { title: 'Local grandee trying to stay out of it all' }
    ],
    complications: [
      'One of the leaders is a double agent waiting to roll all the traitors up',
      'The leaders disagree on methods',
      "There's more than one group of traitors who don't know about the others"
    ],
    things: [
      'Proof of the conspiracy',
      'Bribes intended for the leadership',
      'Relic smuggled in by an outside supporter'
    ],
    places: ['Smoky back room', 'Sullen public gathering', "Secret chamber in a leader's home"]
  },
  'Sinking City': {
    text: "The community was built atop something unstable, and now that substrate is crumbling. It may be swampy ground or a decaying coastline, or it could be an ancient buried city that's now giving way. In the case of some antique habitation, the denizens that once lived there might be boiling upward as their home is collapsing, or new opportunities may be revealed even as the community's present structure is ruined.",
    enemies: [
      { title: 'Unspeakable evil from below', monstrous: true },
      { title: 'Ruthless local causing damage for the sake of profit' },
      { title: 'Outside exploiter preying on the displaced' }
    ],
    friends: [
      { title: 'Struggling local defender' },
      { title: 'Native made homeless by the collapse' },
      { title: 'Curious explorer bent on discovering what lies beneath' }
    ],
    complications: [
      'The collapse was caused by someone',
      'Only the slums or the noble quarter collapsed',
      "The collapse hasn't happened yet but it's going to"
    ],
    things: [
      'Recently-uncovered treasure',
      'Vault buried when the building became a sinkhole',
      'Key to halt the collapse'
    ],
    places: ['Pit where a manor once was', 'Fallen city wall', 'Freshly-exposed underworks']
  },
  'Theocratic Authorities': {
    text: "Religious leaders are influential in almost any community, but here they make up the final authorities. It may be an explicit theocracy, with rule by the clerics of a particular faith, or a temple might be so important and powerful that the official leaders are helpless to resist its will. The locals can be expected to be loyal adherents to the faith, or else the less pious majority is deeply intimidated by the religion's believers.",
    enemies: [
      { title: 'Rebel backed by a rival religion' },
      { title: 'Heretical priest trying to usurp authority' },
      { title: 'Eldritch being masquerading as a heavenly envoy' }
    ],
    friends: [
      { title: 'Well-meaning but zealous priest' },
      { title: 'Insurgent against a wicked theocracy' },
      { title: 'Harried town leader trying to please the clerics' }
    ],
    complications: [
      'The theocrats are divided into struggling factions',
      "The theocracy is the result of the former regime's complete failure",
      "The priests don't want to lead but nobody else is acceptable to the people"
    ],
    things: [
      'Religious relic conferring the right to rule',
      'Precious sacred scripture',
      'Tithe gathered for the temple'
    ],
    places: [
      'Ornate and splendid temple',
      'Shrine room within an ordinary house',
      "Magistrate-priest's courtroom"
    ]
  },
  'Toxic Economy': {
    text: "The community is reliant on an industry or product that has toxic or negative side-effects as part of its production. The good is extremely valuable, or the community is extremely desperate, and the side effects are endured as a necessary evil. It may be that their neighbors or lord are forcing them to produce the good so that they aren't the ones suffering the cost.",
    enemies: [
      { title: 'Cruel sorcerer-merchant' },
      { title: 'Indifferent magnate wringing more production out of people' },
      { title: 'Trader in flesh who profits by the sick and feeble' }
    ],
    friends: [
      { title: 'Healer trying to cure the side-effect' },
      { title: 'Crippled local maimed by the product' },
      { title: 'Outside trader trying to soften the consequences of the trade' }
    ],
    complications: [
      'The side-effect only harms an expendable class of people',
      'The afflicted are isolated from the healthy',
      'The side-effect are social or economic rather than physical'
    ],
    things: [
      'A temporary protection from the toxin',
      'A load of the precious good',
      'A device that worsens the toxin but creates more of the good'
    ],
    places: [
      'Pesthouse full of the crippled',
      "Splendid mansion built off the product's profits",
      'Factory full of lethal fumes and effects'
    ]
  },
  'Trade Hub': {
    text: "The site is a major trade hub, connecting several important cities or resource production areas. It's probably at an important river juncture, ancient crossroads, or occupying the only safe path through some perilous wilderness. Its position may be important enough that it can survive on trade alone, despite being unable to feed itself with the surrounding land. Such hubs are usually heavily garrisoned by the lord who profits from their tariffs and taxes.",
    enemies: [
      { title: 'Cheating merchant prince' },
      { title: 'Corrupt judge or trade official' },
      { title: 'Grasping ruler with heavy taxes', veteran: true }
    ],
    friends: [
      { title: 'Confused foreigner with strange ways', foreign: true },
      { title: 'Dealer in some vital adventuring good' },
      { title: 'Exotic stranger in need of help' }
    ],
    complications: [
      'The locals trade with Outsiders or other entities normally shunned by humans',
      'The merchants effectively rule the city',
      'There are pockets of exotic cultures found nowhere else in the kingdom'
    ],
    things: [
      'Precious goods not produced in this land',
      'Map to some fabulous foreign treasure',
      'Gift intended for a local ruler'
    ],
    places: [
      'Bazaar full of alien speech',
      'Caravansary built in a foreign fashion',
      'Palace of conspicuous opulence'
    ],
    constraints: { urban: true }
  },
  'Unique Product': {
    text: 'The community produces something unique, a good or service that cannot be had anywhere else in the kingdom. This may be due to some unique resource found only there, or some carefully-guarded craft, or it may be a special service that can only be provided by the locals, who are somehow unique in their forms or abilities.',
    enemies: [
      { title: 'Magnate forcing more production at a grim cost' },
      { title: 'Tax collector seeking to squeeze further exactions' },
      { title: 'Rival saboteur planning to turn the product dangerous' },
      { title: 'Cunning merchant trying to steal the secret' }
    ],
    friends: [
      { title: 'Naive but superbly talented artisan' },
      { title: 'Innovator seeking to improve the product' },
      { title: 'Outside trader trying to protect their deal' },
      { title: 'Master artisan in need of ingredients' },
      { title: 'Curious scholar seeking the secret' }
    ],
    complications: [
      'The goods are dangerous or toxic to the users',
      'The goods require some morally-dubious ingredient',
      'The product is extremely useful to very unpleasant entities',
      'Multiple rulers claim rights over the community'
    ],
    things: [
      'A cache of the product',
      'The secret method of its production',
      'Valuable components used to make the product',
      'Payment for a shipment',
      'Valuable raw ingredients'
    ],
    places: [
      'Factory full of busy creators',
      'Resource extraction field where a vital component is gathered',
      'Market crowded with traders from far places',
      'Hushed workshop',
      'Hard-bargaining auction hall',
      'Hidden glen where the vital ingredient is grown'
    ]
  },
  'Upstart Faith': {
    text: "There's a relatively new religion in the community which is rapidly gaining power. It might be a sectarian offshoot of a major faith, the unique product of a new prophet, or an outside faith backed by wealthy and powerful foreign supporters. Depending on the demands made on believers, the new faith may be a matter of concern only to the existing clergy, or it might be a major flashpoint for conflict in the community.",
    enemies: [
      { title: 'False prophet gathering thralls' },
      { title: 'Hostile native cleric with dark plans' },
      { title: 'Outside manipulator profiting by the strife' }
    ],
    friends: [
      { title: 'Sincere new priest' },
      { title: 'Local trying to keep out of the crossfire' },
      { title: 'Existing cleric trying to make peace' }
    ],
    complications: [
      'The faith has very different teachings for inner and outer members',
      'The secular leadership backs the new faith to weaken the existing temples',
      'The faith has both sympathetic and unpleasant traits'
    ],
    things: [
      'Sacred relic of the new faith',
      'Temple relic stolen by new convert to the faith',
      'Tithe offered up by wealthy new convert'
    ],
    places: [
      'Hastily-made new temple',
      'Now-empty existing shrine',
      'Market with informal religious segregation'
    ]
  },
  'Widespread Prosperity': {
    text: 'The community is uncommonly rich, not only for the gentry but for the common citizens as well. They may produce a valuable good, oversee precious resource extraction, have special economic favors from the ruler, or simply have inherited a vast body of infrastructure. Their neighbors likely view them with envy, and outside raiders and exploiters find them an ideal target.',
    enemies: [
      { title: 'Cunning raider chieftain' },
      { title: 'Greedy overlord' },
      { title: 'Arrogant local ruler over-proud of their wealth', veteran: true }
    ],
    friends: [
      { title: 'Local being exploited for their wealth' },
      { title: "Agent of the local prosperity's maintenance" },
      { title: 'Outside trader trying to make an honest profit' }
    ],
    complications: [
      "The prosperity is coming at another community's cost",
      'Their rivals claim their prosperity is wholly undeserved',
      'The impending end of the prosperity is visible to all'
    ],
    things: [
      'Casually-stored riches',
      'Device that creates some critical infrastructure',
      'Cache of weapons meant to defend the wealth'
    ],
    places: [
      'Commoner neighborhood as opulent as that of the gentry of elsewhere',
      'Market full of luxuries',
      'Edifice of unusually advanced infrastructure'
    ]
  },
  'Xenophobic Locals': {
    text: 'The locals despise outsiders. For some “outsiders” may be natives of foreign lands, while others might have a grudge against anyone from outside the community. Almost every community has some degree of wariness toward strangers, but these locals have an active loathing, and the few outsiders allowed to trade or interact with them do so at a heavy disadvantage.',
    enemies: [
      { title: 'Utterly unfair local magistrate' },
      { title: 'Local magnate who abuses outside laborers' },
      { title: 'Leader who always paints outsiders in the worst possible light' }
    ],
    friends: [
      { title: 'Secretly curious local' },
      { title: 'Cruelly mistreated outsider living there' },
      { title: 'Grudging diplomat seeking a modus vivendi' }
    ],
    complications: [
      'They have a very good reason for hating strangers',
      'Their outsider neighbors hate them just as much',
      "They're the last remnant of their kind and fear being absorbed"
    ],
    things: [
      'Prized symbol of their people',
      'Wealth confiscated from an outsider',
      'Forbidden outsider objects kept sealed away'
    ],
    places: [
      'Cultural edifice devoted to the local past',
      'Tightly guarded city walls',
      'Architecture that only makes sense to the locals'
    ]
  }
}
