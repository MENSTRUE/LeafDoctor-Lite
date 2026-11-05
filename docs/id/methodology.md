# Metodologi dan preprocessing

## Tugas dan label

Proyek ini adalah **klasifikasi multikelas satu gambar** dengan 38 label gaya PlantVillage; bukan deteksi objek, segmentasi, estimasi tingkat keparahan atau saran perawatan. Urutan kelas asli hanya merujuk [`inference_recipe.json`](../../models/inference_recipe.json). Label PlantDoc dipetakan lewat [`class_mapping.csv`](../../reports/metadata/class_mapping.csv); keputusan mapping, pengecualian, dan proxy healthy lemah harus dipertahankan.

## Urutan eksperimen

1. Temukan input PlantVillage/PlantDoc; validasi label dan manifest split.
2. Audit duplikat SHA-256, karantina seluruh grup label bertentangan dan hapus overlap train/test eksak yang tercatat.
3. Latih baseline MobileNetV3-Small PlantVillage dengan validation internal; simpan history.
4. Adaptasi campuran PV source-train + PlantDoc source-train terpetakan; pilih epoch berdasarkan **macro-F1 internal validation source-train PlantDoc** dengan batas penurunan akurasi val PV.
5. Evaluasi dua checkpoint pada **test PlantVillage official dan mapped PlantDoc yang tetap sama**; V1 historis 165 gambar tidak setara dengan subset sekarang.
6. Ekspor state dict, urutan label, resep inferensi, metrik per-kelas dan confusion matrix. Hanya format checkpoint terverifikasi yang digunakan aplikasi.

## Model dan parameter

Arsitektur `torchvision.mobilenet_v3_small`, 38 output, seed 42; batch 64; 2 epoch head PV, 5 epoch fine-tune PV, maksimum 8 epoch adaptasi, patience 3; base LR `1.5e-4`, adapt LR `6e-5`, weight decay `1e-4`, proporsi sampling PlantDoc 0,4, ukuran gambar 224. Ini **nilai konfigurasi**, bukan bukti semua epoch rencana terlaksana. Sumber [`config.json`](../../reports/metadata/config.json).

## Transform inferensi

Input RGB → resize sisi pendek 256 → crop tengah 224 → tensor [0,1] → normalisasi ImageNet (mean 0,485/0,456/0,406; std 0,229/0,224/0,225). Logit MobileNetV3 → softmax → tiga skor terbesar. Backend menggunakan `torch.inference_mode`, validasi state dict ketat dan urutan kelas tetap. Skor belum dikalibrasi. Lihat [engine](../../backend/app/inference/engine.py).

## Metode yang belum dapat diklaim

Belum ada audit near-duplicate independen, held-out geografis, temperature scaling, atau kalibrasi lapangan. Akurasi dataset terkurasi tidak dapat diterapkan begitu saja ke foto acak. Lihat [evaluasi](evaluation.md) dan [keterbatasan](limitations.md).
