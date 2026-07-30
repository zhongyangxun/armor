#!/usr/bin/env node

import { cp } from 'node:fs/promises'
import { resolve } from 'node:path'
import { logger } from './logger.ts'
import { checkFileExists } from './lib.ts'
import {
  detectPackageManager,
  getPackageJSON,
  installDependencies,
} from './deps.ts'

const cpGitHubActions = async (workflows: string[]) => {
  logger.start('Copying GitHub Actions workflows')

  const source = resolve(import.meta.dirname, '..', '.github/workflows')
  const destination = resolve(process.cwd(), '.github/workflows')

  await Promise.all(
    workflows.map(async (workflow) => {
      try {
        const exists = await checkFileExists(resolve(destination, workflow))
        if (exists) {
          logger.info(`skip ${workflow} (already exists)`)
        } else {
          logger.info(`copy ${workflow}`)
          await cp(resolve(source, workflow), resolve(destination, workflow))
          logger.success(`copy ${workflow} completed`)
        }
      } catch (error) {
        logger.error(`copy ${workflow} failed: ${error}`)
        process.exit(1)
      }
    }),
  )

  logger.success('Copying GitHub Actions workflows completed')
}

const cpGitHooks = async (hooks: string[]) => {
  logger.start('Copying commit hooks')

  const source = resolve(import.meta.dirname, '..', '.husky')
  const destination = resolve(process.cwd(), '.husky')

  await Promise.all(
    hooks.map(async (hook) => {
      try {
        const exists = await checkFileExists(resolve(destination, hook))
        if (exists) {
          logger.info(`skip ${hook} (already exists)`)
        } else {
          logger.info(`copy ${hook}`)
          await cp(resolve(source, hook), resolve(destination, hook))
          logger.success(`copy ${hook} completed`)
        }
      } catch (error) {
        logger.error(`copy ${hook} failed: ${error}`)
        process.exit(1)
      }
    }),
  )

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
  const devDeps = new Set(
    packageJSON.devDependencies ? Object.keys(packageJSON.devDependencies) : [],
  )

  // *still try to install when there is no package.json, maybe need to optimize later
  const missingDevDeps = gitHooksDevDeps.filter((dep) => !devDeps.has(dep))

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

await cpGitHubActions(workflows)

await cpGitHooks(hooks)
await installGitHooksDevDeps()
