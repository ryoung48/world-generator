import { Language } from '../types'
import { lang__unique_name } from '.'

export const lang__continent = (lang: Language) => {
  const name = lang__unique_name({ lang, key: 'island' })
  return `Continent of ${name}`
}

export const lang__island = (lang: Language) => {
  const name = lang__unique_name({ lang, key: 'island' })
  const term = window.dice.random < 0.3 ? 'Isle' : 'Island'
  const template = window.dice.random < 0.3 ? `${term} of ${name}` : `${name} ${term}`
  return template
}
export const lang__mountain = (lang: Language, size: number) => {
  const name = lang__unique_name({ lang, key: 'mountain' })
  // singular if theres only one
  const desc = size < 2 ? 'Mountain' : 'Mountains'
  return `${name} ${desc}`
}
