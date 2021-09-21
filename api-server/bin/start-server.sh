#!/usr/bin/env bash

set -euo pipefail

until docker-compose exec -u postgres db pg_isready > /dev/null; do
  sleep 5
done

npx nodemon server.mjs
