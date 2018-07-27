/* jshint node: true */
'use strict'

const anybar = require('anybar')
const captureExit = require('capture-exit')
const exec = require('child_process').exec

const isOSX = require('os').platform() === 'darwin'

// Pulse
let color = 'black'

let pulser
function pulse () {
  clearInterval(pulser)
  pulser = setInterval(() => {
    anybar(color)
    color = color === 'black' ? 'white' : 'black'
  }, 200)
};

if (!isOSX) {
  /* AnyBar is an OSX-only application. */
  module.exports = {
    name: 'ember-cli-anybar',
  }
} else {
  // Open AnyBar
  exec('open --hide --background -a AnyBar', (error, stdout, stderror) => {
    if (error) {
      console.error(`
      You have the ember-cli-anybar addon installed but have
      not yet installed the AnyBar application. Please run:

        brew cask install anybar
      `)
    }
  })

  // Back to white on exit
  captureExit.captureExit()
  captureExit.onExit(function resetAnyBar () {
    clearInterval(pulser)
    return anybar('white')
  })

  module.exports = {
    name: 'ember-cli-anybar',

    preBuild () {
      pulse()
    },

    buildError: function buildError () {
      clearInterval(pulser)
      anybar('red')
    },

    postBuild: function postBuild () {
      clearInterval(pulser)
      anybar('green')
    },
  }
}
