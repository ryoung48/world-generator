import { cssColors } from '../../components/theme/colors'
import { CULTURE } from '../heritage/cultures'
import { Culture } from '../heritage/cultures/types'
import { LANGUAGE } from '../heritage/languages'
import { SPECIES } from '../heritage/species'
import { PLACE } from '../regions/places'
import { PROVINCE } from '../regions/provinces'
import { TEXT } from '../utilities/text'
import { decorateItem } from './equipment'
import { PROFESSION } from './professions'
import { NPC_TRAITS } from './traits'
import { Actor, ActorSpawnParams, Gender, LifePhase } from './types'

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
  const { appearance } = params.culture
  const species = CULTURE.species(params.culture)
  const skin = `${window.dice.choice(appearance.skin.colors)} ${
    SPECIES.lookup[species].traits.skin
  }`
  return `${
    appearance.skin.texture
      ? TEXT.decorate({ label: skin, tooltip: appearance.skin.texture })
      : skin
  }${
    appearance.hair
      ? `, ${TEXT.decorate({
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
  spawn: (params: ActorSpawnParams) => {
    const { place, role } = params
    const gender = params?.gender ?? ACTOR.gender()
    const profession = PROFESSION.spawn({ place, gender, profession: params.profession })
    const province = PLACE.province(place)
    const { common, native, foreign } = PROVINCE.demographics(province)
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
      idx: window.world.actors.length,
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
    NPC_TRAITS.spawn({ place, npc, role })
    assignOutfit({ npc })
    window.world.actors.push(npc)
    return npc
  },
  describe: (actor: Actor) => {
    const culture = window.world.cultures[actor.culture]
    const content = [
      { label: 'appearance', text: actor.appearance },
      { label: 'personality', text: actor.personality.join(', ') },
      { label: 'quirks', text: actor.quirks.map(({ text }) => text).join(', ') }
    ]
    if (actor.equipment)
      content.push({
        label: 'equipment',
        text: Object.values(actor.equipment)
          .map(item => decorateItem(item))
          .join(', ')
      })
    return {
      title: actor.name,
      subtitle: `${actor.age}, ${actor.gender} ${TEXT.decorate({
        label: CULTURE.species(culture),
        tooltip: window.world.regions[culture.region].name,
        color: cssColors.subtitle
      })}, ${actor.profession.title}`,
      content
    }
  }
}
