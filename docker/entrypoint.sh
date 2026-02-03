#!/bin/sh
set -e
cd /app
pnpm db:push
exec "$@"
