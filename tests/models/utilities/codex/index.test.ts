import {
  codex__restoreHistory,
  codex__spawn,
  codex__targetZoom,
  codex__update
} from '../../../../src/models/utilities/codex'
import { test__world } from '../../../helpers/world'

const codex = { ...codex__spawn }
test__world()

test('codex alterations', () => {
  // content change null -> nation
  codex__update({ target: window.world.regions[0], codex })
  expect(codex.current).toEqual('nation')
  expect(codex.nation).toEqual(0)
  expect(codex.history.length).toEqual(0)
  // content change nation -> nation
  codex__update({ target: window.world.regions[1], codex })
  expect(codex.current).toEqual('nation')
  expect(codex.nation).toEqual(1)
  expect(codex.history.length).toEqual(1)
  // content change nation -> location
  codex__update({ target: window.world.provinces[0], codex })
  expect(codex.current).toEqual('province')
  expect(codex.province).toEqual(0)
  expect(codex.history.length).toEqual(2)
  // content change location -> culture
  codex__update({ target: window.world.cultures[0], codex })
  expect(codex.current).toEqual('culture')
  expect(codex.province).toEqual(0)
  expect(codex.history.length).toEqual(3)
  // restore history
  codex__restoreHistory(codex)
  expect(codex.current).toEqual('province')
  expect(codex.province).toEqual(0)
  expect(codex.history.length).toEqual(2)
})
test('codex target zoom: settlement', () => {
  window.world.provinces[0].population = 10
  const res = codex__targetZoom(window.world.provinces[0])
  expect(res).toEqual(
    expect.objectContaining({
      x: 0,
      y: 0,
      zoom: 50
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
