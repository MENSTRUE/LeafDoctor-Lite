from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.settings import ALLOWED_ORIGINS
from app.api.routes.predict import router

app = FastAPI(title="LeafDoctor Lite API", version="0.1.0", description="Preliminary leaf condition screening, not diagnosis")
app.add_middleware(CORSMiddleware, allow_origins=ALLOWED_ORIGINS, allow_credentials=False, allow_methods=["GET", "POST"], allow_headers=["Content-Type"])
app.include_router(router)
