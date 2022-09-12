import {
  properList,
  properSentences,
  romanize,
  titleCase
} from '../../../../src/models/utilities/text'

test('returns title case text', () => {
  const text = titleCase('test title')
  expect(text).toEqual('Test Title')
})
test('proper sentences: returns sentences with the first letter capitalized', () => {
  const text = properSentences('test sentence. test sentence.')
  expect(text).toEqual('Test sentence. Test sentence.')
})
test('proper sentences: returns input string when no sentence is found', () => {
  const text = properSentences('test sentence')
  expect(text).toEqual('test sentence')
})
test('proper list: composes a comma separated list with end separator', () => {
  const text = properList(['1', '2', '3'], '&')
  expect(text).toEqual('1, 2, & 3')
})
test('proper list: returns a single element', () => {
  const text = properList(['1'], '&')
  expect(text).toEqual('1')
})
test('returns return the roman numeral version of a number', () => {
  const text = romanize(123)
  expect(text).toEqual('CXXIII')
})

export {}
