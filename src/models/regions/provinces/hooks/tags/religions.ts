import { HookTemplate } from '../types'

export const religions: HookTemplate = {
  hooks: {
    'Ancient Ways': {
      text: 'The religion is only the latest iteration of a faith that goes back beyond recorded history. Ancient temples and doctrines of very different kinds may still exist, abandoned after now-forgotten ages of reform and change. Fragments of these ancient ways may resurface, along with stranger practices less palatable to modern believers. Reformists may sometimes unearth these ways and insist on their revival.',
      enemies: [
        { title: 'Zealot restoring a bloody past' },
        { title: 'Heir to an ancient enmity' },
        { title: 'Head of a dark surviving sect' }
      ],
      friends: [
        { title: 'Eager temple archaeologist' },
        { title: 'Keeper of ancient wisdom' },
        { title: 'Guardian of an abandoned shrine' }
      ],
      complications: [
        'Restoring a vital relic requires long-lost ritual knowledge',
        'Something sealed away with forgotten rites is now rising again',
        'A seemingly-harmless ritual object actually has a terrible power'
      ],
      things: [
        'Precious relic of old',
        'Lost book of vital holy scripture',
        'Hidden trove of forgotten regalia'
      ],
      places: [
        'Desolate temple in a dead city',
        'Shrine lost in perilous terrain',
        'Temple buried beneath the layers of a growing city'
      ]
    },
    'Antinomian Strain': {
      text: 'Some segment of the believers or clergy are antinomians, convinced they are above or beyond all moral laws. Some believe that this is due to their innate enlightenment, and that their every desire sanctified as the will of God, Others believe that moral and religious law is but a veil to be surpassed by the truly elect. This utter freedom is appealing to many adherents, including those with extremely ugly urges to indulge.',
      enemies: [
        { title: 'Divinely-sanctified psychopath' },
        { title: 'Cynical manipulator of the “free”' },
        { title: 'Revolutionary against all morality' }
      ],
      friends: [
        { title: 'Well-intentioned crusader for liberty' },
        { title: 'Reactionary sectarian moralist' },
        { title: "Victim of a cleric's unfettered desires" }
      ],
      complications: [
        "They're mostly reacting against very ugly and reprehensible moral laws",
        'The faith is divided between antinomians and their unappealing moralist rivals',
        'The faith is being backed by enemies of the society it is trying to deconstruct'
      ],
      things: [
        "Proof of a holy leader's horrible crimes against others",
        'Treasure seized by amoral priestly thief',
        'Indulgence document allowing the bearer to perform any one crime without repercussions'
      ],
      places: [
        'Orgiastic and violent religious festival',
        'Beatific commune with dark underside',
        'Decadent salon of highly intellectual degenerates'
      ]
    },
    Aristocratic: {
      text: "The faith is largely or exclusively practiced by the elite of the society, and believers from lesser classes are either unable to carry out the obligations of the faith or are prohibited from participating. Clergy of the faith may be spare children of the noble class who are bundled away into the religion to keep them out of political affairs, or they may be functioning members of the society's rulership with real authority over secular matters.",
      enemies: [
        { title: 'Cold-blooded aristocrat with only passing interest in religious concerns' },
        { title: 'Younger noble embittered by #possessive# shelving', youth: true },
        { title: 'Carefully-placed agent of a major noble house seeking only their advantage' }
      ],
      friends: [
        { title: 'Unworldly high-born innocent only concerned with the faith' },
        { title: 'Grizzled political campaigner seeking quiet retirement in a monastery' },
        { title: 'Idealistic reformer seeking greater access' }
      ],
      complications: [
        'The religion actually requires a noble bloodline for certain ritual and pragmatic necessities',
        'Commoners are forming illicit parallel congregations',
        'High religious offices have no spiritual worth at all but are only political bargaining chips among noble houses'
      ],
      things: [
        'Fabulously costly regalia of a dead king-priest',
        'Once-lost text proving the commoner bloodline of a major house',
        'Tithe-trove of loot extracted from commoners'
      ],
      places: [
        'Cathedral-palace of a prince-bishop',
        'Shrine adorned by generations of a noble house',
        'Ornate ceremony attended only by nobility'
      ]
    },
    Ascetic: {
      text: "The faith tends to scorn material wealth and comforts, esteeming poverty, simplicity, and deprivation. Its shrines and regalia tend to be very simple and austere, though personal simplicity doesn't mean the faith has no political power. Kings and princes may have such ascetics as personal advisers and spiritual guides. Extreme interpretations of the faith favor painful penances and harsh personal austerities.",
      enemies: [
        { title: 'Obsessive zealot determined to extinguish many “luxuries”' },
        { title: 'Idealistic extremist efficiently pursuing a totally impractical goal' },
        { title: 'Furiously envious ascetic who wants the rich to suffer' }
      ],
      friends: [
        { title: 'Humble forest hermit harried by greater powers' },
        { title: 'Inspiring noble-born model of self-restraint and austerity' },
        { title: 'Former decadent seeking redemption and avoiding any opportunities to sin' }
      ],
      complications: [
        'A faction of the faith is deeply luxury-loving via thin rationalizations',
        'The faith is always pushing for idealistic but impractical laws',
        'The ascetic rites change the priests in both positive and negative ways'
      ],
      things: [
        'Abandoned treasures of a formerly-rich cleric',
        'Hidden wealth enjoyed by a hypocritical priest',
        'Deed to vast temple land holdings used to support the ascetics'
      ],
      places: [
        'Harshly simple and uncomfortable monastery',
        'Crude forest hermitage',
        'Stark and bare monastic cell within a luxuriant noble palace'
      ]
    },
    'Bad Leadership': {
      text: 'The faith is currently led by an incompetent head. They may be senile, corrupt, deranged, or simply a bumbling incompetent who ended up as leader through an unfortunate set of accidents. Simply removing the leader would result in some dire consequence, such as a schism between rival factions or the end of a crucial bloodline of leadership. Even so, their dictates, appetites, or foolish ambitions are hurting the church.',
      enemies: [
        { title: 'Clerical kingmaker manipulating the incompetent' },
        { title: 'Priestly careerist only interested in currying favor with the leader' },
        { title: 'Sinister lover or associate who has beguiled the leader' }
      ],
      friends: [
        { title: 'Capable but unpolitic rival candidate for leadership' },
        { title: 'Frustrated handler trying to guide the leader to reasonableness' },
        { title: 'Horrified clerical schemer who never meant for this nullity to become leader' }
      ],
      complications: [
        "The leader is seeking a goal vital to the faith's survival but doing it in a very stupid way",
        "The leader's personal wealth or power are critical to the faith's health",
        "The leader's rivals all hate each other more than him"
      ],
      things: [
        'Proof that the leader was illegitimately chosen',
        'Treasure or relic that the leader allowed to become lost',
        "Blackmail material that is keeping the leader's rivals from acting"
      ],
      places: [
        'Confused and poorly-run cathedral',
        'Half-built folly ordained by the leader',
        'Derelict and abandoned monastery'
      ]
    },
    'Caste Structure': {
      text: 'The religion orders all its members, and perhaps all humanity in general, into different castes. Each caste has its purpose and role in this life and the next, and moving between castes is usually impossible. The burdens of the faith are rarely apportioned evenly, and some castes may be considered intrinsically contemptible. Other strata might provide all the clerics of a particular rank or role within the faith.',
      enemies: [
        { title: 'Indifferent hierarch who uses subordinates like cattle' },
        { title: 'Brutal priest who thinks the low-caste deserve whatever suffering they get' },
        { title: 'Revolutionary who seeks to destroy the entire society' }
      ],
      friends: [
        { title: 'Earnest striver seeking to advance within society' },
        { title: 'Discreet reformer of the caste system' },
        { title: 'Cynical broker of caste changes for due consideration' }
      ],
      complications: [
        'The caste system has some objective magical or spiritual grounding',
        'Caste roles change with political or social changes',
        'The current downtrodden were formerly the elite downtreaders'
      ],
      things: [
        "Evidence of a person's real and unsuitable caste",
        'Tribute accumulated by a laboring caste',
        'Hidden sacred texts that prescribe a very different caste arrangement'
      ],
      places: [
        'City quarter of carefully-separated caste groupings',
        "Shrine meant for a specific caste's usage",
        'Graveyard arranged by caste'
      ]
    },
    Crusading: {
      text: 'The faith is fighting a war against a rival religion or hostile nation. They may be seeking to succor co-religionists, redeem land lost to the faith, or enforce their beliefs at the point of the sword. Believers are being vigorously encouraged to contribute both wealth and their own swords to the holy cause. The secular powers in the area may be enthusiastic supporters of the fight, or they may be simply unable to control the zeal of the believers.',
      enemies: [
        { title: 'Burning-eyed clerical crusader' },
        { title: 'Cynical secular lord exploiting the volunteers' },
        { title: 'Profiteer seeking gain out of the bloodshed' }
      ],
      friends: [
        { title: 'Fearless defender of a sympathetic cause' },
        { title: 'Hapless victim caught in the crossfire' },
        { title: 'Sectarian preaching less violent proselytization' }
      ],
      complications: [
        'The crusade has very sympathetic aims but may be going too far',
        'The crusaders have unimpeachable doctrinal support for their bloodshed',
        'The crusade is redirecting energy from an entirely different social problem'
      ],
      things: [
        'Payment for vital mercenary support',
        'Precious offering made to support the crusade',
        'Treasure hidden by locals killed in the fighting'
      ],
      places: [
        'Once-harmonious town now split in savage sectarianism',
        'Burnt temple of the rival faith',
        'Massacre site of infidels or captured crusaders'
      ]
    },
    'Dire Sacrifices': {
      text: 'Tremendous sacrifices are required of believers. In some cases, this might involve human sacrifice, while others may need to give up years of their lives, vast amounts of wealth, basic human pursuits, or other great costs. These costs may be exacted of only a few elect believers, or only clergy, or they may be universal prices among all adherents. This faith likely has relatively few believers, or else offers abundant compensations to its followers.',
      enemies: [
        { title: "Brutal enforcer of the religion's price" },
        { title: 'Aspirant scheming to evade the price' },
        { title: 'Manipulator seeking to make someone else pay the price on their behalf' }
      ],
      friends: [
        { title: "Luckless victim of the faith's exactions" },
        { title: "Traumatized cleric who's paid the price" },
        { title: 'Sectarian offering a doctrine with a less brutal price' }
      ],
      complications: [
        'The price paid strengthens the faith directly in some way',
        "Other people can be made to pay the price in the aspirant's place",
        'The more a cleric pays the greater their standing in the faith'
      ],
      things: [
        'Tribute offered up as part of the price',
        'Precious goods abandoned by those who need them no more',
        'Potent relic created by terrible sacrifices'
      ],
      places: [
        'Grim temple stained by sacrifice',
        'Cloister marked by the scars and losses of those who dwell in it',
        'Ossuary or burial ground for those expended by sacrifice'
      ]
    },
    Dualist: {
      text: "The religion's deity is viewed in a dualistic way, with both positive and negative aspects, possibly represented by two completely different deities. One aspect focuses on all the good or beneficial facets of the god, while the other is responsible for all evil traits. The negative face may still be worshiped out of fear, or it may be despised as a rival twin. In cases where the god is thought to be two separate beings, sectarians may argue over which qualities belong with which deity.",
      enemies: [
        { title: 'Grim high priest of the negative aspect' },
        { title: 'God-bargainer trading good deeds for license to do evil ones' },
        { title: 'Renegade cleric who once followed the good aspect' }
      ],
      friends: [
        { title: 'Sympathetic priest of the negative face seeking to avert its attention' },
        { title: 'Upright and noble follower of the good god' },
        { title: 'Curious scholar asking dangerous questions about past doctrine' }
      ],
      complications: [
        'Which aspect is considered evil is based on which sect has the most power',
        'The negative aspect is vital to human life in some way',
        'The negative aspect is totally and violently rejected by all but the most depraved'
      ],
      things: [
        'Lost holy scripture full of terrible truths',
        'Regalia of a now-proscribed priesthood to an illicit aspect',
        'Dark artifact that is terrible but must not be destroyed'
      ],
      places: [
        'Hidden shrine to the negative aspect',
        'Grand temple to both faces of the god',
        'Fane to one aspect that used to belong to the other'
      ]
    },
    'Economic Role': {
      text: "The faith has a critical role in the economy of the society, serving some function with enormous economic influence. They may be bankers, large-scale land owners, owners of factories or artisan colonies, moneylenders, or the like. This role may be part of the faith or an accidental consequence of the faith's membership. The clerics may mask this role under a layer of doctrinal rationalization, or they may openly embrace it.",
      enemies: [
        { title: 'Greedy priestly moneylender' },
        { title: 'Avaricious cleric-administrator of a vital industry' },
        { title: 'Corrupt union boss arch-priest of a sacred profession' }
      ],
      friends: [
        { title: 'Unworldly master artisan-priest' },
        { title: 'Reformer seeking to use the role for greater good' },
        { title: "Outside lord trying to pare back the faith's excessive worldly influence" }
      ],
      complications: [
        "The faith's origins lie in their economic role",
        'Their economic importance was foisted on them by foolish or pious aristocrats',
        'The religion is little more than a skin over the business'
      ],
      things: [
        'Earnings extracted from their clients or customers',
        'Precious goods only they are allowed to trade in',
        'Capital amassed for some great economic project'
      ],
      places: [
        "A temple that's more a counting-house",
        'Extravagantly ornate religious buildings',
        'Industrial site designed with monastic influences'
      ]
    },
    'Esoteric Doctrine': {
      text: 'A secret doctrine exists that is only shared with a core of inner elect. There may be multiple layers of esotericism, each step upward in the hierarchy rewarded with deeper truths. This inner faith might simply be strange and philosophical, or it might be “difficult”, requiring a secret repudiation of the lesser, outer beliefs. The faith might intentionally promulgate false esoteric doctrines to throw off spies and prying scholars.',
      enemies: [
        { title: 'Secret master with dark doctrines' },
        { title: 'Cynical manipulator of the texts' },
        { title: 'Zealot driven to extreme acts by what they have learned' }
      ],
      friends: [
        { title: 'Protector of the sacred secrets' },
        { title: 'Renegade fleeing from a terrible inner truth' },
        { title: 'Scholar seeking the real doctrines' }
      ],
      complications: [
        'There are multiple inner doctrines that struggle against each other',
        'The innermost secrets are lost and the hierarchs seek them constantly',
        'The secrets are actively toxic to those unprepared for them'
      ],
      things: [
        'Book of forbidden truths',
        'Encryption key to unlock a lost text',
        'Obscure relic with tremendous hidden importance'
      ],
      places: [
        'Tightly-guarded sanctum within a great cathedral',
        'Hidden shrine where the elect gather',
        'Forbidden library of secret doctrines'
      ]
    },
    'Ethnic Creed': {
      text: 'The religion is considered to be specific to a particular ethnic group. Others might possibly be members, but the leadership and traditions of the faith are identified with the heirs of this group. For some creeds, membership in the faith might be automatic and assumed for any co-ethnic, while other religions only include certain members of the group. Trappings of the faith might be embraced as symbols by co-ethnics who have no religious tie to it at all.',
      enemies: [
        { title: 'Convert seeking to force open clerical authority to outsiders' },
        { title: 'Zealot priest seeking to drive out the impure' },
        { title: 'Corrupt ethnic boss using the faith as an organizing tool' }
      ],
      friends: [
        { title: 'Missionary seeking outside converts' },
        { title: 'Hapless victim of ethnic conspiracy theories' },
        { title: 'Hard-pressed traditionalist seeking to keep the old ways' }
      ],
      complications: [
        'A conspiracy theory about the faith is half-correct in a totally unexpected way',
        'The faith is a prize of war and its rule won by former conquest',
        'The youth are largely disinterested in it'
      ],
      things: [
        'Ancient relic of a culture-hero',
        'Proof a major cleric is of the wrong lineage for their station',
        'Awkward secret that would make trouble for the faith'
      ],
      places: [
        'Shrine in an ethnic neighborhood',
        "Chapel tucked away in a rich believer's estate",
        'Festival ground for an elaborate ethnic celebration'
      ]
    },
    'Failing Faith': {
      text: 'The faith is collapsing, usually under the pressure of a rival religion that is much more appealing to the believers of the old creed. The failing faith usually still has its wealth and political influence, but it is falling into fewer and fewer hands as believers melt away. The religion may take drastic steps to deal with its rival and with apostates, or outsiders might be seeking to gut the dying belief of its lands and treasures while it is weakened.',
      enemies: [
        { title: "Furious crusader seeking vengeance on the faith's supposed murderers" },
        { title: 'Corrupt hierarch concerned only with #possessive# own gain', veteran: true },
        { title: 'Ambitious noble trying to squeeze wealth from the faith' }
      ],
      friends: [
        { title: 'Desperate missionary trying to gain new converts' },
        { title: 'Despairing holy person seeking divine aid' },
        { title: 'Non-believing sympathizer trying to help the faith' }
      ],
      complications: [
        'The fall is due to a reform campaign gone terribly wrong',
        'The faith has become identified with a hated group or traitor faction',
        'The faith has fragmented into mutually-recriminating sects'
      ],
      things: [
        'Treasure seized from an abandoned temple',
        'Land now taken by a rival group',
        'Sacred regalia of a recently-murdered hierarch'
      ],
      places: ['Half-empty shrine', 'Defaced sacred site', 'Temple now held by a rival faith']
    },
    'Folk Religion': {
      text: 'Belief in this religion is simple and unintellectual, with the faith having little in the way of sophisticated philosophical principles or complex doctrine. Most clergy are humble commoners who offer services that satisfy the practical needs of believers and perform rituals that are emotionally meaningful and impressive to participants. The faith may have once had deeper intellectual roots, but few remember them, and fewer draw on them in their daily practice.',
      enemies: [
        { title: 'Deviant priest offering crude and sordid rites' },
        {
          title:
            'Local grandee who considers the faith as much #possessive# property as are #possessive# serfs'
        },
        { title: 'Peasant headman violently opposed to any innovation' }
      ],
      friends: [
        { title: "Scholar of the faith's origins" },
        { title: 'Aspiring reformer of the faith' },
        { title: 'Sincere-hearted peasant believer' }
      ],
      complications: [
        'The primitive rituals conceal a much deeper and more sophisticated doctrine',
        'The religion is an offshoot of a more developed creed',
        'The crudity of the rites is identified as a sign of sincerity and sanctity by many'
      ],
      things: [
        'A precious and ornate offering made by a rich commoner',
        'A relic of a local saint honored by natives',
        'Prized idol esteemed as having holy powers'
      ],
      places: [
        'Rustic shrine with simple offerings',
        'Hidden gathering place in the wilderness',
        'Crude but imposing religious monument in a village'
      ]
    },
    'Forbidden Faith': {
      text: 'The faith is forbidden in some large area, with its practice punished severely. This may be due to the jealousy of the state religion, the negative consequences of the faith on local society, or the identification of the faith with treachery, hostile powers, or moral corruption. Believers must meet secretly and use subtle signs to communicate. Their faith may not always have been so ill-esteemed as it is now.',
      enemies: [
        { title: 'Corrupt and vicious priest of the faith' },
        { title: 'Bitter believer bent on revenge for the oppression' },
        { title: 'Zealot inquisitor convinced the agents of the faith are everywhere' }
      ],
      friends: [
        { title: 'Victim of a mistaken accusation of belief' },
        { title: 'Sympathetic hereditary priest of the faith' },
        { title: "Seemingly-noble martyr to the faith's appealing points" }
      ],
      complications: [
        'The faith really is every bit as horrible as people think',
        'The faith has sympathetic elements but is dedicated to a principle totally inimical to the surrounding culture',
        'The faith has agents everywhere'
      ],
      things: [
        'Secret list of local believers',
        'Hidden relic revered by the faith',
        'Holy relic now held by their enemies as a trophy'
      ],
      places: [
        "Hidden chamber in a rich believer's house",
        'Secret shrine in the wilderness',
        "Chapel concealed in a city's slums or underways"
      ]
    },
    Gnostic: {
      text: 'The religion holds that knowledge is the key to salvation or enlightenment, and only by a profound understanding of its inner truths can a believer be helped. Usually this knowledge is gated behind a series of lesser revelations, each which must be mastered in turn before deeper secrets are revealed to the aspiring adept. These secrets may grant magical power, inflict esoteric forms of insanity, or be brutally pragmatic blackmail material.',
      enemies: [
        { title: 'Obsessed manipulator dealing in lies' },
        { title: 'Cult assassin of those who know too much' },
        { title: 'Outside scholar seeking the truth with bloody methods', foreign: true }
      ],
      friends: [
        { title: 'Hidden master of deep truths' },
        { title: 'Sympathetic aspiring initiate' },
        { title: 'Well-meaning manipulator dealing in truths' }
      ],
      complications: [
        'The secrets have a physical effect on those who know them',
        'The secrets themselves are just tools by which other powers are manipulated',
        'The secrets have been lost and only the leadership knows that'
      ],
      things: [
        'Volume of inner truths written by a renegade',
        'Book of explosively dangerous errors penned by a heresiarch',
        'Precious object with a secret and terrible purpose'
      ],
      places: [
        'Silent monastery of aspiring students',
        'Secret sanctum of the hidden masters',
        'Welcoming temple of the outer truths'
      ]
    },
    'Holy Grounds': {
      text: 'Several places or structures are of critical religious importance to the faith, and must be kept in sanctified safety at all costs. Conflicts within the religion can form over custodianship of these places, and a frenzied response can be goaded by any threat to their security. Believers may be required to make pilgrimages to such locations, or it may be an optional act of faith that increases their standing in the religion.',
      enemies: [
        { title: 'Obsessive guardian seeing a threat to the sites' },
        { title: 'Rival seeking to profane the holy places' },
        { title: 'Sectarian trying to seize control of them' }
      ],
      friends: [
        { title: 'Hard-pressed protector of a remote site' },
        { title: 'Innocent pilgrim seeking aid' },
        { title: 'Cleric seeking a lost holy site' }
      ],
      complications: [
        'Control will soon be passing to an extreme sect',
        'The holy sites have great economic or military value to the possessors',
        'The terrain around the sites is dangerous to pilgrims'
      ],
      things: [
        'Sacred object which defines the holy site',
        'Relic lost by a pilgrim to the site',
        'Trove of offerings made by pilgrims'
      ],
      places: [
        'Guarded entrance to the holy site',
        'Inner sanctum of a site for the most elect',
        'Raucous bazaar set up to supply pilgrims'
      ]
    },
    Localized: {
      text: 'The faith has substantially different manifestations in different locations, each branch harmonized with local cultures and habits. These local branches might recognize each other as fellow believers, or they may consider other sects as being damnable innovators and degenerate heretics. One branch may be senior to the others, exerting more or less control over the other locales.',
      enemies: [
        { title: 'Missionary from a strange and dangerous sub-sect' },
        { title: 'Reformer seeking to correct local habits' },
        { title: 'Cleric of another faith masquerading as a local aspect' }
      ],
      friends: [
        { title: 'Simple local priest seeking to perpetuate native ways' },
        { title: 'Scholar curious about local doctrines' },
        { title: 'Local noble deeply committed to the native creed' }
      ],
      complications: [
        "The sects worship different gods but think it's the same being",
        'The different sects must cooperate for a ritual reason despite their disagreements',
        'Local rulers strongly encourage disunity'
      ],
      things: [
        "Unique relic specific to a local sect's doctrines",
        'Proof that a particular local doctrine is the authentically correct tradition',
        'Relics of a local saint unrecognized elsewhere'
      ],
      places: [
        'Strange-looking local temple',
        'Compromise chapel where multiple sects all pray',
        'Special ritual area for a ceremony practiced only here'
      ]
    },
    'Materially Luxuriant': {
      text: 'The religion prizes ornate regalia, splendid shrines, magnificent religious art, and the finest possible adornment of all things related to the faith. Such religions may make severe demands on believers to provide the necessary abundance, or may have active economic roles to acquire the needed wealth for their luxuriance. The actual clergy may live much more modest lives, or they may also participate in the opulence.',
      enemies: [
        { title: 'Venal and avaricious hierarch', veteran: true },
        { title: "Thief seeking the faith's wealth" },
        { title: 'Fervent builder indifferent to the suffering of those who pay for it' }
      ],
      friends: [
        { title: 'Master craftsman dedicated to the faith' },
        { title: 'Wealthy and enthusiastic supporter' },
        { title: 'Local locked in an unfavorable deal with the faith' }
      ],
      complications: [
        'The opulence has a very real magical or economic benefit',
        'Almost all religious matters have been reduced to questions of offering-prices',
        'The greatest luxuries are offerings of services or blood'
      ],
      things: [
        'Ridiculously jeweled golden idol',
        'Large trove of precious unworked raw materials',
        'Priceless regalia donated by a believer'
      ],
      places: [
        'Gilded shrine of opulent make',
        'Workshop full of artisans for the faith',
        'Counting-house staffed by clerics'
      ]
    },
    'Militarized Faith': {
      text: 'The faith is built for war, with believers and clergy alike organized in a militarized way and equipped with martial training. Not every believer may be a warrior, but they are organized to support and maintain military action against enemies of the faith, whether heretics, infidels, or secular opponents. Death in battle is usually considered to be the most splendid end possible for a faithful believer.',
      enemies: [
        { title: 'Bloodthirsty church general', veteran: true },
        { title: 'Psychopathic hierarch who joined to kill', veteran: true },
        {
          title: 'Ruler cynically manipulating the faith against #possessive# opponents',
          veteran: true
        }
      ],
      friends: [
        { title: 'Noble templar-monk' },
        { title: 'Aspiring martial hero of the faith', youth: true },
        { title: 'Blacksmith making arms and armor for fellow believers' }
      ],
      complications: [
        'The faith has an extremely good reason to constantly be on a war footing',
        'Their martial practices are just a ceremonial shadow of their former ancient prowess',
        'The faith used to be more pacifistic but only the martial zealots are still alive'
      ],
      things: [
        'Famed relic weapon of the faith',
        'Large cache of arms and armor',
        'Relic lost in battle by the faith'
      ],
      places: [
        'Monastery turned boot camp',
        'Barracks-temple for the faith',
        "Bishop-general's field camp"
      ]
    },
    'Missionary Zeal': {
      text: 'The religion is determined to spread itself in new lands and among new people. Shrines train and supply missionary groups and give what support they can to missions established in distant lands. Such religions usually have close ties with the rulers or aristocracy of mission regions, the better to mute hostility and make space for new religious establishments in their lands. Other missions are purely domestic, reaching out toward lapsed believers.',
      enemies: [
        { title: 'Missionary seeking the violent suppression of local rivals' },
        { title: 'Native outraged by missionary efforts' },
        { title: 'Ruler using the missionaries as tools against rivals', veteran: true }
      ],
      friends: [
        { title: 'Idealistic but impractical young missionary' },
        { title: 'Convert abused by their neighbors' },
        { title: 'Local priest trying to find a modus vivendi with the newcomers' }
      ],
      complications: [
        'The faith is strongly identified with a particular nation or ethnicity',
        'The faith relies on its splendor and sophistication to overawe natives',
        'Merchants and rulers use the faith to establish a beachhead in foreign lands'
      ],
      things: [
        'Foreign religious treasures abandoned by rich new convert',
        'Relic from the first native saint of the faith',
        'Native relic sought by missionaries and locals alike'
      ],
      places: [
        'Converted local temple turned to the new faith',
        'Burnt-out home of a new convert',
        'New community of local converts'
      ]
    },
    'Monastic Clergy': {
      text: 'A certain proportion of the clergy are monastics, isolated in religious establishments built exclusively to support them. While many faiths have monastic members, those of this religion are of exceptional importance to the church. Most work the fields to support themselves, or perform handcrafts for nearby communities. Others are supported exclusively on the donations or tithes of believers. Most monastics are credited with being holier than the secular clergy who work in the world, though monasteries can also be nests of hidden corruption.',
      enemies: [
        { title: 'Depraved abbot using monastic privacy for #possessive# own ends', veteran: true },
        { title: 'Mad monk held in holy awe by locals' },
        { title: 'Brutally venal abbot milking the local peasants for her purse', veteran: true }
      ],
      friends: [
        { title: 'Unworldly monk or nun' },
        { title: 'Secular ruler who supports a local monastery', veteran: true },
        { title: 'Ambitious would-be founder of a new monastery' }
      ],
      complications: [
        "All the faith's senior clerics must be drawn from monastics",
        'The monasteries are major economic or military strong points',
        'The monasteries protect books or secrets of the faith'
      ],
      things: [
        'Ancient and valuable illuminated manuscript',
        'Map to the hidden shrine',
        'Sacred relics'
      ],
      places: [
        'Vast and ancient monastery',
        'Hard-pressed young monastery in dangerous terrain',
        "Village founded outside a monastery's walls"
      ]
    },
    Monolatrists: {
      text: 'Many faiths have a loose attitude toward reverence to other gods; a degree of worship of other divinities is only prudent and sensible for a common believer, even if clergy might be expected to be more focused in their offerings. This faith, however, flatly forbids its believers to revere any god but its own, and is liable to be in sharp conflict with other local religions that are insulted or threatened by this exclusivity. Some monolatrist faiths might even seek to extinguish rival religions entirely.',
      enemies: [
        { title: 'Zealous convert-cleric from a faith they now want to destroy' },
        { title: 'Inquisitor seeking out backsliders' },
        { title: "Hostile follower of another faith seeking this creed's ruin" }
      ],
      friends: [
        {
          title:
            'Apostate from another faith seeking only to be left in peace by their former co-religionists'
        },
        { title: 'Missionary seeking to spread the true faith' },
        { title: "Ruler backing the faith for unity's sake", veteran: true }
      ],
      complications: [
        'The monolatrists have excellent reasons not to worship other gods',
        'They seek to forbid other faiths in nations they control',
        "They're convinced the other faiths want to destroy them and act accordingly"
      ],
      things: [
        'Relics from a defeated faith taken as trophies',
        'Evidence proving an important believer is secretly revering other gods',
        'Lost monolatrist relic taken by a rival faith'
      ],
      places: [
        'Ruins of a destroyed rival temple',
        'Hidden cell of illicit believers',
        'Splendid temple to the sole god'
      ]
    },
    Multicephalous: {
      text: 'The religion has more than one head, with multiple pontiffs having control over different regions or different sections of the faith. This may be an intentional and accepted state of affairs, with the various heads cooperating as circumstances recommend, or it may be the result of long-lasting schisms and disputes. Their doctrines might be widely divergent or differ in ways crucially important only to believers.',
      enemies: [
        { title: 'Pontiff bent on sole rule', veteran: true },
        { title: 'Clerical schemer working to undermine a rival head' },
        { title: 'Secular ruler determined to make their local head the primate', veteran: true }
      ],
      friends: [
        { title: 'Elegant clerical diplomat' },
        { title: 'Believer seeking harmonious unification' },
        { title: 'Pontiff struggling to retain independence' }
      ],
      complications: [
        'One pontiff has theoretical supremacy but no practical control',
        'The pontiffs are mere puppets of their respective secular rulers',
        'One or more pontiffs are engaged in a hot religious war'
      ],
      things: [
        'Lost holy scripture proving one of the prelacies is invalid',
        'Extremely precious bribe to a pontiff',
        'Holy relic conferring great spiritual authority on the owner'
      ],
      places: [
        'Twinned churches revering different heads',
        'Former temple of one sect now controlled by another',
        'Ancient shrine from before the splintering'
      ]
    },
    'Mutilated Clergy': {
      text: 'Clergy of the faith are required to undergo some grievous mutilation or physical scarring. The loss of an eye, the removal of genitals or external sexual characteristics, the sacrifice of a hand, laming a leg, or some other price must be paid for their new and holy status. This maiming cannot be healed without losing clerical status. Most such sacrifices are connected with some mythic maiming of a god or the expulsion of human weakness.',
      enemies: [
        { title: 'Sadistic priest in charge of mutilations' },
        { title: 'Zealot bent on sanctifying as many as possible' },
        { title: 'Ruler who uses such sanctification as punishment', veteran: true }
      ],
      friends: [
        { title: 'Reformer seeking an end to the practice' },
        { title: 'Devout believer who embraced it gladly' },
        { title: 'Priest quietly attempting to dissuade others from following him' }
      ],
      complications: [
        'The mutilation grants some sort of power to the subject',
        "A third party can suffer the mutilation on the priest's behalf",
        "The higher one's rank the more complete the mutilation"
      ],
      things: [
        'Mutilated relic of a famous saint',
        'Cure for a regretful cleric',
        'Precious implement used as part of the mutilating process'
      ],
      places: [
        'Hospital area for recovering initiates',
        'Shrine adorned with sculptures of maimed priests',
        'Temple staffed with mutilation-flaunting clergy'
      ]
    },
    'New Dispensation': {
      text: 'The faith has recently been rocked by a new dispensation, whether a new holy scripture, a new prophetic revelation, a new structure enforced by secular lords, or some other upheaval. The new structure is in control, but likely threatened by bitter devotees of the old ways, and different regions of the faith may have different degrees of loyalty to the new ways. Others might secretly condemn the new ways as a false imposition.',
      enemies: [
        { title: 'Renegade cleric of the old ways' },
        { title: 'Brutal inquisitor of the new faith' },
        { title: 'Secular ruler using the change as an excuse to settle scores', veteran: true }
      ],
      friends: [
        { title: 'Upright follower of the traditional doctrine' },
        { title: 'Appealing missionary of the new ways' },
        { title: 'Harried cleric trying to calm the situation' }
      ],
      complications: [
        'The new dispensation is very advantageous to the local secular rulers',
        'The divide is drawn sharply between different classes or regions',
        'The new dispensation is actually false and the work of some dark power'
      ],
      things: [
        'Secret roster of old faith supporters',
        'Holy relic spirited away by traditionalists',
        'Wondrous relic created by the new dispensation'
      ],
      places: [
        'Refitted temple with new symbols',
        'Rustic shrine that has yet to convert',
        'Prison-monastery for recalcitrant clerics'
      ]
    },
    Quietist: {
      text: 'The faith seeks perfect communion with its deity through stillness of mind and soul, seeking silent meditation and disengagement from secular concerns. While this principle does not require an indifference to worldly affairs, most quietist religions withdraw from political life or economic concerns beyond the minimum required for subsistence. Their detachment can leave them prey to more secular-minded threats.',
      enemies: [
        { title: 'Absolutist refusing to deal with an impending threat' },
        { title: "Ruler taking advantage of the faith's quietism", veteran: true },
        { title: 'Violent firebrand preaching a very different sectarian doctrine' }
      ],
      friends: [
        { title: 'Humble hermit seeking communion', veteran: true },
        { title: 'Frustrated believer trying to act on a problem' },
        { title: 'Much-loved elder paragon of the faith', elder: true }
      ],
      complications: [
        'The quietists enforce their principles with murderous violence',
        'The quietists are trusted to handle certain very important matters by the culture',
        'The quietists command great wealth but use very little of it'
      ],
      things: [
        'Book of hidden enlightenment',
        'Humble object sanctified into holiness by its possessor',
        'Secret prophecy made by a quietist seer'
      ],
      places: [
        'Austere wilderness monastery',
        'Quiet self-contained rural community',
        'Private cell for retreat in a luxurious urban home'
      ]
    },
    'Reformist Struggle': {
      text: 'The faith is being rocked by a conflict between reformers and traditionalists. The former usually seek to purify the faith through returning to earlier practices or expunging corruption from the church, and most have little respect for practical considerations or pragmatic limits. The traditionalists may be venal or corrupt, but may also have the support of secular powers that seek stability over a reformed but unreliable faith.',
      enemies: [
        { title: 'Murderously impractical reform leader' },
        { title: 'Corrupt hierarch of the old ways' },
        { title: 'Reasonable-sounding reformer with catastrophically bad ideas' }
      ],
      friends: [
        { title: 'Baffled clerical reformer who never meant for it to go this far' },
        { title: 'Veteran cleric struggling to cleanse corruption' },
        { title: 'Priestly diplomat trying to calm the situation' }
      ],
      complications: [
        'The reformists are actually full of terrible ideas that will inevitably bring ruin',
        'The faith has become corrupted due to an outside force rather than mere moral inertia',
        'A hostile rival group is supporting both sides to intensify the discord'
      ],
      things: [
        'Vast trove gathered by a venal pontiff',
        'Stash of weapons or blackmail gathered by reformers',
        'Holy relic conferring legitimacy on the owning sect'
      ],
      places: [
        'Angrily-strict reformist monastery',
        'Corrupt temple full of venal clerics',
        'Age-worn shrine full of pragmatic and worldly priests'
      ]
    },
    Remnant: {
      text: "The religion is only a remnant of a former faith, one far larger and more powerful than what little remains. The religion may have collapsed into schism, or been destroyed by secular powers, or had its believers absorbed by a more appealing creed. Many relics and abandoned shrines likely exist elsewhere, some of which may now be under the control of other faiths or hold relics of the religion's former heyday.",
      enemies: [
        { title: 'Bitter priest seeking to bloodily revive the past' },
        { title: "Rival power seeking to complete the faith's ruin", veteran: true },
        { title: "Scavenger lord picking at the weakened creed's wealth", veteran: true }
      ],
      friends: [
        { title: 'Determined preacher seeking revival' },
        { title: 'Latest pontiff of an age-old clerical line', veteran: true },
        { title: 'Harried local priest just trying to keep things going' }
      ],
      complications: [
        "The faith's heyday was so long ago it has almost been forgotten",
        'The faith only very recently collapsed into this ruin',
        'Another sect of the faith is still strong and active'
      ],
      things: [
        "Treasure lost in the faith's collapse",
        'Ancient relic from a now-lost temple',
        "Trophy that would revive the faith's fortunes"
      ],
      places: [
        'Ruined temple from a lost age',
        'Freshly-wrecked shrine from a chaotic fall',
        'Half-empty temple that was once full'
      ]
    },
    'Restricted Membership': {
      text: "Only certain types or classes of people are allowed to join the religion. It may be exclusive to a particular sex, ethnicity, profession, locality, caste, or bloodline. Some of these religions may allow associates, those who are not full members but who profit by their affiliation with the faith. The more narrow the allowed membership, the more substantial the faith's influence or resources must be if it is to survive.",
      enemies: [
        { title: 'Ruler who considers the faith their personal possession', veteran: true },
        { title: "Cleric who's more a society grandee than priest" },
        { title: 'Priest seeking to expel rivals as unfit for membership' }
      ],
      friends: [
        { title: 'Reformer seeking a broader range of members' },
        { title: "Proud upholder of the faith's best traditions" },
        { title: 'Pragmatic hierarch with a flexible view of qualifications', veteran: true }
      ],
      complications: [
        'The faith is restricted for a very pragmatic reason',
        'The faith makes up in social cachet or money what it lacks in numbers',
        'The faith is hardly a religion at all so much as an influence society'
      ],
      things: [
        'Proof a hierarch does not qualify to belong to the faith',
        "A sacred object characteristic of the faith's membership",
        'Evidence that a great saint was not of the right kind'
      ],
      places: [
        'Combination guild or community center and temple',
        'Well-guarded shrine sealed against outsiders',
        'Neighborhood exclusive to the membership'
      ]
    },
    'Rival Religion': {
      text: 'The creed is locked in a fierce struggle with another religion. Each faith might have its own sharply-delineated region of influence, or they might be intertwined in the same land, quarreling over the same believers and resources. This rivalry might be born of inimical deities or it might be a secular fight over control of the local aristocracy or the allegiance of the common masses. One faith might even be a successful splinter sect of the other.',
      enemies: [
        { title: 'Hierarch obsessed with victory at any cost', veteran: true },
        { title: 'Manipulator profiting by the struggle' },
        { title: 'Traitor in the service of the rival faith' }
      ],
      friends: [
        { title: 'Would-be peacemaker priest' },
        { title: 'Believer caught in the crossfire' },
        { title: 'Adherent secretly in love with a believer of the rival faith' }
      ],
      complications: [
        'A third party is profiting greatly from the struggle',
        'One faith is getting desperate and willing to go to extremes',
        'The rivalry is ancient and formalized'
      ],
      things: [
        'Literal or metaphorical weapon to ensure victory',
        'Deed to precious disputed property',
        'Right to oversee a ceremony of great social importance'
      ],
      places: [
        'Shrine heavily fortified against attack',
        'Institution poisonously divided between believers',
        'Bloody pogrom site of local minority faith'
      ]
    },
    Schisms: {
      text: 'The faith is racked by schism and division, with more than one new prophet or "true pontiff " leading significant numbers of believers. If the faith is aligned with local rulers, the secular powers are almost certainly backing the largest fragment in an attempt to restore stability, while a faith without aristocratic allies might be earning the anger of a government upset at the disruptions. Unlike a multicephalous church, none of the sects recognize any authority in the others.',
      enemies: [
        { title: 'Firebrand schismatic hierarch', veteran: true },
        { title: 'Brutal veteran victor of doctrinal wars', veteran: true },
        { title: 'Local ruler bent on bloodily crushing all the sects', veteran: true }
      ],
      friends: [
        { title: 'Idealistic well-intending sect leader', veteran: true },
        { title: 'Priest struggling to unify the sects' },
        {
          title: 'Local ruler desperately trying to stop the struggle without extreme measures',
          veteran: true
        }
      ],
      complications: [
        'The schism was born out of an abortive reform effort',
        'The schism is the fruit of a catastrophic failure of leadership',
        'The schism was born when the leadership became puppets of a hostile power'
      ],
      things: [
        'Holy relics of a destroyed sect',
        'Legitimating regalia from before the schism',
        'Sacred scripture proving one sect is correct'
      ],
      places: [
        'Burnt-out temple',
        'Makeshift shrine established by a new sect',
        'Monastery torn into multiple feuding groups'
      ]
    },
    Simony: {
      text: 'Significant positions within the religion are available for sale, either openly or through a tacit exchange of resources. As a consequence, major clerics are often wealthy believers who take open advantage of their positions to advance their personal interests. Some faiths might consider this simony perfectly moral and acceptable, while in others it is a sign of advanced corruption in the hierarchy. Simoniacal priests might have purely ceremonial roles, or they may have real power.',
      enemies: [
        { title: 'Oligarch-priest interested only in profit', veteran: true },
        { title: 'Prelate who can be bribed to bless anything', veteran: true },
        { title: 'Cleric determined to steal or take enough to advance' }
      ],
      friends: [
        { title: 'Frustrated outside reformer of the faith' },
        { title: 'Pragmatist seeking to use the money well' },
        { title: 'Rich hierarch quietly trying to reform from within', veteran: true }
      ],
      complications: [
        'The government extracts much of the simoniacal wealth from the faith',
        'Clerical titles are actually liquid fiat currency to be exchanged',
        'The faith pays merchants and others in clerical titles'
      ],
      things: [
        'Massive trove of donated wealth',
        'Token that grants the bearer a great title',
        'Masterwork offered by a great crafter for a title'
      ],
      places: [
        'Hidden vault of an arch-priest',
        'Auction house where titles are sold',
        "Oligarch's temple-villa"
      ]
    },
    'State Faith': {
      text: 'The religion is the official religion of a nation, one which all natives are expected to honor, even if they are not active believers. Any other faiths are expected to cede the foremost position to this creed, and any attempt to withhold worship to its god is considered tantamount to open treason. Reverence toward the god is considered identical with loyalty to the state, and its clerics are usually important government functionaries.',
      enemies: [
        { title: 'Local noble who despises other faiths' },
        { title: 'Traitorous priest-agent of a foreign power' },
        { title: 'Cynical official using belief only for secular ends' }
      ],
      friends: [
        { title: "Stubborn local who won't revere the god" },
        { title: 'Clueless foreigner who accidentally blasphemes severely', foreign: true },
        { title: "Priest determined to uphold the faith's spiritual doctrine" }
      ],
      complications: [
        'The faith is bifurcated into purely spiritual members and secular clerics who have all the worldly influence',
        'The faith is explicitly headed by the ruler',
        'Doctrines keep changing to suit secular needs'
      ],
      things: [
        'Ancient scripture from before its adoption as state faith',
        'Government-collected tithes',
        'Wealth entrusted to the faith for safeguarding'
      ],
      places: [
        'Glorious national temple',
        'Monastery that is more like a bureaucratic office',
        'Vast plaza for grand religious rites'
      ]
    },
    'Stratified Practice': {
      text: 'There is a very substantial difference in doctrine and worship between different levels of believers. Common folk might have colorful and emotionally-satisfying rituals for important life events or petitions for divine aid, while the clergy might prefer austere, intellectual exercises. The difference might instead be vertical rather than horizontal, with different traditions within the same faith having different goals in their worship.',
      enemies: [
        { title: 'Deviant using differences in practice to justify new dark ends' },
        { title: 'Reformer seeking to crush blasphemous practices' },
        { title: 'Zealot embracing a traditional and repugnant practice' }
      ],
      friends: [
        { title: 'Scholar studying the roots of various practices' },
        { title: 'Last practitioner of an ancient way' },
        { title: 'Revivalist seeking to bring back former customs' }
      ],
      complications: [
        'The practices are meant to keep social orders in their correct places',
        'Some practices are secret even from other believers',
        'Certain practices are outright forbidden to all but the great and noble'
      ],
      things: [
        'Valuable regalia required for certain elite practices',
        'Tome revealing that a low-class practice is most correct',
        'Gaudy but priceless idol fashioned by rich commoner believer'
      ],
      places: [
        'Worship site that looks nothing like another nearby worship site',
        'Restricted shrine for a particular group',
        'Forest clearing for a forbidden practice'
      ]
    },
    Syncretists: {
      text: 'The religion cheerfully absorbs other faiths and gods, either casting them as servitors of their deity or different aspects of their chosen divinity. They may assimilate other elements of doctrine or ritual in the process, or swallow whole priesthoods as sub-categories of their religious hierarchy. When faced with another religion, their immediate instinct is to explain how it is the same as their own rather than to reject it fundamentally.',
      enemies: [
        { title: 'Ruthless religious imperialist' },
        { title: 'Zealot of a rival faith determined to prove its uniqueness' },
        { title: 'Assimilated priest promoting a sinister synthesis' }
      ],
      friends: [
        { title: 'Avid scholar-monk seeking similarities' },
        { title: 'Assimilated priest seeking some doctrinal integrity' },
        { title: 'Secret practitioner of now-outmoded faith' }
      ],
      complications: [
        'The faith intentionally erases all troublesome history of assimilated faiths',
        'The faith has a very mercenary attitude toward all aspects it serves',
        'The faith is riven by numerous utterly incompatible doctrines'
      ],
      things: [
        'Lost holy idol of a forgotten faith',
        'Tome with a dark truth about a popular aspect',
        'Holy relic commandeered by the new faith'
      ],
      places: [
        'Temple with numerous new additions',
        'Converted shrine of an assimilated faith',
        'Open-air revival where the new doctrine is being taught'
      ]
    },
    'Underclass Faith': {
      text: 'The faith is a faith of the poor, oppressed, marginalized, and unimportant. While the god may not specifically be oriented toward the underclass, the great majority of believers are from socially inferior classes. Those of higher classes may be reluctant to associate with it, given its aura of disrepute. The faith itself might serve either to comfort and console the underclass, or it might be transforming into a weapon of revolt and change.',
      enemies: [
        { title: 'Bloodthirsty revolutionary priest' },
        { title: 'Noble who despises the faith' },
        { title: 'Cynical priest milking #possessive# poor flock' }
      ],
      friends: [
        { title: 'Earnest shepherd of the poor' },
        { title: 'Upper-class convert to the belief' },
        { title: 'Pragmatic cleric seeking practical improvements' }
      ],
      complications: [
        'The faith was designed as a synthetic tool to reinforce existing class structures',
        'Secret sympathizers exist among the elite',
        'The faith has real power via its influence on the masses'
      ],
      things: [
        'Tithe of some resource vital to poor believers',
        'Relic of a great champion of the poor',
        'Trove of some precious good produced by socially-disdained crafters'
      ],
      places: [
        'Tumbledown shrine in the slums',
        'Secret shrine in a wealthy household',
        'Hidden camp of pariah-zealots'
      ]
    },
    'Upstart Underclass': {
      text: 'The religion is an avenue of advancement for its underclass members. Its clergy and major benefactors have a high status in the society, and so those with wealth or talent but humble social origins are using it as a tool of social climbing. The religion itself is likely open to underclass membership in a way other social institutions are not, and many of its major clergy might be exceptionally talented or rich members of the local canaille.',
      enemies: [
        { title: 'Amoral social-climber prelate', veteran: true },
        { title: 'Noble hostile to its influence' },
        { title: 'Secret elite sponsor of priestly catspaws' }
      ],
      friends: [
        { title: 'Brilliant cleric from an outcast class' },
        { title: 'Broad-minded prelate of the faith' },
        { title: 'Low-class entrepreneur seeking advancement through contributions' }
      ],
      complications: [
        'A faction of the faith bitterly resents the low-class upstarts',
        'The low-class members have very different goals for the faith than the upper-class ones',
        'The permissibility of underclass leadership hinges on a single vulnerable doctrinal ruling'
      ],
      things: [
        "Rich new convert's huge donation",
        'Blackmail collected by an intimate servant who converted',
        'Token of legitimate possession of an important socio-religious position'
      ],
      places: [
        'New temple raised in a poor part of town',
        'Somewhat gaudy and nouveau-riche shrine of a lower-class priest',
        'Exclusive club with loud new members'
      ]
    },
    Venality: {
      text: "The hierarchy has been corrupted by money, influence, or material comfort. Clergy are now selected for their ability to fit in with the existing order, and clerics view their positions as opportunities for personal advancement. The religion's debased state may have been the case for so long that the believers expect nothing else, or it may be the result of recent enrichment or the gaining of great social power.",
      enemies: [
        { title: 'Venal hierarch without a trace of piety', veteran: true },
        { title: 'Theologian crusading to make the depravity doctrinally legitimate' },
        { title: 'Clerical oligarch with a heart of stone', veteran: true }
      ],
      friends: [
        { title: 'Secretly-scheming reformer' },
        { title: "Afflicted victim of a cleric's greed" },
        { title: 'Stubborn adherent to principled doctrine' }
      ],
      complications: [
        'The venality is hidden or discussion of it is harshly suppressed',
        'The venality exists and is self-reinforcing only in the upper leadership',
        "The secular leaders use the faith's avarice to control it"
      ],
      things: [
        "Rich prelate's fabulous wealth",
        'Exotic delight craved by hierarchy',
        "Undeniable proof of a high priest's corruption"
      ],
      places: [
        'Luxuriantly-appointed private clerical villa',
        'Factory or warehouse dedicated to clerical needs',
        'Village impoverished by clerical exactions'
      ]
    },
    'Vital Service': {
      text: "The religion performs a vital social service. It may be the only group capable of manufacturing a certain good, or performing a critical kind of labor, or maintaining a vital resource, or providing a necessary education. The religion's control of this service gives it much of its influence and power, and it will move sharply to counter any attempt to disrupt its monopoly. The ability to provide this service may be more important than piety in clerics.",
      enemies: [
        { title: 'Oligarch-priest seeking power over piety', veteran: true },
        { title: 'Avaricious noble in partnership with the faith' },
        { title: "Cold-blooded entrepreneur seeking to seize the faith's monopoly" }
      ],
      friends: [
        { title: 'Artisan-cleric of superlative skill' },
        { title: "Idealistic laborer in the church's specialty" },
        { title: "Commoner utterly dependent on the church's service" }
      ],
      complications: [
        'Providing this service exacts a brutal cost on those who serve due to environmental dangers or manufacturing processes',
        'This service is key to controlling large amounts of money or influence via secondary effects',
        'The faith is intimately entwined with relevant craft guilds'
      ],
      things: [
        'Secret handbook of the deepest lore of the service',
        'Lost tool vital to providing the service',
        'Vast trove earned by the service'
      ],
      places: [
        'Bustling manufactory of the service',
        'Market or distribution point for the service',
        'Temple adorned with symbols and signs of the service'
      ]
    }
  },
  subtype: ({ loc }) => {
    const { civilized } = window.world.regions[loc.region]
    return window.dice.spin(
      `${window.dice.weightedChoice([
        { w: 1, v: 'monotheism' },
        { w: 1, v: 'polytheism' },
        { w: 1, v: 'ancestor worship' },
        { w: 1, v: 'spirit worship' },
        { w: civilized ? 0.1 : 0, v: 'philosophy' }
      ])}`
    )
  }
}
