/* jshint node: true */
'use strict';

const anybar = require('anybar');
const captureExit = require('capture-exit');
const exec = require('child_process').exec;

captureExit.captureExit();

// Open AnyBar (OSX only)
exec('open --hide --background -a AnyBar', (error, stdout, stderror) => {
  if (error) console.error(`exec error: ${error}`);
});

// Pulse
let color = 'black';

let pulser;
function pulse() {
  clearInterval(pulser);
  pulser = setInterval(() => {
    anybar(color);
    color = color === 'black' ? 'white' : 'black';
  }, 200);
};

// Back to white on exit
captureExit.onExit(function() {
  clearInterval(pulser);
  return anybar('white');
});

module.exports = {
  name: 'ember-cli-anybar',

  preBuild() {
    pulse();
  },

  buildError: function() {
    clearInterval(pulser);
    anybar('red');
  },

  postBuild: function() {
    clearInterval(pulser);
    anybar('green');
  },

};
