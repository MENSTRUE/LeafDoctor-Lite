# Models · verified contract, artifact provenance and limitations

## Artifact registry

| Path | Role | Git tracking |
|---|---|---|
| [`inference_recipe.json`](inference_recipe.json) | Ordered 38 class names, architecture, input normalization, threshold | Tracked |
| [`MODEL_CARD.json`](MODEL_CARD.json) | Experiment description, paired metrics, mapping and limitations | Tracked |
| `adapted_best.pt` | Preferred local model state dictionary | Excluded by `.gitignore`; user locally reported it present and loadable |
| `baseline_pv_best.pt` | Fallback local baseline when adapted checkpoint is missing | Excluded by `.gitignore` |
| `adapted_mobilenetv3_scripted.pt` | Local TorchScript export observed in user's folder | Excluded; not the checkpoint loaded by current state-dict backend |

## Inference contract

The architecture is `torchvision.mobilenet_v3_small` with **38 outputs in exact `class_names` order**. Transform: RGB; shortest-edge resize 256; center crop 224; tensor conversion; ImageNet mean `[0.485, 0.456, 0.406]`, std `[0.229, 0.224, 0.225]`. Backend checks strict state-dict structure and predicts top-3 softmax classes. Output scores are **uncalibrated** for external field deployment; example threshold 0.80 is illustrative only. Do not reorder labels or use a checkpoint trained with a different head/normalization.

## Selection and reported performance

Selected adaptation epoch **5** per model card; selection based on internal PlantDoc source-train validation macro-F1 subject to PV validation accuracy loss ≤3 percentage points relative to baseline, not final test results. The field-adapted model's recorded final test metrics are **PlantVillage official test** n=10,709, accuracy 98.24%, macro-F1 97.57%; **PlantDoc mapped test** n=182, accuracy 62.09%, macro-F1 61.76%. These are sourced from [`../reports/paired_test_metrics.csv`](../reports/paired_test_metrics.csv), not freshly rerun. PlantDoc mapped test covers 22 label classes; do not generalize to complete PlantDoc.

## Distribution, integrity and ethics

Weights are not stored in this Git repo. Do not publish them or claim GitHub Releases/LFS availability before confirming rights, hash, version and release. PyTorch deserialization must only be performed on trusted checkpoints; the backend uses `torch.load(weights_only=True)` with strict model checks but supply-chain trust remains necessary. Model is research-only screening: no diagnoses, severity estimates, pesticide prescriptions or guaranteed field performance. See [English model card](../docs/en/model_card.md), [Indonesian model card](../docs/id/model_card.md) and [model-card data](MODEL_CARD.json).
