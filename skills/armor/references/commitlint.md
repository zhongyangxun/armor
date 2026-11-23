# commitlint

## Dependencies

- `@commitlint/cli`
- `@commitlint/config-conventional`

## Config

Baseline:
[templates/commitlint.config.js.template](../templates/commitlint.config.js.template)
(copy to `commitlint.config.js` in the target).

```js
export default { extends: ['@commitlint/config-conventional'] }
```

- Prefer `commitlint.config.js` (ESM) when the project has `"type": "module"`.
- If `commitlint.config.cjs` / `.ts` / `package.json#commitlint` already exists,
  keep that location; only adjust contents if merging or overwriting was agreed.

## Hook

[templates/husky/commit-msg](../templates/husky/commit-msg):

```sh
./node_modules/.bin/commitlint --edit $1
```

Use `./node_modules/.bin/commitlint` so the hook does not rely on a global
install. On Windows Git Bash / Git for Windows this path works; do not switch to
`npx` unless the project already standardizes on it in hooks.

## CI

[templates/workflows/commitlint.yml](../templates/workflows/commitlint.yml)

- Requires `fetch-depth: 0`.
- Adapt install/`cache` to the detected package manager when adding the
  workflow.
- Only add when the user wants GitHub Actions.

## Verify

```sh
echo 'feat: armor check' | npx commitlint
echo 'bad message' | npx commitlint  # should fail
```
