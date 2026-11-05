# Troubleshooting and validation playbook

| Symptom | Likely reason | Check / corrective action |
|---|---|---|
| Frontend shows **Model not loaded** | Backend may be healthy before lazy model initialization | Call `GET http://127.0.0.1:8000/api/v1/ready`; inspect `model_ready`, errors and local trusted checkpoint |
| `503` on `/ready` | Weights missing/incompatible, bad state dict, unavailable CUDA | Check `models/adapted_best.pt`, recipe and torch/torchvision compatibility; never fake readiness |
| `415` predict | Unsupported MIME | Supply JPEG/PNG/WebP multipart `file` |
| `422`/`400` predict | Invalid/empty/corrupt image | Use decoded valid image within size/pixel constraints |
| `Analyze leaf` cannot be clicked | Button intentionally disabled until image selected or request pending | Select an accepted image first; inspect disabled state in browser |
| Browser `Failed to fetch` | API not running, proxy/CORS incorrect | Start FastAPI on 127.0.0.1:8000, inspect Vite proxy, `VITE_API_URL`, `CORS_ORIGINS` |
| Sidebar click changes `#history` but stays on same page | App uses anchors and scroll, not routed pages | Scroll to section; check browser console for JS errors |
| Refresh clears prior predictions | Only session-scoped state; not durable server history | Do not assume database persistence; export JSON if needed |
| TypeScript JSX parse errors near `nav-link` | Stray quote from earlier patch in `className` | Inspect `frontend/src/pages/App.tsx`; preserve backup; run `npm run build` |
| Weights absent from GitHub | `.pt` ignored intentionally | Obtain trusted checkpoint through verified artifact distribution, not random downloads |

## Verification commands

```powershell
cd backend
.\.venv\Scripts\python.exe -m pytest -v
Invoke-RestMethod http://127.0.0.1:8000/api/v1/health
Invoke-RestMethod http://127.0.0.1:8000/api/v1/ready
```

Then from `frontend/`: `npm run build`. If model is ready, upload a known labeled sample and record top-3, class order, score and expected label. **A plausible single prediction is not a correct diagnostic evaluation**. For metrics and audit follow [evaluation](evaluation.md) and [limitations](limitations.md).
