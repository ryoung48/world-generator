export type Gender = 'male' | 'female'
export const npc__randomGender = () => window.dice.choice<Gender>(['male', 'female'])
export const npc__oppositeGender = (gender: Gender) => (gender === 'male' ? 'female' : 'male')
