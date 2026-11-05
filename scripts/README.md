# Scripts · controlled utilities

No executable project utility script is currently committed under `scripts/` in the audited repository tree. This folder is intentionally reserved for **tested, repeatable** audit, packaging and validation scripts. Do not invent scripts merely to make this folder appear complete.

When adding utilities, require argument validation, `--dry-run` for destructive operations where practical, safe output paths, no silent file overwrites, explicit dataset versions, reproducibility logging and automated tests. Never create a root `datasets/` folder. Use PowerShell commands in documentation for Windows. Notebook and application commands currently live in [notebooks README](../notebooks/README.md), [backend README](../backend/README.md), and [frontend README](../frontend/README.md).
