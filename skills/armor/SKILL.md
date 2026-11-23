---
name: armor
description: >-
  Configures commitlint, gitleaks, lint-staged, ESLint, Prettier, and husky for
  a project by inspecting the repo and adapting baseline templates. Use when the
  user asks to set up commit conventions, pre-commit checks, linting,
  formatting, secret scanning, husky hooks, or mentions armor.
---

# armor

Adapt [templates/](templates/) and [references/](references/) to the target
project. Do not copy templates blindly.

## Workflow

Copy this checklist and track progress:

```
Armor progress:
- [ ] 1. Detect (read-only)
- [ ] 2. Ask only if needed
- [ ] 3. List planned changes
- [ ] 4. Apply configs and deps
- [ ] 5. Verify
- [ ] 6. Report
```

### 1. Detect (read-only)

Inspect the target project root:

- Package manager: `pnpm-lock.yaml` → pnpm, `yarn.lock` → yarn, `bun.lock` /
  `bun.lockb` → bun, else `package-lock.json` or default npm. See
  [references/package-managers.md](references/package-managers.md).
- `package.json` present? git repo (`.git`)? monorepo (`workspaces`,
  `pnpm-workspace.yaml`)?
- TypeScript: `typescript` dep or `tsconfig.json`.
- Framework signals in deps: `react`, `next`, `vue`, `nuxt`, `svelte`,
  `@sveltejs/kit`, `astro`, `tailwindcss`.
- Existing configs:
  - ESLint: `.eslintrc*`, `eslint.config.*`, `package.json#eslintConfig`
  - Prettier: `.prettierrc*`, `prettier.config.*`, `package.json#prettier`
  - lint-staged / commitlint / husky / `.editorconfig`
- Local `gitleaks`: `command -v gitleaks` (or Windows equivalent).

Read the matching files under [references/](references/) for tools you will
enable.

### 2. Ask only when needed

Ask 1–3 questions at a time. Otherwise use defaults (enable all tools; place
configs at repo root; do not bulk-format existing code).

Ask when:

| Situation                                                    | What to ask                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------------------ |
| Existing ESLint/Prettier/commitlint conflicts with templates | Merge, overwrite, or keep                                                |
| No `package.json` or not a git repo                          | Initialize first?                                                        |
| `gitleaks` missing                                           | Install instructions vs soft hook (warn, do not exit 1)                  |
| Monorepo                                                     | Root vs specific package                                                 |
| GitHub Actions                                               | Add `commitlint.yml` / `ggshield.yml`? Note `GITGUARDIAN_API_KEY` secret |
| Bulk format / eslint --fix on whole tree                     | Confirm (large diffs)                                                    |

Defaults when not asking: skip workflows unless user asked for CI; keep existing
compatible configs; do not run project-wide format/fix.

### 3. List planned changes

Before writing files, tell the user:

- Files to add or edit
- DevDependencies to install
- Scripts to add (`prepare`, `lint`, `format`) without overwriting existing ones

Wait for confirmation only if step 2 raised open questions; otherwise proceed
after listing.

### 4. Apply

1. Use templates as a starting point; adjust for TS/JS and framework. Prefer
   [templates/eslint.config.js.template](templates/eslint.config.js.template)
   with TypeScript,
   [templates/eslint.config.no-ts.js.template](templates/eslint.config.no-ts.js.template)
   without. Copy `*.template` files to the real names in the target project.
2. Follow preference rules in [references/prettier.md](references/prettier.md)
   and [references/eslint.md](references/eslint.md).
3. Install missing devDependencies in one command with the detected package
   manager. Do not bump major versions of already-present packages.
4. Ensure scripts exist if missing: `prepare: "husky"`, `lint`, `format`.
5. Init husky if needed (`npx husky` / package-manager equivalent). Write hooks
   under `.husky/` from [templates/husky/](templates/husky/); omit gitleaks
   block or soften it per step 2.
6. Copy workflows only if agreed; place under `.github/workflows/`. Adapt
   `cache` / install commands to the package manager when obvious.

Tool-specific details:

- [references/commitlint.md](references/commitlint.md)
- [references/gitleaks.md](references/gitleaks.md)
- [references/lint-staged.md](references/lint-staged.md)
- [references/eslint.md](references/eslint.md)
- [references/prettier.md](references/prettier.md)
- [references/husky.md](references/husky.md)

### 5. Verify

Fix **config** failures, not business code (unless the user approved bulk fix).

- `eslint .` (or project lint script)
- `prettier --check .` (or equivalent)
- Example commit message via commitlint, e.g.
  `echo 'feat: test' | npx commitlint`
- Confirm `.husky/commit-msg` and `.husky/pre-commit` contents match enabled
  tools

### 6. Report

Summarize:

- Added/changed files and dependencies
- Manual follow-ups (install gitleaks, add `GITGUARDIAN_API_KEY`, etc.)

## Constraints

- Never write API keys, tokens, or secrets into the repo.
- Do not modify application source unless the user approved format/fix.
- Do not invent a second config file when the project already stores the same
  tool config elsewhere (e.g. `package.json#prettier`).
- Prefer merge over overwrite when existing config is compatible.
