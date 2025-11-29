import { ConflictLevel } from '../../../conflicts/types'
import { NATION } from '../../../nations'
import { PROVINCE } from '../../../provinces'
import { Province } from '../../../provinces/types'

export const getWeightedConflictLevel = (): ConflictLevel => {
    const r = window.dice.random
    if (r < 0.65) return window.dice.choice([1, 2]) as ConflictLevel
    if (r < 0.85) return 3
    if (r < 0.95) return 4
    return 5
}

export const addConflictToProvince = (province: Province, conflictIdx: number, intensity: number) => {
    if (!province.conflict) {
        province.conflict = []
    }

    // Single conflict per province
    if (province.conflict.length > 0) return

    // If a province has an interstate conflict, it cannot be assigned any other conflict
    const hasInterstate = province.conflict.some(c => window.world.conflicts[c.idx].type === 'interstate')
    if (hasInterstate) return

    province.conflict.push({ idx: conflictIdx, intensity })
}

export const spreadConflict = (startProvinces: Province[], conflictIdx: number, baseIntensity: number) => {
    let currentLayer = [...startProvinces]
    let visited = new Set(startProvinces.map(p => p.idx))
    let currentIntensity = baseIntensity

    // Initial assignment
    startProvinces.forEach(p => addConflictToProvince(p, conflictIdx, currentIntensity))

    while (currentIntensity > 1) {
        currentIntensity -= window.dice.uniform(0.4, 1.6)
        const nextLayer: Province[] = []

        for (const p of currentLayer) {
            const neighbors = PROVINCE.neighbors({ province: p, type: 'local' })
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor.idx)) {
                    // Random chance to spread
                    if (window.dice.random < 0.4) {
                        addConflictToProvince(neighbor, conflictIdx, currentIntensity)
                        visited.add(neighbor.idx)
                        nextLayer.push(neighbor)
                    }
                }
            }
        }
        currentLayer = nextLayer
        if (currentLayer.length === 0) break
    }
    return Array.from(visited)
}

export const getBorderScore = (n1: Province, n2: Province): number => {
    let score = 0
    const n1Provinces = NATION.provinces(n1)
    for (const p of n1Provinces) {
        const neighbors = PROVINCE.neighbors({ province: p, type: 'foreign' })
        for (const n of neighbors) {
            if (n.nation === n2.idx) {
                score++
            }
        }
    }
    return score
}

export const fairWars: Record<NonNullable<Province['size']>, NonNullable<Province['size']>[]> = {
    'city-state': ['city-state'],
    principality: ['city-state', 'principality'],
    kingdom: ['principality', 'kingdom'],
    empire: ['kingdom', 'empire']
}
