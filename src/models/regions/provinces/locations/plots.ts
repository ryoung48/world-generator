export const plots: Record<
  string,
  {
    desc: string
    tooltip?: string
    challenges: { text: string; setting: string; skill: string }[]
    plots?: { text: string; setting: string; task: string }[]
  }[]
> = {
  forest: [
    {
      desc: 'abandoned village',
      tooltip: 'overtaken by creeping vines and moss',
      challenges: [
        {
          text: 'dodge the hostile alpha predator stalking its territory',
          setting: 'overgrown remnants of the central village square',
          skill: 'mobility'
        },
        {
          text: 'hide from the eyes of beast swarm within the dense flora',
          setting: 'creeping vines enveloping the derelict village inn',
          skill: 'stealth'
        },
        {
          text: 'search the obscured village records to learn of its forgotten history',
          setting: 'crumbling village hall swallowed by moss and vines',
          skill: 'investigation'
        },
        {
          text: 'recall the old village legend to placate an enraged spirit',
          setting: 'ancient, mossy shrine tucked away in the heart of the village',
          skill: 'knowledge'
        },
        {
          text: "spot the trapdoor leading to an outlaw's hidden cache",
          setting: "dilapidated and ivy-covered village chief's house",
          skill: 'perception'
        },
        {
          text: "discern the truth from the exiled noble's twisted tales",
          setting: 'hidden base within an old, vine-covered barn',
          skill: 'insight'
        },
        {
          text: 'navigate through the vicious flora-infested paths',
          setting: 'maze-like network of village pathways overrun by lethal plant life',
          skill: 'survival'
        },
        {
          text: 'negotiate with the rival adventurers to avoid unnecessary confrontation',
          setting: 'overgrown village entrance marked by ancient, moss-covered stones',
          skill: 'persuasion'
        },
        {
          text: 'climb the crumbling, ivy-covered watchtower to get a vantage point',
          setting: 'village watchtower, partially collapsed and entwined in vines',
          skill: 'athletics'
        },
        {
          text: 'survive an ambush from undead remnants lurking in shadows',
          setting: "deserted, moss-encrusted houses lining the village's main road",
          skill: 'combat'
        },
        {
          text: 'run across rickety old rooftops to escape from a ravenous aberration',
          setting: 'cluster of derelict cottages cloaked by dense vegetation',
          skill: 'mobility'
        },
        {
          text: 'stealthily pickpocket the key from a slaver in the outlaw encampment',
          setting: 'shadowy village stables repurposed into a makeshift prison',
          skill: 'stealth'
        },
        {
          text: 'plan the safe extraction of ancient relics amidst the danger',
          setting: 'relic-laden, vine-wrapped village church with a collapsed roof',
          skill: 'logistics'
        },
        {
          text: 'recall the forgotten history of the village to understand its downfall',
          setting: 'village ruins, lined with moss-covered remnants of former dwellings',
          skill: 'knowledge'
        },
        {
          text: 'hear the faint cry for help above the clamor of the hostile environment',
          setting: 'moss-drowned village marketplace overgrown with aggressive flora',
          skill: 'perception'
        },
        {
          text: 'convince the dark cult to spare the lives of the captured explorers',
          setting: 'darkened village chapel, transformed into a place of forbidden worship',
          skill: 'persuasion'
        },
        {
          text: 'navigate across an unstable ancient bridge overgrown with vegetation',
          setting: 'crumbling stone bridge, strangled by aggressive vines and moss',
          skill: 'mobility'
        },
        {
          text: 'coordinate a distraction to divert a pack of lurking beasts',
          setting: 'wild, vine-entangled outskirts with signs of beast activity',
          skill: 'logistics'
        },
        {
          text: 'survive an ambush from undead remnants in the village graveyard',
          setting: 'long-abandoned graveyard, mossy tombstones peeking from undergrowth',
          skill: 'combat'
        },
        {
          text: 'clear a blocked underground passage using sheer brute force',
          setting: 'overgrown underground passage, blocked by mossy boulders and debris',
          skill: 'athletics'
        },
        {
          text: "engage in combat with a corrupted spirit at the village's heart",
          setting: 'central village square, imbued with a sense of dread and anger',
          skill: 'combat'
        },
        {
          text: 'navigate through collapsing buildings choked by plant life',
          setting: "crumbling stone houses overtaken by nature's encroachment",
          skill: 'mobility'
        },
        {
          text: 'climb overgrowth-obscured stone walls without dislodging vines',
          setting: 'vine-covered ruins of the ancient village perimeter',
          skill: 'mobility'
        },
        {
          text: 'quietly navigate around a sleeping beast in mossy ruins',
          setting: "ruined stone dwelling serving as a beast's den",
          skill: 'stealth'
        },
        {
          text: 'unlock a chest buried beneath vines without attracting attention',
          setting: 'abandoned home filled with ivy-covered relics',
          skill: 'stealth'
        },
        {
          text: 'identify arcane symbols amidst the overgrown village ruins',
          setting: 'crumbling village shrine shrouded in moss and mystery',
          skill: 'knowledge'
        },
        {
          text: 'recall the forgotten history of the deserted village',
          setting: 'moss-draped statue of a long-dead village elder',
          skill: 'knowledge'
        },
        {
          text: 'notice signs of recent passage in the vine-choked ruins',
          setting: 'overgrown village paths littered with hidden footprints',
          skill: 'perception'
        },
        {
          text: 'detect signs of an impending landslide in the unstable terrain',
          setting: 'unstable cliffside overgrown with vines and hanging moss',
          skill: 'perception'
        },
        {
          text: 'ascertain the intent of a shadowy figure lurking in the undergrowth',
          setting: 'dim, vine-choked forest fringing the deserted village',
          skill: 'insight'
        },
        {
          text: 'treat injuries using herbs found in the overgrown ruins',
          setting: 'verdant undergrowth teeming with medicinal flora',
          skill: 'survival'
        },
        {
          text: 'negotiate with spirits believed to haunt the deserted village',
          setting: 'hauntingly beautiful ruins bathed in eerie moonlight',
          skill: 'persuasion'
        },
        {
          text: 'move a heavy vine-covered stone to uncover a hidden cellar',
          setting: 'overgrown, forsaken home hiding a subterranean secret',
          skill: 'athletics'
        }
      ]
    },
    {
      desc: 'ruined fortress',
      tooltip: 'overgrown with ivy and shrouded by towering trees',
      challenges: [
        {
          text: 'navigate through a labyrinth of fallen stone blocks to reach the central tower',
          setting: 'maze-like path within the fortress, surrounded by rubble and vines',
          skill: 'mobility'
        },
        {
          text: "climb ivy-covered wall to get a bird's eye view of the surroundings",
          setting: 'tall, crumbling outer wall, overgrown with thick ivy',
          skill: 'athletics'
        },
        {
          text: 'sneak past the slumbering creatures that have made the fortress their lair',
          setting: 'dimly lit fortress, filled with the sound of creatures stirring in the shadows',
          skill: 'stealth'
        },
        {
          text: 'use knowledge of ancient scripts to decipher a cryptic map found in the ruins',
          setting: 'quiet chamber in the fortress, walls filled with ancient inscriptions',
          skill: 'knowledge'
        },
        {
          text: 'locate the secret entrance to the treasure vault using the fortress blueprints',
          setting: 'grand chamber, littered with broken furniture and dusty relics',
          skill: 'investigation'
        },
        {
          text: 'devise a plan to explore the fortress efficiently without alerting its guardian',
          setting: 'makeshift campsite outside the fortress, set up as a base of operations',
          skill: 'logistics'
        },
        {
          text: 'negotiate with a sentient vine creature for safe passage through the fortress',
          setting: 'lush garden overtaking the fortress, home to various magical flora',
          skill: 'persuasion'
        },
        {
          text: 'identify the safest path through the fortress by observing signs of previous explorers',
          setting: 'entrance of the fortress, marked with signs of time and trespassers',
          skill: 'perception'
        },
        {
          text: 'discern the true intention of a spectral being haunting the fortress',
          setting: 'eerie, spectral-lit chamber, filled with a sense of dread and mystery',
          skill: 'insight'
        },
        {
          text: 'utilize local flora to treat injuries sustained during exploration of the fortress',
          setting: 'medicinal herb garden, nestled amidst the ruins of the fortress',
          skill: 'survival'
        },
        {
          text: 'confront hostile raiders who have claimed the ruins as their hideout',
          setting: "once-grand reception hall, now repurposed as a thieves' den",
          skill: 'combat'
        },
        {
          text: "recall the legend of the fortress's creation to understand its architecture",
          setting: 'grand, high-ceiling hall adorned with historical bas-reliefs',
          skill: 'knowledge'
        },
        {
          text: 'overcome a steep, slippery slope using a sturdy old vine',
          setting: "overgrown path leading up to the fortress's highest tower",
          skill: 'mobility'
        },
        {
          text: 'identify a false wall hiding a secret passage',
          setting: 'room filled with ancient, beautifully crafted statues and ornaments',
          skill: 'perception'
        },
        {
          text: 'coordinate the removal of a heavy stone door blocking the path',
          setting: 'old storage room filled with broken pottery and other miscellaneous items',
          skill: 'logistics'
        },
        {
          text: 'locate a source of clean water within the fortress for the group',
          setting: 'dry, dusty courtyard, remnants of a once vibrant fountain at its center',
          skill: 'survival'
        },
        {
          text: 'persuade a wandering spirit to reveal the location of a hidden cache',
          setting: 'crypt below the fortress, filled with the remains of long-dead warriors',
          skill: 'persuasion'
        },
        {
          text: 'find a missing adventurer who got lost within the labyrinthine fortress',
          setting:
            'dizzying array of twisting passages and corridors, filled with echoes and whispers',
          skill: 'investigation'
        },
        {
          text: 'determine the motive of a group of thieves hiding within the fortress',
          setting: 'hastily set up camp, nestled within a concealed corner of the fortress',
          skill: 'insight'
        },
        {
          text: 'survive an ambush from a pack of feral beasts roaming the fortress grounds',
          setting: 'overgrown courtyard, where nature has reclaimed the cobblestones',
          skill: 'combat'
        },
        {
          text: 'recall the customs of ancient ceremonies to open a magically sealed door',
          setting: 'ornate door adorned with religious symbols, untouched by time',
          skill: 'knowledge'
        },
        {
          text: 'create a distraction to allow for the rest of the group to pass unnoticed',
          setting: 'courtyard patrolled by animated suits of armor, standing sentinel',
          skill: 'logistics'
        }
      ]
    },
    {
      desc: 'old chapel ruins',
      tooltip: 'bathed in soft light and scattered with forest flowers',
      challenges: [
        {
          text: 'navigate through dense, thorny undergrowth encroaching on the chapel grounds',
          setting: 'overgrown chapel grounds filled with invasive bramble',
          skill: 'mobility'
        },
        {
          text: 'move quietly to avoid disturbing the alpha predator in the chapel',
          setting: 'crumbling chapel interior, now a lair to a ferocious beast',
          skill: 'stealth'
        },
        {
          text: 'unravel the ancient text inscribed on a chapel wall under layers of moss',
          setting: 'inside the weather-beaten chapel, rich in faded inscriptions',
          skill: 'investigation'
        },
        {
          text: 'recall the ancient rites once practiced in the chapel',
          setting: 'crumbling stone altar, covered with forest flowers and remnants of past rites',
          skill: 'knowledge'
        },
        {
          text: 'identify the source of a distant, mournful sound within the chapel grounds',
          setting: 'spacious chapel grounds, filled with whispers of the past',
          skill: 'perception'
        },
        {
          text: 'detect the true intentions of a stranger claiming to be a lost pilgrim',
          setting: 'ruined chapel doorway, where wanderers seek shelter or solace',
          skill: 'insight'
        },
        {
          text: 'find shelter and food in the wild, keeping clear of outlaw encampment',
          setting: 'dense forest around the chapel, covertly occupied by outlaws',
          skill: 'survival'
        },
        {
          text: 'persuade a group of dueling explorers to leave the sacred site in peace',
          setting: "foot of the chapel ruins, disturbed by explorers' rivalries",
          skill: 'persuasion'
        },
        {
          text: 'climb a tall chapel spire to get a better view of the surrounding area',
          setting: 'crumbling stone spire, reaching towards the sky amidst the ruins',
          skill: 'athletics'
        },
        {
          text: 'defend against an ambush from undead remnants in the chapel graveyard',
          setting: 'tranquil graveyard, shadowed by the chapel and shrouded in mystery',
          skill: 'combat'
        },
        {
          text: "evade the sentient ruin's animated defenses in the chapel basement",
          setting: 'forgotten chapel basement, walls pulsating with malevolent energy',
          skill: 'mobility'
        },
        {
          text: 'stealthily gather information about the dark cult conducting rites in the chapel',
          setting: 'moonlit chapel interior, cloaked in an aura of foreboding rituals',
          skill: 'stealth'
        },
        {
          text: 'organize a tactical plan to rescue captives from the deepfolk raiders',
          setting: "remote chapel outbuilding, converted into a raiders' prison",
          skill: 'logistics'
        },
        {
          text: "remember the chapel's historical significance in relation to an ancient prophecy",
          setting: 'chapel library, filled with dust-laden scriptures and histories',
          skill: 'knowledge'
        },
        {
          text: 'notice the signs of corrupted spirits influencing the wildlife around the chapel',
          setting: 'mysterious forest surrounding the chapel, unnaturally quiet and eerie',
          skill: 'perception'
        },
        {
          text: 'discern if the exiled noble found in the chapel is genuine or plotting revenge',
          setting: 'once-majestic chapel tower, now a shelter for a dethroned noble',
          skill: 'insight'
        },
        {
          text: 'identify and use the local flora to treat injuries from a rogue experiment',
          setting: 'lush meadow near the chapel, sprinkled with a variety of wildflowers',
          skill: 'survival'
        },
        {
          text: "uncover the hidden compartment in the chapel's cracked altar",
          setting: 'ruined altar adorned with ancient symbols and motifs',
          skill: 'investigation'
        },
        {
          text: 'arrange a ritual to ward off evil spirits within the chapel ruins',
          setting: 'tumbledown chapel nave filled with spectral energy',
          skill: 'logistics'
        },
        {
          text: "identify the ancient religious symbols on the chapel's stained glass",
          setting: 'broken stained glass window depicting a forgotten tale',
          skill: 'knowledge'
        },
        {
          text: 'spot the hidden carvings in the chapel stone depicting a prophecy',
          setting: 'weathered stone wall illuminated by the setting sun',
          skill: 'perception'
        },
        {
          text: 'discern the true motive of the rogue hiding among the ruins',
          setting: 'shadows of the chapel ruins cast by flickering torchlight',
          skill: 'insight'
        },
        {
          text: 'dodge falling debris while exploring the deteriorating bell tower',
          setting: 'rickety bell tower echoing with the songs of yesteryears',
          skill: 'mobility'
        },
        {
          text: 'decipher the cryptic markings on an old gravestone',
          setting: 'quiet graveyard tucked away behind the chapel ruins',
          skill: 'investigation'
        },
        {
          text: 'coordinate a search for a hidden treasure in the chapel grounds',
          setting: "overgrown grounds concealing the chapel's lost riches",
          skill: 'logistics'
        },
        {
          text: 'find a safe shelter under a storm using materials around the chapel',
          setting: 'vast expanse of the chapel grounds under a looming storm',
          skill: 'survival'
        },
        {
          text: 'perform a controlled slide down a steep, rubble-strewn incline',
          setting: 'steep slope behind the chapel covered in loose stones',
          skill: 'mobility'
        },
        {
          text: 'sneak into the guarded crypt without alerting the spectral guards',
          setting: 'crypt entrance guarded by ethereal beings of yore',
          skill: 'stealth'
        }
      ]
    },
    {
      desc: 'primordial grove',
      tooltip: 'where whispers of ancient spirits linger in the rustling leaves',
      challenges: [
        {
          text: 'maneuver through the thick, animated undergrowth in the grove',
          setting: 'dense grove floor, where ancient roots entwine like living traps',
          skill: 'mobility'
        },
        {
          text: 'evade the spectral guardians of the sacred spirit tree unnoticed',
          setting: 'tall, majestic tree, shrouded in a soft, ethereal glow',
          skill: 'stealth'
        },
        {
          text: "uncover the hidden entrance to the sacred grove's hidden shrine",
          setting: 'secluded part of the grove, marked by ancient symbols',
          skill: 'investigation'
        },
        {
          text: 'plan the safe extraction of a rare herb near a sentient ruin',
          setting: 'mossy ruin, where ancient stones seem to breathe and whisper',
          skill: 'logistics'
        },
        {
          text: "recite the ancient rites to communicate with the grove's spirits",
          setting: 'center of the grove, where whispers in the wind carry stories',
          skill: 'knowledge'
        },
        {
          text: 'detect the faint trail left by a passing alpha predator',
          setting: 'narrow, winding paths within the whispering grove',
          skill: 'perception'
        },
        {
          text: 'survive a night in the grove, amidst its spectral whispers and dangers',
          setting: 'whispering grove, under a starlit sky and rustling, ancient canopy',
          skill: 'survival'
        },
        {
          text: "persuade the grove's spirits to reveal the location of a lost artifact",
          setting: 'heart of the grove, where the air resonates with ancient whispers',
          skill: 'persuasion'
        },
        {
          text: 'climb the ancient, massive spirit tree to retrieve a mystical fruit',
          setting: 'tall, gnarled spirit tree, where the wind sings ancient songs',
          skill: 'athletics'
        },
        {
          text: 'engage in combat with a corrupted spirit haunting the grove',
          setting: 'shadowy corner of the grove, marked by a chilling, otherworldly presence',
          skill: 'combat'
        },
        {
          text: 'dodge the violent vines of a vicious flora in the grove',
          setting: 'tangle of aggressive flora, lurking beneath the rustling canopy',
          skill: 'mobility'
        },
        {
          text: 'steal a sacred amulet from a dark cult conducting rites in the grove',
          setting: 'secret grove clearing, illuminated by a bizarre, ghostly glow',
          skill: 'stealth'
        },
        {
          text: 'identify the arcane resonance in the whispers of the grove',
          setting: 'shimmering grove, filled with ancient whispers and arcane energies',
          skill: 'knowledge'
        },
        {
          text: 'spot the elusive spectral owl said to guide the worthy',
          setting: 'silent grove under the moonlight, where spirits play tricks',
          skill: 'perception'
        },
        {
          text: "uncover the deceit behind the grove's comforting whispers",
          setting: 'deepest part of the grove, where the whispers grow loud',
          skill: 'insight'
        },
        {
          text: 'find edible plants in the grove without angering the spirits',
          setting: 'lush undergrowth of the grove, filled with hidden resources',
          skill: 'survival'
        },
        {
          text: 'formulate a plan to quietly retrieve a precious artifact from a guarded tree',
          setting: 'ancient tree shimmering with protective spirit energy',
          skill: 'logistics'
        },
        {
          text: 'perceive an invisible spirit through the rustling of leaves',
          setting: 'quiet grove disturbed only by the occasional leaf rustle',
          skill: 'perception'
        },
        {
          text: "survive by consuming the magical fruits of the grove's trees",
          setting: 'luminous grove dotted with fruit-bearing ancient trees',
          skill: 'survival'
        },
        {
          text: 'find a spirit hidden among the trees by following a riddle',
          setting: 'expansive grove full of whispering spirits and riddle clues',
          skill: 'investigation'
        },
        {
          text: 'draw upon knowledge of ancient rituals to appease angry spirits',
          setting: 'disturbed grove with agitated spirits swirling in chaos',
          skill: 'knowledge'
        },
        {
          text: "sense a spirit's despair and discover its sorrowful tale",
          setting: 'secluded grove corner haunted by a melancholic spirit',
          skill: 'insight'
        }
      ]
    },
    {
      desc: 'narrow ravine',
      tooltip: 'filled with thorns and brambles',
      challenges: [
        {
          text: 'navigate through thorny pathways while dodging the predatory swoops of alpha predators',
          setting: 'winding corridors of brambles under the constant shadow of stalking beasts',
          skill: 'mobility'
        },
        {
          text: 'slip unseen and unheard through the underbrush, avoiding the patrols of outlaw encampment',
          setting: 'dense growths of thorns and brambles providing cover from watchful eyes',
          skill: 'stealth'
        },
        {
          text: 'decipher the ancient symbols hidden among the brambles to find a secret passage',
          setting: 'shadowy recesses of the ravine, teeming with signs of lost civilizations',
          skill: 'investigation'
        },
        {
          text: 'recall the mythology of the region to understand why a dark cult has chosen this ravine',
          setting: 'mystic stone altars hidden deep within the thorny wilderness',
          skill: 'knowledge'
        },
        {
          text: 'detect subtle tracks and signs to avoid the deadly snares of a rogue experiment',
          setting: "pathways twisted by unnatural magic, resonating with the aberration's presence",
          skill: 'perception'
        },
        {
          text: 'identify medicinal plants among the dangerous flora to treat injuries',
          setting: 'craggy outcrops and cavernous niches teeming with peculiar plant life',
          skill: 'survival'
        },
        {
          text: 'convince a party of dueling explorers to work together against common threats',
          setting:
            'intersecting ravine pathways, echoing with the sounds of competitive treasure seekers',
          skill: 'persuasion'
        },
        {
          text: 'climb a steep ravine side to evade a swarm of venomous insects',
          setting: 'sheer cliff faces, encrusted with treacherous footing and creeping critters',
          skill: 'athletics'
        },
        {
          text: 'survive an ambush from corrupted spirits protecting their sacred ground',
          setting: 'ancient burial grounds tucked away among the dense thorns and brambles',
          skill: 'combat'
        },
        {
          text: 'clamber up a vine-choked wall without dislodging stones',
          setting: 'rocky cliff face veiled in clinging, thorny vegetation',
          skill: 'mobility'
        },
        {
          text: 'organize the escort of a merchant caravan through the treacherous ravine',
          setting: 'narrow entrance to the thorn-filled ravine',
          skill: 'logistics'
        },
        {
          text: 'plan a defensive position to protect from an incoming nocturnal ambush',
          setting: 'steep, bramble-wrapped incline offering a strategic overview',
          skill: 'logistics'
        },
        {
          text: 'remember the ancient druidic law forbidding harm to the sacred thorns',
          setting: 'sacred grove shrouded in dense, prickly undergrowth',
          skill: 'knowledge'
        },
        {
          text: 'use medicinal herbs to treat a wound inflicted by the brambles',
          setting: 'overgrown patch filled with a variety of healing flora',
          skill: 'survival'
        },
        {
          text: 'negotiate safe passage with the sentient bramble king in exchange for a service',
          setting: 'twisted throne room of the bramble king at the heart of the ravine',
          skill: 'persuasion'
        },
        {
          text: 'swim against a strong current in a hidden underground river',
          setting: 'subterranean waterway hidden beneath the bramble-strewn ground',
          skill: 'athletics'
        },
        {
          text: 'identify the religious symbolism in the carvings of an ancient shrine',
          setting: 'hidden shrine overgrown with brambles and adorned with cryptic symbols',
          skill: 'knowledge'
        },
        {
          text: 'identify and follow the faint tracks of a lost party through the ravine',
          setting: 'overgrown trail littered with barely visible signs of passage',
          skill: 'survival'
        },
        {
          text: 'lift a fallen tree to clear a blocked pathway through the ravine',
          setting: 'jagged pathway obstructed by a large, toppled tree',
          skill: 'athletics'
        },
        {
          text: 'leap across a dangerous gap in the pathway, avoiding the thorns below',
          setting: 'precarious ledge overlooking a drop into a thorny pit',
          skill: 'mobility'
        }
      ]
    },
    {
      desc: 'ruined watchtower',
      tooltip: 'overgrown with moss',
      challenges: [
        {
          text: 'scale the crumbling, moss-covered watchtower while dodging falling debris',
          setting:
            "old watchtower, overgrown with nature's reclaiming force, towering over the dark forest",
          skill: 'mobility'
        },
        {
          text: 'move silently through the undergrowth to avoid detection by beast swarm',
          setting: 'dense, shadowy forest floor, teeming with lurking, predatory creatures',
          skill: 'stealth'
        },
        {
          text: 'uncover the ancient purpose of the watchtower by investigating hidden symbols',
          setting: 'forgotten rooms within the mossy watchtower, resonating with past events',
          skill: 'investigation'
        },
        {
          text: 'plan and organize a distraction for a patrol of deepfolk raiders',
          setting: 'narrow paths winding through the towering forest, filled with lurking dangers',
          skill: 'logistics'
        },
        {
          text: 'spot traces of a rogue experiment amidst the natural forest growth',
          setting: 'twisted groves, eerily silent, with signs of unnatural mutation',
          skill: 'perception'
        },
        {
          text: 'discern the hidden motives of a deceptive exiled noble in the forest',
          setting: "lush forest clearing, with a noble's encampment, shrouded in veils of intrigue",
          skill: 'insight'
        },
        {
          text: 'identify edible plants and fresh water sources to survive in the dark forest',
          setting:
            "expansive forest landscape, filled with both nurturing and deceptive nature's gifts",
          skill: 'survival'
        },
        {
          text: 'convince an outlaw encampment to share valuable information about the watchtower',
          setting: 'secluded campfires in the forest, flickering with plots and rogue tales',
          skill: 'persuasion'
        },
        {
          text: "leap across a gap in the watchtower's staircase to reach the top",
          setting: 'rickety, moss-encrusted staircase spiraling within the overgrown watchtower',
          skill: 'athletics'
        },
        {
          text: 'fend off an attack from corrupted spirits haunting the old watchtower',
          setting:
            'dusty, spectral-lit upper levels of the watchtower, humming with spectral energy',
          skill: 'combat'
        },
        {
          text: "leap from rotting steps to reach the tower's entryway without falling",
          setting: 'crumbling staircase leading to moss-covered watchtower',
          skill: 'mobility'
        },
        {
          text: 'navigate through dense forest undergrowth without making noise',
          setting: 'shadow-drenched forest floor covered with prickly bushes',
          skill: 'stealth'
        },
        {
          text: 'identify the ancient symbol representing the kingdom once overseeing the tower',
          setting: "broken shield embedded in the watchtower's cold stone floor",
          skill: 'knowledge'
        },
        {
          text: 'convince a nervous group member to climb the deteriorating tower',
          setting: 'base of the tower, where rotten wood and mossy stones pose dangers',
          skill: 'persuasion'
        },
        {
          text: 'climb the slippery, moss-covered stones of the tower',
          setting: 'outer wall of the ancient watchtower overtaken by nature',
          skill: 'athletics'
        },
        {
          text: 'find a hidden compartment within the old wooden table',
          setting: 'dusty watchtower room filled with decaying furniture',
          skill: 'investigation'
        },
        {
          text: "track a missing companion's path through the dense undergrowth",
          setting: 'forest floor littered with fallen leaves and thick roots',
          skill: 'survival'
        },
        {
          text: "avoid tripwires set up in the tower's entryway",
          setting: 'entrance of the watchtower strewn with hidden traps',
          skill: 'mobility'
        },
        {
          text: 'unravel the mystery of the missing watchtower guards',
          setting: 'abandoned bunks within the watchtower, untouched for years',
          skill: 'investigation'
        },
        {
          text: 'decipher a coded message left by a previous tower occupant',
          setting: 'dusty old parchment found within a sealed drawer in the tower',
          skill: 'insight'
        },
        {
          text: "construct a makeshift shelter using the forest's natural resources",
          setting: 'dense forest brimming with sturdy trees and large leaves',
          skill: 'survival'
        }
      ]
    },
    {
      desc: "old witch's cottage",
      tooltip: 'hidden among gnarled trees and thorn-riddled brambles',
      challenges: [
        {
          text: "navigate through thick, thorny brambles to reach the witch's cottage",
          setting: 'gnarled trees and thorn-riddled undergrowth surrounding the cottage',
          skill: 'mobility'
        },
        {
          text: "sneak into the witch's cottage without waking her autonomous golem guards",
          setting: 'cobbled paths leading to the foreboding, isolated cottage',
          skill: 'stealth'
        },
        {
          text: "search the witch's cottage for clues about her next dark ritual",
          setting: 'dimly lit, cluttered rooms filled with magical paraphernalia',
          skill: 'investigation'
        },
        {
          text: 'organize a plan to rescue villagers held by the witch in her cottage',
          setting: 'hidden chambers beneath the cottage, resonating with plaintive echoes',
          skill: 'logistics'
        },
        {
          text: "recall old folklore to understand the witch's sorcerous practices",
          setting: 'herb-strewn kitchen, bearing marks of ancient, arcane rites',
          skill: 'knowledge'
        },
        {
          text: "detect a disguised trapdoor leading to the witch's secret basement",
          setting: 'rustic wooden floors of the cottage, groaning with secrets',
          skill: 'perception'
        },
        {
          text: "identify the witch's deceptive attempt to mislead you about her intentions",
          setting:
            'crackling fireplace-lit room, filled with deceptive charm and sinister undertones',
          skill: 'insight'
        },
        {
          text: 'find edible plants in the thorny forest around the cottage for sustenance',
          setting: 'shadowy forest glades, home to both nourishing herbs and poisonous look-alikes',
          skill: 'survival'
        },
        {
          text: 'convince the witch to share a crucial ingredient needed for a healing potion',
          setting: 'enchanted greenhouse with strange, rare plants nurtured by the witch',
          skill: 'persuasion'
        },
        {
          text: 'climb a gnarled tree to escape a rampaging rogue experiment',
          setting:
            "dense thicket surrounding the witch's cottage, filled with twisted, ancient trees",
          skill: 'athletics'
        },
        {
          text: 'defend against an undead remnant unleashed by the witch in her cottage',
          setting: 'echoing hallways of the cottage, shrouded in spectral frost and eerie silence',
          skill: 'combat'
        },
        {
          text: 'sneak past an ancient sleeping treant without stirring it from slumber',
          setting: 'dim clearing with a colossal treant slumbering beside a moss-covered boulder',
          skill: 'stealth'
        },
        {
          text: 'decode cryptic messages etched onto gnarled tree trunks to locate hidden path',
          setting: 'tangled forest with cryptic signs etched onto the bark of ancient trees',
          skill: 'investigation'
        },
        {
          text: "coordinate a stealthy approach to the witch's cottage avoiding magic wards",
          setting: 'dense woods surrounding the hidden cottage with glowing arcane symbols',
          skill: 'logistics'
        },
        {
          text: 'identify the rare herbs used in witchcraft growing among the thorns',
          setting: 'bramble-thick woodland dotted with clusters of unusual flora',
          skill: 'knowledge'
        },
        {
          text: 'detect a faint magical hum emanating from an enchanted raven',
          setting: 'small woodland clearing housing an ancient raven perched on a branch',
          skill: 'perception'
        },
        {
          text: 'discern the true intent of the spectral apparition guarding the cottage',
          setting:
            "twilight grove with a spectral entity silently hovering near the witch's cottage",
          skill: 'insight'
        }
      ]
    },
    {
      desc: 'stone bridge river crossing',
      challenges: [
        {
          text: 'hide from a pack of beast swarm lurking near the bridge',
          setting: 'dense forest surrounding the clear rushing stream and stone bridge',
          skill: 'stealth'
        },
        {
          text: 'uncover a secret inscription on the stone bridge',
          setting: 'ancient stone bridge, weathered by time and overgrown with moss',
          skill: 'investigation'
        },
        {
          text: 'recall history of the long-lost civilization that built the bridge',
          setting: 'ornately carved but deteriorating balustrades of the stone bridge',
          skill: 'knowledge'
        },
        {
          text: 'spot the path of the alpha predator that has marked this site as its lair',
          setting: 'thick forest floor, littered with tracks leading to and from the bridge',
          skill: 'perception'
        },
        {
          text: 'determine the true intent of a deceptive exiled noble seeking help',
          setting: 'once splendid but now weathered campsite near the rushing stream',
          skill: 'insight'
        },
        {
          text: 'find food and shelter while avoiding the dangerous flora',
          setting:
            'forest clearing nearby the bridge, flourishing with deceivingly vibrant vegetation',
          skill: 'survival'
        },
        {
          text: 'jump across the broken part of the bridge to avoid the rushing water',
          setting: 'center of the stone bridge, where a section has crumbled away',
          skill: 'athletics'
        },
        {
          text: 'defend against a sudden ambush from deepfolk raiders at the bridge',
          setting: 'stone bridge illuminated by moonlight, casting long, ominous shadows',
          skill: 'combat'
        },
        {
          text: 'discover the purpose of ancient carvings etched into the stone bridge',
          setting: 'old stone bridge with worn symbols etched into its surface',
          skill: 'investigation'
        },
        {
          text: 'recall historical events related to the bridge from local folklore',
          setting: 'forgotten stone bridge bearing marks of battles long past',
          skill: 'knowledge'
        },
        {
          text: 'spot the barely visible magical warding runes on the bridge',
          setting: 'old stone bridge with faded arcane inscriptions',
          skill: 'perception'
        },
        {
          text: 'discern the intentions of a mysterious stranger claiming the bridge as their territory',
          setting: 'old stone bridge now occupied by a cloaked figure',
          skill: 'insight'
        },
        {
          text: 'identify medicinal herbs growing near the stream to treat an injured companion',
          setting: 'lush green banks of the clear rushing stream',
          skill: 'survival'
        },
        {
          text: 'convince a territorial water spirit to allow safe passage across the stream',
          setting: 'rushingly clear stream, home to a territorial water spirit',
          skill: 'persuasion'
        },
        {
          text: 'climb the large, mossy stones to reach the top of the collapsed bridge',
          setting: 'partially collapsed old stone bridge with overgrown moss',
          skill: 'athletics'
        },
        {
          text: 'cross the bridge by balancing on a narrow beam without falling into the stream',
          setting: 'narrow wooden beam left from the collapsed section of the bridge',
          skill: 'mobility'
        },
        {
          text: 'sneak past a sleeping troll under the bridge without waking it up',
          setting: 'under the stone bridge, home to a large snoring troll',
          skill: 'stealth'
        },
        {
          text: 'figure out the location of a hidden treasure using the etched symbols on the bridge',
          setting: 'old stone bridge with mysterious symbols pointing to hidden treasure',
          skill: 'investigation'
        },
        {
          text: 'plan and execute a rescue operation for a friend trapped in the rushing stream',
          setting: 'rushing stream below the stone bridge with a trapped companion',
          skill: 'logistics'
        },
        {
          text: "swim against the stream's strong current to retrieve a dropped item",
          setting: 'clear rushing stream under the stone bridge',
          skill: 'athletics'
        },
        {
          text: 'hide from a group of bandits using the bridge as a vantage point',
          setting: 'old stone bridge now a lookout for roaming bandits',
          skill: 'stealth'
        },
        {
          text: 'persuade a local hermit to share his knowledge about the bridge',
          setting: 'secluded hut near the forgotten stone bridge',
          skill: 'persuasion'
        },
        {
          text: 'move a large fallen tree obstructing the path to the bridge',
          setting: 'overgrown path leading to the stone bridge blocked by a fallen tree',
          skill: 'athletics'
        }
      ]
    },
    {
      desc: 'eerie graveyard',
      tooltip: 'marked by moss-covered stones and ancient oaks',
      challenges: [
        {
          text: 'navigate a path through the dense undergrowth and looming tombstones',
          setting: 'tangled thicket intertwined with moss-covered gravestones',
          skill: 'mobility'
        },
        {
          text: 'slip past undead remnants silently patrolling the graveyard',
          setting:
            'eerie glow of moonlight casting long shadows across ancient oaks and gravestones',
          skill: 'stealth'
        },
        {
          text: 'solve the riddle inscribed on a particular ancient tombstone',
          setting: 'centuries-old tombstone engraved with cryptic, runic symbols',
          skill: 'investigation'
        },
        {
          text: 'coordinate a plan to evade a corrupted spirit haunting the graveyard',
          setting: 'foreboding presence pulsating around a particular ancient oak',
          skill: 'logistics'
        },
        {
          text: 'recall the ancient burial rites and rituals related to the graveyard',
          setting: 'cluster of peculiarly arranged tombstones and crypts',
          skill: 'knowledge'
        },
        {
          text: 'identify a secret path marked by a barely perceptible scent',
          setting:
            'overgrown path winding through mossy tombstones and gnarled roots of ancient oaks',
          skill: 'perception'
        },
        {
          text: 'discern the true intentions of a supposedly friendly spectral figure',
          setting: 'ethereal mist rolling in around the ancient oak trees',
          skill: 'insight'
        },
        {
          text: 'survive in the graveyard for a night without provoking the spirits',
          setting: 'isolated clearing among the tombstones and oaks, filled with an eerie quiet',
          skill: 'survival'
        },
        {
          text: 'convince a group of dueling explorers to leave the sacred site',
          setting: 'forgotten crypt under an ancient oak, filled with potential treasures',
          skill: 'persuasion'
        },
        {
          text: 'climb an ancient oak to avoid an alpha predator prowling in the graveyard',
          setting: 'majestic, towering oak tree overshadowing the moss-covered gravestones',
          skill: 'athletics'
        },
        {
          text: 'defend against a sudden attack from necromantic cult members',
          setting:
            'old mausoleum, where the air hangs heavy with the smell of decay and dark magic',
          skill: 'combat'
        },
        {
          text: 'cross narrow, precarious stone paths amid gnarled roots without falling',
          setting: 'patchwork of mossy, crumbling gravestones under ancient oaks',
          skill: 'mobility'
        },
        {
          text: "dodge swinging pendulums of a crypt's ancient trap",
          setting: 'crumbling crypt with disturbingly lively motifs',
          skill: 'mobility'
        },
        {
          text: 'swim through a murky underground stream to avoid a phantom patrol',
          setting: 'dark, cold catacombs filled with spectral whispers',
          skill: 'athletics'
        },
        {
          text: 'find the secret entrance to the mausoleum',
          setting: 'opulent mausoleum, covered in ivy and forgotten by time',
          skill: 'investigation'
        },
        {
          text: 'solve the riddle of the spectral guardians to gain passage',
          setting: 'haunted chapel, lit only by the glow of ethereal spirits',
          skill: 'investigation'
        },
        {
          text: 'organize an efficient search for a lost heirloom among the gravestones',
          setting: 'desolate graveyard, silent but for the hooting of an owl',
          skill: 'logistics'
        },
        {
          text: 'plan an escape route that avoids waking the undead',
          setting: 'mausoleum lined with stone sarcophagi shrouded in cobwebs',
          skill: 'logistics'
        },
        {
          text: 'recall the ancient rites to put a restless ghost to rest',
          setting: 'phantasm-infested crypt with faded inscriptions on the walls',
          skill: 'knowledge'
        },
        {
          text: "identify the burial customs of the graveyard's inhabitants",
          setting: 'ancient graveyard adorned with odd, ornate headstones',
          skill: 'knowledge'
        },
        {
          text: 'notice a secret compartment in a centuries-old tomb',
          setting: 'ancient burial site with intricate carvings worn by time',
          skill: 'perception'
        },
        {
          text: 'track a grave robber through a muddy, disordered gravesite',
          setting: 'foggy graveyard, disturbed earth revealing freshly disturbed graves',
          skill: 'survival'
        },
        {
          text: 'use knowledge of herbs to cure a diseased ghoul bite',
          setting: 'forest clearing with clusters of strange plants glowing under moonlight',
          skill: 'survival'
        },
        {
          text: 'convince a spirit to reveal the location of a hidden treasure',
          setting: 'haunted chapel filled with echoes of ghostly laments',
          skill: 'persuasion'
        },
        {
          text: 'move silently through brittle leaves to avoid awakening the undead',
          setting: 'skeletal trees standing guard over centuries-old graves',
          skill: 'stealth'
        },
        {
          text: "find hidden symbols leading to an ancient necromancer's burial site",
          setting: 'hushed forest area covered in cryptic runic carvings',
          skill: 'investigation'
        },
        {
          text: 'coordinate a surprise attack on a nest of ghouls',
          setting: 'decayed mausoleum teeming with ghouls and unearthly howls',
          skill: 'logistics'
        },
        {
          text: 'detect the faint smell of a dangerous creature lurking nearby',
          setting: 'dense, leaf-strewn forest floor beneath towering ancient oaks',
          skill: 'perception'
        },
        {
          text: 'break through a barricaded crypt entrance with sheer strength',
          setting: 'sealed crypt, ominous inscriptions warding off would-be intruders',
          skill: 'athletics'
        }
      ]
    },
    {
      desc: 'ancient stone ruins',
      tooltip: 'overrun by wild forest growth and colorful fungi',
      challenges: [
        {
          text: 'navigate through the vine-covered ruins without disturbing the deadly fauna',
          setting: 'twisted ruins overgrown with forest vegetation and punctuated by deadly flora',
          skill: 'mobility'
        },
        {
          text: 'sneak past the vigilant autonomous defenses in the ruins',
          setting: 'stone chambers of the ruins, lit by a faint ethereal glow from ancient golems',
          skill: 'stealth'
        },
        {
          text: 'decipher the ancient glyphs inscribed on the stone walls of the ruins',
          setting: 'once majestic halls now echoing with the silent whispers of a forgotten past',
          skill: 'investigation'
        },
        {
          text: 'understand the arcane power source that drives the autonomous defenses',
          setting: 'hidden inner chamber, glowing with an arcane energy that thrums with life',
          skill: 'knowledge'
        },
        {
          text: 'spot the hidden path leading to the inner chamber of the ruins',
          setting: 'forest-dappled sunlight casting long shadows over overgrown stone structures',
          skill: 'perception'
        },
        {
          text: 'find edible plants amidst the colorful but dangerous fungi',
          setting:
            'lush forest surrounding the ruins, teeming with vibrant but potentially lethal fungi',
          skill: 'survival'
        },
        {
          text: 'persuade the corrupted spirit to allow safe passage through the ruins',
          setting: 'ancient stone courtyard, resonating with a spectral presence from ages past',
          skill: 'persuasion'
        },
        {
          text: 'climb the tallest ruin to get a vantage point over the surrounding forest',
          setting: 'crumbling stone tower looming over the ruins and the encroaching forest',
          skill: 'athletics'
        },
        {
          text: 'avoid tripping over ancient, half-buried stones covered with slippery moss',
          setting: 'dense forest floor blanketed by years of fallen leaves and moss',
          skill: 'mobility'
        },
        {
          text: 'maneuver around patches of iridescent fungi without disturbing them',
          setting: 'dank stone corridor overrun by bioluminescent fungi',
          skill: 'mobility'
        },
        {
          text: 'dodge falling stone debris caused by the roots of giant trees',
          setting: 'ruined stone watchtower, entangled with towering ancient trees',
          skill: 'mobility'
        },
        {
          text: 'pick the lock of a hidden door in a moss-covered stone wall',
          setting: 'long-abandoned stone chamber swallowed by creeping vines and fungi',
          skill: 'stealth'
        },
        {
          text: 'locate and decipher the crumbling inscriptions on ancient stone tablets',
          setting: 'forgotten stone library overrun by nature, moss, and colorful fungi',
          skill: 'investigation'
        },
        {
          text: 'find the hidden entrance to a secret tunnel beneath the ruins',
          setting: 'forest-engulfed stone plaza filled with ruined statues and pedestals',
          skill: 'investigation'
        },
        {
          text: 'figure out the pattern to safely navigate through a field of magical mushrooms',
          setting: 'mysterious mushroom grove spreading its spores in the air',
          skill: 'investigation'
        },
        {
          text: 'coordinate a search party to find a lost artifact among the ruins',
          setting: 'sprawling, wild forest, interspersed with stone remains and hidden chambers',
          skill: 'logistics'
        },
        {
          text: 'recall the history of the ancient civilization that built the ruins',
          setting: 'once grand stone hall, now a canopy-covered sanctuary for wildlife',
          skill: 'knowledge'
        },
        {
          text: 'identify the meaning behind the carved symbols on the stone walls',
          setting: 'underground stone chapel filled with eerie carvings and symbols',
          skill: 'knowledge'
        },
        {
          text: 'understand the significance of an ancient ritual site in the forest',
          setting: 'circle of standing stones, teeming with magical energy and forest life',
          skill: 'knowledge'
        },
        {
          text: 'detect the faint sound of running water beneath the stone floor',
          setting: 'ancient, labyrinthine catacombs, damp with moss and echo with dripping water',
          skill: 'perception'
        },
        {
          text: 'smell the distinct scent of a dangerous plant before coming in contact with it',
          setting: 'hidden garden of poisonous plants flourishing in the ruins',
          skill: 'perception'
        },
        {
          text: 'determine the motives of a suspicious group of explorers in the ruins',
          setting: 'ruined stone fortress, its battered walls hosting a variety of flora and fauna',
          skill: 'insight'
        },
        {
          text: 'navigate using natural landmarks while avoiding dangerous terrain',
          setting: 'sprawling, gnarled roots weaving through the ancient stonework',
          skill: 'survival'
        },
        {
          text: 'identify which mushrooms are safe to consume for sustenance',
          setting: 'overgrown stone kitchen, now home to a wide variety of fungi',
          skill: 'survival'
        },
        {
          text: 'administer first aid using herbs and fungi found in the forest',
          setting: 'deep forest glade strewn with fallen stone debris and medicinal plants',
          skill: 'survival'
        },
        {
          text: 'climb a giant tree to get a vantage point of the surrounding area',
          setting: 'massive, ancient tree growing amidst the ruins, offering a view of the area',
          skill: 'athletics'
        },
        {
          text: 'move a heavy stone slab to reveal a hidden passage',
          setting: 'secluded stone chamber, its floor marked by worn carvings and hidden secrets',
          skill: 'athletics'
        },
        {
          text: 'swim across a fast-moving forest stream choked with rubble',
          setting: 'ruined stone bridge, its remnants struggling against the relentless stream',
          skill: 'athletics'
        }
      ]
    },
    {
      desc: 'abhorrent shrine',
      tooltip: 'encrusted with ruby-red moss',
      challenges: [
        {
          text: 'avoid detection by a patrolling group of dark cultists',
          setting: 'shadowy alcoves filled with dark ritual implements',
          skill: 'stealth'
        },
        {
          text: "decipher the secret language written on the shrine's walls",
          setting: 'weathered shrine walls covered with ominous symbols',
          skill: 'investigation'
        },
        {
          text: 'organize a distraction for the corrupted spirit guardian',
          setting: 'open courtyard, pulsating with latent magical energy',
          skill: 'logistics'
        },
        {
          text: 'recall the rites required to pacify an angered wilderness spirit',
          setting: 'sacred chamber lined with ancient pictographs',
          skill: 'knowledge'
        },
        {
          text: "spot hidden traps laid by the shrine's ancient guardians",
          setting: 'dank corridors interlaced with moss and spiderwebs',
          skill: 'perception'
        },
        {
          text: 'determine the real intentions of a mysterious stranger at the shrine',
          setting: 'dimly lit central chamber, resonating with eerie chants',
          skill: 'insight'
        },
        {
          text: 'navigate safely through the infested moss-filled forest',
          setting: 'twisted woodland, leaves glistening with ruby-red moss',
          skill: 'survival'
        },
        {
          text: 'convince the rival adventurers to join forces against the common threat',
          setting: "treacherous pathway leading to the shrine's entrance",
          skill: 'persuasion'
        },
        {
          text: 'scale the steep moss-covered shrine walls under the cover of night',
          setting: 'rugged cliffside offering panoramic view of the dreaded shrine',
          skill: 'athletics'
        },
        {
          text: 'ambush a band of deepfolk raiders looting the shrine',
          setting: 'desecrated inner sanctum littered with gold and precious gems',
          skill: 'combat'
        },
        {
          text: "quietly unlock the shrine's ancient, moss-encrusted door",
          setting: 'ritual chamber entrance guarded by stern stone statues',
          skill: 'stealth'
        },
        {
          text: 'identify the poisonous species of ruby-red moss',
          setting: 'underground grotto, walls oozing with ominous red moss',
          skill: 'knowledge'
        },
        {
          text: 'track a rogue experiment through its disturbed path',
          setting: 'once serene glade, now upturned and desolated by the aberration',
          skill: 'survival'
        },
        {
          text: "uncover the betrayal of an ally succumbing to the shrine's dark influence",
          setting: 'makeshift camp near the shrine, eerily quiet in the moonlight',
          skill: 'insight'
        },
        {
          text: 'negotiate safe passage with a group of merfolk raiders',
          setting: 'underground river running beneath the shrine, alive with bioluminescent algae',
          skill: 'persuasion'
        },
        {
          text: 'find hidden information within a room filled with deceptive illusions',
          setting: 'mirror chamber reflecting a multitude of terrifying possibilities',
          skill: 'investigation'
        },
        {
          text: 'discover an alternate entrance into the shrine through a natural cavern',
          setting: 'overgrown cavern entrance obscured by foliage and moss',
          skill: 'perception'
        },
        {
          text: 'interpret an ancient prophecy found on a forgotten scroll',
          setting: 'hidden library, crammed with dusty tomes and parchments',
          skill: 'knowledge'
        },
        {
          text: 'survive an ambush from a swarm of territorial beasts',
          setting: 'narrow passage filled with grotesque carvings of beasts',
          skill: 'combat'
        },
        {
          text: 'swim across a fast-moving underground river',
          setting: 'darkened cave, echoing with the rushing sound of water',
          skill: 'athletics'
        },
        {
          text: 'organize a rescue mission for a kidnapped companion',
          setting: "crumbling cells built into the shrine's cold stone walls",
          skill: 'logistics'
        },
        {
          text: 'find a way to seal the eldritch cyst leaking otherworldly horrors',
          setting: 'flickering portal chamber, resonating with strange, alien sounds',
          skill: 'survival'
        },
        {
          text: 'dodge the thorny tendrils of animated ruby-red moss lashing out',
          setting: 'ruby-encrusted moss grove within the abhorrent shrine',
          skill: 'mobility'
        },
        {
          text: 'leap across a chasm filled with eldritch shadows swirling menacingly',
          setting: 'chasm cutting through the heart of the dark ritual shrine',
          skill: 'mobility'
        },
        {
          text: "pickpocket a sacred amulet from the shrine's high priest without detection",
          setting: 'ritual altar room teeming with followers and devotees',
          skill: 'stealth'
        },
        {
          text: 'unlock a magically-warded door with complex runes and shifting tumblers',
          setting: 'cryptic entryway to the inner chambers of the shrine',
          skill: 'stealth'
        },
        {
          text: "decode an ancient, moss-encrusted tablet to reveal the shrine's history",
          setting: 'mossy library filled with decaying books and tablets',
          skill: 'investigation'
        },
        {
          text: 'unravel the meaning behind the complex patterns of the blood-stained ritual circle',
          setting: 'dread-filled central chamber of ritual sacrifices',
          skill: 'investigation'
        },
        {
          text: "plan and execute a night-time raid to disrupt the shrine's dark rituals",
          setting: 'overlooking hillock providing a clear view of the shrine',
          skill: 'logistics'
        },
        {
          text: "coordinate an evacuation for captives held within the shrine's deepest cells",
          setting: "nightmarish prison cells beneath the shrine's surface",
          skill: 'logistics'
        },
        {
          text: 'recite a forgotten ritual to cleanse the shrine from its dark energy',
          setting: 'blood-soaked altar room resonating with dark energies',
          skill: 'knowledge'
        },
        {
          text: "recognize the blood magic symbols used in the shrine's dark rituals",
          setting: 'ritual chamber adorned with frescoes of twisted rituals',
          skill: 'knowledge'
        },
        {
          text: "notice the hidden entrance to the shrine's sacred inner sanctum",
          setting: 'cavernous main hall decorated with shadowy, moss-laden statues',
          skill: 'perception'
        },
        {
          text: "hear the faint cries for help emanating from beneath the shrine's floor",
          setting: 'echoing main hall filled with the hum of dark rituals',
          skill: 'perception'
        },
        {
          text: "interpret the emotions from the masked faces of the shrine's devotees",
          setting: 'ceremonial gathering hall filled with masked figures',
          skill: 'insight'
        },
        {
          text: "determine the loyalty of a potential informant within the shrine's ranks",
          setting: "clandestine meeting spot in the shadow of the shrine's exterior",
          skill: 'insight'
        },
        {
          text: "convince the shrine's high priest to reveal the secrets of their rituals",
          setting: 'sanctified priest quarters adorned with symbols of dark faith',
          skill: 'persuasion'
        },
        {
          text: "charm a devoted follower into revealing the shrine's layout",
          setting: 'moss-lined dining hall filled with chattering followers',
          skill: 'persuasion'
        },
        {
          text: "intimidate a guard into unlocking the cells holding the shrine's captives",
          setting: 'torture chamber with iron-barred cells and ominous tools',
          skill: 'persuasion'
        },
        {
          text: 'climb the moss-covered exterior of the shrine without slipping',
          setting: 'jagged, moss-infested outer walls of the towering shrine',
          skill: 'athletics'
        },
        {
          text: "break down the massive door barring the way to the shrine's inner sanctum",
          setting: 'gargantuan door inscribed with ancient, fear-inspiring runes',
          skill: 'athletics'
        },
        {
          text: 'swim across a subterranean pool filled with ritual detritus and moss',
          setting: 'underground grotto teeming with moss and bio-luminescent creatures',
          skill: 'athletics'
        }
      ]
    }
  ],
  urban: [
    {
      desc: 'dank sewers',
      tooltip: 'infested with luminous fungi',
      challenges: [
        {
          text: 'cross a slippery pipe over a gushing sewer canal',
          setting: 'narrow ledge overlooking a swiftly flowing, foul-smelling river of waste',
          skill: 'mobility'
        },
        {
          text: 'dodge poisonous gas spewing from an old, corroded pipe',
          setting: 'long, winding tunnel filled with aged infrastructure and pungent fumes',
          skill: 'mobility'
        },
        {
          text: 'move silently to avoid disturbing a nest of sewer creatures',
          setting:
            'dark cavernous section of sewer overrun with luminescent fungus and nesting critters',
          skill: 'stealth'
        },
        {
          text: 'uncover the truth behind sudden disappearances in the sewers',
          setting: 'abandoned encampment with signs of struggle and hurried departure',
          skill: 'investigation'
        },
        {
          text: 'solve a riddle inscribed on an ancient sewer wall to reveal a hidden passage',
          setting: 'secluded corner of the sewer, marked by time-worn stone carvings',
          skill: 'investigation'
        },
        {
          text: 'plan an evacuation route for sewer dwellers due to imminent flooding',
          setting: 'community of shanties built on rafts, anchored to sewer walls',
          skill: 'logistics'
        },
        {
          text: 'recall the ancient legend about a monstrous sewer creature',
          setting: 'whispering echoes of a large, unseen creature shuffling in the gloomy darkness',
          skill: 'knowledge'
        },
        {
          text: "recognize an arcane symbol marking a secret thieves' guild entrance",
          setting: 'dank alleyway filled with piles of refuse and cryptic graffiti',
          skill: 'knowledge'
        },
        {
          text: 'spot a trapdoor hidden beneath a pile of rubble',
          setting: 'wreckage-filled chamber suggesting a recent collapse or skirmish',
          skill: 'perception'
        },
        {
          text: 'detect the faint scent of fresh air leading to an exit',
          setting: 'serpentine tunnel network with confusing intersections and branches',
          skill: 'perception'
        },
        {
          text: 'discern the motives of a suspicious individual offering guidance',
          setting: 'shadowy intersection where lost wanderers often fall prey to tricksters',
          skill: 'insight'
        },
        {
          text: 'identify the signs of a double-cross during a black market deal',
          setting: 'hidden alcove serving as a discreet trading spot for unlawful goods',
          skill: 'insight'
        },
        {
          text: 'navigate through the sewers using the sounds of flowing water',
          setting: 'pitch-black tunnels where echoes of distant water flow are the only guidance',
          skill: 'survival'
        },
        {
          text: 'craft a makeshift filter to breathe in a spore-filled tunnel',
          setting: 'sinister, bioluminescent garden of exotic fungi spreading choking spores',
          skill: 'survival'
        },
        {
          text: 'convince a group of stubborn squatters to relocate for their safety',
          setting: 'ramshackle community stubbornly clinging to their homes amidst rising dangers',
          skill: 'persuasion'
        },
        {
          text: 'negotiate safe passage with territorial sewer dwellers',
          setting: 'sewer dweller encampment, marked with crude territorial symbols',
          skill: 'persuasion'
        },
        {
          text: 'swim against a strong current to reach a valve controlling water flow',
          setting: 'flooded chamber where a misaligned valve threatens to flood the entire sewer',
          skill: 'athletics'
        },
        {
          text: 'climb a crumbling wall to escape a rising tide of sewage',
          setting: 'rapidly flooding tunnel with a single high exit point',
          skill: 'athletics'
        },
        {
          text: 'defend against a sudden rat swarm attracted by the luminous fungi',
          setting: 'labyrinthine side tunnel overrun with luminescent mushrooms and ravenous rats',
          skill: 'combat'
        },
        {
          text: 'fight off a territorial sewer monster disturbed by your presence',
          setting: 'depths of the sewer, filled with gnarled roots and the scent of fear',
          skill: 'combat'
        }
      ],
      plots: [
        {
          text: 'retrieve damning evidence against the guild master from a guarded vault',
          setting: "cavernous chamber deep in the sewers, home to a hidden thieves' guild vault",
          task: 'blackmail'
        },
        {
          text: 'hunt down a dangerous ooze creature terrorizing the sewer dwellers',
          setting: 'stretch of sewer pipes covered in a slippery, glowing residue',
          task: 'bounty'
        },
        {
          text: 'mediate a dispute between rival ratcatcher gangs fighting over territory',
          setting: 'contested sewer junction known for its infestation of large rats',
          task: 'conflict'
        },
        {
          text: "gather proof of the {settlement} guard's illicit drug operation to free the tavern owner",
          setting: 'secluded sewer alcove used by corrupt guards for clandestine dealings',
          task: 'crime'
        },
        {
          text: 'remove a curse causing the luminescent fungi to grow at an alarming rate',
          setting: 'overgrown fungal grove in the sewers, shrouded in eerie luminescent light',
          task: 'cursed'
        },
        {
          text: 'prevent the assassination of a prominent figure during a secret sewer meeting',
          setting: 'concealed meeting place under the {settlement} where political dealings occur',
          task: 'event'
        },
        {
          text: "find a lost religious artifact to restore a priest's reputation",
          setting: 'collapsed shrine within the sewer system, now home to critters and criminals',
          task: 'folly'
        },
        {
          text: 'steal a valuable object from the sewer king without being noticed',
          setting: 'subterranean throne room, decorated with scavenged treasures',
          task: 'heist'
        },
        {
          text: 'find the missing smuggler who disappeared in the fungus-infested tunnels',
          setting: 'maze of tunnels overtaken by bioluminescent fungi of unknown origin',
          task: 'mystery'
        },
        {
          text: "convince the sewer king to form an alliance with the thieves' guild",
          setting: 'makeshift royal court in the deepest, least-traveled part of the sewers',
          task: 'negotiate'
        },
        {
          text: 'rescue a kidnapped alchemist from a deranged sewer cult',
          setting: 'dilapidated sewer chapel, adorned with unholy symbols and strange potions',
          task: 'rescue'
        },
        {
          text: 'gather rare fungi needed for a powerful elixir',
          setting: 'dangerous, spore-filled section of sewer known for its unique fungi',
          task: 'retrieval'
        },
        {
          text: 'survive an ambush from angry sewer dwellers upset by recent surface actions',
          setting: 'twisting maze of tunnels, home to various outcasts and undesirables',
          task: 'ambush'
        },
        {
          text: 'defend an explorer from aggressive creatures attracted to her experiments',
          setting: 'quiet corner of the sewer, currently serving as a makeshift laboratory',
          task: 'defend'
        },
        {
          text: 'deliver important information to an undercover agent hidden in the sewers',
          setting: 'distant, echo-filled tunnels serving as a hideout for an incognito agent',
          task: 'deliver'
        },
        {
          text: 'protect a cart of valuable goods from thieves as it travels through the sewers',
          setting: 'large tunnel used as a secret trade route to bypass {settlement} tariffs',
          task: 'escort'
        },
        {
          text: 'infiltrate a secret cult gathering to steal their unholy ritual text',
          setting: 'hidden sanctuary where the sewer cult conducts its profane ceremonies',
          task: 'infiltration'
        },
        {
          text: 'observe a suspicious meeting between {settlement} guards and sewer dwellers',
          setting: "ancient stone platform where the sewers meet the {settlement}'s foundation",
          task: 'observe'
        },
        {
          text: 'convince a spy to reveal details about an impending assassination',
          setting: 'secret rendezvous point, cloaked in the shadows of the sewer tunnels',
          task: 'persuade'
        },
        {
          text: 'convince a retired thief to come out of retirement to assist in a heist',
          setting: 'hidden nook serving as a secluded home for the reclusive old thief',
          task: 'recruit'
        }
      ]
    },
    {
      desc: 'magical academy',
      challenges: [
        {
          text: 'quickly navigate the ever-changing enchanted hallways to reach a class',
          setting:
            'shape-shifting corridors of the academy filled with magical traps and illusions',
          skill: 'mobility'
        },
        {
          text: 'dodge spells during an advanced defense magic practice session',
          setting: 'vast open-air courtyard where students practice high-level magic',
          skill: 'mobility'
        },
        {
          text: 'sneak into the forbidden archives to obtain a restricted spellbook',
          setting: 'towering library stacked with ancient tomes guarded by enchantments',
          skill: 'stealth'
        },
        {
          text: 'hide in shadows to overhear the secret meeting of magic council',
          setting: 'imposing stone council chamber lit by floating magical orbs',
          skill: 'stealth'
        },
        {
          text: "find clues to reveal the traitor within the academy's ranks",
          setting:
            'diverse classrooms filled with young wizards, artifacts, and centuries-old secrets',
          skill: 'investigation'
        },
        {
          text: 'solve an ancient riddle to open a hidden chamber within the academy',
          setting: 'ancient stone wall carved with symbols and hidden by enchantments',
          skill: 'investigation'
        },
        {
          text: "draw upon the academy's history to settle a dispute among the faculty",
          setting: "stately meeting room, rich with the academy's history and lingering debates",
          skill: 'knowledge'
        },
        {
          text: 'notice the faint traces of a forbidden spell cast within the academy',
          setting: 'classroom filled with residual magical energy and signs of secret sorcery',
          skill: 'perception'
        },
        {
          text: 'spot a hidden magical trap in the path of an unsuspecting student',
          setting: 'busy academy hallway filled with wandering students and unseen magical dangers',
          skill: 'perception'
        },
        {
          text: 'determine the true intentions of a visiting dignitary from another realm',
          setting:
            'grand academy banquet hall filled with influential mages and political intrigue',
          skill: 'insight'
        },
        {
          text: "detect the falsehood in a student's alibi regarding a stolen artifact",
          setting: 'a busy student common room buzzing with rumors and secrets',
          skill: 'insight'
        },
        {
          text: "survive an unexpected encounter with a magical beast in the academy's grounds",
          setting: 'sprawling academy gardens, home to various magical creatures and plant life',
          skill: 'survival'
        },
        {
          text: 'identify and use a magical herb to cure a poisoned classmate',
          setting: 'lush academy greenhouse filled with exotic magical herbs and plants',
          skill: 'survival'
        },
        {
          text: "convince a stubborn professor to reconsider a student's expulsion",
          setting: "ornate professor's office filled with books, scrolls, and centuries of wisdom",
          skill: 'persuasion'
        },
        {
          text: "scale the academy's enchanted tower to retrieve a rogue magical artifact",
          setting:
            'lofty academy tower, swirling with protective enchantments and magical challenges',
          skill: 'athletics'
        },
        {
          text: 'swim through a flooded dungeon to rescue a trapped familiar',
          setting: 'subterranean academy dungeon filled with water and magical threats',
          skill: 'athletics'
        },
        {
          text: 'defend the academy from an attack by dark magic practitioners',
          setting: "academy's fortified exterior, under siege by a force of dark magic wielders",
          skill: 'combat'
        }
      ]
    },
    {
      desc: 'floating market',
      tooltip: 'filled with colorful boats and vendors',
      challenges: [
        {
          text: 'navigate between moving boats to deliver a package without falling into the water',
          setting: 'busy lanes of the market, full of bobbing boats and bustling vendors',
          skill: 'mobility'
        },
        {
          text: 'stealthily tail a suspicious character moving through the crowded market',
          setting: 'maze-like array of market stalls packed with goods, vendors, and customers',
          skill: 'stealth'
        },
        {
          text: 'pickpocket a rare artifact from a notorious smuggler',
          setting: 'packed trading boat known for illicit deals beneath layers of legitimate trade',
          skill: 'stealth'
        },
        {
          text: 'investigate the sudden disappearance of a popular market vendor',
          setting: 'abandoned floating stall, its usual array of goods untouched',
          skill: 'investigation'
        },
        {
          text: 'solve the puzzle of a magic artifact sold by a mysterious vendor',
          setting: 'secluded booth laden with a wide variety of arcane trinkets',
          skill: 'investigation'
        },
        {
          text: 'recall the ancient legend to identify the origin of a strange relic',
          setting: "elderly vendor's boat brimming with relics, antiques, and tales of the past",
          skill: 'knowledge'
        },
        {
          text: 'remember market etiquette to avoid offending a sensitive vendor',
          setting: 'stall of a notoriously irritable merchant, renowned for his unique wares',
          skill: 'knowledge'
        },
        {
          text: 'notice a disguised thief among the crowd before he strikes',
          setting: 'crowded market avenue teeming with locals and tourists alike',
          skill: 'perception'
        },
        {
          text: 'identify a counterfeit magical item among a pile of genuine artifacts',
          setting: 'arcane stall glowing with all manner of magical goods and artifacts',
          skill: 'perception'
        },
        {
          text: "discern the true intent of a vendor selling 'cursed' items",
          setting: "shady merchant's boat draped with mysterious items and dark artifacts",
          skill: 'insight'
        },
        {
          text: "detect a lie in the fisherman's tale about the legendary sea monster",
          setting: 'lively tavern boat, filled with boisterous mariners sharing stories over ale',
          skill: 'insight'
        },
        {
          text: 'use market spices to make a medicinal tea for a sick vendor',
          setting: "spice merchant's boat, filled with exotic aromas and colorful powders",
          skill: 'survival'
        },
        {
          text: 'negotiate a fair price for a rare item without any local currency',
          setting: "luxurious merchant's boat laden with exotic, high-value goods",
          skill: 'persuasion'
        },
        {
          text: 'convince a vendor to reveal the source of their illicit goods',
          setting: "smuggler's boat filled with rare and illegal items from across the realm",
          skill: 'persuasion'
        },
        {
          text: 'leap between boats to catch a runaway thief',
          setting: 'hectic market waterway, cluttered with boats of every size and shape',
          skill: 'athletics'
        },
        {
          text: 'swim to retrieve a precious item knocked overboard during a scuffle',
          setting: "deep and murky waters beneath the bustling market's surface",
          skill: 'athletics'
        },
        {
          text: 'defend the market from aquatic creatures stirred by a magical artifact',
          setting: 'once tranquil waterfront, now teeming with aggressive magical creatures',
          skill: 'combat'
        },
        {
          text: 'quell a riot between rival vendor gangs without harming bystanders',
          setting: 'central market square, turned into a battleground by clashing factions',
          skill: 'combat'
        }
      ]
    },
    {
      desc: 'sprawling slums',
      tooltip: 'filled with desperate locals and dangerous gangs',
      challenges: [
        {
          text: 'navigate swiftly through a crowd to catch a thieving street urchin',
          setting: 'packed marketplace where desperate locals try to scrape a living',
          skill: 'mobility'
        },
        {
          text: 'avoid tripping over scattered debris while fleeing through a dark alley',
          setting:
            'labyrinth of winding, debris-littered alleys filled with danger and desperation',
          skill: 'mobility'
        },
        {
          text: "slip unnoticed into a gang's hideout to retrieve stolen goods",
          setting: 'secret hideout bustling with gang members and fenced merchandise',
          skill: 'stealth'
        },
        {
          text: 'blend into a crowd of slum-dwellers to avoid the {settlement} guards',
          setting: "busy soup kitchen where the {settlement}'s less fortunate gather for a meal",
          skill: 'stealth'
        },
        {
          text: 'locate a missing person rumored to be hiding in the slums',
          setting: "maze-like tangle of shanty houses, home to thousands of {settlement}'s poor",
          skill: 'investigation'
        },
        {
          text: 'solve the mystery behind a sudden spate of disappearances in the slums',
          setting: 'series of haphazardly constructed dwellings where locals have vanished',
          skill: 'investigation'
        },
        {
          text: 'organize the evacuation of a burning slum block',
          setting: 'dense slum street engulfed in flames, threatening to spread further',
          skill: 'logistics'
        },
        {
          text: 'recall an old {settlement} law that can protect the slums from a greedy landlord',
          setting: 'community gathering where desperate residents seek ways to protect their homes',
          skill: 'knowledge'
        },
        {
          text: "use knowledge of slum's history to locate a hidden underground well",
          setting: 'overpopulated district suffering a severe water shortage',
          skill: 'knowledge'
        },
        {
          text: 'detect a faint poison in the distributed food rations',
          setting: 'community meal where mysterious illness starts spreading among the eaters',
          skill: 'perception'
        },
        {
          text: 'spot an imposter trying to infiltrate a local gang',
          setting: 'dimly lit tavern known to be a common hangout for various gangs',
          skill: 'perception'
        },
        {
          text: 'identify a lie from a resident claiming ignorance about a crime',
          setting: 'tight-knit community where trust is paramount and secrets are commonplace',
          skill: 'insight'
        },
        {
          text: "gauge the truthfulness of a local oracle's cryptic predictions",
          setting:
            "makeshift oracle's den filled with curious trinkets and thick with incense smoke",
          skill: 'insight'
        },
        {
          text: 'persuade a stubborn gang leader to stop terrorizing the locals',
          setting: 'fortified hideout where a gang holds sway over the fearful residents',
          skill: 'persuasion'
        },
        {
          text: 'convince a slumlord to delay the eviction of several families',
          setting: 'rickety wooden structure serving as the office of the local slumlord',
          skill: 'persuasion'
        },
        {
          text: 'jump over rooftops to chase a notorious pickpocket',
          setting: 'sea of dilapidated houses where the lawless find their refuge',
          skill: 'athletics'
        },
        {
          text: 'break into a run to catch a rogue mage causing chaos in the slums',
          setting: 'narrow, winding streets where a rogue mage is stirring up trouble',
          skill: 'athletics'
        },
        {
          text: 'confront a gang of thugs attempting to extort protection money',
          setting: "back alley where local businesses are being terrorized for 'protection' money",
          skill: 'combat'
        }
      ]
    },
    {
      desc: 'wealthy district',
      tooltip: 'with opulent mansions and manicured lawns',
      challenges: [
        {
          text: 'navigate over ornate garden walls without setting off security magic',
          setting: 'lavish mansion garden filled with dangerous magical wards and traps',
          skill: 'mobility'
        },
        {
          text: 'dodge magical sensors while sneaking into a rich mansion',
          setting: 'opulent mansion protected by state-of-the-art magical security systems',
          skill: 'mobility'
        },
        {
          text: 'pickpocket a precious jewel from a wealthy noble at a grand ball',
          setting: 'luxurious mansion ballroom filled with well-dressed nobles and lively music',
          skill: 'stealth'
        },
        {
          text: 'blend into a crowd of high-class citizens without arousing suspicion',
          setting: 'busy marketplace filled with wealthy shoppers and fine goods',
          skill: 'stealth'
        },
        {
          text: 'uncover the truth about a mysterious disappearance in the district',
          setting: 'large mansion where signs of struggle hint at a possible abduction',
          skill: 'investigation'
        },
        {
          text: 'find a secret vault in a mansion rumored to hold a powerful artifact',
          setting: 'sprawling mansion filled with countless rooms, hallways, and secrets',
          skill: 'investigation'
        },
        {
          text: 'recall the history of a prominent family to gain their trust',
          setting: "grand dining hall filled with portraits of a noble family's ancestors",
          skill: 'knowledge'
        },
        {
          text: 'discern the origin of a mysterious magical artifact found in the district',
          setting: 'ornate study filled with ancient texts and magical paraphernalia',
          skill: 'knowledge'
        },
        {
          text: 'notice a suspicious behavior among the staff at a high-profile gala',
          setting:
            'grand gala filled with dancing couples, wandering waitstaff, and watchful security',
          skill: 'perception'
        },
        {
          text: 'detect the true intentions of a too-friendly noble',
          setting: 'private mansion salon where high society members engage in secret talks',
          skill: 'insight'
        },
        {
          text: "decipher a lie in a rumor spreading among the district's elite",
          setting: 'exclusive teahouse where gossip and rumors among the elite flow freely',
          skill: 'insight'
        },
        {
          text: 'identify poisonous plants in the ornate garden of a mansion',
          setting:
            'meticulously maintained garden filled with exotic and possibly dangerous plants',
          skill: 'survival'
        },
        {
          text: 'survive a night in the district after being falsely accused of theft',
          setting: 'district streets patrolled by guards on high alert for a supposed thief',
          skill: 'survival'
        },
        {
          text: 'convince a group of nobles to fund a community project',
          setting: 'opulent drawing room where influential figures discuss {settlement} matters',
          skill: 'persuasion'
        },
        {
          text: 'gain access to a private auction by charming the gatekeeper',
          setting: 'mansion hosting an exclusive auction of rare and powerful artifacts',
          skill: 'persuasion'
        },
        {
          text: 'escape pursuers by running and jumping across mansion rooftops',
          setting: 'district rooftops offering dangerous, high-stakes routes for agile runners',
          skill: 'athletics'
        },
        {
          text: 'defend a mansion from a band of thieves under the cover of night',
          setting: 'gated mansion with valuable treasures attracting unwanted attention',
          skill: 'combat'
        },
        {
          text: 'subdue a rogue golem rampaging through the district',
          setting: 'once-peaceful street now terrorized by a rampaging magical creature',
          skill: 'combat'
        }
      ]
    },
    {
      desc: 'grand cathedral',
      challenges: [
        {
          text: "climb the cathedral's tall spire without drawing attention",
          setting: 'soaring stone spire overlooking the {settlement} and cathedral grounds',
          skill: 'mobility'
        },
        {
          text: 'move silently through a prayer session without disturbing worshippers',
          setting: 'vast cathedral interior filled with devout parishioners in deep prayer',
          skill: 'stealth'
        },
        {
          text: 'pickpocket a precious relic from a high-ranking clergy member',
          setting: 'opulent cathedral chambers where high-ranking clergymen gather',
          skill: 'stealth'
        },
        {
          text: 'search for a secret passage mentioned in an ancient cathedral blueprint',
          setting: 'dusty cathedral archives filled with ancient texts and blueprints',
          skill: 'investigation'
        },
        {
          text: 'identify a disguised infiltrator among the cathedral clergy',
          setting: "clergy's dressing room bustling with priests preparing for a major ceremony",
          skill: 'investigation'
        },
        {
          text: 'recall the correct prayer to perform a ritual blessing',
          setting: "sacred altar where worshippers receive blessings from the cathedral's clergy",
          skill: 'knowledge'
        },
        {
          text: 'determine the historical significance of a newly discovered cathedral fresco',
          setting: 'forgotten cathedral chamber revealing an ancient, intricate fresco',
          skill: 'knowledge'
        },
        {
          text: 'spot a tiny inscription hidden on a cathedral statue',
          setting: 'tranquil cathedral garden filled with religious statues and shrines',
          skill: 'perception'
        },
        {
          text: "sense the fear in a clergy member who's acting suspiciously",
          setting: 'secluded cathedral cloisters where clergy members retreat for solitude',
          skill: 'insight'
        },
        {
          text: 'tend to a wounded person after a cathedral accident',
          setting: 'construction site within the cathedral where a restoration project is underway',
          skill: 'survival'
        },
        {
          text: 'maneuver through a labyrinthine catacomb without getting lost',
          setting: 'dark, musty catacombs beneath the cathedral, filled with crypts and tombs',
          skill: 'survival'
        },
        {
          text: "convince the cathedral's head priest to grant access to a restricted area",
          setting: "cathedral's sacred sanctum, off-limits to anyone but the highest clergy",
          skill: 'persuasion'
        },
        {
          text: 'calm an agitated crowd after a prophetic vision in the cathedral',
          setting: 'central cathedral square filled with stirred and worried parishioners',
          skill: 'persuasion'
        },
        {
          text: 'push a heavy stone slab to reveal a hidden passage',
          setting: "cathedral's crypt where ancient burials and secret passages lie hidden",
          skill: 'athletics'
        },
        {
          text: 'defend the cathedral from an attack by hostile forces',
          setting: "cathedral's main entrance besieged by foes intending to breach the sacred site",
          skill: 'combat'
        }
      ]
    },
    {
      desc: 'bustling marketplace',
      tooltip: 'filled with exotic goods and chattering merchants',
      challenges: [
        {
          text: 'navigate through a chaotic crowd to reach a merchant before he sells a desired item',
          setting: 'overcrowded alley filled with traders, shoppers, and street performers',
          skill: 'mobility'
        },
        {
          text: "steal a rare ingredient from a well-guarded alchemist's stand",
          setting: "alchemist's tent filled with pungent, bubbling concoctions and mystical items",
          skill: 'stealth'
        },
        {
          text: 'disguise as a merchant to get past market security',
          setting: "market's entrance heavily guarded by armored {settlement} guards",
          skill: 'stealth'
        },
        {
          text: 'locate a thief who has stolen an important document',
          setting: 'maze-like arrangement of vibrant stalls and loud, bargaining traders',
          skill: 'investigation'
        },
        {
          text: 'identify the origins of an ancient artifact up for sale',
          setting: "treasure merchant's booth filled with items of dubious provenance",
          skill: 'knowledge'
        },
        {
          text: 'recall the religious significance of a holy day affecting market prices',
          setting: 'market square filled with vendors selling goods for a religious festival',
          skill: 'knowledge'
        },
        {
          text: "notice a hidden symbol on a merchant's sign indicating illicit goods",
          setting: 'shadowy corner of the marketplace where less reputable traders gather',
          skill: 'perception'
        },
        {
          text: 'detect a counterfeit currency being used in the marketplace',
          setting: 'currency exchange counter dealing in various regional and foreign coins',
          skill: 'perception'
        },
        {
          text: 'identify a lie told by a smooth-talking artifact dealer',
          setting: 'ornate tent of a dealer notorious for selling forged or cursed items',
          skill: 'insight'
        },
        {
          text: 'discern the true intention of a generous stranger in the marketplace',
          setting: 'crowded marketplace cafe where local gossip is freely shared',
          skill: 'insight'
        },
        {
          text: 'treat a merchant who has suddenly fallen ill in the marketplace',
          setting: 'busy food market with exotic spices and unknown ingredients',
          skill: 'survival'
        },
        {
          text: 'convince a stubborn blacksmith to sell a weapon below market price',
          setting: "blacksmith's forge where unique weapons of all kinds are for sale",
          skill: 'persuasion'
        },
        {
          text: 'diffuse a tense negotiation between feuding market stall owners',
          setting: 'congested area where two rival stalls compete for customer attention',
          skill: 'persuasion'
        },
        {
          text: 'defend a market stall from thieves trying to steal exotic wares',
          setting: 'poorly-lit outskirts of the market with a high occurrence of theft',
          skill: 'combat'
        },
        {
          text: "fight off aggressive creatures accidentally released from a merchant's cage",
          setting: 'exotic creature stall where a mishap has caused panic in the market',
          skill: 'combat'
        }
      ]
    },
    {
      desc: 'refugee camp',
      tooltip: 'filled with makeshift tents and bustling communal areas',
      challenges: [
        {
          text: 'navigate through a bustling market to catch a nimble pickpocket',
          setting: 'crowded, makeshift marketplace filled with vendors of exotic goods',
          skill: 'mobility'
        },
        {
          text: 'sneak into a guarded tent to retrieve stolen religious artifacts',
          setting: "large guarded tent used by the camp's self-appointed 'mayor'",
          skill: 'stealth'
        },
        {
          text: 'search the camp to find a missing child before nightfall',
          setting: 'sprawling network of tents, cooking fires, and bustling communal areas',
          skill: 'investigation'
        },
        {
          text: 'recall historical traditions to solve a cultural dispute',
          setting: 'gathering of refugees arguing over traditional customs',
          skill: 'knowledge'
        },
        {
          text: 'notice subtle signs of a disease outbreak in the camp',
          setting: 'overcrowded medical tent filled with various afflictions and injuries',
          skill: 'perception'
        },
        {
          text: "detect lies from a shady merchant selling 'magical' amulets",
          setting: 'busy corner of the camp market with a variety of mysterious trinkets',
          skill: 'insight'
        },
        {
          text: 'convince warring factions within the camp to cooperate',
          setting: "tense stand-off near the camp's communal fire pit, with shouting matches",
          skill: 'persuasion'
        },
        {
          text: 'defend the camp from a sudden attack by local bandits',
          setting: 'makeshift defensive line, filled with hastily armed refugees',
          skill: 'combat'
        },
        {
          text: 'disguise as a member of a specific tribe to gather information',
          setting: 'cluster of tribal tents adorned with unique cultural symbols',
          skill: 'stealth'
        },
        {
          text: 'solve a riddle to locate a hidden cache of supplies',
          setting: 'discreet spot marked by peculiar symbols known only to a few',
          skill: 'investigation'
        },
        {
          text: 'recall an ancient prophecy to calm fearful refugees',
          setting: 'night-time gathering of scared camp members sharing ominous rumors',
          skill: 'knowledge'
        },
        {
          text: 'determine the true intent of a foreign emissary visiting the camp',
          setting:
            "lavish tent set up for the foreign emissary's visit, filled with guarded whispers",
          skill: 'insight'
        },
        {
          text: 'track a pack of wolves that have been stealing food from the camp',
          setting: 'dusty, paw-marked paths leading into a dense nearby forest',
          skill: 'survival'
        },
        {
          text: 'negotiate better conditions for the refugees with local authorities',
          setting:
            'tense meeting at the {settlement} hall, filled with bureaucrats and {settlement} guards',
          skill: 'persuasion'
        },
        {
          text: 'survive an ambush from angry locals resentful of the refugees',
          setting: 'narrow passageway between tents, the perfect choke point for an ambush',
          skill: 'combat'
        }
      ]
    },
    {
      desc: 'bustling dockyards',
      tooltip: 'filled with sailing ships and seabirds',
      challenges: [
        {
          text: 'pickpocket a key from a harbor master to access a warehouse',
          setting: "harbor master's office, filled with maps, ledgers, and nautical equipment",
          skill: 'stealth'
        },
        {
          text: 'search the bustling market for a specific rare seashell',
          setting: 'lively seaside market, selling everything from fresh fish to exotic trinkets',
          skill: 'investigation'
        },
        {
          text: "recall maritime laws to negotiate a ship's release",
          setting: 'harbor office, buzzing with quarrels over maritime disputes',
          skill: 'knowledge'
        },
        {
          text: 'identify a smuggler trying to blend in with the sailors',
          setting: 'bustling tavern filled with rowdy sailors sharing tales of the sea',
          skill: 'insight'
        },
        {
          text: 'convince a group of sailors to help load your cargo',
          setting: 'wharf-side tavern, brimming with off-duty sailors relaxing',
          skill: 'persuasion'
        },
        {
          text: 'defend the dockyard from an attack by pirate raiders',
          setting: 'dockyard under siege, filled with chaos and echoing with cries for help',
          skill: 'combat'
        },
        {
          text: 'sneak aboard a ship at night to retrieve a stolen item',
          setting: 'quiet dockyard with moonlit ships bobbing gently on the waves',
          skill: 'stealth'
        },
        {
          text: 'unravel the mystery of a ghost ship that has docked',
          setting: 'eerily silent ship, abandoned belongings suggesting a swift departure',
          skill: 'investigation'
        },
        {
          text: 'recall ancient sea myths to calm superstitious sailors',
          setting: "gathered crew members around a bonfire, sharing whispered sailor's legends",
          skill: 'knowledge'
        },
        {
          text: 'identify a suspicious ship based on its flag and markings',
          setting: 'dockside lookout post, offering a panoramic view of the harbor',
          skill: 'perception'
        },
        {
          text: 'negotiate a fair price for an exotic cargo with a foreign trader',
          setting: 'intricate merchant stall displaying a variety of curious foreign goods',
          skill: 'persuasion'
        }
      ]
    },
    {
      desc: 'magical catastrophe site',
      challenges: [
        {
          text: 'dodge magical energy sparks erupting from the unstable ground',
          setting: 'cracked cobblestone streets pulsing with residual magical energy',
          skill: 'mobility'
        },
        {
          text: 'sneak past restless magical apparitions haunting the district',
          setting: 'once-vibrant plaza, now populated by swirling spectral figures',
          skill: 'stealth'
        },
        {
          text: 'investigate the cause of the magical catastrophe',
          setting: 'epicenter of the explosion, where residual magical energy is highest',
          skill: 'investigation'
        },
        {
          text: 'recall arcana to safely navigate through magical anomalies',
          setting: 'dense network of warped buildings, filled with arcane traps and puzzles',
          skill: 'knowledge'
        },
        {
          text: 'identify the source of an eerie sound echoing through the district',
          setting:
            'once-bustling marketplace, now eerily silent except for the odd, mysterious sound',
          skill: 'perception'
        },
        {
          text: 'interpret the intentions of a cryptic magical entity',
          setting: 'haunted library, where an enigmatic spectral librarian still lingers',
          skill: 'insight'
        },
        {
          text: 'identify safe places to rest amidst the magical disturbances',
          setting:
            'twisted urban landscape, where pockets of calm are as rare as they are precious',
          skill: 'survival'
        },
        {
          text: 'convince a group of scavengers to share discovered resources',
          setting: 'hidden alcove filled with scavengers and their ill-gotten gains',
          skill: 'persuasion'
        },
        {
          text: 'climb a treacherous, magic-warped building to reach a valuable artifact',
          setting: 'once-majestic town hall, now a twisted shell of its former glory',
          skill: 'athletics'
        },
        {
          text: 'fend off magical beasts attracted by the residual energy',
          setting: 'crumbling {settlement} park, now a breeding ground for magically altered fauna',
          skill: 'combat'
        },
        {
          text: 'navigate quickly through collapsing buildings during a magical aftershock',
          setting:
            'unstable {settlement} district with buildings teetering on the brink of collapse',
          skill: 'mobility'
        },
        {
          text: 'hide from a patrolling magical golem in the ruins',
          setting: 'maze-like ruins of an ancient mage tower filled with arcane guardians',
          skill: 'stealth'
        },
        {
          text: 'uncover the whereabouts of a crucial historical artifact',
          setting: 'half-destroyed museum filled with remnants of a bygone era',
          skill: 'investigation'
        },
        {
          text: 'discern the original function of a damaged magical device',
          setting: 'ruined arcane workshop strewn with shattered magical implements',
          skill: 'knowledge'
        },
        {
          text: 'detect the presence of invisible magical traps in the area',
          setting: "ravaged wizard's quarter, now fraught with unseen dangers",
          skill: 'perception'
        },
        {
          text: 'understand the cryptic warning from a distressed spirit',
          setting: 'charred remains of a residential building, home to one forlorn apparition',
          skill: 'insight'
        },
        {
          text: 'negotiate safe passage with a territorial gang of survivors',
          setting: 'fortified block, controlled by hardened survivors, is the only safe route',
          skill: 'persuasion'
        },
        {
          text: 'survive an ambush from mutated creatures in the district',
          setting: 'darkened alleyways, filled with mutated creatures attracted by magic',
          skill: 'combat'
        }
      ]
    },
    {
      desc: 'rundown asylum',
      tooltip: 'home to forgotten minds and their lost tales',
      challenges: [
        {
          text: 'sneak into the locked room of a patient who mysteriously disappeared',
          setting: 'dimly lit ward with a heavy air of sorrow and the echoes of forgotten patients',
          skill: 'stealth'
        },
        {
          text: "search the abandoned medical records to uncover the asylum's dark past",
          setting: 'old, dusty administration office with stacks of neglected papers and files',
          skill: 'investigation'
        },
        {
          text: 'notice the unusual behavior of rats hinting at a hidden passage',
          setting: 'grimy basement, where the scurrying of rats is the only sign of life',
          skill: 'perception'
        },
        {
          text: 'discern the true emotions of a patient claiming to see future events',
          setting: 'disturbingly calm room with an eerily prescient patient',
          skill: 'insight'
        },
        {
          text: "identify and use medicinal plants growing in the asylum's overgrown garden",
          setting: 'neglected garden overrun with weeds, but also potential remedies',
          skill: 'survival'
        },
        {
          text: 'convince a group of paranoid patients to trust you',
          setting: 'cramped common area with huddled patients murmuring conspiracies',
          skill: 'persuasion'
        },
        {
          text: 'defend against hostile, spectral entities haunting the asylum',
          setting: 'chilly, dimly lit hallways that echo with unnatural wails',
          skill: 'combat'
        },
        {
          text: 'dodge the erratic movements of a patient possessed by a spirit',
          setting: 'eerie room bathed in moonlight, filled with manic scribbles',
          skill: 'mobility'
        },
        {
          text: 'disguise as an orderly to gain the trust of a secretive patient',
          setting: 'ward filled with cautious patients and wary staff',
          skill: 'stealth'
        },
        {
          text: "solve a cryptic riddle left behind by the asylum's founder",
          setting: 'ancient study filled with arcane artifacts and cryptic notes',
          skill: 'investigation'
        },
        {
          text: 'determine the intentions of an ethereal visitor appearing at night',
          setting: 'midnight courtyard under a full moon, frequented by a spectral figure',
          skill: 'insight'
        },
        {
          text: "persuade the asylum's spirit to allow safe passage through the premises",
          setting: 'majestic, ghostly figure lurking in the central grand hall',
          skill: 'persuasion'
        },
        {
          text: 'survive an ambush from possessed patients under a full moon',
          setting: 'moonlit corridor where patients transform into grotesque forms',
          skill: 'combat'
        }
      ]
    },
    {
      desc: 'criminal syndicate',
      challenges: [
        {
          text: "sneak into the syndicate's guarded warehouse to steal a ledger",
          setting: 'large warehouse, guarded by lanterns and roaming guards',
          skill: 'stealth'
        },
        {
          text: "search the {settlement}'s underbelly to locate a hidden syndicate hideout",
          setting: 'dark labyrinth of underground tunnels and secret passages',
          skill: 'investigation'
        },
        {
          text: 'recall syndicate symbols to decrypt a coded message',
          setting: 'backroom of a local tavern, serving as a secret syndicate meeting spot',
          skill: 'knowledge'
        },
        {
          text: "identify a disguised syndicate member at the {settlement}'s grand ball",
          setting: 'ornate {settlement} hall filled with masked partygoers and opulent decorations',
          skill: 'perception'
        },
        {
          text: "determine the true motive of the syndicate's leader",
          setting:
            'hidden lair deep within the {settlement}, filled with plans of clandestine operations',
          skill: 'insight'
        },
        {
          text: 'convince a syndicate member to become an informant',
          setting: 'dank, smoke-filled tavern where the syndicate members gather',
          skill: 'persuasion'
        },
        {
          text: 'defend against a surprise attack by syndicate assassins',
          setting: 'quiet, shadowy alleyway lit only by the glow of a single lantern',
          skill: 'combat'
        },
        {
          text: 'pickpocket a key from a syndicate guard without getting noticed',
          setting: "guarded entrance to the {settlement}'s underground sewer system",
          skill: 'stealth'
        },
        {
          text: 'find a hidden artifact in the {settlement} that the syndicate wants',
          setting: 'grand {settlement} library filled with ancient scrolls and books',
          skill: 'investigation'
        },
        {
          text: 'understand the arcane trap guarding a syndicate treasure',
          setting: "enchanted syndicate vault hidden beneath the {settlement}'s largest bank",
          skill: 'knowledge'
        },
        {
          text: 'decipher the emotions of a hostage held by the syndicate',
          setting: "secret holding cell, deep within the syndicate's underground base",
          skill: 'insight'
        },
        {
          text: "track a syndicate member's path through the {settlement}",
          setting:
            'muddy {settlement} streets after a heavy downpour, filled with footprints and cart tracks',
          skill: 'survival'
        },
        {
          text: 'persuade a {settlement} guard to ignore syndicate activity',
          setting: '{settlement} guardhouse, filled with uniforms, weapons, and unsolved cases',
          skill: 'persuasion'
        },
        {
          text: 'survive an ambush by the syndicate in a {settlement} square',
          setting: 'busy {settlement} square with a central fountain, surrounded by tall buildings',
          skill: 'combat'
        }
      ]
    },
    {
      desc: 'vast underground chamber',
      tooltip: 'used for arcane experiments',
      challenges: [
        {
          text: 'navigate across a floor strewn with magical, gravity-altering glyphs',
          setting: 'gleaming obsidian floor inscribed with arcane symbols in silver',
          skill: 'mobility'
        },
        {
          text: 'sneak past a slumbering golem, any sound could trigger its awakening',
          setting: 'cavernous area lit by arcane luminescence, housing a massive stone golem',
          skill: 'stealth'
        },
        {
          text: 'decipher the cryptic instructions to operate a forgotten piece of machinery',
          setting: 'crumbling remnants of an ancient laboratory filled with arcane contraptions',
          skill: 'investigation'
        },
        {
          text: 'recall details about the ritual being performed to predict its effects',
          setting: 'darkened chamber filled with swirling mists and a shimmering ritual circle',
          skill: 'knowledge'
        },
        {
          text: "detect the lies in the captured necromancer's pleas for mercy",
          setting: 'imprisonment circle, where a nervous necromancer is trapped',
          skill: 'insight'
        },
        {
          text: 'navigate through a network of tunnels using the luminescent fungi for guidance',
          setting: 'maze-like underground tunnel system, illuminated by glowing fungi',
          skill: 'survival'
        },
        {
          text: 'convince the trapped spirit to reveal the secrets of the arcane chamber',
          setting: 'eerie phantasmal prison where a disgruntled spirit is confined',
          skill: 'persuasion'
        },
        {
          text: 'move a massive stone blocking the passage using sheer physical strength',
          setting: 'old worn-out tunnel, obstructed by a colossal, rune-carved boulder',
          skill: 'athletics'
        },
        {
          text: 'defend against a wave of arcane constructs activated by a faulty spell',
          setting: 'long-forgotten armory now awakening to its previous defensive function',
          skill: 'combat'
        }
      ]
    }
  ]
}
