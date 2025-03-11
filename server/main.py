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
import gdown
import re

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# URLs สำหรับดาวน์โหลดโมเดล
url_KNN = "https://drive.google.com/uc?export=download&id=17cXNpNunl1j_MdBkPTdNTAK4FVKIQhun"
url_CNN = "https://drive.google.com/uc?export=download&id=1hb2_aWQ3EJJLbVgzWLOYZ5BeEiaNUvVD"
url_SVM = "https://drive.google.com/uc?export=download&id=1XsY210eLq29fZqvWYD7w4Ht3sHaNEAna"

# ตรวจสอบและโหลดโมเดล KNN
knn_model_path = "knn_model.pkl"
if not os.path.exists(knn_model_path):
    gdown.download(url_KNN, knn_model_path, quiet=False)
knn_model = joblib.load(knn_model_path)

# ตรวจสอบและโหลดโมเดล SVM
svm_model_path = "svm_model.pkl"
if not os.path.exists(svm_model_path):
    gdown.download(url_SVM, svm_model_path, quiet=False)
svm_model = joblib.load(svm_model_path)

# ตรวจสอบและโหลดโมเดล CNN
flower_model_path = "flower_type.h5"
if not os.path.exists(flower_model_path):
    gdown.download(url_CNN, flower_model_path, quiet=False)
flower_model = tf.keras.models.load_model(flower_model_path)

class_labels = ["Daisy", "Dandelion", "Roses", "Sunflowers", "Tulips"]

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

class ImageData(BaseModel):
    image_base64: str

# ทำนายภาวะหัวใจ (KNN)
@app.post("/predict/KNN") 
def predict_heart_disease_knn(data: HeartData):
    input_data = np.array([[data.Age, data.Sex, data.ChestPainType, data.RestingBP, data.Cholesterol,
                            data.FastingBS, data.RestingECG, data.MaxHR, data.ExerciseAngina,
                            data.Oldpeak, data.ST_Slope]])
    prediction = knn_model.predict(input_data)[0]
    return {"result": "High Risk" if prediction == 1 else "Low Risk"}

# ทำนายภาวะหัวใจ (SVM)
@app.post("/predict/SVM") 
def predict_heart_disease_svm(data: HeartData):
    input_data = np.array([[data.Age, data.Sex, data.ChestPainType, data.RestingBP, data.Cholesterol,
                            data.FastingBS, data.RestingECG, data.MaxHR, data.ExerciseAngina,
                            data.Oldpeak, data.ST_Slope]])
    prediction = svm_model.predict(input_data)[0]
    return {"result": "High Risk" if prediction == 1 else "Low Risk"}

# ทำนายดอกไม้
@app.post("/predict/flower")
async def predict_flower(image_data: ImageData):
    try:
        base64_data = re.sub(r'^data:image/[^;]+;base64,', '', image_data.image_base64)
        image_bytes = base64.b64decode(base64_data)
        img = Image.open(io.BytesIO(image_bytes))
        
        if img.mode != "RGB":
            img = img.convert("RGB")
        
        img = img.resize((224, 224))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)  
        img_array = img_array / 127.5 - 1  

        predictions = flower_model.predict(img_array)
        predicted_class = np.argmax(predictions, axis=1)[0]
        predicted_label = class_labels[predicted_class]

        return JSONResponse(content={"prediction": predicted_label})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
