TripNest

# Getting Started

Copy `.env.example` to `.env` at the project root and set the values.

## Docker (recommended)

**Prerequisites:** Docker and Docker Compose.

From the project root:

```bash
docker compose up    # start
docker compose down  # stop
```

- **App:** http://localhost:3000
- **PostgreSQL:** localhost:5432

## Local (no Docker)

1. **Install PostgreSQL** and create a database.

2. **Apply the schema** (first time only):
   ```bash
   pnpm db:push
   ```

3. **Install and run:**
   ```bash
   pnpm install
   pnpm dev
   ```

- App: http://localhost:3000

# Building For Production

To build this application for production:

```bash
pnpm build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
pnpm test
```

## Linting & Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting. The following scripts are available:

```bash
pnpm lint
pnpm format
pnpm check
```

## Setting up Clerk

Clerk keys go in `.env` (see `.env.example`).
