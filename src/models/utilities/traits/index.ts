import { counter } from '../math'
import { TraitSelectionArgs } from './types'

export const trait__selection = <Tags extends string, Args>({
  available,
  current,
  constraints,
  used
}: TraitSelectionArgs<Tags, Args>) => {
  const _used = counter(used)
  const selected = window.dice.weightedChoice(
    Object.keys(available).map(_tag => {
      const trait = available[_tag as Tags]
      const conflict =
        current.some(tag => tag === _tag) ||
        trait.conflicts?.some(conflict => current.some(tag => tag === conflict))
      const invalid = Object.entries(constraints || {}).some(([key, value]) => {
        const _key = key as keyof Args
        return trait.constraints?.[_key] !== undefined && trait.constraints[_key] !== value
      })
      return {
        w: conflict || invalid ? 0 : 1 / (_used[_tag as Tags] * 10 || 1),
        v: _tag as Tags
      }
    })
  )
  return { tag: selected, text: window.dice.spin(available[selected].text) }
}
