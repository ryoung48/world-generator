import { REGION } from '../../regions'
import { Region } from '../../regions/types'
import { COLOR } from '../../utilities/color'
import { TRAIT } from '../../utilities/traits'
import { CLIMATE } from '../../world/climate'
import { Climate } from '../../world/climate/types'
import { LANGUAGE } from '../languages'
import { SPECIES } from '../species'
import {
  Culture,
  CultureDishes,
  CultureFlavors,
  CulturePerformances,
  CultureTraditionsBad,
  CultureTraditionsGood,
  CultureValues,
  CultureVisual
} from './types'

const values: CultureValues = {
  adaptation: { text: 'embracing foreign customs and traditions', conflicts: ['purity'] },
  aesthetic: { text: 'beauty in material goods and architecture', conflicts: ['function'] },
  ancestry: { text: 'bloodline and family heritage' },
  arcana: { text: 'magical prowess and occult ability' },
  austerity: {
    text: 'ascetic unworldliness and pious poverty',
    conflicts: ['decadence', 'wealth']
  },
  beasts: { text: 'the ability to tame and control wild animals' },
  bravery: { text: 'courage and valiance in danger' },
  charity: { text: 'sharing wealth and goods with others' },
  cultivation: { text: 'agriculture, gardens, and mastery over plants' },
  decadence: { text: 'personal indulgence and luxuriant pleasure', conflicts: ['austerity'] },
  diplomacy: { text: 'pacifism and peaceful resolution of problems', conflicts: ['might'] },
  etiquette: { text: 'eloquence and social expertise' },
  exploration: { text: 'exploring the unknown and discovering secrets' },
  forethought: { text: 'planning and anticipating future events and consequences' },
  forgiveness: { text: 'showing mercy to enemies', conflicts: ['vengeance'] },
  freedom: { text: 'individual rights and localized rule', conflicts: ['hierarchy'] },
  function: { text: 'building things in service of their posterity', conflicts: ['aesthetic'] },
  hierarchy: { text: 'social stratification and class distinctions', conflicts: ['freedom'] },
  history: { text: 'remembrance of the past and memorializing history' },
  honor: { text: 'honesty and truthfulness in speech and action', conflicts: ['subterfuge'] },
  hospitality: { text: 'generosity and welcoming of strangers' },
  humility: { text: 'self-effacement and modesty' },
  industry: { text: "hard work and diligence in one's profession" },
  intellect: { text: 'education and knowledge-seeking' },
  imperialism: { text: "spreading one's culture and religion" },
  justice: { text: 'fairness and impartiality in decision-making' },
  logic: { text: 'humanistic reason and "rational" religion' },
  loyalty: { text: 'faithfulness towards friends and figures of authority' },
  lust: { text: 'seductive charm and sexual license' },
  might: { text: 'aggression, raw strength, and martial prowess', conflicts: ['diplomacy'] },
  nature: { text: 'harmony with nature and existing life' },
  legalism: { text: 'strict adherence to the law and order' },
  philosophy: { text: 'abstract thought and contemplation' },
  purity: { text: 'ethnic purity of blood and culture', conflicts: ['adaptation'] },
  revanchism: { text: 'restoring some real or imagined glorious past' },
  sacrifice: { text: "personal sacrifice for one's causes or purposes" },
  seafaring: { text: 'expertise in navigation and living at sea', constraints: { coastal: true } },
  stewardship: { text: 'guardianship of their own land and holy sites' },
  stoicism: { text: 'patience and restraint in the face of adversity' },
  subterfuge: { text: 'subtlety and indirectness of action' },
  tenacity: { text: 'persevering and surviving against all odds' },
  vengeance: { text: 'execution of just vendettas', conflicts: ['forgiveness'] },
  wealth: { text: 'prosperity and accruing material wealth', conflicts: ['austerity'] },
  zeal: { text: 'piety and devotion to religious ideals' }
}

const visual: CultureVisual = {
  'abstract paintings': {
    text: 'artworks that do not depict objects in the natural world, but instead use colors and forms in a non-representational way'
  },
  'realistic sketches': {
    text: 'detailed, lifelike drawings of subjects ranging from nature to portraiture, capturing minute details',
    constraints: { tribal: false }
  },
  'mosaic patterns': {
    text: 'designs created by arranging small colored pieces of hard material, like stone or tile',
    constraints: { tribal: false }
  },
  'stained glass designs': {
    text: 'colored glass pieces arranged to form pictures or patterns, often seen in religious settings',
    constraints: { tribal: false }
  },
  'pictorial tapestries': {
    text: 'large woven artworks depicting detailed scenes or stories'
  },
  'iconographic portraits': {
    text: 'representations of sacred figures or deities with symbolic attributes',
    constraints: { tribal: false }
  },
  'geometric designs': {
    text: 'regular and mathematically precise patterns, often used in architectural decoration'
  },
  'calligraphic art': {
    text: 'visual art with beautifully styled lettering or script'
  },
  'scroll paintings': {
    text: 'artworks on long pieces of paper or silk, often telling a story from start to finish'
  },
  'ritualistic masks': {
    text: 'masks adorned with paints, beads, and other materials, used in ceremonies or performances',
    constraints: { tribal: true }
  },
  'landscape paintings': {
    text: 'artworks depicting natural scenery without any human figures',
    constraints: { tribal: false }
  },
  'ornamental textiles': {
    text: 'fabrics adorned with intricate embroidery or weaving'
  },
  'beaded mosaics': {
    text: 'designs made by meticulously arranging colored beads'
  },
  'narrative murals': {
    text: 'large-scale paintings on walls narrating historical events or legends'
  },
  'architectural carvings': {
    text: 'artful designs chiseled onto buildings, bridges, or columns, showcasing design trends or religious themes'
  },
  'shrine embellishments': {
    text: 'decorations specific to sacred spaces, enhancing their spiritual ambiance'
  },
  'basketry with dyes': {
    text: 'baskets colored with natural dyes in intricate patterns'
  },
  'family heraldry or clan sigils': {
    text: 'emblematic representations of family names or clans, indicating lineage, honor, and loyalty'
  },
  'nature-inspired motifs': {
    text: 'designs based on animals, trees, flowers, and other natural elements'
  },
  'bone accessories': {
    text: 'necklaces or bracelets made of animal bones, believed to provide strength',
    constraints: { tribal: true }
  },
  'shell decorations': {
    text: 'incorporated into clothing or jewelry, symbolizing sea connections',
    constraints: { coastal: true, tribal: true }
  },
  'intricate metalwork': {
    text: 'Detailed designs on weapons, armor, or jewelry, sometimes inlaid with precious gems',
    constraints: { tribal: false }
  },
  'terracotta warriors': {
    text: 'life-sized or mini sculptures often used as grave goods or protective entities'
  },
  'charcoal portraits': {
    text: 'drawings made using charred sticks, capturing emotion and depth with raw, smudgy lines'
  },
  'origami mastery': {
    text: 'the art of paper folding, symbolizing transformation and delicate craftsmanship',
    constraints: { tribal: false }
  },
  'sand drawings': {
    text: 'intricate artworks created with sand or powder, depicting tales, histories, and moral lessons',
    constraints: { wet: false }
  },
  'artistic gardens': {
    text: 'the aesthetic practice of floral arrangement, emphasizing nature and harmony'
  },
  'golden flaws': {
    text: 'the art of repairing broken pottery with gold, valuing flaws and embracing imperfection'
  },
  'hand-carved woodwork': {
    text: 'artisans creating intricate patterns on furniture and structures'
  },
  'tattoo traditions': {
    text: 'permanent designs inked on the body, indicating status, achievements, or affiliations'
  },
  'ritualistic body paint': {
    text: 'temporary art applied to the skin for ceremonies or milestones',
    constraints: { tribal: true }
  }
}
const performances: CulturePerformances = {
  'harmonic chants': {
    text: 'multiple voices blending in harmonious intonation'
  },
  'drum-based rhythms': {
    text: 'strong emphasis on percussion elements to set the pace'
  },
  'string melodies': {
    text: 'harps, lutes, and zithers accompany many tales and histories'
  },
  'wind instruments': {
    text: 'flutes, pipes, and horns are common and central to the musical tradition'
  },
  'cyclical rhythms': {
    text: 'repetitive rhythmic patterns that mimic cycles of nature'
  },
  improvisation: {
    text: 'musicians are expected to spontaneously create or modify music during performances'
  },
  'mournful laments': {
    text: 'slow, melancholic songs to express grief or sorrow'
  },
  'harmonious bells': {
    text: 'using bells or chimes to create harmonious sounds'
  },
  'courtly love songs': {
    text: 'romantic ballads often detailing unattainable love'
  },
  'vocal colorations': {
    text: 'use of the voice in unique ways, such as yodeling or throat singing'
  },
  'crafting songs': {
    text: 'melodies sung during crafting or building, guiding rhythms of work'
  },
  'sacred resonance': {
    text: 'songs using specific pitches believed to have spiritual significance'
  },
  'heroic anthems': {
    text: 'songs praising heroes, warriors, or legendary figures'
  },
  'a cappella harmony': {
    text: 'songs without instrumental accompaniment, emphasizing group unity'
  },
  'rhythmic footwork': {
    text: 'intricate steps and stomps in time with music'
  },
  'water puppetry': {
    text: 'elaborate shows using wooden figures on water, narrating folk tales and legends',
    constraints: { wet: true }
  },
  'ritual circles': {
    text: 'dancers form and move in circular patterns for ceremonial purposes'
  },
  'whirling dervishes': {
    text: 'continuous spinning, sometimes inducing trance-like states'
  },
  'seasonal swirls': {
    text: 'dances reflecting specific times of the year, such as spring blooms or autumnal falls',
    constraints: { seasonal: true }
  },
  'candlelit choreography': {
    text: 'dances performed in dim lighting or solely by candlelight'
  },
  'masked performances': {
    text: 'dancers wear masks to represent animals, deities, or ancestors'
  },
  'theatrical displays': {
    text: 'performances that blend drama, music, and dance, often telling stories or depicting legends'
  },
  'courtship calls': {
    text: 'dances traditionally performed during romantic pursuits'
  }
}

const flavors: CultureFlavors = {
  'sweet and sour': {
    text: 'tangy profiles often found in sauces and broths'
  },
  'smoky and charred': {
    text: 'flavors from grilled or roasted foods, especially meats'
  },
  'tangy and fermented': {
    text: 'sour tastes from fermented veggies or sauces'
  },
  'hot and sweet': {
    text: 'spicy dishes that are balanced with sweet elements'
  },
  'earthy and robust': {
    text: 'flavors from root vegetables and aged ingredients'
  },
  'fruity and spicy': {
    text: 'combinations of fresh fruit flavors with spices'
  },
  'tart and vinegary': {
    text: 'sharp tastes from pickling or vinegar inclusion'
  },
  'nutty and roasted': {
    text: 'profiles from roasted nuts or sesame seeds'
  },
  'briny and oceanic': {
    text: 'tastes from shellfish and sea-harvested plants',
    constraints: { coastal: true }
  },
  'fragrant and aromatic': {
    text: 'profiles from dishes using a variety of aromatic spices'
  },
  'bitter and refreshing': {
    text: 'from certain vegetables or teas'
  },
  'honeyed and floral': {
    text: 'sweet notes from honey or flower-infused dishes'
  },
  'garlicky and pungent': {
    text: 'robust profiles from dishes heavy on garlic or onions'
  },
  'hot and spicy': {
    text: 'intense heat from local chilies, lingering on the palate'
  },
  'sweet and savory': {
    text: 'the delicate balance between honeyed sweetness and meaty richness'
  },
  'earthy and nutty': {
    text: 'flavors rooted in grains, legumes, and groundnuts'
  },
  'bitter and aromatic': {
    text: 'hints of bitterness balanced with fragrant herbs'
  },
  'fresh and zesty': {
    text: 'light flavors accentuated by fresh herbs and citrus'
  },
  'rich and creamy': {
    text: 'deep flavors enhanced by ingredients like coconut or milk'
  },
  'salty and dried': {
    text: 'flavors from sun-dried or smoked ingredients'
  },
  'sharp and garlicy': {
    text: 'predominant notes of garlic in both raw and cooked dishes'
  },
  'herbal and green': {
    text: 'tastes dominated by fresh, leafy greens and herbs'
  },
  'pungent and fiery': {
    text: 'strong aromas and flavors from raw or fermented ingredients'
  },
  'cooling and minty': {
    text: 'refreshing tastes often found in drinks or desserts'
  },
  'sour and pickled': {
    text: 'flavors from ingredients preserved in brines or vinegars'
  },
  'woody and aromatic': {
    text: 'scents and tastes from bark or roots used in cooking'
  },
  'balsamic and aged': {
    text: 'deep flavors from aged vinegars or fermented sauces'
  },
  'herbaceous and fresh': {
    text: 'tastes dominated by herbs like parsley, rosemary, and thyme'
  },
  'rich and buttery': {
    text: 'creamy flavors enhanced by butter or lard'
  },
  'sweet and spiced': {
    text: 'a blend of sweetness with spices like cinnamon or nutmeg'
  },
  'salty and cured': {
    text: 'flavors from aged cheeses and cured meats'
  },
  'warming and spicy': {
    text: 'comforting tastes from spices like black pepper or cloves'
  },
  'mild and milky': {
    text: 'flavors from fresh cheeses or cream-based sauces'
  },
  'earthy and fungal': {
    text: 'tastes from mushrooms, truffles, or root vegetables'
  },
  'vinegary and sharp': {
    text: 'tartness from vinegar or wine reductions'
  },
  'crispy and crunchy': {
    text: 'from fried preparations or sun-dried ingredients'
  },
  'sugary and floral': {
    text: 'sweet notes, sometimes with floral undertones from certain plants'
  },
  'savory and robust': {
    text: 'hearty flavors from game meats and rich broths'
  },
  'sweet and tart': {
    text: 'a combination of berries and honey in many dishes'
  }
}
const dishes: CultureDishes = {
  'rice bowls': {
    text: 'simple, steamed rice often paired with various toppings like meats or vegetables'
  },
  'noodle soups': {
    text: 'long, stringy noodles served in a flavorful broth, sometimes with meat or veggies'
  },
  dumplings: {
    text: 'small pockets of dough filled with meats, veggies, or sweet fillings'
  },
  'grilled skewers': {
    text: 'various meats or vegetables grilled on sticks, often street food'
  },
  'sizzling pancakes': {
    text: 'thin, crispy pancakes filled with vegetables or meats, often street food'
  },
  curries: {
    text: 'rich, spicy stews made with a base of coconut milk or yogurt'
  },
  'fried rice': {
    text: 'stir-fried rice mixed with vegetables, meats, and spices'
  },
  'tea-infused dishes': {
    text: 'meals that incorporate tea leaves or flavors, often subtly'
  },
  'seafood stews': {
    text: 'hearty soups made with fresh fish and shellfish, seasoned richly',
    constraints: { coastal: true }
  },
  'steamed buns': {
    text: 'soft, fluffy buns filled with meat, vegetables, or sweet paste'
  },
  'cold salads': {
    text: 'dishes featuring cold noodles or vegetables with tangy dressings'
  },
  'spring rolls': {
    text: 'thin rice wrappers filled with veggies, meat, or seafood, served cold or fried'
  },
  'sizzling platters': {
    text: 'hot dishes often with meat and veggies served on an iron plate'
  },
  'meat pies': {
    text: 'baked dough filled with spiced meat mixtures'
  },
  'pickled vegetables': {
    text: 'various veggies fermented in brine or vinegar'
  },
  'rice cakes': {
    text: 'chewy, often in soups, stir-fries, or served with sweet syrup'
  },
  'stuffed leaves': {
    text: 'ingredients wrapped in leaves like grape or cabbage, then steamed'
  },
  kebabs: {
    text: 'skewered and grilled meat chunks, often served with flatbreads'
  },
  'dessert fritters': {
    text: 'sweet, fried dough balls often soaked in syrup or filled with sweet paste'
  },
  'fermented fish': {
    text: 'fish preserved through fermentation, used as a condiment or dish'
  },
  'flatbread feasts': {
    text: 'large communal meals where dishes are scooped up using bread'
  },
  'plantain platters': {
    text: 'both ripe and green plantains, cooked in a myriad of ways'
  },
  'cassava cakes': {
    text: 'starchy cassava turned into savory or sweet fried delights'
  },
  'leafy green sauté': {
    text: 'local greens flash-fried with garlic and chili'
  },
  'bean-filled pastries': {
    text: 'savory pastries stuffed with seasoned beans or legumes'
  },
  'yam fritters': {
    text: 'grated yam combined with spices and then fried'
  },
  'hearty stews': {
    text: 'thick, rich pots often made with meat, root vegetables, and herbs'
  },
  'roasted game': {
    text: 'wild birds or animals cooked over open flames or in hearth ovens'
  },
  'savory pies': {
    text: 'crusty pastries filled with a mixture of meats, vegetables, and sometimes fruits'
  },
  'lentil soups': {
    text: 'broths based on lentils, sometimes accompanied by cured meats'
  },
  'cured sausages': {
    text: 'a variety of meats preserved with salt and spices, often smoked'
  },
  'fish in herbal sauces': {
    text: 'freshwater fish cooked with herbs and wine or vinegar',
    constraints: { wet: true }
  },
  'cheese tarts': {
    text: 'pastry filled with a mixture of cheese, eggs, and sometimes greens'
  },
  'honey cakes': {
    text: 'sweet cakes made with honey, spices, and dried fruits'
  },
  'fruit preserves': {
    text: 'fruits preserved in sugar, enjoyed as desserts or breakfast spreads'
  },
  'spiced wine': {
    text: 'wines infused with a mix of spices and sometimes sweetened'
  },
  'fermented drinks': {
    text: 'beverages made from maize, berries, or other fermentables'
  },
  'clam bakes': {
    text: 'clams and other seafood cooked in pits with heated stones',
    constraints: { coastal: true }
  }
}

const goodTraditions: CultureTraditionsGood = {
  'martial tournament': {
    text: 'a festival where warriors or knights demonstrate their prowess in combat, jousting, or archery competitions'
  },
  'masquerade balls': {
    text: 'an event where participants wear masks and costumes, hiding their identities and partaking in mystery and romance'
  },
  'midsummer revel': {
    text: 'honoring the longest day of the year with dances, bonfires, and maybe even some magical traditions',
    constraints: { seasonal: true }
  },
  'winter solstice': {
    text: "marking the shortest day and the longest night, celebrated with bonfires, feasts, and perhaps rituals to 'bring back the sun'",
    constraints: { seasonal: true }
  },
  'music carnival': {
    text: 'a lively event emphasizing local music and dance traditions, with everyone participating in vibrant costumes and rhythms'
  },
  'spring renewal': {
    text: 'celebrating the rebirth of nature with flowers, parades, and perhaps some rites of purification',
    constraints: { seasonal: true }
  },
  'moonlit procession': {
    text: 'a nocturnal parade or pilgrimage, perhaps tied to lunar cycles or specific celestial events'
  },
  'lanterns of hope': {
    text: 'floating lanterns are released on water or in the sky, carrying wishes, memories, or prayers'
  },
  'light celebration': {
    text: 'lanterns, or torches illuminate the night to symbolize victory of light over darkness'
  },
  'wind festivals': {
    text: 'the skies are filled with kites or other wind-catching devices, symbolizing freedom, aspirations, or celestial connections'
  },
  'betrothal tokens': {
    text: 'customary rituals or gifts exchanged between families to solidify marriage agreements'
  },
  'moonlit serenades': {
    text: 'romantic tradition of lovers serenading under the moonlight, playing instruments or singing'
  },
  'grove commune': {
    text: 'regular gatherings in sacred groves or forests for spiritual connection and community discussions'
  },
  'burning regrets': {
    text: 'writing down regrets on paper and burning them in a communal fire for catharsis'
  },
  'hushed courtship': {
    text: 'a tradition where couples communicate their affections secretly, using coded messages or tokens'
  },
  'festival of color': {
    text: 'celebrating diversity, change, or seasons by wearing vibrant, multi-colored attire'
  },
  'wandering wisdom': {
    text: 'elders traveling between communities to share knowledge and resolve disputes'
  },
  'sacred hunts': {
    text: 'ritualistic hunting expeditions with deep spiritual significance'
  },
  'oral storytelling': {
    text: 'elders passing down tales, wisdom, and history, preserving cultural memory'
  },
  'clan loyalty': {
    text: "strong group identity and obligations to one's extended clan or ethnic group"
  },
  'ancestral altars': {
    text: 'dedicated spaces in homes for ancestor worship, keeping family ties strong'
  },
  'pillars of peace': {
    text: 'erecting stone pillars inscribed with messages of peace and unity'
  },
  'tea ceremonies': {
    text: 'intricate rituals celebrating the art of tea preparation'
  },
  'warrior code': {
    text: 'abiding by honorable principles in battle and life'
  },
  'scholar gardens': {
    text: 'creating tranquil spaces for reflection and intellectual pursuit'
  },
  'songbird cultivation': {
    text: 'the care, training, and showcasing of songbirds, valuing their aesthetic and musical qualities',
    constraints: { wet: true }
  },
  'community work': {
    text: 'monthly community-wide efforts to clean, build, or repair shared spaces'
  },
  'rain ceremonies': {
    text: 'rituals invoking the heavens for rainfall, crucial for agriculture-dependent societies'
  },
  'water festivals': {
    text: 'celebratory rituals honoring spirits believed to inhabit waters, featuring masks and dances',
    constraints: { wet: true }
  },
  'minstrel performances': {
    text: 'traveling musicians and poets entertaining towns with songs and tales'
  },
  'stone circle rituals': {
    text: 'ceremonies held at ancient stone circles to mark astronomical events or honor deities'
  },
  acupuncture: {
    text: "traditional medicinal practice using needles to balance the body's energy flows",
    constraints: { tribal: false }
  },
  'shipbuilding festivals': {
    text: 'commemorating the maritime heritage and invoking safe voyages',
    constraints: { coastal: true }
  },
  'ritualistic river baths': {
    text: 'spiritual cleansing in holy rivers seeking purification',
    constraints: { wet: true }
  },
  'family collectives': {
    text: 'extended families living together and pooling resources'
  },
  'poetic gatherings': {
    text: 'evenings dedicated to reciting and appreciating classical poetry'
  },
  'berserker rituals': {
    text: 'warrior ceremonies invoking animal spirits for enhanced battle prowess',
    constraints: { tribal: true }
  },
  'astronomical insights': {
    text: 'deep understanding of celestial bodies guiding agricultural and ritual practices'
  },
  'communal dining': {
    text: 'collective meals strengthening community bonds and sharing resources'
  },
  'warrior braids': {
    text: 'complex hair braiding signifying martial achievements or clan allegiance'
  },
  'draped turbans': {
    text: 'head wraps varying in style and size based on region or social standing',
    constraints: { wet: false }
  },
  'bone accessories': {
    text: 'necklaces or bracelets made of animal bones, believed to provide strength',
    constraints: { tribal: true }
  },
  'shell decorations': {
    text: 'incorporated into clothing or jewelry, symbolizing sea connections',
    constraints: { coastal: true, tribal: true }
  },
  'intricate metalwork': {
    text: 'Detailed designs on weapons, armor, or jewelry, sometimes inlaid with precious gems',
    constraints: { tribal: false }
  },
  'tattoo traditions': {
    text: 'permanent designs inked on the body, indicating status, achievements, or affiliations'
  },
  'ritualistic body paint': {
    text: 'temporary art applied to the skin for ceremonies or milestones',
    constraints: { tribal: true }
  },
  'sand drawings': {
    text: 'intricate artworks created with sand or powder, depicting tales, histories, and moral lessons',
    constraints: { wet: false }
  },
  'gift giving': {
    text: 'elaborate gift giving ceremonies as a way of cementing social bonds, showing respect, or marking important occasions'
  }
}
const badTraditions: CultureTraditionsBad = {
  'polygamous marriages': {
    text: 'marriages with multiple partners, sanctioned by tradition or religion; often leading to jealousy and conflict'
  },
  'incestuous inbreeding': {
    text: 'marriages between close relatives to maintain the purity of sacred bloodlines, leading to genetic disorders and deformities'
  },
  'debt slavery': {
    text: 'a system where people are forced into labor to repay debts, often in exploitative conditions'
  },
  'sacrifice of wealth': {
    text: 'periodically, valuable items are thrown into deep lakes or buried as offerings to unseen forces'
  },
  'ritual dueling': {
    text: 'disputes often settled through formalized duels and trials by combat'
  },
  'blood feuds': {
    text: 'long-standing animosities between clans or tribes, leading to continuous cycles of violence'
  },
  'binding beauty': {
    text: 'tight binding of feet for aesthetic ideals, despite pain and deformity'
  },
  'cursed castes': {
    text: 'a system designating certain individuals as outcasts, stigmatized and discriminated against'
  },
  'criminal branding': {
    text: 'marking lawbreakers or lower classes with distinctive tattoos or brands, stigmatizing them for life'
  },
  'veil of vice': {
    text: "forcing certain minority groups to wear identifying garments, marking them as 'other'"
  },
  'harrowing hunts': {
    text: 'pursuing and hunting a human as a rite of passage or punishment'
  },
  'cultural isolation': {
    text: 'policies preventing external influence, cutting off international trade and diplomacy'
  },
  'concubinage system': {
    text: 'a hierarchy where women are kept as secondary partners without the full rights of wives'
  },
  'funeral immolation': {
    text: "pressuring widows to self-immolate on their husband's pyre"
  },
  'cannibalistic rituals': {
    text: 'consuming human flesh in rituals, believed to transfer the strength or virtues of the consumed'
  },
  'slave trade': {
    text: 'capturing and selling individuals as property, leading to immense suffering and societal rifts'
  },
  'witch trials': {
    text: 'persecution of individuals, often women, accused of witchcraft leading to torture or execution'
  },
  'forced relocations': {
    text: 'moving conquered peoples to solidify control and ensure loyalty'
  },
  'literacy restrictions': {
    text: 'education and the ability to read being limited to a privileged elite, keeping the masses uninformed',
    constraints: { tribal: false }
  },
  'land grabbing': {
    text: 'powerful elites or families unlawfully seizing lands from the less powerful, leading to displacement and conflict'
  },
  serfdom: {
    text: 'a system binding peasants to land, restricting their freedoms and subjugating them to lords',
    constraints: { tribal: false }
  },
  scalping: {
    text: 'removing the scalp of enemies as war trophies; often a ritualistic practice',
    constraints: { tribal: true }
  },
  'burial sacrifices': {
    text: 'occasionally sacrificing servants, horses, or valuables to accompany deceased nobility'
  },
  'blood oaths': {
    text: 'dangerous loyalty pacts, sometimes involving mutual blood-drinking'
  },
  'desertion punishments': {
    text: 'severe consequences for warriors deserting or betraying their oaths during campaigns'
  },
  'forced conscription': {
    text: 'compelling young men into military service, sometimes at the expense of their families'
  },
  'banned arts': {
    text: 'suppression of certain art forms deemed untraditional or subversive',
    constraints: { tribal: false }
  },
  'class-based attire': {
    text: 'strict clothing codes signifying class and status, restricting social mobility',
    constraints: { tribal: false }
  },
  'rigid matchmaking': {
    text: 'marriage seen as family unions, sometimes sacrificing individual happiness for status'
  },
  'honorable death': {
    text: 'ritualized suicide for atoning failures or preserving honor, often enforced'
  },
  'hostage system': {
    text: 'higher-class children held as political collateral, ensuring loyalty'
  },
  'hierarchy rituals': {
    text: 'rigorous ceremonial bowing to superiors, enforcing strict hierarchical acknowledgment',
    constraints: { tribal: false }
  },
  'hereditary professions': {
    text: 'trades or crafts limited by birth, restricting social mobility and innovation'
  },
  'forbidden folklore': {
    text: 'state-censored tales or songs, suppressing local identities or histories',
    constraints: { tribal: false }
  },
  'bride prices': {
    text: 'significant dowries required for marriages, causing financial burdens on families'
  },
  'shunned twins': {
    text: 'beliefs that twins harbored bad luck, leading to social exclusion'
  },
  'royal seclusion': {
    text: 'isolating the royalty, leading to disconnection and misunderstanding between rulers and subjects',
    constraints: { tribal: false }
  },
  'child marriages': {
    text: 'early unions due to social norms, often disregarding child welfare'
  },
  'plundering raids': {
    text: 'tribes attacking settlements or other tribes for loot and dominance',
    constraints: { tribal: true }
  },
  'pillage rites': {
    text: 'ceremonial looting of conquered lands as symbols of dominance',
    constraints: { tribal: true }
  },
  'language imposition': {
    text: 'strictly enforcement ruling language in conquered territories, sidelining local languages',
    constraints: { tribal: false }
  }
}

const distantClimates: (keyof Climate)[] = ['polar', 'tropical rainforest']

const tribalLands: (keyof Climate)[] = ['hot steppe', 'cold desert', 'cold steppe', 'savanna']

export const CULTURE = {
  arts: { performances, visual },
  coastal: (culture: Culture) => CULTURE.regions(culture).some(r => r.coastal),
  cuisine: { flavors, dishes },
  culturize: (culture: Culture, nation: Region) => {
    // generate a regional name
    nation.name = LANGUAGE.word.unique({ lang: culture.language, key: 'region' })
    // generate settlement names
    REGION.provinces(nation).forEach(settlement => {
      settlement.name ||= LANGUAGE.word.unique({ lang: culture.language, key: 'settlement' })
    })
  },
  distant: (culture: Culture) => {
    const regions = CULTURE.regions(culture)
    const distant = regions.reduce((sum, r) => {
      const isRemote = distantClimates.includes(r.climate)
      return sum + (isRemote ? 1 : 0)
    }, 0)
    return distant / regions.length > 0.5
  },
  expand: (culture: Culture, nation: Region) => {
    // increment region count
    culture.regions.push(nation.idx)
    // set the native species for the region
    nation.culture = culture.idx
  },
  finalize: (culture: Culture, species: Culture['species']) => {
    culture.species = species
    const civil = CULTURE.regions(culture).filter(r => r.civilized).length * 2
    culture.civilized = civil > culture.regions.length
    culture.language = LANGUAGE.spawn(culture)
    culture.name = LANGUAGE.word.unique({ lang: culture.language, key: 'culture' })
    SPECIES.appearance(culture)
    culture.motifs = window.dice.choice([
      'culturally important animals',
      "rulers' faces or heraldry",
      'symbols of the dominant faith',
      'family heraldry or clan sigils',
      'important plants or local flora',
      'magically-meaningful runes',
      'decorative script or writing',
      'geometric shapes or patterns'
    ])
    culture.fashion.scheme = window.dice.choice([
      'dull, natural, earthen colors',
      'intensely bright, clashing colors',
      'reds, oranges, and warm hues',
      'bright but complementary colors',
      'intricate weaves of colors',
      'blues, greens, and cool hues',
      'subdued pastels and soft shades'
    ])
    // values
    const coastal = CULTURE.coastal(culture)
    const origin = window.world.regions[culture.origin]
    const wet = CLIMATE.lookup[origin.climate].terrain === 'forest'
    const seasonal = culture.zone !== 'tropical'
    const tribal = !origin.civilized
    culture.values = TRAIT.selection({
      available: CULTURE.values,
      used: window.world.cultures.map(c => c.values).flat(),
      current: culture.values,
      constraints: { coastal },
      samples: 3
    }).map(v => v.tag)
    culture.art = {
      performance: TRAIT.selection({
        current: [],
        available: CULTURE.arts.performances,
        used: window.world.cultures.map(c => c.art?.performance).filter(d => d),
        constraints: { wet, seasonal }
      })[0].tag,
      visual: TRAIT.selection({
        current: [],
        available: CULTURE.arts.visual,
        used: window.world.cultures.map(c => c.art?.visual).filter(f => f),
        constraints: { tribal, wet, coastal }
      })[0].tag
    }
    culture.cuisine = {
      dish: TRAIT.selection({
        current: [],
        available: CULTURE.cuisine.dishes,
        used: window.world.cultures.map(c => c.cuisine?.dish).filter(d => d),
        constraints: { coastal, wet }
      })[0].tag,
      flavor: TRAIT.selection({
        current: [],
        available: CULTURE.cuisine.flavors,
        used: window.world.cultures.map(c => c.cuisine?.flavor).filter(f => f),
        constraints: { coastal }
      })[0].tag
    }
    culture.traditions = {
      good: TRAIT.selection({
        current: [],
        available: CULTURE.traditions.good,
        used: window.world.cultures.map(c => c.traditions?.good).filter(d => d),
        constraints: { coastal, wet, seasonal, tribal }
      })[0].tag,
      bad: TRAIT.selection({
        current: [],
        available: CULTURE.traditions.bad,
        used: window.world.cultures.map(c => c.traditions?.bad).filter(f => f),
        constraints: { tribal }
      })[0].tag
    }
  },
  regions: (culture: Culture) => culture.regions.map(r => window.world.regions[r]),
  score: (culture: Culture) =>
    CULTURE.regions(culture)
      .map(r => CLIMATE.lookup[r.climate].population * (r.coastal ? 1.5 : 1))
      .reduce((sum, pop) => sum + pop, 0) / culture.regions.length,
  spawn: (region: Region) => {
    const idx = window.world.cultures.length
    const hue = window.dice.choice([...COLOR.hues])
    const culture: Culture = {
      idx,
      origin: region.idx,
      tag: 'culture',
      zone: CLIMATE.lookup[region.climate].zone,
      side: region.side,
      neighbors: [],
      fashion: {
        color: hue
      },
      display: COLOR.randomHue(hue),
      regions: [],
      name: '',
      species: 'human',
      lineage: window.dice.random > 0.1 ? 'male' : 'female',
      values: []
    }
    window.world.cultures.push(culture)
    return culture
  },
  traditions: { good: goodTraditions, bad: badTraditions },
  tribal: (culture: Culture) => {
    const regions = CULTURE.regions(culture)
    const grass = regions.reduce((sum, r) => {
      const hasBiome = tribalLands.includes(r.climate)
      return sum + (hasBiome ? 1 : 0)
    }, 0)
    return grass / regions.length > 0.5
  },
  values
}
