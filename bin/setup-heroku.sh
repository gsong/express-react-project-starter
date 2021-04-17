#!/usr/bin/env bash

set -euo pipefail

heroku update beta
heroku plugins:install @heroku-cli/plugin-manifest
heroku create --manifest
docker-compose run --rm -e DATABASE_URL=$(heroku config:get DATABASE_URL) db /bin/ash -c 'psql ${DATABASE_URL} < /var/tmp/pg/seed.pgsql'
heroku stack:set container
git push heroku HEAD:main
heroku open
heroku apps:info
