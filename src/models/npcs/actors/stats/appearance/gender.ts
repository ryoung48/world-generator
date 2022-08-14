export type genders = 'male' | 'female'
export const npc__random_gender = () => window.dice.choice<genders>(['male', 'female'])
export const npc__opposite_gender = (gender: genders) => (gender === 'male' ? 'female' : 'male')
