import { cssColors } from '../../../../../components/theme/colors'
import { LANGUAGE } from '../../../../npcs/languages'
import { decorateText } from '../../../../utilities/text/decoration'
import { PROVINCE } from '../..'
import { Province } from '../../types'
import { Ruin } from './types'

const rooms: Record<
  string,
  { locations: { name: string; description: string; explanation: string }[] }
> = {
  'isolated rural estate of nobility': {
    locations: [
      {
        name: 'grand entrance',
        description: 'with a broken ornate gate and overgrowth',
        explanation: 'this served as the majestic entrance to the estate'
      },
      {
        name: 'crumbling ballroom',
        description: 'with faded frescoes and a cracked floor',
        explanation: 'this was where elegant dances and gatherings took place'
      },
      {
        name: 'once-majestic dining hall',
        description: 'with a long decayed wooden table',
        explanation: 'this hall echoed with the sounds of grand feasts'
      },
      {
        name: 'former stables',
        description: 'with remnants of stalls and rusted horseshoes',
        explanation: 'here, noble steeds were tended to and housed'
      },
      {
        name: 'dilapidated greenhouse',
        description: 'with shattered glass and wild plants',
        explanation: 'plants from across the realm once thrived here'
      },
      {
        name: 'ruined library',
        description: 'with scattered books and a collapsed shelf',
        explanation: 'a repository of knowledge, now lost to time'
      },
      {
        name: 'overgrown garden maze',
        description: 'with statues eroded by time',
        explanation: 'once a delightful challenge, now reclaimed by nature'
      },
      {
        name: "decaying servants' quarters",
        description: 'with old beds and scattered tools',
        explanation: 'this housed those who served the nobility'
      },
      {
        name: 'collapsed watchtower',
        description: 'with a view of the surrounding lands',
        explanation: 'guards kept watch over the estate from this vantage point'
      },
      {
        name: 'forgotten pond',
        description: 'with a cracked stone bench and lily pads',
        explanation: 'a serene retreat for reflection and relaxation'
      },
      {
        name: 'remnants of a chapel',
        description: 'with a shattered stained glass window',
        explanation: 'a sacred space for spiritual solace and worship'
      },
      {
        name: 'old wine cellar',
        description: 'with empty barrels and a musty smell',
        explanation: 'fine wines were stored and aged in this cool space'
      }
    ]
  },
  'townhouse of minor gentry': {
    locations: [
      {
        name: 'grand entrance hall',
        description: 'with a once-elegant chandelier',
        explanation: 'this welcomed guests with its grandeur and elegance'
      },
      {
        name: 'ruined library',
        description: 'with scattered books and a broken desk',
        explanation: 'this was a quiet retreat for reading and reflection'
      },
      {
        name: 'crumbling drawing room',
        description: 'with a faded tapestry and dusty piano',
        explanation: 'a place of entertainment and relaxation for the family'
      },
      {
        name: 'destroyed dining area',
        description: 'with a splintered table and chipped china',
        explanation: 'where the family gathered for meals and conversation'
      },
      {
        name: 'overgrown garden',
        description: 'with tangled rose bushes and a cracked fountain',
        explanation: 'an outdoor retreat for relaxation and leisure'
      },
      {
        name: 'neglected servant quarters',
        description: 'with torn mattresses and rusted pots',
        explanation: 'this housed the staff who served the household'
      },
      {
        name: 'collapsed ballroom',
        description: 'with a shattered chandelier and warped floorboards',
        explanation: 'where grand events and dances were hosted'
      },
      {
        name: 'desolate master bedroom',
        description: 'with a frayed canopy bed and cracked mirror',
        explanation: 'a private sanctuary for the head of the household'
      },
      {
        name: 'damaged guest room',
        description: 'with peeling wallpaper and a moth-eaten rug',
        explanation: 'a space to host and accommodate visiting friends and relatives'
      },
      {
        name: 'broken-down kitchen',
        description: 'with a ruined stove and broken dishes',
        explanation: 'where meals were prepared for the family and guests'
      },
      {
        name: 'decayed study',
        description: 'with an overturned chair and scattered letters',
        explanation: 'a private room for contemplation and work'
      },
      {
        name: 'dilapidated conservatory',
        description: 'with shattered windows and dying plants',
        explanation: 'a greenhouse-like space for plants and relaxation'
      }
    ]
  },
  'massive tenement or slum tower': {
    locations: [
      {
        name: 'collapsed entrance',
        description: 'shadowed by crumbling archways',
        explanation: 'the main entryway into the tower complex'
      },
      {
        name: 'moss-covered atrium',
        description: 'where a cracked fountain sits',
        explanation: 'a central gathering place for residents'
      },
      {
        name: 'shattered stairwell',
        description: 'with broken steps leading upward',
        explanation: 'once connected the many levels of the tower'
      },
      {
        name: 'old communal kitchen',
        description: 'blackened from old fires',
        explanation: 'a shared space for cooking and meals'
      },
      {
        name: 'tattered laundry room',
        description: 'wash basins stained and cracked',
        explanation: 'a communal area for washing clothes'
      },
      {
        name: 'rooftop garden',
        description: 'now overgrown with wild vegetation',
        explanation: 'an oasis high above the hustle and bustle below'
      },
      {
        name: 'dilapidated hallways',
        description: 'littered with abandoned belongings',
        explanation: 'corridors connecting the many rooms of the tower'
      },
      {
        name: 'former market space',
        description: 'stalls rotting and collapsed',
        explanation: 'where residents shopped for essentials'
      },
      {
        name: 'sunlit room',
        description: 'with remnants of colorful murals',
        explanation: 'a space brightened by art and sunlight'
      },
      {
        name: 'basement storage',
        description: 'damp with water and overgrown mold',
        explanation: 'where residents stored belongings and goods'
      },
      {
        name: 'charred remains of a small shop',
        description: 'goods scattered and spoiled',
        explanation: 'a place where residents purchased daily necessities'
      }
    ]
  },
  'rural grange with outbuildings': {
    locations: [
      {
        name: 'collapsed barn',
        description: 'with exposed wooden beams and hay remnants',
        explanation: 'this barn once housed livestock and stored hay for the farm'
      },
      {
        name: 'overgrown orchard',
        description: 'where old fruit trees still blossom',
        explanation: 'a source of fruit and shade, this orchard was once tended carefully'
      },
      {
        name: 'stone well',
        description: 'half-filled with murky water and encircled by moss',
        explanation: 'this well provided fresh water to the farmstead'
      },
      {
        name: 'crumbling silo',
        description: 'towering tall with a caved-in roof',
        explanation: 'used for storing grain or silage for livestock'
      },
      {
        name: 'abandoned stable',
        description: 'stalls open and signs of old harnesses',
        explanation: 'horses or other working animals were once sheltered here'
      },
      {
        name: 'forgotten root cellar',
        description: 'dark entrance leading underground',
        explanation: 'a cool storage space for preserving foodstuffs'
      },
      {
        name: 'dilapidated chicken coop',
        description: 'with rusted wire mesh and nests',
        explanation: 'chickens were kept here, providing eggs and meat for the farm'
      },
      {
        name: 'fallen windmill',
        description: 'with tattered sails lying amidst wildflowers',
        explanation: 'used to grind grain or pump water for the farm'
      },
      {
        name: 'decayed toolshed',
        description: 'with scattered implements and old boots',
        explanation: 'where farm tools and equipment were stored'
      },
      {
        name: 'once-lively pond',
        description: 'now stagnant with a broken wooden dock',
        explanation: 'a source of water and relaxation, perhaps used for fishing'
      },
      {
        name: 'ruined greenhouse',
        description: 'glass panes missing and overgrowth inside',
        explanation: 'where plants were grown and tended year-round'
      },
      {
        name: 'fenced paddock',
        description: 'gate hanging open and long grass waving',
        explanation: 'an enclosed space where livestock could graze or exercise'
      }
    ]
  },
  'compact fortified village': {
    locations: [
      {
        name: 'crumbled watchtower',
        description: 'overlooking the entire village',
        explanation: 'a strategic point for surveillance and defense'
      },
      {
        name: 'dilapidated gatehouse',
        description: 'main entrance with rusted portcullis',
        explanation: 'the main point of entry and exit, crucial for village security'
      },
      {
        name: 'broken armory',
        description: 'scattered weapons and faded banners',
        explanation: 'where weapons and armor were stored for village defense'
      },
      {
        name: 'collapsed granary',
        description: 'remnants of grain and storage barrels',
        explanation: "stored the village's grain and food supplies"
      },
      {
        name: 'decaying barracks',
        description: 'bunk beds and discarded armor pieces',
        explanation: "where the village's defenders lived and rested"
      },
      {
        name: 'ancient chapel',
        description: 'shattered stained glass windows',
        explanation: 'a spiritual center for villagers, where ceremonies and prayers were held'
      },
      {
        name: 'overgrown smithy',
        description: 'rusting tools and a cold forge',
        explanation: 'where metalwork was done, from weapons to household items'
      },
      {
        name: 'deserted marketplace',
        description: 'remnants of stalls and goods',
        explanation: 'the economic heart of the village, bustling with trade on market days'
      },
      {
        name: 'worn down stables',
        description: 'empty pens and scattered hay',
        explanation: "housed the village's horses and other livestock"
      },
      {
        name: 'toppled walls',
        description: 'ivy-covered stones and missing bricks',
        explanation: 'once protected the village from external threats'
      },
      {
        name: 'sunken well',
        description: 'with an old rusted bucket chain',
        explanation: 'provided fresh water to the village'
      },
      {
        name: 'fractured guard post',
        description: 'arrow slits facing the perimeter',
        explanation: 'strategic points from which guards monitored for threats'
      }
    ]
  },
  'hidden shelter against calamity': {
    locations: [
      {
        name: 'buried library',
        description: 'where ancient knowledge lies forgotten',
        explanation: 'a repository of knowledge meant to outlast disaster'
      },
      {
        name: 'hidden cave',
        description: 'shielded by a thick tangle of roots',
        explanation: 'a natural refuge, offering shelter from the outside world'
      },
      {
        name: 'silent chapel',
        description: 'fractured stained glass casting colorful shadows',
        explanation: 'a spiritual sanctuary for those seeking solace during trying times'
      },
      {
        name: 'subterranean spring',
        description: 'providing fresh water despite decay',
        explanation: "an essential source of fresh water for the shelter's inhabitants"
      },
      {
        name: 'secluded grove',
        description: 'with a moss-covered sanctuary stone',
        explanation: 'a quiet, natural space for reflection and meditation'
      },
      {
        name: 'tangled escape tunnel',
        description: 'roots and rocks blocking the path',
        explanation: "intended as an emergency exit, now obstructed by nature's reclaim"
      },
      {
        name: 'abandoned workshop',
        description: 'tools and blueprints covered in dust',
        explanation: 'where tools and equipment were crafted and repaired'
      },
      {
        name: 'concealed courtyard',
        description: 'where the wary once gathered and planned',
        explanation: 'a communal space for discussion and planning'
      },
      {
        name: 'collapsed entrance',
        description: 'thick stone walls obscured by ivy',
        explanation: 'the main entryway, now difficult to discern from the surroundings'
      },
      {
        name: 'secret underground chamber',
        description: 'reinforced with metallic beams',
        explanation: 'a room designed to withstand the harshest of conditions'
      },
      {
        name: 'waterlogged storage',
        description: 'shelves lined with empty jars and canisters',
        explanation: 'where provisions and supplies were once kept'
      },
      {
        name: 'concealed armory',
        description: 'rusted weapons and armor strewn about',
        explanation: 'stored defensive equipment, now in a state of decay'
      }
    ]
  },
  'mazey urban residential block': {
    locations: [
      {
        name: 'crumbling facade',
        description: 'with traces of old brickwork and moss',
        explanation: 'this facade once bore witness to the vibrant life of the city'
      },
      {
        name: 'once-bustling marketplace',
        description: 'now filled with overgrown weeds',
        explanation: 'a hub of trade and commerce, now reclaimed by nature'
      },
      {
        name: 'eroded statue base',
        description: 'hinting at a forgotten hero or leader',
        explanation: 'a memorial to someone once held in high regard by the residents'
      },
      {
        name: 'charred remnants',
        description: 'where a communal kitchen once thrived',
        explanation: 'this place once filled with warmth and the aroma of shared meals'
      },
      {
        name: 'narrow alleyway',
        description: 'choked with debris and shadows of the past',
        explanation: 'a path once tread by countless feet, now silent and forgotten'
      },
      {
        name: 'former artisan workshop',
        description: 'tools scattered and gathering dust',
        explanation: 'here, skilled hands once crafted items with care and precision'
      },
      {
        name: 'old well',
        description: 'now dried up but surrounded by memories',
        explanation: 'a source of life and sustenance for the community, now empty'
      },
      {
        name: 'desolate rooftop garden',
        description: 'with dead plants and cracked pots',
        explanation: 'a green escape in an urban landscape, now withered and decayed'
      },
      {
        name: 'broken cobblestone street',
        description: 'weaving between decaying homes',
        explanation: 'a path once bustling with life, now eerily silent'
      },
      {
        name: 'collapsed townhouse entryway',
        description: 'a lonely doorframe standing',
        explanation: 'once a gateway to a home, now stands as a silent sentinel'
      },
      {
        name: 'boarded-up bakery',
        description: 'remnants of ovens and stale scents linger',
        explanation:
          'once filled with the delightful aroma of baked goods, now a shadow of its past'
      },
      {
        name: 'caved-in library',
        description: 'with torn pages and forgotten tales',
        explanation: 'a repository of knowledge and stories, now in ruins'
      }
    ]
  },
  'rubble-wrought makeshift village': {
    locations: [
      {
        name: 'collapsed tower',
        description: 'remnants of spiral stairs weaving up',
        explanation: 'a vantage point that once provided a view of the entire village'
      },
      {
        name: 'shattered well',
        description: 'with moss-covered stones and a frayed rope',
        explanation: 'a communal source of water, now in ruins'
      },
      {
        name: 'half-buried house',
        description: 'only the chimneys peeking above ground',
        explanation:
          'a residence once filled with laughter and warmth, now nearly swallowed by the earth'
      },
      {
        name: 'crumbled marketplace',
        description: 'scattered stalls and worn-out pathways',
        explanation: 'once the economic heart of the village, now lies in ruin'
      },
      {
        name: 'broken bridge',
        description: 'arching over a dried-up riverbed',
        explanation: 'a vital connector between parts of the village, now broken and impassable'
      },
      {
        name: 'dilapidated chapel',
        description: 'stained-glass fragments catching sunlight',
        explanation: 'a spiritual center for the village, now in a state of decay'
      },
      {
        name: 'fallen inn',
        description: 'where rotting beams hint at past merriment',
        explanation: 'a place of rest and community gathering, now desolate'
      },
      {
        name: 'devastated bakery',
        description: 'a rusted oven and ancient flour sacks',
        explanation: 'where delicious treats were once baked, now stands in ruin'
      },
      {
        name: 'toppled walls',
        description: 'with faded murals of village life',
        explanation: 'walls that once protected and adorned the village, now fallen'
      },
      {
        name: 'ruined smithy',
        description: 'an anvil still intact amid ash and cinder',
        explanation: 'where tools and weapons were forged, now cold and abandoned'
      },
      {
        name: 'fractured granary',
        description: 'scattered grains becoming new life',
        explanation: 'where the village stored its harvest, now scattered to the winds'
      },
      {
        name: 'sunken library',
        description: 'tattered books submerged in rain pools',
        explanation: 'a place of learning and reflection, now drowned in sorrow'
      }
    ]
  },
  'ancient arcology or fragment of it': {
    locations: [
      {
        name: 'vast central plaza',
        description: 'overgrown with nature reclaiming its space',
        explanation: 'once the heart of the arcology, now overtaken by nature'
      },
      {
        name: 'derelict greenhouse',
        description: 'with shattered domes letting in sunlight',
        explanation: 'where flora was nurtured and studied, now exposed and abandoned'
      },
      {
        name: 'crumbling transportation hub',
        description: 'remnants of tracks disappearing into rubble',
        explanation: 'a nexus of movement and trade, now stationary and silent'
      },
      {
        name: 'flooded subterranean chambers',
        description: 'with hints of once-held communal spaces',
        explanation: 'underground spaces for community gatherings, now submerged and forgotten'
      },
      {
        name: 'skeletal residential blocks',
        description: 'with empty window frames echoing past lives',
        explanation: 'homes that once held countless lives, now standing as hollow reminders'
      },
      {
        name: 'faded mural walls',
        description: 'where forgotten stories of harmony still linger',
        explanation: "artworks that once depicted the arcology's ideals and history"
      },
      {
        name: 'wind-whipped rooftop gardens',
        description: 'where hardy plants have taken root',
        explanation: 'spaces of greenery and relaxation, now wild and untamed'
      },
      {
        name: 'shattered energy core',
        description: 'with flickers of dormant power occasionally pulsing',
        explanation: "the heart of the arcology's power, now fractured and fading"
      },
      {
        name: 'decommissioned water filtration room',
        description: 'with dried pools and empty channels',
        explanation: 'once ensured clean water for all residents, now dry and desolate'
      },
      {
        name: 'fragmented marketplace',
        description: 'where silent stalls hint at once bustling trade',
        explanation: 'trade and commerce hub, now eerily silent'
      },
      {
        name: 'worn-out air purification center',
        description: 'with giant fans frozen in time',
        explanation: 'ensured clean air for the arcology, now still and quiet'
      },
      {
        name: 'collapsed vertical farm',
        description: 'with layers of once-lush vegetation turned skeletal',
        explanation: 'provided fresh produce for the community, now withered and decayed'
      }
    ]
  },
  'outpost of refugees or recluses': {
    locations: [
      {
        name: 'crumbling watchtower',
        description: 'offering a panoramic view of the surroundings',
        explanation:
          'served as a vantage point for the community, watching for dangers and visitors alike'
      },
      {
        name: 'overgrown herb garden',
        description: 'where rare medicinal plants thrive',
        explanation: "an essential source of healing and care for the outpost's residents"
      },
      {
        name: 'decaying library',
        description: 'with scattered books and forgotten lore',
        explanation: 'a repository of knowledge and wisdom, now fading into obscurity'
      },
      {
        name: 'hidden underground chamber',
        description: 'used for secretive meetings',
        explanation: 'a place where confidential matters and plans were discussed'
      },
      {
        name: 'worn-out communal hall',
        description: 'bearing marks of countless gatherings',
        explanation: 'where the community came together to celebrate, deliberate, and bond'
      },
      {
        name: 'collapsed infirmary',
        description: 'where healers once tended to the weak',
        explanation: 'a place of healing and recuperation for the injured and sick'
      },
      {
        name: 'weathered stone statues',
        description: 'symbols of guardians watching over the outpost',
        explanation: 'crafted in homage to protectors and guardians of the community'
      },
      {
        name: 'tattered living quarters',
        description: 'where memories of families linger',
        explanation: 'homes that once provided shelter and warmth to families of the outpost'
      },
      {
        name: 'ruined storage area',
        description: 'with remnants of preserved food and tools',
        explanation: 'where essential supplies and tools were stored for communal use'
      },
      {
        name: 'broken fountain',
        description: 'once a source of fresh water and tranquility',
        explanation: 'a symbol of prosperity and a meeting point for the community'
      },
      {
        name: 'isolated meditation alcove',
        description: 'for moments of solitude and reflection',
        explanation: 'a sanctuary for individuals seeking peace and introspection'
      },
      {
        name: 'abandoned workshop',
        description: 'filled with rusting tools of old crafts',
        explanation: "where skilled hands once crafted items essential for the outpost's survival"
      }
    ]
  },
  'sprawling slum of shanties and huts': {
    locations: [
      {
        name: 'collapsed hut',
        description: 'with torn fabric walls and a broken roof',
        explanation: 'once a shelter for families, now rendered uninhabitable'
      },
      {
        name: 'abandoned well',
        description: 'surrounded by empty buckets and ropes',
        explanation: 'a vital source of water for the community, now dry and deserted'
      },
      {
        name: 'charred cookfire',
        description: 'with scattered pots and half-burnt logs',
        explanation: 'a communal space for cooking and sharing meals, now cold and unused'
      },
      {
        name: 'deserted marketplace',
        description: 'with overturned stalls and faded wares',
        explanation: 'once a bustling hub of trade and commerce, now silent and abandoned'
      },
      {
        name: 'ruined bridge',
        description: 'with splintered wood and missing planks',
        explanation: 'a vital connection within the slum, now broken and impassable'
      },
      {
        name: 'dilapidated shrine',
        description: 'with faded icons and wilted flowers',
        explanation: 'a place of worship and reflection, its sanctity now faded'
      },
      {
        name: 'crumbled wall',
        description: 'with graffiti and remnants of posters',
        explanation: "bearing marks of the community's expressions, now slowly eroding away"
      },
      {
        name: 'shattered alley',
        description: 'with discarded tools and trash heaps',
        explanation: 'a byway of the slum, showing traces of daily life and activity'
      },
      {
        name: 'toppled watchtower',
        description: 'with a rusted bell and scattered bricks',
        explanation: 'once a lookout point for the community, now lying in ruins'
      },
      {
        name: 'deserted communal bath',
        description: 'with cracked basins and empty pitchers',
        explanation: 'a space for cleanliness and relaxation, now abandoned'
      },
      {
        name: 'hollowed-out storeroom',
        description: 'with spilled grains and gnawed baskets',
        explanation: 'where food and essentials were stored, now ravaged and empty'
      },
      {
        name: 'sunken boat',
        description: 'with tattered sails and algae-covered hull',
        explanation: 'once used for transport or fishing, now submerged and forgotten'
      }
    ]
  },
  'inhabited natural feature or cave': {
    locations: [
      {
        name: 'hidden alcove',
        description: 'remnants of moss-covered stone beds',
        explanation: 'a sheltered spot for rest and solitude within the cave system'
      },
      {
        name: 'collapsed tunnel',
        description: 'faint murals of ancient rituals',
        explanation: "a passage bearing marks of a civilization's history and beliefs"
      },
      {
        name: 'underwater grotto',
        description: 'skeletal remains of wooden docks',
        explanation: 'a submerged chamber that once facilitated trade or habitation'
      },
      {
        name: 'vast chamber',
        description: 'decayed pillars and a shattered altar',
        explanation: 'a central gathering or worship place now in ruins'
      },
      {
        name: 'narrow ledge',
        description: 'crumbling homes with views of abyss below',
        explanation: 'precarious dwellings that once offered breathtaking views of the depths'
      },
      {
        name: 'underground spring',
        description: 'rusted tools near abandoned wells',
        explanation: 'a fresh water source for inhabitants, marked by tools of its use'
      },
      {
        name: 'hollowed tree roots',
        description: 'traces of old campfires and pottery',
        explanation: 'a natural shelter turned dwelling, bearing signs of life and community'
      },
      {
        name: 'high ceiling cave',
        description: 'shattered crystal chandeliers swaying',
        explanation: 'a grand space adorned with artifacts, now in decay'
      },
      {
        name: 'petrified forest grove',
        description: 'remains of built-in tree dwellings',
        explanation: 'once-living trees turned homes, now preserved in time'
      },
      {
        name: 'ancient amphitheater',
        description: 'stone seats overgrown with ferns',
        explanation: 'a space for community gatherings and performances, reclaimed by nature'
      },
      {
        name: 'submerged passage',
        description: 'dilapidated wooden bridges rotting',
        explanation: 'once a route connecting parts of the cave, now underwater and decaying'
      },
      {
        name: 'lichen-covered sanctuary',
        description: 'ghostly statues in quiet prayer',
        explanation: 'a sacred space for reflection and worship, now silent and weathered'
      }
    ]
  },
  'grand fortress of major significance': {
    locations: [
      {
        name: 'crumbling watchtower',
        description: 'overlooking the distant horizon',
        explanation:
          'this tower served as a lookout, watching for threats and signaling the fortress'
      },
      {
        name: 'shattered drawbridge',
        description: 'with remnants of iron chains',
        explanation: "this once protected the fortress's entrance, only lowering for allies"
      },
      {
        name: 'once-grand throne room',
        description: 'weathered mosaics telling tales',
        explanation: 'this room was where the ruler held court and made crucial decisions'
      },
      {
        name: 'collapsed barracks',
        description: 'broken beds and rusted weapons',
        explanation: "this was where the fortress's soldiers rested and prepared for battle"
      },
      {
        name: 'dilapidated armory',
        description: 'with shelves of ancient armor pieces',
        explanation: 'this room stored weapons and armor, readying soldiers for war'
      },
      {
        name: 'overgrown courtyard',
        description: 'with statues eroded by time',
        explanation:
          'this open space was for gatherings, training, and honoring heroes with statues'
      },
      {
        name: 'battered dining hall',
        description: 'long tables and scattered utensils',
        explanation: "this hall fed the fortress's inhabitants, fostering unity during meals"
      },
      {
        name: 'forsaken library',
        description: 'decaying books of ancient knowledge',
        explanation: 'a trove of knowledge, this library held the collective wisdom of the fortress'
      },
      {
        name: 'broken-down gates',
        description: 'majestic insignias barely visible',
        explanation: "these gates symbolized the fortress's strength, bearing its insignias proudly"
      },
      {
        name: 'underground dungeon',
        description: 'cells with rusted locks and chains',
        explanation:
          "this grim space imprisoned foes and traitors, ensuring the fortress's security"
      },
      {
        name: 'desolate chapel',
        description: 'stained glass shards reflecting light',
        explanation:
          "a spiritual refuge, this chapel provided solace and guidance to the fortress's inhabitants"
      },
      {
        name: 'eroded walls',
        description: 'engraved with the stories of great battles',
        explanation: 'these walls protected the fortress and bore tales of its glorious past'
      }
    ]
  },
  'hidden bunker or strongpoint': {
    locations: [
      {
        name: 'collapsed entrance',
        description: 'obscured by overgrown vegetation',
        explanation: "this entrance provided stealthy access, now hidden by nature's reclaim"
      },
      {
        name: 'damp control room',
        description: 'with rusted levers and flickering lights',
        explanation: "this was the bunker's operational heart, coordinating its functions"
      },
      {
        name: 'shattered armory',
        description: 'with scattered weapons and broken lockers',
        explanation: "this space stored the bunker's defenses, ensuring its occupants' safety"
      },
      {
        name: 'echoey hallway',
        description: 'lined with remnants of old posters',
        explanation: 'this corridor connected rooms, with posters reminding of the outside world'
      },
      {
        name: 'generator chamber',
        description: 'silent with long-dead machinery',
        explanation: 'this chamber powered the bunker, ensuring its self-sufficiency'
      },
      {
        name: 'observation post',
        description: 'overlooking a decayed landscape',
        explanation: 'this post kept watch over the outside, alerting of threats and changes'
      },
      {
        name: 'sealed vault door',
        description: 'with faded symbols and a jammed wheel',
        explanation: "this door protected the bunker's most valuable assets, now sealed forever"
      },
      {
        name: 'mess hall',
        description: 'with broken tables and scattered utensils',
        explanation:
          "this space nourished the bunker's inhabitants, fostering community in isolation"
      },
      {
        name: 'waterlogged barracks',
        description: 'with moldy bunks and tattered flags',
        explanation: 'this space provided rest for the weary, now damp and forgotten'
      },
      {
        name: 'cracked watchtower',
        description: 'with a fallen ladder and shattered glass',
        explanation: "this tower offered a high vantage point, monitoring the bunker's surroundings"
      },
      {
        name: 'ventilation shaft',
        description: 'choked with debris and signs of nesting animals',
        explanation: 'this shaft brought fresh air, now blocked and home to wildlife'
      },
      {
        name: 'collapsed tunnel',
        description: 'blocked by rubble and dark shadows',
        explanation: 'this passage connected different sections, now blocked and inaccessible'
      }
    ]
  },
  'remote frontier keep': {
    locations: [
      {
        name: 'weathered battlement',
        description: 'with broken crenellations and moss',
        explanation: 'once a vantage point and defense, it now succumbs to nature and time'
      },
      {
        name: 'main gate',
        description: 'splintered with signs of a long-ago siege',
        explanation: 'this entry bore witness to battles, with scars of a bygone siege'
      },
      {
        name: 'crumbling tower',
        description: 'offering views of wild lands',
        explanation: 'a lookout point to spot threats, now a relic overlooking untamed lands'
      },
      {
        name: 'former armory',
        description: 'with rusted weapons and moth-eaten banners',
        explanation: "where weapons were kept ready, it's now a testament to decay and neglect"
      },
      {
        name: 'shattered great hall',
        description: 'with a collapsed roof and charred beams',
        explanation: 'once the heart of the keep, now lies in ruin, echoing past festivities'
      },
      {
        name: 'overgrown courtyard',
        description: 'with a dried-up well and scattered stones',
        explanation: 'a former gathering place, nature has reclaimed this once-busy space'
      },
      {
        name: 'forgotten dungeon',
        description: 'with damp cells and rusted shackles',
        explanation: "a grim reminder of the keep's dark past, it now lies silent and cold"
      },
      {
        name: "guard's barracks",
        description: 'with tattered beds and a silent hearth',
        explanation: "once housing the keep's defenders, it's now a desolate shell"
      },
      {
        name: 'collapsed chapel',
        description: 'with a fractured altar and faded frescoes',
        explanation: 'a place of worship and solace, now stands as a monument to forgotten faith'
      },
      {
        name: 'outer walls',
        description: 'with ivy climbing and stones scattered about',
        explanation:
          "these walls protected the keep, now they're but a shadow of their former strength"
      },
      {
        name: 'remains of stables',
        description: 'with rotting hay and ghostly echoes',
        explanation: 'horses and riders once filled this space, only memories remain'
      },
      {
        name: 'ruined library',
        description: 'with water-damaged books and broken shelves',
        explanation: 'a treasure trove of knowledge, now succumbs to dampness and neglect'
      }
    ]
  },
  'secret operations base': {
    locations: [
      {
        name: 'collapsed entrance',
        description: 'heavily guarded in its prime',
        explanation: 'the main access, it once saw guards and officials pass, now lies in ruin'
      },
      {
        name: 'deserted armory',
        description: 'scattered with empty weapon racks',
        explanation: 'once stocked with advanced weaponry, all that remains are empty racks'
      },
      {
        name: 'flooded interrogation chamber',
        description: 'with a single spotlight',
        explanation: 'a room of secrets and pain, now submerged and eerily lit'
      },
      {
        name: 'abandoned medical bay',
        description: 'surgical tools scattered about',
        explanation:
          'intended for healing, its tools now lie scattered, hinting at hurried desertion'
      },
      {
        name: 'concealed tunnel system',
        description: 'roots breaking through walls',
        explanation: 'these tunnels facilitated discreet movement, nature now breaches its secrecy'
      },
      {
        name: 'fire-damaged laboratory',
        description: 'mysterious vials left behind',
        explanation: 'once a hub of innovation, a fire seems to have halted its endeavors'
      },
      {
        name: 'dilapidated barracks',
        description: 'bunk beds now moss-covered',
        explanation: 'once housing operatives, the dampness and moss signal its desertion'
      },
      {
        name: 'underground bunker',
        description: 'with rusted metal doors',
        explanation: 'a safe retreat during threats, its doors now rusted shut'
      },
      {
        name: 'shattered control room',
        description: 'filled with archaic equipment',
        explanation: 'the nerve center of the base, now filled with obsolete technology'
      },
      {
        name: 'sealed vault',
        description: 'thick door pried halfway open',
        explanation:
          'holding secrets or valuables, its contents seem to have been forcibly accessed'
      },
      {
        name: 'isolated cell block',
        description: 'graffiti marking the walls',
        explanation: 'used to hold prisoners or test subjects, the graffiti hints at their stories'
      },
      {
        name: 'scorched mess hall',
        description: 'abandoned trays and dishes',
        explanation: 'once lively with conversation, now bears the scars of a sudden disaster'
      }
    ]
  },
  'isolated watchtower': {
    locations: [
      {
        name: 'crumbled entrance',
        description: 'with vines and weathered stones',
        explanation: 'once the main entryway, nature has now taken over its stony facade'
      },
      {
        name: 'broken spiral staircase',
        description: 'missing several steps',
        explanation: "leading to the tower's heights, many steps have been lost to time"
      },
      {
        name: 'collapsed roof section',
        description: 'with exposed beams and sky view',
        explanation: 'the topmost covering gave way, now offering an unobstructed view of the skies'
      },
      {
        name: 'charred guardroom',
        description: 'remnants of a fireplace and ash',
        explanation: 'a fire once raged here, leaving behind only remnants of a once-busy guardroom'
      },
      {
        name: 'shattered windows',
        description: 'with rusted iron frames hanging loosely',
        explanation: 'broken and battered by time, they barely hold the rusted iron frames'
      },
      {
        name: 'weathered stone walls',
        description: 'with faded inscriptions and graffiti',
        explanation:
          'these walls have seen many tales, from inscriptions to graffiti over the years'
      },
      {
        name: 'overgrown courtyard',
        description: 'with wildflowers and broken cobblestones',
        explanation: 'nature has reclaimed this once-paved space, making it a garden of wildflowers'
      },
      {
        name: 'forgotten armory',
        description: 'with rusted weapons and broken shields',
        explanation: "once storing the tower's defenses, the armory now lays in rusted disarray"
      },
      {
        name: 'dilapidated barracks',
        description: 'with rotten wooden bunks and torn fabric',
        explanation: 'where the guards once rested, time has left only decay'
      },
      {
        name: 'eroded parapet',
        description: 'with a panoramic view of the distant lands',
        explanation: 'a vantage point to see afar, it now offers a vista of the untouched lands'
      },
      {
        name: 'underground storage',
        description: 'with damp walls and remnants of provisions',
        explanation: 'where supplies were kept, dampness and time have taken their toll'
      },
      {
        name: 'moss-covered well',
        description: 'with a broken bucket and frayed rope',
        explanation: 'once a source of fresh water, it now stands unused and moss-covered'
      }
    ]
  },
  'battered front-line fortress': {
    locations: [
      {
        name: 'crumbled watchtower',
        description: 'overlooking a devastated landscape',
        explanation: 'it once stood vigilant, now it overlooks a land scarred by warfare'
      },
      {
        name: 'shattered barracks',
        description: 'with scattered weapons and armor',
        explanation: 'where soldiers once rested, now only remnants of war remain'
      },
      {
        name: 'broken stone wall',
        description: 'pocked with arrows and artillery impacts',
        explanation: "bearing the brunt of many sieges, it's marred with the memories of battles"
      },
      {
        name: 'underground tunnel',
        description: 'dark and partially collapsed',
        explanation: 'a secret path or escape, its safety is now compromised by its decay'
      },
      {
        name: 'war-torn courtyard',
        description: 'overgrown with weeds and wildflowers',
        explanation: "once a bustling hub, it now lies quiet, save for nature's reclaim"
      },
      {
        name: 'ruined armory',
        description: 'shelves empty and racks askew',
        explanation: "housing the fortress' weapons, it now stands desolate and ransacked"
      },
      {
        name: 'breached main gate',
        description: 'with splintered wood and rusty chains',
        explanation: 'the primary defense, it was eventually broken by besiegers'
      },
      {
        name: 'collapsed bridge',
        description: 'leading to a now unreachable tower',
        explanation: 'once connecting parts of the fortress, it now lies as a broken path'
      },
      {
        name: 'charred council room',
        description: 'with a half-burnt strategy table',
        explanation: 'where strategies were discussed, a fire seems to have disrupted its purpose'
      },
      {
        name: 'damaged moat',
        description: 'drained and filled with debris',
        explanation: 'a watery defense, it has been drained, likely by attackers to gain access'
      },
      {
        name: 'fallen guard post',
        description: 'next to the remnants of a drawbridge',
        explanation: 'guarding the drawbridge, it saw many an advancing enemy before its fall'
      },
      {
        name: 'shattered shrine',
        description: 'with faded murals and broken idols',
        explanation: "a place of solace and prayer, it too wasn't spared from warfare's wrath"
      }
    ]
  },
  'military training camp': {
    locations: [
      {
        name: 'crumbled watchtower',
        description: 'overlooking the entire camp',
        explanation:
          "this structure once allowed for an overview of training activities and ensured the camp's security"
      },
      {
        name: 'collapsed barracks',
        description: 'with rusty bunk beds scattered',
        explanation: 'where soldiers rested after rigorous training, now lies in ruin'
      },
      {
        name: 'overgrown obstacle course',
        description: 'ropes and wooden logs askew',
        explanation:
          "a testament to the physical training soldiers underwent, it now succumbs to nature's reclaim"
      },
      {
        name: 'remnants of a mess hall',
        description: 'broken tables and chairs',
        explanation: 'a gathering place for meals and camaraderie, now devoid of life'
      },
      {
        name: 'shattered armory',
        description: 'with pieces of armor and weapons',
        explanation:
          'once stocked with equipment for training and battle, it now stands empty and broken'
      },
      {
        name: 'weathered command tent',
        description: 'tattered maps still visible',
        explanation:
          "from where the camp's operations were directed, only faded remnants of plans remain"
      },
      {
        name: 'decayed medical tent',
        description: 'with rusted surgical tools',
        explanation:
          'a place of healing and care for the injured, it now houses only the ghosts of its past'
      },
      {
        name: 'remnants of a blacksmith forge',
        description: 'charred tools nearby',
        explanation: 'where weapons and tools were crafted and repaired, now lies dormant'
      },
      {
        name: 'abandoned training grounds',
        description: 'with faded target dummies',
        explanation:
          'the heart of the camp where soldiers honed their skills, now silent and unused'
      },
      {
        name: 'fallen wooden watchtowers',
        description: 'connected with frayed ropes',
        explanation:
          'these structures provided additional vantage points for overseeing the camp and its surroundings'
      },
      {
        name: "old quartermaster's store",
        description: 'scattered uniforms and badges',
        explanation: 'where supplies and uniforms were distributed, it now stands abandoned'
      },
      {
        name: 'deserted kennels',
        description: 'with chewed bones and empty chains',
        explanation:
          "once housing the camp's loyal guard dogs, only traces of their existence remain"
      }
    ]
  },
  'gatehouse controlling a vital pass': {
    locations: [
      {
        name: 'crumbling tower',
        description: 'overseeing the entire pass',
        explanation: 'a vital lookout point ensuring control and safety of the pass below'
      },
      {
        name: 'shattered drawbridge',
        description: 'with splintered wood and chains',
        explanation:
          'once the primary entry and exit point, it has been rendered unusable by time and conflict'
      },
      {
        name: 'moss-covered gate',
        description: 'half-sunken into the ground',
        explanation: 'this once grand entryway now succumbs to the weight of time and nature'
      },
      {
        name: 'tattered guard quarters',
        description: 'with remnants of old beds',
        explanation: 'home to the sentinels who once protected the pass, it now lies desolate'
      },
      {
        name: 'collapsed archway',
        description: 'etched with ancient symbols',
        explanation:
          'marking the grandeur and significance of the pass, it now stands as a relic of a bygone era'
      },
      {
        name: 'broken cobblestone road',
        description: 'leading up to the entrance',
        explanation: 'the main thoroughfare for travelers and merchants, now broken and treacherous'
      },
      {
        name: 'overgrown guard posts',
        description: 'slowly consumed by vegetation',
        explanation: 'strategically placed for defense, they are now being overtaken by nature'
      },
      {
        name: 'charred remains of a brazier',
        description: 'once bright and warm',
        explanation: 'provided light and warmth to the guards during cold nights'
      },
      {
        name: 'scattered weaponry',
        description: 'rusted and long abandoned',
        explanation: 'left behind from past skirmishes or simply forgotten, they now lay discarded'
      },
      {
        name: 'dilapidated stable',
        description: 'with decaying hay and stalls',
        explanation:
          'once sheltering the horses that carried travelers through the pass, it stands in neglect'
      },
      {
        name: 'ancient map room',
        description: 'with faded parchments on walls',
        explanation:
          'a room of strategy and planning, its importance is hinted at by the aged maps still adorning its walls'
      },
      {
        name: 'weathered battlements',
        description: 'overgrown with ivy and vines',
        explanation:
          "the primary defense against invaders, they now serve as a testament to the gatehouse's long history"
      }
    ]
  },
  'half-subterranean entrenchments': {
    locations: [
      {
        name: 'collapsed entranceway',
        description: 'overgrown with wild vines',
        explanation: 'once the main access to the entrenchments, nature has now reclaimed its hold'
      },
      {
        name: 'damp underground chamber',
        description: 'walls etched with battle marks',
        explanation: 'a space that bore witness to fierce battles, its walls tell tales of strife'
      },
      {
        name: 'shattered watchtower',
        description: 'only half standing',
        explanation: 'used to monitor enemy movement and give commands, it now stands broken'
      },
      {
        name: 'hidden storage alcove',
        description: 'filled with rusted weapons',
        explanation: 'a concealed space for storing vital weaponry, its contents now decayed'
      },
      {
        name: 'waterlogged trench',
        description: 'where puddles reflect the sky',
        explanation:
          'once teeming with soldiers, this trench now captures mere reflections of the past'
      },
      {
        name: 'crumbling command post',
        description: 'remnants of orders scattered about',
        explanation: 'from where strategies were devised and orders given, only fragments remain'
      },
      {
        name: 'barricaded medical bay',
        description: 'stained cots left abandoned',
        explanation:
          'a place for healing and respite, it bears stains of battles fought and lives lost'
      },
      {
        name: 'hollowed-out bunk space',
        description: 'with tattered sleeping rolls',
        explanation: 'soldiers once rested here, with only their worn sleeping rolls left behind'
      },
      {
        name: 'moss-covered artillery position',
        description: 'cannons silenced long ago',
        explanation: 'once a formidable defense point, the cannons now lay silent and forgotten'
      },
      {
        name: 'fragmented stone wall',
        description: 'hints of murals beneath the dust',
        explanation: 'a testament to the culture and pride of its creators, now eroded by time'
      },
      {
        name: 'sunken mess hall',
        description: 'with broken tables and benches',
        explanation: "where soldiers gathered for meals and camaraderie, it's now a silent relic"
      }
    ]
  },
  'military cache or storehouse': {
    locations: [
      {
        name: 'crumbled watchtower',
        description: 'overlooking the distant wilds',
        explanation:
          'once used for surveillance and protection, it now offers a view of reclaimed wilderness'
      },
      {
        name: 'moss-covered armory',
        description: 'shelves half-empty and rusting',
        explanation: 'a repository of weapons and armor, now succumbing to decay'
      },
      {
        name: 'dilapidated command tent',
        description: 'canvas faded and tattered',
        explanation: 'from where operations were overseen, only a tattered structure remains'
      },
      {
        name: 'sunken storage pit',
        description: 'filled with remnants of grain and cloth',
        explanation: 'vital supplies were stored here, but only traces now remain'
      },
      {
        name: 'fractured weapons rack',
        description: 'spears and swords scattered about',
        explanation:
          'once organized and ready for distribution, the weapons now lay scattered and forgotten'
      },
      {
        name: 'broken cart',
        description: 'wheels missing with traces of supply crates',
        explanation: 'used for transporting supplies, it has been rendered immobile by time'
      },
      {
        name: 'collapsed barracks',
        description: 'with bunk beds rotting away',
        explanation: 'once home to the soldiers guarding the cache, it now stands in ruin'
      },
      {
        name: 'decaying stable',
        description: 'remnants of old tack and hay',
        explanation:
          'shelter for the horses that transported supplies, only remnants hint at its past purpose'
      },
      {
        name: 'flooded trench',
        description: 'with rusting helmets and crossbows in the mud',
        explanation: 'a defensive trench now holds remnants of past skirmishes'
      },
      {
        name: 'shattered forge',
        description: 'anvil and tools coated in ash',
        explanation: 'where weapons were repaired and forged, it now lays dormant'
      },
      {
        name: 'barricaded tunnel entrance',
        description: 'timbers rotting and beams cracked',
        explanation: 'an access point to the storehouse, now blocked and decaying'
      },
      {
        name: 'crumbling stone walls',
        description: 'with arrow slits facing the horizon',
        explanation: 'once a formidable barrier, it now stands weakened by time'
      }
    ]
  },
  'battlefield littered with fortifications': {
    locations: [
      {
        name: 'collapsed stone watchtower',
        description: "remnants of a scout's vantage point",
        explanation:
          "once a sentinel's high point, it now lies in ruin, silent and watching no more"
      },
      {
        name: 'shattered wooden palisade',
        description: 'broken barriers from past skirmishes',
        explanation: 'once a strong defense, it has been ravaged by countless battles'
      },
      {
        name: 'charred command tent',
        description: 'blackened cloth and abandoned plans',
        explanation:
          'from where leaders once strategized, it stands as a testament to the flames of war'
      },
      {
        name: 'dilapidated trebuchet',
        description: 'wood and rope left to decay',
        explanation: 'a siege weapon of destruction, now left to the ravages of time'
      },
      {
        name: "cratered no man's land",
        description: 'ground scarred from arcane assaults',
        explanation: 'a reminder of the fierce magic that once roared across the battlefield'
      },
      {
        name: 'half-buried cannon',
        description: 'rusted barrels peeking through the dirt',
        explanation:
          'artillery that once thundered in battle, now silent and sinking into the earth'
      },
      {
        name: 'twisted wooden barricades',
        description: 'the last stand of desperate troops',
        explanation:
          'stand as a stark testament to the bravery of those who defended till their last breath'
      },
      {
        name: 'sunken trenches',
        description: 'muddy pathways once bustling with soldiers',
        explanation:
          'dug for protection, these trenches were once filled with the sounds of war, now silent and still'
      },
      {
        name: 'forgotten war camp',
        description: 'fire pits and abandoned equipment',
        explanation:
          'where troops once rested and readied, now all that remains are ghostly remnants'
      },
      {
        name: 'overgrown field hospital',
        description: "nature reclaiming the wounded's refuge",
        explanation:
          'a sanctuary of healing amidst the chaos of war, now overtaken by the forces of nature'
      },
      {
        name: 'ruins of a supply depot',
        description: 'scattered crates and empty barrels',
        explanation:
          'vital to sustain an army, its treasures have long since been plundered or decayed'
      },
      {
        name: 'breached stone walls',
        description: 'gaps where invaders once poured in',
        explanation:
          'once solid and impenetrable, they were broken by the relentless force of the enemy'
      }
    ]
  },
  'fortified waystation': {
    locations: [
      {
        name: 'crumbling watchtower',
        description: 'with panoramic views of the surrounding area',
        explanation:
          'from where the horizon was watched for friends or foes, it now offers a broken gaze'
      },
      {
        name: 'broken stone walls',
        description: 'remnants of a protective perimeter',
        explanation: 'they once stood as a bulwark against threats, now they stand fragmented'
      },
      {
        name: 'moss-covered barracks',
        description: 'with rusted bunk beds scattered',
        explanation: "once a soldier's resting place, nature has now staked its claim"
      },
      {
        name: 'dilapidated stables',
        description: 'with hay strewn and wooden beams exposed',
        explanation: 'once a shelter for the noble steeds, it now stands exposed and decaying'
      },
      {
        name: 'shattered armory',
        description: 'with bits of rusted weapons and armor',
        explanation: 'where weapons were once stored and maintained, only rust and remnants remain'
      },
      {
        name: 'sunken well',
        description: 'with cracked stones and dried-up base',
        explanation: 'a once vital source of water, it has now run dry and lies in neglect'
      },
      {
        name: 'overgrown kitchen',
        description: 'with a collapsed hearth and scattered utensils',
        explanation: 'where meals were once prepared for weary travelers, it now lies in ruin'
      },
      {
        name: 'caved-in storage',
        description: 'with remnants of food jars and cloth sacks',
        explanation: 'goods and supplies once stored here, now buried and forgotten'
      },
      {
        name: 'eroded training ground',
        description: 'with hints of weapon marks on stone',
        explanation: 'warriors once honed their skills here, but now it bears only silent scars'
      },
      {
        name: 'tumbledown gateway',
        description: 'with a weathered arch and wooden remains',
        explanation: 'once a grand entrance, it now stands worn and battered by time'
      },
      {
        name: 'weather-worn shrine',
        description: 'with faded symbols and offerings',
        explanation: 'a place of reverence and offerings, now eroded by the elements'
      },
      {
        name: 'skeletal remains of a tavern',
        description: 'with a hollow bar and broken mugs',
        explanation: 'once bustling with laughter and tales, only a skeletal structure remains'
      }
    ]
  },
  'illicit manufactory for illegal goods': {
    locations: [
      {
        name: 'crumbling brick kiln',
        description: 'with overgrown mossy walls',
        explanation: 'once a hub of production, the kiln has now succumbed to time and nature'
      },
      {
        name: 'charred storage shed',
        description: 'with half-opened crates inside',
        explanation:
          'fire once consumed this storage, leaving behind remnants of its illicit contents'
      },
      {
        name: 'rusted machinery room',
        description: 'with tangled conveyor belts',
        explanation: 'machinery that facilitated illegal production now lies dormant and decaying'
      },
      {
        name: 'moldy underground chamber',
        description: 'with rows of empty vats',
        explanation: 'deep underground, these vats once held secretive concoctions'
      },
      {
        name: 'collapsed wooden dock',
        description: 'protruding from a murky pond',
        explanation: 'goods were once discreetly loaded here, but the dock now lies in ruin'
      },
      {
        name: 'hidden alcove',
        description: 'with remnants of tattered curtains',
        explanation: 'a concealed space for discreet dealings, now exposed and deteriorating'
      },
      {
        name: 'broken-down wagon bay',
        description: 'with tracks leading away',
        explanation: 'the bay once facilitated the transport of illegal items, now it stands silent'
      },
      {
        name: 'caved-in entrance tunnel',
        description: 'with faint traces of footprints',
        explanation: 'a secret entrance now sealed, hinting at the many who once treaded its path'
      },
      {
        name: 'graffiti-covered office',
        description: 'with scattered paperwork',
        explanation: 'administrative center of the operation, now tagged by passersby'
      },
      {
        name: 'secluded test chamber',
        description: 'with strange apparatuses',
        explanation: 'experimental goods were tested here, leaving behind mysterious tools'
      },
      {
        name: 'overgrown greenhouse',
        description: 'with withered exotic plants',
        explanation:
          'exotic plants for illegal concoctions grew here, now withered and taken by nature'
      },
      {
        name: 'disused poison lab',
        description: 'with unlabelled vials on shelves',
        explanation:
          'potent substances were once brewed here, now they sit forgotten and potentially lethal'
      }
    ]
  },
  'mine or open pit for excavation': {
    locations: [
      {
        name: 'collapsed tunnel entrance',
        description: 'dark and foreboding',
        explanation:
          'an entrance that once echoed with the sound of pickaxes, now remains eerily silent'
      },
      {
        name: 'dilapidated mining office',
        description: 'papers scattered about',
        explanation: 'from where the operations were managed, now lies in disarray'
      },
      {
        name: 'fractured pit wall',
        description: 'streaks of minerals visible',
        explanation: 'the very heart of the mine, showcasing the treasures it once held'
      },
      {
        name: 'water-filled quarry',
        description: 'reflecting the sky above',
        explanation:
          'where minerals were once excavated, now holds still waters that mirror the heavens'
      },
      {
        name: 'abandoned machinery corner',
        description: 'gears and levers askew',
        explanation: 'machines that aided in excavation are now relics of a bygone era'
      },
      {
        name: 'derelict wooden elevator',
        description: 'ropes frayed and broken',
        explanation: 'once used to transport miners and ore, its function has long ceased'
      },
      {
        name: 'ventilation shaft opening',
        description: 'cool wind blowing through',
        explanation:
          'provided a breath of fresh air to the depths, now gusts freely without purpose'
      },
      {
        name: 'crumbling stone bridge',
        description: 'arching over a deep chasm',
        explanation: 'connected areas of the mine, now stands as a precarious relic'
      },
      {
        name: 'faded warning signs',
        description: 'words barely legible now',
        explanation: 'once cautioned miners of dangers, their warnings now barely discernible'
      },
      {
        name: 'ore processing area',
        description: 'with crushed stones and rusty sieves',
        explanation: "the heart of the mine's productivity, now rusted and silent"
      },
      {
        name: 'long-abandoned campsite',
        description: 'with tattered tents and fire pits',
        explanation: 'where miners once rested after long shifts, now stands as a ghostly camp'
      },
      {
        name: 'desolate watchtower',
        description: 'overlooking the expansive pit',
        explanation: 'provided a vantage point over the mine, now offers a view of its decay'
      }
    ]
  },
  'sacred shrine for holy product': {
    locations: [
      {
        name: 'grand entrance',
        description: 'adorned with broken statues',
        explanation:
          'this marked the grand gateway to the shrine, now marred by decay and desolation'
      },
      {
        name: 'collapsed cloister',
        description: 'overgrown with ivy',
        explanation: 'once a place of solitude and reflection, nature has now reclaimed its space'
      },
      {
        name: 'shattered altar',
        description: 'remnants of sacred symbols',
        explanation: 'the heart of the shrine where ceremonies were held, now lies in fragments'
      },
      {
        name: 'dilapidated library',
        description: 'scrolls and texts scattered',
        explanation:
          'knowledge and sacred texts were once safeguarded here, now they lie disarrayed'
      },
      {
        name: 'fractured observatory',
        description: 'aligned with ancient stars',
        explanation: 'used to study celestial patterns, now misaligned and broken'
      },
      {
        name: 'crumbling prayer rooms',
        description: 'with faded murals',
        explanation: 'devotees once sought solace here, its essence now faded with time'
      },
      {
        name: 'eroded fountain',
        description: 'where pure water once flowed',
        explanation: 'served as a symbol of purity, its waters have long dried up'
      },
      {
        name: 'sunken gardens',
        description: 'remnants of sacred herbs and plants',
        explanation: 'once bloomed with sacred flora, now overgrown and forgotten'
      },
      {
        name: 'toppled pillars',
        description: 'etched with lost languages',
        explanation: 'bearing inscriptions of ancient wisdom, they now lie fallen'
      },
      {
        name: 'ancient forge',
        description: 'tools and molds rusting away',
        explanation: 'where holy items were crafted, now consumed by rust'
      },
      {
        name: 'forgotten treasury',
        description: 'once glittering with offerings',
        explanation: 'gifts to the shrine now lay covered in dust and decay'
      },
      {
        name: 'ruined sanctuary',
        description: 'silent echoes of past sermons',
        explanation: 'where devotees gathered in reverence, now stands silent and desolate'
      }
    ]
  },
  'overgrown ancient plantation': {
    locations: [
      {
        name: 'grand entrance archway',
        description: 'overtaken by thick ivy',
        explanation: 'once a symbol of opulence, nature has now made its claim'
      },
      {
        name: 'dilapidated estate',
        description: 'roof mostly caved in',
        explanation:
          "the heart of the plantation now stands decaying, bearing witness to time's ravages"
      },
      {
        name: 'crumbled slave quarters',
        description: 'walls barely standing',
        explanation: "a grim reminder of the plantation's past, now stands crumbling"
      },
      {
        name: 'overgrown fields',
        description: "lost to nature's embrace",
        explanation: 'once cultivated with crops, now taken over by wild growth'
      },
      {
        name: 'moss-covered well',
        description: 'with an old rusted bucket chain',
        explanation: 'served as a vital water source, its utility long forgotten'
      },
      {
        name: 'rotting storage barn',
        description: 'doors hanging off hinges',
        explanation: 'where harvests were stored, now succumbs to rot and ruin'
      },
      {
        name: 'remnants of a smokehouse',
        description: 'blackened bricks scattered',
        explanation: 'used for preserving meats, now stands as a charred memory'
      },
      {
        name: 'choked fish pond',
        description: 'lily pads covering the surface',
        explanation: 'once teemed with aquatic life, now choked and stagnant'
      },
      {
        name: 'overgrown orchard',
        description: 'fruit trees gone wild',
        explanation: 'where fruits were cultivated, nature has reclaimed its bounty'
      },
      {
        name: 'broken-down windmill',
        description: 'blades no longer turning',
        explanation: 'once a source of power and production, its mechanisms have ceased'
      },
      {
        name: 'forgotten family graveyard',
        description: 'tombstones tilted',
        explanation: 'where generations were laid to rest, now stands neglected and weathered'
      },
      {
        name: 'sunken gazebo',
        description: 'vines climbing every pillar',
        explanation: 'a place of relaxation and respite, now consumed by thick vegetation'
      }
    ]
  },
  'destroyed camp or extraction site': {
    locations: [
      {
        name: 'collapsed tent',
        description: 'tattered from a past struggle',
        explanation: 'a shelter from the elements, its state suggests an abrupt abandonment'
      },
      {
        name: 'broken cart',
        description: 'laden with rusted mining tools',
        explanation: 'once used for transporting materials and tools, now lies in disrepair'
      },
      {
        name: 'scorched fire pit',
        description: 'surrounded by charred logs',
        explanation: 'where warmth and meals were once provided, a violent event has left its mark'
      },
      {
        name: 'shattered crates',
        description: 'contents spilling out',
        explanation:
          'used for storage, their broken state suggests haste or violence in their handling'
      },
      {
        name: 'overgrown excavation hole',
        description: 'tools scattered nearby',
        explanation: 'a site of active work, now overtaken by nature and left behind'
      },
      {
        name: 'toppled watchtower',
        description: 'wood splintered and decayed',
        explanation:
          'once a vantage point for overseeing operations, its fall hints at neglect or attack'
      },
      {
        name: 'deserted cooking area',
        description: 'blackened pots and pans',
        explanation: 'the heart of daily sustenance, now cold and left in disarray'
      },
      {
        name: 'frayed rope bridge',
        description: 'leading over a dried-up chasm',
        explanation: 'once a connector between areas, its state speaks to the dangers of crossing'
      },
      {
        name: 'mangled machinery',
        description: 'cogs and gears exposed',
        explanation: 'a symbol of industrial effort, now broken and exposed to the elements'
      },
      {
        name: 'spilled barrels',
        description: 'with remnants of oil or chemicals',
        explanation:
          'once containing vital or hazardous materials, their spillage poses environmental concerns'
      },
      {
        name: 'cracked water well',
        description: 'bucket lying beside it',
        explanation:
          'a source of hydration, its disuse suggests a more profound abandonment of the site'
      },
      {
        name: 'collapsed tunnel entrance',
        description: 'blocked with debris',
        explanation:
          'a gateway to underground depths, its blockage hints at potential dangers within'
      }
    ]
  },
  'managed woodland gone feral': {
    locations: [
      {
        name: 'overgrown orchard',
        description: 'trees heavy with wild fruit',
        explanation: 'once cultivated for harvest, nature has reclaimed its bounty'
      },
      {
        name: 'moss-covered statue',
        description: 'hidden among thick ivy',
        explanation: "a testament to human presence, now obscured by nature's embrace"
      },
      {
        name: 'tangled hedge maze',
        description: 'paths lost to thicket and thorn',
        explanation: "once a structure of leisure, it has become a labyrinth of nature's design"
      },
      {
        name: 'crumbling stone bridge',
        description: 'crossing a wild stream',
        explanation:
          "built to aid traversal, it now stands as a testament to nature's eroding power"
      },
      {
        name: "deserted caretaker's hut",
        description: 'with a collapsed roof',
        explanation: 'a dwelling for those tending to the land, its state implies long-term neglect'
      },
      {
        name: 'sunken garden pond',
        description: 'choked with lilies and reeds',
        explanation: "once a serene water feature, it's now overrun with unchecked growth"
      },
      {
        name: 'abandoned campsite',
        description: 'fire pit overgrown with ferns',
        explanation:
          'a resting place for travelers or workers, now reclaimed by the surrounding greenery'
      },
      {
        name: 'broken wooden benches',
        description: 'scattered among wildflowers',
        explanation: "once offering respite to visitors, they've succumbed to time and the elements"
      },
      {
        name: 'collapsed greenhouse',
        description: 'a jungle of its own creation',
        explanation: 'designed for controlled growth, it now houses untamed nature'
      },
      {
        name: 'forgotten stone well',
        description: 'surrounded by dense underbrush',
        explanation: "once a vital water source, it's been obscured by the wild growth around it"
      },
      {
        name: 'rotting log benches',
        description: 'fungi and moss claiming every inch',
        explanation: "once a rustic seating solution, they've become hosts to woodland life"
      },
      {
        name: 'stone path',
        description: 'mostly reclaimed by grass and roots',
        explanation: 'a trail leading through the woods, its path is now nearly indistinguishable'
      }
    ]
  },
  'inexplicable ancient manufactory': {
    locations: [
      {
        name: 'grand entrance hall',
        description: 'overtaken by creeping vines',
        explanation:
          'once the welcoming point of the manufactory, nature has now claimed its grandeur'
      },
      {
        name: 'vast foundry room',
        description: 'charred and smoke-streaked',
        explanation:
          'a place where metals were once melted and molded, bearing the scars of its intense operations'
      },
      {
        name: 'silent assembly line',
        description: 'scattered with unfinished mechanisms',
        explanation:
          'a production line where items were constructed, left mid-process and now silent'
      },
      {
        name: 'fractured glass observatory',
        description: 'offering panoramic decay views',
        explanation:
          'built for overseeing the entire manufactory, it now showcases the ravages of time'
      },
      {
        name: 'rusted storage vaults',
        description: 'doors slightly ajar',
        explanation: 'secure storage for valuable items or materials, now succumbing to decay'
      },
      {
        name: 'dilapidated worker’s quarters',
        description: 'with remnants of ancient meals',
        explanation:
          'living areas for those who labored here, offering glimpses into their daily lives'
      },
      {
        name: 'desolate testing chambers',
        description: 'with arcane markings',
        explanation:
          'rooms dedicated to experimenting with creations or materials, marked with symbols of unknown meaning'
      },
      {
        name: 'flooded cooling pools',
        description: 'shimmering with bioluminescent algae',
        explanation: 'once used to regulate temperature, now a haven for glowing life forms'
      },
      {
        name: 'shattered control room',
        description: 'with unrecognizable instruments',
        explanation: 'the operational heart of the manufactory, now broken and mysterious'
      },
      {
        name: 'petrified gardens',
        description: 'with metallic flora among stone',
        explanation:
          'a place of relaxation or study, where metal and nature merged in strange harmony'
      },
      {
        name: 'buried archives',
        description: 'sheets covered in indecipherable scripts',
        explanation: 'a repository of knowledge and records, now hidden and unreadable'
      },
      {
        name: 'derelict power core',
        description: 'emanating a faint hum',
        explanation:
          'once the energy source for the entire structure, still hinting at its dormant power'
      }
    ]
  },
  'farm for now-feral valuable beasts': {
    locations: [
      {
        name: 'collapsed barn',
        description: 'with broken stalls and claw marks',
        explanation: 'once a shelter for beasts, now bearing signs of their wild escape'
      },
      {
        name: 'overgrown pasture',
        description: 'with twisted fences and worn paths',
        explanation:
          'an open area for beasts to graze, now reclaimed by nature and marked by their activities'
      },
      {
        name: 'crumbled silo',
        description: 'with a gaping hole and scattered grains',
        explanation: 'storage for food supplies, now compromised and left to the elements'
      },
      {
        name: 'sunken water trough',
        description: 'covered in algae and half-filled',
        explanation: 'once a source of hydration for the beasts, now stagnant and untended'
      },
      {
        name: 'shattered training ground',
        description: 'with remnants of tools and chains',
        explanation: 'an area dedicated to taming or training the beasts, now broken and abandoned'
      },
      {
        name: "abandoned caretaker's hut",
        description: 'with torn books and a broken bed',
        explanation: 'a dwelling for those overseeing the farm, left hastily and in disrepair'
      },
      {
        name: 'flooded breeding pond',
        description: 'with eerie reflections and floating debris',
        explanation: 'a place for aquatic or amphibious beasts to breed, now still and haunting'
      },
      {
        name: 'cracked stone pen',
        description: 'with tufts of fur and scratched walls',
        explanation:
          'an enclosure to contain specific beasts, now showing signs of their restlessness'
      },
      {
        name: 'hidden underground den',
        description: 'with dark tunnels and eerie echoes',
        explanation: 'a subterranean habitat, now filled with the echoes of its former inhabitants'
      },
      {
        name: 'deserted medicinal hut',
        description: 'with spilled potions and tattered scrolls',
        explanation: "a place for healing and care, left in chaos as the farm's order broke down"
      },
      {
        name: 'neglected feeding station',
        description: 'with rotten leftovers and gnawed bones',
        explanation: 'where beasts were once fed, now a scene of decay and remnants of meals'
      },
      {
        name: 'shattered training ground',
        description: 'with remnants of tools and chains',
        explanation: 'an area dedicated to taming or training the beasts, now left in ruins'
      }
    ]
  },
  'outsider goods production site': {
    locations: [
      {
        name: 'collapsed control room',
        description: 'with shattered screens and buttons',
        explanation:
          "the central hub of operations, now a testament to the site's technological might that once was"
      },
      {
        name: 'dilapidated assembly line',
        description: 'with rusted robotic arms',
        explanation:
          'once a marvel of efficiency, this area mechanized the production process but now stands silent'
      },
      {
        name: 'abandoned storage area',
        description: 'with cracked containers and spills',
        explanation:
          'a depot for keeping raw materials or finished goods, now a scene of decay and disarray'
      },
      {
        name: 'sunken loading dock',
        description: 'half-submerged in water and moss',
        explanation:
          "where goods were once transported in and out, now overtaken by nature's reclaiming force"
      },
      {
        name: 'overgrown power core',
        description: 'with exposed wires and dim lights',
        explanation:
          'the beating heart that powered the entire site, now dimmed and tangled in green'
      },
      {
        name: 'ruined quality control lab',
        description: 'with broken devices and charts',
        explanation:
          "where products were tested for standards, now a silent witness to the site's dedication to perfection"
      },
      {
        name: 'decayed waste disposal pit',
        description: 'filled with odd materials',
        explanation: 'an eco-conscious initiative, now holding remnants of unfamiliar materials'
      },
      {
        name: 'faded mural wall',
        description: 'showing the outsiders and their tech',
        explanation:
          "a testament to the site's origins, illustrating the beings and tech that once thrived here"
      },
      {
        name: 'destroyed research hub',
        description: 'scattered with alien blueprints',
        explanation:
          'the epicenter of innovation, now holding the fragmented plans of alien advancements'
      },
      {
        name: 'shattered energy converters',
        description: 'with glints of crystal fragments',
        explanation:
          'once converted diverse energy sources, now broken and revealing its crystalline innards'
      },
      {
        name: 'overturned maintenance bay',
        description: 'with scattered tools and parts',
        explanation:
          'a dedicated space for repairs and upkeep, now in a state of upheaval and abandonment'
      },
      {
        name: 'derelict packaging sector',
        description: 'with shredded wrappings and boxes',
        explanation:
          'the final step in the production line, now littered with the remains of packaging materials'
      }
    ]
  },
  'repurposed ancient manufactory': {
    locations: [
      {
        name: 'shattered furnace',
        description: 'remnants of past fires',
        explanation: 'a once roaring chamber for smelting and molding, now cold and broken'
      },
      {
        name: 'broken conveyor belts',
        description: 'tangled and overgrown',
        explanation:
          'designed for efficient transport of goods within the factory, now a twisted mesh reclaimed by nature'
      },
      {
        name: 'collapsed storage silos',
        description: 'filled with forgotten materials',
        explanation:
          'tall structures used for bulk storage, now fallen and filled with remnants of yesteryears'
      },
      {
        name: 'rusted machinery room',
        description: 'gears frozen in time',
        explanation:
          'once housing the advanced machinery, now stands still with rusted gears and parts'
      },
      {
        name: "crumbled artisans' quarters",
        description: 'hints of past crafts',
        explanation:
          'living and working spaces for the craftsmen, now offering glimpses into their artisanal lives'
      },
      {
        name: 'waterwheel by a dried riverbed',
        description: 'eroded with age',
        explanation:
          'a relic of ancient power generation, standing by a river that has long since receded'
      },
      {
        name: 'moss-covered assembly floor',
        description: 'shadows of past projects',
        explanation:
          'the main production area, now layered in moss with traces of what was once crafted here'
      },
      {
        name: 'fractured statue courtyard',
        description: 'idols of forgotten masters',
        explanation:
          'a place of honor or reverence, now holding the broken figures of once-celebrated masters'
      },
      {
        name: 'hollowed-out inspection chambers',
        description: 'signs of quality checks',
        explanation:
          'rooms dedicated to ensuring product excellence, now empty yet marked by its rigorous past'
      },
      {
        name: 'repurposed forge area',
        description: 'tools scattered and abandoned',
        explanation:
          'once a bustling area of creation, refitted over the years but now left in disarray'
      },
      {
        name: 'tattered blueprint room',
        description: 'designs fading on ancient paper',
        explanation:
          'the repository of plans and designs, now deteriorating with the weight of time'
      },
      {
        name: 'overgrown loading docks',
        description: 'tracks leading to nowhere',
        explanation:
          'where products once embarked on their journey, now a quiet zone with tracks fading into oblivion'
      }
    ]
  },
  'magical production facility': {
    locations: [
      {
        name: "dilapidated mage's workshop",
        description: 'with scattered spell blueprints',
        explanation:
          'a place where skilled mages once crafted their spells, now littered with remnants of their knowledge'
      },
      {
        name: 'cracked mana reservoir',
        description: 'surrounded by arcane symbols',
        explanation:
          'a vital container that once stored magical energy, now broken and emanating faint magical resonances'
      },
      {
        name: 'overgrown herb garden',
        description: 'with faintly glowing plants',
        explanation:
          'a botanical haven for magical plants, whose radiance persists through the overgrowth'
      },
      {
        name: 'broken enchantment loom',
        description: 'with ethereal threads hanging loose',
        explanation:
          'a machine that wove magic into tangible forms, now malfunctioning with threads of ethereal energy hanging in disarray'
      },
      {
        name: 'shattered potion vats',
        description: 'dripping with residual elixirs',
        explanation:
          'containers that once held powerful concoctions, now leaking remnants of their former contents'
      },
      {
        name: 'rune-etched assembly line',
        description: 'halted in mid-process',
        explanation:
          'a production line enhanced with runes, that once produced magical items in succession, now frozen in time'
      },
      {
        name: 'collapsed summoning circle',
        description: 'with smudged sigils',
        explanation:
          'an area dedicated to calling forth entities or energies, its potency diminished by time and decay'
      },
      {
        name: 'rusting golem forge',
        description: 'still warm to the touch',
        explanation:
          'a forge specifically for creating golems, retaining some of its heat from an age-long past'
      },
      {
        name: 'decrepit spellbook library',
        description: 'with scattered torn pages',
        explanation:
          'a vast repository of magical knowledge, now in ruins with pages of wisdom strewn about'
      },
      {
        name: 'crumbling scroll preservation vault',
        description: 'emitting a musty magical aroma',
        explanation:
          'a secured area for keeping ancient scrolls safe, now giving off a scent of aging magic'
      },
      {
        name: 'toppled crystal tower',
        description: 'reflecting distorted magical auras',
        explanation:
          'a tower made of or housing crystals that amplified magic, now fallen and distorting the magical energies around it'
      },
      {
        name: 'fractured portal archway',
        description: 'humming with lost connections',
        explanation:
          'an entryway to other realms or places, still resonating with the echoes of its lost links'
      }
    ]
  },
  'fishery or salt extraction site': {
    locations: [
      {
        name: 'crumbling pier',
        description: 'once used for docking fishing boats',
        explanation:
          'a docking point for the fishing fleet, now decayed and reminiscent of a busier time'
      },
      {
        name: 'dilapidated huts',
        description: 'with remnants of drying racks',
        explanation:
          'shelters where fish were dried and prepared, now standing in neglect with vestiges of their function'
      },
      {
        name: 'salt-encrusted basin',
        description: 'a vast shallow evaporation pond',
        explanation:
          'an area dedicated to extracting salt from seawater, now crusted over and echoing its salty past'
      },
      {
        name: 'eroded warehouse',
        description: 'hints of barrels and crates inside',
        explanation:
          "a storage facility for the site's products, now worn down but hinting at its once vital role"
      },
      {
        name: 'broken stone paths',
        description: 'once bustling with workers',
        explanation: 'routes once trodden by busy workers, now fractured and silent'
      },
      {
        name: 'rusted metal tools',
        description: 'remnants of past fishery activities',
        explanation:
          "tools of the fishery trade, now oxidized and bearing witness to the site's productive days"
      },
      {
        name: 'overgrown canal',
        description: 'a former waterway for transportation',
        explanation: 'a channel that facilitated the movement of goods, now overrun by nature'
      },
      {
        name: 'sunken boat remains',
        description: 'half-buried in silt and sand',
        explanation: 'remnants of boats that once sailed here, now submerged and forgotten'
      },
      {
        name: 'weathered statue',
        description: 'a tribute to the salt goddess',
        explanation: 'a symbol of reverence to the deity of salt, now eroded by the elements'
      },
      {
        name: 'moss-covered steps',
        description: 'leading to a now-vanished shrine',
        explanation:
          'a pathway to a once sacred place, now overtaken by greenery and leading to absence'
      },
      {
        name: 'corroded iron gates',
        description: "once marking the facility's entrance",
        explanation:
          "the grand entry to the facility, now rusted and signifying the site's faded glory"
      },
      {
        name: 'collapsed wooden bridges',
        description: 'spanning dried-up channels',
        explanation:
          'bridges that once connected parts of the facility, now fallen and spanning voids'
      }
    ]
  },
  'lost pilgrimage destination': {
    locations: [
      {
        name: 'weathered stone archway',
        description: 'remnants of the main entrance',
        explanation: 'once the grand gateway for pilgrims, now standing worn and forgotten'
      },
      {
        name: 'collapsed bell tower',
        description: 'its bronze bell half-buried',
        explanation:
          'a tower that once signaled prayer times, now in ruins with its bell concealed in the earth'
      },
      {
        name: 'moss-covered shrine',
        description: 'with faint inscriptions and candles',
        explanation:
          'a place of reverence and offerings, now draped in moss and whispers of past devotions'
      },
      {
        name: 'overgrown pathway',
        description: 'stones worn from countless footsteps',
        explanation: 'a trail trodden by numerous pilgrims over the years, now claimed by nature'
      },
      {
        name: 'dried-up sacred spring',
        description: 'where crystalline waters once flowed',
        explanation:
          'a source of pure water believed to hold sacred properties, now devoid of its life-giving essence'
      },
      {
        name: 'shattered stained glass',
        description: 'scattered amidst tall grasses',
        explanation:
          'once a colorful spectacle portraying religious tales, now broken and lost to the meadow'
      },
      {
        name: 'crumbled lodgings',
        description: 'with remnants of old bedding and gear',
        explanation:
          'shelters for weary travelers on their spiritual journey, now reduced to debris'
      },
      {
        name: 'decaying library',
        description: 'scrolls and scriptures deteriorating',
        explanation: 'a repository of sacred teachings, now decaying and losing its wisdom to time'
      },
      {
        name: 'ruined altar',
        description: 'once adorned with gold and jewels',
        explanation:
          'the epicenter of rituals and offerings, now desolate and stripped of its former grandeur'
      },
      {
        name: 'broken stone bridge',
        description: 'which once spanned a rushing river',
        explanation:
          'a bridge facilitating the journey of pilgrims, now broken and unable to connect both sides'
      },
      {
        name: 'forsaken garden',
        description: 'with dried plants and a cracked statue',
        explanation:
          'once a tranquil space for reflection, now abandoned and showing signs of decay'
      },
      {
        name: 'fragmented mural wall',
        description: 'tales of pilgrimage barely discernible',
        explanation:
          'a canvas that once vividly depicted pilgrimage tales, now fragmented and almost unreadable'
      }
    ]
  },
  'fortified frontier monastery': {
    locations: [
      {
        name: 'ancient chapel',
        description: 'with fragmented stained glass',
        explanation: 'a sacred place of worship, now worn and its colorful windows shattered'
      },
      {
        name: 'moss-covered courtyard',
        description: 'with a dried-up fountain',
        explanation: 'once the heart of the monastery, now overgrown and its fountain parched'
      },
      {
        name: 'broken stone walls',
        description: 'once a protective barrier',
        explanation:
          'the defensive walls that shielded the monastery, now broken and no longer offering protection'
      },
      {
        name: 'decaying library',
        description: 'with scattered parchments',
        explanation:
          'a place where knowledge was stored and shared, now deteriorating with texts scattered around'
      },
      {
        name: 'overgrown herb garden',
        description: 'hinting at medicinal plants',
        explanation:
          'a garden dedicated to medicinal herbs, now overgrown but hinting at its healing past'
      },
      {
        name: 'shattered brewery',
        description: 'with old fermenting barrels',
        explanation:
          'where monks brewed their own beverages, now in ruins with aged barrels hinting at their craft'
      },
      {
        name: 'collapsed granary',
        description: 'remnants of stored grains',
        explanation:
          "a storage for the monastery's grain supplies, now collapsed and its contents spilled out"
      },
      {
        name: 'exposed scriptorium',
        description: 'inkwells dried and quills scattered',
        explanation:
          'a space dedicated to the art of writing, now exposed to the elements with its tools abandoned'
      },
      {
        name: 'battered armory',
        description: 'with remnants of monk-made weapons',
        explanation:
          'a place where monks stored their weapons, now worn and showcasing the remnants of their craftsmanship'
      },
      {
        name: 'sunken treasury',
        description: 'hinting at lost relics and coins',
        explanation:
          "where the monastery's treasures were kept, now sunken and giving hints of its lost riches"
      },
      {
        name: 'overthrown dining hall',
        description: 'long tables overturned',
        explanation:
          'a communal space for meals and gatherings, now in disarray with its tables turned over'
      },
      {
        name: 'abandoned infirmary',
        description: 'with empty vials and bandages',
        explanation:
          'a healing place for the sick and injured, now deserted with empty containers and used bandages'
      }
    ]
  },
  'tomb of some mighty ancient': {
    locations: [
      {
        name: 'vast entrance hall',
        description: 'lined with towering statues',
        explanation:
          'a grand welcoming area for the visitors, now stands in silent testament with imposing statues watching over'
      },
      {
        name: 'grand ceremonial chamber',
        description: 'with an ornate, shattered altar',
        explanation: 'a space for rituals and ceremonies, now with its core altar in ruins'
      },
      {
        name: 'crumbling library',
        description: 'with tattered scrolls and parchments',
        explanation:
          'a repository of knowledge and history, now decaying with remnants of its precious contents'
      },
      {
        name: 'winding underground passages',
        description: 'filled with traps and enigmas',
        explanation:
          'complex tunnels built to safeguard the tomb, now a perilous maze for any intruder'
      },
      {
        name: 'echoing burial chamber',
        description: 'where an empty sarcophagus lies',
        explanation:
          'the heart of the tomb, where the ancient was supposed to rest, now lies desolate with its main artifact empty'
      },
      {
        name: 'sunken garden courtyard',
        description: 'overgrown with thorny vines',
        explanation: 'once a tranquil resting place, now overtaken by wild growth'
      },
      {
        name: 'collapsed treasury',
        description: 'with scattered coins and broken jewels',
        explanation:
          "a storage of the ancient's immense wealth, now in ruins with its treasures strewn about"
      },
      {
        name: 'mural-adorned antechamber',
        description: 'with fading depictions of battles',
        explanation:
          "a room showcasing the ancient's conquests and glory, now slowly fading with time"
      },
      {
        name: 'submerged catacombs',
        description: 'filled with stagnant water and bones',
        explanation:
          'the resting place for the lesser known, now flooded and filled with remnants of the past'
      },
      {
        name: 'overgrown ritual pool',
        description: 'with faintly glowing inscriptions',
        explanation:
          'a sacred place for rituals involving water, now wild and with its magical inscriptions barely visible'
      },
      {
        name: 'fractured hall of heroes',
        description: 'with statues missing heads and limbs',
        explanation:
          'a gallery honoring the great warriors, now in disrepair with its statues mutilated'
      },
      {
        name: 'maze-like underground labyrinth',
        description: 'with walls marked by scratches',
        explanation:
          'a confusing maze built as a defense or for some ancient game, now marked with the desperation of those who got lost within'
      }
    ]
  },
  'prison-monastery for heretics': {
    locations: [
      {
        name: 'sunken atrium',
        description: 'with faded mosaics of judgment',
        explanation:
          'the central gathering area, once adorned with vivid mosaics showcasing the fate of the heretics, now faded'
      },
      {
        name: 'forgotten cells',
        description: 'lined with rusty shackles',
        explanation:
          'small chambers where heretics were imprisoned, now stands silent but still bearing the signs of past torment'
      },
      {
        name: 'fortress-like outer walls',
        description: 'still standing tall and imposing',
        explanation:
          'the protective barrier of the monastery, still reflecting its strength and grandeur'
      },
      {
        name: 'dim underground dungeons',
        description: 'damp with the echoes of despair',
        explanation:
          'where the most dangerous heretics were kept, now a silent, eerie place echoing with the past'
      },
      {
        name: 'moss-covered dining hall',
        description: 'with broken wooden tables',
        explanation:
          'where inmates once ate their meager meals, now abandoned and overtaken by moss'
      },
      {
        name: 'walled courtyard',
        description: 'with a solitary, gnarled tree',
        explanation: 'a minimal outdoor space for inmates, now dominated by a single old tree'
      },
      {
        name: 'secluded scriptorium',
        description: 'with scattered parchments and quills',
        explanation: 'a place where sacred or forbidden texts were copied, now in disarray'
      },
      {
        name: 'eerie ossuary',
        description: 'filled with neatly stacked bones',
        explanation:
          "a chamber where the bones of the dead were kept, now an unsettling reminder of the monastery's dark past"
      },
      {
        name: 'confessional chambers',
        description: 'with heavy wooden doors and partitions',
        explanation:
          'rooms where heretics were expected to confess, now silent with its heavy doors bearing witness to past secrets'
      },
      {
        name: 'rotting infirmary',
        description: 'with remnants of old medicines',
        explanation:
          'a place where the sick were treated, now decaying with remnants of its healing past'
      },
      {
        name: 'overgrown courtyard',
        description: 'with remnants of a guillotine',
        explanation:
          'an outdoor space where executions took place, now overgrown but still hinting at its grim history'
      },
      {
        name: 'shattered library',
        description: 'filled with burnt scriptures',
        explanation:
          'where sacred and forbidden texts were stored, now destroyed with signs of a deliberate attempt to erase knowledge'
      }
    ]
  },
  'shrine repurposed for a newer god': {
    locations: [
      {
        name: 'ancient altar',
        description: 'scarred by recent sacrifices',
        explanation: 'an old place of worship, now marked by signs of more recent rituals'
      },
      {
        name: 'crumbled archway',
        description: 'with unfamiliar symbols etched',
        explanation: 'once a grand entrance, now marred with symbols of a newer faith'
      },
      {
        name: 'forgotten prayer chamber',
        description: 'filled with fresh candles',
        explanation: 'a place once abandoned, now seeing renewed use for prayers'
      },
      {
        name: 'moss-covered statue',
        description: 'with a different head attached',
        explanation: 'an old idol repurposed to represent a new deity'
      },
      {
        name: 'eroded fountain',
        description: 'now filled with fresh water and petals',
        explanation: 'a once-dry fountain, now revived and used in recent worship'
      },
      {
        name: 'worn-out mosaic floor',
        description: 'patched with recent tiles',
        explanation: 'a floor showcasing the transition between the old and new faiths'
      },
      {
        name: 'dusty reliquary',
        description: 'containing new sacred objects',
        explanation: 'a storage for relics, now housing objects from the newer faith'
      },
      {
        name: 'overgrown garden',
        description: "pruned to depict the new god's symbols",
        explanation: 'nature retaking a sacred space, but recently manicured to honor the new deity'
      },
      {
        name: 'fallen obelisk',
        description: 'with a new idol erected beside',
        explanation: 'the remnants of the past beside a new symbol of worship'
      },
      {
        name: 'derelict stone circle',
        description: 'with a central altar for the new god',
        explanation: 'an old ritual site, now centered around the newer god'
      }
    ]
  },
  'fragment of megastructure temple': {
    locations: [
      {
        name: 'vast stone entrance',
        description: 'overgrown with ivy and moss',
        explanation: 'a once-grand gateway to the temple, now reclaimed by nature'
      },
      {
        name: 'crumbling altar',
        description: 'flanked by ancient monoliths',
        explanation: 'a place for ancient ceremonies, surrounded by massive standing stones'
      },
      {
        name: 'toppled giant statue',
        description: 'half-buried in the sand',
        explanation:
          'an enormous representation of a deity, now fallen and consumed by the environment'
      },
      {
        name: 'sunken ceremonial pool',
        description: 'reflecting fragmented sky',
        explanation:
          'a place for ritualistic cleansing or offerings, now showing a shattered reflection of the heavens'
      },
      {
        name: 'shattered glass walkway',
        description: 'suspended above a chasm',
        explanation: 'once a marvel of engineering, now a dangerous path over a void'
      },
      {
        name: 'ruined observatory',
        description: 'with a rusted and misaligned telescope',
        explanation: 'a place for studying the heavens, now in disrepair and misalignment'
      },
      {
        name: 'overgrown labyrinth',
        description: 'walls marked with faded glyphs',
        explanation: 'a complex maze, with ancient symbols hinting at its purpose or lore'
      },
      {
        name: 'fragmented mosaic floor',
        description: 'depicting a cosmic event',
        explanation: 'a grand artwork showcasing a significant celestial event from the past'
      },
      {
        name: 'abandoned library',
        description: 'with tattered remnants of scriptures',
        explanation:
          'a repository of knowledge and wisdom, now in ruins with the remnants of its contents'
      },
      {
        name: 'stone bridge in ruins',
        description: 'leading to a severed section',
        explanation: 'a pathway to another part of the temple, now broken and inaccessible'
      },
      {
        name: 'desolate plaza',
        description: 'with patterns of inlaid gemstones',
        explanation:
          'a grand open space, its floor decorated with precious stones in intricate patterns'
      },
      {
        name: 'ancient tree',
        description: 'roots entwined with ruined walls',
        explanation:
          'a testament to the passage of time, this tree has integrated with the very structure of the temple'
      }
    ]
  },
  'inexplicable sacred structure': {
    locations: [
      {
        name: 'crumbling stone altar',
        description: 'overgrown with wildflowers',
        explanation: 'once a place of rituals, nature has reclaimed its space'
      },
      {
        name: 'eerie underground chamber',
        description: 'with walls covered in cryptic symbols',
        explanation:
          'a secret place of worship or ceremony, its purpose obscured by time and mysterious inscriptions'
      },
      {
        name: 'fallen pillars',
        description: 'wrapped in ivy and echoing past splendor',
        explanation:
          'once standing tall, these pillars hint at the former grandeur of the structure'
      },
      {
        name: 'fragmented statue of a forgotten deity',
        description: 'staring blankly',
        explanation: 'an effigy of a deity long forgotten, its features weathered by time'
      },
      {
        name: 'weathered obelisk',
        description: 'inscribed with unreadable scripts',
        explanation:
          'a monolithic stone bearing inscriptions, its message now lost to erosion and time'
      },
      {
        name: 'sunken ceremonial plaza',
        description: 'encircled by ancient trees',
        explanation: 'once a gathering place for rituals, nature has since encroached upon it'
      },
      {
        name: 'cracked frescoes',
        description: 'colors faded but stories faintly visible',
        explanation: 'wall paintings that tell tales of old, their narrative barely discernible now'
      },
      {
        name: 'labyrinthine catacombs',
        description: 'echoing with ghostly whispers',
        explanation:
          'underground burial chambers, their passages twisted and echoing with the sounds of the past'
      },
      {
        name: 'isolated grotto',
        description: 'with remnants of votive offerings',
        explanation:
          'a secluded spot for private worship or offerings, now left with only remnants of its past use'
      },
      {
        name: 'ancient scriptorium',
        description: 'with scattered pages of lost prayers',
        explanation:
          'a place where religious texts were written and stored, now in ruins with pages of prayers scattered'
      }
    ]
  },
  'place of some holy trial or test': {
    locations: [
      {
        name: 'shattered altar',
        description: 'split in half from a divine strike',
        explanation: 'an altar broken by some divine force, marking a significant event or judgment'
      },
      {
        name: 'moss-covered statues',
        description: 'hands outstretched in silent supplication',
        explanation: 'statues that seem to plea or pray, covered in the patina of time'
      },
      {
        name: 'crumbling amphitheater',
        description: 'with half-eroded stone steps',
        explanation: 'a venue for gatherings or trials, its features now fading'
      },
      {
        name: 'overgrown courtyard',
        description: 'marked by a labyrinth of stones',
        explanation:
          'once a place for reflection or trials, now consumed by nature and its labyrinthine patterns'
      },
      {
        name: 'eroded murals',
        description: 'faintly depicting celestial beings',
        explanation: 'artworks showcasing divine entities or stories, their details now fading'
      },
      {
        name: 'stagnant pool',
        description: 'once a source of sanctified water',
        explanation: 'a pool used for rituals, its waters now still and unsanctified'
      },
      {
        name: 'secluded grove',
        description: 'with remnants of ritualistic circles',
        explanation:
          'a natural space used for rituals or ceremonies, hints of its use still visible'
      },
      {
        name: 'decaying library',
        description: 'scattered with moldy holy texts',
        explanation:
          'a repository of sacred knowledge, now in decline and mold taking over the once revered texts'
      },
      {
        name: 'dilapidated sanctum',
        description: 'choked with vines and age',
        explanation: 'a private or sacred space, now overtaken by the weight of time and nature'
      },
      {
        name: 'fragmented archways',
        description: 'leading to once-hidden chambers',
        explanation: 'entrances to secret or sacred chambers, now exposed and in ruins'
      },
      {
        name: 'fallen pillars',
        description: 'each representing a virtue to be tested',
        explanation: 'pillars symbolizing virtues or challenges, now toppled and strewn'
      },
      {
        name: 'dry fountains',
        description: 'adorned with angelic figures in lament',
        explanation:
          'fountains that once flowed, their decorative angels now mourning their dry state'
      }
    ]
  },
  'outsider fane to an alien god': {
    locations: [
      {
        name: 'shattered altar',
        description: 'once the focal point of worship',
        explanation: 'this was where the alien god was revered and offerings were placed'
      },
      {
        name: 'twisted obelisk',
        description: 'inscribed with strange glyphs',
        explanation: 'a mysterious stone pillar bearing cryptic symbols of extraterrestrial origin'
      },
      {
        name: 'sunken chamber',
        description: 'filled with iridescent pools',
        explanation:
          'a submerged room containing shimmering waters that reflect alien constellations'
      },
      {
        name: 'fragmented mosaic',
        description: 'depicting otherworldly constellations',
        explanation: 'a broken piece of art that once showcased star patterns from a distant galaxy'
      },
      {
        name: 'collapsed archway',
        description: 'made of an unfamiliar black stone',
        explanation: 'a fallen entryway constructed from a material not of this world'
      },
      {
        name: 'eerie silent grove',
        description: 'with bioluminescent flora',
        explanation: 'a quiet forest area where plants emit their own alien glow'
      },
      {
        name: 'hollowed shrine',
        description: 'housing melted alien artifacts',
        explanation:
          'a sacred space containing remnants of items from another world, now deformed by unknown forces'
      },
      {
        name: 'towering spire',
        description: 'resonating a low hum when approached',
        explanation: 'a tall structure that emits an otherworldly sound as one nears it'
      },
      {
        name: 'labyrinthine tunnels',
        description: 'walls pulsating softly to touch',
        explanation:
          'a maze of passageways whose walls seem alive and respond to touch with a gentle throbbing'
      },
      {
        name: 'fractured statue',
        description: 'resembling a being of many limbs and eyes',
        explanation:
          'a broken effigy of a multi-limbed, multi-eyed entity, hinting at the alien nature of its deity'
      },
      {
        name: 'stone circle',
        description: 'where the ground vibrates with unknown energy',
        explanation:
          'a ring of stones that emits an unexplained energy causing the earth to tremble'
      },
      {
        name: 'darkened pit',
        description: 'emitting a cold, otherworldly breeze',
        explanation:
          'a deep hole from which emanates a chilling wind, suggesting a connection to another realm or dimension'
      }
    ]
  },
  'prison for a sealed demonic force': {
    locations: [
      {
        name: 'cracked obsidian cell',
        description: 'radiating malevolent energy',
        explanation: 'it once contained a powerful demon that was sealed away'
      },
      {
        name: 'muted summoning circle',
        description: 'barely glowing runes on the ground',
        explanation: 'ancient mages used this to trap and imprison the force'
      },
      {
        name: 'chain web chamber',
        description: 'chains spanning the entire room',
        explanation: "designed to bind and suppress the entity's strength"
      },
      {
        name: 'warded gates',
        description: 'with faded protection glyphs',
        explanation: 'served as barriers to keep the entity confined'
      },
      {
        name: "forgotten watcher's post",
        description: 'overlooking the prison grounds',
        explanation: 'guards once kept a vigilant eye for any disturbances'
      },
      {
        name: 'collapsed ritual site',
        description: 'candles and talismans scattered',
        explanation: "used by priests to strengthen the prison's wards"
      },
      {
        name: 'broken demon cage',
        description: 'charred and twisted metal bars',
        explanation: "a smaller prison for the demon's lesser minions"
      },
      {
        name: 'sealed portal room',
        description: 'doorway that leads to void',
        explanation: 'an entrance to the prison, now magically locked'
      },
      {
        name: 'withered guardian statues',
        description: 'stone figures with weapons poised',
        explanation: 'enchanted to come to life if the prison was breached'
      },
      {
        name: 'desolate courtyard',
        description: 'overgrown with thorny vines',
        explanation: 'where prison staff once congregated and rested'
      },
      {
        name: 'ritual tool storage',
        description: 'dusty shelves with scattered instruments',
        explanation: 'held items needed for sealing ceremonies'
      },
      {
        name: 'moldy dungeon',
        description: 'walls etched with frantic symbols',
        explanation:
          'a dank holding area, its walls marked by desperate carvings from former prisoners or captors'
      },
      {
        name: "echoing warden's quarters",
        description: 'abandoned with hints of a hurried exit',
        explanation: "where the prison's overseer once resided"
      },
      {
        name: 'echoing cavern',
        description: 'with stalactites dripping a viscous fluid',
        explanation:
          'a natural cave within the prison where dripping formations release a mysterious substance'
      },
      {
        name: 'fragmented armory',
        description: 'rusted armor scattered about',
        explanation:
          'a storage for weapons and protective gear, now broken and with decaying equipment'
      },
      {
        name: 'charred council chamber',
        description: 'ash settling on ancient seats',
        explanation:
          'a room where decisions were made regarding the prison, now scorched and abandoned'
      }
    ]
  },
  'pilgrim hospital or waystation': {
    locations: [
      {
        name: "crumbled healer's hut",
        description: 'left with medicinal herbs and tools',
        explanation: 'where wounded pilgrims received care'
      },
      {
        name: "collapsed traveler's shelter",
        description: 'with remnants of old campfires',
        explanation: 'a resting spot for weary travelers'
      },
      {
        name: 'broken stone well',
        description: 'once a source of fresh water',
        explanation: 'pilgrims drank and replenished here'
      },
      {
        name: 'faded mural chamber',
        description: 'walls depicting a sacred journey',
        explanation: 'served to inspire and guide pilgrims'
      },
      {
        name: 'deserted inn rooms',
        description: 'with straw mattresses and blankets',
        explanation: 'where pilgrims could rest for the night'
      },
      {
        name: 'overgrown meditation garden',
        description: 'peaceful, even in its decay',
        explanation: 'a place for reflection and prayer'
      },
      {
        name: 'forgotten food storage',
        description: 'barrels and pots now empty',
        explanation: 'held provisions for hungry travelers'
      },
      {
        name: 'ruined shrine',
        description: 'with a cracked deity statue',
        explanation: 'pilgrims offered prayers for a safe journey'
      },
      {
        name: "abandoned caretaker's dwelling",
        description: 'dusty and silent',
        explanation: "the home of the waystation's keeper"
      },
      {
        name: 'shattered stone pathway',
        description: 'leading through the grounds',
        explanation: 'once walked upon by countless pilgrims'
      },
      {
        name: 'cracked pool of reflection',
        description: 'stagnant water with floating leaves',
        explanation: 'a place for cleansing and contemplation'
      },
      {
        name: 'worn-out stables',
        description: 'with hay and broken tools',
        explanation: "sheltered pilgrims' mounts and beasts of burden"
      }
    ]
  },
  'holy archive or relic-fortress': {
    locations: [
      {
        name: 'fragmented relic chamber',
        description: 'shattered display cases and pedestals',
        explanation: 'once housed revered sacred artifacts'
      },
      {
        name: 'decayed manuscript room',
        description: 'papers and scrolls strewn about',
        explanation: 'a repository for holy texts and writings'
      },
      {
        name: 'crumbled guardian barracks',
        description: 'abandoned armors and weapons',
        explanation: "living quarters for the fortress's defenders"
      },
      {
        name: 'collapsed prayer hall',
        description: 'benches and faded murals',
        explanation: 'where the devout came to worship'
      },
      {
        name: 'ruined relic forge',
        description: 'cold anvil and scattered tools',
        explanation: 'used to repair and maintain sacred artifacts'
      },
      {
        name: 'forgotten treasury',
        description: 'empty chests and broken lock mechanisms',
        explanation: 'where offerings and donations were stored'
      },
      {
        name: 'deteriorated study chambers',
        description: 'desks with quills and ink pots',
        explanation: 'where scholars studied sacred texts'
      },
      {
        name: "deserted overseer's office",
        description: 'papers and seals of authority',
        explanation: "the heart of the fortress's administration"
      },
      {
        name: 'abandoned artifact workshop',
        description: 'dusty molds and crafting materials',
        explanation: 'where new relics were crafted and imbued'
      },
      {
        name: 'cracked observatory dome',
        description: 'rusting telescope pointing skyward',
        explanation: 'used for astronomical studies and prophecies'
      },
      {
        name: 'worn-out pilgrim lodgings',
        description: 'beds and belongings left behind',
        explanation: 'rooms for those on a religious journey'
      },
      {
        name: 'overgrown garden of remembrance',
        description: 'statues hidden among tall grasses',
        explanation: 'a place to honor past leaders and heroes'
      }
    ]
  },
  'inscrutable outsider art structure': {
    locations: [
      {
        name: 'twisted metal sculpture',
        description: 'with no discernible purpose',
        explanation: 'a mysterious creation of an unknown artist'
      },
      {
        name: 'cracked glass maze',
        description: 'reflecting fractured images',
        explanation: 'a puzzling construction meant to disorient'
      },
      {
        name: 'sunken stone monolith',
        description: 'covered in unfamiliar carvings',
        explanation: 'a monument from a mind not of this world'
      },
      {
        name: 'abandoned clay figurine garden',
        description: 'figures with exaggerated features',
        explanation: "representations of an artist's unique vision"
      },
      {
        name: 'rusting iron tower',
        description: 'with ladders leading nowhere',
        explanation: 'a statement on the futility of ambition or progress'
      },
      {
        name: 'shattered porcelain forest',
        description: 'trees with delicate, broken branches',
        explanation: "a fragile echo of nature's majesty"
      },
      {
        name: 'decaying cloth tapestry',
        description: 'depicting abstract patterns',
        explanation: "a canvas for an outsider's story or emotions"
      },
      {
        name: 'crumbling concrete labyrinth',
        description: 'paths that twist and turn',
        explanation: "a journey through the artist's mind or experiences"
      },
      {
        name: 'fragmented mirror pond',
        description: 'still waters surrounded by shards',
        explanation: 'reflecting both reality and distorted visions'
      },
      {
        name: 'overturned wooden installation',
        description: 'with hidden compartments and nooks',
        explanation: 'a playful or introspective creation of woodwork'
      },
      {
        name: 'faded paint mural',
        description: 'colors blending into obscurity',
        explanation: 'once a vibrant expression, now lost to time'
      },
      {
        name: 'abandoned sound sculpture',
        description: 'whistles and chimes silenced',
        explanation: 'designed to make music with the wind'
      }
    ]
  },
  'library or ancient archive': {
    locations: [
      {
        name: 'decayed reading chamber',
        description: 'rotten wood benches and desks',
        explanation: 'a once-quiet spot for studying texts'
      },
      {
        name: 'collapsed bookshelf corridor',
        description: 'tomes scattered and damaged',
        explanation: 'held a wealth of knowledge now lost'
      },
      {
        name: 'forgotten map room',
        description: 'faded charts and broken compasses',
        explanation: 'guided explorers and scholars of old'
      },
      {
        name: "ruined scribe's quarters",
        description: 'quills, inks, and unfinished manuscripts',
        explanation: 'where records and copies were meticulously made'
      },
      {
        name: 'abandoned lecture hall',
        description: 'podium and rows of seating',
        explanation: 'hosted teachings and intellectual debates'
      },
      {
        name: 'overgrown botanical archive',
        description: 'dried plants and labeled containers',
        explanation: 'a collection of specimens from across the world'
      },
      {
        name: 'sunken scroll vault',
        description: 'sealed jars and fragments of parchment',
        explanation: 'protected ancient writings from the elements'
      },
      {
        name: 'faded mural of knowledge',
        description: 'depicting scholars and grand libraries',
        explanation: 'a celebration of the pursuit of understanding'
      },
      {
        name: "deserted curator's office",
        description: 'catalogs and acquisition records',
        explanation: "the heart of the library's operations"
      },
      {
        name: 'shattered artifact display',
        description: 'glass cases and empty pedestals',
        explanation: 'showcased relics related to the texts'
      },
      {
        name: 'deteriorated star chart room',
        description: 'celestial maps and rusty astrolabes',
        explanation: 'for those studying the cosmos and its mysteries'
      },
      {
        name: 'abandoned oral history chamber',
        description: 'seats arranged in a circle',
        explanation: 'where stories were told and recorded for posterity'
      }
    ]
  },
  "ancient culture's gathering site": {
    locations: [
      {
        name: 'crumbled stone amphitheater',
        description: 'seating in concentric circles',
        explanation: 'hosted performances and community events'
      },
      {
        name: 'sunken fire pit plaza',
        description: 'charred logs and ceremonial tools',
        explanation: 'a place for communal feasts and gatherings'
      },
      {
        name: 'faded petroglyph wall',
        description: 'depictions of hunts and dances',
        explanation: "tells stories of the culture's history"
      },
      {
        name: 'overgrown ceremonial platform',
        description: 'altar stones and ritual remnants',
        explanation: 'used for religious ceremonies and rites'
      },
      {
        name: 'broken totem pole clearing',
        description: 'wooden figures stacked atop each other',
        explanation: 'a marker of tribal identity and heritage'
      },
      {
        name: 'abandoned market stalls',
        description: 'woven baskets and pottery fragments',
        explanation: 'where traders and craftsmen peddled goods'
      },
      {
        name: 'cracked water gathering pool',
        description: 'surrounded by stone benches',
        explanation: 'a communal spot to collect and share water'
      },
      {
        name: "collapsed elder's council hut",
        description: 'central fire pit and seating',
        explanation: 'where the wise met to discuss tribal matters'
      },
      {
        name: 'forgotten dance circle',
        description: 'flattened earth with footprints',
        explanation: 'where the community celebrated with dance'
      },
      {
        name: 'deserted storytelling grove',
        description: 'shade trees and stone markers',
        explanation: 'elders shared tales and legends here'
      },
      {
        name: 'deteriorated warrior training ground',
        description: 'targets and abandoned weapons',
        explanation: 'young warriors honed their skills here'
      },
      {
        name: 'fragmented ancestor shrine',
        description: 'offerings and inscriptions',
        explanation: 'a place to honor and remember the departed'
      }
    ]
  },
  'resort for nobles at ease': {
    locations: [
      {
        name: 'crumbling bathhouse',
        description: 'mosaic floors and empty pools',
        explanation: 'nobles relaxed and socialized here'
      },
      {
        name: 'overgrown garden gazebo',
        description: 'vines covering ornate carvings',
        explanation: 'a tranquil spot for contemplation or romance'
      },
      {
        name: 'faded ballroom',
        description: 'chandeliers hanging askew',
        explanation: 'once echoed with music and laughter'
      },
      {
        name: 'decayed guest villa',
        description: 'luxurious furnishings now rotten',
        explanation: 'provided opulent accommodations for visitors'
      },
      {
        name: 'abandoned hedge maze',
        description: 'paths overgrown and untraceable',
        explanation: 'designed for leisurely strolls and playful chases'
      },
      {
        name: 'sunken fountain courtyard',
        description: 'statues eroded by time',
        explanation: 'a centerpiece for gatherings and events'
      },
      {
        name: 'ruined observatory tower',
        description: 'telescope rusted and broken',
        explanation: 'nobles gazed at the stars in wonder'
      },
      {
        name: 'forgotten game room',
        description: 'scattered pieces and broken tables',
        explanation: 'a place for diversion and competition'
      },
      {
        name: 'shattered greenhouse',
        description: 'fragile panes and wilted plants',
        explanation: 'housed exotic plants and floral displays'
      },
      {
        name: 'overturned boat house',
        description: 'rotting vessels and torn sails',
        explanation: 'for leisurely trips on nearby waters'
      },
      {
        name: 'deteriorated sculpture garden',
        description: 'marble figures chipped and cracked',
        explanation: 'an outdoor gallery of art and beauty'
      },
      {
        name: 'collapsed dining pavilion',
        description: 'tables upturned and silverware scattered',
        explanation: 'where grand feasts and banquets were held'
      }
    ]
  },
  'monument complex to lost glories': {
    locations: [
      {
        name: 'crumbled statue base',
        description: 'once held a hero in stone',
        explanation: 'dedicated to a forgotten champion of the past'
      },
      {
        name: 'overgrown commemorative plaza',
        description: 'engraved bricks beneath moss',
        explanation: 'a space to remember significant events or figures'
      },
      {
        name: 'faded inscription wall',
        description: 'letters barely legible',
        explanation: 'recorded deeds and achievements now forgotten'
      },
      {
        name: 'abandoned observation deck',
        description: 'overlooking a once-proud city',
        explanation: "where citizens admired their civilization's greatness"
      },
      {
        name: 'deteriorated victory arch',
        description: 'intricate carvings worn away',
        explanation: 'celebrated a notable triumph or milestone'
      },
      {
        name: 'sunken ceremonial pool',
        description: 'water murky and still',
        explanation: 'reflected the splendor of ceremonies held here'
      },
      {
        name: 'shattered mosaic pathway',
        description: 'colored tiles scattered',
        explanation: 'depicted the history of a glorious era'
      },
      {
        name: 'decayed bell tower',
        description: 'bell silenced, structure leaning',
        explanation: 'once chimed to commemorate special occasions'
      },
      {
        name: 'cracked obelisk',
        description: 'symbols of power eroded',
        explanation: "stood as a testament to a civilization's might"
      },
      {
        name: 'collapsed hall of heroes',
        description: 'pedestals empty, roof caved in',
        explanation: 'a gallery of notable figures now lost to time'
      },
      {
        name: 'fragmented emblem square',
        description: 'flags and symbols decayed',
        explanation: 'displayed the icons of a once-great society'
      },
      {
        name: 'forsaken torch platform',
        description: 'burned out and rusted',
        explanation: 'once held flames to inspire and remind'
      }
    ]
  },
  'enormous musical structure': {
    locations: [
      {
        name: 'abandoned giant harp frame',
        description: 'strings snapped and tangled',
        explanation: 'once resonated with harmonious melodies'
      },
      {
        name: 'broken colossal flute tower',
        description: 'holes overgrown with ivy',
        explanation: 'produced notes heard across the land'
      },
      {
        name: 'deserted drum plaza',
        description: 'giant mallets lying askew',
        explanation: 'echoed rhythms of grand celebrations'
      },
      {
        name: 'crumbled chime bridge',
        description: 'wind-catchers rusted still',
        explanation: 'made music with every gust of wind'
      },
      {
        name: 'deteriorated organ hall',
        description: 'pipes bent and silent',
        explanation: 'filled the air with powerful harmonies'
      },
      {
        name: 'overturned gong pagoda',
        description: 'bronze disk tarnished and dented',
        explanation: 'announced events with deep, resonant tones'
      },
      {
        name: 'fragmented xylophone garden',
        description: 'wooden bars scattered',
        explanation: 'a playground of musical notes and melodies'
      },
      {
        name: 'sunken horn terrace',
        description: 'curved metals entwined with plants',
        explanation: 'sounded calls and songs during ceremonies'
      },
      {
        name: 'forsaken bell tower',
        description: 'great bell cracked and motionless',
        explanation: 'rung during special moments and celebrations'
      },
      {
        name: 'shattered glass melody dome',
        description: 'prisms casting faint colors',
        explanation: 'produced entrancing sounds in sunlight'
      },
      {
        name: 'ruined violin grove',
        description: 'oversized bows and strings',
        explanation: 'played by the winds and nature itself'
      },
      {
        name: 'abandoned cymbal courtyard',
        description: 'large discs rusting away',
        explanation: 'clashed in harmonious rhythms for dance'
      }
    ]
  },
  'abandoned school or study center': {
    locations: [
      {
        name: 'decayed lecture hall',
        description: 'overturned chairs, faded chalkboard',
        explanation: 'once a center of learning and debate'
      },
      {
        name: 'overgrown library courtyard',
        description: 'books deteriorated and scattered',
        explanation: 'held a wealth of knowledge now lost'
      },
      {
        name: 'crumbling student dormitory',
        description: 'personal items left behind',
        explanation: 'living quarters for eager learners'
      },
      {
        name: 'broken observatory',
        description: 'telescope rusted, dome caved in',
        explanation: 'used to explore the mysteries of the cosmos'
      },
      {
        name: 'faded mural of academia',
        description: 'scenes of study and exploration',
        explanation: 'a celebration of the pursuit of knowledge'
      },
      {
        name: 'forsaken laboratory',
        description: 'glassware shattered, notes scattered',
        explanation: 'where experiments and discoveries took place'
      },
      {
        name: 'shattered art studio',
        description: 'dried paints and broken canvases',
        explanation: 'a space for creativity and expression'
      },
      {
        name: 'sunken music practice room',
        description: 'instruments decaying and silent',
        explanation: 'a place to cultivate and share musical talent'
      },
      {
        name: 'deserted playground',
        description: 'swings creaking in the wind',
        explanation: 'where students took breaks and socialized'
      },
      {
        name: 'abandoned debate arena',
        description: 'echoes of passionate arguments',
        explanation: 'a forum for exchanging ideas and perspectives'
      },
      {
        name: 'deteriorated map room',
        description: 'charts fading, globes broken',
        explanation: 'explored the world from within its walls'
      },
      {
        name: 'collapsed tower of books',
        description: 'literature exposed to elements',
        explanation: 'a repository of wisdom and tales'
      }
    ]
  },
  'massive ceremonial structure': {
    locations: [
      {
        name: 'faded grand amphitheater',
        description: 'seats empty, stage ruined',
        explanation: 'hosted rituals and grand ceremonies'
      },
      {
        name: 'overgrown sacrificial altar',
        description: 'bloodstains faded by time',
        explanation: 'a place of offerings and reverence'
      },
      {
        name: 'deserted procession pathway',
        description: 'decorations tattered and torn',
        explanation: 'once bustling during ceremonial marches'
      },
      {
        name: 'broken monumental archway',
        description: 'ornaments missing or decayed',
        explanation: 'marked the entrance to the sacred grounds'
      },
      {
        name: "crumbled priest's quarters",
        description: 'vestments rotting away',
        explanation: 'living and meditation space for the clergy'
      },
      {
        name: 'decayed ritual pool',
        description: 'water turned murky and stagnant',
        explanation: 'used for ceremonial cleansings and rites'
      },
      {
        name: 'forsaken celestial observatory',
        description: 'alignments off, stones toppled',
        explanation: 'tracked the heavens for auspicious dates'
      },
      {
        name: 'cracked ceremonial drum platform',
        description: 'rhythmic instruments silent',
        explanation: 'sounded the start and end of ceremonies'
      },
      {
        name: 'overturned ceremonial throne',
        description: 'once seated the highest priest',
        explanation: 'a symbol of spiritual authority and leadership'
      },
      {
        name: 'shattered stained glass dome',
        description: 'colors scattered on the ground',
        explanation: 'illuminated ceremonies with divine light'
      },
      {
        name: 'abandoned incense altar',
        description: 'fragrance replaced by mustiness',
        explanation: 'burned to invoke deities and spirits'
      },
      {
        name: 'sunken dance circle',
        description: 'steps faded, platform cracked',
        explanation: 'ceremonial dances were performed here'
      }
    ]
  },
  'indoctrination camp or prison': {
    locations: [
      {
        name: 'crumbling watchtower',
        description: 'once overlooked the entire camp',
        explanation: 'guarded against escape and rebellion'
      },
      {
        name: 'decayed barbed fence',
        description: 'rusty and partly torn down',
        explanation: 'kept prisoners confined and isolated'
      },
      {
        name: 'overgrown prisoner barracks',
        description: 'bunk beds rotting away',
        explanation: 'held countless souls against their will'
      },
      {
        name: 'forsaken interrogation chamber',
        description: 'stains and dark memories',
        explanation: 'a room filled with pain and confession'
      },
      {
        name: 'abandoned propaganda theater',
        description: 'projector rusted, seats deteriorating',
        explanation: "indoctrinated prisoners with the regime's views"
      },
      {
        name: 'crumbled isolation cells',
        description: 'small, dark, and cold',
        explanation: 'punished those who resisted or rebelled'
      },
      {
        name: "deserted guard's quarters",
        description: 'uniforms moth-eaten, weapons rusted',
        explanation: "living area for the camp's enforcers"
      },
      {
        name: 'broken exercise yard',
        description: 'faint traces of footprints',
        explanation: 'where prisoners had brief moments of freedom'
      },
      {
        name: 'faded wall of rules',
        description: "do's and don'ts barely readable",
        explanation: 'ensured obedience and compliance'
      },
      {
        name: 'ruined administrative building',
        description: 'paperwork scattered and yellowed',
        explanation: "controlled and monitored the camp's operations"
      },
      {
        name: 'collapsed watchtower',
        description: 'once a symbol of oppression',
        explanation: 'oversaw every corner of the camp'
      },
      {
        name: 'sunken re-education classroom',
        description: 'desks askew, propaganda posters faded',
        explanation: 'forced new beliefs upon the imprisoned'
      }
    ]
  },
  'preserved “heritage” village-resort': {
    locations: [
      {
        name: 'crumbled traditional cottage',
        description: 'thatched roof collapsed, walls leaning',
        explanation: 'once showcased historic living conditions'
      },
      {
        name: 'overgrown folklore garden',
        description: 'ancient plants tangled and wild',
        explanation: 'represented the flora of bygone eras'
      },
      {
        name: "abandoned craftsman's hut",
        description: 'tools rusted, handiwork half-finished',
        explanation: 'demonstrated age-old artisan skills'
      },
      {
        name: 'deserted village square',
        description: 'cobblestones cracked, fountain dry',
        explanation: 'center of communal activities and events'
      },
      {
        name: 'deteriorated traditional inn',
        description: 'beds musty, hearth cold',
        explanation: 'provided rustic accommodations for visitors'
      },
      {
        name: 'forgotten dance platform',
        description: 'wood warped, paint chipped',
        explanation: 'once echoed with traditional music and steps'
      },
      {
        name: 'faded mural of village life',
        description: 'scenes of harvest, celebration, and work',
        explanation: 'painted to remember the past and its customs'
      },
      {
        name: 'sunken animal pen',
        description: 'fences broken, troughs empty',
        explanation: 'showcased livestock and traditional farming'
      },
      {
        name: "collapsed storyteller's stage",
        description: 'tales of yore silenced forever',
        explanation: 'where village lore was shared with visitors'
      },
      {
        name: "overturned vendor's cart",
        description: 'wares broken, cloth faded',
        explanation: 'sold souvenirs and traditional goods'
      },
      {
        name: 'abandoned water mill',
        description: 'wheel still, pond overgrown',
        explanation: 'demonstrated ancient methods of grain grinding'
      },
      {
        name: 'deteriorated ceremonial shrine',
        description: 'icons tarnished, candles unlit',
        explanation: 'a spiritual corner reflecting village beliefs'
      }
    ]
  },
  'museum of a lost nation': {
    locations: [
      {
        name: 'shattered display of relics',
        description: 'artifacts scattered and broken',
        explanation: 'held treasures of a nation now forgotten'
      },
      {
        name: 'faded mural of historic battles',
        description: 'heroes and moments barely recognizable',
        explanation: "depicted key events in the nation's history"
      },
      {
        name: 'crumbled statue of a revered leader',
        description: 'features eroded by time and neglect',
        explanation: 'honored a leader who shaped the nation'
      },
      {
        name: 'deserted hall of cultural achievements',
        description: 'empty frames, silent instruments',
        explanation: 'celebrated the arts and innovations'
      },
      {
        name: 'overgrown garden of national flora',
        description: 'plants wild, plaques unreadable',
        explanation: "represented the nation's diverse ecology"
      },
      {
        name: 'abandoned audio-visual room',
        description: 'projectors rusted, screens torn',
        explanation: "played documentaries of the nation's legacy"
      },
      {
        name: 'forsaken diorama of daily life',
        description: 'figures toppled, scenes dusty',
        explanation: 'showcased routines and lifestyles of the populace'
      },
      {
        name: 'ruined map room of territorial claims',
        description: 'boundaries faded, markers missing',
        explanation: "charted the nation's rise and fall"
      },
      {
        name: 'cracked globe stand of global relations',
        description: 'ties and treaties long forgotten',
        explanation: "highlighted the nation's place in world affairs"
      },
      {
        name: 'collapsed bookstore of national literature',
        description: 'texts moldy, shelves fallen',
        explanation: "stored works that echoed the nation's soul"
      },
      {
        name: 'sunken theater of national plays',
        description: 'curtain tattered, stage broken',
        explanation: 'enacted tales that shaped national identity'
      },
      {
        name: 'deserted wing of scientific marvels',
        description: 'machines rusted, innovations halted',
        explanation: 'honored the thinkers and their breakthroughs'
      }
    ]
  },
  'taboo site of dark magic': {
    locations: [
      {
        name: 'desecrated pentagram circle',
        description: 'stones charred, symbols faded',
        explanation: 'a focal point for dark rituals and incantations'
      },
      {
        name: 'crumbled altar of sacrifices',
        description: 'bloodstains darkened by age',
        explanation: 'where offerings were made to forbidden powers'
      },
      {
        name: 'overturned cauldron of curses',
        description: 'contents spilled, metal corroded',
        explanation: 'used to brew malevolent potions and hexes'
      },
      {
        name: 'decayed grimoire library',
        description: 'tomes tattered, spells lost',
        explanation: 'stored knowledge of forbidden magic arts'
      },
      {
        name: 'sunken ritual chamber',
        description: 'candles melted, runes obscured',
        explanation: 'a secretive place for dark practitioners'
      },
      {
        name: 'shattered obsidian mirror',
        description: 'reflects fractured, distorted visions',
        explanation: 'once a portal to malevolent dimensions'
      },
      {
        name: 'forgotten bone pile',
        description: 'remnants of unspeakable rites',
        explanation: 'evidence of sacrifices and necromancy'
      },
      {
        name: 'faded summoning circle',
        description: 'symbols worn, energies dormant',
        explanation: 'where entities from beyond were called forth'
      },
      {
        name: 'abandoned cursed artifact vault',
        description: 'trinkets scattered, enchantments weak',
        explanation: 'guarded dark relics of immense power'
      },
      {
        name: 'overgrown poison garden',
        description: 'plants toxic, air thick with menace',
        explanation: 'cultivated deadly flora for dark concoctions'
      },
      {
        name: 'deteriorated statue of a dark deity',
        description: 'figure eroded, aura ominous',
        explanation: 'represented a forbidden god of malevolence'
      },
      {
        name: 'ruined prison of malefic spirits',
        description: 'chains rusted, wards fading',
        explanation: 'confined entities too dangerous to roam free'
      }
    ]
  },
  'psychic or tech communications site': {
    locations: [
      {
        name: 'overturned psychic amplification pod',
        description: 'circuitry exposed, energy drained',
        explanation: 'enhanced telepathic signals for clearer communication'
      },
      {
        name: 'deserted tech transmission tower',
        description: 'wires frayed, signals silent',
        explanation: 'broadcasted data over vast distances'
      },
      {
        name: 'abandoned holo-message chamber',
        description: 'projectors dim, messages lost',
        explanation: 'displayed holographic communications in real-time'
      },
      {
        name: 'decayed neural interface lab',
        description: 'equipment scattered, research halted',
        explanation: 'developed tech for direct brain-to-brain communication'
      },
      {
        name: 'crumbled psychic meditation zone',
        description: 'candles snuffed out, energy faint',
        explanation: 'a place for refining and enhancing psychic abilities'
      },
      {
        name: 'broken satellite uplink dish',
        description: 'metal warped, signals lost to space',
        explanation: 'connected the ground with orbiting communication satellites'
      },
      {
        name: 'sunken chamber of echoing thoughts',
        description: 'walls cracked, whispers silent',
        explanation: 'amplified psychic messages for group communications'
      },
      {
        name: 'overgrown data relay station',
        description: 'terminals offline, data pathways blocked',
        explanation: 'facilitated the transfer of vast amounts of information'
      },
      {
        name: 'forgotten antenna field',
        description: 'poles bent, frequencies dormant',
        explanation: 'captured and sent signals over the airwaves'
      },
      {
        name: 'shattered psychic crystal cluster',
        description: 'energy dispersed, shards scattered',
        explanation: 'focused and magnified psychic energies'
      },
      {
        name: 'ruined virtual meeting platform',
        description: 'screens broken, avatars frozen',
        explanation: 'hosted digital gatherings across vast distances'
      },
      {
        name: 'collapsed tunnel of whispered secrets',
        description: 'echoes lost, messages buried',
        explanation: 'a conduit for confidential psychic exchanges'
      }
    ]
  },
  'subterranean transit tunnels': {
    locations: [
      {
        name: 'crumbled underground platform',
        description: 'tracks warped, signs faded',
        explanation: 'once bustling with travelers and transit'
      },
      {
        name: 'flooded tunnel segment',
        description: 'water murky, path obscured',
        explanation: 'a section where water breaches halted transport'
      },
      {
        name: 'abandoned maintenance alcove',
        description: 'tools rusted, machinery silent',
        explanation: 'a space dedicated to tunnel upkeep'
      },
      {
        name: 'derailed subterranean train',
        description: 'carriages toppled, journey halted',
        explanation: 'once transported countless souls through the depths'
      },
      {
        name: 'collapsed ventilation shaft',
        description: 'air stale, grates blocked',
        explanation: 'provided fresh air to the underground network'
      },
      {
        name: 'forsaken control room',
        description: 'switches broken, screens dark',
        explanation: 'orchestrated the flow of subterranean traffic'
      },
      {
        name: "overturned vendor's stall",
        description: 'goods scattered, transactions ceased',
        explanation: 'offered refreshments and trinkets to travelers'
      },
      {
        name: 'sunken passenger waiting area',
        description: 'benches cracked, silence pervading',
        explanation: 'where travelers awaited their transit'
      },
      {
        name: 'shattered tunnel lighting system',
        description: 'bulbs burst, shadows deepening',
        explanation: 'illuminated the dark pathways below'
      },
      {
        name: 'sealed emergency exit',
        description: 'door rusted shut, sign unreadable',
        explanation: 'provided a quick escape in times of crisis'
      }
    ]
  },
  'canal or aqueduct control center': {
    locations: [
      {
        name: 'crumbled water gate mechanism',
        description: 'levers snapped, flow uncontrolled',
        explanation: 'regulated the water flow in the canal'
      },
      {
        name: 'deserted control room',
        description: 'panels dusty, monitors blank',
        explanation: 'oversaw the entire canal or aqueduct system'
      },
      {
        name: 'collapsed bridge over canal',
        description: 'path broken, traversal impossible',
        explanation: 'connected sides of the canal for easy access'
      },
      {
        name: 'abandoned maintenance shed',
        description: 'tools scattered, upkeep neglected',
        explanation: 'housed equipment for canal repairs'
      },
      {
        name: 'overgrown sluice gate',
        description: 'wood rotted, water stagnant',
        explanation: 'allowed controlled release of water'
      },
      {
        name: 'sunken aqueduct segment',
        description: 'water muddied, path blocked',
        explanation: 'once channeled fresh water to distant places'
      },
      {
        name: 'broken water wheel',
        description: 'blades snapped, rotation halted',
        explanation: 'harnessed water flow for energy'
      },
      {
        name: 'flooded control station',
        description: 'machinery submerged, controls shorted',
        explanation: 'managed a key section of the waterway'
      },
      {
        name: 'cracked canal embankment',
        description: 'soil eroded, structure weak',
        explanation: 'once held the waters within designated boundaries'
      },
      {
        name: 'forsaken lock chamber',
        description: 'doors rusted, water levels erratic',
        explanation: 'elevated or lowered boats between canal sections'
      },
      {
        name: 'deserted guard outpost',
        description: 'chair toppled, watch ceased',
        explanation: 'ensured the security and order of the waterway'
      },
      {
        name: 'overturned supply boat',
        description: 'cargo lost, voyage ended',
        explanation: 'transported essential materials for canal operations'
      }
    ]
  },
  'weather-control working ruin': {
    locations: [
      {
        name: 'shattered climate orb stand',
        description: 'sphere cracked, weather wild',
        explanation: 'manipulated weather patterns in its vicinity'
      },
      {
        name: 'crumbled weather tower',
        description: 'sensors broken, forecasts astray',
        explanation: 'monitored and adjusted atmospheric conditions'
      },
      {
        name: 'abandoned rain summoning altar',
        description: 'offerings decayed, clouds scarce',
        explanation: 'invoked rains in times of drought'
      },
      {
        name: 'broken wind redirection vane',
        description: 'blade bent, breezes untamed',
        explanation: 'steered winds in desired directions'
      },
      {
        name: 'sunken temperature regulation pool',
        description: 'water murky, heat unbalanced',
        explanation: 'controlled regional temperatures through water'
      },
      {
        name: 'decayed snow conjuration circle',
        description: 'symbols faded, winters mild',
        explanation: 'brought forth snow in specific areas'
      },
      {
        name: 'overturned storm calming device',
        description: 'circuitry exposed, tempests raging',
        explanation: 'diminished the intensity of storms'
      },
      {
        name: 'forsaken humidity control chamber',
        description: 'dials rusted, air either dry or damp',
        explanation: 'maintained optimal humidity levels in a region'
      },
      {
        name: 'cracked lightning redirection rod',
        description: 'metal charred, strikes unpredictable',
        explanation: 'guided lightning away from populated areas'
      },
      {
        name: 'deserted fog dispersion unit',
        description: 'fans stilled, mists lingering',
        explanation: 'cleared thick fogs from specific zones'
      },
      {
        name: 'collapsed sun amplification array',
        description: 'mirrors shattered, shadows lengthening',
        explanation: 'increased sunlight intensity in darker areas'
      },
      {
        name: 'flooded rain collection basin',
        description: 'walls eroded, waters unchanneled',
        explanation: 'harvested and stored rainwater for various uses'
      }
    ]
  },
  'reality-stabilizing working ruin': {
    locations: [
      {
        name: 'shattered dimensional anchor',
        description: 'crystals fragmented, reality wavering',
        explanation: 'held the fabric of reality stable in its proximity'
      },
      {
        name: 'sunken realm stabilizing pond',
        description: 'waters muddied, ripples distorting space',
        explanation: 'its serene waters once kept reality consistent'
      },
      {
        name: 'deserted temporal regulation chamber',
        description: 'clocks halted, time anomalies rampant',
        explanation: 'managed the flow of time in its vicinity'
      },
      {
        name: 'overturned reality calibration device',
        description: 'dials misaligned, perceptions askew',
        explanation: 'fine-tuned the nature of reality in its zone'
      },
      {
        name: 'broken spatial harmony statue',
        description: 'stone eroded, spatial rifts nearby',
        explanation: 'symbolized and maintained spatial balance'
      },
      {
        name: 'decayed nexus of convergence',
        description: 'energies dispersed, realities blending',
        explanation: 'unified multiple realities into one coherent whole'
      },
      {
        name: 'forsaken causality loop breaker',
        description: 'mechanism jammed, events repeating',
        explanation: 'prevented time loops and causal anomalies'
      },
      {
        name: 'cracked perception filter stone',
        description: 'luster lost, senses deceived',
        explanation: 'ensured beings perceived reality correctly'
      },
      {
        name: 'abandoned quantum alignment field',
        description: 'particles unaligned, chaos seeping',
        explanation: 'kept quantum events in harmonious order'
      },
      {
        name: 'ruined dimensional gateway seal',
        description: 'barrier weakened, portals opening',
        explanation: 'prevented unwanted inter-dimensional travel'
      },
      {
        name: 'collapsed resonance amplification dome',
        description: 'echoes distorted, realities misaligned',
        explanation: 'strengthened the resonance of this reality'
      },
      {
        name: 'overgrown unity garden',
        description: 'plants wild, reality fragments amidst',
        explanation: 'its flora once symbolized and ensured a unified reality'
      }
    ]
  },
  'ancient road through an obstacle': {
    locations: [
      {
        name: 'crumbled mountain pass',
        description: 'path blocked, journey halted',
        explanation: 'once allowed travelers to cross a formidable mountain'
      },
      {
        name: 'flooded causeway through swamp',
        description: 'stones submerged, marsh reclaiming',
        explanation: 'connected lands separated by a vast wetland'
      },
      {
        name: 'decayed bridge over chasm',
        description: 'planks missing, gap widening',
        explanation: 'spanned a deep abyss for safe traversal'
      },
      {
        name: 'sunken ferry crossing point',
        description: 'boat rotted, waters undisturbed',
        explanation: 'ferried travelers across a broad river'
      },
      {
        name: 'abandoned tunnel through hill',
        description: 'entrance collapsed, darkness within',
        explanation: 'bored straight through an obstacle for quicker travel'
      },
      {
        name: 'overgrown path through dense forest',
        description: 'trees encroaching, trail disappearing',
        explanation: 'cut through the heart of a thick woodland'
      },
      {
        name: 'broken rope bridge across ravine',
        description: 'ropes frayed, crossing perilous',
        explanation: 'offered a shortcut over a deep gully'
      },
      {
        name: 'deserted resting point',
        description: 'fire pit cold, travelers gone',
        explanation: 'a haven where journeyers could rest and recuperate'
      },
      {
        name: 'ruined lookout tower',
        description: 'stones scattered, horizon obscured',
        explanation: 'allowed guards to monitor and aid travelers'
      },
      {
        name: 'eroded stairway up cliffside',
        description: 'steps worn, ascent challenging',
        explanation: 'climbed a sheer face to access highlands'
      },
      {
        name: 'forsaken trading post',
        description: 'goods decayed, commerce ceased',
        explanation: 'served as a hub for travelers to barter and resupply'
      },
      {
        name: 'collapsed rock archway',
        description: 'stone broken, passage denied',
        explanation: 'a natural formation aiding travel between regions'
      }
    ]
  },
  'massive bridge or tunnel': {
    locations: [
      {
        name: 'crumbling stone bridge',
        description: 'arches cracked, river rushing below',
        explanation: 'once connected two major landmasses'
      },
      {
        name: 'deserted underground tunnel',
        description: 'walls dripping, echoes of footsteps',
        explanation: 'facilitated travel through a mountain'
      },
      {
        name: 'weathered rope bridge',
        description: 'ropes fraying, planks missing',
        explanation: 'offered a precarious crossing over a chasm'
      },
      {
        name: 'sunken floating bridge',
        description: 'buoys deflated, path submerged',
        explanation: 'once allowed passage over deep waters'
      },
      {
        name: 'collapsed railway trestle',
        description: 'rails twisted, wood rotting',
        explanation: 'carried trains over vast canyons'
      },
      {
        name: 'forsaken vehicular tunnel',
        description: 'lights dimmed, vehicles abandoned',
        explanation: 'served as a major urban thoroughfare'
      },
      {
        name: 'broken pedestrian footbridge',
        description: 'supports weakened, journey halted',
        explanation: 'connected neighborhoods for foot traffic'
      },
      {
        name: 'abandoned aqueduct bridge',
        description: 'water ceased, structure desolate',
        explanation: 'transported water across valleys'
      },
      {
        name: 'eroded natural arch bridge',
        description: 'stone crumbling, path narrowing',
        explanation: 'nature’s way of bridging a gap'
      },
      {
        name: 'deserted undersea tunnel',
        description: 'flooded chambers, sealife invading',
        explanation: 'linked islands beneath the waves'
      },
      {
        name: 'cracked suspension bridge',
        description: 'cables snapped, span unstable',
        explanation: 'a marvel of engineering now in disrepair'
      },
      {
        name: 'forsaken mountain pass tunnel',
        description: 'entrance blocked, cold wind blowing',
        explanation: 'allowed safe passage through a mountain range'
      }
    ]
  },
  'huge ancient dam': {
    locations: [
      {
        name: 'cracked concrete barrier',
        description: 'water seeping, pressure mounting',
        explanation: 'held back a vast reservoir of water'
      },
      {
        name: 'overgrown floodgate',
        description: 'mechanism rusted, control lost',
        explanation: 'regulated the flow of water for downstream communities'
      },
      {
        name: 'sunken turbine chamber',
        description: 'blades stilled, power halted',
        explanation: 'generated electricity from flowing water'
      },
      {
        name: 'collapsed observation deck',
        description: 'view obscured, tourists gone',
        explanation: 'once offered breathtaking views of the reservoir'
      },
      {
        name: 'flooded spillway channel',
        description: 'overflow uncontrolled, erosion rampant',
        explanation: 'safely channeled excess water during heavy rain'
      },
      {
        name: 'decayed control tower',
        description: 'dials unreadable, commands silenced',
        explanation: 'central hub for dam operations and monitoring'
      },
      {
        name: 'broken water release valve',
        description: 'gate jammed, pressure building',
        explanation: 'controlled the release of water downstream'
      },
      {
        name: 'abandoned worker quarters',
        description: 'rooms empty, memories faded',
        explanation: 'housed the workforce that maintained the dam'
      },
      {
        name: 'dried up fish ladder',
        description: 'channels barren, migration halted',
        explanation: 'allowed fish to migrate upstream despite the dam'
      },
      {
        name: 'crumbling dam walkway',
        description: 'path fractured, journey perilous',
        explanation: "enabled inspection and patrol of the dam's surface"
      },
      {
        name: 'ruined reservoir intake tower',
        description: 'structure leaning, waters unchanneled',
        explanation: 'drew water from the reservoir for various purposes'
      },
      {
        name: 'silted sedimentation basin',
        description: 'water murky, sediment settled',
        explanation: 'filtered out sediments before they reached the turbines'
      }
    ]
  },
  'ancient power production center': {
    locations: [
      {
        name: 'overgrown solar panel field',
        description: 'cells cracked, sunlight wasted',
        explanation: "once harnessed the sun's energy at scale"
      },
      {
        name: 'rusting wind turbine farm',
        description: 'blades halted, winds passing freely',
        explanation: 'generated power from the ever-present wind'
      },
      {
        name: 'flooded geothermal plant',
        description: 'pipes burst, steam no longer harnessed',
        explanation: "tapped into the earth's heat for energy"
      },
      {
        name: 'decayed nuclear reactor dome',
        description: 'radioactive symbols faded, core silent',
        explanation: 'utilized nuclear reactions to produce power'
      },
      {
        name: 'crumbling coal power station',
        description: 'chimneys broken, coal piles wet',
        explanation: 'burned coal to generate electricity'
      },
      {
        name: 'abandoned hydroelectric generator',
        description: 'machinery rusted, river unchanneled',
        explanation: 'harnessed the energy of flowing water'
      },
      {
        name: 'deteriorating biomass facility',
        description: 'organic matter rotting, furnaces cold',
        explanation: 'converted organic material to energy'
      },
      {
        name: 'overturned energy storage unit',
        description: 'batteries leaked, energy lost',
        explanation: 'stored excess power for future use'
      },
      {
        name: 'deserted power grid control room',
        description: 'screens darkened, switches untouched',
        explanation: 'centralized management of energy distribution'
      },
      {
        name: 'forsaken wave energy converter',
        description: 'buoys deflated, sea energy untapped',
        explanation: 'harnessed the power of ocean waves'
      },
      {
        name: 'dilapidated tidal power station',
        description: 'turbines stuck, tides unutilized',
        explanation: 'utilized the movement of tides for energy'
      },
      {
        name: 'abandoned power transformer station',
        description: 'wires disconnected, energy flow ceased',
        explanation: 'stepped up or down voltage for transmission'
      }
    ]
  },
  'outsider xenoforming engine': {
    locations: [
      {
        name: 'decayed alien terraformer',
        description: 'mechanism silent, planet unchanged',
        explanation: 'once altered planetary conditions for alien life'
      },
      {
        name: 'abandoned extraterrestrial drill',
        description: 'bit broken, deep holes remaining',
        explanation: 'bored into the crust to release or extract gases'
      },
      {
        name: 'deserted alien weather manipulator',
        description: 'clouds natural, climatic balance restored',
        explanation: 'controlled weather patterns for alien comfort'
      },
      {
        name: 'ruined xenoforming beacon',
        description: 'signals muted, extraterrestrial guidance lost',
        explanation: 'guided alien ships and facilitated terraforming'
      },
      {
        name: 'overturned alien seed disperser',
        description: 'alien flora withered, native plants reclaiming',
        explanation: 'introduced extraterrestrial plants to the ecosystem'
      },
      {
        name: 'damaged alien atmosphere generator',
        description: 'gases unaltered, machine silenced',
        explanation: 'modified the atmosphere for alien survivability'
      },
      {
        name: 'desolate extraterrestrial water synthesizer',
        description: 'pools dried, thirst unquenched',
        explanation: 'created potable water for alien settlers'
      },
      {
        name: 'decayed alien habitation module',
        description: 'dwellings empty, settlers long gone',
        explanation: 'housed the extraterrestrial pioneers during xenoforming'
      },
      {
        name: 'ruined alien bio-accelerator',
        description: 'soil unfertilized, growth stunted',
        explanation: 'boosted growth rates of alien crops'
      },
      {
        name: 'abandoned alien soil converter',
        description: 'dirt unchanged, foreign crops unsown',
        explanation: 'transformed soil to suit alien agriculture'
      },
      {
        name: 'wrecked alien energy harvester',
        description: 'machine silent, planetary energy untapped',
        explanation: "extracted energy from the planet's core"
      },
      {
        name: 'deteriorating alien signal tower',
        description: 'transmissions ceased, connection lost',
        explanation: 'maintained communication with the alien home world'
      }
    ]
  },
  'semi-ruined teleportation node': {
    locations: [
      {
        name: 'decrepit teleportation pad',
        description: 'glyphs faded, transportation halted',
        explanation: 'once instantaneously moved objects across distances'
      },
      {
        name: 'abandoned phase shift chamber',
        description: 'energy dormant, phase transition stilled',
        explanation: 'altered the phase of matter for teleportation'
      },
      {
        name: 'dilapidated portal gateway',
        description: 'archway dark, destinations unreachable',
        explanation: 'opened gateways to various locations'
      },
      {
        name: 'worn-out wormhole generator',
        description: 'machine silenced, shortcuts closed',
        explanation: 'created shortcuts through space-time'
      },
      {
        name: 'desolate quantum entanglement station',
        description: 'particles unlinked, teleportation unpredictable',
        explanation: 'harnessed quantum mechanics for instant travel'
      },
      {
        name: 'deserted teleport calibration tower',
        description: 'instruments misaligned, precision lost',
        explanation: 'ensured accurate and safe teleport destinations'
      },
      {
        name: 'decayed energy relay for teleportation',
        description: 'power flow interrupted, nodes inoperative',
        explanation: 'supplied the necessary energy for teleportation'
      },
      {
        name: 'forsaken temporal jump platform',
        description: 'timeline static, temporal shifts ceased',
        explanation: 'allowed for limited time travel'
      },
      {
        name: 'broken teleportation safety barrier',
        description: 'shield down, traveler risk heightened',
        explanation: 'prevented unsafe or erroneous teleportations'
      },
      {
        name: 'decaying subspace tunnel opener',
        description: 'subspace sealed, tunnels inaccessible',
        explanation: 'created pathways through subspace for rapid travel'
      },
      {
        name: 'wrecked teleportation beacon',
        description: 'signal dimmed, destinations lost',
        explanation: 'guided travelers to their desired coordinates'
      },
      {
        name: 'deteriorating teleportation control hub',
        description: 'panels unresponsive, journeys uncontrolled',
        explanation: 'centralized system to manage all teleport activities'
      }
    ]
  },
  'now-incomprehensible wreckage': {
    locations: [
      {
        name: 'twisted metal monolith',
        description: 'purpose lost, structure deformed',
        explanation: 'once stood tall, now an enigma of its former function'
      },
      {
        name: 'maze of broken circuitry',
        description: 'wires exposed, energy flow ceased',
        explanation: "part of a system that's meaning is now obscured"
      },
      {
        name: 'graveyard of alien artifacts',
        description: 'tools scattered, usage unknown',
        explanation: 'items from another world, their purpose inscrutable'
      },
      {
        name: 'desolate field of shattered crystals',
        description: 'gleams dimmed, energy dissipated',
        explanation: 'once pulsated with power, now just remnants'
      },
      {
        name: 'decayed interstellar communication array',
        description: 'signals lost, messages unheard',
        explanation: 'connected distant stars, now silent'
      },
      {
        name: 'ruined maze of unknown alloys',
        description: 'paths blocked, destination unclear',
        explanation: 'its intricate layout now offers more questions than answers'
      },
      {
        name: 'deserted repository of strange liquids',
        description: 'vials broken, contents evaporated',
        explanation: 'once held vital fluids, their use a mystery'
      },
      {
        name: 'abandoned lattice of glowing nodes',
        description: 'light dimming, pattern disrupted',
        explanation: 'a network of some kind, its function forgotten'
      },
      {
        name: 'wreckage of an alien mechanism',
        description: 'gears halted, purpose erased',
        explanation: 'a machine from another time or world, no longer understood'
      },
      {
        name: 'decaying structure of holographic panels',
        description: 'images faded, data lost',
        explanation: 'a once-advanced display, now just ghostly remnants'
      },
      {
        name: 'ruined array of resonating chambers',
        description: 'sounds silenced, harmony disrupted',
        explanation: 'produced sounds or frequencies, their intent unclear'
      },
      {
        name: 'forsaken monument of shifting geometry',
        description: 'shapes static, meaning obscured',
        explanation: 'once a marvel, its significance now undecipherable'
      }
    ]
  }
}

export const ruin__spawn = (loc: Province): Ruin => {
  const { local } = PROVINCE.cultures(loc)
  const culture = window.world.cultures[local.culture]
  const subtype = window.dice.choice([
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
  ])
  const locations = window.dice
    .sample(rooms[subtype].locations, 2)
    .map(room =>
      decorateText({
        label: room.name,
        tooltip: room.description,
        color: cssColors.subtitle
      })
    )
    .join(', ')
  const ruin: Ruin = {
    idx: window.world.ruins.length,
    tag: 'ruin',
    name: LANGUAGE.word.unique({ lang: culture.language, key: 'ruin', len: 3 }),
    subtype,
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
    ]),
    locations
  }
  window.world.ruins.push(ruin)
  return ruin
}
