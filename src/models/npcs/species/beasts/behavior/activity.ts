import { Beast } from '../types'

/**
 * determines the activity period of a species
 * @param location - spawn location
 * @returns activity period
 */
export const beast__activity = (desert: boolean) => {
  return window.dice.weighted_choice<Beast['activity_period']>([
    { v: 'diurnal', w: desert ? 0.35 : 0.65 },
    { v: 'nocturnal', w: desert ? 0.65 : 0.35 },
    { v: 'crepuscular', w: desert ? 0.1 : 0.01 },
    { v: 'cathemeral', w: 0.005 }
  ])
}

export const beast__abnormal_activity = ({ activity_period }: Beast) =>
  activity_period === 'cathemeral' || activity_period === 'crepuscular'
