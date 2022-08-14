import { Thorns } from './types'

export const primordial__random_thorns = (type: Thorns['type']): Thorns => {
  const dense = window.dice.flip
  return {
    type,
    sharpness: window.dice.weighted_choice([
      { v: 'sharp', w: 0.8 },
      { v: 'tapered', w: 0.2 }
    ]),
    density: dense ? window.dice.choice(['thick', 'thin']) : undefined,
    length: !dense ? window.dice.choice(['long', 'short']) : undefined,
    color: window.dice.choice([
      'green',
      'olive',
      'yellow',
      'amber',
      'orange',
      'vermilion',
      'red',
      'white',
      'grey',
      'greyish-green',
      'greyish-olive',
      'beige'
    ])
  }
}
