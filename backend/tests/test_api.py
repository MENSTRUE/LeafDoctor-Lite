from io import BytesIO
from PIL import Image
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def make_image():
    buf = BytesIO()
    Image.new("RGB", (40, 40), "green").save(buf, format="PNG")
    return buf.getvalue()

def test_health_is_not_false_ready():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert isinstance(response.json()["model_ready"], bool)

def test_wrong_mime():
    response = client.post("/api/v1/predict", files={"file": ("a.txt", b"abc", "text/plain")})
    assert response.status_code == 415

def test_invalid_image():
    response = client.post("/api/v1/predict", files={"file": ("a.png", b"not an image", "image/png")})
    assert response.status_code == 422

def test_empty_image():
    response = client.post("/api/v1/predict", files={"file": ("a.png", b"", "image/png")})
    assert response.status_code == 400
