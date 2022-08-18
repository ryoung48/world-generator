import { entity__partitionBFS, TaggedEntity } from '../../../src/models/utilities/codex/entities'

const items: TaggedEntity[] = [
  {
    idx: 0,
    tag: 'nation',
    name: ''
  },
  {
    idx: 1,
    tag: 'nation',
    name: ''
  },
  {
    idx: 1,
    tag: 'nation',
    name: ''
  },
  {
    idx: 2,
    tag: 'nation',
    name: ''
  },
  {
    idx: 3,
    tag: 'nation',
    name: ''
  },
  {
    idx: 4,
    tag: 'nation',
    name: ''
  },
  {
    idx: 5,
    tag: 'nation',
    name: ''
  }
]

test('entity: BFS partition', () => {
  const partitions = entity__partitionBFS({
    items,
    target: 2,
    neighbors: ({ idx }) => [items[idx + 1], items[idx - 1]].filter(item => item)
  })
  expect(partitions.length).toEqual(3)
})

export {}
