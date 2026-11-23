# husky

## Dependencies

- `husky`

## package.json

Ensure (do not overwrite existing values):

```json
{
  "scripts": {
    "prepare": "husky"
  }
}
```

After adding husky, run the package manager's prepare/`husky` init so `.husky/`
exists (e.g. `npx husky` or reinstall so `prepare` runs).

## Hooks

Baselines:

- [templates/husky/commit-msg](../templates/husky/commit-msg) — commitlint
- [templates/husky/pre-commit](../templates/husky/pre-commit) — gitleaks +
  lint-staged

Compose hooks from enabled tools only. Prefer `./node_modules/.bin/<tool>` over
`npx` for stability in hooks.

## Windows notes

- Hooks run via Git's shell (Git for Windows). Keep scripts POSIX `sh`.
- Avoid PowerShell-only syntax in hook files.
- If hooks do not run: confirm `git config core.hooksPath` points at `.husky/_`
  (husky 9) and that the repo is not missing `prepare`.
- Line endings: keep LF for hook scripts (`.gitattributes` `* text=auto` is
  usually fine; if hooks fail oddly, check CRLF).

## Existing husky

- If `.husky/` already has hooks, merge commands into existing files rather than
  replacing unrelated custom steps.
- Ask before overwriting hooks that contain project-specific logic.
