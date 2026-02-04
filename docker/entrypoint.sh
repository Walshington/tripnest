#!/bin/sh
# Container entrypoint: ensures the app database schema is applied, 
# then runs the main process (e.g. `pnpm dev`).
set -e
cd /app
pnpm db:push
exec "$@"
