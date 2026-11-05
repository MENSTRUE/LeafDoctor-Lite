# Scientific integrity, risks and boundaries

## What we can and cannot claim

| Allowed from available evidence | Not established |
|---|---|
| A 38-class MobileNetV3-Small research model and inference recipe exist | General farm diagnostic correctness |
| Paired PlantVillage and *mapped* PlantDoc test metrics are recorded | Full PlantDoc test accuracy or geographic external validation |
| A local `/ready` call loaded the trusted user checkpoint | Checkpoint is safe to obtain from arbitrary online sources |
| One browser image was processed and a result displayed | Precision/recall of field screening, calibrated model confidence |
| Existing test source covers some negative uploads | Complete security, penetration testing, production SLA |

## Threats to scientific validity

PlantDoc test mapping retains only 182 of 236 images with 22 actual ground-truth categories; weak healthy proxies are sometimes derived from generic leaf labels. Exact SHA-256 quarantine removed contradictory label groups, but **does not detect near-duplicates or same plants**. Model calibration and out-of-distribution detection were not validated. PlantVillage styled images are not a representative sample of farm image variability. V1 historical metrics on 165 images are not equivalent to V2 182-image comparisons.

## Safety and privacy

This is not diagnostic guidance or a pesticide recommendation. Consult a qualified agricultural specialist before interventions. Uploaded images are processed in memory in the shown backend code; do not generalize this to third-party hosting logs/telemetry. Use only trusted PyTorch checkpoints; reject oversized, malformed, adversarial or unsupported images. Do not distribute upstream images without confirming original license terms.

## Priority work

P0: local full test rerun and endpoint smoke tests; P1: agronomist-reviewed label mapping, independent near-duplicate and farm-level split checks, confidence calibration and unsupported-image rejection; P2: deployment hardening, testing and operational monitoring. See [roadmap in root README](../../README.md).
