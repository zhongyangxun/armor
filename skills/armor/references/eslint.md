# ESLint

Use **flat config** (`eslint.config.js`) for new setups.

## Dependencies (baseline)

| Package                            | When                                                          |
| ---------------------------------- | ------------------------------------------------------------- |
| `eslint`                           | Always                                                        |
| `@eslint/js`                       | Always                                                        |
| `eslint-config-prettier`           | When Prettier is enabled                                      |
| `eslint-plugin-simple-import-sort` | Default preference                                            |
| `typescript-eslint`                | TypeScript projects                                           |
| `globals`                          | When you need browser/node globals without TS project service |

## Templates

- TypeScript:
  [templates/eslint.config.js.template](../templates/eslint.config.js.template)
  — `recommendedTypeChecked` + `projectService: true` + disable type-checked for
  `**/*.js` + prettier last.
- JavaScript only:
  [templates/eslint.config.no-ts.js.template](../templates/eslint.config.no-ts.js.template)

Copy to `eslint.config.js` in the target (use the no-ts variant when needed).
Templates use a `.template` suffix so tools do not auto-load them in this repo.

## Stick preferences

- Flat config over eslintrc.
- `simple-import-sort` for imports/exports.
- `eslint-config-prettier` last so formatting stays with Prettier.
- Type-aware linting when `tsconfig.json` exists (`projectService: true`).

## Framework plugins (add when detected)

Install the matching plugin/config and extend the flat config (do not invent
incompatible eslintrc snippets):

| Signal           | Typical packages                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| React (non-Next) | `eslint-plugin-react`, `eslint-plugin-react-hooks`                                                                     |
| Next.js          | `eslint-config-next` / `@next/eslint-plugin-next` (prefer Next's documented flat setup for the installed Next version) |
| Vue              | `eslint-plugin-vue`, and `vue-eslint-parser` as required                                                               |
| Svelte           | `eslint-plugin-svelte`                                                                                                 |
| Astro            | `eslint-plugin-astro`                                                                                                  |

Read the project's framework version docs if the template and plugin APIs
disagree; prefer a working minimal integration over a large rule dump.

## Existing config

| Situation                   | Action                                                           |
| --------------------------- | ---------------------------------------------------------------- |
| No ESLint                   | Add flat config from the right template + deps                   |
| Flat config present         | Merge preferences / plugins; ask before large overwrites         |
| Legacy `.eslintrc*` only    | Prefer migrating to flat config; ask if migration is non-trivial |
| `package.json#eslintConfig` | Same as legacy — ask before migrating                            |

## Scripts

Add if missing:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## Pitfalls

- Type-checked configs need a valid `tsconfig.json`; exclude or
  `disableTypeChecked` for standalone `.js` config files.
- Ignore `node_modules`, build outputs, `.husky`.
- Do not run `eslint --fix` on the whole tree unless the user approved.

## Verify

```sh
npx eslint .
```
