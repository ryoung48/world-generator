## Architecture

* **Modularity:** Highly cohesive, loosely coupled modules.
* **Separation of Concerns:** Keep UI, logic, and data layers distinct.

## TypeScript

### Strict Mode

* No `any` (use `unknown` if truly unknown).
* No type assertions (`as SomeType`) unless justified.
* No `@ts-ignore` or `@ts-expect-error` without explicit reason.

### Types

* Prefer `type` over `interface`.
* Use inference where clear, explicit typing where it aids clarity.
* Use utility types (`Pick`, `Omit`, etc.).

## Code Style

### Functional Programming (Light)

* No mutation, use immutable structures.
* Pure functions where possible.
* Prefer composition over complex logic.
* Use array methods (`map`, `filter`, `reduce`) over loops.
* Heavy FP only when justified (e.g., async Task/IO, Result/Either error handling).

### Imports & Dependencies

* No unused imports; keep imports sorted and consistent.
* Avoid circular dependencies — restructure modules if needed.
* Prefer **domain-driven modules** (`payment/`, `order/`) over “layered” folders (`utils/`, `helpers/`).

### Structure

* No nested if/else → use guard clauses or composition.
* Max nesting depth: 2.
* Small, single-responsibility functions.
* Flat, readable code > clever abstractions.

### Naming

* Functions: `camelCase` (verbs).
* Types: `PascalCase`.
* Constants: `UPPER_SNAKE_CASE` (true constants), `camelCase` (config).
* Files: `kebab-case.ts`.
* avoid generic names like 'utils' or 'utilities'

### Comments

* Code should be self-explanatory.
* No inline comments explaining logic.
* JSDoc allowed for public APIs.

### Function Parameters

* Default to **options objects** (with defaults via destructuring).
* Group related options (e.g., shipping, payment).
* Break very large option objects into nested groups.
* Avoid boolean flags in positional params.
* **Positional params only for:**

  * Single-parameter pure functions
  * Conventional math operations
  * Common FP patterns (`map`, `filter`, `reduce`)

### Module Pattern: Module-as-Constant with Registry of Subroutines

* Export modules as a single constant object that groups related subroutines.
* Each subroutine should be a pure, top-level function, then collected into the module.
* The module constant acts as a **registry/namespace**, keeping related behaviors discoverable and testable.
* Wrap or decorate the module as needed (e.g., profiling, logging).
* Always type the module explicitly to preserve TypeScript safety.
