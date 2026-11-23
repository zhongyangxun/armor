# lint-staged

## Dependencies

- `lint-staged`
- Invoked tools must also be installed: `prettier`, `eslint`, and optionally
  `typescript` for `tsc --noEmit`

## Config

Baseline:
[templates/lint-staged.config.js.template](../templates/lint-staged.config.js.template)
(copy to `lint-staged.config.js` in the target).

```js
export default {
  '*.{js,jsx,ts,tsx,json,css,yml,yaml,md}': 'prettier --write',
  // Function form: do not append filenames (tsc would drop tsconfig)
  '*.{ts,tsx}': () => 'tsc --noEmit',
  '*.{js,jsx,ts,tsx}': 'eslint --fix',
}
```

### Adaptations

| Situation                           | Change                                                                             |
| ----------------------------------- | ---------------------------------------------------------------------------------- |
| No TypeScript                       | Drop the `tsc` entry                                                               |
| No ESLint                           | Drop the eslint entry                                                              |
| No Prettier                         | Drop the prettier entry                                                            |
| Vue / Svelte / Astro                | Extend globs (`*.vue`, `*.svelte`, `*.astro`) for prettier/eslint as plugins allow |
| Existing `package.json#lint-staged` | Keep that location; merge tasks instead of adding a second file                    |

## Hook

Run after gitleaks (if enabled) in `.husky/pre-commit`:

```sh
./node_modules/.bin/lint-staged
```

## Pitfalls

- Never use `'tsc --noEmit'` as a string task: lint-staged appends file paths and
  TypeScript then ignores `tsconfig.json`. Always use `() => 'tsc --noEmit'`.
- Keep eslint/prettier scopes aligned with what those tools actually support.
