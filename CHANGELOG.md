<!-- markdownlint-disable MD013 MD033 -->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Monorepo-compatible standard configs: `.editorconfig`, `.gitattributes`, `.prettierrc.json`, `.prettierignore`, `commitlint.config.cjs`, `lint-staged.config.cjs`, `.nvmrc`.
- Global developer verification tool chain: `pnpm check`, `pnpm format`, `pnpm format:check`, and `pnpm test`.
- Architectural design guidelines, sequence diagrams, and routing references in `ARCHITECTURE.md`, `AGENTS.md`, `SECURITY.md`, and `CONTRIBUTING.md`.
- Shared components under `/src/components/admin/shared/` to unify layouts, tables, stat metrics, overlays, and inline progress spinners.

### Fixed

- Fixed TypeScript resolver errors in `OrdersList.tsx` for `completedTrend` and `revenueText` property mappings.
