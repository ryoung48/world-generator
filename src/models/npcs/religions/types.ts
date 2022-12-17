export interface Religion {
  name: string
  idx: number
  type: 'monotheism' | 'polytheism' | 'philosophy'
  display: string
  cultures: number[]
  folk?: boolean
}
