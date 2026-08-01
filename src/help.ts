import { type OptionDescriptor, options } from './options.ts'

const getOptionsDescription = () => {
  const entries = Object.entries(options) as [string, OptionDescriptor][]

  const rows = entries
    .filter(([, value]) => value.description)
    .map(([key, value]) => {
      const { description, short } = value
      const label = short ? `-${short}, --${key}` : `--${key}`
      return { label, description }
    })

  const width = Math.max(...rows.map((row) => row.label.length))
  const gap = 2

  return rows
    .map((row) => `  ${row.label.padEnd(width + gap)}${row.description}`)
    .join('\n')
}
export const HELP_TEXT = `
Usage: armor [options]

Copy GitHub Actions workflows and Git hooks into the current project.

Options:
${getOptionsDescription()}

Examples:
  armor
  armor --overwrite
  armor --skip-install
`

export const printHelp = () => {
  console.log(HELP_TEXT.trim())
}
