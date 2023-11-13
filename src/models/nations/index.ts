export const NATION = {
  init: () => {
    window.world.nations.push({
      ruler: window.world.provinces.map(p => p.nation),
      subjects: window.world.regions.map(r => [...r.provinces])
    })
  }
}
