import { access } from 'node:fs/promises'
import { inspect } from 'node:util'

export const checkFileExists = async (file: string) => {
  const exists = await access(file)
    .then(() => true)
    .catch(() => false)
  return exists
}

export const stringifyUnknown = (value: unknown) => {
  if (value === null || value === undefined) return ''
  if (value instanceof Error) return value.message
  if (typeof value === 'string') return value

  return inspect(value, { depth: null })
}
