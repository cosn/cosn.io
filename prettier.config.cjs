/** @type {import('prettier').Options} */
module.exports = {
  arrowParens: 'always',
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx', 'cn'],
}
