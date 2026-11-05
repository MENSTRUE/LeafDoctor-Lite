# Reproducibility dan jejak eksperimen

## Dua lingkungan yang berbeda

**Eksperimen Kaggle tercatat:** [`dataset_provenance.json`](../../reports/metadata/dataset_provenance.json) menyatakan Python 3.13.16, torch 2.11.0+cu130, torchvision 0.26.0+cu130, seed 42, input `/kaggle/input/datasets/loliwibu/leafdoctor-dataset`. Dataset asli PlantVillage dan PlantDoc. Versi immutable dan tanggal akses sumber belum dicatat.

**Aplikasi lokal:** memakai rentang versi `backend/requirements.txt` dan `frontend/package-lock.json`; tidak otomatis sama dengan lingkungan Kaggle. Setup baru memerlukan checkpoint `.pt` tepercaya yang dibagikan terpisah dan `inference_recipe.json` yang terlacak.

## Langkah reproduksi

1. Periksa [provenance](dataset_provenance.md), lisensi, mapping label, dan [`split_counts.json`](../../reports/audit/split_counts.json).
2. Siapkan dataset dalam layout input sesuai [`leafdoctor-lite.ipynb`](../../notebooks/leafdoctor-lite.ipynb); audit notebook sebelum mengubah path atau training.
3. Pulihkan seed dan lingkungan riset tercatat; cek overlap SHA-256 dan karantina. Pertahankan label asli, cegah test leakage.
4. Jalankan baseline dan adaptasi dari notebook; seleksi model memakai internal validation saja. Catat metadata eksekusi dan waktu.
5. Bandingkan per-class, confusion, paired metrics dan recipe dengan [`reports/`](../../reports/) dan [`models/`](../../models/). Perbedaan harus dianalisis, bukan ditimpa.
6. Jika mengekspor checkpoint, dokumentasikan SHA-256/format/urutan kelas, uji loading dengan `GET /api/v1/ready` dan prediksi nyata, catat masalah tersisa.

## Perintah smoke test lokal

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m pytest -v
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

Terminal frontend: `cd frontend; npm ci; npm run build; npm run dev`. Pengujian pada paket dokumentasi ini hanya audit link/path relatif; tidak mengklaim training ulang atau regression checkpoint. Aset tambahan: [history training](../../reports/adaptation_history.csv) dan [prediksi test berpasangan](../../assets/examples/predictions/paired_test_predictions.csv).
