export const titleCase = (str: string) => {
  return str.replace(/[^\s-()]+/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

export const properSentences = (str: string) => {
  const matches = str.match(/.+?[.!?]( |$)/g)
  return matches?.map(txt => txt.charAt(0).toUpperCase() + txt.substr(1))?.join('') ?? str
}
export const properList = (list: string[], ending: string) =>
  list.join(', ').replace(/, ([^,]*)$/, `${list.length > 2 ? ',' : ''} ${ending} $1`)

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

export const parseOutermostBrackets = (text: string) => {
  const groups: string[] = []
  let depth = 0
  let curr = ''
  for (const c of text) {
    const former = depth
    if (c === '{') depth++
    if (depth > 0) curr += c
    if (c === '}') depth--
    if (former > 0 && depth === 0) {
      groups.push(curr)
      curr = ''
    }
  }
  return groups
}
