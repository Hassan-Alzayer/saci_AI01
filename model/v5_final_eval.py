import cv2, numpy as np, json
from roboflow import Roboflow

# Re‑load your best model (change path if you hosted on Roboflow or local .pt)
rf = Roboflow(api_key="YOUR_API_KEY")
model = rf.workspace().project("crowd-density-ou3ne").version(1).model

# reuse v1 inference code, or TTA from v2, on images/val & images/test
# compute mAP via Roboflow SDK or simple count errors

# Example: simple count error on val
val_paths = [("images/val/img1.jpg", 23), (...)]  # your GT
tot_err = 0
for p,gt in val_paths:
    img = cv2.imread(p)
    preds = model.predict(
        img, confidence=10, overlap=30, max_det=1000
    ).json()["predictions"]
    tot_err += abs(len(preds) - gt)
print("Final total count error on validation:", tot_err)
