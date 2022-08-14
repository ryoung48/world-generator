import { tagged__bfs_partition } from '../../../../utilities/codex/grouping'
import { decorate_text } from '../../../../utilities/text/decoration'
import { npc__random_gender } from '../../../actors/stats/appearance/gender'
import { Culture } from '../cultures/types'
import { lang__unique_name } from '../languages/words'
import { Religion } from './types'

type basic_religion = Pick<Religion, 'type' | 'name'>

interface ReligionSpawnParams {
  cultures: Culture[]
  religions: basic_religion[]
  tribal?: boolean
}

const culture_capital = (culture: Culture) => window.world.regions[culture.origin]

const religion__spawn = ({ cultures, religions, tribal }: ReligionSpawnParams) => {
  const regions = cultures.map(culture_capital)
  const queue = window.dice.shuffle(religions)
  tagged__bfs_partition({
    items: regions,
    target: regions.length / religions.length,
    neighbors: region => {
      const curr = window.world.cultures[region.culture.ruling]
      return curr.neighbors
        .map(c => window.world.cultures[c])
        .filter(culture => culture.civilized === curr.civilized && culture.religion === undefined)
        .map(culture_capital)
    }
  }).forEach(group => {
    const [center] = group
    const culture = window.world.cultures[center.culture.ruling]
    const pick = queue.pop()
    const { name, type } = pick
    queue.unshift(pick)
    const religion: Religion = {
      name: name.replace('%', lang__unique_name({ lang: culture.language, key: 'religion' })),
      idx: window.world.religions.length,
      tag: 'religion',
      leadership: window.dice.weighted_choice([
        { v: 'pontiff', w: tribal ? 0 : 1 },
        { v: 'bishops', w: tribal ? 0.5 : 1 },
        { v: 'secular', w: type === 'philosophy' ? 10 : 0 },
        { v: 'priests', w: tribal ? 1 : 0.5 },
        { v: 'none', w: tribal ? 1 : 0.5 }
      ]),
      organization: window.dice.weighted_choice([
        { v: 'geographic', w: 1 },
        { v: 'doctrinal', w: tribal ? 0 : 1 },
        { v: 'transmission', w: 1 },
        { v: 'ethnicity', w: 1 },
        { v: 'functional', w: tribal ? 0 : 1 }
      ]),
      clergy: {
        gender: window.dice.random > 0.3 ? npc__random_gender() : undefined,
        family: window.dice.choice(['none', 'rare', 'normal', 'large'])
      },
      type,
      display: window.dice.color(),
      cultures: [],
      traits: [],
      folk: tribal
    }
    window.world.religions.push(religion)
    const cultures = group.map(region => window.world.cultures[region.culture.ruling])
    cultures.forEach(culture => {
      culture.religion = religion.idx
      religion.cultures.push(culture.idx)
    })
  })
}

export const organized_religion__spawn = (): void => {
  const generic = '%ism'
  const polytheism = ['% Pantheon', '% Celestials', generic].map(name => {
    const religion: basic_religion = {
      name,
      type: name === generic && window.dice.flip ? 'polytheism' : 'polytheism'
    }
    return religion
  })
  const monotheism = ['Church of %', '% Chantry', generic].map(name => {
    const religion: basic_religion = {
      name,
      type: name === generic && window.dice.flip ? 'philosophy' : 'monotheism'
    }
    return religion
  })
  const religions = window.dice.shuffle([...polytheism, ...monotheism])
  const civil = window.world.cultures.filter(culture => culture.civilized)
  religion__spawn({ cultures: civil, religions })
}

export const folk_religion__spawn = (): void => {
  const religions = [
    '% Ancestors',
    '% Spirits',
    '% Shamanism',
    '% Loa',
    '% Animism',
    '% Totemism',
    '%ism'
  ].map(name => {
    return {
      type: 'polytheism' as const,
      name
    }
  })
  const tribal = window.world.cultures.filter(culture => !culture.civilized)
  religion__spawn({ cultures: tribal, religions, tribal: true })
}

export const religion__decorated = (religion: Religion): string => {
  const religion_name = religion.name.toLowerCase()
  return `${religion_name.includes('ism') ? '' : 'the '}${decorate_text({
    link: religion,
    label: religion_name
  })}`
}
