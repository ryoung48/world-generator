import { CELL } from '../../../cells'
import { Cell } from '../../../cells/types'
import { TEXT } from '../../../utilities/text'
import { PLACE } from '..'
import { Ruin, RuinLocation } from './types'

const rooms: Record<string, RuinLocation> = {
  'isolated rural estate of nobility': {
    locations: [
      {
        label: 'grand entrance',
        tooltip: 'with a broken ornate gate and overgrowth',
        explanation: 'this served as the majestic entrance to the estate'
      },
      {
        label: 'crumbling ballroom',
        tooltip: 'with faded frescoes and a cracked floor',
        explanation: 'this was where elegant dances and gatherings took place'
      },
      {
        label: 'once-majestic dining hall',
        tooltip: 'with a long decayed wooden table',
        explanation: 'this hall echoed with the sounds of grand feasts'
      },
      {
        label: 'former stables',
        tooltip: 'with remnants of stalls and rusted horseshoes',
        explanation: 'here, noble steeds were tended to and housed'
      },
      {
        label: 'dilapidated greenhouse',
        tooltip: 'with shattered glass and wild plants',
        explanation: 'plants from across the realm once thrived here'
      },
      {
        label: 'ruined library',
        tooltip: 'with scattered books and a collapsed shelf',
        explanation: 'a repository of knowledge, now lost to time'
      },
      {
        label: 'overgrown garden maze',
        tooltip: 'with statues eroded by time',
        explanation: 'once a delightful challenge, now reclaimed by nature'
      },
      {
        label: "decaying servants' quarters",
        tooltip: 'with old beds and scattered tools',
        explanation: 'this housed those who served the nobility'
      },
      {
        label: 'collapsed watchtower',
        tooltip: 'with a view of the surrounding lands',
        explanation: 'guards kept watch over the estate from this vantage point'
      },
      {
        label: 'forgotten pond',
        tooltip: 'with a cracked stone bench and lily pads',
        explanation: 'a serene retreat for reflection and relaxation'
      },
      {
        label: 'remnants of a chapel',
        tooltip: 'with a shattered stained glass window',
        explanation: 'a sacred space for spiritual solace and worship'
      },
      {
        label: 'old wine cellar',
        tooltip: 'with empty barrels and a musty smell',
        explanation: 'fine wines were stored and aged in this cool space'
      }
    ]
  },
  'townhouse of minor gentry': {
    locations: [
      {
        label: 'grand entrance hall',
        tooltip: 'with a once-elegant chandelier',
        explanation: 'this welcomed guests with its grandeur and elegance'
      },
      {
        label: 'ruined library',
        tooltip: 'with scattered books and a broken desk',
        explanation: 'this was a quiet retreat for reading and reflection'
      },
      {
        label: 'crumbling drawing room',
        tooltip: 'with a faded tapestry and dusty piano',
        explanation: 'a place of entertainment and relaxation for the family'
      },
      {
        label: 'destroyed dining area',
        tooltip: 'with a splintered table and chipped china',
        explanation: 'where the family gathered for meals and conversation'
      },
      {
        label: 'overgrown garden',
        tooltip: 'with tangled rose bushes and a cracked fountain',
        explanation: 'an outdoor retreat for relaxation and leisure'
      },
      {
        label: 'neglected servant quarters',
        tooltip: 'with torn mattresses and rusted pots',
        explanation: 'this housed the staff who served the household'
      },
      {
        label: 'collapsed ballroom',
        tooltip: 'with a shattered chandelier and warped floorboards',
        explanation: 'where grand events and dances were hosted'
      },
      {
        label: 'desolate master bedroom',
        tooltip: 'with a frayed canopy bed and cracked mirror',
        explanation: 'a private sanctuary for the head of the household'
      },
      {
        label: 'damaged guest room',
        tooltip: 'with peeling wallpaper and a moth-eaten rug',
        explanation: 'a space to host and accommodate visiting friends and relatives'
      },
      {
        label: 'broken-down kitchen',
        tooltip: 'with a ruined stove and broken dishes',
        explanation: 'where meals were prepared for the family and guests'
      },
      {
        label: 'decayed study',
        tooltip: 'with an overturned chair and scattered letters',
        explanation: 'a private room for contemplation and work'
      },
      {
        label: 'dilapidated conservatory',
        tooltip: 'with shattered windows and dying plants',
        explanation: 'a greenhouse-like space for plants and relaxation'
      }
    ]
  },
  'massive tenement or slum tower': {
    locations: [
      {
        label: 'collapsed entrance',
        tooltip: 'shadowed by crumbling archways',
        explanation: 'the main entryway into the tower complex'
      },
      {
        label: 'moss-covered atrium',
        tooltip: 'where a cracked fountain sits',
        explanation: 'a central gathering place for residents'
      },
      {
        label: 'shattered stairwell',
        tooltip: 'with broken steps leading upward',
        explanation: 'once connected the many levels of the tower'
      },
      {
        label: 'old communal kitchen',
        tooltip: 'blackened from old fires',
        explanation: 'a shared space for cooking and meals'
      },
      {
        label: 'tattered laundry room',
        tooltip: 'wash basins stained and cracked',
        explanation: 'a communal area for washing clothes'
      },
      {
        label: 'rooftop garden',
        tooltip: 'now overgrown with wild vegetation',
        explanation: 'an oasis high above the hustle and bustle below'
      },
      {
        label: 'dilapidated hallways',
        tooltip: 'littered with abandoned belongings',
        explanation: 'corridors connecting the many rooms of the tower'
      },
      {
        label: 'former market space',
        tooltip: 'stalls rotting and collapsed',
        explanation: 'where residents shopped for essentials'
      },
      {
        label: 'sunlit room',
        tooltip: 'with remnants of colorful murals',
        explanation: 'a space brightened by art and sunlight'
      },
      {
        label: 'basement storage',
        tooltip: 'damp with water and overgrown mold',
        explanation: 'where residents stored belongings and goods'
      },
      {
        label: 'charred remains of a small shop',
        tooltip: 'goods scattered and spoiled',
        explanation: 'a place where residents purchased daily necessities'
      }
    ]
  },
  'rural grange with outbuildings': {
    locations: [
      {
        label: 'collapsed barn',
        tooltip: 'with exposed wooden beams and hay remnants',
        explanation: 'this barn once housed livestock and stored hay for the farm'
      },
      {
        label: 'overgrown orchard',
        tooltip: 'where old fruit trees still blossom',
        explanation: 'a source of fruit and shade, this orchard was once tended carefully'
      },
      {
        label: 'stone well',
        tooltip: 'half-filled with murky water and encircled by moss',
        explanation: 'this well provided fresh water to the farmstead'
      },
      {
        label: 'crumbling silo',
        tooltip: 'towering tall with a caved-in roof',
        explanation: 'used for storing grain or silage for livestock'
      },
      {
        label: 'abandoned stable',
        tooltip: 'stalls open and signs of old harnesses',
        explanation: 'horses or other working animals were once sheltered here'
      },
      {
        label: 'forgotten root cellar',
        tooltip: 'dark entrance leading underground',
        explanation: 'a cool storage space for preserving foodstuffs'
      },
      {
        label: 'dilapidated chicken coop',
        tooltip: 'with rusted wire mesh and nests',
        explanation: 'chickens were kept here, providing eggs and meat for the farm'
      },
      {
        label: 'fallen windmill',
        tooltip: 'with tattered sails lying amidst wildflowers',
        explanation: 'used to grind grain or pump water for the farm'
      },
      {
        label: 'decayed toolshed',
        tooltip: 'with scattered implements and old boots',
        explanation: 'where farm tools and equipment were stored'
      },
      {
        label: 'once-lively pond',
        tooltip: 'now stagnant with a broken wooden dock',
        explanation: 'a source of water and relaxation, perhaps used for fishing'
      },
      {
        label: 'ruined greenhouse',
        tooltip: 'glass panes missing and overgrowth inside',
        explanation: 'where plants were grown and tended year-round'
      },
      {
        label: 'fenced paddock',
        tooltip: 'gate hanging open and long grass waving',
        explanation: 'an enclosed space where livestock could graze or exercise'
      }
    ]
  },
  'compact fortified village': {
    locations: [
      {
        label: 'crumbled watchtower',
        tooltip: 'overlooking the entire village',
        explanation: 'a strategic point for surveillance and defense'
      },
      {
        label: 'dilapidated gatehouse',
        tooltip: 'main entrance with rusted portcullis',
        explanation: 'the main point of entry and exit, crucial for village security'
      },
      {
        label: 'broken armory',
        tooltip: 'scattered weapons and faded banners',
        explanation: 'where weapons and armor were stored for village defense'
      },
      {
        label: 'collapsed granary',
        tooltip: 'remnants of grain and storage barrels',
        explanation: "stored the village's grain and food supplies"
      },
      {
        label: 'decaying barracks',
        tooltip: 'bunk beds and discarded armor pieces',
        explanation: "where the village's defenders lived and rested"
      },
      {
        label: 'ancient chapel',
        tooltip: 'shattered stained glass windows',
        explanation: 'a spiritual center for villagers, where ceremonies and prayers were held'
      },
      {
        label: 'overgrown smithy',
        tooltip: 'rusting tools and a cold forge',
        explanation: 'where metalwork was done, from weapons to household items'
      },
      {
        label: 'deserted marketplace',
        tooltip: 'remnants of stalls and goods',
        explanation: 'the economic heart of the village, bustling with trade on market days'
      },
      {
        label: 'worn down stables',
        tooltip: 'empty pens and scattered hay',
        explanation: "housed the village's horses and other livestock"
      },
      {
        label: 'toppled walls',
        tooltip: 'ivy-covered stones and missing bricks',
        explanation: 'once protected the village from external threats'
      },
      {
        label: 'sunken well',
        tooltip: 'with an old rusted bucket chain',
        explanation: 'provided fresh water to the village'
      },
      {
        label: 'fractured guard post',
        tooltip: 'arrow slits facing the perimeter',
        explanation: 'strategic points from which guards monitored for threats'
      }
    ]
  },
  'hidden shelter against calamity': {
    locations: [
      {
        label: 'buried library',
        tooltip: 'where ancient knowledge lies forgotten',
        explanation: 'a repository of knowledge meant to outlast disaster'
      },
      {
        label: 'hidden cave',
        tooltip: 'shielded by a thick tangle of roots',
        explanation: 'a natural refuge, offering shelter from the outside world'
      },
      {
        label: 'silent chapel',
        tooltip: 'fractured stained glass casting colorful shadows',
        explanation: 'a spiritual sanctuary for those seeking solace during trying times'
      },
      {
        label: 'subterranean spring',
        tooltip: 'providing fresh water despite decay',
        explanation: "an essential source of fresh water for the shelter's inhabitants"
      },
      {
        label: 'secluded grove',
        tooltip: 'with a moss-covered sanctuary stone',
        explanation: 'a quiet, natural space for reflection and meditation'
      },
      {
        label: 'tangled escape tunnel',
        tooltip: 'roots and rocks blocking the path',
        explanation: "intended as an emergency exit, now obstructed by nature's reclaim"
      },
      {
        label: 'abandoned workshop',
        tooltip: 'tools and blueprints covered in dust',
        explanation: 'where tools and equipment were crafted and repaired'
      },
      {
        label: 'concealed courtyard',
        tooltip: 'where the wary once gathered and planned',
        explanation: 'a communal space for discussion and planning'
      },
      {
        label: 'collapsed entrance',
        tooltip: 'thick stone walls obscured by ivy',
        explanation: 'the main entryway, now difficult to discern from the surroundings'
      },
      {
        label: 'secret underground chamber',
        tooltip: 'reinforced with metallic beams',
        explanation: 'a room designed to withstand the harshest of conditions'
      },
      {
        label: 'waterlogged storage',
        tooltip: 'shelves lined with empty jars and canisters',
        explanation: 'where provisions and supplies were once kept'
      },
      {
        label: 'concealed armory',
        tooltip: 'rusted weapons and armor strewn about',
        explanation: 'stored defensive equipment, now in a state of decay'
      }
    ]
  },
  'mazey urban residential block': {
    locations: [
      {
        label: 'crumbling facade',
        tooltip: 'with traces of old brickwork and moss',
        explanation: 'this facade once bore witness to the vibrant life of the city'
      },
      {
        label: 'once-bustling marketplace',
        tooltip: 'now filled with overgrown weeds',
        explanation: 'a hub of trade and commerce, now reclaimed by nature'
      },
      {
        label: 'eroded statue base',
        tooltip: 'hinting at a forgotten hero or leader',
        explanation: 'a memorial to someone once held in high regard by the residents'
      },
      {
        label: 'charred remnants',
        tooltip: 'where a communal kitchen once thrived',
        explanation: 'this place once filled with warmth and the aroma of shared meals'
      },
      {
        label: 'narrow alleyway',
        tooltip: 'choked with debris and shadows of the past',
        explanation: 'a path once tread by countless feet, now silent and forgotten'
      },
      {
        label: 'former artisan workshop',
        tooltip: 'tools scattered and gathering dust',
        explanation: 'here, skilled hands once crafted items with care and precision'
      },
      {
        label: 'old well',
        tooltip: 'now dried up but surrounded by memories',
        explanation: 'a source of life and sustenance for the community, now empty'
      },
      {
        label: 'desolate rooftop garden',
        tooltip: 'with dead plants and cracked pots',
        explanation: 'a green escape in an urban landscape, now withered and decayed'
      },
      {
        label: 'broken cobblestone street',
        tooltip: 'weaving between decaying homes',
        explanation: 'a path once bustling with life, now eerily silent'
      },
      {
        label: 'collapsed townhouse entryway',
        tooltip: 'a lonely doorframe standing',
        explanation: 'once a gateway to a home, now stands as a silent sentinel'
      },
      {
        label: 'boarded-up bakery',
        tooltip: 'remnants of ovens and stale scents linger',
        explanation:
          'once filled with the delightful aroma of baked goods, now a shadow of its past'
      },
      {
        label: 'caved-in library',
        tooltip: 'with torn pages and forgotten tales',
        explanation: 'a repository of knowledge and stories, now in ruins'
      }
    ]
  },
  'rubble-wrought makeshift village': {
    locations: [
      {
        label: 'collapsed tower',
        tooltip: 'remnants of spiral stairs weaving up',
        explanation: 'a vantage point that once provided a view of the entire village'
      },
      {
        label: 'shattered well',
        tooltip: 'with moss-covered stones and a frayed rope',
        explanation: 'a communal source of water, now in ruins'
      },
      {
        label: 'half-buried house',
        tooltip: 'only the chimneys peeking above ground',
        explanation:
          'a residence once filled with laughter and warmth, now nearly swallowed by the earth'
      },
      {
        label: 'crumbled marketplace',
        tooltip: 'scattered stalls and worn-out pathways',
        explanation: 'once the economic heart of the village, now lies in ruin'
      },
      {
        label: 'broken bridge',
        tooltip: 'arching over a dried-up riverbed',
        explanation: 'a vital connector between parts of the village, now broken and impassable'
      },
      {
        label: 'dilapidated chapel',
        tooltip: 'stained-glass fragments catching sunlight',
        explanation: 'a spiritual center for the village, now in a state of decay'
      },
      {
        label: 'fallen inn',
        tooltip: 'where rotting beams hint at past merriment',
        explanation: 'a place of rest and community gathering, now desolate'
      },
      {
        label: 'devastated bakery',
        tooltip: 'a rusted oven and ancient flour sacks',
        explanation: 'where delicious treats were once baked, now stands in ruin'
      },
      {
        label: 'toppled walls',
        tooltip: 'with faded murals of village life',
        explanation: 'walls that once protected and adorned the village, now fallen'
      },
      {
        label: 'ruined smithy',
        tooltip: 'an anvil still intact amid ash and cinder',
        explanation: 'where tools and weapons were forged, now cold and abandoned'
      },
      {
        label: 'fractured granary',
        tooltip: 'scattered grains becoming new life',
        explanation: 'where the village stored its harvest, now scattered to the winds'
      },
      {
        label: 'sunken library',
        tooltip: 'tattered books submerged in rain pools',
        explanation: 'a place of learning and reflection, now drowned in sorrow'
      }
    ]
  },
  'ancient arcology or fragment of it': {
    locations: [
      {
        label: 'vast central plaza',
        tooltip: 'overgrown with nature reclaiming its space',
        explanation: 'once the heart of the arcology, now overtaken by nature'
      },
      {
        label: 'derelict greenhouse',
        tooltip: 'with shattered domes letting in sunlight',
        explanation: 'where flora was nurtured and studied, now exposed and abandoned'
      },
      {
        label: 'crumbling transportation hub',
        tooltip: 'remnants of tracks disappearing into rubble',
        explanation: 'a nexus of movement and trade, now stationary and silent'
      },
      {
        label: 'flooded subterranean chambers',
        tooltip: 'with hints of once-held communal spaces',
        explanation: 'underground spaces for community gatherings, now submerged and forgotten'
      },
      {
        label: 'skeletal residential blocks',
        tooltip: 'with empty window frames echoing past lives',
        explanation: 'homes that once held countless lives, now standing as hollow reminders'
      },
      {
        label: 'faded mural walls',
        tooltip: 'where forgotten stories of harmony still linger',
        explanation: "artworks that once depicted the arcology's ideals and history"
      },
      {
        label: 'wind-whipped rooftop gardens',
        tooltip: 'where hardy plants have taken root',
        explanation: 'spaces of greenery and relaxation, now wild and untamed'
      },
      {
        label: 'shattered energy core',
        tooltip: 'with flickers of dormant power occasionally pulsing',
        explanation: "the heart of the arcology's power, now fractured and fading"
      },
      {
        label: 'decommissioned water filtration room',
        tooltip: 'with dried pools and empty channels',
        explanation: 'once ensured clean water for all residents, now dry and desolate'
      },
      {
        label: 'fragmented marketplace',
        tooltip: 'where silent stalls hint at once bustling trade',
        explanation: 'trade and commerce hub, now eerily silent'
      },
      {
        label: 'worn-out air purification center',
        tooltip: 'with giant fans frozen in time',
        explanation: 'ensured clean air for the arcology, now still and quiet'
      },
      {
        label: 'collapsed vertical farm',
        tooltip: 'with layers of once-lush vegetation turned skeletal',
        explanation: 'provided fresh produce for the community, now withered and decayed'
      }
    ]
  },
  'outpost of refugees or recluses': {
    locations: [
      {
        label: 'crumbling watchtower',
        tooltip: 'offering a panoramic view of the surroundings',
        explanation:
          'served as a vantage point for the community, watching for dangers and visitors alike'
      },
      {
        label: 'overgrown herb garden',
        tooltip: 'where rare medicinal plants thrive',
        explanation: "an essential source of healing and care for the outpost's residents"
      },
      {
        label: 'decaying library',
        tooltip: 'with scattered books and forgotten lore',
        explanation: 'a repository of knowledge and wisdom, now fading into obscurity'
      },
      {
        label: 'hidden underground chamber',
        tooltip: 'used for secretive meetings',
        explanation: 'a place where confidential matters and plans were discussed'
      },
      {
        label: 'worn-out communal hall',
        tooltip: 'bearing marks of countless gatherings',
        explanation: 'where the community came together to celebrate, deliberate, and bond'
      },
      {
        label: 'collapsed infirmary',
        tooltip: 'where healers once tended to the weak',
        explanation: 'a place of healing and recuperation for the injured and sick'
      },
      {
        label: 'weathered stone statues',
        tooltip: 'symbols of guardians watching over the outpost',
        explanation: 'crafted in homage to protectors and guardians of the community'
      },
      {
        label: 'tattered living quarters',
        tooltip: 'where memories of families linger',
        explanation: 'homes that once provided shelter and warmth to families of the outpost'
      },
      {
        label: 'ruined storage area',
        tooltip: 'with remnants of preserved food and tools',
        explanation: 'where essential supplies and tools were stored for communal use'
      },
      {
        label: 'broken fountain',
        tooltip: 'once a source of fresh water and tranquility',
        explanation: 'a symbol of prosperity and a meeting point for the community'
      },
      {
        label: 'isolated meditation alcove',
        tooltip: 'for moments of solitude and reflection',
        explanation: 'a sanctuary for individuals seeking peace and introspection'
      },
      {
        label: 'abandoned workshop',
        tooltip: 'filled with rusting tools of old crafts',
        explanation: "where skilled hands once crafted items essential for the outpost's survival"
      }
    ]
  },
  'sprawling slum of shanties and huts': {
    locations: [
      {
        label: 'collapsed hut',
        tooltip: 'with torn fabric walls and a broken roof',
        explanation: 'once a shelter for families, now rendered uninhabitable'
      },
      {
        label: 'abandoned well',
        tooltip: 'surrounded by empty buckets and ropes',
        explanation: 'a vital source of water for the community, now dry and deserted'
      },
      {
        label: 'charred cookfire',
        tooltip: 'with scattered pots and half-burnt logs',
        explanation: 'a communal space for cooking and sharing meals, now cold and unused'
      },
      {
        label: 'deserted marketplace',
        tooltip: 'with overturned stalls and faded wares',
        explanation: 'once a bustling hub of trade and commerce, now silent and abandoned'
      },
      {
        label: 'ruined bridge',
        tooltip: 'with splintered wood and missing planks',
        explanation: 'a vital connection within the slum, now broken and impassable'
      },
      {
        label: 'dilapidated shrine',
        tooltip: 'with faded icons and wilted flowers',
        explanation: 'a place of worship and reflection, its sanctity now faded'
      },
      {
        label: 'crumbled wall',
        tooltip: 'with graffiti and remnants of posters',
        explanation: "bearing marks of the community's expressions, now slowly eroding away"
      },
      {
        label: 'shattered alley',
        tooltip: 'with discarded tools and trash heaps',
        explanation: 'a byway of the slum, showing traces of daily life and activity'
      },
      {
        label: 'toppled watchtower',
        tooltip: 'with a rusted bell and scattered bricks',
        explanation: 'once a lookout point for the community, now lying in ruins'
      },
      {
        label: 'deserted communal bath',
        tooltip: 'with cracked basins and empty pitchers',
        explanation: 'a space for cleanliness and relaxation, now abandoned'
      },
      {
        label: 'hollowed-out storeroom',
        tooltip: 'with spilled grains and gnawed baskets',
        explanation: 'where food and essentials were stored, now ravaged and empty'
      },
      {
        label: 'sunken boat',
        tooltip: 'with tattered sails and algae-covered hull',
        explanation: 'once used for transport or fishing, now submerged and forgotten'
      }
    ]
  },
  'inhabited natural feature or cave': {
    locations: [
      {
        label: 'hidden alcove',
        tooltip: 'remnants of moss-covered stone beds',
        explanation: 'a sheltered spot for rest and solitude within the cave system'
      },
      {
        label: 'collapsed tunnel',
        tooltip: 'faint murals of ancient rituals',
        explanation: "a passage bearing marks of a civilization's history and beliefs"
      },
      {
        label: 'underwater grotto',
        tooltip: 'skeletal remains of wooden docks',
        explanation: 'a submerged chamber that once facilitated trade or habitation'
      },
      {
        label: 'vast chamber',
        tooltip: 'decayed pillars and a shattered altar',
        explanation: 'a central gathering or worship place now in ruins'
      },
      {
        label: 'narrow ledge',
        tooltip: 'crumbling homes with views of abyss below',
        explanation: 'precarious dwellings that once offered breathtaking views of the depths'
      },
      {
        label: 'underground spring',
        tooltip: 'rusted tools near abandoned wells',
        explanation: 'a fresh water source for inhabitants, marked by tools of its use'
      },
      {
        label: 'hollowed tree roots',
        tooltip: 'traces of old campfires and pottery',
        explanation: 'a natural shelter turned dwelling, bearing signs of life and community'
      },
      {
        label: 'high ceiling cave',
        tooltip: 'shattered crystal chandeliers swaying',
        explanation: 'a grand space adorned with artifacts, now in decay'
      },
      {
        label: 'petrified forest grove',
        tooltip: 'remains of built-in tree dwellings',
        explanation: 'once-living trees turned homes, now preserved in time'
      },
      {
        label: 'ancient amphitheater',
        tooltip: 'stone seats overgrown with ferns',
        explanation: 'a space for community gatherings and performances, reclaimed by nature'
      },
      {
        label: 'submerged passage',
        tooltip: 'dilapidated wooden bridges rotting',
        explanation: 'once a route connecting parts of the cave, now underwater and decaying'
      },
      {
        label: 'lichen-covered sanctuary',
        tooltip: 'ghostly statues in quiet prayer',
        explanation: 'a sacred space for reflection and worship, now silent and weathered'
      }
    ]
  },
  'grand fortress of major significance': {
    locations: [
      {
        label: 'crumbling watchtower',
        tooltip: 'overlooking the distant horizon',
        explanation:
          'this tower served as a lookout, watching for threats and signaling the fortress'
      },
      {
        label: 'shattered drawbridge',
        tooltip: 'with remnants of iron chains',
        explanation: "this once protected the fortress's entrance, only lowering for allies"
      },
      {
        label: 'once-grand throne room',
        tooltip: 'weathered mosaics telling tales',
        explanation: 'this room was where the ruler held court and made crucial decisions'
      },
      {
        label: 'collapsed barracks',
        tooltip: 'broken beds and rusted weapons',
        explanation: "this was where the fortress's soldiers rested and prepared for battle"
      },
      {
        label: 'dilapidated armory',
        tooltip: 'with shelves of ancient armor pieces',
        explanation: 'this room stored weapons and armor, readying soldiers for war'
      },
      {
        label: 'overgrown courtyard',
        tooltip: 'with statues eroded by time',
        explanation:
          'this open space was for gatherings, training, and honoring heroes with statues'
      },
      {
        label: 'battered dining hall',
        tooltip: 'long tables and scattered utensils',
        explanation: "this hall fed the fortress's inhabitants, fostering unity during meals"
      },
      {
        label: 'forsaken library',
        tooltip: 'decaying books of ancient knowledge',
        explanation: 'a trove of knowledge, this library held the collective wisdom of the fortress'
      },
      {
        label: 'broken-down gates',
        tooltip: 'majestic insignias barely visible',
        explanation: "these gates symbolized the fortress's strength, bearing its insignias proudly"
      },
      {
        label: 'underground dungeon',
        tooltip: 'cells with rusted locks and chains',
        explanation:
          "this grim space imprisoned foes and traitors, ensuring the fortress's security"
      },
      {
        label: 'desolate chapel',
        tooltip: 'stained glass shards reflecting light',
        explanation:
          "a spiritual refuge, this chapel provided solace and guidance to the fortress's inhabitants"
      },
      {
        label: 'eroded walls',
        tooltip: 'engraved with the stories of great battles',
        explanation: 'these walls protected the fortress and bore tales of its glorious past'
      }
    ]
  },
  'hidden bunker or strongpoint': {
    locations: [
      {
        label: 'collapsed entrance',
        tooltip: 'obscured by overgrown vegetation',
        explanation: "this entrance provided stealthy access, now hidden by nature's reclaim"
      },
      {
        label: 'damp control room',
        tooltip: 'with rusted levers and flickering lights',
        explanation: "this was the bunker's operational heart, coordinating its functions"
      },
      {
        label: 'shattered armory',
        tooltip: 'with scattered weapons and broken lockers',
        explanation: "this space stored the bunker's defenses, ensuring its occupants' safety"
      },
      {
        label: 'echoey hallway',
        tooltip: 'lined with remnants of old posters',
        explanation: 'this corridor connected rooms, with posters reminding of the outside world'
      },
      {
        label: 'generator chamber',
        tooltip: 'silent with long-dead machinery',
        explanation: 'this chamber powered the bunker, ensuring its self-sufficiency'
      },
      {
        label: 'observation post',
        tooltip: 'overlooking a decayed landscape',
        explanation: 'this post kept watch over the outside, alerting of threats and changes'
      },
      {
        label: 'sealed vault door',
        tooltip: 'with faded symbols and a jammed wheel',
        explanation: "this door protected the bunker's most valuable assets, now sealed forever"
      },
      {
        label: 'mess hall',
        tooltip: 'with broken tables and scattered utensils',
        explanation:
          "this space nourished the bunker's inhabitants, fostering community in isolation"
      },
      {
        label: 'waterlogged barracks',
        tooltip: 'with moldy bunks and tattered flags',
        explanation: 'this space provided rest for the weary, now damp and forgotten'
      },
      {
        label: 'cracked watchtower',
        tooltip: 'with a fallen ladder and shattered glass',
        explanation: "this tower offered a high vantage point, monitoring the bunker's surroundings"
      },
      {
        label: 'ventilation shaft',
        tooltip: 'choked with debris and signs of nesting animals',
        explanation: 'this shaft brought fresh air, now blocked and home to wildlife'
      },
      {
        label: 'collapsed tunnel',
        tooltip: 'blocked by rubble and dark shadows',
        explanation: 'this passage connected different sections, now blocked and inaccessible'
      }
    ]
  },
  'remote frontier keep': {
    locations: [
      {
        label: 'weathered battlement',
        tooltip: 'with broken crenellations and moss',
        explanation: 'once a vantage point and defense, it now succumbs to nature and time'
      },
      {
        label: 'main gate',
        tooltip: 'splintered with signs of a long-ago siege',
        explanation: 'this entry bore witness to battles, with scars of a bygone siege'
      },
      {
        label: 'crumbling tower',
        tooltip: 'offering views of wild lands',
        explanation: 'a lookout point to spot threats, now a relic overlooking untamed lands'
      },
      {
        label: 'former armory',
        tooltip: 'with rusted weapons and moth-eaten banners',
        explanation: "where weapons were kept ready, it's now a testament to decay and neglect"
      },
      {
        label: 'shattered great hall',
        tooltip: 'with a collapsed roof and charred beams',
        explanation: 'once the heart of the keep, now lies in ruin, echoing past festivities'
      },
      {
        label: 'overgrown courtyard',
        tooltip: 'with a dried-up well and scattered stones',
        explanation: 'a former gathering place, nature has reclaimed this once-busy space'
      },
      {
        label: 'forgotten dungeon',
        tooltip: 'with damp cells and rusted shackles',
        explanation: "a grim reminder of the keep's dark past, it now lies silent and cold"
      },
      {
        label: "guard's barracks",
        tooltip: 'with tattered beds and a silent hearth',
        explanation: "once housing the keep's defenders, it's now a desolate shell"
      },
      {
        label: 'collapsed chapel',
        tooltip: 'with a fractured altar and faded frescoes',
        explanation: 'a place of worship and solace, now stands as a monument to forgotten faith'
      },
      {
        label: 'outer walls',
        tooltip: 'with ivy climbing and stones scattered about',
        explanation:
          "these walls protected the keep, now they're but a shadow of their former strength"
      },
      {
        label: 'remains of stables',
        tooltip: 'with rotting hay and ghostly echoes',
        explanation: 'horses and riders once filled this space, only memories remain'
      },
      {
        label: 'ruined library',
        tooltip: 'with water-damaged books and broken shelves',
        explanation: 'a treasure trove of knowledge, now succumbs to dampness and neglect'
      }
    ]
  },
  'secret operations base': {
    locations: [
      {
        label: 'collapsed entrance',
        tooltip: 'heavily guarded in its prime',
        explanation: 'the main access, it once saw guards and officials pass, now lies in ruin'
      },
      {
        label: 'deserted armory',
        tooltip: 'scattered with empty weapon racks',
        explanation: 'once stocked with advanced weaponry, all that remains are empty racks'
      },
      {
        label: 'flooded interrogation chamber',
        tooltip: 'with a single spotlight',
        explanation: 'a room of secrets and pain, now submerged and eerily lit'
      },
      {
        label: 'abandoned medical bay',
        tooltip: 'surgical tools scattered about',
        explanation:
          'intended for healing, its tools now lie scattered, hinting at hurried desertion'
      },
      {
        label: 'concealed tunnel system',
        tooltip: 'roots breaking through walls',
        explanation: 'these tunnels facilitated discreet movement, nature now breaches its secrecy'
      },
      {
        label: 'fire-damaged laboratory',
        tooltip: 'mysterious vials left behind',
        explanation: 'once a hub of innovation, a fire seems to have halted its endeavors'
      },
      {
        label: 'dilapidated barracks',
        tooltip: 'bunk beds now moss-covered',
        explanation: 'once housing operatives, the dampness and moss signal its desertion'
      },
      {
        label: 'underground bunker',
        tooltip: 'with rusted metal doors',
        explanation: 'a safe retreat during threats, its doors now rusted shut'
      },
      {
        label: 'shattered control room',
        tooltip: 'filled with archaic equipment',
        explanation: 'the nerve center of the base, now filled with obsolete technology'
      },
      {
        label: 'sealed vault',
        tooltip: 'thick door pried halfway open',
        explanation:
          'holding secrets or valuables, its contents seem to have been forcibly accessed'
      },
      {
        label: 'isolated cell block',
        tooltip: 'graffiti marking the walls',
        explanation: 'used to hold prisoners or test subjects, the graffiti hints at their stories'
      },
      {
        label: 'scorched mess hall',
        tooltip: 'abandoned trays and dishes',
        explanation: 'once lively with conversation, now bears the scars of a sudden disaster'
      }
    ]
  },
  'isolated watchtower': {
    locations: [
      {
        label: 'crumbled entrance',
        tooltip: 'with vines and weathered stones',
        explanation: 'once the main entryway, nature has now taken over its stony facade'
      },
      {
        label: 'broken spiral staircase',
        tooltip: 'missing several steps',
        explanation: "leading to the tower's heights, many steps have been lost to time"
      },
      {
        label: 'collapsed roof section',
        tooltip: 'with exposed beams and sky view',
        explanation: 'the topmost covering gave way, now offering an unobstructed view of the skies'
      },
      {
        label: 'charred guardroom',
        tooltip: 'remnants of a fireplace and ash',
        explanation: 'a fire once raged here, leaving behind only remnants of a once-busy guardroom'
      },
      {
        label: 'shattered windows',
        tooltip: 'with rusted iron frames hanging loosely',
        explanation: 'broken and battered by time, they barely hold the rusted iron frames'
      },
      {
        label: 'weathered stone walls',
        tooltip: 'with faded inscriptions and graffiti',
        explanation:
          'these walls have seen many tales, from inscriptions to graffiti over the years'
      },
      {
        label: 'overgrown courtyard',
        tooltip: 'with wildflowers and broken cobblestones',
        explanation: 'nature has reclaimed this once-paved space, making it a garden of wildflowers'
      },
      {
        label: 'forgotten armory',
        tooltip: 'with rusted weapons and broken shields',
        explanation: "once storing the tower's defenses, the armory now lays in rusted disarray"
      },
      {
        label: 'dilapidated barracks',
        tooltip: 'with rotten wooden bunks and torn fabric',
        explanation: 'where the guards once rested, time has left only decay'
      },
      {
        label: 'eroded parapet',
        tooltip: 'with a panoramic view of the distant lands',
        explanation: 'a vantage point to see afar, it now offers a vista of the untouched lands'
      },
      {
        label: 'underground storage',
        tooltip: 'with damp walls and remnants of provisions',
        explanation: 'where supplies were kept, dampness and time have taken their toll'
      },
      {
        label: 'moss-covered well',
        tooltip: 'with a broken bucket and frayed rope',
        explanation: 'once a source of fresh water, it now stands unused and moss-covered'
      }
    ]
  },
  'battered front-line fortress': {
    locations: [
      {
        label: 'crumbled watchtower',
        tooltip: 'overlooking a devastated landscape',
        explanation: 'it once stood vigilant, now it overlooks a land scarred by warfare'
      },
      {
        label: 'shattered barracks',
        tooltip: 'with scattered weapons and armor',
        explanation: 'where soldiers once rested, now only remnants of war remain'
      },
      {
        label: 'broken stone wall',
        tooltip: 'pocked with arrows and artillery impacts',
        explanation: "bearing the brunt of many sieges, it's marred with the memories of battles"
      },
      {
        label: 'underground tunnel',
        tooltip: 'dark and partially collapsed',
        explanation: 'a secret path or escape, its safety is now compromised by its decay'
      },
      {
        label: 'war-torn courtyard',
        tooltip: 'overgrown with weeds and wildflowers',
        explanation: "once a bustling hub, it now lies quiet, save for nature's reclaim"
      },
      {
        label: 'ruined armory',
        tooltip: 'shelves empty and racks askew',
        explanation: "housing the fortress' weapons, it now stands desolate and ransacked"
      },
      {
        label: 'breached main gate',
        tooltip: 'with splintered wood and rusty chains',
        explanation: 'the primary defense, it was eventually broken by besiegers'
      },
      {
        label: 'collapsed bridge',
        tooltip: 'leading to a now unreachable tower',
        explanation: 'once connecting parts of the fortress, it now lies as a broken path'
      },
      {
        label: 'charred council room',
        tooltip: 'with a half-burnt strategy table',
        explanation: 'where strategies were discussed, a fire seems to have disrupted its purpose'
      },
      {
        label: 'damaged moat',
        tooltip: 'drained and filled with debris',
        explanation: 'a watery defense, it has been drained, likely by attackers to gain access'
      },
      {
        label: 'fallen guard post',
        tooltip: 'next to the remnants of a drawbridge',
        explanation: 'guarding the drawbridge, it saw many an advancing enemy before its fall'
      },
      {
        label: 'shattered shrine',
        tooltip: 'with faded murals and broken idols',
        explanation: "a place of solace and prayer, it too wasn't spared from warfare's wrath"
      }
    ]
  },
  'military training camp': {
    locations: [
      {
        label: 'crumbled watchtower',
        tooltip: 'overlooking the entire camp',
        explanation:
          "this structure once allowed for an overview of training activities and ensured the camp's security"
      },
      {
        label: 'collapsed barracks',
        tooltip: 'with rusty bunk beds scattered',
        explanation: 'where soldiers rested after rigorous training, now lies in ruin'
      },
      {
        label: 'overgrown obstacle course',
        tooltip: 'ropes and wooden logs askew',
        explanation:
          "a testament to the physical training soldiers underwent, it now succumbs to nature's reclaim"
      },
      {
        label: 'remnants of a mess hall',
        tooltip: 'broken tables and chairs',
        explanation: 'a gathering place for meals and camaraderie, now devoid of life'
      },
      {
        label: 'shattered armory',
        tooltip: 'with pieces of armor and weapons',
        explanation:
          'once stocked with equipment for training and battle, it now stands empty and broken'
      },
      {
        label: 'weathered command tent',
        tooltip: 'tattered maps still visible',
        explanation:
          "from where the camp's operations were directed, only faded remnants of plans remain"
      },
      {
        label: 'decayed medical tent',
        tooltip: 'with rusted surgical tools',
        explanation:
          'a place of healing and care for the injured, it now houses only the ghosts of its past'
      },
      {
        label: 'remnants of a blacksmith forge',
        tooltip: 'charred tools nearby',
        explanation: 'where weapons and tools were crafted and repaired, now lies dormant'
      },
      {
        label: 'abandoned training grounds',
        tooltip: 'with faded target dummies',
        explanation:
          'the heart of the camp where soldiers honed their skills, now silent and unused'
      },
      {
        label: 'fallen wooden watchtowers',
        tooltip: 'connected with frayed ropes',
        explanation:
          'these structures provided additional vantage points for overseeing the camp and its surroundings'
      },
      {
        label: "old quartermaster's store",
        tooltip: 'scattered uniforms and badges',
        explanation: 'where supplies and uniforms were distributed, it now stands abandoned'
      },
      {
        label: 'deserted kennels',
        tooltip: 'with chewed bones and empty chains',
        explanation:
          "once housing the camp's loyal guard dogs, only traces of their existence remain"
      }
    ]
  },
  'gatehouse controlling a vital pass': {
    locations: [
      {
        label: 'crumbling tower',
        tooltip: 'overseeing the entire pass',
        explanation: 'a vital lookout point ensuring control and safety of the pass below'
      },
      {
        label: 'shattered drawbridge',
        tooltip: 'with splintered wood and chains',
        explanation:
          'once the primary entry and exit point, it has been rendered unusable by time and conflict'
      },
      {
        label: 'moss-covered gate',
        tooltip: 'half-sunken into the ground',
        explanation: 'this once grand entryway now succumbs to the weight of time and nature'
      },
      {
        label: 'tattered guard quarters',
        tooltip: 'with remnants of old beds',
        explanation: 'home to the sentinels who once protected the pass, it now lies desolate'
      },
      {
        label: 'collapsed archway',
        tooltip: 'etched with ancient symbols',
        explanation:
          'marking the grandeur and significance of the pass, it now stands as a relic of a bygone era'
      },
      {
        label: 'broken cobblestone road',
        tooltip: 'leading up to the entrance',
        explanation: 'the main thoroughfare for travelers and merchants, now broken and treacherous'
      },
      {
        label: 'overgrown guard posts',
        tooltip: 'slowly consumed by vegetation',
        explanation: 'strategically placed for defense, they are now being overtaken by nature'
      },
      {
        label: 'charred remains of a brazier',
        tooltip: 'once bright and warm',
        explanation: 'provided light and warmth to the guards during cold nights'
      },
      {
        label: 'scattered weaponry',
        tooltip: 'rusted and long abandoned',
        explanation: 'left behind from past skirmishes or simply forgotten, they now lay discarded'
      },
      {
        label: 'dilapidated stable',
        tooltip: 'with decaying hay and stalls',
        explanation:
          'once sheltering the horses that carried travelers through the pass, it stands in neglect'
      },
      {
        label: 'ancient map room',
        tooltip: 'with faded parchments on walls',
        explanation:
          'a room of strategy and planning, its importance is hinted at by the aged maps still adorning its walls'
      },
      {
        label: 'weathered battlements',
        tooltip: 'overgrown with ivy and vines',
        explanation:
          "the primary defense against invaders, they now serve as a testament to the gatehouse's long history"
      }
    ]
  },
  'half-subterranean entrenchments': {
    locations: [
      {
        label: 'collapsed entranceway',
        tooltip: 'overgrown with wild vines',
        explanation: 'once the main access to the entrenchments, nature has now reclaimed its hold'
      },
      {
        label: 'damp underground chamber',
        tooltip: 'walls etched with battle marks',
        explanation: 'a space that bore witness to fierce battles, its walls tell tales of strife'
      },
      {
        label: 'shattered watchtower',
        tooltip: 'only half standing',
        explanation: 'used to monitor enemy movement and give commands, it now stands broken'
      },
      {
        label: 'hidden storage alcove',
        tooltip: 'filled with rusted weapons',
        explanation: 'a concealed space for storing vital weaponry, its contents now decayed'
      },
      {
        label: 'waterlogged trench',
        tooltip: 'where puddles reflect the sky',
        explanation:
          'once teeming with soldiers, this trench now captures mere reflections of the past'
      },
      {
        label: 'crumbling command post',
        tooltip: 'remnants of orders scattered about',
        explanation: 'from where strategies were devised and orders given, only fragments remain'
      },
      {
        label: 'barricaded medical bay',
        tooltip: 'stained cots left abandoned',
        explanation:
          'a place for healing and respite, it bears stains of battles fought and lives lost'
      },
      {
        label: 'hollowed-out bunk space',
        tooltip: 'with tattered sleeping rolls',
        explanation: 'soldiers once rested here, with only their worn sleeping rolls left behind'
      },
      {
        label: 'moss-covered artillery position',
        tooltip: 'cannons silenced long ago',
        explanation: 'once a formidable defense point, the cannons now lay silent and forgotten'
      },
      {
        label: 'fragmented stone wall',
        tooltip: 'hints of murals beneath the dust',
        explanation: 'a testament to the culture and pride of its creators, now eroded by time'
      },
      {
        label: 'sunken mess hall',
        tooltip: 'with broken tables and benches',
        explanation: "where soldiers gathered for meals and camaraderie, it's now a silent relic"
      }
    ]
  },
  'military cache or storehouse': {
    locations: [
      {
        label: 'crumbled watchtower',
        tooltip: 'overlooking the distant wilds',
        explanation:
          'once used for surveillance and protection, it now offers a view of reclaimed wilderness'
      },
      {
        label: 'moss-covered armory',
        tooltip: 'shelves half-empty and rusting',
        explanation: 'a repository of weapons and armor, now succumbing to decay'
      },
      {
        label: 'dilapidated command tent',
        tooltip: 'canvas faded and tattered',
        explanation: 'from where operations were overseen, only a tattered structure remains'
      },
      {
        label: 'sunken storage pit',
        tooltip: 'filled with remnants of grain and cloth',
        explanation: 'vital supplies were stored here, but only traces now remain'
      },
      {
        label: 'fractured weapons rack',
        tooltip: 'spears and swords scattered about',
        explanation:
          'once organized and ready for distribution, the weapons now lay scattered and forgotten'
      },
      {
        label: 'broken cart',
        tooltip: 'wheels missing with traces of supply crates',
        explanation: 'used for transporting supplies, it has been rendered immobile by time'
      },
      {
        label: 'collapsed barracks',
        tooltip: 'with bunk beds rotting away',
        explanation: 'once home to the soldiers guarding the cache, it now stands in ruin'
      },
      {
        label: 'decaying stable',
        tooltip: 'remnants of old tack and hay',
        explanation:
          'shelter for the horses that transported supplies, only remnants hint at its past purpose'
      },
      {
        label: 'flooded trench',
        tooltip: 'with rusting helmets and crossbows in the mud',
        explanation: 'a defensive trench now holds remnants of past skirmishes'
      },
      {
        label: 'shattered forge',
        tooltip: 'anvil and tools coated in ash',
        explanation: 'where weapons were repaired and forged, it now lays dormant'
      },
      {
        label: 'barricaded tunnel entrance',
        tooltip: 'timbers rotting and beams cracked',
        explanation: 'an access point to the storehouse, now blocked and decaying'
      },
      {
        label: 'crumbling stone walls',
        tooltip: 'with arrow slits facing the horizon',
        explanation: 'once a formidable barrier, it now stands weakened by time'
      }
    ]
  },
  'battlefield littered with fortifications': {
    locations: [
      {
        label: 'collapsed stone watchtower',
        tooltip: "remnants of a scout's vantage point",
        explanation:
          "once a sentinel's high point, it now lies in ruin, silent and watching no more"
      },
      {
        label: 'shattered wooden palisade',
        tooltip: 'broken barriers from past skirmishes',
        explanation: 'once a strong defense, it has been ravaged by countless battles'
      },
      {
        label: 'charred command tent',
        tooltip: 'blackened cloth and abandoned plans',
        explanation:
          'from where leaders once strategized, it stands as a testament to the flames of war'
      },
      {
        label: 'dilapidated trebuchet',
        tooltip: 'wood and rope left to decay',
        explanation: 'a siege weapon of destruction, now left to the ravages of time'
      },
      {
        label: "cratered no man's land",
        tooltip: 'ground scarred from arcane assaults',
        explanation: 'a reminder of the fierce magic that once roared across the battlefield'
      },
      {
        label: 'half-buried cannon',
        tooltip: 'rusted barrels peeking through the dirt',
        explanation:
          'artillery that once thundered in battle, now silent and sinking into the earth'
      },
      {
        label: 'twisted wooden barricades',
        tooltip: 'the last stand of desperate troops',
        explanation:
          'stand as a stark testament to the bravery of those who defended till their last breath'
      },
      {
        label: 'sunken trenches',
        tooltip: 'muddy pathways once bustling with soldiers',
        explanation:
          'dug for protection, these trenches were once filled with the sounds of war, now silent and still'
      },
      {
        label: 'forgotten war camp',
        tooltip: 'fire pits and abandoned equipment',
        explanation:
          'where troops once rested and readied, now all that remains are ghostly remnants'
      },
      {
        label: 'overgrown field hospital',
        tooltip: "nature reclaiming the wounded's refuge",
        explanation:
          'a sanctuary of healing amidst the chaos of war, now overtaken by the forces of nature'
      },
      {
        label: 'ruins of a supply depot',
        tooltip: 'scattered crates and empty barrels',
        explanation:
          'vital to sustain an army, its treasures have long since been plundered or decayed'
      },
      {
        label: 'breached stone walls',
        tooltip: 'gaps where invaders once poured in',
        explanation:
          'once solid and impenetrable, they were broken by the relentless force of the enemy'
      }
    ]
  },
  'fortified waystation': {
    locations: [
      {
        label: 'crumbling watchtower',
        tooltip: 'with panoramic views of the surrounding area',
        explanation:
          'from where the horizon was watched for friends or foes, it now offers a broken gaze'
      },
      {
        label: 'broken stone walls',
        tooltip: 'remnants of a protective perimeter',
        explanation: 'they once stood as a bulwark against threats, now they stand fragmented'
      },
      {
        label: 'moss-covered barracks',
        tooltip: 'with rusted bunk beds scattered',
        explanation: "once a soldier's resting place, nature has now staked its claim"
      },
      {
        label: 'dilapidated stables',
        tooltip: 'with hay strewn and wooden beams exposed',
        explanation: 'once a shelter for the noble steeds, it now stands exposed and decaying'
      },
      {
        label: 'shattered armory',
        tooltip: 'with bits of rusted weapons and armor',
        explanation: 'where weapons were once stored and maintained, only rust and remnants remain'
      },
      {
        label: 'sunken well',
        tooltip: 'with cracked stones and dried-up base',
        explanation: 'a once vital source of water, it has now run dry and lies in neglect'
      },
      {
        label: 'overgrown kitchen',
        tooltip: 'with a collapsed hearth and scattered utensils',
        explanation: 'where meals were once prepared for weary travelers, it now lies in ruin'
      },
      {
        label: 'caved-in storage',
        tooltip: 'with remnants of food jars and cloth sacks',
        explanation: 'goods and supplies once stored here, now buried and forgotten'
      },
      {
        label: 'eroded training ground',
        tooltip: 'with hints of weapon marks on stone',
        explanation: 'warriors once honed their skills here, but now it bears only silent scars'
      },
      {
        label: 'tumbledown gateway',
        tooltip: 'with a weathered arch and wooden remains',
        explanation: 'once a grand entrance, it now stands worn and battered by time'
      },
      {
        label: 'weather-worn shrine',
        tooltip: 'with faded symbols and offerings',
        explanation: 'a place of reverence and offerings, now eroded by the elements'
      },
      {
        label: 'skeletal remains of a tavern',
        tooltip: 'with a hollow bar and broken mugs',
        explanation: 'once bustling with laughter and tales, only a skeletal structure remains'
      }
    ]
  },
  'illicit manufactory for illegal goods': {
    locations: [
      {
        label: 'crumbling brick kiln',
        tooltip: 'with overgrown mossy walls',
        explanation: 'once a hub of production, the kiln has now succumbed to time and nature'
      },
      {
        label: 'charred storage shed',
        tooltip: 'with half-opened crates inside',
        explanation:
          'fire once consumed this storage, leaving behind remnants of its illicit contents'
      },
      {
        label: 'rusted machinery room',
        tooltip: 'with tangled conveyor belts',
        explanation: 'machinery that facilitated illegal production now lies dormant and decaying'
      },
      {
        label: 'moldy underground chamber',
        tooltip: 'with rows of empty vats',
        explanation: 'deep underground, these vats once held secretive concoctions'
      },
      {
        label: 'collapsed wooden dock',
        tooltip: 'protruding from a murky pond',
        explanation: 'goods were once discreetly loaded here, but the dock now lies in ruin'
      },
      {
        label: 'hidden alcove',
        tooltip: 'with remnants of tattered curtains',
        explanation: 'a concealed space for discreet dealings, now exposed and deteriorating'
      },
      {
        label: 'broken-down wagon bay',
        tooltip: 'with tracks leading away',
        explanation: 'the bay once facilitated the transport of illegal items, now it stands silent'
      },
      {
        label: 'caved-in entrance tunnel',
        tooltip: 'with faint traces of footprints',
        explanation: 'a secret entrance now sealed, hinting at the many who once treaded its path'
      },
      {
        label: 'graffiti-covered office',
        tooltip: 'with scattered paperwork',
        explanation: 'administrative center of the operation, now tagged by passersby'
      },
      {
        label: 'secluded test chamber',
        tooltip: 'with strange apparatuses',
        explanation: 'experimental goods were tested here, leaving behind mysterious tools'
      },
      {
        label: 'overgrown greenhouse',
        tooltip: 'with withered exotic plants',
        explanation:
          'exotic plants for illegal concoctions grew here, now withered and taken by nature'
      },
      {
        label: 'disused poison lab',
        tooltip: 'with unlabelled vials on shelves',
        explanation:
          'potent substances were once brewed here, now they sit forgotten and potentially lethal'
      }
    ]
  },
  'mine or open pit for excavation': {
    locations: [
      {
        label: 'collapsed tunnel entrance',
        tooltip: 'dark and foreboding',
        explanation:
          'an entrance that once echoed with the sound of pickaxes, now remains eerily silent'
      },
      {
        label: 'dilapidated mining office',
        tooltip: 'papers scattered about',
        explanation: 'from where the operations were managed, now lies in disarray'
      },
      {
        label: 'fractured pit wall',
        tooltip: 'streaks of minerals visible',
        explanation: 'the very heart of the mine, showcasing the treasures it once held'
      },
      {
        label: 'water-filled quarry',
        tooltip: 'reflecting the sky above',
        explanation:
          'where minerals were once excavated, now holds still waters that mirror the heavens'
      },
      {
        label: 'abandoned machinery corner',
        tooltip: 'gears and levers askew',
        explanation: 'machines that aided in excavation are now relics of a bygone era'
      },
      {
        label: 'derelict wooden elevator',
        tooltip: 'ropes frayed and broken',
        explanation: 'once used to transport miners and ore, its function has long ceased'
      },
      {
        label: 'ventilation shaft opening',
        tooltip: 'cool wind blowing through',
        explanation:
          'provided a breath of fresh air to the depths, now gusts freely without purpose'
      },
      {
        label: 'crumbling stone bridge',
        tooltip: 'arching over a deep chasm',
        explanation: 'connected areas of the mine, now stands as a precarious relic'
      },
      {
        label: 'faded warning signs',
        tooltip: 'words barely legible now',
        explanation: 'once cautioned miners of dangers, their warnings now barely discernible'
      },
      {
        label: 'ore processing area',
        tooltip: 'with crushed stones and rusty sieves',
        explanation: "the heart of the mine's productivity, now rusted and silent"
      },
      {
        label: 'long-abandoned campsite',
        tooltip: 'with tattered tents and fire pits',
        explanation: 'where miners once rested after long shifts, now stands as a ghostly camp'
      },
      {
        label: 'desolate watchtower',
        tooltip: 'overlooking the expansive pit',
        explanation: 'provided a vantage point over the mine, now offers a view of its decay'
      }
    ]
  },
  'sacred shrine for holy product': {
    locations: [
      {
        label: 'grand entrance',
        tooltip: 'adorned with broken statues',
        explanation:
          'this marked the grand gateway to the shrine, now marred by decay and desolation'
      },
      {
        label: 'collapsed cloister',
        tooltip: 'overgrown with ivy',
        explanation: 'once a place of solitude and reflection, nature has now reclaimed its space'
      },
      {
        label: 'shattered altar',
        tooltip: 'remnants of sacred symbols',
        explanation: 'the heart of the shrine where ceremonies were held, now lies in fragments'
      },
      {
        label: 'dilapidated library',
        tooltip: 'scrolls and texts scattered',
        explanation:
          'knowledge and sacred texts were once safeguarded here, now they lie disarrayed'
      },
      {
        label: 'fractured observatory',
        tooltip: 'aligned with ancient stars',
        explanation: 'used to study celestial patterns, now misaligned and broken'
      },
      {
        label: 'crumbling prayer rooms',
        tooltip: 'with faded murals',
        explanation: 'devotees once sought solace here, its essence now faded with time'
      },
      {
        label: 'eroded fountain',
        tooltip: 'where pure water once flowed',
        explanation: 'served as a symbol of purity, its waters have long dried up'
      },
      {
        label: 'sunken gardens',
        tooltip: 'remnants of sacred herbs and plants',
        explanation: 'once bloomed with sacred flora, now overgrown and forgotten'
      },
      {
        label: 'toppled pillars',
        tooltip: 'etched with lost languages',
        explanation: 'bearing inscriptions of ancient wisdom, they now lie fallen'
      },
      {
        label: 'ancient forge',
        tooltip: 'tools and molds rusting away',
        explanation: 'where holy items were crafted, now consumed by rust'
      },
      {
        label: 'forgotten treasury',
        tooltip: 'once glittering with offerings',
        explanation: 'gifts to the shrine now lay covered in dust and decay'
      },
      {
        label: 'ruined sanctuary',
        tooltip: 'silent echoes of past sermons',
        explanation: 'where devotees gathered in reverence, now stands silent and desolate'
      }
    ]
  },
  'overgrown ancient plantation': {
    locations: [
      {
        label: 'grand entrance archway',
        tooltip: 'overtaken by thick ivy',
        explanation: 'once a symbol of opulence, nature has now made its claim'
      },
      {
        label: 'dilapidated estate',
        tooltip: 'roof mostly caved in',
        explanation:
          "the heart of the plantation now stands decaying, bearing witness to time's ravages"
      },
      {
        label: 'crumbled slave quarters',
        tooltip: 'walls barely standing',
        explanation: "a grim reminder of the plantation's past, now stands crumbling"
      },
      {
        label: 'overgrown fields',
        tooltip: "lost to nature's embrace",
        explanation: 'once cultivated with crops, now taken over by wild growth'
      },
      {
        label: 'moss-covered well',
        tooltip: 'with an old rusted bucket chain',
        explanation: 'served as a vital water source, its utility long forgotten'
      },
      {
        label: 'rotting storage barn',
        tooltip: 'doors hanging off hinges',
        explanation: 'where harvests were stored, now succumbs to rot and ruin'
      },
      {
        label: 'remnants of a smokehouse',
        tooltip: 'blackened bricks scattered',
        explanation: 'used for preserving meats, now stands as a charred memory'
      },
      {
        label: 'choked fish pond',
        tooltip: 'lily pads covering the surface',
        explanation: 'once teemed with aquatic life, now choked and stagnant'
      },
      {
        label: 'overgrown orchard',
        tooltip: 'fruit trees gone wild',
        explanation: 'where fruits were cultivated, nature has reclaimed its bounty'
      },
      {
        label: 'broken-down windmill',
        tooltip: 'blades no longer turning',
        explanation: 'once a source of power and production, its mechanisms have ceased'
      },
      {
        label: 'forgotten family graveyard',
        tooltip: 'tombstones tilted',
        explanation: 'where generations were laid to rest, now stands neglected and weathered'
      },
      {
        label: 'sunken gazebo',
        tooltip: 'vines climbing every pillar',
        explanation: 'a place of relaxation and respite, now consumed by thick vegetation'
      }
    ]
  },
  'destroyed camp or extraction site': {
    locations: [
      {
        label: 'collapsed tent',
        tooltip: 'tattered from a past struggle',
        explanation: 'a shelter from the elements, its state suggests an abrupt abandonment'
      },
      {
        label: 'broken cart',
        tooltip: 'laden with rusted mining tools',
        explanation: 'once used for transporting materials and tools, now lies in disrepair'
      },
      {
        label: 'scorched fire pit',
        tooltip: 'surrounded by charred logs',
        explanation: 'where warmth and meals were once provided, a violent event has left its mark'
      },
      {
        label: 'shattered crates',
        tooltip: 'contents spilling out',
        explanation:
          'used for storage, their broken state suggests haste or violence in their handling'
      },
      {
        label: 'overgrown excavation hole',
        tooltip: 'tools scattered nearby',
        explanation: 'a site of active work, now overtaken by nature and left behind'
      },
      {
        label: 'toppled watchtower',
        tooltip: 'wood splintered and decayed',
        explanation:
          'once a vantage point for overseeing operations, its fall hints at neglect or attack'
      },
      {
        label: 'deserted cooking area',
        tooltip: 'blackened pots and pans',
        explanation: 'the heart of daily sustenance, now cold and left in disarray'
      },
      {
        label: 'frayed rope bridge',
        tooltip: 'leading over a dried-up chasm',
        explanation: 'once a connector between areas, its state speaks to the dangers of crossing'
      },
      {
        label: 'mangled machinery',
        tooltip: 'cogs and gears exposed',
        explanation: 'a symbol of industrial effort, now broken and exposed to the elements'
      },
      {
        label: 'spilled barrels',
        tooltip: 'with remnants of oil or chemicals',
        explanation:
          'once containing vital or hazardous materials, their spillage poses environmental concerns'
      },
      {
        label: 'cracked water well',
        tooltip: 'bucket lying beside it',
        explanation:
          'a source of hydration, its disuse suggests a more profound abandonment of the site'
      },
      {
        label: 'collapsed tunnel entrance',
        tooltip: 'blocked with debris',
        explanation:
          'a gateway to underground depths, its blockage hints at potential dangers within'
      }
    ]
  },
  'managed woodland gone feral': {
    locations: [
      {
        label: 'overgrown orchard',
        tooltip: 'trees heavy with wild fruit',
        explanation: 'once cultivated for harvest, nature has reclaimed its bounty'
      },
      {
        label: 'moss-covered statue',
        tooltip: 'hidden among thick ivy',
        explanation: "a testament to human presence, now obscured by nature's embrace"
      },
      {
        label: 'tangled hedge maze',
        tooltip: 'paths lost to thicket and thorn',
        explanation: "once a structure of leisure, it has become a labyrinth of nature's design"
      },
      {
        label: 'crumbling stone bridge',
        tooltip: 'crossing a wild stream',
        explanation:
          "built to aid traversal, it now stands as a testament to nature's eroding power"
      },
      {
        label: "deserted caretaker's hut",
        tooltip: 'with a collapsed roof',
        explanation: 'a dwelling for those tending to the land, its state implies long-term neglect'
      },
      {
        label: 'sunken garden pond',
        tooltip: 'choked with lilies and reeds',
        explanation: "once a serene water feature, it's now overrun with unchecked growth"
      },
      {
        label: 'abandoned campsite',
        tooltip: 'fire pit overgrown with ferns',
        explanation:
          'a resting place for travelers or workers, now reclaimed by the surrounding greenery'
      },
      {
        label: 'broken wooden benches',
        tooltip: 'scattered among wildflowers',
        explanation: "once offering respite to visitors, they've succumbed to time and the elements"
      },
      {
        label: 'collapsed greenhouse',
        tooltip: 'a jungle of its own creation',
        explanation: 'designed for controlled growth, it now houses untamed nature'
      },
      {
        label: 'forgotten stone well',
        tooltip: 'surrounded by dense underbrush',
        explanation: "once a vital water source, it's been obscured by the wild growth around it"
      },
      {
        label: 'rotting log benches',
        tooltip: 'fungi and moss claiming every inch',
        explanation: "once a rustic seating solution, they've become hosts to woodland life"
      },
      {
        label: 'stone path',
        tooltip: 'mostly reclaimed by grass and roots',
        explanation: 'a trail leading through the woods, its path is now nearly indistinguishable'
      }
    ]
  },
  'inexplicable ancient manufactory': {
    locations: [
      {
        label: 'grand entrance hall',
        tooltip: 'overtaken by creeping vines',
        explanation:
          'once the welcoming point of the manufactory, nature has now claimed its grandeur'
      },
      {
        label: 'vast foundry room',
        tooltip: 'charred and smoke-streaked',
        explanation:
          'a place where metals were once melted and molded, bearing the scars of its intense operations'
      },
      {
        label: 'silent assembly line',
        tooltip: 'scattered with unfinished mechanisms',
        explanation:
          'a production line where items were constructed, left mid-process and now silent'
      },
      {
        label: 'fractured glass observatory',
        tooltip: 'offering panoramic decay views',
        explanation:
          'built for overseeing the entire manufactory, it now showcases the ravages of time'
      },
      {
        label: 'rusted storage vaults',
        tooltip: 'doors slightly ajar',
        explanation: 'secure storage for valuable items or materials, now succumbing to decay'
      },
      {
        label: 'dilapidated worker’s quarters',
        tooltip: 'with remnants of ancient meals',
        explanation:
          'living areas for those who labored here, offering glimpses into their daily lives'
      },
      {
        label: 'desolate testing chambers',
        tooltip: 'with arcane markings',
        explanation:
          'rooms dedicated to experimenting with creations or materials, marked with symbols of unknown meaning'
      },
      {
        label: 'flooded cooling pools',
        tooltip: 'shimmering with bioluminescent algae',
        explanation: 'once used to regulate temperature, now a haven for glowing life forms'
      },
      {
        label: 'shattered control room',
        tooltip: 'with unrecognizable instruments',
        explanation: 'the operational heart of the manufactory, now broken and mysterious'
      },
      {
        label: 'petrified gardens',
        tooltip: 'with metallic flora among stone',
        explanation:
          'a place of relaxation or study, where metal and nature merged in strange harmony'
      },
      {
        label: 'buried archives',
        tooltip: 'sheets covered in indecipherable scripts',
        explanation: 'a repository of knowledge and records, now hidden and unreadable'
      },
      {
        label: 'derelict power core',
        tooltip: 'emanating a faint hum',
        explanation:
          'once the energy source for the entire structure, still hinting at its dormant power'
      }
    ]
  },
  'farm for now-feral valuable beasts': {
    locations: [
      {
        label: 'collapsed barn',
        tooltip: 'with broken stalls and claw marks',
        explanation: 'once a shelter for beasts, now bearing signs of their wild escape'
      },
      {
        label: 'overgrown pasture',
        tooltip: 'with twisted fences and worn paths',
        explanation:
          'an open area for beasts to graze, now reclaimed by nature and marked by their activities'
      },
      {
        label: 'crumbled silo',
        tooltip: 'with a gaping hole and scattered grains',
        explanation: 'storage for food supplies, now compromised and left to the elements'
      },
      {
        label: 'sunken water trough',
        tooltip: 'covered in algae and half-filled',
        explanation: 'once a source of hydration for the beasts, now stagnant and untended'
      },
      {
        label: 'shattered training ground',
        tooltip: 'with remnants of tools and chains',
        explanation: 'an area dedicated to taming or training the beasts, now broken and abandoned'
      },
      {
        label: "abandoned caretaker's hut",
        tooltip: 'with torn books and a broken bed',
        explanation: 'a dwelling for those overseeing the farm, left hastily and in disrepair'
      },
      {
        label: 'flooded breeding pond',
        tooltip: 'with eerie reflections and floating debris',
        explanation: 'a place for aquatic or amphibious beasts to breed, now still and haunting'
      },
      {
        label: 'cracked stone pen',
        tooltip: 'with tufts of fur and scratched walls',
        explanation:
          'an enclosure to contain specific beasts, now showing signs of their restlessness'
      },
      {
        label: 'hidden underground den',
        tooltip: 'with dark tunnels and eerie echoes',
        explanation: 'a subterranean habitat, now filled with the echoes of its former inhabitants'
      },
      {
        label: 'deserted medicinal hut',
        tooltip: 'with spilled potions and tattered scrolls',
        explanation: "a place for healing and care, left in chaos as the farm's order broke down"
      },
      {
        label: 'neglected feeding station',
        tooltip: 'with rotten leftovers and gnawed bones',
        explanation: 'where beasts were once fed, now a scene of decay and remnants of meals'
      }
    ]
  },
  'outsider goods production site': {
    locations: [
      {
        label: 'collapsed control room',
        tooltip: 'with shattered screens and buttons',
        explanation:
          "the central hub of operations, now a testament to the site's technological might that once was"
      },
      {
        label: 'dilapidated assembly line',
        tooltip: 'with rusted robotic arms',
        explanation:
          'once a marvel of efficiency, this area mechanized the production process but now stands silent'
      },
      {
        label: 'abandoned storage area',
        tooltip: 'with cracked containers and spills',
        explanation:
          'a depot for keeping raw materials or finished goods, now a scene of decay and disarray'
      },
      {
        label: 'sunken loading dock',
        tooltip: 'half-submerged in water and moss',
        explanation:
          "where goods were once transported in and out, now overtaken by nature's reclaiming force"
      },
      {
        label: 'overgrown power core',
        tooltip: 'with exposed wires and dim lights',
        explanation:
          'the beating heart that powered the entire site, now dimmed and tangled in green'
      },
      {
        label: 'ruined quality control lab',
        tooltip: 'with broken devices and charts',
        explanation:
          "where products were tested for standards, now a silent witness to the site's dedication to perfection"
      },
      {
        label: 'decayed waste disposal pit',
        tooltip: 'filled with odd materials',
        explanation: 'an eco-conscious initiative, now holding remnants of unfamiliar materials'
      },
      {
        label: 'faded mural wall',
        tooltip: 'showing the outsiders and their tech',
        explanation:
          "a testament to the site's origins, illustrating the beings and tech that once thrived here"
      },
      {
        label: 'destroyed research hub',
        tooltip: 'scattered with alien blueprints',
        explanation:
          'the epicenter of innovation, now holding the fragmented plans of alien advancements'
      },
      {
        label: 'shattered energy converters',
        tooltip: 'with glints of crystal fragments',
        explanation:
          'once converted diverse energy sources, now broken and revealing its crystalline innards'
      },
      {
        label: 'overturned maintenance bay',
        tooltip: 'with scattered tools and parts',
        explanation:
          'a dedicated space for repairs and upkeep, now in a state of upheaval and abandonment'
      },
      {
        label: 'derelict packaging sector',
        tooltip: 'with shredded wrappings and boxes',
        explanation:
          'the final step in the production line, now littered with the remains of packaging materials'
      }
    ]
  },
  'repurposed ancient manufactory': {
    locations: [
      {
        label: 'shattered furnace',
        tooltip: 'remnants of past fires',
        explanation: 'a once roaring chamber for smelting and molding, now cold and broken'
      },
      {
        label: 'broken conveyor belts',
        tooltip: 'tangled and overgrown',
        explanation:
          'designed for efficient transport of goods within the factory, now a twisted mesh reclaimed by nature'
      },
      {
        label: 'collapsed storage silos',
        tooltip: 'filled with forgotten materials',
        explanation:
          'tall structures used for bulk storage, now fallen and filled with remnants of yesteryears'
      },
      {
        label: 'rusted machinery room',
        tooltip: 'gears frozen in time',
        explanation:
          'once housing the advanced machinery, now stands still with rusted gears and parts'
      },
      {
        label: "crumbled artisans' quarters",
        tooltip: 'hints of past crafts',
        explanation:
          'living and working spaces for the craftsmen, now offering glimpses into their artisanal lives'
      },
      {
        label: 'waterwheel by a dried riverbed',
        tooltip: 'eroded with age',
        explanation:
          'a relic of ancient power generation, standing by a river that has long since receded'
      },
      {
        label: 'moss-covered assembly floor',
        tooltip: 'shadows of past projects',
        explanation:
          'the main production area, now layered in moss with traces of what was once crafted here'
      },
      {
        label: 'fractured statue courtyard',
        tooltip: 'idols of forgotten masters',
        explanation:
          'a place of honor or reverence, now holding the broken figures of once-celebrated masters'
      },
      {
        label: 'hollowed-out inspection chambers',
        tooltip: 'signs of quality checks',
        explanation:
          'rooms dedicated to ensuring product excellence, now empty yet marked by its rigorous past'
      },
      {
        label: 'repurposed forge area',
        tooltip: 'tools scattered and abandoned',
        explanation:
          'once a bustling area of creation, refitted over the years but now left in disarray'
      },
      {
        label: 'tattered blueprint room',
        tooltip: 'designs fading on ancient paper',
        explanation:
          'the repository of plans and designs, now deteriorating with the weight of time'
      },
      {
        label: 'overgrown loading docks',
        tooltip: 'tracks leading to nowhere',
        explanation:
          'where products once embarked on their journey, now a quiet zone with tracks fading into oblivion'
      }
    ]
  },
  'magical production facility': {
    locations: [
      {
        label: "dilapidated mage's workshop",
        tooltip: 'with scattered spell blueprints',
        explanation:
          'a place where skilled mages once crafted their spells, now littered with remnants of their knowledge'
      },
      {
        label: 'cracked mana reservoir',
        tooltip: 'surrounded by arcane symbols',
        explanation:
          'a vital container that once stored magical energy, now broken and emanating faint magical resonances'
      },
      {
        label: 'overgrown herb garden',
        tooltip: 'with faintly glowing plants',
        explanation:
          'a botanical haven for magical plants, whose radiance persists through the overgrowth'
      },
      {
        label: 'broken enchantment loom',
        tooltip: 'with ethereal threads hanging loose',
        explanation:
          'a machine that wove magic into tangible forms, now malfunctioning with threads of ethereal energy hanging in disarray'
      },
      {
        label: 'shattered potion vats',
        tooltip: 'dripping with residual elixirs',
        explanation:
          'containers that once held powerful concoctions, now leaking remnants of their former contents'
      },
      {
        label: 'rune-etched assembly line',
        tooltip: 'halted in mid-process',
        explanation:
          'a production line enhanced with runes, that once produced magical items in succession, now frozen in time'
      },
      {
        label: 'collapsed summoning circle',
        tooltip: 'with smudged sigils',
        explanation:
          'an area dedicated to calling forth entities or energies, its potency diminished by time and decay'
      },
      {
        label: 'rusting golem forge',
        tooltip: 'still warm to the touch',
        explanation:
          'a forge specifically for creating golems, retaining some of its heat from an age-long past'
      },
      {
        label: 'decrepit spellbook library',
        tooltip: 'with scattered torn pages',
        explanation:
          'a vast repository of magical knowledge, now in ruins with pages of wisdom strewn about'
      },
      {
        label: 'crumbling scroll preservation vault',
        tooltip: 'emitting a musty magical aroma',
        explanation:
          'a secured area for keeping ancient scrolls safe, now giving off a scent of aging magic'
      },
      {
        label: 'toppled crystal tower',
        tooltip: 'reflecting distorted magical auras',
        explanation:
          'a tower made of or housing crystals that amplified magic, now fallen and distorting the magical energies around it'
      },
      {
        label: 'fractured portal archway',
        tooltip: 'humming with lost connections',
        explanation:
          'an entryway to other realms or places, still resonating with the echoes of its lost links'
      }
    ]
  },
  'fishery or salt extraction site': {
    locations: [
      {
        label: 'crumbling pier',
        tooltip: 'once used for docking fishing boats',
        explanation:
          'a docking point for the fishing fleet, now decayed and reminiscent of a busier time'
      },
      {
        label: 'dilapidated huts',
        tooltip: 'with remnants of drying racks',
        explanation:
          'shelters where fish were dried and prepared, now standing in neglect with vestiges of their function'
      },
      {
        label: 'salt-encrusted basin',
        tooltip: 'a vast shallow evaporation pond',
        explanation:
          'an area dedicated to extracting salt from seawater, now crusted over and echoing its salty past'
      },
      {
        label: 'eroded warehouse',
        tooltip: 'hints of barrels and crates inside',
        explanation:
          "a storage facility for the site's products, now worn down but hinting at its once vital role"
      },
      {
        label: 'broken stone paths',
        tooltip: 'once bustling with workers',
        explanation: 'routes once trodden by busy workers, now fractured and silent'
      },
      {
        label: 'rusted metal tools',
        tooltip: 'remnants of past fishery activities',
        explanation:
          "tools of the fishery trade, now oxidized and bearing witness to the site's productive days"
      },
      {
        label: 'overgrown canal',
        tooltip: 'a former waterway for transportation',
        explanation: 'a channel that facilitated the movement of goods, now overrun by nature'
      },
      {
        label: 'sunken boat remains',
        tooltip: 'half-buried in silt and sand',
        explanation: 'remnants of boats that once sailed here, now submerged and forgotten'
      },
      {
        label: 'weathered statue',
        tooltip: 'a tribute to the salt goddess',
        explanation: 'a symbol of reverence to the deity of salt, now eroded by the elements'
      },
      {
        label: 'moss-covered steps',
        tooltip: 'leading to a now-vanished shrine',
        explanation:
          'a pathway to a once sacred place, now overtaken by greenery and leading to absence'
      },
      {
        label: 'corroded iron gates',
        tooltip: "once marking the facility's entrance",
        explanation:
          "the grand entry to the facility, now rusted and signifying the site's faded glory"
      },
      {
        label: 'collapsed wooden bridges',
        tooltip: 'spanning dried-up channels',
        explanation:
          'bridges that once connected parts of the facility, now fallen and spanning voids'
      }
    ]
  },
  'lost pilgrimage destination': {
    locations: [
      {
        label: 'weathered stone archway',
        tooltip: 'remnants of the main entrance',
        explanation: 'once the grand gateway for pilgrims, now standing worn and forgotten'
      },
      {
        label: 'collapsed bell tower',
        tooltip: 'its bronze bell half-buried',
        explanation:
          'a tower that once signaled prayer times, now in ruins with its bell concealed in the earth'
      },
      {
        label: 'moss-covered shrine',
        tooltip: 'with faint inscriptions and candles',
        explanation:
          'a place of reverence and offerings, now draped in moss and whispers of past devotions'
      },
      {
        label: 'overgrown pathway',
        tooltip: 'stones worn from countless footsteps',
        explanation: 'a trail trodden by numerous pilgrims over the years, now claimed by nature'
      },
      {
        label: 'dried-up sacred spring',
        tooltip: 'where crystalline waters once flowed',
        explanation:
          'a source of pure water believed to hold sacred properties, now devoid of its life-giving essence'
      },
      {
        label: 'shattered stained glass',
        tooltip: 'scattered amidst tall grasses',
        explanation:
          'once a colorful spectacle portraying religious tales, now broken and lost to the meadow'
      },
      {
        label: 'crumbled lodgings',
        tooltip: 'with remnants of old bedding and gear',
        explanation:
          'shelters for weary travelers on their spiritual journey, now reduced to debris'
      },
      {
        label: 'decaying library',
        tooltip: 'scrolls and scriptures deteriorating',
        explanation: 'a repository of sacred teachings, now decaying and losing its wisdom to time'
      },
      {
        label: 'ruined altar',
        tooltip: 'once adorned with gold and jewels',
        explanation:
          'the epicenter of rituals and offerings, now desolate and stripped of its former grandeur'
      },
      {
        label: 'broken stone bridge',
        tooltip: 'which once spanned a rushing river',
        explanation:
          'a bridge facilitating the journey of pilgrims, now broken and unable to connect both sides'
      },
      {
        label: 'forsaken garden',
        tooltip: 'with dried plants and a cracked statue',
        explanation:
          'once a tranquil space for reflection, now abandoned and showing signs of decay'
      },
      {
        label: 'fragmented mural wall',
        tooltip: 'tales of pilgrimage barely discernible',
        explanation:
          'a canvas that once vividly depicted pilgrimage tales, now fragmented and almost unreadable'
      }
    ]
  },
  'fortified frontier monastery': {
    locations: [
      {
        label: 'ancient chapel',
        tooltip: 'with fragmented stained glass',
        explanation: 'a sacred place of worship, now worn and its colorful windows shattered'
      },
      {
        label: 'moss-covered courtyard',
        tooltip: 'with a dried-up fountain',
        explanation: 'once the heart of the monastery, now overgrown and its fountain parched'
      },
      {
        label: 'broken stone walls',
        tooltip: 'once a protective barrier',
        explanation:
          'the defensive walls that shielded the monastery, now broken and no longer offering protection'
      },
      {
        label: 'decaying library',
        tooltip: 'with scattered parchments',
        explanation:
          'a place where knowledge was stored and shared, now deteriorating with texts scattered around'
      },
      {
        label: 'overgrown herb garden',
        tooltip: 'hinting at medicinal plants',
        explanation:
          'a garden dedicated to medicinal herbs, now overgrown but hinting at its healing past'
      },
      {
        label: 'shattered brewery',
        tooltip: 'with old fermenting barrels',
        explanation:
          'where monks brewed their own beverages, now in ruins with aged barrels hinting at their craft'
      },
      {
        label: 'collapsed granary',
        tooltip: 'remnants of stored grains',
        explanation:
          "a storage for the monastery's grain supplies, now collapsed and its contents spilled out"
      },
      {
        label: 'exposed scriptorium',
        tooltip: 'inkwells dried and quills scattered',
        explanation:
          'a space dedicated to the art of writing, now exposed to the elements with its tools abandoned'
      },
      {
        label: 'battered armory',
        tooltip: 'with remnants of monk-made weapons',
        explanation:
          'a place where monks stored their weapons, now worn and showcasing the remnants of their craftsmanship'
      },
      {
        label: 'sunken treasury',
        tooltip: 'hinting at lost relics and coins',
        explanation:
          "where the monastery's treasures were kept, now sunken and giving hints of its lost riches"
      },
      {
        label: 'overthrown dining hall',
        tooltip: 'long tables overturned',
        explanation:
          'a communal space for meals and gatherings, now in disarray with its tables turned over'
      },
      {
        label: 'abandoned infirmary',
        tooltip: 'with empty vials and bandages',
        explanation:
          'a healing place for the sick and injured, now deserted with empty containers and used bandages'
      }
    ]
  },
  'tomb of some mighty ancient': {
    locations: [
      {
        label: 'vast entrance hall',
        tooltip: 'lined with towering statues',
        explanation:
          'a grand welcoming area for the visitors, now stands in silent testament with imposing statues watching over'
      },
      {
        label: 'grand ceremonial chamber',
        tooltip: 'with an ornate, shattered altar',
        explanation: 'a space for rituals and ceremonies, now with its core altar in ruins'
      },
      {
        label: 'crumbling library',
        tooltip: 'with tattered scrolls and parchments',
        explanation:
          'a repository of knowledge and history, now decaying with remnants of its precious contents'
      },
      {
        label: 'winding underground passages',
        tooltip: 'filled with traps and enigmas',
        explanation:
          'complex tunnels built to safeguard the tomb, now a perilous maze for any intruder'
      },
      {
        label: 'echoing burial chamber',
        tooltip: 'where an empty sarcophagus lies',
        explanation:
          'the heart of the tomb, where the ancient was supposed to rest, now lies desolate with its main artifact empty'
      },
      {
        label: 'sunken garden courtyard',
        tooltip: 'overgrown with thorny vines',
        explanation: 'once a tranquil resting place, now overtaken by wild growth'
      },
      {
        label: 'collapsed treasury',
        tooltip: 'with scattered coins and broken jewels',
        explanation:
          "a storage of the ancient's immense wealth, now in ruins with its treasures strewn about"
      },
      {
        label: 'mural-adorned antechamber',
        tooltip: 'with fading depictions of battles',
        explanation:
          "a room showcasing the ancient's conquests and glory, now slowly fading with time"
      },
      {
        label: 'submerged catacombs',
        tooltip: 'filled with stagnant water and bones',
        explanation:
          'the resting place for the lesser known, now flooded and filled with remnants of the past'
      },
      {
        label: 'overgrown ritual pool',
        tooltip: 'with faintly glowing inscriptions',
        explanation:
          'a sacred place for rituals involving water, now wild and with its magical inscriptions barely visible'
      },
      {
        label: 'fractured hall of heroes',
        tooltip: 'with statues missing heads and limbs',
        explanation:
          'a gallery honoring the great warriors, now in disrepair with its statues mutilated'
      },
      {
        label: 'maze-like underground labyrinth',
        tooltip: 'with walls marked by scratches',
        explanation:
          'a confusing maze built as a defense or for some ancient game, now marked with the desperation of those who got lost within'
      }
    ]
  },
  'prison-monastery for heretics': {
    locations: [
      {
        label: 'sunken atrium',
        tooltip: 'with faded mosaics of judgment',
        explanation:
          'the central gathering area, once adorned with vivid mosaics showcasing the fate of the heretics, now faded'
      },
      {
        label: 'forgotten cells',
        tooltip: 'lined with rusty shackles',
        explanation:
          'small chambers where heretics were imprisoned, now stands silent but still bearing the signs of past torment'
      },
      {
        label: 'fortress-like outer walls',
        tooltip: 'still standing tall and imposing',
        explanation:
          'the protective barrier of the monastery, still reflecting its strength and grandeur'
      },
      {
        label: 'dim underground dungeons',
        tooltip: 'damp with the echoes of despair',
        explanation:
          'where the most dangerous heretics were kept, now a silent, eerie place echoing with the past'
      },
      {
        label: 'moss-covered dining hall',
        tooltip: 'with broken wooden tables',
        explanation:
          'where inmates once ate their meager meals, now abandoned and overtaken by moss'
      },
      {
        label: 'walled courtyard',
        tooltip: 'with a solitary, gnarled tree',
        explanation: 'a minimal outdoor space for inmates, now dominated by a single old tree'
      },
      {
        label: 'secluded scriptorium',
        tooltip: 'with scattered parchments and quills',
        explanation: 'a place where sacred or forbidden texts were copied, now in disarray'
      },
      {
        label: 'eerie ossuary',
        tooltip: 'filled with neatly stacked bones',
        explanation:
          "a chamber where the bones of the dead were kept, now an unsettling reminder of the monastery's dark past"
      },
      {
        label: 'confessional chambers',
        tooltip: 'with heavy wooden doors and partitions',
        explanation:
          'rooms where heretics were expected to confess, now silent with its heavy doors bearing witness to past secrets'
      },
      {
        label: 'rotting infirmary',
        tooltip: 'with remnants of old medicines',
        explanation:
          'a place where the sick were treated, now decaying with remnants of its healing past'
      },
      {
        label: 'overgrown courtyard',
        tooltip: 'with remnants of a guillotine',
        explanation:
          'an outdoor space where executions took place, now overgrown but still hinting at its grim history'
      },
      {
        label: 'shattered library',
        tooltip: 'filled with burnt scriptures',
        explanation:
          'where sacred and forbidden texts were stored, now destroyed with signs of a deliberate attempt to erase knowledge'
      }
    ]
  },
  'shrine repurposed for a newer god': {
    locations: [
      {
        label: 'ancient altar',
        tooltip: 'scarred by recent sacrifices',
        explanation: 'an old place of worship, now marked by signs of more recent rituals'
      },
      {
        label: 'crumbled archway',
        tooltip: 'with unfamiliar symbols etched',
        explanation: 'once a grand entrance, now marred with symbols of a newer faith'
      },
      {
        label: 'forgotten prayer chamber',
        tooltip: 'filled with fresh candles',
        explanation: 'a place once abandoned, now seeing renewed use for prayers'
      },
      {
        label: 'moss-covered statue',
        tooltip: 'with a different head attached',
        explanation: 'an old idol repurposed to represent a new deity'
      },
      {
        label: 'eroded fountain',
        tooltip: 'now filled with fresh water and petals',
        explanation: 'a once-dry fountain, now revived and used in recent worship'
      },
      {
        label: 'worn-out mosaic floor',
        tooltip: 'patched with recent tiles',
        explanation: 'a floor showcasing the transition between the old and new faiths'
      },
      {
        label: 'dusty reliquary',
        tooltip: 'containing new sacred objects',
        explanation: 'a storage for relics, now housing objects from the newer faith'
      },
      {
        label: 'overgrown garden',
        tooltip: "pruned to depict the new god's symbols",
        explanation: 'nature retaking a sacred space, but recently manicured to honor the new deity'
      },
      {
        label: 'fallen obelisk',
        tooltip: 'with a new idol erected beside',
        explanation: 'the remnants of the past beside a new symbol of worship'
      },
      {
        label: 'derelict stone circle',
        tooltip: 'with a central altar for the new god',
        explanation: 'an old ritual site, now centered around the newer god'
      }
    ]
  },
  'fragment of megastructure temple': {
    locations: [
      {
        label: 'vast stone entrance',
        tooltip: 'overgrown with ivy and moss',
        explanation: 'a once-grand gateway to the temple, now reclaimed by nature'
      },
      {
        label: 'crumbling altar',
        tooltip: 'flanked by ancient monoliths',
        explanation: 'a place for ancient ceremonies, surrounded by massive standing stones'
      },
      {
        label: 'toppled giant statue',
        tooltip: 'half-buried in the sand',
        explanation:
          'an enormous representation of a deity, now fallen and consumed by the environment'
      },
      {
        label: 'sunken ceremonial pool',
        tooltip: 'reflecting fragmented sky',
        explanation:
          'a place for ritualistic cleansing or offerings, now showing a shattered reflection of the heavens'
      },
      {
        label: 'shattered glass walkway',
        tooltip: 'suspended above a chasm',
        explanation: 'once a marvel of engineering, now a dangerous path over a void'
      },
      {
        label: 'ruined observatory',
        tooltip: 'with a rusted and misaligned telescope',
        explanation: 'a place for studying the heavens, now in disrepair and misalignment'
      },
      {
        label: 'overgrown labyrinth',
        tooltip: 'walls marked with faded glyphs',
        explanation: 'a complex maze, with ancient symbols hinting at its purpose or lore'
      },
      {
        label: 'fragmented mosaic floor',
        tooltip: 'depicting a cosmic event',
        explanation: 'a grand artwork showcasing a significant celestial event from the past'
      },
      {
        label: 'abandoned library',
        tooltip: 'with tattered remnants of scriptures',
        explanation:
          'a repository of knowledge and wisdom, now in ruins with the remnants of its contents'
      },
      {
        label: 'stone bridge in ruins',
        tooltip: 'leading to a severed section',
        explanation: 'a pathway to another part of the temple, now broken and inaccessible'
      },
      {
        label: 'desolate plaza',
        tooltip: 'with patterns of inlaid gemstones',
        explanation:
          'a grand open space, its floor decorated with precious stones in intricate patterns'
      },
      {
        label: 'ancient tree',
        tooltip: 'roots entwined with ruined walls',
        explanation:
          'a testament to the passage of time, this tree has integrated with the very structure of the temple'
      }
    ]
  },
  'inexplicable sacred structure': {
    locations: [
      {
        label: 'crumbling stone altar',
        tooltip: 'overgrown with wildflowers',
        explanation: 'once a place of rituals, nature has reclaimed its space'
      },
      {
        label: 'eerie underground chamber',
        tooltip: 'with walls covered in cryptic symbols',
        explanation:
          'a secret place of worship or ceremony, its purpose obscured by time and mysterious inscriptions'
      },
      {
        label: 'fallen pillars',
        tooltip: 'wrapped in ivy and echoing past splendor',
        explanation:
          'once standing tall, these pillars hint at the former grandeur of the structure'
      },
      {
        label: 'fragmented statue of a forgotten deity',
        tooltip: 'staring blankly',
        explanation: 'an effigy of a deity long forgotten, its features weathered by time'
      },
      {
        label: 'weathered obelisk',
        tooltip: 'inscribed with unreadable scripts',
        explanation:
          'a monolithic stone bearing inscriptions, its message now lost to erosion and time'
      },
      {
        label: 'sunken ceremonial plaza',
        tooltip: 'encircled by ancient trees',
        explanation: 'once a gathering place for rituals, nature has since encroached upon it'
      },
      {
        label: 'cracked frescoes',
        tooltip: 'colors faded but stories faintly visible',
        explanation: 'wall paintings that tell tales of old, their narrative barely discernible now'
      },
      {
        label: 'labyrinthine catacombs',
        tooltip: 'echoing with ghostly whispers',
        explanation:
          'underground burial chambers, their passages twisted and echoing with the sounds of the past'
      },
      {
        label: 'isolated grotto',
        tooltip: 'with remnants of votive offerings',
        explanation:
          'a secluded spot for private worship or offerings, now left with only remnants of its past use'
      },
      {
        label: 'ancient scriptorium',
        tooltip: 'with scattered pages of lost prayers',
        explanation:
          'a place where religious texts were written and stored, now in ruins with pages of prayers scattered'
      }
    ]
  },
  'place of some holy trial or test': {
    locations: [
      {
        label: 'shattered altar',
        tooltip: 'split in half from a divine strike',
        explanation: 'an altar broken by some divine force, marking a significant event or judgment'
      },
      {
        label: 'moss-covered statues',
        tooltip: 'hands outstretched in silent supplication',
        explanation: 'statues that seem to plea or pray, covered in the patina of time'
      },
      {
        label: 'crumbling amphitheater',
        tooltip: 'with half-eroded stone steps',
        explanation: 'a venue for gatherings or trials, its features now fading'
      },
      {
        label: 'overgrown courtyard',
        tooltip: 'marked by a labyrinth of stones',
        explanation:
          'once a place for reflection or trials, now consumed by nature and its labyrinthine patterns'
      },
      {
        label: 'eroded murals',
        tooltip: 'faintly depicting celestial beings',
        explanation: 'artworks showcasing divine entities or stories, their details now fading'
      },
      {
        label: 'stagnant pool',
        tooltip: 'once a source of sanctified water',
        explanation: 'a pool used for rituals, its waters now still and unsanctified'
      },
      {
        label: 'secluded grove',
        tooltip: 'with remnants of ritualistic circles',
        explanation:
          'a natural space used for rituals or ceremonies, hints of its use still visible'
      },
      {
        label: 'decaying library',
        tooltip: 'scattered with moldy holy texts',
        explanation:
          'a repository of sacred knowledge, now in decline and mold taking over the once revered texts'
      },
      {
        label: 'dilapidated sanctum',
        tooltip: 'choked with vines and age',
        explanation: 'a private or sacred space, now overtaken by the weight of time and nature'
      },
      {
        label: 'fragmented archways',
        tooltip: 'leading to once-hidden chambers',
        explanation: 'entrances to secret or sacred chambers, now exposed and in ruins'
      },
      {
        label: 'fallen pillars',
        tooltip: 'each representing a virtue to be tested',
        explanation: 'pillars symbolizing virtues or challenges, now toppled and strewn'
      },
      {
        label: 'dry fountains',
        tooltip: 'adorned with angelic figures in lament',
        explanation:
          'fountains that once flowed, their decorative angels now mourning their dry state'
      }
    ]
  },
  'outsider fane to an alien god': {
    locations: [
      {
        label: 'shattered altar',
        tooltip: 'once the focal point of worship',
        explanation: 'this was where the alien god was revered and offerings were placed'
      },
      {
        label: 'twisted obelisk',
        tooltip: 'inscribed with strange glyphs',
        explanation: 'a mysterious stone pillar bearing cryptic symbols of extraterrestrial origin'
      },
      {
        label: 'sunken chamber',
        tooltip: 'filled with iridescent pools',
        explanation:
          'a submerged room containing shimmering waters that reflect alien constellations'
      },
      {
        label: 'fragmented mosaic',
        tooltip: 'depicting otherworldly constellations',
        explanation: 'a broken piece of art that once showcased star patterns from a distant galaxy'
      },
      {
        label: 'collapsed archway',
        tooltip: 'made of an unfamiliar black stone',
        explanation: 'a fallen entryway constructed from a material not of this world'
      },
      {
        label: 'eerie silent grove',
        tooltip: 'with bioluminescent flora',
        explanation: 'a quiet forest area where plants emit their own alien glow'
      },
      {
        label: 'hollowed shrine',
        tooltip: 'housing melted alien artifacts',
        explanation:
          'a sacred space containing remnants of items from another world, now deformed by unknown forces'
      },
      {
        label: 'towering spire',
        tooltip: 'resonating a low hum when approached',
        explanation: 'a tall structure that emits an otherworldly sound as one nears it'
      },
      {
        label: 'labyrinthine tunnels',
        tooltip: 'walls pulsating softly to touch',
        explanation:
          'a maze of passageways whose walls seem alive and respond to touch with a gentle throbbing'
      },
      {
        label: 'fractured statue',
        tooltip: 'resembling a being of many limbs and eyes',
        explanation:
          'a broken effigy of a multi-limbed, multi-eyed entity, hinting at the alien nature of its deity'
      },
      {
        label: 'stone circle',
        tooltip: 'where the ground vibrates with unknown energy',
        explanation:
          'a ring of stones that emits an unexplained energy causing the earth to tremble'
      },
      {
        label: 'darkened pit',
        tooltip: 'emitting a cold, otherworldly breeze',
        explanation:
          'a deep hole from which emanates a chilling wind, suggesting a connection to another realm or dimension'
      }
    ]
  },
  'prison for a sealed demonic force': {
    locations: [
      {
        label: 'cracked obsidian cell',
        tooltip: 'radiating malevolent energy',
        explanation: 'it once contained a powerful demon that was sealed away'
      },
      {
        label: 'muted summoning circle',
        tooltip: 'barely glowing runes on the ground',
        explanation: 'ancient mages used this to trap and imprison the force'
      },
      {
        label: 'chain web chamber',
        tooltip: 'chains spanning the entire room',
        explanation: "designed to bind and suppress the entity's strength"
      },
      {
        label: 'warded gates',
        tooltip: 'with faded protection glyphs',
        explanation: 'served as barriers to keep the entity confined'
      },
      {
        label: "forgotten watcher's post",
        tooltip: 'overlooking the prison grounds',
        explanation: 'guards once kept a vigilant eye for any disturbances'
      },
      {
        label: 'collapsed ritual site',
        tooltip: 'candles and talismans scattered',
        explanation: "used by priests to strengthen the prison's wards"
      },
      {
        label: 'broken demon cage',
        tooltip: 'charred and twisted metal bars',
        explanation: "a smaller prison for the demon's lesser minions"
      },
      {
        label: 'sealed portal room',
        tooltip: 'doorway that leads to void',
        explanation: 'an entrance to the prison, now magically locked'
      },
      {
        label: 'withered guardian statues',
        tooltip: 'stone figures with weapons poised',
        explanation: 'enchanted to come to life if the prison was breached'
      },
      {
        label: 'desolate courtyard',
        tooltip: 'overgrown with thorny vines',
        explanation: 'where prison staff once congregated and rested'
      },
      {
        label: 'ritual tool storage',
        tooltip: 'dusty shelves with scattered instruments',
        explanation: 'held items needed for sealing ceremonies'
      },
      {
        label: 'moldy dungeon',
        tooltip: 'walls etched with frantic symbols',
        explanation:
          'a dank holding area, its walls marked by desperate carvings from former prisoners or captors'
      },
      {
        label: "echoing warden's quarters",
        tooltip: 'abandoned with hints of a hurried exit',
        explanation: "where the prison's overseer once resided"
      },
      {
        label: 'echoing cavern',
        tooltip: 'with stalactites dripping a viscous fluid',
        explanation:
          'a natural cave within the prison where dripping formations release a mysterious substance'
      },
      {
        label: 'fragmented armory',
        tooltip: 'rusted armor scattered about',
        explanation:
          'a storage for weapons and protective gear, now broken and with decaying equipment'
      },
      {
        label: 'charred council chamber',
        tooltip: 'ash settling on ancient seats',
        explanation:
          'a room where decisions were made regarding the prison, now scorched and abandoned'
      }
    ]
  },
  'pilgrim hospital or waystation': {
    locations: [
      {
        label: "crumbled healer's hut",
        tooltip: 'left with medicinal herbs and tools',
        explanation: 'where wounded pilgrims received care'
      },
      {
        label: "collapsed traveler's shelter",
        tooltip: 'with remnants of old campfires',
        explanation: 'a resting spot for weary travelers'
      },
      {
        label: 'broken stone well',
        tooltip: 'once a source of fresh water',
        explanation: 'pilgrims drank and replenished here'
      },
      {
        label: 'faded mural chamber',
        tooltip: 'walls depicting a sacred journey',
        explanation: 'served to inspire and guide pilgrims'
      },
      {
        label: 'deserted inn rooms',
        tooltip: 'with straw mattresses and blankets',
        explanation: 'where pilgrims could rest for the night'
      },
      {
        label: 'overgrown meditation garden',
        tooltip: 'peaceful, even in its decay',
        explanation: 'a place for reflection and prayer'
      },
      {
        label: 'forgotten food storage',
        tooltip: 'barrels and pots now empty',
        explanation: 'held provisions for hungry travelers'
      },
      {
        label: 'ruined shrine',
        tooltip: 'with a cracked deity statue',
        explanation: 'pilgrims offered prayers for a safe journey'
      },
      {
        label: "abandoned caretaker's dwelling",
        tooltip: 'dusty and silent',
        explanation: "the home of the waystation's keeper"
      },
      {
        label: 'shattered stone pathway',
        tooltip: 'leading through the grounds',
        explanation: 'once walked upon by countless pilgrims'
      },
      {
        label: 'cracked pool of reflection',
        tooltip: 'stagnant water with floating leaves',
        explanation: 'a place for cleansing and contemplation'
      },
      {
        label: 'worn-out stables',
        tooltip: 'with hay and broken tools',
        explanation: "sheltered pilgrims' mounts and beasts of burden"
      }
    ]
  },
  'holy archive or relic-fortress': {
    locations: [
      {
        label: 'fragmented relic chamber',
        tooltip: 'shattered display cases and pedestals',
        explanation: 'once housed revered sacred artifacts'
      },
      {
        label: 'decayed manuscript room',
        tooltip: 'papers and scrolls strewn about',
        explanation: 'a repository for holy texts and writings'
      },
      {
        label: 'crumbled guardian barracks',
        tooltip: 'abandoned armors and weapons',
        explanation: "living quarters for the fortress's defenders"
      },
      {
        label: 'collapsed prayer hall',
        tooltip: 'benches and faded murals',
        explanation: 'where the devout came to worship'
      },
      {
        label: 'ruined relic forge',
        tooltip: 'cold anvil and scattered tools',
        explanation: 'used to repair and maintain sacred artifacts'
      },
      {
        label: 'forgotten treasury',
        tooltip: 'empty chests and broken lock mechanisms',
        explanation: 'where offerings and donations were stored'
      },
      {
        label: 'deteriorated study chambers',
        tooltip: 'desks with quills and ink pots',
        explanation: 'where scholars studied sacred texts'
      },
      {
        label: "deserted overseer's office",
        tooltip: 'papers and seals of authority',
        explanation: "the heart of the fortress's administration"
      },
      {
        label: 'abandoned artifact workshop',
        tooltip: 'dusty molds and crafting materials',
        explanation: 'where new relics were crafted and imbued'
      },
      {
        label: 'cracked observatory dome',
        tooltip: 'rusting telescope pointing skyward',
        explanation: 'used for astronomical studies and prophecies'
      },
      {
        label: 'worn-out pilgrim lodgings',
        tooltip: 'beds and belongings left behind',
        explanation: 'rooms for those on a religious journey'
      },
      {
        label: 'overgrown garden of remembrance',
        tooltip: 'statues hidden among tall grasses',
        explanation: 'a place to honor past leaders and heroes'
      }
    ]
  },
  'inscrutable outsider art structure': {
    locations: [
      {
        label: 'twisted metal sculpture',
        tooltip: 'with no discernible purpose',
        explanation: 'a mysterious creation of an unknown artist'
      },
      {
        label: 'cracked glass maze',
        tooltip: 'reflecting fractured images',
        explanation: 'a puzzling construction meant to disorient'
      },
      {
        label: 'sunken stone monolith',
        tooltip: 'covered in unfamiliar carvings',
        explanation: 'a monument from a mind not of this world'
      },
      {
        label: 'abandoned clay figurine garden',
        tooltip: 'figures with exaggerated features',
        explanation: "representations of an artist's unique vision"
      },
      {
        label: 'rusting iron tower',
        tooltip: 'with ladders leading nowhere',
        explanation: 'a statement on the futility of ambition or progress'
      },
      {
        label: 'shattered porcelain forest',
        tooltip: 'trees with delicate, broken branches',
        explanation: "a fragile echo of nature's majesty"
      },
      {
        label: 'decaying cloth tapestry',
        tooltip: 'depicting abstract patterns',
        explanation: "a canvas for an outsider's story or emotions"
      },
      {
        label: 'crumbling concrete labyrinth',
        tooltip: 'paths that twist and turn',
        explanation: "a journey through the artist's mind or experiences"
      },
      {
        label: 'fragmented mirror pond',
        tooltip: 'still waters surrounded by shards',
        explanation: 'reflecting both reality and distorted visions'
      },
      {
        label: 'overturned wooden installation',
        tooltip: 'with hidden compartments and nooks',
        explanation: 'a playful or introspective creation of woodwork'
      },
      {
        label: 'faded paint mural',
        tooltip: 'colors blending into obscurity',
        explanation: 'once a vibrant expression, now lost to time'
      },
      {
        label: 'abandoned sound sculpture',
        tooltip: 'whistles and chimes silenced',
        explanation: 'designed to make music with the wind'
      }
    ]
  },
  'library or ancient archive': {
    locations: [
      {
        label: 'decayed reading chamber',
        tooltip: 'rotten wood benches and desks',
        explanation: 'a once-quiet spot for studying texts'
      },
      {
        label: 'collapsed bookshelf corridor',
        tooltip: 'tomes scattered and damaged',
        explanation: 'held a wealth of knowledge now lost'
      },
      {
        label: 'forgotten map room',
        tooltip: 'faded charts and broken compasses',
        explanation: 'guided explorers and scholars of old'
      },
      {
        label: "ruined scribe's quarters",
        tooltip: 'quills, inks, and unfinished manuscripts',
        explanation: 'where records and copies were meticulously made'
      },
      {
        label: 'abandoned lecture hall',
        tooltip: 'podium and rows of seating',
        explanation: 'hosted teachings and intellectual debates'
      },
      {
        label: 'overgrown botanical archive',
        tooltip: 'dried plants and labeled containers',
        explanation: 'a collection of specimens from across the world'
      },
      {
        label: 'sunken scroll vault',
        tooltip: 'sealed jars and fragments of parchment',
        explanation: 'protected ancient writings from the elements'
      },
      {
        label: 'faded mural of knowledge',
        tooltip: 'depicting scholars and grand libraries',
        explanation: 'a celebration of the pursuit of understanding'
      },
      {
        label: "deserted curator's office",
        tooltip: 'catalogs and acquisition records',
        explanation: "the heart of the library's operations"
      },
      {
        label: 'shattered artifact display',
        tooltip: 'glass cases and empty pedestals',
        explanation: 'showcased relics related to the texts'
      },
      {
        label: 'deteriorated star chart room',
        tooltip: 'celestial maps and rusty astrolabes',
        explanation: 'for those studying the cosmos and its mysteries'
      },
      {
        label: 'abandoned oral history chamber',
        tooltip: 'seats arranged in a circle',
        explanation: 'where stories were told and recorded for posterity'
      }
    ]
  },
  "ancient culture's gathering site": {
    locations: [
      {
        label: 'crumbling stone benches',
        tooltip: 'seats of the ancestors',
        explanation: 'where community members once gathered for events'
      },
      {
        label: 'sunken fire pit',
        tooltip: 'charred logs and ceremonial tools',
        explanation: 'a place for communal feasts and gatherings'
      },
      {
        label: 'faded wall murals',
        tooltip: 'stories fade into stone',
        explanation: 'depicted tales and histories of the culture'
      },
      {
        label: 'overgrown ceremonial platform',
        tooltip: 'altar stones and ritual remnants',
        explanation: 'used for religious ceremonies and rites'
      },
      {
        label: 'collapsed communal hall',
        tooltip: 'once echoed with voices',
        explanation: 'where meetings and ceremonies were held'
      },
      {
        label: 'abandoned market stalls',
        tooltip: 'woven baskets and pottery fragments',
        explanation: 'where traders and craftsmen peddled goods'
      },
      {
        label: 'cracked water gathering pool',
        tooltip: 'surrounded by stone benches',
        explanation: 'a communal spot to collect and share water'
      },
      {
        label: 'eroded statuettes',
        tooltip: 'deities forgotten',
        explanation: 'representations of cultural gods or spirits'
      },
      {
        label: 'forgotten dance circle',
        tooltip: 'flattened earth with footprints',
        explanation: 'where the community celebrated with dance'
      },
      {
        label: 'deserted storytelling grove',
        tooltip: 'shade trees and stone markers',
        explanation: 'elders shared tales and legends here'
      },
      {
        label: 'buried artifact caches',
        tooltip: 'treasures hidden beneath',
        explanation: 'stored items of significance for the community'
      },
      {
        label: 'fragmented ancestor shrine',
        tooltip: 'offerings and inscriptions',
        explanation: 'a place to honor and remember the departed'
      }
    ]
  },
  'resort for nobles at ease': {
    locations: [
      {
        label: 'crumbling bathhouse',
        tooltip: 'mosaic floors and empty pools',
        explanation: 'nobles relaxed and socialized here'
      },
      {
        label: 'overgrown garden gazebo',
        tooltip: 'vines covering ornate carvings',
        explanation: 'a tranquil spot for contemplation or romance'
      },
      {
        label: 'faded ballroom',
        tooltip: 'chandeliers hanging askew',
        explanation: 'once echoed with music and laughter'
      },
      {
        label: 'decayed guest villa',
        tooltip: 'luxurious furnishings now rotten',
        explanation: 'provided opulent accommodations for visitors'
      },
      {
        label: 'abandoned hedge maze',
        tooltip: 'paths overgrown and untraceable',
        explanation: 'designed for leisurely strolls and playful chases'
      },
      {
        label: 'sunken fountain courtyard',
        tooltip: 'statues eroded by time',
        explanation: 'a centerpiece for gatherings and events'
      },
      {
        label: 'ruined observatory tower',
        tooltip: 'telescope rusted and broken',
        explanation: 'nobles gazed at the stars in wonder'
      },
      {
        label: 'forgotten game room',
        tooltip: 'scattered pieces and broken tables',
        explanation: 'a place for diversion and competition'
      },
      {
        label: 'shattered greenhouse',
        tooltip: 'fragile panes and wilted plants',
        explanation: 'housed exotic plants and floral displays'
      },
      {
        label: 'overturned boat house',
        tooltip: 'rotting vessels and torn sails',
        explanation: 'for leisurely trips on nearby waters'
      },
      {
        label: 'deteriorated sculpture garden',
        tooltip: 'marble figures chipped and cracked',
        explanation: 'an outdoor gallery of art and beauty'
      },
      {
        label: 'collapsed dining pavilion',
        tooltip: 'tables upturned and silverware scattered',
        explanation: 'where grand feasts and banquets were held'
      }
    ]
  },
  'monument complex to lost glories': {
    locations: [
      {
        label: 'crumbled statue base',
        tooltip: 'once held a hero in stone',
        explanation: 'dedicated to a forgotten champion of the past'
      },
      {
        label: 'overgrown commemorative plaza',
        tooltip: 'engraved bricks beneath moss',
        explanation: 'a space to remember significant events or figures'
      },
      {
        label: 'faded inscription wall',
        tooltip: 'letters barely legible',
        explanation: 'recorded deeds and achievements now forgotten'
      },
      {
        label: 'abandoned observation deck',
        tooltip: 'overlooking a once-proud city',
        explanation: "where citizens admired their civilization's greatness"
      },
      {
        label: 'deteriorated victory arch',
        tooltip: 'intricate carvings worn away',
        explanation: 'celebrated a notable triumph or milestone'
      },
      {
        label: 'sunken ceremonial pool',
        tooltip: 'water murky and still',
        explanation: 'reflected the splendor of ceremonies held here'
      },
      {
        label: 'shattered mosaic pathway',
        tooltip: 'colored tiles scattered',
        explanation: 'depicted the history of a glorious era'
      },
      {
        label: 'decayed bell tower',
        tooltip: 'bell silenced, structure leaning',
        explanation: 'once chimed to commemorate special occasions'
      },
      {
        label: 'cracked obelisk',
        tooltip: 'symbols of power eroded',
        explanation: "stood as a testament to a civilization's might"
      },
      {
        label: 'collapsed hall of heroes',
        tooltip: 'pedestals empty, roof caved in',
        explanation: 'a gallery of notable figures now lost to time'
      },
      {
        label: 'fragmented emblem square',
        tooltip: 'flags and symbols decayed',
        explanation: 'displayed the icons of a once-great society'
      },
      {
        label: 'forsaken torch platform',
        tooltip: 'burned out and rusted',
        explanation: 'once held flames to inspire and remind'
      }
    ]
  },
  'enormous musical structure': {
    locations: [
      {
        label: 'silent organ chambers',
        tooltip: 'melodies forgotten',
        explanation: 'housed massive organs that once filled the air with music'
      },
      {
        label: 'cracked bell towers',
        tooltip: 'chimes no longer ring',
        explanation: 'contained large bells that resonated throughout the area'
      },
      {
        label: 'dismantled harp strings',
        tooltip: 'harmonies untangled',
        explanation: 'giant harps that played in the wind, now silent'
      },
      {
        label: 'ruined amphitheater seats',
        tooltip: 'audiences vanished',
        explanation: 'where listeners once gathered to hear performances'
      },
      {
        label: "abandoned conductor's podium",
        tooltip: 'baton dropped, silence reigns',
        explanation: 'where the musical director once stood to lead the orchestra'
      },
      {
        label: 'scattered sheet music',
        tooltip: 'compositions scatter to the wind',
        explanation: 'sheets of music that once dictated grand performances'
      },
      {
        label: 'decayed wind chime arrays',
        tooltip: 'no breezes sing',
        explanation: 'large-scale wind chimes that created ambient soundscapes'
      },
      {
        label: 'toppled percussion towers',
        tooltip: 'rhythms fall silent',
        explanation: 'structures that housed giant drums and other percussion instruments'
      },
      {
        label: 'muted echo chambers',
        tooltip: 'resonances lost',
        explanation: 'designed to amplify and sustain sounds throughout the structure'
      },
      {
        label: 'flooded melody canals',
        tooltip: 'waters mute the notes',
        explanation: 'channels that carried sound in creative ways around the structure'
      },
      {
        label: 'deserted tuning chambers',
        tooltip: "harmony's last refuge",
        explanation: 'rooms dedicated to tuning the massive instruments'
      },
      {
        label: 'fragmented instrument relics',
        tooltip: 'echoes of creation',
        explanation: 'remnants of uniquely crafted instruments for specific sounds'
      }
    ]
  },
  'abandoned school or study center': {
    locations: [
      {
        label: 'decayed lecture hall',
        tooltip: 'overturned chairs, faded chalkboard',
        explanation: 'once a center of learning and debate'
      },
      {
        label: 'overgrown library courtyard',
        tooltip: 'books deteriorated and scattered',
        explanation: 'held a wealth of knowledge now lost'
      },
      {
        label: 'crumbling student dormitory',
        tooltip: 'personal items left behind',
        explanation: 'living quarters for eager learners'
      },
      {
        label: 'broken observatory',
        tooltip: 'telescope rusted, dome caved in',
        explanation: 'used to explore the mysteries of the cosmos'
      },
      {
        label: 'faded mural of academia',
        tooltip: 'scenes of study and exploration',
        explanation: 'a celebration of the pursuit of knowledge'
      },
      {
        label: 'forsaken laboratory',
        tooltip: 'glassware shattered, notes scattered',
        explanation: 'where experiments and discoveries took place'
      },
      {
        label: 'shattered art studio',
        tooltip: 'dried paints and broken canvases',
        explanation: 'a space for creativity and expression'
      },
      {
        label: 'sunken music practice room',
        tooltip: 'instruments decaying and silent',
        explanation: 'a place to cultivate and share musical talent'
      },
      {
        label: 'deserted playground',
        tooltip: 'swings creaking in the wind',
        explanation: 'where students took breaks and socialized'
      },
      {
        label: 'abandoned debate arena',
        tooltip: 'echoes of passionate arguments',
        explanation: 'a forum for exchanging ideas and perspectives'
      },
      {
        label: 'deteriorated map room',
        tooltip: 'charts fading, globes broken',
        explanation: 'explored the world from within its walls'
      },
      {
        label: 'collapsed tower of books',
        tooltip: 'literature exposed to elements',
        explanation: 'a repository of wisdom and tales'
      }
    ]
  },
  'massive ceremonial structure': {
    locations: [
      {
        label: 'toppled ritual columns',
        tooltip: 'pillars of the past',
        explanation: 'once supported the roof under which ceremonies took place'
      },
      {
        label: 'cracked altar stones',
        tooltip: 'sacrifices unmade',
        explanation: 'central to ritual practices, now lying in ruin'
      },
      {
        label: 'faded hieroglyph walls',
        tooltip: 'stories untold',
        explanation: 'walls adorned with symbols depicting ceremonial lore'
      },
      {
        label: 'desolate procession avenues',
        tooltip: 'footsteps echo no more',
        explanation: 'paths used for ceremonial entrances and exits'
      },
      {
        label: 'ruined offering pools',
        tooltip: 'gifts to the gods',
        explanation: 'water basins used for ritual offerings, now dry and cracked'
      },
      {
        label: 'abandoned votive candles',
        tooltip: 'light of faith extinguished',
        explanation: 'used in ceremonies to symbolize prayer or offerings'
      },
      {
        label: 'scattered ceremonial garments',
        tooltip: 'robes of the reverent',
        explanation: 'clothing worn by participants, now decaying'
      },
      {
        label: 'erased incantation circles',
        tooltip: "magic's silent footprint",
        explanation: 'areas marked for chanting or spellcasting, now worn away'
      },
      {
        label: 'neglected relic shrines',
        tooltip: "devotion's decay",
        explanation: 'housed sacred objects, now forgotten'
      },
      {
        label: 'collapsed divine statues',
        tooltip: 'idols fall from grace',
        explanation: 'representations of deities, now in ruins'
      },
      {
        label: 'overgrown ceremonial gardens',
        tooltip: 'nature reclaims sanctity',
        explanation: 'gardens that held spiritual significance, now wild and untamed'
      },
      {
        label: 'sealed crypt entrances',
        tooltip: 'ancestors locked away',
        explanation: 'entryways to burial sites for important figures, now inaccessible'
      }
    ]
  },
  'indoctrination camp or prison': {
    locations: [
      {
        label: 'crumbling watchtower',
        tooltip: 'once overlooked the entire camp',
        explanation: 'guarded against escape and rebellion'
      },
      {
        label: 'decayed barbed fence',
        tooltip: 'rusty and partly torn down',
        explanation: 'kept prisoners confined and isolated'
      },
      {
        label: 'overgrown prisoner barracks',
        tooltip: 'bunk beds rotting away',
        explanation: 'held countless souls against their will'
      },
      {
        label: 'forsaken interrogation chamber',
        tooltip: 'stains and dark memories',
        explanation: 'a room filled with pain and confession'
      },
      {
        label: 'abandoned propaganda theater',
        tooltip: 'projector rusted, seats deteriorating',
        explanation: "indoctrinated prisoners with the regime's views"
      },
      {
        label: 'crumbled isolation cells',
        tooltip: 'small, dark, and cold',
        explanation: 'punished those who resisted or rebelled'
      },
      {
        label: "deserted guard's quarters",
        tooltip: 'uniforms moth-eaten, weapons rusted',
        explanation: "living area for the camp's enforcers"
      },
      {
        label: 'broken exercise yard',
        tooltip: 'faint traces of footprints',
        explanation: 'where prisoners had brief moments of freedom'
      },
      {
        label: 'faded wall of rules',
        tooltip: "do's and don'ts barely readable",
        explanation: 'ensured obedience and compliance'
      },
      {
        label: 'ruined administrative building',
        tooltip: 'paperwork scattered and yellowed',
        explanation: "controlled and monitored the camp's operations"
      },
      {
        label: 'collapsed watchtower',
        tooltip: 'once a symbol of oppression',
        explanation: 'oversaw every corner of the camp'
      },
      {
        label: 'sunken re-education classroom',
        tooltip: 'desks askew, propaganda posters faded',
        explanation: 'forced new beliefs upon the imprisoned'
      }
    ]
  },
  'preserved “heritage” village-resort': {
    locations: [
      {
        label: 'abandoned craft shops',
        tooltip: 'artisan echoes fade',
        explanation: 'where traditional crafts were demonstrated and sold'
      },
      {
        label: 'empty guest lodges',
        tooltip: "hospitality's hollow shell",
        explanation: 'accommodations for visitors, now desolate'
      },
      {
        label: 'overrun heritage gardens',
        tooltip: 'legacy undergrowth',
        explanation: "showcased the region's flora, now wild"
      },
      {
        label: 'silent communal squares',
        tooltip: 'gatherings dispersed',
        explanation: 'central areas for events and socializing, now quiet'
      },
      {
        label: 'forsaken exhibit halls',
        tooltip: 'culture on display',
        explanation: 'presented the history and traditions of the village'
      },
      {
        label: 'crumbled performance stages',
        tooltip: 'shows forever paused',
        explanation: 'hosted traditional performances, now in ruins'
      },
      {
        label: 'dilapidated dining halls',
        tooltip: 'feasts forgotten',
        explanation: 'served traditional meals, now abandoned'
      },
      {
        label: 'vanished artisan fountains',
        tooltip: "water's silent flow",
        explanation: 'decorative and functional, crafted by local artisans'
      },
      {
        label: 'locked souvenir stalls',
        tooltip: 'memories unclaimed',
        explanation: "sold mementos of the village's cultural heritage"
      },
      {
        label: 'neglected walking paths',
        tooltip: 'journeys unmade',
        explanation: "guided visitors through the village's attractions"
      },
      {
        label: 'desolate viewing decks',
        tooltip: 'scenery unadmired',
        explanation: 'offered picturesque views of the surrounding area'
      },
      {
        label: 'eroded traditional bridges',
        tooltip: 'crossings reclaimed',
        explanation: "architectural elements reflecting the village's heritage"
      }
    ]
  },
  'museum of a lost nation': {
    locations: [
      {
        label: 'shattered display cases',
        tooltip: 'artifacts scattered and broken',
        explanation: 'held treasures of a nation now forgotten'
      },
      {
        label: 'faded historic mural',
        tooltip: 'heroes and moments barely recognizable',
        explanation: "depicted key events in the nation's history"
      },
      {
        label: 'crumbled leadership statue',
        tooltip: 'features eroded by time and neglect',
        explanation: 'honored a leader who shaped the nation'
      },
      {
        label: 'deserted achievement hall',
        tooltip: 'empty frames, silent instruments',
        explanation: 'celebrated the arts and innovations'
      },
      {
        label: 'overgrown garden',
        tooltip: 'plants wild, plaques unreadable',
        explanation: "represented the nation's diverse ecology"
      },
      {
        label: 'abandoned audio-visual room',
        tooltip: 'projectors rusted, screens torn',
        explanation: "played documentaries of the nation's legacy"
      },
      {
        label: 'forgotten memorial plaques',
        tooltip: 'honors unremembered',
        explanation: 'paid tribute to significant figures and events'
      },
      {
        label: 'ruined map room',
        tooltip: 'boundaries faded, markers missing',
        explanation: "charted the nation's rise and fall"
      },
      {
        label: 'collapsed archive shelves',
        tooltip: 'knowledge crumbles',
        explanation: 'stored documents and items of historical value'
      },
      {
        label: 'empty souvenir shops',
        tooltip: 'memories unsold',
        explanation: "sold replicas and books related to the nation's history"
      },
      {
        label: 'vanished cultural relics',
        tooltip: 'identity scattered',
        explanation: "items that were central to the nation's cultural identity"
      },
      {
        label: 'scientific marvels',
        tooltip: 'machines rusted, innovations halted',
        explanation: 'honored the thinkers and their breakthroughs'
      }
    ]
  },
  'taboo site of dark magic': {
    locations: [
      {
        label: 'forbidden ritual circles',
        tooltip: 'darkness conjured here',
        explanation: 'where taboo magical practices were performed'
      },
      {
        label: 'cracked obsidian altars',
        tooltip: 'sacrifices made to shadows',
        explanation: 'used for offerings to dark entities'
      },
      {
        label: 'shrouded arcane libraries',
        tooltip: 'forbidden knowledge sleeps',
        explanation: 'contained texts and tomes of dark magic'
      },
      {
        label: 'collapsed summoning chambers',
        tooltip: 'entities no longer called',
        explanation: 'rooms dedicated to conjuring beings from other realms'
      },
      {
        label: 'desecrated protective wards',
        tooltip: 'safeguards broken',
        explanation: 'magical barriers that once contained dark energies'
      },
      {
        label: 'abandoned divination pools',
        tooltip: 'futures untold',
        explanation: 'used for scrying and foreseeing events through dark magic'
      },
      {
        label: 'tainted relic vaults',
        tooltip: 'corruption contained',
        explanation: 'stored items of powerful and dangerous magic'
      },
      {
        label: 'silenced curse tablets',
        tooltip: 'vengeance quieted',
        explanation: 'inscribed with spells or curses, now powerless'
      },
      {
        label: 'forgotten potion vials',
        tooltip: 'elixirs of doom',
        explanation: 'contained brews and concoctions for various dark purposes'
      },
      {
        label: 'eroded talisman pedestals',
        tooltip: 'protections failed',
        explanation: 'displayed amulets and talismans with dark enchantments'
      },
      {
        label: 'neglected sacrificial knives',
        tooltip: 'bloodletting ceased',
        explanation: 'instruments used in rituals, now lying idle'
      },
      {
        label: 'vanished shadow gates',
        tooltip: 'portals sealed',
        explanation: 'gateways to other realms, closed or destroyed'
      }
    ]
  },
  'psychic or tech communications site': {
    locations: [
      {
        label: 'silent transmission hub',
        tooltip: 'signals dead, consoles dim',
        explanation:
          'once a bustling center for psychic or technological communication, now eerily quiet'
      },
      {
        label: 'decayed message archives',
        tooltip: 'data rots, history fades',
        explanation: 'storage for important communications, now corrupted and unreadable'
      },
      {
        label: 'fractured psychic amplifier',
        tooltip: 'energy dispersed, focus lost',
        explanation: 'enhanced psychic messages, now broken and ineffective'
      },
      {
        label: 'abandoned operator stations',
        tooltip: 'chairs empty, screens blank',
        explanation: 'where operators managed incoming and outgoing messages, now deserted'
      },
      {
        label: 'overgrown antenna array',
        tooltip: 'signals silent, nature reclaims',
        explanation: 'facilitated long-distance communication, now overrun by flora'
      },
      {
        label: 'fused interface terminals',
        tooltip: 'connections severed, tech melted',
        explanation: 'users interfaced with communication systems here, now unusable'
      },
      {
        label: 'collapsed psychic conduit',
        tooltip: 'pathways blocked, energy stagnant',
        explanation: 'channeled psychic energy for communication, now obstructed'
      },
      {
        label: 'eroded signal boosters',
        tooltip: 'power wanes, reach shortened',
        explanation: 'amplified signals to distant receivers, now weakened'
      },
      {
        label: 'disconnected relay nodes',
        tooltip: 'links broken, isolation complete',
        explanation: 'networked with other sites for relayed communication, now isolated'
      },
      {
        label: 'burnt-out encryption devices',
        tooltip: 'secrets exposed, safeguards failed',
        explanation: 'secured messages against interception, now compromised'
      },
      {
        label: 'scattered comm receivers',
        tooltip: 'incoming silent, dust gathers',
        explanation: 'received messages from afar, now just relics'
      },
      {
        label: 'dismantled neural interfaces',
        tooltip: 'connections lost, minds freed',
        explanation: 'allowed direct psychic communication, now disconnected'
      }
    ]
  },
  'subterranean transit tunnels': {
    locations: [
      {
        label: 'crumbling platform edges',
        tooltip: 'trains gone, echoes remain',
        explanation: 'where passengers once boarded and disembarked, now in ruins'
      },
      {
        label: 'derailed transit cars',
        tooltip: 'journeys end, rust spreads',
        explanation: 'transported individuals through tunnels, now abandoned'
      },
      {
        label: 'flooded access corridors',
        tooltip: 'water rises, paths vanish',
        explanation: 'provided access to the tunnels, now submerged and impassable'
      },
      {
        label: 'collapsed tunnel sections',
        tooltip: 'routes blocked, darkness dominates',
        explanation: 'once busy transit pathways, now caved in and inaccessible'
      },
      {
        label: 'abandoned control booth',
        tooltip: 'switches silent, lights out',
        explanation: 'monitored and managed tunnel traffic, now neglected'
      },
      {
        label: 'overgrown ventilation shafts',
        tooltip: 'air still, green invades',
        explanation: 'circulated fresh air, now choked with plant life'
      },
      {
        label: 'disconnected power lines',
        tooltip: 'energy fades, cold encroaches',
        explanation: 'supplied electricity for transit operations, now dead'
      },
      {
        label: 'erased route maps',
        tooltip: 'directions lost, travelers bewildered',
        explanation: 'guided commuters to their destinations, now blank and useless'
      },
      {
        label: 'sealed emergency exits',
        tooltip: 'escapes blocked, safety forgotten',
        explanation: 'provided exits in case of crisis, now permanently closed off'
      },
      {
        label: 'dilapidated maintenance sheds',
        tooltip: 'tools scatter, repair undone',
        explanation: 'housed equipment for tunnel upkeep, now in disrepair'
      },
      {
        label: 'frozen ticket machines',
        tooltip: 'transactions halt, silence buys',
        explanation: 'facilitated access to the transit system, now inoperative'
      },
      {
        label: 'echoing waiting areas',
        tooltip: 'seats empty, anticipation dies',
        explanation: 'where passengers awaited their rides, now just hollow spaces'
      }
    ]
  },
  'canal or aqueduct control center': {
    locations: [
      {
        label: 'overrun control panels',
        tooltip: 'levers stuck, flow ceased',
        explanation: 'regulated water flow through canals or aqueducts, now abandoned'
      },
      {
        label: 'silt-filled flow chambers',
        tooltip: 'water halts, sediment settles',
        explanation: 'once directed the movement of water, now clogged with silt'
      },
      {
        label: 'cracked water gates',
        tooltip: 'barriers fail, currents roam',
        explanation: 'controlled water levels and flow, now broken and ineffective'
      },
      {
        label: 'dried-up reservoir beds',
        tooltip: 'depths exposed, life extinct',
        explanation: 'stored water for distribution, now barren and dry'
      },
      {
        label: 'abandoned pump stations',
        tooltip: 'machinery silent, drought prevails',
        explanation: 'pumped water to higher elevations, now deserted'
      },
      {
        label: 'collapsed aqueduct arches',
        tooltip: 'bridges break, connections lost',
        explanation: 'carried water across distances, now fallen'
      },
      {
        label: 'eroded canal banks',
        tooltip: 'boundaries blur, water wanders',
        explanation: 'contained and directed water flow, now eroded away'
      },
      {
        label: 'fossilized water filters',
        tooltip: 'purity compromised, elements invade',
        explanation: 'cleaned water before distribution, now just relics'
      },
      {
        label: 'severed distribution conduits',
        tooltip: 'channels dry, thirst unquenched',
        explanation: 'distributed water to various areas, now disconnected'
      },
      {
        label: 'rusted valve wheels',
        tooltip: 'control lost, decay wins',
        explanation: 'used for manual control of water flow, now seized by rust'
      },
      {
        label: 'desolate monitoring stations',
        tooltip: 'gauges still, oversight ends',
        explanation: 'monitored water levels and quality, now unattended'
      },
      {
        label: 'fragmented irrigation channels',
        tooltip: 'crops wither, earth cracks',
        explanation: 'directed water to farmlands, now broken and dry'
      }
    ]
  },
  'weather-control working ruin': {
    locations: [
      {
        label: 'frozen climate core',
        tooltip: 'controls locked, storms wild',
        explanation: 'central unit for weather manipulation, now inoperative and ice-bound'
      },
      {
        label: 'shattered weather orbs',
        tooltip: 'balance lost, chaos reigns',
        explanation: 'devices that balanced local climates, now destroyed'
      },
      {
        label: 'deserted forecast archives',
        tooltip: 'predictions fade, records blank',
        explanation: 'stored data on weather patterns, now empty and forgotten'
      },
      {
        label: 'overloaded storm generators',
        tooltip: 'machines burn, skies tear',
        explanation: 'produced controlled weather phenomena, now burnt out'
      },
      {
        label: 'dismantled wind manipulators',
        tooltip: 'breezes halt, stillness prevails',
        explanation: 'controlled wind patterns, now disassembled and silent'
      },
      {
        label: 'corroded rain enhancers',
        tooltip: 'droughts extend, lands parch',
        explanation: 'induced rainfall in dry areas, now corroded and inactive'
      },
      {
        label: 'abandoned solar reflectors',
        tooltip: 'light dims, cold encroaches',
        explanation: 'managed sunlight distribution, now neglected'
      },
      {
        label: 'flooded temperature vaults',
        tooltip: 'thermals unset, climates clash',
        explanation: 'stored temperature controls, now underwater and dysfunctional'
      },
      {
        label: 'broken humidity reservoirs',
        tooltip: 'moisture escapes, air cracks',
        explanation: 'regulated air moisture, now cracked open and dry'
      },
      {
        label: 'tangled atmospheric sensors',
        tooltip: 'signals lost, forecasts fail',
        explanation: 'measured weather conditions, now tangled and non-functional'
      },
      {
        label: 'silent lightning rods',
        tooltip: 'charges dissipate, darkness falls',
        explanation: 'controlled and harnessed lightning, now inactive'
      },
      {
        label: 'toppled frost towers',
        tooltip: 'cold retreats, warmth unbound',
        explanation: 'generated cold weather conditions, now fallen and powerless'
      }
    ]
  },
  'reality-stabilizing working ruin': {
    locations: [
      {
        label: 'warped dimension anchors',
        tooltip: 'fabric tears, worlds blend',
        explanation: 'kept the fabric of reality stable, now malfunctioning and causing anomalies'
      },
      {
        label: 'flickering existence beacons',
        tooltip: 'light wanes, presence doubts',
        explanation: 'marked safe zones in reality, now flicker in and out of existence'
      },
      {
        label: 'cracked reality cores',
        tooltip: 'stability shatters, chaos leaks',
        explanation: 'once powered reality stabilization, now cracked and unreliable'
      },
      {
        label: 'dismantled temporal shields',
        tooltip: 'time unravels, past and future collide',
        explanation: 'protected against temporal anomalies, now dismantled and ineffective'
      },
      {
        label: 'erased boundary markers',
        tooltip: 'limits fade, dimensions merge',
        explanation: 'defined the edges of stable reality, now erased and forgotten'
      },
      {
        label: 'overloaded phase inverters',
        tooltip: 'phases clash, reality distorts',
        explanation: 'balanced phases of existence, now overloaded and malfunctioning'
      },
      {
        label: 'abandoned causality locks',
        tooltip: 'cause lost, effect untethered',
        explanation: 'ensured cause and effect remained consistent, now abandoned'
      },
      {
        label: 'scattered singularity shards',
        tooltip: 'unity fractures, diversity spawns',
        explanation: 'contained singularities that stabilized reality, now scattered and inert'
      },
      {
        label: 'burnt-out dimension gateways',
        tooltip: 'portals close, journeys end',
        explanation: 'allowed safe passage between realities, now burnt out'
      },
      {
        label: 'frozen echo chambers',
        tooltip: 'voices silence, echoes die',
        explanation: 'amplified stable reality signals, now silent and cold'
      },
      {
        label: 'disconnected reality conduits',
        tooltip: 'flows sever, worlds isolate',
        explanation: 'conducted stable reality energies, now disconnected'
      },
      {
        label: 'collapsed spatial bridges',
        tooltip: 'paths twist, distances deceive',
        explanation: 'bridged spaces within stable realities, now collapsed and twisted'
      }
    ]
  },
  'ancient road through an obstacle': {
    locations: [
      {
        label: 'overgrown path remnants',
        tooltip: 'stones hide, nature reclaims',
        explanation: 'where the ancient road once cut through dense obstacles, now barely visible'
      },
      {
        label: 'eroded milestone fragments',
        tooltip: 'markers fade, distances blur',
        explanation: 'served as waypoints for travelers, now eroded and fragmented'
      },
      {
        label: 'collapsed bridge crossings',
        tooltip: 'rivers reclaim, paths divide',
        explanation: 'bridged natural barriers along the road, now collapsed'
      },
      {
        label: 'abandoned guard stations',
        tooltip: 'watchers gone, silence guards',
        explanation: 'provided security along the road, now empty and silent'
      },
      {
        label: 'crumbled archway entrances',
        tooltip: 'gates fall, welcomes fade',
        explanation: 'marked significant entries or sections of the road, now in ruins'
      },
      {
        label: 'faded road maps',
        tooltip: 'directions lost, travelers forsake',
        explanation: 'guided ancient travelers, now faded and indecipherable'
      },
      {
        label: 'buried supply caches',
        tooltip: 'provisions hide, survival falters',
        explanation: 'stored supplies for travelers, now buried and forgotten'
      },
      {
        label: 'dismantled wayfarer shelters',
        tooltip: 'refuge crumbles, exposure prevails',
        explanation: 'offered shelter along the road, now dismantled and exposed'
      },
      {
        label: 'vanished landmark sculptures',
        tooltip: 'art disappears, memory fades',
        explanation: 'served as cultural or navigational landmarks, now vanished'
      },
      {
        label: 'obscured tunnel entrances',
        tooltip: 'darkness swallows, paths confuse',
        explanation: 'allowed passage through barriers, now obscured and foreboding'
      },
      {
        label: 'derelict rest areas',
        tooltip: 'comforts flee, weariness grows',
        explanation: 'provided rest and resupply points, now derelict and inhospitable'
      },
      {
        label: 'silent signal towers',
        tooltip: 'signals fade, communication breaks',
        explanation: 'used for communication or signaling across distances, now silent and broken'
      }
    ]
  },
  'massive bridge or tunnel': {
    locations: [
      {
        label: 'cracked foundation',
        tooltip: 'fissured stone, evidence of stress',
        explanation: 'the base of the bridge or tunnel showing structural failure'
      },
      {
        label: 'eroded pathway',
        tooltip: 'barely visible path, overgrown',
        explanation: 'the main passage of the bridge or tunnel, now reclaimed by nature'
      },
      {
        label: 'collapsed section',
        tooltip: 'gap in the structure, danger ahead',
        explanation: 'a part of the bridge or tunnel that has fallen into disrepair'
      },
      {
        label: 'flooded underpass',
        tooltip: 'water filled passage, dark and deep',
        explanation: 'an underpass of the structure, now submerged and inaccessible'
      },
      {
        label: 'dangling cables',
        tooltip: 'wires hang loose, sparking',
        explanation: 'remnants of the electrical system, exposed and hazardous'
      },
      {
        label: 'weathered reliefs',
        tooltip: 'faded art, barely discernible',
        explanation: "decorative elements on the structure's surfaces, eroded by time"
      },
      {
        label: 'abandoned checkpoint',
        tooltip: 'lonely booth, silent watch',
        explanation: 'a control point or toll booth, now deserted and silent'
      },
      {
        label: 'rubble blockade',
        tooltip: 'stone and metal, impassable',
        explanation: 'debris that blocks passage, a testament to decay'
      },
      {
        label: 'overgrown entrance',
        tooltip: "nature's reclaim, hidden doorway",
        explanation: 'the main entry now obscured by vegetation'
      },
      {
        label: 'echoing chamber',
        tooltip: 'sound swirls, empty vastness',
        explanation: 'a section of the structure that amplifies sounds, now silent'
      },
      {
        label: 'faded inscriptions',
        tooltip: 'words lost to time, mystery remains',
        explanation: 'marks of those who built or used the structure, now unreadable'
      },
      {
        label: 'fragmented walkway',
        tooltip: 'broken path, careful step',
        explanation: 'a pedestrian part of the structure, now hazardous to traverse'
      }
    ]
  },
  'huge ancient dam': {
    locations: [
      {
        label: 'crumbling spillway',
        tooltip: 'water trickles, stone erodes',
        explanation: 'where water once flowed controlled, now a site of decay'
      },
      {
        label: 'deserted control room',
        tooltip: 'levers unmoved, silence reigns',
        explanation: 'the operational heart of the dam, now abandoned'
      },
      {
        label: 'silted reservoir',
        tooltip: 'mud thickens, water wanes',
        explanation: "the dam's reservoir, now filled with sediment and diminishing"
      },
      {
        label: 'exposed turbines',
        tooltip: 'machinery bared, rust conquers',
        explanation: 'power generating equipment, now inactive and deteriorating'
      },
      {
        label: 'broken floodgates',
        tooltip: 'gates ajar, control lost',
        explanation: 'meant to manage water flow, now ineffective'
      },
      {
        label: 'weed-infested catwalk',
        tooltip: 'green invasion, metal bends',
        explanation: 'access paths over the dam, now overtaken by plant life'
      },
      {
        label: 'drained outlet',
        tooltip: 'dry channel, echo calls',
        explanation: 'where water was released, now barren and echoing'
      },
      {
        label: 'abandoned maintenance shed',
        tooltip: 'tools scatter, work halted',
        explanation: 'a facility for upkeep, left as if suddenly deserted'
      },
      {
        label: 'seepage cracks',
        tooltip: 'water whispers, integrity fails',
        explanation: 'signs of structural failure, where water finds new paths'
      },
      {
        label: 'sunken observation deck',
        tooltip: 'view lost, algae cloaked',
        explanation: 'a place for visitors, now submerged and forgotten'
      },
      {
        label: 'eroded foundations',
        tooltip: 'base weakens, future uncertain',
        explanation: "the dam's support system, compromised by water erosion"
      },
      {
        label: 'sediment-filled passage',
        tooltip: 'path clogged, journey ends',
        explanation: 'internal pathways, now obstructed by accumulated sediment'
      }
    ]
  },
  'ancient power production center': {
    locations: [
      {
        label: 'dusty generator hall',
        tooltip: 'silence reigns, power sleeps',
        explanation: 'main area for power generation, now quiet and still'
      },
      {
        label: 'abandoned control panel',
        tooltip: 'buttons fade, screens dark',
        explanation: "the center's nerve system, no longer in operation"
      },
      {
        label: 'overgrown cooling pond',
        tooltip: 'water still, life returns',
        explanation: 'used to regulate temperature, now a natural habitat'
      },
      {
        label: 'collapsed cooling tower',
        tooltip: 'structure bows, decay asserts',
        explanation: "once vital for operation, its failure marks the center's end"
      },
      {
        label: 'rusty fuel depot',
        tooltip: 'metal corrodes, danger lurks',
        explanation: 'storage for energy sources, now a hazardous area'
      },
      {
        label: 'cable jungle',
        tooltip: 'wires entangle, current ceases',
        explanation: 'electrical connections, now a disordered maze'
      },
      {
        label: 'empty storage bunker',
        tooltip: 'emptiness echoes, purpose lost',
        explanation: 'once held essential supplies, now a void space'
      },
      {
        label: 'frozen turbine room',
        tooltip: 'blades still, silence thick',
        explanation: 'machinery for power, immobile and silent'
      },
      {
        label: 'cracked reactor core',
        tooltip: 'heart broken, danger past',
        explanation: 'the source of power, now breached and inert'
      },
      {
        label: 'abandoned worker barracks',
        tooltip: 'beds unmade, lives moved on',
        explanation: 'where staff once rested, now a deserted shell'
      },
      {
        label: 'derelict transport track',
        tooltip: 'rails end, journey stops',
        explanation: 'used for moving materials, now leading nowhere'
      },
      {
        label: 'sealed off section',
        tooltip: 'doors barred, secrets inside',
        explanation: 'areas closed off for safety or secrecy, now forgotten'
      }
    ]
  },
  'outsider xenoforming engine': {
    locations: [
      {
        label: 'alien control nexus',
        tooltip: 'dials alien, purpose obscure',
        explanation: 'the operational heart, its use and technology unknown'
      },
      {
        label: 'biomorphic growth chamber',
        tooltip: 'life forms twist, nature warps',
        explanation: 'where alien life was cultivated or altered, now abandoned'
      },
      {
        label: 'crystalline energy core',
        tooltip: 'shards glow faint, power wanes',
        explanation: 'source of energy, its workings mysterious and fading'
      },
      {
        label: 'warped space corridor',
        tooltip: 'dimensions bend, path confuses',
        explanation: 'travel within the engine, reality itself altered'
      },
      {
        label: 'abandoned incubation pod',
        tooltip: 'shells empty, life gone',
        explanation: 'used for growing or changing beings, now silent'
      },
      {
        label: 'fused machinery room',
        tooltip: 'metal merges, function lost',
        explanation: 'machines no longer operable, altered by unknown processes'
      },
      {
        label: 'silent transmission array',
        tooltip: 'signals dead, silence broadcasts',
        explanation: 'for communication or control, no longer sending or receiving'
      },
      {
        label: 'desolate observation bay',
        tooltip: 'windows clouded, view obscured',
        explanation: 'where experiments were monitored, now abandoned'
      },
      {
        label: 'corroded specimen vault',
        tooltip: 'containers breach, contents spill',
        explanation: 'storage for study samples, now compromised and dangerous'
      },
      {
        label: 'void-infused reactor',
        tooltip: 'darkness pulses, energy ebbs',
        explanation: 'an energy source, its principles alien and fading'
      },
      {
        label: 'echoing drone hangar',
        tooltip: 'machines silent, mission failed',
        explanation: 'launch area for exploratory or construction drones, now empty'
      },
      {
        label: 'phase-shifted chamber',
        tooltip: 'reality flickers, space uncertain',
        explanation: 'a room with unstable physical properties, purpose unknown'
      }
    ]
  },
  'semi-ruined teleportation node': {
    locations: [
      {
        label: 'flickering portal chamber',
        tooltip: 'light dances, doors unstable',
        explanation: 'where teleportation once occurred, now erratic and dangerous'
      },
      {
        label: 'abandoned calibration lab',
        tooltip: 'instruments still, precision lost',
        explanation: 'for tuning the teleportation process, no longer in use'
      },
      {
        label: 'burnt-out power conduit',
        tooltip: 'cables charred, energy gone',
        explanation: 'supplied power to the node, now destroyed'
      },
      {
        label: 'deserted reception area',
        tooltip: 'chairs empty, silence greets',
        explanation: 'where arrivals were processed, now void of life'
      },
      {
        label: 'fragmented destination pad',
        tooltip: 'platform cracked, travel risky',
        explanation: 'end point for teleportation, now in disrepair'
      },
      {
        label: 'distorted spatial array',
        tooltip: 'geometry warps, path unclear',
        explanation: 'part of the teleportation mechanism, now malfunctioning'
      },
      {
        label: 'sealed anomaly room',
        tooltip: 'door locked, danger within',
        explanation: 'contains a teleportation mishap or experiment, now contained'
      },
      {
        label: 'overloaded circuit hub',
        tooltip: 'sparks fly, function halts',
        explanation: 'central power distribution, now damaged beyond repair'
      },
      {
        label: 'erased coordinate library',
        tooltip: 'data lost, destinations unknown',
        explanation: 'stored teleportation targets, now wiped or corrupted'
      },
      {
        label: 'dismantled security checkpoint',
        tooltip: 'scanners off, entry free',
        explanation: 'monitored arrivals and departures, now unguarded'
      },
      {
        label: 'abandoned maintenance tunnel',
        tooltip: 'tools left, repairs undone',
        explanation: 'access for node upkeep, now neglected'
      },
      {
        label: 'offline control console',
        tooltip: 'buttons unresponsive, screens blank',
        explanation: 'operated the node, now inactive'
      }
    ]
  },
  'now-incomprehensible wreckage': {
    locations: [
      {
        label: 'twisted metal expanse',
        tooltip: 'shapes meld, purpose lost',
        explanation: 'a jumble of metal, its original form and function unrecognizable'
      },
      {
        label: 'shattered crystal field',
        tooltip: 'fragments shine, meaning fades',
        explanation: 'possibly once part of a structure or device, now just debris'
      },
      {
        label: 'corroded electronic graveyard',
        tooltip: 'circuitry exposed, tech deceased',
        explanation: 'remnants of advanced technology, now useless and deteriorating'
      },
      {
        label: 'fossilized data cores',
        tooltip: 'information entombed, access denied',
        explanation: 'once held knowledge or data, now inaccessible'
      },
      {
        label: 'collapsed dimensional rift',
        tooltip: 'reality tears, entry closed',
        explanation: 'a failed experiment or accident, now a dangerous anomaly'
      },
      {
        label: 'abandoned bio-engineering lab',
        tooltip: 'vats leak, life extinct',
        explanation: 'where life was manipulated or created, now a ruin'
      },
      {
        label: 'fragmented energy conduits',
        tooltip: 'power paths broken, flow stops',
        explanation: 'distributed energy, now severed and powerless'
      },
      {
        label: 'dismantled navigation hub',
        tooltip: 'directions lost, travel halted',
        explanation: 'coordinated movements or travel, now impossible to decipher'
      },
      {
        label: 'crystalized coolant leak',
        tooltip: 'liquid solidifies, hazard remains',
        explanation: 'a system failure, leaving dangerous remnants'
      },
      {
        label: 'opaque observation dome',
        tooltip: 'view obscured, secrets held',
        explanation: 'meant for surveillance or study, now blocked off'
      },
      {
        label: 'erased fabrication unit',
        tooltip: 'creation halted, machines silent',
        explanation: 'produced materials or devices, now inoperative'
      },
      {
        label: 'suspended gravity well',
        tooltip: 'forces fluctuate, stability myth',
        explanation: 'controlled gravitational forces, now unpredictable'
      }
    ]
  }
}

export const RUIN = {
  finalize: (ruin: Ruin) => {
    if (!ruin.finalized) {
      ruin.finalized = true
      const coastal = ruin.coastal
      const hazards = window.dice.choice([
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
      ])
      const hostiles = window.dice.weightedChoice([
        {
          w: 1,
          v: { label: 'alpha predator', tooltip: 'a powerful beast has made this site its lair' }
        },
        {
          w: 1,
          v: {
            label: 'autonomous defenses',
            tooltip: 'relic {automatons|golems} guard the site against intruders'
          }
        },
        {
          w: 1,
          v: {
            label: 'blighted raiders',
            tooltip: '{degenerate|cursed} blighted use this site as a base to ambush travelers'
          }
        },
        {
          w: 1,
          v: {
            label: 'beast swarm',
            tooltip: '{swarms|packs} of dangerous beasts are known {lurk|hunt} here'
          }
        },
        {
          w: 1,
          v: {
            label: 'corrupted spirit',
            tooltip:
              '{an enraged|a malign} wilderness {spirit|elemental|eidolon} protects this site'
          }
        },
        {
          w: 1,
          v: {
            label: 'dark cult',
            tooltip: 'a cult of some {unacceptable|long-dead} god conducts dark rites here'
          }
        },
        {
          w: coastal ? 0 : 1,
          v: {
            label: 'deepfolk tribe',
            tooltip:
              '{raiders|cultists} from the depths have come to the surface to plunder the surrounding area'
          }
        },
        {
          w: 1,
          v: {
            label: 'dueling explorers',
            tooltip: 'rival adventurers are also searching for loot at this site'
          }
        },
        {
          w: 1,
          v: {
            label: 'eldritch cyst',
            tooltip: 'a portal to a dead world has opened here, spewing forth otherworldly horrors'
          }
        },
        {
          w: 1,
          v: {
            label: 'exiled noble',
            tooltip: 'a deposed noble and their retinue plot their return to power'
          }
        },
        {
          w: 1,
          v: {
            label: 'fungal colony',
            tooltip: 'a fungal hive-mind and its spore-children have taken root here'
          }
        },
        {
          w: coastal ? 1 : 0,
          v: {
            label: '{pelagic|merfolk} tribe',
            tooltip:
              'a tribe of aquatic {raiders|cultists} have come ashore to plunder the surrounding area'
          }
        },
        {
          w: 1,
          v: {
            label: 'necromantic cult',
            tooltip: 'a necromancer and their undead servitors conduct dark experiments here'
          }
        },
        {
          w: 1,
          v: {
            label: 'outlaw encampment',
            tooltip:
              '{bandits|highwaymen|raiders|slavers} use this site as a base to ambush travelers'
          }
        },
        {
          w: 1,
          v: {
            label: 'rogue experiment',
            tooltip:
              'a {hulking|ravenous|petrifying} magic-forged {aberration|chimera|abomination} rampages through the site'
          }
        },
        {
          w: 1,
          v: {
            label: 'outsider remnants',
            tooltip: 'a group of alien aberrations have made this site their home'
          }
        },
        {
          w: 1,
          v: {
            label: 'sorcerous lair',
            tooltip: 'sorcerer of detestable inclinations conducts dark experiments here'
          }
        },
        {
          w: 1,
          v: {
            label: 'titanic beast',
            tooltip:
              'this site is the lair of some gargantuan creature that must be avoided at all costs'
          }
        },
        {
          w: 1,
          v: {
            label: 'undead remnants',
            tooltip: 'undead {husks|wraiths} of former inhabitants still haunt this site'
          }
        },
        {
          w: 1,
          v: {
            label: 'vampiric spawn',
            tooltip: 'this site is the lair for an ancient vampire lord and their undead minions '
          }
        },
        {
          w: 1,
          v: {
            label: 'vicious flora',
            tooltip: 'animate and lethal plant life ensnare and devour intruders'
          }
        }
      ])
      ruin.mood = window.dice.choice([
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
      ruin.treasure = window.dice.choice([
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
      ])
      ruin.locations = window.dice
        .sample(rooms[ruin.subtype].locations, 2)
        .map(room => TEXT.decorate({ ...room }))
        .join(', ')
      ruin.hazards = [hazards, hostiles]
        .map(hazard =>
          TEXT.decorate({
            label: window.dice.spin(hazard.label),
            tooltip: window.dice.spin(hazard.tooltip)
          })
        )
        .join(', ')
      ruin.enigmas = window.dice
        .sample(
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
        .map(i => TEXT.decorate({ ...i }))
        .join(', ')
    }
  },
  spawn: (cell: Cell) => {
    const base = PLACE.spawn(cell)
    const province = CELL.province(cell)
    const ruin: Ruin = {
      ...base,
      type: 'ruin',
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
      ])
    }
    province.places[base.idx] = ruin
    return ruin
  }
}
