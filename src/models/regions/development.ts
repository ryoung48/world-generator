export type DevelopmentRank = 'civilized' | 'frontier' | 'tribal' | 'remote'

export const developmentMap: Record<DevelopmentRank, number> = {
  civilized: 4,
  frontier: 3,
  tribal: 2,
  remote: 1
}
