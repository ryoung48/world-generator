export const academicSkills = [
  'accounting',
  'alchemy',
  'arcana',
  'astronomy',
  'divination',
  'history',
  'investigation',
  'law',
  'linguistics',
  'mechanics',
  'nature',
  'philosophy',
  'theology'
] as const

export type AcademicSkill = typeof academicSkills[number]

export const artisticSkills = [
  'acrobatics',
  'acting',
  'basketry',
  'blacksmithing',
  'bookbinding',
  'carving',
  'cobbling',
  'dancing',
  'engraving',
  'fletching',
  'glazing',
  'hair styling',
  'instrumental',
  'jeweling',
  'knitting',
  'leatherworking',
  'literature',
  'composition',
  'music',
  'painting',
  'pottery',
  'scribing',
  'sculpting',
  'singing',
  'sketching',
  'tailoring',
  'weaving',
  'whitesmithing'
] as const

export type ArtisticSkill = typeof artisticSkills[number]

export const socialSkills = [
  'bluff',
  'carouse',
  'charm',
  'etiquette',
  'insight',
  'intimidate',
  'intrigue',
  'negotiate',
  'negotiate',
  'oratory',
  'teaching'
] as const

export type SocialSkill = typeof socialSkills[number]

export const survivalSpecializations = [
  'forest',
  'plains',
  'mountains',
  'desert',
  'marsh',
  'arctic'
] as const

export const worldlySkills = [
  'animal handling',
  'architecture',
  'athletics',
  'baking',
  'brawling',
  'brewing',
  'carpentry',
  'cooking',
  'cultivation',
  'distillation',
  'embalming',
  'fletching',
  'folklore',
  'housekeeping',
  'living language',
  'logistics',
  'marksman',
  'martial',
  'masonry',
  'medicine',
  'milling',
  'mining',
  'perception',
  'seafaring',
  'streetwise',
  'survival',
  'vintner',
  'wagoneering',
  'woodcutting',
  ...survivalSpecializations
] as const

export type WorldlySkill = typeof worldlySkills[number]

export const allSkills = [
  ...socialSkills,
  ...artisticSkills,
  ...worldlySkills,
  ...academicSkills
] as const
export const artisanSkills = [...socialSkills, ...artisticSkills, ...worldlySkills]
export const scholarSkills = [...socialSkills, ...academicSkills]
export const laborerSkills = [...worldlySkills]

export type ActorSkills = typeof allSkills[number]
