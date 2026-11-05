# LeafDoctor Lite — English documentation

**Day 31/100 | Agriculture | 38-class computer vision screening**

LeafDoctor Lite is a research prototype for **preliminary visual screening**, not an authoritative disease diagnosis. Upload a single leaf image; a MobileNetV3-Small classifier returns top-3 class scores. Training uses PlantVillage and mapped PlantDoc samples; paired evaluation is specific to each held-out test subset. The app has a FastAPI backend and React client, and requires trusted local checkpoint weights. The project does not make treatment recommendations.

## Status and evidence

- **Implemented:** image upload/validation, real model loading, top-3 scores and disclaimer, local frontend, session activity and JSON export.
- **Locally demonstrated by user:** `/ready` succeeded with adapted checkpoint and 38 categories; Vite build completed; one photo produced a displayed result. This is not a CI or field-validation claim.
- **Recorded research:** [paired metrics](../../reports/paired_test_metrics.csv), [model card](../../models/MODEL_CARD.json), [split audit](../../reports/audit/split_counts.json), [Kaggle notebook](../../notebooks/leafdoctor-lite.ipynb).
- **Pending:** independently verified deployment, geographic external evaluation, calibrated confidence, checkpoint distribution with hashes, automated production end-to-end tests.

## Quick start and research summary

Use the [root README](../../README.md) for Windows setup and API examples. Model uses PlantVillage 38 classes, PlantDoc 182-image mapped test subset, RGB 256-short-edge resize/224 crop and ImageNet normalization. See [dataset provenance](dataset_provenance.md), [methodology](methodology.md), [experiments](experiments.md), [evaluation](evaluation.md), [model card](model_card.md), [limitations](limitations.md), [architecture](architecture.md), [reproducibility](reproducibility.md), [deployment](deployment.md), and [troubleshooting](troubleshooting.md).

## Visual evidence

![Local app screenshot](../../assets/screenshots/Screenshot%202026-11-05%20140220.png)
*Single local screening demonstration; does not prove diagnostic correctness.*

![Paired test accuracy plot](../../assets/plots/paired_test_accuracy.png)
*Paired metrics represent different test datasets, not an aggregate deployment score.*

[Versi Bahasa Indonesia](../id/README.md).
