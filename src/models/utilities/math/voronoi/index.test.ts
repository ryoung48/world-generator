import { VORONOI } from '.'

describe('VORONOI.commonEdge', () => {
  it('should return an empty array if both input arrays are empty', () => {
    const result = VORONOI.commonEdge([], [])
    expect(result).toEqual([])
  })

  it('should return an empty array if one of the input arrays is empty', () => {
    const result = VORONOI.commonEdge([], [[1, 2]])
    expect(result).toEqual([])
  })

  it('should return an empty array if there are no common edges between the two input arrays', () => {
    const result = VORONOI.commonEdge([[1, 2]], [[4, 5]])
    expect(result).toEqual([])
  })

  it('should return the common edges between the two input arrays', () => {
    const result = VORONOI.commonEdge([[2, 3]], [[2, 3]])
    expect(result).toEqual([[2, 3]])
  })
})
