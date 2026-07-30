#!/usr/bin/env node

import { access, cp } from 'node:fs/promises'
import { resolve } from 'node:path'
import { logger } from './logger.ts'

const workflows = ['commitlint.yml', 'ggshield.yml']

const checkFileExists = async (file: string) => {
  const exists = await access(file)
    .then(() => true)
    .catch(() => false)
  return exists
}

const cpGitHubActions = async () => {
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

cpGitHubActions()
