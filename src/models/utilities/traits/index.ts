import { MATH } from '../math'
import { TraitSelectionArgs } from './types'

export const TRAIT = {
  selection: <Tags extends string, Args>({
    available,
    current,
    constraints,
    used,
    samples = 1,
    usagePenalty = (used: number) => 1 / 10 ** (used || 0)
  }: TraitSelectionArgs<Tags, Args>) => {
    const _used = MATH.counter(used ?? [])
    const _current = [...current]
    const result: Tags[] = []
    while (result.length < samples) {
      const selected = window.dice.weightedChoice(
        Object.keys(available).map(_tag => {
          const trait = available[_tag as Tags]
          const conflict =
            _current.some(tag => tag === _tag) ||
            trait.conflicts?.some(conflict => _current.some(tag => tag === conflict))
          const invalid = Object.entries(constraints || {}).some(([key, value]) => {
            const _key = key as keyof Args
            return trait.constraints?.[_key] !== undefined && trait.constraints[_key] !== value
          })
          const weight = trait.weight ?? 1
          return {
            w: conflict || invalid ? 0 : usagePenalty(_used[_tag as Tags]) * weight,
            v: _tag as Tags
          }
        })
      )
      result.push(selected)
      _current.push(selected)
    }
    return result
  }
}
