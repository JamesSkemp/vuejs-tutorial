module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
	'@vue/typescript/recommended',
	"plugin:jsdoc/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  plugins: [
	"jsdoc"
  ],
  rules: {
	'jsdoc/require-description': 1,
	'jsdoc/require-param-type': 'off',
	'jsdoc/require-returns-type': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
