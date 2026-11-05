# Model card · MobileNetV3-Small untuk screening adaptasi lapangan

**Status siklus:** `RESEARCH_BASELINE_NOT_FIELD_VALIDATED` (lihat [`MODEL_CARD.json`](../../models/MODEL_CARD.json)). **Penggunaan:** klasifikasi awal foto kondisi daun yang didukung, dengan pemeriksaan manusia; **bukan** saran pengobatan otomatis atau diagnosis kebun tervalidasi.

## Model dan format inferensi

- `torchvision.mobilenet_v3_small` dengan **38 output kelas PlantVillage dalam urutan asli**; lihat [resep inferensi](../../models/inference_recipe.json).
- Input RGB; resize sisi pendek 256, center crop 224, mean `[0.485,0.456,0.406]`, std `[0.229,0.224,0.225]`.
- Checkpoint state dict: `models/adapted_best.pt`; alternatif `models/baseline_pv_best.pt` hanya jika primer tidak ada. Bobot `.pt` **tidak dikomit**. Output top-3 skor softmax belum dikalibrasi, bukan probabilitas penyakit.
- Ambang 0,8 bersifat ilustratif, **tidak dituning pada final test** menurut recipe; bukan batas keamanan terkalibrasi.

## Training, seleksi, dan performa

Sumber training: baseline PlantVillage lalu campuran PV dan source-train PlantDoc terpetakan. Epoch terpilih **5** berdasarkan macro-F1 internal validation dengan toleransi val PV. Mapped PlantDoc test n=182/22 kelas GT: akurasi adaptasi **62,09%**, macro-F1 **61,76%**. Official test PlantVillage n=10.709/38 kelas GT: akurasi adaptasi **98,24%**, macro-F1 **97,57%**. Sumber: [metrik](../../reports/paired_test_metrics.csv), [model card JSON](../../models/MODEL_CARD.json), [audit split](../../reports/audit/split_counts.json).

## Bias dan keterbatasan

Mapping proxy healthy umum yang lemah, pengecualian kelas yang tidak dapat dipetakan, domain shift antara foto terkontrol dan lapangan, noise label, near-duplicate perseptual belum diverifikasi, belum ada evaluasi kebun geografis independen dan confidence belum terkalibrasi. Jangan mengklaim hasil perawatan tertentu. Urutan label tidak boleh diubah. Muat hanya bobot tepercaya; checksum, lisensi artefak dan lokasi release belum diverifikasi. Lihat [evaluasi](evaluation.md), [provenance](dataset_provenance.md), [keterbatasan](limitations.md).
