import { properSentences } from '../../../utilities/text'
import { hub__alias, hub__isVillage } from '..'
import { Hub } from '../types'
import { HubTrait, HubTraitDetails } from './types'

const traits: Record<HubTrait, HubTraitDetails> = {
  'ancient infrastructure': {
    text: '{settlement} still has access to a functioning ancient {teleportation nexus|arcane essence distillation|arcane guardian constructs|community-wide climate control|subterranean hydroponic gardens|water purification system}'
  },
  'black market': {
    text: '{settlement} has a thriving underground economy where illegal goods and services can be bought and sold',
    urban: true
  },
  'buried ruins': {
    text: '{settlement} was built on top of old ruins ({built over accidentally|intentionally buried|excavation in progress})'
  },
  'chaotic layout': {
    text: '{settlement} is a sprawling maze of streets and buildings, making it difficult to navigate and easy to get lost',
    urban: true
  },
  'corrupt laws': {
    text: '{settlement} has a reputation for having a weak legal system and is a haven for corruption and vice',
    urban: true,
    conflicts: ['draconian laws']
  },
  "coup d'etat": {
    text: 'a group of conspirators are plotting to overthrow the local leadership and seize control of {settlement}'
  },
  'cultural center': {
    text: '{settlement} is renowned for its art, music, and literature; it attracts scholars and artists from across the region',
    urban: true
  },
  'defiled land': {
    text: 'the land around {settlement} has been poisoned by an ancient curse, leaving it {barren and desolate|corrupted and savage}',
    conflicts: ['prosperous land']
  },
  'despotic lord': {
    text: '{settlement} is ruled with an iron fist, crushing any hint of resistance and demanding extravagant service from the locals',
    conflicts: ['incompetent leaders', 'neglectful ruler']
  },
  'divine intervention': {
    text: 'the people of {settlement} believe that their settlement has been blessed by a powerful deity, who watches over them and occasionally performs miracles'
  },
  'draconian laws': {
    text: '{settlement} is governed by a strict and oppressive legal system, enforced by a powerful and ruthless army of enforcers',
    urban: true,
    conflicts: ['corrupt laws']
  },
  'dueling warlords': {
    text: '{settlement} is engaged in limited warfare over disputed territory'
  },
  'dying forest': {
    text: 'the once-vibrant forest that surrounds {settlement} is slowly dying, its trees and wildlife withering away under mysterious circumstances',
    conflicts: ['prosperous land'],
    urban: false
  },
  'ethnic tensions': {
    text: 'tensions are rising between two rival ethnic groups and it seems like a violent conflict may be imminent',
    urban: true,
    conflicts: ['oppressed minority']
  },
  'faded remnant': {
    text: '{settlement} is a decaying city of crumbling ruins and abandoned buildings, once a grand metropolis now reduced to a shadow of its former glory',
    conflicts: ['prosperous land']
  },
  'foreign enclave': {
    text: '{settlement} is home to a large number of {migrants|exiles|refugees} ({wealthy|poor}) who have settled here',
    conflicts: ['population boom']
  },
  'fortress monastery': {
    text: '{settlement} is a remote fortress that houses a powerful monastic order dedicated to a particular {god|philosophy}',
    urban: false
  },
  'fungal garden': {
    text: 'the locals of {settlement} have developed a thriving industry growing exotic and unusual plants and fungi',
    conflicts: ['fungal infestation']
  },
  'fungal infestation': {
    text: 'a strange fungus has taken root in the buildings and tunnels of {settlement}, causing sickness and madness among the locals',
    conflicts: ['fungal garden', 'prosperous land'],
    urban: false
  },
  'gang warfare': {
    text: 'this {settlement} is plagued by constant fighting between rival criminal {gangs|cartels|syndicates}',
    urban: true
  },
  'grand library': {
    text: '{settlement} is home to a vast library containing ancient texts and knowledge, drawing scholars and seekers of arcane knowledge from far and wide',
    urban: true,
    conflicts: ['magical academy']
  },
  'great famine': {
    text: 'multiple failed harvests have left {settlement} on the brink of starvation'
  },
  'guild oligarchy': {
    text: 'the politics of {settlement} are dominated by the various craft guilds, each vying for power and influence',
    urban: true
  },
  'harsh occupation': {
    text: '{settlement} is under the control of a foreign army that is imposing harsh and oppressive rule',
    warfare: true
  },
  'heavy fortification': {
    text: '{settlement} is a military bastion that is heavily fortified and protected by a {large|small} garrison of professional soldiers'
  },
  'heretical beliefs': {
    text: '{settlement} is home to a heretical sect of a major religion that is disrupting old patterns of authority and worship',
    conflicts: ['syncretic faith', 'remnant faith', 'reformist struggle']
  },
  'hidden ruler': {
    text: 'while {settlement} has a public leader, the real authority ({cultists|criminals|foreigners}) is hidden from outsiders'
  },
  'hostile terrain': {
    text: '{settlement} is surrounded by a harsh and inhospitable environment that makes travel to and from other provinces difficult',
    urban: false
  },
  'incompetent leaders': {
    text: 'the leaders of {settlement} are incompetent and corrupt, and the locals are suffering as a result',
    conflicts: ['despotic lord', 'neglectful ruler']
  },
  'invading army': {
    text: 'there is an army in the area, and it has little inclination to be gentle with the locals',
    warfare: true
  },
  'knightly order': {
    text: '{settlement} is home to a powerful order of knights that is dedicated to a particular {god|philosophy}',
    urban: true,
    conflicts: ['mercenary companies']
  },
  'lawless chaos': {
    text: 'local authority has broken down entirely in {settlement} with looters pillaging wealthier districts'
  },
  'magical academy': {
    text: '{settlement} is home to a prestigious magical academy that attracts students from across the region',
    urban: true,
    conflicts: ['grand library']
  },
  'merchant council': {
    text: '{settlement} is governed by a council of wealthy merchant princes who are dedicated to the prosperity of the settlement',
    urban: true
  },
  'monstrous tribute': {
    text: 'the locals of this {settlement} have cut a deal with some unspeakable entity {spirit|undead|aberration|beast|primordial} and make regular sacrifices in hopes of continued {forbearance|protection}',
    urban: false
  },
  'mercenary companies': {
    text: '{settlement} is home to numerous mercenary companies that are often hired out to the highest bidder',
    urban: true,
    conflicts: ['knightly order']
  },
  'natural disaster': {
    text: 'a recent {flood|earthquake|landslide|volcanic eruption|tornado|drought} has devastated {settlement} and the surrounding area'
  },
  'neglectful ruler': {
    text: 'the ruler of {settlement} has little interest in the affairs of the locals and is often absent',
    conflicts: ['incompetent leaders', 'despotic lord']
  },
  'new industry': {
    text: 'a new mining operation has recently been established in the area and is disrupting old patterns of authority'
  },
  'nomadic traders': {
    text: '{settlement} is frequently visited by a nomadic {clans|tribes} ({native|diaspora}) seeking to exchange goods and services'
  },
  'opulent court': {
    text: 'the local leadership of {settlement} lives a life of luxury and extravagance, surrounded by sycophantic courtiers and lavish displays of wealth'
  },
  'oppressed minority': {
    text: 'a minority group within {settlement} is subject to discrimination, prejudice, and persecution by the ruling majority',
    conflicts: ['ethnic tensions'],
    urban: true
  },
  'old wounds': {
    text: '{settlement} was the site of a great conflict years ago, and the wounds of that conflict still run deep among the people here',
    conflicts: ['recent brutality']
  },
  'pilgrimage site': {
    text: '{settlement} hosts a popular pilgrimage site ({religious|cultural|historic|ancient}) that draws visitors from all over the region'
  },
  'pirate haven': {
    text: '{settlement} is a popular port of call for {pirates|slavers|raiders} who use it as a base of operations',
    coastal: true,
    conflicts: ['raider scourge']
  },
  'plague outbreak': {
    text: 'a terrible contagion has broken out in {settlement} and is spreading rapidly'
  },
  'poacher problems': {
    text: '{settlement} is plagued by poachers who hunt the local wildlife for profit',
    urban: false
  },
  'population boom': {
    text: 'a vast influx of {exiles|migrants|refugees} has recently rushed into {settlement} and is straining the local infrastructure',
    conflicts: ['foreign enclave']
  },
  'prison colony': {
    text: '{settlement} is a prison colony where criminals are sent to serve out their sentences in harsh conditions.',
    urban: false
  },
  'prosperous land': {
    text: 'neighboring powers view {settlement} with envy as it is rich in natural resources',
    conflicts: [
      'defiled land',
      'faded remnant',
      'dying forest',
      'fungal infestation',
      'resource depletion'
    ]
  },
  'punishment post': {
    text: 'the  leader of {settlement} once held a much higher station, but was demoted to this post due to some past transgression',
    urban: false
  },
  'raider scourge': {
    text: '{bandits|raiders|pirates|slavers} frequently pillage {settlement} and the surrounding area',
    urban: false,
    conflicts: ['pirate haven']
  },
  'rebel stronghold': {
    text: '{settlement} is a stronghold of a rebel {army|faction} that is fighting against the regional overlord'
  },
  'recent brutality': {
    text: '{settlement} has been ravaged by a recent conflict and the scars of battle are still visible throughout the settlement',
    warfare: true
  },
  'reclusive hermit': {
    text: 'a hermit has taken up residence in the wilderness outside of {settlement}, rumored to have vast knowledge and power',
    urban: false
  },
  'reformist struggle': {
    text: '{settlement} is the center of a religious reformation that seeks {a return to earlier practices|to purge the corruption of the old system}',
    urban: true,
    conflicts: ['remnant faith', 'heretical beliefs', 'syncretic faith']
  },
  'regime change': {
    text: '{settlement} was recently overthrown by a group of rebels, and the new government is still struggling to establish itself'
  },
  'remnant faith': {
    text: '{settlement} is home to the last worshipers of a dying religion, who are fiercely protective of their traditions and beliefs',
    conflicts: ['reformist struggle', 'heretical beliefs', 'syncretic faith']
  },
  'resource depletion': {
    text: 'a primary resource that {settlement} relies on has been over-exploited, leading to economic hardship and social unrest',
    conflicts: ['prosperous land']
  },
  'revanchist exile': {
    text: 'a powerful noble has been exiled from a neighboring region and is now plotting a return to power',
    urban: true
  },
  'ritual combat': {
    text: 'locals of {settlement} are notorious for their use of stylized combat to settle disputes and provide entertainment'
  },
  'ruined castle': {
    text: '{settlement} is built around a ruined castle that is said to be haunted by the spirits of its former inhabitants',
    urban: false
  },
  'sacred grove': {
    text: '{settlement} is built around a sacred grove that is home to powerful nature spirits and is fiercely protected by the locals'
  },
  'secret police': {
    text: 'the ruling elite employ a cadre of fervent patriots to serve as secret police against political dissidents',
    urban: true
  },
  'sectarian violence': {
    text: 'multiple religious sects in {settlement} are engaged in violent conflict, leading to widespread destruction and casualties'
  },
  'sinking city': {
    text: '{settlement} was built atop something unstable, and now that substrate is crumbling; locals living in affected areas are frantically trying to relocate'
  },
  'slave markets': {
    text: '{settlement} is a popular destination for slave traders, and the local economy is heavily dependent on the slave trade',
    urban: true
  },
  'slave uprising': {
    text: 'the slaves of {settlement} have risen up against their masters and are now fighting for their freedom'
  },
  'struggling colony': {
    text: '{settlement} is a newly established settlement that is struggling to survive in a harsh and inhospitable environment',
    urban: false
  },
  'social stratification': {
    text: '{settlement} is deeply divided by social class, with vast disparities in wealth and status'
  },
  'sorcerous cabal': {
    text: 'a secretive cabal of sorcerers in {settlement} is engaged in the study of forbidden and arcane knowledge, often at great risk to themselves and those around them',
    urban: true
  },
  'theocratic authority': {
    text: '{settlement} is home to various grand temples that wield great power over the local populace',
    urban: true
  },
  'toxic economy': {
    text: '{settlement} is reliant on a rare {industry|product} ({metallurgy|alchemy|arcana}) that is extremely valuable due to its use in the creation of powerful arcane {potions|enchantments|implements|artifacts|constructs}, but {{has harmful side-effects for|requires blood sacrifices from} those {handling|collecting} the raw materials | is slowly {destroying|polluting} the land with its extraction|extraction requires traversing extremely dangerous terrain}',
    conflicts: ['unique product']
  },
  'syncretic faith': {
    text: 'a new religion has recently emerged in {settlement} that combines elements of multiple faiths',
    conflicts: ['reformist struggle', 'heretical beliefs', 'remnant faith']
  },
  'unique product': {
    text: '{settlement} {produces unique resource found nowhere else|contains masters a carefully-guarded craft}',
    conflicts: ['toxic economy']
  },
  'upcoming festival': {
    text: '{settlement} is preparing for a major festival ({religious|cultural}) that draws visitors from across the region'
  },
  'war conscripts': {
    text: 'the locals are being pressed into military service to fight in a regional conflict',
    warfare: true
  },
  'witch hunts': {
    text: 'magic users are being hunted and executed due to a recent transgression'
  },
  'xenophobic locals': {
    text: 'the locals of {settlement} are distrustful and hostile towards outsiders, often resorting to violence to protect their territory and way of life'
  }
}

export const hub__traits = (hub: Hub) => {
  if (!hub._traits) {
    const urban = !hub__isVillage(hub)
    const warfare = window.world.conflicts.some(conflict =>
      conflict.provinces.includes(hub.province)
    )
    const used = window.world.provinces.reduce((counter, province) => {
      province.hub._traits?.forEach(trait => {
        if (!counter[trait.key]) counter[trait.key] = 0
        counter[trait.key]++
      })
      return counter
    }, {} as Record<HubTrait, number>)
    const selected = new Set<HubTrait>()
    while (selected.size < 2) {
      const options = Object.entries(traits).map(([_key, trait]) => {
        const key = _key as HubTrait
        let weight = 1
        weight *= trait?.coastal && !hub.coastal ? 0 : 1
        weight *= trait?.urban === undefined || trait?.urban === urban ? 1 : 0
        weight *= trait?.warfare === undefined || trait?.warfare === warfare ? 1 : 0
        weight *= trait?.conflicts?.some(conflict => selected.has(conflict)) ? 0 : 1
        return { v: key, w: weight / (used[key] * 10 || 1) }
      })
      selected.add(window.dice.weightedChoice(options))
    }
    hub._traits = Array.from(selected).map(key => ({
      key,
      text: properSentences(
        `${window.dice.spin(
          traits[key].text.replaceAll('{settlement}', `this ${hub__alias(hub)}`)
        )}.`
      )
    }))
  }
  return hub._traits
}
