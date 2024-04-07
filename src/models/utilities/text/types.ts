import { DetailedToolTipParams } from '../../../components/common/text/styled/types'

export interface TaggedEntity {
  tag: 'nation' | 'province'
  idx: number
}

export type CodexLinkParams = {
  tooltip?: string
  color?: string
  italics?: boolean
  bold?: boolean
  underlineColor?: string
  details?: DetailedToolTipParams
} & { link?: TaggedEntity; label: string }
