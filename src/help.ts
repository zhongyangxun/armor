export const HELP_TEXT = `
Usage: armor [options]

Copy GitHub Actions workflows and Git hooks into the current project.

Options:
  -h, --help          Show this help message
      --overwrite     Overwrite existing files
      --skip-install  Skip installing Git hooks dev dependencies

Examples:
  armor
  armor --overwrite
  armor --skip-install
`

export const printHelp = () => {
  console.log(HELP_TEXT.trim())
}
