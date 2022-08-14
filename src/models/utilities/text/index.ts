export const title_case = (str: string) => {
  return str.replace(/[^\s-()]+/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

/**
 * crudely attempts to turn a plural into it's singular parallel
 * @param str plural noun
 * @returns singular noun
 */
export const singular = (str: string) => {
  const end = str.slice(-1)
  return end === 's' ? str.slice(0, -1) : str
}

export const proper_sentences = (str: string) => {
  const matches = str.match(/.+?[.!?]( |$)/g)
  return matches?.map(txt => txt.charAt(0).toUpperCase() + txt.substr(1))?.join('') ?? str
}
export const proper_list = (list: string[], ending: string) =>
  list.join(', ').replace(/, ([^,]*)$/, `${list.length > 2 ? ',' : ''} ${ending} $1`)

const numberText: Record<number, string> = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
  30: 'thirty',
  40: 'forty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety',
  100: 'hundred',
  1000: 'thousand'
}

const numberValues = Object.keys(numberText)
  .map(val => Number(val))
  .sort((a, b) => b - a)

export const numbers_to_words = (n: number): string => {
  if (n === 0) return 'zero'
  if (n < 0) return 'negative ' + numbers_to_words(-n)
  let num = n
  let text = ''
  for (const numberValue of numberValues) {
    const count = Math.trunc(num / numberValue)

    if (count < 1) continue

    if (numberValue >= 100) text += numbers_to_words(count) + ' '

    text += numberText[numberValue] + ' '
    num -= count * numberValue
  }
  if (num !== 0) throw Error('Something went wrong!')
  return text.trim()
}

export const romanize = (num: number) => {
  const lookup: Record<string, number> = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  }
  let roman = ''
  let i
  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i
      num -= lookup[i]
    }
  }
  return roman
}
