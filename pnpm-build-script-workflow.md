# pnpm Native Dependency Build Script Approval Workflow

This repository uses **pnpm v10+** which blocks native package lifecycle and build scripts by default for security. To ensure zero-maintenance CI/CD deployments and avoid the `ERR_PNPM_IGNORED_BUILDS` error, any native dependencies requiring installation build scripts (e.g., `sharp`, `esbuild`, `bcrypt`, `canvas`, `better-sqlite3`, etc.) must be explicitly approved in source control.

---

## The Core Configuration

All approved build-script dependencies are tracked in the root [pnpm-workspace.yaml](file:///c:/Users/Admin/Desktop/Taybeen/taybeen-frontend/pnpm-workspace.yaml) file under the `allowBuilds` section:

```yaml
allowBuilds:
  unrs-resolver: false
  sharp: true
  # Add future native packages here as key: true
```

By committing this file to Git, the CI/CD pipeline and the production VPS will automatically respect the approvals during `pnpm install --frozen-lockfile` without requiring any manual server setup.

---

## Step-by-Step Workflow for Adding a New Native Dependency

When you need to add a new package that requires running a build script (e.g., `canvas` or `bcrypt`):

### Step 1: Install the Package
Run the standard installation command on your local machine:
```bash
pnpm add <package-name>
```

### Step 2: Approve the Build Script
Choose one of the following methods to add the package to the allowlist:

#### Method A: Command Line (Recommended)
Run the built-in pnpm approval command:
```bash
pnpm approve-builds <package-name>
```
This automatically updates `pnpm-workspace.yaml` with `<package-name>: true` under `allowBuilds`.

#### Method B: Manual Edit
Open [pnpm-workspace.yaml](file:///c:/Users/Admin/Desktop/Taybeen/taybeen-frontend/pnpm-workspace.yaml) and append the package name under `allowBuilds` mapped to `true`:
```yaml
allowBuilds:
  unrs-resolver: false
  sharp: true
  <package-name>: true
```

### Step 3: Verify the Local Installation
Ensure the package install scripts run successfully locally:
```bash
pnpm install --frozen-lockfile
```
Verify that no warnings like `Ignored build scripts: <package-name>` are printed.

### Step 4: Commit and Push the Configuration
Add and commit `pnpm-workspace.yaml` and `pnpm-lock.yaml` to your development branch (`Aaditya`):
```bash
git add pnpm-workspace.yaml pnpm-lock.yaml package.json
git commit -m "chore: approve build scripts for <package-name>"
git push origin Aaditya
```

### Step 5: Merge to `main` for VPS Deployment
The Hostinger VPS deployment triggers automatically when code is pushed or merged into the `main` branch. To apply the new approvals to production:
1. Open a Pull Request from `Aaditya` to `main`.
2. Merge the Pull Request.
3. The GitHub Actions workflow will trigger, connect to the VPS, fetch the updated `pnpm-workspace.yaml`, and run `pnpm install --frozen-lockfile` successfully.
