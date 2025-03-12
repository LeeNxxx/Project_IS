'use client';

import Image from 'next/image';
import Link from 'next/link';
import pulse from "@/assets/pulse.gif";
import flower from "@/assets/flower.gif";

export default function Home() {
  return (
    <div className="min-h-screen bg-pink-100 flex flex-col justify-center items-center">


      {/* Hero Section */}
      <div className="flex flex-col items-center text-center max-w-3xl p-5">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-700">AI Predicts Health & Beauty!</h1>
        <p className="text-gray-700 mt-4 text-lg">
          ค้นพบพลังของ AI ในการวิเคราะห์สุขภาพหัวใจ และทำนายประเภทของดอกไม้ผ่านเทคโนโลยี Machine Learning และ Neural Networks
        </p>
        <Link href="/machine_learning" className='mt-6 px-6 py-3 bg-pink-700 text-white text-lg font-semibold rounded-lg shadow-md'>
          Explore Now
        </Link>
      </div>

      {/* Heartbeat & Flower GIFs */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-2">
        <div className="w-80 h-80 flex items-center justify-center bg-pink-100 p-6 rounded-lg shadow-lg">
          <Image
            src={pulse}
            alt="Heartbeat Animation"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
        <div className="w-80 h-80 flex items-center justify-center bg-pink-100 p-6 rounded-lg shadow-lg">
          <Image src={flower} alt="Flower Blooming Animation" width={200} height={200} className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}