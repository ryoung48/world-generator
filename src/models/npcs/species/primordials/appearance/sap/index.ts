import { Sap } from './types'

export const primordial__random_sap = (): Sap => {
  return {
    texture: window.dice.choice(['sticky', 'oily', 'watery']),
    color: window.dice.choice([
      'purple',
      'magenta',
      'red',
      'vermilion',
      'orange',
      'amber',
      'yellow',
      'olive',
      'green'
    ])
  }
}
