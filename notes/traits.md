// import { range } from 'd3'

// import { ACTOR } from '../../../npcs'
// import { TEXT } from '../../../utilities/text'
// import { PROVINCE } from '../../../provinces'
// import { HUB } from '.'
// import { Hub } from './types'

// const locations = {
//   urban: {
//     lower: [
//       {
//         label: 'tattered marketplace',
//         tooltip: 'crowded with vendors, shouts of bargains, mix of spices and leather'
//       },
//       {
//         label: 'dimly lit alleyway',
//         tooltip: 'narrow, puddles reflecting moonlight, occasional scurry of rats'
//       },
//       {
//         label: 'makeshift shanties',
//         tooltip: 'clusters of tarp and wood, smoky fires, close-knit families sharing meals'
//       },
//       {
//         label: 'abandoned warehouse',
//         tooltip: 'vast, echoing spaces, remnants of crates, shelter for the homeless'
//       },
//       {
//         label: 'stagnant canal',
//         tooltip: 'slow-moving water, littered banks, moss-draped boats tied up'
//       },
//       {
//         label: 'overcrowded tenement',
//         tooltip: 'tall, leaning buildings, lines of laundry, children playing in narrow spaces'
//       },
//       {
//         label: 'fading mural wall',
//         tooltip: "expansive, peeling paint, stories of the district's past and hopes"
//       },
//       {
//         label: 'street food corner',
//         tooltip: 'sizzling grills, sweet and spicy aromas, gathering spot for locals'
//       },
//       {
//         label: 'old bridge',
//         tooltip: 'stone arches, creek below, lovers and friends meeting secretly'
//       },
//       {
//         label: 'dilapidated dock',
//         tooltip: 'wooden planks creaking, fishermen repairing nets, salty air'
//       },
//       {
//         label: 'makeshift theater',
//         tooltip: 'curtains as stage, passionate performances, escape from daily struggle'
//       },
//       {
//         label: 'old cemetery',
//         tooltip: 'worn gravestones, tales of ancestors, serene and somber'
//       },
//       {
//         label: 'decrepit shrine',
//         tooltip: 'crumbling, forgotten by many, a haven for whispered secrets'
//       },
//       {
//         label: 'hidden brothel',
//         tooltip: 'dimly lit, heavy curtains, a place of desperate comfort'
//       },
//       {
//         label: 'secluded drug den',
//         tooltip: 'thick with smoke, hazy figures, escape from harsh reality'
//       },
//       {
//         label: 'underground fighting pit',
//         tooltip: 'sweat and blood, shouts of bets, raw display of strength'
//       },
//       {
//         label: 'forbidden market',
//         tooltip: 'contraband goods, wary eyes, transactions in hushed tones'
//       },
//       {
//         label: 'impoverished hospice',
//         tooltip: 'overcrowded, scent of herbs, caring hands amidst scarcity'
//       },
//       {
//         label: 'sewer passage',
//         tooltip: 'dank, dark labyrinth, abundant vermin, unseen paths'
//       },
//       {
//         label: 'sinister tavern',
//         tooltip: 'low murmurs, dangerous liaisons, a place where shadows dwell'
//       }
//     ],
//     middle: [
//       {
//         label: 'cozy tavern',
//         tooltip: 'hearty laughter, mugs clashing, a nightly retreat for many'
//       },
//       {
//         label: 'vibrant bazaar',
//         tooltip: 'colorful fabrics, spices piled high, a symphony of sales'
//       },
//       {
//         label: 'watchful guardpost',
//         tooltip: "uniformed guards, vigilant eyes, safety's promise"
//       },
//       {
//         label: 'historic monument',
//         tooltip: 'stone tribute, history carved, pride of the people'
//       },
//       {
//         label: 'slave market',
//         tooltip: 'chains clinking, lives in balance, a moral battleground'
//       },
//       {
//         label: 'lively wharf',
//         tooltip: 'ships docking, seagulls crying, gateway to the sea'
//       },
//       {
//         label: 'open plaza',
//         tooltip: 'fountain centerpiece, bustling gatherings, heart of the district'
//       },
//       {
//         label: 'community well',
//         tooltip: "clear water, social hub, life's essential resource"
//       },
//       {
//         label: 'local bakery',
//         tooltip: 'warmth of ovens, sweet and savory aromas, morning gathering spot'
//       },
//       {
//         label: 'community bathhouse',
//         tooltip: 'steam rising, relaxed conversations, a place of communal warmth'
//       },
//       {
//         label: 'cobblestone alley',
//         tooltip: 'lined with small shops, hidden treasures, quaint and curious'
//       },
//       {
//         label: 'neighborhood apothecary',
//         tooltip: 'rows of herbs, a mix of potions, trusted remedies'
//       },
//       {
//         label: 'well-stocked library',
//         tooltip: 'quiet, shelves of books, a haven for scholars'
//       },
//       {
//         label: 'revered temple',
//         tooltip: 'spiritual solace, candles flickering, sanctuary of faith'
//       },
//       {
//         label: 'busy blacksmithy',
//         tooltip: 'forge aglow, with the ring of hammer on anvil'
//       }
//     ],
//     upper: [
//       {
//         label: 'opulent mansion',
//         tooltip: 'grandiose architecture, gardens sprawling, symbol of wealth'
//       },
//       {
//         label: 'exclusive salon',
//         tooltip: 'intellectual debates, fine wines, elite gathering'
//       },
//       {
//         label: 'ornate opera house',
//         tooltip: 'velvet seats, crystal chandeliers, cultural pinnacle'
//       },
//       {
//         label: 'discreet sanitarium',
//         tooltip: 'tranquil haven, with attentive care'
//       },
//       {
//         label: 'elite fencing club',
//         tooltip: 'polished floors, with the clink of swords'
//       },
//       {
//         label: 'grand cathedral',
//         tooltip: 'golden altars, with solemn prayers'
//       },
//       {
//         label: 'government office',
//         tooltip: 'stately desks, with busy clerks'
//       },
//       {
//         label: 'guarded treasure house',
//         tooltip: 'vaulted doors, with gleaming riches'
//       },
//       {
//         label: "merchant's palace",
//         tooltip: 'opulent halls, with lavish feasts'
//       },
//       {
//         label: 'rich mausoleum',
//         tooltip: 'marble crypts, with silent vigils'
//       },
//       {
//         label: 'prestigious academy',
//         tooltip: 'halls of learning, with flickering candles'
//       },
//       {
//         label: 'splendid garden',
//         tooltip: 'fragrant blooms, with serene paths'
//       },
//       {
//         label: 'exquisite art gallery',
//         tooltip: "masterpieces displayed, silent admiration, culture's pride"
//       }
//     ]
//   },
//   rural: [
//     {
//       label: 'village square',
//       tooltip: 'open space, with a well and gatherings'
//     },
//     {
//       label: 'rustic mill',
//       tooltip: 'wooden structure, with a waterwheel and grain'
//     },
//     {
//       label: 'local tavern',
//       tooltip: 'welcoming spot, with ale and tales'
//     },
//     {
//       label: "farmer's market",
//       tooltip: 'outdoor stalls, with produce and crafts'
//     },
//     {
//       label: 'thatched cottage',
//       tooltip: 'cozy home, with a garden and fireplace'
//     },
//     {
//       label: 'village chapel',
//       tooltip: 'small church, with stained glass and pews'
//     },
//     {
//       label: "smithy's forge",
//       tooltip: 'hot workshop, with anvils and sparks'
//     },
//     {
//       label: 'village pond',
//       tooltip: 'tranquil water, with ducks and reeds'
//     },
//     {
//       label: 'wooden bridge',
//       tooltip: 'sturdy crossing, over a stream or ravine'
//     },
//     {
//       label: "herbalist's garden",
//       tooltip: 'fragrant plot, with medicinal plants'
//     },
//     {
//       label: 'village bakery',
//       tooltip: 'scented shop, with bread and pastries'
//     },
//     {
//       label: 'country inn',
//       tooltip: 'restful place, with rooms and meals'
//     },
//     {
//       label: 'old watchtower',
//       tooltip: 'tall lookout, with views and history'
//     },
//     {
//       label: 'community hall',
//       tooltip: 'large room, for meetings and feasts'
//     },
//     {
//       label: 'grain silo',
//       tooltip: 'storage tower, with crops and ladder'
//     },
//     {
//       label: 'livestock pen',
//       tooltip: 'enclosed area, with animals and hay'
//     },
//     {
//       label: 'village well',
//       tooltip: 'water source, with bucket and rope'
//     },
//     {
//       label: 'fenced orchard',
//       tooltip: 'tree-filled area, with fruit and shade'
//     },
//     {
//       label: 'winding path',
//       tooltip: 'dirt road, through fields and woods'
//     },
//     {
//       label: 'hidden glen',
//       tooltip: 'secluded spot, with flowers and quiet'
//     },
//     {
//       label: 'graveyard',
//       tooltip: 'final resting place, with headstones and silence'
//     }
//   ],
//   tribal: [
//     {
//       label: "chief's tent",
//       tooltip: 'large tent, with symbols and throne'
//     },
//     {
//       label: 'community fire',
//       tooltip: 'central firepit, with logs and gatherings'
//     },
//     {
//       label: "warrior's circle",
//       tooltip: 'training ground, with weapons and shields'
//     },
//     {
//       label: "shaman's hut",
//       tooltip: 'sacred space, with herbs and bones'
//     },
//     {
//       label: 'hunting grounds',
//       tooltip: 'lush area, with trails and game'
//     },
//     {
//       label: 'gathering spot',
//       tooltip: 'open area, with stories and dances'
//     },
//     {
//       label: "craftsman's area",
//       tooltip: 'workplace, with tools and creations'
//     },
//     {
//       label: 'storage tent',
//       tooltip: 'secured tent, with supplies and provisions'
//     },
//     {
//       label: 'healing tent',
//       tooltip: 'quiet tent, with remedies and care'
//     },
//     {
//       label: "elders' council",
//       tooltip: 'secluded area, with wisdom and decisions'
//     },
//     {
//       label: 'animal pens',
//       tooltip: 'fenced area, with livestock and noise'
//     },
//     {
//       label: 'fish drying racks',
//       tooltip: 'sunny spot, with nets and fish'
//     },
//     {
//       label: 'guest tent',
//       tooltip: 'welcoming tent, with mats and hospitality'
//     },
//     {
//       label: 'observatory point',
//       tooltip: 'high ground, with stars and visions'
//     },
//     {
//       label: 'water source',
//       tooltip: 'natural spring, with fresh and clean water'
//     },
//     {
//       label: 'food preparation area',
//       tooltip: 'communal kitchen, with fire and pots'
//     },
//     {
//       label: 'herb garden',
//       tooltip: 'cultivated plot, with healing plants'
//     },
//     {
//       label: 'artifact tent',
//       tooltip: 'protected tent, with relics and history'
//     },
//     {
//       label: 'ritual site',
//       tooltip: 'sacred ground, with altars and ceremonies'
//     },
//     {
//       label: 'burial mound',
//       tooltip: 'ancestral resting place, with earthen mounds and markers'
//     }
//   ]
// }

// export const hub__traits = (hub: Hub) => {
//   if (!hub.traits) {
//     const village = HUB.village(hub)
//     const province = window.world.provinces[hub.province]
//     const { civilized } = window.world.regions[province.region]
//     const mountains = province.environment.terrain === 'mountainous'
//     const marsh = province.environment.terrain === 'marsh'
//     const coastal = window.world.cells[province.hub.cell].beach
//     hub.traits = {
//       leadership: window.dice.spin(
//         window.dice.weightedChoice(
//           village && civilized
//             ? [
//                 { v: 'Hereditary headman', w: 1 },
//                 { v: 'Reeve picked by a lord', w: 1 },
//                 { v: 'Council of elders', w: 1 },
//                 { v: 'Temple representative', w: 1 },
//                 { v: 'Cruel and feared bully', w: 1 },
//                 { v: 'Popularly-chosen chief', w: 1 },
//                 { v: 'Dreaded sorcerer', w: 1 },
//                 { v: 'Pragmatic warlord', w: 1 },
//                 { v: 'The riches native there', w: 1 },
//                 { v: 'A matriarch or patriarch', w: 1 },
//                 { v: 'Traditional squire', w: 1 }
//               ]
//             : village && !civilized
//             ? [
//                 { v: `Bestially savage tyrant`, w: 1 },
//                 { v: `Wizened elder`, w: 1 },
//                 { v: `Magically-gifted chief`, w: 1 },
//                 { v: `Holy man or woman`, w: 1 },
//                 { v: `Hereditary chieftain`, w: 1 },
//                 { v: `Outsider or alien lord`, w: 0.1 },
//                 { v: `Brutal but cunning chief`, w: 1 },
//                 { v: `Foreigner turned ruler`, w: 1 },
//                 { v: `Council of elders`, w: 1 },
//                 { v: `No ruler past clan heads`, w: 1 },
//                 { v: `Envoy of a patron power`, w: 1 },
//                 { v: `Most charismatic native`, w: 1 }
//               ]
//             : [
//                 { v: 'Hereditary lord', w: 1 },
//                 { v: 'Merchant prince', w: 1 },
//                 { v: 'Council of oligarchs', w: 1 },
//                 { v: 'Allied noble heads', w: 1 },
//                 { v: 'Royal viceroy', w: 1 },
//                 { v: 'Gentry-elected mayor', w: 1 },
//                 { v: 'Major clerical figure', w: 1 },
//                 { v: 'Occult power wielder', w: 1 },
//                 { v: 'Criminal group catspaw', w: 1 },
//                 { v: 'Ethnic group’s ruler', w: 1 },
//                 { v: 'Military strongman', w: 1 },
//                 { v: 'Chief magistrate', w: 1 }
//               ]
//         )
//       ),
//       history: window.dice.choice(
//         village && civilized
//           ? [
//               `Once a garrison outpost of a nation`,
//               `A mine or quarry, perhaps now exhausted`,
//               `A spot where refugees of a calamity settled`,
//               `Holy ground or a temple to a particular faith`,
//               `A plant or animal grows very well here`,
//               `It's a safe way-post on a trade route`,
//               `Refuge for a despised minority or group`,
//               `A bandit camp that went legitimate`,
//               `It's a safe base for salvage or ruin plundering`,
//               `Decayed remnant of an ancient city`,
//               `It grew up around a lordly manor or estate`
//             ]
//           : village && !civilized
//           ? [
//               `It's an unusually well-fortified safe place`,
//               `A charismatic leader bound them together`,
//               `The hunting or resources are very good here`,
//               `They were driven here by a dire enemy`,
//               `Seers or shamans said it was ordained`,
//               `The leadership wants to find something here`,
//               `Their herds or prey have led them here`,
//               `They've been trapped here by the situation`,
//               `They're paralyzed by internal dissent`,
//               `They've been paid or induced to be here`,
//               `Tradition requires they come here`,
//               `Here they can do the most damage to a foe`
//             ]
//           : [
//               `It's the former seat of a vanished nation`,
//               `It's a trade nexus that has greatly prospered`,
//               `It's an industrial or productive center`,
//               `There is heavy resource extraction nearby`,
//               `It controls a vital defensive point`,
//               `It's built around an ancient enchantment`,
//               `It's a stronghold of a local subculture`,
//               `It's a sacred city to an important faith`,
//               `It's a shared market for many villages`,
//               `It's a place of great beauty or healthfulness`,
//               `It's a shelter from dangerous environs`
//             ]
//       ),
//       design: window.dice.spin(
//         window.dice.weightedChoice([
//           { v: 'Organic, sprawling, and mazy', w: 3 },
//           { v: 'Simplistic grid pattern', w: 2 },
//           { v: 'Concentric circles and ring roads', w: 1 },
//           { v: 'Strict segregation of districts', w: 1 },
//           { v: 'Neighborhoods with different patterns', w: village ? 0 : 1 },
//           { v: '{Symbolic|Ritually-significant} plans ({arcane|religious})', w: 1 },
//           { v: 'Ruling-class hub district with spokes', w: village ? 0 : 1 },
//           { v: 'Stilts and platforms over water', w: marsh ? 3 : 0 },
//           {
//             v: `Terraced ${coastal ? 'cliffside' : 'mountain'} dwellings`,
//             w: mountains || coastal ? 1 : 0
//           },
//           { v: 'Natural caverns and tunnels', w: mountains ? 1 : 0 }
//         ])
//       ),
//       locals: range(10).map(() => ACTOR.spawn({ province: province }).idx),
//       terrain: window.dice.spin(PROVINCE.terrain(province)),
//       places: TEXT.formatters.list(
//         (village
//           ? window.dice.sample(!civilized ? locations.tribal : locations.rural, 3)
//           : [
//               window.dice.choice(locations.urban.lower),
//               window.dice.choice(locations.urban.middle),
//               window.dice.choice(locations.urban.upper)
//             ]
//         ).map((loc, i) =>
//           TEXT.decorate({
//             label: i === 0 ? TEXT.capitalize(loc.label) : loc.label,
//             tooltip: loc.tooltip
//           })
//         ),
//         'and'
//       )
//     }
//   }
//   return hub.traits
// }
