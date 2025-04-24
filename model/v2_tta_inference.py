import cv2
import numpy as np
import os, glob, json
from roboflow import Roboflow

# -----------------------------
# CONFIG (same as v1)
# -----------------------------
API_KEY           = "JEQebQNC9eADoMrYVTfR"
PROJECT_SLUG      = "crowd-density-ou3ne"
PROJECT_VERSION   = 1
CONF_THRESH       = 10
IOU_THRESH        = 30
MAX_DET           = 300
RESIZE_FACTOR     = 0.5
INPUT_DIR_IMAGES  = "images/val"
OUTPUT_JSON       = "v2_counts_tta.json"

# -----------------------------
# LOAD MODEL
# -----------------------------
rf    = Roboflow(api_key=API_KEY)
model = rf.workspace().project(PROJECT_SLUG).version(PROJECT_VERSION).model

# -----------------------------
# ZONE HELPERS
# -----------------------------
def get_zones(w, h):
    return {
      "Zone 1": np.array([[0,0], [w//2,0], [w//2,h//2], [0,h//2]]),
      "Zone 2": np.array([[w//2,0], [w,0], [w,h//2], [w//2,h//2]]),
      "Zone 3": np.array([[0,h//2], [w//2,h//2], [w//2,h], [0,h]]),
      "Zone 4": np.array([[w//2,h//2], [w,h//2], [w,h], [w//2,h]])
    }
def point_in_poly(pt, poly):
    return cv2.pointPolygonTest(poly, pt, False) >= 0

# -----------------------------
# TTA PREDICT FUNCTION
# -----------------------------
def tta_predict(img_r):
    # original
    r0 = model.predict(img_r, confidence=CONF_THRESH,
                       overlap=IOU_THRESH, max_det=MAX_DET) \
              .json()["predictions"]
    # horizontal flip
    img_f = cv2.flip(img_r, 1)
    r1    = model.predict(img_f, confidence=CONF_THRESH,
                       overlap=IOU_THRESH, max_det=MAX_DET) \
              .json()["predictions"]
    # unflip x-coordinates
    w = img_r.shape[1]
    for d in r1:
        d["x"] = w - d["x"]
    merged = r0 + r1

    # build boxes for NMS
    boxes, scores = [], []
    for d in merged:
        x,y,w_,h_ = d["x"],d["y"],d["width"],d["height"]
        boxes.append([x - w_/2, y - h_/2, w_, h_])
        scores.append(d["confidence"])
    idxs = cv2.dnn.NMSBoxes(boxes, scores, 0.0, IOU_THRESH/100.0)
    final = [merged[i[0]] for i in idxs]
    return final

# -----------------------------
# PROCESS IMAGES
# -----------------------------
results = {}
for img_path in glob.glob(os.path.join(INPUT_DIR_IMAGES, "*.*")):
    img = cv2.imread(img_path)
    if img is None: continue
    h0,w0 = img.shape[:2]
    w,h   = int(w0*RESIZE_FACTOR), int(h0*RESIZE_FACTOR)
    img_r = cv2.resize(img,(w,h))

    zones  = get_zones(w,h)
    counts = {z:0 for z in zones}

    preds = tta_predict(img_r)
    for d in preds:
        x,y = d["x"],d["y"]
        bw,bh = d["width"],d["height"]
        x1,y1 = x-bw/2, y-bh/2
        x2,y2 = x+bw/2, y+bh/2
        pt = (int((x1+x2)/2), int(y2))
        for z,poly in zones.items():
            if point_in_poly(pt,poly):
                counts[z]+=1
                break

    results[os.path.basename(img_path)] = counts

with open(OUTPUT_JSON,"w") as f:
    json.dump(results, f, indent=2)

print(f"TTA counts saved to {OUTPUT_JSON}")
