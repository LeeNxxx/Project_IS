import pickle
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel

import joblib

with open("models/knn_model.pkl", "rb") as file:
    knn_model = joblib.load(file)  # ลองเปลี่ยนจาก pickle เป็น joblib


# สร้าง FastAPI
app = FastAPI()

# สร้าง Model สำหรับรับข้อมูลจาก Frontend
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
    HeartDisease: int

# API Endpoint สำหรับพยากรณ์โรคหัวใจ
@app.post("/predict/KNN")
def predict_heart_disease(data: HeartData):
    # แปลงข้อมูลให้อยู่ในรูปแบบ numpy array
    input_data = np.array([[data.Age, data.Sex, data.ChestPainType, data.RestingBP, data.Cholesterol,
                            data.FastingBS, data.RestingECG, data.MaxHR, data.ExerciseAngina,
                            data.Oldpeak, data.ST_Slope]])

    # ใช้โมเดลทำนายผล
    prediction = knn_model.predict(input_data)[0]

    # ส่งผลลัพธ์กลับไปยัง Frontend
    return {"result": "High Risk" if prediction == 1 else "Low Risk"}
