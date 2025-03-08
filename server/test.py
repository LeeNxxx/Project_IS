from fastapi import FastAPI, File, UploadFile
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
from typing import List

app = FastAPI()

# 🔹 กำหนด Labels ของดอกไม้
CLASS_LABELS = ["Daisy", "Dandelion", "Roses", "Sunflowers", "Tulips"]

# 🔹 โหลดโมเดลที่ใช้พยากรณ์
MODEL_PATH = "server/models/flower_type.h5"
model = tf.keras.models.load_model(MODEL_PATH)

@app.post("/predictflower/")
async def predict(file: UploadFile = File(...)):
    # 🔹 อ่านไฟล์ที่อัปโหลด
    contents = await file.read()
    with open("temp.jpg", "wb") as f:
        f.write(contents)

    # 🔹 โหลดรูป และเตรียมข้อมูลสำหรับโมเดล
    img = image.load_img("temp.jpg", target_size=(224, 224))
    img_array = image.img_to_array(img) / 127.5 - 1  # Normalize เหมือนตอนเทรน
    img_array = np.expand_dims(img_array, axis=0)  # เปลี่ยนเป็น (1, 224, 224, 3)

    # 🔹 ทำการพยากรณ์
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions, axis=1)[0]  # ดึง class index ที่มีค่ามากที่สุด
    predicted_label = CLASS_LABELS[predicted_class]  # ดึงชื่อดอกไม้

    # 🔹 ส่งผลลัพธ์กลับไปที่ Frontend
    return {"filename": file.filename, "prediction": predicted_label}
