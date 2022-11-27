import { computeWeight, imperialHeight } from '../../../../utilities/math'
import { titleCase } from '../../../../utilities/text'
import { decorateText } from '../../../../utilities/text/decoration'
import { species__byCulture } from '../../../species/taxonomy'
import { earings, facialWounds, tattooStyles } from '../../../species/taxonomy/common/appearance'
import { actor__details } from '../../text'
import { entityPlaceholder, replacePlaceholders } from '../../text/placeholders'
import { Actor, ActorAppearance } from '../../types'
import { actor__isChild, actor__lifePhase } from '../age'
import { actor__socialClass } from '../professions'
import { actor__outfit } from './outfit'

export const actor__physique = (actor: Actor) => {
  const looks: ActorAppearance = { bmi: 0, height: 0, piercings: {} }
  // height
  const culture = window.world.cultures[actor.culture]
  const { heights, bmi } = species__byCulture(culture)
  const shortHeight = heights[actor.gender] - heights.std
  const tallHeight = heights[actor.gender] + heights.std
  const heightRange = window.dice.choice([
    [shortHeight - heights.std, shortHeight],
    [shortHeight, tallHeight],
    [shortHeight, tallHeight],
    [shortHeight, tallHeight],
    [tallHeight, tallHeight + heights.std]
  ])
  looks.height = window.dice.uniform(...heightRange)
  // bmi (weight)
  const thinHeight = bmi.mean - bmi.std
  const wideHeight = bmi.mean + bmi.std
  const weightRange = window.dice.choice([
    [thinHeight - bmi.std, thinHeight],
    [thinHeight, wideHeight],
    [thinHeight, wideHeight],
    [thinHeight, wideHeight],
    [wideHeight, wideHeight + bmi.std]
  ])
  looks.bmi = window.dice.uniform(...weightRange)
  // appearance
  const { appearance } = culture
  const skinColor = window.dice.choice(appearance.skin.colors)
  looks.skin = { color: skinColor }
  const eyeColor = window.dice.choice(appearance.eyes.colors)
  looks.eyes = { color: eyeColor }
  if (appearance.hair) {
    const hairTexture = window.dice.choice(appearance.hair.textures)
    const hairColor = window.dice.choice(appearance.hair.colors)
    const hairStyle = window.dice.weightedChoice(appearance.hair.styles[actor.gender])
    looks.hair = { texture: hairTexture, color: hairColor, style: hairStyle }
  }
  if (actor.gender === 'male' && appearance?.facialHair?.chance > window.dice.random) {
    looks.facialHair = window.dice.choice(appearance.facialHair.styles)
  }
  if (facialWounds.chance > window.dice.random) {
    looks.wounds = {
      type: window.dice.choice(facialWounds.type),
      intensity: window.dice.choice(facialWounds.intensity),
      side: window.dice.choice(facialWounds.side)
    }
  }
  const { nosePiercing, hornDressing, tattoos } = appearance
  const lifestyle = actor__socialClass({ actor })
  const tribal = !culture.civilized
  const upper = lifestyle === 'upper'
  const lower = lifestyle === 'lower'
  const tribalOrCommoner = !upper || tribal
  if (tattoos && tribalOrCommoner && 0.05 > window.dice.random) {
    looks.tattoos = {
      style: window.dice.choice(tattooStyles),
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
  if (nosePiercing && tribalOrCommoner && nosePiercing.chance > window.dice.random) {
    const styles = [...nosePiercing.styles]
    if (tribal) styles.push('bone')
    looks.piercings.nose =
      styles.includes(looks.piercings.ears) && !earings.tribal.includes(looks.piercings.nose)
        ? looks.piercings.ears
        : window.dice.choice(styles)
  }
  if (hornDressing && hornDressing.chance > window.dice.random) {
    const ring = `has an ${lower ? 'iron' : 'gold'} ring`
    looks.horns = {
      dressing: window.dice.choice([...hornDressing.styles, ring]),
      side: window.dice.choice(hornDressing.side)
    }
  }
  actor.appearance = looks
}

const actor__weight = (actor: Actor) =>
  Math.round(computeWeight(actor.appearance.height, actor.appearance.bmi))
const actor__imperialHeight = (actor: Actor) => imperialHeight(actor.appearance.height)
const actor__relativeHeight = (actor: Actor) => {
  const { gender, culture, appearance } = actor
  const { height } = appearance
  const { male, female, std } = species__byCulture(window.world.cultures[culture]).heights
  const mean = gender === 'male' ? male : female
  const bound = std
  return height > mean + bound ? 'tall' : height < mean - bound ? 'short' : 'average height'
}
const actor__relativeWeight = (actor: Actor) => {
  const { appearance, culture } = actor
  const { bmi } = appearance
  const { boundary, mean } = species__byCulture(window.world.cultures[culture]).bmi
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
  const { hair, facialHair } = actor.appearance
  if (!hair) return facialHair ? ` ${entityPlaceholder} has a ${facialHair}.` : ''
  const { ageless } = window.world.cultures[actor.culture].appearance.hair
  const adult = !actor__isChild({ actor })
  const phase = actor__lifePhase({ actor, expireCap: true })
  const color =
    hair.color === 'white' || ageless
      ? hair.color
      : phase === 'venerable'
      ? 'white'
      : phase === 'old'
      ? 'gray'
      : phase === 'middle age'
      ? decorateText({ label: hair.color, tooltip: 'graying' })
      : hair.color
  const tied = ['ponytail', 'bun', 'topknot']
  if (!adult) return ` ${hair.texture} ${color} hair.`
  const bald = hair.style === 'bald'
  let description = bald ? 'is bald' : `has ${hair.style}, ${hair.texture} ${color} hair`
  if (tied.includes(hair.style))
    description = `has ${hair.texture} ${color} hair tied in a ${hair.style}`
  if (facialHair)
    description += ` and ${bald ? 'has ' : ''}a ${decorateText({
      label: facialHair,
      tooltip: color
    })}`
  return ` ${entityPlaceholder} ${description}.`
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
      ? ` There are ${appearance.tattoos.style} tattoos visible on ${actor__details.nameS({
          actor
        })} ${appearance.tattoos.location}.`
      : ''
  }`
}
const actor__hornDressing = (actor: Actor) => {
  const { appearance } = actor
  return `${
    appearance.horns
      ? ` ${actor__details.nameS({ actor })} ${appearance.horns.side} horn ${
          appearance.horns.dressing
        }.`
      : ''
  }`
}

const describeAdult = (actor: Actor) => {
  const { culture, appearance } = actor
  const actorCulture = window.world.cultures[culture]
  const { skin } = actorCulture.appearance
  return `${entityPlaceholder} is ${decorateText({
    label: actor__relativeHeight(actor),
    tooltip: `${actor__imperialHeight(actor)} ft`
  })} and ${decorateText({
    label: actor__relativeWeight(actor),
    tooltip: `${actor__weight(actor)} lbs`
  })} with ${appearance.skin.color} ${
    skin.texture ? decorateText({ label: skin.type, tooltip: skin.texture }) : skin.type
  } and ${appearance.eyes.color} eyes.${actor__hair(actor)}${actor__wounds(actor)}${actor__tattoos(
    actor
  )}${actor__hornDressing(actor)}${actor__outfit(actor)}`
}

const describeYouth = (actor: Actor) => {
  const { culture, appearance } = actor
  const actorCulture = window.world.cultures[culture]
  return `${entityPlaceholder} has ${appearance.skin.color} ${actorCulture.appearance.skin.type}${
    appearance.hair ? `,` : ' and'
  } ${appearance.eyes.color} eyes${
    appearance.hair ? `, and ${actor__hair(actor)}` : ''
  }${actor__outfit(actor)}`
}

export const actor__appearance = (actor: Actor) => {
  const appearanceText = actor__isChild({ actor }) ? describeYouth(actor) : describeAdult(actor)
  return replacePlaceholders({
    primary: actor.name,
    secondary: titleCase(actor__details.subject({ actor }))
  })(
    `${entityPlaceholder} is ${actor__details.age({ actor })} ${
      actor.gender
    } ${actor__details.species({
      actor,
      link: true
    })}. ${appearanceText}`
  )
}
