# armor

Cursor Agent Skill：按项目情况配置 commitlint、gitleaks、lint-staged、ESLint、Prettier 与 husky。

Skill 提供流程（`SKILL.md`）、工具说明（`references/`）和基线模板（`templates/`）。AI 会先检测目标仓库，必要时提问，再写入配置并验证——不是无脑复制文件。

## 安装（个人 Skill）

把本仓库里的 Skill 链到 Cursor 个人 skills 目录，任意项目都可用；改本仓库后立即生效。

**Windows（推荐目录联接，无需管理员）**

在仓库根目录执行（把路径换成你的实际路径）：

```shell
mkdir -p "$HOME/.cursor/skills"
# 若已存在旧目录或错误链接，先删掉再创建
rm -rf "$HOME/.cursor/skills/armor"
cmd //c "mklink /J %USERPROFILE%\\.cursor\\skills\\armor %CD%\\skills\\armor"
```

Git Bash 的 `ln -s` 在未开启开发者模式时可能变成复制目录，改本仓库后不会同步，请优先用上面的 `mklink /J`。

**macOS / Linux**

```shell
mkdir -p ~/.cursor/skills
ln -sfn "$(pwd)/skills/armor" ~/.cursor/skills/armor
```

也可直接复制 `skills/armor` 到 `~/.cursor/skills/armor`（复制后不会自动同步本仓库的修改）。

确认目录中存在 `SKILL.md`：

```shell
ls ~/.cursor/skills/armor/SKILL.md
```

## 使用

在任意项目里对 Agent 说例如：

- 「用 armor 配置提交规范和代码检查」
- 「给这个项目加上 commitlint、eslint、prettier、husky」
- 「按 armor 接入 gitleaks 和 lint-staged」

Agent 会读取 `~/.cursor/skills/armor`，按检测结果提问（仅在有冲突、缺 package.json、未装 gitleaks、monorepo、是否加 CI、是否全量格式化等情况下），然后安装依赖、写配置并跑验证。

## 仓库结构

```
skills/armor/
  SKILL.md
  references/     # 各工具依赖、偏好、框架差异
  templates/      # 基线配置（参考起点，按项目调整）
```

根目录的 eslint / prettier / husky 仅用于维护本仓库（模板与 Markdown）。

## 本仓库开发

```shell
npm install
npm run lint
npm run format
```
