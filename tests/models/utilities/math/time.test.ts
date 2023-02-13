import {
  dayMS,
  deconstructHours,
  delay,
  describeDuration,
  formatHours,
  hourMS,
  minuteMS
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
