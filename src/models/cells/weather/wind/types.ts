export interface WindVector {
  speed: number // m/s
  direction: number // meteorological degrees (0=N, 90=E, 180=S, 270=W)
}

export interface WindField {
  speed: number[][]
  direction: number[][]
}

export interface MonthlyWindData {
  [month: number]: WindField
}

export interface WindGeneratorConfig {
  planetRadius?: number // meters, defaults to Earth radius
  rotationRate?: number // rad/s, defaults to Earth's rotation
  gravity?: number // m/s², defaults to Earth's gravity
  gasConstant?: number // J/kg·K, defaults to dry air constant
}

export interface GridData {
  lat: number[]
  lon: number[]
  elevation: number[][]
  landMask?: boolean[][]
  temperatureMonthly: Record<number, number[][]>
}

export interface WindComponents {
  u: number[][] // east-west component (positive = eastward)
  v: number[][] // north-south component (positive = northward)
}
