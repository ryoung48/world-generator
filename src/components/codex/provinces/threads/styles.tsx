import { css } from '@emotion/css'
import {
  CheckBold,
  CheckCircle,
  ChevronDoubleRight,
  CloseCircle,
  CloseThick,
  ExclamationThick,
  PauseCircle,
  Skull
} from 'mdi-material-ui'

import { cssColors } from '../../../theme/colors'

export const style__disabledThread = css`
  background-color: #e5e5e5 !important;
`

export const style__closedThread = css`
  background-color: #e2e2e2 !important;
`

export const thread__icons = {
  perfection: { Icon: CheckCircle, color: cssColors.difficulty.easy },
  success: { Icon: CheckBold, color: cssColors.difficulty.easy },
  pyrrhic: { Icon: CloseThick, color: cssColors.difficulty.hard },
  failure: { Icon: CloseCircle, color: cssColors.difficulty.hard },
  abandoned: { Icon: CloseCircle, color: 'gray' },
  blocked: { Icon: Skull, color: 'gray' },
  'in progress': { Icon: ExclamationThick, color: cssColors.difficulty.medium },
  paused: { Icon: PauseCircle, color: 'gray' },
  transit: { Icon: ChevronDoubleRight, color: 'gray' }
}
