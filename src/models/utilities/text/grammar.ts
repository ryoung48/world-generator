export const grammarRule = (text: string) => `#${text}#`

export const simpleGrammar = (symbol: string, rules: Record<string, string[]>) => {
  let expanded = window.dice.choice(rules[symbol])
  const inner = Array.from(new Set(expanded.match(/#.+?#/g)))
  inner.forEach(rule => {
    const ruleSymbol = rule.replace(/#/g, '')
    const regex = new RegExp(rule, 'g')
    expanded = expanded.replace(regex, simpleGrammar(ruleSymbol, rules))
  })
  return expanded
}
