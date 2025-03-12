"use client";

import { useState } from "react";

const DemoNeuralNetwork = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); 
      setPrediction(null);
    }
  };

  const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL("image/jpeg", 0.7).split(",")[1]);
          } else {
            reject(new Error("Could not get canvas context"));
          }
        };
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePredict = async () => {
    if (!selectedFile || loading) {
      return;
    }

    setLoading(true);
    try {
      const resizedImage = await resizeImage(selectedFile, 224, 224);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/predict/flower`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_base64: resizedImage }),
      });

      if (!response.ok) throw new Error("เกิดข้อผิดพลาดในการ Predict, Please try again");

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error:", error);
      setPrediction("เกิดข้อผิดพลาดในการ Predict, Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-center text-pink-700 mb-4">
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
          accept="image/*" 
          onChange={handleFileChange} 
          className="hidden"
          disabled={loading} 
        />
      </label>

      <button 
        onClick={handlePredict} 
        className="mt-4 px-6 py-2 bg-rose-500 text-white rounded-lg shadow-md hover:bg-rose-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
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