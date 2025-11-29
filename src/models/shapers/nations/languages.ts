import { CULTURE } from '../../heritage'
import { LANGUAGE } from '../../heritage/languages'
import { distribute } from './distribute'

export const shapeLanguages = () => {
  const cultures = window.world.cultures
  const { groups } = distribute({
    items: window.dice.shuffle(cultures),
    percentages: [0.5, 0.3, 0.15, 0.05],
    buckets: [
      [1, 1],
      [2, 2],
      [3, 4],
      [4, 6]
    ],
    neighbors: culture => CULTURE.neighbors(culture)
  })

  groups.forEach(group => {
    // Create one language per group
    const species = group[0].species
    const language = LANGUAGE.spawn(species)
    const languageIdx = window.world.languages.length
    window.world.languages.push(language)

    // Assign this language to all cultures in the group
    group.forEach(culture => {
      culture.language = languageIdx
    })
  })

  // Assign languages to any cultures that didn't get one
  cultures.forEach(culture => {
    if (culture.language === -1) {
      const neighbors = CULTURE.neighbors(culture).filter(n => n.language !== -1)
      if (neighbors.length > 0) {
        culture.language = window.dice.choice(neighbors).language
      } else {
        // Create a new language for isolated cultures
        const language = LANGUAGE.spawn(culture.species)
        culture.language = window.world.languages.length
        window.world.languages.push(language)
      }
    }
  })
}
