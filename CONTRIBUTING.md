# Contributing to Taybeen Storefront

Thank you for contributing to Taybeen Storefront! To maintain code quality, styling consistency, and prevent layout regressions, please follow these guidelines.

- **Lead Developer & Maintainer**: Aaditya Gunjal ([aadigunjal0975@gmail.com](mailto:aadigunjal0975@gmail.com))
- **Production Storefront**: <https://taybeen.com/>
- **Production Admin Portal**: <https://admin.taybeen.com/>
- **Production API Base**: <https://api.taybeen.com/api/v1>

---

## 1. Development Onboarding

Follow the installation steps outlined in the [Developer Setup Guide](docs/SETUP.md):

1. Verify Node.js 20+ and `pnpm` are installed.
2. Install dependencies: `pnpm install`.
3. Launch the development server: `pnpm dev`.

---

## 2. Branch Naming Conventions

Prefix your branches with the type of work:

- `feat/` for new customer-facing storefront features (e.g., `feat/add-review-modal`)
- `fix/` for bug fixes (e.g., `fix/cart-quantity-caching`)
- `docs/` for documentation adjustments (e.g., `docs/update-api-payloads`)
- `refactor/` for code restructuring (e.g., `refactor/contexts-to-zustand`)
- `chore/` for dependency updates or build script updates

---

## 3. Conventional Commits

We enforce the [Conventional Commits](https://www.conventionalcommits.org/) specification. Write commit messages in the imperative tense:

```text
type(scope): description

Detailed body text if necessary.
```

### Common Types:

- `feat`: A new customer-facing storefront feature
- `fix`: A bug fix (e.g., cart rounding, layout overflow)
- `docs`: Documentation modifications (e.g., markdown adjustments)
- `style`: Code formatting changes (Prettier runs, spacing corrections, no logic shifts)
- `refactor`: Restructuring storefront code with zero behavioral changes
- `test`: Adding or correcting client tests
- `chore`: Modifying build configuration files, updating workspace metadata, etc.

---

## 4. Code Quality & Formatting Tooling

We employ static checking suites to enforce formatting consistency:

- **Format checking**: Run `pnpm format:check` to check code formatting.
- **Format code**: Run `pnpm format` to format files.
- **Linter checking**: Run `pnpm lint` to check for style issues and code rules.
- **Type checking**: Run `pnpm typecheck` to verify TypeScript builds successfully.
- **Verification Pipeline**: Run `pnpm check` to execute linting, formatting, typechecking, and tests all together.

---

## 5. Pull Request Verification Checklist

Before submitting a Pull Request, ensure that:

- [ ] Your branch is rebased on the latest main branch.
- [ ] No compilation errors exist (`pnpm typecheck` passes).
- [ ] No lint warnings or formatting errors remain (`pnpm lint` and `pnpm format:check` pass).
- [ ] UI layouts render correctly across both desktop and mobile viewports (use responsive dev tools).
- [ ] No mock secrets or active API tokens are left in code blocks or env configuration templates.
