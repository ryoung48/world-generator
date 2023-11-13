import { range } from 'd3'

import { ACTOR } from '../../../npcs'
import { PROVINCE } from '..'
import { HUB } from '.'
import { Hub } from './types'

export const hub__traits = (hub: Hub) => {
  if (!hub.traits) {
    const village = HUB.village(hub)
    const province = window.world.provinces[hub.province]
    const { civilized } = window.world.regions[province.region]
    const mountains = province.environment.terrain === 'mountainous'
    const marsh = province.environment.terrain === 'marsh'
    const coastal = window.world.cells[province.hub.cell].beach
    const town = HUB.town(hub)
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
            v: `Terraced ${coastal ? 'cliffside' : 'mountain'} dwellings`,
            w: mountains || coastal ? 1 : 0
          },
          { v: 'Natural caverns and tunnels', w: mountains ? 1 : 0 }
        ])
      ),
      defenses: village
        ? window.dice.choice([
            'Wooden palisade fortifies the village',
            'High lookout spots incoming threats',
            'Wide ditch surrounds village',
            'Bells or drums raise alarm',
            'Villagers knowledgeable in basic defense',
            'Harsh terrain provides natural protection',
            'Hidden caves serve as refuge',
            'Fast horses send distress messages',
            'Remote location deters potential attackers',
            'Local brigands provide pact protection',
            'Cliff backs village, offers defense',
            'Villagers trained in signaling methods',
            'Hunters provide basic defensive line',
            'No defenses, village highly vulnerable',
            "Nearby lord's protection unreliable",
            'Camouflage hides village from view',
            "Villagers' defense: hide or flee",
            'Hill position offers strategic advantage',
            'Local militia maintains ongoing defense',
            'Fortified gatehouse guards village entrance',
            'Underground tunnels facilitate escape, ambush',
            'Alliance provides military protection',
            'Guard beasts deter invaders',
            'Stockpiles stored in secret locations',
            'Local magic practitioners cast wards',
            'Evacuation route practiced regularly',
            'Village lacks proper defenses',
            'No guards, village defenseless',
            'Dependent on uncertain alliances',
            'Only defense: flee upon attack'
          ])
        : town
        ? window.dice.choice([
            'Thick walls with guard towers',
            'Inner walls divide town sections',
            'Organized guard patrols city streets',
            "Drawbridges guard town's entry points",
            'Catapults stationed on town walls',
            'Moat surrounds town, deters attacks',
            'Skilled archers man town defenses',
            'Mages provide magical protections',
            'Underground tunnels enable quick evacuation',
            'Alliances ensure aid in crisis',
            'Well-stocked armory supports defenders',
            'Local knights pledge defensive aid',
            'Outskirts watchtowers provide early warning',
            'Alarm system summons swift militia',
            'Trenches dug for extra defense',
            'Robust militia comprised of townsfolk',
            'Wooden palisade provides minimal defense',
            'Steep hill location offers protection',
            'Mercenary loyalty ensures questionable defense',
            'Rusty gate guards main entrance',
            'Narrow, winding streets slow invaders',
            'Simple defensive ditch encircles town',
            'Prosperous town noticeably lacks walls',
            'Holy reputation dissuades potential aggressors',
            'Town unprotected, no defenses present',
            'Town gate old, barely functional',
            'Town lacks proper fortifications',
            'Defense reliant on uncertain mercenaries',
            "Town's reputation offers only defense"
          ])
        : window.dice.choice([
            'Gigantic wall encircles entire city',
            'Gatehouses resist potent siege engines',
            'Disciplined city guard maintains defense',
            'Multiple inner walls divide districts',
            'Large fortresses provide stronghold option',
            'Underground tunnels enable quick evacuation',
            'Mages cast city-protecting spells',
            'Standing army boasts advanced weaponry',
            'Ballistae, catapults guard city walls',
            'Wide moat surrounds city boundaries',
            'Alliances ensure aid during conflict',
            'Maze-like streets confuse invaders',
            'Crumbling walls offer little defense',
            'Noble households maintain private armies',
            'Secret passages enable covert operations',
            'Well-stocked armory aids defenders',
            'Outlying watchtowers provide early warning',
            'Elite archers repel distant enemies',
            'Main fortress shows structural decay',
            'Stockpiles ensure long-term siege readiness',
            'Outposts surround city for deterrence',
            'Established spy network predicts threats',
            'City defenses visibly lacking maintenance',
            'Wall defenses weak, crumbling',
            'Citizenry untrained, defense capability low',
            'City exposed, devoid of walls',
            'Poorly equipped guards lack discipline',
            'Reliant on untrustworthy neighboring aid',
            'City is open, defenseless',
            'Outdated fortifications offer scant protection',
            'Inner walls divide town districts'
          ]),
      commerce: window.dice.choice(
        village
          ? [
              'Handicrafts abundant; luxuries occasionally brought',
              'Peddlers import rarities, at premium',
              'Local goods aplenty; exotics scarce',
              'Festive markets feature foreign oddities',
              'Barter system dominates local trade',
              'Rare imports cause communal excitement',
              'Famed for quality local produce',
              'Wealthy families monopolize unique goods',
              'Farmers, artisans form market backbone',
              'Artisans trade wares for provisions',
              'Essentials common; luxuries a rarity',
              'Specialty goods draw distant traders',
              'Self-sufficient; outside trade minimal',
              'Traveling merchants bring coveted items',
              'Craftsmanship valued over imported wares',
              'Trade fairs teem with novelties',
              'Village renowned for unique handicrafts',
              'Seasonal goods fluctuate market dynamics',
              'Predominantly local; caravans bring diversity',
              'Visiting traders liven up markets',
              'Elders control access to luxuries',
              "Traders' arrival stirs village excitement",
              'Rare goods garner significant interest',
              'Crafts and produce fuel commerce',
              'Local produce exchanged for necessities',
              'Exotic goods rare yet desired',
              'Local markets, regional impact',
              'Commerce thrives during harvest season',
              'Peddlers bring world to doorstep',
              'Common goods aplenty, luxuries prized'
            ]
          : town
          ? [
              'Marketplace bustles with varied goods',
              'Taverns supply daily essentials readily',
              'Common items plentiful; rarities elusive',
              'Travelers find solace and merriment',
              'Trading post offers essential supplies',
              'Thriving trade, some less legal',
              'Craft guilds claim rare materials',
              'Distant raids yield exotic goods',
              'Foreign partners diversify local trade',
              'Travelers ensure diverse supply',
              'Underground markets, thrilling auctions',
              'Bustling bazaars boast diverse wares',
              'Essential goods readily accessible',
              'Rare imports spark market excitement',
              'Exotic finds energize local trade',
              "Travelers' goods enrich marketplace variety",
              'Goods aplenty, mysteries for many',
              'All needs met, luxuries scarce',
              'Diverse trade partners, diverse goods',
              'Exotic goods bring thrill-seekers',
              'Guilds control specialized trade',
              'Thriving commerce, some underhand',
              'Trade diversity attracts adventurers',
              'Everyday needs met, rarities elusive',
              'Vibrant marketplace, variety abounds',
              'Daily wares plentiful, luxuries coveted'
            ]
          : [
              'Abundance in goods, rarities imported',
              'Taverns overflow with basic supplies',
              'Bustling trade, scarce rare commodities',
              'City thrives on foreign commerce',
              'Trading posts cater basic needs',
              'Hidden markets offer rare goods',
              'Guilds limit rare imports availability',
              'Urban marketplaces teem with variety',
              'Vibrant nightlife fuels city income',
              'Artisanal products sought in markets',
              'Commerce blend of local, imported',
              'Foreign merchants enrich trade diversity',
              'City offers common to exotic',
              'Trade posts, inns ensure essentials',
              'Rare goods at secret auctions',
              'Guilds control rare materials trade',
              'Markets brimming with varied offerings',
              'Tourism, entertainment draw significant income',
              "Artisan products: market's prized commodity",
              'Commerce: local and foreign blend',
              'Foreign traders diversify commercial scene',
              'Commerce varies from mundane to exotic',
              'City thrives on diverse commerce',
              "Inns, posts: essentials' supply hubs",
              'Guilds manage exotic import flow',
              'Urban markets offer product variety',
              "Nightlife stimulates city's economy",
              "Artisanal wares, market's top attraction",
              'Commercial blend of global goods',
              'Foreign influence diversifies city commerce'
            ]
      ),
      locals: range(10).map(() => ACTOR.spawn({ loc: province }).idx),
      terrain: window.dice.spin(PROVINCE.terrain(province))
    }
  }
  return hub.traits
}
