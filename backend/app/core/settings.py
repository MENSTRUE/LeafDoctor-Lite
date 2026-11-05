from pathlib import Path
import os

REPO_ROOT = Path(__file__).resolve().parents[3]
MODEL_DIR = REPO_ROOT / "models"
ALLOWED_ORIGINS = [x.strip() for x in os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",") if x.strip()]
MAX_UPLOAD_BYTES = int(os.getenv("MAX_UPLOAD_MB", "10")) * 1024 * 1024
MAX_PIXELS = int(os.getenv("MAX_IMAGE_PIXELS", "30000000"))
MODEL_PATH = os.getenv("MODEL_PATH", "").strip()
DEVICE = os.getenv("DEVICE", "cpu").strip()
