// @ts-ignore
import { Delaunay } from 'd3'
import { polygonCentroid } from 'd3-polygon'

import { RelaxedVoronoiParams, Vertex, VoronoiParams } from './types'

const voronoi = ({ points, w, h }: VoronoiParams) => {
  const delaunay = Delaunay.from(points)
  return delaunay.voronoi([0, 0, w, h])
}

export const VORONOI = {
  /**
   * Returns the common edges between two arrays of vertices.
   *
   * @param {Vertex[]} i - The first array of vertices.
   * @param {Vertex[]} j - The second array of vertices.
   * @return {Vertex[]} - The array of common edges between the two arrays of vertices.
   */
  commonEdge: (i: Vertex[], j: Vertex[]): Vertex[] => {
    const cellI = new Set(i.map(String))
    const edge = j.filter(p => cellI.has(String(p)))
    return edge
  },
  /**
   * Applies relaxation to a Voronoi diagram.
   *
   * @param {RelaxedVoronoiParams} params - The parameters for the relaxation.
   * @param {Array<[number, number]>} params.points - The points for the Voronoi diagram.
   * @param {number} [params.relaxation=1] - The number of iterations for relaxation.
   * @param {number} params.w - The width of the image to clip the Voronoi diagram.
   * @param {number} params.h - The height of the image to clip the Voronoi diagram.
   * @return {Delaunay} - The relaxed Voronoi diagram.
   */
  relaxed: ({ points, relaxation = 1, w, h }: RelaxedVoronoiParams) => {
    // create voronoi object clipped by the image width & height
    let vor = voronoi({ points, w, h })
    let count = 0
    // perform loyd relaxation to smooth voronoi cells
    while (count++ < relaxation) {
      const relaxedSites = Array.from(vor.cellPolygons()).map(poly =>
        polygonCentroid(poly.map(([x, y]) => [x, y]))
      )
      vor = voronoi({ points: relaxedSites, w, h })
    }
    return vor
  }
}
