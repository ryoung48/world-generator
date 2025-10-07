import { TaggedEntity } from '../text/types'

export const ENTITY = {
  province: (entity: TaggedEntity) => {
    const { tag, idx } = entity
    let province = window.world.provinces[idx]
    if (tag === 'actor') {
      const actor = window.world.actors[idx]
      province = window.world.provinces[actor.province]
    } else if (tag === 'culture') {
      const culture = window.world.cultures[idx]
      province = window.world.provinces[culture.provinces[0]]
    }
    return province
  }
}
