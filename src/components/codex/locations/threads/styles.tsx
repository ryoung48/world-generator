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

import { css_colors } from '../../../theme/colors'

export const style__thread_failures = css`
  color: ${css_colors.primary};
`
export const style__disabled_thread = css`
  background-color: #e5e5e5 !important;
`

export const thread__icons = {
  perfection: { icon: CheckCircle, color: css_colors.difficulty.easy },
  success: { icon: CheckBold, color: css_colors.difficulty.easy },
  pyrrhic: { icon: CloseThick, color: css_colors.difficulty.hard },
  failure: { icon: CloseCircle, color: css_colors.difficulty.hard },
  abandoned: { icon: CloseCircle, color: 'gray' },
  blocked: { icon: Skull, color: 'gray' },
  fresh: { icon: AlertCircle, color: css_colors.difficulty.medium },
  'in progress': { icon: ExclamationThick, color: css_colors.difficulty.medium },
  paused: { icon: PauseCircle, color: 'gray' }
}
