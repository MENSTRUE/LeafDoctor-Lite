from io import BytesIO
from PIL import Image, ImageOps, UnidentifiedImageError
from fastapi import HTTPException
from app.core.settings import MAX_UPLOAD_BYTES, MAX_PIXELS

ALLOWED_FORMATS = {"JPEG", "PNG", "WEBP"}

def decode_image(content: bytes):
    if not content:
        raise HTTPException(400, "Image is empty")
    if len(content) > MAX_UPLOAD_BYTES:
        raise HTTPException(413, "Image exceeds upload limit")
    try:
        with Image.open(BytesIO(content)) as original:
            if original.format not in ALLOWED_FORMATS:
                raise HTTPException(415, "Only JPEG, PNG and WebP images are supported")
            w, h = original.size
            if w < 16 or h < 16 or w * h > MAX_PIXELS:
                raise HTTPException(422, "Image dimensions are not supported")
            original.load()
            image = ImageOps.exif_transpose(original).convert("RGB")
            return image
    except HTTPException:
        raise
    except (UnidentifiedImageError, OSError, ValueError, Image.DecompressionBombError) as exc:
        raise HTTPException(422, "Could not decode a valid image") from exc
