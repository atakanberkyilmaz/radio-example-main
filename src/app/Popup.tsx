'use client';

import React from 'react';
import { useRadio } from './contexts/RadioContext';
import '../app/Popup.css';;

export default function Popup() {
  const { selectedRadio, isPlaying, togglePlay } = useRadio();

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-lg shadow-lg flex items-center justify-between w-64">
     <div>
      <p className="text-sm mb-2">Çalan Radyo: {selectedRadio ? selectedRadio : 'Yok'}</p>
      <button
      onClick={togglePlay}
      className="bg-green-500 p-2 rounded text-white"
      >
      {isPlaying ? 'Pause' : 'Play'}
      </button>
     </div>
    </div>

  );
}
