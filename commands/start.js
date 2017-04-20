'use strict'

const co = require('co')
const cli = require('heroku-cli-util')
const {fork} = require('child_process')

function * run (context) {
  if (context.flags.restart) throw new Error('--restart is no longer available\nUse forego instead: https://github.com/ddollar/forego')
  if (context.flags.concurrency) throw new Error('--concurrency is no longer available\nUse forego instead: https://github.com/ddollar/forego')

  let execArgv = ['', 'heroku local', 'start']

  if (context.flags.procfile) execArgv.push('--procfile', context.flags.procfile)
  if (context.flags.env) execArgv.push('--env', context.flags.env)
  if (context.flags.port) execArgv.push('--port', context.flags.port)
  if (context.args.processname) {
    execArgv.push(context.args.processname)
  } else {
    let procfile = context.flags.procfile || 'Procfile'
    let procHash = require('foreman/lib/procfile.js').loadProc(procfile)
    let processes = Object.keys(procHash).filter((x) => x !== 'release')
    execArgv.push(processes.join(','))
  }

  return new Promise((resolve, reject) => {
    fork('foreman/nf.js', execArgv)
    // no need to return anything, foreman will exit
  })
}

const cmd = {
  topic: 'local',
  description: 'run heroku app locally',
  help: `Start the application specified by a Procfile (defaults to ./Procfile)

Examples:

  heroku local
  heroku local web
  heroku local web=2
  heroku local web=1,worker=2`,
  args: [{name: 'processname', optional: true}],
  flags: [
    {name: 'procfile', char: 'f', hasValue: true, description: 'use a different Procfile'},
    {name: 'env', char: 'e', hasValue: true, description: 'location of env file (defaults to .env)'},
    {name: 'port', char: 'p', hasValue: true, description: 'port to listen on'},
    {name: 'restart', char: 'r', hasValue: false, hidden: true, description: 'restart process if it dies'},
    {name: 'concurrency', char: 'c', hasValue: true, hidden: true, description: 'number of processes to start'}
  ],
  run: cli.command(co.wrap(run))
}

module.exports = [
  cmd,
  Object.assign({command: 'start'}, cmd)
]
