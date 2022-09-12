import {
  colors__adjacent,
  colors__neutralHues,
  colors__permutations,
  colors__randomHue,
  colors__randomPreset
} from '../../../src/models/utilities/colors'
import { Dice } from '../../../src/models/utilities/math/dice'

test('returns color permutations for a given color set', () => {
  const hues = colors__permutations(['pale', 'dark'], ['amber', 'red'])
  expect(hues).toEqual(expect.arrayContaining(['pale amber', 'dark amber', 'pale red', 'dark red']))
})
test('returns adjacent colors', () => {
  // test no overflow distance=1
  const red = colors__adjacent({ color: 'red', dist: 1 })
  expect(red).toEqual(expect.arrayContaining(['magenta', 'vermilion']))
  // test overflow (0 index)
  const magenta = colors__adjacent({ color: 'magenta', dist: 1 })
  expect(magenta).toEqual(expect.arrayContaining(['red', 'purple']))
  // test overflow (end index)
  const purple = colors__adjacent({ color: 'purple', dist: 1 })
  expect(purple).toEqual(expect.arrayContaining(['magenta', 'indigo']))
  // test default distance=2
  const green = colors__adjacent({ color: 'green' })
  expect(green).toEqual(expect.arrayContaining(['yellow', 'olive', 'teal', 'blue']))
})
test('returns neutral color hues from a given color set', () => {
  const hues = colors__neutralHues(['amber', 'red'])
  expect(hues).toEqual(expect.arrayContaining(['tan', 'mahogany']))
})
test('returns a random hue', () => {
  window.dice = new Dice('test')
  const red = colors__randomHue('red')
  expect(red).toEqual('hsl(357, 80%, 54%)')
  const blue = colors__randomHue('blue')
  expect(blue).toEqual('hsl(196, 76%, 38%)')
})
test('returns a random color preset', () => {
  const preset = colors__randomPreset({ tags: ['a', 'b', 'c'], seed: 'test' })
  expect(preset).toEqual(
    expect.objectContaining({
      a: 'hsl(266, 69%, 60%)',
      b: 'hsl(307, 39%, 57%)',
      c: 'hsl(165, 66%, 59%)'
    })
  )
  const dark = colors__randomPreset({ tags: ['a', 'b', 'c'], seed: 'test', dark: true })
  expect(dark).toEqual(
    expect.objectContaining({
      a: 'hsl(266, 69%, 40%)',
      b: 'hsl(307, 39%, 39%)',
      c: 'hsl(165, 66%, 40%)'
    })
  )
})

export {}
