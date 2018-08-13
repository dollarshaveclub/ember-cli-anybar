module.exports = {
  extends: [
    'dollarshaveclub/ember'
  ],
  env: {
    browser: true,
  },
  rules: {
    'handle-callback-err': 2,
    'no-mixed-operators': 2,
    'prefer-const': 2,
    'prefer-promise-reject-errors': 2,
    'ember/local-modules': 1,
    'ember/closure-actions': 2,
    'ember/no-observers': 2,
    'ember/use-ember-get-and-set': 2,
  }
};
