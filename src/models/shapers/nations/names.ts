import { CULTURE } from '../../heritage'
import { LANGUAGE } from '../../heritage/languages'
import { PROVINCE } from '../../provinces'

export const shapeNames = () => {
  const cultures = window.world.cultures
  cultures.forEach(culture => {
    const language = CULTURE.language(culture)
    if (!language) return

    const provinces = CULTURE.provinces(culture)
    provinces.forEach(province => {
      const { word, morphemes } = LANGUAGE.word.unique({
        lang: language,
        key: 'region'
      })
      province.name = word
      province.demonym = LANGUAGE.word.demonym(morphemes).replace(' ', '')
      PROVINCE.hub(province).name = LANGUAGE.word.unique({
        lang: language,
        key: 'settlement'
      }).word
    })

    const largest = provinces.reduce(
      (largest, curr) =>
        curr.territories.length > largest.territories.length ? curr : largest,
      provinces[0]
    )
    culture.name = largest.demonym
  })
  // Name and color all languages based on the cultures that speak them
  window.world.languages.forEach((language, idx) => {
    const speakingCultures = cultures.filter(c => c.language === idx)
    if (speakingCultures.length > 0) {
      LANGUAGE.name({
        language,
        cultureIndices: speakingCultures.map(c => c.idx)
      })
    }
  })
}
