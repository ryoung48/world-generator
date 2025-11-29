export type ConflictLevel = 1 | 2 | 3 | 4 | 5

export type ConflictType = 'interstate' | 'intrastate' | 'substate' | 'transstate'

export type ConflictIssue =
    | 'territory'
    | 'ideology'
    | 'resources'
    | 'secession'
    | 'autonomy'
    | 'decolonization'
    | 'national power'
    | 'subnational predominance'
    | 'international power'

export interface Conflict {
    name: string
    level: ConflictLevel
    provinces: number[]
    type: ConflictType
    parties: string[]
    // Multi-state conflict support
    nations?: {
        primary: number[]    // Primary belligerents
        allied?: number[]    // Allied nations
        vassals?: number[]   // Vassals/tributaries supporting
        proxies?: number[]   // Nations providing support without direct involvement
    }
}
