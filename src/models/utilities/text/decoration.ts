import { TaggedEntity } from '../codex/entities'

type CodexLinkParams = {
  tooltip?: string
  color?: string
  italics?: boolean
} & ({ link: TaggedEntity; label?: string } | { link?: TaggedEntity; label: string })

export const clean_decoration = (str: string) =>
  str.replace(/@(.*?)@/g, (_, group) => {
    const [label, , , tooltip] = group.split('|')
    return tooltip ? `${label} (${tooltip})` : label
  })

export const decorate_text = ({
  label,
  link,
  tooltip = '',
  color = '',
  italics = false
}: CodexLinkParams) =>
  `@${label ?? link.name}|${link?.idx ?? ''}|${link?.tag ?? ''}|${clean_decoration(
    tooltip
  )}|${color}|${italics}@`
