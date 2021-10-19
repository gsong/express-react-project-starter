#!/usr/bin/env bash

set -euo pipefail

heroku update beta
heroku plugins:install @heroku-cli/plugin-manifest
heroku create --manifest
heroku stack:set container
