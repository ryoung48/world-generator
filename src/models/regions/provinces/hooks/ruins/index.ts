import { cssColors } from '../../../../../components/theme/colors'
import { LANGUAGE } from '../../../../npcs/languages'
import { decorateText } from '../../../../utilities/text/decoration'
import { PROVINCE } from '../..'
import { Province } from '../../types'
import { Ruin } from './types'

export const ruin__spawn = (loc: Province): Ruin => {
  const { local } = PROVINCE.cultures(loc)
  const culture = window.world.cultures[local.culture]
  const ruin: Ruin = {
    idx: window.world.ruins.length,
    tag: 'ruin',
    name: LANGUAGE.word.unique({ lang: culture.language, key: 'court', len: 3 }),
    subtype: window.dice.choice([
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
      'outsider goods production site',
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
    ]),
    hostiles: window.dice.spin(
      decorateText({
        ...window.dice.choice([
          { label: 'alpha predator', tooltip: 'a powerful beast has made this site its lair' },
          {
            label: 'autonomous defenses',
            tooltip: 'relic {automatons|golems} guard the site against intruders'
          },
          {
            label: 'blighted raiders',
            tooltip: '{degenerate|cursed} blighted use this site as a base to ambush travelers'
          },
          {
            label: 'beast swarm',
            tooltip: '{swarms|packs} of dangerous beasts are known {lurk|hunt} here'
          },
          {
            label: 'corrupted spirit',
            tooltip:
              '{an enraged|a malign} wilderness {spirit|elemental|eidolon} protects this site'
          },
          {
            label: 'dark cult',
            tooltip: 'a cult of some {unacceptable|long-dead} god conducts dark rites here'
          },
          {
            label: 'deepfolk tribe',
            tooltip:
              '{raiders|cultists} from the depths have come to the surface to plunder the surrounding area'
          },
          {
            label: 'degenerate tribe',
            tooltip: 'cursed cannibals driven mad by hunger are known to lurk here'
          },
          {
            label: 'dueling explorers',
            tooltip: 'rival adventurers are also searching for loot at this site'
          },
          {
            label: 'eldritch cyst',
            tooltip: 'a portal to a dead world has opened here, spewing forth otherworldly horrors'
          },
          {
            label: 'exiled noble',
            tooltip: 'a deposed noble and their retinue plot their return to power'
          },
          {
            label: 'fungal colony',
            tooltip: 'a fungal hive-mind and its spore-children have taken root here'
          },
          {
            label: '{pelagic|merfolk} tribe',
            tooltip:
              'a tribe of aquatic {raiders|cultists} have come ashore to plunder the surrounding area'
          },
          {
            label: 'necromantic cult',
            tooltip: 'a necromancer and their undead servitors conduct dark experiments here'
          },
          {
            label: 'outlaw encampment',
            tooltip:
              '{bandits|highwaymen|raiders|slavers} use this site as a base to ambush travelers'
          },
          {
            label: 'rogue experiment',
            tooltip:
              'a {hulking|ravenous|petrifying} magic-forged {aberration|chimera|abomination} rampages through the site'
          },
          {
            label: 'shattered bindings',
            tooltip: 'a {summoned|imprisoned} creature has broken its fetters and now roams free'
          },
          {
            label: 'sorcerous lair',
            tooltip: 'sorcerer of detestable inclinations conducts dark experiments here'
          },
          {
            label: 'titanic beast',
            tooltip:
              'this site is the lair of some gargantuan creature that must be avoided at all costs'
          },
          {
            label: 'undead remnants',
            tooltip: 'undead {husks|wraiths} of former inhabitants still haunt this site'
          },
          {
            label: 'vampiric spawn',
            tooltip: 'this site is the lair for an ancient vampire lord and their undead minions '
          },
          {
            label: 'vicious flora',
            tooltip: 'animate and lethal plant life ensnare and devour intruder'
          }
        ]),
        color: cssColors.subtitle
      })
    ),
    hazards: window.dice.spin(
      window.dice.choice([
        'tripwire alarm or other alerts',
        'unstable floor that crumbles under weight',
        'dangerous fumes or miasma',
        'trapped containers or portals',
        'explosive dust or gases',
        'damaged supports that give way in combat',
        'dangerously high or deep water',
        'trap set on a path of travel',
        'device here is dangerously broken in use',
        'trap that seals intruders into an area',
        'treacherous footing over dangerous terrain',
        'uncontrolled flames or dangerous heat',
        'crushingly heavy object is going to tip over',
        'something here is cursed by dark powers',
        'seeming treasure is used as bait for a trap',
        'a contagious disease is on something here',
        'animated objects or automaton pieces',
        'crumbling floors, ceilings, or walls',
        'noxious or toxic pools, fungi, or flora',
        'dangerous climbing require to reach great {heights|depths}'
      ])
    ),
    enigmas: window.dice.choice([
      'magical fountain or pool',
      'enchanted statue or art object',
      'magically-animated room components',
      'altered or augmented gravity',
      'zone that empowers foes or magic types',
      'oracular object or far-scrying device',
      'temporal distortion or visions of other times',
      'zones of darkness or blinding light',
      'enchanted seals visibly locking up loot',
      'magical or elemental force emitting unit',
      "enchantment tailored to the site's original use",
      'unnatural heat or chill in an area',
      'magically-altered plant life here',
      "books or records from the site's owners",
      "unique furniture related to the site's past",
      'trophies or prizes taken by the owners',
      "portraits or tapestries related to the site's past",
      'ornate, imposing, but harmless doors',
      'daily life debris from the inhabitants',
      'worthless ancient personal effects',
      'odd-looking but normal household goods',
      'shrines or hedge ritual remains of inhabitants',
      'corpses of fallen intruders',
      'bones and other food remnants',
      'statuary or carvings related to the site',
      'signs of recent bloodshed and battle',
      'empty cabinets or containers',
      'a discharged or broken trap',
      'remnants of an inhabitant social event',
      'mouldering or ruined goods or supplies',
      'half-completed work done by inhabitants',
      'once-valuable but now-ruined object',
      'broken or expended once-magical object'
    ]),
    treasures: window.dice.choice([
      'stored in a visible chest or coffer',
      'hidden in a pool of liquid',
      'behind a stone in the wall',
      'underneath a floor tile',
      "hidden inside a creature's body",
      'inside an ordinary furniture drawer',
      'slid beneath a bed or other furnishing',
      'placed openly on a shelf for display',
      'hidden in a pile of other junk',
      'tucked into a secret furniture space',
      'slid behind a tapestry or painting',
      'heavy, protective locked chest or safe',
      'buried under heavy or dangerous debris',
      'in the pockets of clothes stored here',
      "the treasure's a creature's precious body part",
      'scattered carelessly on the floor',
      'tucked into a pillow or cushion',
      'hung on a statue or display frame',
      'hidden atop a ceiling beam',
      'resting atop a desk or table',
      'mixed with detritus or trash'
    ]),
    mood: window.dice.choice([
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
  }
  window.world.ruins.push(ruin)
  return ruin
}
