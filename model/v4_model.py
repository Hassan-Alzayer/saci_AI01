from ultralytics import YOLO
from ultralytics.utils.callbacks.tensorboard import callbacks as tb_callbacks

# 1. Load model
model = YOLO('yolov8n.pt')

# 2. Attach TensorBoard callbacks
for cb_name, cb_fn in tb_callbacks.items():
    model.add_callback(cb_name, cb_fn)

# 3. Train (no loggers/tensorboard flags)
results = model.train(
    data='dataset.yaml',    # your dataset config
    epochs=100,             # number of epochs
    imgsz=640,              # image size
    batch=16,               # batch size
    project='runs',         # save root
    name='tb_run'           # run folder
)

# 4. (Optionally) plot in-script
results.plot()  # Matplotlib plots of loss & mAP
