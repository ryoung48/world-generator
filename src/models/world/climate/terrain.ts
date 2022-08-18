// scrublands|woodlands|marsh|highlands|hills|tundra|glacier
export type Terrain = 'Forest' | 'Plains' | 'Desert' | 'Mountains' | 'Arctic' | 'Oceanic' | 'Marsh'

export const terrain__isWet = (terrain: Terrain) => terrain === 'Forest'

export const terrain__isAquatic = (terrain: Terrain) => terrain === 'Oceanic'

export const terrain__isArctic = (terrain: Terrain) => terrain === 'Arctic'

export const glacierLatitudeCutoff = 80
