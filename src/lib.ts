import { access } from 'node:fs/promises'

export const checkFileExists = async (file: string) => {
  const exists = await access(file)
    .then(() => true)
    .catch(() => false)
  return exists
}
