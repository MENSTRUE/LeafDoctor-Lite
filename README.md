# LeafDoctor Lite

**Day 31/100 ? Agriculture | Computer Vision**

## Project overview
LeafDoctor Lite is a research-oriented visual screening project
for identifying selected plant leaf conditions from photographs.

The system is intended to support preliminary screening and
does not replace an agricultural specialist or laboratory diagnosis.

## Problem statement
Farmers and agricultural extension workers need accessible
initial information about visible leaf conditions before
requesting expert assistance.

## Objectives and scope
- Classify supported leaf conditions from photographs.
- Report confidence with appropriate uncertainty warnings.
- Evaluate a reproducible computer vision classifier.
- Provide clear model limitations and responsible guidance.

## Before ? Now ? Next
- Before: dataset and experimental results require repository audit.
- Now: establish structure and verify existing research artifacts.
- Next: integrate a verified model with backend and frontend.

## Dataset sources and provenance
Candidate: PlantVillage-like publicly available leaf-image datasets.

Exact dataset identifiers, versions, URLs, licenses, acquisition
dates, and class mappings require verification against the
existing experiment artifacts. No unverified dataset is claimed.

## Dataset audit
Pending verification of existing audit reports, image integrity,
class distribution, annotation quality, and duplicates.

## Label and class definitions
To be populated from the verified dataset and checkpoint.
Do not infer class names or ordering.

## Data split
Original train/validation/test assignments must be recovered
and verified before reporting evaluation metrics.

## Leakage prevention
Check exact and near duplicates, source grouping, and
train/validation/test independence where supported.

## Methodology and architecture
EfficientNet and MobileNet are candidate architectures.
The actual trained architecture must be identified from the
existing checkpoint and experiment configuration.

## Experiment design
Recover training parameters, baseline comparisons,
model selection criteria, seeds, and preprocessing details.

## Champion selection
Select models based only on validation evidence.
Never use the held-out test set for model selection.

## Held-out metrics
Not yet verified in this repository.
Refer to validated evaluation artifacts when available.

## Results interpretation
No model performance claim is made until experiment evidence
and dataset/split identity have been verified.

## Known limitations
- Visual symptoms may have multiple underlying causes.
- Field images can differ substantially from curated datasets.
- Confidence does not guarantee correctness.
- Unsupported conditions require an explicit fallback.

## Claim boundaries
This is a visual screening research prototype, not a
definitive disease diagnosis or production-ready service.

## Repository structure
- notebooks/: reproducible experiments
- models/: checkpoints and model cards
- reports/: audits and scientific evaluation
- assets/: real plots, examples, screenshots, diagrams
- backend/: model inference API
- frontend/: user-facing application
- docs/: Indonesian and English documentation
- scripts/: repeatable development utilities

## Requirements and setup
Python and framework dependencies will be pinned after
verification of existing experiment and application artifacts.

## How to run
Training and inference commands will be added after
the corresponding code and checkpoints are validated.

## Reproducibility
Record environment versions, random seeds, dataset versions,
split membership, preprocessing, and artifact checksums.

## Testing and validation
Pending: checkpoint loading, inference consistency,
API validation, and frontend/backend integration tests.

## Deployment
Deployment is not yet verified. A deployment guide will be
added after the backend and frontend pass integration tests.

## Security and privacy
Validate uploaded image types and sizes, restrict sensitive
metadata, and never execute uploaded files.

## Troubleshooting
If a model or dataset path fails, first verify the artifact
manifest and expected directory structure.

## FAQ
**Is this a definitive plant disease diagnosis?**
No. LeafDoctor Lite provides preliminary visual screening.

**Are accuracy and confidence interchangeable?**
No. Confidence must be evaluated for calibration.

**Is the application already complete?**
Not yet verified.

## Roadmap
1. Repository and artifact audit
2. Dataset and checkpoint verification
3. Backend inference
4. Frontend application
5. Integration, tests, and documentation

## License and attribution
See LICENSE for repository licensing.
Dataset and model attribution must be documented separately.

## References
Exact research and dataset references will be added only
after verifying the sources used in the original experiment.
