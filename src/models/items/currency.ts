export const coin_values = {
  copper: 1,
  silver: 10,
  gold: 100
}

export const currency__convert = (value: number) => {
  const coins: string[] = []
  const gold = Math.floor(value / coin_values.gold)
  if (gold > 0) coins.push(`${gold} gp`)
  const leftover = value - gold * coin_values.gold
  const silver = Math.floor(leftover / coin_values.silver)
  if (silver > 0) coins.push(`${silver} sp`)
  const copper = leftover - silver * coin_values.silver
  if (copper > 0 || value <= 0) coins.push(`${Math.floor(copper)} cp`)
  return coins.join(', ')
}
