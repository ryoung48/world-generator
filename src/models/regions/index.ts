import { CLIMATE } from '../cells/climate'
import { Cell } from '../cells/types'
import { ARRAY } from '../utilities/array'
import { PROVINCE } from './provinces'
import * as Region from './types'

export const REGION = {
  /**
   * Determines if a region is active.
   * @param {Region.Region} region - The region to check.
   * @returns {boolean} - True if the region has provinces, otherwise false.
   */
  active: (region: Region.Region) => {
    // Check if the region has any provinces.
    return REGION.provinces(region).length > 0
  },
  /**
   * Determines if a region is at war.
   * @param {Region.Region} region - The region to check.
   * @returns {boolean} - True if the region is at war, otherwise false.
   */
  atWar: (region: Region.Region) =>
    // Get the relations of the region and check if it is at war.
    REGION.relations.get({ target: 'at war', region }).length > 0,
  /**
   * Gets the climate of the region.
   * @param {Region.Region} region - The region to check.
   * @returns {string} - The climate of the region.
   */
  climate: (region: Region.Region) => {
    // Get the capital of the region and find the climate of its cell.
    const capital = REGION.capital(region)
    const cell = PROVINCE.cell(capital)
    return CLIMATE.holdridge[cell.climate]
  },
  /**
   * Determines if the region is coastal.
   * @param {Region.Region} region - The region to check.
   * @returns {boolean} - True if the region is coastal, otherwise false.
   */
  coastal: (region: Region.Region) =>
    // Get the capital of the region and check if its cell has a beach.
    PROVINCE.cell(REGION.capital(region)).beach,

  /**
   * Gets the culture of the region.
   * @param {Region.Region} region - The region to check.
   * @returns {string} - The culture of the region.
   */
  culture: (region: Region.Region) =>
    // Access the culture of the region from the global world object.
    window.world.cultures[region.culture],

  /**
   * Gets the borders of the region.
   * @param {Region.Region} region - The region to check.
   * @returns {Array<Region.Region>} - The regions that border this region.
   */
  borders: (region: Region.Region) =>
    // Map the border IDs to actual region objects.
    region.borders.map(b => window.world.regions[b]),

  /**
   * Gets the capital of the region.
   * @param {Region.Region} region - The region to check.
   * @returns {Region.Province} - The capital province of the region.
   */
  capital: (region: Region.Region) =>
    // Access the capital province of the region from the global world object.
    window.world.provinces[region.capital],

  /**
   * Gets the domains of the region.
   * @param {Region.Region} region - The region to check.
   * @returns {Array<Region.Region>} - The regions that are domains of this region.
   */
  domains: (region: Region.Region) => {
    // Filter provinces to find those with capitals and map them to their regions.
    return REGION.provinces(region)
      .filter(t => t.capital)
      .map(p => window.world.regions[p.region])
  },

  /**
   * Finds a region based on reference, group, and type.
   * @param {Region.RegionFindParams} params - The parameters for finding the region.
   * @returns {Region.Province} - The found province.
   */
  find: ({ ref, group, type }: Region.RegionFindParams) => {
    const found = PROVINCE.find({
      group: group.map(neighbor => window.world.provinces[neighbor.capital]),
      ref: window.world.provinces[ref.capital],
      type
    })
    return window.world.regions[found.region]
  },
  /**
   * Retrieves the nation associated with the given region.
   *
   * @param {Region.Region} region - The region for which to retrieve the nation.
   * @return {Nation} The nation associated with the region.
   */
  nation: (region: Region.Region) => {
    const capital = window.world.provinces[region.capital]
    const nation = PROVINCE.nation(capital)
    return nation
  },
  /**
   * Retrieves an array of active, non-desolate regions that represent nations.
   *
   * @return {Region.Region[]} An array of active, non-desolate regions.
   */
  get nations() {
    return Object.values(window.world.regions).filter(n => !n.desolate && REGION.active(n))
  },
  /**
   * Returns a list of neighboring regions of a given region up to a specified depth.
   *
   * @param {Region.RegionNeighborsParams} params - An object containing the region to find neighbors of, and the depth of the search.
   * @param {Region.Region} params.region - The region to find neighbors of.
   * @param {number} [params.depth=1] - The depth of the search. Defaults to 1.
   * @return {Region.Region[]} An array of neighboring regions.
   */
  neighbors: ({ region, depth = 1 }: Region.RegionNeighborsParams): Region.Region[] =>
    ARRAY.traversal.bfs({
      src: region,
      n: src =>
        PROVINCE.neighboringRegions(REGION.provinces(src)).map(r => window.world.regions[r]),
      depth
    }),
  /**
   * Calculates the total population of a given region.
   *
   * @param {Region.Region} region - The region for which to calculate the population.
   * @return {number} The total population of the region.
   */
  population: (region: Region.Region) => {
    return REGION.provinces(region).reduce((sum, province) => sum + province.population, 0)
  },
  /**
   * Returns an array of provinces belonging to a given region.
   *
   * @param {Region.Region} region - The region for which to retrieve provinces.
   * @return {Array<Province>} An array of provinces belonging to the region.
   */
  provinces: (region: Region.Region) => {
    return region.provinces.map(p => window.world.provinces[p])
  },
  relations: {
    /**
     * Retrieves an array of regions that have a specific diplomatic relation with the given region.
     *
     * @param {Region.GetRelationsParams} params - The parameters for the function.
     * @param {Region.Region} params.region - The region to retrieve the relations from.
     * @param {DiplomaticRelation} params.target - The target diplomatic relation.
     * @return {Region.Region[]} An array of regions that have the specified diplomatic relation.
     */
    get: (params: Region.GetRelationsParams) =>
      Object.entries(params.region.relations)
        .filter(([_, relation]) => relation === params.target)
        .map(([r]) => window.world.regions[parseInt(r)]),
    /**
     * Sets the diplomatic relation between two regions.
     *
     * @param {DiplomaticRelation} target - The target diplomatic relation.
     * @param {Region} r1 - The first region.
     * @param {Region} r2 - The second region.
     */
    set: ({ target, r1, r2 }: Region.SetRelationsParams) => {
      r1.relations[r2.idx] = target
      r2.relations[r1.idx] = target
    }
  },
  /**
   * Sorts regions based on distances between capitals to the reference region.
   *
   * @param {Region.RegionSortParams} ref - The reference region.
   * @param {Region.RegionSortParams} group - The group of regions to sort.
   * @param {Region.RegionSortParams} type - how to sort.
   * @return {Region.Region[]} An array of sorted regions.
   */
  sort: ({ ref, group, type }: Region.RegionSortParams) =>
    PROVINCE.sort({
      group: group.map(neighbor => window.world.provinces[neighbor.capital]),
      ref: window.world.provinces[ref.capital],
      type
    }).map(province => window.world.regions[province.region]),
  /**
   * Spawns a new region based on the provided cell data.
   *
   * @param {Cell} cell - The cell data to spawn the region from.
   * @return {Region.Region} The newly spawned region.
   */
  spawn: (cell: Cell) => {
    const idx = window.world.regions.length
    cell.region = idx
    const region: Region.Region = {
      idx,
      tag: 'nation',
      name: '',
      heraldry: {
        color: '',
        hue: -1,
        style: window.dice.weightedChoice([
          {
            v: 'standard',
            w: 0.5
          },
          {
            v: 'monochrome',
            w: 0.1
          },
          {
            v: 'contrast',
            w: 0.4
          }
        ])
      },
      regional: {},
      borders: [],
      provinces: [],
      landBorders: [],
      vassals: [],
      relations: {},
      culture: -1,
      desolate: false
    }
    window.world.regions.push(region)
    return region
  },
  vassals: {
    /**
     * Adds a vassal to the overlord's list of vassals and updates the vassal's
     * reference to its new overlord. Also adds the 'vassal' relation between the overlord
     * and the vassal.
     *
     * @param {Region.AddVassalParams} params.overlord - The overlord to which the vassal will be added.
     * @param {Region.AddVassalParams} params.vassal - The vassal to be added.
     */
    add: ({ overlord, vassal }: Region.AddVassalParams) => {
      overlord.vassals.push(vassal.idx)
      vassal.overlord = overlord.idx
      REGION.relations.set({ target: 'vassal', r1: overlord, r2: vassal })
    }
  },
  /**
   * Gets the climate zone for a given region.
   *
   * @param {Region.Region} region - The region to determine the zone for.
   * @return {string} - The zone based on the region's climate.
   */
  zone: (region: Region.Region) => {
    const biome = REGION.climate(region)
    return CLIMATE.zone[biome.latitude]
  }
}
