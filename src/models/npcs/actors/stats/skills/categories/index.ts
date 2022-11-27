export const academicSkills = [
  'accounting',
  'alchemy',
  'arcana',
  'astronomy',
  'history',
  'investigation',
  'law',
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
  'cobbling',
  'dancing',
  'fletching',
  'glazing',
  'hair styling',
  'instrument (music)',
  'jeweling',
  'knitting',
  'leatherworking',
  'literature',
  'composition (music)',
  'painting',
  'pottery',
  'scribing',
  'sculpting',
  'singing',
  'tailoring',
  'weaving',
  'whitesmithing'
] as const

export type ArtisticSkill = typeof artisticSkills[number]

export const socialSkills = [
  'bluff',
  'carouse',
  'charm',
  'debate',
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

export const worldlySkills = [
  'animal (handling)',
  'animal (riding)',
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
  'tactics',
  'vintner',
  'wagoneering',
  'woodcutting'
] as const

export type WorldlySkill = typeof worldlySkills[number]

export const allSkills = [
  ...socialSkills,
  ...artisticSkills,
  ...worldlySkills,
  ...academicSkills
] as const

export type ActorSkills = typeof allSkills[number]
