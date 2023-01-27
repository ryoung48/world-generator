import { Region } from '../../regions/types'
import { colors__hues, colors__randomHue } from '../../utilities/colors'
import { titleCase } from '../../utilities/text'
import { decorateText } from '../../utilities/text/decoration'
import { climates } from '../../world/climate/types'
import { spawnConstruct } from '../languages/spawn'
import { lang__uniqueName } from '../languages/words'
import { species__appearance } from '../species'
import { Culture } from './types'

export const culture__spawn = (region: Region) => {
  const idx = window.world.cultures.length
  const hue = window.dice.choice([...colors__hues])
  const culture: Culture = {
    idx,
    origin: region.idx,
    tag: 'culture',
    zone: climates[region.climate].zone,
    side: region.side,
    neighbors: [],
    fashion: {
      color: hue
    },
    display: colors__randomHue(hue),
    regions: [],
    name: '',
    species: 'human',
    lineage: window.dice.random > 0.1 ? 'male' : 'female'
  }
  window.world.cultures.push(culture)
  return culture
}

export const culture__finalize = (culture: Culture, species: Culture['species']) => {
  culture.species = species
  const civil = culture__regions(culture).filter(r => r.civilized).length * 2
  culture.civilized = civil > culture.regions.length
  culture.language = spawnConstruct(culture)
  culture.name = lang__uniqueName({ lang: culture.language, key: 'culture' })
  species__appearance(culture)
}

export const culture__regions = (culture: Culture) =>
  culture.regions.map(r => window.world.regions[r])
export const culture__coastal = (culture: Culture) => culture__regions(culture).some(r => r.coastal)
export const culture__subCulture = (culture: Culture, nation: Region) => {
  // increment region count
  culture.regions.push(nation.idx)
  // set the native species for the region
  nation.culture.ruling = culture.idx
  nation.culture.native = culture.idx
}
export const culture__culturize = (culture: Culture, nation: Region) => {
  // generate a regional name
  nation.name = lang__uniqueName({ lang: culture.language, key: 'region' })
  // generate settlement names
  nation.provinces
    .map(t => window.world.provinces[t])
    .forEach(settlement => {
      settlement.name ||= lang__uniqueName({ lang: culture.language, key: 'settlement' })
    })
}

export const culture__decorations = (params: {
  culture: Culture
  title?: boolean
  color?: string
}) => {
  const { culture, title, color } = params
  return decorateText({
    label: title ? titleCase(culture.name) : culture.name.toLowerCase(),
    tooltip: culture.species,
    color
  })
}
