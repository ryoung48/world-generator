import { cssColors } from '../../../../../components/theme/colors'
import { LANGUAGE } from '../../../../npcs/languages'
import { decorateText } from '../../../../utilities/text/decoration'
import { PROVINCE } from '../..'
import { Province } from '../../types'
import { WEATHER } from '../../weather'
import { Wilderness, WildernessTemplate } from './types'

const polar = {
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
    { name: 'isolated ice cavern', description: 'walls shimmering with blue hues' },
    { name: 'nomadic campsite', description: 'yurts circled around a central fire' },
    { name: 'frozen waterfall', description: 'a once-rushing torrent now still' },
    { name: 'vast snowfield', description: 'marked by mysterious ancient stones' },
    { name: 'hidden hot spring', description: 'steam rising amidst the cold expanse' },
    { name: 'abandoned research outpost', description: 'equipment still inside' },
    { name: 'glacier crevice', description: 'hiding deep secrets beneath its surface' },
    { name: 'lone hunting cabin', description: 'smoke curling from the chimney' },
    { name: 'ancient burial ground', description: 'marked with weathered totems' },
    { name: 'icy cliff overlook', description: 'offering views of distant horizons' },
    { name: 'windswept ridge', description: 'where the northern lights dance' },
    { name: 'tumbled ruins', description: 'remnants of a forgotten civilization' },
    { name: 'permafrost bog', description: 'dotted with petrified tree stumps' },
    { name: 'vast icy lake', description: 'surface reflecting the endless sky' },
    { name: 'desolate valley', description: 'echoing with the howl of distant wolves' }
  ],
  hazards: [
    { name: 'blinding snowstorm', description: 'obscuring vision and path ahead' },
    { name: 'unstable ice sheets', description: 'cracking under the slightest weight' },
    { name: 'deep snow pits', description: 'camouflaged by a thin snowy layer' },
    { name: 'frostbite-inducing winds', description: 'cutting through the thickest clothing' },
    { name: 'aggressive predators', description: 'protecting their hunting ground' },
    { name: 'frozen river', description: 'surface strength deceptive to the eye' },
    { name: 'treacherous mountain passes', description: 'prone to avalanches' },
    { name: 'relentless cold fog', description: 'disorienting travelers quickly' },
    { name: 'hidden crevasses', description: 'lurking beneath snow-covered surfaces' },
    { name: 'conflict within group', description: 'differing opinions on path forward' },
    { name: 'injured guide', description: 'the only one familiar with the terrain' }
  ]
}

const templates: Record<Province['environment']['terrain'], WildernessTemplate> = {
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
    hazards: [
      { name: 'prowling mountain beasts', description: "guardians of nature's high vaults" },
      { name: 'jagged rockfall', description: 'tumbling unexpectedly from above' },
      { name: 'sheer cliff edge', description: 'hidden by dense fog and mist' },
      { name: 'hidden crevasses', description: 'waiting to swallow the unwary' },
      { name: 'venomous highland plants', description: 'bearing deceiving beauty' },
      { name: 'feral mountain tribes', description: 'protective of their sacred territories' },
      { name: 'roving bands of highland thieves', description: 'quick to strike in narrow passes' },
      { name: 'treacherous ice-covered slope', description: 'slippery and deceptive' },
      { name: 'fast-flowing mountain river', description: 'with strong undercurrents' },
      { name: 'sudden alpine storm', description: 'with biting cold and blinding snow' },
      { name: 'rickety wooden bridge', description: 'swaying over a deep chasm' },
      { name: 'collapsed mountain shelter', description: 'leaving no place to rest' },
      { name: 'disagreements among group members', description: 'straining unity' },
      { name: 'mysterious sounds at night', description: 'stoking fear and paranoia' },
      { name: 'blocked mountain pass', description: 'due to a recent rockfall' },
      { name: 'sudden illness', description: 'due to altitude and harsh conditions' },
      { name: 'lost map', description: 'making navigation a game of guesswork' },
      { name: 'damaged equipment', description: 'rendering vital tools unusable' },
      { name: 'exhausted food supplies', description: 'with the nearest village days away' },
      { name: 'snapped rope bridge', description: 'cutting off the only passage ahead' },
      { name: 'broken trail markers', description: 'leading travelers astray' },
      { name: 'miscommunication', description: 'leading to separated party members' }
    ],
    locations: [
      { name: 'secluded alpine cabin', description: 'surrounded by tall pines and fresh snow' },
      { name: 'cliffside monastery', description: 'accessible only by winding stone steps' },
      { name: 'hidden waterfall', description: 'cascading into a crystal-clear mountain pool' },
      { name: 'ancient stone ruins', description: 'overtaken by moss and mountain flora' },
      { name: 'high-altitude meadow', description: 'dotted with colorful wildflowers' },
      { name: 'hot spring pool', description: 'nestled between snow-capped peaks' },
      { name: 'cavern entrance', description: 'guarded by age-old stalactites and stalagmites' },
      { name: 'mountain pass campsite', description: 'with panoramic views of distant valleys' },
      { name: "abandoned miner's hut", description: 'evidence of a forgotten gold rush' },
      { name: 'rope bridge', description: 'stretching precariously over a deep mountain gorge' },
      { name: 'crumbling watchtower', description: 'remnants of a society long forgotten' },
      { name: 'echoing mountain cave', description: 'where whispers carry tales of old' },
      { name: 'secluded glacier lake', description: 'mirroring the azure sky and lofty peaks' },
      { name: 'impressive stone arch', description: 'carved naturally by time and the elements' },
      { name: 'sunlit grove', description: 'where ancient trees dance with the mountain breeze' },
      { name: 'cliff-hanging nest', description: 'home to rare and majestic birds of prey' },
      { name: 'mountain shrine', description: 'adorned with colorful prayer flags fluttering' },
      { name: 'winding mountain path', description: 'leading through the rocky slopes' },
      { name: 'rock-strewn riverbed', description: 'where meltwater rushes towards the valleys' },
      { name: 'frosty ledge', description: 'offering breathtaking views of the world below' }
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
      { name: 'moss-covered clearing', description: 'bathed in dappled sunlight' },
      { name: 'ancient oak tree', description: 'with roots stretching wide and deep' },
      { name: 'babbling brook', description: 'weaving through ferns and stones' },
      { name: 'hidden grove', description: 'where fireflies dance at twilight' },
      { name: 'old wooden cabin', description: 'overgrown with ivy and mystery' },
      { name: 'mysterious stone circle', description: 'whispering tales of old' },
      { name: 'secluded pond', description: 'reflecting the canopy and sky above' },
      { name: 'winding forest path', description: 'carpeted with fallen leaves' },
      { name: 'abandoned campsite', description: 'evidence of stories left untold' },
      { name: 'deep forest glade', description: 'where deer come to graze' },
      { name: 'towering waterfall', description: 'cascading into a serene pool' },
      { name: 'hollowed-out tree trunk', description: 'home to creatures of the night' },
      { name: 'dense thicket', description: 'where shadows play tricks on the eyes' },
      { name: 'overgrown ruins', description: 'remnants of a forgotten dwelling' },
      { name: 'patch of wildflowers', description: 'painting the ground with color' },
      { name: 'twisted tree', description: 'shaped by time and the elements' },
      { name: 'fern-covered grotto', description: 'hidden behind a curtain of vines' },
      { name: 'mossy boulder field', description: 'where critters scurry and hide' },
      { name: 'wooden bridge', description: 'arching gracefully over a babbling creek' }
    ],
    hazards: [
      { name: 'slippery moss-covered rocks', description: 'treacherous underfoot' },
      { name: 'thick brambles', description: 'tangling and scratching unwary travelers' },
      { name: 'quicksand patches', description: 'deceptively looking like solid ground' },
      { name: 'dense fog', description: 'blurring vision and muffling sounds' },
      { name: 'swarming insects', description: 'stinging and biting in droves' },
      { name: 'sudden sinkholes', description: 'swallowing parts of the forest floor' },
      { name: 'poisonous plants', description: 'with alluring colors but deadly touch' },
      { name: 'murky forest ponds', description: 'hiding unseen depths and creatures' },
      { name: 'lost trail markers', description: 'leaving the path uncertain' },
      { name: 'soaked provisions', description: 'due to unexpected rain or river crossings' },
      { name: 'torn map', description: 'with key areas missing or unreadable' },
      { name: 'mysterious forest noises', description: 'stoking fear and paranoia' },
      { name: 'lurking forest predators', description: 'stalking from the underbrush' },
      { name: 'ensnaring vines and thorny thickets', description: 'impeding progress' },
      { name: 'quicksand pits', description: 'camouflaged among the forest floor' },
      { name: 'densely packed trees', description: 'obscuring the path and direction' },
      { name: 'marshy grounds', description: 'slowing travel and hiding aquatic predators' },
      { name: 'mysterious ruins', description: 'filled with forgotten dangers' },
      { name: 'feral forest tribes', description: 'wary of outsiders trespassing their domains' },
      { name: 'nocturnal creatures', description: 'making unsettling noises in the dark' },
      { name: 'streams with slippery rocks', description: 'making crossings perilous' },
      { name: 'infectious insect bites', description: 'causing fever and delirium' },
      { name: 'abandoned traps', description: 'left behind by hunters of old' },
      { name: 'sinkholes', description: 'concealed under a layer of leaves and debris' }
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
      { name: 'vast sea of golden grass', description: 'swaying with the wind' },
      { name: 'solitary ancient tree', description: 'offering shade in the expanse' },
      { name: 'hidden watering hole', description: 'teeming with wildlife at dusk' },
      { name: "abandoned shepherd's hut", description: 'weathered by time and elements' },
      { name: 'circle of standing stones', description: 'holding secrets of ages past' },
      { name: 'wildflower meadow', description: 'bursting with colors and life' },
      { name: 'gentle rolling hills', description: 'offering panoramic views of the horizon' },
      { name: 'whispering reed bed', description: 'bordering a tranquil pond' },
      { name: 'nomadic campsite', description: 'with tents and campfires under the stars' },
      { name: 'sunlit plateau', description: 'overlooking vast stretches of the plains' },
      { name: 'ancient burial mound', description: 'a testament to civilizations long gone' },
      { name: 'carved rock formations', description: 'shaped by wind and time' },
      { name: 'rusted remains of a wagon', description: 'a relic from bygone journeys' }
    ],
    hazards: [
      { name: 'deep and treacherous ravines', description: 'concealed by vegetation' },
      { name: 'lost landmarks', description: 'making navigation nearly impossible' },
      { name: 'band of marauders', description: "quick to demand a traveler's goods" },
      { name: 'wounded predator', description: 'desperate and more dangerous than usual' },
      { name: 'restless spirits', description: 'haunting an unmarked burial ground' },
      { name: 'vast sea of tall golden grass', description: 'hiding unseen creatures' },
      { name: 'broken wagon wheel', description: 'on a dusty, abandoned trail' },
      { name: 'shallow stream', description: 'with slippery, algae-covered rocks' },
      { name: 'long-abandoned ghost town', description: 'overgrown with weeds' },
      { name: 'large bison herd', description: 'grazing and blocking the path' },
      { name: 'sudden dust storm', description: 'obscuring vision' },
      { name: 'nomadic tribe', description: 'suspicious of outsiders on their lands' },
      { name: 'lone tree', description: 'branches twisted, rumored to be haunted' }
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
      { name: 'sun-bleached skeleton', description: 'of a forgotten creature' },
      { name: 'shifting dunes', description: "ever-changing with the wind's whim" },
      { name: 'hidden oasis', description: 'a lush haven amid the barren expanse' },
      { name: 'ancient ruins', description: 'half-buried by sand and time' },
      { name: 'cavern entrance', description: 'leading to cool, darkened depths below' },
      { name: 'nomadic market', description: 'bustling with traders and colorful tents' },
      { name: 'cracked salt flats', description: 'glistening under the harsh sun' },
      { name: 'mysterious rock formations', description: 'sculpted by erosion and wind' },
      { name: 'dried riverbed', description: 'hinting at water that once flowed' },
      { name: 'shadowed alcove', description: 'offering refuge from the midday heat' },
      { name: 'sunken city', description: 'its spires just peeking above the sands' },
      { name: 'isolated cactus grove', description: 'home to vibrant desert blooms' },
      { name: 'remnants of a lost caravan', description: 'scattered belongings in the sand' },
      { name: 'volcanic crater', description: "evidence of the desert's fiery past" }
    ],
    hazards: [
      { name: 'relentless heat', description: 'causing fatigue and hallucinations' },
      { name: 'venomous vermin', description: 'hidden beneath rocks and sand' },
      { name: 'sandstorms', description: 'blinding and disorienting the unprepared' },
      { name: 'treacherous quicksand', description: 'appearing as solid ground' },
      { name: 'dehydration', description: 'from the lack of drinkable water sources' },
      { name: 'sharp-edged cacti', description: 'blending into the landscape' },
      { name: 'biting sand flies', description: 'causing irritation and potential disease' },
      { name: 'aggressive desert tribes', description: 'protective of their territories' },
      { name: 'unstable rock formations', description: 'ready to collapse with a touch' },
      { name: 'bandits', description: 'lying in wait, ready to ambush unsuspecting travelers' },
      { name: 'poisoned oases', description: "with water that's deceptively lethal" },
      { name: 'dune-dwelling predator', description: 'ready to ambush on unwary travelers' }
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
      { name: 'fog-shrouded grove', description: 'where twisted trees whisper secrets' },
      { name: 'moss-covered ruins', description: 'remnants of a long-forgotten village' },
      { name: 'murky lagoon', description: 'home to creatures lurking just below' },
      { name: 'patchwork of islands', description: 'linked by fragile wooden bridges' },
      { name: 'ancient tree hollow', description: 'large enough to shelter wanderers' },
      { name: 'abandoned hut', description: 'its thatched roof barely holding up' },
      { name: 'a dense thicket', description: 'where fireflies dance at dusk' },
      { name: 'sunken graveyard', description: 'its stones jutting out from the mire' },
      { name: 'hidden cave entrance', description: 'tucked behind cascading vines' },
      { name: 'bubbling mud pools', description: 'their depths holding heated secrets' },
      { name: 'floating market', description: 'where locals trade on rickety boats' },
      { name: 'eerie clearing', description: 'where the ground is oddly dry and firm' },
      { name: 'ancient stone circle', description: 'moss-grown and shrouded in mist' },
      { name: 'decrepit dock', description: 'its planks rotting and creaking' },
      { name: "old witch's hut", description: 'made of twisted roots and shadowed corners' },
      { name: 'overgrown statue', description: 'nature reclaiming a lost tribute' }
    ],
    hazards: [
      { name: 'thick mists', description: 'disorienting and masking dangerous paths' },
      { name: 'quicksand pits', description: 'deceptively solid to the unsuspecting foot' },
      { name: 'hidden river predator', description: 'ready to ambush unwary travelers' },
      { name: 'treacherous footing', description: 'where solid ground gives way to muck' },
      { name: 'biting insects', description: 'swarming and relentless in their pursuit' },
      { name: 'ravenous leeches', description: 'seeking warm-blooded hosts' },
      { name: 'noxious gases', description: 'rising from decomposing plant matter' },
      { name: 'sudden bog sinkholes', description: 'swallowing all that step wrongly' },
      { name: 'aggressive swamp tribes', description: 'protective of their territory' },
      { name: 'carnivorous plants', description: 'waiting to ensnare unsuspecting prey' },
      { name: 'toxic fungi', description: 'releasing spores when disturbed' },
      { name: 'water full of biting fish', description: 'devouring all that approach' },
      { name: 'lost map', description: 'dropped into the murky waters below' },
      { name: 'group member stricken', description: 'showing signs of swamp fever' }
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
      { name: 'towering waterfall', description: 'hidden behind curtains of dense vines' },
      { name: 'ancient stone temple', description: 'overtaken by the encroaching foliage' },
      { name: 'vibrant glade', description: 'filled with luminescent flora at night' },
      { name: 'thick bamboo grove', description: 'producing an eerie whisper with wind' },
      { name: 'dark, humid cave', description: 'where bats and unknown creatures dwell' },
      { name: 'vast clearing', description: 'dominated by a giant, sacred banyan tree' },
      { name: 'hidden lagoon', description: 'its waters reflecting myriad of colors' },
      { name: 'rope bridge', description: 'spanning a deep and mysterious gorge' },
      { name: 'secluded hot spring', description: 'surrounded by fragrant blossoms' },
      { name: 'moss-covered obelisk', description: 'inscriptions hinting at old rituals' },
      { name: 'sunken shipwreck', description: "half-buried in a river's silted bed" }
    ],
    hazards: [
      { name: 'rickety rope bridge', description: 'fraying and swaying ominously' },
      { name: 'aggressive predators', description: 'stalking silently from the shadows' },
      { name: 'venomous vermin', description: 'hiding within the foliage and bark' },
      { name: 'treacherous river currents', description: 'sweeping the unwary downstream' },
      { name: 'unsteady ground', description: 'giving way to concealed sinkholes' },
      { name: 'toxic plants', description: 'causing paralysis when touched or ingested' },
      { name: 'dense fog', description: 'disorienting and muffling familiar sounds' },
      { name: 'carnivorous plants', description: 'luring prey with vibrant colors' },
      { name: 'territorial tribes', description: 'wary of outsiders entering their domain' },
      { name: 'debilitating humidity', description: 'sapping strength and stamina' },
      { name: 'swarms of mosquitos', description: 'potential carriers of disease' },
      { name: 'native guide', description: 'suddenly reluctant to proceed further' },
      { name: 'mysterious illness', description: 'affecting only certain group members' },
      { name: 'map inconsistencies', description: 'causing doubt in chosen paths' }
    ]
  },
  tundra: polar,
  glacier: polar,
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
      'repaired, paths by fishermen',
      'salty, seaweed, brine scent'
    ],
    locations: [
      { name: 'secluded cove', description: 'shielded by tall jagged cliffs' },
      { name: 'shipwrecked vessel', description: 'half-buried in the sandy shore' },
      { name: 'tidal pools', description: 'teeming with colorful marine life' },
      { name: 'rocky outcrop', description: 'a favored spot for local seabirds' },
      { name: 'driftwood-laden beach', description: 'remnants of distant lands' },
      { name: 'dune-covered shoreline', description: 'where sea meets shifting sand' },
      { name: 'mangrove forest', description: 'where roots intertwine and waters maze' },
      { name: 'seal colony', description: 'basking on a secluded stretch of beach' },
      { name: 'quiet estuary', description: 'where freshwater greets the salted tides' },
      { name: 'sandy grotto', description: 'filled with phosphorescent algae' },
      { name: 'leviathan carcass', description: 'teeming with scavengers' },
      { name: 'overgrown coastal road', description: 'leading to ruins' },
      { name: 'forsaken lighthouse', description: 'its beam long extinguished' },
      { name: 'moss-covered statue', description: 'arms outstretched to the sea' }
    ],
    hazards: [
      { name: 'venomous sea creatures', description: 'hiding in shallow waters' },
      { name: 'crumbling cliff edges', description: 'eroded by relentless waves' },
      { name: 'toxic algae blooms', description: 'causing water poisoning' },
      { name: 'unpredictable fog banks', description: 'limiting visibility' },
      { name: 'village feuds', description: 'over shipwreck salvage rights' },
      { name: 'jagged rocks', description: "lurking just below the water's surface" },
      { name: 'barnacle-covered obstacles', description: 'causing deep cuts' },
      { name: 'sun-bleached bones', description: 'hinting at deadly territories ahead' }
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
    hazards: [
      { name: 'sea predators', description: 'lurking beneath the surface' },
      { name: 'pirate ambush', description: 'demanding all collected treasure' },
      { name: 'ghost ship', description: 'its crew cursed with undeath' },
      { name: 'mutinous crew', description: 'whispering in hushed tones' },
      { name: 'aggressive merfolk', description: 'territorial and hostile' },
      { name: 'map stolen', description: 'leaving the course uncertain' },
      { name: 'waterlogged', description: 'the ship slowly taking on water' },
      { name: 'mysterious illness', description: 'crew members dropping fast' },
      { name: 'plague vessel', description: 'carrying a deadly virus' },
      { name: 'stowaway found', description: 'with an unknown mission' }
    ],
    locations: [
      { name: 'kelp forest', description: 'dense and easy to get lost in' },
      { name: 'underwater cave', description: 'glowing with bioluminescence' },
      { name: 'deep trench', description: "where light doesn't reach" },
      { name: 'rocky archipelago', description: 'home to rare birds' },
      { name: 'volcanic island', description: 'with black sand beaches' },
      { name: 'coral reef', description: 'vibrant and teeming with marine life' },
      { name: 'ship graveyard', description: 'hulks of old vessels run aground' },
      { name: 'underwater volcanic vent', description: 'surrounded by exotic lifeforms' },
      { name: 'busy merchant vessel', description: 'deck bustling with activity' },
      { name: 'proud navy flagship', description: 'cannons gleaming in readiness' },
      { name: "smuggler's sloop", description: 'silent and low in moonlit waters' }
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
    hazards: [
      { name: 'loose rocks', description: 'prone to causing avalanches' },
      { name: 'hidden pits', description: 'masked by overgrown vegetation' },
      { name: 'rain-slicked trails', description: 'treacherous underfoot' },
      { name: 'nests of venomous vermin', description: 'concealed among stones' },
      { name: 'unstable ground', description: 'threatening to collapse' },
      { name: 'narrow ridges', description: 'one wrong step from doom' },
      { name: 'thick brambles', description: 'tearing at flesh and fabric' },
      { name: 'shifting mudslides', description: 'burying everything below' },
      { name: 'steep cliffs', description: 'offering no handholds' },
      { name: 'lurking predators', description: 'watching from shadows' },
      { name: 'treacherous fog', description: 'disorienting travelers' },
      { name: 'rotting bridges', description: 'barely holding together' },
      { name: 'swarming insects', description: 'hungry for fresh blood' },
      { name: 'bandit ambush', description: 'using the hills for cover' },
      { name: 'tribal hill folk', description: 'protective of their territory' }
    ],
    locations: [
      { name: 'cavern entrance', description: 'hidden behind a waterfall' },
      { name: 'ancient tree', description: 'roots gripping a steep incline' },
      { name: 'winding path', description: 'leading to unknown heights' },
      { name: 'stone circle', description: 'where rituals once took place' },
      { name: 'abandoned watchtower', description: 'overlooking vast lands' },
      { name: 'rocky outcrop', description: 'providing a vantage point' },
      { name: 'forgotten shrine', description: 'half-buried by time' },
      { name: 'overgrown vineyard', description: 'terraced on hillside' },
      { name: 'wooden bridge', description: 'spanning a narrow chasm' },
      { name: 'lonely gravestone', description: 'placed under an old tree' },
      { name: 'stone staircase', description: "carved into the hill's face" },
      { name: 'campsite remnants', description: 'ashes still warm to touch' }
    ]
  },
  subterranean: {
    moods: [
      'bloody, the site of awful violence',
      'luminescent, fungi, crystals glow',
      "snug, deep dwellers' signs",
      'echoing, distant sounds, murmurs',
      'eroding, walls dissolve over time',
      'pitch-black, no natural light',
      'marred, claw marks, symbols',
      'ossuary, ancient skeletons',
      'maintained, unseen care',
      'isolated, untouched deep chambers',
      'permeated, moldy damp scent'
    ],
    hazards: [
      { name: 'chasm', description: 'gaping and yawning into the abyss' },
      { name: 'stalactites', description: 'ready to fall from above' },
      { name: 'gas pockets', description: 'explosive when ignited' },
      { name: 'lurking cave predator', description: 'eyes gleaming in the dark' },
      { name: 'unstable floor', description: 'collapsing underfoot' },
      { name: 'acidic underground pools', description: 'corrosive to the touch' },
      { name: 'cave-in risks', description: 'with shaky overhead rocks' },
      { name: 'geysers of boiling water', description: 'erupting unexpectedly' },
      { name: 'infectious fungi', description: 'releasing harmful spores' },
      { name: 'hidden pitfall traps', description: 'left by ancient dwellers' },
      { name: 'aggressive subterranean tribe', description: 'territorial and fierce' },
      { name: 'nest of venomous cave spiders', description: 'web-covered' },
      { name: 'pockets of toxic gases', description: 'causing dizziness' },
      { name: 'sudden underground flooding', description: 'waters rising fast' },
      { name: 'ancient machinery', description: 'humming back to life' }
    ],
    locations: [
      { name: 'echoing cavern', description: 'home to countless bats' },
      { name: 'underground river', description: 'its waters dark and cold' },
      { name: 'crystal-studded chamber', description: 'gleaming in torchlight' },
      { name: 'labyrinthine tunnels', description: "easy to lose one's way" },
      { name: 'ancient tomb', description: 'hieroglyphs adorning the walls' },
      { name: 'chasm spanning bridge', description: 'a perilous crossing' },
      { name: 'glowing mushroom grove', description: 'casting eerie light' },
      { name: 'forgotten temple', description: 'dedicated to a dark god' },
      { name: 'magma chamber', description: 'heat radiating from every side' },
      { name: 'underground lake', description: 'home to strange creatures' },
      { name: 'abandoned mine', description: 'tools still left behind' },
      { name: 'bioluminescent grotto', description: 'colorful and mesmerizing' },
      { name: 'narrow passage', description: 'barely wide enough to pass' }
    ]
  }
}

export const WILDERNESS = {
  spawn: (loc: Province): Wilderness => {
    const { local } = PROVINCE.cultures(loc)
    const culture = window.world.cultures[local.culture]
    const terrain = PROVINCE.terrain(loc)
    const template = templates[terrain]
    const wilderness: Wilderness = {
      idx: window.world.wilderness.length,
      subtype: terrain,
      name: LANGUAGE.word.unique({ lang: culture.language, key: 'wilds', len: 3 }),
      tag: 'wilderness',
      mood: window.dice.choice(template.moods),
      weather: WEATHER.conditions({ loc, color: cssColors.subtitle }),
      hazards: window.dice
        .sample(template.hazards, 2)
        .map(hazard =>
          decorateText({
            label: hazard.name,
            tooltip: hazard.description,
            color: cssColors.subtitle
          })
        )
        .join(', '),
      locations: window.dice
        .sample(template.locations, 2)
        .map(location =>
          decorateText({
            label: location.name,
            tooltip: location.description,
            color: cssColors.subtitle
          })
        )
        .join(', ')
    }
    window.world.wilderness.push(wilderness)
    return wilderness
  }
}
