# ADR 0001: Standalone Frontend Repository Layout

## Status

Approved

## Context

The project was originally initiated as a standalone Next.js frontend code structure inside `taybeen-frontend/`.
The prompt asks for context discovery of existing code, and states:
"Respect existing choices. Do not overwrite or 'upgrade' a working stack unless the user's INPUTS explicitly ask for it."

## Decision

We decided to keep the codebase layout as a standalone Next.js application directory rather than forcing it into a multi-app monorepo workspace.
To support developer consistency, we added standard code quality hooks:

- Prettier formatting configurations.
- Commitlint conventional specifications.
- Lint-staged filters.
- NVM engine locks.

## Consequences

- **Pros**:
  - Code compiles cleanly without monorepo package resolution complexity or symlink resolution loops.
  - Zero visual shifts or structural directory changes on existing pages.
- **Cons**:
  - The shared types and mock data are housed inside the single folder path `/src/` instead of an isolated workspace package, but are well-contained.
