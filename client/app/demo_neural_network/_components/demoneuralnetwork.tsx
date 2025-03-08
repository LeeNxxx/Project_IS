"use client";

import { useState } from "react";

const DemoNeuralNetwork = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/jpg")) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); 
    } else {
      alert("⚠️ กรุณาอัปโหลดไฟล์ JPEG หรือ JPG เท่านั้น!");
      setSelectedFile(null);
      setPreview(null);
    }
  };

  
  const handlePredict = async () => {
    if (!selectedFile) return;
    alert("🚀 ระบบกำลังทดสอบ UI! ยังไม่ได้เชื่อมต่อ API");
    setPrediction(" Tulip "); 
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-6">
      
      <h1 className="text-4xl font-bold text-center text-pink-700 mb-6">
        Neural Network Models 
      </h1>

      {/* อัปโหลดรูป */}
      <label className="flex flex-col items-center justify-center w-96 h-96 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer 
      hover:border-rose-500 hover:bg-rose-50 transition-all duration-200">
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span className="text-gray-600 font-medium">📷 Click to upload an image</span>
        )}
        <input 
          type="file" 
          accept=".jpg, .jpeg" 
          onChange={handleFileChange} 
          className="hidden"
        />
      </label>

      <button 
        onClick={handlePredict} 
        className="mt-6 px-8 py-3 bg-rose-500 text-white font-semibold rounded-lg shadow-lg hover:bg-rose-400 transition-all duration-200"
      >
        Predict Now!
      </button>

      {prediction && (
        <div className="mt-6 p-6 bg-white border-l-4 border-rose-500 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900">ผลลัพธ์การทำนาย</h2>
          <p className="text-2xl text-rose-600 font-semibold mt-2">{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default DemoNeuralNetwork;
