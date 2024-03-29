module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'next',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  ignorePatterns: ['node_modules/', 'dist/', '.next/'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'no-console': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/no-use-before-define': ['error'], // React import시 error
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Missing return type on function, React.FC 제거
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'no-use-before-define': 'off', // React import시 error
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'func-names': [2, 'never'], // const fn = function() {}; function 이름 error
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ], // next js Link -> a태그 href error
    'react/jsx-props-no-spreading': 'off', // next js _app.tsx 스프레드 props error
    'import/no-anonymous-default-export': [2, { allowObject: true }], // default로 객체 리턴 가능
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }], // devDependencies 에러
  },
};
