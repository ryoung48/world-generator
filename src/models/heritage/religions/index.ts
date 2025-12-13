import { CULTURE } from '..'
import { LANGUAGE } from '../languages'
import { Religion, ReligionSpawnParams, ReligionType } from './types'

export const RELIGION = {
  irreligious: (religion: Religion) => {
    return religion.type === 'atheistic' || religion.type === 'pluralistic'
  },
  spawn: ({ cultures: groups }: ReligionSpawnParams): Religion => {
    // Determine religion type based on first culture's origin province

    // Find the largest culture in this religion group
    const cultures = groups.map(idx => window.world.cultures[idx])
    const largestCulture = cultures.reduce((largest, culture) => {
      const largestSize = CULTURE.provinces(largest).length
      const currentSize = CULTURE.provinces(culture).length
      return currentSize > largestSize ? culture : largest
    })
    const origin = CULTURE.origin(largestCulture)
    const type = window.dice.weightedChoice([
      { v: 'monotheistic', w: origin.development < 2 ? 1 : 2 },
      { v: 'dualistic', w: origin.development > 3 ? 0 : 0.15 },
      { v: 'polytheistic', w: origin.development > 3 ? 0 : 0.5 },
      { v: 'machine cult', w: origin.development > 2 ? 0 : 0.25 },
      { v: 'animistic', w: origin.development > 2 ? 0 : 1 },
      { v: 'nontheistic', w: 1 },
      { v: 'atheistic', w: origin.development < 2 ? 0 : 0.5 },
      { v: 'pluralistic', w: origin.development < 2 ? 0 : 0.5 },
      { v: 'syncretic', w: 0.15 }
    ]) as ReligionType

    // Irreligious doesn't get a name
    let religion: Religion = {
      type
    }

    // Get the language of the largest culture
    const language = CULTURE.language(largestCulture)
    if (language && !RELIGION.irreligious(religion)) {
      // Generate a name using the culture's language
      const { word: generatedName } = LANGUAGE.word.unique({
        lang: language,
        key: 'religion'
      })

      religion.name = generatedName
    }

    const idx = window.world.religions.length
    window.world.religions.push(religion)

    // Assign this religion to all cultures in the group
    cultures.forEach(culture => {
      culture.religion = idx
    })
    return religion
  }
}
