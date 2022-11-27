import { province__cell, province__hub } from '../../../regions/provinces'
import { Region } from '../../../regions/types'
import { colors__hues, colors__randomHue } from '../../../utilities/colors'
import { titleCase } from '../../../utilities/text'
import { decorateText } from '../../../utilities/text/decoration'
import { climates } from '../../../world/climate/types'
import { spawnConstruct } from '../languages/spawn'
import { lang__uniqueName } from '../languages/words'
import { species__finalizeCulture } from '../taxonomy'
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
    currency: region.side === 'E' ? '¥' : '€',
    neighbors: [],
    terms: {
      tribes: window.dice.choice(['Tribes', 'Clans']),
      diplomat: window.dice.choice(['Diplomat', 'Ambassador', 'Consul', 'Envoy', 'Emissary']),
      'royal guards': `${window.dice.choice(['Royal', 'Honor', 'Palace'])} Guard`,
      district: window.dice.choice(['District', 'Canton', 'Ward']),
      palace: window.dice.choice(['Palace', 'Keep', 'Citadel'])
    },
    fashion: {
      color: hue
    },
    display: colors__randomHue(hue),
    regions: [],
    name: '',
    species: 'human',
    subspecies: '',
    lineage: window.dice.random > 0.1 ? 'male' : 'female'
  }
  window.world.cultures.push(culture)
  return culture
}

export const culture__flavorize = (culture: Culture, species: Culture['species']) => {
  culture.species = species
  const civil = culture__regions(culture).filter(r => r.civilized).length * 2
  culture.civilized = civil > culture.regions.length
  const origin = window.world.regions[culture.origin]
  const capitalProvince = window.world.provinces[origin.capital]
  const climate = climates[origin.climate]
  const { mountains, land } = origin.regional
  let prefix = window.dice.choice(climate.affixes)
  if (climate.zone !== 'arctic' && culture__islander(culture)) {
    prefix = window.dice.choice(['Islander', 'Coastal'])
  } else if (mountains / land > 0.6) {
    prefix = window.dice.choice(['Mountain', 'Highlander'])
  }
  culture.subspecies = `${prefix} ${titleCase(species)}`
  const capital = province__hub(capitalProvince)
  species__finalizeCulture({ culture, capital })
  if (culture.civilized) {
    if (culture?.appearance?.nosePiercing) {
      culture.appearance.nosePiercing.styles.push('bone')
      culture.appearance.nosePiercing.styles = window.dice.sample(
        culture.appearance.nosePiercing.styles,
        2
      )
    }
  }
  if (culture?.appearance?.hornDressing) {
    culture.appearance.hornDressing.styles = window.dice.sample(
      culture.appearance.hornDressing.styles,
      2
    )
  }
  culture.language = spawnConstruct(culture)
  culture.name = lang__uniqueName({ lang: culture.language, key: 'culture' })
}

export const culture__regions = (culture: Culture) =>
  culture.regions.map(r => window.world.regions[r])
export const culture__coastal = (culture: Culture) => culture__regions(culture).some(r => r.coastal)
export const culture__islander = (culture: Culture) =>
  culture__regions(culture).every(r => {
    const cell = province__cell(window.world.provinces[r.capital])
    return window.world.landmarks[cell.landmark].type !== 'continent'
  })
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
    .map(province => province__hub(province))
    .forEach(settlement => {
      settlement.name ||= lang__uniqueName({ lang: culture.language, key: 'settlement' })
    })
}

export const culture__religion = ({ religion }: Culture) => window.world.religions[religion].name

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
