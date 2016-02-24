exports.config = {
  capabilities: {
    'browserName': 'chrome'
  },

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    reporter: 'dot',
    timeout: 30000,
    bail: true,
  },
};
