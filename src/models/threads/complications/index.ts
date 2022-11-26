import { Thread } from '../types'
import { Complication } from './types'

const complication__definition: Record<Complication['tag'], Complication> = {
  anonymity: {
    tag: 'anonymity',
    type: ['goal'],
    text: () => `The objective must be completed without revealing the patron's identity.`
  },
  appeal: {
    tag: 'appeal',
    type: ['task'],
    text: () =>
      `The foe appeals to the PCs and makes them an offer to switch sides against the interests of the patron.`
  },
  betrayal: {
    tag: 'betrayal',
    type: ['task'],
    text: () => `An ally has betrayed the patron and created a dangerous situation.`
  },
  blackmail: {
    tag: 'blackmail',
    type: ['goal'],
    text: () =>
      `The patron has strong leverage ({secrets|threats|debts}) on the PCs and is using this blackmail to force cooperation.`
  },
  bolster: {
    tag: 'bolster',
    type: ['task'],
    text: () =>
      `The foe {joins forces with another enemy of the patron|acquires a powerful new ally ({blackmail|contract})}.`
  },
  chaos: {
    tag: 'chaos',
    type: ['goal', 'task'],
    text: () =>
      `Unrelated third party involvement ({guards|military|criminal|religious|mercantile|artisans|peasants}) complicates the issue.`
  },
  competition: {
    tag: 'competition',
    type: ['goal'],
    text: () => `The objective must be completed while competing with a rival group.`
  },
  conflict: {
    tag: 'conflict',
    type: ['task'],
    text: () =>
      `There is disagreement between the PCs and their allies on how to best complete this task.`
  },
  cooperation: {
    tag: 'cooperation',
    type: ['task'],
    text: () =>
      `The PCs is forced to work with the foe temporarily to {complete this objective|overcome a greater threat}.`
  },
  curse: {
    tag: 'cooperation',
    type: ['goal'],
    valid: thread => thread.goal.tag === 'cursed',
    text: () =>
      `{The curse is tied to an innocent local's life|The locals have a badly wrong idea how to lift it|The curse is a fake, a cover for some dark crime}.`
  },
  damaged: {
    tag: 'damaged',
    type: ['goal', 'task'],
    text: () => `A key {item|person} essential to the patron's objective is {cursed|broken|stolen}.`
  },
  diplomatic: {
    tag: 'diplomatic',
    type: ['goal', 'task'],
    text: () =>
      `This objective must be completed with as little {violence|collateral damage} as possible.`
  },
  duplicates: {
    tag: 'duplicates',
    type: ['goal'],
    valid: thread => thread.goal.tag === 'retrieval' || thread.goal.tag === 'heist',
    text: () =>
      `There are many examples of a key object needed to complete the objective, all but one fake.`
  },
  essential: {
    tag: 'essential',
    type: ['task'],
    text: () =>
      `It is revealed that the foe has {key information|hostages} needed to complete the objective, which forces the PCs to negotiate.`
  },
  facade: {
    tag: 'facade',
    type: ['task'],
    text: () => `The foe establishes a good public facing image and gains general local support.`
  },
  hostile: {
    tag: 'hostile',
    type: ['task'],
    text: () =>
      `A {potential ally|neutral actor} {does not like the {patron|PCs}|was a former foe|is {bad|unpleasant}|might be working for the foe} and cannot be trusted.`
  },
  intrigue: {
    tag: 'intrigue',
    type: ['task'],
    text: () =>
      `The foe reveals a secret about the {PCs|patron|allies} that causes {internal|external} {mistrust|confusion}.`
  },
  mastermind: {
    tag: 'mastermind',
    type: ['task'],
    text: () => `It is discovered that the foe is being {blackmailed|led} by a greater villain.`
  },
  misinformation: {
    tag: 'misinformation',
    type: ['task'],
    text: () =>
      `The PCs have received {false|extraneous|incomplete} information, which has {delayed the objective|created a dangerous situation}.`
  },
  motivations: {
    tag: 'motivations',
    type: ['goal'],
    text: () =>
      `The patron seeks to {redeem themselves|avenge a past wrong{| done to a {friend|relative}}}.`
  },
  morality: {
    tag: 'morality',
    type: ['goal', 'task'],
    text: () =>
      `The objective {has an easy, but morally repugnant, solution ({cruel|bloody|destructive|deceptive|greedy|illegal|taboo})|helps a morally repugnant actor ({neutral|paton|foe})}.`
  },
  obscure: {
    tag: 'obscure',
    type: ['goal'],
    text: () => `The identity of the foe is unknown.`
  },
  reinforcements: {
    tag: 'reinforcements',
    type: ['task'],
    text: () => `Reinforcements arrive to support the foe's schemes.`
  },
  removal: {
    tag: 'removal',
    type: ['task'],
    text: () =>
      `{An ally|The patron} has {died|disappeared|been imprisoned|been coerced} and will no longer be able to support the objective.`
  },
  resources: {
    tag: 'resources',
    type: ['task'],
    text: () =>
      `The foe has obtained essential {resources|object|information} needed to advance their plans.`
  },
  safety: {
    tag: 'safety',
    type: ['task'],
    text: () => `The PCs become responsible for the safety of an ({innocent|vulnerable}) actor.`
  },
  scattered: {
    tag: 'scattered',
    type: ['goal', 'task'],
    text: () => `The map or lead to the objective is in widely-scattered parts.`
  },
  solitude: {
    tag: 'solitude',
    type: ['goal'],
    text: () =>
      `The locals are {unhelpful in regards to|hostile to|afraid to help with} the patron's cause. This will make allies hard to come by.`
  },
  tainted: {
    tag: 'tainted',
    type: ['goal'],
    valid: thread => thread.goal.tag === 'negotiate',
    text: () =>
      `{An enemy is poisoning their mind against the patron|The actor is afraid of the consequences of cooperating}.`
  },
  time: {
    tag: 'time',
    type: ['goal', 'task'],
    text: () =>
      `The objective is time sensitive ({limited resources|escalating tensions|upcoming event}).`
  },
  transient: {
    tag: 'transient',
    type: ['goal'],
    valid: thread =>
      thread.goal.tag === 'retrieval' ||
      thread.goal.tag === 'heist' ||
      thread.goal.tag === 'rescue',
    text: () => `An essential {actor|object} moves constantly, so locations go stale rapidly.`
  },
  treachery: {
    tag: 'treachery',
    type: ['task'],
    text: () =>
      `The {patron has betrayed the PCs after dealing with the foe and enlists minions to remove loose ends|patron's hidden ({dangerous|treacherous}) motives reveal them as the true foe (original foe becomes {the patron|an ally of the foe})}.`
  },
  trust: {
    tag: 'trust',
    type: ['goal'],
    text: () =>
      `{The ({patron|allies}) cannot be trusted|will betray the PCs at earliest opportunity}.`
  },
  untouchable: {
    tag: 'untouchable',
    type: ['goal'],
    text: () =>
      `The foe is {well-respected|above the law} with many resources and favors at their disposal.`
  },
  weaken: {
    tag: 'weaken',
    type: ['task'],
    text: () =>
      `The foe {destroy|plunder}s {information|an object} that is vital to the patron's plans.`
  }
}

export const complication__spawn = (params: {
  thread: Thread
  type: Complication['type'][number]
}) => {
  const { thread, type } = params
  const blacklist = [thread.stages.slice(-1)[0]?.complication?.tag ?? thread.complication?.tag]
  const complication = window.dice.choice(
    Object.values(complication__definition).filter(
      prospect =>
        prospect.type.includes(type) &&
        !blacklist?.includes?.(prospect.tag) &&
        (prospect.valid?.(thread) ?? true)
    )
  )
  thread.difficulty.cr *= window.dice.uniform(1.25, 1.75)
  const text = window.dice.spin(complication.text())
  return {
    tag: complication.tag,
    text
  }
}
