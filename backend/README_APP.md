# Backend implementation — LeafDoctor Lite

Run from `backend/` using a local virtual environment:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m pytest -v
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

`GET /api/v1/health` reports service status; `GET /api/v1/ready` attempts actual model loading; `POST /api/v1/predict` accepts multipart `file` with PNG/JPEG/WebP. The server loads `../models/inference_recipe.json` and defaults to `../models/adapted_best.pt`, falling back to `baseline_pv_best.pt` **only if adapted file is absent**. Invalid/incompatible checkpoints return HTTP 503; no fabricated result is returned.

Model `.pt` files are excluded from regular Git; place verified weights locally or distribute through a trusted release. Only load a checkpoint you trust. Tests for actual inference and checkpoint compatibility must be run with local weights. Uploaded images are processed in memory and not persisted. Crop/condition labels are from the original 38-class recipe. Confidence is uncalibrated. No diagnosis or treatment advice.
