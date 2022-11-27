import { Background } from '../types'
import { Faith } from './types'

export const backgrounds__faith: Record<Faith, Background> = {
  'ancient ways': {
    tag: 'ancient ways',
    type: 'faith',
    context: `This religion is only the latest iteration of a faith that goes back beyond recorded history. Ancient temples and doctrines of very different kinds may still exist, abandoned after now-forgotten ages of reform and change. Fragments of these ancient ways may resurface, along with stranger practices less palatable to modern believers. Reformists may sometimes unearth these ways and insist on their revival.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Zealot restoring a bloody past` },
      { alias: `Heir to an ancient enmity` },
      { alias: `Head of a dark surviving sect` }
    ],
    friends: [
      { alias: `Eager temple archaeologist` },
      { alias: `Keeper of ancient wisdom` },
      { alias: `Guardian of an abandoned shrine` }
    ],
    complications: [
      `Restoring a vital relic requires long-lost ritual knowledge`,
      `Something sealed away with forgotten rites is now rising again`,
      `A seemingly-harmless ritual object actually has a terrible power`
    ],
    things: [
      `a precious relic of old`,
      `a lost book of vital holy scripture`,
      `a hidden trove of forgotten regalia`
    ],
    places: [
      `at a desolate temple in a dead city`,
      `at a shrine lost in perilous terrain`,
      `at a temple buried beneath the layers of a growing city`
    ]
  },
  'antinomian strain': {
    tag: 'antinomian strain',
    type: 'faith',
    context: `Some segment of the {believers|clergy} are convinced they are {above|beyond} all moral laws because of their {innate enlightenment, and that their every desire sanctified as the will of God|belief that moral and religious law is but a veil to be surpassed by the truly elect}. This utter freedom is appealing to many adherents, including those with extremely ugly urges to indulge.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Divinely-sanctified psychopath` },
      { alias: `Cynical manipulator of the "free"` },
      { alias: `Revolutionary against all morality` }
    ],
    friends: [
      { alias: `Well-intentioned crusader for liberty` },
      { alias: `Reactionary sectarian moralist` },
      { alias: `Victim of a cleric's unfettered desires` }
    ],
    complications: [
      `They're mostly reacting against very ugly and reprehensible moral laws`,
      `The faith is divided between antinomians and their unappealing moralist rivals`,
      `The faith is being backed by enemies of the society it is trying to deconstruct`
    ],
    things: [
      `proof of a holy leader's horrible crimes against others`,
      `treasure seized by amoral priestly thief`,
      `an indulgence document allowing the bearer to perform any one crime without repercussions`
    ],
    places: [
      `at an orgiastic and violent religious festival`,
      `at a beatific commune with dark underside`,
      `at a decadent salon of highly intellectual degenerates`
    ]
  },
  'aristocratic faith': {
    tag: 'aristocratic faith',
    type: 'faith',
    context: `The faith is {largely|exclusively} practiced by the elite of the society. Clergy of the faith are {spare children of the noble class who are bundled away into the religion to keep them out of political affairs|functioning members of the society's rulership with real authority over secular matters}.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Cold-blooded aristocrat with only passing interest in religious concerns` },
      { alias: `Noble #child# embittered by #possessive# shelving` },
      { alias: `Carefully-placed agent of a major noble house seeking only their advantage` }
    ],
    friends: [
      { alias: `Unworldly high-born innocent only concerned with the faith` },
      {
        alias: `Grizzled political campaigner seeking quiet retirement in a monastery`,
        age: ['middle age', 'old']
      },
      { alias: `Idealistic reformer seeking greater access` }
    ],
    complications: [
      `The religion actually requires a noble bloodline for certain ritual and pragmatic necessities`,
      `Commoners are forming illicit parallel congregations`,
      `High religious offices have no spiritual worth at all, but are only political bargaining chips among noble houses`
    ],
    things: [
      `fabulously costly regalia of a dead king-priest`,
      `a once-lost text proving the commoner bloodline of a major house`,
      `a tithe-trove of loot extracted from commoners`
    ],
    places: [
      `at a cathedral-palace of a prince-bishop`,
      `at a shrine adorned by generations of a noble house`,
      `at an ornate ceremony attended only by nobility`
    ]
  },
  'ascetic faith': {
    tag: 'ascetic faith',
    type: 'faith',
    context: `The faith tends to scorn material wealth and comforts, esteeming poverty, simplicity, and deprivation. Its shrines and regalia tend to be very simple and austere, though personal simplicity doesn't mean the faith has no political power. Kings and princes may have such ascetics as personal advisers and spiritual guides. Extreme interpretations of the faith favor painful penances and harsh personal austerities.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Obsessive zealot determined to extinguish many "luxuries"` },
      { alias: `Idealistic extremist efficiently pursuing a totally impractical goal` },
      { alias: `Furiously envious ascetic who wants the rich to suffer` }
    ],
    friends: [
      { alias: `Humble forest hermit harried by greater powers` },
      { alias: `Inspiring noble-born model of self-restraint and austerity` },
      { alias: `Former decadent seeking redemption and avoiding any opportunities to sin` }
    ],
    complications: [
      `A faction of the faith is deeply luxury-loving via thin rationalizations`,
      `The faith is always pushing for idealistic, but impractical laws`,
      `The ascetic rites change the priests in both positive and negative ways`
    ],
    things: [
      `abandoned treasures of a formerly-rich cleric`,
      `hidden wealth enjoyed by a hypocritical priest`,
      `a deed to vast temple land holdings used to support the ascetics`
    ],
    places: [
      `at a harshly simple and uncomfortable monastery`,
      `at a crude forest hermitage`,
      `in a stark and bare monastic cell within a luxuriant noble palace`
    ]
  },
  'bad leadership': {
    tag: 'bad leadership',
    type: 'faith',
    context: `The faith is currently led by an incompetent head (senile|corrupt|deranged|myopic|idiotic) who ended up as leader through an unfortunate set of accidents. Simply removing the leader would result in {a schism between rival factions|the end of a crucial bloodline}. Even so, their dictates, appetites, and foolish ambitions are hurting the church.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Clerical kingmaker controlling the incompetent` },
      { alias: `Priestly careerist only interested in currying favor with the leader` },
      { alias: `Sinister {lover|associate} who has beguiled the leader` }
    ],
    friends: [
      { alias: `Capable, but unpolitical rival candidate for leadership` },
      { alias: `Frustrated handler trying to guide the leader to reasonableness` },
      { alias: `Horrified clerical schemer who never meant for this nullity to become leader` }
    ],
    complications: [
      `The leader is seeking a goal vital to the faith's survival, but doing it in a very stupid way`,
      `The leader's personal {wealth|power} are critical to the faith's health`,
      `The leader's rivals all hate each other more than him`
    ],
    things: [
      `proof that the leader was illegitimately chosen`,
      `a {treasure|relic} that the leader allowed to become lost`,
      `blackmail material that is keeping the leader's rivals from acting`
    ],
    places: [
      `at a confused and poorly-run cathedral`,
      `at a half-built folly ordained by the leader`,
      `at a derelict and abandoned monastery`
    ]
  },
  'caste structure': {
    tag: 'caste structure',
    type: 'faith',
    context: `The religion orders all {its clergy|of society} into different castes. Each caste has its purpose and role in this life and the next, and moving between castes is impossible. The burdens of the faith are rarely apportioned evenly, and some castes may be considered intrinsically contemptible.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Indifferent hierarch who uses subordinates like cattle` },
      { alias: `Brutal priest who thinks the low-caste deserve whatever suffering they get` },
      { alias: `Revolutionary who seeks to destroy the entire society` }
    ],
    friends: [
      { alias: `Earnest striver seeking to advance within society` },
      { alias: `Discreet reformer of the caste system` },
      { alias: `Cynical broker of caste changes for due consideration` }
    ],
    complications: [
      `The caste system has some objective {magical|spiritual} grounding`,
      `Caste roles change with {political|social} changes`,
      `The current downtrodden were formerly the elite lords`
    ],
    things: [
      `evidence of a person's real and unsuitable caste`,
      `tribute accumulated by a laboring caste`,
      `hidden sacred texts that prescribe a very different caste arrangement`
    ],
    places: [
      `in a city quarter of carefully-separated caste groupings`,
      `at a shrine meant for a specific caste's usage`,
      `at a graveyard arranged by caste`
    ]
  },
  'crusading faith': {
    tag: 'crusading faith',
    type: 'faith',
    context: `The faith is fighting a war against a {rival religion|hostile nation}, seeking to {liberate co-religionists|reclaim holy land|enforce their beliefs at the point of the sword}. Believers are being vigorously encouraged to contribute both wealth and their own swords to the holy cause. The secular powers in the area are {enthusiastic supporters of the fight|unable to control the zeal of the believers}.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Burning-eyed clerical crusader` },
      { alias: `Cynical secular lord exploiting the volunteers` },
      { alias: `Profiteer seeking gain out of the bloodshed` }
    ],
    friends: [
      { alias: `Fearless defender of a sympathetic cause` },
      { alias: `Hapless victim caught in the crossfire` },
      { alias: `Sectarian preaching less violent proselytization` }
    ],
    complications: [
      `The crusade has very sympathetic aims, but may be going too far`,
      `The crusaders have unimpeachable doctrinal support for their bloodshed`,
      `The crusade is redirecting energy from an entirely different social problem`
    ],
    things: [
      `payment for vital mercenary support`,
      `a precious offering made to support the crusade`,
      `treasure hidden by locals killed in the fighting`
    ],
    places: [
      `at a once-harmonious town now split in savage sectarianism`,
      `at a burnt temple of the rival faith`,
      `at the massacre site of {infidels|captured crusaders}`
    ]
  },
  'dire sacrifices': {
    tag: 'dire sacrifices',
    type: 'faith',
    context: `Tremendous sacrifices are required of believers ({blood|luxuries|military conscription|corvee labor}). These costs are {exacted of only {a few elect believers|clergy}|universal prices among all adherents}, who are given abundant compensations for their sacrifices.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Brutal enforcer of the religion's price` },
      { alias: `Aspirant scheming to evade the price` },
      { alias: `Manipulator seeking to make someone else pay the price on their behalf` }
    ],
    friends: [
      { alias: `Luckless victim of the faith's exactions` },
      { alias: `Traumatized cleric who's paid the price` },
      { alias: `Sectarian offering a doctrine with a less brutal price` }
    ],
    complications: [
      `The price paid strengthens the faith directly in some way`,
      `Other people can be made to pay the price in the aspirant's place`,
      `The more a cleric pays the greater their standing in the faith`
    ],
    things: [
      `tribute offered up as part of the price`,
      `precious goods abandoned by those who need them no more`,
      `a potent relic created by terrible sacrifices`
    ],
    places: [
      `at a grim temple stained by sacrifice`,
      `at a cloister marked by the scars and losses of those who dwell in it`,
      `at {an ossuary|a burial ground} for those expended by sacrifice `
    ]
  },
  'dualist faith': {
    tag: 'dualist faith',
    type: 'faith',
    context: `The religion's deity is viewed in a dualistic way, with both positive and negative aspects. One aspect focuses on all the beneficial facets of the faith, while the other is responsible for all evil traits. The negative is {still be worshiped out of fear|despised as a rival twin}.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Grim high priest of the negative aspect` },
      { alias: `God-bargainer trading good deeds for license to do evil ones` },
      { alias: `Renegade cleric who once followed the good aspect` }
    ],
    friends: [
      { alias: `Sympathetic priest of the negative face seeking to avert its attention` },
      { alias: `Upright and noble follower of the good god` },
      { alias: `Curious scholar asking dangerous questions about past doctrine` }
    ],
    complications: [
      `Which traits are considered evil is based on which sect has the most power`,
      `The negative aspect is vital to human life in some way`,
      `The negative aspect is totally and violently rejected by all, but the most depraved`
    ],
    things: [
      `a lost holy scripture full of terrible truths`,
      `regalia of a now-proscribed priesthood to an illicit aspect`,
      `a dark artifact that is terrible, but must not be destroyed`
    ],
    places: [
      `at a hidden shrine to the negative aspect`,
      `at a grand temple to both faces of the god`,
      `at a fane to one aspect that used to belong to the other `
    ]
  },
  'economic role': {
    tag: 'economic role',
    type: 'faith',
    context: `Members of the clergy commonly serve critical economic roles as {prescribed by divine law|an accidental consequence of the faith's membership}. The clerics {mask this role under a layer of doctrinal rationalization|openly embrace this role}.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Greedy priestly moneylender` },
      { alias: `Avaricious cleric-administrator of a vital industry` },
      { alias: `Corrupt guild master arch-priest of a sacred profession` }
    ],
    friends: [
      { alias: `Unworldly master artisan-priest` },
      { alias: `Reformer seeking to use the role for greater good` },
      { alias: `Outside lord trying to scale back the faith's excessive worldly influence` }
    ],
    complications: [
      `The faith's origins lie in their economic role`,
      `Their economic importance was foisted on them by {foolish|pious} aristocrats`,
      `The religion is little more than a skin over the business`
    ],
    things: [
      `earnings extracted from their clients or customers`,
      `precious goods only they are allowed to trade in`,
      `capital amassed for some great economic project`
    ],
    places: [
      `at a temple that's more a counting-house`,
      `at an extravagantly ornate religious buildings`,
      `at an industrial site designed with monastic influences`
    ]
  },
  'esoteric doctrine': {
    tag: 'esoteric doctrine',
    type: 'faith',
    context: `The faith intentionally promulgates false esoteric doctrines to throw off spies and prying scholars.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Secret master with dark doctrines` },
      { alias: `Cynical manipulator of the texts` },
      { alias: `Zealot driven to extreme acts by what they have learned` }
    ],
    friends: [
      { alias: `Protector of the sacred secrets` },
      { alias: `Renegade fleeing from a terrible inner truth` },
      { alias: `Scholar seeking the real doctrines` }
    ],
    complications: [
      `There are multiple inner doctrines that struggle against each other`,
      `The innermost secrets are lost and the hierarchs seek them constantly`,
      `The secrets are actively toxic to those unprepared for them`
    ],
    things: [
      `a book of forbidden truths`,
      `an encryption key to unlock a lost text`,
      `an obscure relic with tremendous hidden importance`
    ],
    places: [
      `in a tightly-guarded sanctum within a great cathedral`,
      `at a hidden shrine where the elect gather`,
      `at a forbidden library of secret doctrines`
    ]
  },
  'ethnic creed': {
    tag: 'ethnic creed',
    type: 'faith',
    context: `The religion is considered to be specific to a particular ethnic group. Others might possibly be members, but the leadership and traditions of the faith are identified with the heirs of this group. Trappings of the faith might be embraced as symbols by co-ethnics who have no religious tie to it at all.`,
    constraints: { regional: true },
    enemies: [
      {
        alias: `Convert seeking to force open clerical authority to outsiders`,
        culture: 'foreign'
      },
      { alias: `Zealot priest seeking to drive out the impure`, culture: 'native' },
      { alias: `Corrupt ethnic boss using the faith as an organizing tool`, culture: 'native' }
    ],
    friends: [
      { alias: `Missionary seeking outside converts`, culture: 'native' },
      { alias: `Hapless victim of ethnic conspiracy theories` },
      { alias: `Hard-pressed traditionalist seeking to keep the old ways` }
    ],
    complications: [
      `A conspiracy theory about the faith is half-correct in a totally unexpected way`,
      `The faith is a prize of war and its rule won by former conquest`,
      `The youth are largely disinterested in it`
    ],
    things: [
      `an ancient relic of a culture-hero`,
      `proof a major cleric is of the wrong lineage for their station`,
      `an awkward secret that would make trouble for the faith`
    ],
    places: [
      `at a shrine in an ethnic neighborhood`,
      `at a chapel tucked away in a rich believer's estate`,
      `at the festival grounds for an elaborate ethnic celebration`
    ]
  },
  'failing faith': {
    tag: 'failing faith',
    type: 'faith',
    context: `The faith is collapsing under the pressure of a rival religion that is much more appealing to the believers of the old creed. The failing faith still has its wealth and political influence, but it is falling into fewer and fewer hands as believers melt away. The religion may take drastic steps to deal with its rival and with apostates, or outsiders might be seeking to gut the dying belief of its lands and treasures while it is weakened.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Furious crusader seeking vengeance on the faith's supposed murderers` },
      { alias: `Corrupt hierarch concerned only with #possessive# own gain` },
      { alias: `Ambitious noble trying to squeeze wealth from the faith` }
    ],
    friends: [
      { alias: `Desperate missionary trying to gain new converts` },
      { alias: `Despairing holy person seeking divine aid` },
      { alias: `Non-believing sympathizer trying to help the faith` }
    ],
    complications: [
      `The fall is due to a reform campaign gone terribly wrong`,
      `The faith has become identified with a hated group or traitor faction`,
      `The faith has fragmented into mutually-recriminating sects`
    ],
    things: [
      `treasure seized from an abandoned temple`,
      `land now taken by a rival group`,
      `sacred regalia of a recently-murdered hierarch`
    ],
    places: [
      `at a half-empty shrine`,
      `at a defaced sacred site`,
      `at a temple now held by a rival faith`
    ]
  },
  'folk religion': {
    tag: 'folk religion',
    type: 'faith',
    context: `Belief in this religion is simple and unintellectual, with the faith having little in the way of sophisticated philosophical principles or complex doctrine. Most clergy are humble commoners who offer services that satisfy the practical needs of believers and perform rituals that are emotionally meaningful and impressive to participants.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Deviant priest offering crude and sordid rites` },
      {
        alias: `Local grandee who considers the faith as much #possessive# property as are #possessive# serfs`
      },
      { alias: `Local leader violently opposed to any innovation` }
    ],
    friends: [
      { alias: `Scholar of the faith's origins` },
      { alias: `Aspiring reformer of the faith` },
      { alias: `Sincere-hearted peasant believer` }
    ],
    complications: [
      `The primitive rituals conceal a much deeper and more sophisticated doctrine`,
      `The religion is an offshoot of a more developed creed`,
      `The crudity of the rites is identified as a sign of sincerity and sanctity by many`
    ],
    things: [
      `a precious and ornate offering made by a rich commoner`,
      `a relic of a local saint honored by natives`,
      `a prized idol esteemed as having holy powers`
    ],
    places: [
      `at a rustic shrine with simple offerings`,
      `at a hidden gathering place in the wilderness`,
      `at a crude, but imposing religious monument in a village`
    ]
  },
  'forbidden faith': {
    tag: 'forbidden faith',
    type: 'faith',
    context: `There exists an {older|outlandish} faith that is largely forbidden in this area, with its practice punished severely due to the {jealousy of the state religion|negative consequences on society|identification of the faith with {treachery|hostile powers|moral corruption}}. Believers must meet secretly and use subtle signs to communicate.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Corrupt and vicious priest of the faith` },
      { alias: `Bitter believer bent on revenge for the oppression` },
      { alias: `Zealot inquisitor convinced the agents of the faith are everywhere` }
    ],
    friends: [
      { alias: `Victim of a mistaken accusation of belief` },
      { alias: `Sympathetic hereditary priest of the faith` },
      { alias: `Seemingly-noble martyr to the faith's appealing points` }
    ],
    complications: [
      `The faith really is every bit as horrible as people think`,
      `The faith has sympathetic elements, but is dedicated to a principle totally inimical to the surrounding culture`,
      `The faith has agents everywhere`
    ],
    things: [
      `a secret list of local believers`,
      `a hidden relic revered by the faith`,
      `a holy relic now held by their enemies as a trophy`
    ],
    places: [
      `in a hidden chamber in a rich believer's house`,
      `at a secret shrine in the wilderness`,
      `at a chapel concealed in the #site#'s {slums|warrens}`
    ]
  },
  'gnostic faith': {
    tag: 'gnostic faith',
    type: 'faith',
    context: `The religion holds that knowledge is the key to {salvation|enlightenment}, and only by a profound understanding of its inner truths can a believer be helped. This knowledge is gated behind a series of lesser revelations, each which must be mastered in turn before deeper secrets ({granting magical power|inflicting esoteric forms of insanity|brutally pragmatic blackmail material on secular lords|truths about morality|justifications for divine laws}) are revealed to the aspiring adept.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Obsessed manipulator dealing in lies` },
      { alias: `Cult assassin of those who know too much` },
      { alias: `Outside scholar seeking the truth with bloody methods` }
    ],
    friends: [
      { alias: `Hidden master of deep truths` },
      { alias: `Sympathetic aspiring initiate` },
      { alias: `Well-meaning manipulator dealing in truths` }
    ],
    complications: [
      `The secrets have a physical effect on those who know them`,
      `The secrets themselves are just tools by which other powers are manipulated`,
      `The secrets have been lost and only the leadership knows that`
    ],
    things: [
      `a volume of inner truths written by a renegade`,
      `a book of explosively dangerous errors penned by a heresiarch`,
      `a precious object with a secret and terrible purpose`
    ],
    places: [
      `at a silent monastery of aspiring students`,
      `in a secret sanctum of the hidden masters`,
      `at a welcoming temple of the outer truths`
    ]
  },
  'holy grounds': {
    tag: 'holy grounds',
    type: 'faith',
    context: `Several {places|structures} are of critical religious importance to the faith, and must be kept in sanctified safety at all costs. Conflicts within the religion can form over custodianship of these places, and a frenzied response can be goaded by any threat to their security. Believers are {required to make pilgrimages to such locations|encouraged to make pilgrimages to these locations to {increase their standing in the religion|repent for past sins}}.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Obsessive guardian seeing a threat to the sites` },
      { alias: `Rival seeking to profane the holy places` },
      { alias: `Sectarian trying to seize control of them` }
    ],
    friends: [
      { alias: `Hard-pressed protector of a remote site` },
      { alias: `Innocent pilgrim seeking aid` },
      { alias: `Cleric seeking a lost holy site` }
    ],
    complications: [
      `Control will soon be passing to an extreme sect`,
      `The holy sites have great {economic|military} value to the possessors`,
      `The terrain around the sites is dangerous to pilgrims`
    ],
    things: [
      `a sacred object which defines the holy site`,
      `a relic lost by a pilgrim to the site`,
      `a trove of offerings made by pilgrims`
    ],
    places: [
      `at the guarded holy site entrance`,
      `in an Inner sanctum of a site for the most elect`,
      `at a raucous bazaar set up to supply pilgrims`
    ]
  },
  'localized faith': {
    tag: 'localized faith',
    type: 'faith',
    context: `The faith has substantially different manifestations in different locations, each branch harmonized with local cultures and habits. These local branches {recognize each other as fellow believers|consider other sects as being damnable innovators and degenerate heretics}.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Missionary from a strange and dangerous sub-sect` },
      { alias: `"Reformer" seeking to correct local habits` },
      { alias: `Cleric of another faith masquerading as a local aspect` }
    ],
    friends: [
      { alias: `Simple local priest seeking to perpetuate native ways` },
      { alias: `Scholar curious about local doctrines` },
      { alias: `Local noble deeply committed to the native creed` }
    ],
    complications: [
      `The sects worship different gods, but think it's the same being`,
      `The different sects must cooperate for a ritual reason despite their disagreements`,
      `Local rulers strongly encourage disunity`,
      `One branch ({eldest|upstart}) is senior to the others, exerting control over the other locales`
    ],
    things: [
      `a unique relic specific to a local sect's doctrines`,
      `proof that a particular local doctrine is the authentically correct tradition`,
      `relics of a local saint unrecognized elsewhere`
    ],
    places: [
      `at a strange-looking local temple`,
      `at a compromise chapel where multiple sects all pray`,
      `at a special ritual area for a ceremony practiced only here`
    ]
  },
  'materially luxuriant': {
    tag: 'materially luxuriant',
    type: 'faith',
    context: `The religion prizes ornate regalia, splendid shrines, magnificent religious art, and the finest possible adornment of all things related to the faith. It {makes severe demands on believers to provide the necessary abundance|has active economic roles to acquire the needed wealth for their luxuriance}. Most of the actual clergy {live much more modest lives|also participate in the opulence}.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Venal and avaricious hierarch`, age: ['middle age', 'old'] },
      { alias: `Thief seeking the faith's wealth` },
      { alias: `Fervent builder indifferent to the suffering of those who pay for it` }
    ],
    friends: [
      { alias: `Master craftsman dedicated to the faith`, age: ['middle age', 'old'] },
      { alias: `Wealthy and enthusiastic supporter` },
      { alias: `Local locked in an unfavorable deal with the faith` }
    ],
    complications: [
      `The opulence has a very real {magical|economic} benefit`,
      `Almost all religious matters have been reduced to questions of offering-prices`,
      `The greatest luxuries are offerings of services or blood`
    ],
    things: [
      `a ridiculously jeweled golden idol`,
      `a large trove of precious unworked raw materials`,
      `priceless regalia donated by a believer`
    ],
    places: [
      `at a gilded shrine of opulent make`,
      `at a workshop full of artisans for the faith`,
      `at a counting-house staffed by clerics`
    ]
  },
  'militarized faith': {
    tag: 'militarized faith',
    type: 'faith',
    context: `The faith is built for war, with believers and clergy alike organized in a militarized way and equipped with martial training. Not every believer may be a warrior, but they are organized to support and maintain military action against enemies of the faith, whether heretics, infidels, or secular opponents. Death in battle is considered to be the most splendid end possible for a faithful believer.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Bloodthirsty church general`, age: ['middle age', 'old'] },
      { alias: `Psychopathic hierarch who joined to kill`, age: ['middle age', 'old'] },
      { alias: `Ruler cynically manipulating the faith against #possessive# opponents` }
    ],
    friends: [
      { alias: `Noble templar-monk` },
      { alias: `Aspiring martial hero of the faith` },
      { alias: `Artisan making arms and armor for fellow believers` }
    ],
    complications: [
      `The faith has an extremely good reason to constantly be on a war footing`,
      `Their martial practices are just a ceremonial shadow of their former ancient prowess`,
      `The faith used to be more pacifistic, but only the martial zealots are still alive`
    ],
    things: [
      `a famed relic weapon of the faith`,
      `a large cache of arms and armor`,
      `a relic lost in battle by the faith`
    ],
    places: [
      `at a monastery turned boot camp`,
      `at a barracks-temple for the faith`,
      `at a bishop-general's field camp`
    ]
  },
  'missionary zeal': {
    tag: 'missionary zeal',
    type: 'faith',
    context: `A foreign religion is determined to spread itself in this region. Such religions usually have close ties with the rulers or aristocracy of mission regions, the better to mute hostility and make space for new religious establishments in their lands.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Missionary seeking the violent suppression of local rivals`, culture: 'foreign' },
      { alias: `Native outraged by missionary efforts`, culture: 'native' },
      { alias: `Ruler using the missionaries as tools against rivals`, culture: 'native' }
    ],
    friends: [
      { alias: `Idealistic, but impractical missionary`, culture: 'foreign' },
      { alias: `Convert abused by their neighbors`, culture: 'native' },
      { alias: `Local priest trying to peacefully co-exist with the newcomers`, culture: 'native' }
    ],
    complications: [
      `The faith is strongly identified with a particular {nation|ethnicity}`,
      `The faith relies on its splendor and sophistication to overawe natives`,
      `Merchants and rulers use the faith to establish a beachhead in foreign lands`
    ],
    things: [
      `foreign religious treasures abandoned by rich new convert`,
      `a relic from the first native saint of the faith`,
      `a native relic sought by missionaries and locals alike`
    ],
    places: [
      `at a converted local temple turned to the new faith`,
      `at a burnt-out home of a new convert`,
      `at a new community of local converts`
    ]
  },
  'monastic clergy': {
    tag: 'monastic clergy',
    type: 'faith',
    context: `A certain proportion of the clergy are monastics, isolated in religious establishments built exclusively to support them. While many faiths have monastic members, those of this religion are of exceptional importance to the church. Most work the fields to support themselves, or perform handcrafts for nearby communities. Others are supported exclusively on the donations or tithes of believers. Most monastics are credited with being holier than the secular clergy who work in the world, though monasteries can also be nests of hidden corruption.`,
    constraints: { regional: true },
    enemies: [
      {
        alias: `Depraved abbot using monastic privacy for their own ends`,
        age: ['adult', 'middle age', 'old']
      },
      { alias: `Mad monk held in holy awe by locals` },
      {
        alias: `Brutally venal abbot milking the local peasants for their purse`,
        age: ['adult', 'middle age', 'old']
      }
    ],
    friends: [
      { alias: `Unworldly monk` },
      { alias: `Secular ruler who supports a local monastery` },
      { alias: `Ambitious would-be founder of a new monastery` }
    ],
    complications: [
      `All the faith's senior clerics must be drawn from monastics`,
      `The monasteries are major {economic|military} strong points`,
      `The monasteries protect {books|secrets} of the faith`
    ],
    things: [
      `the location of a lost ancient monastery`,
      `precious knowledge that can only be gained from the monastics`,
      `supplies needed to support a local monastery`
    ],
    places: [
      `at a vast and ancient monastery`,
      `at a hard-pressed young monastery in dangerous terrain`,
      `at a village founded outside a monastery's walls`,
      `at a rustic shrine with simple offerings`,
      `at a hidden gathering place in the wilderness`,
      `at a crude, but imposing religious monument in a village`
    ]
  },
  monolatrists: {
    tag: 'monolatrists',
    type: 'faith',
    context: `Many faiths have a loose attitude toward reverence to other gods; a degree of worship of other divinities is only prudent and sensible for a common believer, even if clergy might be expected to be more focused in their offerings. This faith, however, flatly forbids its believers to revere any god but its own, and is liable to be in sharp conflict with other local religions that are insulted or threatened by this exclusivity.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Zealous convert-cleric from a faith they now want to destroy` },
      { alias: `Inquisitor seeking out backsliders` },
      { alias: `Hostile follower of another faith seeking this creed's ruin`, culture: 'foreign' }
    ],
    friends: [
      {
        alias: `Apostate from another faith seeking only to be left in peace by their former co-religionists`,
        culture: 'foreign'
      },
      { alias: `Missionary seeking to spread the true faith`, culture: 'native' },
      { alias: `Ruler backing the faith for unity's sake` }
    ],
    complications: [
      `The monolatrists have excellent reasons not to worship other gods`,
      `The monolatrists seek to forbid other faiths in nations they control`,
      `The monolatrists are convinced the other faiths want to destroy them and act accordingly`
    ],
    things: [
      `relics from a defeated faith taken as trophies`,
      `evidence proving an important believer is secretly revering other gods`,
      `a lost holy relic taken by a rival faith`
    ],
    places: [
      `at the ruins of a destroyed rival temple`,
      `in a hidden cell of illicit believers`,
      `at a splendid temple to the sole god`
    ]
  },
  'multicephalous faith': {
    tag: 'multicephalous faith',
    type: 'faith',
    context: `The religion has more than one head, with multiple pontiffs having control over different {regions|sections} of the faith. The various heads {cooperate as circumstances recommend|exist as the result of long-lasting schisms and disputes}. Their doctrines {are widely divergent|differ in ways crucially important only to believers}.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Pontiff bent on sole rule`, age: ['middle age', 'old'] },
      { alias: `Clerical schemer working to undermine a rival head`, age: ['middle age', 'old'] },
      { alias: `Secular ruler determined to make their local head the primate` }
    ],
    friends: [
      { alias: `Elegant clerical diplomat` },
      { alias: `Believer seeking harmonious unification` },
      { alias: `Pontiff struggling to retain independence`, age: ['middle age', 'old'] }
    ],
    complications: [
      `One pontiff has theoretical supremacy, but no practical control`,
      `The pontiffs are mere puppets of their respective secular rulers`,
      `One or more pontiffs are engaged in a hot religious war`
    ],
    things: [
      `a lost holy scripture proving one of the prelacies is invalid`,
      `an extremely precious bribe to a pontiff`,
      `a holy relic conferring great spiritual authority on the owner`
    ],
    places: [
      `at twinned churches revering different heads`,
      `at a former temple of one sect now controlled by another`,
      `at an ancient shrine from before the splintering `
    ]
  },
  'mutilated clergy': {
    tag: 'mutilated clergy',
    type: 'faith',
    context: `Clergy of the faith are required to undergo {grievous mutilation|physical scarring} to sanctify their new and holy status. This maiming cannot be healed without losing clerical status. These sacrifices are connected with {a mythic maiming of a god|the expulsion of human weakness}.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Sadistic priest in charge of mutilations` },
      { alias: `Zealot bent on sanctifying as many as possible` },
      { alias: `Ruler who uses such sanctification as punishment` }
    ],
    friends: [
      { alias: `Reformer seeking an end to the practice` },
      { alias: `Devout believer who embraced it gladly` },
      { alias: `Priest quietly attempting to dissuade others from following him` }
    ],
    complications: [
      `The mutilation grants arcane abilities to the subject`,
      `A third party can suffer the mutilation on the priest's behalf`,
      `The higher one's rank the more complete the mutilation`
    ],
    things: [
      `a mutilated relic of a famous saint`,
      `the cure for a regretful cleric`,
      `a precious implement used as part of the mutilating process`
    ],
    places: [
      `at a hospital area for recovering initiates`,
      `at a shrine adorned with sculptures of maimed priests`,
      `at a temple staffed with mutilation-flaunting clergy `
    ]
  },
  'new dispensation': {
    tag: 'new dispensation',
    type: 'faith',
    context: `The faith has recently been rocked by a new {holy scripture|prophetic revelation|structure enforced by secular lords|interpretation of divine law}. The new structure is in control, but threatened by bitter devotees of the old ways, and different regions of the faith have different degrees of loyalty to the new ways. Others might secretly condemn the new ways as a false imposition.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Renegade cleric of the old ways` },
      { alias: `Brutal inquisitor of the new faith` },
      { alias: `Secular ruler using the change as an excuse to settle scores` }
    ],
    friends: [
      { alias: `Upright follower of the traditional doctrine` },
      { alias: `Appealing missionary of the new ways` },
      { alias: `Harried cleric trying to calm the situation` }
    ],
    complications: [
      `The new dispensation is very advantageous to the local secular rulers`,
      `The divide is drawn sharply between different {classes|regions}`,
      `The new dispensation is actually false and the work of some dark power`
    ],
    things: [
      `a secret roster of old faith supporters`,
      `a holy relic spirited away by traditionalists`,
      `a wondrous relic created by the new dispensation`
    ],
    places: [
      `at a refitted temple with new symbols`,
      `at a rustic shrine that has yet to convert`,
      `at a prison-monastery for recalcitrant clerics `
    ]
  },
  'quietist faith': {
    tag: 'quietist faith',
    type: 'faith',
    context: `The faith seeks perfect communion with its deity through stillness of mind and soul, seeking silent meditation and disengagement from secular concerns. While this principle does not require an indifference to worldly affairs, most quietist practitioners withdraw from political life or economic concerns beyond the minimum required for subsistence. Their detachment can leave them prey to more secular-minded threats.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Absolutist refusing to deal with an impending threat` },
      { alias: `Ruler taking advantage of the faith's quietism` },
      { alias: `Violent firebrand preaching a very different sectarian doctrine` }
    ],
    friends: [
      { alias: `Humble hermit seeking communion` },
      { alias: `Frustrated believer trying to act on a problem` },
      { alias: `Much-loved paragon of the faith` }
    ],
    complications: [
      `The quietists enforce their principles with murderous violence`,
      `The quietists are trusted to handle certain very important matters by the culture`,
      `The quietists command great wealth, but use very little of it`
    ],
    things: [
      `a book of hidden enlightenment`,
      `a humble object sanctified into holiness by its possessor`,
      `a secret prophecy made by a quietist seer`
    ],
    places: [
      `at an austere wilderness monastery`,
      `in a quiet self-contained rural community`,
      `in a private cell for retreat in a luxurious urban home `
    ]
  },
  'rampant simony': {
    tag: 'rampant simony',
    type: 'faith',
    context: `Significant positions within the religion are available for sale ({openly|through a tacit exchange of resources}). As a consequence, major clerics are often wealthy believers who take open advantage of their positions to advance their personal interests. This faith considers this simony {perfectly moral and acceptable|a sign of advanced corruption in the hierarchy}. Most simoniacal priests {only have purely ceremonial roles|have real power within the church}.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Oligarch-priest interested only in profit`, age: ['adult', 'middle age', 'old'] },
      { alias: `Prelate who can be bribed to bless anything`, age: ['middle age', 'old'] },
      { alias: `Cleric determined to {steal|take} enough to advance` }
    ],
    friends: [
      { alias: `Frustrated outside reformer of the faith` },
      { alias: `Pragmatist seeking to use the money well` },
      { alias: `Rich hierarch quietly trying to reform from within`, age: ['middle age', 'old'] }
    ],
    complications: [
      `The government extracts much of the simoniacal wealth from the faith`,
      `The faith desperately needs the money to pay for costly {new temples|wars|missionary efforts}`,
      `The faith pays merchants and others in clerical titles`
    ],
    things: [
      `a massive trove of donated wealth`,
      `a token that grants the bearer a great title`,
      `a masterwork offered by a great artisan for a title`
    ],
    places: [
      `at the hidden vault of an arch-priest`,
      `at an auction house where titles are sold`,
      `at an oligarch's temple-villa `
    ]
  },
  'reformist struggle': {
    tag: 'reformist struggle',
    type: 'faith',
    context: `The faith is being rocked by a conflict between reformers and traditionalists. The former seeks to purify the faith through returning to earlier practices or expunging corruption from the church, and has little respect for {practical considerations|pragmatic limits}. The traditionalists may be venal or corrupt, but may also have the support of secular powers that seek stability over a reformed, but unreliable faith.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Murderously impractical reform leader`, age: ['middle age', 'old'] },
      { alias: `Corrupt hierarch of the old ways`, age: ['middle age', 'old'] },
      { alias: `Reasonable-sounding reformer with catastrophically bad ideas` }
    ],
    friends: [
      { alias: `Baffled clerical reformer who never meant for it to go this far` },
      { alias: `Veteran cleric struggling to cleanse corruption` },
      { alias: `Priestly diplomat trying to calm the situation` }
    ],
    complications: [
      `The reformists are actually full of terrible ideas that will inevitably bring ruin`,
      `The faith has become corrupted due to an outside force rather than mere moral inertia`,
      `A hostile rival group is supporting both sides to intensify the discord`
    ],
    things: [
      `a vast trove gathered by a venal high priest`,
      `a stash of {weapons|blackmail} gathered by reformers`,
      `a holy relic conferring legitimacy on the owning sect`
    ],
    places: [
      `at a angrily-strict reformist monastery`,
      `at a corrupt temple full of venal clerics`,
      `at a age-worn shrine full of pragmatic and worldly priests `
    ]
  },
  'remnant faith': {
    tag: 'remnant faith',
    type: 'faith',
    context: `There exists a religion that is only a remnant of a former faith, having {collapsed into schism|been destroyed by secular powers|most its believers absorbed by a more appealing creed}. Many relics and abandoned shrines exist in lost places, some of which may now be under the control of other faiths or hold relics of the religion's former heyday.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Bitter priest seeking a bloody revival of the past` },
      { alias: `Rival power seeking to complete the faith's ruin` },
      { alias: `Scavenger lord picking at the weakened creed's wealth` }
    ],
    friends: [
      { alias: `Determined preacher seeking revival` },
      { alias: `Latest pontiff of an age-old clerical line`, age: ['middle age', 'old'] },
      { alias: `Harried local priest just trying to keep things going` }
    ],
    complications: [
      `The faith was dethroned because of its decadence`,
      `The faith only very recently collapsed into this ruin`,
      `Another sect of the faith is still strong and active`
    ],
    things: [
      `treasure lost in the faith's collapse`,
      `an ancient relic from a now-lost temple`,
      `a trophy that would revive the faith's fortunes`
    ],
    places: [
      `at a ruined temple from a lost age`,
      `at a freshly-wrecked shrine from a chaotic fall`,
      `at a half-empty temple that was once full `
    ]
  },
  'rival religion': {
    tag: 'rival religion',
    type: 'faith',
    context: `The creed is locked in a fierce struggle with another religion. {Each faith has its own sharply-delineated region of influence|Both faiths are intertwined in the same land, quarreling over the same believers and resources}. This rivalry is the result of {inimical deities|secular conflict over {control of the local aristocracy|the allegiance of the common masses}}.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Hierarch obsessed with victory at any cost`, age: ['middle age', 'old'] },
      { alias: `Manipulator profiting by the struggle` },
      { alias: `Traitor in the service of the rival faith` }
    ],
    friends: [
      { alias: `Would-be peacemaker priest` },
      { alias: `Believer caught in the crossfire` },
      { alias: `Adherent secretly in love with a believer of the rival faith` }
    ],
    complications: [
      `A third party is profiting greatly from the struggle`,
      `One faith is getting desperate and willing to go to extremes`,
      `The rivalry is ancient and formalized`,
      `One faith is a successful splinter sect of the other`
    ],
    things: [
      `a {literal|metaphorical} weapon to ensure victory`,
      `a deed to precious disputed property`,
      `the right to oversee a ceremony of great social importance`
    ],
    places: [
      `at a shrine heavily fortified against attack`,
      `at an institution poisonously divided between believers`,
      `at a bloody pogrom site of the local minority faith `
    ]
  },
  'schismatic faith': {
    tag: 'schismatic faith',
    type: 'faith',
    context: `The faith is racked by schism and division, with more than one {new prophet|"true pontiff"} leading significant numbers of believers. {Secular powers are backing the largest fragment in an attempt to restore stability|The constant disruptions have earned the anger of principle secular figures}. Unlike a multicephalous church, none of the sects recognize any authority in the others.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Firebrand schismatic hierarch`, age: ['middle age', 'old'] },
      { alias: `Brutal veteran victor of doctrinal wars`, age: ['adult', 'middle age', 'old'] },
      { alias: `Local ruler bent on bloodily crushing all the sects` }
    ],
    friends: [
      { alias: `Idealistic well-intending sect leader`, age: ['middle age', 'old'] },
      { alias: `Priest struggling to unify the sects`, age: ['adult', 'middle age', 'old'] },
      { alias: `Local ruler desperately trying to stop the struggle without extreme measures` }
    ],
    complications: [
      `The schism was born out of an abortive reform effort`,
      `The schism is the fruit of a catastrophic failure of leadership`,
      `The schism was born when the leadership became puppets of a hostile power`
    ],
    things: [
      `holy relics of a destroyed sect`,
      `legitimating regalia from before the schism`,
      `a sacred scripture proving one sect is correct`
    ],
    places: [
      `at a burnt-out temple`,
      `at a makeshift shrine established by a new sect`,
      `at a monastery torn into multiple feuding groups `
    ]
  },
  'state faith': {
    tag: 'state faith',
    type: 'faith',
    context: `The religion is the official religion of a nation, one which all natives are expected to honor, even if they are not active believers. Any other faiths are expected to cede the foremost position to this creed, and any attempt to withhold worship to its god is considered tantamount to open treason. Reverence toward the faith is considered identical with loyalty to the state, and its clerics serve as important government functionaries.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Local noble who despises other faiths` },
      { alias: `Traitorous priest-agent of a foreign power` },
      { alias: `Cynical official using belief only for secular ends` }
    ],
    friends: [
      { alias: `Stubborn local who won't revere the god` },
      { alias: `Clueless foreigner who accidentally blasphemes severely`, culture: 'foreign' },
      { alias: `Priest determined to uphold the faith's spiritual doctrine` }
    ],
    complications: [
      `The faith is bifurcated into purely spiritual members and secular clerics who have all the worldly influence`,
      `The faith is explicitly headed by the secular ruler`,
      `Doctrines keep changing to suit secular needs`
    ],
    things: [
      `an ancient scripture from before its adoption as state faith`,
      `government-collected tithes`,
      `wealth entrusted to the faith for safeguarding`
    ],
    places: [
      `at a glorious national temple`,
      `at a monastery that is more like a bureaucratic office`,
      `at a vast plaza for grand religious rites `
    ]
  },
  'stratified practice': {
    tag: 'stratified practice',
    type: 'faith',
    context: `There is a very substantial difference in doctrine and worship between different levels of believers. {Common folk have colorful and emotionally-satisfying rituals for important life events, while the clergy prefer austere, intellectual exercises|Different traditions within the same faith having different goals in their worship}.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Deviant using differences in practice to justify new dark ends` },
      { alias: `Reformer seeking to crush blasphemous practices` },
      { alias: `Zealot embracing a traditional and repugnant practice` }
    ],
    friends: [
      { alias: `Scholar studying the roots of various practices` },
      { alias: `Last practitioner of an ancient way` },
      { alias: `Revivalist seeking to bring back former customs` }
    ],
    complications: [
      `The practices are meant to keep social orders in their correct places`,
      `Some practices are secret even from other believers`,
      `Certain practices are outright forbidden to all, but the great and noble`
    ],
    things: [
      `valuable regalia required for certain elite practices`,
      `a tome revealing that a low-class practice is most correct`,
      `a gaudy, but priceless idol fashioned by a rich commoner believer`
    ],
    places: [
      `at a worship site that looks nothing like another nearby worship site`,
      `at a restricted shrine for a particular group`,
      `at a forest clearing for a forbidden practice `
    ]
  },
  'syncretic faith': {
    tag: 'syncretic faith',
    type: 'faith',
    context: `This religion cheerfully absorbs other faiths and gods, casting them as {servitors of their deity|different aspects of their chosen divinity}. They may assimilate other elements of doctrine or ritual in the process, or swallow whole priesthoods as sub-categories of their religious hierarchy. When faced with another religion, their immediate instinct is to explain how it is the same as their own rather than to reject it fundamentally.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Ruthless religious imperialist` },
      { alias: `Zealot of a rival faith determined to prove its uniqueness` },
      { alias: `Assimilated priest promoting a sinister synthesis` }
    ],
    friends: [
      { alias: `Avid scholar-monk seeking similarities` },
      { alias: `Assimilated priest seeking some doctrinal integrity` },
      { alias: `Secret practitioner of now-outmoded faith` }
    ],
    complications: [
      `The faith intentionally erases all troublesome history of assimilated faiths`,
      `The faith has a very mercenary attitude toward all aspects it serves`,
      `The faith is riven by numerous utterly incompatible doctrines`
    ],
    things: [
      `a lost holy idol of a forgotten faith`,
      `a tome with a dark truth about a popular aspect`,
      `a holy relic commandeered by the new faith`
    ],
    places: [
      `at a temple with numerous new additions`,
      `at a converted shrine of an assimilated faith`,
      `at a open-air revival where the new doctrine is being taught `
    ]
  },
  'underclass faith': {
    tag: 'underclass faith',
    type: 'faith',
    context: `This religion is a faith of the poor, oppressed, marginalized, and unimportant. While the god may not specifically be oriented toward the underclass, the great majority of believers are from socially inferior classes. Those of higher classes are usually reluctant to associate with it, given its aura of disrepute. The faith serves to {comfort and console the underclass|transform the underclass into a weapon of revolt and change}.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Bloodthirsty revolutionary priest` },
      { alias: `Noble who despises the faith` },
      { alias: `Cynical priest milking #possessive# poor flock` }
    ],
    friends: [
      { alias: `Earnest shepherd of the poor` },
      { alias: `Upper-class convert to the belief` },
      { alias: `Pragmatic cleric seeking practical improvements` }
    ],
    complications: [
      `The faith was designed as a synthetic tool to reinforce existing class structures`,
      `Secret powerful sympathizers exist among the elite`,
      `The faith has real power via its influence on the masses`
    ],
    things: [
      `the tithe of some resource vital to poor believers`,
      `a relic of a great champion of the poor`,
      `the trove of some precious good produced by socially-disdained artisans`
    ],
    places: [
      `at a tumbledown shrine in the slums`,
      `at a secret shrine in a wealthy household`,
      `at a hidden camp of pariah-zealots `
    ]
  },
  'upstart underclass': {
    tag: 'upstart underclass',
    type: 'faith',
    context: `The religion is an avenue of advancement for its underclass members. Its clergy and major benefactors have a high status in the society, and so those without wealth or talent are using it as a tool of social climbing. Many of its major clergy might be exceptionally talented or rich members of local communities.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Amoral social-climber prelate` },
      { alias: `Noble hostile to its influence` },
      { alias: `Secret elite sponsor of priestly puppets` }
    ],
    friends: [
      { alias: `Brilliant cleric from an outcast class` },
      { alias: `Broad-minded prelate of the faith` },
      { alias: `Low-class entrepreneur seeking advancement through contributions` }
    ],
    complications: [
      `A faction of the faith bitterly resents the low-class upstarts`,
      `The low-class members have very different goals for the faith than the upper-class ones`,
      `The permissibility of underclass leadership hinges on a single vulnerable doctrinal ruling`
    ],
    things: [
      `a rich new convert's huge donation`,
      `blackmail collected by an intimate servant who converted`,
      `a token of legitimate possession of an important socio-religious position`
    ],
    places: [
      `at a new temple raised in a poor part of town`,
      `at a somewhat gaudy and nouveau-riche shrine of a lower-class priest`,
      `at an exclusive club with loud new members `
    ]
  },
  'venal clergy': {
    tag: 'venal clergy',
    type: 'faith',
    context: `The hierarchy has been corrupted by money, influence, and material comfort. Clergy are now selected for their ability to fit in with the existing order, and clerics view their positions as opportunities for personal advancement. The religion's debased state {has been the case for so long that the believers expect nothing else|is the result of {recent enrichment|the gaining of great social power}}.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Venal hierarch without a trace of piety`, age: ['middle age', 'old'] },
      { alias: `Theologian crusading to make the depravity doctrinally legitimate` },
      { alias: `Clerical oligarch with a heart of stone`, age: ['adult', 'middle age', 'old'] }
    ],
    friends: [
      { alias: `Secretly-scheming reformer` },
      { alias: `Afflicted victim of a cleric's greed` },
      { alias: `Stubborn adherent to a less venal doctrine` }
    ],
    complications: [
      `The venality is {hidden|discussion of it is harshly suppressed}`,
      `The venality exists and is self-reinforcing only in the upper leadership`,
      `The secular leaders use the faith's avarice to control it`
    ],
    things: [
      `a rich prelate's fabulous wealth`,
      `an exotic delight craved by hierarchy`,
      `undeniable proof of a high priest's corruption`
    ],
    places: [
      `at a luxuriantly-appointed private clerical villa`,
      `at a salon infamous for venal coinsures`,
      `in a village impoverished by clerical exactions `
    ]
  },
  'vital service': {
    tag: 'vital service',
    type: 'faith',
    context: `The religion performs a vital social service (monopoly on a certain good|performing a critical kind of labor|maintaining a vital resource|providing a necessary education). The religion's control of this service gives it much of its influence and power, and it will move sharply to counter any attempt to disrupt its monopoly.`,
    constraints: { regional: true },
    enemies: [
      { alias: `Oligarch-priest seeking power over piety`, age: ['adult', 'middle age', 'old'] },
      { alias: `Avaricious noble in partnership with the faith` },
      { alias: `Cold-blooded entrepreneur seeking to seize the faith's monopoly` }
    ],
    friends: [
      { alias: `Artisan-cleric of superlative skill` },
      { alias: `Idealistic laborer in the church's specialty` },
      { alias: `Commoner utterly dependent on the church's service` }
    ],
    complications: [
      `Providing this service exacts a brutal cost on those who serve due to {environmental dangers|manufacturing processes}`,
      `This service is key to controlling large amounts of {money|influence} via secondary effects`,
      `The faith is intimately entwined with relevant craft guilds`,
      `The ability to provide this service is more important than piety in clerics`
    ],
    things: [
      `a secret handbook of the deepest lore of the service`,
      `a lost tool vital to providing the service`,
      `a vast trove earned by the service`
    ],
    places: [
      `at a bustling manufactory of the service`,
      `at a market where the service can be purchased`,
      `at a temple adorned with symbols and signs of the service `
    ]
  }
}
