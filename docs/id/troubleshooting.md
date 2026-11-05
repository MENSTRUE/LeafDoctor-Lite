# Troubleshooting dan panduan validasi

| Gejala | Penyebab yang mungkin | Pemeriksaan / solusi |
|---|---|---|
| Frontend **Model not loaded** | API sehat, tetapi lazy loading model belum dijalankan | Panggil `GET http://127.0.0.1:8000/api/v1/ready`; cek `model_ready`, error, dan checkpoint tepercaya |
| `/ready` menghasilkan `503` | Bobot hilang/tidak cocok, state dict salah, CUDA tak tersedia | Cek `models/adapted_best.pt`, recipe, kecocokan torch/torchvision; jangan tampilkan ready palsu |
| Predict `415` | MIME tidak didukung | Gunakan multipart `file` JPEG/PNG/WebP |
| Predict `422`/`400` | Gambar kosong/rusak/tidak bisa didecode | Pilih gambar valid dan sesuai batas ukuran/pixel |
| `Analyze leaf` tidak bisa klik | Tombol memang disabled jika foto belum dipilih/request sedang berjalan | Pilih gambar yang diterima terlebih dahulu |
| Browser `Failed to fetch` | API mati, proxy/CORS keliru | Jalankan FastAPI pada 127.0.0.1:8000; periksa proxy Vite, `VITE_API_URL`, `CORS_ORIGINS` |
| Klik sidebar mengubah `#history` tetapi tidak berganti halaman | Navigasi anchor/scroll, bukan route halaman berbeda | Scroll ke section, lihat console browser |
| Riwayat hilang setelah refresh | State hanya sesi, bukan database server permanen | Jangan menganggap tersimpan; ekspor JSON bila perlu |
| Parse error TypeScript dekat `nav-link` | Sisa tanda kutip dari patch `className` | Audit `frontend/src/pages/App.tsx`, backup sebelum perbaiki, jalankan `npm run build` |
| Bobot tidak ada di GitHub | `.pt` memang di-ignore | Dapatkan checkpoint dari distribusi tepercaya yang sudah diverifikasi, bukan sumber acak |

## Perintah verifikasi

```powershell
cd backend
.\.venv\Scripts\python.exe -m pytest -v
Invoke-RestMethod http://127.0.0.1:8000/api/v1/health
Invoke-RestMethod http://127.0.0.1:8000/api/v1/ready
```

Lalu dari `frontend/`: `npm run build`. Jika model siap, upload sampel berlabel dan catat top-3, urutan kelas, skor, serta label harapan. **Satu prediksi yang tampak masuk akal bukan evaluasi diagnosis yang valid**. Untuk metrik dan audit lihat [evaluasi](evaluation.md) dan [keterbatasan](limitations.md).
