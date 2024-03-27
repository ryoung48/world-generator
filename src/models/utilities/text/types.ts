import { DetailedToolTipParams } from '../../../components/codex/common/text/styled/types'
import { TaggedEntity } from '../entities/types'

export type CodexLinkParams = {
  tooltip?: string
  color?: string
  italics?: boolean
  bold?: boolean
  underlineColor?: string
  details?: DetailedToolTipParams
} & { link?: TaggedEntity; label: string }
