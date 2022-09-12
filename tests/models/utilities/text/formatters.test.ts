import { formatters } from '../../../../src/models/utilities/text/formatters'

test('formatters: percentages', () => {
  const result = formatters.percent({ value: 0.9812, precision: 0 })
  expect(result).toEqual('98%')
})
test('formatters: compact', () => {
  const result = formatters.compact(9812981298129812)
  expect(result).toEqual('9813T')
})
test('formatters: date', () => {
  const result = formatters.date(0)
  expect(result).toEqual('12/31/1969')
})
test('formatters: time', () => {
  const result = formatters.time(0)
  expect(result).toEqual('7:00 PM')
})
test('formatters: date time', () => {
  const result = formatters.dateTime(0)
  expect(result).toEqual('12/31/1969, 7:00 PM')
})
test('formatters: past date range', () => {
  const result = formatters.dateRange({ start: 0, end: 10000000 })
  expect(result).toEqual('12/31/1969 - 12/31/1969')
})
test('formatters: future date range', () => {
  const result = formatters.dateRange({ start: 0, end: Infinity })
  expect(result).toEqual('12/31/1969 - Present')
})
export {}
