import { Loc } from '../types'
import { location__templates } from './taxonomy'

export const locationPlaceholder = '<location>'

export const location__fillPlaceholder = (params: { loc: Loc; text: string }) => {
  const { loc, text } = params
  return text.replaceAll(locationPlaceholder, location__templates[loc.type].alias ?? loc.type)
}
