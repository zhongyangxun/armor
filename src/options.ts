import { parseArgs, type ParseArgsOptionDescriptor } from 'node:util'

import { logger } from './logger.ts'

export type OptionDescriptor = ParseArgsOptionDescriptor & {
  description: string
}

export const options = {
  help: {
    type: 'boolean',
    short: 'h',
    default: false,
    description: 'Show help message',
  },
  overwrite: {
    type: 'boolean',
    default: false,
    description: 'Overwrite existing files',
  },
  'skip-install': {
    type: 'boolean',
    default: false,
    description: 'Skip installing Git hooks dev dependencies',
  },
} satisfies Record<string, OptionDescriptor>

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
