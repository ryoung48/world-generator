import { compute_weight, imperial_height } from '../../../../utilities/math'
import { title_case } from '../../../../utilities/text'
import { decorate_text } from '../../../../utilities/text/decoration'
import { actor__details } from '../../../../utilities/text/entities/actor'
import { entity_placeholder, replace_placeholders } from '../../../../utilities/text/placeholders'
import { species__by_culture } from '../../../species/humanoids/taxonomy'
import {
  earings,
  facial_wounds,
  tattoo_styles
} from '../../../species/humanoids/taxonomy/common/appearance'
import { Actor, ActorAppearance } from '../../types'
import { actor__is_child, actor__life_phase } from '../age'
import { actor__social_class } from '../professions'
import { actor__outfit } from './outfit'

export const actor__physique = (actor: Actor) => {
  const looks: ActorAppearance = { bmi: 0, height: 0, piercings: {} }
  // height
  const culture = window.world.cultures[actor.culture]
  const { heights, bmi } = species__by_culture(culture)
  const short_height = heights[actor.gender] - heights.std
  const tall_height = heights[actor.gender] + heights.std
  const height_range = window.dice.choice([
    [short_height - heights.std, short_height],
    [short_height, tall_height],
    [short_height, tall_height],
    [short_height, tall_height],
    [tall_height, tall_height + heights.std]
  ])
  looks.height = window.dice.uniform(...height_range)
  // bmi (weight)
  const thin_weight = bmi.mean - bmi.std
  const wide_weight = bmi.mean + bmi.std
  const weight_range = window.dice.choice([
    [thin_weight - bmi.std, thin_weight],
    [thin_weight, wide_weight],
    [thin_weight, wide_weight],
    [thin_weight, wide_weight],
    [wide_weight, wide_weight + bmi.std]
  ])
  looks.bmi = window.dice.uniform(...weight_range)
  // appearance
  const { appearance } = culture
  const skin_color = window.dice.choice(appearance.skin.colors)
  looks.skin = { color: skin_color }
  const eye_color = window.dice.choice(appearance.eyes.colors)
  looks.eyes = { color: eye_color }
  if (appearance.hair) {
    const hair_texture = window.dice.choice(appearance.hair.textures)
    const hair_color = window.dice.choice(appearance.hair.colors)
    const hair_style = window.dice.weighted_choice(appearance.hair.styles[actor.gender])
    looks.hair = { texture: hair_texture, color: hair_color, style: hair_style }
  }
  if (actor.gender === 'male' && appearance?.facial_hair?.chance > window.dice.random) {
    looks.facial_hair = window.dice.choice(appearance.facial_hair.styles)
  }
  if (facial_wounds.chance > window.dice.random) {
    looks.wounds = {
      type: window.dice.choice(facial_wounds.type),
      intensity: window.dice.choice(facial_wounds.intensity),
      side: window.dice.choice(facial_wounds.side)
    }
  }
  const { nose_piercing, horn_dressing, tattoos } = appearance
  const lifestyle = actor__social_class({ actor, time: window.world.date })
  const tribal = !culture.civilized
  const upper = lifestyle === 'upper'
  const lower = lifestyle === 'lower'
  const tribal_or_commoner = !upper || tribal
  if (tattoos && tribal_or_commoner && 0.05 > window.dice.random) {
    looks.tattoos = {
      style: window.dice.choice(tattoo_styles),
      location: window.dice.choice(['face', 'body'])
    }
  }
  const ears = appearance.earings ?? true
  if (ears && actor.gender === 'female' && earings.chance[lifestyle] > window.dice.random) {
    const prospects: string[] = []
    if (tribal) prospects.push(...earings.tribal)
    if (lower) prospects.push(...earings.common)
    if (!lower) prospects.push(...earings.uncommon)
    if (upper) prospects.push(...earings.rare)
    looks.piercings.ears = window.dice.choice(prospects)
  }
  if (nose_piercing && tribal_or_commoner && nose_piercing.chance > window.dice.random) {
    const styles = [...nose_piercing.styles]
    if (tribal) styles.push('bone')
    looks.piercings.nose =
      styles.includes(looks.piercings.ears) && !earings.tribal.includes(looks.piercings.nose)
        ? looks.piercings.ears
        : window.dice.choice(styles)
  }
  if (horn_dressing && horn_dressing.chance > window.dice.random) {
    const ring = `has an ${lower ? 'iron' : 'gold'} ring`
    looks.horns = {
      dressing: window.dice.choice([...horn_dressing.styles, ring]),
      side: window.dice.choice(horn_dressing.side)
    }
  }
  actor.appearance = looks
}

const actor__weight = (actor: Actor) =>
  Math.round(compute_weight(actor.appearance.height, actor.appearance.bmi))
const actor__imperial_height = (actor: Actor) => imperial_height(actor.appearance.height)
const actor__relative_height = (actor: Actor) => {
  const { gender, culture, appearance } = actor
  const { height } = appearance
  const { male, female, std } = species__by_culture(window.world.cultures[culture]).heights
  const mean = gender === 'male' ? male : female
  const bound = std
  return height > mean + bound ? 'tall' : height < mean - bound ? 'short' : 'average height'
}
const actor__relative_weight = (actor: Actor) => {
  const { appearance, culture } = actor
  const { bmi } = appearance
  const { boundary, mean } = species__by_culture(window.world.cultures[culture]).bmi
  const muscular = actor.attributes.strength >= 13
  return bmi > mean + boundary
    ? muscular
      ? 'burly'
      : 'plump'
    : bmi < mean - boundary
    ? muscular
      ? 'lean'
      : 'thin'
    : muscular
    ? 'fit'
    : 'normal weight'
}

const actor__hair = (actor: Actor) => {
  const { hair, facial_hair } = actor.appearance
  if (!hair) return facial_hair ? ` ${entity_placeholder} has a ${facial_hair}.` : ''
  const { ageless } = window.world.cultures[actor.culture].appearance.hair
  const adult = !actor__is_child({ actor })
  const phase = actor__life_phase({ actor, expire_cap: true })
  const color =
    hair.color === 'white' || ageless
      ? hair.color
      : phase === 'venerable'
      ? 'white'
      : phase === 'old'
      ? 'gray'
      : phase === 'middle age'
      ? decorate_text({ label: hair.color, tooltip: 'graying' })
      : hair.color
  const tied = ['ponytail', 'bun', 'topknot']
  if (!adult) return ` ${hair.texture} ${color} hair.`
  const bald = hair.style === 'bald'
  let description = bald ? 'is bald' : `has ${hair.style}, ${hair.texture} ${color} hair`
  if (tied.includes(hair.style))
    description = `has ${hair.texture} ${color} hair tied in a ${hair.style}`
  if (facial_hair)
    description += ` and ${bald ? 'has ' : ''}a ${decorate_text({
      label: facial_hair,
      tooltip: color
    })}`
  return ` ${entity_placeholder} ${description}.`
}

const actor__wounds = (actor: Actor) => {
  const { appearance } = actor
  return `${
    appearance.wounds
      ? ` There are ${appearance.wounds.intensity} ${appearance.wounds.type} on the ${
          appearance.wounds.side
        } side of ${actor__details.possessive({ actor })} face.`
      : ''
  }`
}
const actor__tattoos = (actor: Actor) => {
  const { appearance } = actor
  return `${
    appearance.tattoos
      ? ` There are ${appearance.tattoos.style} tattoos visible on ${actor__details.name_s({
          actor
        })} ${appearance.tattoos.location}.`
      : ''
  }`
}
const actor__horn_dressing = (actor: Actor) => {
  const { appearance } = actor
  return `${
    appearance.horns
      ? ` ${actor__details.name_s({ actor })} ${appearance.horns.side} horn ${
          appearance.horns.dressing
        }.`
      : ''
  }`
}

const describe_adult = (actor: Actor) => {
  const { culture, appearance } = actor
  const actor_culture = window.world.cultures[culture]
  const { skin } = actor_culture.appearance
  return `${entity_placeholder} is ${decorate_text({
    label: actor__relative_height(actor),
    tooltip: `${actor__imperial_height(actor)} ft`
  })} and ${decorate_text({
    label: actor__relative_weight(actor),
    tooltip: `${actor__weight(actor)} lbs`
  })} with ${appearance.skin.color} ${
    skin.texture ? decorate_text({ label: skin.type, tooltip: skin.texture }) : skin.type
  } and ${appearance.eyes.color} eyes.${actor__hair(actor)}${actor__wounds(actor)}${actor__tattoos(
    actor
  )}${actor__horn_dressing(actor)}${actor__outfit(actor)}`
}

const describe_youth = (actor: Actor) => {
  const { culture, appearance } = actor
  const actor_culture = window.world.cultures[culture]
  return `${entity_placeholder} has ${appearance.skin.color} ${actor_culture.appearance.skin.type}${
    appearance.hair ? `,` : ' and'
  } ${appearance.eyes.color} eyes${
    appearance.hair ? `, and ${actor__hair(actor)}` : ''
  }${actor__outfit(actor)}`
}

export const actor__describe_appearance = (actor: Actor) => {
  const appearance_text = actor__is_child({ actor }) ? describe_youth(actor) : describe_adult(actor)
  return replace_placeholders({
    primary: actor.name,
    secondary: title_case(actor__details.subject({ actor }))
  })(
    `${entity_placeholder} is ${actor__details.age({ actor })} ${
      actor.gender
    } ${actor__details.species({
      actor
    })}. ${appearance_text}`
  )
}
