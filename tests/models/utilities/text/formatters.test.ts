import { formatters } from '../../../../src/models/utilities/text/formatters'

test('formatters: percentages', () => {
  const result = formatters.percent(0.9812)
  expect(result).toEqual('98%')
})
test('formatters: compact', () => {
  const result = formatters.compact(9812981298129812)
  expect(result).toEqual('9813T')
})
export {}
