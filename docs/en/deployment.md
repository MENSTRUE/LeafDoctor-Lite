# Deployment and operational readiness

## Status

**Local research prototype, not production-ready.** User-reported local frontend build and checkpoint loading succeeded. No hosted endpoint, CI pipeline, vulnerability assessment, independent farm validation, availability objective or legal review has been verified.

## Development start (Windows PowerShell)

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Second terminal:

```powershell
cd frontend
npm ci
npm run build
npm run dev
```

Confirm `/api/v1/ready` (checkpoint loaded) and browser upload. Without trusted local `models/adapted_best.pt` (or baseline fallback), inference is unavailable. The Git repository intentionally excludes weights; do not claim cloning alone enables inference.

## Configuration and production blockers

| Setting | Current behavior |
|---|---|
| `MODEL_PATH` | Optional local trusted checkpoint path |
| `DEVICE` | Defaults CPU; only request CUDA if present |
| `CORS_ORIGINS` | Defaults localhost ports 5173; restrict for deployment |
| `MAX_UPLOAD_MB` | 10 MiB default |
| `MAX_IMAGE_PIXELS` | 30,000,000 default |
| `VITE_API_URL` | Frontend API origin at build time; dev may use Vite proxy |

`.env.example` is a reference, not automatically loaded by the backend. Before internet deployment: verify supply-chain weights/license, protect upload limits and logs, use TLS, rate limits, monitoring, privacy policy, secure CORS, dependency pinning, independent tests, and crop-specialist review. No persistent accounts/storage are implemented. Do not expose app as an authoritative diagnostic tool.
