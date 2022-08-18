import { genders } from '../../../actors/stats/appearance/gender'
import { Actor } from '../../../actors/types'
import { Language } from '../types'
import { lang__word } from '.'

export const lang__surname = (params: { lang: Language; npc: Actor; parent?: string }): string => {
  const { lang, npc } = params
  const { surnames } = lang
  const { suffix, patronymic } = surnames
  if (patronymic) {
    const { gender, parentName } = npc
    const chosen = window.dice.choice(suffix[gender])
    return `${parentName}${chosen}`
  }
  return lang__last(lang)
}

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

export const lang__first = (lang: Language, gender: genders) => lang__word({ lang, key: gender })
