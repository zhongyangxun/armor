# armor

**English** | [中文](README.zh-CN.md)

A Cursor Agent Skill that configures commitlint, gitleaks, lint-staged, ESLint, Prettier, and husky for a project.

It ships a workflow (`SKILL.md`), tool notes (`references/`), and baseline templates (`templates/`). The agent inspects the target repo, asks only when needed, then writes config and verifies—not a blind file copy.

## Install (personal skill)

Link the Skill from this repo into your Cursor personal skills directory so it works in any project. Edits in this repo take effect immediately.

**Windows (directory junction recommended; no admin required)**

From the repo root (adjust paths if needed):

```shell
mkdir -p "$HOME/.cursor/skills"
# Remove an old directory or bad link first if present
rm -rf "$HOME/.cursor/skills/armor"
cmd //c "mklink /J %USERPROFILE%\\.cursor\\skills\\armor %CD%\\skills\\armor"
```

Git Bash `ln -s` may copy the folder when Developer Mode is off, so changes here will not sync. Prefer `mklink /J` above.

**macOS / Linux**

```shell
mkdir -p ~/.cursor/skills
ln -sfn "$(pwd)/skills/armor" ~/.cursor/skills/armor
```

You can also copy `skills/armor` to `~/.cursor/skills/armor` (a copy will not track updates from this repo).

Confirm `SKILL.md` is present:

```shell
ls ~/.cursor/skills/armor/SKILL.md
```

## Usage

In any project, ask the agent something like:

- “Set up commit conventions and code checks with armor”
- “Add commitlint, eslint, prettier, and husky to this project”
- “Wire up gitleaks and lint-staged using armor”

The agent reads `~/.cursor/skills/armor`, asks only when needed (config conflicts, missing `package.json`, no gitleaks, monorepo layout, whether to add CI, whether to format the whole tree), then installs deps, writes config, and verifies.

## Layout

```
skills/armor/
  SKILL.md
  references/     # deps, preferences, framework notes
  templates/      # baselines (starting point; adapt per project)
```

Root eslint / prettier / husky are only for maintaining this repo (templates and Markdown).
