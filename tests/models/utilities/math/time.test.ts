import {
  dayMS,
  deconstructHours,
  delay,
  describeCoarseDuration,
  describeDuration,
  formatHours,
  hourMS,
  minuteMS,
  monthMS,
  weekMS,
  yearMS
} from '../../../../src/models/utilities/math/time'

jest.spyOn(global, 'setTimeout')

test('returns converted hours', () => {
  const time = deconstructHours(24.01)
  expect(time).toEqual(
    expect.objectContaining({
      seconds: 36,
      minutes: 0,
      hours: 0,
      days: 1
    })
  )
})
test('returns formatted hours: afternoon (no minutes)', () => {
  const time = formatHours(24.01)
  expect(time).toEqual('12:00 PM')
})
test('returns formatted hours: morning (with minutes)', () => {
  const time = formatHours(4.5)
  expect(time).toEqual('4:30 AM')
})
test('returns formatted duration (coarse): year', () => {
  const year = describeCoarseDuration(yearMS)
  expect(year).toEqual('1 year')
  const years = describeCoarseDuration(2 * yearMS)
  expect(years).toEqual('2 years')
})
test('returns formatted duration (coarse): month', () => {
  const month = describeCoarseDuration(monthMS)
  expect(month).toEqual('1 month')
  const months = describeCoarseDuration(2 * monthMS)
  expect(months).toEqual('2 months')
})
test('returns formatted duration (coarse): week', () => {
  const week = describeCoarseDuration(weekMS)
  expect(week).toEqual('1 week')
  const weeks = describeCoarseDuration(2 * weekMS)
  expect(weeks).toEqual('2 weeks')
})
test('returns formatted duration (coarse): day', () => {
  const day = describeCoarseDuration(dayMS)
  expect(day).toEqual('1 day')
  const days = describeCoarseDuration(2 * dayMS)
  expect(days).toEqual('2 days')
})
test('returns formatted duration (coarse): hour', () => {
  const hour = describeCoarseDuration(hourMS)
  expect(hour).toEqual('1 hour')
  const hours = describeCoarseDuration(2 * hourMS)
  expect(hours).toEqual('2 hours')
})
test('returns formatted duration (coarse): minute', () => {
  const minute = describeCoarseDuration(minuteMS)
  expect(minute).toEqual('1 minute')
  const minutes = describeCoarseDuration(2 * minuteMS)
  expect(minutes).toEqual('2 minutes')
})
test('returns formatted duration (fine): singular', () => {
  const singular = describeDuration(dayMS + hourMS + 1.5 * minuteMS)
  expect(singular).toEqual('1 day, 1 hour, and 1 minute')
})
test('returns formatted duration (fine): plural', () => {
  const singular = describeDuration(2 * dayMS + 2 * hourMS + 2.5 * minuteMS)
  expect(singular).toEqual('2 days, 2 hours, and 2 minutes')
})
test('delay calls setTimeout', async () => {
  await delay(1)
  expect(setTimeout).toHaveBeenCalledTimes(1)
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1)
})

export {}
