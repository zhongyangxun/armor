export default {
  '*.{js,jsx,ts,tsx,json,css,yml,yaml,md}': 'prettier --write',
  // 函数形式不追加文件名，避免 tsc 收到具体文件后丢弃 tsconfig；始终整项目检查
  '*.{ts,tsx}': () => 'tsc --noEmit',
  '*.{js,jsx,ts,tsx}': 'eslint --fix',
}
