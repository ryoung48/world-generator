import { DrawMapParams } from '../common/types'

export type DrawInfraParams = DrawMapParams & { nationSet: Set<number> }
