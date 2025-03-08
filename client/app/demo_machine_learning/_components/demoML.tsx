'use client';

import { useState } from 'react';
import { predictKNNModel } from '@/actions/Action';
import Swal from 'sweetalert2'

interface FormData {
    Age: string;
    Sex: string;
    ChestPainType: string;
    RestingBP: string;
    Cholesterol: string;
    FastingBS: string;
    RestingECG: string;
    MaxHR: string;
    ExerciseAngina: string;
    Oldpeak: string;
    ST_Slope: string;
    HeartDisease: string;
}


export default function HeartDiseaseForm() {
    const [formData, setFormData] = useState<FormData>({
        Age: "",
        Sex: "",
        ChestPainType: "",
        RestingBP: "",
        Cholesterol: "",
        FastingBS: "",
        RestingECG: "",
        MaxHR: "",
        ExerciseAngina: "",
        Oldpeak: "",
        ST_Slope: "",
        HeartDisease: ""
    });


    const [prediction, setPrediction] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // ฟิลด์ที่เป็นตัวเลขจำนวนเต็ม
        const intFields = ["Age", "Sex", "ChestPainType", "RestingBP", "Cholesterol", "FastingBS", "RestingECG", "MaxHR", "ExerciseAngina", "ST_Slope", "HeartDisease"];
        // ฟิลด์ที่เป็นตัวเลขทศนิยม
        const floatFields = ["Oldpeak"];

        let parsedValue: number;

        // ตรวจสอบว่าเป็น int หรือ float
        if (intFields.includes(name)) {
            parsedValue = parseInt(value);
        } else if (floatFields.includes(name)) {
            parsedValue = parseFloat(value);
        } else {
            parsedValue = 0;
        }

        // ป้องกัน NaN
        setFormData({ ...formData, [name]: isNaN(parsedValue) ? 0 : parsedValue });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            Age: Number(formData.Age),
            Sex: Number(formData.Sex),
            ChestPainType: Number(formData.ChestPainType),
            RestingBP: Number(formData.RestingBP),
            Cholesterol: Number(formData.Cholesterol),
            FastingBS: Number(formData.FastingBS),
            RestingECG: Number(formData.RestingECG),
            MaxHR: Number(formData.MaxHR),
            ExerciseAngina: Number(formData.ExerciseAngina),
            Oldpeak: Number(formData.Oldpeak),
            ST_Slope: Number(formData.ST_Slope),
            HeartDisease: Number(formData.HeartDisease)
        }
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(predictKNNModel(data));
            }, 1000);
        }).then((res: unknown) => {

            const { result } = res as { result: string };
            if (!result) return;
            Swal.fire({
                title: result,
                text: "Modal with a custom image.",
                imageUrl: "https://unsplash.it/400/200",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image"
            });

        })
    };


    return (
        <div className="min-h-screen bg-gradient-to-r bg-pink-100 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[160vh] mx-auto">
                <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">Heart Disease Risk Prediction</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold">Sex (เพศ)</label>
                        <select name="Sex" value={formData.Sex} onChange={handleChange} className="mt-1 p-2 border rounded-lg focus:ring focus:ring-pink-300" required>
                            <option value="">Select</option>
                            <option value="0">Male</option>
                            <option value="1">Female</option>
                        </select>
                    </div>

                    {Object.entries({
                        Age: "อายุของผู้ป่วย (ปี)",
                        RestingBP: "ค่าความดันโลหิตขณะพัก (mmHg)",
                        Cholesterol: "ระดับคอเลสเตอรอลในเลือด (mg/dL)",
                        MaxHR: "อัตราการเต้นหัวใจสูงสุด (bpm)"
                    }).map(([field, description]) => (
                        <div key={field} className="flex flex-col">
                            <label className="text-gray-700 font-semibold">{field} ({description})</label>
                            <input
                                type="text"
                                name={field}
                                value={formData[field as keyof FormData]}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-lg focus:ring focus:ring-pink-300"
                                required
                            />
                        </div>
                    ))}

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold">Oldpeak (ค่าความเบี่ยงเบนของ ST segment)</label>
                        <input
                            type="text"
                            name="Oldpeak"
                            value={formData.Oldpeak}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded-lg focus:ring focus:ring-pink-300"
                            placeholder="ค่าสะท้อนความผิดปกติของหัวใจขณะออกกำลังกาย"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold">ExerciseAngina (อาการเจ็บหน้าอกขณะออกกำลังกาย)</label>
                        <select name="ExerciseAngina" value={formData.ExerciseAngina} onChange={handleChange} className="mt-1 p-2 border rounded-lg focus:ring focus:ring-pink-300" required>
                            <option value="">Select</option>
                            <option value="0">มีอาการเจ็บหน้าอก</option>
                            <option value="1">ไม่มีอาการเจ็บหน้าอก</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold">RestingECG (ผลการตรวจคลื่นไฟฟ้าหัวใจ)</label>
                        <select name="RestingECG" value={formData.RestingECG} onChange={handleChange} className="mt-1 p-2 border rounded-lg focus:ring focus:ring-pink-300" required>
                            <option value="">Select</option>
                            <option value="0">Normal - คลื่นไฟฟ้าหัวใจปกติ</option>
                            <option value="1">ST - คลื่นไฟฟ้าหัวใจมีการยกสูง</option>
                            <option value="2">LVH - ภาวะหัวใจห้องล่างซ้ายหนาตัว</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold">HeartDisease (ภาวะหัวใจ)</label>
                        <select name="HeartDisease" value={formData.HeartDisease} onChange={handleChange} className="mt-1 p-2 border rounded-lg focus:ring focus:ring-pink-300" required>
                            <option value="">Select</option>
                            <option value="1">มีโรคหัวใจ</option>
                            <option value="0">ไม่มีโรคหัวใจ</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold">FastingBS (ระดับน้ำตาลในเลือด)</label>
                        <select name="FastingBS" value={formData.FastingBS} onChange={handleChange} className="mt-1 p-2 border rounded-lg focus:ring focus:ring-pink-300" required>
                            <option value="">Select</option>
                            <option value="0">ปกติ</option>
                            <option value="1">สูง</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold">ChestPainType (ประเภทอาการเจ็บหน้าอก)</label>
                        <select name="ChestPainType" value={formData.ChestPainType} onChange={handleChange} className="mt-1 p-2 border rounded-lg focus:ring focus:ring-pink-300" required>
                            <option value="">Select</option>
                            <option value="0">ASY - ไม่มีอาการเจ็บหน้าอก</option>
                            <option value="1">NAP - เจ็บเล็กน้อย ไม่เกี่ยวกับหัวใจ</option>
                            <option value="2">ATA - เจ็บแน่นอกจากความเครียด</option>
                        </select>
                    </div>


                    {/* ST_Slope Dropdown */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold">ST_Slope (แนวโน้มของ ST segment)</label>
                        <select name="ST_Slope" value={formData.ST_Slope} onChange={handleChange} className="mt-1 p-2 border rounded-lg focus:ring focus:ring-pink-300" required>
                            <option value="">Select</option>
                            <option value="0">Up (ปกติ)</option>
                            <option value="1">Flat (อาจมีภาวะผิดปกติ)</option>
                            <option value="2">Down (เสี่ยงภาวะหัวใจขาดเลือด)</option>
                        </select>
                    </div>

                    <div className="col-span-2 flex justify-center">
                        <button type="submit" className="mt-4 px-6 py-2 bg-pink-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-600">
                            Predict Risk
                        </button>
                    </div>
                </form>

                {prediction !== null && (
                    <div className="mt-6 text-center text-lg font-semibold">
                        <p>Prediction Result:</p>
                        <p className={`text-xl font-bold ${prediction === 'High Risk' ? 'text-red-600' : 'text-green-600'}`}>
                            {prediction === 'High Risk' ? '⚠️ High Risk of Heart Disease' : '✅ Low Risk of Heart Disease'}
                        </p>
                    </div>
                )}
                {/* คำอธิบายเพิ่มเติม */}
                <p className="mt-6 text-sm text-gray-600 text-center">
                    * การทำนายนี้ใช้ข้อมูลจากแบบจำลอง Machine Learning และเป็นเพียงเครื่องมือช่วยในการประเมินความเสี่ยง ไม่สามารถแทนที่การวินิจฉัยจากแพทย์ได้
                </p>
            </div>
        </div>
    );
}
