#!/bin/sh
# Container entrypoint: sync deps, apply schema, then run the main process (e.g. `pnpm dev`).
set -e
cd /app
pnpm db:push
exec "$@"
