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
import re

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


with open("models/knn_model.pkl", "rb") as file:
    knn_model = joblib.load(file)

flower_model = tf.keras.models.load_model("models/flower_type.h5")


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

@app.post("/predict/KNN")
def predict_heart_disease(data: HeartData):
    input_data = np.array([[data.Age, data.Sex, data.ChestPainType, data.RestingBP, data.Cholesterol,
                            data.FastingBS, data.RestingECG, data.MaxHR, data.ExerciseAngina,
                            data.Oldpeak, data.ST_Slope]])
    prediction = knn_model.predict(input_data)[0]
    return {"result": "High Risk" if prediction == 1 else "Low Risk"}

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
