const local = 'en-US'
export const formatters = {
  percent: (value: number, precision = 0) =>
    new Intl.NumberFormat(local, { style: 'percent', minimumFractionDigits: precision }).format(
      value
    ),
  compact: (value: number) =>
    new Intl.NumberFormat(local, { notation: 'compact' } as any).format(value)
}
