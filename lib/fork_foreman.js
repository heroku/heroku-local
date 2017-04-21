'use strict'

const {fork} = require('child_process')
const path = require('path')

module.exports = function (argv) {
  let script = path.join(__dirname, '../node_modules/.bin/nf')
  let nf = fork(script, argv)
  return new Promise((resolve, reject) => {
    nf.on('exit', function (code) {
      if (code !== 0) reject()
      resolve()
    })
  })
}
