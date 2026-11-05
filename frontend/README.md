# Frontend · React / Vite / TypeScript

The frontend implements a responsive, browser-based visual screening flow. It uses React 19, TypeScript, Vite, `lucide-react` and CSS in `src/styles/global.css`. It is **connected to the actual FastAPI endpoint** through `src/services/api.ts`, not a client-side classifier.

## Current implementation

| Code | Role |
|---|---|
| `src/pages/App.tsx` | Sidebar, anchored section navigation, upload/preview, prediction rendering, session history, JSON download, disclaimer |
| `src/services/api.ts` | `GET /api/v1/health`, multipart `POST /api/v1/predict` |
| `src/types/prediction.ts` | Typed prediction and health contracts |
| `src/styles/global.css` | Responsive layout and UI states |
| `vite.config.ts` | Dev-time `/api` proxy to local backend |

The navigation uses **same-page anchors** (`#analysis`, `#how-it-works`, `#history`, `#responsible`), **not** separate routed pages. Recent activity is stored for the browser session in current local code; no server-side history API or user accounts exist. `Analyze leaf` is disabled until an accepted image is selected. A high score is not a calibrated diagnosis. User-reported local browser screenshot demonstrates one displayed prediction; no browser automation test suite is currently documented.

## Run and build (PowerShell)

```powershell
cd frontend
npm ci
npm run build
npm run dev
```

Open `http://127.0.0.1:5173`; the backend should run on port 8000, with local model weights ready. Development `/api` calls are proxied to FastAPI. For separate deployment, set `VITE_API_URL` at **build time** and configure server `CORS_ORIGINS` to match. No authentication is implemented.

## Upload workflow and states

1. Click/drop JPEG, PNG or WebP (`max 10 MB` in current UI), preview local image.
2. Click **Analyze leaf**. Client sends multipart `file` to `/api/v1/predict`; UI shows loading state.
3. Display crop, condition, top-3 softmax scores, low-confidence warning and disclaimer, or a meaningful error.
4. Export a JSON summary locally. Browser session history includes filenames/class scores only and is not a durable archive.

## Testing and known gaps

User-reported `tsc -b && vite build` passed with Vite 6.4.5 and one real UI inference screenshot exists. This is local evidence, not CI. Repeat keyboard-navigation and responsive testing, test invalid image types, file-size boundaries and disconnects, and verify JSON export. A footer ellipsis is currently a nonfunctional decoration and should not be advertised as settings. Browser session history is not a database. See [root README](../README.md), [backend guide](../backend/README.md), and [testing/troubleshooting](../docs/en/troubleshooting.md).
