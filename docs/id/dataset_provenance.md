# Provenance dataset dan audit

## Sumber dan identitas tercatat

| Sumber | Tautan asli | Kegunaan | Keterbatasan |
|---|---|---|---|
| PlantVillage | [Hugging Face: mohanty/PlantVillage](https://huggingface.co/datasets/mohanty/PlantVillage) | Train baseline 38 kelas, validation, dan official held-out test | Citra terkurasi berbeda dengan kondisi kebun |
| PlantDoc | [pratikkayal/PlantDoc-Dataset](https://github.com/pratikkayal/PlantDoc-Dataset) | Adaptasi source-train terpetakan dan test terpetakan | Tidak semua label dapat dipetakan; label healthy generik adalah proxy lemah |

[Provenance JSON](../../reports/metadata/dataset_provenance.json) mencatat input Kaggle `/kaggle/input/datasets/loliwibu/leafdoctor-dataset` dan pembuatan artefak **4 November 2026 pukul 13:57 UTC**. Tanggal tersebut **bukan otomatis tanggal download dataset** dan versi rilis sumber yang immutable tidak tercatat. Ketentuan lisensi setiap sumber belum diverifikasi independen; periksa sumber asli sebelum redistribusi gambar/data turunan. Paket hasil tidak memasukkan gambar mentah.

## Pembagian dataset berdasarkan manifest

| Partisi | Jumlah |
|---|---:|
| PlantVillage train / val / official test | 38.360 / 5.231 / 10.709 |
| PlantDoc source train / internal val | 1.497 / 327 |
| PlantDoc mapped test / full source test | 182 / 236 |

Sumber: [`split_counts.json`](../../reports/audit/split_counts.json). Test 182 gambar **bukan evaluasi seluruh PlantDoc**. Ground truth subset mencakup 22 kelas, sementara output model 38 kelas.

## Integritas, mapping, dan asal label

- Mapping: [`class_mapping.csv`](../../reports/metadata/class_mapping.csv) dan [audit mapping](../../reports/audit/plantdoc_mapping_audit.csv); kelas bersumber dari folder asli, **bukan prediksi model**.
- Audit hash eksak: `pv_train_removed_test_overlap=5`; `doc_train_removed_test_overlap=2`. Karantina duplikat berlabel bertentangan: **9 grup SHA-256 / 18 gambar sumber (10 train, 8 test)**; seluruh grup dikecualikan, tanpa majority-vote relabel.
- Proxy healthy lemah PlantDoc: label umum seperti `apple leaf`, `tomato leaf`, dan kelas serupa; membutuhkan tinjauan pakar agronomi.
- `perceptual_duplicates_checked=false`; hash byte identik tidak membuktikan tidak ada daun/tanaman hampir sama. Belum ada pemisahan geografis antarpetani/lahan.

## Referensi

[Provenance JSON](../../reports/metadata/dataset_provenance.json) · [manifest PlantVillage](../../reports/audit/pv_train_manifest.csv) · [manifest PlantDoc](../../reports/audit/doc_train_manifest.csv) · [karantina konflik](../../reports/audit/plantdoc_conflict_quarantine_summary.json) · [notebook](../../notebooks/leafdoctor-lite.ipynb).
