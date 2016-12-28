/* jshint node: true */
'use strict';

const anybar = require('anybar');

module.exports = {
  name: 'ember-cli-anybar',

  preBuild: function() {
    anybar('yellow');
  },

  buildError: function() {
    anybar('red');
  },

  postBuild: function() {
    anybar('green');
  },

};
