# Backend · FastAPI inference service

The current backend is a Python FastAPI application, **not** a mock prediction service. The loadable model is `torchvision.mobilenet_v3_small` with 38 ordered categories from [`../models/inference_recipe.json`](../models/inference_recipe.json). Checkpoint files are not tracked by regular Git; put a trusted, verified `models/adapted_best.pt` at repository root before running inference. Fallback `baseline_pv_best.pt` is used only if the adapted checkpoint is absent. An incompatible present checkpoint must error, not silently fall back.

## Implementation map

| Source | Purpose |
|---|---|
| `app/main.py` | FastAPI app, CORS and router registration |
| `app/api/routes/predict.py` | `/health`, `/ready`, `/predict` and response generation |
| `app/inference/engine.py` | Strict model loading, preprocessing, top-3 softmax |
| `app/services/images.py` | Decode and validate uploaded image |
| `app/core/settings.py` | Runtime environment and limits |
| `app/schemas/prediction.py` | Typed API responses |
| `tests/test_api.py` | Smoke and malformed-input tests |

## API contract

| Method/path | Action | Expected behavior |
|---|---|---|
| `GET /api/v1/health` | Read service status | Does **not** automatically load weights; `model_ready` may be `false` |
| `GET /api/v1/ready` | Attempt trusted checkpoint load | `200` with `model_ready:true`, or `503` on load failure |
| `POST /api/v1/predict` | Multipart `file`: JPEG/PNG/WebP | Real `prediction`, `top_predictions`, `low_confidence`, `uncertainty_note`, `disclaimer`, `model_name`, `model_status`, `preprocessing`, `image_width`, `image_height` |

Do not interpret confidence as calibrated disease probability. Low confidence threshold `0.8` is illustrative, not validated for farm conditions. `POST` returns errors on invalid MIME, decoding, model loading, or inference failure; test cases cover several negative paths. No endpoint provides diagnosis or treatment advice.

## Setup (Windows PowerShell)

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m pytest -v
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Second terminal:

```powershell
Invoke-RestMethod http://127.0.0.1:8000/api/v1/health
Invoke-RestMethod http://127.0.0.1:8000/api/v1/ready
curl.exe -X POST http://127.0.0.1:8000/api/v1/predict -F "file=@C:\path\to\leaf.jpg"
```

## Settings, privacy and deployment

`MODEL_PATH` (absolute or repo-relative), `DEVICE` (default CPU), `CORS_ORIGINS` (comma-separated), `MAX_UPLOAD_MB` (10), `MAX_IMAGE_PIXELS` (30,000,000) are read from process environment. `.env.example` is a reference only; `.env` is not auto-loaded by the shown implementation. Uploaded image bytes are decoded in RAM and not intentionally persisted by this application endpoint. This does not establish infrastructure-wide privacy guarantees. Restrict allowed CORS origins, body sizes, process resources, and checkpoint supply chain before public deployment. HTTPS, monitoring, rate limits and adversarial upload testing are not shown as deployed.

## Model compatibility and testing

A successful `/ready` proves that the specified checkpoint loaded with strict `state_dict` checks in that runtime; it does not prove classification accuracy. User-reported local testing confirmed a successful `/ready` for `adapted_best.pt`, 38 classes, and one end-to-end upload. Automated test results were not independently executed for this documentation release. If `/ready` fails, inspect `models/inference_recipe.json`, model path, trusted checkpoint structure and PyTorch/torchvision versions. For uncertainty and research evidence see [root README](../README.md), [model notes](../models/README.md), and [bilingual docs](../docs/README.md).
