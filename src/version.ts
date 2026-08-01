import packageJSON from '../package.json' with { type: 'json' }

export const getVersion = () => `armor v${packageJSON.version}`
