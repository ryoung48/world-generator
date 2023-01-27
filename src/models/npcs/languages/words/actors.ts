import { Gender } from '../../types'
import { Language } from '../types'
import { lang__word } from '.'

export const lang__last = (lang: Language) => {
  const surname = lang__word({ lang, key: 'last' })
  const { surnames } = lang
  if (surnames.epithets.length > 0) {
    const prefix = window.dice.choice(surnames.epithets)
    return `${prefix}${prefix.includes(`'`) ? surname.toLowerCase() : surname}`
  }
  return surname
}

export const lang__derivedSurnames = (lang: Language) => {
  const { patronymic, epithets } = lang.surnames
  return patronymic || epithets.length > 0
}

export const lang__first = (lang: Language, gender: Gender) => lang__word({ lang, key: gender })
