# Package managers

## Detection order

Check lockfiles in the project root (first match wins):

1. `pnpm-lock.yaml` → `pnpm`
2. `yarn.lock` → `yarn`
3. `bun.lock` or `bun.lockb` → `bun`
4. `package-lock.json` → `npm`
5. No lockfile → default `npm` (mention this in the report)

## Install commands

| Manager | Add as devDependencies         |
| ------- | ------------------------------ |
| pnpm    | `pnpm add -D <packages...>`    |
| yarn    | `yarn add -D <packages...>`    |
| bun     | `bun add -d <packages...>`     |
| npm     | `npm install -D <packages...>` |

Install all missing packages in **one** command.

## Monorepo

- `package.json#workspaces`, `pnpm-workspace.yaml`, or Turborepo/Nx layout → ask
  whether to configure the root or a specific package.
- Prefer the repo root for husky, commitlint, and shared lint/format unless the
  user points at a package.
- Use the workspace root's package manager lockfile for detection.
