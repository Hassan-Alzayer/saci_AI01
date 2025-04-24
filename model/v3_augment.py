import os, cv2
from tqdm import tqdm
import albumentations as A

# -----------------------------
# CONFIG
# -----------------------------
SRC_IMG_DIR   = "images/train"
SRC_LBL_DIR   = "labels/train"
OUT_IMG_DIR   = "aug_images"
OUT_LBL_DIR   = "aug_labels"
VARIANTS_PER_IMAGE = 3

os.makedirs(OUT_IMG_DIR, exist_ok=True)
os.makedirs(OUT_LBL_DIR, exist_ok=True)

# -----------------------------
# BUILD AUGMENTATION PIPELINE
# -----------------------------
augment = A.Compose([
    A.OneOf([
      A.RandomBrightnessContrast(0.2,0.2),
      A.HueSaturationValue(20,30,20)
    ], p=0.5),
    A.HorizontalFlip(p=0.5),
    A.Rotate(limit=15, border_mode=cv2.BORDER_CONSTANT, p=0.5),
    A.RandomScale(0.2, p=0.5),
], bbox_params=A.BboxParams(format='yolo', label_fields=['class_ids']))

# -----------------------------
# AUGMENT
# -----------------------------
for fname in tqdm(os.listdir(SRC_IMG_DIR)):
    if not fname.lower().endswith((".jpg",".png")):
        continue
    img_path = os.path.join(SRC_IMG_DIR, fname)
    lbl_path = os.path.join(SRC_LBL_DIR, fname.rsplit('.',1)[0]+'.txt')
    img = cv2.imread(img_path)
    with open(lbl_path) as f:
        lines = f.read().splitlines()

    bboxes, class_ids = [], []
    for line in lines:
        c,x,y,w,h = line.split()
        bboxes.append([float(x),float(y),float(w),float(h)])
        class_ids.append(int(c))

    for i in range(VARIANTS_PER_IMAGE):
        res = augment(image=img, bboxes=bboxes, class_ids=class_ids)
        out_img_name = fname.rsplit('.',1)[0] + f"_aug{i}.jpg"
        out_lbl_name = fname.rsplit('.',1)[0] + f"_aug{i}.txt"

        cv2.imwrite(os.path.join(OUT_IMG_DIR, out_img_name), res['image'])
        with open(os.path.join(OUT_LBL_DIR, out_lbl_name),"w") as wf:
            for (x,y,w_,h_),c in zip(res['bboxes'], res['class_ids']):
                wf.write(f"{c} {x:.6f} {y:.6f} {w_:.6f} {h_:.6f}\n")

print("Augmentation complete.")
