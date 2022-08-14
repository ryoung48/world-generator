export const grammar_rule = (text: string) => `#${text}#`

export const simple_grammar = (symbol: string, rules: Record<string, string[]>) => {
  let expanded = window.dice.choice(rules[symbol])
  const inner = Array.from(new Set(expanded.match(/#.+?#/g)))
  inner.forEach(rule => {
    const rule_symbol = rule.replace(/#/g, '')
    const regex = new RegExp(rule, 'g')
    expanded = expanded.replace(regex, simple_grammar(rule_symbol, rules))
  })
  return expanded
}
