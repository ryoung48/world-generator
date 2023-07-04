import { range } from 'd3'

import { npc__spawn } from '../../../npcs'
import { province__terrain } from '..'
import { hub__isTown, hub__isVillage } from '.'
import { Hub } from './types'

export const hub__traits = (hub: Hub) => {
  if (!hub.traits) {
    const village = hub__isVillage(hub)
    const province = window.world.provinces[hub.province]
    const { civilized } = window.world.regions[province.region]
    const mountains = province.environment.terrain === 'mountainous'
    const hills = province.environment.terrain === 'hills'
    const marsh = province.environment.terrain === 'marsh'
    const coastal = window.world.cells[province.hub.cell].beach
    const town = hub__isTown(hub)
    hub.traits = {
      leadership: window.dice.spin(
        window.dice.weightedChoice(
          village && civilized
            ? [
                { v: '{Hereditary|Elected} headman', w: 1 },
                { v: 'Appointed reave representing a distant lord', w: 1 },
                { v: 'Council of elders', w: 1 },
                { v: 'Traditional squire', w: 1 }
              ]
            : village && !civilized
            ? [
                { v: `{Hereditary|Elected} chieftain`, w: 1 },
                { v: `Council of the elders`, w: 1 },
                { v: `No ruler past clan heads`, w: 1 }
              ]
            : [
                { v: 'Hereditary lord', w: 1 },
                { v: 'Merchant prince', w: 1 },
                { v: 'Council of oligarchs', w: 1 },
                { v: 'Allied noble heads', w: 1 },
                { v: 'Gentry-elected mayor', w: 1 },
                { v: 'Major clerical figure', w: 1 },
                { v: 'Chief magistrate', w: 1 }
              ]
        )
      ),
      history: window.dice.choice(
        village && civilized
          ? [
              `Once a garrison outpost of a nation`,
              `A mine or quarry, perhaps now exhausted`,
              `A spot where refugees of a calamity settled`,
              `Holy ground or a temple to a particular faith`,
              `A plant or animal grows very well here`,
              `It's a safe way-post on a trade route`,
              `Refuge for a despised minority or group`,
              `A bandit camp that went legitimate`,
              `It's a safe base for salvage or ruin plundering`,
              `Decayed remnant of an ancient city`,
              `It grew up around a lordly manor or estate`
            ]
          : village && !civilized
          ? [
              `It's an unusually well-fortified safe place`,
              `A charismatic leader bound them together`,
              `The hunting or resources are very good here`,
              `They were driven here by a dire enemy`,
              `Seers or shamans said it was ordained`,
              `The leadership wants to find something here`,
              `Their herds or prey have led them here`,
              `They've been trapped here by the situation`,
              `They're paralyzed by internal dissent`,
              `They've been paid or induced to be here`,
              `Tradition requires they come here`,
              `Here they can do the most damage to a foe`
            ]
          : [
              `It's the former seat of a vanished nation`,
              `It's a trade nexus that has greatly prospered`,
              `It's an industrial or productive center`,
              `There is heavy resource extraction nearby`,
              `It controls a vital defensive point`,
              `It's built around an ancient enchantment`,
              `It's a stronghold of a local subculture`,
              `It's a sacred city to an important faith`,
              `It's a shared market for many villages`,
              `It's a place of great beauty or healthfulness`,
              `It's a shelter from dangerous environs`
            ]
      ),
      design: window.dice.spin(
        window.dice.weightedChoice([
          { v: 'Organic, sprawling, and mazy', w: 3 },
          { v: 'Simplistic grid pattern', w: 2 },
          { v: 'Concentric circles and ring roads', w: 1 },
          { v: 'Strict segregation of districts', w: 1 },
          { v: 'Neighborhoods with different patterns', w: village ? 0 : 1 },
          { v: '{Symbolic|Ritually-significant} plans ({arcane|religious})', w: 1 },
          { v: 'Ruling-class hub district with spokes', w: village ? 0 : 1 },
          { v: 'Stilts and platforms over water', w: marsh ? 3 : 0 },
          {
            v: `Terraced ${coastal ? 'cliffside' : hills ? 'hillside' : 'mountain'} dwellings`,
            w: mountains || hills || coastal ? 1 : 0
          },
          { v: 'Natural caverns and tunnels', w: mountains ? 1 : 0 }
        ])
      ),
      defenses: village
        ? window.dice.choice([
            'The village is fortified by a sturdy wooden palisade, which provides a basic level of defense.',
            'A lookout, positioned in the highest tree or structure, offers early warning of any incoming threats.',
            'The village is surrounded by a wide ditch, which can be quickly filled with water or fire to deter invaders.',
            'The village relies on a network of loud bells or drums to raise the alarm in case of an attack.',
            'The villagers, though not warriors, possess rudimentary knowledge of weapon use and basic defensive tactics.',
            'The village has no formal defenses but depends on the natural protective barriers of the surrounding harsh terrain.',
            'In times of danger, the villagers retreat into a network of caves or hidden locations nearby.',
            'Several fast horses are kept ready for messengers to seek help from neighboring allies in case of an attack.',
            'The village lacks defensive structures, but its remote location and small size make it an unattractive target for enemies.',
            'The village lacks physical defenses, but the residents maintain a pact with a local group of brigands for protection.',
            'The village is built with its back against a cliff, providing a natural defense on one side, but nothing more.',
            'Villagers have been taught basic signaling methods, like smoke signals, to call for aid from neighboring settlements.',
            "The village's only line of defense is a small group of local hunters proficient in using bows and traps.",
            'With no physical defenses in place, the village is extremely vulnerable to any form of attack.',
            'The village is dependent on the protection of a nearby lord, but response times can be slow.',
            'The village relies on camouflage, appearing as nothing more than a natural landscape to the untrained eye.',
            "There are no defenses to speak of; the villagers' only hope during an attack is to hide or flee.",
            'The village is positioned on a hill, offering a strategic advantage and a clear line of sight for miles around.',
            'A local militia, made up of villagers trained in combat, provides an ongoing defense.',
            'The main entrance to the village is a fortified gatehouse, capable of resisting siege weaponry.',
            'The village has a network of underground tunnels for escape and ambush during an attack.',
            'An alliance with a nearby powerful entity provides the village with military protection.',
            'Several large guard beasts are kept to deter invaders and alert villagers to potential threats.',
            'Strategic stockpiles of weapons and provisions are stored in secret locations throughout the village.',
            'Defensive spells and wards have been cast around the village by local magic practitioners.',
            'The village has practiced regular evacuation drills and has a well-planned route for evacuation in case of a siege.'
          ])
        : town
        ? window.dice.choice([
            'A thick stone wall, equipped with several guard towers and fortified gates, encircles the town.',
            'The town is divided into different sections by inner walls, so an invading force must breach multiple defenses.',
            'An organized town guard serves as the primary defense force, patrolling the streets and manning the walls.',
            "The town's main entry points are guarded by drawbridges, which can be raised in case of a threat.",
            "A series of catapults and trebuchets are stationed on the town's walls and towers to deter siege warfare.",
            'The town is surrounded by a moat filled with water, deterring direct attacks and undermining siege towers.',
            'The town employs skilled archers, who can rain down arrows on any force attempting to breach the town walls.',
            'A local mage guild provides magical protection in the form of defensive spells and enchantments.',
            'The town has a series of underground passages that can be used for counterattacks or for escape during a siege.',
            'The town has established alliances with neighboring settlements and can call upon their military aid in times of crisis.',
            'The town has a well-stocked armory, ensuring its defenders have access to a variety of weapons and armor.',
            'The local blacksmith has been commissioned to create reinforced gates and metal defensive structures.',
            'A local order of knights has pledged to defend the town, providing a formidable force in case of attack.',
            'The town has access to a network of watchtowers on the outskirts, giving them an early warning system.',
            'The town uses a sophisticated alarm system of bells and horns to alert the populace and summon the militia swiftly.',
            'Defensive trenches have been dug around the town, creating an additional line of defense beyond the walls.',
            'The town boasts a robust militia, consisting of trained townsfolk ready to take up arms in the face of danger.',
            "The town's only defensive structure is a makeshift wooden palisade, offering minimal protection against an assault.",
            "The town's strategic location atop a steep hill provides a natural defense, although it lacks fortifications.",
            'The town is dependent on the goodwill of a nearby mercenary band for its defense, but their loyalty is uncertain.',
            "The town's only line of defense is a rusty, barely functional gate at the entrance of the main road.",
            "Some of the town's streets have been intentionally designed to be narrow and winding to slow down invaders.",
            'The town is protected by a simple ditch that can be filled with sharp stakes or lit on fire in case of an attack.',
            'Despite its prosperity, the town is noticeably lacking in walls or any kind of permanent defensive structures.',
            'The town relies on its reputation as a holy place to dissuade potential aggressors, but lacks any physical defenses.'
          ])
        : window.dice.choice([
            'The city is encircled by a massive fortified wall, complete with a series of watchtowers for strategic defense.',
            "The city's entrances are guarded by grand gatehouses, capable of withstanding powerful siege weaponry.",
            'A well-equipped and highly disciplined city guard provides a strong line of defense.',
            'The city is divided into different districts by inner walls, so an invading force must breach multiple defenses.',
            'The city boasts several large fortresses within its limits, which can serve as strongholds in case of a siege.',
            'The city has a network of underground tunnels, allowing for swift movement of troops and evacuation of civilians.',
            'A number of skilled mages offer magical defenses, casting protective spells and wards around the city.',
            'The city maintains a standing army, equipped with advanced weaponry and heavy armor.',
            'Defensive ballistae and catapults are stationed along the city walls, ready to repel attackers.',
            'A wide, deep moat filled with water surrounds the city, deterring attackers and undermining siege engines.',
            'The city maintains diplomatic alliances with neighboring cities, ensuring swift aid in times of conflict.',
            'The city streets are designed as a complex maze to confuse invaders, hampering their advance.',
            'The city walls are crumbling and in disrepair, offering little protection against a determined assault.',
            'Each noble household in the city has its own private army, ready to defend their home and the city as a whole.',
            'The city has a network of secret tunnels and passages, allowing for covert operations and escape routes during a siege.',
            'The city has a well-stocked armory, ensuring its defenders have access to a variety of weapons and armor.',
            'The city has a network of watchtowers on the outskirts, giving them an early warning system.',
            'The city employs elite units of archers, their arrows able to reach enemies long before they reach the city walls.',
            "The city's main fortress is a relic of a bygone era, its structural integrity questionable under a serious siege.",
            'Strategic locations throughout the city contain vast stockpiles of supplies, ensuring preparedness for a long-term siege.',
            'The city is surrounded by a series of outposts that provide early warning and deterrence against invaders.',
            'The city has a well-established spy network, allowing it to gather information about potential threats in advance.'
          ]),
      commerce: window.dice.choice(
        village
          ? [
              'Local artisans and farmers provide common goods; travelers bring occasional rarities.',
              'Local markets offer abundant basics; exotic items are rare.',
              'Trade caravans diversify predominantly local village market supplies.',
              'The village trades local produce and crafts with neighboring settlements.',
              'Traveling peddlers occasionally bring uncommon goods at steep prices.',
              'The village is known for quality produce and livestock in bustling markets.',
              'Special goods are monopolized by elders and affluent families.',
              'Commerce is centered around agriculture; farmers barter their produce.',
              "Plentiful basic supplies exist due to village's self-sufficiency.",
              'Village trades famed handicrafts, attracting distant traders.',
              'Trading posts cater to essentials; artisans and merchants bring specialties.',
              'Trading fairs offer opportunities to acquire unique goods and services.',
              'Necessities are common; luxuries are procured from visiting city merchants.'
            ]
          : town
          ? [
              'Goods of all sorts, rare and common alike, abound in this bustling marketplace.',
              'Basic supplies can be procured readily from local taverns, inns, and shops.',
              'The city offers everyday items, while rare commodities remain elusive.',
              'This is a place where travelers find refuge and entertainment.',
              'The trading post caters to daily needs; rare items are a scarce luxury.',
              'It primarily exports fish and fruit, yet tourism remains the main revenue stream.',
              'All kinds of goods, legal or otherwise, are available due to a high influx of travelers.',
              'Common trades thrive; rare materials are often claimed by craft guilds.',
              'Exotic goods, carried from distant raids, are a thrilling find here.',
              'It enjoys trade ties with prominent foreign partners, adding to its commercial diversity.',
              'Abundant travelers ensure a steady supply of varied goods and services.',
              'Underground markets and rare auctions add an air of excitement to commerce.',
              'Basic needs are well catered to; however, the search for esoteric goods is a challenge.'
            ]
          : [
              'Abundant goods and services, rare items arrive from distant lands.',
              "Basic supplies overflow in city's taverns, inns, and marketplaces.",
              "City's bustling trade covers all necessities, scarce rarer commodities.",
              'City thrives on commerce with foreign trade partners.',
              'Trading posts and inns cater to basic needs efficiently.',
              'Rare goods are available in hidden markets and secret auctions.',
              'Guild-controlled imports limit availability of rare crafting materials.',
              'Wide range of products and services found in urban marketplaces.',
              "The city's vibrant nightlife draws income from tourism and entertainment.",
              "Artisanal products are a sought-after commodity in the city's markets.",
              "The city's commerce is a blend of local and imported goods.",
              "Foreign merchants bring diversity, enriching the city's commercial scene.",
              "City's bustling commerce ranges from everyday items to exotic treasures."
            ]
      ),
      locals: range(10).map(() => npc__spawn({ loc: province }).idx),
      terrain: window.dice.spin(province__terrain(province))
    }
  }
  return hub.traits
}
