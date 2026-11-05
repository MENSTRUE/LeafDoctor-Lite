# Research reports · data lineage and evaluation evidence

These files are experiment evidence, not mock metrics. Never aggregate scores across different dataset/split identities. The mapped PlantDoc test is a **182-image subset** of the **236-image full test**, with 22 ground-truth label classes. Historical V1 165-image results are **not paired comparable** to V2.

## File groups

| Location | Evidence |
|---|---|
| [`metadata/dataset_provenance.json`](metadata/dataset_provenance.json) | Primary dataset URLs, Kaggle location, environment, audit summary and unresolved license terms |
| [`metadata/config.json`](metadata/config.json) | Recorded seed, LR, batch size, epochs and adaptation mix |
| [`metadata/class_mapping.csv`](metadata/class_mapping.csv) | PlantDoc-to-PlantVillage label mapping |
| [`audit/split_counts.json`](audit/split_counts.json) | Actual recorded split counts and quarantine exclusions |
| [`audit/plantdoc_conflict_quarantine_summary.json`](audit/plantdoc_conflict_quarantine_summary.json) | Contradictory exact-hash group exclusions |
| [`audit/plantdoc_mapping_audit.csv`](audit/plantdoc_mapping_audit.csv) | Mapping review data |
| [`audit/pv_train_manifest.csv`](audit/pv_train_manifest.csv), [`audit/pv_val_manifest.csv`](audit/pv_val_manifest.csv), [`audit/pv_official_test_manifest.csv`](audit/pv_official_test_manifest.csv) | PlantVillage membership evidence |
| [`audit/doc_train_manifest.csv`](audit/doc_train_manifest.csv), [`audit/doc_val_manifest.csv`](audit/doc_val_manifest.csv), [`audit/doc_source_test_manifest.csv`](audit/doc_source_test_manifest.csv) | PlantDoc membership evidence |
| [`paired_test_metrics.csv`](paired_test_metrics.csv) | Paired checkpoint comparisons on each test split |
| [`pv_baseline_history.csv`](pv_baseline_history.csv), [`adaptation_history.csv`](adaptation_history.csv) | Training/validation trends |
| `*_perclass.csv`, `*_confusion.csv` | Full per-class and confusion results by model and split |
| [`comparability_note.txt`](comparability_note.txt) | Specific warnings about subset comparability |

## Core paired evaluation

| Dataset / split | Model | n | Accuracy | Macro-F1 | Balanced accuracy |
|---|---|---:|---:|---:|---:|
| PlantVillage official test | PV baseline | 10,709 | 98.59% | 98.16% | 98.02% |
| PlantVillage official test | Field-adapted | 10,709 | 98.24% | 97.57% | 97.33% |
| PlantDoc mapped test | PV baseline | 182 | 26.37% | 24.55% | 27.46% |
| PlantDoc mapped test | Field-adapted | 182 | 62.09% | 61.76% | 61.27% |

Interpret results in [root README](../README.md) and detailed [evaluation guide](../docs/en/evaluation.md). Numeric values were checked against the committed `paired_test_metrics.csv` as part of document preparation. Do not claim independent rerun. Image-based accuracy does not prove pixel-level lesion localization or disease severity.
