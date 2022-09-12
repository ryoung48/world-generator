import {
  entityPlaceholder,
  replacePlaceholders
} from '../../../../../src/models/npcs/actors/text/placeholders'

test('placeholders: entity placeholders', () => {
  const result = replacePlaceholders({ primary: 'primary', secondary: 'secondary' })(
    `${entityPlaceholder} ${entityPlaceholder}`
  )
  expect(result).toEqual('primary secondary')
})
export {}
