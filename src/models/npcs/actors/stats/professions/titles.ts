import { Actor } from '../../types'

interface GenderBasedTitleParams {
  male: string
  female: string
  actor: Actor
}

export const genderBasedTitle = ({ male, female, actor }: GenderBasedTitleParams) =>
  actor.gender === 'male' ? male : female
