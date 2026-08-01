import chalk from 'chalk'

import { stringifyUnknown } from './lib.ts'

type logger = {
  start: (message: string) => void
  success: (message: string) => void
  info: (message: string) => void
  error: (message: string, cause?: unknown) => void
}

const loggerIcons = {
  start: '🚀',
  success: '✨',
  info: '💡',
  error: '✖',
}

export const logger: logger = {
  start: (message: string) => {
    console.log(chalk.cyan(`${loggerIcons.start} ${message}`))
  },
  success: (message: string) => {
    console.log(chalk.green(`${loggerIcons.success} ${message}`))
  },
  info: (message: string) => {
    console.log(chalk.blue(`${loggerIcons.info} ${message}`))
  },
  error: (message: string, cause?: unknown) => {
    const detail = stringifyUnknown(cause)

    const text = detail ? `${message}: ${detail}` : message
    console.log(chalk.red(`${loggerIcons.error} ${text}`))
  },
}
