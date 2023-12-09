export type RefreshEvent = { type: 'refresh' }
export type ActionEvent = { type: 'action'; nation: number }
export type RebellionEvent = { type: 'rebellion'; nation: number }
export type WarEvent = { type: 'war'; attacker: number; defender: number; provinces: number[] }

export type WorldEvent = {
  time: number
} & (ActionEvent | RebellionEvent | RefreshEvent | WarEvent)
