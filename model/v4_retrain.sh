#!/usr/bin/env bash
# Make sure your dataset.yaml includes both original and aug folders under train:
# train:
#   - ../images/train
# val: ../images/val
# test: ../images/test
# nc: 1
# names: ['person']

yolo task=detect mode=train \
     model=yolov8n.pt \
     data=dataset.yaml \
     epochs=100 \
     batch=16 \
     lr0=0.001 \
     mosaic=True \
     patience=10 \
     save=True
