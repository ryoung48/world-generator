import { CourtHooks } from '../types'

export const courts: CourtHooks = {
  "Affliction's Mark": {
    text: 'Some sort of persistent, incurable illness is gnawing at the court. The principle leader might have been felled by it, or a beloved member, or it may be a spreading curse within its circles. Acute diseases will likely have the sufferers desperate to find some cure, while chronic illnesses might need regular infusions of some costly or morally-dubious remedy.',
    enemies: [
      { title: 'Manipulative quack' },
      { title: 'Amorally desperate parent' },
      { title: 'Secret spreader of plague' }
    ],
    friends: [
      { title: 'Appealing victim' },
      { title: 'Struggling physician' },
      { title: 'Worried spouse-to-be of a victim' }
    ],
    complications: [
      'The sickness is a direct result of their choices',
      'A faction would profit enormously if the current victims died',
      'The only known cure comes with a dire moral or material cost'
    ],
    things: [
      'Palliative that can slow or ease the disease',
      'Proof of its source or cause',
      'The price gathered to pay for a perhaps-real cure'
    ],
    places: [
      'Hushed and shadowed sickroom',
      'Gathering place with an air of forced gaiety',
      'Untouched quarters of the recently dead'
    ]
  },
  'Ancestral Obligation': {
    text: 'The court was impressed with some great task, duty, or role by its founder, and much of its influence or moral authority hinges on continuing to carry out that task. Its traditions and structure revolve around being able to carry out the work. Failure means disgrace and perhaps tangible penalties as old pacts are broken. Aside from this, neglecting the duty may result in other negative consequences, perhaps to parties other than the court itself.',
    enemies: [
      { title: "Schemer who'd profit by the duty's disruption" },
      { title: 'Rebel who hates the duty and care nothing for the consequences' },
      { title: "Tyrannical leader who forces others to bear the duty's cost" }
    ],
    friends: [
      { title: 'Grimly-determined keeper' },
      { title: 'Sympathetic member who suffers from the work' },
      { title: 'Outsider desperately reliant on the work being done well' }
    ],
    complications: [
      "No one fully understands the duty's meaning any more",
      'The duty comes at a terrible cost',
      'Recent calamity has left them too weak for the work'
    ],
    things: [
      'Vital tool for carrying out the job',
      'Ancient payment for the work',
      'Key to lifting the burden'
    ],
    places: [
      'Ancient work-chamber',
      'Hall emblazoned with symbols of the work',
      'Training hall for carrying on the work'
    ]
  },
  'Awesome Legitimacy': {
    text: 'The things that are certain in life are death, taxes, and this court. They are important, they have always been important, and they always will be important. They may wax and wane, but no one in their society can imagine them ever ceasing to exist, and at most the locals can only think of seizing control of the court or compelling its cooperation. Its destruction is unthinkable. It may have absolute control of some critical social function, have members of legendary awe, or be viewed as the personal property of some divinity or godlike entity.',
    enemies: [
      { title: 'Implacable tyrant consecrated by custom', veteran: true },
      { title: "Manipulator who cloaks #possessive# will in the court's legitimacy" },
      { title: "Outsider who'll ruin the court despite the chaos such a thing would create" }
    ],
    friends: [
      { title: 'Court member keenly aware of their responsibility' },
      { title: 'Local haplessly oppressed by the court' },
      { title: 'Outsider who deals cautiously with the court' }
    ],
    complications: [
      'The court really is as indispensable as it seems',
      'The source of its untouchability is weakening',
      "If it goes down it's taking much of local society with it"
    ],
    things: [
      'Regalia of ancient authority',
      'Dusty deed to a rich property',
      'Wealth of a failed rebel against it'
    ],
    places: [
      'Long-forgotten spare throne room',
      'Ancient archive',
      'Gathering place in use for ages'
    ]
  },
  'Awkward Birth': {
    text: "A pregnancy is roiling the court and causing severe problems. It may be that a member is pregnant by the wrong man, or a pairing took place that was shocking to society, or a newly-born heir is showing signs of an inherited curse, or a new heir suddenly excludes a displeased prior incumbent. The court can't hush it forever, and abortion is either impractical, unacceptable, or too dangerous to the mother. This may not stop certain members from trying.",
    enemies: [
      { title: 'Elder who would see the problem “solved”', elder: true },
      { title: 'Murderously suspicious spouse' },
      { title: 'Demoted heir' }
    ],
    friends: [
      { title: 'Naive young lover', youth: true },
      { title: 'Desperate hidden paramour' },
      { title: 'Worried sire of the unwanted child' }
    ],
    complications: [
      'Secret accusations of illegitimacy are being passed through the court',
      "The disgraced husband's family is enraged",
      'The pregnancy is just a tool the mother is using to get her way'
    ],
    things: [
      'Proof of the real father',
      "Blackmail material on the court's leadership",
      'Wealth stolen away by the former presumptive heir'
    ],
    places: [
      'Nursery much worse-appointed than expected',
      'Prison-like room for the expectant mother',
      'Stronghold estate of the disappointed former heir'
    ]
  },
  'Blandished Leadership': {
    text: 'The leadership has been led astray by one or more pretty girls or boys. They dote on their paramours, granting them extravagant favors and imperiling the court with the lengths they go to in order to please their beloved. Those not given to romantic dizziness may be enraptured by more physical talents, so occupied in the business of night that nothing is done in the day.',
    enemies: [
      { title: 'Rival who sent them the playthings as gifts' },
      { title: 'Ruthlessly manipulative lover', youth: true },
      { title: 'Murderously angry neglected spouse' }
    ],
    friends: [
      { title: 'Sadly displaced former favorite' },
      { title: 'Frustrated underling' },
      { title: 'Disapproving moralist' }
    ],
    complications: [
      'The paramours have a supernatural edge in their charms',
      'Their spouse likes them distracted so as to carry out their own plans',
      'The court is fighting over influence with the paramours rather than the leadership'
    ],
    things: [
      'Priceless luxury demanded by a lover',
      'Trinket of great worth abandoned by them',
      'Wealth gathered to build some pleasure for them'
    ],
    places: [
      'Seraglio of constant liveliness',
      'Court hall abandoned by the leadership',
      'Pleasure-garden redolent of luxury'
    ]
  },
  'Cadet Branches': {
    text: "The authority of the court is somewhat splintered, with multiple cadet branches of the family, enterprise, or department having their own share of its power. These branches are likely to struggle over control of the main court, with some of them perhaps preferring the court's dissolution rather than allowing a hated rival to gain control of it.",
    enemies: [
      { title: 'Disgraced scion with a plan for revenge', youth: true },
      { title: 'Ruler who hates a particular branch', veteran: true },
      { title: 'Scheming leader of a minor branch', veteran: true }
    ],
    friends: [
      { title: 'Bastard offspring seeking recognition', youth: true },
      { title: 'Visionary from a cadet branch' },
      { title: 'Rightful leader denied their place', veteran: true }
    ],
    complications: [
      'One “cadet” branch actually has a right to rule but is too weak to claim it',
      'The main court plays the branches against each other',
      'Outside rivals want the court to remain splintered'
    ],
    things: [
      "Proof of a branch's illegitimacy",
      'Bribe paid to get a branch to cooperate',
      "Blackmail material on the main court's ruler"
    ],
    places: [
      'Ostentatious branch estate',
      'More modest but far older main estate',
      'Court hall with places for all the branches'
    ]
  },
  'Capricious Orders': {
    text: 'The court is issuing unreasonable orders to those under its authority, demanding excessive tribute, unreasonable obediences, or similar sacrifices. The court leader may be new and over-confident of their power, or the court may be in dire trouble and needs more resources, or rival forces may be goading or manipulating the court into overplaying its hand out of recklessness or ignorance of the true state of affairs.',
    enemies: [
      { title: 'Arrogant new lord' },
      { title: 'Mentally unstable or bewitched ruler', veteran: true },
      { title: "Scheming advisor in a rival power's pay" }
    ],
    friends: [
      { title: 'Mistreated subject of the court' },
      { title: 'Frustrated moderate member' },
      { title: 'Reasonable rival of the current ruler', veteran: true }
    ],
    complications: [
      'The demands are all to fulfill a great secret plan',
      'The demands are punishment for a failed rebellion',
      "The court doesn't want to make the demands but is somehow forced to do so"
    ],
    things: [
      'Heavy load of tribute',
      'Stolen treasure that the court demanded be produced',
      'Privately-diverted wealth from the demands'
    ],
    places: [
      'Angry court reception hall',
      'Public plaza with darkly-grumbling locals',
      'Enterprise closed down due to a failure to deliver on the demands'
    ]
  },
  'Cultural Insignia': {
    text: 'The court produces some famously revered cultural product, such as literature, poetry, painting, sculpture, music, dance, or other art form. Their members may have a direct tradition of production, or they may be the critical patrons of a tradition of artists or a school that produces the product. The product wins them respect among the cultured, and many would be glad to assist them in exchange for the luster of association.',
    enemies: [
      { title: 'Ruler who would crush rival schools', veteran: true },
      { title: 'Chief artist gone mad with jealousy or megalomania' },
      { title: 'Rival artist determined to destroy the tradition' }
    ],
    friends: [
      { title: 'Earnest artistic genius' },
      { title: 'Poor court member determined to patronize as best they can' },
      { title: 'Unworldly aesthete concerned only with art' }
    ],
    complications: [
      'The art has actual magical powers when well made',
      'The art encourages or glorifies some reprehensible cause',
      'The artists are savagely factional in their different schools'
    ],
    things: [
      'Lost legendary work of art',
      'Proof that a famed piece of art is a forgery of the original',
      'Hidden masterwork of a dead genius'
    ],
    places: [
      'Salon dedicated to appreciating the art',
      'Workshop where the art is made',
      'Grand public structure adorned with the art'
    ]
  },
  'Daring Ambition': {
    text: "The court has a grand ambition which is driving its actions, and it's making a major bet on its ability to achieve its goal. Failure will mean catastrophe for the court, while success promises great rewards. Not all the members of the court are necessarily sharing the same risks and potential payoff, however, and some may be paying more than they'd ever profit.",
    enemies: [
      { title: 'Megalomaniacal leader' },
      { title: 'Well-meaning but hopelessly optimistic ruler', veteran: true },
      { title: 'Secret manipulator driving the ambition' }
    ],
    friends: [
      { title: 'Sympathetic necessary sacrifice for the cause' },
      { title: 'Court member struggling to do their share' },
      { title: "Ally who'd profit if the court succeeded" }
    ],
    complications: [
      "The court thinks the ambition is one thing but the leadership knows it's another",
      "The ambition's success would be a poisoned gift",
      'A faction plans to monopolize the benefit or shift all the loss'
    ],
    things: [
      'Critical material for the ambition',
      'Costly remnants of a failed effort',
      'A valuable result of progress in the ambition'
    ],
    places: [
      'Enterprise or establishment dedicated to the cause',
      'Newly-constructed edifice',
      'Hall optimistically prepared to celebrate victory'
    ]
  },
  'Dark Secret': {
    text: 'The court has a dark secret that would cost it dearly if it were to be revealed. Loss of influence, station, money, or power might all be consequent. It may involve old treacheries, hidden crimes, secret illegitimacies, dark pacts, or harsh choices that were unavoidable at the time. The uppermost ranks likely know the truth, but the lesser members may have nothing but unpleasant suspicions.',
    enemies: [
      { title: "The villain they're allied with" },
      { title: 'Ruthless keeper of secrets' },
      { title: 'Amorally villainous ruler', veteran: true }
    ],
    friends: [
      { title: 'Secretly worried lesser court member' },
      { title: 'Outside investigator' },
      { title: "Bitter survivor of the court's crime" }
    ],
    complications: [
      'The act was acceptable or normal at the time it was committed',
      'Revealing it would implicate other important powers',
      "The court's leadership has tried to quietly make amends for it"
    ],
    things: [
      'Proof of the heinous crime',
      'Precious treasure acquired through the sin',
      'Valuable relic taken from a victim of the crime'
    ],
    places: [
      'Secret archive full of dark evidence',
      'Noble monument built on a dark substrate',
      'Private sanctum for only the inner circle'
    ]
  },
  'Decadent Court': {
    text: "The court is too absorbed in their pleasures and indulgences. Their cooperation is purchased with coin or flesh, their disports grow ever more costly and excessive, and even the minor members are getting accustomed to shameful enjoyments. Their power is being turned toward facilitating their membership's appetites rather than fulfilling whatever role got them their status in the first place.",
    enemies: [
      { title: 'Jaded and sensation-starved ruler', veteran: true },
      { title: "Cruel panderer for the court's hungers" },
      { title: 'Monstrous entity that sponsors or encourages vice', monstrous: true }
    ],
    friends: [
      { title: 'Escaped would-be subject' },
      { title: 'Inquisitive outside investigator' },
      { title: "Frustrated native in need of the court's execution of its duty" }
    ],
    complications: [
      "The court's leadership is uninvolved and using the vices to blackmail and control their underlings",
      "The court's trying to spread its vices in its own social stratum and profit accordingly",
      'A faction is taking things much too far even for their brethren and involving occult powers'
    ],
    things: [
      'Debt-slave contracts',
      'Hideous but precious idol or art object',
      'Valuable drug made from slaves'
    ],
    places: [
      'Debauched salon',
      'Court public hall made sinister',
      'Pit where the human chattel are kept'
    ]
  },
  "Devil's Bargain": {
    text: "The court made a bargain that's now coming back to haunt them. Some pact with an outside power gave them a crucial edge or a desperately-needed boost, but now it needs to provide services, favors, or help that could end up destroying it or costing its leadership dearly. The pact was probably secret at the time, and even revealing it exists could have dire repercussions.",
    enemies: [
      { title: 'Vile entity it pacted with', monstrous: true },
      { title: 'Ruler planning on foisting the price off on a victim', veteran: true },
      { title: 'Heartless creditor who cares nothing for the damage it does' }
    ],
    friends: [
      { title: 'Undeserving victim of the price' },
      { title: 'Rival who suspects something is up' },
      { title: 'Enemy of the power they pacted with' }
    ],
    complications: [
      'Only a small faction of the court knows about the bargain',
      "The current leadership didn't know about the deal until it was threatened into compliance",
      'The power they pacted with is a mortal enemy of their society'
    ],
    things: [
      'Blackmail material the pact granter is using to control them',
      'Potent relic granted in the deal',
      'Heavy tribute due to the pacting power'
    ],
    places: [
      'Monument to the victory the pact secretly gave them',
      "Secret chambers for the pact's granter",
      'Shrine to the dark entity they propitiated'
    ]
  },
  'Diplomatic Demands': {
    text: "Some rival or outside power is making demands on the court that they cannot easily ignore. It might involve some prior offense in need of reparations, a past deal that's come due, or a price required for a favor that the court desperately needs. These demands are more than the court can easily pay, and determining where the burden will fall most heavily is a matter of fierce internal politics.",
    enemies: [
      { title: 'Scheming shifter of burdens' },
      { title: 'Outside rival bent on beggaring the court' },
      { title: "Incompetent diplomat who's only making things worse" }
    ],
    friends: [
      { title: 'Victim of unfair exactions' },
      { title: 'Harried diplomat with no cards to play' },
      { title: 'Native who desperately needs the deal to go through' }
    ],
    complications: [
      'The exactions demanded are purely punitive',
      "There's a specific temporary reason the court has to acknowledge the demands",
      'Another party could give a better deal if they were persuaded'
    ],
    things: [
      'Huge down payment on the demands',
      'The precious object the court is trying to acquire',
      'Proof that the demands are unjustified'
    ],
    places: [
      'Diplomatic retreat full of tense people',
      'Site of the problem causing the demands',
      'Hushed court hall full of whispers'
    ]
  },
  'Disputed Inheritance': {
    text: "The court's rule or property is due to pass on to the next generation, but there are multiple claimants to it. Each has some colorable legitimacy, and factions and secret supporters are doubtless rife in the court. They're well-balanced enough that brute force seems a risky route to take, though matters are rapidly coming to a head as the need to establish a new leader is intense.",
    enemies: [
      { title: 'Cruel and vicious heir' },
      { title: 'Incompetent heir who has the best claim' },
      { title: 'Outside enemy backing the strife' }
    ],
    friends: [
      { title: 'Most talented heir but with the worst position' },
      { title: 'Hapless heir in dire need of protection' },
      { title: 'Loyal retainer trying to avert disaster' }
    ],
    complications: [
      'Legitimacy rests on possession of a now-lost relic',
      'If the struggle lasts much longer the patrimony will be ruined or lost',
      'A selfish regent is exploiting the court during the interregnum'
    ],
    things: [
      'Bribe intended for the faction leaders',
      'Precious relic of legitimacy',
      'The real and verified will'
    ],
    places: [
      'Tense and angry court meeting hall',
      "Heir's country estate",
      "Court plaza where the factions don't mingle"
    ]
  },
  'Excess Heirs': {
    text: "While the ruler remains vigorous, they have too many legitimate heirs for the court to comfortably absorb. There's not enough wealth or power to give the losers a dignified station, or else the losing heirs may expect to be executed, or the heirs are locked in a court-disrupting battle to force their desired outcome. Various heirs might be backed by rival outside powers searching for a convenient catspaw.",
    enemies: [
      { title: 'Cruel but talented crown prince' },
      { title: 'Scion in league with dark powers' },
      { title: 'Secretly murderous spare heir' }
    ],
    friends: [
      { title: 'Capable but hard-pressed candidate' },
      { title: 'Hapless ruler unable to enforce a choice', veteran: true },
      { title: 'Vengeful retainer of a murdered heir' }
    ],
    complications: [
      'The ruler desires a Darwinian culling of heirs',
      'The court desperately needs the heirs to cooperate to overcome a threat',
      'Several heirs were formerly unknown'
    ],
    things: [
      "Proof of a candidate's illegitimacy",
      'Bribe from an enemy power',
      'Relic meant to eliminate a rival'
    ],
    places: [
      'Well-fortified home of an heir',
      'Court hall where the factions are well-separated',
      'Ritual occasion of enforced amity'
    ]
  },
  'False Prize': {
    text: "The court is trying to obtain a goal or ambition that will actually be disastrous for it. Either through political miscalculation, ignorance of the truth, or willful blindness to the consequences, they're plunging headlong towards calamity. Rivals might be secretly aiding them in their purpose, while factions within the court may be uselessly protesting the danger of the path they've chosen.",
    enemies: [
      { title: 'Foolhardy ruler with grand plans', veteran: true },
      { title: 'Treacherous advisor encouraging disaster' },
      { title: 'Trickster leading the court to its ruin' }
    ],
    friends: [
      { title: 'Clear-sighted court member who is being ignored' },
      { title: 'Victim of the danger the court is facing' },
      { title: 'Disfavored faction leader warning of peril' }
    ],
    complications: [
      "The prize's benefits will attract an overwhelming foe",
      "The prize will corrupt or ruin the court's leadership",
      'The prize comes with secret problems or obligations that will plague the court'
    ],
    things: [
      'Proof that the prize would be a disaster',
      'The key to unlocking the prize',
      "Rich reward that seems to be a foretaste of the prize's benefits"
    ],
    places: [
      'Edifice built as part of the effort',
      'Ruined seat of a former holder of the prize',
      'Secret facility where terrible prices are paid in pursuit of it'
    ]
  },
  'Fatal Extravagance': {
    text: "The court is exhausting itself on luxuries or displays of magnificence that it cannot truly afford. It may feel pressured to do so in order to maintain face before its rivals, or it may over-estimate its resources, or it may be being manipulated by whatever group they're buying their luxuries from. Optimistic courts may be betting on a future windfall that may or may not come.",
    enemies: [
      { title: 'Smiling merchant of addictive drugs' },
      { title: 'Grandiose ruler', veteran: true },
      { title: 'Selfishly hedonistic court member' }
    ],
    friends: [
      { title: 'Court member vainly trying to economize' },
      { title: 'Worried accountant' },
      { title: 'Client upset at the lack of expenditures on their vital need' }
    ],
    complications: [
      'The extravagance is serving a secret magical or ritual purpose',
      "It's being paid for with debt the court intends to never need to repay",
      'The waste is the product of a new ruler who has different expectations of what they deserve'
    ],
    things: [
      'Shipment of precious luxuries',
      'Payment meant for the next round of indulgences',
      'Precious item that is to be pawned or sold to fund the luxuries'
    ],
    places: [
      'Gaudily-adorned court structure',
      'Celebration of wild excess',
      'Ostentatious and newly-built monument to their luxuries'
    ]
  },
  'Forbidden Romance': {
    text: "Someone in the court is deeply in love with someone they shouldn't be. It may be a rival from another court, a lowly commoner, an incestuous bond, an attraction to a forbidden demihuman, a fellow court member's spouse, or a spectacularly horrible person who can only bring them misery. This love may or may not be reciprocated, and it may be an open secret to others.",
    enemies: [
      { title: "Unreciprocated lover who won't take no for an answer" },
      { title: 'Cruelly manipulative object of affection' },
      { title: 'Court elder bent on terminating the relationship', elder: true }
    ],
    friends: [
      { title: 'Earnest matchmaker friend' },
      { title: 'Appealing paramour' },
      { title: 'Aspiring peacemaker who wants the match' }
    ],
    complications: [
      'The reasons for opposing the match are extremely good',
      'The court member is being exploited by the paramour or their manipulators',
      'A rival court member wants the match to go through so the court member will be disgraced'
    ],
    things: [
      'Proof that the lover is not what they seem',
      'A gift the enamored should not have given',
      'A token that will legitimize the pairing'
    ],
    places: [
      'Secret rendezvous spot',
      'Hidden prison for a reluctant lover',
      'Court festival where unacceptable hints are given'
    ]
  },
  'Foreign Ties': {
    text: "The court has strong ties with some foreign power or organization, one that may or may not be hostile to their greater polity. The court draws some considerable advantage from this tie, but it's also expected to assist its affiliate in their own local goals. If the affiliate is an enemy or rival of their people, this tie may be carefully hidden, or it may be a known scandal about the court.",
    enemies: [
      { title: 'Foreign spymaster with demands', foreign: true },
      { title: 'Rival who despises the foreign power' },
      { title: "Court member who's a wholly-owned agent of the power" }
    ],
    friends: [
      { title: 'Appealing foreign petitioner', foreign: true },
      { title: 'Harried court member trying to square their obligations' },
      { title: 'Outside inquisitor into suspicious doings' }
    ],
    complications: [
      'The power used to be friendly to the polity but has recently been viewed as a rival',
      "The court is secretly reliant on the foreign power's support",
      'The support consists of the foreign power not doing something that they could do'
    ],
    things: [
      'Funding from the power',
      'Precious item the court needs to turn over',
      'The macguffin the power wants the court to obtain for them'
    ],
    places: [
      'Court hall in an architectural style like that of the power',
      'Home with foreign-derived elements',
      'Archive with documents in a foreign tongue'
    ]
  },
  'Gate Keeper': {
    text: 'The court controls access to some critical resource or social function. It might have an effective lock on the local law, or control the irrigation network for regional farms, or provide vital religious services to faithful believers. If it abuses this power too greatly, however, its rivals will combine against it and may seize control of the resource.',
    enemies: [
      { title: "Reckless leader who's overplaying their hand" },
      { title: 'Outside schemer planning to break their monopoly' },
      { title: "Corrupt court member who's undermining the control for their own benefit" }
    ],
    friends: [
      { title: 'Earnest outsider with a monopoly-breaking idea' },
      { title: "Frustrated court member trying to reform the monpoly's administration" },
      { title: 'Hard-pressed local mistreated by the monopoly' }
    ],
    complications: [
      'The next alternative monopolist is much worse',
      'A monopoly-breaker has vile intentions',
      'The monopoly rests with them for secret but very good reasons'
    ],
    things: [
      'Some good produced by the monopoly',
      'License or leave to violate the monopoly',
      'Device that greatly weakens the monopoly'
    ],
    places: [
      'Site where the monopoly is practiced',
      'Secret wildcatter site of unlicensed production',
      "Private production site of one of the court's elites"
    ]
  },
  'Hidden Blight': {
    text: 'One or more members of the court are afflicted with the Blight, but are concealing their condition. Their particular Blight is not physically obvious to onlookers, but may have severe psychological or hidden physical manifestations. At least some of the other court members have a good reason to aid this concealment, if only to avoid the scandal of being known to carry Blighted genetics.',
    enemies: [
      { title: 'Blight-demented leader being shielded by others' },
      { title: 'Ruthless investigator seeking answers' },
      { title: "Murderous court member bent on 'resolving' matters" }
    ],
    friends: [
      { title: 'Blighted struggling with their curse' },
      { title: 'Court member trying to protect the secret' },
      { title: 'Blighted parent trying to help their child' }
    ],
    complications: [
      'The Blight is light enough to be lifted somehow',
      'The Blight is somehow useful to the afflicted',
      'They disguise the Blight as a wildly excessive human inclination'
    ],
    things: [
      'Drug that ameliorates the Blight',
      'Proof of a Blighted lineage',
      'Bribe paid to hush the matter'
    ],
    places: [
      'Secret retreat for expressing Blighted urges',
      'Hall of glorified ancestral memorials',
      'Prison for badly-affected Blighted members'
    ]
  },
  'Hopeless Rival': {
    text: "The court has a rival or enemy that bears a burning desire to destroy them. Unfortunately for them, they're wholly incapable of doing so. This fanatical desire may be born of past crimes, cheated opportunities, or an ancient feud. In their desperation to strike at their enemy, it's likely the rival will go to extreme and unwise lengths, perhaps making bargains they ought not to make.",
    enemies: [
      { title: "Oft-beaten rival of the court's ruler", veteran: true },
      { title: 'Disgraced court member turned renegade' },
      { title: 'Spare heir with a grudge' }
    ],
    friends: [
      { title: 'Sympathetic enemy of the court' },
      { title: "Rival's associate trying to stop them from going too far" },
      { title: 'Inquisitor looking into nefarious dealings' }
    ],
    complications: [
      "The rival's hate is very justifiable",
      "The rival's engineering a clash with a greater power",
      'The rival is being set up as a kamikaze attack by a manipulative third party'
    ],
    things: [
      'Doomsday tool the rival means to use',
      'Blackmail material on the court',
      'Precious relic the rival paid dearly to acquire'
    ],
    places: [
      "Site of the rival's past defeat",
      'Location related to the hate',
      "Structure built with the fruits of the court's past victory"
    ]
  },
  'Impure Blood': {
    text: "Bloodline and lineage are important to the court, either because of a bloodline-dependent power or a society that places much importance on it. Despite this, the court's lineage would be considered impure by others were it fully known, perhaps due to some secret pairings in the remote past. The court might have to go to extremes in order to mimic the powers appropriate to their supposed bloodline, or else go to similar extents to crush any hint of the truth.",
    enemies: [
      { title: 'Court assassin cleaning up loose ends' },
      { title: 'Rival prying into a dangerous leak' },
      { title: 'Court member making a terrible bargain to blot out the stain' }
    ],
    friends: [
      { title: 'Court member undeserving of the obloquy' },
      { title: 'Innocent threatened with disaster by the truth' },
      { title: 'Hunter seeking the entity they pacted with' }
    ],
    complications: [
      'The “impurity” was once celebrated in the hidden past',
      "It's an open secret but their rivals lack actionable proof",
      "They're privately working to overthrow the rules that would call them impure"
    ],
    things: [
      'Proof of their impurity',
      "Device that gives them power they wouldn't normally have",
      'Inheritance from their hidden ancestry'
    ],
    places: [
      'Hidden site associated with their concealed blood',
      'Proud monument to their social station',
      'Secret graves of their real ancestors'
    ]
  },
  'Inadequate Tools': {
    text: "The court's authority and power have been sustained for a long time by a particular set of tools and tactics, such as violence, money, blackmail, legal rights, or perhaps by particular alliances with other powers. Recent events or clumsy missteps by the court have rendered these old tools no longer effective, but the leadership doesn't have any better idea than to use them again, but harder this time.",
    enemies: [
      { title: 'Manipulator goading the ruler to excesses' },
      { title: 'Frustrated ruler with no new ideas', veteran: true },
      { title: 'Court member scheming to restore their old power' }
    ],
    friends: [
      { title: 'Anguished victim of their overreach' },
      { title: 'Court member trying to find new footing' },
      { title: 'Member fearful of the consequences of their frustration' }
    ],
    complications: [
      'The tools are “working” but are building up a ruinous debt of resentment',
      'Their efforts are only serving to strengthen their rivals',
      "The tools are actually going to be completely successful if the ruler's scheme to push them to an extreme works"
    ],
    things: [
      'Relic to empower their favorite tactic',
      'Wealth needed to fuel their plans',
      'Priceless implement necessary to effectively use their tactics'
    ],
    places: [
      'Structure dedicated to their favorite methods',
      'Site where the method went awry',
      'Site of the method currently in use'
    ]
  },
  'Inept Ruler': {
    text: "The court's ruler is incompetent or debilitated, but there's no practical way to remove them from power. The alternative might be utterly unacceptable, or the ruler's bungling might be very much to the benefit of a powerful faction in the court. Rivals are doubtless making plans to take advantage of the situation, and internal factions may well be willing to take acceptable losses in order to profit by the chaos.",
    enemies: [
      { title: 'Insane ruler', veteran: true },
      { title: 'Sincere but utterly unsuitable leader' },
      { title: 'Sinister manipulator influencing the puppet ruler' }
    ],
    friends: [
      { title: 'Competent but unsupported alternative ruler', veteran: true },
      { title: "Victim of the ruler's bungling" },
      { title: "Faction leader being crushed by the ruler's ineptitude", veteran: true }
    ],
    complications: [
      'The ruler seems like an idiot but is actually trying to achieve a secret goal with their actions',
      'Rival courts are vigorously backing the leader',
      "The leader's deposition would result in a ruinous state of chaos for the court"
    ],
    things: [
      'Token that would legitimize a change of rule',
      "Object that would cure the ruler's incapacity",
      "Wealth that was lost by the leader's bungling"
    ],
    places: [
      "Damaged or decrepit structure owing to the ruler's neglect",
      'Chaotic and confused court hall',
      'Building erected as a folly by the ruler'
    ]
  },
  'Iron Law': {
    text: "There are troublesome or problematic laws to the court that its members simply cannot break. They may be enforced by magical curses, by an inborn predilection of the court's members, or by a tradition that would unite all rivals against the offender. These laws are likely preventing them from resolving a problem that is currently growing worse.",
    enemies: [
      { title: 'Suicidally rigid ruler', veteran: true },
      { title: 'Troublemaker who exploits the law' },
      { title: "Traitor who is somehow immune to the law's force" }
    ],
    friends: [
      { title: 'Innovator trying to work around the law or repeal it' },
      { title: 'Troubled defender of the law who sees the problem' },
      { title: "Affiliate who can't be helped because of the law" }
    ],
    complications: [
      'The law is there for a good reason and breaking it would be worse than the problem',
      'The law can be changed if a certain great deed is done',
      "The law's enforcer is corrupt or mutable in judgment"
    ],
    things: [
      'Key object that gives the law its force',
      'Token that allows the bearer to ignore or lift the law',
      'Precious treasure that is unreachable as long as the law remains in force'
    ],
    places: ['Chamber of judgment', 'Punishment place for offenders', 'Site of the growing problem']
  },
  'Lost Purpose': {
    text: "The court's original formation revolved around a particular duty or role that has long since been forgotten. This may be a metaphorical forgetting, like a idealistic young businessman turning to coldhearted avarice, or it may be a literal loss of some ancient charge or consecrated role. This forgetting may have left the court with ancestral obligations they no longer understand, or resources they no longer use in the intended way.",
    enemies: [
      { title: 'Leader wholly absorbed in their own ambitions' },
      { title: "Outsider made hostile by the court's failure to do their duty" },
      { title: 'Enemy who prospers by their forgetting' }
    ],
    friends: [
      { title: 'Earnest historian who knows the truth' },
      { title: 'Last stubborn upholder of the role' },
      { title: 'Petitioner who needs them to do their old duty' }
    ],
    complications: [
      'The purpose was a vile and terrible one',
      'Their current prosperity depends on ignoring the purpose',
      'The consequences of their forgetting are going to be dire'
    ],
    things: [
      'Proof of their original purpose',
      'Potent artifact meant to aid their role',
      'Treasure once given to them in repayment for their work'
    ],
    places: [
      'Forgotten chamber for the duty',
      'Lost site of importance',
      'Place damaged by the forgetting'
    ]
  },
  'Magical Subversion': {
    text: 'Some member of the court is under magical influence by another, be it an outside enemy or internal rival. It may be mind-bending sorcery, a persistent magical curse, or an arcane blessing that will last only so long as they cooperate. The culprit has some means of ensuring this subversion is not easily detected, either through occult arts or simply ensuring that others never get curious enough to look for such things.',
    enemies: [
      { title: "Harmless-seeming member who's a secret mage" },
      { title: 'Mercenary sorcerer hired by rivals' },
      { title: 'Court favorite who induces that affection with magic' }
    ],
    friends: [
      { title: 'Suspicious local mage' },
      { title: 'Relative with suspicions but no proof' },
      { title: 'Victim of uncharacteristic behavior by the subverted member' }
    ],
    complications: [
      'The subversion is part of a known and accepted enchantment on the target',
      "They'll die or suffer horribly if the subversion is lifted",
      "They're consciously cooperating with the subverter"
    ],
    things: [
      'Charm to lift the curse or mind-bending',
      'Proof of magical interference',
      'The artifact being used to subvert the target'
    ],
    places: [
      'Out-of-place location to find the target',
      "Site that's recently been changed to fit their new demands",
      'Sinister lair where the enchantment was wrought'
    ]
  },
  'Ministerial Capture': {
    text: "The upper functionaries or senior household servants of the court have taken effective control of it. The members may be too distracted to realize what's been done, or the servants may have irresistible blackmail on them, or they may have the unjustified but complete trust of the proper leadership. These functionaries are using the court's resources to pursue their own aggrandizement and profit.",
    enemies: [
      { title: 'Colorless senior bureaucrat', veteran: true },
      { title: 'Scheming butler', veteran: true },
      { title: 'Spymaster or intelligence chief turned kingmaker', veteran: true }
    ],
    friends: [
      { title: 'Minor court member who realizes the problem' },
      { title: 'Lesser functionary upset by the corruption' },
      { title: 'Proper leader made helpless by the situation' }
    ],
    complications: [
      'The ministers think the proper leadership is incompetent',
      'The ministers are really serving a rival',
      'The leadership honestly prefers to leave everything to the ministers'
    ],
    things: [
      'Documentation proving ministerial malfeasance',
      'Malversated court resources',
      'Blackmail evidence on the court leadership'
    ],
    places: [
      'Abandoned official audience chamber',
      'Private residence of the ministerial kingmaker',
      'Clerkly offices bustling with petitioners'
    ]
  },
  'New Generation': {
    text: "The court's prior leadership was recently decimated by age, sickness, misadventure, or political executions, leaving many leadership posts in the hands of much younger, less experienced members. Few of them have a firm grasp on practicalities, and they're acting with a confidence and boldness that may not necessarily be justified by their actual skills.",
    enemies: [
      { title: 'Reckless spare heir turned ruler', youth: true },
      { title: 'Upstart using a role purely for their personal advantage' },
      { title: 'Outside rival pouncing on their untested leadership' }
    ],
    friends: [
      { title: 'Harried senior advisor who is ignored', veteran: true },
      { title: "Baffled new ruler who doesn't understand how it works", youth: true },
      { title: 'Idealistic new office-holder with big dreams', youth: true }
    ],
    complications: [
      'The new generation is being held back by ossified existing members',
      'They have magnificent plans that will fail spectacularly',
      "They didn't want the jobs but were forced into them by circumstances"
    ],
    things: [
      'Lost treasure or resources the old guard hid',
      'Ceremonial regalia that imbues legitimacy',
      'Secret plans or archives that the former ruler hid'
    ],
    places: [
      'Newly-remodeled court residence',
      'Audience hall adorned with freshly-changed arms',
      'Ministerial office full of confused and harried clerks'
    ]
  },
  'New Opportunity': {
    text: 'Some special new opportunity has been presented to the court, one that offers a great deal of personal wealth or glory. Only some of the court can take advantage of it, however, and it can be easily spoiled by dissent from within; they argue now over who is to be allowed to exploit the opportunity. New unexplored lands, royal monopoly patents, the hand of a very eligible spouse, or some other limited windfall awaits the winner.',
    enemies: [
      { title: 'Bitter enemy who had the opportunity taken from them and given to the court' },
      { title: 'Jealous internal spoiler who plots to ruin it' },
      { title: 'Leader who greedily seeks to keep all of it to themselves' }
    ],
    friends: [
      { title: 'Talented but ill-supported candidate' },
      { title: 'Outsider who wants the opportunity handled fairly' },
      { title: 'Disenfranchised true discoverer of the opportunity' }
    ],
    complications: [
      "It's a trap and will ruin those who embrace it",
      'The ease of any one spoiler ruining it has paralyzed deliberations',
      'The opportunity has its own ideas about who should exploit it'
    ],
    things: [
      'Key to unlocking the opportunity',
      'Rich treasure safeguarded by the opportunity',
      'Token that will allow the holder to exploit the opportunity'
    ],
    places: [
      'Site where the new chance is brightest',
      'Camp or building for preparations',
      'Site of a failed effort'
    ]
  },
  'Outside Debts': {
    text: "The court owes something awful to a pitiless outside power, whether a rival court, an enemy of their homeland, a vile sorcerer, a merciless banker, or a grasping lord. The consequences of failing to repay the debt would be catastrophic, but the court can't afford to do so without some members of them being ruined by the price, whether in coin, criminal conviction, disgrace, or eternal damnation.",
    enemies: [
      { title: 'Ruler who means to shift the debt to another', veteran: true },
      { title: 'Savage enforcer of the debt' },
      { title: 'Culprit who brought the debt on them with their ambitions' }
    ],
    friends: [
      { title: 'Innocent being forced to pay the price' },
      { title: 'Suspicious investigator looking into the debt' },
      { title: "Past victim of the creditor's cruel ways" }
    ],
    complications: [
      "Revealing the debt's existence would ruin the court",
      'The creditor completely deserves to be paid',
      'An old rival has bought the debt and now holds it'
    ],
    things: [
      'Riches needed to pay off the debt',
      'Proof that the contract was invalid',
      'The document or token that is needed to enforce the debt'
    ],
    places: [
      'Lair of the creditor',
      'Court holding being sold or given away to help satisfy the debt',
      'Great court ceremony made insultingly meager to save money'
    ]
  },
  'Overextended Grasp': {
    text: "The court has seized control of land, offices, noble roles, businesses, or some other valuable holding, but they do not hold it securely. Rival forces are pressing on them and they have exhausted their resources in simply gaining the prize, and have nothing left with which to keep it in the face of resistance. The rivals may simply be fighting to determine which of them is to overthrow the overextended court's grip.",
    enemies: [
      { title: 'Foolishly ambitious ruler', veteran: true },
      { title: 'Schemer who has profited by the reach even if it fails' },
      { title: 'Desperate leader who is abusing the prize to help keep it' }
    ],
    friends: [
      { title: 'Former holder of the prize trying to regain it' },
      { title: 'Earnest new owner in far over their head' },
      { title: 'Loyal retainer struggling with insufficient resources' }
    ],
    complications: [
      "The prize is a poisoned fruit that will destroy them if they don't let it go",
      'They gambled on support that has been somehow delayed or denied',
      'They mean to destroy the prize rather than lose it'
    ],
    things: [
      'Riches meant for the owner of the prize',
      "Device or document that will destroy the prize's value",
      'Treasure the rivals mean to use to seize the prize'
    ],
    places: [
      "Seat of the prize's authority",
      "Court holding that's understaffed and under-resourced",
      "Marginal prize holding that's already been lost"
    ]
  },
  'Poisonous Cliques': {
    text: 'The court is riven by at least two viciously hostile cliques, both of which are determined to ruin or kill the other. Nonaligned members of the court are forced to submit to one or the other lest they be enemies to both and all normal business of the court is paralyzed by their incessant quarreling. This hostility may be open and overt, or it may be veiled behind venomous courtesies and cruelly heartless protocols.',
    enemies: [
      { title: 'Outside rival who provoked the clique formation' },
      { title: 'Traitor seeking mutual destruction' },
      { title: 'Brutal clique leader who will do anything for victory' }
    ],
    friends: [
      { title: 'Unaligned member trying to stay alive' },
      { title: 'Outside ally distressed by the infighting' },
      { title: 'Weak leader unable to rein in the hostilities' }
    ],
    complications: [
      'One clique is sympathetic but just as determined to attain total victory as the other',
      'The cliques are destroying the very prize they fight over',
      'A secret internal faction waits to pick up the pieces'
    ],
    things: [
      'Treasure the cliques are fighting over',
      'Tool or artifact meant to break the stalemate',
      "Documents showing a traitor within one clique's leadership"
    ],
    places: [
      'Well-separated court residences for the cliques',
      'Holding ruined by their infighting',
      'Destroyed former residence of a loser of the fighting'
    ]
  },
  'Rampant Corruption': {
    text: "The court is so corrupt that it's crippling its ability to function. Even the most mundane exercises of authority require that the right people be bribed or induced, and its members have little or no interest in the overall good of the group. The leadership is hanging together only because the court is profitable and they will defend it only insofar as it remains so.",
    enemies: [
      { title: 'Hopelessly venal ruler', veteran: true },
      { title: 'Greedy kingmaker behind the scenes' },
      { title: 'Colorless head bureaucrat with sticky palms' }
    ],
    friends: [
      { title: 'Member with an earnest loyalty to principle' },
      { title: 'Court member cast out for not playing along' },
      { title: 'Victim of some bribed crime the court committed' }
    ],
    complications: [
      "The court's members actually desperately need the money",
      'All the graft is going to only a few strong hands',
      'Their enemies have multiple traitors on their payrolls'
    ],
    things: [
      'Great hoard of extracted pelf',
      "Inescapable proof of a leader's wrongdoing",
      'Misdirected bribe payment'
    ],
    places: [
      'Grimy back room where deals are made',
      'Court salon made a market for favors',
      'Court structure clearly starved of its supposed funds'
    ]
  },
  'Recent Brutality': {
    text: 'Violence is an unfortunate commonplace in many courts, but something happened here recently that was beyond all usual bounds of polite assassination or genteel political execution. Some vast massacre of a whole family line, a berserk slaughter of an unlucky gathering, a humiliating and unthinkable execution of some grandee, or some other dramatic brutality has put everyone on edge and made many start thinking of some previously unthinkable courses of action.',
    enemies: [
      { title: 'Ruler with out-of-control bloodthirst', veteran: true },
      { title: 'Spree-killing spymaster' },
      { title: 'Brutal court member with no one daring to check them' }
    ],
    friends: [
      { title: 'Heir to a recent victim' },
      { title: 'Helpless enforcer of the usual norms' },
      { title: 'Survivor of a recent massacre' }
    ],
    complications: [
      'The victims arguably deserved it',
      'The source of the violence is being secretly controlled by a member',
      "Everyone else is about to embrace the new norms of violence if it's not punished soon"
    ],
    things: [
      'Device used to enable the killing',
      'Treasure left behind by one of the slain',
      'List of who is to die next'
    ],
    places: [
      'Haunted site of the killing',
      'Secret memorial to the slain',
      'Unbearably tense court ceremony'
    ]
  },
  'Priestly Influence': {
    text: "The court's leadership is in the thrall of a particular religion or holy figure, and their wishes are given an undue weight. This influence may be a matter of perfectly sincere faith, or the religion might have some special grip on the court due to blackmail, services rendered, or special need. Such influence often brings the hostility of rival faiths until a more equitable arrangement is made.",
    enemies: [
      { title: 'Sinister holy figure' },
      { title: 'Zealously pious ruler', veteran: true },
      { title: 'Spider-minded court chaplain with strings on everyone' }
    ],
    friends: [
      { title: 'Court member who favors a different god' },
      { title: 'Castoff former house priest' },
      { title: 'Client abandoned so that resources could go to the faith' }
    ],
    complications: [
      'The faith is giving major help to the court',
      'The sect the court follows is considered heretical by the main faith',
      "The faith's opponents in the court are being backed by a hostile outside group"
    ],
    things: [
      'Sacred relic of the faith',
      'Costly tithe sum to be offered to the faith',
      "Symbol of authority over the court's religious practice"
    ],
    places: [
      'Grand newly-built chapel',
      'Abandoned chapel of a former faith',
      'Ritual site for a new ceremony'
    ]
  },
  'Proxy Speaker': {
    text: "The court's leader communicates only through a particular proxy, be it a chief minister, spouse, heir, concubine, confessor, or other figure of importance. The leader may be too sick or enfeebled to lead or the proxy may have systematically cut all their other lines of control. The other members of the court may vie for influence over the proxy, perhaps while ignoring their ostensible real ruler.",
    enemies: [
      { title: 'Grasping favorite odalisque' },
      { title: 'Impatient heir-proxy' },
      { title: 'Scheming regent-minister' }
    ],
    friends: [
      { title: 'Worried child of the leader', youth: true },
      { title: 'Cast-off former advisor' },
      { title: 'Persecuted enemy of the proxy' }
    ],
    complications: [
      "The proxy is actually the cause of the leader's incapacitation",
      'The proxy is a much better leader than the real one',
      'The proxy is really working for a rival or enemy power'
    ],
    things: [
      "Cure for the leader's incapacitation",
      "Proof of the proxy's unsuitability",
      'Wealth subverted by the proxy'
    ],
    places: [
      'Abandoned throne room',
      'Sick chamber of incapacitated leader',
      "Proxy's office teeming with petitioners"
    ]
  },
  'Regency Council': {
    text: "A council of powerful regents runs the court due to the youth, incapacity, or sickness of the legitimate ruler. Some of these regents may actually have the ruler's interests in mind, but others are exploiting the court's resources for their own benefit, taking it as no more than their just due for their services. Some may be making a point of ensuring that the regency is a permanent state of affairs.",
    enemies: [
      { title: 'Abusive prime minister' },
      { title: 'Selfish parent- or relative- regent' },
      { title: 'Self-absorbed great noble guardian' }
    ],
    friends: [
      { title: 'Loyal servant of the true ruler' },
      { title: 'Well-meaning member of the council' },
      { title: 'Deposed former regent who was too loyal' }
    ],
    complications: [
      'The regents are keeping a totally disastrous ruler from taking power',
      'The strength of the regents is direly needed right now',
      "One or more regents is in a rival power's pay"
    ],
    things: [
      "Proof of the council's treachery",
      "Remedy for the ruler's incapacitation",
      'Resources necessary to make a loyalist strong enough to take control'
    ],
    places: [
      'Council chamber crowded with servants',
      'Private villa for secret dealings',
      'Ceremonial throne room where the ruler is ignored'
    ]
  },
  'Restive Lessers': {
    text: "The court's servants and lesser officials are angry with the leadership. Old privileges may have been revoked, traditional rights and fees may have been curtailed, or particular sacrifices or dire perils may have been demanded of them. The court is confident that their lessers can do nothing but obey, but the minions are very close to a dramatic response.",
    enemies: [
      { title: 'Ruler who cares nothing for their displeasure', veteran: true },
      { title: 'Arrogant chief minister' },
      { title: 'Outside rival backing disunity in the court' }
    ],
    friends: [
      { title: 'Aggrieved lesser official' },
      { title: 'Worried grandee who sees trouble coming' },
      { title: "Client who needs the court's unimpaired assistance" }
    ],
    complications: [
      'Traditional but corrupt perquisites were reformed and the minions were deprived of them',
      'A much loved official or leader was killed or deposed',
      "Other courts' minions are getting perks or benefits that this court can't afford to give"
    ],
    things: [
      'Subverted wealth traditionally due to the minions',
      'Document proving old rights',
      'Treasure taken from a leader of the minions'
    ],
    places: [
      "Quietly furious servant's quarters",
      'Ominously deserted hall',
      'Far-too-crowded plaza where the minions gather'
    ]
  },
  'Rival Dreams': {
    text: "The court has big dreams; unfortunately, they're contradictory. Two or more major factions each have a grand plan for the court's future success, but these plans are incompatible, and the factions are struggling to determine which of them the court will follow. The leader is either incapable of breaking the deadlock or else they support one of the plans but lack sufficient allies to impose it on the unbelievers.",
    enemies: [
      { title: 'Charismatic but wildly impractical dreamerlord' },
      { title: 'Selfish purveyor of a plan that will chiefly aid them' },
      { title: 'Stubborn ruler who will brook no compromise with their dream', veteran: true }
    ],
    friends: [
      { title: 'Genius with poor social skills' },
      { title: 'Inheritor of a familial dream' },
      { title: 'Would-be peacemaker between the factions' }
    ],
    complications: [
      'Both dreams are likely to damage the court',
      'They agree on the goal but have contradictory ways of getting there',
      'The dreams are irrelevant and only an excuse to eliminate a rival faction'
    ],
    things: [
      'Vital resources to achieve a plan',
      'Critical device needed for a plan',
      'Proof that a plan is hopeless'
    ],
    places: [
      'Salon or base where a faction schemes',
      'Field where a partially-complete plan is being furthered',
      'Half-completed monument to glory'
    ]
  },
  'Rival Power': {
    text: 'The official hierarchy of the court is being challenged by a second power source within the organization, one strong enough to stymie its official lord. This may be a faction formed by a powerful lord, a charismatic religious faction, an intrusive consul of a superior power, or an impatient heir with too many friends. Neither power source can act freely while the other exists, but destroying the rival may bring down the court in the process.',
    enemies: [
      { title: 'Unofficial pretender to the rulership' },
      { title: 'Secretive kingmaker' },
      { title: 'Incompetent leader with strong help' }
    ],
    friends: [
      { title: 'Court member trying to make peace' },
      { title: "Victim of the rival factions' infighting" },
      { title: 'Disillusioned former backer of a faction' }
    ],
    complications: [
      'The rival power has a very good but also very self-interested reason to seek control',
      'The rival power has all the most competent people',
      "The legitimate lord will bring down the court with him if he's overthrown"
    ],
    things: [
      'Tokens of legitimate authority',
      'Blackmail sufficient to ruin a faction',
      'Resources suborned by a faction'
    ],
    places: [
      'Unofficial throne room of the rival faction',
      'Court offices split into different groups',
      'Unnaturally well-fortified country estate of a faction'
    ]
  },
  'Shining Successor': {
    text: 'The impending heir to the court is a remarkable figure, gifted with tremendous aptitudes or personal capability. Everyone is convinced they will lead the court to new heights of glory, though existing powers may prefer that glory be postponed indefinitely rather than give up their current posts.',
    enemies: [
      { title: 'Bitter mother of a rival heir' },
      { title: 'Ruler who refuses to admit their capability', veteran: true },
      { title: 'Vengeful former heir who was put aside' }
    ],
    friends: [
      { title: 'Worried mentor of the successor' },
      { title: "Ruler who fears for their successor's safety", veteran: true },
      { title: 'Loyal minion of the successor' }
    ],
    complications: [
      'The successor is a genius but has truly horrible traits as well',
      'The successor is being backed by a rival who thinks to use them',
      "The successor's talents are vast but are precisely the wrong skills for the situation they will face"
    ],
    things: [
      'Regalia due to the rightful heir',
      'A marvelous work produced by the successor',
      'Proof that the successor has no legitimate claim on rulership'
    ],
    places: [
      'Salon where the successor shines brilliantly',
      'Site of a grand triumph by the successor',
      'Throne room where the successor gets more attention than the ruler'
    ]
  },
  'Splendid Seat': {
    text: 'This court operates from a seat of power far beyond the splendor of their peers. It may be some ancient enchantment full of magical powers and benefits, or an ancestral fortress famed in song and legend, or a complex built around some source of precious material or extracted good. Much of the authority of the court might derive from their control of this seat.',
    enemies: [
      { title: "Ruler who is relying too heavily on the seat's benefits", veteran: true },
      { title: 'Saboteur seeking to destroy the seat' },
      { title: 'Hostile entity bound or associated to the seat', monstrous: true }
    ],
    friends: [
      { title: "Caretaker of the seat's benefits" },
      { title: "Court member fascinated with the seat's history and nature" },
      { title: 'Servant of a line with ancestral ties to the place' }
    ],
    complications: [
      'The seat exacts a cost from those who dwell there',
      "The seat's real power is misunderstood by all save the ruler's inner circle",
      'The seat is somehow a prison as well as a throne'
    ],
    things: [
      "Key to unlocking the seat's secret powers",
      'Precious relic of a former age',
      "Wealth obtained through the seat's qualities"
    ],
    places: [
      'Strange chamber of some long-lost purpose',
      'Hidden room deep within the structure',
      'Grand and magnificent structure embodying the site'
    ]
  },
  'Ruling Regalia': {
    text: "The court's rulership rests on one or more ancient, powerful relics. Quite aside from any practical use they may have, they symbolize the leader's right of rule, and any loss of them will throw the court into chaos. It's not unknown for the court's leadership to be suddenly changed when a new rival manages to seize them, whether by guile or brute force.",
    enemies: [
      { title: 'Master thief in the employ of a rival' },
      { title: 'Strong-arm court member plotting their chance' },
      { title: "Outside figure who just wants the relics' power" }
    ],
    friends: [
      { title: 'Traditional guardian of the relics' },
      { title: 'Ruler too weak to reliably safeguard them', veteran: true },
      { title: 'Would-be thief trying to get them from an unworthy ruler' }
    ],
    complications: [
      'The relics were lost some time ago and are currently forgeries',
      'The power of the relics is objectively necessary for the ruler to function',
      'A bearer will die if the relics are removed for too long'
    ],
    things: [
      'Device that will destroy or nullify a relic',
      'Perfect forgery of a relic',
      'Another relic perfectly identical in all ways'
    ],
    places: [
      'Tightly-guarded repository for the relics',
      'Ceremonial procession showing the relics',
      'Court structure or edifice powered by the relics'
    ]
  },
  'Runaway Rule': {
    text: 'Out of overwork, sloth, or carelessness, the court has devolved much of its authority on some subsidiary group or power, leaving it to do the dirty work of a critical function. That group has seized control of that authority, however, and now bids fair to claim leadership of the court itself using its newfound leverage.',
    enemies: [
      { title: 'Ambitious leader of the lesser group' },
      { title: 'Indolent and careless ruler', veteran: true },
      { title: 'Greedy minister profiting by the devolution' }
    ],
    friends: [
      { title: "Client suffering due to the subsidiary's actions" },
      { title: 'Minister robbed of effective power by the group' },
      { title: "People being oppressed by the group's excesses" }
    ],
    complications: [
      'The group has considerable outside backing',
      "The group really is doing something critical to the court's function",
      "The court is now actually incapable of handling the group's duties"
    ],
    things: [
      "Wealth obtained by the group's actions",
      'Treasure given to the group originally to induce them',
      'Powerful relic obtained by the group as a tool'
    ],
    places: [
      "Structure dedicated to the group's devolved duty",
      "Country estate of the group's leader",
      'Abandoned structure of the court that once handled it'
    ]
  },
  'Sublime Skill': {
    text: 'The court is tremendously good at a particular role or function that their society finds important. Magnificent soldiers, legendary artists, famed diplomats, pious official-priests, or some other quality of note defines them. This skill may be the product of a venerable tradition of instruction, however harsh it may be, or it could be the result of a magical bloodline or inhuman admixture.',
    enemies: [
      { title: 'Ruler who takes the trait much too far in a bad direction', veteran: true },
      { title: 'Renegade who uses the skill against the court' },
      { title: 'Outside power trying to manipulate the skill for their own benefits' }
    ],
    friends: [
      { title: 'Unworldly but extremely talented court member' },
      { title: 'Outsider curious about the nature of the skill' },
      { title: 'Friendly rival seeking to test their skill' }
    ],
    complications: [
      'The skill comes at some compensating cost',
      'The court is fairly useless for anything but that skill',
      'The court is abusing its skill for its own benefit'
    ],
    things: [
      'Relic or item that can confer the skill',
      "Wealth obtained through the skill's exercise",
      'Magnificent trophy of some prior legendary feat of skill'
    ],
    places: [
      'Monument to prior exercise of the skill',
      'Training hall where the skill is honed',
      'Memorial hall full of tokens of past glory'
    ]
  },
  'Sudden Strength': {
    text: 'A grand stroke of luck, a brilliant plan, or a feat of sublime diplomacy have resulted in a great influx of wealth, influence, or support from outside the court. The group now has access to a newfound strength that may be fleeting, and not all members may have equal access to the benefits. The existing structure of authority is unlikely to be well-equipped to exert this new influence in delicate or well-considered ways.',
    enemies: [
      { title: 'Power-drunk ruler pushing things to excess', veteran: true },
      { title: "Desperate rival trying to sabotage the court before it's too late" },
      { title: 'Outside patron using this new strength as a lever to control the court' }
    ],
    friends: [
      { title: 'Official struggling to cope with the new situation' },
      { title: 'Old court friend now seeking help', elder: true },
      { title: 'Victim of a poorly-considered exercise of the strength' }
    ],
    complications: [
      "The new strength is causing damage each time it's deployed",
      'Their backers are just letting the court overextend itself before pulling the aid',
      "The court's agents are taking personal advantage"
    ],
    things: [
      'Money obtained by the good fortune',
      "Potent relic that's part of the new strength",
      'Secret evidence of the real purpose of the help being given'
    ],
    places: [
      "Crushed rival's estate",
      'Gaudily-upgraded court holding',
      'Confused site of sudden activity'
    ]
  },
  'Threatened Violence': {
    text: "The shadow of impending death hangs over the court. The ruler may be ordering capricious executions, assassins may be active, a particularly bloody custom may be in full effect, or the court's superiors may be hunting for traitors. The court members are on edge and willing to do desperate things in order to avoid death or direct the killing toward their enemies.",
    enemies: [
      { title: 'Paranoid ruler seeing knives in every shadow', veteran: true },
      { title: 'Master assassin with a grudge', veteran: true },
      { title: "Renegade who's returned to take vengeance" }
    ],
    friends: [
      { title: 'Survivor of a murdered member' },
      { title: 'Worried bodyguard looking for help' },
      { title: "Frightened member convinced they're next" }
    ],
    complications: [
      'The violence is being blamed on the wrong source',
      'People are using the killings to settle private scores',
      'The victims were all part of a secret scheme'
    ],
    things: [
      'Poison suitable for eliminating anyone',
      'List of those next to die',
      'Document with information that will stop the killings'
    ],
    places: [
      'Gory scene of death',
      'Unbearably tense court function',
      'Trial full of panicked participants'
    ]
  },
  'Waning Wealth': {
    text: 'The court is heading towards poverty, and its members know it. The source of their wealth is under attack, either by a rival, a greedy superior, an outside enemy, or sheer misfortune. If things continue as they are the court will be unable to maintain its place, and its members are contemplating desperate measures to shore up existing holdings or acquire new ones.',
    enemies: [
      { title: "Ruler who's making unreasonable demands for member sacrifices", veteran: true },
      { title: 'Sinister creditor who demands repayment' },
      { title: "Monstrous foe who's ruining their holdings", monstrous: true }
    ],
    friends: [
      { title: 'Harried chancellor looking for money' },
      { title: 'Client left destitute by lack of support' },
      { title: 'Former manager of a now-ruined holding' }
    ],
    complications: [
      "They're cutting secret deals with enemies of their land",
      'Unpopular members are being beggared to support the others',
      'Their clients are being squeezed dry just to keep the court solvent'
    ],
    things: [
      'Long-lost treasure the court is hunting',
      'Deed to some profitable holding',
      'Device that will revitalize or repair a ruined property'
    ],
    places: [
      'Threadbare throne room',
      'Meager noble dining hall',
      'Abandoned once-profitable holding'
    ]
  }
}
