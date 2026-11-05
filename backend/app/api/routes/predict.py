from fastapi import APIRouter, File, HTTPException, UploadFile
from app.core.settings import MAX_UPLOAD_BYTES
from app.inference.engine import engine, ModelUnavailable
from app.services.images import decode_image
from app.schemas.prediction import Prediction, PredictionResponse, StatusResponse

router = APIRouter(prefix="/api/v1", tags=["leafdoctor"])
DISCLAIMER = "Visual screening only, not a definitive diagnosis. Consult a qualified agricultural specialist before treatment decisions."

def present(label: str, confidence: float) -> Prediction:
    crop, _, condition = label.partition("___")
    return Prediction(label=label, crop=crop.replace("_", " ").replace(",", ", ").strip(), condition=condition.replace("_", " ").strip(), confidence=confidence)

@router.get("/health", response_model=StatusResponse)
def health():
    return StatusResponse(status="ok", model_ready=engine.model is not None,
        model_name=engine.name, classes=len(engine.recipe.get("class_names", [])),
        detail="Loaded" if engine.model is not None else "Model not loaded. Check /ready")

@router.get("/ready", response_model=StatusResponse)
def ready():
    try:
        engine.load()
    except ModelUnavailable as exc:
        raise HTTPException(503, str(exc)) from exc
    return StatusResponse(status="ready", model_ready=True, model_name=engine.name,
                          classes=len(engine.recipe["class_names"]), detail="Checkpoint loaded with strict state_dict validation")

@router.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    if file.content_type not in {"image/jpeg", "image/png", "image/webp"}:
        raise HTTPException(415, "Expected JPEG, PNG, or WebP image")
    content = await file.read(MAX_UPLOAD_BYTES + 1)
    image = decode_image(content)
    try:
        result = engine.predict(image)
    except ModelUnavailable as exc:
        raise HTTPException(503, str(exc)) from exc
    except Exception as exc:
        raise HTTPException(500, "Model inference failed; inspect backend logs") from exc
    items = [present(label, conf) for label, conf in result]
    threshold = float(engine.recipe.get("confidence_example_threshold", 0.8))
    low = items[0].confidence < threshold
    return PredictionResponse(prediction=items[0], top_predictions=items,
        low_confidence=low,
        uncertainty_note=("Below illustrative confidence threshold. Seek expert review." if low else "Confidence is uncalibrated for field deployment; high scores can still be wrong."),
        disclaimer=DISCLAIMER, model_name=engine.name, model_status="research_baseline_not_field_validated",
        preprocessing="RGB → resize short edge 256 → center crop 224 → ImageNet normalization",
        image_width=image.width, image_height=image.height)
