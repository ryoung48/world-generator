import { Actor } from '../../types'
import { profession__map, profession__socialClass } from '../professions'
import { SocialClass } from '../professions/types'
import { attribute } from './types'

const socialClassWeights: Record<SocialClass, number[][]> = {
  lower: [
    [12, 12, 9, 9, 9, 9],
    [11, 11, 10, 10, 9, 9],
    [11, 11, 11, 9, 9, 9]
  ],
  middle: [[10, 10, 10, 10, 10, 10]],
  upper: [
    [9, 9, 9, 11, 11, 11],
    [9, 9, 10, 10, 11, 11],
    [9, 9, 9, 9, 12, 12]
  ]
}

const socialClassPoints: Record<SocialClass, number> = {
  lower: 64,
  middle: 66,
  upper: 68
}

const attributeRoll = (params: {
  weights: number[]
  points: number
  min: number
  max: number
}): Actor['attributes'] => {
  const { weights, points, min, max } = params
  const scores = window.dice
    .weightedDist({ weights, std: 0.15, total: points })
    .map(w => Math.ceil(w))
  if (scores.some(score => score < min || score > max)) return attributeRoll(params)
  const [strength, dexterity, constitution, intellect, wisdom, charisma] = scores
  return { strength, dexterity, constitution, intellect, wisdom, charisma }
}

export const actor__attributeRoll = (actor: Actor) => {
  const socialClass = profession__socialClass(actor.occupation.key)
  const _weights =
    profession__map[actor.occupation.key].attributes ??
    window.dice.choice(socialClassWeights[socialClass])
  const weights = Array.isArray(_weights) ? _weights : _weights({ actor })
  const points = socialClassPoints[socialClass]
  actor.attributes = attributeRoll({ weights, points, min: 8, max: 18 })
}

const attribute__descriptors: Record<attribute, [string, string, string, string]> = {
  strength: ['weak', 'average', 'strong', 'powerful'],
  dexterity: ['clumsy', 'average', 'agile', 'graceful'],
  constitution: ['frail', 'average', 'healthy', 'robust'],
  intellect: ['dim', 'average', 'smart', 'brilliant'],
  wisdom: ['oblivious', 'average', 'observant', 'farsighted'],
  charisma: ['dull', 'average', 'captivating', 'magnetic']
}

const attribute__describe = (params: { key: attribute; value: number }) => {
  const { key, value } = params
  if (value < 10) return attribute__descriptors[key][0]
  if (value < 13) return attribute__descriptors[key][1]
  if (value < 16) return attribute__descriptors[key][2]
  return attribute__descriptors[key][3]
}

export const npc__describeAttributes = (
  attributes: Actor['attributes']
): { attribute: string; value: number; desc: string }[] => {
  return [
    {
      attribute: 'Strength',
      value: attributes.strength,
      desc: attribute__describe({ key: 'strength', value: attributes.strength })
    },
    {
      attribute: 'Dexterity',
      value: attributes.dexterity,
      desc: attribute__describe({ key: 'dexterity', value: attributes.dexterity })
    },
    {
      attribute: 'Constitution',
      value: attributes.constitution,
      desc: attribute__describe({ key: 'constitution', value: attributes.constitution })
    },
    {
      attribute: 'Intellect',
      value: attributes.intellect,
      desc: attribute__describe({ key: 'intellect', value: attributes.intellect })
    },
    {
      attribute: 'Wisdom',
      value: attributes.wisdom,
      desc: attribute__describe({ key: 'wisdom', value: attributes.wisdom })
    },
    {
      attribute: 'Charisma',
      value: attributes.charisma,
      desc: attribute__describe({ key: 'charisma', value: attributes.charisma })
    }
  ]
}
