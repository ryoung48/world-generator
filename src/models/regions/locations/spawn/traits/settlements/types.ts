import { settlement__conflict } from './conflicts/types'
import { settlement__environment } from './environment/types'
import { settlement__faction } from './factions/types'

export type community__trait = settlement__conflict | settlement__environment | settlement__faction
