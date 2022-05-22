module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  globals: {
    http: true,
    nofity: true,
    AuthAPI: true,
    NamespaceAPI: true,
    AttributeAPI: true,
    FunctionAPI: true,
    TargetAPI: true,
    ConditionAPI: true,
    EffectAPI: true,
    RuleAPI: true,
    AlgorithmRuleAPI: true,
    PolicyAPI: true,
    AlgorithmPolicyAPI: true,
    PolicySetAPI: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
  }
}
