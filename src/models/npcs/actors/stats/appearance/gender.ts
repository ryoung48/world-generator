export type genders = 'male' | 'female'
export const npc__randomGender = () => window.dice.choice<genders>(['male', 'female'])
export const npc__oppositeGender = (gender: genders) => (gender === 'male' ? 'female' : 'male')
