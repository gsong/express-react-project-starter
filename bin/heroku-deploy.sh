#!/usr/bin/env bash

set -euo pipefail

heroku container:login
heroku container:push web
heroku container:release web
