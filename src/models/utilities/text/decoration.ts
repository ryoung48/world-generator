import { TaggedEntity } from '../codex/entities'

type CodexLinkParams = {
  tooltip?: string
  color?: string
  italics?: boolean
  bold?: boolean
  underlineColor?: string
} & ({ link: TaggedEntity; label?: string } | { link?: TaggedEntity; label: string })

export const cleanDecoration = (str: string) =>
  str.replace(/@(.*?)@/g, (_, group) => {
    const [label, , , tooltip] = group.split('|')
    return tooltip ? `${label} (${tooltip})` : label
  })

export const decorateText = ({
  label,
  link,
  tooltip = '',
  color = '',
  italics = false,
  bold = false,
  underlineColor = ''
}: CodexLinkParams) =>
  `@${label ?? link.name}##${link?.idx ?? ''}##${link?.tag ?? ''}##${cleanDecoration(
    tooltip
  )}##${color}##${italics}##${bold}##${underlineColor}@`
