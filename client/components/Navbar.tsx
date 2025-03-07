'use client';

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <main className='w-full p-2 flex items-center bg-pink-900'>
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center px-24">
          <span className='text-[20px] font-semibold text-white font-Head ml-2'>
            IS_PROJECT
          </span>
        </div>

        <div className="flex space-x-4 ml-auto pr-10">
          <Link href="/machine_learning" className='px-4 py-2 bg-pink-700 text-white rounded-lg text-sm font-medium'>
            Machine Learning
          </Link>
          <Link href="/neural_network" className='px-4 py-2 bg-pink-700 text-white rounded-lg text-sm font-medium'>
            Neural Network
          </Link>
          <Link href="/demo_machine_learning" className='px-4 py-2 bg-pink-700 text-white rounded-lg text-sm font-medium'>
            Demo Machine Learning
          </Link>
          <Link href="/demo_neural_network" className='px-4 py-2 bg-pink-700 text-white rounded-lg text-sm font-medium'>
            Demo Neural Network
          </Link>
        </div>
      </div>
    </main>

  );
}
