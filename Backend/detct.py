from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import CLIPProcessor, CLIPModel
from PIL import Image, UnidentifiedImageError
import torch
import pillow_heif
import traceback

# Register AVIF support
pillow_heif.register_avif_opener()

app = Flask(__name__)

# 🔓 CORS setup — allow your React/Vite dev server origin
CORS(app, resources={r"/analyze-image": {"origins": "http://localhost:5173"}})

# Device & model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
MODEL_NAME = "openai/clip-vit-base-patch16"
processor = CLIPProcessor.from_pretrained(MODEL_NAME)
model     = CLIPModel.from_pretrained(MODEL_NAME).to(device).eval()

# Refined labels for deepfake detection
LABELS = [
    "A real image of a human being taken with a camera (no manipulation)",
    "A fake or AI-generated image (deepfake)"
]

@app.route("/analyze-image", methods=["POST", "OPTIONS"])
def analyze_image():
    # Preflight (OPTIONS) requests are handled by flask-cors automatically
    if request.method == "OPTIONS":
        return jsonify({}), 200

    if "image" not in request.files:
        return jsonify({"error": "Image file is required"}), 400

    f = request.files["image"]
    try:
        img = Image.open(f).convert("RGB")
    except UnidentifiedImageError:
        return jsonify({"error": "Unsupported or corrupted image"}), 400

    try:
        # 1) Preprocess the image and text
        inputs = processor(text=LABELS, images=img, return_tensors="pt", padding=True)
        inputs = {k: v.to(device) for k, v in inputs.items()}

        # 2) Run inference
        with torch.no_grad():
            outputs = model(**inputs)

        logits = outputs.logits_per_image  # Shape: [1, 2] (real, fake)
        probs = logits.softmax(dim=-1)[0].tolist()  # Convert to list for easier manipulation

        # 3) Get the best prediction (real or fake)
        best_idx = int(torch.argmax(logits, dim=-1).item())
        best_label = "Real" if best_idx == 0 else "Fake"
        confidence = round(probs[best_idx] * 100, 2)

        return jsonify({
            "result": best_label,
            "confidence": confidence,
            "labels": { "0": LABELS[0], "1": LABELS[1] }
        })
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "Model inference failed", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9000, debug=True)
