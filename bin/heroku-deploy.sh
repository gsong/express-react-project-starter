#!/usr/bin/env bash

set -euo pipefail

heroku container:login
DOCKER_DEFAULT_PLATFORM=linux/amd64 heroku container:push web
heroku container:release web
