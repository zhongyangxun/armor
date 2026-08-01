import { spawn } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { checkFileExists } from './lib.ts'
import { logger } from './logger.ts'

type PackageManager = 'pnpm' | 'yarn' | 'bun' | 'npm'
type InstallCommand = 'add' | 'install'

type PackageJSON = {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

const packageLockFileMap = new Map<string, PackageManager>([
  ['pnpm-lock.yaml', 'pnpm'],
  ['yarn.lock', 'yarn'],
  ['bun.lockb', 'bun'],
  ['bun.lock', 'bun'],
  ['package-lock.json', 'npm'],
])

const installCommandMap = new Map<PackageManager, InstallCommand>([
  ['pnpm', 'add'],
  ['yarn', 'add'],
  ['bun', 'add'],
  ['npm', 'install'],
])

export const detectPackageManager = async (): Promise<PackageManager> => {
  for (const [lockFile, packageManager] of packageLockFileMap) {
    if (await checkFileExists(lockFile)) {
      return packageManager
    }
  }

  return 'npm'
}

export const getPackageJSON = async (): Promise<PackageJSON | null> => {
  const filePath = resolve(process.cwd(), 'package.json')

  // if package.json not found, still run the code and return null
  if (!(await checkFileExists(filePath))) {
    logger.error('package.json not found')
    return null
  }

  try {
    const packageJSON = await readFile(filePath, 'utf8')
    const packageJSONObj = JSON.parse(packageJSON) as PackageJSON
    return packageJSONObj
  } catch (error) {
    logger.error('Failed to parse package.json', error)
    process.exit(1)
  }
}

export const installDependencies = async (
  packageManager: PackageManager,
  devDependencies: string[],
) => {
  const installCommand = installCommandMap.get(packageManager)
  if (!installCommand) {
    throw new Error(`Unsupported package manager: ${packageManager}`)
  }

  return new Promise<void>((resolve, reject) => {
    const child = spawn(
      packageManager,
      [installCommand, ...devDependencies, '-D'],
      {
        stdio: 'inherit',
        shell: true,
      },
    )
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${packageManager} exited with code ${code}`))
    })
  })
}
