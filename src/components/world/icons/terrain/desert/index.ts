/* eslint-disable camelcase */
import { IconDef } from '../../types'
import { desert_icon } from './types'

const height = 1.75

const plantHeight = 1

export const desert__icons: Record<desert_icon, IconDef> = {
  desert_1: { height, path: 'terrain/desert/1/1.png', opacity: 0.4 },
  desert_2: { height, path: 'terrain/desert/1/2.png', opacity: 0.4 },
  desert_3: { height, path: 'terrain/desert/1/3.png', opacity: 0.4 },
  desert_4: { height, path: 'terrain/desert/1/6.png', opacity: 0.4 },
  desert_5: { height: 4, path: 'terrain/desert/2/1.png', opacity: 0.4 },
  desert_6: { height: 4, path: 'terrain/desert/2/2.png', opacity: 0.4 },
  desert_7: { height: 4, path: 'terrain/desert/2/3.png', opacity: 0.4 },
  desert_8: { height: 4, path: 'terrain/desert/2/4.png', opacity: 0.4 },
  desert_9: { height, path: 'terrain/desert/3/1.png', opacity: 0.4 },
  desert_10: { height, path: 'terrain/desert/3/2.png', opacity: 0.4 },
  desert_11: { height, path: 'terrain/desert/3/3.png', opacity: 0.4 },
  desert_12: { height, path: 'terrain/desert/3/4.png', opacity: 0.4 },
  desert_13: { height: plantHeight, path: 'terrain/desert/3/5.png', opacity: 0.4 },
  desert_14: { height: plantHeight, path: 'terrain/desert/3/6.png', opacity: 0.4 },
  desert_15: { height: plantHeight, path: 'terrain/desert/3/7.png', opacity: 0.4 }
}
