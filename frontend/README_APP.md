# Frontend implementation — LeafDoctor Lite

Requirements: Node.js 20+ and npm.

```powershell
cd frontend
npm install
npm run dev
npm run build
```

Open http://127.0.0.1:5173. In development, Vite proxies `/api` to the FastAPI server at `127.0.0.1:8000`. With a separate production backend, set `VITE_API_URL` to its API origin **at build time** and configure `CORS_ORIGINS` in the API. The UI reports actual network errors and actual model outputs. A successful upload does not imply diagnosis accuracy. Recent history exists only in browser component state, and is cleared on reload. No screenshots or UI test results are claimed.
