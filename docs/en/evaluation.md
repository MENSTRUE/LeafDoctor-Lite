# Evaluation, per-class evidence and interpretation

## Held-out paired tests

Source: [`paired_test_metrics.csv`](../../reports/paired_test_metrics.csv). Values describe **recorded** experiments and are not rerun by this documentation update.

| Dataset / split | Model | n | Accuracy | Macro-F1 | Balanced accuracy |
|---|---|---:|---:|---:|---:|
| PlantVillage official test | PV baseline | 10,709 | 98.59% | 98.16% | 98.02% |
| PlantVillage official test | Field-adapted | 10,709 | 98.24% | 97.57% | 97.33% |
| PlantDoc mapped test | PV baseline | 182 | 26.37% | 24.55% | 27.46% |
| PlantDoc mapped test | Field-adapted | 182 | 62.09% | 61.76% | 61.27% |

The mapped PlantDoc test includes **182 images and 22 ground-truth classes** (from 236 full-source test images); the model still emits 38 categories. PlantVillage official test includes 10,709 samples and 38 ground-truth classes. The adapted model's PlantDoc mapped accuracy increased by 35.71 percentage points versus PV baseline; its PlantVillage official-test accuracy decreased by 0.35 percentage points. Do not interpret either as definitive deployment accuracy.

## Per-class and confusion-matrix source files

| Test / checkpoint | Per-class | Confusion |
|---|---|---|
| PlantDoc mapped / adapted | [CSV](../../reports/field_adapted_plantdoc_test_mapped_perclass.csv) | [CSV](../../reports/field_adapted_plantdoc_test_mapped_confusion.csv) |
| PlantDoc mapped / baseline | [CSV](../../reports/pv_baseline_plantdoc_test_mapped_perclass.csv) | [CSV](../../reports/pv_baseline_plantdoc_test_mapped_confusion.csv) |
| PV official / adapted | [CSV](../../reports/field_adapted_plantvillage_official_test_perclass.csv) | [CSV](../../reports/field_adapted_plantvillage_official_test_confusion.csv) |
| PV official / baseline | [CSV](../../reports/pv_baseline_plantvillage_official_test_perclass.csv) | [CSV](../../reports/pv_baseline_plantvillage_official_test_confusion.csv) |

Inspect those files for individual-label failures; do not fabricate a confusion-matrix image when the repository only commits CSVs. [Individual paired predictions](../../assets/examples/predictions/paired_test_predictions.csv) support sample-level error analysis, subject to mapping provenance and privacy.

![Paired test accuracy plot](../../assets/plots/paired_test_accuracy.png)
*Actual existing plot; do not merge evaluation splits.*

## Evaluation threats

Selection was validation-only per model card, but mapped PlantDoc test is selective, exact-hash filtering misses perceptual near duplicates, generic healthy proxies may be inaccurate, domain shift is substantial and softmax scores are uncalibrated. Historic V1 subset is not directly comparable. A correct API response or one plausible leaf prediction is **not** statistical evidence of correct diagnosis. No detection/segmentation metrics exist for this classification project.
