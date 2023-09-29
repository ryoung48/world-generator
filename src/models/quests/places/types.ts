export type Place = {
  text: string
  type: 'wilderness' | 'urban' | 'rural' | 'ruins'
  constraints?: {
    coastal?: boolean
    mountainous?: boolean
    dry?: boolean
    wet?: boolean
    marsh?: boolean
    forest?: boolean
    desert?: boolean
    plains?: boolean
    tundra?: boolean
  }
}
