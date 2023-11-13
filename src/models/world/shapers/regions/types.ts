import { Region } from '../../../regions/types'

export type RegionBorders = Record<number, Record<number, Set<number>>> // region -> region -> cells
export type RegionAddBordersParams = {
  borders: RegionBorders
  r1: Region
  r2: Region
  c1: number
  c2: number
}
