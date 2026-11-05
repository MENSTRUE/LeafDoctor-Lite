# LeafDoctor Lite ? Agent Instructions

## Source of truth
Use the actual repository, verified dataset manifests,
training configurations, checkpoints, and test outputs.

Do not fabricate accuracy, loss, screenshots, predictions,
dataset provenance, or successful execution.

## Fixed repository structure
Preserve the standard root directories:
notebooks, models, reports, assets, backend, frontend,
docs, and scripts.

Do not create a datasets/ directory.
Do not rename or delete structural folders without approval.
Never overwrite existing files without inspection.

## Change workflow
1. Inspect existing files and Git status.
2. Identify the smallest necessary change.
3. Preserve verified artifacts and checkpoints.
4. Implement changes in the appropriate existing folder.
5. Run relevant tests.
6. Document verified results and remaining limitations.

## Machine learning integrity
Audit labels, duplicates, split membership, and provenance.
Select models using validation data only.
Preserve held-out test independence.
Use the checkpoint's verified original class order.
Do not retrain when a suitable checkpoint is available.

## Application architecture
Backend must load the genuine verified model.
Frontend must call the real backend.
Include input validation, explicit failure states,
safe file handling, and meaningful inference metadata.

## Testing
Run applicable unit, integration, and inference tests.
Report command output accurately.
Do not claim tests passed unless executed.

## Documentation
Update README, model cards, and reports whenever
implementation or scientific conclusions change.
Mark planned and unverified functionality explicitly.

## Security
Never commit secrets, credentials, private datasets,
virtual environments, or unreviewed large artifacts.
Treat every uploaded file and API request as untrusted.

## Delivery
Provide file changes, setup commands, actual test results,
known limitations, and a professional commit message.
