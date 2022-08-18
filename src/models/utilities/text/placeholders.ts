export const entityPlaceholder = '__entity__'

const placeholderRegex = new RegExp(entityPlaceholder, 'g')

export const replacePlaceholders =
  (params: { primary: string; secondary: string }) => (text: string) => {
    let i = 0
    const { primary, secondary } = params
    return text.replace(placeholderRegex, () => (i++ % 2 === 0 ? primary : secondary))
  }
