import { resolve } from 'node:path'
import { cp } from 'node:fs/promises'
import { checkFileExists } from './lib.ts'
import { logger } from './logger.ts'

export const copyFiles = async ({
  files,
  source,
  destination,
  overwrite,
}: {
  files: string[]
  source: string
  destination: string
  overwrite: boolean
}) => {
  await Promise.all(
    files.map(async (file) => {
      try {
        const exists = await checkFileExists(resolve(destination, file))
        if (!overwrite && exists) {
          logger.info(`skip ${file} (already exists)`)
        } else {
          logger.info(`copy ${file}`)
          await cp(resolve(source, file), resolve(destination, file))
          logger.success(
            `copy ${file} completed${overwrite && exists ? ' (overwritten)' : ''}`,
          )
        }
      } catch (error) {
        logger.error(`copy ${file} failed: ${error}`)
        process.exit(1)
      }
    }),
  )
}
