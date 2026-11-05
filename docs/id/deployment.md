# Deployment dan kesiapan operasional

## Status

**Prototipe penelitian lokal, belum production-ready.** Pengguna melaporkan build frontend dan loading checkpoint berhasil. Belum ada bukti endpoint hosting, CI, audit kerentanan, validasi kebun independen, target availability maupun tinjauan legal.

## Menjalankan pengembangan (Windows PowerShell)

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Terminal kedua:

```powershell
cd frontend
npm ci
npm run build
npm run dev
```

Verifikasi `/api/v1/ready` (model dimuat) dan upload di browser. Tanpa `models/adapted_best.pt` tepercaya (atau baseline fallback), inferensi tidak tersedia. Git sengaja mengecualikan bobot; clone saja belum cukup untuk inferensi.

## Konfigurasi dan penghalang produksi

| Pengaturan | Perilaku saat ini |
|---|---|
| `MODEL_PATH` | Path checkpoint lokal tepercaya opsional |
| `DEVICE` | Default CPU; CUDA hanya jika ada |
| `CORS_ORIGINS` | Default port localhost 5173; harus dibatasi saat deployment |
| `MAX_UPLOAD_MB` | Default 10 MiB |
| `MAX_IMAGE_PIXELS` | Default 30.000.000 |
| `VITE_API_URL` | Origin API pada build frontend; dev dapat memakai proxy Vite |

`.env.example` hanya template, tidak dimuat otomatis oleh backend. Sebelum deployment internet: verifikasi sumber/lisensi bobot, batas upload dan log, TLS, rate limit, monitoring, kebijakan privasi, CORS aman, dependensi pinned, pengujian independen, dan tinjauan ahli tanaman. Akun/penyimpanan permanen tidak diimplementasikan. Jangan memasarkan aplikasi sebagai diagnosis otoritatif.
