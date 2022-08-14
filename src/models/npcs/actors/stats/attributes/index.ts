import { Actor } from '../../types'
import { profession__map, profession__social_class } from '../professions'
import { social_class } from '../professions/types'
import { attribute } from './types'

const social_class_weights: Record<social_class, number[][]> = {
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

const social_class_points: Record<social_class, number> = {
  lower: 64,
  middle: 66,
  upper: 68
}

const attribute_roll = (params: {
  weights: number[]
  points: number
  min: number
  max: number
}): Actor['attributes'] => {
  const { weights, points, min, max } = params
  const scores = window.dice
    .weighted_dist({ weights, std: 0.15, total: points })
    .map(w => Math.ceil(w))
  if (scores.some(score => score < min || score > max)) return attribute_roll(params)
  const [strength, dexterity, constitution, intellect, wisdom, charisma] = scores
  return { strength, dexterity, constitution, intellect, wisdom, charisma }
}

export const actor__attribute_roll = (actor: Actor) => {
  const social_class = profession__social_class(actor.occupation.key)
  const _weights =
    profession__map[actor.occupation.key].attributes ??
    window.dice.choice(social_class_weights[social_class])
  const weights = Array.isArray(_weights) ? _weights : _weights({ actor })
  const points = social_class_points[social_class]
  actor.attributes = attribute_roll({ weights, points, min: 8, max: 18 })
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

export const npc__describe_attributes = (
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
