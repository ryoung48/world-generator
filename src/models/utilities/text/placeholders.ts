export const entity_placeholder = '__entity__'

const placeholder_regex = new RegExp(entity_placeholder, 'g')

export const replace_placeholders =
  (params: { primary: string; secondary: string }) => (text: string) => {
    let i = 0
    const { primary, secondary } = params
    return text.replace(placeholder_regex, () => (i++ % 2 === 0 ? primary : secondary))
  }
