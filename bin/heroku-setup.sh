#!/usr/bin/env bash

set -euo pipefail

npm run heroku:app:create
npm run _heroku:db:init
npm run heroku:deploy
heroku apps:info
