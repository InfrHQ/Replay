module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['prettier', 'eslint:recommended', 'plugin:react/recommended'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          "jsx": true
        }
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off"
    },
    env: {
      "browser": true,
      "node": true,
      "es6": true
    },
    plugins: ["react"]
}
