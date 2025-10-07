import { CELL } from '../../cells'
import { PLACEMENT } from '../../cells/placement'
import { Cell } from '../../cells/types'
import { POINT } from '../../utilities/math/points'
import { Hub } from './type'

const placement = (params: {
  cell: Cell
}): { point: { x: number; y: number }; coastal: boolean; neighbor?: number } => {
  const { cell } = params
  const coastalPlacement = CELL.coastalEdge({
    cell,
    distance: 0.5
  })
  if (coastalPlacement.length > 0) {
    const spacing = PLACEMENT.spacing.provinces
    const { radius } = window.world
    const neighborhood = CELL.bfsNeighborhood({ start: cell, maxDepth: 5 })
      .filter(n => n.idx !== cell.idx && CELL.place(n))
      .map(CELL.place)
    for (const edge of coastalPlacement) {
      const collision = neighborhood.some(
        place => POINT.distance.geo({ points: [place, edge.point], radius }) < spacing * 0.5
      )
      if (!collision) return { point: edge.point, coastal: true, neighbor: edge.neighbor }
    }
  }
  return { point: { x: cell.x, y: cell.y }, coastal: false }
}

export const HUB = {
  coastal: {
    move: (site: Hub, cell: Cell) => {
      const oldCell = window.world.cells[site.cell]
      const oldProvinceIdx = oldCell.province
      site.cell = cell.idx
      oldCell.province = cell.province
      cell.province = oldProvinceIdx
      HUB.coastal.set(site)
    },
    set: (site: Hub) => {
      const { point, coastal, neighbor } = placement({ cell: window.world.cells[site.cell] })
      site.x = point.x
      site.y = point.y
      site.coastal = coastal
      site.water = neighbor
    }
  },
  isCity: (place: Hub) => place.population > 10e3,
  province: (place: Hub) => CELL.province(window.world.cells[place.cell]),
  settlement: ({ population, nomadic }: Hub) => {
    if (nomadic) return 'tribal camp'
    return population > 200e3
      ? 'metropolis'
      : population > 50e3
      ? 'huge city'
      : population > 20e3
      ? 'large city'
      : population > 10e3
      ? 'small city'
      : population > 5e3
      ? 'large town'
      : population > 1e3
      ? 'small town'
      : population > 500
      ? 'large village'
      : population > 100
      ? 'small village'
      : 'tiny village'
  },
  spawn: (cell: Cell): Hub => {
    const { x, y } = cell
    const site: Hub = {
      population: 0,
      site: 'hub',
      x,
      y,
      cell: cell.idx
    }
    HUB.coastal.set(site)
    return site
  },
  background: (hub: Hub) => {
    if (!hub.background) {
      const village = hub.population < 1e3
      const { nomadic } = hub
      hub.background = {
        leadership: window.dice.spin(
          window.dice.weightedChoice(
            nomadic
              ? [
                  { v: `Bestially savage tyrant`, w: 1 },
                  { v: `Wizened elder`, w: 1 },
                  { v: `Magically-gifted chief`, w: 1 },
                  { v: `Holy man or woman`, w: 1 },
                  { v: `Hereditary chieftain`, w: 1 },
                  { v: `Outsider or alien lord`, w: 0.1 },
                  { v: `Brutal but cunning chief`, w: 1 },
                  { v: `Foreigner turned ruler`, w: 1 },
                  { v: `Council of elders`, w: 1 },
                  { v: `No ruler past clan heads`, w: 1 },
                  { v: `Envoy of a patron power`, w: 1 },
                  { v: `Most charismatic native`, w: 1 }
                ]
              : village
              ? [
                  { v: 'Hereditary headman', w: 1 },
                  { v: 'Reeve picked by a lord', w: 1 },
                  { v: 'Council of elders', w: 1 },
                  { v: 'Temple representative', w: 1 },
                  { v: 'Cruel and feared bully', w: 1 },
                  { v: 'Popularly-chosen chief', w: 1 },
                  { v: 'Dreaded sorcerer', w: 1 },
                  { v: 'Pragmatic warlord', w: 1 },
                  { v: 'The riches native there', w: 1 },
                  { v: 'A matriarch or patriarch', w: 1 },
                  { v: 'Traditional squire', w: 1 }
                ]
              : [
                  { v: 'Hereditary lord', w: 1 },
                  { v: 'Merchant prince', w: 1 },
                  { v: 'Council of oligarchs', w: 1 },
                  { v: 'Allied noble heads', w: 1 },
                  { v: 'Royal viceroy', w: 1 },
                  { v: 'Gentry-elected mayor', w: 1 },
                  { v: 'Major clerical figure', w: 1 },
                  { v: 'Occult power wielder', w: 1 },
                  { v: 'Criminal group catspaw', w: 1 },
                  { v: 'Ethnic group’s ruler', w: 1 },
                  { v: 'Military strongman', w: 1 },
                  { v: 'Chief magistrate', w: 1 }
                ]
          )
        ),
        notes: window.dice.choice(
          nomadic
            ? [
                `It's an unusually well-fortified safe place`,
                `A charismatic leader bound them together`,
                `The hunting or resources are very good here`,
                `They were driven here by a dire enemy`,
                `Seers or shamans said it was ordained`,
                `The leadership wants to find something here`,
                `Their herds or prey have led them here`,
                `They've been trapped here by the situation`,
                `They're paralyzed by internal dissent`,
                `They've been paid or induced to be here`,
                `Tradition requires they come here`,
                `Here they can do the most damage to a foe`
              ]
            : village
            ? [
                `Once a garrison outpost of a nation`,
                `A mine or quarry, perhaps now exhausted`,
                `A spot where refugees of a calamity settled`,
                `Holy ground or a temple to a particular faith`,
                `A plant or animal grows very well here`,
                `It's a safe way-post on a trade route`,
                `Refuge for a despised minority or group`,
                `A bandit camp that went legitimate`,
                `It's a safe base for salvage or ruin plundering`,
                `Decayed remnant of an ancient city`,
                `It grew up around a lordly manor or estate`
              ]
            : [
                `It's the former seat of a vanished nation`,
                `It's a trade nexus that has greatly prospered`,
                `It's an industrial or productive center`,
                `There is heavy resource extraction nearby`,
                `It controls a vital defensive point`,
                `It's built around an ancient enchantment`,
                `It's a stronghold of a local subculture`,
                `It's a sacred city to an important faith`,
                `It's a shared market for many villages`,
                `It's a place of great beauty or healthfulness`,
                `It's a shelter from dangerous environs`
              ]
        )
      }
    }
    return hub.background
  }
}
