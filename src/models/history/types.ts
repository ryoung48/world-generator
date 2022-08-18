export const eventTypes = ['war', 'rebellion', 'diplomacy', 'healthCheck', 'succession'] as const

export type EventType = typeof eventTypes[number]

// generic events that trigger in the history sim
export interface EventRecord {
  text: string
  title: string
  time: number // ms
}

// major events have a well-defined duration
export interface MajorEvent {
  name: string
  idx: number
  start: number // ms
  end: number // ms
  type: EventType
}

export interface LogRecord extends EventRecord {
  idx: number
  eventIdx?: number
  actors: { idx: number; wealth: number; maxWealth: number }[]
  type: EventType
}

export interface WorldEvent {
  time: number // ms
  type: EventType
}

export abstract class EventController {
  public abstract title: string
  public abstract tick(_event: WorldEvent): void
  public abstract spawn(_args: unknown): void
}
