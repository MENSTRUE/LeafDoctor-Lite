# Methodology and preprocessing

## Task and labels

This is **single-image multiclass classification** over 38 PlantVillage-style class keys; it is not object detection, mask prediction, severity estimation or management guidance. Original ordered labels live only in [`inference_recipe.json`](../../models/inference_recipe.json). PlantDoc source labels are mapped using [`class_mapping.csv`](../../reports/metadata/class_mapping.csv); original mapping decisions, exclusions and weak healthy proxies must be preserved.

## Experimental sequence

1. Discover PlantVillage/PlantDoc inputs; validate source labels and split manifests.
2. Run SHA-256 duplicate assessment, quarantine contradictory labels in entire groups and remove recorded exact train/test overlaps.
3. Train PlantVillage MobileNetV3-Small baseline, with internal validation; store history.
4. Adapt with a mixture of PV source-train and mapped PlantDoc source-train; use **PlantDoc source-train internal val macro-F1** and PV val accuracy tolerance to select adaptation epoch.
5. Evaluate baseline and adaptation **once in paired comparisons** against unchanged PlantVillage official test and PlantDoc mapped test. The historical V1 165-image subset is not directly comparable.
6. Export state dict, order of labels, recipe, per-class metrics and confusion matrices. Only verified checkpoint format can enter the application.

## Model and parameters

Architecture `torchvision.mobilenet_v3_small`, 38 outputs, seed 42; batch 64; 2 PV head epochs, 5 PV fine-tuning epochs, max 8 adaptation epochs and patience 3; base learning rate `1.5e-4`, adaptation rate `6e-5`, weight decay `1e-4`, PlantDoc sample share 0.4, image size 224. These are recorded configuration values, not evidence that every planned epoch ran. Source [`config.json`](../../reports/metadata/config.json).

## Runtime transform

Input RGB → shortest side resized to 256 → centered 224 crop → tensor in [0,1] → ImageNet normalize (mean 0.485/0.456/0.406; std 0.229/0.224/0.225). MobileNetV3 logits → softmax → top-3. The server uses `torch.inference_mode`, strict `state_dict` checks and ordered class labels. Scores are uncalibrated. See [engine source](../../backend/app/inference/engine.py).

## Methods not claimed

No independently audited near-duplicate check, geographic hold-out, temperature scaling or field calibration. Accuracy on curated datasets cannot be extrapolated to arbitrary photos. See [evaluation](evaluation.md) and [limitations](limitations.md).
