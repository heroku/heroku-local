heroku-local [![Circle CI](https://circleci.com/gh/heroku/heroku-local/tree/master.svg?style=svg)](https://circleci.com/gh/heroku/heroku-local/tree/master)
============

Run heroku apps locally. This plugin is built into the Heroku Toolbelt, you do not need to install it separately.

To use:

```
$ heroku local
12:47:17 PM web.1 | listening on 3000
```

This command internally uses [node-foreman](https://github.com/strongloop/node-foreman) to run the app locally.

Help
=======

```
$ heroku help local

Usage: heroku local [PROCESSNAME]

 run heroku app locally

 Start the application specified by a Procfile (defaults to ./Procfile)

 Examples:

   heroku local
   heroku local web
   heroku local -f Procfile.test -e .env.test

 -f, --procfile PROCFILE
 -e, --env ENV
 -p, --port PORT

Additional commands, type "heroku help COMMAND" for more details:

  local:version  #  display node-foreman version
```
