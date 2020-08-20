module.exports = {
  'env': {
    'es6': true,
    'node': true,
    'jest': true,
    'browser': true,
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 2018,
  },
  'rules': {
    'no-constant-condition': [
      'error',
      { 'checkLoops': false }
    ],
    'consistent-return': [
      'error',
    ],
    'quotes': [
      'error',
      'single',
      { 'allowTemplateLiterals': true }
    ],
    'semi': [
      'error',
      'never'
    ],
    'no-console': 0,
    'linebreak-style': 0,
    'global-require': 0,
    'eslint linebreak-style': [0, 'error', 'windows'],
    'space-before-function-paren': 1,
    // return 语句中运行有赋值表达式
    'no-return-assign': 0,
    // 不允许非空数组里面有多余的空格
    'array-bracket-spacing': 0,
  }
}
