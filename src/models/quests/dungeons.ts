import { PLACE } from '../regions/places'
import { Hub } from '../regions/places/hub/types'
import { GPT } from '../utilities/ai'
import { Dungeon } from './types'

const dungeons: Record<number, Dungeon[]> = {}

const ruins = [
  'isolated rural estate of nobility',
  'townhouse of minor gentry',
  'massive tenement or slum tower',
  'rural grange with outbuildings',
  'compact fortified village',
  'hidden shelter against calamity',
  'mazey urban residential block',
  'rubble-wrought makeshift village',
  'ancient arcology or fragment of it',
  'outpost of refugees or recluses',
  'sprawling slum of shanties and huts',
  'inhabited natural feature or cave',
  'grand fortress of major significance',
  'hidden bunker or strongpoint',
  'remote frontier keep',
  'secret operations base',
  'isolated watchtower',
  'battered front-line fortress',
  'military training camp',
  'gatehouse controlling a vital pass',
  'half-subterranean entrenchments',
  'military cache or storehouse',
  'battlefield littered with fortifications',
  'fortified waystation',
  'illicit manufactory for illegal goods',
  'mine or open pit for excavation',
  'sacred shrine for holy product',
  'overgrown ancient plantation',
  'destroyed camp or extraction site',
  'managed woodland gone feral',
  'inexplicable ancient manufactory',
  'farm for now-feral valuable beasts',
  'Outsider goods production site',
  'repurposed ancient manufactory',
  'magical production facility',
  'fishery or salt extraction site',
  'lost pilgrimage destination',
  'fortified frontier monastery',
  'tomb of some mighty ancient',
  'prison-monastery for heretics',
  'shrine repurposed for a newer god',
  'fragment of megastructure temple',
  'inexplicable sacred structure',
  'place of some holy trial or test',
  'outsider fane to an alien god',
  'prison for a sealed demonic force',
  'pilgrim hospital or waystation',
  'holy archive or relic-fortress',
  'inscrutable outsider art structure',
  'library or ancient archive',
  "ancient culture's gathering site",
  'resort for nobles at ease',
  'monument complex to lost glories',
  'enormous musical structure',
  'abandoned school or study center',
  'massive ceremonial structure',
  'indoctrination camp or prison',
  'preserved “heritage” village-resort',
  'museum of a lost nation',
  'taboo site of dark magic',
  'psychic or tech communications site',
  'subterranean transit tunnels',
  'canal or aqueduct control center',
  'weather-control working ruin',
  'reality-stabilizing working ruin',
  'ancient road through an obstacle',
  'massive bridge or tunnel',
  'huge ancient dam',
  'ancient power production center',
  'outsider xenoforming engine',
  'semi-ruined teleportation node',
  'now-incomprehensible wreckage'
]

const hostiles = [
  'undead {husks|wraiths|abomination}',
  'vampiric spawn',
  '{eldritch|otherworldly} {warband|aberrations|abomination|scion}',
  'blighted {warband|abomination|chimera}',
  '{deepfolk|merfolk} {raiders|cultists}',
  '{enraged|corrupted} {spirit|elemental|eidolon}',
  'relic automatons',
  '{territorial|xenophobic} tribesman',
  'rival mercenaries',
  'bandit {highwaymen|raiders|slavers|marauders}',
  'dark cultists',
  '{vile|reclusive} {sorcerer|necromancer|occultist}',
  '{beast swarm|monstrous beast}',
  '{fungal colony|carnivorous flora}'
]

export const DUNGEON = {
  spawn: (hub: Hub) => {
    const province = PLACE.province(hub)
    if (!dungeons[province.idx]) {
      const themes = window.dice.sample(ruins, 3)
      const enemies = window.dice.sample(hostiles, 3)
      dungeons[province.idx] = themes.map((theme, i) => {
        return {
          theme: `ruined ${theme}`,
          hostiles: window.dice.spin(enemies[i])
        }
      })
    }
    return dungeons[province.idx]
  },
  details: async (dungeon: Dungeon) => {
    if (!dungeon.rooms) {
      const hazards = window.dice.sample(
        [
          { label: 'alarm trigger', tooltip: 'tripwire alarm or other alerts' },
          { label: 'unstable flooring', tooltip: 'unstable floor that crumbles under weight' },
          { label: 'toxic fumes', tooltip: 'dangerous fumes or miasma' },
          { label: 'trapped entry', tooltip: 'trapped containers or portals' },
          { label: 'explosive atmosphere', tooltip: 'explosive dust or gases' },
          { label: 'fragile supports', tooltip: 'damaged supports that give way in combat' },
          { label: 'perilous waters', tooltip: 'dangerously high or deep water' },
          { label: 'pathway trap', tooltip: 'trap set on a path of travel' },
          { label: 'broken device', tooltip: 'device here is dangerously broken in use' },
          { label: 'sealing trap', tooltip: 'trap that seals intruders into an area' },
          { label: 'spoiled supplies', tooltip: 'spores or filth ruins some foodstuffs' },
          { label: 'dangerous terrain', tooltip: 'treacherous footing over dangerous terrain' },
          { label: 'extreme heat', tooltip: 'uncontrolled flames or dangerous heat' },
          { label: 'tipping hazard', tooltip: 'crushingly heavy object is going to tip over' },
          { label: 'cursed object', tooltip: 'something here is cursed by dark powers' },
          { label: 'treacherous bait', tooltip: 'seeming treasure is used as bait for a trap' },
          { label: 'contagious disease', tooltip: 'a contagious disease is on something here' },
          { label: 'animated threat', tooltip: 'animated objects or automaton pieces' },
          { label: 'structural decay', tooltip: 'crumbling floors, ceilings, or walls' },
          { label: 'toxic pools', tooltip: 'noxious or toxic pools, fungi, or flora' },
          {
            label: 'climbing hazard',
            tooltip: 'dangerous climbing require to reach great {heights|depths}'
          }
        ],
        2
      )
      const enigmas = window.dice.sample(
        [
          { label: 'magical fountain', tooltip: 'magical fountain or pool' },
          { label: 'enchanted artifact', tooltip: 'enchanted statue or art object' },
          { label: 'magical furniture', tooltip: 'magically-animated room components' },
          { label: 'empowered zone', tooltip: 'zone that empowers foes or magic types' },
          { label: 'oracular device', tooltip: 'oracular object or far-scrying device' },
          { label: 'impaired vision', tooltip: 'zones of darkness or blinding light' },
          { label: 'locked treasure', tooltip: 'enchanted seals visibly locking up loot' },
          { label: 'unnatural climate', tooltip: 'unnatural heat or chill in an area' },
          { label: 'altered flora', tooltip: 'magically-altered plant life here' },
          { label: 'ancient records', tooltip: "books or records from the site's owners" },
          {
            label: 'historical furniture',
            tooltip: "unique furniture related to the site's past"
          },
          { label: "owner's trophies", tooltip: 'trophies or prizes taken by the owners' },
          {
            label: 'historical art',
            tooltip: "portraits or tapestries related to the site's past"
          },
          { label: 'imposing doors', tooltip: 'ornate, imposing, but harmless doors' },
          { label: 'inhabitant debris', tooltip: 'daily life debris from the inhabitants' },
          { label: 'ancient belongings', tooltip: 'worthless ancient personal effects' },
          { label: 'ordinary goods', tooltip: 'odd-looking but normal household goods' },
          {
            label: 'ritual remains',
            tooltip: 'shrines or hedge ritual remains of inhabitants'
          },
          { label: 'fallen intruders', tooltip: 'corpses of fallen intruders' },
          { label: 'food remnants', tooltip: 'bones and other food remnants' },
          { label: 'site carvings', tooltip: 'statuary or carvings related to the site' },
          { label: 'battle evidence', tooltip: 'signs of recent bloodshed and battle' },
          { label: 'empty storage', tooltip: 'empty cabinets or containers' },
          { label: 'disabled trap', tooltip: 'a discharged or broken trap' },
          { label: 'abandoned event', tooltip: 'remnants of an inhabitant social event' },
          { label: 'ruined supplies', tooltip: 'mouldering or ruined goods or supplies' },
          { label: 'incomplete work', tooltip: 'half-completed work done by inhabitants' },
          { label: 'ruined artifact', tooltip: 'once-valuable but now-ruined object' },
          {
            label: 'tormented victim ',
            tooltip: 'poor soul hideously tormented by the inhabitants'
          },
          { label: 'exhausted magic', tooltip: 'broken or expended once-magical object' }
        ],
        2
      )
      const mood = window.dice.choice([
        'bloody, the site of awful violence',
        'brilliant with lights or high windows',
        'cozy, with signs of recent occupation',
        'crackling with energy, motion, or sound',
        'crumbling, its contents falling apart',
        'dark, lamps and windows darkened',
        'defaced and spoilt by occupants',
        'graveyard, full of old yellowed death',
        'kept in unusually good condition',
        'lonely, desolate and unvisited',
        'patched, half-fixed by its occupants',
        'reeking with decay and corruption'
      ])
      const treasure = window.dice.sample(
        [
          'stored in a visible chest or coffer',
          'hidden in a pool of liquid',
          'behind a stone in the wall',
          'underneath a floor tile',
          'hidden inside a creature’s body',
          'inside an ordinary furniture drawer',
          'slid beneath a bed or other furnishing',
          'placed openly on a shelf for display',
          'hidden in a pile of other junk',
          'tucked into a secret furniture space',
          'slid behind a tapestry or painting',
          'heavy, protective locked chest or safe',
          'buried under heavy or dangerous debris',
          'in the pockets of clothes stored here',
          'the treasure’s a creature’s precious body part',
          'scattered carelessly on the floor',
          'tucked into a pillow or cushion',
          'hung on a statue or display frame',
          'hidden atop a ceiling beam',
          'resting atop a desk or table'
        ],
        2
      )
      const details = await GPT.chat<Dungeon>([
        ` write a detailed and intricate pre modern RPG dungeon crawl for the worlds without number setting with the following facts:

        * theme: ${dungeon.theme}
        * mood: ${mood}
        * hostiles: ${dungeon.hostiles}
        * hazards: ${hazards.map(h => h.tooltip).join(', ')}
        * enigmas: ${enigmas.map(e => e.tooltip).join(', ')}
        * treasure locations: ${treasure.join(', ')}
        
        do not mention any npc or location with a proper noun; encounters must make sense for a group of five adventurers; hazards and enigmas should be reskinned to fit the theme; use each hazard, engima, and treasure location above only once; each room should have at exactly two elements (hazard, engima, combat encounter, treasure location) besides the setting. hazards, engimas, and treasure locations listed above can only be used once. do not use ":" in the descriptions. output in the following format:
        \`\`\`json
        {
            "history": string; // should be 300 characters in length and should describe the history of the location and its inhabitants
            "rooms": {
                "setting": string; // 150 characters
                "combat encounter"?: string; // 150 characters
                "hazards"?: string; // 150 characters
                "treasure locations"?: string; // 150 characters
                "enigmas"?: string; // 150 characters
            }[] // 6 rooms; the final room must have a boss encounter
        }
        \`\`\`
        `
      ])
      if (details) {
        const [unpacked] = details
        dungeon.history = unpacked.history
        dungeon.rooms = unpacked.rooms
      }
    }
  }
}
