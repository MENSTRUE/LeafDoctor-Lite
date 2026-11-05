# Integritas ilmiah, risiko dan batas klaim

## Hal yang dapat dan belum dapat diklaim

| Didukung bukti saat ini | Belum terbukti |
|---|---|
| Model riset MobileNetV3-Small 38 kelas dan recipe inferensi tersedia | Ketepatan diagnosis secara umum di lahan |
| Metrik test PlantVillage dan *subset terpetakan* PlantDoc tercatat | Akurasi seluruh test PlantDoc atau validasi geografis independen |
| Pemanggilan lokal `/ready` berhasil memuat checkpoint tepercaya milik pengguna | Checkpoint aman jika diambil dari sumber online sembarang |
| Satu gambar diproses dan hasil tampil di browser | Precision/recall screening lapangan, kalibrasi confidence |
| Source code pengujian API mencakup beberapa input salah | Keamanan lengkap, pentest, SLA produksi |

## Ancaman validitas ilmiah

Mapping PlantDoc hanya menyisakan 182 dari 236 test gambar dengan 22 kategori ground truth; proxy healthy lemah berasal dari label daun generik. Karantina SHA-256 menghapus grup label bertentangan, tetapi **tidak mendeteksi near-duplicate maupun tanaman yang sama**. Kalibrasi dan deteksi out-of-distribution belum divalidasi. Foto terkontrol bergaya PlantVillage tidak mewakili seluruh kondisi kebun. Metrik V1 historis 165 gambar tidak setara dengan perbandingan V2 182 gambar.

## Keselamatan dan privasi

Ini bukan panduan diagnosis atau rekomendasi pestisida. Konsultasikan tindakan dengan penyuluh/ahli agronomi. Gambar diproses dalam RAM menurut kode backend, tetapi kebijakan log/telemetri hosting pihak ketiga belum diketahui. Gunakan checkpoint PyTorch tepercaya saja; tolak gambar berukuran besar, cacat, bermusuhan atau tidak didukung. Jangan redistribusikan gambar upstream tanpa pemeriksaan lisensi sumber.

## Pekerjaan prioritas

P0: rerun test lokal penuh dan smoke test endpoint; P1: tinjauan mapping oleh agronom, audit near-duplicate dan split tingkat lahan, kalibrasi confidence serta penolakan input luar cakupan; P2: penguatan deployment, pengujian dan monitoring. Lihat [roadmap README utama](../../README.md).
