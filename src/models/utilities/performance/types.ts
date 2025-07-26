import { PieData } from '../../../components/common/charts/types'
import { GenericFunction } from '../types'

export interface ProfileNode extends PieData {
  children: Record<string, ProfileNode> // child nodes
}

export interface Profiles {
  history: ProfileNode
  current: ProfileNode
}

export type ProfileParams<T> = { label?: string; f: () => T }

export type MemoCache = { store: Record<string, Record<string, unknown>> }

export type MemoDecorate<T, K extends unknown[]> = {
  f: GenericFunction<T, K>
  dirty?: (..._args: K) => boolean
  keyBuilder?: (..._args: K) => string
}
export type ProfileDecorate<T, K extends unknown[]> = {
  f: GenericFunction<T, K>
  name: string
}
export type PerfDecorate<T, K extends unknown[]> = MemoDecorate<T, K> & ProfileDecorate<T, K>
