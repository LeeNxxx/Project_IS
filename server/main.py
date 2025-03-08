import numpy as np
import tensorflow as tf
import base64
import os
import io
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from tensorflow.keras.preprocessing import image
from PIL import Image
import joblib

# 📌 อนุญาตให้ Frontend (Next.js) เชื่อมต่อ API ได้
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # อนุญาตทุกโดเมน หรือกำหนดเฉพาะ ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📌 โหลดโมเดล KNN สำหรับพยากรณ์โรคหัวใจ
with open("models/knn_model.pkl", "rb") as file:
    knn_model = joblib.load(file)

# 📌 โหลดโมเดล CNN สำหรับพยากรณ์รูปภาพ
flower_model = tf.keras.models.load_model("models/flower_type.h5")

# 📌 กำหนด Label Mapping สำหรับดอกไม้
class_labels = ["Daisy", "Dandelion", "Roses", "Sunflowers", "Tulips"]

# 📌 Model สำหรับพยากรณ์โรคหัวใจ
class HeartData(BaseModel):
    Age: int
    Sex: int
    ChestPainType: int
    RestingBP: int
    Cholesterol: int
    FastingBS: int
    RestingECG: int
    MaxHR: int
    ExerciseAngina: int
    Oldpeak: float
    ST_Slope: int

# 📌 Model สำหรับรับ Base64 รูปภาพ
class ImageData(BaseModel):
    image_base64: str

# 📌 API สำหรับพยากรณ์โรคหัวใจ (KNN Model)
@app.post("/predict/KNN")
def predict_heart_disease(data: HeartData):
    input_data = np.array([[data.Age, data.Sex, data.ChestPainType, data.RestingBP, data.Cholesterol,
                            data.FastingBS, data.RestingECG, data.MaxHR, data.ExerciseAngina,
                            data.Oldpeak, data.ST_Slope]])
    prediction = knn_model.predict(input_data)[0]
    return {"result": "High Risk" if prediction == 1 else "Low Risk"}

# 📌 API สำหรับรับรูป Base64 และพยากรณ์ผลดอกไม้ (CNN Model)
@app.post("/predict/flower")
async def predict_flower(image_data: ImageData):
    try:
        # ✅ แปลง Base64 -> Image
        image_bytes = base64.b64decode(image_data.image_base64)
        img = Image.open(io.BytesIO(image_bytes))
        img = img.resize((224, 224))  # ปรับขนาดภาพให้ตรงกับโมเดล

        # ✅ แปลงรูปเป็นอาร์เรย์
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)  # เพิ่มมิติให้เป็น (1, 224, 224, 3)
        img_array = img_array / 127.5 - 1  # Normalize เหมือนตอนเทรน

        # ✅ ทำนายผล
        predictions = flower_model.predict(img_array)
        predicted_class = np.argmax(predictions, axis=1)[0]
        predicted_label = class_labels[predicted_class]

        return JSONResponse(content={"prediction": predicted_label})

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
