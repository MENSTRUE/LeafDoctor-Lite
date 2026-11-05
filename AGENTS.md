# LeafDoctor Lite — operational agent rules

## Objective and source priority
Support a reproducible 38-class leaf-image screening research prototype. Source of truth, in descending order: executed source code and checked-in artifacts; `models/inference_recipe.json` and `models/MODEL_CARD.json`; original experiment CSV/JSON and notebook; developer/user instructions; prose documentation. Disagreements must be flagged, not silently reconciled.

## Repository invariants
Preserve existing root `notebooks/`, `models/`, `reports/`, `assets/`, `backend/`, `frontend/`, `docs/`, `scripts/`. Do not create `datasets/`, rename roots, invent placeholder code, or overwrite originals without diff/backup. Keep dataset downloads outside Git; `.gitkeep` only when an otherwise empty directory must be versioned.

## Before → Now → Next
Before: PlantVillage baseline and mapped PlantDoc adaptation with checkpoint metadata. Now: PyTorch/FastAPI inference plus React app exists, single local interaction was user-verified. Next: expanded real-data tests, independent field evaluation and calibration. Never convert a planned feature into an implemented claim.

## ML and evidence
Use **only** 38 ordered classes in `models/inference_recipe.json`, no alphabetical reordering. Preserve resize short-edge 256, center crop 224, ImageNet normalization. Use validation for selection and hold-out tests for final reporting. Cite dataset and split names, `n`, metrics, model version, mapping and exclusions. Beware historical V1 subset (165) vs V2 mapped PlantDoc subset (182). Label softmax uncalibrated; no diagnosis or treatment claims. Keep class reports and confusion matrices traceable. Never invent scores, plots or synthetic ground-truth evidence.

## Security and backend standards
Accept only decoded supported image formats with input size/pixel bounds. No dangerous image execution or arbitrary user paths. Use trusted `.pt` checkpoints only (`torch.load(weights_only=True)` does not prove model-source trust). Preserve strict state-dict validation; reject malformed weights. Never log raw uploaded image or expose secrets. Keep error responses actionable without revealing internal secrets. Backend API contracts: GET `/api/v1/health`, GET `/api/v1/ready`, POST `/api/v1/predict` multipart `file`.

## Frontend standards
Respect real API response types and states. Upload / preview must use real files; disabled button until selected image is intentional. History is browser session scoped; do not imply server persistence. Support keyboard access, responsive layout, loading, empty and error states. Do not add fake results. Explain confidence calibration limitations.

## Change protocol
1. Read `git status`, inspect exact files, and note existing edits.
2. Identify smallest scoped code/doc modification. Avoid changing checkpoint or dataset without explicit authorization.
3. Update accompanying component README, both language versions, and evidence gallery only if real files exist.
4. Run `python -m pytest -v` in backend when relevant, `npm run build` in frontend when relevant, and exercise `/ready` and `/predict` with real checkpoint when applicable.
5. Record command outputs accurately; do not label tests passing if not run. Ensure all relative Markdown links exist, all images resolve, and numeric claims match CSV/JSON.
6. Use clear commit messages (`docs: ...`, `fix(frontend): ...`, `feat(backend): ...`). Never force-push, commit credentials, `.venv`, `node_modules`, training datasets, or unreviewed giant weights.

## Bilingual rules
Maintain equivalent factual coverage under `docs/id/` and `docs/en/`. Do not translate class keys or mutate identifiers; translate explanatory text only. Maintain provenance URLs, split counts, uncertainties and API/schema signatures. Root README is the overview, detailed bilingual docs hold specifics.

## Definition of done
Implementation + documented contract + verified relevant tests + source-cited metrics + corrected asset references + both language docs + status/limitations + Git diff review. If any element is incomplete, mark it pending. See component AGENTS for stricter local guidance; component rules may extend but not contradict this file.
