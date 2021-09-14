#!/usr/bin/env bash

set -euo pipefail

heroku update beta
heroku plugins:install @heroku-cli/plugin-manifest
heroku create --manifest
npm run _heroku:db:init
heroku stack:set container
npm run heroku:deploy
heroku apps:info
