import { scale } from '../../../../../utilities/math'
import { Loc } from '../../../types'
import { district__admin } from './templates/admin'
import { district__craftsman } from './templates/craftsman'
import { district__docks } from './templates/docks'
import { district__gate } from './templates/gate'
import { district__market } from './templates/market'
import { district__merchant } from './templates/merchant'
import { district__military } from './templates/military'
import { district__noble } from './templates/noble'
import { district__rural } from './templates/rural'
import { district__slums } from './templates/slums'
import { Block, District, DistrictTemplate } from './types'

export const districts: Record<District['type'], DistrictTemplate> = {
  administration: district__admin,
  noble: district__noble,
  merchant: district__merchant,
  craftsman: district__craftsman,
  market: district__market,
  military: district__military,
  gate: district__gate,
  docks: district__docks,
  slums: district__slums,
  rural: district__rural
}

export const districts__cutoff = (districts: number) =>
  scale([1, 3, 4, 11, 12, 25, 26, 200], [3, 3, 5, 5, 6, 6, 8, 8], districts)

export const districts__exterior = (params: { settlement: Loc; blocks: Block[] }) => {
  const { settlement, blocks } = params
  return Object.values(settlement.map.districts).filter(district =>
    blocks[district.block].n.some(n => !blocks[n].district)
  )
}
