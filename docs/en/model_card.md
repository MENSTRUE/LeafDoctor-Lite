# Model card · MobileNetV3-Small field-adapted screening

**Lifecycle:** `RESEARCH_BASELINE_NOT_FIELD_VALIDATED` (see [`MODEL_CARD.json`](../../models/MODEL_CARD.json)). **Intended use:** preliminary classification of supported leaf-condition photos with human review; **not** automated treatment advice or validated farm diagnosis.

## Model and inference format

- `torchvision.mobilenet_v3_small` with **38 ordered PlantVillage class outputs**; see [inference recipe](../../models/inference_recipe.json).
- RGB input; resize short edge 256, center crop 224, mean `[0.485,0.456,0.406]`, std `[0.229,0.224,0.225]`.
- State-dict checkpoint: `models/adapted_best.pt`; alternative `models/baseline_pv_best.pt` only when primary is absent. Actual `.pt` weights are **not committed**. Output is top-3 uncalibrated softmax scores, not disease probabilities.
- Threshold 0.8 is illustrative, **not tuned on final test** per recipe; it should not be treated as a calibrated safety boundary.

## Training, model selection and performance

Training sources: PlantVillage baseline, then mixture of PV and mapped PlantDoc source-train. Selected epoch **5** based on internal validation macro-F1 with PlantVillage val tolerance. Mapped PlantDoc test n=182/22 GT classes: adapted accuracy **62.09%**, macro-F1 **61.76%**. PlantVillage official test n=10,709/38 GT classes: adapted accuracy **98.24%**, macro-F1 **97.57%**. Sources: [paired metrics](../../reports/paired_test_metrics.csv), [model card data](../../models/MODEL_CARD.json), [split counts](../../reports/audit/split_counts.json).

## Bias and limitations

Weak mappings for generic healthy leaf names, exclusion of unaligned classes, distribution shift between controlled and field imagery, label noise, unverified perceptual near-duplicates, no geographically independent farms and no calibrated confidence. Do not claim specific treatment outcomes. Map key names remain original; do not reorder labels. Only load trusted weight files; checksum, artifact licensing and release destination remain unverified. Read [evaluation](evaluation.md), [provenance](dataset_provenance.md), [limitations](limitations.md).
