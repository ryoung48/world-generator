import { province__cell, province__hub } from '../../../../regions/provinces'
import { Region } from '../../../../regions/types'
import { color__random_hue, hues } from '../../../../utilities/colors'
import { title_case } from '../../../../utilities/text'
import { decorate_text } from '../../../../utilities/text/decoration'
import { climate_lookup } from '../../../../world/climate/types'
import { spawn_construct } from '../languages/spawn'
import { lang__unique_name } from '../languages/words'
import { species__finalize_culture } from '../taxonomy'
import { Culture } from './types'

export const culture__spawn = (region: Region) => {
  const idx = window.world.cultures.length
  const hue = window.dice.choice([...hues])
  const culture: Culture = {
    idx,
    origin: region.idx,
    tag: 'culture',
    zone: climate_lookup[region.climate].zone,
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
    display: color__random_hue(hue),
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
  const capital_province = window.world.provinces[origin.capital]
  const climate = climate_lookup[origin.climate]
  const { mountains, land } = origin.regional
  let prefix = window.dice.choice(climate.affixes)
  if (climate.zone !== 'Arctic' && culture__islander(culture)) {
    prefix = window.dice.choice(['Islander', 'Coastal'])
  } else if (mountains / land > 0.6) {
    prefix = window.dice.choice(['Mountain', 'Highlander'])
  }
  culture.subspecies = `${prefix} ${title_case(species)}`
  const capital = province__hub(capital_province)
  species__finalize_culture({ culture, capital })
  if (culture.civilized) {
    if (culture?.appearance?.nose_piercing) {
      culture.appearance.nose_piercing.styles.push('bone')
      culture.appearance.nose_piercing.styles = window.dice.sample(
        culture.appearance.nose_piercing.styles,
        2
      )
    }
  }
  if (culture?.appearance?.horn_dressing) {
    culture.appearance.horn_dressing.styles = window.dice.sample(
      culture.appearance.horn_dressing.styles,
      2
    )
  }
  culture.language = spawn_construct(culture)
  culture.name = lang__unique_name({ lang: culture.language, key: 'culture' })
}

export const culture__regions = (culture: Culture) =>
  culture.regions.map(r => window.world.regions[r])
export const culture__coastal = (culture: Culture) => culture__regions(culture).some(r => r.coastal)
export const culture__islander = (culture: Culture) =>
  culture__regions(culture).every(r => {
    const cell = province__cell(window.world.provinces[r.capital])
    return window.world.landmarks[cell.landmark].type !== 'continent'
  })
export const culture__sub_culture = (culture: Culture, nation: Region) => {
  // increment region count
  culture.regions.push(nation.idx)
  // set the native species for the region
  nation.culture.ruling = culture.idx
  nation.culture.native = culture.idx
}
export const culture__culturize = (culture: Culture, nation: Region) => {
  // generate a regional name
  nation.name = lang__unique_name({ lang: culture.language, key: 'region' })
  // generate settlement names
  nation.provinces
    .map(t => window.world.provinces[t])
    .map(province => province__hub(province))
    .forEach(settlement => {
      settlement.name ||= lang__unique_name({ lang: culture.language, key: 'settlement' })
    })
}

export const culture__religion = ({ religion }: Culture) => window.world.religions[religion].name

export const decorated_culture = (params: {
  culture: Culture
  title?: boolean
  color?: string
}) => {
  const { culture, title, color } = params
  return decorate_text({
    link: culture,
    label: title ? title_case(culture.name) : culture.name.toLowerCase(),
    tooltip: culture.species,
    color
  })
}
