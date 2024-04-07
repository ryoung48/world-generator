import { LANGUAGE } from './languages'
import { Heritage, HeritageSpawnParams } from './types'

export const HERITAGE = {
  civilized: (heritage: Heritage) => {
    const center = window.world.regions[heritage.regions[0]]
    return center.civilized
  },
  spawn: ({ regions, species }: HeritageSpawnParams) => {
    const language = LANGUAGE.spawn(species)
    const heritage: Heritage = {
      idx: window.world.heritages.length,
      name: '',
      regions: regions.map(region => region.idx),
      species,
      language
    }
    window.world.heritages.push(heritage)
    regions.forEach(region => {
      region.name = LANGUAGE.word.unique({ lang: language, key: 'region' })
    })
    return heritage
  }
}
