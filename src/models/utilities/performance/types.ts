import { PieData } from '../../../components/codex/common/charts/types'

export interface ProfileNode extends PieData {
  children: Record<string, ProfileNode> // child nodes
}

export interface Profiles {
  history: ProfileNode
  current: ProfileNode
}

export type ProfileParams<T> = { label?: string; f: () => T }

export type MemoCache = { store: Record<string, Record<string, unknown>> }

type GenericFunction<T, K extends unknown[]> = (..._args: K) => T

export type MemoDecorate<T, K extends unknown[]> = {
  f: GenericFunction<T, K>
  dirty?: (..._args: K) => boolean
  set?: (_cache: Record<string, T>, _result: T, ..._args: K) => void
}
export type ProfileDecorate<T, K extends unknown[]> = {
  f: GenericFunction<T, K>
  name: string
}
export type PerfDecorate<T, K extends unknown[]> = MemoDecorate<T, K> & ProfileDecorate<T, K>
