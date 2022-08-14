import dayjs from 'dayjs'

const local = 'en-US'
export const formatters = {
  percent: ({ value, precision }: { value: number; precision?: number }) =>
    new Intl.NumberFormat(local, { style: 'percent', minimumFractionDigits: precision }).format(
      value
    ),
  compact: (value: number) =>
    new Intl.NumberFormat(local, { notation: 'compact' } as any).format(value),
  date: (value: number) => dayjs(value).format('MM/DD/YYYY'),
  time: (value: number) => dayjs(value).format('h:mm A'),
  dateTime: (value: number) => dayjs(value).format('MM/DD/YYYY, h:mm A')
}

export const format__date_range = (params: { start: number; end?: number }) => {
  const start = formatters.date(params.start)
  const end = Number.isFinite(params.end) ? formatters.date(params.end) : 'Present'
  return `${start} - ${end}`
}
