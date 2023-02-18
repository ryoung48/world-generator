import { province__demographics } from '../regions/provinces/network'
import { decorateText } from '../utilities/text/decoration'
import { Culture } from './cultures/types'
import { lang__first } from './languages/words/actors'
import { profession__spawn } from './professions'
import { species__map } from './species'
import { npc__traits } from './traits'
import { Gender, LifePhase, NPC, NPCParams } from './types'

export const npc__randomGender = () => window.dice.choice<Gender>(['male', 'female'])

const npc__appearance = (params: { culture: Culture; age: LifePhase; gender: Gender }) => {
  const { age, gender } = params
  const { appearance, species } = params.culture
  const skin = `${window.dice.choice(appearance.skin.colors)} ${species__map[species].traits.skin}`
  return `${
    appearance.skin.texture ? decorateText({ label: skin, tooltip: appearance.skin.texture }) : skin
  }${
    appearance.hair
      ? `, ${decorateText({
          label: `${window.dice.choice(appearance.hair.textures)} ${
            age === 'old' ? 'gray' : window.dice.choice(appearance.hair.colors)
          } hair`,
          tooltip: window.dice.weightedChoice(appearance.hair.styles[gender])
        })}`
      : ''
  }${
    gender === 'male' && appearance?.facialHair?.chance > window.dice.random
      ? `, ${window.dice.choice(appearance.facialHair.styles)}`
      : ''
  }`
}

export const npc__spawn = (params: NPCParams) => {
  const { loc, context, pc } = params
  const gender = npc__randomGender()
  const profession = profession__spawn({ loc, gender, context, profession: params.profession })
  const { common, native, foreign } = province__demographics(loc)
  const cidx = window.dice.weightedChoice(
    profession.culture === 'native' ? native : profession.culture === 'foreign' ? foreign : common
  )
  const culture = window.world.cultures[cidx]
  const age = params.age ?? profession.age
  const npc: NPC = {
    tag: 'actor',
    idx: window.world.actors.length,
    name: lang__first(culture.language, gender),
    culture: culture.idx,
    age,
    gender,
    profession: { key: profession.key, title: profession.title },
    personality: [],
    quirks: [],
    appearance: npc__appearance({ culture, age, gender })
  }
  npc__traits({ loc, npc, context })
  window.world.actors.push(npc)
  if (!pc) loc.actors.push(npc.idx)
  return npc
}
