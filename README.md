# EM 2024 frontend ⚽

## 📄 Requirements

- Bun or Node 20.14 with pnpm
- SQLite

You can develop locally with Bun or pnpm, but the production build must use pnpm.

> Note: Bun has known issues with SQLite3 in production mode. It works in developer mode, but Bun cannot start the server during a build.

## 🚀 Quick start

1. Clone the repository
2. Install dependencies using `bun install` or `pnpm install`.
3. Initialize demo data with `bun run init-demo-data` or `pnpm run init-demo-data`
4. Start the local development server with `bun run dev` or `pnpm run dev`


> Tip: If you do not need demo data, replace step 3 with the following command: `bun run init` or `pnpm run init`.

#### Demo data

- Password for all users: `test123`

- Location of user data: See line 5 in `./scripts/demo_data.ts`


## ✔️ Run Tests

To run tests, execute:

```
vitest
```

### 💀 Trubleshooting


__Issue:__ Error in `node_module` with `sqlite3`.

__Solution:__ Rebuild SQLite3 using:
```
npm rebuild better-sqlite3
```
