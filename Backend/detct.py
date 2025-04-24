# 1) Register AVIF support for Pillow
import pillow_heif
pillow_heif.register_avif_opener()

from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import ViTImageProcessor, ViTForImageClassification  # fixed this import
from PIL import Image, UnidentifiedImageError
import torch

app = Flask(__name__)
CORS(app)

# Load model and processor once
model = ViTForImageClassification.from_pretrained("prithivMLmods/Deepfake-Detection-Exp-02-22")
processor = ViTImageProcessor.from_pretrained("prithivMLmods/Deepfake-Detection-Exp-02-22")  # fixed variable name

@app.route("/analyze-image", methods=["POST"])
def analyze_image():
    app.logger.info(f"FILES KEYS: {list(request.files.keys())}")

    if "image" not in request.files:
        return jsonify({"error": "Image file required"}), 400

    file = request.files["image"]
    app.logger.info(f"Received file: {file.filename}")

    # Try Pillow to open image
    try:
        img = Image.open(file).convert("RGB")
    except UnidentifiedImageError as e:
        app.logger.exception("Pillow cannot open image")
        return jsonify({"error": "Unsupported or corrupted image"}), 400

    try:
        # Preprocess and run model inference
        inputs = processor(images=img, return_tensors="pt")  # fixed variable name
        with torch.no_grad():
            outputs = model(**inputs)
        idx = outputs.logits.argmax(-1).item()
        label = model.config.id2label[idx]
    except Exception as e:
        app.logger.exception("Model inference failed")
        return jsonify({"error": "Model inference failed", "details": str(e)}), 500

    app.logger.info(f"Predicted label: {label}")
    return jsonify({"result": label})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=9000)
