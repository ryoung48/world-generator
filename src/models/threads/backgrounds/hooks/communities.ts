// ^\b[A-Z][a-z]+\s[A-Z][a-z]+\b$
// ^(?![EFCTP] ).*(?<!###)$
// ^([EFCTP] )

import { hub__alias } from '../../../regions/provinces/hubs'
import { Hook } from '../types'

export const communities: Hook = {
  hooks: {
    'Ancient Infrastructure': {
      text: "The community still has access to some sort of functioning ancient infrastructure, whether it's an array of wall-mounted arcane energy projectors, running water, moving roadways, community-wide climate control, or some other inherited luxury. This infrastructure may be the result of a still-functional enchantment, or it could be the product of some venerable occult engine that's still operational, or it may be the fruit of the labors of some specially-designed organism.",
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
    'Awful Curse': {
      text: "The community has been cursed with some blight that makes life difficult, albeit not impossible. e. An offended sorcerer's vengeful enchantment, an outraged god's wrath, or a simple history of bad luck in the area may have brought the curse about. If you include this tag, you'll want to devise not only the curse, but the reason why the locals haven't left for better lands.",
      enemies: [
        { title: 'Charlatan offering false hope' },
        { title: 'Local demagogue blaming a useful culprit' },
        { title: 'Native profiting from the curse' },
        { title: 'Criminal whose vile act induced the curse' },
        { title: 'Employer of the mercenary wizard who laid it' },
        { title: 'Enchanted beast that exudes the curse naturally', monstrous: true },
        { title: 'Local sorcerer acting out of spite and resentment' },
        { title: 'Powerful local whose actions prolong the curse' },
        { title: 'Rival ruler who wants the place to stay cursed' },
        { title: "Spiteful local who enjoys a rival's cursed suffering" }
      ],
      friends: [
        { title: 'Scholar seeking details of the blight' },
        { title: 'Stubborn curse survivor' },
        { title: 'Aspiring curse-lifter with a secret weapon' },
        { title: 'Brash outsider confident they can lift the curse' },
        { title: 'Curious scholar seeking to study the curse' },
        { title: 'Desperate local trying to lift the magical blight' },
        { title: 'Guilty local who feels responsible for the malison' },
        { title: "Innocent victim of the curse's effects" },
        { title: 'Local unjustly blamed by neighbors for the curse' },
        { title: 'Traveler snared here by the curse' },
        { title: 'Wretched soul who failed to lift the curse' }
      ],
      complications: [
        'Failing to lift the curse will cause a disaster',
        'The curse is a fake',
        'a cover for some dark crime',
        'The curse is keeping an invader out of the place',
        "The curse is tied to an innocent local's life",
        "The curse's side-effects are making someone rich",
        'The locals are convinced they deserve the curse',
        'The locals have a badly wrong idea how to lift it',
        'Their rival neighbors want the curse to stay active',
        ''
      ],
      things: [
        'The artifact that can be used to lift the curse',
        'The evidence proving a person responsible for it',
        'The item that must be returned to lift the curse',
        'The magical belongings of a deceased curse-lifter',
        "The map to where the curse's focal item is buried",
        'The money paid to the person who laid the curse',
        'The possessions of a rich victim of the curse',
        'The relic that must be shattered to lift the curse',
        ''
      ],
      places: [
        "A chamber where the curse's focal relics are held",
        'A hidden lair for the maintainer of the curse',
        'A place for magical workings to prolong the blight',
        'A tavern where locals gloomily talk of the blight',
        "Grim locale where locals suffered the curse's effect",
        'Hiding-spot for someone accused of laying it',
        'Panicked local meeting to discuss the curse',
        'The site of a crime that induced the curse',
        ''
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
    'Bad Water': {
      text: 'There are problems with the local water supply, either because the current source is no longer serviceable, or because some outside power is interfering with the free flow of water. Peasants might be fighting over irrigation rights to the local streams and rivulets, old wells might be running dry, or some malefactor might be poisoning the locals’ water supply at the source.',
      enemies: [
        { title: 'Hidden poisoner' },
        { title: 'Aspiring water baron' },
        { title: 'Desperate neighboring farmer' }
      ],
      friends: [
        { title: 'Water diviner' },
        { title: 'Local negotiator' },
        { title: 'Investigating official' }
      ],
      complications: [
        'The locals need to move as the land can no longer support their crops',
        'Some vital local industry is poisoning the waters',
        'A curse has fallen on the water due to some local crime'
      ],
      things: ['Location of hidden spring', 'Ancient dam controls', 'Deed of water rights'],
      places: ['Parched field', 'Local irrigation dam', 'Bottom of a dry well'],
      constraints: {
        urban: false
      }
    },
    'Blood Feud': {
      text: 'Two important families have managed to bitterly offend each other, and a feud has racked the community as both struggle for influence.',
      enemies: [
        { title: 'Wholly unsympathetic clan head' },
        { title: 'Schemer seeking to exploit the feud' },
        { title: 'Ruler going to brutal excess to tamp it down' },
        { title: 'Someone who mistakes a PC for a member of the enemy clan' }
      ],
      friends: [
        { title: 'Reluctant participant in the feud' },
        { title: 'Local digging for the real truth of the quarrel' },
        { title: "Merchant who'd profit by a new peace" },
        { title: 'Scion of one house in love with someone in the other', youth: true }
      ],
      complications: [
        'The families were formerly the closest of allies',
        'One family is favored by local rulers',
        'One of the families have a history dabbling in dark sorcery',
        "The families are crippling the city's law enforcement and criminals are taking over",
        'A cold tension is about to turn into a hot war if a recent crime is assigned to one clan'
      ],
      things: [
        'A treasure the groups are fighting over',
        'Lost symbol of peaceful unity',
        'Proof that the original slight was a fabrication',
        'Evidence of outside agitation'
      ],
      places: [
        'Bloody back alleyway',
        'Riotous street brawl between partisans',
        'Bloodstained wedding hall',
        'Venomously polite meeting'
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
    'Cheating Merchant': {
      text: `There is an important local merchant who cheats those who deal with them, yet is protected from the consequences by their power and servants. Something they sell is vital to the inhabitants, and they have no other source for the necessary commodity.`,
      constraints: { urban: false },
      enemies: [
        { title: `Head bully of the merchant's guard` },
        { title: `Corrupt {ruler|merchant}` },
        { title: `Local collaborating with the merchant` }
      ],
      friends: [
        { title: `Local who has been cheated` },
        { title: `Merchant who wants to break the monopoly` },
        { title: `Former employee of the merchant in the past` }
      ],
      complications: [
        `The merchant desperately needs the money`,
        `The locals abused the merchant in the past`,
        `The "victims" are actually trying to cheat the merchant`
      ],
      things: [
        `Proof of the merchant's foul deeds`,
        `Information on a new source of the commodity`,
        `The merchant's hidden trove of wealth`,
        'A vital contract document'
      ],
      places: [
        `The quarrelsome and impotent ruler's court`,
        `Sullen trading post`,
        `Tavern dominated by the merchant's thugs`,
        'The opulent estate of the merchant'
      ]
    },
    'Closed Trade': {
      text: `This nation highly restricts foreign trade and prohibits all foreigners outside of designated districts.`,
      constraints: { capital: true, coastal: true, tribal: false },
      enemies: [
        { title: `Relentless pirate smuggler` },
        { title: `{Bribed|Xenophobic} {dock master|official}` },
        { title: `{Grasping|Callous} foreign merchant`, foreign: true }
      ],
      friends: [
        { title: `Vigilant native law enforcement` },
        { title: `{Honest|imprisoned} foreign merchant`, foreign: true },
        { title: `Foreign diplomat trying to open trade`, foreign: true },
        { title: `Sympathetic criminal boss` }
      ],
      complications: [
        `An exceptionally vicious local ruler want to open outside trade to support their regime`,
        `Seemingly innocuous foreigners caused a recent disaster`,
        `Law enforcement is cracking down on dissidents after a wave of illegal activity`,
        `Trade is possible for "friends of the people"`,
        `Trade at very few traditional times and places is allowed`
      ],
      things: [
        `Blatantly foreign goods`,
        `Uniquely precious cultural artifacts`,
        `Illegal foreign goods disguised as local products`
      ],
      places: [`Foreign quarter`, `Busy shipyard`, `Warehouse with impounded goods`]
    },
    'Coastal Pirates': {
      text: 'This settlement is {an infamous safe haven for pirate vessels seeking refuge|constantly at the mercy of pirate depredations}.',
      constraints: { coastal: true },
      enemies: [
        { title: 'Pirate captain' },
        { title: 'Landside fence for their cargo' },
        { title: 'Corrupt bureaucrat allied with the pirates' }
      ],
      friends: [
        { title: 'Honest sea captain' },
        { title: 'Merchant facing ruin' },
        { title: 'Local desperate to rescue a pirate prisoner' }
      ],
      complications: [
        `The "pirates" are actually commissioned warships of a rival power`,
        'A cursed undead pirate crew plagues the seas',
        "The pirates mean to subvert the entire settlement's government to their service"
      ],
      things: ['Pirate treasure', 'Map to buried treasure', 'Stolen cargo'],
      places: [
        'Heaving deck of a storm-tossed ship',
        'Raucous tavern where pirate frequent',
        'Hidden cove where pirates store cargo',
        'A contested shipwreck'
      ]
    },
    'Colonial Outpost': {
      text: `A foreign power has set up colonial outposts in this region ({trading company|colonial settlers}).`,
      constraints: { capital: true, coastal: true, tribal: true },
      enemies: [
        { title: `{Grasping|Callous} colonial {official|governor|merchant}`, foreign: true },
        {
          title: `{Local crime boss praying on rich colonists|Brutal native resistance leader}`
        }
      ],
      friends: [
        { title: `Sympathetic native resistance leader` },
        { title: `Honest colonial {merchant|official}`, foreign: true },
        { title: `Native victim of foreign cruelty` }
      ],
      complications: [
        `The colonists are the defacto rulers, having replaced the local authority with a puppet government`,
        `The colonists are at war with another colonial power over these territories`,
        `The locals are using the colonists to destroy their rivals`,
        `The locals are harshly oppressed by the colonists`
      ],
      things: [`Precious resource extracted by local labor`, `A shattered native relic`],
      places: [
        `Busy {shipyard|courtroom}`,
        `Colonial {estate|embassy}`,
        `Deep wilderness resistance camp`
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
      ],
      constraints: {
        urban: true
      }
    },
    'Corrupt Officials': {
      text: 'Corrupt officials are {squeezing an innocent for protection money|targeting an innocent for "corrective adjustment" because of a personal grudge|framing an innocent for a crime in order to expropriate their belongings}.',
      constraints: { urban: true },
      enemies: [
        { title: 'Corrupt {guard captain|bureaucrat}' },
        { title: 'Sinister {court wizard|courtier|minister}' },
        { title: 'Allied crime boss' }
      ],
      friends: [
        { title: 'Honest priest' },
        { title: 'Struggling merchant' },
        { title: 'Talented artisan' },
        { title: 'Clean local official' }
      ],
      complications: [
        'The official has many local collaborators,',
        "The locals are terrified of the official's thugs",
        'The official is a traitor in service to an enemy power'
      ],
      things: [
        'Bribe money',
        'Evidence of corruption',
        'The remains of the last person to tell the official "No"',
        'Forbidden goods',
        "The missing inquisitor's report"
      ],
      places: [
        'Smoke-filled tavern',
        'Ransacked {shop|office}',
        'Infirmary with badly-beaten victim',
        'Opulent mansion'
      ]
    },
    'Corvee Demand': {
      text: "The settlement's ruling authority demands that the locals perform some sort of labor for their rulers, providing their own food and shelter while at work. Most credit old customary laws requiring such service, but the laws may have fallen into disuse or be fabrications. Peasants hate corvee labor, as it takes them from their fields, and other settlements often resent the demand for their unpaid work.",
      enemies: [
        { title: 'Grasping local official' },
        { title: 'Cruel corvee taskmaster' },
        { title: 'Greedy merchant who misdirects the labor to his own profit' }
      ],
      friends: [
        { title: 'Angry peasant elder', elder: true },
        { title: 'Historian who remembers the old law' },
        { title: 'Magistrate who feels the labor is being misused' }
      ],
      complications: [
        'The corvee is actually a legitimate demand',
        'The corvee is being used to build some vital infrastructure',
        'The corvee was supposed to be paid work'
      ],
      things: [
        'The pay that was supposed to be given to the workers',
        "Proof of the demand's falsification",
        'Evidence of corrupt redirection of the corvee labor'
      ],
      places: ['Sullen labor site', 'Empty fields', 'Tavern with knots of angry men'],
      constraints: {
        urban: false
      }
    },
    Crackdown: {
      text: "Local law enforcement has implemented unusually strict measures and harsh punishments to discourage undesirable behavior. More guards patrol the streets than ever. All outsiders, foreign minorities, and criminal figures are looked to with suspicion. The locals are afraid to speak out against the crackdown, and the authorities are eager to use it to their advantage. The crackdown may be a response to a recent crime wave, a new ruler's attempt to establish his authority, or a local crime boss's attempt to consolidate his power.",
      enemies: [
        { title: 'Zealous guard captain', veteran: true },
        { title: 'Ruthless official', veteran: true },
        { title: 'Crime boss who triggered the crackdown', veteran: true }
      ],
      friends: [
        { title: 'Fellow outsider trapped in the #site#' },
        { title: 'Sympathetic criminal' }
      ],
      complications: [
        'The locals are getting frustrated with all the new enforcement too',
        'The numerous new petty regulations are actually part of a huge and sinister ritual',
        'The new legalism is part of a zealous religious revival.'
      ],
      things: [
        'A universal pardon for crimes committed',
        'Confiscated goods',
        'Contraband forbidden by the new laws'
      ],
      places: [
        'Crowded jail cell',
        'Hushed plaza where no one dares say anything',
        'Mass meeting denouncing foreign troublemakers'
      ],
      constraints: {
        urban: true
      }
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
      ],
      constraints: {
        urban: true
      }
    },
    'Crop Failure': {
      text: "The community has recently suffered a failure of its crops. For those settlements that don't grow their own food, the surrounding villages that normally supply them have suffered bad harvests and cannot sell what is left. Crop failures can range from an unpleasant season of hardship to village-destroying famines.",
      enemies: [
        { title: 'Local witch convinced that human sacrifice will propitiate the gods' },
        { title: "Agent of an enemy power who's destroyed the fields" },
        { title: 'Bandit warlord intercepting all the incoming food' },
        { title: 'Heartless official rerouting all the food elsewhere' },
        { title: "Rich merchant who's legally seized the granaries" },
        { title: "Furious sorcerer who's cursing the fields to wither" }
      ],
      friends: [
        { title: 'Food smuggler with a sympathetic temperament' },
        { title: 'Hedge wizard seeking a way around the famine' },
        { title: 'Local official struggling to help their charges' },
        { title: 'Merchant trying to bring in food supplies from afar' },
        { title: 'Wizened local priest praying for mercy from above' },
        { title: 'Starving peasant farmer in search of aid' }
      ],
      complications: [
        'Aid is only being distributed to the politically reliable',
        'The community is collapsing into famine-driven strife',
        'The crop failure is caused by a curse',
        'The crop failure is a contagious plant disease and what little food remains must be burnt before it spreads',
        'The crops were destroyed in the field by enemies'
      ],
      things: [
        'A pillaged caravan of food aid or edible provender',
        'A magical object that creates large amounts of food',
        'An ancient treasure able to buy a vast sum of food',
        'Precious belonging that was traded for bread',
        'Hidden stockpile of grain laid down by rebels',
        'Written trade agreement that would bring in food',
        'Contractual claim on a large shipment of food',
        'Stolen alms-gold set aside to buy food for the poor'
      ],
      places: [
        'Black market selling food meant for relief or alms',
        'Riotous center for distribution of food and alms',
        'Withered field where even the shoots have been eaten',
        'Empty storehouse where people have plucked rice grains from between the boards'
      ]
    },
    'Crop Theft': {
      text: "Someone or something has stolen much of the settlement's food supply. In most cases, this will be a large amount of food to move, so whoever accomplished it must have access to wagons or numerous strong backs. Herding settlements might face rustlers, robbing their food on the hoof. In some cases the theft might have come under color of law, as some noble or magistrate empties their storehouses through some manipulation of the law",
      enemies: [
        { title: 'Grasping noble' },
        { title: 'Aspiring bandit warlord' },
        { title: 'Desperate leader of a famine-struck neighboring village' }
      ],
      friends: [
        { title: 'Settlement leader in need of aid' },
        { title: 'Local merchant who needs crop surplus to sell' },
        { title: 'Plundered farmer' }
      ],
      complications: [
        'The thieves stole because they will starve otherwise',
        "The food hasn't been preserved yet and will spoil soon if not reclaimed",
        'The thieves took even the seed grain for the next crop'
      ],
      things: [
        "Map to the food's hiding place",
        'Proof that the requisition was unlawful',
        'Newly-discovered food source'
      ],
      places: [
        'Barren field',
        'Crude infirmary filled with those injured in the raid',
        'Quarrelsome courtrooms'
      ],
      constraints: {
        urban: false
      }
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
    'Dark Cult': {
      text: 'A hidden, dark cult resides within this community. What distinguishes this cult from the plethora of other local religious traditions is its bloody offerings and malign intentions. Their dark god demands {blood. The cultists seek more human sacrifices|delight. The cultists are made to loathsomely indulge|disaster. The cult must induce some great calamity|gold. They need more precious sacrificial offerings|minions. Cult recruitment is their primary motive|revenge. The cult must destroy an old rival or new foe|rule. The god demands they obtain positions of power|subversion. They are to infiltrate the local faith}.',
      enemies: [
        { title: 'Amoral scholar experimenting with the divine' },
        { title: 'Decadent noble bored with more mundane perversions' },
        { title: 'Despised local who made a pact to avenge mistreatment' },
        { title: 'Heir to a family tradition of dark and bloody worship' },
        { title: "Local priest who's tapped into a new power" },
        { title: "Religious reformer who's bringing a bloody cleansing" },
        { title: 'Ruthless hierarch who leads the cult for #possessive# own aims', veteran: true }
      ],
      friends: [
        { title: 'Apostate from the cult who was shocked to revulsion' },
        { title: "Community elder who's seen this happen before", elder: true },
        { title: 'Escapee from a hideous cult ritual' },
        { title: 'Ghost of a cult victim seeking revenge' },
        { title: 'Inquisitor serving the prominent local religion' },
        { title: 'Local official being pressured by the cult' },
        { title: "Relative of a cult victim who wouldn't submit to them" },
        { title: 'Local spirit or supernatural being threatened by them', monstrous: true }
      ],
      complications: [
        'The cult has a blithely innocent outer membership',
        'The cult has no patron only a sorcerous trickster',
        'The cult is being backed by a hostile foreign power',
        'The cult is being used as a catspaw by a local noble',
        'The cult is blocking an even worse dark entity',
        'The cult is intimately tied to the local identity and past',
        'The cult provides a vital service to desperate locals',
        "The cult's leader is trying to mitigate the faith's evil"
      ],
      things: [
        'A cure for some curse or evil the cult has inflicted',
        'A perhaps poorly-encrypted membership list',
        "A precious heirloom taken from the cult's last victim",
        'Ancient sacrificial offerings to the dark god',
        'Blackmail material against a local ruler or official',
        "Key that can unlock the dark god's true power",
        'The sacred book of the cult',
        'vital to its rituals',
        "The vile idol which is the source of the cult's magic"
      ],
      places: [
        'Abandoned ancient shrine once dedicated to the god',
        'Bloody grove in the wild consecrated to their deity',
        'Elegant salon where powerful cultists meet',
        'Local festival with a hidden',
        'horrible rite at its heart',
        'Local temple or church taken over by cult members',
        'Prison',
        'brothel',
        'or other place of easily-had prey',
        'Subterranean hollow dug out by cultists of old',
        'Vice den or tenement reeking of human desperation'
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
      ],
      constraints: {
        urban: true
      }
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
    'Despotic Lord': {
      text: "Some brutal master lords over this community, crushing any hint of resistance and demanding extravagant service from the locals. The lord has not been deposed because {everyone is terrified of the lord's potential revenge|spies and informers are everywhere in the area|the greater government is firmly behind the lord|the last attempt ended in a horrible massacre|the lord is paying off vital persons in the community|the only good rebel leader is imprisoned by the lord}.",
      enemies: [
        { title: 'Conqueror who rules their new lands like a pillager' },
        { title: 'Conquest-mad lord who is constantly fighting wars' },
        { title: 'Depraved lord who seizes the young and fair' },
        { title: 'Grossly profligate lord who taxes people unmercifully' },
        { title: 'Incompetent lord who keeps making awful choices' },
        { title: "Puppet lord who serves a sinister power's purposes" },
        { title: 'Sadistic lord who simply delights in causing pain' },
        { title: 'Usurper of the true lord who rules with an iron fist' }
      ],
      friends: [
        { title: 'Cynical kingmaker who has no further use for them' },
        { title: 'Government official worried about the events here' },
        { title: "Noble relative who'd be the next in line to rule here" },
        { title: 'Rebel leader trying to depose the oppressor' },
        { title: 'Religious leader who wants to protect their flock' },
        { title: 'Rival lord who hates them for an old offense' },
        { title: 'Spouse of the lord who hates them bitterly' },
        { title: 'Vengeful spirit of someone they unjustly slew' }
      ],
      complications: [
        'One powerful local group profits much from the lord',
        "Rival successors threaten civil war at the lord's ouster",
        "The lord has to keep this up or they'll lose vital support",
        'The lord is holding back an even worse outside threat',
        'The lord is mistaken but theoretically redeemable',
        'The lord is much loved by their feudal master',
        'The lord is really doing this for secret magical reasons',
        'The strongest opposition to the lord is a very bad man'
      ],
      things: [
        'A holy artifact plundered from the local temple',
        'A precious gift sent in an attempt to curry favor',
        'Ancient text that has a secret the lord craves to know',
        'Item of regalia that gives legitimacy to the ruler',
        'Magical artifact that does a thing the lord direly needs',
        "Proof for the king of the lord's unfitness to rule",
        'Taxes collected from the cruelly-downtrodden people',
        'The wealth the lord uses to pay his henchmen'
      ],
      places: [
        'Back room of a tavern where conspiracies are plotted',
        'Barracks of brutish and abusive mercenary soldiers',
        'Forest camp of bitter bandit-rebels',
        'Hiding-place for women and children in the wilds',
        'Market plagued with bullying minions of the lord',
        'Ornate hall of a toadying minion of the lord',
        'Scourged hamlet of oppressed peasants',
        "Slave market where the lord's victims are sold"
      ]
    },
    'Dueling Lords': {
      text: 'Two different major powers are fighting over control of the community. Two rival lords, a baron and a merchant-price, the mayor and a local high priest, or some other combination struggle to achieve dominance. They may both have justifiable claim on running the community, or one may be a greedy interloper.',
      enemies: [
        { title: 'Third party profiting by the strife' },
        { title: 'Traitor to one of the rivals' },
        { title: 'Outsider vulture wanting both rivals to fail', foreign: true }
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
    'Ethnic Tensions': {
      text: "Two ethnic groups within the community hate each other due to {recent events|inherited spite from old wrongs}. One group {was responsible for a terrible massacre|brutally oppressed the other's religion|is much richer and more prosperous|was given privileges by favorable rulers|has always held the other in contempt|kept winning battles against the other|was magically gifted in a minor way|outnumbered the other in their own lands}. {Their neighbors|The local law} have kept things from too-overt violence, but members of the groups will constantly interfere with their rivals and cause whatever misery they can get away with.",
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
        'The strife is cyclical',
        'and most expect it to end soon',
        'The strife is extremely profitable to a third party',
        'The strife is rapidly building to open warfare',
        ''
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
      constraints: {
        urban: true
      }
    },
    'Enemy Within': {
      text: "The locals are convinced that there is some terrible threat against them working from within their society. It may be a matter of dark sorcerers, foreign spies, traitorous neighbors, shapeshifting monsters, or some other hidden evil. This evil may be a recent fear, or it may be an inherited peril they've always had to guard against. The danger itself may or may not exist, or if it exists it may not justify the steps being taken.",
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
    'Forced Evictions': {
      text: "Some locals are planted on valuable land, either because it's the last scrap of territory inside the walls that hasn't been extensively developed, or because it has access to good water, or perhaps it lies on some auspicious geomantic nexus. Others want them gone, and they're ready to use both fair means and foul to evict the troublesome locals",
      enemies: [
        { title: 'Heartless merchant' },
        { title: 'Sorcerer needing a particular sit' },
        { title: 'Dweller beneath the streets' }
      ],
      friends: [
        { title: 'Poor local merchant' },
        { title: 'Family that has lived there for time out of mind' }
      ],
      complications: [
        'The PCs own land there',
        'The locals are holding down some dark evil',
        'Treasure is buried on the land'
      ],
      things: ['Title deed to the land', 'Lost land payment'],
      places: ['Ancestral home', 'Ruined house', 'Stretch of newly-barren land'],
      constraints: {
        urban: true
      }
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
    'Foreign Spies': {
      text: 'This community has a number of active agents of an enemy polity. Their foe may or may not be in open warfare with them, but the bad blood is deep enough to provoke constant low-level espionage activities. The spies may be trying to steal secrets, or they may be trying to sow discord and mistrust.',
      enemies: [
        { title: 'A secret agent of the rival', foreign: true },
        { title: 'A zealous investigator' },
        { title: 'A murderous saboteur' }
      ],
      friends: [
        { title: 'Agent who wishes to defect', foreign: true },
        { title: 'Local guard captain' },
        { title: 'Local victimized by enemy agents' }
      ],
      complications: [
        'Enemy agents strike at {secret programs|local customs} that are detestable and vile',
        'Locals are commonly framing each other as agents to settle old scores',
        'The agents have powerful native supporters'
      ],
      things: [
        'Stolen ciphers',
        'Bribe money for local officials',
        "Proof of a noble's treacherous allegiance"
      ],
      places: [
        'Darkened alleyway',
        "Top-secret project's meeting room",
        'Mob roused by accusations of treachery'
      ],
      constraints: {
        urban: true
      }
    },
    'Foul Sorcery': {
      text: 'Some hideous magic taints the community. Foul curses might be striking down unlucky locals, or necromancers might be stealing unblessed corpses, or blood sorcerers might be feeding their sanguinary addiction with peasant victims, or any other magical misery might be at hand.',
      enemies: [
        { title: 'Beast-breeding creator of magical abominations' },
        { title: 'Bitter renegade thrown out of their magical academy' },
        { title: 'Diabolical artificer-sorcerer using people for parts' },
        { title: 'Gifted local wizard embittered against the people' },
        { title: 'Half-crazed wizard who pacted with the foul spirits' },
        { title: 'Ruthless court wizard plotting subtly to seize power' },
        { title: 'Sorcerer-agent of an enemy power' },
        { title: 'Sorcerous high priest of their own demented cult' }
      ],
      friends: [
        { title: "The sorcerer's terrified apprentice who regrets their work" },
        { title: 'A lover who was {spurned|twisted} by the sorcerer' },
        { title: "A victim of the wizard's favorite magical tricks" },
        { title: 'A witch-hunter mercenary in need of extra help' },
        { title: "The wizard's old mentor who seeks to correct them", elder: true },
        { title: 'A community priest who protests against the wizardry' },
        { title: "A local hedge-wizard who can't hope to defeat them" },
        { title: 'A bitter rival sorcerer who sees the PCs as useful pawns' }
      ],
      complications: [
        'Only the living and cooperative wizard can undo a curse',
        'Several wizards make up the sorcerous cabal',
        "The wizard has a legal right to do what they're doing",
        'The wizard has bribed or coerced local cooperation',
        'The wizard protects as well as exploits the people',
        "The wizard's harmless",
        'and being framed by a foe',
        "The wizard's help is crucial to local authorities",
        "The wizard's intentions are of the best",
        'if not their acts'
      ],
      things: [
        'Artifact of dark sorcerous might',
        'Tome of forbidden lore',
        "The text containing the sorcerer's secret weakness",
        'Proof of the true identity of the evildoer',
        'Runaway experiment of vital importance to the mage',
        'The ancient key to unlock an artifact of the mage',
        "The object that is the focus of the sorcerer's power",
        'The one person who can satisfy a ritual sacrifice need'
      ],
      places: [
        'Hidden unsanctified ossuary',
        'Reeking tenement in the slums',
        'Hidden cultic shrine',
        "Secret room in a noble's palace",
        "Elegant country villa staffed with the wizard's minions",
        "Temple where the wizard's prey seek sacred safety",
        'Warped trans-dimensional pocket domain'
      ]
    },

    'Grasping Aristocrat': {
      text: `A grasping aristocrat ({noble|bureaucrat|merchant}) seeks to seize control of the settlement against the wishes of its occupants through {legal tricks|{fabricated|real} debts|hired thugs}.`,
      constraints: { urban: false },
      enemies: [
        { title: `Ruthless lieutenant of the aristocrat` },
        { title: `Greedy aristocrat` },
        { title: `A local secretly in the pay of the aristocrat` }
      ],
      friends: [
        { title: `Honest farmer` },
        { title: `Resolute village elder`, elder: true },
        { title: `Scholar familiar with the real legal history of the land` }
      ],
      complications: [
        `The aristocrat's claim is actually legitimate in the eyes of the law`,
        `The village is divided over the question`,
        `The village is being run badly and the noble might be an improvement`
      ],
      things: [
        `Proof of the village's liberty`,
        `The hidden treasure the aristocrat seeks to seize`,
        `Relic precious to the aristocrat's clan`
      ],
      places: [
        `Raucous courtroom`,
        `Meeting-hall filled with worried locals`,
        `Farm seized by the aristocrat's thugs`
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
        'They guilds hate each other only slightly less than the competition'
      ],
      things: [
        'Priceless symbolic guild regalia',
        'Wealth hidden by the former ruler of the community',
        'Money earned by shady business practices'
      ],
      places: ['Bustling guild hall', "Purely decorative ruler's court", "Shabby worker's housing"],
      constraints: { urban: true }
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
      ],
      constraints: {
        urban: false
      }
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
    'Invading Army': {
      text: "There is an army in the area, and it has little inclination to be gentle with the locals. In many cases, the community or area isn't even the true target of the army, and it's just passing through on its way to its real destination, or else forced to take a position here as part of some greater strategy. Whether friend or enemy the near proximity of an army tends to be extremely unpleasant for everyone in the area. This settlement is important because {an old fortification is being put back into use, it's of personal interest to an important official, it's the only good approach to a soft target in the rear, omens or scrying claim something's to happen here, the army leader's been sent here to rusticate harmlessly, the locals threaten rebellion without an army in place, there's a crucial resource extracted here to be had, this is a vital smuggling corridor to be quashed}.",
      enemies: [
        { title: 'Amoral mercenary captain hired to take this locality' },
        { title: 'Bloodthirsty brute ordered to root out local guerrillas' },
        { title: 'Decadent officer whose men savagely abuse local' },
        { title: 'Disreputable chief of a band of deserters' },
        { title: 'Heartlessly confiscatory officer from "friendly" side' },
        { title: 'Honorable, but ruthless officer of the enemy forces' },
        { title: 'Officer from rival neighbor with a grudge against here' },
        { title: 'Officer who treats the locals as free slave labor' }
      ],
      friends: [
        { title: 'Agent of the rival forces looking for supporters' },
        { title: "Deserter from the antagonist's forces" },
        { title: 'Do-gooder bandit chief who raids hostile forces' },
        { title: 'Local peasant driven out of their home by looters' },
        { title: 'Merchant whose trade routes have been cut by war' },
        { title: 'Officer who wants to minimize conflict with locals' },
        { title: 'Priest seeking to protect their flock from soldiers' },
        { title: 'Supernatural entity upset with all this warfare near it', monstrous: true }
      ],
      complications: [
        'Local guerrillas are inciting brutal reprisals',
        'Many of the local youth have run off to join the army',
        'The army is bringing a great sickness or plague',
        'The army plunders and is under very bad discipline',
        "The army's eating out all available provisions",
        "The army's interfering with vital agricultural work",
        "The army's leader is cowardly and won't advance",
        'The local community has been wrecked in fighting'
      ],
      things: [
        "Blackmail sufficient to control an army's leader",
        'Bundle of vital intelligence stolen from one side',
        'Lost supply train with vital equipment and provisions',
        "Payroll chest for the army's soldiers",
        'Precious thing confiscated by one of the armies',
        'Secret weapon held by one of the sides',
        'Treasure left concealed by a fleeing local grandee',
        'Vital cache of grain for winter the locals concealed'
      ],
      places: [
        'Burnt-out swath where the army has passed',
        'Fortified estate or strong point held by soldiers',
        'Hidden camp of deserters or enemy scouts',
        'Hospital where sick and wounded are being tended',
        'Military camp with soldiers and camp followers',
        'Place of a gory battle still strewn with destruction',
        'Tavern hushed with fear of forced conscription',
        'Torched field scattered with the dead of the farm'
      ]
    },
    'Lawless Chaos': {
      text: "Local authority has broken down entirely in this area due to {a gruesome celestial omen that drove the locals to terror|a now-vanished demagogue who whipped up the locals|a failed rebellion that still crippled local authority|food shortages that drove the locals to bloody rioting|the {madness|murder} of the local ruling official|a religious conflict turned bloody and badly confused|a runaway street war between rival criminal groups|a sudden natural calamity}. Whatever authority remains no longer has an effective monopoly on violence, and the citizens here are forced back on their own resources to preserve themselves and their property. The place may be seething with bandits, thieves, and extortionists, but these ruffians aren't the root of the problem. The essence of this crisis is that there is no one to drive them away and no prospect of such a savior any time soon.",
      enemies: [
        { title: 'Bandit chief working with local criminals to take over' },
        { title: 'Clan head who wants it all for #possessive# kinsmen' },
        { title: 'Crazed religious leader with a sinister creed' },
        { title: 'Cynical merchant prince grabbing for control here' },
        { title: 'Dark sorcerer who sees a lot of loose spare parts' },
        { title: 'Idealistic rebel leader who seeks justice in blood' },
        { title: 'Noble lord too important for anyone to lawfully resist' },
        { title: 'Ruthless mercenary leader who sees their chance' }
      ],
      friends: [
        { title: 'Former guard now the last of #possessive# detachment' },
        { title: 'Hard-pressed local official trying to keep order' },
        { title: 'Local elder desperate for a new source of stability', elder: true },
        { title: 'Orphan made so by the recent violence', child: true },
        { title: 'Merchant looking for protection from the chaos' },
        { title: "Retired official who's aghast at the situation", elder: true },
        { title: "Rioter who now regrets what the situation's come to" },
        { title: 'Visiting noble trying to help the locals regain order' }
      ],
      complications: [
        'A monstrous criminal got loose during the confusion',
        'A neighboring rival is encouraging the chaos',
        'An incompetent official is making things worse',
        'The bloodshed is producing undead and dark spirits',
        'The chaos is drawing brigands and worse to the place',
        'The government plans to restore order savagely',
        'The locals demand a totally impractical outcome',
        'The only legitimate authority left is brutally corrupt'
      ],
      things: [
        'A dark magical icon that is worsening the trouble',
        'A holy relic that would give a side legitimacy',
        'A symbol of legitimate rule that would calm many',
        'A tax shipment that never reached the capital',
        'An arms cache sufficient to shift the local balance',
        "Documents proving the guilt of the chaos' instigator",
        'Much-needed food sacked from a merchant caravan',
        'Treasure plundered during the confusion'
      ],
      places: [
        "Broken-into merchant's store",
        'looted to the floor',
        'Burnt-down government offices or palace',
        'Deserted court with its files strewn and burnt',
        'Empty barracks that should be holding soldiers',
        'Fortified neighborhood with paranoid defenders',
        'Hushed street covered by crossbow snipers',
        'Street smeared with the remnants of a bloody riot',
        'Torched storehouse once filled with food'
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
    'Lethal Plague': {
      text: "This community suffers from an unspeakable sickness that is ravaging the populace. {Death is spectacularly loud and painful for the victim|It specially targets children for a terrible death|No one can determine how it's actually spread|Only some hideous act can prolong a victim's life|Survivors often relapse much later to spread it anew|The victim is gruesomely deformed by it before death|The plague doesn't directly kill, only cripple terribly|The victim becomes maddened and dangerous}.",
      enemies: [
        { title: 'Brutal official who wants to burn the sickness out' },
        { title: "Looter chieftain who doesn't always wait for death" },
        { title: 'Necromancer joyously pleased at all the fresh parts' },
        { title: 'Plagued Misbegotten that waxes with the suffering' },
        { title: 'Priest of a plague cult, celebrating the sickness' },
        { title: 'Quack physician with a desperate following' },
        { title: 'Religious zealot blaming the sinful for the plague' },
        { title: 'Sorcerer who has a cure but uses it to control locals' }
      ],
      friends: [
        { title: 'Government agent who is helpless to be of aid' },
        { title: 'Hard-pressed physician who can only treat symptoms' },
        { title: 'Healer-mage with a wild plan to cure the sickness' },
        { title: 'Official struggling to maintain order amid sickness' },
        { title: 'Priest wearied by the vast number of dead to bury' },
        { title: 'Scholar researching the nature of the plague' },
        { title: 'Unprepared noble elevated by sudden parental death' },
        { title: "Wretched local who's the last of their family" }
      ],
      complications: [
        'An extremely tight quarantine is in place',
        'Civil society has broken down entirely in the plague',
        'Dark supernatural powers are drawn by the sickness',
        "It's being spread by a ruthless enemy of the place",
        'Plague victims have some magical or money value',
        'The current treatment plan is completely wrong',
        'The plague is a biological weapon of the ancients',
        'The plague is only affecting an unloved group'
      ],
      things: [
        'A cache of gold meant to pay for food supplies',
        'A magical cure for the plague',
        'An old manuscript that records a cure for the illness',
        "Deed to a dead grandee's vast estate",
        'Heirloom taken by a person now dead in the wilds',
        "The magical item that's causing the plague",
        'Treasure left behind by the recently dead',
        'Vital medical supplies to mitigate the suffering'
      ],
      places: [
        'Cemetery with piles of unburied plague dead',
        'Frantic religious service praying for divine mercy',
        'Frenetic party estate sealed off against the outside',
        'Funeral with mourners too exhausted to mourn',
        'Market with shrouded buyers and sellers',
        'Overtaxed hospice for the doomed but not yet dead',
        'Stretch of road lined with those who dropped dead',
        "Vice den laden with the dead's scavenged wealth"
      ]
    },
    'Mad Demagogue': {
      text: 'A local leader has whipped the area into a frenzy with their words. They might be promising a glorious new social order, or focusing profitable hatred on some disliked group, or claiming legitimacy by virtue of divine favor. Whatever the mechanism of their authority, a dangerous number of locals are following their orders, and their orders are not good ones.',
      enemies: [
        { title: "Ethnic demagogue who's demanding genocide" },
        { title: 'Impostor "noble" claiming legitimate rule of the area' },
        { title: "Invincible military leader who's so far won all battles" },
        { title: 'Philosopher-zealot with a bloody new pattern for life' },
        { title: 'Rebel promising a glorious new order for the poor' },
        { title: 'Religious zealot decrying the evils of a hated group' },
        { title: 'Supposed emissary of the gods who brings a new law' }
      ],
      friends: [
        { title: 'A commoner from a group the demagogue hates' },
        { title: 'Internal rival of the demagogue seeking catspaws' },
        { title: 'Merchant whose holdings have been taken or burnt' },
        { title: "Noble who's rapidly losing control of the situation" },
        { title: 'Official from afar with no power to cope with this' },
        { title: 'Old friend of the demagogue who knows the truth' },
        { title: "Refugee fleeing ahead of the demagogue's forces" },
        { title: "Religious leader forced out by the demagogue's men" }
      ],
      complications: [
        'The demagogue is the only one holding back an evil',
        'They have a good point but are taking it much too far',
        'The only alternative to them is something vile too',
        "They're a secret agent of a rival power in the area",
        'Their followers are just catspaws for their true purpose',
        'They use a local prophecy to legitimate their acts',
        "They're being controlled by a secret kingmaker",
        'The government has a reason to let it burn a while'
      ],
      things: [
        "A vast bribe intended to avert the demagogue's wrath",
        'Arms the demagogue needs to equip his minions',
        'Evidence that the demagogue is an impostor or fake',
        'Heirloom from a local noble killed early in the rising',
        "Proof of the demagogue's real intention for the locals",
        'The magical artifact the demagogue relies upon',
        'Treasure buried by those who fled the demagogue',
        'Vital supplies from a caravan the minions sacked'
      ],
      places: [
        'Burnt-over homestead of an un-supportive peasant',
        'Deserted civil offices',
        'the government now fled',
        'Heavily-fortified estate of a worried local noble',
        "Hushed village tavern with folk who don't dare talk",
        'Mass meeting of demagogue supporters',
        'Plundered home of a member of a hated group',
        "Restive camp of the demagogue's followers",
        "Workshop full of the demagogue's eager minions"
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
    'Martial Tradition': {
      text: 'The natives have a long tradition of martial expertise. This may be a crisply-organized history of skilled native levies, or it may be a natural belligerence in the people that leaves them familiar with bloodshed. While their neighbors and liege doubtless respect their talents, this very aptitude might make them more willing to turn to steel than prudence would advise.',
      enemies: [
        { title: 'Ruthlessly amoral military leader' },
        { title: 'Obsessive martial academy master' },
        { title: 'Outsider using the locals as brute muscle' }
      ],
      friends: [
        { title: 'Determined local defender' },
        { title: 'Petitioner in need of their prowess' },
        { title: 'Keeper of the local martial way' }
      ],
      complications: [
        'They use weapons only they are able to employ',
        "They've bled themselves white in gaining glory",
        "They're eager to conquer their neighbors"
      ],
      things: [
        'Enchanted weapon related to their way',
        'Plunder taken in a victorious war',
        'Venerated battle harness of a legendary hero'
      ],
      places: [
        'Busy training ground',
        'Cemetery with many memorials',
        'City hall decorated with the banners of the vanquished'
      ]
    },
    'Master Artisan': {
      text: 'Someone living in this settlement is possessed of remarkable skills at a particular craft ({alchemist|blacksmith|artificer|tailor|leatherworking|mechanic}). The artisans resides away from major urban centers in order to {be closer to some vital raw material|escape the constant requests of others}',
      constraints: { urban: false },
      enemies: [
        { title: 'Rival artisan who wishes to use the PCs' },
        { title: 'Angry petitioner turned down by the master' },
        { title: 'Rapacious tax collector' }
      ],
      friends: [
        { title: 'Apprentice of the master', youth: true },
        { title: 'Grateful past client' },
        { title: 'Supplier in need of collectors for a valuable material' }
      ],
      complications: [
        'The artisan is unbelievably obnoxious to work with',
        "The artisan's abilities have faded with age",
        'The artisan has been forbidden to work for outsiders by the local lord'
      ],
      things: [
        "Fruits of the artisan's craft",
        'Payment offered for goods',
        'Valuable raw materials'
      ],
      places: ['Age-worn workshop', 'Bustling auction hall', 'Tavern serving aspiring customers']
    },
    'Meritocratic Exams': {
      text: 'This region is ruled by an intellectual elite chosen via ostensibly neutral examinations.',
      constraints: { capital: true, tribal: false },
      enemies: [
        { title: 'Corrupt test administrator' },
        { title: 'Incompetent, but highly-rated graduate' },
        { title: 'Ruthless leader of a clan of high-testing relations' }
      ],
      friends: [
        { title: 'Crusader for test reform' },
        { title: 'Talented but poorly-connected graduate' },
        { title: 'Genius who tests badly' }
      ],
      complications: [
        'The test is totally unrelated to necessary governing skills',
        'The test is a sham and passage is based on wealth and influence'
      ],
      things: [
        'An answer key to the next test',
        'A lost essay of incredible merit',
        'Proof of cheating'
      ],
      places: [
        'Massive examination hall',
        'An ornate government building decorated with scholarly quotes and academic images'
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
    'Natural Disaster': {
      text: 'A recent natural disaster has ravaged this community ({a flood that drowned out the community|a killing cold is making livestock and people die|a lengthy drought has threatened famine to all|a plague of locusts or other vermin scourges them|a sinkhole or avalanche buried a good part of town|a terrible storm flattened the crops and cottages|a tremendous fire that burnt homes or rich fields|an earthquake toppled important infrastructure}). Further horrors are inevitable if steps are not taken to contain the situation and aid the survivors.',
      enemies: [
        { title: 'Bandit chief controlling the only road into the area' },
        { title: "Clan leader who exploits others for their own kin's aid" },
        { title: 'Dark {magical|elemental} entity released by the disaster' },
        { title: 'Demagogue who blames an unpopular group for it' },
        { title: 'Foreign agent who wants to promote the suffering', foreign: true },
        { title: 'Incompetent official who thinks only of their own safety' },
        { title: 'Mercenary captain selling "protection" from the chaos' },
        { title: 'Sorcerer who caused this to advance their own magic' }
      ],
      friends: [
        { title: "Escapee who dodged the Antagonist's dark plans" },
        { title: 'Local official struggling to cope with the disaster' },
        { title: "Local somehow blamed for the disaster's intensity" },
        { title: 'Merchant trying to organize relief from the disaster' },
        { title: 'Religious leader whose flock is scourged by it' },
        { title: 'Someone whose {family|land} was ruined by it' },
        { title: 'Spirit of an unquiet, unburied victim of the calamity', monstrous: true }
      ],
      complications: [
        'An official is profiting cruelly on the suffering here',
        'Higher government is unable to give any assistance',
        'Looters and the vengeful are taking advantage of it',
        'The locals were totally unprepared for the disaster',
        'The disaster has revealed some lode of great treasure',
        'The disaster will strike again soon',
        'much worse',
        'The disaster wrecked something they need to survive',
        'The disaster was an arcane disruption'
      ],
      things: [
        "Cursed magical item that's calling forth the disaster",
        'Great pile of plunder collected by looters in the chaos',
        'Vital supplies needed by survivors',
        "Rich merchant's savings he was trying to get out",
        'The relic that will prevent the disaster from worsening',
        "Treasure revealed by the disaster's scathing",
        'Wealth buried in a disaster-ruined structure'
      ],
      places: [
        'Building full of the dead who thought it was safe',
        'Country estate wrecked by the disaster',
        'Ruined temple where the disaster was unleashed',
        'Desolate neighborhood emptied by flight',
        "Neighborhood ruined by the disaster's consequences",
        'Once-splendid building left in ruins by the calamity',
        'Refugee camp with miserable escapees from the disaster',
        'Road crowded with desperate escapees from the calamity',
        'A revealed ancient ruin'
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
    'Nomadic Traders': {
      text: 'This community is frequently visited by a nomadic {clan|tribe} seeking to exchange goods and services. Their presence is tolerated by the locals, although many would like to see them integrate into civilized society.',
      enemies: [
        { title: '{Merchant|Official|Noble} seeking to {exploit|oppress} the nomads' },
        { title: 'Xenophobic {merchant|official|noble}' },
        { title: 'Heartless nomadic criminal' }
      ],
      friends: [
        { title: 'Diplomatic nomadic elder', elder: true },
        { title: 'Struggling nomadic trader' },
        { title: 'Local sympathetic to nomad treatment' }
      ],
      complications: [
        'The nomads are known to become raiders during tough seasons',
        'The nomads were recently banned from entering the community',
        'The nomads help to keep bandits off the roads'
      ],
      things: ['Ancient nomadic relic', 'Stolen trade goods', 'Proof of local sabotage'],
      places: [
        'Nomadic {encampment|enclave} at the outskirts of town',
        '{Market|Trading post} where the nomads sell their wares',
        '{Shanty town|Slum} where the nomads live'
      ]
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
    'Plundered Tribute': {
      text: "Someone has stolen tribute due to or from the community. It may be taxes due the Mandarin's officials, or food supplies necessary to feed the soldiers at the nearby border fort, or it may be sacred offerings meant for the abbot of the nearby temple. Someone has taken these goods, and the locals are desperate to resolve the situation before the consequences come home to roost.",
      enemies: [
        { title: 'Thieving merchant' },
        { title: 'Grasping local official' },
        { title: 'Ruthless bandit chieftain' }
      ],
      friends: [
        { title: 'Embarrassed guard captain' },
        { title: 'Desperate tax collector' },
        { title: 'Inquiring local official' }
      ],
      complications: [
        'The one demanding tribute has no real right to it',
        'The locals are cooperating to deny the tribute-gatherer',
        'The tribute-gatherer desperately needs that tribute for some reason',
        'The tribute itself is actually somehow dangerous or cursed'
      ],
      things: [
        'Sacks of worn silver coin from taxes',
        'Bales of valuable goods',
        'Carefully-fashioned offering vessels',
        'Key to a hiding place'
      ],
      places: [
        'Secret cache in the mountains',
        'Hidden cellar',
        "Smuggler's cove",
        'A hiding place in plain sight'
      ],
      constraints: {
        urban: false
      }
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
    'Punishment Post': {
      text: 'Court politics can be an ugly business, and some magistrates or other nobles are invariably on the losing end. Officials who come out on the raw end of political entanglements are often exiled to remote borderland settlements, there to rusticate as overseers for nonexistent projects and judges for courts that are never called into session. Many burn with resentment at their lot, and will do whatever they must to return to “civilization”.',
      enemies: [
        { title: 'Enemy who wants the noble dead and not just exiled' },
        { title: ' Resentful local displaced by the noble' }
      ],
      friends: [
        { title: 'Noble who sees the PCs as a pawn' },
        { title: 'Upright noble trying to do an impossible task' },
        { title: 'Sympathetic local' }
      ],
      complications: [
        'The noble is a hopeless bungler',
        "The noble wants to remain in exile despite his family's pleas",
        'The settlement wants the noble to remain'
      ],
      things: [
        'Exquisite poetry or art done in exile',
        'Proof of the injustice of the exile',
        "The noble's uncollected pay"
      ],
      places: ['Rustic country estate', 'Humble peasant hovel', 'Unworked project site'],
      constraints: {
        urban: false
      }
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
        'They only look human',
        'but have been darkly changed',
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
        'Money meant to pay for help in fighting the bandits',
        ''
      ],
      places: [
        'A "haunted" tower the bandits know is avoided',
        'Abandoned villa re-purposed to a camp',
        'Hidden cave where the bandits lair',
        'Massacre site for an ambushed caravan',
        'Rocky outcrop with a very defensible approach',
        'Still-smoking farmhouse burnt down by bandits',
        'Thickly-wooded hollow deep in the hills',
        'Unsavory way-inn where the bandits meet',
        ''
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
    Revanchism: {
      text: 'An exiled aristocrat formerly ruled another kingdom, but was driven out and is now obsessed with reclaiming their lost lands. They may have a small army of loyalists, or they may be a lone adventurer with a small band of followers.',
      enemies: [
        { title: 'Demagogue whipping the locals on to a hopeless war' },
        { title: 'Courtier seeking to use the resentment for their own ends' },
        { title: 'Foreign diplomat seeking extradition of the exile', foreign: true }
      ],
      friends: [
        { title: 'Realist local clergy seeking peace' },
        { title: 'Sympathetic relative of the aristocrat', foreign: true },
        { title: 'Third-party diplomat trying to stamp out the fire', foreign: true }
      ],
      complications: [
        "The exile's claim is completely just and reasonable",
        'The exile committed terrible atrocities in their home kingdom',
        "The exile is related to this region's sovereign"
      ],
      things: [
        'Wealth needed to fund a military campaign',
        'Relic from the lost kingdom',
        "Proof of the exile's crimes",
        'Lost weapons shipment to arm supporters'
      ],
      places: ["The exile's luxurious residence", 'Well-stocked armory'],
      constraints: {
        urban: false
      }
    },
    'Rigid Castes': {
      text: 'The locals are divided into several castes. They may be organized by social role, by imputed nobility of birth, by ethnic origins, or any other dividing principle, but they cannot imagine any other way of organizing themselves. A hierarchy of castes is not inevitable, but there will be social and legal limits applied to ensure that each caste remains fixed in its function. The outside world may or may not respect these distinctions when dealing with the locals.',
      enemies: [
        { title: 'Conqueror seeking to impose “civilized” castes on outsiders', foreign: true },
        { title: "Impostor who'll commit any crime to conceal their true caste" },
        { title: 'Abusive upper-caste grandee' },
        { title: 'Zealous priest manipulating castes for personal gain' },
        { title: 'Ancient spirit who enforces caste traditions', monstrous: true },
        { title: 'Scholar who twists history to justify the caste system' },
        { title: 'Disgraced caste member seeking revenge on society' },
        {
          title: 'Ancient being awakened, claiming to be the progenitor of the highest caste',
          monstrous: true
        },
        { title: 'Militant faction opposing caste reform' },
        { title: 'Zealous enforcer punishing caste transgressions' },
        { title: 'Corrupt official exploiting caste system' }
      ],
      friends: [
        { title: 'Unfairly mistreated caste member' },
        { title: 'Determined reformer with a “better” caste plan' },
        { title: 'Runaway from a high caste seeking refuge among the lower castes' },
        { title: 'Outsider trying to undo the caste system' },
        { title: 'Enlightened noble secretly helping lower castes' },
        { title: 'Wanderer with knowledge of a land without castes', foreign: true },
        { title: 'Outsider merchant bringing foreign ideas and goods' },
        { title: 'Smuggler trading illegal items among castes' },
        { title: 'Charismatic leader from the lowest caste inspiring unity among the locals' },
        { title: 'Mystic who has visions of a society free from caste divisions' },
        { title: 'Resilient low-caste rebel leader' },
        { title: 'Compassionate outsider supporting caste equality', foreign: true }
      ],
      complications: [
        'The castes are marked by ancient physiological alterations',
        'Even the low caste locals are convinced the tradition is right',
        "Exceptional money or talent can change a person's caste",
        'A mysterious illness is affecting only certain castes',
        'Prophetic visions foretell dire consequences if the caste system is disrupted',
        'A recent natural disaster has forced people from different castes to work together, challenging their ingrained beliefs',
        'Caste-based rebellion is escalating into violent conflict, threatening stability and innocent lives',
        'A mysterious curse afflicts those who challenge or try to break free from their caste'
      ],
      things: [
        "Proof of a group's real caste",
        "Goods created by a caste's unpaid labors",
        'Sacred regalia only a certain caste can touch',
        'Ancient scroll revealing caste secrets',
        'An heirloom passed through generations, belonging to a forgotten caste',
        'Sacred text that challenges the legitimacy of the caste system',
        'A rare substance that only members of a specific caste can harvest',
        'A talisman that allows its wearer to communicate with ancestors from their caste',
        'Forbidden texts containing knowledge of a long-lost caste that challenges the existing hierarchy',
        'Elaborate caste insignias worn as symbols of authority and privilege',
        'Forbidden inter-caste love letters'
      ],
      places: [
        'Caste-divided residential quarters',
        'Temple dedicated to a caste',
        'Workshop of a caste',
        'Underground sanctuary for casteless refugees',
        'Hidden library containing forbidden knowledge on castes',
        'Ruined castle symbolizing oppressive caste hierarchy',
        'Underground resistance hideout for lower castes',
        'Market square bustling with inter-caste trade',
        'Sanctuary protecting caste outcasts',
        "Caste elders' secret council chamber",
        'Marketplace segregated by castes'
      ]
    },
    'Scars of War': {
      text: 'The community is still bloodied by a recent violent conflict. A crushing bandit raid, a lost siege, getting caught at the periphery of a major battle, or some other calamity has inflicted severe damage on the place. Some communities may suffer a longer-term version of this, their youths lost in a grinding, endless battle against some perpetual threat.',
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
      ],
      constraints: {
        urban: true
      }
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
    'Slave Uprising': {
      text: 'This community suffers from an ongoing slave uprising. These uprisings are savage and bloody affairs often marked out by massacres on both sides as the slaves try to escape or avenge themselves on their captors.',
      enemies: [
        { title: 'Ruthless slave owner' },
        { title: 'Bloodthirsty uprising leader' },
        { title: 'Sorcerer who wants the slaves for sacrifice' }
      ],
      friends: [
        { title: 'Slave leader seeking freedom for #possessive# fellows' },
        { title: 'Local abolitionist' }
      ],
      complications: [
        'The slaves are all violent criminals',
        'The captors are willing to let the rank and file rebels live if they hand over their leadership',
        'he uprising is being crushed and will likely not last for much longer',
        'The slaves are recently bolstered by a successful armory raid'
      ],
      things: [
        'Map {to a remote settlement that can take in the slaves|with a safe route out of the region}',
        'Precious relic of their past',
        'Armaments meant to assist the slaves'
      ],
      places: [
        'Field empty of laborers',
        'Gallows festooned with guards',
        'Training field full of slaves with improvised weapons',
        'Riotous slave market'
      ],
      constraints: {
        urban: true
      }
    },
    'Stolen Authority': {
      text: "Someone or something has just radically usurped the local authority structures. This may be a bloodless seizure of the old ruler's seat or it may be the work of savage raiders who want to seize land as well as gold. This new power structure is usually both brutal and paranoid.",
      enemies: [
        { title: 'Usurping noble pretender' },
        { title: 'Successful peasant rebel' },
        { title: 'Exiled noble from a neighboring land' },
        { title: 'Secret power behind the lord' }
      ],
      friends: [
        { title: 'Former guard captain' },
        { title: 'Noble out of favor with the new lord' },
        { title: 'Cruelly-oppressed citizen' },
        { title: "Agent of the old lord's suzerain" }
      ],
      complications: [
        'The old ruler was hated but this one is even worse',
        'The authority has been seized with no outwardly visible sign of it',
        'The new lord is a catspaw of a foreign power',
        'The new lord has a significant power base among a certain faith or organization'
      ],
      things: [
        'Stash of rebel weaponry',
        'Treasure of the old lord',
        'Savagely extorted tribute shipment',
        'Proof of a usurper’s false lineage'
      ],
      places: [
        'Burnt noble estate',
        'Gallows with dead partisans',
        'Forced assembly to hear new proclamations',
        'Hushed tavern room'
      ]
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
    'Troubled Festival': {
      text: 'An important local ritual or festival is threatened by events. Failure of the festival means severe economic or spiritual consequences, yet the locals are unable to resolve the problem. Warring families, missing vital ingredients, official displeasure, or bandit pressure might trouble it.',
      enemies: [
        { title: 'Disapproving priest' },
        { title: 'Greedy bandit chieftain' },
        { title: 'Dark spiritual power', monstrous: true },
        { title: 'Selfish peasant trying to ruin the festival' }
      ],
      friends: [
        { title: 'Desperate local leader' },
        { title: 'Merchant with all their money tied up in it' },
        { title: 'Tradition-minded elder', elder: true },
        { title: 'Hereditary ritual performer' }
      ],
      complications: [
        'Two families are fighting over control of the festival',
        'The local priest finds the festival deplorable',
        'A local ruler demands extortionate payment to permit the festival',
        'A location vital to the festival has been rendered dangerous or defiled'
      ],
      things: [
        'Crucial idol',
        'Festival necessity imported from far away',
        "Charter proving the festival's lawfulness",
        'Money raised by it'
      ],
      places: [
        'Hushed festival ground',
        'Empty marketplace',
        'Temple in disarray',
        'Sadly under-occupied tea house'
      ]
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
    'Uncertain Title': {
      text: "The settlement's occupants have a less certain claim on their land than they would like. If in the wilderness, a powerful lord or local chieftain claims the land as their property. If closer to civilization, a complex web of legal suits might make their tenancy uncertain. Impatient landowners might send thugs to ‘encourage’ the occupants to move.",
      enemies: [
        { title: 'Impatient merchant' },
        { title: 'Ambitious noble' },
        { title: 'Tribal chieftain' }
      ],
      friends: [
        { title: 'Young farmer striving to make a farmstead' },
        { title: 'Upright magistrate' },
        { title: 'Start-up merchant trying to begin a business' }
      ],
      complications: [
        'The outsider really does have legal title to the land',
        "The outsider doesn't want the land",
        "but instead wants what's beneath it",
        'The outsider is being pressured by a more nefarious power to get the land- or else'
      ],
      things: ['Title deed', 'Land payment', "Map proving the settler's case"],
      places: ['Tumbled boundary stone', 'Fortified farmhouse', 'Angry courtroom'],
      constraints: {
        urban: false
      }
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
    'Wanted Outlaw': {
      text: 'Some nefarious outlaw is committing murder in or near this community. The outlaw may simply be mad, sadistic, or they may need sacrifices for dark rituals or the appeasement of terrible spirits. In small communities such a criminal is usually careful to hide their murders as the work of natural hazards.',
      enemies: [
        { title: 'Inhuman creature masquerading as a local' },
        { title: 'Bloody cult priest' },
        { title: 'Secret hater of an ethnicity' },
        { title: 'Methodical hired assassin' },
        { title: 'Corrupt noble in alliance with the outlaw' }
      ],
      friends: [
        { title: 'Bereaved widow' },
        { title: 'Frightened witness' },
        { title: 'The evidently next victim' },
        { title: 'Grizzled monster hunter' }
      ],
      complications: [
        'The slain are political foes of a local grandee',
        'The locals quietly think the victims needed killing',
        'The apparent killer is being blackmailed by darker forces',
        'The dead are being replaced and impersonated',
        'The outlaw is actually innocent',
        'The outlaw is singled out for his attacks on a corrupt noble',
        'The outlaw is an exiled nobleman'
      ],
      things: [
        'A vital clue',
        'An item to reveal a disguised monster',
        'The thing the murderer seeks from his victims',
        'A list of victims due to die'
      ],
      places: [
        'Desolate alleyway',
        'Gory murder site',
        'Blood-stained altar chamber',
        'Tavern with locals huddling against the night'
      ]
    },
    'Warring Council': {
      text: "There's more than one leader in the community, but at least some of them are at each other's throats. It might be a conflict between formal leadership and informal authorities, or it could be a struggle among civil officials. Their interests might diverge sharply, or it could be a personal grudge that's boiled over. Outside threats and internal problems are likely being ignored until the power struggle is resolved.",
      enemies: [
        { title: 'Shadowy kingmaker bent on breaking resistance' },
        { title: 'Megalomaniacal new leader' },
        { title: '“Owned” leader forced to fight for his backers' }
      ],
      friends: [
        { title: 'Neutral leader seeking a resolution' },
        { title: 'Outside investigator looking to understand the situation' },
        { title: "Local suffering from some trouble that's being ignored" }
      ],
      complications: [
        'The most capable leader is also most at fault',
        'The struggle is being incited by an outside rival',
        "They're arguing over a problem that seems insoluble"
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
    'Witch Hunts': {
      text: 'Magic users are being hunted and executed due to a recent transgression. The transgression might be a crime against the community, or it might be a crime against the local faith. The witch-hunters might be a local militia, a religious order, or a group of nobles. The transgression might be real, or it might be a false accusation.',
      enemies: [
        { title: 'Brutal {witch-hunter|guard captain} who is going too far' },
        { title: 'Angry {noble|official|ruler} driving the hunt', veteran: true },
        { title: 'Vile sorcerer responsible for the transgression' }
      ],
      friends: [
        { title: 'Sympathetic sorcerer trying to escape' },
        { title: 'Relative of an imprisoned sorcerer' },
        { title: 'Stoic witch-hunter' },
        { title: 'Outside official trying to calm the situation' }
      ],
      complications: [
        'The sorcerers are being framed by their enemies',
        'The transgression was a great atrocity that left many dead'
      ],
      things: [
        'Confiscated arcane relics',
        'Wealth of a dead sorcerer',
        'Enchanted shackles that nullify magic',
        'Magical item that can be used to identify sorcerers'
      ],
      places: [
        'Scorched arcane sanctuary',
        'Gallows with dead sorcerers',
        'Stockade with sorcerous prisoners',
        'Luxurious manor with a secret torture chamber'
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
  },
  subtype: ({ loc }) => hub__alias(loc.hub)
}
