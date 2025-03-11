'use client';

import React from 'react';
import Image from 'next/image'
import imports from "@/assets/import.png"
import download from "@/assets/download.png"
import nulls from "@/assets/null.png"
import encode from "@/assets/encode.png"
import encode1 from "@/assets/encode1.png"
import traintest from "@/assets/traintest.png"
import model from "@/assets/model.png"
import show from "@/assets/show.png"
import svm from "@/assets/svm.png"
import svm1 from "@/assets/svm1.png"

export default function MachineLearning() {
    return (
        <div className="min-h-screen bg-pink-100 p-10">
            <h1 className="text-4xl font-bold text-center text-pink-700 mb-4">Machine Learning</h1>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">ชุดข้อมูลการพยากรณ์ภาวะหัวใจล้มเหลว</h1>

            <p className="mt-4 text-lg text-gray-700 text-center">
                ชุดข้อมูลนี้ใช้สำหรับพยากรณ์โอกาสเกิดภาวะหัวใจล้มเหลวโดยอ้างอิงจากปัจจัยทางการแพทย์ต่าง ๆ
            </p>

            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-[160vh] mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800">Dataset</h2>
                <p className="mt-2 text-gray-700">
                    ชุดข้อมูลนี้มาจากแหล่งข้อมูล <a href="https://www.kaggle.com/datasets/fedesoriano/heart-failure-prediction/data" target="_blank" className="text-blue-600 underline">Kaggle: Heart Failure Prediction</a>.
                    ซึ่งใช้สำหรับวิเคราะห์ความเสี่ยงของโรคหัวใจ โดยอ้างอิงจากปัจจัยทางสุขภาพและพฤติกรรมของผู้ป่วย
                </p>

                <h3 className="mt-6 text-xl font-semibold text-gray-800">คุณลักษณะสำคัญของชุดข้อมูล:</h3>
                <ul className="list-disc list-inside mt-2 text-gray-700 space-y-2">
                    <li><strong>Age (อายุ):</strong> อายุของผู้ป่วย (ปี)</li>
                    <li><strong>Sex (เพศ):</strong> เพศของผู้ป่วย (`M` = ชาย, `F` = หญิง)</li>
                    <li><strong>ChestPainType (ประเภทอาการเจ็บหน้าอก):</strong> ATA, NAP, ASY</li>
                    <li><strong>RestingBP (ความดันโลหิตขณะพัก):</strong> mmHg</li>
                    <li><strong>Cholesterol (คอเลสเตอรอลในเลือด):</strong> mg/dL</li>
                    <li><strong>FastingBS (ระดับน้ำตาลในเลือด):</strong> `1` = สูง, `0` = ปกติ</li>
                    <li><strong>RestingECG (ผลตรวจ ECG):</strong> Normal, ST, LVH</li>
                    <li><strong>MaxHR (อัตราการเต้นหัวใจสูงสุด):</strong> bpm</li>
                    <li><strong>ExerciseAngina (อาการเจ็บหน้าอกขณะออกกำลังกาย):</strong> `Y` = มี, `N` = ไม่มี</li>
                    <li><strong>Oldpeak (ค่าความเบี่ยงเบนของ ST segment):</strong> แสดงถึง ST segment ที่ลดลง</li>
                    <li><strong>ST_Slope (แนวโน้มของ ST segment):</strong> Up, Flat, Down</li>
                    <li><strong>HeartDisease (เป้าหมายของโมเดล):</strong> `1` = มีโรคหัวใจ, `0` = ไม่มีโรคหัวใจ</li>
                </ul>

                <h3 className="mt-6 text-xl font-semibold text-gray-800">เป้าหมายของโมเดล:</h3>
                <p className="mt-2 text-gray-700">
                    จุดมุ่งหมายของโมเดลนี้คือการนำ Machine Learning มาช่วยพยากรณ์โอกาสเกิดภาวะหัวใจล้มเหลวจากข้อมูลของผู้ป่วย
                </p>

                <div className="mt-6 bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-800">ขั้นตอนการทำงานของโมเดล</h2>

                    <h3 className="mt-6 text-xl font-semibold text-gray-800">1. นำเข้าไลบรารีที่จำเป็น</h3>
                    <p className="mt-2 text-gray-700">ใช้ไลบรารี Pandas, NumPy, Scikit-Learn และ Joblib เพื่อช่วยจัดการข้อมูลและสร้างโมเดล Machine Learning</p>
                    {/* เพิ่มรูปภาพ */}
                    <div className="flex justify-center my-4">
                        <Image src={imports} alt="imports" width={400} height={400} className="rounded-lg shadow-lg" />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-gray-800">2. โหลดชุดข้อมูล</h3>
                    <p className="mt-2 text-gray-700">นำเข้าชุดข้อมูล `heart.csv` และแสดงข้อมูลเพื่อตรวจสอบ</p>
                    <div className="flex justify-center my-4">
                        <Image src={download} alt="download" width={600} height={600} className="rounded-lg shadow-lg" />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-gray-800">3. ตรวจสอบค่า Missing Values</h3>
                    <p className="mt-2 text-gray-700">ตรวจสอบว่ามีค่าที่หายไปหรือไม่ และจัดการกับข้อมูลที่ขาด</p>
                    <div className="flex justify-center my-4">
                        <Image src={nulls} alt="nulls" width={200} height={200} className="rounded-lg shadow-lg" />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-gray-800">4. แปลงข้อมูลประเภทข้อความเป็นตัวเลข (Label Encoding)</h3>
                    <p className="mt-2 text-gray-700">ใช้ Label Encoding เพื่อแปลงค่าที่เป็นข้อความให้อยู่ในรูปแบบตัวเลข เช่น เพศ, ประเภทอาการเจ็บหน้าอก ฯลฯ</p>
                    <div className="flex flex-wrap justify-center items-center gap-4 my-4">
                        <Image src={encode} alt="encode" width={400} height={400} className="rounded-lg shadow-lg" />
                        <Image src={encode1} alt="encode1" width={600} height={600} className="rounded-lg shadow-lg" />
                    </div>


                    <h3 className="mt-6 text-xl font-semibold text-gray-800">5. แบ่งข้อมูลสำหรับ Train และ Test</h3>
                    <p className="mt-2 text-gray-700">แบ่งข้อมูลเป็น 80% สำหรับฝึกโมเดล และ 20% สำหรับทดสอบความแม่นยำของโมเดล</p>
                    <div className="flex justify-center my-4">
                        <Image src={traintest} alt="traintest" width={500} height={500} className="rounded-lg shadow-lg" />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-gray-800">6. สร้างและฝึกโมเดล Machine Learning</h3>
                    <p className="mt-2 text-gray-700">ใช้โมเดล K-Nearest Neighbors (KNN) ในการฝึกและเรียนรู้ข้อมูลเพื่อนำไปใช้พยากรณ์โรคหัวใจ โดยใช้เพื่อนบ้านที่ใกล้ที่สุด 5 คน (`n_neighbors=5`).</p>
                    <div className="flex justify-center my-4">
                        <Image src={model} alt="model" width={400} height={400} className="rounded-lg shadow-lg" />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-gray-800">7. ทำนายผลและประเมินโมเดล</h3>
                    <p className="mt-2 text-gray-700">ใช้โมเดลที่ฝึกแล้วทำนายค่าจากชุดข้อมูลทดสอบ `X_test_scaled` และเก็บผลลัพธ์ไว้ที่ `y_pred_knn`</p>
                    <p className="mt-2 text-gray-700">จากนั้นคำนวณค่าวัดผลลัพธ์ของโมเดลโดยใช้:</p>
                    <ul className="list-disc list-inside mt-2 text-gray-700 space-y-2">
                        <li><strong>Accuracy Score:</strong> ค่าความแม่นยำของโมเดล</li>
                        <li><strong>Precision Score:</strong> ค่าความแม่นยำของการทำนายผลบวก</li>
                        <li><strong>Recall Score:</strong> ความสามารถของโมเดลในการดึงข้อมูลที่เกี่ยวข้อง</li>
                        <li><strong>F1 Score:</strong> ค่าเฉลี่ยระหว่าง Precision และ Recall</li>
                        <li><strong>Confusion Matrix:</strong> ตารางแสดงผลการทำนายที่ถูกต้องและผิดพลาด</li>
                    </ul>
                    <div className="flex justify-center my-4">
                        <Image src={show} alt="show" width={400} height={400} className="rounded-lg shadow-lg" />
                    </div>
                </div>

                <div className="mt-6 bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
                    <h3 className="text-2xl font-semibold text-gray-800">อีกโมเดลนึงที่เปรียบเทียบคือ SVM</h3>
                    <p className="mt-2 text-gray-700">
                        นอกจากโมเดล KNN แล้ว เรายังใช้โมเดล Support Vector Machine (SVM) เพื่อพยากรณ์โอกาสเกิดภาวะหัวใจล้มเหลว โดยใช้ Kernel Linear
                    </p>

                    <div className="flex justify-center my-4">
                        <Image src={svm} alt="svm" width={600} height={600} className="rounded-lg shadow-lg" />
                    </div>

                    <p className="mt-2 text-gray-700">
                        เราฝึกโมเดล SVM โดยใช้ข้อมูลฝึก <code>X_train_scaled</code> และ <code>y_train</code> และทำนายค่าด้วย <code>X_test_scaled</code>
                    </p>

                    <h3 className="mt-4 text-lg font-semibold text-gray-800">ผลลัพธ์ของโมเดล SVM:</h3>
                    <ul className="list-disc list-inside mt-2 text-gray-700 space-y-2">
                        <li><strong>Accuracy Score:</strong> 0.8369</li>
                        <li><strong>Precision Score:</strong> 0.8889</li>
                        <li><strong>Recall Score:</strong> 0.8224</li>
                        <li><strong>F1 Score:</strong> 0.8544</li>
                    </ul>

                    <div className="flex justify-center my-4">
                        <Image src={svm1} alt="svm1" width={500} height={500} className="rounded-lg shadow-lg" />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-center text-pink-700 mb-6 mt-10">
                    เปรียบเทียบโมเดล KNN และ SVM
                </h2>

                {/* Model Performance Results */}
                <h3 className="text-2xl font-semibold text-gray-800 mt-8">ผลการเปรียบเทียบโมเดล</h3>
                <p className="mt-2 text-gray-700">
                    เราทำการเปรียบเทียบผลลัพธ์ของ KNN และ SVM โดยใช้ข้อมูลเดียวกัน และประเมินโมเดลจากค่าต่างๆ เช่น
                    Accuracy, Precision, Recall, F1 Score
                </p>

                {/* ตารางเปรียบเทียบโมเดล */}
                <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-gray-800 border">Metric</th>
                                <th className="px-4 py-2 text-gray-800 border">KNN (%)</th>
                                <th className="px-4 py-2 text-gray-800 border">SVM (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 border text-center">Accuracy</td>
                                <td className="px-4 py-2 border text-center">84.78%</td>
                                <td className="px-4 py-2 border text-center">83.69%</td>
                            </tr>
                            <tr className="bg-gray-100">
                                <td className="px-4 py-2 border text-center">Precision</td>
                                <td className="px-4 py-2 border text-center">90.72%</td>
                                <td className="px-4 py-2 border text-center">88.88%</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-center">Recall</td>
                                <td className="px-4 py-2 border text-center">82.24%</td>
                                <td className="px-4 py-2 border text-center">82.24%</td>
                            </tr>
                            <tr className="bg-gray-100">
                                <td className="px-4 py-2 border text-center">F1 Score</td>
                                <td className="px-4 py-2 border text-center">86.27%</td>
                                <td className="px-4 py-2 border text-center">85.43%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                {/* สรุปผลลัพธ์ */}
                <h3 className="text-2xl font-semibold text-gray-800 mt-8">สรุป: ควรเลือกใช้โมเดลไหน?</h3>
                <p className="mt-2 text-gray-700">
                    ✅ <strong className="text-xl text-pink-700">KNN เป็นตัวเลือกที่ดีกว่า</strong> สำหรับชุดข้อมูลนี้ เพราะ:
                </p>
                <ul className="mt-2 text-gray-700 list-disc list-inside space-y-2">
                    <li>ให้ค่าความแม่นยำ (Accuracy) สูงกว่าเล็กน้อย</li>
                    <li>มี Precision สูงกว่า ทำให้มั่นใจได้ว่าผลบวกที่พยากรณ์มาน่าเชื่อถือ</li>
                    <li>ค่า F1 Score สูงกว่า แสดงถึงสมดุลที่ดีระหว่าง Precision และ Recall</li>
                </ul>

                <p className="mt-2 text-gray-700">
                    🚀 อย่างไรก็ตาม **SVM อาจเป็นตัวเลือกที่ดีกว่า** ถ้าข้อมูลมีความซับซ้อนมากขึ้น และสามารถปรับแต่ง Kernel ให้เหมาะสมได้
                </p>
            </div>
        </div>
    );
}
