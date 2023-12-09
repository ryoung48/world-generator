export const HISTORY = {
  active: () => window.world.nations.length > 0,
  current: () => {
    const [current] = window.world.nations.slice(-1)
    return current
  }
}
