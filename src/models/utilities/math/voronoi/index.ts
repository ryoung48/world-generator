import { geoDistance } from 'd3'
import { Delaunay } from 'd3-delaunay'
// @ts-ignore
import { geoDelaunay } from 'd3-geo-voronoi'
import { polygonCentroid } from 'd3-polygon'

import { PERFORMANCE } from '../../performance'
import { GeoVoronoiDiagram, RelaxedVoronoiParams, Vertex, VoronoiParams } from './types'

const spherical = ({ points }: Omit<VoronoiParams, 'w' | 'h'>): GeoVoronoiDiagram =>
  geoDelaunay(points)

const planar = ({ points, w, h }: VoronoiParams) => {
  const delaunay = Delaunay.from(points)
  return delaunay.voronoi([0, 0, w, h])
}

export const VORONOI = PERFORMANCE.profile.wrapper({
  label: 'VORONOI',
  ignore: ['relaxed', 'commonEdge'],
  o: {
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
    relaxed: {
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
      spherical: ({ points, relaxation = 1 }: Omit<RelaxedVoronoiParams, 'w' | 'h'>) => {
        // create voronoi object clipped by the image width & height
        let vor = spherical({ points })
        let count = 0
        let relaxedSites = points
        // perform loyd relaxation to smooth voronoi cells
        while (count++ < relaxation) {
          relaxedSites = Array.from(vor.polygons).map(poly =>
            polygonCentroid(poly.map(i => vor.centers[i]))
          )
          vor = spherical({ points: relaxedSites })
        }
        return { vor, sites: relaxedSites }
      }
    },
    urquhart: (points: Vertex[]) => {
      const vor = spherical({ points })
      const distances = vor.edges.map(e => geoDistance(points[e[0]], points[e[1]]))
      const urquhart = vor.urquhart(distances)

      // Create a map of connected points
      const connectedPoints = new Set<number>()
      vor.edges.forEach((edge, i) => {
        if (urquhart[i]) {
          connectedPoints.add(edge[0])
          connectedPoints.add(edge[1])
        }
      })

      // Find unconnected points
      const unconnectedPoints = points.map((_, i) => i).filter(i => !connectedPoints.has(i))

      // For each unconnected point, find its shortest edge
      const result = [...urquhart]
      unconnectedPoints.forEach(point => {
        const pointEdges = vor.edges
          .map((edge, i) => ({ edge, distance: distances[i], index: i }))
          .filter(({ edge }) => edge[0] === point || edge[1] === point)
          .sort((a, b) => a.distance - b.distance)

        if (pointEdges.length > 0) {
          result[pointEdges[0].index] = true
        }
      })

      return vor.edges.filter((_, i) => result[i])
    }
  }
})
