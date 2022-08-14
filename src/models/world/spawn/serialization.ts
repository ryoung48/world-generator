import PriorityQueue from 'js-priority-queue'

import { WorldEvent } from '../../history/types'
import { profile, profile__switch, Profiles } from '../../utilities/performance'
import { route_types } from '../travel/types'
import { World } from '../types'
import { world__spawn } from '.'
import { CivilizationShaper } from './shapers/civilization'
import { ContinentShaper } from './shapers/continents'
import { RegionalShaper } from './shapers/regions'

const infinity = '_INF_'
const neg_infinity = '_-INF_'

const custom_replacer = (_key: string, value: unknown) => {
  if (value === Infinity) return infinity
  if (value === -Infinity) return neg_infinity
  return value
}
const custom_retriever = (_key: string, value: unknown) => {
  if (value === infinity) return Infinity
  if (value === neg_infinity) return -Infinity
  return value
}

export const world__save = () => {
  console.time('Save')
  // delete the elements that wont save properly
  const { future, diagram, cells, coasts } = window.world
  delete window.world.diagram
  delete window.world.future
  delete window.world.cells
  delete window.world.coasts
  const queue = (future as any)['priv']['data']
  // initiate serialization
  const text = JSON.stringify(
    {
      world: window.world,
      future: queue,
      profiles: window.profiles
    },
    custom_replacer
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
  window.world.future = future
  window.world.cells = cells
  window.world.coasts = coasts
}

export const world__load = (saved: string) => {
  const label = 'Load'
  console.time(label)
  // delete the elements that wont save properly
  const { world, future, profiles } = JSON.parse(saved, custom_retriever) as {
    world: World
    future: WorldEvent[]
    profiles: Profiles
  }
  world.future = new PriorityQueue({
    comparator: (a: WorldEvent, b: WorldEvent) => a.time - b.time,
    initialValues: future
  })
  window.world = world__spawn({
    seed: world.id,
    res: world.dim.cells / 16000,
    template: world.template
  })
  profile({ label: 'Continents', f: () => new ContinentShaper().build() })
  profile({ label: 'Regions', f: () => new RegionalShaper().build() })
  profile({ label: 'Civilization', f: () => new CivilizationShaper().build() })
  world.cells = window.world.cells
  world.diagram = window.world.diagram
  world.coasts = window.world.coasts
  Object.entries(world.routes).forEach(([route_type, routes]) =>
    routes.forEach((road, i) =>
      road.path.forEach(cell => world.cells[cell].roads[route_type as route_types].push(i))
    )
  )
  window.world = world
  window.profiles = profiles
  profile__switch(window.profiles.current)
  // view_module.shaper(window.world.id)
  console.timeEnd(label)
}
