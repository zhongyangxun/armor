#!/usr/bin/env node

import { resolve } from 'node:path'
import { logger } from './logger.ts'
import { parseArgs } from 'node:util'
import {
  detectPackageManager,
  getPackageJSON,
  installDependencies,
} from './deps.ts'
import { copyFiles } from './cp.ts'

const { values } = parseArgs({
  options: {
    overwrite: {
      type: 'boolean',
      default: false,
    },
  },
})

const { overwrite } = values

const cpGitHubActions = async ({
  workflows,
  overwrite,
}: {
  workflows: string[]
  overwrite: boolean
}) => {
  logger.start('Copying GitHub Actions workflows')

  const source = resolve(import.meta.dirname, '..', '.github/workflows')
  const destination = resolve(process.cwd(), '.github/workflows')

  await copyFiles({
    files: workflows,
    source,
    destination,
    overwrite,
  })

  logger.success('Copying GitHub Actions workflows completed')
}

const cpGitHooks = async ({
  hooks,
  overwrite,
}: {
  hooks: string[]
  overwrite: boolean
}) => {
  logger.start('Copying commit hooks')

  const source = resolve(import.meta.dirname, '..', '.husky')
  const destination = resolve(process.cwd(), '.husky')

  await copyFiles({
    files: hooks,
    source,
    destination,
    overwrite,
  })

  logger.success('Copying commit hooks completed')
}

const installGitHooksDevDeps = async () => {
  const gitHooksDevDeps = [
    'husky',
    'lint-staged',
    '@commitlint/cli',
    '@commitlint/config-conventional',
  ]

  const packageJSON = (await getPackageJSON()) ?? {}
  const installedDeps = {
    ...(packageJSON.devDependencies ?? {}),
    ...(packageJSON.dependencies ?? {}),
  }

  // *still try to install when there is no package.json, maybe need to optimize later
  const missingDevDeps = gitHooksDevDeps.filter((dep) => !installedDeps[dep])

  if (missingDevDeps.length === 0) {
    logger.info('No missing development dependencies found')
    return
  }

  try {
    logger.start('Installing Git hooks development dependencies')
    const packageManager = await detectPackageManager()
    await installDependencies(packageManager, missingDevDeps)
    logger.success('Installing Git hooks development dependencies completed')
  } catch (error) {
    logger.error(
      `Installing Git hooks development dependencies failed: ${error}`,
    )
    process.exit(1)
  }
}

const hooks = ['commit-msg', 'pre-commit']
const workflows = ['commitlint.yml', 'ggshield.yml']

await cpGitHubActions({ workflows, overwrite })

await cpGitHooks({ hooks, overwrite })
await installGitHooksDevDeps()
