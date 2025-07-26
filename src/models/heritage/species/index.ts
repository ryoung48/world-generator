import { PROVINCE } from '../../provinces'
import { Culture } from '../types'
import { Species, SpeciesAppearance, SpeciesAppearanceParams, SpeciesBuilder } from './types'

type HairTextures = Culture['appearance']['hair']['textures'][number][]

const furColoration: SpeciesBuilder['appearance'] = () => ({
  skin: {
    colors: window.dice.sample(
      ['mahogany', 'dark brown', 'light brown', 'pale grey', 'greyish-blue', 'dark grey'],
      2
    )
  }
})

const orcColoration: SpeciesBuilder['appearance'] = ({ zone }) => {
  const textures: HairTextures = window.dice.choice([
    ['straight', 'wavy'],
    ['wavy', 'curly']
  ])
  if (zone === 'tropical' || zone === 'subtropical') {
    return {
      skin: { colors: window.dice.sample(['mahogany', 'copper', 'ochre'], 2) },
      hair: { colors: ['brown', 'black'], textures }
    }
  } else if (zone === 'temperate' || zone === 'boreal') {
    return {
      skin: { colors: window.dice.sample(['greyish-green', 'olive', 'dark green'], 2) },
      hair: { colors: ['auburn', 'brown', 'black'], textures }
    }
  } else {
    return {
      skin: { colors: window.dice.sample(['dark grey', 'greyish-blue', 'pale grey'], 2) },
      hair: { colors: ['auburn', 'brown', 'black'], textures }
    }
  }
}

const humanTones: SpeciesBuilder['appearance'] = ({ latitude: lat, eastern }) => {
  if (lat <= 18) {
    return {
      skin: { colors: ['light brown', 'dark brown'] },
      hair: { colors: ['brown', 'black'], textures: ['wavy', 'curly', 'kinky'] }
    }
  } else if (lat > 18 && lat <= 32) {
    return {
      skin: { colors: ['dark tan', 'light brown'] },
      hair: { colors: ['brown', 'black'], textures: ['straight', 'wavy', 'curly'] }
    }
  } else if (lat > 32 && lat <= 50) {
    return {
      skin: { colors: ['light tan', 'dark tan'] },
      hair: { colors: ['auburn', 'brown', 'black'], textures: ['straight', 'wavy', 'curly'] }
    }
  } else if (lat > 50 && lat <= 72) {
    return {
      skin: { colors: ['fair', 'light tan'] },
      hair: { colors: ['blond', 'red', 'brown', 'black'], textures: ['straight', 'wavy'] }
    }
  } else {
    return {
      skin: { colors: eastern ? ['light tan', 'dark tan'] : ['fair', 'light tan'] },
      hair: {
        colors: eastern ? ['auburn', 'brown', 'black'] : ['blond', 'red', 'brown'],
        textures: ['straight']
      }
    }
  }
}

const goblinColoration: SpeciesBuilder['appearance'] = ({ zone }) => {
  const textures: HairTextures = ['straight', 'wavy']
  if (zone === 'tropical' || zone === 'subtropical') {
    return {
      skin: { colors: window.dice.sample(['olive', 'greyish-green', 'dark green'], 2) },
      hair: { colors: ['black', 'brown'], textures }
    }
  } else if (zone === 'temperate' || zone === 'boreal') {
    return {
      skin: { colors: window.dice.sample(['greyish-blue', 'pale grey', 'dark grey'], 2) },
      hair: { colors: ['black', 'brown'], textures }
    }
  } else {
    return {
      skin: { colors: window.dice.sample(['pale grey', 'blue-grey', 'dark grey'], 2) },
      hair: { colors: ['black', 'brown'], textures }
    }
  }
}

const arthropodColoration: SpeciesBuilder['appearance'] = ({ zone }) => {
  if (zone === 'tropical' || zone === 'subtropical') {
    return {
      skin: {
        colors: window.dice.sample(['iridescent green', 'metallic blue', 'copper', 'gold'], 2),
        texture: window.dice.choice(['chitinous', 'segmented', 'crystalline'])
      }
    }
  } else if (zone === 'temperate' || zone === 'boreal') {
    return {
      skin: {
        colors: window.dice.sample(['iridescent purple', 'metallic silver', 'bronze', 'pearl'], 2),
        texture: window.dice.choice(['chitinous', 'segmented', 'crystalline'])
      }
    }
  } else {
    return {
      skin: {
        colors: window.dice.sample(['iridescent blue', 'metallic grey', 'silver', 'white'], 2),
        texture: window.dice.choice(['chitinous', 'segmented', 'crystalline'])
      }
    }
  }
}

const molluscColoration: SpeciesBuilder['appearance'] = ({ zone }) => {
  if (zone === 'tropical' || zone === 'subtropical') {
    return {
      skin: {
        colors: window.dice.sample(['pearl', 'coral', 'pink', 'orange'], 2),
        texture: window.dice.choice(['smooth', 'ridged', 'spiraled'])
      }
    }
  } else if (zone === 'temperate' || zone === 'boreal') {
    return {
      skin: {
        colors: window.dice.sample(['blue', 'purple', 'teal', 'green'], 2),
        texture: window.dice.choice(['smooth', 'ridged', 'spiraled'])
      }
    }
  } else {
    return {
      skin: {
        colors: window.dice.sample(['white', 'silver', 'pale blue', 'pale purple'], 2),
        texture: window.dice.choice(['smooth', 'ridged', 'spiraled'])
      }
    }
  }
}

const lookup: Record<Species, SpeciesBuilder> = {
  human: {
    traits: { skin: 'skin', height: 'average', bmi: 22, age: 'average' },
    appearance: humanTones
  },
  elf: {
    traits: { skin: 'skin', height: 'average', bmi: 21, age: 'ancient' },
    appearance: ({ zone }) => {
      const textures: HairTextures = ['straight', 'wavy']
      if (zone === 'tropical' || zone === 'subtropical') {
        return window.dice.choice([
          {
            skin: {
              colors: window.dice.choice([
                ['dark purple', 'dark blue'],
                ['greyish-purple', 'greyish-blue']
              ])
            },
            hair: { colors: ['white', 'blond', 'brown', 'black'], textures }
          },
          {
            skin: {
              colors: ['golden', 'copper']
            },
            hair: { colors: ['blond', 'brown', 'auburn'], textures }
          }
        ])
      } else if (zone === 'temperate' || zone === 'boreal') {
        return {
          skin: { colors: window.dice.sample(['fair', 'light tan', 'dark tan'], 2) },
          hair: { colors: ['auburn', 'brown', 'red', 'black'], textures }
        }
      } else {
        return {
          skin: { colors: ['fair', 'pale'] },
          hair: { colors: ['blond', 'white'], textures }
        }
      }
    }
  },
  satyr: {
    traits: { skin: 'skin', height: 'average', bmi: 22, age: 'average', horns: true },
    appearance: ({ zone }) => {
      const textures: HairTextures = ['straight', 'wavy', 'curly']
      if (zone === 'tropical' || zone === 'subtropical') {
        return {
          skin: { colors: ['red', 'dark red'] },
          hair: { colors: ['white', 'blond', 'brown', 'black'], textures }
        }
      } else if (zone === 'temperate' || zone === 'boreal') {
        return {
          skin: { colors: ['purple', 'dark purple'] },
          hair: { colors: ['white', 'blond', 'brown', 'black'], textures }
        }
      } else {
        return {
          skin: { colors: ['blue', 'dark blue'] },
          hair: { colors: ['white', 'blond', 'brown', 'black'], textures }
        }
      }
    }
  },
  verdant: {
    traits: { skin: 'skin', height: 'average', bmi: 22, age: 'average' },
    appearance: ({ zone }) => {
      const textures: HairTextures = ['straight', 'wavy', 'curly']
      const skin = window.dice.choice(['smooth bark', 'fibrous bark', 'fungal', 'mossy'])
      if (zone === 'tropical' || zone === 'subtropical') {
        return {
          skin: { colors: ['green', 'dark green'], texture: skin },
          hair: { colors: ['green', 'blond', 'red', 'brown'], textures }
        }
      } else if (zone === 'temperate' || zone === 'boreal') {
        return {
          skin: { colors: ['olive', 'light brown'], texture: skin },
          hair: { colors: ['white', 'blond', 'brown'], textures }
        }
      } else {
        return {
          skin: { colors: ['dark grey', 'pale grey'], texture: skin },
          hair: { colors: ['white', 'blond', 'brown'], textures }
        }
      }
    }
  },
  lithic: {
    traits: { skin: 'skin', height: 'average', bmi: 22, age: 'average' },
    appearance: () => {
      const textures: HairTextures = ['straight', 'wavy', 'curly']
      const skin = window.dice.choice([
        'crystalline clusters',
        'metallic veins',
        'smooth marble',
        'cracked stone'
      ])
      return {
        skin: {
          colors: window.dice.sample(['pale grey', 'dark grey', 'white', 'black'], 2),
          texture: skin
        },
        hair: { colors: ['blond', 'auburn', 'brown', 'black'], textures }
      }
    }
  },
  dwarf: {
    traits: { skin: 'skin', height: 'short', bmi: 25, age: 'venerable', facialHair: 1 },
    appearance: ({ latitude: lat }) => {
      const textures: HairTextures = ['straight', 'wavy', 'curly']
      if (lat <= 18) {
        return {
          skin: { colors: ['pale grey', 'dark grey'] },
          hair: { colors: ['auburn', 'red', 'black'], textures },
          facialHair: 1
        }
      } else if (lat > 18 && lat <= 32) {
        return {
          skin: { colors: ['dark tan', 'light brown'] },
          hair: { colors: ['brown', 'black'], textures },
          facialHair: 1
        }
      } else if (lat > 32 && lat <= 45) {
        return {
          skin: { colors: ['light tan', 'dark tan'] },
          hair: { colors: ['auburn', 'brown', 'black'], textures },
          facialHair: 1
        }
      } else if (lat > 45 && lat <= 65) {
        return {
          skin: { colors: ['fair', 'light tan'] },
          hair: { colors: ['blond', 'red', 'brown'], textures },
          facialHair: 1
        }
      } else {
        return {
          skin: { colors: ['light tan', 'dark tan'] },
          hair: { colors: ['auburn', 'brown', 'black'], textures },
          facialHair: 1
        }
      }
    }
  },
  orlan: {
    traits: { skin: 'skin', height: 'small', bmi: 22, age: 'fleeting' },
    appearance: ({ zone }) => {
      const textures: HairTextures = ['straight', 'wavy', 'curly']
      if (zone === 'tropical' || zone === 'subtropical') {
        return {
          skin: { colors: window.dice.sample(['dark green', 'olive', 'greyish-green'], 2) },
          hair: { colors: ['auburn', 'brown', 'blond'], textures }
        }
      } else if (zone === 'temperate' || zone === 'boreal') {
        return {
          skin: { colors: ['fair', 'light tan'], texture: '50% fur' },
          hair: { colors: ['auburn', 'brown', 'black'], textures }
        }
      } else {
        return {
          skin: { colors: ['fair', 'light tan'], texture: '90% fur' },
          hair: { colors: ['auburn', 'brown', 'blond'], textures }
        }
      }
    }
  },
  orc: {
    traits: { skin: 'skin', height: 'tall', bmi: 25, age: 'fleeting' },
    appearance: orcColoration
  },
  bovine: {
    traits: { skin: 'fur', height: 'large', bmi: 25, age: 'average', horns: true },
    appearance: furColoration
  },
  feline: {
    traits: { skin: 'fur', height: 'average', bmi: 22, age: 'average' },
    appearance: furColoration
  },
  gnoll: {
    traits: { skin: 'fur', height: 'average', bmi: 25, age: 'fleeting' },
    appearance: furColoration
  },
  avian: {
    traits: {
      skin: 'feathers',
      height: 'average',
      bmi: 23,
      age: 'enduring',
      piercings: false,
      facialHair: 0
    },
    appearance: ({ zone }) => {
      if (zone === 'tropical' || zone === 'subtropical') {
        return {
          skin: { colors: window.dice.sample(['blue', 'green', 'olive', 'light brown'], 2) }
        }
      } else if (zone === 'temperate' || zone === 'boreal') {
        return {
          skin: {
            colors: window.dice.sample(['dark red', 'burgundy', 'magenta', 'red', 'orange'], 2)
          }
        }
      } else {
        return {
          skin: { colors: window.dice.sample(['dark purple', 'indigo', 'purple', 'black'], 2) }
        }
      }
    }
  },
  draconic: {
    traits: {
      skin: 'scales',
      height: 'tall',
      bmi: 25,
      age: 'enduring',
      piercings: false,
      facialHair: 0
    },
    appearance: ({ zone }) => {
      if (zone === 'tropical' || zone === 'subtropical') {
        return {
          skin: { colors: window.dice.sample(['vermilion', 'ochre', 'dark red', 'red'], 2) }
        }
      } else if (zone === 'temperate' || zone === 'boreal') {
        return {
          skin: { colors: window.dice.sample(['green', 'olive', 'dark green', 'teal'], 2) }
        }
      } else {
        return {
          skin: { colors: window.dice.sample(['greyish-purple', 'blue', 'greyish-blue'], 2) }
        }
      }
    }
  },
  goblin: {
    traits: { skin: 'skin', height: 'small', bmi: 20, age: 'fleeting' },
    appearance: goblinColoration
  },
  arthropod: {
    traits: {
      skin: 'carapace',
      height: 'average',
      bmi: 23,
      age: 'average',
      piercings: false,
      facialHair: 0
    },
    appearance: arthropodColoration
  },
  mollusc: {
    traits: {
      skin: 'skin',
      height: 'average',
      bmi: 24,
      age: 'average',
      facialHair: 0
    },
    appearance: molluscColoration
  }
}

const femaleHairStyles = ['long', 'short', 'ponytail', 'topknot', 'braided', 'bun'] as const
const hairStyles = (): Culture['appearance']['hair']['styles'] => {
  const dist = window.dice.uniformDist(4)
  return {
    male: [
      { v: 'short', w: 70 },
      { v: 'long', w: 20 },
      { v: window.dice.choice(['ponytail', 'braided']), w: 10 }
    ],
    female: window.dice
      .sample([...femaleHairStyles], 4)
      .map((style, i) => ({ v: style, w: dist[i] }))
  }
}

const facialHair = (chance = window.dice.choice([0.3, 0.6, 0.8, 0.9])) => {
  const base = {
    chance,
    styles: ['trimmed beard'] as Culture['appearance']['facialHair']['styles']
  }
  if (base.chance > 0.3) base.styles.push('full beard')
  if (base.chance > 0.5) base.styles.push(window.dice.choice(['thick beard', 'braided beard']))
  return base
}

const eyeColors: Record<'common' | 'uncommon' | 'rare', Culture['appearance']['eyes']['colors']> = {
  common: ['brown', 'hazel'],
  uncommon: ['blue', 'green', 'copper', 'olive', 'burgundy'],
  rare: ['yellow', 'amber', 'ochre', 'purple', 'indigo', 'magenta']
}
const eyes = () => {
  const common = window.dice.shuffle(eyeColors.common)
  const colors = common.splice(0, 1)
  const uncommon = window.dice.shuffle([...common, ...eyeColors.uncommon])
  colors.push(...uncommon.splice(0, 3))
  const rare = window.dice.shuffle([...uncommon, ...window.dice.sample(eyeColors.rare, 2)])
  colors.push(rare.pop())
  return {
    colors
  }
}

export const SPECIES = {
  lookup: lookup,
  appearance: ({ province, species }: SpeciesAppearanceParams): SpeciesAppearance => {
    const cell = PROVINCE.cell(province)
    const { skin, hair } = lookup[species].appearance({
      latitude: Math.abs(cell.y),
      zone: cell.climate
    })
    return {
      skin,
      eyes: eyes(),
      hair: hair ? { ...hair, styles: hairStyles() } : undefined,
      facialHair: facialHair(lookup[species].traits?.facialHair)
    }
  }
}
