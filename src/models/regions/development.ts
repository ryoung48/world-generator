export type development_rank = 'civilized' | 'frontier' | 'tribal' | 'remote'

export const development_map: Record<development_rank, number> = {
  civilized: 4,
  frontier: 3,
  tribal: 2,
  remote: 1
}
