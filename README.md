# NTA Citizen Portal Prototype

A modern Vite/React prototype for National Testing Agency public information, candidate authentication, applications, mock tests, and document handling.

## Local Development

1. Install dependencies with `pnpm install`.
2. Copy `.env.example` to `.env` and configure the values you need.
3. Start the API with `pnpm run dev:api`.
4. Start Vite with `pnpm run dev`.
5. Open the Vite URL. Development requests under `/api` are proxied to port `8787`.

For local-only evaluation, set `ALLOW_MEMORY_DB=true`. Documents default to `storage/documents`; the directory is ignored by Git.

## Backend

- Username/password authentication uses salted `scrypt` password hashes and opaque bearer sessions. Raw session tokens are never stored in MongoDB.
- Candidate uploads are written to a private filesystem directory. MongoDB stores document metadata and ownership, not the file contents.
- Official public exam and notice data is synchronized from `https://www.nta.ac.in/` every six hours by default. Each record retains its official source URL, fetched timestamp, and verification marker.
- The manual sync endpoint is `POST /api/sync/nta` with an `X-Sync-Secret` header.

## Railway Backend

1. Push this repository to `https://github.com/Domino152/BTI`.
2. In Railway, create a new project and choose **Deploy from GitHub repo**.
3. Select `Domino152/BTI`. Keep the root directory as the repository root.
4. Add a MongoDB database to the same Railway project.
5. Add a persistent volume to the backend service and mount it at `/data`.
6. In the backend service variables, add:

```env
NODE_ENV=production
PORT=8787
MONGODB_URI=${{MongoDB.MONGO_URL}}
MONGODB_DB_NAME=nta_portal
DOCUMENT_STORAGE_PATH=/data/documents
FRONTEND_ORIGINS=https://domino152.github.io
SESSION_DAYS=7
NTA_SYNC_INTERVAL_MINUTES=360
NTA_SYNC_SECRET=replace-with-a-long-random-secret
NTA_HOMEPAGE=https://www.nta.ac.in/
NTA_CONTACT_PAGE=https://www.nta.ac.in/ContactUs
```

7. Confirm Railway is using `railway.json`. It starts the API with `node server/index.js` and checks `/api/health`.
8. Generate a Railway public domain for the backend, then test `https://your-service.up.railway.app/api/health`.

## GitHub Pages Frontend

1. Open the GitHub repo, then go to **Settings > Secrets and variables > Actions > Variables**.
2. Add `VITE_API_BASE_URL` with your Railway backend URL, for example `https://your-service.up.railway.app`.
3. Go to **Settings > Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Push to `main`, or run **Deploy to GitHub Pages** manually from the Actions tab.
6. Open `https://domino152.github.io/BTI/`.
7. Add the final Pages origin to Railway `FRONTEND_ORIGINS`. For the default Pages URL, use `https://domino152.github.io`.

## Verification

- `pnpm run test:api` exercises registration, session authentication, filesystem document upload/delete, and the NTA page parser using an isolated temporary directory.
- `pnpm run test:ui` runs the browser verification while Vite is on port `5174` and the API is on port `8787`.
- `pnpm run build` verifies the production frontend bundle.

Never commit `.env`, MongoDB credentials, candidate documents, or the NTA synchronization secret.
