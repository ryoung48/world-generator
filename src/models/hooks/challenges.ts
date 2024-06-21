export const CHALLENGES = {
  mobility: {
    text: 'acrobatics, dodging hazards, moving quickly through difficult terrain',
    variations: [
      { text: 'squeeze through a narrow passage without getting trapped' },
      { text: 'run across {crumbling|unstable|slippery|hazardous} ground without falling' },
      { text: 'dodge projectiles while navigating a dangerous location' },
      { text: 'weave through a crowd to chase a fleeing npc', type: 'community' }
    ]
  },
  stealth: {
    text: 'hiding, moving quietly, pickpocketing, lockpicking, disguises',
    variations: [
      { text: 'silently move through the area without alerting the inhabitants' },
      { text: '{pickpocket|steal} an object without being noticed', type: 'community' },
      { text: 'pick a lock to {reveal a dark secret|free prisoners}' },
      { text: 'stay hidden while eavesdropping on an important conversation', type: 'community' },
      { text: '{infiltrate|scout} the area using disguises to gather information' }
    ]
  },
  investigation: {
    text: 'searching locations, finding people, solving puzzles',
    variations: [
      { text: 'track down an elusive npc by interviewing locals', type: 'community' },
      { text: 'decipher a cryptic {inscription|riddle|map} to unlock a secret' },
      {
        text: 'search the area for {a {hidden clue|rare object}|concealed compartments|hidden chambers}'
      },
      { text: 'analyze the scene of a crime to determine what happened' }
    ]
  },
  knowledge: {
    text: 'recalling facts about arcana, history, laws, myths, etiquette, and religions',
    variations: [
      { text: 'recall etiquette needed when addressing an important npc', type: 'community' },
      { text: 'identify scattered {arcane|religious} symbols in the area' },
      {
        text: 'remember an important {historical|religious} {event|figure} that relates to the area'
      },
      { text: 'perform an old {religious|arcane} ritual in order to break a curse' },
      { text: 'recall a local {law|custom} that is being broken by an npc', type: 'community' }
    ]
  },
  perception: {
    text: 'notice fine details through sight, hearing, & smell',
    variations: [
      { text: 'spot {a hidden|an illusory} entrance within the area' },
      { text: 'notice a concealed trap in a dimly lit corridor' },
      { text: 'hear the faint {whispering|rustling} of nearby hidden enemies' },
      { text: 'hear a distant cry for help masked by the ambient sounds of the area' },
      { text: 'notice signs of recent passage in the area' },
      { text: 'spot an almost invisible {mark|inscription} made on a {map|manuscript|artifact}' },
      { text: 'notice the slight discoloration of a drink, warning of poison', type: 'community' },
      { text: 'notice a {suspicious|unusual} npc {in a crowd|following you}', type: 'community' }
    ]
  },
  insight: {
    text: 'detecting lies, emotions, and intent of others',
    variations: [
      { text: "detect the subtle tell of an npc who's not being truthful" },
      { text: "understand the underlying jealousy in a npc's compliments" },
      { text: "perceive the hidden sorrow behind an npc's stern demeanor", type: 'community' },
      { text: "sense the underlying tension in an npc's jovial facade" },
      { text: "catch the fleeting expression of guilt on a suspect's face", type: 'community' },
      { text: "understand the true motive behind a benefactor's generosity", type: 'community' },
      { text: "notice the signs of distrust in an npc's casual questions", type: 'community' },
      { text: "perceive the flicker of recognition in a stranger's eyes", type: 'community' },
      { text: "sense the suppressed anger in an ally's voice" },
      {
        text: "recognize the signs of enchantment affecting an individual's emotions",
        type: 'community'
      },
      { text: 'detect the signs of a potential betrayal in a trusted ally' }
    ]
  },
  survival: {
    text: 'recalling facts about nature, navigation, handling animals, tracking, and medicine',
    variations: [
      { text: 'navigate a maze of twisting passages using natural landmarks', type: 'wilderness' },
      {
        text: 'track a quarry through the wilderness by recognizing its unique signs',
        type: 'wilderness'
      },
      {
        text: "recognize the scent of a dangerous creature's territory to avoid it",
        type: 'wilderness'
      },
      {
        text: 'harvest and prepare a medicinal herb to counteract a venomous bite',
        type: 'wilderness'
      }
    ]
  },
  persuasion: {
    text: 'influencing people through negotiation, charm, oration, deception, or intimidation',
    variations: [
      {
        text: "convince a hostile npc to {stand down|help you|spare the lives of innocents|reveal their employer's identity}"
      },
      {
        text: '{trick|bribe|intimidate|charm} a reluctant npc into {revealing a secret|giving you an item|letting you pass|look the other way}'
      },
      { text: 'negotiate a {peaceful|mutually beneficial} resolution to a conflict' },
      {
        text: 'charm a merchant into {giving you a discount|selling rare inventory}',
        type: 'community'
      },
      { text: "win a crowd's support for your cause through stirring oration", type: 'community' },
      { text: 'intimidate a traitor into revealing their co-conspirators', type: 'community' },
      {
        text: 'convince an official to reconsider a {law|decree} detrimental to the patron',
        type: 'community'
      }
    ]
  },
  athletics: {
    text: 'running, jumping, climbing, swimming, lifting, throwing, and overcoming obstacles with brute force',
    variations: [
      { text: 'climb a sheer surface to reach a higher location' },
      { text: 'swim through a {flooded area|strong current}' },
      { text: 'push aside heavy debris that is obscuring the path' },
      { text: 'break through a {locked door|weak barrier}' },
      { text: 'leap across a perilous gap' }
    ]
  }
}
