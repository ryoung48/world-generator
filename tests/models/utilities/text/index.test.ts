import { TEXT } from '../../../../src/models/utilities/text'

test('returns title case text', () => {
  const text = TEXT.titleCase('test title')
  expect(text).toEqual('Test Title')
})
test('proper sentences: returns sentences with the first letter capitalized', () => {
  const text = TEXT.formatters.sentences('test sentence. test sentence.')
  expect(text).toEqual('Test sentence. Test sentence.')
})
test('proper sentences: returns input string when no sentence is found', () => {
  const text = TEXT.formatters.sentences('test sentence')
  expect(text).toEqual('test sentence')
})
test('proper list: composes a comma separated list with end separator', () => {
  const text = TEXT.formatters.list(['1', '2', '3'], '&')
  expect(text).toEqual('1, 2, & 3')
})
test('proper list: returns a single element', () => {
  const text = TEXT.formatters.list(['1'], '&')
  expect(text).toEqual('1')
})
test('returns return the roman numeral version of a number', () => {
  const text = TEXT.romanize(123)
  expect(text).toEqual('CXXIII')
})

describe('parseOutermostBrackets', () => {
  it('should parse outermost brackets correctly', () => {
    const input = 'Hello {world}! How are {you} today? {Nice} to meet {you}.'
    const result = TEXT.parseOutermostBrackets(input)
    expect(result).toEqual(['{world}', '{you}', '{Nice}', '{you}'])
  })

  it('should handle nested brackets', () => {
    const input = 'Hello {world {inner} outer}! How are {you} today?'
    const result = TEXT.parseOutermostBrackets(input)
    expect(result).toEqual(['{world {inner} outer}', '{you}'])
  })
})

test('formatters: percentages', () => {
  const result = TEXT.formatters.percent(0.9812)
  expect(result).toEqual('98%')
})
test('formatters: compact', () => {
  const result = TEXT.formatters.compact(9812981298129812)
  expect(result).toEqual('9813T')
})

export {}
