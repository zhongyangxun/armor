# gitleaks

Binary tool (not an npm package). Used in the local pre-commit hook. Optional CI
via GitGuardian (`ggshield`) is separate.

## Local install

Detect with `command -v gitleaks`.

If missing, offer install (pick the user's OS):

- Windows: `winget install gitleaks` or `scoop install gitleaks`
- macOS: `brew install gitleaks`
- Linux: package manager or GitHub releases

## Hook behavior

Baseline [templates/husky/pre-commit](../templates/husky/pre-commit) **fails**
the commit when gitleaks is missing.

If the user chooses a soft mode, use warn-only:

```sh
if command -v gitleaks &> /dev/null; then
  gitleaks protect --staged --verbose
else
  echo "warning: gitleaks is not installed; skipping secret scan"
fi
```

If the user skips gitleaks entirely, omit the block and only run lint-staged.

## CI (ggshield)

[templates/workflows/ggshield.yml](../templates/workflows/ggshield.yml)

- Requires repository secret `GITGUARDIAN_API_KEY`.
- Never write the key into files or logs.
- Only add the workflow after the user agrees; mention the secret in the final
  report.

## Notes

- `gitleaks protect --staged` scans staged changes only (good for pre-commit).
- armor does not vendor a `.gitleaks.toml` by default; add one only if the
  project needs allowlists.
