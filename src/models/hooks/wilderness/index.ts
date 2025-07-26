import { cssColors } from "../../../components/theme/colors"
import { Province } from "../../provinces/types"
import { TEXT } from "../../utilities/text"

const arctic = {
  moods: [
    'bloody, the site of awful violence',
    'shimmering, with auroras and ice crystals',
    'sheltered, with hints of animal burrows',
    'echoing, wind howls, cracking ice',
    'obscured, blizzards dim view',
    'scarred by herds, hunters',
    'permafrost graves, frozen relics',
    'impeccably cold, untouched',
    'expansive, unseen wasteland',
    'primordial, mysterious and ancient',
    'wind-battered, endless howling gusts'
  ],
  locations: [
    { label: 'isolated ice cavern', tooltip: 'walls shimmering with blue hues' },
    { label: 'nomadic campsite', tooltip: 'yurts circled around a central fire' },
    { label: 'frozen waterfall', tooltip: 'a once-rushing torrent now still' },
    { label: 'vast snowfield', tooltip: 'marked by mysterious ancient stones' },
    { label: 'hidden hot spring', tooltip: 'steam rising amidst the cold expanse' },
    { label: 'abandoned research outpost', tooltip: 'equipment still inside' },
    { label: 'glacier crevice', tooltip: 'hiding deep secrets beneath its surface' },
    { label: 'lone hunting cabin', tooltip: 'smoke curling from the chimney' },
    { label: 'ancient burial ground', tooltip: 'marked with weathered totems' },
    { label: 'icy cliff overlook', tooltip: 'offering views of distant horizons' },
    { label: 'windswept ridge', tooltip: 'where the northern lights dance' },
    { label: 'tumbled ruins', tooltip: 'remnants of a forgotten civilization' },
    { label: 'permafrost bog', tooltip: 'dotted with petrified tree stumps' },
    { label: 'vast icy lake', tooltip: 'surface reflecting the endless sky' },
    { label: 'desolate valley', tooltip: 'echoing with the howl of distant wolves' }
  ]
}

const templates = {
  mountainous: {
    moods: [
      'gleaming with snow or high-altitude glow',
      'sheltered, signs of recent campfires',
      'eroding, slopes and paths crumbling',
      'marred by mining or deforestation',
      'ancient, with forgotten stone monuments',
      'maintained, with well-trodden paths',
      'isolated, untouched, seldom scaled',
      'tainted by rot and abandoned camps',
      'scorched, signs of past eruptions',
      'verdant, lush high-altitude bloom',
      'mist-wrapped, clouds cloak the peaks',
      'jagged, peaks slicing the horizon',
      'wind-battered, endless howling gusts',
      'sacred, shrines at summit revered',
      'bloody, the site of awful violence'
    ],
    locations: [
      { label: 'secluded alpine cabin', tooltip: 'surrounded by tall pines and fresh snow' },
      { label: 'cliffside monastery', tooltip: 'accessible only by winding stone steps' },
      { label: 'hidden waterfall', tooltip: 'cascading into a crystal-clear mountain pool' },
      { label: 'ancient stone ruins', tooltip: 'overtaken by moss and mountain flora' },
      { label: 'high-altitude meadow', tooltip: 'dotted with colorful wildflowers' },
      { label: 'hot spring pool', tooltip: 'nestled between snow-capped peaks' },
      { label: 'cavern entrance', tooltip: 'guarded by age-old stalactites and stalagmites' },
      { label: 'mountain pass campsite', tooltip: 'with panoramic views of distant valleys' },
      { label: "abandoned miner's hut", tooltip: 'evidence of a forgotten gold rush' },
      { label: 'rope bridge', tooltip: 'stretching precariously over a deep mountain gorge' },
      { label: 'crumbling watchtower', tooltip: 'remnants of a society long forgotten' },
      { label: 'echoing mountain cave', tooltip: 'where whispers carry tales of old' },
      { label: 'secluded glacier lake', tooltip: 'mirroring the azure sky and lofty peaks' },
      { label: 'impressive stone arch', tooltip: 'carved naturally by time and the elements' },
      { label: 'sunlit grove', tooltip: 'where ancient trees dance with the mountain breeze' },
      { label: 'cliff-hanging nest', tooltip: 'home to rare and majestic birds of prey' },
      { label: 'mountain shrine', tooltip: 'adorned with colorful prayer flags fluttering' },
      { label: 'winding mountain path', tooltip: 'leading through the rocky slopes' },
      { label: 'rock-strewn riverbed', tooltip: 'where meltwater rushes towards the valleys' },
      { label: 'frosty ledge', tooltip: 'offering breathtaking views of the world below' }
    ]
  },
  forest: {
    moods: [
      'radiant, sunlight through tall canopies',
      'nestled, signs of creature dwellings',
      'alive with rustling leaves and chirps',
      'withering, decaying flora all around',
      'enshrouded, dense foliage hides sun',
      'scarred by woodcutters or fires',
      'ancient grove of long-dead trees',
      'impeccably verdant, untouched blight',
      'secluded, rarely tread by man',
      'interlaced by forest guardian paths',
      'scented of moss, damp, and aged bark',
      'spider-webbed, catching morning dew'
    ],
    locations: [
      { label: 'moss-covered clearing', tooltip: 'bathed in dappled sunlight' },
      { label: 'ancient oak tree', tooltip: 'with roots stretching wide and deep' },
      { label: 'babbling brook', tooltip: 'weaving through ferns and stones' },
      { label: 'hidden grove', tooltip: 'where fireflies dance at twilight' },
      { label: 'old wooden cabin', tooltip: 'overgrown with ivy and mystery' },
      { label: 'mysterious stone circle', tooltip: 'whispering tales of old' },
      { label: 'secluded pond', tooltip: 'reflecting the canopy and sky above' },
      { label: 'winding forest path', tooltip: 'carpeted with fallen leaves' },
      { label: 'abandoned campsite', tooltip: 'evidence of stories left untold' },
      { label: 'deep forest glade', tooltip: 'where deer come to graze' },
      { label: 'towering waterfall', tooltip: 'cascading into a serene pool' },
      { label: 'hollowed-out tree trunk', tooltip: 'home to creatures of the night' },
      { label: 'dense thicket', tooltip: 'where shadows play tricks on the eyes' },
      { label: 'overgrown ruins', tooltip: 'remnants of a forgotten dwelling' },
      { label: 'patch of wildflowers', tooltip: 'painting the ground with color' },
      { label: 'twisted tree', tooltip: 'shaped by time and the elements' },
      { label: 'fern-covered grotto', tooltip: 'hidden behind a curtain of vines' },
      { label: 'mossy boulder field', tooltip: 'where critters scurry and hide' },
      { label: 'wooden bridge', tooltip: 'arching gracefully over a babbling creek' }
    ]
  },
  plains: {
    moods: [
      'bloody, the site of awful violence',
      'dazzling with sunlight or starlit skies',
      'settled, traces of nomadic tribes',
      "humming with nature's distant songs",
      'eroding, landmarks wearing away',
      'parched, desolate and barren',
      'trampled by herds or travelers',
      'ancient mounds with burial sites',
      'vast, endless and rarely tread',
      'lush, meadows blooming with vibrant colors',
      'wind-battered, endless howling gusts'
    ],
    locations: [
      { label: 'vast sea of golden grass', tooltip: 'swaying with the wind' },
      { label: 'solitary ancient tree', tooltip: 'offering shade in the expanse' },
      { label: 'hidden watering hole', tooltip: 'teeming with wildlife at dusk' },
      { label: "abandoned shepherd's hut", tooltip: 'weathered by time and elements' },
      { label: 'circle of standing stones', tooltip: 'holding secrets of ages past' },
      { label: 'wildflower meadow', tooltip: 'bursting with colors and life' },
      { label: 'gentle rolling hills', tooltip: 'offering panoramic views of the horizon' },
      { label: 'whispering reed bed', tooltip: 'bordering a tranquil pond' },
      { label: 'nomadic campsite', tooltip: 'with tents and campfires under the stars' },
      { label: 'sunlit plateau', tooltip: 'overlooking vast stretches of the plains' },
      { label: 'ancient burial mound', tooltip: 'a testament to civilizations long gone' },
      { label: 'carved rock formations', tooltip: 'shaped by wind and time' },
      { label: 'rusted remains of a wagon', tooltip: 'a relic from bygone journeys' },
      { label: 'lone tree', tooltip: 'branches twisted, rumored to be haunted' }
    ]
  },
  desert: {
    moods: [
      'bloody, the site of awful violence',
      'radiant, lit by sun or moonlit dunes',
      'sheltered, hints of recent caravan rests',
      'eroding, shifting dunes and forms',
      'veiled, sandstorms on the horizon',
      'wind-battered, endless howling gusts',
      'ancient tombs, remnants of past eras',
      'pristine, barren, untouched by time',
      'vast, endless seldom-tread expanse',
      'parched, scent of sun-baked earth'
    ],
    locations: [
      { label: 'sun-bleached skeleton', tooltip: 'of a forgotten creature' },
      { label: 'shifting dunes', tooltip: "ever-changing with the wind's whim" },
      { label: 'hidden oasis', tooltip: 'a lush haven amid the barren expanse' },
      { label: 'ancient ruins', tooltip: 'half-buried by sand and time' },
      { label: 'cavern entrance', tooltip: 'leading to cool, darkened depths below' },
      { label: 'nomadic market', tooltip: 'bustling with traders and colorful tents' },
      { label: 'cracked salt flats', tooltip: 'glistening under the harsh sun' },
      { label: 'mysterious rock formations', tooltip: 'sculpted by erosion and wind' },
      { label: 'dried riverbed', tooltip: 'hinting at water that once flowed' },
      { label: 'shadowed alcove', tooltip: 'offering refuge from the midday heat' },
      { label: 'sunken city', tooltip: 'its spires just peeking above the sands' },
      { label: 'isolated cactus grove', tooltip: 'home to vibrant desert blooms' },
      { label: 'remnants of a lost caravan', tooltip: 'scattered belongings in the sand' },
      { label: 'volcanic crater', tooltip: "evidence of the desert's fiery past" }
    ]
  },
  marsh: {
    moods: [
      'bloody, the site of awful violence',
      "luminous with fireflies, swamp's soft glow",
      "nestled, creatures' nesting signs",
      'humming with life, distant croaks',
      'fog-shrouded, mist veils',
      'surprisingly clear, fresh water, lush flora',
      'isolated, seldom traversed',
      'suffused with rot, stagnant stench',
      'eerily calm, unsettling stillness',
      'creature-stirred, life beneath surface',
      'moss-draped, ancient trees veiled',
      'waterlogged, perpetually damp'
    ],
    locations: [
      { label: 'fog-shrouded grove', tooltip: 'where twisted trees whisper secrets' },
      { label: 'moss-covered ruins', tooltip: 'remnants of a long-forgotten village' },
      { label: 'murky lagoon', tooltip: 'home to creatures lurking just below' },
      { label: 'patchwork of islands', tooltip: 'linked by fragile wooden bridges' },
      { label: 'ancient tree hollow', tooltip: 'large enough to shelter wanderers' },
      { label: 'abandoned hut', tooltip: 'its thatched roof barely holding up' },
      { label: 'a dense thicket', tooltip: 'where fireflies dance at dusk' },
      { label: 'sunken graveyard', tooltip: 'its stones jutting out from the mire' },
      { label: 'hidden cave entrance', tooltip: 'tucked behind cascading vines' },
      { label: 'bubbling mud pools', tooltip: 'their depths holding heated secrets' },
      { label: 'floating market', tooltip: 'where locals trade on rickety boats' },
      { label: 'eerie clearing', tooltip: 'where the ground is oddly dry and firm' },
      { label: 'ancient stone circle', tooltip: 'moss-grown and shrouded in mist' },
      { label: 'decrepit dock', tooltip: 'its planks rotting and creaking' },
      { label: "old witch's hut", tooltip: 'made of twisted roots and shadowed corners' },
      { label: 'overgrown statue', tooltip: 'nature reclaiming a lost tribute' }
    ]
  },
  jungle: {
    moods: [
      'bloody, the site of awful violence',
      'radiant, sunbeams piercing the canopy',
      'sheltered, nests and tribal rests',
      "buzzing with life, nature's symphony",
      'overgrown, reclaimed by ancient trees',
      'shadowed, thick foliage dims light',
      'carved and marked by tribes',
      'primordial, mysterious and ancient',
      'impeccably wild, untouched',
      'humid, rich scent of decay',
      'lush, teeming with life and vibrant colors'
    ],
    locations: [
      { label: 'towering waterfall', tooltip: 'hidden behind curtains of dense vines' },
      { label: 'ancient stone temple', tooltip: 'overtaken by the encroaching foliage' },
      { label: 'vibrant glade', tooltip: 'filled with luminescent flora at night' },
      { label: 'thick bamboo grove', tooltip: 'producing an eerie whisper with wind' },
      { label: 'dark, humid cave', tooltip: 'where bats and unknown creatures dwell' },
      { label: 'vast clearing', tooltip: 'dominated by a giant, sacred banyan tree' },
      { label: 'hidden lagoon', tooltip: 'its waters reflecting myriad of colors' },
      { label: 'rope bridge', tooltip: 'spanning a deep and mysterious gorge' },
      { label: 'secluded hot spring', tooltip: 'surrounded by fragrant blossoms' },
      { label: 'moss-covered obelisk', tooltip: 'inscriptions hinting at old rituals' },
      { label: 'sunken shipwreck', tooltip: "half-buried in a river's silted bed" }
    ]
  },
  tundra: arctic,
  glacier: arctic,
  coastal: {
    moods: [
      'bloody, the site of awful violence',
      'glistening, reflections, sunlit tide pools',
      'nestled, campfire signs, shelters',
      'resonating, waves crash, seabirds call',
      'eroding, shifting cliffs and shores',
      'moonlit, long shadows on sands',
      'marred by shipwrecks, castaways',
      'driftwood relics from lost vessels',
      'impeccably serene, untouched beauty',
      'secluded, rarely trodden coast',
      'fog-shrouded, vision obscured by mist and haze',
      'salty, seaweed, brine scent'
    ],
    locations: [
      { label: 'secluded cove', tooltip: 'shielded by tall jagged cliffs' },
      { label: 'shipwrecked vessel', tooltip: 'half-buried in the sandy shore' },
      { label: 'tidal pools', tooltip: 'teeming with colorful marine life' },
      { label: 'kelp forest', tooltip: 'dense and easy to get lost in' },
      { label: 'coral reef', tooltip: 'vibrant and teeming with marine life' },
      { label: 'ship graveyard', tooltip: 'hulks of old vessels run aground' },
      { label: 'rocky outcrop', tooltip: 'a favored spot for local seabirds' },
      { label: 'driftwood-laden beach', tooltip: 'remnants of distant lands' },
      { label: 'dune-covered shoreline', tooltip: 'where sea meets shifting sand' },
      { label: 'mangrove forest', tooltip: 'where roots intertwine and waters maze' },
      { label: 'sandy grotto', tooltip: 'filled with phosphorescent algae' },
      { label: 'leviathan carcass', tooltip: 'teeming with scavengers' },
      { label: 'overgrown coastal road', tooltip: 'leading to ruins' },
      { label: 'forsaken lighthouse', tooltip: 'its beam long extinguished' },
      { label: 'moss-covered statue', tooltip: 'arms outstretched to the sea' }
    ]
  },
  oceanic: {
    moods: [
      "shimmering, bioluminescence, sun's glint",
      'tempestuous, roaring waves, wild winds',
      'eroding, reefs crumbling underwater',
      'abyssal, darkest depths devour light',
      'fog-shrouded, vision obscured by mist and haze',
      'treasure-laden, gold chests, sunken cities',
      "haunting, lost mariners' songs, ghost ships",
      'vast, endless seldom-tread expanse',
      'coral-kissed, vibrant depths',
      'saline, seaweed, salt scent'
    ],
    locations: [
      { label: 'kelp forest', tooltip: 'dense and easy to get lost in' },
      { label: 'underwater cave', tooltip: 'glowing with bioluminescence' },
      { label: 'deep trench', tooltip: "where light doesn't reach" },
      { label: 'rocky archipelago', tooltip: 'home to rare birds' },
      { label: 'volcanic island', tooltip: 'with black sand beaches' },
      { label: 'coral reef', tooltip: 'vibrant and teeming with marine life' },
      { label: 'ship graveyard', tooltip: 'hulks of old vessels run aground' },
      { label: 'underwater volcanic vent', tooltip: 'surrounded by exotic lifeforms' },
      { label: 'busy merchant vessel', tooltip: 'deck bustling with activity' },
      { label: 'proud navy flagship', tooltip: 'cannons gleaming in readiness' },
      { label: "smuggler's sloop", tooltip: 'silent and low in moonlit waters' }
    ]
  },
  hills: {
    moods: [
      'breeze-caressed, wind dances on slopes',
      'mist-clad, morning fog hugs land',
      'echoing, sounds reverberate between peaks',
      'ancient, with standing stones, circles',
      'panoramic, sweeping vistas from peaks',
      "scarred, old quarries' remnants",
      'wildflower-dotted, bursts of color',
      'labyrinthine, local-only trails',
      'sun-drenched, warmth on golden grass',
      'bloody, the site of awful violence',
      'windswept, trees bow to air',
      'moss-blanketed, soft step cushion',
      'wild herb-scented, aromatic air'
    ],
    locations: [
      { label: 'cavern entrance', tooltip: 'hidden behind a waterfall' },
      { label: 'ancient tree', tooltip: 'roots gripping a steep incline' },
      { label: 'winding path', tooltip: 'leading to unknown heights' },
      { label: 'stone circle', tooltip: 'where rituals once took place' },
      { label: 'abandoned watchtower', tooltip: 'overlooking vast lands' },
      { label: 'rocky outcrop', tooltip: 'providing a vantage point' },
      { label: 'forgotten shrine', tooltip: 'half-buried by time' },
      { label: 'overgrown vineyard', tooltip: 'terraced on hillside' },
      { label: 'wooden bridge', tooltip: 'spanning a narrow chasm' },
      { label: 'lonely gravestone', tooltip: 'placed under an old tree' },
      { label: 'stone staircase', tooltip: "carved into the hill's face" },
      { label: 'campsite remnants', tooltip: 'ashes still warm to touch' }
    ]
  }
}

const hazards = [
  { label: 'ancient shrine', tooltip: 'an old shrine offers blessings or curses' },
  {
    label: 'river crossing',
    tooltip: 'fast currents and slippery rocks make crossing treacherous'
  },
  {
    label: 'abandoned campsite',
    tooltip: 'signs of a recent struggle and left-behind supplies'
  },
  { label: 'wagon remains', tooltip: 'might contain supplies or a map' },
  { label: 'heavy fog', tooltip: 'heavy fog reduces visibility to near zero' },
  { label: 'hidden hot spring', tooltip: 'a secluded spot offers rest and healing' },
  { label: 'landslide obstacle', tooltip: 'landslide blocks the path' },
  { label: 'exhausting terrain', tooltip: 'difficult terrain requires exhausting climbs' },
  { label: 'injured guide', tooltip: 'the only one familiar with the terrain' },
  {
    label: 'unstable crossing',
    tooltip: 'unstable crossing due to a {collapsing|rotting} bridge'
  },
  { label: 'toxic fungi', tooltip: 'releasing spores when disturbed' },
  { label: 'poisonous plants', tooltip: 'with alluring colors but deadly touch' },
  {
    label: 'hidden traps',
    tooltip: 'abandoned snares intended for beasts can catch the unwary'
  },
  { label: 'inclement weather', tooltip: 'obscures view and slows travel' },
  { label: 'insect disturbance', tooltip: 'maddening insects; can’t sleep well' },
  {
    label: 'migrating herd',
    tooltip: 'blocking the way, must be carefully navigated or waited out'
  },
  {
    label: 'sudden ravine',
    tooltip: 'a hidden drop-off covered by undergrowth, easy to fall into'
  },
  { label: 'hidden crevasses', tooltip: 'waiting to swallow the unwary' },
  { label: 'quicksand patches', tooltip: 'deceptively looking like solid ground' },
  { label: 'abandoned outpost', tooltip: 'might offer shelter or hide dangers' },
  { label: 'sinkhole', tooltip: 'suddenly opening in the ground, swallowing the unwary' },
  {
    label: 'natural maze',
    tooltip: 'dense forest or canyon paths that loop and confuse direction'
  },
  { label: 'predator signs', tooltip: 'find signs of a lethal predator in the area' },
  { label: 'territory markers', tooltip: 'find territory-markers of nearby natives' },
  { label: 'parasitic illness', tooltip: 'insects or parasites; save or get sick' },
  { label: 'gas hazard', tooltip: 'toxic gas vents or geothermal hazards' },
  { label: 'overgrown homestead', tooltip: 'an abandoned dwelling consumed by nature' },
  { label: 'murky ponds', tooltip: 'hiding unseen depths and creatures' },
  { label: 'navigation error', tooltip: 'skill check or get lost for the day' },
  { label: 'route dead-end', tooltip: 'route dead-ends, wasting a day’s travel' },
  { label: 'food spoilage', tooltip: 'mold or vermin destroy some foodstuffs' },
  { label: 'water contamination', tooltip: 'contaminated water; save or get sick' },
  { label: "traveler's remains", tooltip: 'find the remains of a lost traveler' },
  { label: 'massacre site', tooltip: 'find the hideous remains of a massacre' }
]

const encounters = [
  {
    label: 'traveling {sorcerers|merchants|hunters|aristocrats|pilgrims|adventurers}',
    tooltip:
      '{pausing for a meal|camping here for an interval|fleeing from a fearsome pursuer|hiding from something dangerous|examining recent loot|arguing hotly over something|wounded and low on supplies|hopelessly lost|affable and friendly|searching for {something valuable|someone}}'
  },
  { label: 'bandit {toll|ambush|campsite}' },
  { label: 'blighted {outcast|sorcerer|traders|shaman|raiders|hunters|patrol|campsite|scouts}' },
  { label: 'territorial tribes', tooltip: 'suspicious of outsiders on their lands' },
  { label: 'restless spirits', tooltip: 'haunting an unmarked burial ground' },
  {
    label: 'stranded caravan',
    tooltip: 'survivors in need of aid, offering rewards for assistance'
  },
  { label: 'nomadic clan', tooltip: 'willing trade supplies and stories' },
  { label: '{starving|wounded|lurking} predator' },
  { label: '{pack hunters|mated hunting pair}' },
  { label: 'large and aggressive herbivore' },
  { label: 'swarm of dangerous vermin' }
]

export const WILDERNESS = {
  spawn: (loc: Province) => {
    const hazard = window.dice.choice(hazards)
    const encounter = window.dice.choice(encounters)
    const terrain = 'desert'
    const template = templates[terrain]
    return {
      subtitle: `${terrain} (${TEXT.decorate({
        label: 'wilderness'
      })})`,
      content: [
        {
          label: 'encounters',
          text: `${TEXT.decorate({
            label: window.dice.spin(hazard.label),
            tooltip: hazard.tooltip ? window.dice.spin(hazard.tooltip) : undefined
          })}, ${TEXT.decorate({
            label: window.dice.spin(encounter.label),
            tooltip: encounter.tooltip ? window.dice.spin(encounter.tooltip) : undefined
          })}`
        },
        {
          label: 'locations',
          text: window.dice
            .sample(template.locations, 2)
            .map(location => TEXT.decorate({ ...location, color: cssColors.subtitle }))
            .join(', ')
        }
      ]
    }
  }
}
