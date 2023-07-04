import { npc__spawn } from '../../npcs'
import { NPCParams } from '../../npcs/types'
import { Province } from '../../regions/provinces/types'
import { decorateText } from '../../utilities/text/decoration'
import { Actor } from './types'

export const decorateTag = (sentence: string, tag: string) => {
  const words = window.dice.spin(sentence).split(' ')
  return words
    .map((word, i) => (i === words.length - 1 ? decorateText({ label: word, tooltip: tag }) : word))
    .join(' ')
}

export const actor__spawn = (params: {
  loc: Province
  template: Actor
  context: NPCParams['context']
  tag: string
}) => {
  const { loc, template, context, tag } = params
  if (!template) console.log(tag)
  if (template.monstrous) return decorateTag(template.title, tag)
  const npc = npc__spawn({
    loc,
    context,
    profession: 'custom',
    age: template.elder
      ? 'old'
      : template.veteran
      ? window.dice.choice(['old', 'middle age'])
      : template.youth
      ? 'young adult'
      : template.child
      ? window.dice.choice(['child', 'adolescent'])
      : undefined,
    foreign: template.foreign
  })
  npc.profession.title = decorateTag(template.title, tag)
    .replace('#possessive#', npc.gender === 'male' ? 'his' : 'her')
    .toLowerCase()
  return decorateText({ link: npc })
}
