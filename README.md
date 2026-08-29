# NTA Smart Citizen Portal

A modern Vite/React prototype for National Testing Agency public information, candidate login, exam discovery, mock tests, application flows, and document upload screens.

The GitHub Pages deployment runs in static demo mode. It does not need MongoDB, Render, Railway, or any backend server. Login, application progress, and uploaded document metadata are stored in the visitor's browser localStorage so the public demo link behaves like the local prototype.

## Live Deployment

Frontend URL after GitHub Pages succeeds:

```text
https://domino152.github.io/BTI/
```

## Demo Login

```text
Username: demo-student
Password: Demo@12345
```

Users can also create their own demo account from the login page. Accounts are local to the browser.

## GitHub Pages Setup

1. Go to `Domino152/BTI` on GitHub.
2. Open **Settings > Pages**.
3. Set **Build and deployment > Source** to **GitHub Actions**.
4. Open **Actions**.
5. Run **Deploy to GitHub Pages**, or push to `main`.
6. Open `https://domino152.github.io/BTI/`.

If `actions/configure-pages` reports `Get Pages site failed`, GitHub Pages has not been enabled for the repository yet. Repeat steps 2 and 3, then re-run the workflow. For automatic enablement, create a fine-grained GitHub token with repository Pages write access, save it as an Actions secret named `PAGES_PAT`, and re-run the workflow.

## Local Development

1. Install dependencies with `pnpm install`.
2. Start Vite with `pnpm run dev`.
3. Open the Vite URL.

Static mode is enabled automatically when `VITE_API_BASE_URL` is not set. To force it:

```env
VITE_STATIC_DEMO=true
```

## Optional Backend Mode

The `server/` directory contains an optional Express backend with MongoDB persistence, filesystem document storage, and official NTA public-data synchronization. It is not required for the GitHub Pages demo.

To run it locally:

1. Copy `.env.example` to `.env`.
2. Configure `MONGODB_URI`, or set `ALLOW_MEMORY_DB=true` for local-only testing.
3. Start the API with `pnpm run dev:api`.
4. Start Vite with `VITE_API_BASE_URL=http://localhost:8787 pnpm run dev`.

## Verification

- `pnpm run test:api` checks the optional backend.
- `pnpm run build` verifies the static production frontend bundle.

Never commit `.env`, MongoDB credentials, candidate documents, or synchronization secrets.
