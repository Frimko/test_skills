const path = require('path');

module.exports = {
  'root': true,
  'parser': '@typescript-eslint/parser',
  'plugins': [
    '@typescript-eslint',
    'jest',
  ],
  'parserOptions': {
    'project': `./tsconfig.json`
  },
  'extends': [
    'react-app',
    'airbnb-typescript',
    'plugin:jest/recommended'
  ],
  'env': {
    'node': true,
    'browser': true,
    'jest': true
  },
  'overrides': [
    {
      'files': ['**/*.js?(x)'],
      'parser': 'babel-eslint',
      'plugins': [],
      'parserOptions': {
        'ecmaVersion': 6,
        'ecmaFeatures': {
          'jsx': true
        }
      },
    }
  ],
  'rules': {
    'object-curly-newline': [
      'error',
      { 'multiline': true, 'minProperties': 3 }
    ],
    "max-len": ["error", 120],
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'arrow-parens': 'off',
    'import/prefer-default-export': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-useless-catch': 'off',
  },
/*  'rules': {
    'camelcase': [
      1
    ],
    'class-methods-use-this': [
      'off'
    ],
    'function-paren-newline': [
      'error',
      'consistent'
    ],
    'import/prefer-default-export': [
      0
    ],
    'jsx-a11y/href-no-hash': [
      'off'
    ],
    'jsx-a11y/anchor-is-valid': [
      'warn',
      {
        'aspects': [
          'invalidHref'
        ]
      }
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        'devDependencies': true
      }
    ],
    'implicit-arrow-linebreak': 0,
    'no-continue': 0,
    'max-len': [
      'error',
      120
    ],
    'no-confusing-arrow': 0,
    'no-debugger': [
      1
    ],
    'no-console': [
      'warn'
    ],
    'no-continue': 0,
    'no-nested-ternary': 0,
    'no-param-reassign': [
      'off'
    ],
    'no-plusplus': [
      'error',
      {
        'allowForLoopAfterthoughts': true
      }
    ],
    'no-return-assign': [
      1
    ],
    'no-underscore-dangle': [
      0
    ],
    'no-unused-expressions': [
      'error',
      {
        'allowTernary': true
      }
    ],
    'object-curly-newline': [
      'error',
      {
        'consistent': true
      }
    ],
    'operator-linebreak': [
      0
    ],
    'padded-blocks': [
      'error',
      {
        'classes': 'always'
      }
    ],
    'react/destructuring-assignment': 0,
    'react/forbid-prop-types': [
      'off'
    ],
    'react/no-find-dom-node': [
      'warn'
    ],
    'react/no-string-refs': [
      'warn'
    ],
    'react/require-default-props': [
      0
    ],
    'react/default-props-match-prop-types': [
      'error',
      {
        'allowRequiredDefaults': true
      }
    ],
    'react/sort-comp': [
      2,
      {
        'order': [
          'static-methods',
          'lifecycle',
          'everything-else',
          'render'
        ]
      }
    ],
    'react/jsx-wrap-multilines': [
      2,
      {
        'condition': 'ignore'
      }
    ],
    'react/jsx-one-expression-per-line': 0,
  },*/
  'settings': {
    'import/resolver': {
      'node': {
        'paths': [path.resolve(__dirname, 'src')],
      }
    }
  }
}
