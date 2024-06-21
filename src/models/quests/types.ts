import { Actor, Gender } from '../actors/types'
import { Difficulty } from '../utilities/difficulty'

export type AIGenQuest = {
  objective?: string
  complication?: string
  introduction?: string
  patron?: {
    occupation: Actor['profession']['key']
    gender: Gender
    age: Actor['age']
    background: string
  }
  steps?: {
    title: string
    introduction: string
    challenge: string
    setting: string
    transition: string
  }[]
}

export type Quest = {
  difficulty: Difficulty
  type: string
  enemies: string
  location: string
  patron: number
  complication: string
  introduction: string
  challenges: { type: string; text: string; setting: string }[]
}

export type Dungeon = {
  theme: string
  hostiles: string
  history?: string
  rooms?: {
    setting: string
    'combat encounter'?: string
    hazards?: string
    'treasure locations'?: string
    enigmas?: string
  }[]
}
