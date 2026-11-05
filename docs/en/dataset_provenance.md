# Dataset provenance and audit

## Sources and recorded identity

| Source | Original link | Role | Caveat |
|---|---|---|---|
| PlantVillage | [Hugging Face: mohanty/PlantVillage](https://huggingface.co/datasets/mohanty/PlantVillage) | 38-class baseline training, validation and official held-out test | Curated imagery differs from uncontrolled farms |
| PlantDoc | [pratikkayal/PlantDoc-Dataset](https://github.com/pratikkayal/PlantDoc-Dataset) | Mapped source-train adaptation and mapped test | Not all source labels map; generic healthy proxies are weak |

Committed [provenance JSON](../../reports/metadata/dataset_provenance.json) records prepared Kaggle input `/kaggle/input/datasets/loliwibu/leafdoctor-dataset`, and artifact generation **2026-11-04 13:57 UTC**. It **does not record an immutable upstream release version or dataset download date**. License terms are not independently verified; consult the respective origin before copying images or derived data. The output archive intentionally excluded raw images.

## Split manifest (as recorded, not freshly rerun)

| Partition | Count |
|---|---:|
| PlantVillage train / val / official test | 38,360 / 5,231 / 10,709 |
| PlantDoc source train / internal val | 1,497 / 327 |
| PlantDoc mapped test / full source test | 182 / 236 |

Source: [`split_counts.json`](../../reports/audit/split_counts.json). The 182-image test is *not* full PlantDoc evaluation. Ground-truth in this mapped subset covers 22 classes; output layer has 38 classes.

## Integrity, mapping and label lineage

- Mapping table: [`class_mapping.csv`](../../reports/metadata/class_mapping.csv) and [audit table](../../reports/audit/plantdoc_mapping_audit.csv); label keys derive from original source folders, **not predictions**.
- Exact-hash overlap audit: `pv_train_removed_test_overlap=5`; `doc_train_removed_test_overlap=2`. Contradictory duplicate quarantine: **9 SHA-256 groups / 18 source images, of which 10 train and 8 test**; entire conflicting groups excluded, not majority-vote relabeled.
- PlantDoc source-train weak healthy proxies: generic labels such as `apple leaf`, `tomato leaf` and related categories; expert review required.
- `perceptual_duplicates_checked=false`; exact-byte hashes do **not** exclude visually near-identical leaves or repeated plants. Geographic farm hold-out has not been performed.

## References

[Provenance JSON](../../reports/metadata/dataset_provenance.json) · [PlantVillage manifest](../../reports/audit/pv_train_manifest.csv) · [PlantDoc manifest](../../reports/audit/doc_train_manifest.csv) · [conflict quarantine](../../reports/audit/plantdoc_conflict_quarantine_summary.json) · [research notebook](../../notebooks/leafdoctor-lite.ipynb).
