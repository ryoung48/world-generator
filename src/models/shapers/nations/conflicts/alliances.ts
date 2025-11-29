import { NATION } from '../../../nations'
import { Province } from '../../../provinces/types'

// Find nations that will join a conflict as allies
export const findAllies = (nation: Province, target: Province): Province[] => {
    const allies: Province[] = []

    // Check all other nations for alliance relationships
    const allNations = NATION.nations()

    for (const potential of allNations) {
        if (potential.idx === nation.idx || potential.idx === target.idx) continue

        const relationToNation = NATION.relations.get({ n1: potential, n2: nation })
        const relationToTarget = NATION.relations.get({ n1: potential, n2: target })

        // Allies will join if they have an 'ally' relationship
        if (relationToNation === 'ally') {
            allies.push(potential)
        }
    }

    return allies
}

// Find vassals, tributaries, and colonies that will join their overlord
export const findVassals = (nation: Province): Province[] => {
    const vassals: Province[] = []
    const allProvinces = window.world.provinces

    for (const province of allProvinces) {
        // Check if this province is a vassal/tributary/colony of the nation
        if (province.overlord === nation.idx) {
            const relation = NATION.relations.get({ n1: province, n2: nation })
            if (
                relation === 'vassal' ||
                relation === 'tributary' ||
                relation === 'colony' ||
                relation === 'personal union' ||
                relation === 'dominion'
            ) {
                // Only add if it's actually a nation (capital province)
                if (province.nation === undefined && province.size) {
                    vassals.push(province)
                }
            }
        }
    }

    return vassals
}

// Find nations that might support a side as proxies (without direct involvement)
export const findProxySupport = (
    nation: Province,
    target: Province,
    allies: Province[],
    targetAllies: Province[]
): { nationProxies: Province[], targetProxies: Province[] } => {
    const nationProxies: Province[] = []
    const targetProxies: Province[] = []

    const allNations = NATION.nations()
    const involved = new Set([
        nation.idx,
        target.idx,
        ...allies.map(a => a.idx),
        ...targetAllies.map(a => a.idx)
    ])

    for (const potential of allNations) {
        if (involved.has(potential.idx)) continue

        const relationToNation = NATION.relations.get({ n1: potential, n2: nation })
        const relationToTarget = NATION.relations.get({ n1: potential, n2: target })

        // Friendly nations might provide proxy support
        if (relationToNation === 'friendly' && window.dice.random < 0.3) {
            nationProxies.push(potential)
            involved.add(potential.idx)
        } else if (relationToTarget === 'friendly' && window.dice.random < 0.3) {
            targetProxies.push(potential)
            involved.add(potential.idx)
        }
        // Rivals of one side might support the other
        else if (relationToTarget === 'suspicious' && window.dice.random < 0.2) {
            nationProxies.push(potential)
            involved.add(potential.idx)
        } else if (relationToNation === 'suspicious' && window.dice.random < 0.2) {
            targetProxies.push(potential)
            involved.add(potential.idx)
        }
    }

    return { nationProxies, targetProxies }
}

// Check if a nation should join an intrastate conflict as a proxy supporter
export const findCivilWarProxies = (nation: Province, issues: string[]): Province[] => {
    const proxies: Province[] = []
    const neighbors = NATION.neighbors({ nation })

    for (const neighbor of neighbors) {
        const relation = NATION.relations.get({ n1: neighbor, n2: nation })

        // Rivals might support rebels
        if (relation === 'suspicious' && window.dice.random < 0.25) {
            proxies.push(neighbor)
        }
        // Ideological conflicts might attract ideological allies
        else if (issues.includes('ideology') && relation === 'friendly' && window.dice.random < 0.15) {
            proxies.push(neighbor)
        }
        // Secession conflicts might attract culturally-similar neighbors
        else if ((issues.includes('secession') || issues.includes('autonomy')) && window.dice.random < 0.2) {
            // Check if neighbor shares culture with rebel provinces
            // This would require more complex cultural analysis
            if (window.dice.random < 0.5) {
                proxies.push(neighbor)
            }
        }
    }

    return proxies
}
