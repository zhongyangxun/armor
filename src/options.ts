import { parseArgs, type ParseArgsOptionsConfig } from 'node:util'
import { logger } from './logger.ts'

const options = {
  overwrite: {
    type: 'boolean',
    default: false,
  },
  'skip-install': {
    type: 'boolean',
    default: false,
  },
  help: {
    type: 'boolean',
    short: 'h',
    default: false,
  },
} satisfies ParseArgsOptionsConfig

export const parseOptions = () => {
  try {
    const { values } = parseArgs({ options })
    return values
  } catch (error) {
    logger.error(`${(error as Error).message}`)
    logger.info('Run `armor --help` or `armor -h` for usage.')
    process.exit(1)
  }
}
