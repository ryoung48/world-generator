// scrublands|woodlands|marsh|highlands|hills|tundra|glacier
export type terrain_types =
  | 'Forest'
  | 'Plains'
  | 'Desert'
  | 'Mountains'
  | 'Arctic'
  | 'Oceanic'
  | 'Marsh'

export const terrain__is_wet = (terrain: terrain_types) => terrain === 'Forest'

export const terrain__is_aquatic = (terrain: terrain_types) => terrain === 'Oceanic'

export const terrain__is_arctic = (terrain: terrain_types) => terrain === 'Arctic'

export const glacier_latitude_cutoff = 80
