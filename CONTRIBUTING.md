<!-- markdownlint-disable MD013 MD033 -->

# Contributing to Taybeen Frontend

Thank you for contributing to Taybeen! To maintain code quality and prevent regressions, please follow these guidelines.

---

## 1. Development Setup

Follow the installation steps outlined in the [SETUP.md](file:///c:/Users/Admin/Desktop/Taybeen/taybeen-frontend/docs/SETUP.md) document:

1. Ensure Node.js 20+ and `pnpm` are installed.
2. Install dependencies: `pnpm install`.
3. Start local development server: `pnpm dev`.

---

## 2. Branch Naming Conventions

Prefix your branches with the type of work:

- `feat/` for new features (e.g., `feat/admin-refunds`)
- `fix/` for bug fixes (e.g., `fix/checkout-discount-crash`)
- `docs/` for documentation updates (e.g., `docs/add-api-notes`)
- `refactor/` for non-functional code restructures (e.g., `refactor/standardize-tables`)
- `chore/` for dependency updates or build changes

---

## 3. Conventional Commits

We enforce the [Conventional Commits](https://www.conventionalcommits.org/) specification for all repository commit messages. Write commit messages in the imperative tense:

```text
type(scope): description

Detailed body text if necessary.
```

### Common Types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code formatting, missing semi-colons, etc. (no business code changes)
- `refactor`: Refactoring production code without changing behavior
- `test`: Adding or correcting tests
- `chore`: Updating build tasks, packages manager lockfiles, etc.

---

## 4. Code Style & Tooling

We use ESLint and Prettier to automatically verify and format source code:

- **Format checking**: Run `pnpm format:check` to check code formatting.
- **Format code**: Run `pnpm format` to format files.
- **Linter checking**: Run `pnpm lint` to check for style issues and code rules.
- **Type checking**: Run `pnpm typecheck` to verify TypeScript builds successfully.
- **Verification Pipeline**: Run `pnpm check` to execute linting, formatting, typechecking, and tests all together.

---

## 5. Pull Request Checklist

Before submitting a Pull Request, ensure that:

- [ ] Your branch is rebased on the latest main branch.
- [ ] No compilation errors exist (`pnpm typecheck` passes).
- [ ] No lint warnings or formatting errors remain (`pnpm lint` and `pnpm format:check` pass).
- [ ] Component layouts render correctly across both desktop and mobile viewports.
- [ ] No mock secrets or real API tokens are left in code blocks or env configuration templates.
