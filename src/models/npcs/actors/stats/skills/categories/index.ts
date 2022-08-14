export const academic_skills = [
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

export type academic_skill = typeof academic_skills[number]

export const artistic_skills = [
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

export type artistic_skill = typeof artistic_skills[number]

export const social_skills = [
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

export type social_skill = typeof social_skills[number]

export const survival_specializations = [
  'forest',
  'plains',
  'mountains',
  'desert',
  'marsh',
  'arctic'
] as const

export const worldly_skills = [
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
  ...survival_specializations
] as const

export type worldly_skill = typeof worldly_skills[number]

export const all_skills = [
  ...social_skills,
  ...artistic_skills,
  ...worldly_skills,
  ...academic_skills
] as const
export const artisan_skills = [...social_skills, ...artistic_skills, ...worldly_skills]
export const scholar_skills = [...social_skills, ...academic_skills]
export const laborer_skills = [...worldly_skills]

export type actor_skills = typeof all_skills[number]
