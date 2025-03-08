"use client";

import { useState } from "react";

const DemoNeuralNetwork = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/jpg")) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); 
      setPrediction(null);
    } else {
      alert("กรุณาอัปโหลดไฟล์ JPEG หรือ JPG เท่านั้น!");
      setSelectedFile(null);
      setPreview(null);
      setPrediction(null);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString().split(",")[1] || "");
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePredict = async () => {
    if (!selectedFile) {
      alert("กรุณาเลือกไฟล์ก่อนทำการ Predict");
      return;
    }

    setLoading(true);
    try {
      const base64Image = await convertToBase64(selectedFile);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/predict/flower`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_base64: base64Image }),
      });

      if (!response.ok) throw new Error("เกิดข้อผิดพลาดในการ Predict");

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error:", error);
      setPrediction("เกิดข้อผิดพลาดในการ Predict");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-center text-black-500 mb-4">
        Neural Network Models
      </h1>

      <label className="flex flex-col items-center justify-center w-96 h-96 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-rose-500 transition">
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span className="text-gray-500">Click to upload an image</span>
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
        className="mt-4 px-6 py-2 bg-rose-500 text-white rounded-lg shadow-md hover:bg-rose-400 transition"
        disabled={loading}
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {prediction && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900">ผลลัพธ์: {prediction}</h2>
        </div>
      )}
    </div>
  );
};

export default DemoNeuralNetwork;
