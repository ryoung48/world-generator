import { CommunityHooks } from '../types'

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
    text: "The community has a conflict with a neighboring community. This usually isn't part of a larger war, but is instead a personal animosity between them. It may be the community has suffered at their enemy's hands, or they may have been the ones applying the suffering. Constant low-level skirmishes and troublemaking go on between the two.",
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
    ]
  },
  'Blood Feud': {
    text: 'Two or more groups of citizens within the community hate each other. Their neighbors or the local law have kept things from too-overt violence, but members of the groups will constantly interfere with their rivals and cause whatever misery they can get away with. This hate may spring from recent events, or it may be an inherited spite from old wrongs.',
    enemies: [
      { title: 'Wholly unsympathetic group leader' },
      { title: 'Schemer seeking to exploit the feud' },
      { title: 'Ruler going to brutal excess to tamp it down' }
    ],
    friends: [
      { title: 'Reluctant participant in the feud' },
      { title: 'Local digging for the real truth of the quarrel' },
      { title: "Merchant who'd profit by a new peace" }
    ],
    complications: [
      'The groups were formerly the closest of allies',
      'One group is favored by local rulers',
      'One side is getting completely out of hand'
    ],
    things: [
      'A treasure the groups are fighting over',
      'Object of exculpating evidence',
      'Lost symbol of peaceful unity'
    ],
    places: ['Bloody back alleyway', 'Sabotaged business', 'Group-dominated tavern']
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
      { title: 'Crime boss taking blatant advantage of the corruption' }
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
      { title: 'Native profiting from the curse' }
    ],
    friends: [
      { title: 'Scholar seeking details of the blight' },
      { title: 'Stubborn curse survivor' },
      { title: 'Aspiring curse-lifter with a secret weapon' }
    ],
    complications: [
      'It has a profitable side effect',
      'It was meant to be a blessing',
      'It can be aimed by willing conspirators'
    ],
    things: [
      'A personal anti-curse ward',
      'Hidden wealth of a curse victim',
      'A means to lift the curse'
    ],
    places: [
      'Enterprise blighted by the curse',
      'Festival held to pray for mercy',
      "Ruin of a curse victim's home"
    ]
  },
  'Decadent Locals': {
    text: 'The locals enjoy repulsive vices and shameful appetites. They may have religious sanction for their evils, or neighbors might trade with them for such things, or they could be followers of some ideology that blesses such pursuits. Their economy or their social organization is usually heavily reliant on such traffic, and to ensure its continuance they may have made bargains with things worse than humans.',
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
      "The rulers don't trust the wizards but find them too useful to get rid of them"
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
      { title: 'Would-be ruler turned bandit chief' },
      { title: 'Rival agent backing the bandits' },
      { title: 'Traitorous native wielding the bandits against their enemies' }
    ],
    friends: [
      { title: 'Runaway ex-bandit' },
      { title: 'Embittered victim of their plundering' },
      { title: 'Merchant desperate for help' }
    ],
    complications: [
      'The bandits are cooperating with a local power bloc',
      'The bandits are a direct consequence of some local political decision',
      'Mustering military force would have dire political consequences'
    ],
    things: [
      'Plunder stolen by the bandits',
      'A shipment of some vital good that was waylaid',
      'Evidence of corroborators or informers'
    ],
    places: [
      'Scene of gory slaughter on the road',
      'Burnt farmstead outside the community',
      'Makeshift and dirty bandit camp'
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
      { title: 'Rival saboteur planning to turn the product dangerous' }
    ],
    friends: [
      { title: 'Naive but superbly talented artisan' },
      { title: 'Innovator seeking to improve the product' },
      { title: 'Outside trader trying to protect their deal' }
    ],
    complications: [
      'The goods are dangerous or toxic to the users',
      'The goods require some morally-dubious ingredient',
      'The product is extremely useful to very unpleasant entities'
    ],
    things: [
      'A cache of the product',
      'The secret method of its production',
      'Valuable components used to make the product'
    ],
    places: [
      'Factory full of busy creators',
      'Resource extraction field where a vital component is gathered',
      'Market crowded with traders from far places'
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
  'Warring Council': {
    text: 'There’s more than one leader in the community, but at least some of them are at each other’s throats. It might be a conflict between formal leadership and informal authorities, or it could be a struggle among civil officials. Their interests might diverge sharply, or it could be a personal grudge that’s boiled over. Outside threats and internal problems are likely being ignored until the power struggle is resolved.',
    enemies: [
      { title: 'Shadowy kingmaker bent on breaking resistance' },
      { title: 'Megalomaniacal new leader' },
      { title: '‘Owned’ leader forced to fight for his backers' }
    ],
    friends: [
      { title: 'Neutral leader seeking a resolution' },
      { title: 'Outside investigator looking to understand the situation' },
      { title: 'Local suffering from some trouble that’s being ignored' }
    ],
    complications: [
      'The most capable leader is also most at fault',
      'The struggle is being incited by an outside rival',
      'They’re arguing over a problem that seems insoluble'
    ],
    things: [
      'Blackmail on a leader',
      'Treasure being fought over',
      'Item that would resolve the struggle'
    ],
    places: [
      'Now-abandoned council room',
      'Site of a steadily-increasing problem',
      'Tavern stronghold of one of the combatants'
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
