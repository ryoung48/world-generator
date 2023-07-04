import { range } from 'd3'

import { hub__isVillage } from '../../regions/provinces/hubs'
import { Province } from '../../regions/provinces/types'
import { trait__selection } from '../../utilities/traits'
import { ProvinceHooks } from './types'

const traits: ProvinceHooks = {
  'abandoned structures': {
    constraints: { urban: true },
    text: 'this settlement is home to a number of abandoned palaces and temples, which have been taken over by squatters and criminals'
  },
  'abandoned village': {
    text: 'a nearby village was abandoned long ago, and now lies in ruins'
  },
  'ancestral seat': {
    constraints: { urban: false },
    text: 'a noble from a distant land has recently arrived in this settlement, seeking help in reclaiming their ancestral {keep|estate} from a {bandit|cult|monster} infestation'
  },
  'ancient archives': {
    text: 'a nearby ruined {temple|keep|estate|city|crypt} is said to contain a vast collection of ancient texts and knowledge'
  },
  'ancient forge': {
    text: 'a blacksmith from a distant land seeks an escort to the nearby ruins; rumors speak of an ancient forge located within this ruin that could be used to craft legendary weapons and armor'
  },
  'ancient monument': {
    text: 'deep in the wilderness lies an ancient monument, which is said to be the resting place of a powerful {god|hero|demon}'
  },
  'artisan guilds': {
    conflicts: ['knightly order', 'merchant council'],
    constraints: { urban: true, tribal: false },
    text: 'the politics of this province are dominated by the various craft guilds, each vying for power and influence'
  },
  'artistic patrons': {
    constraints: { urban: true },
    text: 'this province is renowned for its art, music, and literature; it attracts scholars and artists from across the region'
  },
  'assassins guild': {
    constraints: { urban: true },
    text: `this settlement is home to a powerful assassins guild, which is involved in political intrigue and espionage`
  },
  'automaton guardians': {
    text: `the nearby ruins are guarded by a number of ancient automatons, which are still active and hostile to intruders`
  },
  'bad water': {
    constraints: { urban: false },
    text: `there are problems with the local water supply; {the water is {contaminated|poisoned|cursed} and is making people sick|old wells are running dry|the water is infested with dangerous vermin}`
  },
  'bandit camp': {
    text: `a group of bandits have taken up residence in a nearby {wilderness encampment|ruined fortification}, using it as a base of operations for their raids`
  },
  'black market': {
    constraints: { urban: true },
    text: 'this province has a thriving underground economy where illegal goods and services can be bought and sold'
  },
  'blood feud': {
    text: 'two powerful families are locked in a bitter vendetta; tensions are high as both families struggle for influence '
  },
  'buried ruins': {
    text: 'this settlement was built on top of old ruins; {these ruins were {built over accidentally|intentionally buried}|excavation of the ruins is currently in progress|monsters have been known to emerge from the ruins every so often}'
  },
  'canal streets': {
    constraints: { coastal: true, urban: true },
    text: 'this settlement is built on a network of canals, which are used for transportation and trade'
  },
  'caravan routes': {
    constraints: { urban: true },
    text: 'this settlement is a major stop on a caravan route; merchants and travelers from across the region pass through here and are often in need of escorts to their next destination'
  },
  'contested ruins': {
    text: `multiple factions of {bandits|cultists|undead|aberrations} fight for control of the nearby ruins; any expedition into the ruins will need to deal with them`
  },
  'contested shipwreck': {
    constraints: { coastal: true },
    text: `a shipwreck lies on the coast near this settlement, and is rumored to contain a vast treasure`
  },
  'corrupt officials': {
    constraints: { urban: true },
    text: `the local authorities are extremely corrupt; they are more interested in lining their own pockets than in serving the people`
  },
  'corrupted elemental': {
    constraints: { urban: false },
    text: 'a powerful elemental has been corrupted by dark magic, and is now a threat to the locals'
  },
  "coup d'etat": {
    text: 'a group of conspirators are plotting to overthrow the local leadership and seize control of this province'
  },
  'criminal syndicate': {
    constraints: { urban: true },
    text: `a powerful criminal syndicate has a tight grip on all illegal activity in this settlement; local law enforcement is either corrupt or powerless to stop them`
  },
  'crop failure': {
    constraints: { urban: false, tribal: false },
    text: `a {drought|flood|plague|insect infestation|magical blight} has caused the local crops to fail, and the locals are in desperate need of food`
  },
  'crop theft': {
    constraints: { urban: false, tribal: false },
    text: `a {group of bandits have|grasping noble has} recently stolen much of the village's food supply; the locals are desperate for help`
  },
  'crumbling ruins': {
    text: 'this settlement is home to a ruined {temple|keep|estate|city|crypt}, which is slowly falling apart and is in danger of collapsing'
  },
  'cryptic art': {
    text: 'a vast, ancient work of art is rumored to exist out in the nearby wilderness, but its meaning and purpose are unknown'
  },
  'crystalline horrors': {
    text: 'the nearby caves are filled with strange arcane crystals, which are known to transform any living creature that comes into contact with them into crystalline monstrosities'
  },
  'cursed artifact': {
    text: 'the locals have uncovered a powerful artifact, but it is cursed and has brought much misfortune; they are looking for a way to destroy it'
  },
  'cursed local': {
    text: `there are rumors of a shapeshifter or other cursed creature living among the locals, but no one knows who it is; recent events have caused the locals to become suspicious of each other`
  },
  'cyclical doom': {
    text: 'the ruins of a nearby {temple|keep|estate|city|crypt} are said to be extremely dangerous due to {fluxes of magical energy|swarms of quick-breeding dangerous vermin} that periodically sweep through the area'
  },
  'dangerous wildlife': {
    constraints: { urban: false },
    text: `this province is home to a dangerous and aggressive species of wildlife, which is a constant threat to the locals`
  },
  'dark cult': {
    text: 'this settlement is home to a cult that worships a dark and twisted deity, and is involved in human sacrifice and other depraved acts'
  },
  'defiled land': {
    conflicts: ['prosperous land'],
    text: 'the land around this province has been poisoned by an ancient curse, leaving it {barren and desolate|corrupted and savage}'
  },
  'degenerate cannibals': {
    text: 'the nearby ruins are home to a tribe of degenerate cannibals, who are rumored to be cursed and cannot leave the ruins'
  },
  'desecrated shrine': {
    text: `a local {shrine|temple} has been desecrated; the local authorities are still searching for the culprits`
  },
  'despotic lord': {
    conflicts: ['incompetent leaders', 'neglectful ruler'],
    text: 'this province is ruled with an iron fist, crushing any hint of resistance and demanding extravagant service from the locals'
  },
  'dire tombs': {
    text: 'the nearby ruins are said to be haunted by the restless spirits of the dead, who rise from their graves to terrorize the living'
  },
  'disappearing caravans': {
    constraints: { urban: true },
    text: `a number of caravans have recently gone missing near this settlement; the local authorities are offering a reward for information`
  },
  'distant gate': {
    text: 'the nearby ruins are said to contain a portal to another world, which is guarded by a powerful {demon|angel|elemental|fae|aberration}'
  },
  'distressed noble': {
    text: 'the {son|daughter|wife|husband} of a powerful noble has {been kidnapped and is being held for ransom|gone missing under mysterious circumstances|been cursed and is slowly dying|been possessed by a demon|been transformed into a monster}; the noble is offering a reward for anyone who can help'
  },
  'dueling explorers': {
    text: `nearby ruins have recently been unearthed and multiple groups of rival explorers are racing to claim the treasure within`
  },
  'dying forest': {
    conflicts: ['prosperous land'],
    text: 'the once-vibrant forest that surrounds this province is slowly dying, its trees and wildlife withering away under mysterious circumstances'
  },
  "elder's disappearance": {
    constraints: { urban: false },
    text: 'a revered elder has mysteriously disappeared; the locals seek assistance in the search'
  },
  'ethnic tensions': {
    constraints: { urban: true },
    text: 'tensions are rising between two rival ethnic groups and it seems like a violent conflict may be imminent'
  },
  'experimental lab': {
    text: 'the nearby ruined {temple|keep|estate} was once used by a {mad sorcerer|ancient artificer} to conduct vile experiments'
  },
  'feral magic': {
    text: 'the nearby ruins are said to be tainted by a decayed and twisted enchantment, which is mutating the local wildlife into savage monsters'
  },
  'flooded halls': {
    text: 'the nearby ruins are said to be flooded with {water|water|lava|poisonous liquids}, making exploration difficult'
  },
  'food shortage': {
    constraints: { urban: true },
    text: `this settlement is suffering from a severe food shortage; mobs of hungry commoners are rioting in the streets`
  },
  'forbidden faith': {
    text: `this settlement is home to a secret cult that worships a forbidden deity, and is constantly under threat of discovery and persecution`
  },
  'forced evictions': {
    constraints: { urban: true },
    text: `some of the locals are being forced out of their homes by a powerful {noble|merchant|official|criminal gang}`
  },
  'foreign spies': {
    constraints: { urban: true },
    text: `this settlement is rumored to have a number of active foreign spies, who are gathering information and plotting to undermine the local authorities`
  },
  'forgotten mines': {
    constraints: { tribal: false },
    text: `the nearby mines were abandoned long ago, but are rumored to contain rich veins of valuable ore; they are also rumored to be {haunted|infested with foul creatures}`
  },
  'fortress monastery': {
    constraints: { tribal: false, urban: false },
    text: 'this province is a remote fortress that houses a powerful monastic order dedicated to a particular {god|philosophy}'
  },
  'fungal garden': {
    conflicts: ['fungal infestation'],
    text: 'the locals of this province have developed a thriving industry growing exotic and unusual plants and fungi'
  },
  'fungal infestation': {
    conflicts: ['fungal garden', 'prosperous land'],
    constraints: { urban: false },
    text: 'a strange fungus has taken root in the buildings and tunnels of this province, causing sickness and madness among the locals'
  },
  'gang warfare': {
    constraints: { urban: true },
    text: 'this this province is plagued by constant fighting between rival criminal {gangs|cartels|syndicates}'
  },
  'ghost ship': {
    constraints: { coastal: true, tribal: false },
    text: `a ghost ship is said to haunt the nearby coast, with an undead crew that is always on the lookout for fresh victims`
  },
  'grand library': {
    conflicts: ['magical academy'],
    constraints: { tribal: false, urban: true },
    text: 'this province is home to a vast library containing ancient texts and knowledge, drawing scholars and seekers of arcane knowledge from far and wide'
  },
  'harsh occupation': {
    constraints: { warfare: true },
    text: 'this province is under the control of a foreign army that is imposing harsh and oppressive rule'
  },
  'haunted estate': {
    text: 'a large estate near this settlement is said to be haunted by the ghost of its former owner'
  },
  'hazardous district': {
    constraints: { urban: true },
    text: 'a section of this settlement has suffered from a great magical disaster, and is now a dangerous and unstable place'
  },
  'heretical beliefs': {
    conflicts: ['syncretic faith', 'remnant faith', 'reformist struggle'],
    text: 'this province is home to a heretical sect of a major religion that is disrupting old patterns of authority and worship'
  },
  'hivemind natives': {
    text: 'a {hiveminded insect swarm|fungus-infected colony organism|telepathic gestalt species|unified golem force} inhabits the nearby ruined {temple|keep|estate|city|crypt}'
  },
  'hostile terrain': {
    constraints: { urban: false },
    text: 'this province is surrounded by a harsh and inhospitable environment that makes travel to and from other provinces difficult'
  },
  'incompetent leaders': {
    conflicts: ['despotic lord', 'neglectful ruler'],
    text: 'the leaders of this province are incompetent and corrupt, and the locals are suffering as a result'
  },
  'invading army': {
    constraints: { warfare: true },
    text: 'there is an army in the area, and it has little inclination to be gentle with the locals'
  },
  'isolated academy': {
    constraints: { tribal: false },
    text: 'there is a school of {sorcerers|esoteric artists|hermit-scholars} in the area; it is largely self-sufficient and has little contact with the outside world'
  },
  'knightly order': {
    conflicts: ['mercenary companies', 'artisan guilds'],
    constraints: { tribal: false, urban: true },
    text: 'this province is home to a powerful order of knights that is dedicated to a particular {god|philosophy}'
  },
  'lawless chaos': {
    text: 'local authority has broken down entirely in this province with looters pillaging wealthier districts'
  },
  'lethal treasure': {
    text: 'the nearby ruins are said to be filled with {deadly traps and other dangers, but also rumored to contain vast riches|vast troves of cursed treasure}'
  },
  'limited access': {
    text: `the nearby ruins have been sealed off by powerful magic; the ruins can only be accessed {by those with the right keys|during a specific time of year}`
  },
  'living dungeon': {
    text: 'the nearby ruins are said to be alive ({infused with the spirit of some arcane mind|animated by an ancient construct that looks through countless sensors|made up of the tiny bodies of countless construction-organisms like some vast coral}), and are constantly shifting and changing'
  },
  'lost battlefield': {
    text: 'a great battle was fought in the nearby wilderness long ago; {{shades|spirits} of the fallen still haunt|ancient war automatons still patrol} the area'
  },
  'magical academy': {
    conflicts: ['grand library', 'sorcerous cabal'],
    constraints: { urban: true },
    text: 'this province is home to a prestigious magical academy that attracts students from across the region'
  },
  'malignant slums': {
    constraints: { urban: true },
    text: 'This settlement is home to a large slum district that is a hotbed of crime and disease'
  },
  'marriage alliance': {
    constraints: { tribal: true },
    text: 'the local chieftain is hiring guards to escort {his|her} {daughter|son} to a neighboring tribe for a politically arranged marriage'
  },
  'massacre site': {
    text: 'a terrible massacre took place recently; {the locals are still recovering from the shock|the local authorities are still searching for the culprits}'
  },
  'master artisan': {
    text: `this settlement is home to a master {alchemist|armorer|weaponsmith} who is renowned for their skill and craftsmanship; they are always on the lookout for rare and exotic materials`
  },
  'mercenary companies': {
    conflicts: ['knightly order'],
    constraints: { urban: true },
    text: 'this province is home to numerous mercenary companies that are often hired out to the highest bidder'
  },
  'merchant council': {
    conflicts: ['artisan guilds'],
    constraints: { urban: true },
    text: 'this province is governed by a council of wealthy merchant princes who are dedicated to the prosperity of the settlement'
  },
  'migration path': {
    text: 'this province is located along a major migration path for a dangerous species of wildlife; the locals avoid the area during the migration season'
  },
  'military outpost': {
    constraints: { tribal: false },
    text: 'this province is home to a remote military outpost with a {large|small} garrison of professional soldiers; the outpost is reliant on regular supply shipments from nearby settlements'
  },
  'missing hunters': {
    constraints: { urban: false },
    text: "a group of hunters went into the wilderness a couple days ago and hasn't returned; the locals are worried that some misfortune has befallen them"
  },
  'missionary zeal': {
    text: 'missionaries have recently arrived in the area and is attempting to convert the locals to their faith; authorities are concerned that this may lead to unrest'
  },
  'monster forge': {
    text: 'the nearby ruins are said to be an {ancient spawning pit for mutated beasts|ancient agricultural complex with feral livestock|open portal to a distant and hostile realm}'
  },
  'monstrous tribute': {
    constraints: { urban: false },
    text: 'the locals of this this province have cut a deal with some unspeakable entity ({spirit|undead|aberration|beast|primordial}) and make regular sacrifices in hopes of continued {forbearance|protection}'
  },
  'natural disaster': {
    text: 'a recent {flood|earthquake|landslide|volcanic eruption|tornado|drought} has devastated this province and the surrounding area'
  },
  'necromantic cult': {
    text: `this settlement is home to a vile cult that studies necromancy; they fuel a vibrant organ trade and are rumored to be lead by a powerful lich`
  },
  'neglectful ruler': {
    conflicts: ['incompetent leaders', 'despotic lord'],
    text: 'the ruler of this province has little interest in the affairs of the locals and is often absent'
  },
  'new industry': {
    constraints: { tribal: false },
    text: 'a new mining operation has recently been established in the area and is disrupting old patterns of authority'
  },
  'noble intrigue': {
    constraints: { urban: true },
    text: `a local noble household is in need of assistance with a task that requires great discretion; {a noble scion {is being accused of illegitimacy|is being led astray by a manipulative lover}|multiple noble heirs are vying for {control of the family fortune|the hand of a very eligible spouse}}`
  },
  'nomadic traders': {
    constraints: { tribal: false },
    text: 'this province is frequently visited by a nomadic {clans|tribes} ({native|diaspora}) seeking to exchange goods and services'
  },
  'old lighthouse': {
    constraints: { coastal: true, urban: true, tribal: false },
    text: `a lighthouse stands on a nearby hill, but it has long since fallen into disrepair; the locals avoid the area at night`
  },
  'opulent court': {
    constraints: { tribal: false },
    text: 'the local leadership of this province lives a life of luxury and extravagance, surrounded by sycophantic courtiers and lavish displays of wealth'
  },
  'oracle bones': {
    constraints: { tribal: true },
    text: 'the local shaman seeks rare bones for an important divination and requires assistance to retrieve them; the bones are said to be guarded by a powerful {spirit|undead|aberration|beast|primordial}'
  },
  'petrified garden': {
    text: 'a garden of {stone|crystal} statues stands in the nearby wilderness; this is the lair of a powerful creature that is capable of petrifying any intruders'
  },
  'pilgrimage site': {
    text: 'this province hosts a popular pilgrimage site ({religious|cultural|historic|ancient}) that draws visitors from all over the region'
  },
  'pirate haven': {
    constraints: { coastal: true },
    text: 'this province is a popular port of call for {pirates|slavers|raiders} who use it as a base of operations'
  },
  'pirate scourge': {
    constraints: { coastal: true, urban: true },
    text: `this settlement is plagued by pirates who prey on the local shipping lanes; the local authorities are unable or unwilling to stop them`
  },
  'plague outbreak': {
    text: 'a terrible contagion has broken out in this province and is spreading rapidly'
  },
  'plundered tribute': {
    constraints: { urban: false },
    text: `something has stolen {taxes due to the regional overlord|food supplies for a nearby military fortress|a sacred offerings a nearby {temple|monastery}}`
  },
  'poacher problems': {
    constraints: { urban: false },
    text: 'this province is plagued by poachers who hunt the local wildlife for profit'
  },
  'prophetic halls': {
    text: 'the walls of an ancient ruin are covered in prophetic writings that foretell of a great tragedy; the locals are seeking someone to help decipher them'
  },
  'prosperous land': {
    conflicts: ['defiled land', 'dying forest', 'fungal infestation'],
    text: 'neighboring powers view this province with envy as it is rich in natural resources'
  },
  'punishment post': {
    constraints: { tribal: false, urban: false },
    text: 'the leader of this province once held a much higher station, but was demoted to this post due to some past transgression'
  },
  'rare reagents': {
    text: `a rare {plant|creature|mineral} is found in the area that is highly sought after by {alchemists|sorcerers|artificers}`
  },
  'rebel stronghold': {
    text: 'this province is a stronghold of a rebel {army|faction} that is fighting against the regional overlord'
  },
  'recent brutality': {
    constraints: { warfare: true },
    text: 'this province has been ravaged by a recent conflict and the scars of battle are still visible throughout the settlement'
  },
  'reclusive hermit': {
    constraints: { urban: false },
    text: 'a hermit has taken up residence in the wilderness outside of this province, rumored to have {vast knowledge and power|malign interests and dark powers}'
  },
  'reformist struggle': {
    conflicts: ['remnant faith', 'heretical beliefs', 'syncretic faith'],
    constraints: { urban: true },
    text: 'this province is the center of a religious reformation that seeks {a return to earlier practices|to purge the corruption of the old system}'
  },
  'refugee camps': {
    text: 'a vast influx of refugees has recently rushed into this province and is straining the local infrastructure'
  },
  'remnant faith': {
    conflicts: ['reformist struggle', 'heretical beliefs', 'syncretic faith'],
    text: 'this province is home to the last worshipers of a dying religion, who are fiercely protective of their traditions and beliefs'
  },
  'remote monastery': {
    constraints: { tribal: false },
    text: 'there is a remote monastery in the area that is home to a group of {monks|ascetics}, who are {guarding a {sacred relic|imprisoned heretics}|part of a {rigorous|heretical} sect}'
  },
  'renegade sorcerer': {
    text: `there is a bounty on a renegade sorcerer who has been studying forbidden magic in the area`
  },
  'revanchist exile': {
    constraints: { urban: true },
    text: 'a powerful noble has been exiled from a neighboring region and is now plotting a return to power'
  },
  'ritual preparation': {
    text: 'the locals are preparing for a {wedding|funeral|festival|sacrifice} that is of great importance to the community'
  },
  "river's wrath": {
    constraints: { rivers: true, urban: false },
    text: 'the river that sustains this area has become cursed, and the locals must appease the angered river spirit'
  },
  'riverine escort': {
    constraints: { rivers: true, tribal: false },
    text: `a local river barge owner is hiring guards to protect their shipments from {bandits|monsters}`
  },
  'ruined castle': {
    constraints: { tribal: false, urban: false },
    text: 'this province is built around a ruined castle that is said to be haunted by the spirits of its former inhabitants'
  },
  'sacred grove': {
    text: 'this settlement is built around a sacred grove that is home to powerful nature spirits and is fiercely protected by the locals'
  },
  'sacred harvest': {
    constraints: { tribal: true },
    text: 'the tribe requires help in harvesting a sacred plant that only blooms once every several years; the plant has great religious significance to the tribe'
  },
  'sacred hunt': {
    constraints: { tribal: true },
    text: 'the tribe is preparing for a traditional hunt of a great beast, a ritual that binds the community and provides essential resources'
  },
  'sealed evil': {
    text: 'the nearby ruins are said to contain a great evil that was sealed away long ago, and now that seal is weakening'
  },
  'sectarian violence': {
    constraints: { tribal: false },
    text: 'multiple religious sects in this province are engaged in violent conflict, leading to widespread destruction and casualties'
  },
  'sinking city': {
    text: 'this settlement was built atop something unstable, and now that substrate is crumbling; locals living in affected areas are frantically trying to relocate'
  },
  'slave markets': {
    constraints: { urban: true },
    text: 'this province is a popular destination for slave traders, and the local economy is heavily dependent on the slave trade'
  },
  'slave uprising': {
    constraints: { tribal: false },
    text: 'the slaves of this province have risen up against their masters and are now fighting for their freedom'
  },
  'sleeping guardian': {
    constraints: { warfare: true },
    text: 'awaken a giant guardian in the ruins to protect this settlement from an invading army; the guardian is ancient and powerful, but also unpredictable'
  },
  'sorcerous cabal': {
    conflicts: ['magical academy'],
    constraints: { urban: true },
    text: 'a secretive cabal of sorcerers in this province is engaged in the study of forbidden and arcane knowledge, often at great risk to themselves and those around them'
  },
  "spirit's blessing": {
    constraints: { tribal: true },
    text: 'the local chieftain is preparing for a pilgrimage to gain the favor of ancient spirits; the tribe is seeking guards to protect the chieftain on their journey'
  },
  'stolen artifact': {
    text: `a powerful {artifact|relic|scroll} has been stolen from a nearby {temple|monastery|tomb|wizard's tower} and the locals are desperate to recover it`
  },
  'syncretic faith': {
    conflicts: ['reformist struggle', 'heretical beliefs', 'remnant faith'],
    text: 'a new religion has recently emerged in this province that combines elements of multiple faiths'
  },
  'taboo wardens': {
    text: `the nearby ruins are considered {sacred|cursed} by the locals; they forbid anyone from entering the ruins and will punish any who trespass`
  },
  'temple cults': {
    constraints: { urban: true },
    text: `there are numerous cults that are devoted to specific temples or shrines, and compete with each other for power and influence within the local religion`
  },
  'terrible beast': {
    text: `there is a bounty on a dangerous {beast|monster} that is terrorizing the locals`
  },
  'toxic economy': {
    constraints: { tribal: false },
    text: 'this province is reliant on a rare {industry|product} ({metallurgy|alchemy|arcana}) that is extremely valuable due to its use in the creation of powerful arcane {potions|enchantments|implements|artifacts|constructs}, but {{has harmful side-effects for|requires blood sacrifices from} those {handling|collecting} the raw materials | is slowly {destroying|polluting} the land with its extraction|extraction requires traversing extremely dangerous terrain}'
  },
  'toxic miasma': {
    text: `the nearby ruins are filled with {noxious fumes|arcane radiation|contagious diseases} that make any exploration extremely dangerous`
  },
  'tribal migration': {
    constraints: { tribal: true, urban: false },
    text: 'the tribe is preparing to migrate to a new location, and requires assistance navigating through dangerous territory'
  },
  'underground arena': {
    constraints: { urban: true },
    text: 'there is an underground arena in this settlement where locals compete in brutal combat for the entertainment of the masses'
  },
  'underground sewers': {
    constraints: { urban: true },
    text: 'there is a notorious network of underground sewers beneath this settlement that is home to a variety of dangerous creatures and shady denizens'
  },
  'unique product': {
    text: `this settlement produces {exquisite liquors|rare medicines|superb armaments|exotic spices|rare textiles} that cannot be found anywhere else and are highly sought after by the elite`
  },
  'vampiric clan': {
    text: `a clan of vampires has taken up residence in the area and is preying on the local populace`
  },
  'wanted outlaw': {
    text: 'a notorious outlaw is rumored to be hiding out in this settlement, and the local authorities are offering a reward for their capture'
  },
  'war conscripts': {
    constraints: { warfare: true },
    text: 'the locals are being pressed into military service to fight in a regional conflict'
  },
  'witch coven': {
    text: `this province is home to a coven of witches who are rumored to be engaged in dark rituals and practices`
  },
  'witch hunts': {
    constraints: { tribal: false },
    text: 'magic users are being hunted and executed due to a recent transgression'
  },
  'wizards lair': {
    text: 'there is a ruined tower in the nearby wilderness that once belonged to a {powerful wizard|reclusive archmage}; it is said to be filled with warped enchantments and dangerous magical experiments'
  },
  'xenophobic locals': {
    text: 'the locals of this province are distrustful and hostile towards outsiders, often resorting to violence to protect their territory and way of life'
  }
}

export const province__traits = (province: Province) => {
  if (province.hooks.length === 0) {
    const region = window.world.regions[province.region]
    const urban = !hub__isVillage(province.hub)
    const coastal = province.hub.coastal
    const tribal = !region.civilized
    const warfare = window.world.conflicts.some(conflict =>
      conflict.provinces.includes(province.idx)
    )
    const rivers =
      province.environment.terrain === 'marsh' ||
      province.environment.terrain === 'forest' ||
      province.environment.terrain === 'taiga' ||
      province.environment.terrain === 'jungle'
    const used = window.world.provinces.map(r => r.hooks.map(({ tag }) => tag)).flat()
    range(2).forEach(() => {
      const trait = trait__selection({
        available: traits,
        current: province.hooks.map(trait => trait.tag),
        used: used,
        constraints: { urban, warfare, coastal, rivers, tribal }
      })
      province.hooks.push(trait)
    })
  }
  return province.hooks
}
