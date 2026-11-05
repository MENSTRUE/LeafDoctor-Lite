# Reproducibility and experiment lineage

## Two distinct environments

**Recorded Kaggle research run:** [`dataset_provenance.json`](../../reports/metadata/dataset_provenance.json) gives Python 3.13.16, torch 2.11.0+cu130, torchvision 0.26.0+cu130, seed 42 and source input `/kaggle/input/datasets/loliwibu/leafdoctor-dataset`. Original dataset identities are PlantVillage and PlantDoc. The immutable upstream dataset version and access date were not recorded.

**Local application:** uses `backend/requirements.txt` version ranges and `frontend/package-lock.json`; do not assume identical to Kaggle. A fresh setup requires a trusted separately distributed `.pt` checkpoint, plus the tracked `inference_recipe.json`.

## Reproduction sequence

1. Review [provenance](dataset_provenance.md), upstream licensing, label mapping and [`split_counts.json`](../../reports/audit/split_counts.json).
2. Recreate datasets in an input layout matching [`leafdoctor-lite.ipynb`](../../notebooks/leafdoctor-lite.ipynb); inspect notebook before changing paths or training.
3. Restore logged random seed and pinned research environment if possible; check exact-hash cross-split overlap and quarantine counts. Respect original labels, avoid test leakage.
4. Reproduce baseline and adapted training from the notebook; select by internal validation only. Keep execution metadata and timestamps.
5. Compare per-class, confusion, paired metrics and model recipe to [`reports/`](../../reports/) and [`models/`](../../models/). Differences require investigation rather than overwriting reported values.
6. If exporting checkpoint, store SHA-256/format/class order, test loading via `GET /api/v1/ready` and actual prediction, document unresolved differences.

## Local smoke commands

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m pytest -v
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

Separate frontend terminal: `cd frontend; npm ci; npm run build; npm run dev`. Testing performed for documentation package is limited to relative link/path audit; no fresh full training or checkpoint-level regression is claimed. Additional assets: [training histories](../../reports/adaptation_history.csv) and [paired test predictions](../../assets/examples/predictions/paired_test_predictions.csv).
