export const coinValues = {
  copper: 1,
  silver: 10,
  gold: 100
}

export const currency__convert = (value: number) => {
  const coins: string[] = []
  const gold = Math.floor(value / coinValues.gold)
  if (gold > 0) coins.push(`${gold} gp`)
  const leftover = value - gold * coinValues.gold
  const silver = Math.floor(leftover / coinValues.silver)
  if (silver > 0) coins.push(`${silver} sp`)
  const copper = leftover - silver * coinValues.silver
  if (copper > 0 || value <= 0) coins.push(`${Math.floor(copper)} cp`)
  return coins.join(', ')
}
