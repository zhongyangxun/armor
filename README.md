# armor

A personal CLI to copy GitHub Actions workflows and Git hooks into the current project.

## Content to copy

- `.github/workflows/commitlint.yml`
- `.github/workflows/ggshield.yml`
- `.husky/commit-msg`（commitlint）
- `.husky/pre-commit`（gitleaks + lint-staged）

**`ci.yml` is for armor itself and is not copied.**

By default it also installs `husky`, `lint-staged`, `@commitlint/cli`, `@commitlint/config-conventional`.

## Usage

```shell
Options:
  -h, --help      Show help message
  --overwrite     Overwrite existing files
  --skip-install  Skip installing Git hooks dev dependencies
  -v, --version   Show version

Examples:
  armor
  armor --overwrite
  armor --skip-install

```
