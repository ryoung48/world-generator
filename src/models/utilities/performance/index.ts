import { PieData } from '../../../components/codex/common/charts/types'

export interface ProfileNode extends PieData {
  children: Record<string, ProfileNode> // child nodes
}

export interface Profiles {
  history: ProfileNode
  current: ProfileNode
}

/**
 * creates a starting blank profile
 * @param key - the profile node label
 * @returns empty profile
 */
export const profile__spawn = (key: string) => ({
  label: key,
  color: window.dice.color(),
  value: 0,
  children: {}
})

// the current profile node context
let context: ProfileNode

/**
 * records the time debt of function and stores it on the current profile
 * @param params.label - optional name for the profiled function (will default to the function name)
 * @param params.f - f function being profiled
 * @returns the result of f
 */
export const profile = <T>(params: { label?: string; f: () => T }): T => {
  const { label, f } = params
  const key = label ?? f.name
  if (!context.children[key]) context.children[key] = profile__spawn(key)
  const old_context = context
  context = context.children[key]
  const start = performance.now()
  const result = f()
  const end = performance.now()
  context.value += end - start
  context = old_context
  return result
}

/**
 * decorated version of profile for ease of use
 * @param f - f function being profiled
 * @param name - optional override for functions that don't have names
 * @returns decorated function
 */
export const decorated_profile =
  <T, K extends unknown[]>(f: (..._args: K) => T, name?: string) =>
  (...args: K) =>
    profile({
      label: name ?? f.name,
      f: () => f(...args)
    })

/**
 * switches the current profile context
 * used to switch from the pre-generation profile
 * to the post generation profile
 * @param profile - profile to switch to
 */
export const profile__switch = (profile: ProfileNode): void => {
  context = profile
}
