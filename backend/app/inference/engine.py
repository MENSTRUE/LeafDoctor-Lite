"""Real torchvision inference from the repository's original recipe.

Untrusted or malformed checkpoints are never silently treated as successful.
Only load checkpoints whose provenance you trust; PyTorch artifacts can be unsafe.
"""
from pathlib import Path
import json
import os
import threading

from app.core.settings import MODEL_DIR, MODEL_PATH, DEVICE

class ModelUnavailable(RuntimeError):
    pass

class LeafEngine:
    def __init__(self):
        self._lock = threading.Lock()
        self.model = None
        self.error = "Not loaded"
        self.recipe = {}
        self.name = "MobileNetV3-Small"
        self.device = DEVICE

    def load(self):
        with self._lock:
            if self.model is not None:
                return
            import torch
            from torchvision.models import mobilenet_v3_small
            recipe_path = MODEL_DIR / "inference_recipe.json"
            if not recipe_path.is_file():
                raise ModelUnavailable("Missing models/inference_recipe.json")
            recipe = json.loads(recipe_path.read_text(encoding="utf-8"))
            labels = recipe.get("class_names")
            if not isinstance(labels, list) or len(labels) != 38 or len(set(labels)) != len(labels):
                raise ModelUnavailable("Recipe must contain 38 unique ordered class names")
            if recipe.get("architecture") != "torchvision.mobilenet_v3_small":
                raise ModelUnavailable("Unsupported architecture: inspect recipe before deployment")
            candidates = [MODEL_PATH] if MODEL_PATH else [recipe.get("checkpoint"), recipe.get("fallback")]
            paths = []
            for item in candidates:
                if not item:
                    continue
                p = Path(item)
                paths.append(p if p.is_absolute() else MODEL_DIR.parent / p)
            existing = next((p for p in paths if p.is_file()), None)
            if existing is None:
                raise ModelUnavailable("Verified model checkpoint not found. Check MODEL_PATH or models/adapted_best.pt")
            if existing.suffix != ".pt":
                raise ModelUnavailable("Only .pt state_dict checkpoints supported")
            if self.device != "cpu" and not torch.cuda.is_available():
                raise ModelUnavailable("CUDA requested but unavailable")
            try:
                checkpoint = torch.load(str(existing), map_location="cpu", weights_only=True)
                if isinstance(checkpoint, dict):
                    state = None
                    for key in ("model_state_dict", "state_dict", "model", "net"):
                        if isinstance(checkpoint.get(key), dict):
                            state = checkpoint[key]
                            break
                    if state is None and checkpoint and all(isinstance(v, torch.Tensor) for v in checkpoint.values()):
                        state = checkpoint
                    if state is None:
                        raise ValueError("Unrecognized checkpoint state dictionary")
                else:
                    raise ValueError("Expected a weights-only checkpoint dictionary")
                state = {k.removeprefix("module."): v for k, v in state.items()}
                model = mobilenet_v3_small(weights=None, num_classes=len(labels))
                model.load_state_dict(state, strict=True)
                model.eval().to(self.device)
                self.model = model
                self.recipe = recipe
                self.error = ""
                self.name = f"MobileNetV3-Small ({existing.name})"
            except Exception as exc:
                self.error = f"Checkpoint could not be loaded: {type(exc).__name__}: {exc}"
                raise ModelUnavailable(self.error) from exc

    def predict(self, image):
        import torch
        from torchvision.transforms import Compose, Resize, CenterCrop, ToTensor, Normalize
        if self.model is None:
            self.load()
        r = self.recipe
        transform = Compose([
            Resize(int(r["resize_short_edge"])),
            CenterCrop(int(r["center_crop"])),
            ToTensor(),
            Normalize(mean=r["mean"], std=r["std"]),
        ])
        tensor = transform(image.convert("RGB")).unsqueeze(0).to(self.device)
        with self._lock, torch.inference_mode():
            logits = self.model(tensor)
            if tuple(logits.shape) != (1, len(r["class_names"])):
                raise ModelUnavailable(f"Unexpected logits shape {tuple(logits.shape)}")
            probabilities = torch.softmax(logits, dim=1)[0].cpu()
            scores, indexes = probabilities.topk(3)
        return [(r["class_names"][int(idx)], float(score)) for score, idx in zip(scores, indexes)]

engine = LeafEngine()
