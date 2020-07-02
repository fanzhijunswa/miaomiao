module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-throw-literal": 0,
    "no-async-promise-executor": 0,
    "no-trailing-spaces": 0,
    "quotes": 0,
    "semi": 0,
    "space-before-function-paren": 0,
    "eol-last": 0,
    "no-unused-vars": 0,
    "prefer-const": 0,
    "comma-dangle": 0,
    "array-bracket-spacing": 0,
    "indent": 0,
    "prefer-promise-reject-errors": 0,
    "no-irregular-whitespace":0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
