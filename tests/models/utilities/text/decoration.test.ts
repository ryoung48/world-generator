import { decorateText } from '../../../../src/models/utilities/text/decoration'
import { test__world } from '../../../helpers/world'

test__world()

test('decorators: text decoration - basic', () => {
  const result = decorateText({ link: window.world.regions[0] })
  expect(result).toEqual('@##0##nation######false##false##@')
})
test('decorators: text decoration - complex without a link', () => {
  const result = decorateText({
    label: 'test',
    tooltip: 'test',
    color: 'red',
    italics: true,
    bold: true
  })
  expect(result).toEqual('@test######test##red##true##true##@')
})
test('decorators: text decoration - nested decorations', () => {
  const result = decorateText({
    label: 'test',
    link: window.world.regions[0],
    tooltip: `${decorateText({
      label: 'test',
      link: window.world.regions[0],
      tooltip: 'test',
      color: 'red',
      italics: true,
      bold: true
    })} ${decorateText({
      label: 'test',
      link: window.world.regions[0],
      color: 'red',
      italics: true,
      bold: true
    })}`,
    color: 'red',
    italics: true,
    bold: true
  })
  expect(result).toEqual(
    '@test##0##nation##test##0##nation##test##red##true##true## test##0##nation####red##true##true####red##true##true##@'
  )
})
export {}
