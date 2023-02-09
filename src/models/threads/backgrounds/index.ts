import { hub__fillSite } from '../../regions/hubs'
import { Province } from '../../regions/provinces/types'
import { decorateText } from '../../utilities/text/decoration'
import { Background, BackgroundDetails } from './types'

export const backgrounds: Record<Background, BackgroundDetails> = {
  'ancient infrastructure': {
    context:
      'This #site# still has access to a functioning ancient {teleportation nexus|arcane essence distillation|arcane guardian constructs|community-wide climate control|subterranean hydroponic gardens|water purification system}.',
    enemies: [
      {
        alias: 'Abusive {ruler|official|noble} overusing the infrastructure',
        age: ['adult', 'middle age', 'old']
      },
      { alias: 'Foreign agent seeking to cause havoc', culture: 'foreign' },
      { alias: 'Reckless sorcerer seeking to steal its power' }
    ],
    friends: [
      { alias: 'Harried chief of the maintainers' },
      { alias: 'Fascinated foreign scholar', culture: 'foreign' },
      { alias: 'Merchant reliant on its use' }
    ],
    complications: [
      "The infrastructure's cruelly-costly maintenance is coming up",
      'The infrastructure is starting to fray',
      'The infrastructure was actually meant for a much more sinister purpose'
    ],
    things: [
      'an irreplaceable infrastructure component',
      'spare parts worth vast sums on the market',
      'a secret artifact that can control the infrastructure'
    ],
    places: [
      'near a dangerously energetic working zone',
      'at a secret hideout inside the infrastructure',
      'at a sanctified and holy control center'
    ]
  },
  'awful curse': {
    context:
      "This #site# has been cursed with some blight that makes life difficult, albeit not impossible. The curse is the result of {an offended sorcerer's vengeful enchantment|the wrath of an eldritch spirit|anomalous arcane distortion}.",
    enemies: [
      { alias: 'Charlatan offering false hope' },
      { alias: 'Local demagogue blaming a useful culprit' },
      { alias: 'Employer of the mercenary wizard who laid it' },
      { alias: 'Criminal whose vile act induced the curse' },
      { alias: 'Enchanted beast that exudes the curse naturally', monstrous: true },
      { alias: 'Local sorcerer acting out of spite and resentment' },
      { alias: "Spiteful local who enjoys a rival's cursed suffering" },
      { alias: 'Malign spirit possessing its victims', monstrous: true }
    ],
    friends: [
      { alias: 'Curious scholar seeking to study the curse' },
      { alias: "{Stubborn curse survivor|Innocent victim of the curse's effects}" },
      { alias: 'Brash outsider confident they can lift the curse' },
      { alias: 'Desperate local trying to lift the magical blight' },
      { alias: 'Guilty local who feels responsible for the malison' },
      { alias: 'Local unjustly blamed by neighbors for the curse' },
      { alias: 'Wretched soul who failed to lift the curse' }
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
      'a personal anti-curse ward',
      '{hidden wealth of a curse victim|the possessions of a rich victim of the curse}',
      'the artifact that can be used to lift the curse',
      'the evidence proving a person responsible for it',
      'the item that must be returned to lift the curse',
      'the magical belongings of a deceased curse-lifter',
      "the map to where the curse's focal item is buried",
      'the money paid to the person who laid the curse',
      'the relic that must be shattered to lift the curse'
    ],
    places: [
      'at a residence blighted by the curse',
      'at a festival held to pray for mercy',
      "at a ruin of a curse victim's home",
      "in a chamber where the curse's focal relics are held",
      "at a grim locale where locals suffered the curse's effect",
      'at the site of a crime that induced the curse'
    ]
  },
  'bad neighbors': {
    context:
      "The #site# has a grudge against one or more of its neighbors, and a steady low-level conflict is going on between them. This personal animosity stems from {past {suffering at their enemy's hands|conquests where the enemy was oppressed}|old wrongs long since lost in the mists of self-serving memory|fresh ambition on the part of {this #site#|the neighboring settlement}}.",
    enemies: [
      { alias: 'Foreign lord profiting by the quarrel' },
      { alias: 'Bitter zealot who demands violent action' },
      { alias: 'Real culprit seeking to hide their offense' }
    ],
    friends: [
      { alias: 'Despairing peacemaker of a shared faith' },
      { alias: 'Local with family from the rival' },
      { alias: 'Frustrated but helpless ruler' }
    ],
    complications: [
      '{This #site#|The neighboring settlement} seems at fault, but is actually less blameworthy',
      'The quarrel was started by a manipulative third party who wants both settlements weakened',
      'It was a minor dispute that is spiraling out of control',
      'The quarrel is the result of a ridiculous misunderstanding'
    ],
    things: [
      "proof of the culprit's guilt",
      'a weapons cache meant to start real bloodshed',
      'a treasure that would erase the cause of the dispute'
    ],
    places: [
      "near a dangerous no-man's-land between the communities",
      'at a burnt home of a sympathizer',
      'at a religious festival turned into a semi-riot',
      'at the disputed fields',
      'at the funeral of someone slain by the rivals'
    ]
  },
  'blood feud': {
    context:
      'Two important families have managed to bitterly offend each other, and a feud has racked the #site# as both struggle for influence.',
    enemies: [
      { alias: 'Ambitious clan head', age: ['middle age', 'old'] },
      { alias: 'Someone who mistakes a PC for a member of the enemy clan' },
      { alias: 'Someone prospering from the violence and discord' }
    ],
    friends: [
      { alias: 'Scion of one house in love with someone in the other', age: ['young adult'] },
      { alias: 'Peacemaking {priest|official}' },
      { alias: 'Local struggling to survive the fighting' }
    ],
    complications: [
      "A clan's leadership now depends on the fighting to legitimate their rule",
      'A cold tension is about to turn into a hot war if a recent crime is assigned to one clan',
      'One of the families have a history dabbling in dark sorcery',
      'Foreign agents are getting involved to back different sides',
      "The families are crippling the city's law enforcement and criminals are taking over",
      'Old debts of {blood|land} are preventing resolution',
      'A single gadfly is driving most of the conflict'
    ],
    things: [
      'plunder taken from ambush victims',
      'proof that the original slight was a fabrication',
      'a treasured family relic',
      'bribes paid to powerful local supporters',
      'evidence of outside agitation'
    ],
    places: [
      'at a fortified homestead',
      'near an ambush site outside the #site#',
      'near a riotous street brawl between partisans',
      'at a venomously polite meeting',
      'at a bloodstained wedding hall'
    ]
  },
  'brilliant innovation': {
    context:
      'Some local has come up with a wonderful new idea (a {magical innovation|new industrial process|new agricultural product|new use for what was thought to be ancient garbage}). Everyone around them is fighting for the chance to exploit this clever new plan.',
    enemies: [
      { alias: 'Grasping guild master', age: ['middle age', 'old'] },
      { alias: 'Overbearing local ruler', age: ['middle age', 'old'] },
      {
        alias: 'Local leader whose power is threatened by the innovation',
        age: ['adult', 'middle age', 'old']
      }
    ],
    friends: [
      { alias: 'Visionary supporter of the innovator' },
      { alias: 'Outside merchant seeking to profit by enabling the innovation' },
      { alias: 'Local leader whose constituency would profit from it' }
    ],
    complications: [
      'The innovation requires ingredients only adventurers can get',
      'The innovation is riskier than it seems',
      'The innovator is actually a con artist'
    ],
    things: [
      'a critical component for the innovation',
      "the trove of profit from the innovation's test run",
      'the vital planning and design documents'
    ],
    places: [
      'at an ambitious test zone for the innovation',
      'at the guildhall of upset locals',
      'at the tavern with locals fighting over the change'
    ]
  },
  'broken spirits': {
    context:
      "The locals are in a state of despair and dull apathy. They've lost the things that used to give them pride and hope, with the best among them carrying on out of habitual duty and the worst giving ready hands to shameful deeds and ignoble acts. No one really believes the future can be better, and most seek only to satisfy immediate appetites.",
    enemies: [
      { alias: 'Cruel tyrant who broke them' },
      { alias: 'Slaver trading on the hopeless' },
      { alias: 'Merchant of despair and its costly escapes' }
    ],
    friends: [
      { alias: 'Determined local leader' },
      { alias: 'Proud rememberer of better days', age: ['old'] },
      { alias: 'Furious rebel against the world' }
    ],
    complications: [
      'An outside power wants to keep them safely broken',
      'Their fall was due to their own sins and errors',
      'They could be very dangerous if they regain their spirit',
      'Trusted leaders have been {imprisoned|lost}',
      'Trusted friends have betrayed them to their enemies',
      'Their leaders are too weak to aid their people',
      'Former internal strife has reduced them to misery'
    ],
    things: [
      'a symbolic item of former glory',
      'resources to kickstart a new source of pride',
      'treasure laid up in splendid times'
    ],
    places: [
      'at a crumbling monument to a past victory',
      'at a "wealthy" town area that\'s shabby and ill-kept',
      'at an empty temple to a once-loved god'
    ]
  },
  'buried ruins': {
    context: `This #site# was built on top of old ruins ({built over accidentally|intentionally buried|excavation in progress}). {Secret passages|Long-forgotten portals} lead down into it, and only a short space away from ordinary human life the ruin seethes with sinister secrets. Criminals and the most bitterly impoverished sometimes use these ruins for shelter, or for scavenging the lost treasures of the ancients. Sometimes they find things that follow them back into the light.`,
    enemies: [
      { alias: `Reckless adventurer stirring up things beneath` },
      { alias: `Person enslaved by a buried evil` },
      { alias: 'Criminal lord of the undercity' },
      { alias: '{Cult leader|Sorcerer} who uses the undercity for privacy' }
    ],
    friends: [
      { alias: `Passage-wise urchin`, age: ['childhood', 'adolescence'] },
      { alias: `Architect with too much curiosity` },
      { alias: `Itinerant monster hunter` }
    ],
    complications: [
      `The structure's inhabitants have a secret deal with the ruin dwellers`,
      `Time-delayed catastrophe will happen after the ruin's opened`,
      `There is a buried evil that appears as some remarkably valuable object`,
      `The ruins are forbidden by local authorities`,
      'The ruin entrances are in buildings owned by dangerous criminals'
    ],
    things: [
      `a key to open the hidden passage below`,
      `treasure hidden in the ruin in ages past`,
      `an ancient relic the ruin was made to contain`,
      'the belongings of an unfortunate explorer'
    ],
    places: [
      `in a passage hidden behind now-crumbling construction`,
      `at a forgotten and long-buried {ruin|temple}`,
      `in a {building's basement|sewage system} that twists and warps under the influence of the ruins`
    ]
  },
  'corrupt laws': {
    context:
      'What law exists here {is for sale|does not apply to certain favored {groups|castes}}. While some degree of corruption and noble license exists almost everywhere, this #site# lacks any shred of impartiality. Strangers might be fleeced by local lawmen, evildoers can be absolved by a payment, and powerful gentry do as they please.',
    enemies: [
      { alias: 'Immensely venal magistrate' },
      { alias: 'Local lord who fails to see any problem with the "natural" order' },
      { alias: 'Crime boss taking blatant advantage of the corruption' }
    ],
    friends: [
      { alias: 'A crusading law enforcer' },
      { alias: 'Royal investigating censor' },
      { alias: 'Victim of a cruel injustice' }
    ],
    complications: [
      "The favored class are vital to this #site#'s security",
      'The natives would rather pay predictable bribes than risk facing real justice',
      'The real law is enforced by a secret group of natives'
    ],
    things: [
      'an uncollected pile of bribe money',
      'stolen goods yet unsold',
      'blackmail evidence on the chief magistrate'
    ],
    places: [
      'at a courtroom where the law is sold',
      'at the crime scene with an unconcerned criminal',
      'at the site of brutal vigilante justice'
    ]
  },
  'criminal bosses': {
    context:
      '{A single cohesive criminal network has|Multiple splintered criminal networks have} a powerful influence on this #site#. They {are said to control all crime within this #site#|use this #site# as a safe haven from which to direct their minions elsewhere}. Local law enforcement may know all about them, but lack the strength to confront them.',
    enemies: [
      { alias: 'Blatantly overt criminal chief' },
      { alias: 'Well-controlled head of law enforcement' },
      { alias: 'Crime boss bent on using the PCs as tools' }
    ],
    friends: [
      { alias: 'Victim of an untouchable boss' },
      { alias: 'Determined bounty hunter' },
      { alias: 'Ambitious criminal seeking to make room above' }
    ],
    complications: [
      "The crime boss' support is what keeps this #site# prosperous",
      'Local government is almost openly staffed by cartel members',
      "The locals will not deal with officials for fear of the boss' anger",
      'Bloody confrontations are common as rival groups fight for turf',
      'The criminals have a sympathetic cause as champions of the downtrodden'
    ],
    things: [
      "a boss' secret stash of wealth",
      'a treasure stolen elsewhere and brought here by a boss',
      'evidence proving one boss is betraying another'
    ],
    places: [
      'at an uncharacteristically opulent home in the slums',
      'at a dangerous tavern for local minions',
      'in the subterranean market where criminals congregate'
    ]
  },
  'cultural center': {
    context:
      'This #site# {produces a wonderful cultural artifact ({exceptional cloth|artistic luxury goods|scholarly literature})|trains famous artists ({painters|chefs|sculptors|musicians|scholars})}.',
    enemies: [
      { alias: 'Master artist who suffers no rivals' },
      { alias: '"Visionary" who wants to tear down the old art for their own new one' },
      { alias: 'Merchant who is trying to control the production for profit' }
    ],
    friends: [
      { alias: 'Ambitious young artist of profound talent' },
      { alias: 'Wild genius of very difficult temperament' },
      { alias: 'Aged master proud of #possessive# tradition', age: ['old'] }
    ],
    complications: [
      'The art requires resources that are running low',
      'Some other group is cheaply and poorly mimicking the art',
      'Their main market has somehow been cut off'
    ],
    things: [
      'a famous and ancient work of art',
      'an art object made of some priceless substance',
      'an art object encoded with a precious secret'
    ],
    places: [
      'at a busy {studio|academy hall}',
      'at a mercantile emporium where the cultural products are traded',
      "at a renegade artist's hovel"
    ]
  },
  'dark cult': {
    context: `A hidden, dark cult resides within this #site#. What distinguishes this cult from the plethora of other local religious traditions is its bloody offerings and malign intentions.`,
    enemies: [
      { alias: 'Amoral scholar experimenting with the divine' },
      { alias: 'Decadent noble bored with more mundane perversions' },
      { alias: 'Despised local who made a pact to avenge mistreatment' },
      { alias: 'Heir to a family tradition of dark and bloody worship' },
      { alias: "Local priest who's tapped into a new power" },
      { alias: "Religious reformer who's bringing a bloody cleansing" },
      {
        alias: 'Ruthless hierarch who leads the cult for #possessive# own aims',
        age: ['middle age']
      }
    ],
    friends: [
      { alias: 'Apostate from the cult who was shocked to revulsion' },
      { alias: "Community elder who's seen this happen before", age: ['old'] },
      { alias: 'Escapee from a hideous cult ritual' },
      { alias: 'Ghost of a cult victim seeking revenge' },
      { alias: 'Inquisitor serving the prominent local religion' },
      { alias: 'Local official being pressured by the cult' },
      { alias: "Relative of a cult victim who wouldn't submit to them" }
    ],
    complications: [
      'The cult has a blithely innocent outer membership',
      'The cult has no patron, only a sorcerous trickster',
      'The cult is being backed by a hostile foreign power',
      'The cult is being used as a tool by a local noble',
      'The cult is blocking an even worse dark entity',
      'The cult is intimately tied to the local identity and past',
      'The cult provides a vital service to desperate locals',
      "The cult's leader is trying to mitigate the faith's evil",
      'The cult is preparing for a sinister ritual that needs to be interrupted'
    ],
    things: [
      'a cure for some curse the cult has inflicted',
      'a perhaps poorly-encrypted membership list',
      "a precious heirloom taken from the cult's last victim",
      'ancient sacrificial offerings to the dark god',
      'blackmail material against a local ruler or official',
      "the key that can unlock the dark god's true power",
      'the sacred book of the cult, vital to its rituals',
      "the vile idol which is the source of the cult's magic"
    ],
    places: [
      'at an abandoned ancient shrine once dedicated to the god',
      'at a bloody grove in the wild consecrated to their deity',
      'at an elegant salon where powerful cultists meet',
      'at the local festival with a hidden, horrible rite at its heart',
      'at a local temple taken over by cult members',
      'at a {prison|brothel|infirmary} with easily-had prey',
      'in a subterranean hollow dug out by cultists of old',
      'at a {vice den|tenement} reeking of human desperation'
    ]
  },
  'deadly plague': {
    context:
      'There are always small outbreaks of disease going on in any major settlement, but recently a truly savage affliction has wracked this #site#.',
    enemies: [
      { alias: 'Charlatan selling false hope' },
      { alias: 'Merciless grandee gladly worsening the plague for profit' },
      { alias: 'Dark sorcerer seeking to weaponize the sickness' },
      { alias: 'Adept of a plague-worshipping cult' }
    ],
    friends: [
      { alias: "Traditional healer wise in the plague's ways" },
      { alias: 'Appealing local struck down by the illness' },
      { alias: 'Impassioned healer seeking a real cure' },
      { alias: 'Bureaucrat trying to keep order' }
    ],
    complications: [
      '{The plague is magical in nature|The deceased reanimate if not burned immediately}',
      'The plague drives some victims violently mad with delirium',
      'Passage into and out of this #site# is strictly controlled'
    ],
    things: [
      'a real cure for the plague',
      'the hidden wealth of a plague victim',
      'a bribe offered to quarantine officials'
    ],
    places: [
      'at a worn-down infirmary full of locals',
      'at a cemetery overflowing with the dead',
      'at a crowded corpse-burning yard',
      'at a temple full of fervent worshippers praying for health'
    ]
  },
  'decadent locals': {
    context:
      'The locals enjoy repulsive vices and shameful appetites, which {are protected by religious sanction|they openly sell to neighboring communities}. Their {economic|social} organization is heavily reliant on such traffic, and to ensure its continuance they may have made bargains with things worse than humans.',
    enemies: [
      { alias: 'Trader in hideous sins' },
      { alias: 'Bored gentry in search of a cruel thrill' },
      { alias: 'Once-prey that has become an even worse predator' }
    ],
    friends: [
      { alias: 'Local who has secret doubts about the vice' },
      { alias: 'Crusader from outside' },
      { alias: 'Escaped victim seeking vengeance' }
    ],
    complications: [
      "The victims of the vice are a class that their neighbors don't care about in the slightest",
      'They have ways to make their vices give them power',
      'Their society is attractive aside from this hideous urge'
    ],
    things: [
      'a stolen victim of great value to someone else',
      "proof of an outside noble's trade with them",
      'precious regalia used in the vice'
    ],
    places: [
      'at a salon of hideous beauty',
      'at the stinking slave pit',
      'at a mundane locale of ordinary business tainted by their evil'
    ]
  },
  'decaying enchantment': {
    context:
      "A great magical enchantment has been a critical part of this #site# since its creation ({fertile lands|protective wards}), but now it's beginning to decay. {It functions only intermittently now|Its effects may have curdled into something double-edged}. The locals have no idea how to fix it, and indeed, it may not be possible to repair it at all.",
    enemies: [
      { alias: 'Saboteur who wants the enchantment to fail' },
      { alias: 'Scavenger stealing critical components' },
      { alias: 'Overconfident wizard attempting a ruinous repair' }
    ],
    friends: [
      { alias: "One of the enchantment's hereditary keepers" },
      { alias: "Native dependent on the enchantment's effects" },
      { alias: 'Desperate researcher of repairs' }
    ],
    complications: [
      "Part of this #site# would greatly profit by the enchantment's failure",
      'The enchantment risks catastrophic eruption',
      'The rulers punish any talk of it failing'
    ],
    things: [
      'a critical repair text for the enchantment',
      'valuable broken enchantment components',
      "precious resources crystallized from the enchantment's energies"
    ],
    places: [
      'at a control nexus for the enchantment',
      'at an enterprise dependent on the enchantment',
      'at the site of an enchantment {failure|accident}'
    ]
  },
  'despotic lord': {
    context:
      "Some brutal master lords over this #site#, crushing any hint of resistance and demanding extravagant service from the locals. The lord has not been deposed because {everyone is terrified of the lord's potential revenge|spies and informers are everywhere in the area|the greater government is firmly behind the lord|the last attempt ended in a horrible massacre|the lord is paying off vital persons in the community|the only good rebel leader is imprisoned by the lord}.",
    enemies: [
      { alias: 'Grossly decadent lord who taxes people unmercifully' },
      { alias: 'Conqueror who rules their new lands like a pillager' },
      { alias: 'Sadistic lord who simply delights in causing pain' },
      { alias: 'Usurper of the true lord who rules with an iron fist' },
      { alias: 'Depraved lord who seizes the young and fair' }
    ],
    friends: [
      { alias: 'Cynical kingmaker who has no further use for them' },
      { alias: 'Government official worried about the events here' },
      { alias: "Noble relative who'd be the next in line to rule here" },
      { alias: 'Rebel leader trying to depose the oppressor' },
      { alias: 'Religious leader who wants to protect their flock' },
      { alias: 'Rival lord who hates them for an old offense' },
      { alias: 'Relative of the lord who hates them bitterly', relative: true },
      { alias: 'Vengeful spirit of someone they unjustly slew', monstrous: true }
    ],
    complications: [
      "Rival successors threaten civil war at the lord's ouster",
      "The lord has to keep this up or they'll lose vital support",
      'The lord is holding back an even worse outside threat',
      'The lord is much loved by their regional overlord',
      'The strongest opposition to the lord is a very bad individual'
    ],
    things: [
      'the list of rebels',
      'the wealth the lord uses to pay #possessive# henchmen',
      'the magical artifact the tyrant uses to keep control',
      "proof for the king of the lord's unfitness to rule",
      'taxes collected from the cruelly-downtrodden people',
      'an item of regalia that gives legitimacy to the ruler',
      'ancient text that has a secret the lord craves to know',
      'a precious gift sent in an attempt to curry favor'
    ],
    places: [
      'at gallows hill',
      'in the back room of a tavern where conspiracies are plotted',
      'at the barracks of brutish and abusive mercenary soldiers',
      'at a forest camp of bitter bandit-rebels',
      'at a market plagued with bullying minions of the lord',
      'at a scourged hamlet of oppressed peasants',
      'at an opulent estate'
    ]
  },
  'enemy within': {
    context:
      "The locals are convinced that there is some terrible threat against them working from within their society ({dark {sorcerers|cultists}|shapeshifting monsters|foreign spies}). This evil is {a very recent manifestation that the community has never seen before|an inherited peril they've always had to guard against}.{|Rumor has it that the danger is fabricated.|The steps taken to quell this threat would be considered extreme by most.}",
    enemies: [
      { alias: 'Local inquisitor targeting #possessive# personal enemies' },
      { alias: 'Leader of the sinister evil' },
      { alias: 'Traitorous local in service to the evil' }
    ],
    friends: [
      { alias: 'Unjustly accused victim' },
      { alias: 'Local ruler trying to restrain the mob' },
      { alias: 'Skilled and discerning hunter of the evil' }
    ],
    complications: [
      'The evil is real but actually running the inquisition',
      'The hunters are creating the evil whether intentionally or not',
      'The evil really is exactly as bad as the hunters say it is'
    ],
    things: [
      'a confession naming perpetrators of the evil',
      'wealth taken from condemned sinners',
      'resources gathered by the agents of the evil'
    ],
    places: [
      'at a confiscated home of an evildoer',
      'at a public execution site for the wicked',
      'at the courtroom where the evil is being tried'
    ]
  },
  'ethnic tensions': {
    context:
      'Two ethnic groups within the #site# hate each other due to {recent events|inherited spite from old wrongs}. {Their neighbors|The local law} have kept things from too-overt violence, but members of the groups will constantly interfere with their rivals and cause whatever misery they can get away with.',
    enemies: [
      { alias: 'Wholly unsympathetic group leader' },
      { alias: 'Schemer seeking to exploit the feud' },
      { alias: 'Ruler going to brutal excess to tamp it down' },
      { alias: 'A failure seeking meaning through their noble cause' },
      { alias: 'Enraged victim of the crime of a rival group member' }
    ],
    friends: [
      { alias: 'Local digging for the real truth of the quarrel' },
      {
        alias:
          'Merchant {who would profit by a new peace|trying to hold together an inter-group deal}'
      },
      { alias: 'Grizzled guard captain trying to beat back the riots' },
      {
        alias: '{Inter-group couple trying to dodge their own kindred|Local of a mixed ethnicity}'
      },
      { alias: '{Survivor of a brutal pogrom by their rivals|Reluctant participant in the feud}' },
      { alias: 'Outside official desperately trying to hold it together' },
      { alias: 'Religious leader trying to calm their furious flock' }
    ],
    complications: [
      'The conflict is driven by religious differences',
      'One group is favored by local rulers',
      'One sub-group is bitterly set on bloody revenge',
      'The unrest is driven by a malevolent outsider ({dark cult|necromancer)',
      'A rival power is using the strife to weaken the land',
      'Both sides are deeply unsympathetic to observers',
      'The strife is cyclical, and most expect it to end soon',
      'The strife is rapidly building to open warfare'
    ],
    things: [
      'a treasure the groups are fighting over',
      '{old document showing the truth of a divisive event|proof of the real culprit of an outrageous crime|the remains of victims "disappeared" by their rivals}',
      'a lost symbol of peaceful unity',
      'an arms cache meant for use in the conflict',
      'an infant kidnapped from a leader of the rival group',
      "a {magic item one group uses for defense of its people|sacred relic of one group's revered past}",
      'wealth stolen from a rich member of a rival group'
    ],
    places: [
      'at {a bloody back alleyway|the site of a brutal crime committed by one group}',
      'at a sabotaged business',
      'at {a group-dominated tavern|an ethnic meeting hall for festivals and planning}',
      'at a local shrine defiled by opponents',
      'at a building elaborately adorned by ethnic decorations',
      'at a multi-ethnic wedding rife with suppressed violence',
      "at a monument to one group's past glorious victory",
      'at a hidden wilderness camp of zealous extremists',
      'near a {burnt-out ethnic street after a neighborhood riot|torchlight parade route of violent protesters}',
      'in a guarded ghetto quarter of a worried minority'
    ]
  },
  'evil sorcerer': {
    context: 'A malign sorcerer plagues this #site# ({necromantic|eldritch|druidic}).',
    enemies: [
      { alias: 'Beast-breeding creator of magical abominations' },
      { alias: 'Bitter renegade thrown out of their magical academy' },
      { alias: 'Diabolical artificer-sorcerer using people for parts' },
      { alias: 'Gifted local wizard embittered against the people' },
      { alias: 'Half-crazed wizard who pacted with the foul spirits' },
      { alias: 'Ruthless court wizard plotting subtly to seize power' },
      { alias: 'Sorcerer-agent of an enemy power' },
      { alias: 'Sorcerous high priest of their own demented cult' }
    ],
    friends: [
      { alias: "The sorcerer's terrified apprentice who regrets their work" },
      { alias: 'A lover who was {spurned|twisted} by the sorcerer' },
      { alias: "A victim of the wizard's favorite magical tricks" },
      { alias: 'A witch-hunter mercenary in need of extra help' },
      { alias: "The wizard's old mentor who seeks to correct them", age: ['old'] },
      { alias: 'A community priest who protests against the wizardry' },
      { alias: "A local hedge-wizard who can't hope to defeat them" },
      { alias: 'A bitter rival sorcerer who sees the PCs as useful pawns' }
    ],
    complications: [
      'Only the live, cooperative sorcerer can undo a curse',
      'Several sorcerers make up the occult cabal',
      "The sorcerer has a legal right to do what they're doing",
      'The sorcerer has {bribed|coerced} local cooperation',
      'The sorcerer protects as well as exploits the people',
      "The sorcerer's harmless, and being framed by a foe",
      "The sorcerer's help is crucial to local authorities",
      "The sorcerer's intentions are of the best, if not their acts"
    ],
    things: [
      'a grimoire of dark rituals',
      'hidden wealth of a cursed victim',
      'mounds of tribute offered up to the sorcerer',
      'a relic of an ancient archmage who lived in the area',
      'a runaway experiment of vital importance to the sorcerer',
      'the ancient key to unlock an artifact of the sorcerer',
      "the object that is the focus of the sorcerer's power",
      "the text containing the sorcerer's secret weakness"
    ],
    places: [
      "at a refurbished sorcerer's tower in the wilderness",
      'at an ancient ruin re-purposed for the sorcerous activity',
      'in a dark corner where slavers sell stock to the sorcerer',
      "at an elegant country villa staffed with the sorcerer's minion",
      "in a ruler's palace where the sorcerer has taken quarters",
      "at a temple where the sorcerer's prey seek sacred safety",
      'in a warped trans-dimensional pocket domain'
    ]
  },
  'faded remnant': {
    context:
      "This community used to be much larger and more prosperous, but something happened relatively long ago that left it a shrunken shadow of its former self. Only a tithe of citizens remain on the site, and much of its former architecture is crumbling and abandoned. A few weathered tokens of old glory remain, and some may be jealously maintained, but there simply aren't enough locals left to keep up what they've inherited.",
    enemies: [
      { alias: 'Looter seeking to plunder the remains' },
      { alias: 'Zealot with a plan to return to glory' },
      { alias: 'Outsider strongman who wants to coerce the locals into obedience' }
    ],
    friends: [
      { alias: 'Learned scholar of the noble past' },
      { alias: 'Hard-scrabble present survivor' },
      { alias: 'New citizen who sees hope in the place' }
    ],
    complications: [
      "They don't fully understand what they've inherited",
      'They were crushed because of their past evils',
      "They're not the actual heirs but merely squatters who moved into the empty place"
    ],
    things: [
      'an artifact of the prior golden age',
      'wealth hidden away long ago',
      'a secret key to unlocking new glory'
    ],
    places: [
      'at a near-abandoned city center',
      'at a massive decaying monument',
      'at a partially fallen town wall'
    ]
  },
  'fallen prosperity': {
    context:
      'This #site# used to be much richer, but something happened recently to crush its source of prosperity. the different factions of this #site# seek to either grasp at the remaining dregs of wealth, to restart the failed industry, or look for a new livelihood. Anyone thought responsible for the collapse is treated very harshly, and some locals might find profit in shifting the blame to their enemies.',
    enemies: [
      { alias: 'Outside profiteer squeezing the newly-poor' },
      { alias: 'Local monopolizing the remaining income' },
      { alias: 'Demagogue blaming everything on their enemy' }
    ],
    friends: [
      { alias: 'Plucky local trying to make a new go of things', age: ['young adult'] },
      { alias: 'Harried disburser of limited charity' },
      { alias: 'Riches-to-rags native trying to maintain their dignity' }
    ],
    complications: [
      "Their loss is a rival's gain",
      "Someone's offering them a new industry at a terrible price",
      'The leadership is refusing to accept the new reality'
    ],
    things: [
      'a priceless relic of their former wealth',
      'supplies vital to a budding industry',
      'resources once held lightly that now are very precious here'
    ],
    places: [
      'at an ill-maintained, but splendid public building',
      'at a mansion marked by genteel poverty',
      'at an empty shop once catering to the rich'
    ]
  },
  'foreign enclave': {
    context:
      '{Most|A substantial minority} of the locals are descended from foreigners ({religious exiles|economic migrants|war-ravaged refugees|recent conquerors}) alien to their local neighbors. Their neighbors may look askance at the way foreign customs or even laws may be maintained.',
    enemies: [
      { alias: 'Ruthless independence fighter', culture: 'foreign' },
      { alias: 'Outsider ruler with no regard for the locals' },
      { alias: 'Local grandee preaching contempt for outsider ways', culture: 'native' }
    ],
    friends: [
      { alias: 'Peacemaking local leader' },
      { alias: 'Local in love with an outsider', culture: 'native' },
      { alias: 'Pragmatic-minded outsider magistrate' }
    ],
    complications: [
      'There is a secessionist movement being supported by co-ethnics',
      "The polity's leaders don't want them here",
      'The denizens of the enclave are wealthy and the locals are jealous',
      'The foreign enclave is very poor and a major source for criminals'
    ],
    things: [
      'a precious relic brought from the homeland',
      'wealth hidden away for fear of outsiders',
      'a valuable good made as a cultural tradition'
    ],
    places: [
      'at a public building in an aggressively different architectural style',
      'at an outsider home surrounded by local-style buildings',
      'at a civic gathering place of a kind specific to the locals'
    ]
  },
  'great famine': {
    context:
      'The #site# is suffering from a widespread scarcity of food. Settlement rulers fear the ensuing mobs of hungry commoners.',
    enemies: [
      { alias: 'Bandit warlord intercepting all the incoming food' },
      { alias: 'Local witch convinced that human sacrifice will propitiate the gods' },
      { alias: "Agent of an enemy power who's destroyed the fields" },
      { alias: "Furious sorcerer who's cursing the fields to wither" },
      { alias: 'Heartless official rerouting all the food elsewhere' },
      { alias: "Military officer who's requisitioning everything edible" },
      { alias: "Rich merchant who's legally seized the granaries" }
    ],
    friends: [
      { alias: 'Wizened local priest praying for mercy from above', age: ['old'] },
      {
        alias: '{Itinerant bureaucrat offering aid|Local official struggling to help their charges}'
      },
      { alias: 'Merchant trying to bring in food supplies from afar' },
      { alias: 'Food smuggler with a sympathetic temperament' },
      { alias: 'Hedge wizard seeking a way around the famine' },
      { alias: 'Orphaned child of a famine-stricken family', age: ['childhood'] },
      { alias: 'Starving peasant farmer in search of aid' },
      { alias: 'Philanthropic nobleman' }
    ],
    complications: [
      'The famine is caused by a curse',
      'Cannibalism has become quietly normal here',
      'The famine was caused by a contagious plant disease and what little food remains must be burnt before it spreads',
      'The crops were destroyed in the field by enemies',
      'The #site# is collapsing into famine-driven strife',
      'Aid is only being distributed to the politically reliable'
    ],
    things: [
      'a hidden cache of grain',
      'a magical object that creates large amounts of food',
      'a pillaged caravan of food aid',
      'an ancient treasure able to buy a vast sum of food',
      'precious belonging that was traded for bread',
      'a hidden stockpile of grain laid down by rebels',
      'a written trade agreement that would bring in food',
      'a contractual claim on a large shipment of food',
      'stolen alms-gold set aside to buy food for the poor'
    ],
    places: [
      'at {an empty storehouse|a barren market}',
      'at a black market selling food meant for relief',
      'at a church filled with people praying for divine help',
      'near a riotous center for distribution of food and alms',
      'at a withered field where even the shoots have been eaten'
    ]
  },
  'guild oligarchy': {
    context:
      'While this #site# might ostensibly be ruled by some other power, real control lies with the senior members of the local craft and labor guilds. Their decisions have the practical weight of law, and much of their time and effort is spent squeezing out competitors and parceling out economic opportunities in this #site#. Some guilds might have little or nothing to do with their original trade, and now exist purely as shells for political influence.',
    enemies: [
      { alias: 'Profoundly corrupt guild boss', age: ['old', 'middle age'] },
      { alias: 'Ambitious newcomer with brutal methods' },
      { alias: 'Ruthless leader of a guild of criminals', age: ['old', 'middle age'] }
    ],
    friends: [
      { alias: 'Hard-bitten elder among the workers', age: ['old'] },
      { alias: 'Outsider trying to make room here' },
      { alias: 'Reformer seeking to oust the corrupt guild heads' }
    ],
    complications: [
      'The guilds have {intermarried|entangled} themselves with the ostensible rulers',
      'The guilds offer protection from a {real|imagined} threat',
      'They guilds hate each other only slightly less than the competition'
    ],
    things: [
      'priceless symbolic guild regalia',
      'wealth hidden by the former ruler of this #site#',
      'money earned by shady business practices'
    ],
    places: [
      'at a bustling guild hall',
      "at a purely decorative ruler's court",
      "at a shabby worker's residence"
    ]
  },
  'heavy fortification': {
    context:
      "This #site# is remarkably well-fortified for a site of its size and role ({well-maintained walls|strategic terrain location|large body of standing troops}). Some threat is thought to exist that makes maintaining this fortification worthwhile, though it may come at a dear cost to the locals. This #site#'s suzerain may be uncomfortable with these defenses, as they could just as easily be used to defy the ruler.",
    enemies: [
      { alias: 'Outside enemy seeking to pierce the defenses' },
      { alias: 'Rebel trying to declare independence' },
      { alias: 'Heavy handed local ruler demanding protection money' }
    ],
    friends: [
      { alias: 'Industrious maintenance chief' },
      { alias: "Ruler's appointed local military commander" },
      { alias: 'Local warning of some sudden impending danger' },
      { alias: 'Visiting military observer' }
    ],
    complications: [
      'The threat is gone, but those who profit by the defenses keep them going',
      'The defenses are impractical',
      'This #site# can no longer bear the expense of the defenses'
    ],
    things: [
      'components of a powerful fixed weapon',
      'payroll for the soldiers',
      'precious and specialized maintenance components'
    ],
    places: [
      'at an oversized weapon emplacement',
      'at the top of a looming city wall',
      'near a stronghold keep at the center of this #site# '
    ]
  },
  'hidden ruler': {
    context:
      'While this #site# has a public leader, the real authority is hidden from outsiders. This hidden ruler {has cowed the public authority into obedience|has a mutually beneficial private arrangement with the official ruler}.',
    enemies: [
      { alias: 'Secret cult-backed leader' },
      { alias: 'Nefarious agent of an enemy power' },
      { alias: 'Minor functionary who is actually the hidden master' }
    ],
    friends: [
      { alias: 'Frustrated outside authority' },
      { alias: 'Local seeking better government' },
      { alias: "Victim of the hidden leader's will" }
    ],
    complications: [
      'Most people know that the real authority is concealed',
      'The hidden ruler is a mortal enemy of the legitimate authority',
      "The hidden ruler's effective authority is over a large affiliated group rather than the whole community"
    ],
    things: [
      'information on the hidden government',
      'bribe money paid to the public authority',
      'blackmail material on important locals'
    ],
    places: [
      "at an unassuming tavern that's a secret headquarters",
      'at a tense court of the official ruler',
      'in a hidden site where the secret government meets'
    ]
  },
  'hostile terrain': {
    context:
      'This #site# is surrounded by dangerous terrain that {the locals are now experts at navigating|has recently arisen, with the citizens struggling to make terms with the new danger}.',
    enemies: [
      { alias: 'Bandit chief hiding in the terrain' },
      { alias: 'Monstrous leader in the wilderness', monstrous: true },
      { alias: "Local who's made a secret deal with the terrain's vile inhabitants" }
    ],
    friends: [
      { alias: 'Canny wilderness guide' },
      { alias: 'Innocent researcher eager to explore' },
      { alias: "Grizzled chief engineer of this #site#'s anti-terrain measures" }
    ],
    complications: [
      'The terrain is growing somehow',
      'The terrain offers some special profit ({defensive|economic}) as well as danger',
      'This #site# is being crushed by the terrain'
    ],
    things: [
      'treasure lost within the terrain',
      'a device that {generates|protects} against the terrain',
      'precious resource found within the terrain'
    ],
    places: [
      'at the edge of this #site# overtaken by the environment',
      'at a building fortified against the terrain',
      'in a tavern favored by terrain guides and explorers'
    ]
  },
  'incompetent leaders': {
    context:
      'This #site# is led by incompetents. While they must have been very good at something to have acquired the position, they are fundamentally incapable of leading and {are prone to {uncontrolled lust|profound laziness|pigheaded obstinacy in the face of failure}|are committed to a hopelessly impractical ideal|have a total lack of interpersonal skills}.',
    enemies: [
      { alias: 'Heir who is totally unsuited to their new rule' },
      { alias: 'Disinterested ruler forced on them by their overlord' },
      { alias: 'Charismatic fool with ridiculous plans' },
      { alias: 'Blindly devoted servant' },
      { alias: 'Secret power behind the throne' },
      { alias: 'An enraged local aristocrat' }
    ],
    friends: [
      { alias: 'Deposed former leader' },
      { alias: 'Desperate local elder', age: ['old'] },
      { alias: 'Victim of one of their bungled plans' },
      { alias: 'Relative who wants to save the leader from themselves' },
      { alias: 'Itinerant bureaucratic official' }
    ],
    complications: [
      'An outside rival is backing the fool',
      'The idiot has tremendous institutional legitimacy',
      'They provide a {critical skill|ability} unrelated to ruling',
      'The incompetent would be a splendid leader if he were not being misled'
    ],
    things: [
      'embezzled funds from a failed plan',
      'a precious artifact lost through incompetence',
      "regalia of critical importance to the ruler's legitimacy",
      'proof that someone else was meant to be leader',
      "proof that the leader's advisors are corrupt"
    ],
    places: [
      'at a chaotic and ill-kept court',
      'at the site of abject disaster',
      'at a plaza full of grumbling locals',
      'at a decaying and unrepaired wall',
      'at an untended farm field'
    ]
  },
  'inherited architecture': {
    context:
      "Many of this #site#'s structures date back to the ancient past and a long-vanished culture with unique architectural traits. The locals find them too {useful|durable} to destroy, but the buildings often have unpleasant little surprises in their under-explored corners, and there may be greater structures still buried by long ages beneath this #site#'s streets.",
    enemies: [
      {
        alias: 'A Thing from below',
        monstrous: true
      },
      { alias: 'Outside pillager bent on sacking the structures' },
      { alias: 'Reckless explorer opening up things best left sealed' }
    ],
    friends: [
      { alias: 'Heir to the ancient arts of maintenance' },
      { alias: 'Chief of the local structure guard patrol' },
      { alias: 'Keeper of a particularly useful structure' }
    ],
    complications: [
      'The locals mine treasures from the buried depths',
      'The structures were built by Outsiders',
      'They require dark sacrifices to keep functioning'
    ],
    things: [
      'the key to unlock a sealed structure',
      'an artifact of the ancient lost people',
      'a map to a hidden structure'
    ],
    places: [
      'at a mundane business in a remarkable building',
      'at an ancient structure retrofitted into a habitation',
      'near a buried ancient street within a cavern'
    ]
  },
  'invading army': {
    context:
      'There is an army in the area, and it has little inclination to be gentle with the locals.',
    enemies: [
      { alias: 'Amoral mercenary captain hired to take this locality' },
      { alias: 'Bloodthirsty brute ordered to root out local guerrillas' },
      { alias: 'Decadent officer whose men savagely abuse local' },
      { alias: 'Disreputable chief of a band of deserters' },
      { alias: 'Honorable, but ruthless officer of the enemy forces' },
      { alias: 'Officer who treats the locals as free slave labor' }
    ],
    friends: [
      { alias: 'Agent of the rival forces looking for supporters' },
      { alias: "Deserter from the antagonist's forces" },
      { alias: 'Do-gooder bandit chief who raids hostile forces' },
      { alias: 'Local peasant driven out of their home by looters' },
      { alias: 'Merchant whose trade routes have been cut by war' },
      { alias: 'Priest seeking to protect their flock from soldiers' }
    ],
    complications: [
      'Local guerrillas are inciting brutal reprisals',
      'Many of the local youth have {run off to join|been conscripted into} the army',
      'The army is bringing a great sickness',
      'The army plunders, and is under very bad discipline',
      "The army's eating out all available provisions",
      "The army's interfering with vital agricultural work",
      'The local community has sustained heavy losses in fighting'
    ],
    things: [
      "blackmail sufficient to control an army's leader",
      'a bundle of vital intelligence stolen from one side',
      'a lost supply train with vital equipment and provisions',
      "a payroll chest for the army's soldiers",
      'treasure left concealed by a fleeing local grandee',
      'a vital cache of grain for winter that the locals concealed'
    ],
    places: [
      'at a burnt-out swath where the army has passed',
      'at a fortified {estate|strong point} held by soldiers',
      'at a hidden camp of {deserters|enemy scouts}',
      'at a hospital where sick and wounded are being tended',
      'at a military camp with soldiers and camp followers',
      'at a place of a gory battle, still strewn with destruction',
      'at a tavern hushed with fear of forced conscription',
      'at a torched field scattered with the dead of the farm'
    ]
  },
  'lawless chaos': {
    context:
      'Local authority has broken down entirely in this area. Whatever authority remains no longer has an effective monopoly on violence, and the citizens here are forced back on their own resources to preserve themselves and their property.',
    enemies: [
      { alias: 'Bandit chief working with local criminals to take over' },
      { alias: 'Clan head who wants it all for #possessive# kinsmen' },
      { alias: 'Crazed religious leader with a sinister creed' },
      { alias: 'Cynical merchant prince grabbing for control here' },
      { alias: 'Dark sorcerer who sees a lot of loose spare parts' },
      { alias: 'Idealistic rebel leader who seeks justice in blood' },
      { alias: 'Noble lord too important for anyone to lawfully resist' },
      { alias: 'Ruthless mercenary leader who sees their chance' }
    ],
    friends: [
      { alias: 'Former guard now the last of #possessive# detachment' },
      { alias: 'Hard-pressed local official trying to keep order' },
      { alias: 'Local elder desperate for a new source of stability', age: ['old'] },
      { alias: 'Merchant looking for protection from the chaos' },
      { alias: "Retired official who's aghast at the situation" },
      { alias: "Rioter who now regrets what the situation's come to" },
      { alias: 'Visiting noble trying to help the locals regain order' }
    ],
    complications: [
      'A monstrous criminal got loose during the confusion',
      'A neighboring rival is encouraging the chaos',
      'An incompetent official is making things worse',
      'The bloodshed is producing undead and dark spirits',
      'The chaos is drawing brigands and worse to the place',
      'The government plans to restore order savagely'
    ],
    things: [
      'a dark magical icon that is worsening the trouble',
      'a {symbol of legitimate rule that would calm many|holy relic that would give a side legitimacy}',
      'a tax shipment that never reached the suzerain',
      'an arms cache sufficient to shift the local balance',
      "documents proving the guilt of the chaos' instigator",
      'much-needed food sacked from a merchant caravan',
      'treasure plundered during the confusion'
    ],
    places: [
      "at a broken-into merchant's store, looted to the floor",
      'at a burnt-down government {office|palace}',
      'at a deserted court with its files strewn and burnt',
      'at an empty barracks that should be holding soldiers',
      'at a fortified neighborhood with paranoid defenders',
      'on a street smeared with the remnants of a bloody riot',
      'at a torched storehouse once filled with food'
    ]
  },
  'magical academy': {
    context:
      'While private tutelage of worthy apprentices can sometimes be had even in remote villages, this community is unusual in that it has an actual school dedicated to teaching magic. This shool typically has no more than a few dozen pupils in attendance at any time, most of whom will fail for lack of talent or discipline. The instructors are rarely first-rate, usually serving only for the pay and status, but sometimes a genius sorcerer will find a reason to observe likely apprentices here.',
    enemies: [
      { alias: 'Headmaster conducting forbidden research', age: ['middle age', 'old'] },
      { alias: 'Secretly monstrous school patron', monstrous: true },
      { alias: 'Unpleasantly talented, yet vicious elite student' }
    ],
    friends: [
      { alias: 'Courageous apprentice', age: ['young adult'] },
      { alias: 'Concerned new instructor', age: ['adult', 'middle age'] },
      { alias: `Scholar wanting "field researcher" help` }
    ],
    complications: [
      'The academy is patronized by the ruling class',
      'This #site# grew around the academy',
      "The rulers don't trust the wizards, but find them too useful to get rid of them",
      'The school was once far more powerful and is filled with half-sour old magics',
      'The local ruler has a grudge against the school for expelling his son',
      'The school has a bad reputation from a student turned necromancer'
    ],
    things: [
      'a long-lost grimoire of {power|forbidden lore}',
      'a brilliant artifice of a genius student',
      'a magical key to a dark power the academy keeps locked up'
    ],
    places: ['at a battered magical laboratory', 'in a hushed classroom', 'in an austere dormitory']
  },
  'malignant slum': {
    context:
      'Every major urban center has its poor quarters, but most ordinary urban slums are still inhabited by hard-working men and women who keep a certain order amid the squalor and who would bristle at being thought in any way less civilized than their high-quarter neighbors. That is not the case here. This slum is a cess of misery, depravity, and brutal violence, where the strong dominate the weak and the only recourse is a sharp blade.',
    enemies: [
      { alias: 'Rapacious beggar-lord oppressing even poorer lessers' },
      { alias: "Outsider who's siphoning off wealth" },
      { alias: 'Brutal gang leader determined to take what they want' }
    ],
    friends: [
      { alias: 'Local who wants to escape the slum' },
      { alias: 'Charitable cleric' },
      { alias: "Suzerain's envoy seeking to improve things" }
    ],
    complications: [
      'Sorcerers use the slum denizens for experiments',
      "They're being bled dry by outsiders",
      "They're hopelessly resigned"
    ],
    things: [
      'a stash of wealth that would be minor elsewhere',
      'desperately needed resources',
      "a cherished relic that had to be sold for survival's sake"
    ],
    places: [
      'at a miserable slum of shanties',
      'at a tavern with only the barest minimum of fare',
      'in a subterranean undercity'
    ]
  },
  'martial tradition': {
    context:
      'The #site# is {famous for its numerous knightly orders and many journey here to seek out their martial expertise|plagued by countless groups of mercenary bands in service to whatever magnate can afford to pay}.',
    enemies: [
      { alias: 'Ruthlessly amoral military leader' },
      { alias: 'Outsider using the locals as brute muscle', culture: 'foreign' }
    ],
    friends: [
      { alias: 'Determined local defender' },
      { alias: 'Petitioner in need of their prowess' },
      { alias: 'Idealistic military commander' }
    ],
    complications: [
      'The soldiers are remnants of a former {official|rebel|religious} army',
      "They've bled themselves white in gaining glory",
      'The soldiers hardly ever actually fight as compared to taking bribes to walk away'
    ],
    things: [
      'plunder taken in a victorious conflict',
      'a venerated battle harness of a legendary hero',
      "proof of a band's impending treachery against their employers"
    ],
    places: [
      'near a busy training ground',
      'at a cemetery with many memorials',
      'at a fortress decorated with the banners of the vanquished'
    ]
  },
  'monstrous tribute': {
    context:
      "The locals have cut a deal with some unspeakable entity, trading some vile tribute in exchange for the being's {forbearance|assistance}. Outsiders {are ignorant of the bargain|know that this #site# is in thrall but be too fearful of its master to take action against them}.",
    enemies: [
      { alias: 'Ancient artificial intellect-tyrant', monstrous: true },
      { alias: 'Cruel sorcerer-lord' },
      { alias: 'Monstrous quasi-god', monstrous: true }
    ],
    friends: [
      { alias: 'Secret rebel against the deal' },
      { alias: 'Investigator looking for evidence' },
      { alias: 'Monstrous rival of the tyrant', monstrous: true }
    ],
    complications: [
      'They seize the tribute from their neighbors or enemies',
      'The deal is getting progressively worse',
      'Their neighbors are thinking of making their own deals'
    ],
    things: [
      'ritual instruments forged via atrocity',
      'a forbidden book of hideous truths',
      'precious resources generated by the entity'
    ],
    places: [
      'at a secret shrine to their unholy master',
      'near a prison where the tribute is kept',
      'near a bustling town street full of sinister prosperity'
    ]
  },
  'natural disaster': {
    context:
      'A recent natural disaster has ravaged this #site#. Further horrors are inevitable if steps are not taken to contain the situation and aid the survivors.',
    enemies: [
      { alias: 'Bandit chief controlling the only road into the area' },
      { alias: "Clan leader who exploits others for their own kin's aid" },
      { alias: 'Dark {magical|elemental} entity released by the disaster' },
      { alias: 'Demagogue who blames an unpopular group for it' },
      { alias: 'Foreign agent who wants to promote the suffering', culture: 'foreign' },
      { alias: 'Incompetent official who thinks only of their own safety' },
      { alias: 'Mercenary captain selling "protection" from the chaos' },
      { alias: 'Sorcerer who caused this to advance their own magic' }
    ],
    friends: [
      { alias: "Escapee who dodged the Antagonist's dark plans" },
      { alias: 'Local official struggling to cope with the disaster' },
      { alias: "Local somehow blamed for the disaster's intensity" },
      { alias: 'Merchant trying to organize relief from the disaster' },
      { alias: 'Religious leader whose flock is scourged by it' },
      { alias: 'Someone whose {family|land} was ruined by it' },
      { alias: 'Spirit of an unquiet, unburied victim of the calamity', monstrous: true }
    ],
    complications: [
      'An official is profiting cruelly on the suffering here',
      'Higher government is unable to give any assistance',
      'Looters and the vengeful are taking advantage of it',
      'The locals were totally unprepared for the disaster',
      'The disaster has revealed some lode of great treasure',
      'The disaster will strike again soon, much worse',
      'The disaster wrecked something they need to survive',
      'The disaster was an arcane disruption'
    ],
    things: [
      "a cursed magical item that's calling forth the disaster",
      'a great pile of plunder collected by looters in the chaos',
      'vital supplies needed by survivors',
      "a rich merchant's savings he was trying to get out",
      'the relic that will prevent the disaster from worsening',
      "treasure revealed by the disaster's scathing",
      'wealth buried in a disaster-ruined structure'
    ],
    places: [
      'at a building full of the dead who thought it was safe',
      'at a country estate wrecked by the disaster',
      'in a desolate {village|neighborhood} emptied by flight',
      "in a neighborhood ruined by the disaster's consequences",
      'at a once-splendid building left in ruins by the calamity',
      'at a refugee camp with miserable escapees from the disaster',
      'on a road crowded with desperate escapees from the calamity',
      'at a revealed ancient ruin'
    ]
  },
  'neglectful ruler': {
    context:
      "This #site# can't rely on its ostensible suzerain, who is indifferent to its troubles and pays no attention to its civic disorder. The lord is convinced that {they are incapable of giving help|their representative can handle it alone|the populous deserves to be punished for past grievances}.",
    enemies: [
      { alias: 'A representative sending back false reports' },
      { alias: 'Local grandee seizing control by violence' },
      { alias: 'Cruel local lord who keeps the ruler pacified with tax money' }
    ],
    friends: [
      { alias: 'Inspector from the suzerain' },
      { alias: 'Local judge seeking justice' },
      { alias: 'Harried representative in need of help' }
    ],
    complications: [
      'The ruler has too many problems to care about this place',
      'The ruler would actually make things worse if they paid heed',
      "The ruler's authority is being hindered by some rival power"
    ],
    things: [
      'tax money not yet sent',
      'a "gift" meant to draw the lord\'s help',
      'proof of a plot to seize control of this #site#'
    ],
    places: [
      'at a deserted courtroom',
      'on a street crawling with local vigilante groups',
      'at a burnt-out home of a political loser'
    ]
  },
  'new industry': {
    context:
      "The natives have established a new industry here ({mining|textiles}), and it's making them a great deal of profit. {Old patterns of authority and wealth are being disrupted, and the old gentry are {not pleased about it|trying to take over the industry}|The old gentry were the ones to enable it in the first place and are using it to crush the life out of any rival power bases}.",
    enemies: [
      { alias: 'Arrogant and ruthless new oligarch' },
      { alias: 'Scheming old-money grandee' },
      { alias: 'Grasping and heartless industrial magnate' }
    ],
    friends: [
      { alias: 'Hopeful new entrepreneur' },
      { alias: 'Local ruler trying to deal with the change' },
      { alias: 'Innocently naive outside investor' }
    ],
    complications: [
      'The gentry would prefer poverty to losing power',
      'The gentry are split on the industry',
      'The industry comes with severe and unequally-distributed downsides'
    ],
    things: [
      'profit from the industry',
      'a valuable device to improve the industry',
      'tools of sabotage'
    ],
    places: [
      'at a retrofitted old workshop',
      'at a resource-extraction site',
      'at crowded worker housing'
    ]
  },
  'nomadic traders': {
    context:
      'This site is frequently visited by a nomadic {clan|tribe} ({native|diaspora}) seeking to exchange goods and services. Their presence is tolerated by the locals, although many would like to see them integrate into civilized society.',
    enemies: [
      { alias: '{Merchant|Official|Noble} seeking to {exploit|oppress} the nomads' },
      { alias: 'Xenophobic {merchant|official|noble}' },
      { alias: 'Heartless nomadic criminal' }
    ],
    friends: [
      { alias: 'Diplomatic nomadic elder', age: ['old'] },
      { alias: 'Struggling nomadic trader' },
      { alias: 'Local sympathetic to nomad treatment' }
    ],
    complications: [
      'The nomads are known to become raiders during tough seasons',
      'The nomads were recently banned from entering the #site#',
      'The nomads help to keep bandits off the roads'
    ],
    things: ['an ancient nomadic relic', 'stolen trade goods', 'proof of local sabotage'],
    places: [
      'in a nomadic {encampment|enclave} at the #site# outskirts',
      'at a crowded marketplace'
    ]
  },
  'pilgrimage site': {
    context:
      'This #site# is centered around a major pilgrimage site ({religious|cultural|academic|ancient}). Considerable local tension exists over controlling the access to the site and maximizing the profits from foreign visitors.',
    enemies: [
      { alias: 'Outsider boss seeking to seize control of the site' },
      { alias: 'Corrupt hereditary site controller' },
      { alias: 'Rival saboteur bent on despoiling the site' }
    ],
    friends: [
      { alias: 'Well-meaning pilgrim' },
      { alias: 'Scholar with dangerous historical theories' },
      { alias: 'Earnest caretaker of the site' }
    ],
    complications: [
      'The site can only handle so many visitors without degrading',
      'The pilgrimage site is dangerous',
      "The keepers don't fully understand the site"
    ],
    things: [
      'a precious relic of the site',
      'a beautifully-made fake of some critical relic',
      'the secret true history of the site'
    ],
    places: [
      'at expensive pilgrim lodgings',
      'on a street full of hawkers of pilgrimage tokens',
      'at the wondrous pilgrimage site'
    ]
  },
  'population boom': {
    context:
      'A vast influx of newcomers has recently rushed into this #site# ({religious exiles|economic migrants|war-ravaged refugees|fleeing oppression|forcibly evicted}). The {natives struggle to provide the resources and opportunities needed to integrate these newcomers|newcomers have no desire to stay longer than is necessary}.',
    enemies: [
      { alias: 'Viciously xenophobic grandee', culture: 'native' },
      { alias: 'Newcomer leader who despises the locals and their ways', culture: 'foreign' },
      { alias: 'Grasping merchant exploiting the situation' }
    ],
    friends: [
      { alias: 'Local trying to bridge differences' },
      { alias: 'Newcomer trying to make a new life', culture: 'foreign' },
      { alias: 'Local official trying to keep the peace' }
    ],
    complications: [
      'The newcomers act like conquerors',
      'Their cultures are extremely immiscible',
      'The natives are now highly dependent on newcomer industry'
    ],
    things: [
      'a precious relic brought by the newcomers',
      'loot {confiscated|extracted} from the newcomers',
      'riches earned from newcomer labor'
    ],
    places: [
      'in a jarringly different newcomer quarter',
      'at a market with informally segregated areas',
      'at a tavern welcoming to only one group'
    ]
  },
  'raider scourge': {
    context:
      "Almost every community has some problem with bandits and highwaymen, but this #site# is seriously plagued with raiders. These raiders are {bloodthirsty, with a zeal for maximum loss of life|debauched, reveling in their loot and violent liberty|desperate, hungry and in need of vital necessities|fanatical, convinced they're fighting for a great cause|fearful, convinced they're marked for death|pragmatic, with a cold-eyed interest in profit|reckless, convinced that no local can resist them|sadistic, delighting in cruel use of their prisoners} The locals lack the necessary resources to {fend them off|protect all their holdings}.",
    enemies: [
      { alias: 'Would-be ruler turned bandit chief' },
      { alias: 'Rival agent backing the bandits' },
      { alias: 'Traitorous native wielding the bandits against their enemies' },
      { alias: 'Local leader preaching appeasement' },
      { alias: 'Runaway slave ready to take bloody revenge on all' }
    ],
    friends: [
      {
        alias:
          "{Runaway bandit who couldn't stand the savagery|Escaped conscripted bandit camp follower|Escapee from a bandit atrocity in the wilds}"
      },
      {
        alias:
          '{Embittered victim of their plundering|Anguished spouse of someone killed by bandits}'
      },
      { alias: 'Merchant suffering terribly from bandit depredations' },
      { alias: 'Representative of local law in search of help' },
      { alias: "Avenger who's grimly tracked the chief here" },
      { alias: 'Worried relative of a forced bandit conscript' }
    ],
    complications: [
      'The bandits are cooperating with a local power bloc',
      'The "bandits" are bitter victims of the locals\' crimes',
      'Mustering military force would have dire political consequences'
    ],
    things: [
      "a hidden cache of the bandits' stolen loot",
      'a shipment of some vital good that was waylaid',
      "evidence of a local traitor's cooperation with them",
      'a cache of weapons and armor for local defense',
      'money meant to pay for help in fighting the bandits'
    ],
    places: [
      'at a {scene of gory slaughter on the road|massacre site for an ambushed caravan}',
      'at a burnt farmstead at the outskirts of #site#',
      'at a makeshift and dirty bandit camp',
      'at a "haunted" tower the bandits know is avoided',
      'at an abandoned villa re-purposed to a camp',
      'at a hidden cave where the bandits lair',
      'at an unsavory way-inn where the bandits meet'
    ]
  },
  'rebel stronghold': {
    context:
      'This #site# is in {tacit|open} revolt against their supposed regional overlord. Loyalist locals must keep their sympathies hidden or suffer the consequences.',
    enemies: [
      { alias: '{Psychopathic|Ruthless}, but charismatic rebel leader' },
      { alias: 'Savage rebel-suppressing commander' },
      { alias: 'Traitor leading the rebels to their doom' }
    ],
    friends: [
      { alias: 'Idealistic rebel supporter' },
      { alias: 'Frightened local just trying to survive' },
      { alias: 'Sympathetic outside mediator' }
    ],
    complications: [
      'One side of the dispute is correct but profoundly unsympathetic',
      'A rebel victory would ultimately be catastrophic',
      "The lord can't afford the disruption that violent suppression would create",
      'The rebels are in cooperation with bandits in the nearby wilds',
      "The lord is just and honorable despite the rebels' accusations"
    ],
    things: [
      'a cache of valuable rebel supplies',
      'tax money stolen by the rebels',
      'secret rebel identities and plans'
    ],
    places: [
      'at a rebel base hidden outside this #site#',
      'at a tavern full of sympathizers',
      'at a torched loyalist house'
    ]
  },
  'rich land': {
    context:
      'The soil around this #site# is uncommonly rich and fertile. Their neighbors view them with envy, and outside raiders and exploiters find them an ideal target.',
    enemies: [
      { alias: 'Cunning raider chieftain' },
      { alias: 'Greedy overlord' },
      { alias: 'Merchant trying to gain monopoly rights on local grain' }
    ],
    friends: [
      { alias: 'Local farmer being exploited for their wealth' },
      { alias: "Elder attempting to defend the site's legal claim to the land", age: ['old'] },
      { alias: 'Priest of a fertility deity' }
    ],
    complications: [
      'The farming is rapidly ruining the land',
      'The fertility comes from dark sacrifices',
      'The fertility comes from jealously guarded agricultural techniques'
    ],
    things: [
      'a bountiful harvest',
      'an ornate idol of the local fertility deity',
      'a cache of weapons meant to defend the wealth'
    ],
    places: ['at the luxuriantly ripe fields', 'at the village feast', 'at the bustling market']
  },
  'runaway power': {
    context:
      'Something has gone catastrophically awry for the area as some minor {power|personage} has suddenly gotten their hands on ridiculous amounts of power. The only way to seal the power is to {deactivate a magical device hidden in a nearby ruin|destroy a {magical artifact|supernatural entity}|convince a {timid|fragile} mage to confront the wielder|convince several magi who hate each other to cooperate|lure the wielder back to the site of their creation|trick the wielder into consuming a special elixir}.',
    enemies: [
      { alias: 'A commoner who recently became a monstrous entity' },
      { alias: 'A local has gained control of a mighty aberration' },
      { alias: 'Alchemist who devised an addictive elixir of might' },
      { alias: 'Malcontent suddenly awakening to a supernatural gift' },
      { alias: "Petty official who's laid hands on a powerful artifact" },
      { alias: 'Sorcerer who made a dark pact for malign power' }
    ],
    friends: [
      { alias: 'Commoner who was an early victim of the power' },
      { alias: "Community elder who's been shoved aside", age: ['old'] },
      { alias: 'Local wizard distressed at the sudden eruption' },
      { alias: "Merchant who fell victim to the power's depredations" },
      { alias: 'Overmatched {guard captain|local defender}' },
      { alias: 'Ruler who finds the situation spun out of control' },
      { alias: "Worried relative of the runaway power's wielder", relative: true }
    ],
    complications: [
      'Rivals lie in wait to snatch up the power if its user falls',
      "The power can't be overcome by brute force",
      'The power is intelligent, and controls its wielder',
      'The power is needed to perform some vital task yearly',
      'The power is infectious and is corrupting the populace',
      "The power's wielder is sympathetic in some way"
    ],
    things: [
      "a magic treasure that failed to stop the power's wielder",
      'a precious substance created as a power side-effect',
      'a rare addictive substance needed by the wielder',
      'an object that {negates|protects} against the power',
      "blackmail to force the wielder's lieutenant to leave them",
      "a relic of legitimacy wielded by the custom's enforcer",
      'money gathered to pay someone to stop the wielder'
    ],
    places: [
      'near the empty streets of a place frightened of this new power',
      "at a forced festival celebrating the new power's ascent",
      'at a new {estate|stronghold} raised by the power',
      "at a new temple forcibly erected to the power's glorification",
      'at {scarred|defaced} land in the wake of the new power',
      'at the smashed office of a ruler who was driven out',
      "at the humble home that the power's wielder once dwelled in"
    ]
  },
  'savage custom': {
    context:
      'This region has a widespread custom that many would find deplorable ({slavery|rigid castes|oppression|raiders|blood sacrifices}).',
    enemies: [
      { alias: 'Gang boss whose vice trade depends on the custom' },
      { alias: 'Harsh elder who has their position because of custom', age: ['old'] },
      { alias: 'Heartless priest who profits from the custom' },
      { alias: 'Merchant whose profits hinge on the custom' },
      { alias: "Sorcerer with magic that relies on the custom's use" }
    ],
    friends: [
      { alias: 'Brilliantly gifted person from the oppressed group' },
      { alias: "Elite who's secretly a member of the oppressed group" },
      { alias: 'Reformer from a privileged group in society' },
      { alias: "Pragmatic local who's convinced it's unhealthy" },
      { alias: 'Scholar looking for the roots and basis for the custom' },
      { alias: 'Outsider crusader trying to undo the custom', culture: 'foreign' }
    ],
    complications: [
      'The custom is intrinsic to local religion',
      'The custom is symbolic of a cherished ancient victory',
      'The last reformer was an incompetent tyrant, still hated',
      'The chief reformer is a horrible person with dark plans',
      'The custom has supernatural support from an entity',
      "The custom's most likely replacement is worse",
      'The oppressed want to respond with blind violence',
      "The society's stability would be lost without the custom"
    ],
    things: [
      'a magical artifact used to help enforce the custom',
      'ancient texts that prove the custom was unfounded',
      'arms stockpiled by rebels among the oppressed',
      "a deed to some land earned by the custom's exactions",
      "a pile of wealth acquired through the custom's demands",
      "a relic of legitimacy wielded by the custom's enforcer",
      "a venerable document proving the custom's validity"
    ],
    places: [
      "in an elite neighborhood where the oppressed can't go",
      'near an execution ground with troublemakers in the gibbet',
      'at a luxuriant estate bought with the fruits of the custom',
      'at a miserable shack of some hard-pressed victim',
      'at a public festival celebrating the rightness of the custom',
      'in a secret back-alley meeting place for rebels'
    ]
  },
  'scars of war': {
    context:
      'This #site# is still bloodied by a recent violent conflict. A {crushing bandit raid|lost siege|neighboring warfare} has inflicted severe damage on the place.',
    enemies: [
      { alias: 'Savage tyrant left over from the fight' },
      { alias: 'Outsider taking advantage of their weakness' },
      { alias: 'Native driven to extremes by their losses' }
    ],
    friends: [
      { alias: 'Bedraggled survivor' },
      { alias: "Outsider who's come to help" },
      { alias: 'Relative of someone lost in the battle', relative: true }
    ],
    complications: [
      'The damage was mostly taken by one group',
      'The losses have thrown the old social order into chaos',
      'The locals are desperate to make the losses “worth it”'
    ],
    things: [
      'plunder taken during the fight',
      'wealth left behind by the dead',
      'a cache of treasure concealed by looters'
    ],
    places: [
      'at a damaged half-occupied house',
      'at a burnt-down civil structure',
      'at fields pocked with torched cottages'
    ]
  },
  'secret treachery': {
    context:
      "This #site# is in secret rebellion against their ostensible liege, {plotting a great betrayal for their own gain|seeking liberation from tyranny}. This #site#'s leadership is all in on this plot, and outside representatives are being kept carefully ignorant of the reality. The common folk may be oblivious to the truth, though they'll doubtless have felt the same motivations and promptings that convinced their leaders to turn traitor.",
    enemies: [
      { alias: 'Suspicious investigator from the tyrant' },
      { alias: 'Scheming local chief who plans to be the new lord' },
      { alias: 'Monstrous thing that they made a pact with', monstrous: true }
    ],
    friends: [
      { alias: 'Local being cruelly mistreated by the tyrant' },
      { alias: 'Honest representative trying to resolve the tension' },
      { alias: 'Local grandee trying to stay out of it all' }
    ],
    complications: [
      'One of the leaders is a double agent waiting to roll all the traitors up',
      'The leaders disagree on methods',
      "There's more than one group of traitors who don't know about the others"
    ],
    things: [
      'proof of the conspiracy',
      'bribes intended for the leadership',
      'a relic smuggled in by an outside supporter'
    ],
    places: [
      'in a smoky back room',
      'at the sullen public gathering',
      "in a secret chamber in a leader's home"
    ]
  },
  'sinking city': {
    context:
      "This #site# was built atop something unstable, and now that substrate is crumbling. {Denizens living in affected areas are frantically trying to relocate|New opportunities may be revealed even as this #site#'s present structure is ruined}.",
    enemies: [
      {
        alias: 'Unspeakable evil from below',
        monstrous: true
      },
      { alias: 'Ruthless local causing damage for the sake of profit' },
      { alias: 'Outside exploiter preying on the displaced' }
    ],
    friends: [
      { alias: 'Struggling local defender' },
      { alias: 'Native made homeless by the collapse' },
      { alias: 'Curious explorer bent on discovering what lies beneath' }
    ],
    complications: [
      'The collapse was caused by someone',
      'Only the slums or the noble quarter collapsed',
      "The collapse hasn't happened yet but it's going to"
    ],
    things: [
      'recently-uncovered treasure',
      'a vault buried when the building became a sinkhole',
      'the key to halt the collapse'
    ],
    places: [
      'at a pit where a manor once was',
      'near the fallen city wall',
      'near the freshly-exposed underworks'
    ]
  },
  'terrible beast': {
    context:
      "This #site# is scourged by a monstrous beast. It {destroys property and possessions as well as lives|can infiltrate any place, leaving no home safe from it|inflicts some terrible post-death fate on the corpse|is cleverly sadistic, toying like a cat with its prey|is voracious, killing and eating incessantly|kills by an especially {hideous|lingering} method|It's so {armored|hardy} that it can scarce be hurt}",
    enemies: [
      {
        alias: 'Monstrous creature enslaved by a cruel sorcerer',
        monstrous: true
      },
      { alias: 'Monstrous god-beast that demands bloody sacrifice', monstrous: true },
      { alias: "Sadistic native who's pacted to become a shapeshifter" },
      { alias: 'Unlucky mortal transformed into an abomination' },
      { alias: 'Vile abomination that transforms its victims into spawn', monstrous: true }
    ],
    friends: [
      { alias: 'Bitter refugee from a community the beast destroyed' },
      { alias: 'Envoy of the greater government looking for hunters' },
      { alias: "Grizzled local hunter who's observed the beast", age: ['adult', 'middle age'] },
      { alias: 'Leader of a desperate local militia seeking to kill it' },
      { alias: 'Local leader trying to find someone to face the beast' },
      { alias: "Lone survivor of the beast's last attack" },
      { alias: "Scholar curious about the beast's nature and past" },
      { alias: 'Veteran monster-hunter in need of assistance', age: ['adult', 'middle age'] }
    ],
    complications: [
      'Killing the beast will cause a magical disaster',
      'Only a particular {item|effect} can harm the beast',
      'Right now, the beast is hurting a vile group the worst',
      'The beast has a cult of devotees that worship it',
      'The beast is intelligent and inclined to bargain'
    ],
    things: [
      'a magical item owned by a now-dead beast hunter',
      'a prize held by someone carried off by the beast',
      "a treasure accumulated from the beast's victims",
      'a weapon that is particularly effective against the beast',
      'an ancient text describing the way to banish the thing',
      'an object that is enraging the creature and drawing it',
      'the prize that the beast is meant to be guarding',
      'tribute piled up in an attempt to appease the thing'
    ],
    places: [
      'near desolate streets with the locals hiding indoors',
      'near makeshift defenses manned by worried militia',
      'at a meeting of panicked denizens discussing the creature',
      'at a seemingly impregnable stronghold',
      'at the site of a gruesome massacre committed by the beast',
      "at a stinking lair piled with the bones of the beast's prey",
      'at a tavern full of worried locals talking about the beast',
      'at a torn-up farmhouse littered with the dead inhabitants'
    ]
  },
  'theocratic authorities': {
    context:
      "Religious leaders are influential in almost any community, but here they make up the final authorities. {It is an explicit theocracy, with rule by the clerics of a particular faith|The temple is so important and powerful that the official leaders are helpless to resist its will}. The {locals are expected to be loyal adherents to the faith|less pious majority is deeply intimidated by the religion's believers}.",
    enemies: [
      { alias: 'Rebel backed by a rival religion' },
      { alias: 'Heretical priest trying to usurp authority' },
      { alias: 'Eldritch being masquerading as a heavenly envoy' }
    ],
    friends: [
      { alias: 'Well-meaning but zealous priest' },
      { alias: 'Insurgent against a wicked theocracy' },
      { alias: 'Harried town leader trying to please the clerics' }
    ],
    complications: [
      'The theocrats are divided into struggling factions',
      "The theocracy is the result of the former ruler's complete failure",
      "The priests don't want to lead, but nobody else is acceptable to the people"
    ],
    things: [
      'a religious relic conferring the right to rule',
      'a precious sacred scripture',
      'tithe gathered for the temple'
    ],
    places: [
      'at an ornate and splendid temple',
      'in a shrine room within an ordinary house',
      "in a magistrate-priest's courtroom "
    ]
  },
  'toxic economy': {
    context:
      'This #site# is reliant on a rare {industry|product} ({metallurgy|alchemy|arcana}) that is extremely valuable due to its use in the creation of powerful arcane {potions|enchantments|implements|artifacts|constructs}, but {{has harmful side-effects for|requires blood sacrifices from} those {handling|collecting} the raw materials|is slowly {destroying|polluting} the land with its extraction|extraction requires traversing extremely dangerous terrain}.',
    enemies: [
      { alias: 'Cruel sorcerer-merchant' },
      { alias: 'Indifferent magnate wringing more production out of people' },
      { alias: 'Trader in flesh who profits by the sick and feeble' }
    ],
    friends: [
      { alias: 'Healer trying to cure the side-effect' },
      { alias: 'Crippled local maimed by the product' },
      { alias: 'Outside trader trying to soften the consequences of the trade' }
    ],
    complications: [
      'The side-effect only harms an expendable class of people',
      'The afflicted are isolated from the healthy',
      'The side-effects are {social|economic} rather than physical'
    ],
    things: [
      'a temporary protection from the toxin',
      'a load of the precious good',
      'a device that worsens the toxin but creates more of the good'
    ],
    places: [
      'at a pesthouse full of the crippled',
      "at a splendid mansion built off the product's profits",
      'at a factory full of lethal fumes and effects'
    ]
  },
  'trade hub': {
    context:
      'This #site# is a major trade hub, connecting several {important cities|resource production areas}. It {is located at an {important river juncture|ancient crossroads}|occupies the only safe path through perilous wilderness}.{ Its position is important enough that it can survive on trade alone, despite being unable to feed itself with the surrounding land.|}{ This #site# is heavily garrisoned by the lord who profits from their tariffs and taxes.|}',
    enemies: [
      { alias: 'Cheating merchant prince', age: ['adult', 'middle age'] },
      { alias: 'Corrupt {judge|trade official|caravan master}', age: ['adult', 'middle age'] },
      { alias: 'Grasping ruler with heavy taxes', age: ['adult', 'middle age'] }
    ],
    friends: [
      { alias: 'Confused foreigner with strange ways', culture: 'foreign' },
      { alias: 'Dealer in exotic enchanted weapons and armor' },
      { alias: 'Exotic stranger in need of help', culture: 'foreign' }
    ],
    complications: [
      'Two prominent caravan masters are feuding over a lucrative trade contract',
      'The merchants effectively rule the city',
      'There are pockets of exotic cultures found nowhere else in the kingdom'
    ],
    things: [
      'precious goods not produced in this land',
      'a map to some fabulous foreign treasure',
      'a gift intended for a local ruler'
    ],
    places: [
      'at a bazaar full of foreign speech',
      'at a caravansarai built in a foreign fashion',
      'at a palace of conspicuous opulence'
    ]
  },
  'unique product': {
    context:
      'This #site# {produces unique resource found nowhere else|contains masters a carefully-guarded craft|offers a special service that can only be provided by the locals} ({metal|textile|culinary|alchemical|artistic|scholarly|arcane}).',
    enemies: [
      {
        alias: 'Magnate forcing more production at a grim cost',
        age: ['adult', 'middle age', 'old']
      },
      { alias: 'Ruler demanding more tribute' },
      { alias: 'Rival saboteur planning to turn the product dangerous' },
      { alias: 'Tax collector seeking to squeeze further exactions' }
    ],
    friends: [
      { alias: 'Naive, but superbly talented artisan' },
      { alias: 'Innovator seeking to improve the product' },
      { alias: 'Outside trader trying to protect their deal' }
    ],
    complications: [
      "The product involves a vile component that outsiders can't accept handling",
      'The product is extremely useful to very unpleasant entities',
      'Multiple rulers claim rights over this #site#'
    ],
    things: [
      'a cache of the product',
      'the secret method of its production',
      'valuable components used to make the product'
    ],
    places: [
      'at a factory full of busy creators',
      'at a resource extraction field where a vital component is gathered',
      'at a market crowded with traders from far places'
    ]
  },
  'upstart faith': {
    context:
      "There's a relatively new religion in this #site# which is rapidly gaining power. It is {a sectarian offshoot of a major faith|the unique product of a new prophet|an outside faith backed by wealthy and powerful foreign supporters}. The new faith is a {matter of concern only to the existing clergy|major flashpoint for conflict in this #site#}.",
    enemies: [
      { alias: 'False prophet gathering thralls' },
      { alias: 'Hostile native cleric with dark plans' },
      { alias: 'Outside manipulator profiting by the strife' },
      { alias: 'Corrupt traditionalist priest' }
    ],
    friends: [
      { alias: 'Sincere new priest' },
      { alias: 'Local trying to keep out of the crossfire' },
      { alias: 'Existing cleric trying to make peace' },
      { alias: 'Venerable local theologian' },
      { alias: 'Local seeking help for a newly-zealous relative' }
    ],
    complications: [
      'The faith has very different teachings for inner and outer members',
      'The secular leadership backs the new faith to weaken the existing temples',
      'The faith has both sympathetic and unpleasant traits',
      "The new faith has seized much of the older tradition's property"
    ],
    things: [
      'a sacred relic of the new faith',
      'a temple relic stolen by a new convert to the faith',
      'tithe offered up by wealthy new convert',
      "a transcription of the new prophet's visions"
    ],
    places: [
      'at a hastily-made new temple',
      'at a now-empty existing shrine',
      'at a market with informal religious segregation',
      'in a poisonously divided temple',
      'at an isolated shrine outside the settlement',
      'at a secret meeting of believers'
    ]
  },
  'warring council': {
    context:
      "There is a {conflict between formal leadership and informal authorities|struggle among civil officials} due to {divergent interests|a personal grudge that's boiled over}. Outside threats and internal problems are being ignored until the power struggle is resolved.",
    enemies: [
      { alias: 'Shadowy kingmaker bent on breaking resistance', age: ['middle age', 'old'] },
      { alias: 'Megalomaniacal new leader' },
      { alias: '"Owned" leader forced to fight for #possessive# backers' }
    ],
    friends: [
      { alias: 'Neutral leader seeking a resolution' },
      { alias: 'Outside investigator looking to understand the situation' },
      { alias: "Local suffering from some trouble that's being ignored" }
    ],
    complications: [
      'The most capable leader is also most at fault',
      'The struggle is being incited by an outside rival',
      "They're arguing over a problem that seems insoluble"
    ],
    things: [
      'blackmail on a leader',
      'the treasure being fought over',
      'an item that would resolve the struggle'
    ],
    places: [
      'in a now-abandoned council room',
      'at the site of a steadily-increasing problem',
      'at a tavern stronghold of one of the combatants'
    ]
  },
  'witch hunts': {
    context: 'Magic users are being hunted and executed due to a recent transgression.',
    enemies: [
      { alias: 'Brutal {witch-hunter|guard captain} who is going too far' },
      { alias: 'Angry {noble|official|ruler} driving the hunt' },
      { alias: 'Vile sorcerer responsible for the transgression' }
    ],
    friends: [
      { alias: 'Sympathetic sorcerer trying to escape' },
      { alias: 'Relative of an imprisoned sorcerer' },
      { alias: 'Stoic witch-hunter' },
      { alias: 'Outside official trying to calm the situation' }
    ],
    complications: [
      'The sorcerers are being framed by their enemies',
      'The transgression was a great atrocity that left many dead',
      'Locals are proposing an edict to ban all sorcerous activity'
    ],
    things: [
      'confiscated arcane relics',
      'the wealth of a dead sorcerer',
      'enchanted shackles that nullify magic'
    ],
    places: [
      'at a scorched arcane sanctuary',
      'at the gallows with dead sorcerers',
      'at a stockade with sorcerous prisoners'
    ]
  },
  'xenophobic locals': {
    context:
      'The locals despise outsiders ({natives of foreign lands|anyone from outside this #site#}). Almost every community has some degree of wariness toward strangers, but these locals have an active loathing, and the few outsiders allowed to trade or interact with them do so at a heavy disadvantage.',
    enemies: [
      { alias: 'Utterly unfair local magistrate', culture: 'native' },
      { alias: 'Local magnate who abuses outside laborers', culture: 'native' },
      {
        alias: 'Leader who always paints outsiders in the worst possible light',
        culture: 'native'
      },
      { alias: 'Monstrous being disguised as a human leader', culture: 'native' }
    ],
    friends: [
      { alias: 'Secretly curious local', culture: 'native' },
      { alias: 'Cruelly mistreated outsider living there', culture: 'foreign' },
      { alias: 'Official investigator' }
    ],
    complications: [
      'They have a very good reason for hating strangers',
      'Their outsider neighbors hate them just as much',
      "They're the last remnant of their kind and fear being absorbed"
    ],
    things: [
      'a prized symbol of their people',
      'wealth confiscated from an outsider',
      'forbidden outsider objects kept sealed away'
    ],
    places: [
      'at a cultural edifice devoted to the local past',
      'at the tightly guarded city walls',
      'near architecture that only makes sense to the locals'
    ]
  }
}

const hooks = [
  'An Enemy has suffered a dire reverse, and seeks a Thing in order to rescue their situation.',
  'An Enemy is behind a recent flare-up of a Complication that is causing problems for the PCs.',
  'An Enemy keeps a Thing at a well-guarded Place, and a Friend is willing to pass the PCs information on it.',
  'An Enemy is being targeted by the negative effects of a Complication but is trying to pin it all on a Friend.',
  'An Enemy is trying to take control of a Place, but is being hindered by the activities of a Friend.',
  'An Enemy is trying to use a Complication to pry a valuable Thing out of the hands of a Friend.',
  'An Enemy is using a Thing to bait a Friend into getting involved in a Complication that will probably destroy them.',
  'An Enemy controls a Place where a Thing is located, but a Complication is currently keeping them from being able to extract it.',
  "An Enemy has recently become active near a Place, and their actions have stirred up a Complication that a local Friend doesn't know how to handle.",
  'An Enemy is struggling over a Thing with another Enemy, and the fallout from their fight is making problems for the PCs or a Friend.',
  'An Enemy has a grudge against a Friend and is trying to frame them for some crime related to a Thing.',
  'An Enemy has just destroyed the last obstacle that prevents them from full exertion of their malice and is using a Thing they claimed to prosecute it.',
  "An Enemy lost a Thing at the worst possible time and is suffering from a Complication. They're trying to get it back before they're ruined.",
  'An Enemy is currently at a Place and is exceptionally vulnerable for some reason. A Friend wants to take advantage of that.',
  'An Enemy has promised an ally a Thing and is becoming increasingly desperate to obtain it, as the consequences for failure are dire.',
  "An Enemy has imprisoned a Friend for some reason, and if they're not rescued soon a grim fate awaits them.",
  'An Enemy has allied with another Enemy in order to obtain a Thing from a Place, yet both are preparing to betray each other and the Thing could be stolen in the chaos.',
  'An Enemy is working to weaponize a Complication against a Friend, but their attempt has somehow left open the possibility of stealing or finding a Thing.',
  'An Enemy has forced a Friend into service, but in the process the Friend has learned about how the PCs can obtain a Thing.',
  "An Enemy has just had some personal triumph that's catalyzing a flare-up of a Complication that is harming the PCs or a Friend.",
  "A Friend stole a Thing from an Enemy. The Enemy doesn't know who did it, but their flailing retaliation threatens something precious to the Friend as they search for the culprit and the Thing.",
  'A Friend carelessly fell into a peril related to a Complication, leaving them vulnerable to a threat from an Enemy.',
  "A Friend needs to be rescued from the hostile attentions of an Enemy, and they're currently hiding out at a Place dangerously close to Enemy forces.",
  "A Friend has acquired a Thing, but it's also being sought by an Enemy and they need help to get it safely away and out of their foe's reach.",
  "A Friend got lost or snared in a Place, and a rising Complication threatens to kill or ruin them if they're not rescued in time.",
  'A Friend needs help to get a Thing from an abandoned Place, but an Enemy is ahead of them and prepared to deal harshly with competitors.',
  'A Friend is not really a Friend, but an Enemy agent, and is trying to lure the PCs into helping them acquire a Thing that will actually be turned over to their master.',
  'A Friend is caught up in a Complication and cannot get to a Place where they know a Thing is being kept. The PCs need to act as their agent or get them free of the Complication.',
  'A Friend has been charged with guarding or maintaining a Thing, but an Enemy has set in motion a Complication that threatens both of them.',
  "A Friend is being compelled by an Enemy's threats to sacrifice something important to them or endure some grave loss.",
  "A Friend desperately needs a Thing for their own purposes, but an Enemy stands between them and it, though the Enemy doesn't realize what's there.",
  "A Friend has obtained ownership or responsibility for a Place, but an Enemy has set up a trap or disaster there that's meant to ruin or disgrace them.",
  "A Friend has been gravely harmed by an Enemy before and fears to confront them, but a Complication looks like it's going to end up forcing them into conflict once more.",
  'A Friend has acquired a Thing and is making use of it to further their desires, but an Enemy means to spoil their efforts and rob them of the Thing.',
  'A Friend has a sure-fire map or lead to a Thing at a Place, but in actuality, the Thing is not there at all; only an Enemy or a Complication-related peril.',
  'A Friend has been snatched away by an Enemy, who is convinced they are the key to acquiring a Thing. They may or may not be right about that.',
  "A Friend has suffered a grave personal loss due to a Complication, but an Enemy offers to make good their suffering if they can bring them a Thing they're supposed to know how to get.",
  "A Friend is sick or dying, and desperately needs a Thing if they're to live. Getting it would somehow directly put them in conflict with an Enemy, however.",
  "A Friend had a Thing but they hid it at a Place. Unfortunately, that Place is now under the control of an Enemy who doesn't know what's hidden there.",
  'A Friend is trying to protect someone from the consequences of a Complication, but their efforts are being thwarted by an Enemy who profits by the current situation.',
  'A Complication threatens a Friend, who offers a way to get at a Thing to the PCs if they can help the Friend escape trouble.',
  "A Complication's flare-up is the fault of an Enemy, who stirred it up in the process of seeking a Thing.",
  'A Complication is showing a double edge, harming both an Enemy and the PCs in some way and making the former vulnerable.',
  'A Complication threatens to ruin a Friend unless a particular Thing can be found and used to save them.',
  "A Complication's activity opens the path to a lost Thing at some dangerous Place.",
  'A Complication is only getting worse until an Enemy is defeated and forced to stop their provocations.',
  'A Complication is causing problems for the PCs, but a Friend can help resolve things if they can be found at a dangerous Place.',
  'A Complication has rendered an Enemy vulnerable to the PCs if they can get their hands on a Thing.',
  'A Complication is centered at a Place that a Friend needs to get to for some reason.',
  'A Complication is causing problems for a Friend that an Enemy is taking advantage of.',
  "A Complication elsewhere is having knock-on effects that are reaching the PCs, but a Friend can help resolve it if they can hold back an Enemy that's threatening them.",
  "A Complication is being provoked by a Friend who doesn't want to do it, but is forced to do so by circumstances until an Enemy's related machinations can be stopped.",
  'A Complication just calmed down, with the lull exposing a Thing and making it accessible at an otherwise-dangerous Place. At some random near future time, however, the Complication will pick back up with a vengeance.',
  "A Complication is empowering an Enemy's plans, allowing them far more influence than they'd normally have. A Thing or Friend can stop this, if the PCs can lay hands on it or find the NPC.",
  "A Complication struck amid a struggle between an Enemy and a Friend, just before the latter's loss. If the Enemy is not defeated before the Complication dies down again, they'll win for certain.",
  "A Complication is forcing a Friend and an Enemy to work together, but it's inevitable that there will be conflict the moment it ends, and the Friend is seeking help.",
  'A Complication drove a Friend out of a Place before they could recover a Thing from there. Even though the Complication is still blocking the site, they need the Thing as quickly as possible.',
  'A Complication has robbed an Enemy of the current use of their best tool or most effective underling, and a Friend has a plan to make that loss permanent.',
  'A Complication has damaged or involved a Thing, Place, or institution that no one ever thought would become embroiled. A Friend associated with that target is in need of aid.',
  'A Complication is delicately poised between an Enemy and a Friend, targeting neither right now, but both are working to manipulate it to hit the other or escape its eventual explosion.',
  "A Thing has been lost in a dangerous Place by a Friend, and now an Enemy hastens to retrieve it. A Complication is making it hard for them to get it, but they'll win through soon.",
  'A Thing has turned out to be very dangerous to possess, and an Enemy is trying to bait the PCs or a Friend into taking or stealing it.',
  'A Thing is the crux of a savage conflict between two or more Enemies, and their fighting is stirring up a Complication.',
  "A Thing must be found if some calamity is to be avoided by the PCs or a Friend, but an Enemy stands to profit if it's never obtained.",
  'A Thing is located in a dangerous Place, and a Friend knows how to get it.',
  'A Thing is supposed to be located in a Place, but those who go there merely get caught in a Complication, though they do find out the real Place the Thing has been moved to.',
  "A Thing seems to be useful for a particular function or value, but in actuality it's got a hidden value known to a Friend who is currently hiding from an Enemy. The PCs know there's more to it, but only the Friend can tell the full truth.",
  "A Thing has been lost by a Friend and they're desperate to get it back before it's found by an Enemy.",
  "A Thing is hidden in a Place controlled by an Enemy, but they're oblivious to it.",
  "A Thing has been stolen from an Enemy by a Friend and hidden in a Place, but the Enemy's searching around there and it's too dangerous for them to try to retrieve it.",
  "A Thing is instrumental to an Enemy's plan, but the Friend who knows where to get it is in hiding.",
  'A Thing has been demanded of the Enemy by someone they fear, and their plans for getting it involve steps that will bring grave harm to a Friend.',
  "A Thing holds the key to solving or being protected from a Complication, but the Place it's at is currently very dangerous due to that Complication.",
  'A Thing is responsible for a flare-up of a Complication in a Place, and the PCs are somehow affected by it.',
  'A Thing that a Friend is responsible for obtaining or guarding will be lost to an Enemy as soon as a Complication stops hindering them, unless the PCs can spirit it away from its current dangerous Place.',
  'A Thing was being kept at a Place by an Enemy, but a Friend has figured out a way to get past their defenses.',
  'A Thing was lost in a dangerous Place long ago, but an Enemy unwittingly holds the key to finding or unlocking it.',
  'A Thing hidden in a Place is needed by two different Friends for different important reasons, but if an Enemy is overcome, one or both of those reasons will cease to trouble them.',
  'A Thing has just been obtained by a Friend, but an Enemy now pursues them for it, and the PCs are asked to help drive off the Enemy or get the Friend someplace safe with the Thing.',
  'A Thing was the lawful inheritance of a Friend, but an Enemy has seized it and a Complication prevents the Friend from obtaining it through conventional means.',
  'A Place has been overwhelmed by some danger related to a Complication, and a Friend is now trapped there.',
  'A Place has changed, becoming much more dangerous due to the influence of an Enemy. This is causing problems for a Friend.',
  'A Place has been overrun by an Enemy or their agents in an attempt to find a Thing that is supposedly located there.',
  'A Place is currently the focal point of a Complication that is threatening a Friend.',
  'A Place is being reclaimed by a Friend from its current difficulties, but an Enemy has reasons to oppose that change and is using a Complication to interfere.',
  'A Place is the destination to which a Friend must take a Thing. An Enemy means to waylay them, however.',
  "A Place is the source of an Enemy's power, and they guard it jealously. Despite this, a Friend knows of a Thing located there.",
  'A Place offers refuge from a Complication that is currently making trouble in the area, but an Enemy is preventing others from making use of it unless bribed otherwise.',
  'A Place is falling apart, but the chaos has exposed a chance to get a Thing that is being pursued by an Enemy and others.',
  'A Place is under siege by an Enemy, who is determined to take it before a rival can claim it. A Friend would face disaster if either claimed it.',
  "A Place is currently entrapping an Enemy, who is powerless to escape. They've taken a Thing from a Friend, however, and will release it only when the Friend releases them.",
  'A Place is the inherited property or responsibility of a Friend, but they lack a Thing which is critical to their successful obtaining or maintenance of the place.',
  'A Place conceals its true nature as a very different Place, and a Friend has been unfortunately taken in by it.',
  "A Place has a Thing as an integral part of it, and when an Enemy took it, a resultant Complication started that won't end until it's returned.",
  'A Place is used by an Enemy to create a Thing, the processes and events going on there utilized to produce the desired result.',
  'A Place is distant and the journey there is dangerous, but a Friend offers a Thing if the PCs can get them there safely.',
  "A Place is the seat of an Enemy's power, where they are both most fearsome and least wary. A Friend has a plan to take advantage of that.",
  "A Place is the target of a Complication, and the consequences might ruin it. A Thing is located there, and if it's not grabbed first the Complication will probably wreck or take it.",
  'A Place has been newly-established and is still fragile. A Complication threatens to destroy it.',
  'A Place is a refuge for a Friend, but an Enemy means to bait them out of it or force them to leave with a Complication.'
]

const background__text = (params: { background: Background; loc: Province }) => {
  const { loc, background } = params
  const details = backgrounds[background]
  return hub__fillSite({
    text: `${window.dice.spin(details.context)}`,
    hub: loc.hub
  })
}

let _backgrounds: Background[] = []

export const background__spawn = (loc: Province) => {
  if (_backgrounds.length < 2)
    _backgrounds = window.dice.shuffle(Object.keys(backgrounds) as Background[])
  while (loc.backgrounds.length < 2) {
    const tag = _backgrounds.pop()
    const background = backgrounds[tag]
    loc.backgrounds.push({
      tag,
      text: background__text({ background: tag, loc }),
      friends: [...background.friends.map(f => f.alias)],
      enemies: [...background.enemies.map(f => f.alias)],
      complications: [...background.complications],
      things: [...background.things],
      places: [...background.places]
    })
  }
}

export const background__hook = (params: { loc: Province }) => {
  const [bgf, bge] = window.dice.shuffle(params.loc.backgrounds)
  const friend = window.dice.choice(bgf.friends)
  bgf.friends = bgf.friends.filter(f => f !== friend)
  const enemy = window.dice.choice(bge.enemies)
  bge.enemies = bge.enemies.filter(f => f !== enemy)
  const [bdc, bgt, bgp] = window.dice.shuffle([bgf, bge, bgf, bge])
  const complication = window.dice.choice(bdc.complications)
  bdc.complications = bdc.complications.filter(f => f !== complication)
  const thing = window.dice.choice(bgt.things)
  bgt.things = bgt.things.filter(f => f !== thing)
  const place = window.dice.choice(bgp.places)
  bgp.places = bgp.places.filter(f => f !== place)
  return window.dice.spin(
    window.dice
      .choice(hooks)
      .replaceAll('Enemy', decorateText({ label: 'enemy', tooltip: enemy }))
      .replaceAll('Friend', decorateText({ label: 'friend', tooltip: friend }))
      .replaceAll('Complication', decorateText({ label: 'complication', tooltip: complication }))
      .replaceAll('Thing', decorateText({ label: 'thing', tooltip: thing }))
      .replaceAll('Place', decorateText({ label: 'place', tooltip: place }))
  )
}
