import { TaggedEntity } from '../utilities/codex/entities'

export const event_types = ['war', 'rebellion', 'diplomacy', 'health_check', 'succession'] as const

export type event_type = typeof event_types[number]

// generic events that trigger in the history sim
export interface EventRecord {
  text: string
  title: string
  time: number // ms
}

// major events have a well-defined duration
export interface MajorEvent extends TaggedEntity {
  start: number // ms
  end: number // ms
  type: event_type
}

export interface LogRecord extends EventRecord {
  idx: number
  event_idx?: number
  actors: { idx: number; wealth: number; max_wealth: number }[]
  type: event_type
}

export interface WorldEvent {
  time: number // ms
  type: event_type
}

export abstract class EventController {
  public abstract title: string
  public abstract tick(_event: WorldEvent): void
  public abstract spawn(_args: unknown): void
}
