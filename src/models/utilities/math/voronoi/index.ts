import { Delaunay } from 'd3'
// @ts-ignore
import { geoDelaunay } from 'd3-geo-voronoi'
import { polygonCentroid } from 'd3-polygon'

import { GeoVoronoiDiagram, RelaxedVoronoiParams, Vertex, VoronoiParams } from './types'

const planar = ({ points, w, h }: VoronoiParams) => {
  const delaunay = Delaunay.from(points)
  return delaunay.voronoi([0, 0, w, h])
}

const spherical = ({ points }: VoronoiParams): GeoVoronoiDiagram => geoDelaunay(points)

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
  relaxed: {
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
    planar: ({ points, relaxation = 1, w, h }: RelaxedVoronoiParams) => {
      // create voronoi object clipped by the image width & height
      let vor = planar({ points, w, h })
      let count = 0
      // perform loyd relaxation to smooth voronoi cells
      while (count++ < relaxation) {
        const relaxedSites = Array.from(vor.cellPolygons()).map(poly =>
          polygonCentroid(poly.map(([x, y]) => [x, y]))
        )
        vor = planar({ points: relaxedSites, w, h })
      }
      return vor
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
    spherical: ({ points, relaxation = 1, w, h }: RelaxedVoronoiParams) => {
      // create voronoi object clipped by the image width & height
      let vor = spherical({ points, w, h })
      let count = 0
      let relaxedSites = points
      // perform loyd relaxation to smooth voronoi cells
      while (count++ < relaxation) {
        relaxedSites = Array.from(vor.polygons).map(poly =>
          polygonCentroid(poly.map(i => vor.centers[i]))
        )
        vor = spherical({ points: relaxedSites, w, h })
      }
      return { vor, sites: relaxedSites }
    }
  }
}
