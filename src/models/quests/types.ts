import { Difficulty } from '../utilities/difficulty'

export type Quest = {
  patron: number
  difficulty: Difficulty
  type: string
  enemies: string
}
