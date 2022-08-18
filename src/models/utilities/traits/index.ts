import { colors__randomPreset } from '../colors'
import { Trait, TraitEnriched } from './types'

export const entity__traits = <tags extends string, args extends { entity: TraitEnriched<tags> }>({
  traits,
  tag
}: {
  traits: Record<tags, Trait<tags, args>>
  tag: string
}) => {
  const traitList = Object.values<Trait<tags, args>>(traits)

  return {
    colors: colors__randomPreset({
      tags: traitList.map(trait => trait.tag),
      seed: `${tag} traits`,
      dark: true
    }),
    spawn: (
      params: {
        trait?: Trait<tags, args>
        filter?: (_trait: Trait<tags, args>) => boolean
      } & args
    ) => {
      const validTraits = traitList.filter(params.filter ?? (() => true))
      const {
        entity,
        trait = window.dice.weightedChoice(
          validTraits.map(trait => {
            const { conflicts } = traits[trait.tag]
            const used = entity.traits.some(
              ({ tag }) => trait.tag === tag || conflicts?.includes(tag)
            )
            return { v: trait, w: used ? 0 : trait.spawn(params) }
          })
        )
      } = params
      entity.traits = [...entity.traits, { tag: trait.tag, text: trait.text(params) }]
    }
  }
}
