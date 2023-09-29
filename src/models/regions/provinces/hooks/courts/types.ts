import { TaggedEntity } from '../../../../utilities/entities/types'

export type Court = TaggedEntity & {
  tag: 'court'
  subtitle: string
  theme: {
    label: string
    text: string
  }
  actors: number[]
  conflict: string
  defense: string
  consequence: string
}

type CourtActor = {
  title: string
  elderly?: boolean
  veteran?: boolean
  adult?: boolean
  youngAdult?: boolean
  foreign?: boolean
}

export type CourtTemplate = {
  title: string
  theme: {
    text: string
    types: string[]
  }
  actors: {
    major: CourtActor[]
    minor: CourtActor[]
    power: string[]
  }
  conflicts: string[]
  consequences: string[]
  defenses: string[]
}
