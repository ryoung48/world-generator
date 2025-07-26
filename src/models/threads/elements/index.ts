import { cssColors } from '../../../components/theme/colors'
import { TEXT } from '../../utilities/text'
import { THREAD_ACTORS } from './actors'
import { THREAD_LOCATIONS } from './locations'

export const THREAD_ELEMENTS = {
  roll: {
    actor: (district?: keyof typeof THREAD_ACTORS) => {
      const selected =
        district ?? (window.dice.choice(Object.keys(THREAD_ACTORS)) as keyof typeof THREAD_ACTORS)
      const { title, description } = window.dice.choice(THREAD_ACTORS[selected])
      return TEXT.decorate({ label: TEXT.titleCase(title), tooltip: description })
    },
    location: (district?: keyof typeof THREAD_LOCATIONS['urban']) => {
      const selected =
        district ??
        (window.dice.choice(
          Object.keys(THREAD_LOCATIONS.urban)
        ) as keyof typeof THREAD_LOCATIONS['urban'])
      const { title, description } = window.dice.choice(THREAD_LOCATIONS.urban[selected])
      return {
        location: TEXT.decorate({ label: title, tooltip: description, color: cssColors.subtitle }),
        district: selected
      }
    }
  }
}
