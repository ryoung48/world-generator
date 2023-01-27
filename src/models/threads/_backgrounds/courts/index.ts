import { hub__isVillage } from '../../../regions/hubs'
import { Province } from '../../../regions/provinces/types'
import { WeightedDistribution } from '../../../utilities/math'
import { Background, Thread } from '../types'
import { Court } from './types'

export const backgrounds__court: Record<Court, Background> = {
  "affliction's mark": {
    tag: "affliction's mark",
    type: 'court',
    context: `They are being ravaged by a persistent, terrible illness. It is {an acute disease that has the sufferers desperate to find a cure|a chronic illness that requires regular infusions of some {costly|morally-dubious} remedy}.`,
    enemies: [
      { alias: `Manipulative con-artist` },
      { alias: `Amorally desperate relative`, relative: true },
      { alias: `Secret spreader of plague` }
    ],
    friends: [
      { alias: `Appealing victim` },
      { alias: `Struggling physician` },
      { alias: `Worried spouse-to-be of a victim` }
    ],
    complications: [
      `A {beloved|respected} member has recently been felled by this disease`,
      `A faction would profit enormously if the current victims died`,
      `The only known cure comes with a dire {moral|material} cost`
    ],
    things: [
      `a palliative that can {slow|ease} the disease`,
      `proof of its {source|cause}`,
      `the price gathered to pay for a perhaps-real cure`
    ],
    places: [
      `in a hushed and shadowed sickroom`,
      `at a gathering place with an air of forced gaiety`,
      `in the untouched quarters of the recently dead `
    ]
  },
  'ancestral obligation': {
    tag: 'ancestral obligation',
    type: 'court',
    context: `They were impressed with a great {task|duty|role} by their founder, and much of their {influence|moral authority} hinges on continuing to carry out that task. Their traditions and structure revolve around being able to carry out the work. Failure means disgrace and tangible penalties as old pacts are broken. Neglecting the duty will result in other negative consequences that could affect the entire community.`,
    enemies: [
      { alias: `Schemer who'd profit by the duty's disruption` },
      { alias: `Rebel who hates the duty and care nothing for the consequences` },
      { alias: `Tyrannical leader who forces others to bear the duty's cost` }
    ],
    friends: [
      { alias: `Grimly-determined keeper` },
      { alias: `Sympathetic member who suffers from the work` },
      { alias: `Outsider desperately reliant on the work being done well` }
    ],
    complications: [
      `No one fully understands the duty's meaning any more`,
      `The duty comes at a terrible cost`,
      `Recent calamity has left them too weak for the work`
    ],
    things: [
      `a vital tool for carrying out the job`,
      `ancient payment for the work`,
      `the key to lifting the burden`
    ],
    places: [
      `in an ancient work-chamber`,
      `in a hall emblazoned with symbols of the work`,
      `in a training hall for carrying on the work `
    ]
  },
  'awesome legitimacy': {
    tag: 'awesome legitimacy',
    type: 'court',
    context: `They are important, they have always been important, and they will always be important. They may wax and wane, but no one in their society can imagine them ever ceasing to exist, and at most the locals can only think of {seizing control of its operations|compelling its cooperation}. Its destruction is unthinkable. It {has {absolute control of some critical social function|members of legendary awe}|viewed as the personal property of some {divinity|godlike entity}}.`,
    enemies: [
      { alias: `Implacable tyrant consecrated by custom` },
      { alias: `Manipulator who cloaks #possessive# will in the court's legitimacy` },
      { alias: `Outsider who'll ruin the court despite the chaos such a thing would create` }
    ],
    friends: [
      { alias: `Court member keenly aware of their responsibility` },
      { alias: `Local haplessly oppressed by the court` },
      { alias: `Outsider who deals cautiously with the court` }
    ],
    complications: [
      `The court really is as indispensable as it seems`,
      `The source of its untouchability is weakening`,
      `If it goes down it's taking much of local society with it`
    ],
    things: [
      `regalia of ancient authority`,
      `the dusty deed to a rich property`,
      `the wealth of a failed rebel against it`
    ],
    places: [
      `at a long-forgotten spare throne room`,
      `at an ancient archive`,
      `at a gathering place in use for ages `
    ]
  },
  'awkward birth': {
    tag: 'awkward birth',
    type: 'court',
    context: `A pregnancy is roiling the court and causing severe problems. A {member is pregnant by the wrong partner|pairing took place that was shocking to society|new heir suddenly excludes a displeased prior incumbent}. The court can't hush it forever, and abortion is {impractical|unacceptable|too dangerous to the mother}. This may not stop certain members from trying.`,
    enemies: [
      { alias: `Member who would see the problem "solved"` },
      { alias: `Murderously suspicious husband`, gender: 'male' },
      { alias: `Demoted heir` }
    ],
    friends: [
      { alias: `Naive lover`, gender: 'male' },
      { alias: `Desperate hidden paramour`, gender: 'male' },
      { alias: `Worried sire of the unwanted child`, gender: 'male' }
    ],
    complications: [
      `Secret accusations of illegitimacy are being passed through the court`,
      `The disgraced husband's family is enraged`,
      `The pregnancy is just a tool the mother is using to get her way`
    ],
    things: [
      `proof of the real father`,
      `blackmail material on the court's leadership`,
      `wealth stolen away by the former presumptive heir`
    ],
    places: [
      `at a nursery much worse-appointed than expected`,
      `at a prison-like room for the expectant mother`,
      `at a stronghold estate of the disappointed former heir `
    ]
  },
  'blandished leadership': {
    tag: 'blandished leadership',
    type: 'court',
    context: `The leader has been led astray by {a lover|multiple lovers}. They dote on their paramours, granting them extravagant favors and imperiling the court with the lengths they go to in order to please their beloved. Those not given to romantic dizziness may be enraptured by more physical talents, so occupied in the business of night that nothing is done in the day.`,
    enemies: [
      { alias: `Rival (#rival#) who sent them the playthings as gifts` },
      { alias: `Ruthlessly manipulative lover`, gender: 'female' },
      { alias: `Murderously angry neglected spouse`, gender: 'female' }
    ],
    friends: [
      { alias: `Sadly displaced former favorite`, gender: 'female' },
      { alias: `Frustrated underling` },
      { alias: `Disapproving moralist` }
    ],
    complications: [
      `The paramours have a supernatural edge in their charms`,
      `Their spouse likes them distracted so as to carry out their own plans`,
      `The court is fighting over influence with the paramours rather than the leadership`
    ],
    things: [
      `a priceless luxury demanded by a lover`,
      `a trinket of great worth abandoned by them`,
      `the wealth gathered to build some pleasure for them`
    ],
    places: [
      `at a harem of constant liveliness`,
      `at a court hall abandoned by the leadership`,
      `at a pleasure-garden redolent of luxury `
    ]
  },
  'capricious orders': {
    tag: 'capricious orders',
    type: 'court',
    context: `The court is issuing unreasonable orders to those under its authority, demanding {excessive tribute|unreasonable obedience|great sacrifices}. {The court {leader is new and over-confident of their power|is in dire trouble and needs more resources}|Rival forces are {goading|manipulating} the court into overplaying its hand out of {recklessness|ignorance of the true state of affairs}}.`,
    enemies: [
      { alias: `Arrogant new lord` },
      { alias: `{Mentally unstable|Bewitched} ruler` },
      { alias: `Scheming advisor in a rival power's pay (#rival#)` }
    ],
    friends: [
      { alias: `Mistreated subject of the court` },
      { alias: `Frustrated moderate member` },
      { alias: `Reasonable rival of the current ruler` }
    ],
    complications: [
      `The demands are all to fulfill a great secret plan`,
      `The demands are punishment for a failed rebellion`,
      `The court doesn't want to make the demands but is forced to do so`
    ],
    things: [
      `a heavy load of tribute`,
      `stolen treasure that the court demanded be produced`,
      `privately-diverted wealth from the demands`
    ],
    places: [
      `at an angry court reception hall`,
      `at a public plaza with darkly-grumbling locals`,
      `at an enterprise closed down due to a failure to deliver on the demands `
    ]
  },
  'cultural insignia': {
    tag: 'cultural insignia',
    type: 'court',
    context: `The court produces some famously revered cultural product ({literature|poetry|painting|sculpture|music|dance}). Their members {have a direct tradition of production|are critical patrons of a {tradition of artists|school that produces the product}}. The product wins them respect among the cultured, and many would be glad to assist them in exchange for the luster of association.`,
    enemies: [
      { alias: `Ruler who would crush rival schools` },
      { alias: `Chief artist gone mad with {jealousy|megalomania}` },
      { alias: `Rival artist determined to destroy the tradition` }
    ],
    friends: [
      { alias: `Earnest artistic genius` },
      { alias: `Poor court member determined to patronize as best they can` },
      { alias: `Unworldly aesthete concerned only with art` }
    ],
    complications: [
      `The art has actual magical powers when well made`,
      `The art {encourages|glorifies} some reprehensible cause`,
      `The artists are savagely factional in their different schools`
    ],
    things: [
      `a lost legendary work of art`,
      `proof that a famed piece of art is a forgery of the original`,
      `a hidden masterwork of a dead genius`
    ],
    places: [
      `at a salon dedicated to appreciating the art`,
      `at an artist's workshop`,
      `at a grand public structure adorned with the art `
    ]
  },
  'daring ambition': {
    tag: 'daring ambition',
    type: 'court',
    context: `The court has a grand ambition which is driving its actions, and it's making a major bet on its ability to achieve its goal. Failure will mean catastrophe for the court, while success promises great rewards. Not all the members of the court share the same risks and potential payoff, however, and some may be paying more than they'd ever profit.`,
    enemies: [
      { alias: `Megalomaniacal leader` },
      { alias: `Well-meaning, but hopelessly optimistic ruler` },
      { alias: `Secret manipulator driving the ambition` }
    ],
    friends: [
      { alias: `Sympathetic necessary sacrifice for the cause` },
      { alias: `Court member struggling to do their share` },
      { alias: `Ally who'd profit if the court succeeded` }
    ],
    complications: [
      `The court thinks the ambition is one thing, but the leadership knows it's another`,
      `The ambition's success would be a poisoned gift`,
      `A faction plans to {monopolize the benefit|shift all the loss}`
    ],
    things: [
      `critical material for the ambition`,
      `the costly remnants of a failed effort`,
      `a valuable result of progress in the ambition`
    ],
    places: [
      `at an {enterprise|establishment} dedicated to the cause`,
      `at a newly-constructed edifice`,
      `at a hall optimistically prepared to celebrate victory `
    ]
  },
  'dark secret': {
    tag: 'dark secret',
    type: 'court',
    context: `The court has a dark secret that would cost it dearly if it were to be revealed, involving {old treacheries|hidden crimes|secret illegitimacies|dark pacts|harsh choices that were unavoidable at the time}. Loss of influence, station, money, or power might all be consequent. The uppermost ranks likely know the truth, but the lesser members may have nothing but unpleasant suspicions.`,
    enemies: [
      { alias: `The villain they're allied with` },
      { alias: `Ruthless keeper of secrets` },
      { alias: `Amorally villainous ruler` }
    ],
    friends: [
      { alias: `Secretly worried lesser court member` },
      { alias: `Outside investigator` },
      { alias: `Bitter survivor of the court's crime` }
    ],
    complications: [
      `The act was {acceptable|normal} at the time it was committed`,
      `Revealing it would implicate other important powers`,
      `The court's leadership has tried to quietly make amends for it`
    ],
    things: [
      `proof of the heinous crime`,
      `precious treasure acquired through the sin`,
      `a valuable relic taken from a victim of the crime`
    ],
    places: [
      `at a secret archive full of dark evidence`,
      `at a noble monument built on a dark substrate`,
      `in a private sanctum for only the inner circle `
    ]
  },
  'decadent court': {
    tag: 'decadent court',
    type: 'court',
    context: `The court is too absorbed in their pleasures and indulgences. Their cooperation is purchased with coin or flesh, their disports grow ever more costly and excessive.{ Even the minor members are getting accustomed to shameful enjoyments.|} Their power is being turned toward facilitating their membership's appetites rather than fulfilling whatever role got them their status in the first place.`,
    enemies: [
      { alias: `Jaded and sensation-starved ruler` },
      { alias: `Cruel panderer for the court's hungers` },
      {
        alias: `Monstrous entity that {sponsors|encourages} vice`,
        monstrous: true
      }
    ],
    friends: [
      { alias: `Escaped would-be subject` },
      { alias: `Inquisitive outside investigator` },
      { alias: `Frustrated native in need of the court's execution of its duty` }
    ],
    complications: [
      `The court's leadership is uninvolved and using the vices to blackmail and control their underlings`,
      `The court's trying to spread its vices in its own social stratum and profit accordingly`,
      `A faction is taking things much too far even for their brethren and involving occult powers`
    ],
    things: [
      `debt-slave contracts`,
      `a hideous, but precious {idol|art object}`,
      `a valuable drug made from slaves`
    ],
    places: [
      `at a debauched salon`,
      `at a court public hall made sinister`,
      `near a pit where the human chattel are kept `
    ]
  },
  "devil's bargain": {
    tag: "devil's bargain",
    type: 'court',
    context: `The court made a{ secret|} bargain that's now coming back to haunt them. The pact was with an outside power that gave them a {crucial edge|desperately-needed boost}, but now the court needs to provide {services|favors|help} that could end up {destroying it|costing its leadership dearly}.`,
    enemies: [
      { alias: `Vile {spirit|aberration} it pacted with`, monstrous: true },
      { alias: `Ruler planning on foisting the price off on a victim` },
      { alias: `Heartless creditor who cares nothing for the damage it does` }
    ],
    friends: [
      { alias: `Undeserving victim of the price` },
      { alias: `Rival who suspects something is up` },
      { alias: `Enemy of the power they pacted with` }
    ],
    complications: [
      `Only a small faction of the court knows about the bargain`,
      `The current leadership didn't know about the deal until it was threatened into compliance`,
      `The power they pacted with is a mortal enemy of their society`
    ],
    things: [
      `blackmail material that the pact granter is using to control them`,
      `a potent relic granted in the deal`,
      `the heavy tribute due to the pacting power`
    ],
    places: [
      `at a monument to the victory the pact secretly gave them`,
      `in the secret chambers for the pact's granter`,
      `at a shrine to the dark entity they propitiated `
    ]
  },
  'diplomatic demands': {
    tag: 'diplomatic demands',
    type: 'court',
    context: `Some {rival|outside} power (#rival#) is making demands on the court that they cannot easily ignore, involving a {prior offense in need of reparations|past deal that's come due|price required for a favor that the court desperately needs}. These demands are more than the court can easily pay, and determining where the burden will fall most heavily is a matter of fierce internal politics.`,
    enemies: [
      { alias: `Scheming shifter of burdens` },
      { alias: `Outside rival (#rival#) bent on beggaring the court` },
      { alias: `Incompetent diplomat who's only making things worse` }
    ],
    friends: [
      { alias: `Victim of unfair exactions` },
      { alias: `Harried diplomat with no cards to play` },
      { alias: `Native who desperately needs the deal to go through` }
    ],
    complications: [
      `The exactions demanded are purely punitive`,
      `There's a specific temporary reason the court has to acknowledge the demands`,
      `Another party could give a better deal if they were persuaded`
    ],
    things: [
      `a huge down payment on the demands`,
      `the precious object the court is trying to acquire`,
      `proof that the demands are unjustified`
    ],
    places: [
      `at a diplomatic retreat full of tense people`,
      `at the site of the problem causing the demands`,
      `in a hushed court hall full of whispers `
    ]
  },
  'disputed inheritance': {
    tag: 'disputed inheritance',
    type: 'court',
    context: `The court's rule is due to pass on to the next generation, but there are multiple claimants to it. Each has some colorable legitimacy. Factions and secret supporters are doubtless rife in the court. They're well-balanced enough that brute force seems a risky route to take, though matters are rapidly coming to a head as the need to establish a new leader is intense.`,
    enemies: [
      { alias: `Cruel and vicious heir` },
      { alias: `Incompetent heir who has the best claim` },
      { alias: `Outside enemy backing the strife` }
    ],
    friends: [
      { alias: `Most talented heir, but with the worst position` },
      { alias: `Hapless heir in dire need of protection` },
      { alias: `Loyal retainer trying to avert disaster` }
    ],
    complications: [
      `Legitimacy rests on possession of a now-lost relic`,
      `If the struggle lasts much longer the patrimony will be {ruined|lost}`,
      `A selfish regent is exploiting the court during the interregnum`
    ],
    things: [
      `a bribe intended for the faction leaders`,
      `a precious relic of legitimacy`,
      `the real and verified will`
    ],
    places: [
      `in a tense and angry court meeting hall`,
      `at a heir's country estate`,
      `at a court plaza where the factions don't mingle `
    ]
  },
  'excess heirs': {
    tag: 'excess heirs',
    type: 'court',
    context: `While the ruler remains vigorous, they have too many legitimate heirs for the court to comfortably absorb. {There's not enough {wealth|power} to give the losers a dignified station|The heirs are locked in a court-disrupting battle to force their desired outcome}. Various heirs might be backed by rival outside powers (#rival#) searching for a convenient pawn.`,
    enemies: [
      { alias: `Cruel, but talented favorite` },
      { alias: `Scion in league with dark powers` },
      { alias: `Secretly murderous spare heir` }
    ],
    friends: [
      { alias: `Capable, but hard-pressed candidate` },
      { alias: `Hapless ruler unable to enforce a choice` },
      { alias: `Vengeful retainer of a murdered heir`, age: ['adult', 'middle age', 'old'] }
    ],
    complications: [
      `The ruler desires a merciless culling of heirs`,
      `The court desperately needs the heirs to cooperate to overcome a threat`,
      `Several heirs were formerly unknown`
    ],
    things: [
      `proof of a candidate's illegitimacy`,
      `a bribe from an enemy power`,
      `a relic meant to eliminate a rival`
    ],
    places: [
      `at a well-fortified home of an heir`,
      `in a court hall where the factions are well-separated`,
      `at a ritual occasion of enforced amity `
    ]
  },
  'false prize': {
    tag: 'false prize',
    type: 'court',
    context: `The court is trying to obtain a {goal|ambition} that will be disastrous for it. Through {political miscalculation|ignorance of the truth|willful blindness to the consequences}, they're plunging headlong towards calamity. {Rivals (#rival#) are secretly aiding them in their purpose|Factions within the court are uselessly protesting the danger of the path they've chosen}.`,
    enemies: [
      { alias: `Foolhardy ruler with grand plans` },
      { alias: `Treacherous advisor encouraging disaster` },
      { alias: `Trickster leading the court to its ruin` }
    ],
    friends: [
      { alias: `Clear-sighted court member who is being ignored` },
      { alias: `Victim of the danger the court is facing` },
      { alias: `Disfavored faction leader warning of peril` }
    ],
    complications: [
      `The prize's benefits will attract an overwhelming foe`,
      `The prize will {corrupt|ruin} the court's leadership`,
      `The prize comes with hidden {problems|obligations} that will plague the court`
    ],
    things: [
      `proof that the prize would be a disaster`,
      `the key to unlocking the prize`,
      `rich reward that seems to be a foretaste of the prize's benefits`
    ],
    places: [
      `at an edifice built as part of the effort`,
      `at a ruined seat of a former holder of the prize`,
      `at a secret facility where terrible prices are paid in pursuit of it `
    ]
  },
  'fatal extravagance': {
    tag: 'fatal extravagance',
    type: 'court',
    context: `The court is exhausting itself on {luxuries|displays of magnificence} that it cannot truly afford. It {feels pressured to do so in order to maintain face before its rivals|over-estimates its resources|is being manipulated by the group they're buying their luxuries from}.`,
    enemies: [
      { alias: `Smiling merchant of addictive drugs` },
      { alias: `Grandiose ruler` },
      { alias: `Selfishly hedonistic court member` }
    ],
    friends: [
      { alias: `Court member vainly trying to economize` },
      { alias: `Worried accountant` },
      { alias: `Client upset at the lack of expenditures on their vital need` }
    ],
    complications: [
      `The extravagance is serving a secret {magical|ritual} purpose`,
      `The extravagance is being paid for with debt the court intends to never need to repay`,
      `The waste is the product of a new ruler who has different expectations of what they deserve`
    ],
    things: [
      `a lost shipment of precious luxuries`,
      `payment meant for the next round of indulgences`,
      `a precious item that is to be {pawned|sold} to fund the luxuries`
    ],
    places: [
      `at a gaudily-adorned court structure`,
      `at a celebration of wild excess`,
      `at an ostentatious and newly-built monument to their luxuries `
    ]
  },
  'forbidden romance': {
    tag: 'forbidden romance',
    type: 'court',
    context: `Someone in the court is deeply in love with {a rival from another court (#rival#)|a lowly commoner|an incestuous partner|a fellow court member's spouse|a spectacularly horrible person who can only bring them misery}.`,
    enemies: [
      { alias: `Un-reciprocated lover who won't take no for an answer`, gender: 'female' },
      { alias: `Cruelly manipulative object of affection`, gender: 'female' },
      { alias: `Court elder bent on terminating the relationship`, age: ['old'] }
    ],
    friends: [
      { alias: `Earnest matchmaker friend` },
      { alias: `Appealing paramour`, gender: 'female' },
      { alias: `Aspiring peacemaker who wants the match` }
    ],
    complications: [
      `The reasons for opposing the match are extremely good`,
      `The court member is being exploited by the paramour or their manipulators`,
      `A rival court (#rival#) member wants the match to go through so the court member will be disgraced`
    ],
    things: [
      `proof that the lover is not what they seem`,
      `a gift the enamored should not have given`,
      `a token that will legitimize the pairing`
    ],
    places: [
      `at a secret rendezvous spot`,
      `at the hidden prison for a reluctant lover`,
      `at a court festival where unacceptable hints are given `
    ]
  },
  'foreign ties': {
    tag: 'foreign ties',
    type: 'court',
    context: `The court has strong ties with some foreign {power|organization}{|, one that is hostile to their greater polity whose involvement is {carefully hidden|a known scandal}}. The court draws some considerable advantage from this tie, but it's also expected to assist its affiliate in their own local goals.`,
    enemies: [
      { alias: `Foreign spymaster with demands`, culture: 'foreign' },
      { alias: `Rival (#rival#) who despises the foreign power` },
      { alias: `Court member who's a wholly-owned agent of the power` }
    ],
    friends: [
      { alias: `Appealing foreign petitioner`, culture: 'foreign' },
      { alias: `Harried court member trying to square their obligations` },
      { alias: `Outside inquisitor into suspicious doings` }
    ],
    complications: [
      `The power used to be friendly to the polity, but has recently been viewed as a rival`,
      `The court is secretly reliant on the foreign power's support`,
      `The support consists of the foreign power not doing something that they could do`
    ],
    things: [
      `funding from the power`,
      `a precious item the court needs to turn over`,
      `the object that the power wants the court to obtain for them`
    ],
    places: [
      `at a court hall in an architectural style like that of the power`,
      `at a home with foreign-derived elements`,
      `at an archive with documents in a foreign tongue `
    ]
  },
  'gate keeper': {
    tag: 'gate keeper',
    type: 'court',
    context: `The court controls access to some {critical resource|social function}. It {has an effective lock on the local law|controls a vital economic resource|provides vital religious services to faithful believers}. If it abuses this power too greatly, however, its rivals will combine against it and may seize control of the resource.`,
    enemies: [
      { alias: `Reckless leader who's overplaying their hand` },
      { alias: `Outside schemer planning to break their monopoly` },
      { alias: `Corrupt court member who's undermining the control for their own benefit` }
    ],
    friends: [
      { alias: `Earnest outsider with a monopoly-breaking idea` },
      { alias: `Frustrated court member trying to reform the monopoly's administration` },
      { alias: `Hard-pressed local mistreated by the monopoly` }
    ],
    complications: [
      `The next alternative monopolist is much worse`,
      `A monopoly-breaker has vile intentions`,
      `The monopoly rests with them for secret, but very good reasons`
    ],
    things: [
      `some good produced by the monopoly`,
      `{license|leave} to violate the monopoly`,
      `a device that greatly weakens the monopoly`
    ],
    places: [
      `at a site where the monopoly is practiced`,
      `at a secret illegal site of unlicensed production`,
      `at a private production site of one of the court's elites `
    ]
  },
  'hopeless rival': {
    tag: 'hopeless rival',
    type: 'court',
    context: `The court has a {rival|enemy} (#rival#) that bears a burning desire to destroy them due to {past crimes|cheated opportunities|an ancient feud}. Unfortunately for them, they're wholly incapable of doing so. In their desperation to strike at their enemy, it's likely the rival will go to extreme and unwise lengths, perhaps making bargains they ought not to make.`,
    enemies: [
      { alias: `Oft-beaten rival of the court's ruler` },
      { alias: `Disgraced court member turned renegade` },
      { alias: `Spare heir with a grudge` }
    ],
    friends: [
      { alias: `Sympathetic enemy of the court` },
      { alias: `Rival's associate trying to stop them from going too far` },
      { alias: `Inquisitor looking into nefarious dealings` }
    ],
    complications: [
      `The rival's hate is very justifiable`,
      `The rival's engineering a clash with a greater power`,
      `The rival is being set up as a kamikaze attack by a manipulative third party`
    ],
    things: [
      `a doomsday tool the rival means to use`,
      `blackmail material on the court`,
      `a precious relic that the rival paid dearly to acquire`
    ],
    places: [
      `at the site of the rival's past defeat`,
      `at a location related to the hate`,
      `at a structure built with the fruits of the court's past victory `
    ]
  },
  'impure blood': {
    tag: 'impure blood',
    type: 'court',
    context: `Bloodline and lineage are important to the court. Despite this, the court's lineage would be considered impure by others were it fully known. The court might have to go to extremes in order to {mimic the powers appropriate to their supposed bloodline|crush any hint of the truth}.`,
    enemies: [
      { alias: `Court assassin cleaning up loose ends` },
      { alias: `Rival prying into a dangerous leak` },
      { alias: `Court member making a terrible bargain to blot out the stain` }
    ],
    friends: [
      { alias: `Court member undeserving of the disgrace` },
      { alias: `Innocent threatened with disaster by the truth` },
      { alias: `Hunter seeking the entity they pacted with` }
    ],
    complications: [
      `The "impurity" was once celebrated in the hidden past`,
      `It's an open secret, but their rivals lack actionable proof`,
      `They're privately working to overthrow the rules that would call them impure`
    ],
    things: [
      `proof of their impurity`,
      `a device that gives them power they wouldn't normally have`,
      `inheritance from their hidden ancestry`
    ],
    places: [
      `at a hidden site associated with their concealed blood`,
      `at a proud monument to their social station`,
      `at the secret graves of their real ancestors `
    ]
  },
  'inadequate tools': {
    tag: 'inadequate tools',
    type: 'court',
    context: `Their authority and power have been sustained for a long time by a particular set of tools and tactics ({violence|money|blackmail|legal rights|alliances with other powers}). {Recent events|Clumsy missteps by the court} have rendered these old tools no longer effective, but the leadership doesn't have any better idea than to use them again, but harder this time.`,
    enemies: [
      { alias: `Manipulator goading the ruler to excesses` },
      { alias: `Frustrated ruler with no new ideas` },
      { alias: `Court member scheming to restore their old power` }
    ],
    friends: [
      { alias: `Anguished victim of their overreach` },
      { alias: `Court member trying to find new footing` },
      { alias: `Member fearful of the consequences of their frustration` }
    ],
    complications: [
      `The tools are “working” but are building up a ruinous debt of resentment`,
      `Their efforts are only serving to strengthen their rivals`,
      `The tools are actually going to be completely successful if the ruler's scheme to push them to an extreme works`
    ],
    things: [
      `a relic to empower their favorite tactic`,
      `the wealth needed to fuel their plans`,
      `a priceless implement necessary to effectively use their tactics`
    ],
    places: [
      `at a structure dedicated to their favorite methods`,
      `at a site where the method went awry`,
      `at a site of the method currently in use `
    ]
  },
  'inept ruler': {
    tag: 'inept ruler',
    type: 'court',
    context: `The #court#'s ruler is {incompetent|debilitated}, but there's no practical way to remove them from power because {the alternative is utterly unacceptable|the ruler's mistakes might be very much to the benefit of a powerful faction in the #court#}. Rivals are doubtless making plans to take advantage of the situation, and internal factions may well be willing to take acceptable losses in order to profit by the chaos.`,
    enemies: [
      { alias: `Insane ruler` },
      { alias: `Sincere, but utterly unsuitable leader` },
      { alias: `Sinister manipulator influencing the puppet ruler` }
    ],
    friends: [
      { alias: `Competent, but unsupported alternative ruler` },
      { alias: `Victim of the ruler's mistakes` },
      { alias: `Faction leader being crushed by the ruler's ineptitude` }
    ],
    complications: [
      `The ruler seems like an idiot, but is actually trying to achieve a secret goal with their actions`,
      `An external rival (#rival#) is vigorously backing the leader`,
      `The leader's deposition would result in a ruinous state of chaos for the court`
    ],
    things: [
      `a token that would legitimize a change of rule`,
      `an object that would cure the ruler's incapacity`,
      `wealth that was lost by the leader's mistakes`
    ],
    places: [
      `at a {damaged|decrepit} structure owing to the ruler's neglect`,
      `in a chaotic and confused #court# hall`,
      `at a building erected as a folly by the ruler `
    ]
  },
  'iron law': {
    tag: 'iron law',
    type: 'court',
    context: `There are {troublesome|problematic} laws within the #court# that its members simply cannot break. These laws are preventing them from resolving a problem that is currently growing worse.`,
    enemies: [
      { alias: `Suicidally rigid ruler` },
      { alias: `Troublemaker who exploits the law` },
      { alias: `Traitor who is somehow immune to the law's force` }
    ],
    friends: [
      { alias: `Innovator trying to {work around|repeal} the law` },
      { alias: `Troubled defender of the law who sees the problem` },
      { alias: `Affiliate who can't be helped because of the law` }
    ],
    complications: [
      `The law is there for a good reason and breaking it would be worse than the problem`,
      `The law can be changed if a certain great deed is done`,
      `The law's enforcer is {corrupt|mutable} in judgment`
    ],
    things: [
      `the key object that gives the law its force`,
      `a token that allows the bearer to {ignore|lift} the law`,
      `a precious treasure that is unreachable as long as the law remains in force`
    ],
    places: [
      `in a chamber of judgment`,
      `at a punishment place for offenders`,
      `at the site of the growing problem `
    ]
  },
  'lost purpose': {
    tag: 'lost purpose',
    type: 'court',
    context: `The #court#'s original formation revolved around a particular {duty|role} that has long since been {forgotten|lost}. This loss of purpose has left the court with {ancestral obligations they no longer understand|resources that they no longer use in the intended way}.`,
    enemies: [
      { alias: `Leader wholly absorbed in their own ambitions` },
      { alias: `Outsider made hostile by the court's failure to do their duty` },
      { alias: `Enemy who prospers by this lost purpose` }
    ],
    friends: [
      { alias: `Earnest historian who knows the truth` },
      { alias: `Last stubborn upholder of the role` },
      { alias: `Petitioner who needs them to do their old duty` }
    ],
    complications: [
      `The purpose was a vile and terrible one`,
      `Their current prosperity depends on ignoring the purpose`,
      `The consequences of this lost purpose are going to be dire`
    ],
    things: [
      `proof of their original purpose`,
      `potent artifact meant to aid their role`,
      `a treasure once given to them in repayment for their work`
    ],
    places: [
      `in a forgotten chamber for the duty`,
      `at a lost site of importance`,
      `at a place damaged by the forgetting `
    ]
  },
  'magical subversion': {
    tag: 'magical subversion',
    type: 'court',
    context: `Some member of the #court# is under magical influence ({mind-bending sorcery|a persistent magical curse|an arcane blessing that will last only so long as they cooperate}) by an {outside enemy (#rival#)|internal rival}. The culprit ensures this subversion is not easily detected {through the use of occult arts|by ensuring that others never get curious enough to look for such things}.`,
    enemies: [
      { alias: `Harmless-seeming member who's secretly a sorcerer` },
      { alias: `Mercenary sorcerer hired by rivals (#rival#)` },
      { alias: `#Court# favorite who induces that affection with magic` }
    ],
    friends: [
      { alias: `Suspicious local mage` },
      { alias: `Relative with suspicions, but no proof`, relative: true },
      { alias: `Victim of uncharacteristic behavior by the subverted member` }
    ],
    complications: [
      `The subversion is part of a known and accepted enchantment on the target`,
      `They'll {die|suffer horribly} if the subversion is lifted`,
      `They're consciously cooperating with the subverter`
    ],
    things: [
      `a charm to lift the magical influence`,
      `proof of magical interference`,
      `the artifact being used to subvert the target`
    ],
    places: [
      `at an out-of-place location to find the target`,
      `at a site that's recently been changed to fit their new demands`,
      `at the sinister lair where the enchantment was wrought `
    ]
  },
  'ministerial capture': {
    tag: 'ministerial capture',
    type: 'court',
    context: `The {upper functionaries|senior household servants} of the #court# have effectively taken control of it. {The members may be too distracted to realize what's been done|The servants have {irresistible blackmail on any members that could oppose them|the unjustified, but complete trust of the proper leadership}}. These functionaries are using the #court#'s resources to pursue their own aggrandizement and profit.`,
    enemies: [{ alias: `Scheming functionary` }, { alias: `functionary turned kingmaker` }],
    friends: [
      { alias: `Minor #court# member who realizes the problem` },
      { alias: `Lesser functionary upset by the corruption` },
      { alias: `Proper leader made helpless by the situation` }
    ],
    complications: [
      `The ministers think the proper leadership is incompetent`,
      `The ministers are really serving a rival (#rival#)`,
      `The leadership honestly prefers to leave everything to the ministers`
    ],
    things: [
      `documentation proving ministerial malfeasance`,
      `misappropriated #court# resources`,
      `blackmail evidence on the court leadership`
    ],
    places: [
      `in an abandoned official audience chamber`,
      `at a private residence of the ministerial kingmaker`,
      `at the ministerial offices bustling with petitioners `
    ]
  },
  'new generation': {
    tag: 'new generation',
    type: 'court',
    context: `The #court#'s prior leadership was recently decimated by {sickness|misadventure|political executions}, leaving many leadership posts in the hands of much younger, less experienced members. Few of them have a firm grasp on practicalities, and they're acting with a confidence and boldness that may not be justified by their actual skills.`,
    enemies: [
      { alias: `Reckless spare heir turned ruler` },
      { alias: `Upstart using a role purely for their personal advantage` },
      { alias: `Outside rival (#rival#) pouncing on their untested leadership` }
    ],
    friends: [
      { alias: `Harried senior advisor who is ignored` },
      { alias: `Baffled new ruler who doesn't understand how it works` },
      { alias: `Idealistic new office-holder with big dreams` }
    ],
    complications: [
      `The new generation is being held back by ossified existing members`,
      `They have magnificent plans that will fail spectacularly`,
      `They didn't want the jobs, but were forced into them by circumstances`
    ],
    things: [
      `lost {treasure|resources} that the old guard hid`,
      `ceremonial regalia that imbues legitimacy`,
      `secret {plans|archives} that the former ruler hid`
    ],
    places: [
      `at a newly-remodeled court residence`,
      `in an audience hall adorned with freshly-changed arms`,
      `at a ministerial office full of confused and harried minor members`
    ]
  },
  'new opportunity': {
    tag: 'new opportunity',
    type: 'court',
    context: `Some special new opportunity has been presented to the #court#, one that offers a great deal of personal {wealth|glory}. Only some of the #court# can take advantage of it, however, and it can be easily spoiled by dissent from within; they argue now over who is to be allowed to exploit the opportunity.`,
    enemies: [
      { alias: `Bitter enemy who had the opportunity taken from them and given to the court` },
      { alias: `Jealous internal spoiler who plots to ruin it` },
      { alias: `Leader who greedily seeks to keep all of it to themselves` }
    ],
    friends: [
      { alias: `Talented, but ill-supported candidate` },
      { alias: `Outsider who wants the opportunity handled fairly` },
      { alias: `Disenfranchised true discoverer of the opportunity` }
    ],
    complications: [
      `It's a trap and will ruin those who embrace it`,
      `The ease of any one spoiler ruining it has paralyzed deliberations`,
      `The opportunity has its own ideas about who should exploit it`
    ],
    things: [
      `the key to unlocking the opportunity`,
      `rich treasure safeguarded by the opportunity`,
      `a token that will allow the holder to exploit the opportunity`
    ],
    places: [
      `at the site where the new chance is brightest`,
      `at a {camp|building} for preparations`,
      `at the site of a failed effort `
    ]
  },
  'outside debts': {
    tag: 'outside debts',
    type: 'court',
    context: `The court owes something awful to a pitiless outside power ({a rival court (#rival#)|an enemy of their homeland|a vile sorcerer|a merciless banker|a grasping lord}). The consequences of failing to repay the debt would be catastrophic, but the court can't afford to do so without some members of them being ruined by the price ({in coin|criminal conviction|disgrace|eternal damnation}).`,
    enemies: [
      { alias: `Ruler who means to shift the debt to another` },
      { alias: `Savage enforcer of the debt` },
      { alias: `Culprit who brought the debt on them with their ambitions` }
    ],
    friends: [
      { alias: `Innocent being forced to pay the price` },
      { alias: `Suspicious investigator looking into the debt` },
      { alias: `Past victim of the creditor's cruel ways` }
    ],
    complications: [
      `Revealing the debt's existence would ruin the court`,
      `The creditor completely deserves to be paid`,
      `An old rival (#rival#) has bought the debt and now holds it`
    ],
    things: [
      `the riches needed to pay off the debt`,
      `proof that the contract was invalid`,
      `the document or token that is needed to enforce the debt`
    ],
    places: [
      `at the lair of the creditor`,
      `at a court holding being {sold|given away} to help satisfy the debt`,
      `at a great court ceremony made insultingly meager to save money `
    ]
  },
  'overextended grasp': {
    tag: 'overextended grasp',
    type: 'court',
    context: `They have recently seized control of ({land|influence|titles}), but do not hold it securely. Rival forces (#rival#) are {pressing on them for control over the prize|fighting to determine which of them is to overthrow the overextended court's grip}. The #court# has exhausted their resources in simply gaining the prize and have nothing left with which to keep it in the face of resistance.`,
    enemies: [
      { alias: `Foolishly ambitious ruler` },
      { alias: `Schemer who has profited by the reach even if it fails` },
      { alias: `Desperate leader who is abusing the prize to help keep it` }
    ],
    friends: [
      { alias: `Former holder of the prize trying to regain it` },
      { alias: `Earnest new owner in far over their head` },
      { alias: `Loyal retainer struggling with insufficient resources` }
    ],
    complications: [
      `The prize is a poisoned fruit that will destroy them if they don't let it go`,
      `They gambled on support that has been {delayed|denied}`,
      `They mean to destroy the prize rather than lose it`
    ],
    things: [
      `the riches meant for the owner of the prize`,
      `a {device|document} that will destroy the prize's value`,
      `treasure that the rivals (#rival#) mean to use to seize the prize`
    ],
    places: [
      `at the seat of the prize's authority`,
      `at a #court# holding that's understaffed and under-resourced`,
      `at a marginal prize holding that's already been lost `
    ]
  },
  'poisonous cliques': {
    tag: 'poisonous cliques',
    type: 'court',
    context: `The #court# is riven by two viciously hostile cliques, both of which are determined to {ruin|destroy} the other. Nonaligned members are forced to submit to one or the other lest they be enemies to both and all normal business of the #court# is paralyzed by their incessant quarreling.{ This hostility is veiled behind venomous courtesies and cruelly heartless protocols.|}`,
    enemies: [
      { alias: `Outside rival (#rival#) who provoked the clique formation` },
      { alias: `Traitor seeking mutual destruction` },
      { alias: `Brutal clique leader who will do anything for victory` }
    ],
    friends: [
      { alias: `Unaligned member trying to stay alive` },
      { alias: `Outside ally distressed by the infighting` },
      { alias: `Weak leader unable to rein in the hostilities` }
    ],
    complications: [
      `One clique is sympathetic but just as determined to attain total victory as the other`,
      `The cliques are destroying the very prize they fight over`,
      `A secret internal faction waits to pick up the pieces`
    ],
    things: [
      `the treasure that the cliques are fighting over`,
      `a {tool|artifact} meant to break the stalemate`,
      `documents showing a traitor within one clique's leadership`
    ],
    places: [
      `at a well-separated court residences for the cliques`,
      `at a holding ruined by their infighting`,
      `at a destroyed former residence of a loser of the fighting `
    ]
  },
  'proxy speaker': {
    tag: 'proxy speaker',
    type: 'court',
    context: `Their leader communicates only through a particular proxy. The {leader is too {sick|enfeebled} to lead|proxy has systematically cut all their other lines of control}. The other members of the #court# may vie for influence over the proxy{|, while ignoring their ostensible real ruler}.`,
    enemies: [
      { alias: `Grasping favorite paramour` },
      { alias: `Impatient proxy heir` },
      { alias: `Scheming regent-minister` }
    ],
    friends: [
      { alias: `Worried child of the leader`, age: ['adult', 'young adult'] },
      { alias: `Cast-off former advisor` },
      { alias: `Persecuted enemy of the proxy` }
    ],
    complications: [
      `The proxy is actually the cause of the leader's incapacitation`,
      `The proxy is a much better leader than the real one`,
      `The proxy is really working for a {rival (#rival#)|enemy} power`
    ],
    things: [
      `the cure for the leader's incapacitation`,
      `proof of the proxy's unsuitability`,
      `wealth subverted by the proxy`
    ],
    places: [
      `at an abandoned throne room`,
      `in a Sick chamber of incapacitated leader`,
      `at the proxy's office teeming with petitioners `
    ]
  },
  'rampant corruption': {
    tag: 'rampant corruption',
    type: 'court',
    context: `They are so corrupt that it's crippling their ability to function. Even the most mundane exercises of authority require that the right people be bribed, and its members have little or no interest in the overall good of the group. The leadership is hanging together only because the #court# is profitable and they will defend it only insofar as it remains so.`,
    enemies: [{ alias: `Hopelessly venal ruler` }, { alias: `Greedy kingmaker behind the scenes` }],
    friends: [
      { alias: `Member with an earnest loyalty to principle` },
      { alias: `#Court# member cast out for not playing along` },
      { alias: `Victim of some bribed crime the court committed` }
    ],
    complications: [
      `The #court#'s members actually desperately need the money`,
      `All the corruption is going to only a few strong hands`,
      `Their enemies have multiple traitors on their payrolls`
    ],
    things: [
      `a great hoard of extracted pelf`,
      `inescapable proof of a leader's wrongdoing`,
      `a misdirected bribe payment`
    ],
    places: [
      `in a grimy back room where deals are made`,
      `at an important salon made a market for favors`,
      `at an  important structure clearly starved of its supposed funds `
    ]
  },
  'recent brutality': {
    tag: 'recent brutality',
    type: 'court',
    context: `Violence is an unfortunate commonplace in many factions, but something happened here recently that was beyond all usual bounds of polite assassination or genteel political execution. A {vast massacre of a whole family line|berserk slaughter of an unlucky gathering|humiliating and unthinkable execution of some grandee} has put everyone on edge and made many start thinking of some previously unthinkable courses of action.`,
    enemies: [
      { alias: `Ruler with out-of-control bloodthirst` },
      { alias: `Spree-killing spymaster` },
      { alias: `Brutal #court# member with no one daring to check them` }
    ],
    friends: [
      { alias: `Heir to a recent victim` },
      { alias: `Helpless enforcer of the usual norms` },
      { alias: `Survivor of a recent massacre` }
    ],
    complications: [
      `The victims arguably deserved it`,
      `The source of the violence is being secretly controlled by a member`,
      `Everyone else is about to embrace the new norms of violence if it's not punished soon`
    ],
    things: [
      `a device used to enable the killing`,
      `treasure left behind by one of the slain`,
      `a list of who is to die next`
    ],
    places: [
      `at the haunted site of the killing`,
      `at a secret memorial to the slain`,
      `at an unbearably tense faction ceremony `
    ]
  },
  'priestly influence': {
    tag: 'priestly influence',
    type: 'court',
    context: `Their leadership is in the thrall of a particular {religion|holy figure} ({sincere|blackmail|services}), and their wishes are given an undue weight.`,
    enemies: [
      { alias: `Charlatan holy figure` },
      { alias: `Zealously pious ruler` },
      { alias: `Spider-minded religious advisor with strings on everyone` }
    ],
    friends: [
      { alias: `#Court# member who favors a different god` },
      { alias: `Castoff former house priest` },
      { alias: `Client abandoned so that resources could go to the faith` }
    ],
    complications: [
      `The faith is giving major help to the #court#`,
      `The sect the #court# follows is considered heretical by the main faith`,
      `The faith's opponents in the #court# are being backed by a hostile outside group`
    ],
    things: [
      `a sacred relic of the faith`,
      `a costly tithe sum to be offered to the faith`,
      `a symbol of authority over the #court#'s religious practice`
    ],
    places: [
      `at a grand newly-built chapel`,
      `at an abandoned chapel of a former faith`,
      `at the ritual site for a new ceremony `
    ]
  },
  'restive lessers': {
    tag: 'restive lessers',
    type: 'court',
    context: `The #court#'s servants and lesser officials are angry with the leadership due to the {revocation of old privileges|curtailment of traditional rights and fees|sacrifices demanded of them}. The #court#'s traditional leadership is confident that their lessers can do nothing but obey, but the minions are very close to a dramatic response.`,
    enemies: [
      { alias: `Ruler who cares nothing for their displeasure` },
      { alias: `Arrogant chief advisor` },
      { alias: `Outside rival (#rival#) backing disunity in the court` }
    ],
    friends: [
      { alias: `Aggrieved lesser official` },
      { alias: `Worried grandee who sees trouble coming` },
      { alias: `Client who needs the court's unimpaired assistance` }
    ],
    complications: [
      `Traditional, but corrupt perquisites were reformed and the minions were deprived of them`,
      `A much loved {official|leader} was killed or deposed`,
      `The minions of other rival factions are getting {perks|benefits} that this #court# can't afford to give`
    ],
    things: [
      `subverted wealth traditionally due to the minions`,
      `a document proving old rights`,
      `treasure taken from a leader of the minions`
    ],
    places: [
      `in a quietly furious servant's quarters`,
      `in an ominously deserted hall`,
      `at a far-too-crowded plaza where the minions gather `
    ]
  },
  'rival dreams': {
    tag: 'rival dreams',
    type: 'court',
    context: `Two major factions each have a grand plan for the #court#'s future success, but these plans are incompatible, and the factions are struggling to determine which of them is the best path forward. The leader {is incapable of breaking the deadlock|supports one of the plans, but lacks sufficient allies to impose it on the unbelievers}.`,
    enemies: [
      { alias: `Charismatic, but wildly impractical dreamer lord` },
      { alias: `Selfish purveyor of a plan that will chiefly aid them` },
      { alias: `Stubborn ruler who will brook no compromise with their dream` }
    ],
    friends: [
      { alias: `Genius with poor social skills` },
      { alias: `Inheritor of a familial dream` },
      { alias: `Would-be peacemaker between the factions` }
    ],
    complications: [
      `Both dreams are likely to damage the court`,
      `They agree on the goal, but have contradictory ways of getting there`,
      `The dreams are irrelevant and only an excuse to eliminate rival factions`
    ],
    things: [
      `vital resources to achieve a plan`,
      `a critical device needed for a plan`,
      `proof that a plan is hopeless`
    ],
    places: [
      `at a {salon|residence|tavern} where a faction schemes`,
      `at a field where a partially-complete plan is being furthered`,
      `at a half-completed monument to glory `
    ]
  },
  'rival power': {
    tag: 'rival power',
    type: 'court',
    context: `The official hierarchy of the #court# is being challenged by a second internal power source ({a powerful lord|a charismatic religious faction|an intrusive consul of a superior power|an impatient heir with too many friends}), one strong enough to stymie its official lord. Neither power source can act freely while the other exists, but destroying the rival may bring down the #court# in the process.`,
    enemies: [
      { alias: `Unofficial pretender to the rulership` },
      { alias: `Secretive kingmaker`, age: ['middle age', 'old'] },
      { alias: `Incompetent leader with strong help` }
    ],
    friends: [
      { alias: `#Court# member trying to make peace` },
      { alias: `Victim of the rival factions' infighting` },
      { alias: `Disillusioned former backer of the {ruler|rival power}` }
    ],
    complications: [
      `The rival power has a very good, but also very self-interested reason to seek control`,
      `The rival power has all the most competent people`,
      `The legitimate ruler intends to bring down the court with them if they are overthrown`
    ],
    things: [
      `tokens of legitimate authority`,
      `blackmail sufficient to ruin a faction`,
      `resources suborned by a faction`
    ],
    places: [
      `in an unofficial throne room of the rival power`,
      `at court offices split into different groups`,
      `at an unnaturally well-fortified country estate of a faction `
    ]
  },
  'shining successor': {
    tag: 'shining successor',
    type: 'court',
    context: `The impending heir to the #court#'s leadership is a remarkable figure, gifted with tremendous {aptitudes|personal capability}. Everyone is convinced they will lead the court to new heights of glory, though existing powers may prefer that glory be postponed indefinitely rather than give up their current posts.`,
    enemies: [
      { alias: `Bitter mother of a rival heir`, gender: 'female', age: ['middle age', 'old'] },
      { alias: `Ruler who refuses to admit their capability` },
      { alias: `Vengeful former heir who was put aside` }
    ],
    friends: [
      { alias: `Worried mentor of the successor`, age: ['middle age', 'old'] },
      { alias: `Ruler who fears for their successor's safety` },
      { alias: `Loyal minion of the successor` }
    ],
    complications: [
      `The successor is a genius, but has truly horrible traits as well`,
      `The successor is being backed by a rival faction (#rival#) who thinks to use them`,
      `The successor's talents are vast, but are precisely the wrong skills for the situation they will face`
    ],
    things: [
      `regalia due to the rightful heir`,
      `a marvelous work produced by the successor`,
      `proof that the successor has no legitimate claim on rulership`
    ],
    places: [
      `at a salon where the successor shines brilliantly`,
      `at the site of a grand triumph by the successor`,
      `in the throne room where the successor gets more attention than the ruler `
    ]
  },
  'splendid seat': {
    tag: 'splendid seat',
    type: 'court',
    context: `They operate from a seat of power far beyond the splendor of their peers. This seat {has an ancient enchantment full of magical powers and benefits|is an ancestral fortress famed in song and legend|is built around a source of valuable resources}. Much of the authority of the #court# derives from their control of this seat.`,
    enemies: [
      { alias: `Ruler who is relying too heavily on the seat's benefits` },
      { alias: `Saboteur seeking to destroy the seat` },
      {
        alias: `Hostile entity {bound|associated} to the seat`,
        monstrous: true
      }
    ],
    friends: [
      { alias: `Caretaker of the seat's benefits` },
      { alias: `#Court# member fascinated with the seat's history and nature` },
      { alias: `Servant of a line with ancestral ties to the place` }
    ],
    complications: [
      `The seat exacts a cost from those who dwell there`,
      `The seat's real power is misunderstood by all save the ruler's inner circle`,
      `The seat is a prison as well as a throne`
    ],
    things: [
      `the key to unlocking the seat's secret powers`,
      `a precious relic of a former age`,
      `wealth obtained through the seat's qualities`
    ],
    places: [
      `in a strange chamber of some long-lost purpose`,
      `in a hidden room deep within the structure`,
      `at a grand and magnificent structure embodying the site `
    ]
  },
  'ruling regalia': {
    tag: 'ruling regalia',
    type: 'court',
    context: `The #court#'s leadership depends on an ancient and powerful relic. Quite aside from any practical use that the relic might have, it symbolizes the leader's right of rule, and its loss would throw the court into chaos. It's not unknown for the #court#'s leadership to be suddenly changed when a new rival manages to seize it, whether by guile or brute force.`,
    enemies: [
      {
        alias: `Master thief in the employ of a rival faction (#rival#)`,
        age: ['adult', 'middle age']
      },
      { alias: `Strong-arm #court# member plotting their chance` },
      { alias: `Outside figure who just wants the relics' power` }
    ],
    friends: [
      { alias: `Traditional guardian of the relics` },
      { alias: `Ruler too weak to reliably safeguard them` },
      { alias: `Would-be thief trying to get them from an unworthy ruler` }
    ],
    complications: [
      `The relics were lost some time ago and are currently forgeries`,
      `The power of the relics is objectively necessary for the ruler to function`,
      `A bearer will die if the relics are removed for too long`
    ],
    things: [
      `a device that will {destroy|nullify} a relic`,
      `a perfect forgery of the relic`,
      `another relic perfectly identical in all ways`
    ],
    places: [
      `at a tightly-guarded repository for the relic`,
      `at a ceremonial procession showing the relic`,
      `at an important {structure|edifice} powered by the relic`
    ]
  },
  'runaway rule': {
    tag: 'runaway rule',
    type: 'court',
    context: `Out of {overwork|sloth|carelessness}, the #court# has devolved much of its authority on a subsidiary {group|power}, leaving it to do the dirty work of a critical function. That group has seized control of that authority and now bids to claim leadership of the #court# itself using this newfound leverage.`,
    enemies: [
      { alias: `Ambitious leader of the lesser group` },
      { alias: `Indolent and careless ruler` },
      { alias: `Greedy advisor profiting by the devolution` }
    ],
    friends: [
      { alias: `Client suffering due to the subsidiary's actions` },
      { alias: `Advisor robbed of effective power by the group` },
      { alias: `People being oppressed by the group's excesses` }
    ],
    complications: [
      `The group has considerable outside backing`,
      `The group really is doing something critical to the court's function`,
      `The court is now actually incapable of handling the group's duties`
    ],
    things: [
      `wealth obtained by the group's actions`,
      `treasure given to the group originally to induce them`,
      `a powerful relic obtained by the group as a tool`
    ],
    places: [
      `at a structure dedicated to the group's devolved duty`,
      `at a country estate of the group's leader`,
      `at an abandoned structure of the court that once handled it`
    ]
  },
  'sublime skill': {
    tag: 'sublime skill',
    type: 'court',
    context: `They are tremendously good at a particular role ({economic|military|religious|political|diplomatic}) that their society finds important due to a {venerable tradition of instruction|magical bloodline}.`,
    enemies: [
      { alias: `Ruler who takes the trait much too far in a bad direction` },
      { alias: `Renegade who uses the skill against the court` },
      { alias: `Outside power trying to manipulate the skill for their own benefits` }
    ],
    friends: [
      { alias: `Unworldly, but extremely talented #court# member` },
      { alias: `Outsider curious about the nature of the skill` },
      { alias: `Friendly rival seeking to test their skill` }
    ],
    complications: [
      `The skill comes at some compensating cost`,
      `The #court# is fairly useless for anything, but that skill`,
      `The #court# is abusing its skill for its own benefit`
    ],
    things: [
      `a relic that can confer the skill`,
      `wealth obtained through the skill's exercise`,
      `a magnificent trophy of some prior legendary feat of skill`
    ],
    places: [
      `at a monument to prior exercise of the skill`,
      `in a training hall where the skill is honed`,
      `in a memorial hall full of tokens of past glory`
    ]
  },
  'sudden strength': {
    tag: 'sudden strength',
    type: 'court',
    context: `A {grand stroke of luck|brilliant plan|feat of sublime diplomacy} have resulted in a great influx of {wealth|support} from outside the #court#. The group now has access to a newfound strength that may be fleeting, and not all members may have equal access to the benefits. The existing structure of authority is unlikely to be well-equipped to exert this new influence in delicate or well-considered ways.`,
    enemies: [
      { alias: `Power-drunk ruler pushing things to excess` },
      { alias: `Desperate rival (#rival#) trying to sabotage the court before it's too late` },
      { alias: `Outside patron using this new strength as a lever to control the court` }
    ],
    friends: [
      { alias: `Official struggling to cope with the new situation` },
      { alias: `Old court friend now seeking help` },
      { alias: `Victim of a poorly-considered exercise of the strength` }
    ],
    complications: [
      `The new strength is causing damage each time it's deployed`,
      `Their backers are just letting the court overextend itself before pulling the aid`,
      `The court's agents are taking personal advantage`
    ],
    things: [
      `money obtained by the good fortune`,
      `a potent relic that's part of the new strength`,
      `secret evidence of the real purpose of the help being given`
    ],
    places: [
      `at a crushed rival court's estate (#rival#)`,
      `at a gaudily-upgraded court holding`,
      `at a confused site of sudden activity`
    ]
  },
  'threatened violence': {
    tag: 'threatened violence',
    type: 'court',
    context: `The shadow of impending death hangs over the them. {The ruler is ordering capricious executions|A particularly bloody custom is in full effect|The #court#'s leaders are hunting for traitors}. Members are on edge and willing to do desperate things in order to avoid death or direct the killing toward their enemies.`,
    enemies: [
      { alias: `Paranoid ruler seeing knives in every shadow` },
      { alias: `Master assassin with a grudge`, age: ['adult', 'middle age'] },
      { alias: `Renegade who's returned to take vengeance` }
    ],
    friends: [
      { alias: `Survivor of a murder attempt` },
      { alias: `Worried bodyguard looking for help` },
      { alias: `Frightened member convinced they're next` }
    ],
    complications: [
      `The violence is being blamed on the wrong source`,
      `People are using the killings to settle private scores`,
      `The victims were all part of a secret scheme`
    ],
    things: [
      `a poison suitable for eliminating anyone`,
      `a list of those next to die`,
      `a document with information that will stop the killings`
    ],
    places: [
      `at a gory scene of death`,
      `at an unbearably tense court function`,
      `at a trial full of panicked participants`
    ]
  },
  'waning wealth': {
    tag: 'waning wealth',
    type: 'court',
    context: `They are heading towards poverty, and its members know it. The source of their wealth is under attack by {a rival faction (#rival#)|a greedy superior|an outside enemy|sheer misfortune}. If things continue as they are the #court# will be unable to maintain its place, and its members are contemplating desperate measures to shore up existing holdings or acquire new ones.`,
    enemies: [
      { alias: `Ruler who's making unreasonable demands for member sacrifices` },
      { alias: `Sinister creditor who demands repayment` },
      {
        alias: `Monstrous foe who's ruining their holdings`,
        monstrous: true
      }
    ],
    friends: [
      { alias: `Harried chancellor looking for money`, age: ['middle age', 'old'] },
      { alias: `Client left destitute by lack of support` },
      { alias: `Former manager of a now-ruined holding` }
    ],
    complications: [
      `They're cutting secret deals with enemies of their land`,
      `Unpopular members are being beggared to support the others`,
      `Their clients are being squeezed dry just to keep the court solvent`
    ],
    things: [
      `long-lost treasure that the court is hunting`,
      `a deed to some profitable holding`,
      `a device that will revitalize or repair a ruined property`
    ],
    places: [
      `in a threadbare throne room`,
      `in a meager noble dining hall`,
      `at an abandoned once-profitable holding`
    ]
  }
}

const valid = (loc: Province): WeightedDistribution<Thread['court']> => {
  const village = hub__isVillage(loc.hub)
  return [
    {
      v: 'aristocratic',
      w: village ? 0 : 1
    },
    {
      v: 'residential',
      w: village ? 10 : 1
    },
    {
      v: 'religious',
      w: 1
    },
    {
      v: 'criminal',
      w: 1
    },
    {
      v: 'mercantile',
      w: village ? 0 : 1
    },
    {
      v: 'bureaucratic',
      w: village ? 0 : 1
    },
    {
      v: 'royal',
      w: loc.capital ? 1 : 0
    }
  ]
}

export const courts__spawn = (loc: Province) => {
  const courts = valid(loc)
  if (courts.length === 0) return false
  return window.dice.weightedChoice(courts)
}

export const courts__rival = (loc: Province) => window.dice.weightedChoice(valid(loc))

const courts: Record<Thread['court'], string> = {
  aristocratic: `a {minor|major} aristocratic court:{family|clan|house}`,
  residential: `{an influential|a respected|a scorned} extended court:{family|clan}`,
  religious: `a {minor|major} religious court:{sect|cult|temple|order}`,
  criminal: `a {minor|major} criminal court:{syndicate|cartel|brotherhood|gang}`,
  mercantile: `a {minor|major} {banking|merchant} court:{house|guild|enterprise}`,
  bureaucratic: `the bureaucracy that administers this #site#`,
  royal: `the {royal court:court|court:council of oligarchs} that rules this region`
}

const hookTemplate = `{You are approached by|{A courier approaches you|You are approached by a courier} with a message from} {a {concerned|desperate} {citizen|local}} named #patron#.`
export const court__finalize = (params: { thread: Thread; site: string }) => {
  const { thread, site } = params
  const hook = window.dice.spin(hookTemplate).replaceAll('#patron#', thread.patron.name)
  const intro = `${
    hook.includes('message')
      ? 'The message speaks of'
      : `${thread.patron.gender === 'male' ? 'He' : 'She'} begins to tell you about`
  } ${window.dice.spin(courts[thread.court]).replaceAll('#site#', site)}.`

  thread.text = `${hook} ${intro} ${thread.text}`
}
