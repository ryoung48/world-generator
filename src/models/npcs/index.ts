import { PROVINCE } from '../regions/provinces'
import { decorateText } from '../utilities/text/decoration'
import { Culture } from './cultures/types'
import { LANGUAGE } from './languages'
import { PROFESSION } from './professions'
import { SPECIES } from './species'
import { NPC_TRAITS } from './traits'
import { Actor, Gender, LifePhase, NPCParams } from './types'

const outfits = {
  poor: '{rugged|patched|faded}',
  modest: '{rustic|practical|basic}',
  comfortable: '{stylish|professional|fine}',
  prosperous: '{lavish|exquisite|elegant}',
  rich: '{illustrious|ostentatious|magnificent}'
}

const assignOutfit = (params: { npc: Actor }) => {
  const { npc } = params
  if (npc.profession.key === 'custom') return
  const { lifestyle } = PROFESSION.lookup[npc.profession.key]
  npc.outfit = window.dice.spin(`${outfits[lifestyle]} {outfit|attire|garments}`)
}

const assignAppearance = (params: { culture: Culture; age: LifePhase; gender: Gender }) => {
  const { age, gender } = params
  const { appearance, species } = params.culture
  const skin = `${window.dice.choice(appearance.skin.colors)} ${
    SPECIES.lookup[species].traits.skin
  }`
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
    gender === 'male' && appearance.facialHair?.chance > window.dice.random
      ? `, ${window.dice.choice(appearance.facialHair.styles)}`
      : ''
  }`
}

export const ACTOR = {
  gender: () => window.dice.choice<Gender>(['male', 'female']),
  spawn: (params: NPCParams) => {
    const { loc, context } = params
    const gender = params?.gender ?? ACTOR.gender()
    const profession = PROFESSION.spawn({ loc, gender, profession: params.profession })
    const { common, native, foreign } = PROVINCE.demographics(loc)
    const cidx = window.dice.weightedChoice(
      params.foreign || profession.culture === 'foreign'
        ? foreign
        : profession.culture === 'native'
        ? native
        : common
    )
    const culture = window.world.cultures[cidx]
    const age = params.age ?? profession.age
    const npc: Actor = {
      tag: 'actor',
      idx: window.world.npcs.length,
      name: LANGUAGE.word.firstName(culture.language, gender),
      culture: culture.idx,
      age,
      gender,
      profession: { key: profession.key, title: profession.title },
      personality: [],
      quirks: [],
      appearance: assignAppearance({ culture, age, gender }),
      health: 1
    }
    NPC_TRAITS.spawn({ loc, npc, context })
    assignOutfit({ npc })
    window.world.npcs.push(npc)
    loc.actors.push(npc.idx)
    return npc
  }
}
