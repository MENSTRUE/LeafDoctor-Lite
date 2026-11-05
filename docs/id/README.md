# LeafDoctor Lite — Dokumentasi Bahasa Indonesia

**Day 31/100 | Pertanian | Screening computer vision 38 kelas**

LeafDoctor Lite adalah prototipe penelitian untuk **screening visual awal**, bukan diagnosis penyakit tanaman yang definitif. Pengguna mengunggah foto satu daun; model MobileNetV3-Small menghasilkan tiga skor kelas tertinggi. Eksperimen memakai PlantVillage serta sampel PlantDoc yang dipetakan; evaluasi berpasangan khusus pada setiap subset test. Aplikasi memakai backend FastAPI dan frontend React serta memerlukan checkpoint lokal tepercaya. Sistem tidak memberikan rekomendasi pengobatan/pestisida.

## Status dan bukti

- **Sudah diimplementasikan:** unggah/validasi gambar, loading model asli, skor tiga kelas dan disclaimer, frontend lokal, riwayat sesi, ekspor JSON.
- **Dibuktikan pengguna secara lokal:** `/ready` berhasil memuat checkpoint adaptasi dengan 38 kelas; build Vite berhasil; satu foto menghasilkan prediksi di UI. Bukan bukti CI maupun akurasi lapangan.
- **Artefak penelitian:** [metrik berpasangan](../../reports/paired_test_metrics.csv), [model card](../../models/MODEL_CARD.json), [audit split](../../reports/audit/split_counts.json), [notebook Kaggle](../../notebooks/leafdoctor-lite.ipynb).
- **Belum selesai:** deployment terverifikasi independen, evaluasi lahan geografis lain, kalibrasi confidence, distribusi checkpoint dengan hash, pengujian end-to-end otomatis.

## Memulai dan ringkasan penelitian

Baca [README utama](../../README.md) untuk setup Windows dan contoh API. Model memakai 38 kelas PlantVillage, subset test PlantDoc terpetakan 182 gambar, resize sisi pendek 256/crop 224 dan normalisasi ImageNet. Dokumentasi: [provenance](dataset_provenance.md), [metodologi](methodology.md), [eksperimen](experiments.md), [evaluasi](evaluation.md), [model card](model_card.md), [keterbatasan](limitations.md), [arsitektur](architecture.md), [reproducibility](reproducibility.md), [deployment](deployment.md), dan [troubleshooting](troubleshooting.md).

## Bukti visual

![Screenshot aplikasi lokal](../../assets/screenshots/Screenshot%202026-11-05%20140220.png)
*Demonstrasi satu inferensi lokal; tidak membuktikan diagnosis benar.*

![Plot akurasi test berpasangan](../../assets/plots/paired_test_accuracy.png)
*Metrik test berasal dari dataset berbeda, bukan skor umum lapangan.*

[English version](../en/README.md).
