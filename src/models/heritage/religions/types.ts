export type ReligionType =
  | 'animistic'
  | 'syncretic'
  | 'monotheistic'
  | 'dualistic'
  | 'polytheistic'
  | 'nontheistic'
  | 'pluralistic'
  | 'atheistic'
  | 'machine cult'

export interface Religion {
  type: ReligionType
  name?: string
  display?: { color: string; hue: number }
}

export interface ReligionSpawnParams {
  cultures: number[]
}
