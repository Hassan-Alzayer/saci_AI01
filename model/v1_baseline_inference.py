import cv2
import numpy as np
import os, glob, json
from roboflow import Roboflow

# -----------------------------
# 1. CONFIG
# -----------------------------
API_KEY           = "JEQebQNC9eADoMrYVTfR"
PROJECT_SLUG      = "crowd-density-ou3ne"
PROJECT_VERSION   = 1

CONF_THRESH       = 10     # you’ll sweep this
IOU_THRESH        = 30     # and this
MAX_DET           = 300    # default limit
RESIZE_FACTOR     = 0.5    # process at 50% resolution
FRAME_SKIP        = 1      # unused for images

INPUT_DIR_IMAGES  = "Data/valid"
OUTPUT_JSON       = "v1_counts.json"


# -----------------------------
# 2. LOAD MODEL
# -----------------------------
rf    = Roboflow(api_key=API_KEY)
model = rf.workspace() \
          .project(PROJECT_SLUG) \
          .version(PROJECT_VERSION) \
          .model

# -----------------------------
# 3. DEFINE 2×2 ZONES (covers full image after resize)
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
# 4. PROCESS IMAGES & COUNT
# -----------------------------
results = {}
for img_path in glob.glob(os.path.join(INPUT_DIR_IMAGES, "*.*")):
    img = cv2.imread(img_path)
    if img is None: 
        continue
    # resize
    h0, w0 = img.shape[:2]
    w, h   = int(w0*RESIZE_FACTOR), int(h0*RESIZE_FACTOR)
    img_r   = cv2.resize(img, (w, h))

    # get zones
    zones    = get_zones(w, h)
    counts   = {z: 0 for z in zones}

    # inference
    preds    = model.predict(
                  img_r, 
                  confidence=CONF_THRESH, 
                  overlap=IOU_THRESH, 
                  max_det=MAX_DET
               ).json()["predictions"]

    # assign each detection to a zone
    for d in preds:
        # convert center-based -> bottom-center point
        x, y = d["x"], d["y"]
        bw, bh = d["width"], d["height"]
        x1, y1 = x - bw/2, y - bh/2
        x2, y2 = x + bw/2, y + bh/2
        pt = (int((x1+x2)/2), int(y2))
        for z, poly in zones.items():
            if point_in_poly(pt, poly):
                counts[z] += 1
                break

    results[os.path.basename(img_path)] = counts

# -----------------------------
# 5. SAVE RESULTS
# -----------------------------
with open(OUTPUT_JSON, "w") as f:
    json.dump(results, f, indent=2)

print(f"Done. Counts saved to {OUTPUT_JSON}")
