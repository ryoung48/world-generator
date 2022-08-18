import { world__gps } from '../../../../world'
import { climateLookup } from '../../../../world/climate/types'
import { humanoid__spawn } from '../common'
import { eyeColor, facialHair, hairStyles, nosePiercings } from '../common/appearance'
import { Humanoid, HumanoidAppearance } from '../types'
import { demihuman__species } from './types'

export const humanoids__demihumans: Record<demihuman__species, Humanoid> = {
  elf: humanoid__spawn({
    name: 'elf',
    age: 'ancient',
    height: 'average',
    bmi: 21,
    appearance: point => {
      const { longitude } = world__gps(point)
      const province = window.world.provinces[point.province]
      const region = window.world.regions[province.region]
      const { zone } = climateLookup[region.climate]
      const eyes = eyeColor({ longitude })
      const skin = { type: 'skin', colors: ['fair'] }
      const styles = hairStyles()
      const hair = {
        hair: {
          textures: ['straight', 'wavy'],
          colors: ['black'],
          styles: {
            male: [
              { v: 'short', w: 30 },
              { v: 'long', w: 50 },
              { v: 'ponytail', w: 15 },
              { v: 'bald', w: 5 }
            ],
            female: styles.female
          }
        },
        facialHair: {
          chance: window.dice.choice([0, 0, 0.2]),
          styles: ['trimmed beard']
        }
      }
      if (zone === 'Tropical') {
        skin.colors = window.dice.sample(
          ['dark purple', 'dark blue', 'greyish-purple', 'greyish-blue'],
          3
        )
        hair.hair.colors = ['white', 'blond', 'brown', 'black']
      } else if (zone === 'Temperate') {
        skin.colors = ['fair', 'light tan', 'dark tan']
        hair.hair.colors = ['auburn', 'red', 'black', 'blond']
      } else {
        skin.colors = ['fair', 'pale']
        hair.hair.colors = ['blond', 'white']
      }
      return { skin, eyes, ...hair, tattoos: true }
    }
  }),
  dwarf: humanoid__spawn({
    name: 'dwarf',
    age: 'venerable',
    height: 'short',
    bmi: 25,
    appearance: point => {
      const { latitude, longitude } = world__gps(point)
      const lat = Math.abs(latitude)
      const eyes = eyeColor({ longitude })
      const skin = { type: 'skin', colors: ['fair'] }
      const hair = { textures: ['straight', 'wavy'], colors: ['black'], styles: hairStyles() }
      const beards = {
        chance: 1,
        styles: ['full beard', 'thick beard', 'braided beard']
      }
      if (lat <= 18) {
        skin.colors = ['pale gray', 'ashen gray']
        hair.colors = ['auburn', 'red', 'black']
      } else if (lat > 18 && lat <= 32) {
        skin.colors = ['dark tan', 'light brown']
        hair.colors = ['brown', 'black']
      } else if (lat > 32 && lat <= 45) {
        skin.colors = ['light tan', 'dark tan']
        hair.colors = ['auburn', 'brown', 'black']
      } else if (lat > 45 && lat <= 65) {
        skin.colors = ['fair', 'light tan']
        hair.colors = ['blond', 'red', 'brown']
      } else {
        skin.colors = ['light tan', 'dark tan']
        hair.colors = ['auburn', 'brown', 'black']
        beards.chance = 0.2
        beards.styles = ['trimmed bread']
      }
      return {
        skin,
        eyes,
        hair,
        facialHair: beards,
        tattoos: true
      }
    }
  }),
  orlan: humanoid__spawn({
    name: 'orlan',
    age: 'fleeting',
    height: 'small',
    bmi: 22,
    appearance: point => {
      const { longitude } = world__gps(point)
      const province = window.world.provinces[point.province]
      const region = window.world.regions[province.region]
      const { zone } = climateLookup[region.climate]
      const eyes = eyeColor({ longitude })
      const skin: HumanoidAppearance['skin'] = { type: 'skin', colors: ['fair'] }
      const hair = {
        textures: ['straight', 'wavy'],
        colors: ['brown', ...window.dice.sample(['blond', 'red', 'auburn', 'black'], 2)],
        styles: hairStyles()
      }
      const tropical = zone === 'Tropical'
      if (tropical) {
        skin.texture = '50% fur'
        skin.colors = ['dark green', 'olive', 'greyish-green']
        hair.colors = ['auburn', 'brown', 'blond']
      } else if (zone === 'Temperate') {
        skin.texture = '50% fur'
        skin.colors = ['fair', 'light tan']
        hair.textures = ['curly', 'wavy']
      } else {
        skin.type = 'fur'
        skin.colors = window.dice.sample(
          ['mahogany', 'dark brown', 'light brown', 'sandy brown', 'greyish-blue'],
          3
        )
      }
      return {
        skin,
        eyes,
        hair: skin.type === 'fur' ? undefined : hair,
        facialHair: !tropical ? facialHair() : undefined,
        tattoos: tropical,
        nosePiercing: tropical ? nosePiercings : undefined
      }
    }
  }),
  firbolg: humanoid__spawn({
    name: 'firbolg',
    height: 'tall',
    age: 'enduring',
    bmi: 22,
    appearance: point => {
      const { longitude } = world__gps(point)
      const province = window.world.provinces[point.province]
      const region = window.world.regions[province.region]
      const { zone } = climateLookup[region.climate]
      const eyes = eyeColor({ longitude })
      const skin = { type: 'fur', colors: ['fair'] }
      if (zone === 'Tropical') {
        skin.colors = ['mahogany', 'dark brown']
      } else if (zone === 'Temperate') {
        skin.colors = ['light tan', 'dark tan', 'light brown']
      } else {
        skin.colors = ['pale gray', 'greyish-blue', 'ashen gray']
      }
      const styles = hairStyles()
      const bald = styles.male.find(({ v }) => v === 'bald')
      bald.w = 0
      return {
        skin,
        eyes,
        hair: {
          textures: ['straight', 'wavy', 'curly'],
          colors: window.dice.sample(['red', 'auburn', 'brown', 'blond'], 3),
          styles
        },
        facialHair: {
          chance: 0.2,
          styles: ['thick beard', 'braided beard']
        },
        tattoos: false
      }
    }
  }),
  orc: humanoid__spawn({
    name: 'orc',
    height: 'tall',
    age: 'fleeting',
    bmi: 25,
    appearance: point => {
      const { longitude } = world__gps(point)
      const province = window.world.provinces[point.province]
      const region = window.world.regions[province.region]
      const { zone } = climateLookup[region.climate]
      const eyes = eyeColor({ longitude })
      const skin = { type: 'skin', colors: ['fair'] }
      const styles = hairStyles()
      const hair = {
        textures: window.dice.choice([
          ['straight', 'wavy'],
          ['wavy', 'curly'],
          ['curly', 'kinky']
        ]),
        colors: ['black'],
        styles: {
          male: [
            { v: 'short', w: 45 },
            { v: 'long', w: 20 },
            { v: window.dice.choice(['ponytail', 'braided']), w: 20 },
            { v: 'bald', w: 15 }
          ],
          female: styles.female
        }
      }
      if (zone === 'Tropical') {
        skin.colors = ['mahogany', 'copper', 'ochre']
        hair.colors = ['brown', 'black']
      } else if (zone === 'Temperate') {
        skin.colors = ['greyish-green', 'olive', 'dark green']
        hair.colors = ['auburn', 'brown', 'black']
      } else {
        skin.colors = ['ashen gray', 'greyish-blue', 'pale gray']
        hair.colors = ['auburn', 'brown', 'black']
      }
      return {
        skin,
        eyes,
        hair,
        facialHair: {
          chance: 0.3,
          styles: ['full beard', 'thick beard', 'braided beard']
        },
        nosePiercing: nosePiercings,
        tattoos: true
      }
    }
  }),
  ogre: humanoid__spawn({
    name: 'ogre',
    age: 'fleeting',
    height: 'large',
    bmi: 25,
    appearance: point => {
      const { latitude, longitude } = world__gps(point)
      const lat = Math.abs(latitude)
      const eyes = eyeColor({ longitude })
      const skin = { type: 'skin', colors: ['fair'] }
      const styles = hairStyles()
      const hair = {
        textures: window.dice.choice([
          ['straight', 'wavy'],
          ['wavy', 'curly'],
          ['curly', 'kinky']
        ]),
        colors: ['black'],
        styles: {
          male: [{ v: 'bald', w: 1 }],
          female: styles.female
        }
      }
      if (lat <= 18) {
        skin.colors = ['light brown', 'dark brown']
        hair.colors = ['brown', 'black']
      } else if (lat > 18 && lat <= 32) {
        skin.colors = ['dark tan', 'light tan']
        hair.colors = ['black', 'auburn', 'brown']
      } else if (lat > 32 && lat <= 50) {
        skin.colors = ['pale gray', 'light tan']
        hair.colors = ['black', 'auburn', 'brown']
      } else if (lat > 50 && lat <= 72) {
        skin.colors = ['greyish-blue', 'ashen gray']
        hair.colors = ['blond', 'red', 'auburn', 'brown']
      } else {
        skin.colors = ['alabaster', 'pale gray']
        hair.colors = ['blond', 'red', 'auburn']
      }
      return {
        skin,
        eyes,
        hair,
        facialHair: {
          chance: 0.3,
          styles: ['full beard', 'thick beard', 'braided beard']
        },
        tattoos: true
      }
    }
  })
}
