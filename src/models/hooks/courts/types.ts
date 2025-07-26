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
  }
  conflicts: string[]
  locations: {
    label: string
    tooltip: string
    explanation?: string
  }[]
}
