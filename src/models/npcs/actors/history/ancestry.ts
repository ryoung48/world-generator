import { actor__relation } from '..'
import { actor__parents } from '../spawn/relations/parent'
import { Actor } from '../types'

export interface AncestorNode {
  id: number
  parentId: number
}

export const actor__ancestry_nodes = (
  actor: Actor,
  lineage?: string,
  nodes?: Record<number, AncestorNode>
) => {
  const curr_nodes = nodes ?? {}
  const curr_lineage = lineage ?? actor.lineage
  const [parent, parent_spouse] = actor__parents(actor)
  const lineage_parent =
    parent?.lineage === curr_lineage
      ? parent
      : parent_spouse?.lineage === curr_lineage
      ? parent_spouse
      : null
  const parentId =
    lineage_parent?.idx ?? curr_nodes[parent?.idx]?.id ?? curr_nodes[parent_spouse?.idx]?.id ?? null
  curr_nodes[actor.idx] = { id: actor.idx, parentId }
  if (lineage_parent && !curr_nodes[lineage_parent.idx])
    actor__ancestry_nodes(lineage_parent, curr_lineage, curr_nodes)
  actor__relation({ actor, type: 'child' })
    .filter(child => child && !curr_nodes[child.idx])
    .forEach(child => actor__ancestry_nodes(child, curr_lineage, curr_nodes))
  return curr_nodes
}
