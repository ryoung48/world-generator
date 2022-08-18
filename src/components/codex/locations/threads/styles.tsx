import { css } from '@emotion/css'
import {
  AlertCircle,
  CheckBold,
  CheckCircle,
  CloseCircle,
  CloseThick,
  ExclamationThick,
  PauseCircle,
  Skull
} from 'mdi-material-ui'

import { cssColors } from '../../../theme/colors'

export const style__threadFailures = css`
  color: ${cssColors.primary};
`
export const style__disabledThread = css`
  background-color: #e5e5e5 !important;
`

export const thread__icons = {
  perfection: { icon: CheckCircle, color: cssColors.difficulty.easy },
  success: { icon: CheckBold, color: cssColors.difficulty.easy },
  pyrrhic: { icon: CloseThick, color: cssColors.difficulty.hard },
  failure: { icon: CloseCircle, color: cssColors.difficulty.hard },
  abandoned: { icon: CloseCircle, color: 'gray' },
  blocked: { icon: Skull, color: 'gray' },
  fresh: { icon: AlertCircle, color: cssColors.difficulty.medium },
  'in progress': { icon: ExclamationThick, color: cssColors.difficulty.medium },
  paused: { icon: PauseCircle, color: 'gray' }
}
