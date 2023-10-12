import { PERFORMANCE } from '../utilities/performance'
import { Profiles } from '../utilities/performance/types'
import { WORLD } from '.'
import { RouteTypes, World } from './types'

const infinity = '_INF_'
const negInfinity = '_-INF_'

const customReplacer = (_key: string, value: unknown) => {
  if (value === Infinity) return infinity
  if (value === -Infinity) return negInfinity
  return value
}
const customRetriever = (_key: string, value: unknown) => {
  if (value === infinity) return Infinity
  if (value === negInfinity) return -Infinity
  return value
}

export const world__save = () => {
  console.time('Save')
  // delete the elements that wont save properly
  const { diagram, cells, coasts } = window.world
  delete window.world.diagram
  delete window.world.cells
  delete window.world.coasts
  // initiate serialization
  const text = JSON.stringify(
    {
      world: window.world,
      profiles: window.profiles
    },
    customReplacer
  )
  console.timeEnd('Save')
  // re-add diagram
  window.world.diagram = diagram
  // create a text blob for the file conversion
  const blob = new Blob([text], { type: 'text/json;charset=utf-8;' })
  // create a dummy link
  const element = document.createElement('a')
  // set the reference to the new file blob
  element.setAttribute('href', URL.createObjectURL(blob))
  // set the download attribute with file name
  element.setAttribute('download', `${window.world.id}.json`)
  // make sure it doesn't get displayed
  element.style.display = 'none'
  // add the dummy link to the document
  document.body.appendChild(element)
  // click the dummy link to download the file
  element.click()
  // remove the dummy link
  document.body.removeChild(element)
  // re-add elements
  window.world.diagram = diagram
  window.world.cells = cells
  window.world.coasts = coasts
}

export const world__load = (saved: string) => {
  const label = 'Load'
  console.time(label)
  // delete the elements that wont save properly
  const { world, profiles } = JSON.parse(saved, customRetriever) as {
    world: World
    profiles: Profiles
  }
  window.world = WORLD.spawn({
    seed: world.id,
    res: world.resolution
  })
  // PERFORMANCE.profile.apply({ label: 'Continents', f: () => new ContinentShaper().build() })
  // PERFORMANCE.profile.apply({ label: 'Regions', f: () => new RegionalShaper().build() })
  // PERFORMANCE.profile.apply({ label: 'Civilization', f: () => new CivilizationShaper().build() })
  world.cells = window.world.cells
  world.diagram = window.world.diagram
  world.coasts = window.world.coasts
  Object.entries(world.routes).forEach(([routeType, routes]) =>
    routes.forEach((road, i) =>
      road.path.forEach(cell => world.cells[cell].roads[routeType as RouteTypes].push(i))
    )
  )
  window.world = world
  window.profiles = profiles
  PERFORMANCE.profile.switch(window.profiles.current)
  // view_module.shaper(window.world.id)
  console.timeEnd(label)
}
