import os, csv

# 1. Map your CSV “class” strings to integer IDs (here we only have “person” → 0)
CLASS_MAP = {
  "people_counterv0 - v1 2023-05-18 6-22pm": 0
}
# 1) EDIT THESE:
SPLITS = ["train", "valid", "test"]              # your top‑level folders
CSV_NAME = "_annotations.csv"                    # your CSV filename in each split

# 2) The script will write into:
#    labels/Train/*.txt, labels/Valid/*.txt, labels/Test/*.txt

# 2. Paths
for split in SPLITS:
    csv_path = os.path.join(split, CSV_NAME)
    out_label_dir  = f"labels/{split}"
    os.makedirs(out_label_dir, exist_ok=True)

    # clear old .txt
    for f in os.listdir(out_label_dir):
        if f.endswith(".txt"):
            os.remove(os.path.join(out_label_dir,f))

    # 3. Read CSV & write YOLO txt
    with open(csv_path) as cf:
        reader = csv.DictReader(cf)
        grouped = {}
        for row in reader:
            fn = row["filename"]
            grouped.setdefault(fn, []).append(row)

        for fn, rows in grouped.items():
            h = float(rows[0]["height"])
            w = float(rows[0]["width"])
            lines = []
            for r in rows:
                cls = CLASS_MAP[r["class"]]
                xmin, ymin = float(r["xmin"]), float(r["ymin"])
                xmax, ymax = float(r["xmax"]), float(r["ymax"])
                x_c = (xmin + xmax) / 2.0 / w
                y_c = (ymin + ymax) / 2.0 / h
                bw  = (xmax - xmin) / w
                bh  = (ymax - ymin) / h
                lines.append(f"{cls} {x_c:.6f} {y_c:.6f} {bw:.6f} {bh:.6f}")
            txt_name = os.path.splitext(fn)[0] + ".txt"
            with open(os.path.join(out_label_dir, txt_name), "w") as wf:
                wf.write("\n".join(lines))
    print(f"[{split}] wrote {len(grouped)} label files.")
