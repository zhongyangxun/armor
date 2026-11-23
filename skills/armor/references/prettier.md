# Prettier

## Dependencies

- `prettier`
- Optional plugins (add only when detected):
  - `tailwindcss` → `prettier-plugin-tailwindcss`
  - Svelte → `prettier-plugin-svelte`
  - Astro → `prettier-plugin-astro`

## Baseline preferences

Template: [templates/.prettierrc](../templates/.prettierrc)

| Option          | Value   | Level                                                       |
| --------------- | ------- | ----------------------------------------------------------- |
| `singleQuote`   | `true`  | **Stick** — apply on greenfield                             |
| `semi`          | `false` | **Stick** — apply on greenfield                             |
| `trailingComma` | `"all"` | **Stick** — explicit even if default (avoids upgrade drift) |
| `printWidth`    | (omit)  | **Follow project** — keep existing / EditorConfig           |
| `endOfLine`     | (omit)  | **Follow project** — keep existing / EditorConfig           |

Ignore file: [templates/.prettierignore](../templates/.prettierignore)

## Existing config rules

1. **No Prettier config** → write template `.prettierrc` (+ `.prettierignore` if
   useful).
2. **Compatible / no conflict** → keep existing; optionally fill missing stick
   options only if clearly incomplete and user did not lock style elsewhere.
3. **Conflicts with stick preferences** → default to **keeping the project
   config**; ask: keep as-is vs switch to armor preferences (implies optional
   whole-repo format).
4. **Config location** → reuse `package.json#prettier`, `prettier.config.*`, or
   existing `.prettierrc*`. Do not add a second source of truth.

## Plugins

Do not put plugins in the baseline template. After detecting the stack, add the
plugin package and wire it in the same config file the project uses.

## Conflicts with other tools

- Always include `eslint-config-prettier` when ESLint is enabled.
- If `.editorconfig` exists, align indent / charset / end-of-line with Prettier
  or leave Prettier options unset so EditorConfig wins where supported.

## Scripts

Add if missing:

```json
{
  "scripts": {
    "format": "prettier --write ."
  }
}
```

## Verify

```sh
npx prettier --check .
```

Do not run `prettier --write .` on the whole tree unless the user approved.
