# Notebook · experimental source of truth

[`leafdoctor-lite.ipynb`](leafdoctor-lite.ipynb) is the existing Day 31 Kaggle research notebook. It corresponds to audit and output artifacts in [`../reports/`](../reports/) and [`../models/`](../models/). **Do not replace the original notebook or rerun training without a reason.**

## Recorded source and environment

Dataset root recorded in provenance: `/kaggle/input/datasets/loliwibu/leafdoctor-dataset` (PlantVillage and PlantDoc sources). Recorded environment: Python 3.13.16, torch 2.11.0+cu130, torchvision 0.26.0+cu130; seed 42. Details, sample counts, label mapping and hyperparameters: [`../reports/metadata/dataset_provenance.json`](../reports/metadata/dataset_provenance.json), [`../reports/metadata/config.json`](../reports/metadata/config.json), [`../reports/metadata/class_mapping.csv`](../reports/metadata/class_mapping.csv).

## Reproduction procedure

1. Obtain original datasets according to their source licenses; do not redistribute raw images through this repository.
2. Inspect notebook cells and verify input directory layout and installed framework versions in a new Kaggle session.
3. Run notebook in order, audit missing/duplicate images, mapping collisions and split membership; preserve quarantined contradictory-label groups.
4. Choose candidate checkpoint using validation metrics only; do not tune against final held-out tests.
5. Preserve raw notebook output, manifests, per-class CSVs, paired results and model card under repository-standard folders.
6. Validate exported model format on the intended inference runtime before claiming deployability.

**Status:** Research artifacts and notebook are committed, but this documentation change does not rerun its cells or independently verify a fresh Kaggle Save Version. See [reproducibility](../docs/en/reproducibility.md) and [experiment analysis](../docs/en/experiments.md).
