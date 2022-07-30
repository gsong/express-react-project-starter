#!/usr/bin/env bash

set -euo pipefail

until curl -sSf http://localhost:${PORT:-4000}/api/ping > /dev/null; do
  sleep 5
done

DISABLE_ESLINT_PLUGIN=true npx react-scripts start
