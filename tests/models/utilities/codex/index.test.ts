import { province__sprawl } from '../../../../src/models/regions/provinces/spawn/sprawl'
import {
  codex__restoreHistory,
  codex__spawn,
  codex__targetZoom,
  codex__update
} from '../../../../src/models/utilities/codex'
import { test__world } from '../../../helpers/world'

jest.mock('../../../../src/models/regions/locations/spawn/traits')
jest.mock('../../../../src/models/regions/provinces/spawn/sprawl')
jest.mock('../../../../src/models/npcs/actors/spawn/finalize')

const mockProvinceSprawl = province__sprawl as jest.MockedFunction<typeof province__sprawl>

const codex = { ...codex__spawn }
test__world()

test('codex alterations', () => {
  // content change null -> nation
  codex__update({ target: window.world.regions[0], codex })
  expect(mockProvinceSprawl).toHaveBeenCalledTimes(1)
  expect(codex.current).toEqual('nation')
  expect(codex.nation).toEqual(0)
  expect(codex.history.length).toEqual(0)
  // content change nation -> nation
  codex__update({ target: window.world.regions[1], codex })
  expect(mockProvinceSprawl).toHaveBeenCalledTimes(2)
  expect(codex.current).toEqual('nation')
  expect(codex.nation).toEqual(1)
  expect(codex.history.length).toEqual(1)
  // content change nation -> location
  codex__update({ target: window.world.locations[0], codex })
  expect(mockProvinceSprawl).toHaveBeenCalledTimes(3)
  expect(codex.current).toEqual('location')
  expect(codex.location).toEqual(0)
  expect(codex.history.length).toEqual(2)
  // content change location -> culture
  codex__update({ target: window.world.cultures[0], codex })
  expect(mockProvinceSprawl).toHaveBeenCalledTimes(4)
  expect(codex.current).toEqual('culture')
  expect(codex.location).toEqual(0)
  expect(codex.history.length).toEqual(3)
  // restore history
  codex__restoreHistory(codex)
  expect(mockProvinceSprawl).toHaveBeenCalledTimes(6)
  expect(codex.current).toEqual('culture')
  expect(codex.location).toEqual(0)
  expect(codex.history.length).toEqual(3)
})
test('codex target zoom: settlement', () => {
  window.world.locations[0].population = 10
  const res = codex__targetZoom(window.world.locations[0])
  expect(res).toEqual(
    expect.objectContaining({
      x: 0,
      y: 0,
      zoom: 50
    })
  )
})
test('codex target zoom: wilderness', () => {
  window.world.locations[0].population = 0
  const res = codex__targetZoom(window.world.locations[0])
  expect(res).toEqual(
    expect.objectContaining({
      x: 0,
      y: 0,
      zoom: 100
    })
  )
})
test('codex target zoom: nation', () => {
  const res = codex__targetZoom(window.world.regions[0])
  expect(res).toEqual(
    expect.objectContaining({
      x: 0,
      y: 0,
      zoom: 10
    })
  )
})

export {}
