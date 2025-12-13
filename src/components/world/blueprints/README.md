# City Map Generation

This module generates procedural city maps with districts, buildings, walls, and ocean boundaries using Voronoi diagrams and recursive subdivision.

## Overview

The city generation pipeline creates realistic urban layouts by:
1. Generating a Voronoi diagram for spatial partitioning
2. Selecting central blocks as city districts
3. Recursively subdividing districts into building structures
4. Classifying districts by type and purpose
5. Determining land/ocean boundaries
6. Computing city wall paths

## Generation Pipeline

### 1. Initial Parameters (`BLUEPRINT.spawn:258`)

The map is initialized with:
- **Seed**: Random seed for reproducible generation
- **Density**: Population per square mile (7d4+2 * 15, ranging from ~135-450)
- **Population**: Target population (default: 50,000)
- **Ocean Direction**: Directional facing ('N', 'S', 'E', 'W')
- **District Count**: Calculated as `population / 1000` (one district per 1,000 people)

### 2. Voronoi Diagram Generation (`BLUEPRINT.spawn:274`)

**Purpose**: Creates the spatial foundation for blocks

```
cells = totalDistricts * 15
points = random points within dimensions
diagram = relaxed Voronoi diagram (10 iterations)
```

The Voronoi diagram partitions the city space into polygonal blocks, with relaxation smoothing to create more uniform cell sizes.

**Key Calculation** (`BLUEPRINT.spawn:288`):
```
sqMi = ((DISTRICT_SIZE / density) * blocks.length) / 259
miles = sqrt(sqMi)
```

### 3. Block Creation (`BLUEPRINT.spawn:285`)

Each Voronoi cell becomes a **Block** with:
- Polygon vertices (coordinates)
- Neighboring block indices
- Area calculation
- Chaos factor (for subdivision variation)

Blocks can be classified as:
- `district`: Part of the urban core
- `outskirts`: Surrounding areas
- `ocean`: Water cells
- `river`: Waterways

### 4. District Selection (`BLUEPRINT.spawn:291`)

**Algorithm**: Breadth-first expansion from city center

1. Find the central block using Delaunay triangulation
2. Mark it as district #1
3. Expand to neighboring unassigned blocks
4. Continue until reaching target district count

This creates a compact urban core expanding from the center point.

### 5. Building Generation (`BLUEPRINT.spawn:310`)

**For each district**:

1. Get the district polygon sides
2. **Recursively subdivide** using `BLOCK.subdivide()`:
   - Split polygon into smaller polygons
   - Filter structures below area threshold
   - Continue splitting until all buildings are small enough
3. Store resulting structures in `district.structures`

Each structure represents a building footprint with:
- Path (SVG path string)
- Edges and vertices
- Center point
- Area

### 6. District Classification (`BLUEPRINT.spawn:332`)

Districts are classified by `DISTRICT.spawn()` based on:
- Location (proximity to gates, docks, center)
- Purpose (residential, commercial, administrative, etc.)
- Demographics and culture

### 7. Ocean Placement (`placeOcean:14`)

**Algorithm**: Flood-fill from exterior boundaries

1. Identify exterior districts (city perimeter)
2. Mark **docks** as ocean (`land = false`)
3. Mark **gates** as land (`land = true`)
4. Flood-fill outward:
   - Queue starts with docks and gates
   - Each block propagates its land/ocean status to neighbors
   - Continue until all exterior blocks are classified

This creates natural coastlines where the city meets water.

### 8. Wall Calculation (`calculateWallPoints:43`)

**Purpose**: Compute the city wall path around the urban core

**Algorithm**:

1. Get all exterior districts (perimeter of the city)
2. For each exterior district block:
   - Find neighbors that are land but not districts (outside the walls)
   - Extract shared edges between district and non-district blocks
   - These edges form the wall segments
3. Deduplicate edges using normalized edge keys
4. Order edges into a continuous path using graph traversal:
   - Build adjacency list of edge endpoints
   - Start from an endpoint (odd-degree vertex preferred)
   - Traverse unvisited neighbors
   - Connect disconnected components via nearest points
   - Close the loop if first and last points connect

The result is an ordered array of `[x, y]` coordinates tracing the city wall.

## Key Data Structures

### Blueprint
```typescript
{
  seed: string                    // Generation seed
  density: number                 // People per sq mile
  districts: Record<number, District>
  population: number
  blocks: Block[]                 // All Voronoi cells
  diagram: Voronoi                // Spatial diagram
  miles: number                   // City diameter
  wall: [number, number][]        // Wall path coordinates
  oceanDir: Directions            // Ocean direction
  isCity: boolean
  foreigners: boolean
  regionalCapital: boolean
}
```

### Block
```typescript
{
  idx: number                     // Block index
  data: [number, number][]        // Polygon vertices
  n: number[]                     // Neighbor indices
  district?: { idx, path }        // District assignment
  area: number
  chaos: number                   // Subdivision randomness
  structures: Structure[]         // Buildings in this block
  center: [number, number]
  path: string                    // SVG path
  type: 'outskirts' | 'district' | 'ocean' | 'river'
  land?: boolean                  // Land vs ocean
}
```

### Structure (Building)
```typescript
{
  path: string                    // SVG path
  edges: [number, number][][]     // Polygon edges
  vertices: [number, number][]    // Corner points
  center: [number, number]
  area: number
}
```

## Constants

From `BLUEPRINT_CONSTANTS`:
- **DISTRICT_SIZE**: 1,000 people per district
- **dimensions**: Canvas width and height for generation

## Usage

```typescript
import { BLUEPRINT } from './blueprints'

// Generate a city map
const cityMap = BLUEPRINT.spawn()

// Access city data
console.log(cityMap.population)    // 50000
console.log(cityMap.districts)     // District data
console.log(cityMap.blocks)        // All blocks
console.log(cityMap.wall)          // Wall coordinates
```

## Dependencies

- **d3**: Voronoi diagrams and spatial algorithms
- **Dice**: Seeded random number generation
- **VORONOI**: Relaxed Voronoi diagram utilities
- **BLOCK**: Block creation and subdivision
- **DISTRICT**: District classification and utilities

## Algorithm Complexity

- **Voronoi Generation**: O(n log n) where n = cell count
- **District Selection**: O(d) where d = district count (BFS)
- **Building Subdivision**: O(b * log(area)) where b = building count (recursive)
- **Ocean Placement**: O(e) where e = exterior block count (BFS)
- **Wall Calculation**: O(w * v) where w = wall edges, v = vertices (graph traversal)

Overall: O(n log n) dominated by Voronoi generation

## Notes

- The generator uses a singleton pattern (cached `map` variable at `index.ts:255`)
- City size scales with population (more districts = larger city)
- Density affects physical city size (higher density = more compact)
- Recursive building subdivision ensures varied building sizes
- Wall path forms a closed polygon around the city core
