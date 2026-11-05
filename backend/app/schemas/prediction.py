from pydantic import BaseModel, Field

class Prediction(BaseModel):
    label: str
    crop: str
    condition: str
    confidence: float = Field(ge=0, le=1)

class PredictionResponse(BaseModel):
    prediction: Prediction
    top_predictions: list[Prediction]
    low_confidence: bool
    uncertainty_note: str
    disclaimer: str
    model_name: str
    model_status: str
    preprocessing: str
    image_width: int
    image_height: int

class StatusResponse(BaseModel):
    status: str
    model_ready: bool
    model_name: str
    classes: int
    detail: str
